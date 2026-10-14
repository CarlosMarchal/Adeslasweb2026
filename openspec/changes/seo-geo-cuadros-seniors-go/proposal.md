## Why

Auditoría de contenido (E-E-A-T + preparación para citación por IA) de `/cuadro-medico/seniors/` y
`/cuadro-medico/go/` tras su publicación. Search Console (jul–oct 2026) ya muestra demanda sin página
específica: "adeslas senior cuadro medico" (357 impr., pos. 9), "cuadro medico adeslas senior" (251),
"cuadro medico adeslas go" (139), "cuadro médico adeslas go" (103), "cuadro medico go" (97),
"adeslas basico cuadro medico" (24), además de búsquedas por municipio (Santiago, Vigo, Lugo).

Carencias detectadas: título de ~80 caracteres (sufijo del template), sin fecha ni fuente visibles,
sin bloque de respuesta directa, datos por provincia solo dentro de desplegables, sin pasos de uso,
enlazado interno entre cuadros mínimo, sin cobertura de "Senior" (singular), "Adeslas Básico" ni municipios.

## What Changes

- **Títulos absolutos** (sin sufijo del template): 54 y 49 caracteres. Descripciones con "Adeslas Senior"
  y "Adeslas Básico".
- **Resumen "respuesta primero"** tras las cifras: 4 afirmaciones citables calculadas de los datos +
  fecha de actualización (`<time>`), fuente (SegurCaixa Adeslas) y responsable (Marchal Aseguradores).
- **Tabla de datos clave por provincia** (`<table>` con `caption`/`scope`) con enlace a ancla de cada provincia.
- **Anclas por provincia** (`#urgencias-<slug>`, `#medicos-<slug>`) y línea "Médicos también en:" con
  municipios verificados contra el apartado "Poblaciones" de cada PDF (no exhaustivo).
- **Cómo usar el cuadro en 4 pasos** y **Otros cuadros médicos Adeslas** (enlazado interno general ↔
  Seniors ↔ GO ↔ post del blog). Componentes compartidos en `src/components/cuadro/CuadroSeoBlocks.tsx`.
- **FAQ**: + "¿Cómo pido cita…?" (ambas) y "¿Sirve para Adeslas Básico?" (GO). Visible + `FAQPage`.
- **Schema `CollectionPage`**: `datePublished`, `dateModified`, `publisher`, `isPartOf`, `citation`.

## Sin cambios

URLs (P0-1), tracking (P0-2), `layout.tsx`, `next.config.js`, `seoSchemas.ts`, `package.json`.
