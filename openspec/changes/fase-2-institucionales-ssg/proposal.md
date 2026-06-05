## Why

Tras el blog, quedan páginas institucionales/informativas que aún sirve el SPA (cuerpo vacío en el HTML
inicial). Esta change migra a Server Components SSG las **6 más limpias** (ruta única, sin parámetros,
mapeo 1:1 a su canónica), aplicando el patrón Fase 1 completo, sin cambiar URLs ni tocar el catch-all.

Quedan EXPLÍCITAMENTE FUERA (por complejidad, a tratar en changes posteriores):
- `PreciosOfertas` (`/precios-ofertas/` + `/precios-y-ofertas/`, canónica distinta, Tarificador embebido).
- `MiPrecio` (`/mi-precio/:slug`, parámetro + noindex + tracking `trackClickToCallContratacion`).
- `LandingPlenaVitalOferta` (`/oferta-plena-vital/`, landing de campaña noindex con diseño CRO propio).
- La **home `/`** y la retirada del catch-all (requieren tocar el routing P0; se hacen al final de Fase 2).

## What Changes

Migración de 6 páginas a rutas Next explícitas (Server Component + wrapper cliente), patrón Fase 1:

| Vista | Ruta canónica | Indexable |
|---|---|---|
| `CuadroMedico` | `/cuadro-medico/` | sí |
| `Contacto` | `/contacto/` | sí |
| `ComoContratarAdeslas` | `/como-contratar-adeslas/` | sí |
| `PreciosAdeslas` | `/precios-adeslas/` | sí |
| `AltaAdeslas` | `/alta-adeslas/` | sí |
| `PoliticaPrivacidad` | `/politica-de-privacidad/` | **no (noindex)** |

- Cada vista: `"use client"` (las 3 que aún no lo tienen) + prop `renderSeo` (SEO client extraído a hijo
  `{Nombre}SpaSeo`). Las vistas ya se auto-envuelven en `TarificadorProvider`; el wrapper solo aporta
  `SsgShell` (Router react-router + PhonePopupProvider).
- Cada ruta: `app/<slug>/page.tsx` (server: `generateMetadata` desde `PAGE_META` + `<JsonLd>` +
  `<SrOnlyHeadings>`) + `app/<slug>/<Nombre>Client.tsx` (cliente). Estas páginas SÍ tienen h1/h2 en
  `PAGE_META` → se usa `SrOnlyHeadings` (a diferencia del blog), conservando el patrón "dos h1".
- `/politica-de-privacidad/` se marca `noindex` en `buildMetadata`.
- Las 6 canónicas se añaden a `tests/migrated-routes.json` (enforce SEO + exclusión del catch-all).

## Capabilities

### New Capabilities
- `ssg-rendering-institucionales`: render SSG de las páginas institucionales/informativas, con contenido y
  metadatos en el HTML inicial, sin cambiar URLs.

## Impact

- **Depende de** la infraestructura SSG de Fase 1 (`SsgShell`, `JsonLd`, `SrOnlyHeadings`, `seoSchemas`,
  `getPageMeta`). Se apila sobre `fase-2/blog-ssg`; PR Draft **contra `integracion-ssg`**, no `main`.
- **Nuevos:** 6× `app/<slug>/{page.tsx,<Nombre>Client.tsx}`.
- **Modificados:** las 6 vistas (`"use client"` + `renderSeo`), `tests/migrated-routes.json`.
- **NO se toca:** ningún slug, `app/layout.tsx`, `tracking.ts`, `hubspot.ts`, `next.config.js`, ni el
  catch-all (solo lo excluye vía `migrated-routes.json`). P0-1/P0-2/P0-3 intactos.
- **Guardarraíles que deben quedar en verde:** `test:routes` (sin URL a 404/500; redirects de alias
  intactos), `test:seo` (enforce: h1 real + contenido; `noindex` correcto en privacidad), `test:contract`,
  `typecheck`, `next build`.
