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

/* Puntos Segurísimos por asegurado (particulares en promoción):
   250 pts si la póliza es de salud sin dental · 500 pts si lleva dental
   (módulo dental contratado o cobertura dental incluida de serie). */
export const CAMPAIGN_PUNTOS_POR_ASEGURADO = 250;
export const CAMPAIGN_PUNTOS_POR_ASEGURADO_DENTAL = 500;
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

/* Adeslas Pymes Total: descuento contra comisión máximo del 5% (decisión
   comercial de Marchal, 16-10-2026), igual que el resto de productos. No se
   aplica la aportación adicional de la Compañía que recoge el argumentario. */
export const CAMPAIGN_PYMES_TOTAL_ID = "pymes-total";
export const CAMPAIGN_PYMES_TOTAL_MAX_COMISION_PCT = 5;

/** Descuento contra comisión máximo (%) que admite un producto. GO: 0. */
export function getMaxDescuentoComisionPct(productId: string): number {
  if (productId === "ya") return 0;
  if (productId === CAMPAIGN_PYMES_TOTAL_ID) return CAMPAIGN_PYMES_TOTAL_MAX_COMISION_PCT;
  return CAMPAIGN_MAX_COMISION_PCT;
}

/** Reparto del descuento contra comisión entre agente y Compañía (en %). */
export function getRepartoDescuentoComision(
  productId: string,
  pctTotal: number,
): { agente: number; compania: number } {
  const pct = Math.min(Math.max(pctTotal, 0), getMaxDescuentoComisionPct(productId));
  return { agente: pct, compania: 0 };
}

/* ── Particulares ──────────────────────────────────────────────
   Productos sin oferta pública en esta campaña. */
export const CAMPAIGN_NO_PROMO_IDS = new Set(["ya"]);

/* Plena Total / Plena Vital Total: 2 meses (1 aseg) / 3 meses (2 aseg) /
   25% descuento excluyente a partir de 3 asegurados. */
export const CAMPAIGN_FAMILIA_TOTAL_IDS = new Set(["completa", "completaPlus"]);

/* Plena Total Seniors: 2 / 3 meses gratis (1 / 2 aseg.); a partir de 3, 25%. */
export const CAMPAIGN_SENIORS_TOTAL_ID = "seniors-total";

/* ── Productos trianuales (prima garantizada a 3 años) ─────────
   Plena Total, Plena Vital Total y Plena Total Seniors.
   A partir de 3 asegurados: 25% de descuento sobre la prima base, EXCLUYENTE
   (sustituye al descuento automático por tramos y no acumula meses gratis).
   Con 1 o 2 asegurados mantienen sus meses gratis (2 / 3). */
export const CAMPAIGN_TRIANUAL_IDS = new Set(["completa", "completaPlus", "seniors-total"]);
export const CAMPAIGN_TRIANUAL_DESCUENTO = 0.25;
export const CAMPAIGN_TRIANUAL_MIN_ASEGURADOS = 3;

/** Descuento trianual aplicable sobre la prima base (0 si no procede). */
export function getTrianualDiscount(productId: string, numAsegurados: number): number {
  return CAMPAIGN_TRIANUAL_IDS.has(productId) && numAsegurados >= CAMPAIGN_TRIANUAL_MIN_ASEGURADOS
    ? CAMPAIGN_TRIANUAL_DESCUENTO
    : 0;
}

/* Productos con cobertura dental incluida de serie (a efectos de puntos y de
   la fórmula de tarjeta prepago). */
export const CAMPAIGN_DENTAL_DE_SERIE_IDS = new Set([
  "completa", "completaPlus", "seniors", "seniors-total",
]);

