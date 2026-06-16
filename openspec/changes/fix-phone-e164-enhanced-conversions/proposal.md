## Why

Google Ads ha solicitado verificar que el etiquetado del sitio capture y codifique los datos de
manera coherente con lo que se envía a HubSpot. El análisis del código revela un problema concreto
en la normalización del número de teléfono antes del hash SHA-256 que se usa en Enhanced Conversions.

**El problema actual:**

La función `hashPhone` en `src/lib/tracking.ts` solo elimina espacios antes de hashear:

```ts
sha256(phone.replace(/\s/g, "").toLowerCase())
```

Esto produce hashes distintos para el mismo número según cómo lo escriba el usuario:
- "666 123 456" → hash de `"666123456"`
- "+34 666 123 456" → hash de `"+34666123456"`
- "0034666123456" → hash de `"0034666123456"`

Google Enhanced Conversions exige que el teléfono esté en **formato E.164** (`+34666123456`) antes
de hashear. Sin esta normalización, Google no puede hacer match entre el lead del dataLayer y su base
de datos de clics, haciendo la atribución de conversiones imprecisa o nula.

**Impacto del problema:** atribución incorrecta en Google Ads Enhanced Conversions → ROAS
subestimado, puja automática mal calibrada, pérdida silenciosa de valor de las campañas.

**Alcance:** solo se modifica `src/lib/tracking.ts` (función `hashPhone` y campo `phone_number` del
evento) y el guardarraíl `tests/tracking-contract.spec.ts` que lo congela. No se toca ningún handler
de formulario, ni `hubspot.ts`, ni `app/layout.tsx`, ni GTM, ni ninguna URL.

---

## What Changes

### 🔴 TRACKING · Normalización E.164 en `hashPhone` y en el campo `phone_number`

**`src/lib/tracking.ts`** — función `hashPhone`:

```diff
 function hashPhone(phone: string): string {
-  return sha256(phone.replace(/\s/g, "").toLowerCase());
+  let normalized = phone.replace(/[\s\-().]/g, "");       // quitar separadores
+  if (normalized.startsWith("0034")) {
+    normalized = "+34" + normalized.slice(4);              // 0034… → +34…
+  } else if (!normalized.startsWith("+")) {
+    normalized = "+34" + normalized;                       // 666… → +34666…
+  }
+  return sha256(normalized);                               // hash de E.164 puro
}
```

**`src/lib/tracking.ts`** — campo `phone_number` en el dataLayer (dentro de `trackGenerateLead`
y `trackTarificadorSubmit`):

```diff
 user_data: {
-  phone_number: phone.replace(/\s/g, ""),
+  phone_number: normalizeE164(phone),    // misma normalización que hashPhone
   sha256_phone_number: hashPhone(phone),
 }
```

Se extrae la normalización a una función `normalizeE164(phone)` que reutilizan tanto `hashPhone`
como el campo `phone_number`, garantizando que siempre son coherentes entre sí.

**Nota:** el campo `phone` que va a HubSpot (`submitToHubSpot({ phone: ... })`) se envía desde los
formularios tal como el usuario lo escribe; esto es correcto y no se cambia — HubSpot no necesita
E.164, y cambiar el payload de HubSpot está fuera del alcance de esta change.

### 🟡 GUARDARRAÍL · Actualizar `tests/tracking-contract.spec.ts`

El test que congela el contrato actual verifica explícitamente:

```ts
expect(ud.phone_number).toBe("666123456");          // sin espacios, sin +34
expect(ud.sha256_phone_number).toBe(sha256("666123456"));
```

Con el cambio, el nuevo contrato a congelar es:

```ts
expect(ud.phone_number).toBe("+34666123456");        // E.164 España
expect(ud.sha256_phone_number).toBe(sha256("+34666123456"));
```

Se añaden también casos de prueba para las variantes de entrada:
- Entrada `"666 123 456"` → `phone_number: "+34666123456"`
- Entrada `"+34 666 123 456"` → `phone_number: "+34666123456"` (idempotente)
- Entrada `"0034666123456"` → `phone_number: "+34666123456"`

### 🟡 DOCUMENTACIÓN · Actualizar `CLAUDE.md` §7 (Datos de referencia)

```diff
-  phone_number: "666123456",  // sin espacios, sin +34
+  phone_number: "+34666123456",  // E.164 España (normalizado)
-  sha256_phone_number: "6359bfed…"  // 64 hex, SHA-256 minúsculas
+  sha256_phone_number: "…"  // 64 hex, SHA-256 de E.164 minúsculas
```

---

## Capabilities

### Modified Capabilities
- `analytics-contract`: el campo `user_data.phone_number` pasa a ser E.164 (`+34XXXXXXXXX`), y
  `user_data.sha256_phone_number` es el SHA-256 de ese E.164. El guardarraíl `test:contract` se
  actualiza para congelar el nuevo contrato.

---

## Impact

- **P0-1 (URLs):** sin cambios. Ninguna URL afectada. `test:routes` 184/184 intacto.
- **P0-2 (tracking):** cambio **controlado y justificado** del contrato de `user_data`. La forma del
  evento `generate_lead` (campos de primer nivel: `event`, `lead_source`, `hubspot_source`,
  `user_data`) no varía. Cambia el **valor** de `phone_number` y el hash dentro de `user_data`, que
  es exactamente lo que Google Ads requiere para Enhanced Conversions. El guardarraíl se actualiza
  a la vez, en el mismo commit. `trackGenerateLead` sigue siendo síncrono. Sin `async`, sin
  `crypto.subtle`, sin `await` antes del push.
- **P0-3 (autoría):** sin rastro de IA; autor Juan Carlos Díaz.
- **SEO/GEO/WPO:** ningún impacto. El cambio es solo en lógica cliente de hashing.
- **HubSpot:** sin cambios. El payload de `submitToHubSpot` no se toca; el teléfono llega a
  HubSpot tal como lo escribe el usuario (correcto, HubSpot no requiere E.164).
- **GTM:** el tag de Enhanced Conversions en GTM-M6ZDN42 leerá `user_data.phone_number` en formato
  E.164 y `sha256_phone_number` como hash del E.164, que es exactamente lo que necesita. No se
  tocan triggers, tags ni variables en GTM.
- **Riesgo de regresión:** bajo. La función `hashPhone` solo la llaman `trackGenerateLead` y
  `trackTarificadorSubmit`; ambas siguen siendo síncronas y el campo `sha256_phone_number` sigue
  siendo un hex de 64 caracteres. El guardarraíl bloquea cualquier regresión futura.
- **Validación requerida tras implementar:** GTM Preview sobre una página con formulario real;
  verificar en consola que `window.dataLayer` contiene `phone_number: "+34XXXXXXXXX"` y que
  `sha256_phone_number` tiene 64 hex. Luego, 48 h de observación en GA4 DebugView.
- **Guardarraíles:** `test:contract`, `test:routes`, `test:seo` deben quedar en verde.
