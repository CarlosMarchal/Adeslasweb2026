## ADDED Requirements

### Requirement: Verificación del HTML de salida por URL indexable
Tras `build`, el guardarraíl MUST parsear el HTML emitido de cada URL indexable y comprobar `title`,
`meta[name=description]`, `link[rel=canonical]` correcto y al menos un bloque JSON-LD válido.

#### Scenario: Página indexable con metadatos completos
- **WHEN** se analiza el HTML de una URL indexable
- **THEN** existen `title` no vacío, `meta description`, `canonical` correcto y ≥1 JSON-LD válido

### Requirement: Modo dual baseline / enforce
El guardarraíl MUST distinguir rutas migradas de no migradas mediante `tests/migrated-routes.json`. Para
las no migradas registra/compara una línea base sin fallar por el parche actual; para las migradas
exige un `<h1>` real visible (no `sr-only`) y contenido real en el HTML.

#### Scenario: Ruta no migrada en modo baseline
- **WHEN** se analiza una ruta ausente de `migrated-routes.json`
- **THEN** se compara contra su snapshot de referencia sin exigir h1 visible

#### Scenario: Ruta migrada en modo enforce
- **WHEN** se analiza una ruta presente en `migrated-routes.json`
- **THEN** debe tener un `<h1>` visible y contenido real (sin `BAILOUT_TO_CLIENT_SIDE_RENDERING` ni `<body>` vacío)
- **AND** si falta el h1 visible o el contenido, el test falla
