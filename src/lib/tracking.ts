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

/* ── SHA-256 hash (Web Crypto API) — best effort, NO bloquea el push principal ── */
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

/* ── generate_lead: usuario deja su teléfono
   SÍNCRONO — push inmediato al dataLayer. El hash SHA-256 se calcula en
   background (best effort) y se pushea como evento secundario si completa.
   Antes era async con `await sha256(...)` y si crypto.subtle fallaba
   silenciosamente (contexto inseguro, ITP Safari, extensiones) el evento
   principal no llegaba nunca a GTM. ── */
export function trackGenerateLead(phone: string, source: string, hubspotSource?: number) {
  const phoneClean = phone.replace(/\s/g, "");
  pushEvent("generate_lead", {
    lead_source: source,
    ...(hubspotSource !== undefined && { hubspot_source: hubspotSource }),
    user_data: { phone_number: phoneClean },
  });
  // Hash en background — enriquece el tracking pero no bloquea
  if (typeof crypto !== "undefined" && crypto.subtle) {
    sha256(phoneClean)
      .then((hashedPhone) => {
        pushEvent("generate_lead_hashed", {
          lead_source: source,
          user_data: { sha256_phone_number: hashedPhone },
        });
      })
      .catch((err) => console.error("[tracking] sha256 failed:", err));
  }
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

/* ── tarificador_submit: envío del calculador de precios (síncrono, mismo patrón que generate_lead) ── */
export function trackTarificadorSubmit(phone: string, source: string, hubspotSource?: number) {
  const phoneClean = phone.replace(/\s/g, "");
  pushEvent("generate_lead", {
    lead_source: source,
    ...(hubspotSource !== undefined && { hubspot_source: hubspotSource }),
    user_data: { phone_number: phoneClean },
  });
  if (typeof crypto !== "undefined" && crypto.subtle) {
    sha256(phoneClean)
      .then((hashedPhone) => {
        pushEvent("generate_lead_hashed", {
          lead_source: source,
          user_data: { sha256_phone_number: hashedPhone },
        });
      })
      .catch((err) => console.error("[tracking] sha256 failed:", err));
  }
}
