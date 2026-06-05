## 1. Infraestructura SEO

- [ ] 1.1 `src/lib/seoSchemas.ts`: añadir `buildArticleSchema(post, url)` (JSON-LD `Article`/`BlogPosting`
      + `FAQPage` opcional), equivalente al actual de `BlogArticle.tsx` cliente.
- [ ] 1.2 Helper de render server-side de `ContentBlock[]` (paragraph/heading/list/callout/quote/faq) si la
      vista no puede renderizarse directa en RSC.

## 2. Artículo `/blog/[slug]`

- [ ] 2.1 `BlogArticle.tsx`: `"use client"` + prop `slug`/`renderSeo` (obtener post por prop, no solo
      `useParams`); extraer el SEO client a hijo para no duplicarlo en SSG.
- [ ] 2.2 `app/blog/[slug]/page.tsx` (server): `generateStaticParams` (slugs de `blogPosts.ts`),
      `generateMetadata` (PAGE_META + fallback), `<JsonLd>` (Org/WebSite/Breadcrumb/Article/FAQ) +
      `<SrOnlyHeadings>` + wrapper cliente.
- [ ] 2.3 `app/blog/[slug]/BlogArticleClient.tsx`: wrapper `"use client"` con `SsgShell` + la vista.

## 3. Hub `/blog`

- [ ] 3.1 `BlogSalud.tsx`: `"use client"` + `renderSeo`.
- [ ] 3.2 `app/blog/page.tsx` (server) + wrapper cliente; preservar canónica `/adeslas-blog/` y el alias.

## 4. Rutas y guardarraíles

- [ ] 4.1 Añadir hub + posts del blog a `tests/migrated-routes.json`.
- [ ] 4.2 Verificar que el catch-all `app/[[...slug]]/page.tsx` excluye las nuevas rutas (vía
      `migrated-routes.json`) y no hay conflicto de `generateStaticParams`.
- [ ] 4.3 Confirmar `app/sitemap.ts` (ya emite `/blog/{slug}/`) coherente con las migradas.

## 5. Verificación (en el preview de integración)

- [ ] 5.1 `next build` limpio (sin arrastrar react-router a RSC: page NO importa la vista).
- [ ] 5.2 `test:routes` (ninguna URL de blog a 404/500) + `test:seo` (enforce: h1 real + contenido +
      JSON-LD Article) + `test:contract` + `typecheck`.
- [ ] 5.3 Revisar HTML de salida de 2-3 posts (contenido real, sin BAILOUT) + Playwright vs producción.
- [ ] 5.4 PR **contra `integracion-ssg`** (Draft) — no contra `main`.

## 6. Validación final (regla `tasks` del config)

- [ ] 6.1 Lockfile + contrato analítica + snapshots SEO + `tsc` + build en verde sobre la rama de integración.