/** ¿La póliza lleva dental? (de serie o con el módulo dental contratado) */
export function tieneDentalCampaign(productId: string, dentalModuloActivo = false): boolean {
  return dentalModuloActivo || CAMPAIGN_DENTAL_DE_SERIE_IDS.has(productId);
}

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

  // Trianuales (Plena Total, Plena Vital Total, Plena Total Seniors):
  // a partir de 3 asegurados el 25% es excluyente, sin meses gratis.
  if (CAMPAIGN_TRIANUAL_IDS.has(productId)) {
    if (numAsegurados >= CAMPAIGN_TRIANUAL_MIN_ASEGURADOS) return "descuento25";
    return numAsegurados === 2 ? 3 : 2;
  }

  if (CAMPAIGN_GAMA_PLENA_IDS.has(productId)) {
    return numAsegurados === 1 ? 1 : 2;
  }

  return null;
}

/**
 * Puntos Segurísimos por asegurado (particulares en promoción):
 * 250 pts sin dental · 500 pts con dental (módulo contratado o dental de serie).
 */
export function getPuntosPorAseguradoCampaign(productId: string, dentalModuloActivo = false): number {
  if (CAMPAIGN_NO_PROMO_IDS.has(productId) || CAMPAIGN_AUTONOMOS_IDS.has(productId)) return 0;
  return tieneDentalCampaign(productId, dentalModuloActivo)
    ? CAMPAIGN_PUNTOS_POR_ASEGURADO_DENTAL
    : CAMPAIGN_PUNTOS_POR_ASEGURADO;
}

/* ── Premio Segurísimos — Promoción Salud (tarificador interno) ──────────
   Fuente: argumentario "Segurísimos ¡Ampliada!" de SegurCaixa Adeslas
   (09-10-2026), sección Promoción Salud. Personas físicas.

   PUNTOS POR ASEGURADO                    1-2 aseg.   3 o más aseg. (x2)
     Adeslas GO sin dental                    250           500
     Adeslas GO con dental                    350           700
     Asistencia Sanitaria sin dental          500         1.000
     Asistencia Sanitaria con dental          750         1.500

   ABONO EN CUENTA POR ASEGURADO (en lugar de puntos)
     Adeslas Seniors sin dental                50 €         100 €
     Adeslas Seniors con dental /
     Adeslas Plena Total Seniors               75 €         150 €

   · El x2 por 3 o más asegurados se aplica a TODOS los asegurados de la póliza.
   · Negocios NIF / Extra Negocios NIF (código de campaña 3651, autónomo
     persona física): puntos como Asistencia Sanitaria, compatibles con su
     descuento en prima por tramos.
   · Pymes Total (persona jurídica): sin premio, solo descuento contra comisión.
   · Tarjeta prepago: a partir de 500 puntos, cada 10 puntos = 1 € de saldo.
   · Los puntos se acreditan al 4º mes de vigencia (al corriente de pago) y
     caducan a los 12 meses.
   Estas cifras NO sustituyen a getPuntosPorAseguradoCampaign (copys públicos). */
export const SEGURISIMOS_MIN_ASEGURADOS_X2 = 3;
export const SEGURISIMOS_GO_ID = "ya";
export const SEGURISIMOS_PUNTOS_GO = { sinDental: 250, conDental: 350 } as const;
export const SEGURISIMOS_PUNTOS_SALUD = { sinDental: 500, conDental: 750 } as const;
export const SEGURISIMOS_ABONO_SENIORS_IDS = new Set(["seniors", "seniors-total"]);
export const SEGURISIMOS_ABONO_SENIORS = { sinDental: 50, conDental: 75 } as const;
export const SEGURISIMOS_SIN_PREMIO_IDS = new Set(["pymes-total"]);
export const SEGURISIMOS_TARJETA_MIN_PUNTOS = 500;
export const SEGURISIMOS_PUNTOS_POR_EURO_TARJETA = 10;

export interface PremioSegurisimos {
  /** "puntos" (canjeables en el catálogo), "abono" (euros en cuenta, Seniors) o "ninguno". */
  tipo: "puntos" | "abono" | "ninguno";
  /** Importe por asegurado YA multiplicado (puntos o euros, según tipo). */
  porAsegurado: number;
  /** Importe base por asegurado, antes del x2. */
  base: number;
  /** 2 si la póliza tiene 3 o más asegurados; 1 si no. */
  multiplicador: 1 | 2;
  /** Total de la póliza: porAsegurado × número de asegurados. */
  total: number;
  conDental: boolean;
}

