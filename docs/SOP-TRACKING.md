# SOP — TRACKING GTM / GA4 / HUBSPOT

**Standard Operating Procedure — reglas formales para trabajar con el tracking de Adeslas.**

> Propietario: Juan Carlos Díaz (Convertiam) · `jcarlos@convertiam.com`
> Última revisión: 2026-04-21 (post-incidente 9-21 Abr)
> Versión: 1.0

---

## Niveles de prioridad

| Nivel | Significado | Violación = |
|---|---|---|
| **P0** | Crítica, no-negociable, bloquea merge | Revert inmediato + incidente |
| **P1** | Alta, requiere justificación por escrito para excepción | Code review obligatorio por owner |
| **P2** | Recomendada, buena práctica | Flag en review, no bloquea |

---

## P0 — REGLAS CRÍTICAS (no-negociables)

### P0.1 — `dataLayer.push` debe ser síncrono y primera línea del handler

**Regla:** En cualquier handler de `<form>` (onSubmit, onClick de botón submit), la llamada a `trackGenerateLead` / `trackTarificadorSubmit` / cualquier función que empuje al `dataLayer` debe ser la **PRIMERA acción** después de la validación, **antes de cualquier `await`, `fetch`, `setState` que cause redirect o `router.push`**.

```ts
// ✅ PATRÓN OBLIGATORIO
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;
  trackGenerateLead(phone, "source", 301);                // ← P0.1
  submitToHubSpot({...}).catch(e => console.error(e));     // fire-and-forget
  setSent(true);
};

// ❌ PROHIBIDO — esto rompió producción del 9 al 21 Abr 2026
const handleSubmit = async (e) => {
  e.preventDefault();
  await submitToHubSpot({...});                           // bloquea 500-5000ms
  trackGenerateLead(phone, "source", 301);                // puede no ejecutarse
};
```

**Validación:** grep sobre todos los handlers del PR:
```bash
grep -rn "await submitToHubSpot\|await fetch" src/components/ | grep -B1 "trackGenerate\|trackTarificador"
```
Si aparece `await ... fetch...` antes de la línea de tracking en el mismo handler → REVERT.

---

### P0.2 — Funciones de tracking NO pueden ser `async`

**Regla:** Ninguna función exportada en `src/lib/tracking.ts` puede declararse como `async function`. Si necesita hash, usar librería JS pura síncrona (`js-sha256`). Prohibido usar `crypto.subtle.digest`, `fetch`, `Promise.all` u otra API async dentro.

**Razón:** `async function` retorna Promise. Si el llamador no hace `await` y la promise rechaza, es un *unhandled rejection* silencioso → push nunca ocurre. Si el llamador hace `await`, bloquea el handler antes del render → peor UX y posible race con navegación.

**Validación:**
```bash
grep -n "^export async function" src/lib/tracking.ts
```
Debe devolver vacío. Si devuelve algo → REVERT.

---

### P0.3 — GTM debe cargar en `afterInteractive` (o antes), NUNCA diferido por interacción

**Regla:** En `app/layout.tsx`:
- El `<script>` inline que inicializa `window.dataLayer` va en `<head>`.
- El loader de `gtm.js` debe usar `<Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtm.js?id=${GTM_ID}">` directamente — SIN envolver en IIFE que espere `scroll/click/touch/keydown/mousemove` con fallback `setTimeout`.
- HubSpot `hs-scripts.com` puede ir en `lazyOnload` — pero nunca diferido por interacción tampoco.

```tsx
// ✅ PATRÓN OBLIGATORIO
<Script id="gtm-loader" strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} />

// ❌ PROHIBIDO — rompió cobertura en usuarios pasivos durante 2 días
<Script strategy="afterInteractive" dangerouslySetInnerHTML={{
  __html: `(function(){ ['scroll','click','touchstart'].forEach(...) })()`
}} />
```

**Validación:**
```bash
grep -A 20 "gtm-loader" app/layout.tsx | grep -E "scroll.*click|setTimeout\(load"
```
Debe devolver vacío. Si devuelve algo → REVERT.

