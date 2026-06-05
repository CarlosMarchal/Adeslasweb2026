## 1. Vista

- [x] 1.1 `Index`: `"use client"` + `renderSeo`; `useSeo` extraído a hijo `IndexSpaSeo` (no se llama en SSG).
- [x] 1.2 Mantener `lazy()` en below-fold (decisión usuario: WPO).

## 2. Routing P0

- [x] 2.1 `app/page.tsx` (home) + `app/IndexClient.tsx` (SsgShell + Index renderSeo={false}).
- [x] 2.2 `app/[[...slug]]` → `app/[...slug]` (catch-all obligatorio, deja de capturar `/`).
- [x] 2.3 `/` añadido a `tests/migrated-routes.json` (fuera del generateStaticParams del catch-all + enforce).

## 3. Verificación (en el preview de integración)

- [x] 3.1 `next build` limpio, sin conflicto de rutas; home estática.
- [x] 3.2 `test:routes` 184/184 (home + ~20 alias + noindex intactos) · `test:seo` 72 enforce ·
      `test:contract` 29/29 · `typecheck` sin errores nuevos.
- [x] 3.3 HTML home: BAILOUT=0, h1 visible del hero, canonical `/`, Org/WebSite JSON-LD.
- [ ] 3.4 PR Draft contra `integracion-ssg` (apilado). *(push pendiente)*

## 4. Validación final

- [ ] 4.1 Lockfile + contrato + SEO + tsc + build en verde.
