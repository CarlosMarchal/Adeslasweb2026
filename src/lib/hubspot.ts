/* ─────────────────────────────────────────────
   HubSpot Forms Submissions API
   Portal:  6596944
   Form:    cd3fb712-acc6-42f7-8843-e42f1360c3c4
   Web:     Adeslas · Marchal Aseguradores
───────────────────────────────────────────── */

const PORTAL_ID = "6596944";
const FORM_GUID = "cd3fb712-acc6-42f7-8843-e42f1360c3c4";
const ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`;

/* Source identifier — ADESLAS range 300-399
   301 = Te Llamamos (nav desktop + popup genérico / fallback)
   302 = Tarificador Comparativo
   303 = Adeslas Go
   304 = Adeslas Plena Vital
   305 = Adeslas Plena Total
   306 = Adeslas Extra 150
   307 = Adeslas Plena Plus
   308 = Adeslas Dental
   309 = Adeslas Decesos
   310 = Adeslas Pymes (con copago)
   311 = Adeslas Pymes Plus (sin copago)
   312 = Adeslas Extranjeros
   313 = Adeslas Plena Vital Total
   314 = Adeslas Seniors
   315 = Adeslas Seniors Total
   316 = Adeslas Asistencia en Viaje
   317 = Adeslas Accidentes
   318 = Adeslas Mascotas
   319 = Adeslas Autónomos NEGOCIOS
   320 = Adeslas EMPRESAS / PYMES TOTAL
   321 = Adeslas Body Factory
   322 = Adeslas ADIF Renfe
   323 = Adeslas Decesos Prima Única */
export type HubSpotSource =
  | 301 | 302
  | 303 | 304 | 305 | 306 | 307
  | 308 | 309 | 310 | 311 | 312
  | 313 | 314 | 315 | 316 | 317 | 318
  | 319 | 320 | 321 | 322 | 323;

export interface HubSpotPayload {
  phone?: string;
  firstname?: string;
  email?: string;
  city?: string;
  edad1?: string;
  source: HubSpotSource;
}

/** Lee el gclid/gbraid/wbraid del URL actual o de sessionStorage (guardado al llegar) */
function getGclid(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    // gclid: clicks normales | gbraid: iOS/Safari App Campaigns | wbraid: iOS/Safari web
    return (
      params.get("gclid")  ||
      params.get("gbraid") ||
      params.get("wbraid") ||
      sessionStorage.getItem("hs_gclid") ||
      ""
    );
  } catch {
    return "";
  }
}

/** Guarda el gclid en sessionStorage en cuanto llega el usuario a cualquier página con él */
export function captureGclid() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("gclid") || params.get("gbraid") || params.get("wbraid");
    if (id) sessionStorage.setItem("hs_gclid", id);
  } catch {
    // ignore
  }
}

/**
 * Lee la cookie hubspotutk — imprescindible para que HubSpot vincule el submit
 * con la sesión rastreada y pueda asociar el clic de Google Ads automáticamente.
 * Sin hutk, el contacto se crea "huérfano" y los campos hs_google_click_id
 * y las fuentes de Google Ads no se populan aunque enviemos el gclid.
 */
function getHutk(): string {
  try {
    const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
    return match ? match[1] : "";
  } catch {
    return "";
  }
}

function field(name: string, value: string) {
  return { objectTypeId: "0-1", name, value };
}

function buildFields(payload: HubSpotPayload) {
  const gclid  = getGclid();
  const fields = [
    field("tarificador",    String(payload.source)),
    field("url_campana_ai", window.location.href),
  ];
  if (payload.phone)     fields.push(field("phone",     payload.phone));
  if (payload.firstname) fields.push(field("firstname", payload.firstname));
  if (payload.email)     fields.push(field("email",     payload.email));
  if (payload.city)      fields.push(field("city",      payload.city));
  if (payload.edad1)     fields.push(field("edad1",     payload.edad1));
  // hs_google_click_id: campo estándar de HubSpot para atribución de Google Ads.
  // Funciona correctamente cuando el hutk se incluye en el contexto (el pixel
  // de HubSpot debe estar instalado para que se genere la cookie hubspotutk).
  if (gclid)             fields.push(field("hs_google_click_id", gclid));
  return fields;
}

export async function submitToHubSpot(payload: HubSpotPayload): Promise<void> {
  /**
   * context completo:
   *  - pageName:  título de la página (ya estaba)
   *  - pageUri:   URL completa con gclid/UTMs para que HubSpot registre la fuente
   *  - hutk:      cookie hubspotutk — vincula el submit con la sesión rastreada
   *               y permite que HubSpot asocie el clic de Google Ads internamente
   */
  const hutk = getHutk();
  const context: Record<string, string> = {
    pageName: document.title,
    pageUri:  window.location.href,
  };
  if (hutk) context.hutk = hutk;

  const body = JSON.stringify({ fields: buildFields(payload), context });

  try {
    const res = await fetch(ENDPOINT, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (res.ok) return;

    const err = await res.text();
    console.error("[HubSpot] Submission failed:", res.status, err);
  } catch (e) {
    console.error("[HubSpot] Network error:", e);
  }
}
