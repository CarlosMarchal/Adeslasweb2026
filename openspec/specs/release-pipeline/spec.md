# release-pipeline Specification

## Purpose
TBD - created by archiving change fase-0-guardrailes. Update Purpose after archive.
## Requirements
### Requirement: Hook pre-commit con guards rápidos
El repositorio MUST ejecutar en pre-commit los guards rápidos: `tsc --noEmit` del código Next, el test
de contrato de analítica y el lint anti-`crypto.subtle`/orden de handlers.

#### Scenario: Commit con violación de contrato
- **WHEN** se intenta un commit que rompe el contrato de analítica o introduce `crypto.subtle`
- **THEN** el hook pre-commit falla y el commit no se crea

### Requirement: CI con guards completos
El CI MUST ejecutar en cada PR a `main` los guards completos que requieren build: `next build`, test de
rutas contra el build y snapshots SEO.

#### Scenario: PR que degrada una URL
- **WHEN** un PR hace que una URL del lockfile devuelva 404
- **THEN** el workflow de CI falla y el PR no es mergeable en verde

### Requirement: Despliegue por tandas con rollback
El proceso MUST documentar un despliegue por tandas independientes con checklist post-deploy (lockfile
contra producción, GA4 recibe `generate_lead`, GSC sin nuevos errores) y rollback por tanda.

#### Scenario: Incidencia tras un deploy
- **WHEN** una tanda desplegada presenta una regresión
- **THEN** se revierte solo esa tanda (Vercel rollback / revert del PR) sin afectar al resto

