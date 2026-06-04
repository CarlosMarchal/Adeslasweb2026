## 1. Preparación y autoría limpia (P0-3)

- [x] 1.1 Crear rama `fase-0/guardrailes-openspec` desde `main`.
- [x] 1.2 Añadir `.vite-react-ssg-temp/` a `.gitignore`.
- [x] 1.3 Añadir `author` (Juan Carlos Díaz) a `package.json`.
- [x] 1.4 Derogar en `CLAUDE.md` la co-autoría IA de commits.

## 2. Metodología OpenSpec

- [x] 2.1 `openspec init` y contexto del proyecto en `config.yaml`.
- [x] 2.2 Crear esta change (`fase-0-guardrailes`) con proposal + tasks.
- [ ] 2.3 Documentar el bucle propose→validar→archive en `docs/SOP-OPENSPEC.md`.

## 3. Runner de tests

- [ ] 3.1 Añadir devDeps (vitest, jsdom, @testing-library/jest-dom, cheerio, husky, lint-staged) + scripts.
- [ ] 3.2 `npm install` y verificar que `vitest run` arranca con el config existente.

## 4. Guardarraíl de analítica (P0-2)

- [ ] 4.1 `tests/tracking-contract.spec.ts`: forma de `generate_lead` + sincronía + hashes hex.
- [ ] 4.2 `tests/handlers-order.spec.ts`: no `await` antes del primer `track*` en handlers de `<form>`.
- [ ] 4.3 `eslint.config.mjs`: lint bloqueante anti-`crypto.subtle` en `src/lib/**`.

## 5. Guardarraíl de URLs (P0-1)

- [ ] 5.1 `scripts/build-lockfile.mjs` → `tests/routes.lockfile.json` (74 URLs + alias + redirects).
- [ ] 5.2 `scripts/crawl-prod.mjs`: cotejo contra producción en vivo.
- [ ] 5.3 `tests/routes.spec.ts`: verificar estados contra el build local; ninguna 404/500.

## 6. Guardarraíl SEO (objetivo SEO/GEO/WPO)

- [ ] 6.1 `tests/seo-snapshot.spec.ts` + `tests/migrated-routes.json` (modo dual baseline/enforce).
- [ ] 6.2 Generar línea base SEO de referencia.

## 7. Despliegue, hooks y CI

- [ ] 7.1 `.husky/pre-commit` (tsc + contrato analítica + lint).
- [ ] 7.2 `.github/workflows/guardrailes.yml` (build + lockfile + SEO en PR).
- [ ] 7.3 `docs/CHECKLIST-DEPLOY.md` (tandas, rollback, post-deploy GTM/GA4/GSC).

## 8. Reorganización legacy y documentación

- [ ] 8.1 Mover ficheros Vite muertos a `legacy/` verificando `next build` + `tsc` en verde.
- [ ] 8.2 Reescribir `CLAUDE.md` con todas las reglas y guardarraíles vigentes.

## 9. Validación (DoD)

- [ ] 9.1 Commit-trampa: `crypto.subtle` y URL en 404 deben FALLAR los guards; revertir.
- [ ] 9.2 Verificación end-to-end: `vitest run` + `next build` + lockfile + SEO en verde.
