## ADDED Requirements

### Requirement: Render SSG de las 11 páginas restantes de ProductPageTemplate
Las 11 páginas de otros seguros y colectivos basadas en `ProductPageTemplate` MUST servirse desde rutas
Next explícitas en su URL canónica real, con el contenido en el HTML inicial (sin
`BAILOUT_TO_CLIENT_SIDE_RENDERING`), un `<h1>` real visible y JSON-LD server-side, conservando el
diseño y sin cambiar la URL.

#### Scenario: HTML inicial con contenido real
- **WHEN** se solicita una de las URLs canónicas migradas (p. ej. `/seguro-dental/`)
- **THEN** el HTML contiene el `<h1>` visible, el contenido de la página y JSON-LD válido, sin `BAILOUT`

#### Scenario: La URL no cambia
- **WHEN** se verifica el lockfile contra el build
- **THEN** las URLs canónicas migradas siguen devolviendo 200 sin cambio de slug

### Requirement: Preservación de los títulos ocultos heredados
Estas páginas MUST preservar el `h1`/`h2` oculto (`sr-only`) que servía producción (texto de
`PAGE_META`), además del `h1` visible del hero, mediante el componente `SrOnlyHeadings`. La decisión y
su compromiso (doble `h1`) quedan documentados en `docs/SSG-HIDDEN-HEADINGS.md`.

#### Scenario: Título oculto presente
- **WHEN** se inspecciona el HTML de una página migrada de esta tanda
- **THEN** existe un `h1` `sr-only` con el texto de `PAGE_META.h1` además del `h1` visible
