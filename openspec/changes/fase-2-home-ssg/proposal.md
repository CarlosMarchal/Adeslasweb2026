## Why

La home `/` es la página más importante y la última gran página indexable que servía el SPA. Migrarla a SSG
obliga a la cirugía de routing P0: el catch-all opcional `app/[[...slug]]` capturaba `/`, así que no podía
coexistir con un `app/page.tsx`. Esta change convierte el catch-all en obligatorio (`app/[...slug]`, que ya
no captura `/`) y añade `app/page.tsx` para la home, sin retirar aún el SPA (sigue sirviendo los ~20 alias
cortos y las páginas noindex, que son 200 — su teardown es una change posterior).

## What Changes

- `app/page.tsx` (home SSG) + `app/IndexClient.tsx` (SsgShell + `Index` renderSeo={false}).
- `Index`: `"use client"` + `renderSeo`; `useSeo` extraído a hijo `IndexSpaSeo` (no se llama en SSG → evita
  el `BAILOUT_TO_CLIENT_SIDE_RENDERING` del `<Helmet>`).
- **Decisión (usuario):** se mantiene `lazy()` en las secciones below-fold de la home (WPO/TBT). El
  contenido above-fold (hero con `<h1>`, productos) sí va en el HTML inicial; FAQ/Stats/Footer quedan lazy.
- `app/[[...slug]]` → `app/[...slug]` (catch-all obligatorio; deja de capturar `/`). Sigue sirviendo el
  resto vía SPA, sin cambios de comportamiento para esas rutas.
- `/` se añade a `tests/migrated-routes.json` (enforce SEO + queda fuera del `generateStaticParams` del
  catch-all, que ya no genera la raíz).

## Capabilities

### New Capabilities
- `ssg-rendering-home`: render SSG de la home en `/`.

## Impact

- **Routing P0:** la conversión `[[...slug]]→[...slug]` es el único cambio estructural; verificado con
  `test:routes` 184/184 (home + ~20 alias + noindex siguen exactamente igual). Ninguna URL degrada.
- **Nuevos:** `app/page.tsx`, `app/IndexClient.tsx`. **Renombrado:** `app/[[...slug]]`→`app/[...slug]`.
  **Modificados:** `src/views/Index.tsx`, `tests/migrated-routes.json`.
- **NO se toca:** slugs, tracking, hubspot, layout, next.config. P0-1/P0-2/P0-3 intactos.
- **Pendiente (change posterior):** retirar React Router/SPA/legacy + dar ruta SSG a los ~20 alias cortos
  (200 + canonical) y a las noindex (mi-precio, oferta-plena-vital).
