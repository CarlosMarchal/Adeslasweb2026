## ADDED Requirements

### Requirement: Render SSG de las páginas por segmento de público
Las 6 páginas basadas en `SegmentPageTemplate` MUST servirse desde rutas Next explícitas en su URL
canónica, con el contenido en el HTML inicial (sin `BAILOUT_TO_CLIENT_SIDE_RENDERING`), un `<h1>` real
visible y JSON-LD server-side, conservando el diseño y sin cambiar la URL. MUST preservar además el
`h1`/`h2` oculto heredado (`SrOnlyHeadings`).

#### Scenario: HTML inicial con contenido real
- **WHEN** se solicita una de las URLs canónicas migradas (p. ej. `/seguro-salud/embarazo/`)
- **THEN** el HTML contiene el `<h1>` visible, el contenido y JSON-LD válido, sin `BAILOUT`

#### Scenario: La URL no cambia
- **WHEN** se verifica el lockfile contra el build
- **THEN** las 6 URLs siguen devolviendo 200 sin cambio de slug
