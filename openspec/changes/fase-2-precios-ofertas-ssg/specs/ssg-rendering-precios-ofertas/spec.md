## ADDED Requirements

### Requirement: Render SSG de precios y ofertas
El sitio MUST servir la página de precios y ofertas desde rutas Next explícitas en sus dos URLs canónicas
(`/precios-ofertas/` y `/precios-y-ofertas/`), con el contenido en el HTML inicial (sin
`BAILOUT_TO_CLIENT_SIDE_RENDERING`), un `<h1>` real visible y JSON-LD válido. Ambas URLs MUST seguir
devolviendo 200 con `canonical` apuntando a `/precios-y-ofertas/`, sin cambiar slugs.

#### Scenario: HTML inicial con contenido y canónica correcta
- **WHEN** se solicita `/precios-y-ofertas/` o `/precios-ofertas/`
- **THEN** el HTML contiene el `<h1>` visible, el contenido y JSON-LD válido, sin `BAILOUT`, y el
  `link rel=canonical` apunta a `/precios-y-ofertas/`

#### Scenario: Las URLs y el tercer alias no degradan
- **WHEN** se verifica el lockfile contra el build
- **THEN** `/precios-ofertas/`, `/precios-y-ofertas/` y `/seguro-salud/ofertas-adeslas-precios/` siguen
  devolviendo 200, sin cambio de slug
