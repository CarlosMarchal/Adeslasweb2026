## Why

Asegurados y potenciales clientes de **Adeslas GO** buscan el cuadro médico de su póliza
("cuadro médico adeslas go", "+ provincia"). Tenemos los PDF oficiales "Adeslas BÁSICO · Adeslas GO"
2026 de 42 provincias. Mismo patrón que `/cuadro-medico/seniors/` (PR #25).

## What Changes

- **Nueva URL** `/cuadro-medico/go/` (SSG, `force-static`). No cambia ningún slug existente (P0-1).
  - Hero con `<h1>` real visible, buscador de provincia, 42 descargas PDF, aviso de las 10 provincias
    pendientes (enlace al cuadro general), qué incluye el cuadro, especialidades por provincia
    (`<details>` nativo, texto en el HTML inicial), explicación de cuadro ambulatorio + autorización
    previa, enlaces a `/seguro-salud/adeslas-go/` y `/precios-y-ofertas/`, FAQ visible + `FAQPage`,
    `BreadcrumbList` y `CollectionPage` con los 42 `DigitalDocument`.
- **PDF** en `public/cuadros-medicos/go/` (`cuadro-medico-adeslas-go-<provincia>-2026.pdf`). Heredan
  `X-Robots-Tag: noindex` de `/cuadros-medicos/:file*` (sin tocar `next.config.js`).
- Datos en `src/data/cuadroMedicoGo.ts` (especialidades extraídas del índice de cada PDF);
  meta en `pageMeta.ts`; FAQ en `faqSchemas.ts`.
- `/cuadro-medico/`: segundo bloque de enlace interno (GO) bajo el de Seniors.
- `public/llms.txt`, `tests/migrated-routes.json` y `tests/routes.lockfile.json` (+2 entradas).

## Fuera de alcance / sin cambios

- **Tracking**: ninguna llamada `track*` nueva ni modificada; captación vía `<CtaSection />` (P0-2).
- No se tocan `app/layout.tsx`, `next.config.js`, `vercel.json`, `package.json`, `tracking.ts`, `hubspot.ts`.
