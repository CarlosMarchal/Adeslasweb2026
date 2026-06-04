# Títulos ocultos (sr-only) en las páginas migradas a SSG

> Decisión de producto documentada. Autor/mantenedor: Juan Carlos Díaz — Convertiam.

## Contexto

La web original (SPA) servía el cuerpo vacío y, para no perder señal SEO, el catch-all
(`app/[[...slug]]/page.tsx`) inyectaba en servidor un **`<h1>` y `<h2>` ocultos (`sr-only`)** con texto
rico en keywords, tomados de `PAGE_META.h1` / `PAGE_META.h2`.

Al migrar a Server Components SSG, las páginas ya tienen su **`<h1>` real visible** (el del hero del
`ProductPageTemplate`), por lo que el `h1` oculto deja de ser necesario.

## Decisión

**A petición del cliente, las páginas migradas CONSERVAN el `h1`/`h2` oculto** (mismo texto y mismo
estilo `sr-only` que producción), además del `h1` visible. Se implementa con el componente
`src/components/ssg/SrOnlyHeadings.tsx`, incluido en cada ruta migrada.

- **Aplicado a:** las 11 páginas de la tanda `ProductPageTemplate` restante (dental, decesos,
  decesos-prima-única, mascotas, accidentes, autónomos, pymes, extranjeros, body-factory, adif-renfe,
  asistencia-en-viaje).
- **NO aplicado (aún):** las 8 páginas de plan de la primera tanda (PR de `fase-1/migracion-ssg-prioritarias`)
  solo llevan el `h1` visible. Si se quiere homogeneizar, se puede añadir `SrOnlyHeadings` también allí.

## Implicación conocida (a revisar)

Conservar el `h1` oculto implica **dos `<h1>` en la página** (uno visible del hero + uno oculto con
keywords). HTML5 lo permite y Google lo tolera, pero la práctica recomendada es **un único `<h1>`**.
Mantener ambos preserva exactamente la señal de keyword previa; es un compromiso **deliberado y
reversible**: si en el futuro se decide consolidar, basta con retirar `SrOnlyHeadings` de las rutas y
(opcionalmente) enriquecer el `heroTitle` visible con esas keywords.

El guardarraíl SEO (`scripts/check-seo.mjs`, modo enforce) sigue verde porque detecta el `h1` visible
real; el `h1` oculto adicional no lo afecta.
