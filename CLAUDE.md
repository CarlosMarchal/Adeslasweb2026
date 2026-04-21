# CLAUDE.md — Contexto para agentes IA que trabajen en este repo

> **Lee este documento completo antes de tocar nada relacionado con tracking, formularios, GTM, HubSpot o performance (`app/layout.tsx`, `src/lib/tracking.ts`, `src/lib/hubspot.ts`, handlers de `<form>`).**
>
> Autor original: Juan Carlos Díaz — Convertiam.com (`jcarlos@convertiam.com`)
> Co-mantenedor: Carlos Marchal — Marchal Aseguradores
> Producto: web Adeslas para Marchal Aseguradores — `numero1salud.es`

---

## 1. Stack y contexto del proyecto

- **Framework**: Next.js 14 (`app/` router) — NO App Router puro, híbrido con componentes SPA bajo `src/`.
- **Build**: `next build`. Despliegue en Vercel (`vercel.json` → `{"framework": "nextjs"}`).
- **Lenguaje**: TypeScript. El proyecto ignora errores TS en build (`next.config.js`), pero **nunca dependas de eso** — escribe TS correcto.
- **CSS**: Tailwind + CSS puro. `app/globals.css` + `src/App.css`.
- **Formularios**: `react-hook-form` no se usa sistemáticamente; la mayoría de handlers son `useState` + validación manual.

### Archivos heredados de Vite (NO tocar)
- `index.html`, `vite.config.ts`, `src/main.tsx`, `.vite-react-ssg-temp/`. Son de la versión previa. Existen porque no se han limpiado. **El runtime activo es Next.js.** Si ves cambios ahí en un diff, pregunta antes de hacer cualquier modificación.

---

## 2. Tracking — Contrato crítico

### 2.1. Utilidades oficiales (`src/lib/tracking.ts`)

Todas son **síncronas**. Si encuentras una `async`, es un bug: arréglalo.

| Función | Evento dataLayer | Cuándo se dispara |
|---|---|---|
| `trackGenerateLead(phone, source, hubspotSource?)` | `generate_lead` | Usuario deja el teléfono en cualquier formulario |
| `trackTarificadorSubmit(phone, source, hubspotSource?)` | `generate_lead` | Envío del tarificador (alias de `trackGenerateLead`) |
| `trackClickToCallContratacion(location)` | `click_to_call_contratacion` | Click en `tel:917105000` |
| `trackClickToCallAsistencia(location)` | `click_to_call_asistencia` | Click en `tel:919191898` |
| `trackPageView(pathname)` | `page_view` | Cambio de ruta SPA (en `App.tsx`) |

### 2.2. Forma del evento `generate_lead` (contrato con GTM)

```js
{
  event: "generate_lead",
  lead_source: "header_desktop_te_llamamos",  // string identificador de origen
  hubspot_source: 301,                         // number 301-323, opcional
  user_data: {
    phone_number: "666123456",                 // sin espacios, sin +34
    sha256_phone_number: "6359bfed...",        // 64 hex chars (SHA-256 en minúsculas)
  }
}
```

**NO cambies esta estructura** sin coordinación previa con quien mantiene el contenedor GTM (`GTM-M6ZDN42`). Los triggers y tags del contenedor están configurados para leer exactamente estos campos.

### 2.3. Hash sha256

Se hace con **`js-sha256` (síncrono, JS puro)**. **Nunca** vuelvas a usar `crypto.subtle.digest` — es asíncrono y ha provocado 12 días de pérdida de eventos (ver sección 5: Post-mortem).

---

## 3. Reglas duras (no-negociables)

### 3.1. Handlers de formulario — orden correcto

```ts
// ✅ CORRECTO
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;
  // 1. TRACKING SÍNCRONO PRIMERO — antes de cualquier await
  trackGenerateLead(phone, "mi_formulario", 301);
  // 2. Fetch fire-and-forget (no bloquea UI ni tracking)
  submitToHubSpot({...}).catch(e => console.error("[HubSpot]", e));
  // 3. UX
  setSent(true);
};
```

