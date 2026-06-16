# CLAUDE.md — Contexto y reglas para trabajar en este repo

> **Lee este documento completo antes de tocar tracking, formularios, GTM, HubSpot, rutas/URLs,
> render SSR/SSG o performance** (`app/layout.tsx`, `src/lib/tracking.ts`, `src/lib/hubspot.ts`,
> `app/[[...slug]]/page.tsx`, `next.config.js`, handlers de `<form>`).
>
> **Jerarquía documental:**
> - [`PLAN-MIGRACION-NEXT16.md`](./PLAN-MIGRACION-NEXT16.md) — el contrato de la migración a Next.js 16 SSG. **Manda el invariante P0 más restrictivo ante cualquier conflicto.**
> - [`docs/SOP-OPENSPEC.md`](./docs/SOP-OPENSPEC.md) — cómo se trabaja (spec-driven, una tarea por vez).
> - [`docs/SOP-TRACKING.md`](./docs/SOP-TRACKING.md) — autoritativo para cualquier cambio de tracking.
> - [`docs/CHECKLIST-DEPLOY.md`](./docs/CHECKLIST-DEPLOY.md) — despliegue por tandas con rollback.
> - Este `CLAUDE.md` es el resumen operativo.
>
> Autor y mantenedor: **Juan Carlos Díaz — Convertiam** (`contacto@convertiam.com` · https://convertiam.com).
> Producto: web Adeslas para Marchal Aseguradores — `adeslas.numero1salud.es`.

---

## 0. Prioridades del producto (SEO · GEO · WPO)

El objetivo del proyecto es que la web rinda al máximo en, **por este orden**:

1. **SEO** — Google recibe el contenido íntegro en el HTML inicial (sin depender de JS).
2. **GEO/AEO** — los rastreadores de IA (ChatGPT, Perplexity, Gemini), que en su mayoría **no
   ejecutan JS**, pueden leer y citar el contenido.
3. **WPO / velocidad** — HTML estático servido desde CDN, Core Web Vitals óptimos, TBT mínimo.

> **Estas prioridades NUNCA justifican violar un invariante P0.** El rendimiento no se compra a costa
> de perder eventos de tracking ni de romper una URL. En abril de 2026, optimizar PageSpeed por encima
> del tracking costó **12 días de pérdida de leads** (ver §6, post-mortem). SEO/WPO y telemetría se
> consiguen **a la vez**, no a cambio.

---

## 1. Stack y contexto

- **Framework**: Next.js (`app/` router). Hoy es un **híbrido**: una capa Next genera el `<head>`
  (metadatos, JSON-LD) y un `<h1>` **oculto (`sr-only`)**, y monta debajo un **SPA de React + React
  Router** que carga en cliente (`nextDynamic(..., { ssr: false })`). El HTML inicial llega **sin
  cuerpo visible** → el `sr-only` es un **parche** SEO.
- **Destino (migración en curso)**: Next.js 16, App Router, **Server Components como SSG** (HTML
  completo en build), `<h1>` real visible, sin React Router ni `react-helmet-async`.
- **Build**: `next build` → Vercel (auto-deploy desde `main`).
- **Lenguaje**: TypeScript. El build ignora errores TS (`next.config.js`), pero **escribe TS
  correcto**. Hay **deuda TS preexistente conocida** (p. ej. `heroPromoPill` sin `right` en
  `Autonomos.tsx`/`PymesEmpresas.tsx`) pendiente de limpieza en Fase 2 para poder quitar
  `ignoreBuildErrors`.
- **CSS**: Tailwind + CSS puro (`app/globals.css` + `src/App.css`).
- **Código heredado de Vite**: vive en [`legacy/`](./legacy/) (no es runtime activo, se retira en
  Fase 2). El build-temp `/.vite-react-ssg-temp/` está fuera del control de versiones.

---

## 2. Invariantes P0 — bloqueantes (no negociables)

### P0-1 · Las URLs son inmutables
- **Ninguna URL publicada cambia de slug.** Reorganizar = crear la nueva + **301/308** desde la
  antigua. **Ninguna URL puede degradar a `404`/`500`.**
- Verdad versionada: **`tests/routes.lockfile.json`** (184 entradas, conciliado contra producción).
- Guardarraíl: `npm run test:routes` (build local) · `npm run crawl:prod` (producción).

### P0-2 · El contrato de tracking es sagrado
- El evento `generate_lead` mantiene **exactamente** esta forma (la leen los tags de `GTM-M6ZDN42`):
  ```js
  {
    event: "generate_lead",
    lead_source: "header_desktop_te_llamamos", // string, snake_case
    hubspot_source: 301,                        // number 300-399, opcional
    user_data: {
      phone_number: "+34666123456",             // E.164 España (normalizado antes del hash)
      sha256_phone_number: "…"                  // 64 hex, SHA-256 del E.164
    }
  }
  ```
- Hash con **`js-sha256` (síncrono)**. **Prohibido `crypto.subtle.digest`** (async).
- En los handlers: `trackGenerateLead(...)` **síncrono y PRIMERO**, antes de cualquier `await`/`fetch`.
  HubSpot va **fire-and-forget**.
- GTM se carga con **`afterInteractive`**. **Prohibido** diferir `gtm.js` a "primer evento" o `setTimeout`.
- Guardarraíl: `npm run test:contract` (forma + sincronía + lint anti-`crypto.subtle` + orden de handlers).

### P0-3 · Branding y autoría
- En **ningún archivo del producto** (código, comentarios, metadatos, `package.json`, footer, commits)
  puede aparecer rastro de herramientas de IA.
- `package.json → author`: Juan Carlos Díaz · contacto@convertiam.com · https://convertiam.com.
- **Commits firmados solo por el desarrollador. Sin `Co-Authored-By` de IA.**

---

## 3. Utilidades de tracking (`src/lib/tracking.ts`)

Todas **síncronas**. Si encuentras una `async`, es un bug: arréglalo.

| Función | Evento dataLayer | Cuándo |
|---|---|---|
| `trackGenerateLead(phone, source, hubspotSource?)` | `generate_lead` | Teléfono en cualquier formulario |
| `trackTarificadorSubmit(phone, source, hubspotSource?)` | `generate_lead` | Envío del tarificador (alias) |
| `trackClickToCallContratacion(location)` | `click_to_call_contratacion` | Click en `tel:917105000` |
| `trackClickToCallAsistencia(location)` | `click_to_call_asistencia` | Click en `tel:919191898` |
| `trackPageView(pathname)` | `page_view` | Cambio de ruta SPA (en `App.tsx`) |

### 3.1 Handlers de formulario — orden correcto

```ts
// ✅ CORRECTO
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;
  trackGenerateLead(phone, "mi_formulario", 301);          // 1. TRACKING SÍNCRONO PRIMERO
  submitToHubSpot({...}).catch(e => console.error("[HubSpot]", e)); // 2. fire-and-forget
  setSent(true);                                           // 3. UX
};
```
```ts
// ❌ PROHIBIDO — rompió el tracking 12 días
await submitToHubSpot({...});      // ← BLOQUEA 500-5000 ms
trackGenerateLead(phone, ...);     // ← puede no ejecutarse nunca
```

### 3.2 GTM en `app/layout.tsx`
- `<head>`: init inline del array (`window.dataLayer=window.dataLayer||[]; …{event:'gtm.js'}`).
- Fin de `<body>`: loader con `strategy="afterInteractive"` simple.
- **Prohibido** el patrón IIFE que espera scroll/click/touch con fallback `setTimeout`.
- **Nota (no tocar sin permiso):** hoy el script de **analítica de HubSpot** (`hs-scripts.com`) sí se
  difiere a primer evento con fallback `setTimeout`. No rompe `generate_lead` porque los leads se
  envían por `fetch` directo a `api.hsforms.com`; queda **documentado en la línea base**.

### 3.3 Nuevos formularios — checklist
1. Importar `trackGenerateLead` de `@/lib/tracking`.
2. Llamarlo al INICIO del handler (tras validar), antes de cualquier `fetch`.
3. `lead_source` descriptivo único (snake_case) + `hubspot_source` (300-399).
4. Añadir la source al enum de `src/lib/hubspot.ts` si no existe.

### 3.4 Performance vs telemetría
Si PageSpeed/TBT sube por GTM: **NO** diferir `gtm.js`, **NO** mover tracking tras fetches. **SÍ**
optimizar tags dentro de GTM (triggers en `Window Loaded`, server-side, pausar tags lentos). Si tocas
`gtm.js`/`hs-scripts.com`, validar GA4 DebugView 48 h antes/después.

---

## 4. Guardarraíles (la batería que bloquea)

Construidos en Fase 0. Corren en **pre-commit** (rápidos) y **CI** (con build).

| Comando | Protege | Qué hace |
|---|---|---|
| `npm run test:contract` | P0-2 | Forma de `generate_lead`, sincronía, anti-`crypto.subtle`, orden de handlers |
| `npm run build:lockfile` | P0-1 | Regenera `tests/routes.lockfile.json` desde `pageMeta`+`blogPosts`+`next.config` |
| `npm run test:routes` | P0-1 | Verifica el lockfile contra el build local (`BASE_URL`). Ninguna URL a 404/500 |
| `npm run crawl:prod` | P0-1 | Concilia el lockfile contra producción en vivo |
| `npm run test:seo` | SEO/GEO | `title`/`description`/`canonical`/JSON-LD; enforce de `<h1>` real en rutas migradas |
| `npm run typecheck` | calidad | `tsc --noEmit` (informativo: arrastra deuda TS preexistente) |

- **Pre-commit** (`.husky/pre-commit`): `npm run guardrailes` (= `test:contract`). **No usar
  `--no-verify`.** Si falla, se arregla la causa, no se desactiva el test.
- **CI** (`.github/workflows/guardrailes.yml`): contrato + build + `test:routes` + `test:seo`.
- **Rutas migradas**: se anotan en `tests/migrated-routes.json` para activar el modo *enforce* SEO.
- **Línea base SEO**: `tests/seo-baseline.json` (referencia para detectar regresiones tras migrar).

---

## 5. Metodología (OpenSpec) — una tarea por vez

Cada unidad de trabajo: **propuesta → revisión humana → implementar en rama → validar → PR → merge →
deploy de la tanda → archivar**. Detalle en [`docs/SOP-OPENSPEC.md`](./docs/SOP-OPENSPEC.md).
- Estructura en `openspec/` (`config.yaml`, `specs/`, `changes/`). Comandos: `openspec new change`,
  `openspec validate`, `openspec archive`, `openspec list`.
- **El agente no auto-aprueba** cambios de arquitectura, tracking ni URLs.

---

## 6. Debugging de tracking + post-mortem

Si reportan que "no llegan eventos":
1. Consola con la página cargada: `window.dataLayer.filter(e => e.event === 'generate_lead')`.
   - Aparece → problema en GTM (trigger/tag/consent). No aparece → problema en el código cliente.
2. **GTM Preview** sobre la URL real. `gtm.formInteract` es built-in, NO es nuestro; el nuestro es
   `generate_lead` (o `click_to_call_*`, `page_view`).
3. Si el push no aparece: buscar `await` antes de `track*` → moverlo; verificar que `track*` no sea
   `async`; probar `sha256("test")` en consola → hex.
4. Si el push aparece pero GA4 no: revisar `consent_state` (Consentiam), GTM Preview (¿dispara el tag?),
   stream de GA4.
5. **Nunca** asumir causa sin evidencia directa del dataLayer.

**Post-mortem (9–21 abr 2026):** un commit movió `trackGenerateLead` a DESPUÉS de `await
submitToHubSpot` y, siendo la función `async` (usaba `crypto.subtle`), los pushes se perdían al cerrar
la pestaña. Agravado por diferir `gtm.js` a primer evento. **Lecciones:** (1) el tracking es código de
negocio crítico, todo cambio se valida en GTM Preview; (2) `async` + `await crypto.subtle` + llamada
sin `await` = pérdida silenciosa; (3) los títulos de commit pueden engañar — describe el cambio REAL.

---

## 7. Datos de referencia

| Qué | Valor |
|---|---|
| GTM | `GTM-M6ZDN42` (en `app/layout.tsx`) |
| HubSpot Portal / Form GUID | `6596944` / `cd3fb712-acc6-42f7-8843-e42f1360c3c4` (`src/lib/hubspot.ts`) |
| HubSpot sources | Enum 300-399 en `src/lib/hubspot.ts` |
| Teléfonos | Contratación `917105000` · Asistencia `919191898` |
| Consent | Consentiam.eu (vía GTM, no desde código) |
| Fuentes de verdad de rutas | `src/data/pageMeta.ts`, `src/data/blogPosts.ts`, `app/sitemap.ts` |
| Deploy | Vercel, auto-deploy desde `main` |

---

## 8. Convenciones de git y commits

1. **Rama por tarea; PR a `main`; nunca push directo a `main`** (producción con auto-deploy).
2. **Commits firmados solo por Juan Carlos Díaz. Sin co-autoría de IA** (P0-3). Sin rastro de IA en
   ningún archivo del producto.
3. Título = cambio **real**, no la intención. Performance + tracking → prefijo `[PERF-REVIEW]` +
   validación humana con evidencia.
4. **Nunca** `git add -A`/`git add .` — stagear archivos intencionales (evita `.vite-react-ssg-temp/`,
   secretos, ruido CRLF). Usa `git diff --ignore-cr-at-eol`.
5. Nunca saltar hooks (`--no-verify`) ni `--amend`/firmar sin petición explícita.

---

## 9. No hacer sin preguntar (requiere propuesta OpenSpec + permiso)

- Modificar `app/layout.tsx` (GTM, HubSpot, preloads).
- Modificar `src/lib/tracking.ts` o `src/lib/hubspot.ts`.
- Añadir/quitar llamadas a `trackGenerateLead`, `trackTarificadorSubmit`, `trackClickToCall*`, `trackPageView`.
- Tocar `vercel.json` o `next.config.js` (incluidos redirects/headers).
- Cambiar cualquier slug existente o el contrato del lockfile de URLs.
- Modificar `package.json` (dependencias nuevas sin justificación).
- Reactivar o editar nada de `legacy/`.

Ante la duda: **preguntar antes de actuar.**
