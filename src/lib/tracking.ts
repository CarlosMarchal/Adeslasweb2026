/* ─────────────────────────────────────────────
   DataLayer / GTM tracking utilities
   Autor: Juan Carlos Díaz — Convertiam.com
   Consent gestionado externamente por Consentiam.eu vía GTM
───────────────────────────────────────────── */

import { sha256 } from "js-sha256";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    oaiq?: (...args: unknown[]) => void;
  }
}

/* ── Normalización E.164 — convierte cualquier formato de teléfono español
   al estándar internacional +34XXXXXXXXX antes de hashear.
   Requerido por Google Enhanced Conversions para hacer match correcto. ── */
function normalizeE164(phone: string): string {
  let normalized = phone.replace(/[\s\-().]/g, "");
  if (normalized.startsWith("0034")) {
    normalized = "+34" + normalized.slice(4);
  } else if (!normalized.startsWith("+")) {
    normalized = "+34" + normalized;
  }
  return normalized;
}

/* ── SHA-256 sync hash — js-sha256 es JS puro, no depende de crypto.subtle
   (que es async y rechazaba silenciosamente en Safari ITP/extensiones).
   Hashing en <1 ms para un número de teléfono. ── */
function hashPhone(phone: string): string {
  return sha256(normalizeE164(phone));
}

/* ── Generic dataLayer push ── */
function pushEvent(event: string, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/* ── OpenAI (ChatGPT) Ads — conversión de lead ──────────────────────────────
   Dispara el evento "registration_completed" (creado en OpenAI Ads Manager para
   el píxel Adeslas CHATGPT) en el MISMO tick que generate_lead, cuando el usuario
   deja sus datos. Equivale al momento del modal de agradecimiento: la web es un
   SPA y no tiene URL de "gracias" propia. El píxel base se inicializa en
   app/layout.tsx. Síncrono, sin await ni crypto.subtle → respeta P0-2. ──────── */
const OAI_LEAD_EVENT = "registration_completed";

function trackOaiLeadConversion() {
  if (typeof window === "undefined" || typeof window.oaiq !== "function") return;
  const eventId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  // event_id permite deduplicar con eventos de servidor (Conversions API) si se añaden.
  window.oaiq("measure", OAI_LEAD_EVENT, { type: "customer_action" }, { event_id: eventId });
}

/* ── generate_lead: usuario deja su teléfono
   SÍNCRONO — hash calculado en JS puro y push atómico al dataLayer en el
   mismo tick del click. Garantiza entrega del evento antes de cualquier
   re-render, navegación o unmount. ── */
export function trackGenerateLead(phone: string, source: string, hubspotSource?: number) {
  pushEvent("generate_lead", {
    lead_source: source,
    ...(hubspotSource !== undefined && { hubspot_source: hubspotSource }),
    user_data: {
      phone_number: normalizeE164(phone),
      sha256_phone_number: hashPhone(phone),
    },
  });
  trackOaiLeadConversion();
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

/* ── tarificador_submit: envío del calculador de precios (mismo patrón sync que generate_lead) ── */
export function trackTarificadorSubmit(phone: string, source: string, hubspotSource?: number) {
  pushEvent("generate_lead", {
    lead_source: source,
    ...(hubspotSource !== undefined && { hubspot_source: hubspotSource }),
    user_data: {
      phone_number: normalizeE164(phone),
      sha256_phone_number: hashPhone(phone),
    },
  });
  trackOaiLeadConversion();
}