/**
 * Premio Segurísimos de la Promoción Salud para una póliza.
 * @param numAsegurados asegurados de la póliza (decide el x2 y el total).
 * @param dentalModuloActivo módulo dental contratado (el dental de serie se detecta solo).
 */
export function getPremioSegurisimos(
  productId: string,
  numAsegurados: number,
  dentalModuloActivo = false,
): PremioSegurisimos {
  const conDental = tieneDentalCampaign(productId, dentalModuloActivo);
  const multiplicador: 1 | 2 = numAsegurados >= SEGURISIMOS_MIN_ASEGURADOS_X2 ? 2 : 1;
  const n = Math.max(0, numAsegurados);
  const build = (tipo: "puntos" | "abono", base: number): PremioSegurisimos => ({
    tipo, base, multiplicador, conDental,
    porAsegurado: base * multiplicador,
    total: base * multiplicador * n,
  });

  if (SEGURISIMOS_SIN_PREMIO_IDS.has(productId) || n === 0) {
    return { tipo: "ninguno", porAsegurado: 0, base: 0, multiplicador, total: 0, conDental };
  }
  if (SEGURISIMOS_ABONO_SENIORS_IDS.has(productId)) {
    return build("abono", conDental ? SEGURISIMOS_ABONO_SENIORS.conDental : SEGURISIMOS_ABONO_SENIORS.sinDental);
  }
  if (productId === SEGURISIMOS_GO_ID) {
    return build("puntos", conDental ? SEGURISIMOS_PUNTOS_GO.conDental : SEGURISIMOS_PUNTOS_GO.sinDental);
  }
  return build("puntos", conDental ? SEGURISIMOS_PUNTOS_SALUD.conDental : SEGURISIMOS_PUNTOS_SALUD.sinDental);
}

/** Saldo de tarjeta prepago canjeable con unos puntos (10 pts = 1 €, mínimo 500 pts). */
export function getTarjetaPrepagoEuros(totalPuntos: number): number {
  return totalPuntos >= SEGURISIMOS_TARJETA_MIN_PUNTOS
    ? Math.floor(totalPuntos / SEGURISIMOS_PUNTOS_POR_EURO_TARJETA)
    : 0;
}

/* ── Catálogo de regalos Segurísimos ─────────────────────────────
   Argumentario SegurCaixa Adeslas (oct. 2026), sujeto a disponibilidad.
   La tarjeta prepago (getTarjetaPrepagoEuros) es el premio prioritario y
   NO va en esta lista: se muestra siempre primero, con su importe. */
/** Tipo de regalo: decide el icono y el color de la tarjeta en el catálogo visual. */
export type TipoPremio =
  | "netflix" | "streaming" | "futbol" | "motor" | "baloncesto" | "premium"
  | "baliza" | "datos" | "auriculares" | "reloj" | "tablet" | "movil";

