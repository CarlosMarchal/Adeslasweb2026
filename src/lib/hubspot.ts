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

function getGclid(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    // gclid: clicks normales | gbraid: iOS/Safari App Campaigns | wbraid: iOS/Safari web
    return (
      params.get("gclid") ||
      params.get("gbraid") ||
      params.get("wbraid") ||
      sessionStorage.getItem("hs_gclid") ||
      ""
    );
  } catch {
    return "";
  }
}

export function captureGclid() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("gclid") || params.get("gbraid") || params.get("wbraid");
    if (id) sessionStorage.setItem("hs_gclid", id);
  } catch {
    // ignore
  }
}

function field(name: string, value: string) {
  return { objectTypeId: "0-1", name, value };
}

function buildFields(payload: HubSpotPayload, includeGclid: boolean) {
  const fields = [
    field("tarificador",    String(payload.source)),
    field("url_campana_ai", window.location.href),
  ];
  if (payload.phone)     fields.push(field("phone",     payload.phone));
  if (payload.firstname) fields.push(field("firstname", payload.firstname));
  if (payload.email)     fields.push(field("email",     payload.email));
  if (payload.city)      fields.push(field("city",      payload.city));
  if (payload.edad1)     fields.push(field("edad1",     payload.edad1));
  if (includeGclid) {
    const gclid = getGclid();
    if (gclid) fields.push(field("hs_google_click_id", gclid));
  }
  return fields;
}

export async function submitToHubSpot(payload: HubSpotPayload): Promise<void> {
  const context = { pageName: document.title };
  try {
    // Primer intento: con gclid/gbraid
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: buildFields(payload, true), context }),
    });

    if (res.ok) return;

    const err = await res.text();
    console.warn("[HubSpot] Submission failed (attempt 1):", res.status, err);

    // Reintento sin gclid (hs_google_click_id puede ser read-only vía Forms API)
    const retry = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: buildFields(payload, false), context }),
    });

    if (!retry.ok) {
      const retryErr = await retry.text();
      console.error("[HubSpot] Submission failed (attempt 2):", retry.status, retryErr);
    }
  } catch (e) {
    console.error("[HubSpot] Network error:", e);
  }
}
