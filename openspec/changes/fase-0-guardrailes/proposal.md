## Why

La web es hoy un híbrido Next.js 14 + SPA React Router que carga en cliente (`ssr:false`): el HTML
inicial llega sin cuerpo y el `<h1>` es `sr-only`. Para migrar a Next.js 16 SSG sin dañar el SEO ya
conseguido ni la captura de leads, primero hay que blindar el repositorio con una batería de tests
que **bloquee** cualquier cambio que viole los invariantes P0. Sin estos guardarraíles en verde no
empieza la migración de páginas. Esta es la Fase 0 del `PLAN-MIGRACION-NEXT16.md`.

## What Changes

- Metodología spec-driven con OpenSpec inicializada y documentada (este propio change la estrena).
- Cuatro grupos de guardarraíles automáticos (URLs inmutables, contrato de analítica, snapshots SEO,
  despliegue por fases) corriendo en hook pre-commit + CI.
- Línea base de URLs (lockfile generado del código + crawl de producción) y de SEO.
- Autoría limpia: `package.json` con autor Juan Carlos Díaz y derogación de la co-autoría IA.
- Reorganización del código heredado de Vite a una carpeta `legacy/` (sin afectar al runtime Next).
- `CLAUDE.md` reescrito con todas las reglas y guardarraíles vigentes.
- No se migran páginas ni se sube la versión de Next en esta change.

## Capabilities

### New Capabilities
- `url-immutability-guard`: lockfile de las 74 URLs canónicas + alias + redirects WordPress y test que
  exige que ninguna degrade a 404/500 y que cada estado (200/301/308) y `Location` se preserve.
- `analytics-contract-guard`: tests que congelan la forma del evento `generate_lead` y la sincronía de
  las utilidades de tracking, más lint bloqueante anti-`crypto.subtle` y anti-`await`-antes-de-`track*`.
- `seo-snapshot-guard`: verificación del HTML de salida (title, description, canonical, JSON-LD, h1 y
  contenido real) en modo dual: baseline para rutas no migradas, enforce para rutas migradas.
- `release-pipeline`: hook pre-commit + workflow de CI + checklist de despliegue por tandas con rollback.

### Modified Capabilities
- (ninguna: no hay specs previas; esta change crea las primeras capabilities)

## Impact

- **Código afectado:** nuevos `tests/`, `scripts/`, `.github/workflows/`, `.husky/`, `eslint.config.mjs`,
  `openspec/`, `docs/`. Modificados `package.json` (autor + devDeps de test + scripts), `CLAUDE.md`,
  `.gitignore`. Reubicación a `legacy/` de los ficheros Vite muertos (`index.html`, `vite.config.ts`,
  `src/main.tsx`, shims y `.vite-react-ssg-temp/`) — solo si `next build` + `tsc` siguen en verde.
- **NO se tocan** (requieren propuesta y permiso explícito): `app/layout.tsx`, `src/lib/tracking.ts`,
  `src/lib/hubspot.ts`, `next.config.js`, `app/[[...slug]]/page.tsx`, ni ningún slug existente.
- **SEO/GEO/WPO:** esta change no modifica el render todavía; deja la línea base y los tests que
  garantizan que la migración posterior mejore SEO/GEO/WPO sin regresiones.
- **Invariantes P0:** los tres quedan protegidos por tests que bloquean el commit.
- **Dependencias nuevas (devDependencies):** vitest, jsdom, @testing-library/jest-dom, cheerio,
  husky, lint-staged. Justificadas por la §6 del plan.