export interface ItemPremio {
  icon: string;       // emoji (resúmenes de texto)
  text: string;       // nombre completo (PDF y resúmenes)
  tipo: TipoPremio;   // icono/color en el catálogo visual
  destacado: string;  // línea grande de la tarjeta ("50 €", "3 meses", "AirPods 4")
  detalle: string;    // línea pequeña ("de saldo en Netflix")
}
export interface NivelPremio {
  pts: number;
  items: ItemPremio[];
}
export const PREMIOS_SEGURISIMOS: NivelPremio[] = [
  { pts: 500, items: [
    { icon: "📺", text: "Netflix 50 € de saldo", tipo: "netflix", destacado: "50 €", detalle: "de saldo en Netflix" },
    { icon: "🎬", text: "Disney+ o Movistar+ 3 meses", tipo: "streaming", destacado: "3 meses", detalle: "de Disney+ o Movistar+" },
    { icon: "⚽", text: "DAZN Fútbol 2 meses", tipo: "futbol", destacado: "2 meses", detalle: "de DAZN fútbol" },
    { icon: "🏎️", text: "DAZN Motor 2 meses", tipo: "motor", destacado: "2 meses", detalle: "de DAZN motor" },
    { icon: "🚨", text: "Baliza de emergencia homologada", tipo: "baliza", destacado: "Baliza", detalle: "de emergencia homologada" },
    { icon: "🌍", text: "Holafly 50 € de datos en destinos internacionales", tipo: "datos", destacado: "50 €", detalle: "de datos Holafly en el extranjero" },
  ] },
  { pts: 1000, items: [
    { icon: "📺", text: "Netflix 100 € de saldo", tipo: "netflix", destacado: "100 €", detalle: "de saldo en Netflix" },
    { icon: "🏀", text: "DAZN Baloncesto 12 meses", tipo: "baloncesto", destacado: "12 meses", detalle: "de DAZN baloncesto" },
    { icon: "🏆", text: "DAZN Premium 3 meses", tipo: "premium", destacado: "3 meses", detalle: "de DAZN premium" },
  ] },
  { pts: 1500, items: [
    { icon: "📺", text: "Netflix 150 € de saldo", tipo: "netflix", destacado: "150 €", detalle: "de saldo en Netflix" },
    { icon: "🎬", text: "Disney+ o Movistar+ 12 meses", tipo: "streaming", destacado: "12 meses", detalle: "de Disney+ o Movistar+" },
    { icon: "🎧", text: "Samsung Galaxy Buds3", tipo: "auriculares", destacado: "Galaxy Buds3", detalle: "Samsung" },
  ] },
  { pts: 2000,  items: [
    { icon: "🎧", text: "AirPods 4", tipo: "auriculares", destacado: "AirPods 4", detalle: "Apple" },
  ] },
  { pts: 3000,  items: [
    { icon: "⌚", text: "Apple Watch SE 3", tipo: "reloj", destacado: "Apple Watch SE 3", detalle: "Apple" },
    { icon: "📱", text: "Tablet Samsung Galaxy A11 WiFi 128 GB", tipo: "tablet", destacado: "Galaxy Tab A11", detalle: "WiFi · 128 GB" },
  ] },
  { pts: 5000,  items: [
    { icon: "💻", text: "iPad WiFi 256 GB", tipo: "tablet", destacado: "iPad", detalle: "WiFi · 256 GB" },
  ] },
  { pts: 7000,  items: [
    { icon: "⌚", text: "Samsung Galaxy Watch Ultra", tipo: "reloj", destacado: "Galaxy Watch Ultra", detalle: "Samsung" },
  ] },
  { pts: 10000, items: [
    { icon: "📱", text: "iPhone 17 256 GB", tipo: "movil", destacado: "iPhone 17", detalle: "256 GB" },
    { icon: "📱", text: "Samsung Galaxy Z Flip7 256 GB", tipo: "movil", destacado: "Galaxy Z Flip7", detalle: "256 GB" },
  ] },
];

/** Niveles del catálogo alcanzables con unos puntos (de menor a mayor). */
export function getPremiosAlcanzables(totalPuntos: number): NivelPremio[] {
  return PREMIOS_SEGURISIMOS.filter((n) => n.pts <= totalPuntos);
}

/** Primer nivel del catálogo aún no alcanzado (o null si ya están todos). */
export function getSiguientePremio(totalPuntos: number): NivelPremio | null {
  return PREMIOS_SEGURISIMOS.find((n) => n.pts > totalPuntos) ?? null;
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

  const puntos = getPuntosPorAseguradoCampaign(productId, dentalModuloActivo);
  if (meses === 0) return { text: `🎁 ${puntos} pts/aseg.`, bg: "#FDF2F8", color: "#9D174D" };
  return {
    text: `🎁 ${meses} ${meses === 1 ? "mes gratis" : "meses gratis"} · ${puntos} pts/aseg.`,
    bg: "#FDF2F8",
    color: "#9D174D",
  };
}
