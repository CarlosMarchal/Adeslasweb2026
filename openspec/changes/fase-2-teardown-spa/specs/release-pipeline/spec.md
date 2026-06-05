## ADDED Requirements

### Requirement: Sitio 100% SSG sin SPA ni catch-all
Tras el teardown, el sitio MUST servir TODAS sus URLs desde rutas Next explícitas (Server Components SSG),
sin SPA de React Router ni catch-all `[...slug]`. Ninguna URL del lockfile puede degradar a 404/500 por la
retirada del SPA. Los alias cortos MUST conservar su estado 200 con `canonical` a su canónica.

#### Scenario: Ninguna URL cae al retirar el catch-all
- **WHEN** se elimina el catch-all y se verifica el lockfile contra el build
- **THEN** las 184 entradas siguen conformes (200 / 301 según corresponda), ninguna a 404/500

#### Scenario: Alias servidos en SSG mantienen 200
- **WHEN** se solicita un alias corto (p. ej. `/adeslas-go/`)
- **THEN** responde 200 con contenido SSG y `canonical` a su canónica, sin depender del SPA
