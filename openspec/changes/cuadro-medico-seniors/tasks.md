<!-- Nueva página /cuadro-medico/seniors/ con los cuadros médicos Adeslas Seniors 2026. -->

## 1. Implementación

- [x] 1.1 PDF de 12 provincias en `public/cuadros-medicos/seniors/`.
- [x] 1.2 `src/data/cuadroMedicoSeniors.ts` (provincias, páginas, urgencias generales hospitalarias
      verificadas contra cada PDF, secciones, autorización previa).
- [x] 1.3 `app/cuadro-medico/seniors/` (page + client) y `src/views/CuadroMedicoSeniors.tsx`.
- [x] 1.4 `pageMeta.ts`, `faqSchemas.ts`, `llms.txt`, enlace interno desde `/cuadro-medico/`.
- [x] 1.5 `migrated-routes.json` + `build:lockfile`.

## 2. Verificación (build limpio sobre `main` + cambios)

- [x] 2.1 `npm run test:contract` → 30/30.
- [x] 2.2 `tsc --noEmit` → sin errores nuevos (solo deuda conocida).
- [x] 2.3 `npm run build` → OK, `/cuadro-medico/seniors` estática.
- [x] 2.4 `npm run test:routes` → 190/190 · `npm run test:seo` → verde (73 en enforce).
- [x] 2.5 PDF servido con `X-Robots-Tag: noindex`; Playwright desktop/móvil sin errores de consola ni
      scroll horizontal; buscador filtra (con/sin tildes).

## 3. Validación final

- [ ] 3.1 Revisión humana + PR a `main`.
- [ ] 3.2 Tras deploy: solicitar indexación de `/cuadro-medico/seniors/` en Search Console.
