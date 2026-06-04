## Why

Tras migrar los 8 planes de salud (rama `fase-1/migracion-ssg-prioritarias`), quedan 11 páginas que
usan `ProductPageTemplate` (otros seguros y colectivos) todavía servidas por el SPA con el cuerpo
vacío. Esta change las migra a Server Components SSG con el mismo patrón ya probado, metiendo el
contenido real en el HTML inicial (SEO + GEO) sin cambiar URLs.

## What Changes

- 11 rutas explícitas en sus URLs **canónicas reales** (verificadas contra el lockfile, no las que
  declaraba cada vista): `/seguro-dental/`, `/seguro-decesos/`, `/seguro-decesos-prima-unica/`,
  `/seguro-mascotas/`, `/seguro-accidentes/`, `/seguro-salud/autonomos/`, `/seguro-salud/pymes/`,
  `/adeslas-extranjeros/`, `/adeslas-body-factory/`, `/adeslas-adif-renfe/`, `/adeslas-asistencia-en-viaje/`.
- Reutiliza la infraestructura de la tanda anterior (`SsgShell`, `seoSchemas`, `JsonLd`,
  `ProductPageTemplate` con `renderSeo`). Cada vista exporta su `data`; un wrapper cliente la consume.
- **Títulos ocultos preservados**: estas páginas conservan el `h1`/`h2` sr-only de producción mediante
  `SrOnlyHeadings`, además del `h1` visible. Decisión documentada en `docs/SSG-HIDDEN-HEADINGS.md`.
- Las 11 URLs se añaden a `tests/migrated-routes.json` (enforce SEO).

## Capabilities

### Modified Capabilities
- `ssg-rendering`: se extiende el render SSG a las 11 páginas restantes de `ProductPageTemplate`,
  preservando además los títulos ocultos heredados.

## Impact

- **Depende de** la rama `fase-1/migracion-ssg-prioritarias` (PR previo, sin mergear): usa su
  `SsgShell`/`seoSchemas`/`ProductPageTemplate`. Esta rama se apila sobre ella.
- **Nuevos:** `src/components/ssg/SrOnlyHeadings.tsx`, `docs/SSG-HIDDEN-HEADINGS.md`, 11×
  `app/<canónica>/{page.tsx,PlanClient.tsx}`.
- **Modificados:** 11 vistas (`export const data`), `tests/migrated-routes.json`.
- **NO se tocan:** layout, tracking, hubspot, next.config, catch-all, ni slugs. URLs sin cambios.