---

### P0.4 — Estructura del evento `generate_lead` es inmutable sin coordinación

**Regla:** La forma del evento en el dataLayer está acoplada al contenedor GTM (`GTM-M6ZDN42`). No se puede cambiar ningún campo del siguiente contrato sin PR separado **co-aprobado por quien mantenga GTM**:

```js
{
  event: "generate_lead",                        // nombre exacto
  lead_source: string,                           // snake_case, descriptivo
  hubspot_source: number,                        // 301-399 (opcional pero recomendado)
  user_data: {
    phone_number: string,                        // limpio, sin espacios, sin "+34"
    sha256_phone_number: string                  // 64 hex chars, minúsculas
  }
}
```

**Qué SÍ se puede añadir sin coordinar:** campos nuevos dentro de `user_data` (ej. `email`, `sha256_email`). Nunca renombrar o eliminar los existentes.

**Validación:** al cambiar `trackGenerateLead`, buscar en `src/lib/tracking.ts`:
```bash
grep -E "user_data:\s*\{" src/lib/tracking.ts
```
Confirmar que `phone_number` y `sha256_phone_number` siguen presentes.

---

### P0.5 — Nuevos formularios DEBEN llamar a `trackGenerateLead`

**Regla:** Cualquier `<form>` nuevo que recoja teléfono y lo envíe (a HubSpot, a `/api/*`, a terceros) debe llamar a `trackGenerateLead(phone, source, hubspotSource)` como primera línea del handler. Sin excepción.

**Razón:** Durante meses, `FormularioAlta.tsx` y `FormularioContratacion.tsx` (los de mayor valor — alta completa con IBAN) no disparaban `generate_lead`. Nadie se dio cuenta porque no existía esta regla.

**Validación:** en cada nuevo `<form>` añadido al PR:
```bash
# Por cada archivo con <form>, debe aparecer trackGenerateLead o trackTarificadorSubmit
git diff --name-only main... | xargs grep -l "<form" 2>/dev/null | while read f; do
  grep -l "trackGenerateLead\|trackTarificadorSubmit" "$f" || echo "FALTA TRACKING: $f"
done
```

---

### P0.6 — Validación en GTM Preview es obligatoria antes de merge a `main`

**Regla:** Todo PR que toque `app/layout.tsx`, `src/lib/tracking.ts`, `src/lib/hubspot.ts` o cualquier handler de formulario debe incluir en la descripción del PR:

1. Screenshot o log de GTM Preview mostrando el evento `generate_lead` (o `click_to_call_*`) llegando al stream.
2. Confirmación de que `window.dataLayer.filter(e => e.event === 'generate_lead')` devuelve el objeto esperado en consola del navegador.
3. Si afecta a producción: confirmación de que GA4 DebugView recibe el evento.

**Sin esta evidencia → el PR no se mergea.**

---

### P0.7 — Prohibido `git add -A` / `git add .`

**Regla:** Stagear SIEMPRE archivos explícitos por nombre. El repo tiene:
- Ruido crónico de CRLF (Windows line endings) en muchos archivos sin tocar.
- Artefactos de build en `.vite-react-ssg-temp/` versionados accidentalmente.
- `.claude/settings.local.json` que puede contener permisos locales.

Usar `git add -A` incluye todo este ruido en el commit, contamina la historia y puede exponer secretos.

**Validación:** en la política del repo (opcional: pre-commit hook):
```bash
# Bloquear commits donde staged incluya archivos de .vite-react-ssg-temp/
git diff --cached --name-only | grep -q "\.vite-react-ssg-temp/" && exit 1
```

---

## P1 — REGLAS ALTAS (excepción requiere justificación escrita)

### P1.1 — Performance NUNCA justifica pérdida de eventos