```ts
// ❌ PROHIBIDO — esto rompió el tracking durante 12 días
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await submitToHubSpot({...});  // ← BLOQUEA 500-5000ms
  trackGenerateLead(phone, ...);  // ← puede no ejecutarse nunca
};
```

### 3.2. GTM en `app/layout.tsx` — configuración correcta

```tsx
// ✅ CORRECTO
// En <head>: init inline del array
<script dangerouslySetInnerHTML={{ __html:
  `window.dataLayer=window.dataLayer||[];
   window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`
}} />

// Al final de <body>: loader con afterInteractive simple
<Script id="gtm-loader" strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} />
```

```tsx
// ❌ PROHIBIDO — este patrón rompe tracking en visitas sin interacción
<Script strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
  // IIFE que espera scroll/click/touch/keydown/mousemove
  // con fallback a setTimeout(load, 8000)
`}} />
```

**Razonamiento:** los eventos se encolan en `window.dataLayer` hasta que GTM carga. Si GTM no carga (usuario rebota sin interactuar), los eventos se pierden al cerrar la pestaña. `afterInteractive` es el mínimo aceptable: carga tras hidratación, siempre, independientemente de la interacción.

### 3.3. Nuevos formularios — checklist obligatorio

Cada `<form>` nuevo DEBE:
1. Importar `trackGenerateLead` de `@/lib/tracking`
2. Llamarlo al INICIO del handler (después de validación), antes de cualquier `fetch`
3. Pasar un `lead_source` descriptivo único (snake_case) y el `hubspot_source` (300-399)
4. Añadir la nueva source al enum en `src/lib/hubspot.ts` si no existe

### 3.4. Performance vs telemetría

**Performance NUNCA justifica pérdida de eventos.** Si PageSpeed TBT sube por GTM:
- ❌ NO diferir la carga de `gtm.js`
- ❌ NO mover tracking después de fetches
- ✅ Optimizar tags DENTRO de GTM (triggers en `Window Loaded`, server-side GTM, pausar tags lentos)
- ✅ Si tocas `gtm.js` / `hs-scripts.com`, validar GA4 DebugView 48 h antes/después

---

## 4. Debugging protocol

Si reportan que "no llegan eventos":

1. **DevTools → Console** con la página cargada:
   ```js
   window.dataLayer.filter(e => e.event === 'generate_lead')
   ```
   - Si aparece → el push funciona, problema en GTM (trigger/tag/consent)
   - Si no aparece → problema en el código cliente

2. **GTM Preview mode** apuntando a la URL real:
   - Panel izquierdo muestra TODOS los eventos del dataLayer
   - `gtm.formInteract` aparece automáticamente con cualquier `<form>` → ese evento NO es nuestro, es built-in de GTM
   - Nuestro evento custom es `generate_lead` (o `click_to_call_*`, `page_view`)

3. **Si el push no aparece:**
   - Abrir el handler, buscar `await` antes de `trackGenerateLead` → mover tracking antes
   - Verificar que la función de tracking no sea `async` (sería el bug que nos pasó)
   - Probar sha256: `import { sha256 } from "js-sha256"; sha256("test")` en consola → debe devolver hex

4. **Si el push aparece pero GA4 no lo registra:**
   - Consentiam puede estar bloqueando (revisar `consent_state` en el dataLayer)
   - GTM Preview → ver si el tag dispara
   - Si el tag dispara pero GA4 DebugView no lo ve → problema en el stream de GA4

5. **NUNCA** asumir causa sin validar con evidencia directa del dataLayer.

---

## 5. Post-mortem: Pérdida de eventos 9–21 Abril 2026

### Qué pasó
El commit `1744e9e` (9 Apr, Carlos Marchal + Claude Sonnet 4.6) movió `trackGenerateLead` a DESPUÉS de `await submitToHubSpot` en los 4 handlers principales. Combinado con el hecho de que `trackGenerateLead` era `async` (usaba `await crypto.subtle.digest`), los pushes se perdían silenciosamente cuando el usuario cerraba la pestaña antes de que HubSpot respondiera, o cuando `crypto.subtle` rechazaba (Safari ITP, extensiones de privacidad).

Agravado por commits posteriores del mismo autor:
- `59a85a3` (18 Apr): GTM pasó de `beforeInteractive` a `afterInteractive` — ok, aceptable.
- `bf438ce` (20 Apr): GTM pasó a diferirse hasta primer evento de usuario — **esto fue el problema adicional** en usuarios pasivos.

### Por qué se coló en producción
- El autor priorizó PageSpeed mobile TBT sin validar GA4 post-deploy.
- Claude Sonnet 4.6 co-firmó los commits sin flaggear el impacto en tracking.
- Nadie corrió el protocolo de debugging (sección 4) durante esos 12 días.

### Fixes aplicados (commits correctivos)
- `66f07e2` — Invertir orden: tracking antes de fetch; añadir tracking en FormularioAlta y FormularioContratacion.
- `c8f475e` — `trackGenerateLead` síncrono (primer intento, cambió estructura del dataLayer).
- `d5bd49d` — Usar `js-sha256` sync en lugar de `crypto.subtle`, restaurar estructura original del dataLayer.
- `eb310de` — Añadir `user_data.phone_number` (sin hash) junto al hash.

### Lecciones
1. Código de tracking es código de negocio crítico. Cualquier cambio requiere validación en GTM Preview.
2. `async` + `await crypto.subtle` + llamada sin `await` = pérdida silenciosa garantizada en algún porcentaje de usuarios.
3. Títulos de commit pueden ser engañosos ("await antes de GTM" sonaba positivo, era justo lo que rompió todo).

---

## 6. Fuentes de datos útiles

| Qué | Dónde |
|---|---|
| GTM container | `GTM-M6ZDN42` (declarado en `app/layout.tsx`) |
| HubSpot Portal | `6596944` (declarado en `src/lib/hubspot.ts`) |
| HubSpot Form GUID | `cd3fb712-acc6-42f7-8843-e42f1360c3c4` |
| HubSpot sources (300-399) | Enum en `src/lib/hubspot.ts` |
| Consent management | Consentiam.eu (gestionado vía GTM, NO desde código) |
| GA4 DebugView | Acceso a través de la cuenta de GA del portal |
| Vercel deploys | Auto-deploy desde `main` |

---

## 7. Reglas de commits para agentes IA

1. **Título descriptivo del cambio REAL**, no de la intención. "Mover X antes de Y" ≠ "await antes de X".
2. **Commits de performance tocando tracking/GTM/HubSpot → marcar `[PERF-REVIEW]` en el título** y pedir validación humana explícita antes de merge.
3. **Nunca** `git add -A` ni `git add .` — stagear solo los archivos intencionales para evitar incluir artefactos de build (`.vite-react-ssg-temp/`), secretos o cambios ruidosos de CRLF.
4. El repo tiene ruido crónico de CRLF (Windows line endings). Usa `git diff --ignore-cr-at-eol` para ver cambios reales.
5. Nunca pushear a `main` sin consentimiento explícito — es rama de producción con auto-deploy a Vercel.
6. Co-firmar commits con `Co-Authored-By: Claude <modelo> <noreply@anthropic.com>`.

---

## 8. No hacer sin preguntar

- Modificar `app/layout.tsx` (GTM, HubSpot, preloads)
- Modificar `src/lib/tracking.ts` (utilidades de tracking)
- Modificar `src/lib/hubspot.ts` (submisión y enum de sources)
- Añadir/quitar llamadas a `trackGenerateLead`, `trackTarificadorSubmit`, `trackClickToCall*`, `trackPageView`
- Tocar configuración de Vercel (`vercel.json`, `next.config.js`)
- Modificar el `package.json` (dependencias nuevas sin justificación)
- Borrar archivos `.vite-react-ssg-temp/` o `index.html` (legacy pero no verificado aún)

Ante la duda: preguntar al usuario antes de actuar.
