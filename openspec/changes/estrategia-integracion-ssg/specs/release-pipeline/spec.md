## MODIFIED Requirements

### Requirement: Despliegue por tandas con rollback
El proceso MUST integrar toda la migración (Fase 1 + Fase 2) en una **rama de integración única**
(`integracion-ssg`) y verificarla por completo en su **preview de Vercel** antes de tocar producción. NO
se mergea nada a `main` hasta que la migración esté 100% implementada y testeada. El paso a producción es
**un único merge** de la rama de integración a `main`, precedido del checklist completo (build +
`test:routes` + `test:seo` + `test:contract` en verde, y validación manual GTM Preview + GA4 DebugView).
El rollback MUST ser revertir ese merge (revert del PR / Vercel rollback). Las unidades de trabajo
intermedias se mergean **contra la rama de integración, nunca contra `main`**.

#### Scenario: Intento de merge a producción antes del 100%
- **WHEN** existe trabajo de migración pendiente y se intenta mergear a `main`
- **THEN** el PR a `main` permanece en Draft (no mergeable) hasta que la migración esté completa y el
  preview verificado

#### Scenario: Verificación en preview antes del merge final
- **WHEN** la migración se considera completa en la rama de integración
- **THEN** se ejecuta el checklist completo sobre el preview (build + rutas + SEO + contrato + GTM/GA4) y
  solo si está en verde se marca el PR como Ready y se hace el único merge a `main`

#### Scenario: Incidencia tras el merge final
- **WHEN** el merge único a producción presenta una regresión
- **THEN** se revierte ese merge (revert del PR / Vercel rollback), devolviendo `main` al estado previo