Si PageSpeed TBT o LCP suben por GTM/HubSpot:
- ❌ NO diferir la carga del contenedor
- ❌ NO mover tracking después de fetches
- ✅ Pasar tags lentos a server-side GTM (sGTM)
- ✅ Mover triggers pesados a `Window Loaded` DENTRO de GTM (no en código)
- ✅ Pausar tags no críticos hasta interacción DENTRO de GTM

**Excepción:** si la pérdida de PageSpeed es >10 puntos y bloquea Google Ads Quality Score, se puede diferir **solo con A/B test documentado** de 48 h comparando tasas de conversión GA4 antes/después.

---

### P1.2 — Commits de performance tocando tracking → marcar `[PERF-REVIEW]`

Cualquier commit que:
- Modifique `app/layout.tsx`
- Modifique `src/lib/tracking.ts`
- Modifique `src/lib/hubspot.ts`
- Añada `strategy=`, `defer`, `async`, `lazyOnload` a un `<Script>`
- Mueva una llamada de tracking respecto de un `await`/`fetch`

…debe llevar en el título del commit el prefijo `[PERF-REVIEW]` y requiere **aprobación humana explícita** del dueño del tracking (JC Díaz) antes de merge a main.

---

### P1.3 — Sources de HubSpot centralizadas

Los identificadores numéricos 301–399 viven en el enum `HubSpotSource` en `src/lib/hubspot.ts`. Si necesitas un source nuevo:
1. Añadirlo al enum con comentario descriptivo.
2. Incluir el nuevo número en la lista de uniones de tipo.
3. Usarlo en la llamada a `trackGenerateLead` / `submitToHubSpot`.

Nunca pasar un literal numérico suelto. Nunca reutilizar un source existente para un producto distinto.

---

### P1.4 — Títulos de commit describen el cambio REAL, no la intención

**Ejemplo mal:** `fix: await antes de GTM` — suena positivo, en realidad metía un `await` **delante** de la llamada GTM, bloqueándolo. Provocó el incidente.

**Ejemplo bien:** `perf: retrasar carga gtm.js hasta primera interacción (trade-off TBT vs cobertura)` — describe lo que hace y reconoce el trade-off.

---

## P2 — RECOMENDADAS (buenas prácticas)

### P2.1 — Auto-tracking global (roadmap)
Añadir en `App.tsx` un listener global que capture cualquier `<form>` submit, extraiga teléfono del input `tel`, y dispare `generate_lead` automáticamente. Garantiza cobertura en formularios que olviden llamar manualmente. Requiere atributo `data-track-source="..."` en cada `<form>` opt-in.

### P2.2 — Monitoring continuo de eventos
Dashboard en GA4 que compare volumen diario de `generate_lead` vs días previos. Alertar si cae >30% día sobre día. Detección temprana del siguiente incidente.

### P2.3 — Tests unitarios del tracking
`src/lib/tracking.test.ts` con vectores SHA-256 conocidos y mocking de `window.dataLayer` para verificar la estructura exacta del push.

### P2.4 — Documentar excepciones de consent
Consentiam gestiona el consent desde GTM. Si hay usuarios/regiones donde Consentiam bloquea `generate_lead`, documentar en `CLAUDE.md` la lista y el criterio.

---

## Protocolo de debugging (cuando alguien reporte "no llegan eventos")

1. **Verificar dataLayer cliente** (2 min):
   ```js
   window.dataLayer.filter(e => e.event === 'generate_lead')
   ```
   - Aparece → código OK, problema es GTM/GA4 → ir a paso 4
   - No aparece → código roto → ir a paso 2

2. **Revisar el handler** (5 min):
   - ¿La función de tracking se ejecuta antes de cualquier `await`? (P0.1)
   - ¿La función es `sync`? (P0.2)
   - ¿Hay algún `try/catch` que trague el error?

3. **Probar el hash** (2 min):
   ```js
   import { sha256 } from "js-sha256"; sha256("test")
   ```
   Debe devolver 64 hex chars. Si no, hay problema con la dep.

