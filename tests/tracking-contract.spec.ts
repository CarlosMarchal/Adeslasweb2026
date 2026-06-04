/**
 * Guardarraíl P0-2 — Contrato del evento de tracking (forma + sincronía).
 *
 * Congela la forma EXACTA que los triggers/tags del contenedor GTM-M6ZDN42 leen
 * del dataLayer. Si alguien cambia la estructura de `generate_lead` o convierte
 * una utilidad de tracking en asíncrona, este test falla y bloquea el cambio.
 *
 * Contexto: en abril de 2026 un cambio que volvió el tracking asíncrono
 * (crypto.subtle) + lo movió tras un await causó 12 días de pérdida de leads.
 */
import { describe, it, expect, beforeEach } from "vitest";
import { sha256 } from "js-sha256";
import {
  trackGenerateLead,
  trackTarificadorSubmit,
  trackClickToCallContratacion,
  trackClickToCallAsistencia,
  trackPageView,
} from "@/lib/tracking";

const HEX64 = /^[0-9a-f]{64}$/;

function dataLayer(): Record<string, unknown>[] {
  return (window.dataLayer = window.dataLayer || []);
}
function lastEvent(): Record<string, unknown> {
  const dl = dataLayer();
  return dl[dl.length - 1];
}

beforeEach(() => {
  window.dataLayer = [];
});

describe("generate_lead — forma exacta del contrato GTM", () => {
  it("trackGenerateLead empuja la estructura esperada", () => {
    trackGenerateLead("666 123 456", "header_desktop_te_llamamos", 301);
    const e = lastEvent();

    expect(e.event).toBe("generate_lead");
    expect(e.lead_source).toBe("header_desktop_te_llamamos");
    expect(e.hubspot_source).toBe(301);

    const ud = e.user_data as Record<string, string>;
    expect(ud.phone_number).toBe("666123456"); // sin espacios, sin +34
    expect(ud.sha256_phone_number).toMatch(HEX64);
    expect(ud.sha256_phone_number).toBe(sha256("666123456"));
  });

  it("omite hubspot_source cuando no se pasa", () => {
    trackGenerateLead("666123456", "formulario_alta_completo");
    const e = lastEvent();
    expect(e.event).toBe("generate_lead");
    expect("hubspot_source" in e).toBe(false);
  });

  it("hubspot_source, si está, es number en el rango 300-399", () => {
    trackGenerateLead("666123456", "x", 323);
    const e = lastEvent();
    expect(typeof e.hubspot_source).toBe("number");
    expect(e.hubspot_source as number).toBeGreaterThanOrEqual(300);
    expect(e.hubspot_source as number).toBeLessThanOrEqual(399);
  });

  it("trackTarificadorSubmit emite también generate_lead con la misma forma", () => {
    trackTarificadorSubmit("+34666123456", "tarificador_pymes_320", 320);
    const e = lastEvent();
    expect(e.event).toBe("generate_lead");
    expect(e.lead_source).toBe("tarificador_pymes_320");
    expect(e.hubspot_source).toBe(320);
    const ud = e.user_data as Record<string, string>;
    expect(ud.sha256_phone_number).toMatch(HEX64);
  });
});

describe("click_to_call — teléfonos correctos", () => {
  it("contratación usa 917105000", () => {
    trackClickToCallContratacion("footer");
    const e = lastEvent();
    expect(e.event).toBe("click_to_call_contratacion");
    expect(e.phone_number).toBe("917105000");
    expect(e.click_location).toBe("footer");
  });

  it("asistencia usa 919191898", () => {
    trackClickToCallAsistencia("footer");
    const e = lastEvent();
    expect(e.event).toBe("click_to_call_asistencia");
    expect(e.phone_number).toBe("919191898");
  });
});

describe("page_view", () => {
  it("emite page_view con page_path", () => {
    trackPageView("/seguro-salud/adeslas-go/");
    const e = lastEvent();
    expect(e.event).toBe("page_view");
    expect(e.page_path).toBe("/seguro-salud/adeslas-go/");
  });
});

describe("sincronía — ninguna utilidad devuelve Promise (P0-2)", () => {
  it("el hash sha256 es síncrono (string, no Promise)", () => {
    const r = sha256("666123456");
    expect(typeof r).toBe("string");
    expect(r).not.toBeInstanceOf(Promise);
  });

  it("trackGenerateLead no devuelve Promise", () => {
    const r = trackGenerateLead("666123456", "x", 301) as unknown;
    expect(r).not.toBeInstanceOf(Promise);
    expect(r).toBeUndefined();
  });

  it("trackTarificadorSubmit no devuelve Promise", () => {
    const r = trackTarificadorSubmit("666123456", "x", 320) as unknown;
    expect(r).not.toBeInstanceOf(Promise);
  });
});
