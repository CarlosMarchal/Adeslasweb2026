## Why

El cliente reportó páginas con problemas de render en producción. La investigación confirmó que
**todas** las páginas estáticas del sitio (≈110 HTML, incluidas las 72 marcadas como migradas en
`tests/migrated-routes.json`) sirven en su HTML inicial un marcador de bailout:

```html
…</footer><!--$!--><template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template><!--/$-->…
```

**Causa raíz** (única, confirmada por experimento diferencial): en `app/layout.tsx` el
`StickyCtaBanner` se monta con `next/dynamic` y `{ ssr: false }` (commit `d8d4bb8`, ya en producción).
`ssr:false` excluye el componente del render de servidor; Next lo envuelve en un límite Suspense y, en el
prerender estático, emite ese `<template>` con el digest de bailout. Al estar en el **root layout**,
aparece en cada página. Es el **único `ssr:false` de todo el repo**.

**Impacto real medido** (acotado, no catastrófico):
- El contenido SEO (h1 visible, coberturas, FAQ, footer) **sí** se sirve server-side en las 72/72. Los
  crawlers de IA reciben el contenido; no hay páginas vacías.
- Pero el marcador `BAILOUT_TO_CLIENT_SIDE_RENDERING` está presente en el HTML de todas → **rompe el
  guardarraíl `test:seo` en modo enforce**, que falla ante cualquier HTML que contenga ese string. El
  guardarraíl que protege precisamente esto queda, por diseño, en rojo.

El `ssr:false` **no es necesario**: el justificante escrito ("depende de window, scroll listener") se
contradice con el código — `StickyCtaBanner` solo accede a `window`/`document` dentro de `useEffect`
(que no corre en servidor) y su estado inicial es `visible=false` (render vacío). Su cadena de imports
(`tracking`, `hubspot`, `framer-motion`, `TermsModal`) no toca el navegador en scope de módulo.

## What Changes

### 🔴 SEO/GEO · Eliminar el bailout global del layout
- `app/layout.tsx`: sustituir el wrapper `dynamic(() => import('@/components/StickyCtaBanner'),
  { ssr: false })` por un **import directo** del componente (ya es `"use client"`):
  ```diff
  - import dynamic from 'next/dynamic';
  - const StickyCtaBanner = dynamic(() => import('@/components/StickyCtaBanner'), { ssr: false });
  + import StickyCtaBanner from '@/components/StickyCtaBanner';
  ```
- **No se toca `StickyCtaBanner.tsx`** ni ningún otro componente. El banner se renderiza en servidor en
  su estado inicial (vacío), se hidrata y sigue apareciendo en desktop (≥1024px) tras scroll > 400px,
  idéntico a hoy.

## Capabilities

### Modified Capabilities
- `ssg-rendering`: se añade el requisito de que **ningún componente global del layout** introduzca
  `BAILOUT_TO_CLIENT_SIDE_RENDERING` en el HTML de las rutas migradas.

## Impact

- **P0-1 (URLs):** ninguna URL cambia de slug; ninguna degrada a 404/500. `test:routes` 184/184 intacto.
- **P0-2 (tracking):** no se toca `tracking.ts`, `hubspot.ts`, el contrato `generate_lead`, el orden de
  handlers ni los `<Script>` de GTM/HubSpot. El `handleSubmit` del banner ya hace `trackGenerateLead`
  síncrono antes del fetch — sin cambios. `test:contract` debe seguir 29/29.
- **P0-3 (autoría):** sin rastro de IA; autor Juan Carlos Díaz.
- **SEO/GEO:** mejora — desaparece el marcador de bailout de las ≈110 páginas estáticas; el contenido
  server-side no cambia. **WPO:** impacto despreciable (el banner en estado inicial renderiza vacío;
  framer-motion ya estaba en el bundle).
- **Verificado** (experimento diferencial sobre `origin/main`, misma máquina, única variable la línea):
  build `exit 0`; HTML con bailout **110 → 1** (el restante es `/contratar`, intencional `noindex`);
  banner sigue en el bundle cliente; navegador real sin errores de hidratación; banner funciona en
  desktop tras scroll.
- **Guardarraíles:** `test:contract`, `test:routes`, `test:seo` deben quedar en verde.