4. **GTM Preview mode** (3 min):
   - Stream de eventos: ¿aparece `generate_lead`?
   - ¿Aparecen triggers disparados?
   - ¿El tag de GA4 dispara?

5. **GA4 DebugView** (3 min):
   - ¿Llega el evento con parámetros?
   - ¿`user_data.phone_number` y `user_data.sha256_phone_number` presentes?

6. **Consent** (2 min):
   - `window.dataLayer.find(e => e.consent_state)`
   - ¿`analytics: true` y `ad_user_data: true`?

**Tiempo total máximo:** 15 min hasta tener diagnóstico. Si pasa de ahí, hay algo sistémico — abrir incidente.

---

## Checklist de PR que toca tracking

Copia-pega esto en la descripción de cualquier PR que toque código de tracking/GTM:

```
## Tracking PR Checklist

- [ ] P0.1 · trackGenerateLead es primera línea del handler (antes de fetch/await)
- [ ] P0.2 · Ninguna función en tracking.ts es async
- [ ] P0.3 · GTM carga en afterInteractive sin defer por interacción
- [ ] P0.4 · Estructura del evento generate_lead intacta (user_data.phone_number + sha256_phone_number)
- [ ] P0.5 · Todo <form> nuevo tiene llamada a trackGenerateLead
- [ ] P0.6 · Validado en GTM Preview — screenshot adjunto
- [ ] P0.7 · No se ha usado git add -A ni git add .
- [ ] P1.1 · Si afecta performance: trade-off documentado o ninguna pérdida de cobertura
- [ ] P1.2 · Si toca GTM/tracking: prefijo [PERF-REVIEW] si aplica
- [ ] P1.3 · Sources nuevos añadidos al enum de hubspot.ts
- [ ] P1.4 · Título del commit describe el cambio real
- [ ] GA4 DebugView verificado (si afecta a prod)
- [ ] window.dataLayer.filter(e => e.event === 'generate_lead') devuelve el objeto esperado
```

---

## Anti-patrones (historia de cómo se rompió antes)

Mantén esta lista viva: cada bug real se añade aquí para que no se repita.

| Fecha | Anti-patrón | Commit | Consecuencia |
|---|---|---|---|
| 2026-04-09 | `await submitToHubSpot(...)` antes de `trackGenerateLead()` | `1744e9e` | Pérdida de eventos cuando usuario cerraba tab antes de respuesta HubSpot |
| 2026-04-09 | `trackGenerateLead` declarada `async` con `await crypto.subtle.digest` | (preexistente, heredado de `bf2ed84`) | Unhandled rejection silencioso cuando crypto.subtle fallaba (Safari ITP, extensiones) |
| 2026-04-20 | GTM loader envuelto en IIFE que espera `scroll/click/touch/keydown/mousemove` con `setTimeout(load, 8000)` fallback | `bf438ce` | Pérdida total en usuarios pasivos (<8 s sin interactuar) |
| 2026-04-20 | HubSpot `hs-scripts.com` con el mismo patrón de IIFE defer-por-interacción | `f239250` | Cookie `hubspotutk` no se genera en visitas pasivas → atribución rota |
| N/A | `FormularioAlta.tsx` + `FormularioContratacion.tsx` creados sin llamada a `trackGenerateLead` | `691deaf` + `6a8bee0` | Formularios de mayor valor (alta completa con IBAN) sin medir conversión |

---

## Ownership y escalado

| Área | Owner | Backup |
|---|---|---|
| Código de tracking (`src/lib/tracking.ts`, handlers) | JC Díaz — Convertiam | Carlos Marchal |
| Contenedor GTM (`GTM-M6ZDN42`) | JC Díaz — Convertiam | — |
| Contenedor HubSpot (Portal `6596944`) | JC Díaz — Convertiam | — |
| Performance / Vercel deploys | Carlos Marchal | JC Díaz |
| Incidentes de tracking | JC Díaz — Convertiam | — |

**Si tienes dudas sobre si una regla aplica:** asume que SÍ y pregunta antes de commitear.
