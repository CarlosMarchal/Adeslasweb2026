# Checklist de despliegue por tandas (Adeslas → Next.js 16)

> Despliegue **por tandas independientes** con rollback seguro. Ante incidencia se revierte solo la
> tanda afectada (Vercel rollback / revert del PR), sin tocar el resto del sitio.
> Protege los invariantes P0 (`PLAN-MIGRACION-NEXT16.md`). Autor: Juan Carlos Díaz — Convertiam.

## Antes de mergear (en la rama / PR)

- [ ] `npm run test:contract` en verde (contrato de analítica P0-2).
- [ ] `npm run build` limpio.
- [ ] `npm run start` + `npm run test:routes` (BASE_URL local) en verde — ninguna URL a 404/500 (P0-1).
- [ ] `npm run test:seo` en verde (title/description/canonical/JSON-LD; enforce en rutas migradas).
- [ ] CI (workflow **Guardarraíles**) en verde.
- [ ] Si el cambio toca formularios, `layout.tsx`, GTM o HubSpot → prefijo de PR `[PERF-REVIEW]` +
      validación humana **GTM Preview** y **GA4 DebugView** (48 h si se toca `gtm.js`/`hs-scripts`).
- [ ] Commits firmados solo por el desarrollador, sin rastro de IA (P0-3).

## Tras el deploy de la tanda

- [ ] `npm run crawl:prod` → **0 críticos** (ninguna URL publicada degradada). Las discrepancias de
      redirección se revisan: si reflejan el estado correcto, se actualiza el lockfile y se versiona.
- [ ] **GA4 DebugView**: dejar un teléfono de prueba en un formulario de las páginas migradas y
      confirmar que llega `generate_lead` con `user_data.phone_number` + `sha256_phone_number`.
- [ ] **GTM Preview** apuntando a la URL real: el evento `generate_lead` dispara su tag.
- [ ] **HubSpot** (portal 6596944): el lead de prueba entra.
- [ ] **Google Search Console**: sin nuevos errores de cobertura en las URLs de la tanda.

## Si hay incidencia

- [ ] **Rollback inmediato de la tanda**: Vercel → *Instant Rollback* al deploy anterior, o `git revert`
      del PR de la tanda. No afecta a las páginas ya migradas en tandas previas.
- [ ] Abrir incidencia, reproducir con el protocolo de debugging del `CLAUDE.md` (§ tracking) y/o el
      lockfile/SEO antes de re-desplegar.

## Notas de redirecciones defensivas (no en el lockfile fetcheable)

Las redirecciones condicionadas por *query string* del `next.config.js` no se incluyen en
`tests/routes.lockfile.json` porque no son URLs publicadas y pueden re-encadenarse al preservarse el
query:

- `/?s=<término>` → `/cuadro-medico/` (buscador WordPress heredado).
- `/cuadro-medico?q={search_term_string}` → `/cuadro-medico/` (URL-plantilla del SearchAction que
  Google indexó). En producción la versión literal con `{}` entra en bucle de redirección al
  preservarse el query; es inalcanzable por usuarios reales. **Candidata a revisión en next.config.js
  (fuera del alcance de Fase 0; requiere propuesta).**
