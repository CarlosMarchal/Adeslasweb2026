## Why

Quedan 6 páginas por segmento de público (individual, familiar, infantil, ginecología, embarazo,
mayores) basadas en `SegmentPageTemplate`, todavía servidas por el SPA con el cuerpo vacío. Esta change
las migra a Server Components SSG con el mismo patrón, metiendo el contenido en el HTML inicial sin
cambiar URLs.

## What Changes

- 6 rutas explícitas en sus canónicas: `/seguro-salud/adeslas-individual/`, `/seguro-salud/seguro-familia/`,
  `/seguro-salud/adeslas-infantil/`, `/seguro-salud/adeslas-ginecologia/`, `/seguro-salud/embarazo/`,
  `/seguro-salud/seguro-para-personas-mayores/`.
- `SegmentPageTemplate` recibe `"use client"` + `renderSeo` (mismo cambio que `ProductPageTemplate`).
- Reutiliza `SsgShell`, `seoSchemas`, `JsonLd` y `SrOnlyHeadings`. Cada vista exporta su `data`.
- Títulos ocultos preservados (`SrOnlyHeadings`), coherente con la tanda anterior.
- Las 6 URLs se añaden a `tests/migrated-routes.json` (enforce SEO + exclusión del catch-all).

## Capabilities

### New Capabilities
- `ssg-rendering-segmentos`: render SSG de las páginas por segmento de público.

## Impact

- **Depende de** las ramas previas de Fase 1 (infraestructura SSG). Se apila sobre ellas.
- **Nuevos:** 6× `app/seguro-salud/<slug>/{page.tsx,PlanClient.tsx}`.
- **Modificados:** `src/components/SegmentPageTemplate.tsx`, 6 vistas (`export const data`),
  `tests/migrated-routes.json`.
- **NO se tocan:** layout, tracking, hubspot, next.config, ni slugs. URLs sin cambios. (El catch-all ya
  excluye automáticamente las rutas de `migrated-routes.json`.)
