## 1. Infraestructura SSG (reutilizable)

- [ ] 1.1 `src/components/ssg/SsgShell.tsx`: adaptador react-router (navigator full-page) + PhonePopupProvider.
- [ ] 1.2 `ProductPageTemplate.tsx`: `"use client"` + prop `renderSeo` (extraer useSeo a hijo SpaSeo).
- [ ] 1.3 `src/lib/seoSchemas.ts`: JSON-LD server-side (Organization/WebSite/Breadcrumb/FAQ/Product).

## 2. Piloto GO

- [ ] 2.1 `export const data` en `src/views/AdeslaGo.tsx`.
- [ ] 2.2 `app/seguro-salud/adeslas-go/page.tsx` (server: metadata + JSON-LD) + wrapper cliente.
- [ ] 2.3 Build + verificar HTML (h1 real, contenido, sin BAILOUT) + Playwright vs producción.

## 3. Replicar a los 7 planes restantes

- [ ] 3.1 Plena Vital, Plena Vital Total, Plena Total, Extra 150, Plena Plus, Seniors, Seniors Total.

## 4. Guardarraíles y verificación

- [ ] 4.1 Añadir las 8 URLs a `tests/migrated-routes.json`.
- [ ] 4.2 `test:routes` (184/184) + `test:seo` (enforce 8) + `test:contract`.
- [ ] 4.3 Playwright: comparación visual de las 8 migradas vs producción.
- [ ] 4.4 PR + checklist deploy + crawl:prod.
