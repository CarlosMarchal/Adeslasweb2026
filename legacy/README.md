# legacy/ — Código heredado de Vite (congelado)

Esta carpeta contiene los ficheros de la versión anterior basada en **Vite + vite-react-ssg**, que ya
**no forman parte del runtime activo**. El runtime activo es **Next.js** (`app/` + el SPA bajo `src/`).

Se conservan aquí, fuera del árbol activo, para no perder referencia mientras se completa la migración
a Next.js 16 SSG. **Pendientes de retirada definitiva en la Fase 2** del `PLAN-MIGRACION-NEXT16.md`.

## Contenido

| Fichero | Qué era |
|---|---|
| `index.html` | Punto de entrada HTML de Vite. |
| `vite.config.ts` | Configuración de Vite (no la usa `next build`). |
| `main.tsx` | Bootstrap del SPA en Vite (antes `src/main.tsx`). Nadie lo importa. |
| `ssg-context.ts` | Contexto de ruta usado por vite-react-ssg (antes `src/ssg-context.ts`). Sin referencias activas. |
| `vite-env.d.ts` | Tipos `vite/client`. El código activo no usa `import.meta.env`. |
| `vite-images.d.ts` | Declaraba módulos de imagen. Redundante bajo Next (`next-env.d.ts` → `next/image-types/global`). |

## Notas

- `legacy/` está excluido de `tsconfig.json` y no lo compila `next build`.
- Los artefactos de build `/.vite-react-ssg-temp/` se han retirado del control de versiones (gitignored);
  son salida generada, no código fuente.
- Las dependencias de Vite en `package.json` (`vite`, `vite-react-ssg`, `lovable-tagger`) se retirarán
  en la Fase 2 junto con esta carpeta.

> No editar ni reactivar nada de aquí sin una propuesta OpenSpec explícita.
