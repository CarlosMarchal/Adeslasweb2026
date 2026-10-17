# Auditoría post-migración — SPA → Next.js SSG

> Comparativa **antes (SPA, `ssr:false`, commit `8dcbb20`)** vs **ahora (SSG en producción, `main`)**.
> Datos **medidos** sobre código (git), HTML crudo de producción y el build. Lo que no se pudo medir se indica
> explícitamente (no hay cifras inventadas). Para revisión de **Carlos**.
> Fecha de la auditoría: 8 jun 2026. Producción: `https://adeslas.numero1salud.es`.

---

## 0. Resumen ejecutivo

| Área | Veredicto | Evidencia clave (medida) |
|---|---|---|
| **SEO** | ✅ Mucho mejor | Antes `<body>` vacío (ssr:false); ahora 700–2.142 palabras + h1 real + JSON-LD en HTML crudo, 0 BAILOUT |
| **GEO/AEO** | ✅ Mucho mejor (1 regresión) | Bot sin JS pasa de ~0 a 440–1.633 palabras citables + Product/Article/FAQPage + `llms.txt` + robots admite IA |
| **Código** | ✅ Mejor, "estructural, no saneado" | 70 rutas SSG, borrados catch-all+SPA+legacy; pendiente deuda (deps Vite, `ignoreBuildErrors`, no RSC puro) |
| **WPO** | ✅ Mejor en pintado | TTFB 32–127 ms, FCP/LCP 112–368 ms, CLS 0 (medido). Coste real = JS de hidratación (175–230 KB First Load) |

**La migración cumplió su objetivo P0** (contenido + datos estructurados en el HTML para SEO/GEO; pintado rápido).
Lo pendiente son mejoras de Fase 2 + 2 cosas a arreglar ya (regresión `knowsAbout`/`hasOfferCatalog` y rastro `lovable-tagger`).

---

## 1. SEO — ✅ mejor

**Antes (`8dcbb20`):** el catch-all montaba el SPA con `ssr:false` → Google recibía el `<body>` **vacío**; solo `<title>`/meta/JSON-LD del `<head>` y un `<h1>`/`<h2>` **`sr-only`** (parche documentado en el propio código). Sin contenido ni h1 visible.

**Ahora (producción, HTML crudo):** 70 rutas SSG; el contenido se sirve en el primer byte. Muestreo:

| Señal (HTML crudo) | Antes | Ahora |
|---|---|---|
| `<body>` con contenido | ❌ vacío | ✅ 700–2.142 palabras |
| `<h1>` visible | ❌ solo sr-only | ✅ real y visible |
| `title`/`description`/`canonical` | ✅ (generateMetadata) | ✅ presentes y correctos |
| JSON-LD | ✅ Org+WebSite+Breadcrumb+FAQ | ✅ + **Product/Offer** en planes; 100% parsea |
| `BAILOUT_TO_CLIENT_SIDE_RENDERING` | (SPA) | ✅ 0 |
| Sitemap / robots | sí | ✅ 70 `<loc>`, robots OK |

**Áreas de mejora reales:**
1. **`<h1>` duplicado** en home/contacto: `SrOnlyHeadings` añade un h1 oculto **además** del visible del hero, con textos distintos → señal contradictoria. Homogeneizar a 1 h1 por página.
2. **JSON-LD desigual:** home sin `FAQPage`; índice/artículos de blog sin `Article`/`BlogPosting`/`ItemList`.
3. **`description` cortas** en algunas (Contacto 153, Home 151 chars) frente al objetivo ~160.

---

## 2. GEO / AEO — ✅ mejor (con 1 regresión)

**Antes:** con `ssr:false`, un crawler de IA sin JS veía el cuerpo **vacío** → ~0 prosa citable (solo head/JSON-LD).
**Ahora (HTML crudo, lo que ve un bot sin JS):**

