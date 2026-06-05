<!-- Regularizado bajo la estrategia de integración (ver change estrategia-integracion-ssg):
     [x] = verificado por inspección de artefactos en la rama. Las tareas de ejecución
     (build, tests, Playwright, deploy) se revalidan en el preview de integración antes
     del merge final único a main; por eso quedan sin marcar aquí. -->

## 1. Infraestructura SSG (reutilizable)

- [x] 1.1 `src/components/ssg/SsgShell.tsx`: adaptador react-router (navigator full-page) + PhonePopupProvider.
- [x] 1.2 `ProductPageTemplate.tsx`: `"use client"` + prop `renderSeo` (extraer useSeo a hijo SpaSeo).
- [x] 1.3 `src/lib/seoSchemas.ts`: JSON-LD server-side (Organization/WebSite/Breadcrumb/FAQ/Product).

## 2. Piloto GO

- [x] 2.1 `export const data` en `src/views/AdeslaGo.tsx`.
- [x] 2.2 `app/seguro-salud/adeslas-go/page.tsx` (server: metadata + JSON-LD) + wrapper cliente.
- [ ] 2.3 Build + verificar HTML (h1 real, contenido, sin BAILOUT) + Playwright vs producción. *(revalidar en preview)*

## 3. Replicar a los 7 planes restantes

- [x] 3.1 Plena Vital, Plena Vital Total, Plena Total, Extra 150, Plena Plus, Seniors, Seniors Total.

## 4. Guardarraíles y verificación

- [x] 4.1 Añadir las 8 URLs a `tests/migrated-routes.json`.
- [ ] 4.2 `test:routes` (184/184) + `test:seo` (enforce 8) + `test:contract`. *(revalidar en preview de integración)*
- [ ] 4.3 Playwright: comparación visual de las 8 migradas vs producción. *(revalidar en preview)*
- [ ] 4.4 PR + checklist deploy + crawl:prod. *(PR #2 abierto → ahora Draft contra estrategia de integración; deploy diferido al merge final único)*
