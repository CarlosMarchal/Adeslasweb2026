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
    return params.get("gclid") || sessionStorage.getItem("hs_gclid") || "";
  } catch {
    return "";
  }
}

export function captureGclid() {
  try {
    const params = new URLSearchParams(window.location.search);
    const gclid = params.get("gclid");
    if (gclid) sessionStorage.setItem("hs_gclid", gclid);
  } catch {
    // ignore
  }
}

function field(name: string, value: string) {
  return { objectTypeId: "0-1", name, value };
}

export async function submitToHubSpot(payload: HubSpotPayload): Promise<void> {
  try {
    const fields = [
      field("tarificador", String(payload.source)),
      field("url_campana_ai", window.location.href),
    ];

    if (payload.phone)     fields.push(field("phone",     payload.phone));
    if (payload.firstname) fields.push(field("firstname", payload.firstname));
    if (payload.email)     fields.push(field("email",     payload.email));
    if (payload.city)      fields.push(field("city",      payload.city));
    if (payload.edad1)     fields.push(field("edad1",     payload.edad1));

    const gclid = getGclid();
    if (gclid) fields.push(field("hs_google_click_id", gclid));

    const body = {
      fields,
      context: { pageName: document.title },
    };

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("[HubSpot] Submission failed:", res.status, err);
    }
  } catch (e) {
    console.error("[HubSpot] Network error:", e);
  }
}
