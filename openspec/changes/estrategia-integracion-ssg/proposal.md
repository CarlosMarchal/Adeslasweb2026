## Why

El despliegue de la migración cambia de modelo. La línea base de Fase 0 (`release-pipeline`) asumía
**desplegar a producción por tandas independientes con rollback por tanda**. La decisión del mantenedor es
la contraria: **no llevar nada a `main` (producción) hasta que la migración esté 100% completa
(Fase 1 + Fase 2) y verificada**, integrando todo el trabajo en una **rama de integración única** y
testeándolo en su preview de Vercel, para hacer **un solo merge final a `main`**. Así se evita exponer a
producción/GSC estados intermedios mitad-SSG/mitad-SPA.

Esto exige **modificar** el requisito de despliegue de `release-pipeline` y dejar por escrito la nueva
topología (rama de integración + PR Draft de preview + merge único).

## What Changes

- Se adopta una **rama de integración** (`integracion-ssg`) que parte del estado con toda la Fase 1 ya
  apilada; el resto de la migración (Fase 2) se mergea **contra esa rama**, nunca contra `main`.
- Se abre un **PR Draft `integracion-ssg → main`** que aporta una URL de preview de Vercel estable para
  testear la app completa y, por ser Draft, no es mergeable por accidente.
- Los 3 PRs de Fase 1 (#2/#3/#4) que apuntaban a `main` pasan a **Draft** (neutralizados); su código ya
  vive en la rama de integración.
- `main` permanece en Fase 0 hasta el merge final único.

## Capabilities

### Modified Capabilities
- `release-pipeline`: se **modifica** el requisito de despliegue — de "tandas independientes a producción
  con rollback por tanda" a "integración en rama + verificación completa en preview + un único merge a
  producción al 100%". El rollback pasa a ser revertir ese merge / Vercel rollback.

## Impact

- **Proceso/topología git y CI**, no código de producto: no se toca ningún slug, ni `tracking.ts`,
  `hubspot.ts`, `layout.tsx`, `next.config.js`. P0-1/P0-2/P0-3 intactos.
- **Guardarraíles:** siguen corriendo en cada PR contra `integracion-ssg` (CI con build + `test:routes` +
  `test:seo` + `test:contract`). El merge final a `main` exige además la validación manual P0 (GTM
  Preview + GA4 DebugView) sobre el preview.
- **Riesgo:** un único merge grande al final concentra el riesgo en un punto; se mitiga con verificación
  exhaustiva en el preview antes de marcar el PR como Ready, y rollback por revert del merge.
- **Dependencias:** las changes de Fase 2 (blog, retirada de React Router/SPA/sr-only, limpieza legacy) se
  apilan sobre `integracion-ssg`. Esta change no las implementa; solo fija el marco de despliegue.
