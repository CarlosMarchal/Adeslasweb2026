## 1. Rutas SSG de alias (preservan 200)

- [x] 1.1 25 rutas de alias reutilizando client wrappers existentes (metadata+canonical desde getPageMeta).

## 2. Rutas noindex

- [x] 2.1 `/tarificador-interno/` (reusa `@/components/TarificadorInterno`).
- [x] 2.2 `/oferta-plena-vital/` (`LandingPlenaVitalOferta`: use client + renderSeo + SsgShell).
- [x] 2.3 `/mi-precio/[slug]` (`MiPrecio`: use client + slug prop + query params de window.location +
      renderSeo; tracking conservado; generateStaticParams 5 slugs; noindex).

## 3. Teardown

- [x] 3.1 Retirar `app/[...slug]` (catch-all SPA).
- [x] 3.2 Retirar `src/App.tsx` (SPA React Router) y `legacy/` (Vite). React Router se conserva (SsgShell).

## 4. Verificación

- [x] 4.1 `next build` limpio sin el catch-all.
- [x] 4.2 `test:routes` **184/184** (CRÍTICO: ninguna URL a 404 al quitar el SPA) · `test:seo` 72 enforce ·
      `test:contract` 29/29 · `typecheck` sin errores nuevos.
- [ ] 4.3 PR Draft contra `main` (no mergear sin OK + comprobación en preview).

## 5. Validación final

- [ ] 5.1 Lockfile + contrato + SEO + tsc + build en verde (hecho); merge único a producción con tu OK.
