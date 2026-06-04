## ADDED Requirements

### Requirement: Render server-side de las páginas de plan
Las 8 páginas de planes de salud MUST servirse desde rutas Next explícitas cuyo HTML inicial contiene
el contenido real (no `BAILOUT_TO_CLIENT_SIDE_RENDERING`), un `<h1>` real visible, y JSON-LD
server-side, conservando el diseño actual y sin cambiar la URL.

#### Scenario: HTML inicial con contenido real
- **WHEN** se solicita `/seguro-salud/adeslas-go/` y se inspecciona el HTML de respuesta
- **THEN** contiene el `<h1>` visible, el texto de coberturas/FAQ y al menos un bloque JSON-LD válido
- **AND** no contiene `BAILOUT_TO_CLIENT_SIDE_RENDERING`

#### Scenario: La URL no cambia
- **WHEN** se verifica el lockfile contra el build
- **THEN** las 8 URLs de plan siguen devolviendo 200 sin cambio de slug

### Requirement: Diseño y tracking preservados
La migración MUST conservar el diseño visual (reutilizando los componentes existentes) y el contrato de
tracking (los formularios siguen siendo islas cliente con `trackGenerateLead` síncrono y primero).

#### Scenario: Diseño idéntico a producción
- **WHEN** se compara visualmente la página migrada (local) con la de producción
- **THEN** el diseño es equivalente (mismo shell, hero, secciones y estilos)

#### Scenario: El contrato de analítica sigue verde
- **WHEN** se ejecuta `npm run test:contract`
- **THEN** pasa sin cambios (las utilidades de tracking no se han modificado)
