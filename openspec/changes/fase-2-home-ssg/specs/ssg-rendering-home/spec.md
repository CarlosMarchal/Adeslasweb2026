## ADDED Requirements

### Requirement: Render SSG de la home
El sitio MUST servir la home `/` desde `app/page.tsx` (Server Component) pre-renderizado en build, con el
contenido above-fold (hero con `<h1>` real visible y productos) en el HTML inicial, `title`/`description`/
`canonical` (`/`) desde `PAGE_META`, JSON-LD `Organization`+`WebSite`, sin `BAILOUT_TO_CLIENT_SIDE_RENDERING`.
La home MUST seguir devolviendo 200 sin cambiar su URL.

#### Scenario: HTML inicial de la home con contenido above-fold
- **WHEN** se solicita `/`
- **THEN** el HTML contiene el `<h1>` visible del hero, los productos y JSON-LD válido, sin `BAILOUT`

#### Scenario: El catch-all deja de capturar la raíz
- **WHEN** existe `app/page.tsx` y el catch-all es `app/[...slug]` (obligatorio)
- **THEN** `/` la sirve `app/page.tsx` y el resto de rutas las sigue sirviendo `[...slug]` sin degradar
  ninguna URL del lockfile
