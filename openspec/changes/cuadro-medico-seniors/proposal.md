## Why

Los asegurados y potenciales clientes de **Adeslas Seniors** (mayores de 55) buscan el cuadro médico
específico de su póliza ("cuadro médico adeslas seniors", "+ provincia"). Hoy la web solo ofrece el
cuadro general en `/cuadro-medico/`. Tenemos los PDF oficiales "Adeslas SENIORS · Cuadro Médico
General 2026" de 12 provincias.

## What Changes

- **Nueva URL** `/cuadro-medico/seniors/` (SSG, `force-static`). No cambia ningún slug existente (P0-1).
  - Hero con `<h1>` real visible, buscador de provincia, 12 descargas PDF, qué incluye el cuadro,
    hospitales con urgencias generales por provincia (`<details>` nativo, texto en el HTML inicial),
    servicios con autorización previa, enlaces internos a `/seguro-salud/adeslas-seniors/` y
    `/seguro-salud/seguro-para-personas-mayores/`, FAQ visible + `FAQPage`, `BreadcrumbList`
    y `CollectionPage` con los 12 `DigitalDocument`.
- **PDF** en `public/cuadros-medicos/seniors/` con nombres sin espacios/tildes
  (`cuadro-medico-adeslas-seniors-<provincia>-2026.pdf`). Heredan `X-Robots-Tag: noindex` de la regla
  existente `/cuadros-medicos/:file*` (sin tocar `next.config.js`).
- Datos en `src/data/cuadroMedicoSeniors.ts`; meta en `pageMeta.ts`; FAQ en `faqSchemas.ts`.
- `/cuadro-medico/`: bloque de enlace interno a la nueva página.
- `public/llms.txt`: alta de la URL (GEO).
- `tests/migrated-routes.json`: la ruta entra en modo *enforce* SEO.
- `tests/routes.lockfile.json` regenerado con `build:lockfile` (añade la nueva ruta y 4 posts del blog
  que ya estaban en `blogPosts.ts` pero faltaban en el lockfile).

## Fuera de alcance / sin cambios

- **Tracking**: no se añade ni modifica ninguna llamada `track*`; la captación usa `<CtaSection />`
  tal cual (P0-2). No hay enlaces `tel:` nuevos.
- No se tocan `app/layout.tsx`, `next.config.js`, `vercel.json`, `package.json`, `tracking.ts`, `hubspot.ts`.
