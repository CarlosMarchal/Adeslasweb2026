<!-- Normalización E.164 en hashPhone para Google Ads Enhanced Conversions. -->

## 1. `src/lib/tracking.ts` — refactorizar hashPhone y phone_number

- [ ] 1.1 Extraer función `normalizeE164(phone: string): string` que:
      - Quita separadores: espacios, guiones, paréntesis, puntos.
      - Si empieza por `0034` → sustituye por `+34`.
      - Si no empieza por `+` → antepone `+34`.
      - Devuelve la cadena resultante (nunca en minúsculas: los dígitos no cambian).
- [ ] 1.2 Reescribir `hashPhone` para llamar a `normalizeE164` antes del sha256:
      ```ts
      function hashPhone(phone: string): string {
        return sha256(normalizeE164(phone));
      }
      ```
- [ ] 1.3 En `trackGenerateLead` y `trackTarificadorSubmit`, cambiar el campo `phone_number`
      del objeto `user_data`:
      ```diff
      - phone_number: phone.replace(/\s/g, ""),
      + phone_number: normalizeE164(phone),
      ```
- [ ] 1.4 Verificar en consola del navegador (o en un test manual) que:
      - `normalizeE164("666 123 456")` → `"+34666123456"`
      - `normalizeE164("+34666123456")` → `"+34666123456"` (idempotente)
      - `normalizeE164("0034666123456")` → `"+34666123456"`

## 2. `tests/tracking-contract.spec.ts` — actualizar el guardarraíl

- [ ] 2.1 Actualizar el test `"trackGenerateLead empuja la estructura esperada"`:
      ```diff
      - expect(ud.phone_number).toBe("666123456");
      - expect(ud.sha256_phone_number).toBe(sha256("666123456"));
      + expect(ud.phone_number).toBe("+34666123456");
      + expect(ud.sha256_phone_number).toBe(sha256("+34666123456"));
      ```
- [ ] 2.2 Añadir casos de entrada variante (mismo teléfono, distintos formatos → mismo E.164):
      ```ts
      it("normaliza a E.164 independientemente del formato de entrada", () => {
        for (const raw of ["666 123 456", "+34 666 123 456", "0034666123456"]) {
          window.dataLayer = [];
          trackGenerateLead(raw, "test_source");
          const ud = lastEvent().user_data as Record<string, string>;
          expect(ud.phone_number).toBe("+34666123456");
          expect(ud.sha256_phone_number).toBe(sha256("+34666123456"));
        }
      });
      ```
- [ ] 2.3 Verificar que los tests de sincronía (`no devuelve Promise`) siguen en verde sin cambios.

## 3. `CLAUDE.md` — actualizar §7 Datos de referencia

- [ ] 3.1 Corregir el ejemplo del contrato `generate_lead` en §7:
      ```diff
      - phone_number: "666123456",  // sin espacios, sin +34
      + phone_number: "+34666123456",  // E.164 España (normalizado antes del hash)
      - sha256_phone_number: "6359bfed…"  // 64 hex, SHA-256 minúsculas
      + sha256_phone_number: "…"  // 64 hex, SHA-256 del E.164
      ```
      Actualizar también el comentario en §2 (invariante P0-2) si menciona el formato.

## 4. Validación local

- [ ] 4.1 `npm run test:contract` → verde (contrato + sincronía + source-guards).
- [ ] 4.2 `npm run test:routes` → 184/184 verde (no debería verse afectado, pero es obligatorio).
- [ ] 4.3 `npm run test:seo` → verde.
- [ ] 4.4 `npx tsc --noEmit` → sin nuevos errores.
- [ ] 4.5 `next build` → exit 0.

## 5. Validación en navegador (obligatoria antes del PR)

- [ ] 5.1 Abrir cualquier página con formulario en local (`next dev` o build local).
- [ ] 5.2 Rellenar el teléfono como "666 123 456" y enviar.
- [ ] 5.3 En consola del navegador:
      ```js
      window.dataLayer.filter(e => e.event === 'generate_lead')
      // → user_data.phone_number debe ser "+34666123456"
      // → user_data.sha256_phone_number debe ser un hex de 64 chars
      ```
- [ ] 5.4 Verificar con GTM Preview sobre la URL de staging que el tag de Enhanced Conversions
      recibe `phone_number: "+34666123456"`.

## 6. PR y post-deploy

- [ ] 6.1 PR a `main` con prefijo `[PERF-REVIEW]` (toca tracking). Título del commit: realidad, no
      intención. Sin co-autoría de IA (P0-3).
- [ ] 6.2 Tras merge en Vercel: repetir paso 5.3 en producción.
- [ ] 6.3 Observar GA4 DebugView 48 h para confirmar que Enhanced Conversions recibe datos.
- [ ] 6.4 Archivar: `openspec archive fix-phone-e164-enhanced-conversions`.
