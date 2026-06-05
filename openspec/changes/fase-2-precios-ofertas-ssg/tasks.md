## 1. Vista

- [x] 1.1 `PreciosOfertas`: `"use client"` + `renderSeo`; `useSeo` extraído a hijo `PreciosOfertasSpaSeo`
      (no se llama en SSG). `PreciosOfertasInner` recibe `renderSeo`; el wrapper lo propaga.

## 2. Rutas servidor + wrapper cliente

- [x] 2.1 `app/precios-y-ofertas/PreciosOfertasClient.tsx` (SsgShell + vista renderSeo={false}).
- [x] 2.2 `app/precios-y-ofertas/page.tsx` (canónica indexable) + `app/precios-ofertas/page.tsx`
      (canónica → /precios-y-ofertas/), ambas con metadata + JsonLd (incl. FAQ) + SrOnlyHeadings.

## 3. Rutas y guardarraíles

- [x] 3.1 Añadir `/precios-ofertas/` y `/precios-y-ofertas/` a `tests/migrated-routes.json`.
- [ ] 3.2 Verificar que `/seguro-salud/ofertas-adeslas-precios/` sigue 200 (catch-all, no migrada).

## 4. Verificación (en el preview de integración)

- [ ] 4.1 `next build` limpio.
- [ ] 4.2 `test:routes` (3 URLs de precios 200) · `test:seo` (enforce + canónica) · `test:contract` · `typecheck`.
- [ ] 4.3 HTML de salida (contenido, h1 visible, sin BAILOUT, canonical /precios-y-ofertas/).
- [ ] 4.4 PR Draft contra `integracion-ssg` (apilado sobre institucionales).

## 5. Validación final

- [ ] 5.1 Lockfile + contrato + SEO + tsc + build en verde.
