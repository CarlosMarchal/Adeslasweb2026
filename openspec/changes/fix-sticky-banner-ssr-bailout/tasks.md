<!-- Fix del bailout global introducido por StickyCtaBanner con dynamic(ssr:false) en el root layout. -->

## 1. 🔴 Eliminar el bailout del layout

- [x] 1.1 `app/layout.tsx`: quitar `import dynamic from 'next/dynamic'` y el wrapper
      `const StickyCtaBanner = dynamic(..., { ssr: false })`; importar `StickyCtaBanner` directamente.
- [x] 1.2 Actualizar el comentario del banner para reflejar por qué NO necesita `ssr:false`.
- [x] 1.3 No tocar `StickyCtaBanner.tsx` ni su cadena de imports (verificado SSR-safe: accesos a
      window/document solo en `useEffect`; estado inicial `visible=false`).

## 2. Verificación

- [x] 2.1 Experimento diferencial sobre `origin/main` (worktrees aislados): build A (sin fix) = 110 HTML
      con bailout; build B (con fix) = 1 (`/contratar`, intencional). Build B `exit 0` (no rompe SSR).
- [x] 2.2 Navegador real (Playwright) sobre el build con fix: 0 errores de hidratación; el banner aparece
      en desktop (1366px) tras scroll > 400px con `display:flex` y `padding-bottom:100px`.
- [ ] 2.3 Sobre esta rama: `npm run build` + `npm run test:seo` (enforce 72) + `npm run test:routes`
      (184/184) + `npm run test:contract` (29/29) en verde.

## 3. Validación final

- [ ] 3.1 Lockfile + contrato + SEO + tsc + build en verde; PR a `main` con OK del mantenedor.
- [ ] 3.2 Tras merge: confirmar en el preview de Vercel que el HTML de producción ya no contiene
      `BAILOUT_TO_CLIENT_SIDE_RENDERING` (salvo `/contratar`).
