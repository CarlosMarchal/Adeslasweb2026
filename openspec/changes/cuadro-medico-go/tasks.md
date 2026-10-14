<!-- Nueva página /cuadro-medico/go/ con los cuadros médicos Adeslas GO 2026. -->

## 1. Implementación

- [x] 1.1 PDF de 42 provincias en `public/cuadros-medicos/go/`.
- [x] 1.2 `src/data/cuadroMedicoGo.ts` (provincias, páginas, especialidades, nº de pruebas,
      tratamientos, provincias pendientes, autorización previa).
- [x] 1.3 `app/cuadro-medico/go/` (page + client) y `src/views/CuadroMedicoGo.tsx`.
- [x] 1.4 `pageMeta.ts`, `faqSchemas.ts`, `llms.txt`, enlace interno desde `/cuadro-medico/`.
- [x] 1.5 `migrated-routes.json` + `build:lockfile` (192 entradas).

## 2. Verificación (clon limpio de `main` + cambios)

- [x] 2.1 `npm run test:contract` → 30/30.
- [x] 2.2 `tsc --noEmit` → sin errores nuevos.
- [x] 2.3 `npm run build` → OK, `/cuadro-medico/go` estática.
- [x] 2.4 `npm run test:routes` → verde · `npm run test:seo` → verde (74 en enforce).
- [x] 2.5 PDF con `X-Robots-Tag: noindex`; Playwright desktop/móvil sin scroll horizontal; buscador OK.

## 3. Validación final

- [ ] 3.1 Revisión humana + PR a `main`.
- [ ] 3.2 Tras deploy: solicitar indexación de `/cuadro-medico/go/` en Search Console.
