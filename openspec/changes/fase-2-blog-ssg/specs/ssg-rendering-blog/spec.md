## ADDED Requirements

### Requirement: Render SSG de los artículos del blog
Cada artículo del blog (`/blog/<slug>/`) MUST servirse desde una ruta Next dinámica
(`app/blog/[slug]/page.tsx`) pre-renderizada en build (`generateStaticParams` con los slugs de
`blogPosts.ts`), con el **cuerpo del artículo en el HTML inicial** (renderizado server-side desde
`ContentBlock[]`, sin `BAILOUT_TO_CLIENT_SIDE_RENDERING`), `title`/`meta description`/`canonical` correctos,
un `<h1>` visible con el título del post, y JSON-LD `Article` válido (más `FAQPage` si el post tiene bloques
`faq`). MUST preservar la URL exacta actual (`/blog/<slug>/`) y el `h1`/`h2` oculto heredado vía
`SrOnlyHeadings` cuando exista en `PAGE_META`.

#### Scenario: HTML inicial con el contenido del artículo
- **WHEN** se solicita una URL de artículo migrada (p. ej. `/blog/seguro-dental-adeslas-coberturas-precios-2026/`)
- **THEN** el HTML de salida contiene el `<h1>` visible, el texto de los bloques del cuerpo y un bloque
  JSON-LD `Article` válido, sin `BAILOUT_TO_CLIENT_SIDE_RENDERING`

#### Scenario: La URL del artículo no cambia
- **WHEN** se verifica el lockfile contra el build tras migrar
- **THEN** cada `/blog/<slug>/` sigue devolviendo 200 con el mismo slug, sin degradar a 404/500

#### Scenario: Slug inexistente
- **WHEN** se solicita un `/blog/<slug>/` que no existe en `blogPosts.ts`
- **THEN** la respuesta es coherente con la línea base de rutas (no un 500), conforme a `tests/routes.lockfile.json`

### Requirement: Render SSG del hub del blog
El listado del blog (`/blog/` y su alias `/adeslas-blog/`) MUST servirse desde una ruta Next
(`app/blog/page.tsx`) con el listado de posts en el HTML inicial, `title`/`description`/`canonical`
correctos (canónica `/adeslas-blog/`, sin cambio respecto a hoy), un `<h1>` visible y JSON-LD de la
colección/`WebSite`. El alias `/adeslas-blog/` MUST conservar su comportamiento actual.

#### Scenario: Hub con listado en el HTML
- **WHEN** se solicita `/blog/`
- **THEN** el HTML inicial contiene el `<h1>` del blog y las tarjetas de los posts (título + enlace a
  `/blog/<slug>/`), sin depender de JS para mostrarse

#### Scenario: Canónica y alias preservados
- **WHEN** se verifica el SEO del hub
- **THEN** la `canonical` apunta a `/adeslas-blog/` y el alias `/adeslas-blog/` sigue resolviendo igual que
  en la línea base

### Requirement: JSON-LD de artículo generado en servidor
El esquema `Article` (y `FAQPage` si procede) MUST generarse en el Server Component, equivalente al que hoy
produce `BlogArticle.tsx` en cliente, mediante un builder en `src/lib/seoSchemas.ts`
(`buildArticleSchema`). El tracking NO se ve afectado: no se añade ni modifica ninguna llamada a `track*`.

#### Scenario: Artículo con FAQ
- **WHEN** un post tiene bloques `type: "faq"` en su `body`
- **THEN** el HTML inicial incluye tanto el JSON-LD `Article` como un `FAQPage` válido derivado de esos bloques

#### Scenario: El contrato de tracking permanece intacto
- **WHEN** se ejecuta `test:contract` tras la migración del blog
- **THEN** pasa sin cambios (la forma de `generate_lead`, sincronía y orden de handlers no se alteran)
