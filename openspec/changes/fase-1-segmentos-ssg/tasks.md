## 1. Adaptación

- [x] 1.1 `SegmentPageTemplate`: `"use client"` + `renderSeo` (extraer useSeo a SpaSeo).
- [x] 1.2 `export const data` en las 6 vistas de segmento.

## 2. Rutas

- [x] 2.1 6× `app/seguro-salud/<slug>/{page.tsx,PlanClient.tsx}` con metadata + JSON-LD + SrOnlyHeadings.
- [x] 2.2 Añadir las 6 URLs a `tests/migrated-routes.json`.

## 3. Verificación

- [x] 3.1 Build estático de las 6 + sin errores.
- [x] 3.2 `test:routes` 184/184 · `test:seo` 25 enforce · `test:contract` 29/29.
- [x] 3.3 Playwright visual (Embarazo) OK.
- [ ] 3.4 Push (sin merge) + PR.
