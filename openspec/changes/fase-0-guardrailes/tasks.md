## 1. Preparación y autoría limpia (P0-3)

- [x] 1.1 Crear rama `fase-0/guardrailes-openspec` desde `main`.
- [x] 1.2 Añadir `.vite-react-ssg-temp/` a `.gitignore` y retirarlo del control de versiones.
- [x] 1.3 Añadir `author` (Juan Carlos Díaz) a `package.json`.
- [x] 1.4 Derogar en `CLAUDE.md` la co-autoría IA de commits.

## 2. Metodología OpenSpec

- [x] 2.1 `openspec init` y contexto del proyecto en `config.yaml`.
- [x] 2.2 Crear esta change (`fase-0-guardrailes`) con proposal + tasks + specs delta válidas.
- [x] 2.3 Documentar el bucle propose→validar→archive en `docs/SOP-OPENSPEC.md`.

## 3. Runner de tests

- [x] 3.1 Añadir devDeps (vitest, jsdom, @testing-library/jest-dom, cheerio, husky) + scripts.
- [x] 3.2 `npm install` y verificar que `vitest run` arranca (30 tests en verde).

## 4. Guardarraíl de analítica (P0-2)

- [x] 4.1 `tests/tracking-contract.spec.ts`: forma de `generate_lead` + sincronía + hashes hex.
- [x] 4.2 `tests/handlers-order.spec.ts`: no `await` antes del primer `track*` en handlers de `<form>`.
- [x] 4.3 Lint bloqueante anti-`crypto.subtle` en `src/lib/**` implementado como test de escaneo de
      fuente (`tests/source-guards.spec.ts`), en lugar de un plugin ESLint a medida — más robusto y
      sin añadir el stack de ESLint.

## 5. Guardarraíl de URLs (P0-1)

- [x] 5.1 `scripts/build-lockfile.mjs` → `tests/routes.lockfile.json` (184 entradas).
- [x] 5.2 `scripts/crawl-prod.mjs`: cotejo contra producción → 184/184 OK.
- [x] 5.3 `scripts/check-routes.mjs`: verificar estados contra el build local → 184/184 OK.

## 6. Guardarraíl SEO (objetivo SEO/GEO/WPO)

- [x] 6.1 `scripts/check-seo.mjs` + `tests/migrated-routes.json` (modo dual baseline/enforce).
- [x] 6.2 Generar línea base SEO de referencia (`tests/seo-baseline.json`, 69 URLs).

## 7. Despliegue, hooks y CI

- [x] 7.1 `.husky/pre-commit` (contrato de analítica; los guards con build van en CI).
- [x] 7.2 `.github/workflows/guardrailes.yml` (contrato + build + rutas + SEO en PR).
- [x] 7.3 `docs/CHECKLIST-DEPLOY.md` (tandas, rollback, post-deploy GTM/GA4/GSC).

## 8. Reorganización legacy y documentación

- [x] 8.1 Mover ficheros Vite muertos a `legacy/` (verificado: `tsc` y `next build` en verde).
- [x] 8.2 Reescribir `CLAUDE.md` con todas las reglas y guardarraíles (prioridades SEO/WPO).

## 9. Validación (DoD)

- [x] 9.1 Commit-trampa: `crypto.subtle` y destino de redirect equivocado FALLAN los guards; revertido.
- [x] 9.2 Verificación end-to-end: `vitest run` + `next build` + lockfile (local y prod) + SEO en verde.

## Pendiente de revisión humana (no automatizable)

- [ ] R.1 Validación manual GTM Preview + GA4 DebugView del contrato `generate_lead`.
- [ ] R.2 Revisión humana de esta change y merge del PR; después `openspec archive fase-0-guardrailes`.
