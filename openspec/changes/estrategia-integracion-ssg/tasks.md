## 1. Rama de integración

- [ ] 1.1 Crear `integracion-ssg` desde el estado con toda la Fase 1 apilada y publicarla en origin.
- [ ] 1.2 Abrir PR Draft `integracion-ssg → main` (preview de Vercel estable para testear la app completa).
- [ ] 1.3 Convertir los PRs #2/#3/#4 (Fase 1) a Draft + comentar que quedan supersedidos y no van a `main`.

## 2. Marco de despliegue

- [ ] 2.1 Dejar por escrito que toda change de Fase 2 mergea contra `integracion-ssg`, nunca contra `main`.
- [ ] 2.2 Regularizar `fase-1-planes-ssg/tasks.md` al estado real verificado.

## 3. Verificación

- [ ] 3.1 `openspec validate estrategia-integracion-ssg` en verde.
- [ ] 3.2 Confirmar que `main` sigue en Fase 0 (ningún commit de migración en `origin/main`).
- [ ] 3.3 Confirmar que el PR a `main` está en Draft (no mergeable por accidente).

## 4. Cierre (al 100%, fuera del alcance inmediato de esta change)

- [ ] 4.1 Checklist completo sobre el preview (build + test:routes + test:seo + test:contract + GTM/GA4).
- [ ] 4.2 Marcar PR `integracion-ssg → main` como Ready y hacer el único merge a producción.
- [ ] 4.3 Post-deploy: `crawl:prod` verde + GSC sin regresiones (48 h).
- [ ] 4.4 Cerrar PRs #2/#3/#4 y archivar todas las changes de la migración.
