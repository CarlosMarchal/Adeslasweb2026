## ADDED Requirements

### Requirement: Render SSG de las páginas institucionales
El sitio MUST servir las 6 páginas institucionales (`/cuadro-medico/`, `/contacto/`,
`/como-contratar-adeslas/`, `/precios-adeslas/`, `/alta-adeslas/`, `/politica-de-privacidad/`) desde rutas
Next explícitas pre-renderizadas en build, con el contenido en el HTML inicial (sin
`BAILOUT_TO_CLIENT_SIDE_RENDERING`), `title`/`meta description`/`canonical` desde `PAGE_META`, un `<h1>`
real visible, JSON-LD válido y los `<h1>/<h2>` ocultos de `PAGE_META` preservados vía `SrOnlyHeadings`.
MUST conservar la URL exacta actual y los redirects de sus alias.

#### Scenario: HTML inicial con contenido real
- **WHEN** se solicita una de las 6 URLs migradas (p. ej. `/cuadro-medico/`)
- **THEN** el HTML contiene el `<h1>` visible, el contenido de la página y JSON-LD válido, sin `BAILOUT`

#### Scenario: Las URLs y sus redirects no cambian
- **WHEN** se verifica el lockfile contra el build
- **THEN** las 6 canónicas devuelven 200 sin cambio de slug y los alias siguen redirigiendo igual

### Requirement: La página de privacidad permanece noindex
`/politica-de-privacidad/` MUST emitir `robots: noindex` en el HTML inicial, conservando su exclusión de
indexación actual; NO debe entrar en el sitemap como indexable.

#### Scenario: Privacidad no indexable
- **WHEN** se inspeccionan los metadatos de `/politica-de-privacidad/`
- **THEN** la etiqueta robots indica `noindex` y la página no se trata como indexable en los snapshots SEO
