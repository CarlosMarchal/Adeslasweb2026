## ADDED Requirements

### Requirement: Ningún componente global del layout introduce bailout a cliente
El HTML inicial (server-rendered) de las rutas migradas (`tests/migrated-routes.json`) MUST estar libre
de `BAILOUT_TO_CLIENT_SIDE_RENDERING`. En consecuencia, **ningún componente montado en `app/layout.tsx`**
(que se renderiza en todas las páginas) puede usar `next/dynamic` con `{ ssr: false }` ni ninguna otra
construcción que excluya su subárbol del render de servidor, porque eso inyecta el marcador de bailout en
el HTML de todas las rutas estáticas.

Los componentes de UI que solo aparecen tras interacción del cliente (p. ej. un banner sticky que se
muestra al hacer scroll) MUST renderizarse en servidor en su **estado inicial** (vacío/oculto) como
componentes cliente normales (`"use client"`), accediendo a APIs de navegador (`window`/`document`) solo
dentro de `useEffect`, nunca durante el render.

#### Scenario: el layout no inyecta bailout en las rutas migradas
- **WHEN** se construye el sitio y se inspecciona el HTML inicial de cualquier ruta de
  `tests/migrated-routes.json`
- **THEN** el HTML no contiene `BAILOUT_TO_CLIENT_SIDE_RENDERING`
- **AND** `test:seo` (modo enforce) pasa en verde para las 72 rutas

#### Scenario: el banner sticky sigue funcionando sin ssr:false
- **WHEN** un usuario en desktop (≥1024px) hace scroll más de 400px en una página de producto
- **THEN** el `StickyCtaBanner` aparece y es interactivo (envía lead vía `trackGenerateLead` síncrono +
  HubSpot fire-and-forget), sin que su render inicial en servidor genere marcador de bailout ni error de
  hidratación

#### Scenario: la excepción intencional documentada
- **WHEN** se inspecciona `/contratar` (página `noindex` que usa `useSearchParams` dentro de `<Suspense>`)
- **THEN** se acepta su bailout localizado por diseño; queda fuera de `tests/migrated-routes.json` y no
  cuenta como regresión
