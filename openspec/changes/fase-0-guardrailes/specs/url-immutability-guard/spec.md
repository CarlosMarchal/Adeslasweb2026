## ADDED Requirements

### Requirement: Lockfile de URLs como verdad versionada
El repositorio MUST mantener un `tests/routes.lockfile.json` con cada URL pública (74 canónicas + alias +
redirects WordPress), su estado esperado (`200` o `301`/`308`) y, cuando redirige, su `Location`. El
lockfile se genera de la verdad de código (`pageMeta.ts`, `next.config.js`) y se cota contra producción.

#### Scenario: Generación del lockfile desde el código
- **WHEN** se ejecuta `node scripts/build-lockfile.mjs`
- **THEN** se produce `tests/routes.lockfile.json` con una entrada por cada URL canónica, alias y redirect existentes

#### Scenario: Cotejo contra producción
- **WHEN** se ejecuta `node scripts/crawl-prod.mjs` con salida a internet
- **THEN** se reporta cualquier discrepancia entre el estado real en producción y el lockfile

### Requirement: Ninguna URL puede degradar
El test de rutas MUST exigir que, contra el build local, cada entrada del lockfile devuelva el estado y el
`Location` esperados. Ninguna URL indexada puede pasar a `404`/`500`.

#### Scenario: URL canónica responde 200
- **WHEN** el test solicita una URL canónica del lockfile
- **THEN** la respuesta es `200`

#### Scenario: Alias o legacy redirige a su canónica
- **WHEN** el test solicita un alias o una URL legacy de WordPress
- **THEN** la respuesta es `301`/`308` con el `Location` esperado hacia la canónica

#### Scenario: Una degradación a 404 bloquea
- **WHEN** una URL del lockfile devuelve `404` o `500`
- **THEN** el test falla y el commit/CI queda bloqueado
