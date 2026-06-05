## Why

El blog es el mayor bloque pendiente de la migración: **~38 posts servidos hoy por el SPA** (cuerpo vacío
en el HTML inicial) más el hub de listado. Es contenido editorial puro → el que más se beneficia de SEO y
GEO/AEO (los rastreadores de IA, sin JS, no pueden leer ni citar los artículos hoy). Migrarlo a Server
Components SSG mete el contenido íntegro y el JSON-LD en el HTML inicial **con una sola plantilla**
(`/blog/[slug]`) + el hub, sin cambiar ninguna URL.

Hoy (verificado): artículos en `src/views/BlogArticle.tsx` (usa `useParams`, `useSeo`, JSON-LD `Article`
y `FAQPage` **client-side**), hub en `src/views/BlogSalud.tsx`; rutas `/blog`, `/blog/:slug` y alias
`/adeslas-blog` en `src/App.tsx`; el catch-all `app/[[...slug]]/page.tsx` los sirve como SPA. El contenido
de cada post ya es **estructurado y tipado** (`ContentBlock[]` en `src/data/blogPosts.ts`), lo que permite
renderizarlo en servidor sin parsear HTML/markdown. `app/sitemap.ts` ya emite `/blog/{slug}/`.

## What Changes

- **Nueva ruta dinámica SSG** `app/blog/[slug]/page.tsx` (Server Component): `generateStaticParams` con los
  slugs de `blogPosts.ts`, `generateMetadata` desde `PAGE_META`/fallback, `<JsonLd>` server-side
  (`Organization`/`WebSite`/`BreadcrumbList`/`Article`/`FAQPage`) y `<SrOnlyHeadings>`; monta un wrapper
  cliente con la vista del artículo.
- **Nueva ruta SSG del hub** `app/blog/page.tsx` (listado) con su metadata + JSON-LD + wrapper cliente del
  hub. El alias `/adeslas-blog` mantiene su comportamiento actual (canónica → `/adeslas-blog/`, sin cambio).
- **Refactor mínimo** de `BlogArticle.tsx` y `BlogSalud.tsx` al patrón Fase 1 (`"use client"` + `renderSeo`
  para no duplicar SEO; obtener el post por `slug` vía prop en lugar de solo `useParams`).
- **Render server-side del cuerpo** (`ContentBlock[]`) para que el HTML inicial lleve el texto real (sin
  `BAILOUT_TO_CLIENT_SIDE_RENDERING`).
- **`src/lib/seoSchemas.ts`**: añadir `buildArticleSchema()` (JSON-LD `Article`/`BlogPosting`) server-side,
  equivalente al que hoy genera `BlogArticle.tsx` en cliente.
- **`tests/migrated-routes.json`**: añadir las rutas de blog migradas (hub + posts) para activar enforce SEO
  y la exclusión automática del catch-all.

## Capabilities

### New Capabilities
- `ssg-rendering-blog`: render SSG del hub del blog y de los artículos individuales, con el contenido y el
  JSON-LD en el HTML inicial, sin cambiar URLs.

## Impact

- **Depende de** la infraestructura SSG de Fase 1 (`SsgShell`, `JsonLd`, `SrOnlyHeadings`, `seoSchemas`).
  Se apila sobre `integracion-ssg`; el PR va **contra `integracion-ssg`, no contra `main`**.
- **Nuevos:** `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` + sus wrappers cliente.
- **Modificados:** `src/views/BlogArticle.tsx`, `src/views/BlogSalud.tsx` (use client + renderSeo),
  `src/lib/seoSchemas.ts` (+`buildArticleSchema`), `tests/migrated-routes.json`.
- **NO se toca:** ningún slug (URLs idénticas), `app/layout.tsx`, `src/lib/tracking.ts`, `src/lib/hubspot.ts`,
  `next.config.js`. El catch-all excluye solo las rutas que entren en `migrated-routes.json`. P0-1/P0-2/P0-3
  intactos.
- **Guardarraíles que deben quedar en verde:** `test:routes` (ninguna URL de blog degrada a 404/500),
  `test:seo` (enforce: h1 real + contenido real en HTML + JSON-LD Article válido), `test:contract`,
  `typecheck`, `next build`.
- **Riesgo conocido:** `BlogArticle.tsx` importa `TarificadorProvider` y usa react-router (`Link`,
  `useNavigate`); replicar el patrón Fase 1 (page servidor NO importa la vista; el wrapper cliente sí) para
  no arrastrar `createContext` de react-router a RSC.