| Página | Palabras visibles | JSON-LD @types |
|---|---|---|
| Home `/` | ~822 | InsuranceAgency+LocalBusiness, WebSite |
| Plan Plena Total | ~760 | Org, WebSite, Breadcrumb, **Product/Offer (83€)**, **FAQPage** |
| Blog (comparativa) | ~1.633 | Org, WebSite, Breadcrumb, **Article**, **FAQPage** |
| Cuadro médico | ~443 | Org, WebSite, Breadcrumb, **FAQPage** |

- `/llms.txt` existe (25 KB, bien estructurado). `robots.txt` admite explícitamente GPTBot, OAI-SearchBot, PerplexityBot, Claude-Web, Applebot-Extended, Google-Extended, anthropic-ai, etc.

**🔴 Regresión real:** la `Organization` en producción **perdió `knowsAbout` (15 temas) y `hasOfferCatalog` (8 ofertas con precio)** que SÍ existían en `8dcbb20`. Recuperarlas es esfuerzo casi nulo y alto impacto para LLMs.

**Áreas de mejora reales:**
1. Restaurar `knowsAbout` + `hasOfferCatalog` (regresión).
2. Home sin `FAQPage` (la entrada de marca debería tener Q&A citables).
3. `sameAs` débil: solo Instagram/Facebook (de la marca) + DGS; faltan LinkedIn/GMB/Wikidata (TODOs del propio código).
4. `/cuadro-medico/` fino (~443 palabras) para una query de alta intención; ampliar + `ItemList` de provincias/especialidades.

---

## 3. Código / arquitectura — ✅ mejor, con deuda pendiente

| Métrica | Antes `8dcbb20` | Ahora | 
|---|---|---|
| Rutas `app/**/page.tsx` | 6 (1 catch-all) | **70 explícitas** |
| Catch-all `[[...slug]]` / `src/App.tsx` / `legacy/` | existen | **borrados** |
| `page.tsx` con `"use client"` | — | **0/70** (todas server) |
| `next.config`: `ignoreBuildErrors` / ESLint `ignoreDuringBuilds` | `true` | `true` (**sin cambio**) |
| Errores `tsc --noEmit` | — | **2** (`Autonomos.tsx`, `PymesEmpresas.tsx`, prop `right`) |
| `package.json` | — | **idéntico** (deps Vite siguen declaradas) |

**Áreas de mejora reales (orden por ROI/dificultad):**
1. **⚠️ P0-3:** `lovable-tagger` sigue en `package.json` → **rastro de herramienta de IA** (revisar frente a la regla P0-3). *(baja)*
2. Eliminar deps **Vite muertas** (`vite`, `vite-react-ssg`, `@vitejs/plugin-react-swc`) — el runtime Vite ya no existe. *(baja)*
3. Arreglar los **2 errores TS** y quitar `ignoreBuildErrors`/`ignoreDuringBuilds`. *(baja TS / media ESLint)*
4. Retirar `react-helmet-async` del path SSG (hoy muerto pero aún en bundle; doble sistema de SEO). *(media)*
5. Borrar vista huérfana `src/views/ContratarPage.tsx`. *(baja)*
6. Plan para retirar `react-router-dom` (lo usa `SsgShell`) y evolucionar islas `"use client"` a **RSC puro**. *(alta)*

---

## 4. WPO — ✅ mejor en pintado; coste en hidratación

**Antes:** `ssr:false` → `<body>` vacío → LCP dependía de descargar+ejecutar el bundle.
**Ahora:** HTML estático desde CDN → pinta de inmediato.

**Sondeo real medido (Playwright, producción, navegador SIN throttling):**

| Página | TTFB | FCP | LCP | CLS |
|---|---|---|---|---|
| Home `/` | 127 ms | 368 ms | 368 ms | **0** |
| Blog (comparativa) | 32 ms | 112 ms | 140 ms | **0** |

- HTML gzip ~14 KB; TTFB excelente (CDN/edge + ISR).
- **First Load JS por ruta (build):** home **175 KB**, planes 179–186 KB, **blog 230 KB** (el más pesado), shared 87,9 KB.
- `framer-motion`: `src/lib/motion.ts` carga el motor **completo** (no `LazyMotion`/`domAnimation`), usado en 29 ficheros.

