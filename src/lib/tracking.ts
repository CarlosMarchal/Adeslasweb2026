/* ─────────────────────────────────────────────
   DataLayer / GTM tracking utilities
   Autor: Juan Carlos Díaz — Convertiam.com
   Consent gestionado externamente por Consentiam.eu vía GTM
───────────────────────────────────────────── */

import { sha256 } from "js-sha256";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
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
}
