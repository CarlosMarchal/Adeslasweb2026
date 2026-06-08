"use client";

import { useEffect } from "react";
import { captureGclid } from "@/lib/hubspot";

/**
 * GclidCapture — captura el gclid/gbraid/wbraid de la URL en CADA carga de página
 * y lo persiste en sessionStorage (vía captureGclid). Necesario tras la migración
 * a SSG: la navegación es full-page y descarta el query string, así que sin esto
 * el gclid de la landing de entrada se perdería antes del submit del formulario.
 * No renderiza nada ni toca el contrato de generate_lead.
 *
 * Autor: Juan Carlos Díaz — Convertiam.
 */
export default function GclidCapture() {
  useEffect(() => {
    captureGclid();
  }, []);
  return null;
}
