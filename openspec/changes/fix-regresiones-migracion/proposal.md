## Why

Auditoría post-migración (5 agentes) detectó regresiones tras pasar de SPA a Next SSG. La más importante
para negocio: la **atribución de Google Ads se degradó** — el lead llega a HubSpot, pero el `gclid` se
pierde en recorridos multipágina, así que la conversión no se atribuye bien en Google Ads. También un
error de cableado del **tarificador comercial interno** y la pérdida del `StickyCtaBanner` de desktop.

Esta change agrupa y prioriza los arreglos. Lo de **tracking/gclid es zona P0-2** (toca `src/lib/hubspot.ts`):
el mantenedor lo ha autorizado explícitamente ("el gclid es importante").

## What Changes

### 🔴 P0-2 · Atribución Google Ads (gclid) — PRIORITARIO
- En el SPA, `captureGclid()` se llamaba en cada cambio de ruta y persistía `gclid/gbraid/wbraid` en
  `sessionStorage`. En SSG **ya no se llama nunca** → con navegación full-page (que descarta el query
  string), si el usuario aterriza con `?gclid=`, navega y envía el formulario en otra página, el `gclid`
  se pierde y `hs_google_click_id` va vacío.
- **Fix:** invocar `captureGclid()` al cargar cada página (p.ej. un pequeño componente cliente montado en
  `SsgShell` o en `app/layout.tsx`), de forma que el `gclid` se capture en la landing de entrada y se
  conserve en `sessionStorage` para el submit posterior. No se altera la forma de `generate_lead` ni el
  orden de handlers (P0-2 intacto); solo se restaura la captura del gclid.

### 🔴 Tarificador comercial interno cableado al componente equivocado
- `/tarificador-interno/` (y `/internal/tarificador`) apuntan a `@/components/TarificadorInterno`
  (simplificado) en vez de `@/views/TarificadorInterno` (el real: catálogo completo, descuento comercial,
  campañas, PDF). **Fix:** apuntar al view correcto + añadirle `"use client"` + quitar su `<Helmet>`.

### 🟡 Sticky / CTA
- **Móvil:** VERIFICADO en producción que la barra inferior móvil del Header funciona (home/plan/blog/
  contratar). Decisión del usuario: "solo móvil" → **no se restaura el `StickyCtaBanner` de desktop**.
  Pendiente: si el usuario localiza una URL/dispositivo concreto donde la barra móvil no aparezca, se trata.

### 🟡 Datos estructurados (menor)
- `autonomos` y `pymes` perdieron el `Offer` (antes `price:"0"`, inválido) — se deja sin Offer (mejora) o
  se decide. `provider` perdió `foundingDate`/`description` — restaurar si se quiere paridad. (El placeholder
  `tudominio.com/producto` NO es de este sitio; pendiente que el usuario indique dónde lo vio.)

### 🟢 Limpieza / WPO
- `app/not-found.tsx` (404 propio) no migrado. `motion.ts` carga framer-motion completo (~60KB) vs
  `LazyMotion` (~18KB) → revisar WPO. Vistas muertas (ContratarPage, FormularioDeAlta, NotFound,
  PlaceholderPage, views/TarificadorInterno tras el swap). `CLAUDE.md` desactualizado (LazyMotion/`m`).

## Capabilities

### Modified Capabilities
- `analytics-contract-guard`: se añade el requisito de **persistencia del gclid** para atribución Google Ads.

## Impact

- **P0-2:** `src/lib/hubspot.ts` (captureGclid) — autorizado; validar con GTM Preview + GA4/HubSpot. La forma
  de `generate_lead` y el orden de handlers NO cambian.
- **P0-1:** ninguna URL cambia. **P0-3:** autoría limpia.
- **Nuevos/modificados:** SsgShell (gclid + ¿sticky?), `views/TarificadorInterno` (use client), rutas del
  tarificador, posibles `seoSchemas`, `app/not-found.tsx`.
- **Guardarraíles:** `test:routes` 184/184, `test:seo`, `test:contract` deben seguir en verde.
