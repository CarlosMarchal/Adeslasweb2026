## 1. Refactor de vistas (use client + renderSeo)

- [x] 1.1 `CuadroMedico`, `Contacto`, `PoliticaPrivacidad`: añadido `"use client"`.
- [x] 1.2 Simples (CuadroMedico/Contacto/PoliticaPrivacidad): `useSeo` extraído a hijo `{Nombre}SpaSeo` +
      prop `renderSeo`; render `{renderSeo && <{Nombre}SpaSeo/>}`. Medianos (ComoContratar/PreciosAdeslas/
      AltaAdeslas): su `useSeo` es inerte (return descartado) → guardado con `typeof window` para no
      construir el `<Helmet>` en SSR.

## 2. Rutas servidor + wrappers cliente

- [x] 2.1 6× `app/<slug>/<Nombre>Client.tsx` (`SsgShell` + vista; renderSeo={false} en las 3 simples).
- [x] 2.2 6× `app/<slug>/page.tsx` (server): `force-static`, `generateMetadata` desde `getPageMeta`,
      `<JsonLd>` (Org/WebSite/Breadcrumb + FAQ en cuadro-medico/como-contratar/precios/alta), `<SrOnlyHeadings>`.
- [x] 2.3 `/politica-de-privacidad/`: `buildMetadata({ noindex: meta.noindex })` → robots noindex confirmado.

## 3. Rutas y guardarraíles

- [x] 3.1 6 canónicas añadidas a `tests/migrated-routes.json` (63 → 69).
- [x] 3.2 Catch-all las excluye vía `migrated-routes.json` (build determinista, 106 págs).

## 4. Verificación (en el preview de integración)

- [x] 4.1 `next build` limpio.
- [x] 4.2 `test:routes` 184/184 · `test:seo` 69 enforce · `test:contract` 29/29 · `typecheck` sin errores nuevos.
- [x] 4.3 HTML de salida: las 6 con BAILOUT=0 + h1 visible; privacidad con robots noindex.
      GOTCHA resuelto: llamar `useSeo` en el render SSG construye un `<Helmet>` que fuerza
      `BAILOUT_TO_CLIENT_SIDE_RENDERING`; hay que NO llamarlo en SSR (extraer a hijo / guardar con `typeof window`).
- [ ] 4.4 PR Draft contra `integracion-ssg`. *(push pendiente)*

## 5. Validación final (regla `tasks` del config)

- [ ] 5.1 Lockfile + contrato + SEO + tsc + build en verde sobre la rama de integración (tras merge a integración).
