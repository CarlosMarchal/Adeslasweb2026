## Why

Hoy las 8 páginas de planes de salud (mayor tráfico) se sirven por el catch-all con el SPA en
`ssr:false`: el cuerpo llega vacío (`BAILOUT_TO_CLIENT_SIDE_RENDERING`) y Google/IAs no ven el
contenido. Migrarlas a rutas Next renderizadas en servidor mete el contenido íntegro en el HTML
inicial (SEO + GEO) sin cambiar URLs ni el contrato de tracking, y conservando el diseño exacto.

## What Changes

- Se crean **rutas explícitas** `app/seguro-salud/<slug>/page.tsx` para los 8 planes (precedencia
  sobre el catch-all). El resto del sitio sigue en el SPA sin cambios.
- En vez de reconstruir el shell, se **reutilizan los componentes existentes** (`ProductPageTemplate`,
  `Header`, `Footer`, `Tarificador`, `CtaSection`, popups) montados como islas cliente a través de un
  `SsgShell` (adaptador de react-router cuya navegación hace carga completa de página +
  `PhonePopupProvider`). Al ser componentes cliente normales (no `ssr:false`), **Next los renderiza a
  HTML en el build** → contenido real en el HTML inicial.
- `ProductPageTemplate` recibe `"use client"` y un prop `renderSeo` (por defecto true; las rutas SSG
  lo ponen a false para no usar react-helmet — los metadatos los da `generateMetadata` nativo).
- Metadatos y JSON-LD (Organization/WebSite/Breadcrumb/FAQ/Product) server-side por ruta.
- Las 8 URLs se añaden a `tests/migrated-routes.json` (modo enforce SEO).

## Capabilities

### New Capabilities
- `ssg-rendering`: render server-side (SSG) de páginas de plan con HTML completo, `<h1>` real visible y
  contenido real en el HTML inicial, conservando el diseño y el contrato de tracking.

## Impact

- **Nuevos:** `src/components/ssg/SsgShell.tsx`, `src/lib/seoSchemas.ts`, por plan un wrapper cliente +
  `app/seguro-salud/<slug>/page.tsx` (×8).
- **Modificados:** `src/components/ProductPageTemplate.tsx` (`"use client"` + `renderSeo`), cada vista
  de plan (`export const data`), `tests/migrated-routes.json`.
- **NO se tocan:** `app/layout.tsx`, `src/lib/tracking.ts`, `src/lib/hubspot.ts`, `next.config.js`,
  `app/[[...slug]]/page.tsx`, ni ningún slug. Las URLs no cambian (lockfile en verde).
- **SEO/GEO/WPO:** contenido en HTML inicial; tracking intacto (formularios siguen siendo islas).