**Áreas de mejora reales:**
1. `framer-motion` → `LazyMotion + m + domAnimation` (~20–40 KB menos en 29 rutas).
2. **RSC puro** en lo no interactivo (hero, FAQ, texto, blog) → recortar 40–100 KB de First Load JS y bajar TBT.
3. `next/dynamic` para below-the-fold pesado (tarificador, modales, reviews).
4. Investigar los **230 KB del blog** (≈50 KB de más) con bundle-analyzer.

**No medible (honesto):** PageSpeed/Lighthouse oficial → la API de PSI devolvió **429 (cuota diaria)**; sin score de performance ni TBT/INP con throttling. El WPO "antes" no es medible en vivo (el SPA ya no está desplegado). Para cifra oficial: `npx lighthouse <url>` local con throttling, o PSI con API key.

---

## 5. Encabezados (H1) y titles: Excel `revisar_SEO.xlsx` vs producción

**Importante:** la migración **NO cambió los encabezados** (verificado: las vistas solo añadieron `"use client"`/`renderSeo`; el h1 del hero es idéntico al del SPA). Las diferencias con el Excel son **previas** (el Excel es un objetivo del 08/04 que las vistas/`pageMeta` nunca implementaron al 100%). Comparación de las 35 URLs del Excel contra producción en vivo:

- **H1 coincide:** 23/33 · **difiere:** 12 · **Title coincide (inicio):** 24/33 · **difiere:** 11.

### Diferencias de H1 (12)
| URL | Excel | Producción |
|---|---|---|
| `/` | Adeslas Seguros Médicos | Seguros Médicos Adeslas + subtítulo *(orden distinto)* |
| `/seguro-salud/seguro-para-personas-mayores/` | Seguros **Médicos** Adeslas para Personas Mayores | Seguro **de Salud** Adeslas para Personas Mayores |
| `/seguro-salud/empresas/` | …para **Empresas** | …para **Pymes y Empresas** · Beneficio Social · Deducible 100% |
| `/seguro-salud/adeslas-individual/` | Seguro Médico Adeslas Individual | Seguro Médico **Privado** Adeslas Individual |
| `/seguro-salud/seguro-familia/` | …Adeslas **Familiar** | …Adeslas **para Familias** |
| `/seguro-salud/adeslas-infantil/` | Seguro Médico **Infantil** Adeslas | Seguro Médico Adeslas **para Niños** |
| `/seguro-salud/adeslas-ginecologia/` | Adeslas Ginecología | Seguro Médico Adeslas con Ginecología Completa |
| `/seguro-salud/embarazo/` | …para **Embarazadas** | …para **el Embarazo y el Parto** |
| `/adeslas-asistencia-en-viaje/` | Seguro de Asistencia en Viaje Adeslas | Adeslas Asistencia en Viaje Cobertura Mundial sin Permanencia |
| `/adeslas-body-factory/` | Adeslas Body Factory | Seguro Médico Adeslas para Socios Body Factory… |
| `/adeslas-blog/` | Blog Salud Adeslas | Blog **de** Salud Adeslas |
| `/seguro-salud/adeslas-formulario-de-alta/` | Formulario de Alta Adeslas | 🔴 **SIN H1 VISIBLE** |

