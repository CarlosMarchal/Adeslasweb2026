## 1. Infraestructura

- [x] 1.1 `SrOnlyHeadings` (preserva h1/h2 oculto) + `docs/SSG-HIDDEN-HEADINGS.md`.

## 2. Migración de las 11 páginas

- [x] 2.1 `export const data` en las 11 vistas (PymesEmpresas exporta la variante pymes).
- [x] 2.2 Determinar la canónica real de cada una vía `getPageMeta` (verificada contra lockfile).
- [x] 2.3 11× ruta `app/<canónica>/{page.tsx,PlanClient.tsx}` con metadata + JSON-LD + SrOnlyHeadings.
- [x] 2.4 Añadir las 11 URLs a `tests/migrated-routes.json`.

## 3. Verificación

- [ ] 3.1 Build estático de las 11 + sin errores.
- [ ] 3.2 `test:routes` (URLs intactas) + `test:seo` (enforce) + `test:contract`.
- [ ] 3.3 E2E Playwright (contenido + tracking) en una muestra.
- [ ] 3.4 Push (sin merge) + PR.
