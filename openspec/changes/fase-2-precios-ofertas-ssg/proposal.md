## Why

`PreciosOfertas` es la última página **indexable** que aún sirve el SPA. Se publica en dos URLs canónicas
(`/precios-ofertas/` y `/precios-y-ofertas/`, ambas 200; la canónica real es `/precios-y-ofertas/`). Migrarla
a SSG mete su contenido en el HTML inicial sin cambiar URLs, completando las páginas indexables de Fase 2.

## What Changes

- `app/precios-y-ofertas/page.tsx` (canónica indexable) y `app/precios-ofertas/page.tsx` (200, canónica →
  `/precios-y-ofertas/`), ambas renderizando `PreciosOfertas` vía wrapper cliente `PreciosOfertasClient`.
- `PreciosOfertas`: `"use client"` + `renderSeo`; `useSeo` extraído a hijo `PreciosOfertasSpaSeo` (no se
  llama en SSG → evita el `BAILOUT_TO_CLIENT_SIDE_RENDERING` del `<Helmet>`).
- `tests/migrated-routes.json`: añadir `/precios-ofertas/` y `/precios-y-ofertas/`.
- `/seguro-salud/ofertas-adeslas-precios/` (tercer alias, SEGURO_SALUD_ALIASES) **se deja en el catch-all**
  (sigue 200); se limpia en el cierre del catch-all.

## Capabilities

### New Capabilities
- `ssg-rendering-precios-ofertas`: render SSG de la página de precios y ofertas en sus dos URLs canónicas.

## Impact

- Apilada sobre `fase-2/institucionales-ssg`; PR Draft **contra esa rama**, no `main`.
- **Nuevos:** `app/precios-y-ofertas/{page.tsx,PreciosOfertasClient.tsx}`, `app/precios-ofertas/page.tsx`.
- **Modificados:** `src/views/PreciosOfertas.tsx`, `tests/migrated-routes.json`.
- **NO se toca:** slugs, layout, tracking, hubspot, next.config, catch-all. P0-1/P0-2/P0-3 intactos.
- **Guardarraíles:** `test:routes` (las 3 URLs de precios siguen 200, alias intactos), `test:seo` (enforce:
  h1 real + contenido + canónica `/precios-y-ofertas/`), `test:contract`, `typecheck`, `next build`.
