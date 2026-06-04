# SOP — Desarrollo dirigido por especificación (OpenSpec)

> Procedimiento operativo para cualquier unidad de trabajo del proyecto Adeslas (migración a
> Next.js 16 SSG). Es el "cómo se trabaja" que acompaña a `PLAN-MIGRACION-NEXT16.md` (el "qué") y a
> `CLAUDE.md` (las reglas duras). Autor/mantenedor: Juan Carlos Díaz — Convertiam.

## Principio

**Una tarea por vez, dirigida por especificación. Nada se toca "a ojo".** Cada cambio nace de una
propuesta, se implementa en rama, se valida contra los guardarraíles y se archiva. Los invariantes
P0 (URLs, tracking, autoría) no son intenciones: son tests que **bloquean el commit**.

## Estructura

```
openspec/
  config.yaml                 # contexto del proyecto + invariantes P0 + reglas por artefacto
  specs/                      # specs vivas (capabilities ya implementadas y archivadas)
  changes/
    <change>/                 # una propuesta activa
      proposal.md             # Why / What Changes / Capabilities / Impact
      tasks.md                # checklist de implementación
      specs/<capability>/spec.md   # deltas: ## ADDED/MODIFIED/REMOVED Requirements + #### Scenario
    archive/                  # changes ya completadas
```

## El bucle por tarea

1. **Proponer.** `openspec new change <nombre>` y redactar `proposal.md` + `tasks.md` + specs delta.
   - `/opsx:propose "idea"` si se trabaja con la integración de comandos.
   - Declarar SIEMPRE qué guardarraíles (URLs, analítica, SEO) deben quedar en verde y el impacto en
     SEO/GEO/WPO y en los invariantes P0.
   - Validar la propuesta: `openspec validate <nombre>` (cada Requirement lleva MUST/SHALL + Scenario).
2. **Revisión humana.** El agente NO auto-aprueba cambios de arquitectura, tracking ni URLs.
3. **Implementar** en rama (`<fase>/<nombre>`). Server Components + SSG. Nunca tocar el contrato de
   tracking salvo que la tarea lo pida explícitamente y con revisión.
4. **Validar** (todo en verde):
   - `npm run test:contract` — contrato de analítica + orden de handlers.
   - `npm run test:routes` — lockfile de URLs contra el build local (ninguna 404/500).
   - `npm run test:seo` — snapshots SEO (baseline/enforce).
   - `npx tsc --noEmit` y `next build` limpios.
5. **PR a `main`** con título que describe el cambio REAL, no la intención. Si toca tracking/GTM/
   HubSpot → prefijo `[PERF-REVIEW]` + validación humana con evidencia (GTM Preview / GA4 DebugView).
   Commits firmados solo por el desarrollador (P0-3), sin co-autoría de IA.
6. **Merge → deploy de la tanda → checklist post-deploy** (`docs/CHECKLIST-DEPLOY.md`) **→ archivar:**
   `openspec archive <nombre>` (mueve la change a `changes/archive/` y consolida las specs).

## Comandos útiles

| Acción | Comando |
|---|---|
| Nueva change | `openspec new change <nombre>` |
| Validar | `openspec validate <nombre>` |
| Ver estado | `openspec status <nombre>` · `openspec list` |
| Mostrar | `openspec show <nombre>` |
| Dashboard | `openspec view` |
| Archivar | `openspec archive <nombre>` |

## Regla de oro

Si un guardarraíl falla, el trabajo **no avanza** hasta arreglar la causa. No se desactiva un test
"para seguir". El rendimiento (WPO) nunca justifica perder eventos de tracking ni romper una URL.