### Diferencias de Title (11)
| URL | Excel | Producción |
|---|---|---|
| `/` | Adeslas Seguros Médicos \| Salud Privada · +51.000 Médicos · Sin Listas… | Seguros Médicos Adeslas 2026 \| +51.000 Médicos · Desde 21€/mes |
| `/seguro-salud/autonomos/` | Seguro Médico Adeslas para Autónomos \| Deducible IRPF · Sin Copago | Adeslas para Autónomos \| Deducción IRPF hasta 500€ · Sin Copago |
| `/seguro-salud/empresas/` | Adeslas Empresas \| Seguro Médico Colectivo · Sin Copagos… | Adeslas PYMES TOTAL \| Empresas · Dental · 3 Años Sin Subida de Prima |
| `/seguro-salud/seguro-familia/` | Adeslas Seguro Médico Familiar \| Pediatría, Especialistas y Sin Copagos | Adeslas Familiar \| Pediatría · Especialistas · Sin Copagos · Desde 22€ |
| `/seguro-salud/adeslas-infantil/` | Adeslas Seguro Médico Infantil \| Pediatría Sin Esperas… 21€/mes | Seguro Infantil Adeslas \| Pediatría 24h · Sin Esperas · Desde 21€ |
| `/adeslas-asistencia-en-viaje/` | Adeslas Viaje \| Seguro de Asistencia en Viaje desde 8,50€/día… | Adeslas Asistencia en Viaje \| Cobertura Mundial · Desde 8,50€/día |
| `/adeslas-adif-renfe/` | Adeslas ADIF Renfe \| Seguro Médico para Empleados · Precios 2026 | Adeslas ADIF/Renfe \| Seguro Médico para Trabajadores Ferroviarios |
| `/tarificador-interno/` | Tarificador Interno · Adeslas 2026 | Tarificador - Adeslas (Uso Interno) |
| `/contacto/` | Contacto Adeslas \| Solicita tu Seguro Médico — Atención Personalizada | Contacto \| Adeslas — Asesoramiento Gratuito Sin Compromiso |
| `/seguro-salud/ofertas-adeslas-precios/` | Precios y Ofertas Adeslas 2026 \| Seguros Médicos desde 21€/mes | Precios Adeslas 2026 \| Compara Planes · Ahorra · GO desde 21€/mes |
| `/politica-de-privacidad` | Aviso Legal y Política de Privacidad \| Adeslas Seguros Médicos | Política de Privacidad \| adeslas.numero1salud.es |

### URLs del Excel que dan 404 (URL mal escrita en el Excel; la página existe en otra ruta)
- `/seguro-salud/adeslas-extranjeros/` → real: **`/adeslas-extranjeros/`**
- `/adeslasplenavitaloferta/` → real: **`/oferta-plena-vital/`**

---

## 6. Acciones recomendadas (priorizadas)

**🔴 Arreglar ya (rápido, alto valor):**
- Restaurar `knowsAbout` + `hasOfferCatalog` en la Organization (regresión GEO).
- Revisar/quitar `lovable-tagger` de `package.json` (P0-3) + deps Vite muertas.
- Añadir `<h1>` a `/seguro-salud/adeslas-formulario-de-alta/`.
- Corregir las 2 URLs erróneas del Excel.

**🟡 Alinear spec ↔ implementación (decisión de negocio):**
- Decidir qué manda (Excel o producción) y sincronizar los 12 H1 / 11 titles divergentes.
- Homogeneizar a 1 `<h1>` por página (quitar `SrOnlyHeadings` donde ya hay h1 visible).

**🟢 Fase 2 / WPO (mayor esfuerzo):**
- `framer-motion` LazyMotion, RSC puro en islas estáticas, `next/dynamic` below-fold, auditar bundle del blog, retirar react-helmet/react-router, quitar `ignoreBuildErrors` (arreglar 2 errores TS).

---

## 7. Limitaciones de la medición (transparencia)
- **Sin Lighthouse/PSI oficial** (API en 429); el sondeo WPO es de navegador sin throttling → optimista para FCP/LCP, no fiable para TBT/INP.
- **Sin Search Console/analítica:** no se midió tráfico ni posiciones reales, solo HTML/código servido.
- **WPO "antes"** es estructural (desde código), no medición en vivo (el SPA ya no está desplegado).
- Muestreo de páginas representativas + las 35 URLs del Excel; no se recorrieron las 70 del sitemap una a una salvo en el listado de encabezados.

---

*Auditoría elaborada por Juan Carlos Díaz — Convertiam · https://convertiam.com*
