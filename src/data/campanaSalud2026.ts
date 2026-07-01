/* ───────── Campaña Salud 2026 — fuente única de verdad ─────────
   Resumen para equipo comercial · Marchal Consultores.
   Vigencia: tecleos del 1 de junio al 31 de diciembre de 2026.
   Diferimiento máximo: hasta el 1 de enero de 2027.
   Pago mensual (particulares) · No aplica en Ibiza.

   Este archivo es la ÚNICA fuente de los importes/plazos de la campaña.
   Lo usan: Tarificador.tsx y ModalResultados.tsx (tarificador externo),
   TarificadorInterno.tsx y generateQuotePdf.ts (tarificador interno).
   Si la campaña cambia, se actualiza aquí y solo aquí.

   Dudas e incidencias: Red comercial 93 275 02 73 · masproteccion@segurcaixaadeslas.es
────────────────────────────────────────────────────────────────── */

export const CAMPAIGN_VIGENCIA_TEXT =
  "Campaña vigente del 1 de junio al 31 de diciembre de 2026 (tecleos). Diferimiento máximo hasta el 1 de enero de 2027.";
export const CAMPAIGN_END_DATE = "2026-12-31";
export const CAMPAIGN_DEFERRAL_DATE = "2027-01-01";
export const CAMPAIGN_EXCLUDED_PROVINCE = "Ibiza";

export const CAMPAIGN_PUNTOS_POR_ASEGURADO = 250;
export const CAMPAIGN_PUNTOS_ACREDITAN_MES = 4; // se acreditan al 4º mes de vigencia, al corriente de pago
export const CAMPAIGN_PUNTOS_CADUCAN_MESES = 12;

/* Reembolso adicional (particulares, pólizas con 2+ asegurados, hasta la 1ª renovación) */
export const CAMPAIGN_REEMBOLSO_PCT = 50;
export const CAMPAIGN_REEMBOLSO_MAX_ANUAL = 500;
export const CAMPAIGN_REEMBOLSO_EXCLUSIONES =
  "No cubre psiquiatría, psicoterapia, odontoestomatología, enfermería, urgencias hospitalarias, rehabilitación, fisioterapia ni podología.";

/* Reglas generales */
export const CAMPAIGN_NO_REEMPLAZOS_TEXT =
  "No se permiten reemplazos: asegurados que causen baja desde el 31-3-2026 y se den de alta de nuevo en campaña.";
export const CAMPAIGN_ALTAS_CARTERA_TEXT =
  "Las altas de nuevos asegurados en pólizas de cartera solo generan meses gratis y puntos (no aplica a autónomos/personas jurídicas, que solo admiten pólizas nuevas).";
export const CAMPAIGN_DENTAL_MAX_INCOMPATIBLE_TEXT =
  "Adeslas Dental Max no es compatible con la campaña Segurísimos (el resto de productos particulares sí lo son).";
export const CAMPAIGN_COMISION_TEXT =
  "El agente-mediador puede cederse hasta un 5% de su comisión (con o sin decimales), a descontar de la prima hasta la 1ª renovación. Sin aportación adicional de la Compañía.";
export const CAMPAIGN_MAX_COMISION_PCT = 5;

/* ── Particulares ──────────────────────────────────────────────
   Productos sin oferta pública en esta campaña. */
export const CAMPAIGN_NO_PROMO_IDS = new Set(["ya"]);

/* Plena Total / Plena Vital Total: 2 meses (1 aseg) / 3 meses (2 aseg) /
   25% descuento excluyente a partir de 3 asegurados. */
export const CAMPAIGN_FAMILIA_TOTAL_IDS = new Set(["completa", "completaPlus"]);

/* Plena Total Seniors: 2 / 3 / 3 meses gratis (sin descuento ni abono en cuenta). */
export const CAMPAIGN_SENIORS_TOTAL_ID = "seniors-total";

/* "Gama Plena" (Plena, Plena Vital, Plena Plus, Plena Extra) + Adeslas Seniors:
   1 / 2 / 2 meses gratis, según las filas "Gama Plena + Adeslas Seniors +
   cobertura Dental" y "Gama Plena, Adeslas Seniors y Adeslas Dental Max" del
   documento de campaña — ambas filas dan la MISMA cifra (1/2/2), así que se
   aplica siempre a todo este grupo, tenga o no módulo dental activado. */
