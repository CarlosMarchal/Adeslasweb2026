## Why

Cierre de la migración: el sitio era **híbrido** (páginas migradas en SSG + el resto servido por el SPA de
React Router vía el catch-all `app/[...slug]`). Esta change **retira el andamiaje SPA por completo**, dando
ruta SSG explícita a todo lo que quedaba (los ~25 alias cortos y las páginas noindex), y eliminando el
catch-all, el SPA (`src/App.tsx`) y el legacy Vite. Resultado: **sitio 100% Server Components SSG**.

Decisión del usuario: los ~20 alias cortos se conservan como **200 con ruta SSG** (no 301) para no alterar
el lockfile (P0-1). React Router **se conserva como dependencia** (lo usa `SsgShell`); lo que se retira es
el SPA app + el catch-all + el legacy.

## What Changes

- **25 rutas SSG de alias** (`/adeslas-go/`, `/seguro-medico-individual/`, `/autonomos/`, `/adeslas-dental/`,
  decesos/mascotas/accidentes/viaje, `/seguro-salud/empresas/`, `/seguro-salud/ofertas-adeslas-precios/`…)
  que reutilizan los client wrappers ya existentes; metadata + canonical desde `getPageMeta` (canonical
  apunta a su canónica). Mantienen 200 (lockfile intacto).
- **3 rutas noindex**: `/tarificador-interno/` (reusa `@/components/TarificadorInterno`),
  `/oferta-plena-vital/` (`LandingPlenaVitalOferta`), `/mi-precio/[slug]` (`MiPrecio`, dinámica, 5 slugs).
- **Refactor** de `LandingPlenaVitalOferta` y `MiPrecio`: `"use client"` + `renderSeo` (useSeo extraído a
  hijo, evita BAILOUT). `MiPrecio` además lee los query params de `window.location` (no de react-router,
  que con `SsgShell` daría vacío) y recibe `slug` por prop; **se conserva su tracking** `trackClickToCallContratacion`.
- **Retirados:** `app/[...slug]` (catch-all SPA), `src/App.tsx` (SPA React Router), `legacy/` (Vite).

## Capabilities

### Modified Capabilities
- `release-pipeline`: se añade el estado final — sitio 100% SSG sin SPA ni catch-all.

## Impact

- **P0-1:** ninguna URL cambia ni degrada — `test:routes` 184/184 verificado SIN el catch-all (todas las
  URLs ahora en rutas explícitas). Los alias siguen 200; canónicas intactas.
- **P0-2:** `test:contract` 29/29; no se toca `tracking.ts`/`hubspot.ts`/`layout.tsx`. El tracking de
  `MiPrecio` (`trackClickToCallContratacion`) se conserva.
- **P0-3:** autoría limpia.
- **Nuevos:** ~30 ficheros de ruta. **Modificados:** `MiPrecio`, `LandingPlenaVitalOferta`,
  `migrated-routes.json`. **Borrados:** catch-all, `src/App.tsx`, `legacy/`.
- **React Router**: NO se retira (lo necesita `SsgShell`). Limpieza de deps Vite/react-router queda fuera.
- **Verde:** build, `test:routes` 184/184, `test:seo` 72 enforce, `test:contract` 29/29, `typecheck` sin errores nuevos.
