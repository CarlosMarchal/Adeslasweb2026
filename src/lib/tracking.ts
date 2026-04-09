/* ─────────────────────────────────────────────
   DataLayer / GTM tracking utilities
   Autor: Juan Carlos Díaz — Convertiam.com
   Consent gestionado externamente por Consentiam.eu vía GTM
───────────────────────────────────────────── */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/* ── SHA-256 hash (Web Crypto API) ── */
async function sha256(value: string): Promise<string> {
  const normalized = value.replace(/\s/g, "").toLowerCase();
  const encoded = new TextEncoder().encode(normalized);
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/* ── Generic dataLayer push ── */
function pushEvent(event: string, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/* ── generate_lead: usuario deja su teléfono ── */
export async function trackGenerateLead(phone: string, source: string, hubspotSource?: number) {
  const hashedPhone = await sha256(phone);
  pushEvent("generate_lead", {
    lead_source: source,
    ...(hubspotSource !== undefined && { hubspot_source: hubspotSource }),
    user_data: {
      sha256_phone_number: hashedPhone,
    },
  });
}

/* ── click_to_call_contratacion: clic en 91 710 50 00 ── */
export function trackClickToCallContratacion(location: string) {
  pushEvent("click_to_call_contratacion", {
    phone_number: "917105000",
    click_location: location,
  });
}

/* ── click_to_call_asistencia: clic en 91 919 18 98 ── */
export function trackClickToCallAsistencia(location: string) {
  pushEvent("click_to_call_asistencia", {
    phone_number: "919191898",
    click_location: location,
  });
}

/* ── page_view: SPA virtual pageview en cada cambio de ruta ── */
export function trackPageView(pathname: string) {
  pushEvent("page_view", {
    page_path: pathname,
    page_title: document.title,
    page_location: window.location.href,
  });
}

/* ── tarificador_submit: envío del calculador de precios ── */
export async function trackTarificadorSubmit(phone: string, source: string, hubspotSource?: number) {
  const hashedPhone = await sha256(phone);
  pushEvent("generate_lead", {
    lead_source: source,
    ...(hubspotSource !== undefined && { hubspot_source: hubspotSource }),
    user_data: {
      sha256_phone_number: hashedPhone,
    },
  });
}