export const CAMPAIGN_GAMA_PLENA_IDS = new Set(["plena", "esencial", "completaPlusPlus", "reembolso", "seniors"]);

/* ── Autónomos y personas jurídicas ──────────────────────────────
   Descuento en prima (sin meses gratis ni puntos). Solo pólizas nuevas. */
export const CAMPAIGN_AUTONOMOS_IDS = new Set(["pymes-total", "negocios-nif"]);

export function getAutonomosDiscountTier(productId: string, numAsegurados: number): number {
  if (productId === "pymes-total") return numAsegurados >= 4 ? 0.15 : 0.05;
  if (productId === "negocios-nif") return numAsegurados >= 4 ? 0.10 : 0.05;
  return 0;
}

/* Pymes Total (plurianual) con 4+ asegurados: el 15% baja a 7,5% en la 1ª
   renovación y desaparece en la 2ª. El resto de anuales no tiene esta reducción. */
export const CAMPAIGN_PYMES_TOTAL_RENOVACION_TEXT =
  "Para 4 o más asegurados en Adeslas Pymes Total: el 15% de descuento baja a 7,5% en la 1ª renovación y desaparece en la 2ª.";

/**
 * Meses gratis en particulares para un producto y nº de asegurados.
 * Devuelve: número de meses gratis, "descuento25" si aplica el 25% excluyente,
 * o null si el producto no tiene oferta pública de meses gratis.
 */
export function getMesesGratisParticulares(
  productId: string,
  numAsegurados: number,
  // Parámetro conservado por compatibilidad de firma (ya no afecta al resultado):
  // el documento de campaña da la misma cifra de meses gratis con o sin dental.
  _dentalModuloActivo = false,
): number | "descuento25" | null {
  if (CAMPAIGN_NO_PROMO_IDS.has(productId) || CAMPAIGN_AUTONOMOS_IDS.has(productId)) return null;

  if (CAMPAIGN_FAMILIA_TOTAL_IDS.has(productId)) {
    if (numAsegurados >= 3) return "descuento25";
    return numAsegurados === 2 ? 3 : 2;
  }

  if (productId === CAMPAIGN_SENIORS_TOTAL_ID) {
    if (numAsegurados >= 3) return 3;
    return numAsegurados === 2 ? 3 : 2;
  }

  if (CAMPAIGN_GAMA_PLENA_IDS.has(productId)) {
    return numAsegurados === 1 ? 1 : 2;
  }

  return null;
}

/** Puntos Segurísimos por asegurado (fijo, particulares en promoción). */
export function getPuntosPorAseguradoCampaign(productId: string): number {
  if (CAMPAIGN_NO_PROMO_IDS.has(productId) || CAMPAIGN_AUTONOMOS_IDS.has(productId)) return 0;
  return CAMPAIGN_PUNTOS_POR_ASEGURADO;
}

export interface CampaignBadge {
  text: string;
  bg: string;
  color: string;
}

/** Badge corto de campaña para tarjetas/tablas comparativas (particulares y autónomos). */
export function getCampaignBadgeText(
  productId: string,
  numAsegurados: number,
  dentalModuloActivo = false,
): CampaignBadge | null {
  if (CAMPAIGN_NO_PROMO_IDS.has(productId)) return null;

  if (CAMPAIGN_AUTONOMOS_IDS.has(productId)) {
    const pct = getAutonomosDiscountTier(productId, numAsegurados) * 100;
    return { text: `🏷️ ${pct}% de descuento en la prima`, bg: "#EFF6FF", color: "#1D4ED8" };
  }

  const meses = getMesesGratisParticulares(productId, numAsegurados, dentalModuloActivo);
  if (meses === "descuento25") return { text: "🎁 25% de descuento", bg: "#FDF2F8", color: "#9D174D" };
  if (meses === null) return null;

  const puntos = getPuntosPorAseguradoCampaign(productId);
  if (meses === 0) return { text: `🎁 ${puntos} pts/aseg.`, bg: "#FDF2F8", color: "#9D174D" };
  return {
    text: `🎁 ${meses} ${meses === 1 ? "mes gratis" : "meses gratis"} · ${puntos} pts/aseg.`,
    bg: "#FDF2F8",
    color: "#9D174D",
  };
}
