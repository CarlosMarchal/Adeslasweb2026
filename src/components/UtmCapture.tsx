"use client";

import { useEffect } from "react";
import { captureUtmParams } from "@/lib/utm-tracking";

/**
 * UtmCapture — captura los parámetros UTM (utm_source, utm_medium, utm_campaign,
 * utm_term, hsa_net) de la URL en CADA carga de página y los persiste en
 * sessionStorage en modo first touch (vía captureUtmParams). Mismo patrón y
 * misma razón que GclidCapture: tras la migración a SSG la navegación es
 * full-page y descarta el query string, así que sin esto los UTM de la landing
 * de entrada se perderían antes del submit del formulario.
 *
 * No renderiza nada, no accede a window en el render (todo vive en useEffect)
 * y no toca el contrato de generate_lead.
 *
 * Autor: Juan Carlos Díaz — Convertiam.
 */
export default function UtmCapture() {
  useEffect(() => {
    captureUtmParams();
  }, []);
  return null;
}
