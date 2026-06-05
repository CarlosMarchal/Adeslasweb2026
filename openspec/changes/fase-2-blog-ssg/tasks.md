## 1. Infraestructura SEO

- [x] 1.1 `src/lib/seoSchemas.ts`: `buildArticleSchema(post, url)` + `buildBlogFaqSchema(faqItems)` server-side.
- [x] 1.2 Render del cuerpo `ContentBlock[]`: se resuelve vía el client component SSR'd (el HTML inicial lleva
      el contenido, sin BAILOUT); no hizo falta un helper RSC aparte.

## 2. Artículo `/blog/[slug]`

- [x] 2.1 `BlogArticle.tsx`: `"use client"` + prop `slug` (fallback `useParams`) + `renderSeo`; SEO client
      extraído a `BlogSpaSeo`.
- [x] 2.2 `app/blog/[slug]/page.tsx` (server): `generateStaticParams` (36 slugs únicos), `generateMetadata`
      desde `post.seoTitle/seoDescription` (no el fallback genérico), `<JsonLd>` (Org/WebSite/Breadcrumb/
      Article/FAQ). *(SrOnlyHeadings descartado: el artículo ya tiene h1 visible real; el oculto era el
      fallback basura de getPageMeta.)*
- [x] 2.3 `app/blog/[slug]/BlogArticleClient.tsx`: wrapper `"use client"` con `SsgShell` + la vista.

## 3. Hub `/blog`

- [x] 3.1 `BlogSalud.tsx`: `"use client"` + `renderSeo` (SEO extraído a `BlogHubSpaSeo`).
- [x] 3.2 `app/blog/page.tsx` + `app/adeslas-blog/page.tsx` (canónica) + wrapper `BlogHubClient`;
      canónica `/adeslas-blog/` preservada en ambas; constantes en `app/blog/hubSeo.ts`.

## 4. Rutas y guardarraíles

- [x] 4.1 Añadidos hub (2) + 36 posts a `tests/migrated-routes.json` (25 → 63).
- [x] 4.2 Catch-all excluye las nuevas rutas (vía `migrated-routes.json`); build determinista, sin conflicto.
- [x] 4.3 `app/sitemap.ts` (ya emite `/blog/{slug}/`) coherente con las migradas.

## 5. Verificación (en el preview de integración)

- [x] 5.1 `next build` limpio — 106 páginas; `/blog/[slug]` SSG, `/blog` y `/adeslas-blog` estáticas.
- [x] 5.2 `test:routes` 184/184 · `test:seo` 63 enforce · `test:contract` 29/29 · `typecheck` sin errores nuevos.
- [ ] 5.3 Revisado HTML de artículo + hub (contenido real, sin BAILOUT, h1 visible, canonical, JSON-LD).
      Playwright vs producción pendiente.
- [ ] 5.4 PR contra `integracion-ssg` (Draft, #6) — push del código pendiente.

## 6. Validación final (regla `tasks` del config)

- [ ] 6.1 Lockfile + contrato + SEO + tsc + build en verde sobre la rama de integración (tras merge a integración).
