<!-- Lista completa de regresiones de la auditoría post-migración, priorizadas. -->

## 1. 🔴 P0-2 · Atribución Google Ads (gclid) — PRIORITARIO

- [x] 1.1 Crear un componente cliente mínimo (p.ej. `GclidCapture`) que llame `captureGclid()` al montar,
      y montarlo una vez en `SsgShell` (o en `app/layout.tsx`) para que corra en cada carga de página.
- [x] 1.2 Confirmar que `getGclid()` recupera de `sessionStorage` y alimenta `hs_google_click_id` en el submit.
- [ ] 1.3 Validar: `test:contract` 29/29 (la forma de `generate_lead` y el orden NO cambian) + GTM Preview /
      GA4 + comprobar en HubSpot que `hs_google_click_id` llega tras navegar desde una landing con `?gclid=`.

## 2. 🔴 Tarificador comercial interno (componente equivocado)

- [x] 2.1 `src/views/TarificadorInterno.tsx`: añadir `"use client"` + quitar el bloque `<Helmet>`.
- [x] 2.2 `app/tarificador-interno/page.tsx` y `app/internal/tarificador/page.tsx`: importar
      `@/views/TarificadorInterno` (el real) en vez de `@/components/TarificadorInterno`.
- [x] 2.3 Verificar en build + Playwright que carga el tarificador completo (catálogo, descuento, PDF).
- [ ] 2.4 Decidir si `/internal/tarificador` (ruta nueva, no existía en el SPA) se mantiene o se retira.

## 3. 🟡 Sticky / CTA

- [ ] 3.1 Sticky móvil: VERIFICADO funcionando en prod (home/plan/blog/contratar). Pendiente: URL/dispositivo
      concreto del usuario si ve la barra caída en algún sitio → entonces investigar esa página.
- [ ] 3.2 `StickyCtaBanner` desktop: decisión del usuario "solo móvil" → NO restaurar (queda anotado).

## 4. 🟡 Datos estructurados

- [ ] 4.1 `autonomos`/`pymes`: decidir si reemitir `Offer` (no con `price:"0"`) o dejar sin Offer (actual, mejora).
- [ ] 4.2 Restaurar `foundingDate`/`description` en el `provider` de `buildProductSchema` (paridad, opcional).
- [ ] 4.3 Pedir al usuario la fuente exacta del Offer con `tudominio.com/producto` (no es de este sitio).

## 5. 🟢 Limpieza / WPO

- [ ] 5.1 Crear `app/not-found.tsx` (404 propio) a partir de `NotFound.tsx`.
- [ ] 5.2 WPO: evaluar volver a `LazyMotion`/`m` en `motion.ts` (~18KB vs ~60KB) — medir TBT antes/después.
- [ ] 5.3 Retirar vistas muertas: `ContratarPage`, `FormularioDeAlta`, `NotFound`, `PlaceholderPage`,
      `views/TarificadorInterno` (tras swap), `components/TarificadorInterno` (simplificado) — verificar imports antes.
- [ ] 5.4 Actualizar `CLAUDE.md` (texto LazyMotion/`m` desactualizado).

## 6. Validación final

- [ ] 6.1 Lockfile + contrato + SEO + tsc + build en verde; PR con tu OK (gclid = P0-2).
