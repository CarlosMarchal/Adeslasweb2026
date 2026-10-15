"use client";

import { useState, useMemo } from "react";
import {
  Trash2, Plus, ChevronDown, ChevronUp, Gift,
  Popcorn, MonitorPlay, Goal, Flag, Dribbble, Trophy, Siren, Globe,
  Headphones, Watch, Tablet, Smartphone, CreditCard, Lock,
  type LucideIcon,
} from "lucide-react";
import { products, provinces, getPrice, getZoneFromProvince } from "@/data/pricing";
import { generateQuotePdf, type QuoteData } from "@/lib/generateQuotePdf";
import {
  CAMPAIGN_VIGENCIA_TEXT,
  CAMPAIGN_EXCLUDED_PROVINCE,
  CAMPAIGN_NO_REEMPLAZOS_TEXT,
  CAMPAIGN_DENTAL_MAX_INCOMPATIBLE_TEXT,
  CAMPAIGN_REEMBOLSO_PCT,
  CAMPAIGN_REEMBOLSO_MAX_ANUAL,
  CAMPAIGN_REEMBOLSO_EXCLUSIONES,
  CAMPAIGN_PYMES_TOTAL_RENOVACION_TEXT,
  CAMPAIGN_MAX_COMISION_PCT,
  CAMPAIGN_PYMES_TOTAL_MAX_COMISION_PCT,
  getMaxDescuentoComisionPct,
  getRepartoDescuentoComision,
  CAMPAIGN_AUTONOMOS_IDS,
  getAutonomosDiscountTier,
  getMesesGratisParticulares,
  getPremioSegurisimos,
  getTarjetaPrepagoEuros,
  PREMIOS_SEGURISIMOS,
  type TipoPremio,
  SEGURISIMOS_MIN_ASEGURADOS_X2,
  getTrianualDiscount,
  CAMPAIGN_TRIANUAL_IDS,
  CAMPAIGN_TRIANUAL_MIN_ASEGURADOS,
} from "@/data/campanaSalud2026";

/* ─── Constantes ────────────────────────────────────────────── */
const MAX_COMMERCIAL_DISCOUNT = CAMPAIGN_MAX_COMISION_PCT; // % máximo, cesión de comisión del agente (ambos segmentos)

/**
 * Descuento automático por volumen / campaña según producto y nº de asegurados.
 * Reglas:
 *   · Adeslas GO                          → 2+ aseg: 10% (dto. estructural, no es de campaña)
 *   · Adeslas Plena / Plena Vital / Plena Plus → 4+ aseg: 10% (dto. estructural, no es de campaña)
 *   · Plena Vital Total / Plena Total
 *     / Seniors Total (TRIANUALES)        → 3+ aseg: 25% sobre la prima base (excluyente,
 *                                            sustituye a la antigua escala 5/10/15% y no
 *                                            acumula meses gratis). 1-2 aseg: sin descuento.
 *   · Negocios NIF                        → descuento en prima de la campaña: 5% (1-3 aseg.)
 *                                            10% (4+ aseg., ver getAutonomosDiscountTier)
 *   · Pymes Total                         → sin descuento automático: la tarifa ya es neta
 *                                            (tabla 1-3 aseg. y tabla 4+ aseg. en pricing.ts)
 *   · Resto de productos                  → sin descuento automático
 */
function getAutoDiscount(productId: string, n: number): number {
  // Adeslas Pymes Total: las primas de pricing.ts ya son netas (tarifa de
  // campaña por tramo 1-3 / 4+), así que no lleva descuento automático.
  if (productId === "pymes-total") return 0;
  if (CAMPAIGN_AUTONOMOS_IDS.has(productId)) return getAutonomosDiscountTier(productId, n);
  switch (productId) {
    case "ya":                // Adeslas GO
      return n >= 2 ? 0.10 : 0;
    case "plena":             // Adeslas Plena
    case "esencial":          // Adeslas Plena Vital
    case "completaPlusPlus":  // Adeslas Plena Plus
      return n >= 4 ? 0.10 : 0;
    case "completaPlus":      // Adeslas Plena Vital Total  (trianual)
    case "completa":          // Adeslas Plena Total         (trianual)
    case "seniors-total":     // Adeslas Seniors Total       (trianual)
      return getTrianualDiscount(productId, n);
    default:
      return 0;
  }
}

/** Etiqueta legible para el descuento automático */
function labelAutoDiscount(productId: string, n: number): string {
  const pct = getAutoDiscount(productId, n) * 100;
  if (pct === 0) return "";
  if (productId === "negocios-nif" || productId === "pymes-total") {
    return `Dto. campaña ${pct}% (${n >= 4 ? "≥4 asegurados" : "1-3 asegurados"})`;
  }
  if (CAMPAIGN_TRIANUAL_IDS.has(productId)) {
    return `Dto. trianual ${pct}% (≥${CAMPAIGN_TRIANUAL_MIN_ASEGURADOS} asegurados)`;
  }
  const trigger: Record<string, string> = {
    "ya":               "≥2 asegurados",
    "plena":            "≥4 asegurados",
    "esencial":         "≥4 asegurados",
    "completaPlusPlus": "≥4 asegurados",
  };
  return `Dto. ${pct}% (${trigger[productId] ?? ""})`;
}

/* ─── Clasificación de campaña "Segurísimos" por producto ─────
   La lógica de meses gratis / puntos / % autónomos vive en
   @/data/campanaSalud2026 (fuente única, compartida con el
   tarificador externo y el PDF de presupuesto).
   Aquí solo mantenemos etiquetas de UI. ──────────────────────── */
type CampaignCat = "go" | "salud_sin" | "salud_con" | "seniors_sin" | "seniors_con" | "sin_puntos";

const CAMPAIGN_CAT: Record<string, CampaignCat> = {
  "ya":               "go",
  "esencial":         "salud_sin",
  "completaPlus":     "salud_con",   // Plena Vital Total ← con dental
  "completaPlusPlus": "salud_sin",
  "completa":         "salud_con",   // Plena Total ← con dental
  "reembolso":        "salud_sin",
  "plena":            "salud_sin",
  "pymes-total":      "sin_puntos",  // descuento en prima por tramos, sin puntos
  "negocios-nif":     "salud_sin",   // descuento en prima por tramos + puntos Segurísimos (cód. 3651)
  "seniors":          "seniors_sin", // Gama Plena + Adeslas Seniors: meses gratis + puntos
  "seniors-total":    "seniors_con", // Plena Total Seniors: meses gratis + puntos (propio, sin descuento)
};

/* ─── Mensaje público de la campaña por producto ───────────────
   Refleja lo que ve el cliente final. Cifras desde @/data/campanaSalud2026.
────────────────────────────────────────────────────────────── */
function getMensajePublico(
  productId: string,
  n: number,
  dentalModuloActivo = false,
): { text: string; color: string; bg: string } | null {
  if (productId === "pymes-total") {
    return {
      text: `🏷️ Tarifa de campaña ya aplicada (${n >= 4 ? "4+ asegurados" : "1-3 asegurados"})`,
      color: "#1D4ED8",
      bg: "#EFF6FF",
    };
  }

  if (CAMPAIGN_AUTONOMOS_IDS.has(productId)) {
    const pct = getAutonomosDiscountTier(productId, n) * 100;
    return { text: `🏷️ Oferta pública: ${pct}% de descuento en la prima`, color: "#1D4ED8", bg: "#EFF6FF" };
  }

  const meses = getMesesGratisParticulares(productId, n, dentalModuloActivo);
  if (meses === "descuento25")
    return { text: "🎁 Oferta pública: 25% de descuento (≥3 asegurados)", color: "#9D174D", bg: "#FDF2F8" };
  const premio = getPremioSegurisimos(productId, n, dentalModuloActivo);
  const premioTxt = premio.tipo === "abono"
    ? `${premio.porAsegurado} € de abono/aseg.`
    : `${premio.porAsegurado.toLocaleString()} pts/aseg.`;
  if (meses === null) {
    return premio.tipo === "ninguno"
      ? null
      : { text: `🎁 Oferta pública: ${premioTxt}`, color: "#92400E", bg: "#FFFBEB" };
  }
  if (meses === 0)
    return { text: `🎁 Oferta pública: ${premioTxt}`, color: "#92400E", bg: "#FFFBEB" };
  return {
    text: `🎁 Oferta pública: ${meses} ${meses === 1 ? "mes gratis" : "meses gratis"} + ${premioTxt}`,
    color: "#92400E",
    bg: "#FFFBEB",
  };
}

/* ─── Premio Segurísimos (Promoción Salud): ver getPremioSegurisimos en
   @/data/campanaSalud2026. GO 250/350 · Asistencia Sanitaria 500/750 pts por
   asegurado (sin/con dental), x2 con 3 o más asegurados. Seniors y Plena Total
   Seniors: abono en cuenta 50/75 € por asegurado (x2 con 3+). Pymes: sin premio. ── */

/** Nº de asegurados con precio en el producto (los que generan premio). */
function validCountOf(precios: { precio: number | null }[]): number {
  return precios.filter((p) => p.precio !== null).length;
}

/* ─── Catálogo de premios: fuente única en @/data/campanaSalud2026
   (PREMIOS_SEGURISIMOS, compartido con el PDF). La tarjeta prepago es el
   premio prioritario y se pinta siempre primero, con su importe. */
const PREMIOS = PREMIOS_SEGURISIMOS.map((n) => ({
  pts: n.pts,
  items: n.items.map((i) => `${i.icon} ${i.text}`),
}));

/* ─── Catálogo visual: icono y color por tipo de regalo ──────── */
const ICONO_PREMIO: Record<TipoPremio, { Icon: LucideIcon; bg: string }> = {
  netflix:     { Icon: Popcorn,     bg: "bg-red-600" },
  streaming:   { Icon: MonitorPlay, bg: "bg-indigo-600" },
  futbol:      { Icon: Goal,        bg: "bg-slate-900" },
  motor:       { Icon: Flag,        bg: "bg-slate-900" },
  baloncesto:  { Icon: Dribbble,    bg: "bg-slate-900" },
  premium:     { Icon: Trophy,      bg: "bg-slate-900" },
  baliza:      { Icon: Siren,       bg: "bg-orange-500" },
  datos:       { Icon: Globe,       bg: "bg-pink-500" },
  auriculares: { Icon: Headphones,  bg: "bg-slate-500" },
  reloj:       { Icon: Watch,       bg: "bg-orange-400" },
  tablet:      { Icon: Tablet,      bg: "bg-sky-500" },
  movil:       { Icon: Smartphone,  bg: "bg-blue-500" },
};

/* ─── Helper: etiqueta tramo de edad ───────────────────────── */
function getBandLabel(age: number): string {
  if (age <= 24) return "0-24";
  if (age <= 44) return "25-44";
  if (age <= 54) return "45-54";
  if (age <= 59) return "55-59";
  if (age <= 62) return "60-62";
  if (age <= 64) return "60-64";
  if (age <= 69) return "65-69";
  if (age <= 74) return "70-74";
  if (age <= 79) return "75-79";
  if (age <= 84) return "80-84";
  return "≥85";
}

/* ─── Etiqueta "con dental" ─────────────────────────────────── */
function labelDental(cat: CampaignCat): string {
  if (cat === "salud_con" || cat === "seniors_con") return "🦷 Con dental";
  if (cat === "go") return "Sin dental";
  return "Sin dental";
}

/* ─── Módulo dental ─────────────────────────────────────────── */
// Productos que ya incluyen dental: no se suma el módulo adicional
const DENTAL_YA_INCLUIDO = new Set([
  "completa",      // Plena Total
  "completaPlus",  // Plena Vital Total
  "seniors-total", // Seniors Total
  "pymes-total",   // Pymes Total
]);

// Precio del módulo dental según nº de asegurados (coste por póliza, no por persona)
function getPrecioDental(numAsegurados: number): number {
  if (numAsegurados === 1) return 8.93;
  if (numAsegurados === 2) return 12.76;
  if (numAsegurados <= 4) return 17.85;
  return 21.25;
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════════════════════ */
export default function TarificadorInterno() {
  const [provincia, setProvincia] = useState<string>("Madrid");
  const [rawEdades, setRawEdades] = useState<string[]>(["0"]);
  /* edades numéricas derivadas; campo vacío cuenta como 0 */
  const asegurados = rawEdades.map((v) => {
    const n = parseInt(v, 10);
    return isNaN(n) ? 0 : Math.min(Math.max(n, 0), 99);
  });
  const [expandido, setExpandido] = useState<string | null>(null);
  const [descuentoComercial, setDescuentoComercial] = useState<number>(0);
  const [mostrarPremios, setMostrarPremios] = useState(false);
  const [grupo, setGrupo] = useState<"general" | "seniors" | "pymes">("general");
  const [includeDental, setIncludeDental] = useState(false);

  /* ── Estado modal presupuesto PDF ── */
  const [showQuoteModal, setShowQuoteModal]   = useState(false);
  const [selectedQuote, setSelectedQuote]     = useState<QuoteData | null>(null);
  const [clienteNombre, setClienteNombre]     = useState("");
  const [clienteTelefono, setClienteTelefono] = useState("");
  const [clienteEmail, setClienteEmail]       = useState("");
  const [includePuntosPdf, setIncludePuntosPdf] = useState(true);

  const zona        = getZoneFromProvince(provincia);
  // Pymes Total admite hasta 10% (5% agente + 5% Compañía); el resto, 5%.
  const maxDescuentoSlider = grupo === "pymes" ? CAMPAIGN_PYMES_TOTAL_MAX_COMISION_PCT : MAX_COMMERCIAL_DISCOUNT;
  const pctGeneral  = Math.min(Math.max(descuentoComercial, 0), maxDescuentoSlider);

  /* ── Reglas de elegibilidad por edad ──────────────────────────
     · Productos NO Seniors (maxAge 70):
         – Si hay algún asegurado >70, solo se muestran si hay
           al menos 2 asegurados <65. Si no, se ocultan.
         – Los asegurados >70 aparecen como N/D en esos productos.
     · Seniors / Seniors Total:
         – Sin restricción de grupo; se muestran siempre que
           algún asegurado esté en el rango de edad válido.
  ─────────────────────────────────────────────────────────────── */
  const hayMayoresDe70  = asegurados.some(e => e > 70);
  const contMenoresDe65 = asegurados.filter(e => e < 65).length;

  function esElegible(productId: string): boolean {
    const isSeniorsProduct = productId === "seniors" || productId === "seniors-total";
    // Seniors / Seniors Total: siempre elegibles si hay precio en rango
    // (la persona puede contratar sola o en grupo, sin condición de edad)
    if (isSeniorsProduct) return true;
    // Productos NO Seniors: si hay alguien >70, se necesitan ≥2 asegurados <65
    if (hayMayoresDe70) return contMenoresDe65 >= 2;
    return true;
  }

  /* ── Cálculo de resultados ── */
  const resultados = useMemo(() => {
    return products
      .map((product) => {
        const cat: CampaignCat = CAMPAIGN_CAT[product.id] ?? "salud_sin";
        const isSeniors = cat === "seniors_sin" || cat === "seniors_con";

        const preciosPorPersona = asegurados.map((edad) => ({
          edad,
          precio: getPrice(product, edad, zona, asegurados.length),
          banda: getBandLabel(edad),
        }));

        const hayNulos = preciosPorPersona.some((p) => p.precio === null);
        const validCount = preciosPorPersona.filter((p) => p.precio !== null).length;
        const subtotal = preciosPorPersona.reduce((s, p) => s + (p.precio ?? 0), 0);

        // Módulo dental: precio por póliza si está activado y el producto no lo incluye ya
        const dentalYaIncluido = DENTAL_YA_INCLUIDO.has(product.id);
        const dentalExtra = includeDental && !dentalYaIncluido
          ? getPrecioDental(asegurados.length)
          : 0;
        const subtotalConDental = subtotal + dentalExtra;

        // 1) Descuento automático por volumen (reglas específicas por producto)
        const ratioAuto = getAutoDiscount(product.id, asegurados.length);
        const descAuto = subtotal * ratioAuto;
        // Base dental no está sujeta al descuento de volumen (ya tiene precio escalonado)
        const baseTrasFamiliar = (subtotal - descAuto) + dentalExtra;

        // 2) Descuento contra comisión: máx. 5% (agente) en general; Pymes Total hasta 10%
        //    (5% agente + 5% Compañía). Tope por producto en getMaxDescuentoComisionPct.
        // va sobre el total (base + dental). Adeslas GO no admite descuento comercial.
        const pctComercialEfectivo = Math.min(pctGeneral, getMaxDescuentoComisionPct(product.id));
        const descComercial = baseTrasFamiliar * (pctComercialEfectivo / 100);
        const total = baseTrasFamiliar - descComercial;

        // Campaña (particulares): puntos fijos por asegurado + meses gratis / 25% dto.
        // según producto y nº de asegurados. Cifras únicas en @/data/campanaSalud2026.
        const dentalActivoParaCampana = includeDental && !dentalYaIncluido;
        // Premio Segurísimos: se calcula sobre los asegurados con precio en este producto.
        const premio = getPremioSegurisimos(product.id, validCount, dentalActivoParaCampana);
        const puntosXAseg = premio.tipo === "puntos" ? premio.porAsegurado : 0;
        const totalPuntos = premio.tipo === "puntos" ? premio.total : 0;
        const abonoXAseg  = premio.tipo === "abono" ? premio.porAsegurado : 0;
        const abonoTotal  = premio.tipo === "abono" ? premio.total : 0;
        const multiplicadorPremio = premio.multiplicador;
        const mesesGratis = getMesesGratisParticulares(product.id, asegurados.length, dentalActivoParaCampana);
        // ¿La póliza cuenta "con dental" a efectos del premio? (dental de serie o módulo activo)
        const useDentalTarjetaFormula = premio.conDental;

        return {
          product, cat, isSeniors,
          subtotal, subtotalConDental, dentalExtra, dentalYaIncluido,
          descAuto, ratioAuto, descComercial, total,
          preciosPorPersona, hayNulos,
          totalPuntos, puntosXAseg, mesesGratis,
          abonoXAseg, abonoTotal, multiplicadorPremio,
          useDentalTarjetaFormula,
          pctComercialEfectivo,
        };
      })
      .filter((r) => r.subtotal > 0 && esElegible(r.product.id))
      .sort((a, b) => a.total - b.total);
  }, [asegurados, zona, pctGeneral, hayMayoresDe70, contMenoresDe65, includeDental]);

  /* ── Filtrado por grupo seleccionado ── */
  const SENIORS_IDS = new Set(["seniors", "seniors-total"]);
  const PYMES_IDS   = new Set(["pymes-total"]);
  const resultadosFiltrados = resultados.filter((r) => {
    if (grupo === "seniors") return SENIORS_IDS.has(r.product.id);
    if (grupo === "pymes")   return PYMES_IDS.has(r.product.id);
    return !SENIORS_IDS.has(r.product.id) && !PYMES_IDS.has(r.product.id);
  });

  /* ── Resumen de incentivos (para el cartel de premios) ── */
  const maxPuntos = Math.max(0, ...resultados.map((r) => r.totalPuntos));

  /* ── Handlers de asegurados ── */
  const addAsegurado = () => setRawEdades((p) => [...p, "0"]);
  const removeAsegurado = (i: number) =>
    setRawEdades((p) => p.filter((_, idx) => idx !== i));
  const setEdad = (i: number, val: string) => {
    // Permite campo vacío (borrar) y valores válidos 0-99
    if (val === "" || (parseInt(val, 10) >= 0 && parseInt(val, 10) <= 99))
      setRawEdades((p) => p.map((v, idx) => (idx === i ? val : v)));
  };

  /* ── Premios alcanzables con los puntos máximos ── */
  const premiosAlcanzables = PREMIOS.filter((p) => p.pts <= maxPuntos);

  /* ══════════════ RENDER ══════════════ */
  return (
    <>
      <div className="min-h-screen bg-[#f4f7fb]">

        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-[#009DD9] to-[#0077aa] py-8 px-4 shadow-md">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Tarificador Interno · Adeslas 2026
              </h1>
              <p className="text-blue-100 mt-1 text-sm">
                Campaña Segurísimos · Solo para comerciales
              </p>
            </div>
            <div className="hidden md:block text-right text-white text-sm opacity-80">
              <p>Marchal Aseguradores</p>
              <p className="font-semibold">91 710 50 00</p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

          {/* ── Selector de grupo de productos ── */}
          <div className="flex gap-2 flex-wrap">
            {([
              { id: "general", label: "Seguros de salud",   emoji: "🏥" },
              { id: "seniors", label: "Adeslas Seniors",    emoji: "👴" },
              { id: "pymes",   label: "Pymes Total",        emoji: "🏢" },
            ] as const).map(({ id, label, emoji }) => (
              <button
                key={id}
                onClick={() => setGrupo(id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition border ${
                  grupo === id
                    ? "bg-[#009DD9] text-white border-[#009DD9] shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:border-[#009DD9] hover:text-[#009DD9]"
                }`}
              >
                <span>{emoji}</span> {label}
              </button>
            ))}
          </div>

          {/* ── Panel de controles ── */}
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">

            {/* Fila 1: Provincia + Asegurados */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Provincia */}
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Provincia
                </label>
                <select
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#009DD9] text-slate-800 font-medium"
                >
                  {provinces.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">Zona {zona} · {provincia}</p>
              </div>

              {/* Asegurados */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-600">
                    Asegurados ({asegurados.length})
                  </label>
                </div>
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {rawEdades.map((rawEdad, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 w-16 shrink-0">
                        Persona {i + 1}
                      </span>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={rawEdad}
                        onChange={(e) => setEdad(i, e.target.value)}
                        onFocus={(e) => e.target.select()}
                        min={0}
                        max={99}
                        placeholder="0"
                        className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#009DD9]"
                      />
                      <span className="text-xs text-slate-400">años</span>
                      {asegurados.length > 1 && (
                        <button
                          onClick={() => removeAsegurado(i)}
                          className="ml-auto text-red-400 hover:text-red-600 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={addAsegurado}
                  className="mt-3 flex items-center gap-1 text-sm font-semibold text-[#009DD9] hover:text-[#0077aa] transition"
                >
                  <Plus size={16} /> Agregar asegurado
                </button>
                {grupo === "general" && (
                  <p className="mt-2 text-xs text-slate-400">
                    💡 Descuentos automáticos: GO ≥2 · Plena/Plena Vital/Plus ≥4 · Trianuales (Totales) 25% desde 3 aseg. · Negocios NIF 5%/10% · Pymes Total: tarifa neta por tramo (1-3 / 4+)
                  </p>
                )}
                {grupo === "pymes" && (
                  <p className="mt-2 text-xs text-slate-400">
                    💡 Pymes Total: tarifa ya neta por tramo (1-3 / 4+ aseg.) · Negocios NIF: 5% (1-3 aseg.) · 10% (4+ aseg.)
                  </p>
                )}
              </div>
            </div>

            {/* Fila 2: Descuento comercial (cesión de comisión, ambos segmentos) */}
            <div className={`border-t border-slate-100 pt-5 grid gap-6 ${grupo === "pymes" || grupo === "seniors" ? "md:grid-cols-1 max-w-md" : "md:grid-cols-2"}`}>

              {/* Descuento comercial: cesión de comisión del agente, máx. 5%, todos los productos excepto GO */}
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">
                  Descuento comercial (cesión de comisión)
                </label>
                <p className="text-xs text-slate-400 mb-3">
                  {grupo === "pymes"
                    ? `Máx. ${CAMPAIGN_PYMES_TOTAL_MAX_COMISION_PCT}% en Adeslas Pymes Total · hasta ${MAX_COMMERCIAL_DISCOUNT}% de tu comisión + la misma aportación de la Compañía`
                    : `Máx. ${MAX_COMMERCIAL_DISCOUNT}% · Va contra tu comisión, sin aportación de la Compañía`}
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={maxDescuentoSlider}
                    step={0.5}
                    value={pctGeneral}
                    onChange={(e) => setDescuentoComercial(parseFloat(e.target.value))}
                    className="flex-1 accent-[#009DD9]"
                  />
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={maxDescuentoSlider}
                      step={0.5}
                      value={pctGeneral}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        if (!isNaN(v)) setDescuentoComercial(Math.min(maxDescuentoSlider, Math.max(0, v)));
                      }}
                      className="w-14 px-2 py-2 border border-slate-200 rounded-lg text-center font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#009DD9]"
                    />
                    <span className="font-bold text-slate-600">%</span>
                  </div>
                </div>
                {pctGeneral > 0 && (
                  <p className="text-xs font-semibold text-[#009DD9] mt-1.5">
                    {grupo === "pymes"
                      ? (() => {
                          const r = getRepartoDescuentoComision("pymes-total", pctGeneral);
                          return `✓ Aplicando ${pctGeneral}% a Pymes Total (${r.agente}% tu comisión + ${r.compania}% Compañía)`;
                        })()
                      : `✓ Aplicando ${pctGeneral}% a todos los productos (excepto Adeslas GO)`}
                  </p>
                )}
              </div>

              {/* Módulo dental (solo para Seguros de salud) */}
              {grupo === "general" && (
                <div className={`rounded-xl border-2 p-4 transition-all col-span-full ${
                  includeDental ? "border-teal-400 bg-teal-50" : "border-slate-100 bg-slate-50"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🦷</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          Incluir módulo dental
                        </p>
                        <p className="text-xs text-slate-400">
                          +{getPrecioDental(asegurados.length).toFixed(2).replace(".", ",")} €/mes
                          {" · "}
                          {asegurados.length === 1 ? "1 persona" :
                           asegurados.length === 2 ? "2 personas" :
                           asegurados.length <= 4  ? "3-4 personas" : "5+ personas"}
                          {" · "}
                          Plena Total, Vital Total y Seniors Total ya lo incluyen
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={includeDental}
                        onChange={(e) => setIncludeDental(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                    </label>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* ── Aviso cuando hay asegurados > 70 años ── */}
          {hayMayoresDe70 && (
            <div className={`rounded-2xl px-6 py-4 text-sm border ${
              contMenoresDe65 >= 2
                ? "bg-blue-50 border-blue-200 text-blue-800"
                : "bg-amber-50 border-amber-300 text-amber-800"
            }`}>
              <p className="font-bold mb-1">
                {contMenoresDe65 >= 2
                  ? "ℹ️ Asegurado mayor de 70 años — condición cumplida"
                  : "⚠️ No se puede contratar — condición no cumplida"}
              </p>
              <p className="text-xs">
                {contMenoresDe65 >= 2
                  ? `Hay ${contMenoresDe65} asegurados menores de 65 años. Se pueden contratar todos los productos.`
                  : `Los productos Seniors y Seniors Total sí son contratables. Para el resto de productos se necesitan al menos 2 asegurados menores de 65 en la misma póliza (actualmente hay ${contMenoresDe65}).`}
              </p>
            </div>
          )}

          {/* ── Tabla comparativa ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-bold text-slate-700">
                Comparativa de productos
              </h2>
              {maxPuntos > 0 && (
                <button
                  onClick={() => setMostrarPremios((v) => !v)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full transition"
                >
                  <Gift size={15} />
                  Ver premios Segurísimos
                </button>
              )}
            </div>

            {resultadosFiltrados.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm px-6 py-8 text-center text-slate-500">
                <p className="text-3xl mb-3">🔍</p>
                <p className="font-semibold text-slate-700">Sin productos disponibles</p>
                <p className="text-sm mt-1">
                  {hayMayoresDe70 && contMenoresDe65 < 2
                    ? "Con un asegurado mayor de 70 años y menos de 2 menores de 65, no se puede contratar ningún producto. Añade al menos 2 asegurados menores de 65 años para ver opciones."
                    : "Ningún producto de Adeslas está disponible para la combinación de edades seleccionada."}
                </p>
              </div>
            )}

            {resultadosFiltrados.map(({
              product, cat, isSeniors,
              subtotal, dentalExtra, dentalYaIncluido,
              descAuto, ratioAuto, descComercial, total,
              preciosPorPersona, hayNulos,
              totalPuntos, puntosXAseg, mesesGratis,
              abonoXAseg, abonoTotal, multiplicadorPremio,
              useDentalTarjetaFormula,
              pctComercialEfectivo,
            }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Fila principal */}
                <div
                  className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-slate-50 transition"
                  onClick={() =>
                    setExpandido(expandido === product.id ? null : product.id)
                  }
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-slate-800">{product.name}</p>
                      {/* Badge dental */}
                      {(cat === "salud_con" || cat === "seniors_con") && (
                        <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-semibold">
                          🦷 Con dental
                        </span>
                      )}
                    </div>

                    {hayNulos && (
                      <p className="text-xs text-amber-500 mt-0.5">
                        ⚠ Algunas personas fuera del rango de edad
                      </p>
                    )}
                    {product.id === "pymes-total" && asegurados.some(e => e >= 68) && (
                      <p className="text-xs text-amber-500 mt-0.5">
                        ⚠ Condición especial para asegurados ≥68 años (ver desglose)
                      </p>
                    )}

                    {/* Barra de incentivos: meses gratis + puntos = tarjeta prepago (y abono Seniors) */}
                    {(() => {
                      const meses = typeof mesesGratis === "number" ? mesesGratis : 0;
                      const tarjeta = getTarjetaPrepagoEuros(totalPuntos);
                      const nAsegPremio = validCountOf(preciosPorPersona);
                      if (meses === 0 && totalPuntos === 0 && abonoTotal === 0) return null;
                      const sep = (c: string) => (
                        <span className="self-center text-xl font-black text-slate-400 px-0.5">{c}</span>
                      );
                      return (
                        <div className="mt-2 flex flex-wrap items-stretch gap-1.5">
                          {meses > 0 && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E4097D] text-white shadow-sm">
                              <span className="text-xl">🎁</span>
                              <div className="leading-tight">
                                <p className="text-base font-black">{meses} {meses === 1 ? "mes gratis" : "meses gratis"}</p>
                                <p className="text-[10px] opacity-90">de cuota · campaña</p>
                              </div>
                            </div>
                          )}
                          {meses > 0 && (totalPuntos > 0 || abonoTotal > 0) && sep("+")}
                          {totalPuntos > 0 && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-400 text-amber-950 shadow-sm">
                              <span className="text-xl">⭐</span>
                              <div className="leading-tight">
                                <p className="text-base font-black">{totalPuntos.toLocaleString()} puntos</p>
                                <p className="text-[10px] opacity-80">
                                  {puntosXAseg.toLocaleString()} × {nAsegPremio} aseg.{multiplicadorPremio === 2 ? " · x2 por 3+ aseg." : ""}
                                </p>
                              </div>
                            </div>
                          )}
                          {tarjeta > 0 && sep("=")}
                          {tarjeta > 0 && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 text-white shadow-sm">
                              <span className="text-xl">🎴</span>
                              <div className="leading-tight">
                                <p className="text-base font-black text-green-400">{tarjeta.toLocaleString()} €</p>
                                <p className="text-[10px] text-slate-300">en tarjeta prepago Visa</p>
                              </div>
                            </div>
                          )}
                          {abonoTotal > 0 && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-600 text-white shadow-sm">
                              <span className="text-xl">💶</span>
                              <div className="leading-tight">
                                <p className="text-base font-black">{abonoTotal.toLocaleString()} € abono</p>
                                <p className="text-[10px] opacity-90">
                                  {abonoXAseg} € × {nAsegPremio} aseg. en cuenta{multiplicadorPremio === 2 ? " · x2 por 3+ aseg." : ""}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Oferta pública campaña — bloque destacado en fila compacta */}
                    {(() => {
                      const mp = getMensajePublico(product.id, asegurados.length, useDentalTarjetaFormula);
                      if (!mp) return null;
                      const esAutonomos = CAMPAIGN_AUTONOMOS_IDS.has(product.id);
                      const es25 = mesesGratis === "descuento25";
                      const pctAutonomos = esAutonomos ? getAutonomosDiscountTier(product.id, asegurados.length) * 100 : 0;
                      // Meses gratis y puntos ya se destacan en la barra de incentivos
                      if (!es25 && !esAutonomos) return null;
                      return (
                        <div
                          className="flex items-center gap-2 mt-1.5 px-3 py-1.5 rounded-lg"
                          style={{ backgroundColor: mp.bg, border: `1px solid ${es25 ? "#F9A8D4" : esAutonomos ? "#BFDBFE" : "#FDE68A"}` }}
                        >
                          <span className="text-base">{esAutonomos ? "🏷️" : "🎁"}</span>
                          <div>
                            <p className="text-[11px] font-black leading-tight" style={{ color: mp.color }}>
                              {es25
                                ? "25% de descuento"
                                : product.id === "pymes-total"
                                  ? "Tarifa de campaña ya aplicada"
                                  : esAutonomos
                                  ? `${pctAutonomos}% dto. en prima`
                                  : typeof mesesGratis === "number" && mesesGratis > 0
                                    ? `${mesesGratis} ${mesesGratis === 1 ? "mes gratis" : "meses gratis"}`
                                    : "Sin meses gratis en este tramo"}
                            </p>
                            {es25 && (
                              <p className="text-[10px] font-semibold leading-tight" style={{ color: mp.color, opacity: 0.75 }}>
                                con 3+ asegurados · ya aplicado en el precio
                              </p>
                            )}
                            {esAutonomos && (
                              <p className="text-[10px] font-semibold leading-tight" style={{ color: mp.color, opacity: 0.75 }}>
                                {product.id === "negocios-nif"
                                  ? "5% (1-3 aseg.) · 10% (4+ aseg.)"
                                  : `tarifa ${asegurados.length >= 4 ? "4+ asegurados" : "1-3 asegurados"} · 15% en 4+ (7,5% en 1ª renov.)`}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Resumen descuentos aplicados en la fila */}
                    {(ratioAuto > 0 || pctComercialEfectivo > 0 || dentalExtra > 0) && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        Bruto {subtotal.toFixed(2)} €
                        {dentalExtra > 0 && ` · 🦷 +${dentalExtra.toFixed(2)} €`}
                        {ratioAuto > 0 && ` · ${labelAutoDiscount(product.id, asegurados.length)} -${descAuto.toFixed(2)} €`}
                        {pctComercialEfectivo > 0 && ` · Comercial -${descComercial.toFixed(2)} €`}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      {(ratioAuto > 0 || pctComercialEfectivo > 0 || dentalExtra > 0) && (
                        <p className="text-xs line-through text-slate-400">
                          {(subtotal + dentalExtra).toFixed(2)} €
                        </p>
                      )}
                      {ratioAuto > 0 && (
                        <p className="text-xs font-bold text-green-600">
                          -{(ratioAuto * 100).toFixed(0)}% auto
                        </p>
                      )}
                      <p className={`text-2xl font-bold ${
                        ratioAuto > 0 || pctComercialEfectivo > 0
                          ? "text-green-600"
                          : "text-[#009DD9]"
                      }`}>
                        {total.toFixed(2)} €
                      </p>
                      <p className="text-xs text-slate-400">/ mes</p>
                    </div>
                    {expandido === product.id
                      ? <ChevronUp size={18} className="text-slate-400" />
                      : <ChevronDown size={18} className="text-slate-400" />
                    }
                  </div>
                </div>

                {/* Desglose expandido */}
                {expandido === product.id && (
                  <div className="border-t border-slate-100 px-6 py-4 bg-slate-50">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-slate-400 text-xs uppercase">
                          <th className="text-left font-semibold pb-2">Persona</th>
                          <th className="text-left font-semibold pb-2">Edad</th>
                          <th className="text-left font-semibold pb-2">Tramo</th>
                          <th className="text-right font-semibold pb-2">Prima</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {preciosPorPersona.map((p, i) => (
                          <tr key={i}>
                            <td className="py-2 text-slate-500">Persona {i + 1}</td>
                            <td className="py-2 font-semibold text-slate-700">{p.edad} años</td>
                            <td className="py-2 text-slate-500">{p.banda}</td>
                            <td className="py-2 text-right font-bold text-slate-800">
                              {p.precio !== null
                                ? `${p.precio.toFixed(2)} €`
                                : <span className="text-amber-400 text-xs font-semibold">N/D</span>
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="text-sm">
                        <tr className="border-t border-slate-200">
                          <td colSpan={3} className="pt-3 font-semibold text-slate-600">Subtotal bruto</td>
                          <td className="pt-3 text-right font-bold text-slate-800">{subtotal.toFixed(2)} €</td>
                        </tr>
                        {/* Módulo dental */}
                        {dentalExtra > 0 && (
                          <tr>
                            <td colSpan={3} className="py-1 text-teal-600 font-semibold">
                              🦷 Módulo dental ({asegurados.length === 1 ? "1 persona" : asegurados.length === 2 ? "2 personas" : asegurados.length <= 4 ? "3-4 personas" : "5+ personas"})
                            </td>
                            <td className="py-1 text-right text-teal-600 font-bold">
                              +{dentalExtra.toFixed(2)} €
                            </td>
                          </tr>
                        )}
                        {dentalYaIncluido && (
                          <tr>
                            <td colSpan={3} className="py-1 text-teal-600 font-semibold">
                              🦷 Módulo dental
                            </td>
                            <td className="py-1 text-right">
                              <span className="text-xs font-bold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Incluido</span>
                            </td>
                          </tr>
                        )}
                        {ratioAuto > 0 && (
                          <tr>
                            <td colSpan={3} className="py-1 text-green-600 font-semibold">
                              {labelAutoDiscount(product.id, asegurados.length)}
                            </td>
                            <td className="py-1 text-right text-green-600 font-bold">
                              -{descAuto.toFixed(2)} €
                            </td>
                          </tr>
                        )}
                        {pctComercialEfectivo > 0 && (
                          <tr>
                            <td colSpan={3} className="py-1 text-[#009DD9] font-semibold">
                              Descuento comercial {pctComercialEfectivo}%
                              {getRepartoDescuentoComision(product.id, pctComercialEfectivo).compania > 0 && (() => {
                                const r = getRepartoDescuentoComision(product.id, pctComercialEfectivo);
                                return (
                                  <span className="font-normal text-slate-400 ml-1">
                                    ({r.agente}% agente + {r.compania}% Compañía)
                                  </span>
                                );
                              })()}
                            </td>
                            <td className="py-1 text-right text-[#009DD9] font-bold">
                              -{descComercial.toFixed(2)} €
                            </td>
                          </tr>
                        )}
                        <tr className="border-t-2 border-slate-300">
                          <td colSpan={3} className="pt-2 text-base font-bold text-slate-800">Total mensual</td>
                          <td className={`pt-2 text-right text-xl font-bold ${
                            ratioAuto > 0 || pctComercialEfectivo > 0 ? "text-green-600" : "text-[#009DD9]"
                          }`}>
                            {total.toFixed(2)} €
                          </td>
                        </tr>
                        {/* Incentivo campaña: puntos Segurísimos + oferta pública */}
                        {totalPuntos > 0 && (
                          <tr>
                            <td colSpan={4} className="pt-3">
                              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                                {typeof mesesGratis === "number" && mesesGratis > 0 && (
                                  <p className="inline-block mb-2 px-3 py-1 rounded-lg bg-[#E4097D] text-white text-base font-black">
                                    🎁 {mesesGratis} {mesesGratis === 1 ? "mes gratis" : "meses gratis"}
                                  </p>
                                )}
                                <p className="text-sm font-bold text-amber-800">
                                  ⭐ Campaña Segurísimos · Puntos
                                </p>
                                <p className="text-xs text-amber-700 mt-0.5">
                                  {puntosXAseg.toLocaleString()} puntos × {validCountOf(preciosPorPersona)} asegurado{validCountOf(preciosPorPersona) > 1 ? "s" : ""}
                                  {" = "}
                                  <span className="font-bold text-lg text-amber-800">
                                    {totalPuntos.toLocaleString()} puntos
                                  </span>
                                </p>
                                {getTarjetaPrepagoEuros(totalPuntos) > 0 && (
                                  <p className="text-xs font-bold text-slate-800 mt-1.5 bg-white border border-slate-300 rounded-lg px-3 py-1.5 inline-block">
                                    🎴 Tarjeta prepago disponible:{" "}
                                    <span className="text-base text-slate-900">
                                      {getTarjetaPrepagoEuros(totalPuntos)} €
                                    </span>
                                    <span className="font-normal text-slate-400 ml-1">
                                      (o canjea por otros premios)
                                    </span>
                                  </p>
                                )}
                                <p className="text-xs text-amber-600 mt-1">
                                  {labelDental(cat)} ·{" "}
                                  {(puntosXAseg / multiplicadorPremio).toLocaleString()} pts/asegurado ({useDentalTarjetaFormula ? "con dental" : "sin dental"})
                                  {multiplicadorPremio === 2 ? ` · x2 por ${SEGURISIMOS_MIN_ASEGURADOS_X2} o más asegurados` : ` · x2 a partir de ${SEGURISIMOS_MIN_ASEGURADOS_X2} asegurados`}
                                  {" · se acreditan al 4º mes, caducan a los 12 meses · tarjeta prepago: 10 pts = 1 €"}
                                </p>
                                {/* Oferta pública campaña — en el desglose expandido */}
                                {(() => {
                                  const mp = getMensajePublico(product.id, asegurados.length, useDentalTarjetaFormula);
                                  if (!mp) return null;
                                  const esAutonomos = CAMPAIGN_AUTONOMOS_IDS.has(product.id);
                                  const es25 = mesesGratis === "descuento25";
                                  return (
                                    <div className="mt-2 pt-2 border-t border-amber-200">
                                      <p className="text-[10px] font-bold uppercase tracking-wide text-amber-600 mb-1">
                                        Lo que ve el cliente
                                      </p>
                                      <p className="text-sm font-black" style={{ color: mp.color }}>
                                        {esAutonomos ? "🏷️" : "🎁"}{" "}
                                        {es25
                                          ? "25% de descuento (3+ asegurados)"
                                          : esAutonomos
                                            ? `${getAutonomosDiscountTier(product.id, asegurados.length) * 100}% de descuento en la prima`
                                            : typeof mesesGratis === "number"
                                              ? `${mesesGratis > 0 ? `${mesesGratis} ${mesesGratis === 1 ? "mes" : "meses"} gratis + ` : ""}${puntosXAseg.toLocaleString()} puntos/asegurado`
                                              : `${puntosXAseg.toLocaleString()} puntos/asegurado`}
                                      </p>
                                      {esAutonomos && (
                                        <p className="text-xs font-semibold mt-0.5" style={{ color: mp.color, opacity: 0.8 }}>
                                          {product.id === "negocios-nif"
                                            ? "5% con 1-3 aseg. · 10% con 4+ aseg."
                                            : "5% con 1-3 aseg. · 15% con 4+ aseg. (7,5% en 1ª renovación, 0% en la 2ª)"}
                                        </p>
                                      )}
                                    </div>
                                  );
                                })()}
                              </div>
                            </td>
                          </tr>
                        )}
                        {/* Seniors / Plena Total Seniors: abono en cuenta en lugar de puntos */}
                        {abonoTotal > 0 && (
                          <tr>
                            <td colSpan={4} className="pt-3">
                              <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                                {typeof mesesGratis === "number" && mesesGratis > 0 && (
                                  <p className="inline-block mb-2 px-3 py-1 rounded-lg bg-[#E4097D] text-white text-base font-black">
                                    🎁 {mesesGratis} {mesesGratis === 1 ? "mes gratis" : "meses gratis"}
                                  </p>
                                )}
                                <p className="text-sm font-bold text-emerald-800">
                                  💶 Campaña Segurísimos · Abono en cuenta
                                </p>
                                <p className="text-xs text-emerald-700 mt-0.5">
                                  {abonoXAseg} € × {validCountOf(preciosPorPersona)} asegurado{validCountOf(preciosPorPersona) > 1 ? "s" : ""}
                                  {" = "}
                                  <span className="font-bold text-lg text-emerald-800">
                                    {abonoTotal.toLocaleString()} €
                                  </span>
                                </p>
                                <p className="text-xs text-emerald-600 mt-1">
                                  {abonoXAseg / multiplicadorPremio} €/asegurado ({useDentalTarjetaFormula ? "con dental" : "sin dental"})
                                  {multiplicadorPremio === 2 ? ` · x2 por ${SEGURISIMOS_MIN_ASEGURADOS_X2} o más asegurados` : ` · x2 a partir de ${SEGURISIMOS_MIN_ASEGURADOS_X2} asegurados`}
                                  {" · Seniors no acumula puntos: el premio se abona en la cuenta bancaria al 4º mes"}
                                </p>
                                {(() => {
                                  const mp = getMensajePublico(product.id, asegurados.length, useDentalTarjetaFormula);
                                  if (!mp) return null;
                                  return (
                                    <div className="mt-2 pt-2 border-t border-emerald-200">
                                      <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-600 mb-1">
                                        Lo que ve el cliente
                                      </p>
                                      <p className="text-sm font-black" style={{ color: mp.color }}>
                                        {mp.text.replace("Oferta pública: ", "")}
                                      </p>
                                    </div>
                                  );
                                })()}
                              </div>
                            </td>
                          </tr>
                        )}
                        {/* Oferta pública para productos sin puntos (autónomos/pymes) */}
                        {CAMPAIGN_AUTONOMOS_IDS.has(product.id) && (
                          <tr>
                            <td colSpan={4} className="pt-3">
                              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                                <p className="text-sm font-bold text-blue-800">🏷️ Campaña · Descuento en prima</p>
                                <p className="text-xs text-blue-700 mt-0.5">
                                  {product.id === "pymes-total"
                                    ? `Tarifa de campaña ${asegurados.length >= 4 ? "de 4 o más asegurados" : "de 1 a 3 asegurados"} — el descuento ya está incluido en las primas`
                                    : `${getAutonomosDiscountTier(product.id, asegurados.length) * 100}% aplicado en este presupuesto`}
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                  {product.id === "negocios-nif"
                                    ? "5% con 1-3 aseg. · 10% con 4+ aseg."
                                    : "Tarifa agosto 2026 · el 15% de 4+ aseg. baja a 7,5% en la 1ª renovación y desaparece en la 2ª"}
                                  {product.id === "negocios-nif"
                                    ? " · Sin meses gratis · Suma puntos Segurísimos · Solo pólizas nuevas"
                                    : " · Sin meses gratis ni puntos · Solo pólizas nuevas"}
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                        {/* Aviso condición Pymes Total ≥68 años */}
                        {product.id === "pymes-total" && asegurados.some(e => e >= 68) && (
                          <tr>
                            <td colSpan={4} className="pt-3">
                              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                                <p className="text-xs font-bold text-amber-800">⚠️ Condición para asegurados ≥68 años</p>
                                <p className="text-xs text-amber-700 mt-0.5">
                                  Por cada asegurado de 68 o más años son necesarios 3 asegurados menores de 60 años en la póliza.
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tfoot>
                    </table>

                    {/* Botón generar presupuesto */}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedQuote({
                            id:                   product.id,
                            producto:             product.name,
                            provincia,
                            zona,
                            preciosPorPersona,
                            subtotal,
                            descAuto,
                            ratioAuto,
                            labelDescAuto:        labelAutoDiscount(product.id, asegurados.length),
                            descComercial,
                            pctComercialEfectivo,
                            total,
                            totalPuntos,
                            puntosXAseg,
                            abonoXAseg,
                            abonoTotal,
                            mesesGratis,
                            hayNulos,
                          });
                          setClienteNombre("");
                          setClienteTelefono("");
                          setClienteEmail("");
                          setShowQuoteModal(true);
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#003087] hover:bg-[#002060] text-white text-sm font-semibold rounded-xl transition shadow-sm"
                      >
                        📄 Generar presupuesto
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Catálogo de premios Segurísimos ── */}
          {maxPuntos > 0 && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => setMostrarPremios((v) => !v)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <Gift size={20} className="text-amber-500" />
                  <div className="text-left">
                    <p className="font-bold text-slate-800">Catálogo de premios · Segurísimos</p>
                    <p className="text-xs text-slate-500">
                      Con {maxPuntos.toLocaleString()} puntos máx. ·{" "}
                      {getTarjetaPrepagoEuros(maxPuntos) > 0
                        ? `🎴 ${getTarjetaPrepagoEuros(maxPuntos).toLocaleString()} € en tarjeta prepago${premiosAlcanzables.length > 0 ? ` o ${premiosAlcanzables.at(-1)?.items.join(", ")}` : ""}`
                        : "Aún no se alcanzan premios (mínimo 500 puntos)"}
                    </p>
                  </div>
                </div>
                {mostrarPremios
                  ? <ChevronUp size={18} className="text-slate-400" />
                  : <ChevronDown size={18} className="text-slate-400" />
                }
              </button>

              {mostrarPremios && (
                <div className="border-t border-slate-100 px-6 py-5">
                  {/* Tarjeta prepago — premio prioritario, siempre primero */}
                  <div className="mb-4 p-4 bg-slate-800 rounded-xl text-white flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-amber-300">⭐ Premio recomendado</p>
                      <p className="text-base font-bold">🎴 Tarjeta prepago Visa Segurísimos (MoneyToPay)</p>
                      <p className="text-xs text-slate-300 mt-0.5">
                        A partir de 500 puntos · cada 10 puntos = 1 € de saldo · se usa en cualquier comercio
                        físico u online, sin cuenta bancaria
                      </p>
                    </div>
                    {getTarjetaPrepagoEuros(maxPuntos) > 0 && (
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wide text-slate-300">Con {maxPuntos.toLocaleString()} pts</p>
                        <p className="text-2xl font-black text-green-400">{getTarjetaPrepagoEuros(maxPuntos).toLocaleString()} €</p>
                      </div>
                    )}
                  </div>

                  {/* Catálogo visual por niveles (estilo folleto Segurísimos):
                      tarjeta prepago siempre primero, luego los regalos con icono. */}
                  <div className="flex flex-wrap gap-x-4 gap-y-5">
                    {PREMIOS_SEGURISIMOS.map((nivel) => {
                      const alcanzado = maxPuntos >= nivel.pts;
                      const tarjeta = getTarjetaPrepagoEuros(nivel.pts);
                      return (
                        <div
                          key={nivel.pts}
                          className={`flex-auto min-w-[200px] transition ${alcanzado ? "" : "opacity-50 grayscale"}`}
                        >
                          <div className={`inline-flex items-center gap-1.5 px-4 py-1 rounded-t-lg text-xs font-black tracking-wide text-white ${
                            alcanzado ? "bg-[#3A9AD9]" : "bg-slate-400"
                          }`}>
                            {alcanzado ? "✓" : <Lock size={11} />}
                            {nivel.pts.toLocaleString()} PUNTOS
                          </div>
                          <div className={`flex items-stretch divide-x rounded-b-xl rounded-tr-xl ${
                            alcanzado ? "bg-sky-50 divide-sky-300 ring-1 ring-sky-200" : "bg-slate-100 divide-slate-300"
                          }`}>
                            {/* Tarjeta prepago — premio prioritario */}
                            <div className="flex flex-col items-center text-center px-3 py-3 min-w-[96px] bg-slate-800 text-white rounded-bl-xl">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-700 flex items-center justify-center shadow">
                                <CreditCard size={24} />
                              </div>
                              <p className="mt-2 text-lg font-black leading-tight text-green-400">{tarjeta.toLocaleString()} €</p>
                              <p className="text-[11px] leading-tight text-slate-300">tarjeta prepago</p>
                            </div>
                            {nivel.items.map((item, i) => {
                              const { Icon, bg } = ICONO_PREMIO[item.tipo];
                              return (
                                <div key={i} className="flex flex-col items-center text-center px-2.5 py-3 min-w-[92px] flex-1">
                                  <div className={`w-12 h-12 rounded-full ${bg} text-white flex items-center justify-center shadow-sm`}>
                                    <Icon size={22} />
                                  </div>
                                  <p className="mt-2 text-sm font-black leading-tight text-slate-800">{item.destacado}</p>
                                  <p className="text-[11px] leading-tight text-slate-500">{item.detalle}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-xs text-slate-400 mt-4 text-center">
                    {CAMPAIGN_VIGENCIA_TEXT} · Catálogo sujeto a disponibilidad
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── Notas productos especiales y reglas generales de la campaña ── */}
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl px-6 py-4 text-sm text-blue-800">
              <p className="font-bold mb-1">ℹ️ Adeslas PYMES Total y Negocios NIF</p>
              <p className="text-xs text-blue-700">
                Sin meses gratis. Pymes Total no acumula puntos; Negocios NIF sí (500 / 750 pts por asegurado sin / con
                dental, x2 con 3 o más asegurados). Descuento en prima: <strong>5%</strong> (1-3 aseg.) ·{" "}
                <strong>10%</strong> Negocios NIF / <strong>15%</strong> Pymes Total (4+ aseg.). Además, el agente
                puede cederse hasta {CAMPAIGN_MAX_COMISION_PCT}% de su comisión: en Negocios NIF sin aportación de la
                Compañía; en Pymes Total la Compañía aporta lo mismo, hasta un {CAMPAIGN_PYMES_TOTAL_MAX_COMISION_PCT}% en total.
                {" "}{CAMPAIGN_PYMES_TOTAL_RENOVACION_TEXT}
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 text-sm text-amber-800">
              <p className="font-bold mb-1">ℹ️ Reembolso adicional (particulares, 2+ asegurados)</p>
              <p className="text-xs text-amber-700">
                Reembolso del {CAMPAIGN_REEMBOLSO_PCT}% en especialistas fuera de cuadro médico, hasta{" "}
                {CAMPAIGN_REEMBOLSO_MAX_ANUAL}€/año por asegurado, hasta la 1ª renovación. {CAMPAIGN_REEMBOLSO_EXCLUSIONES}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm text-slate-700">
              <p className="font-bold mb-1">ℹ️ Condiciones generales de la campaña</p>
              <p className="text-xs text-slate-500">
                No aplica en {CAMPAIGN_EXCLUDED_PROVINCE}. {CAMPAIGN_NO_REEMPLAZOS_TEXT} {CAMPAIGN_DENTAL_MAX_INCOMPATIBLE_TEXT}
                {" "}Dudas: 93 275 02 73 · masproteccion@segurcaixaadeslas.es
              </p>
            </div>
          </div>

          {/* ── Footer ── */}
          <p className="text-center text-xs text-slate-400 pb-4">
            Tarifas 2026 · Solo para uso interno · No compartir públicamente
          </p>
        </div>
      </div>

      {/* ── Modal: generar presupuesto PDF ── */}
      {showQuoteModal && selectedQuote && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowQuoteModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">📄</span>
              <h3 className="text-lg font-bold text-[#003087]">Generar presupuesto</h3>
            </div>
            <p className="text-sm text-slate-500 mb-5 pl-9">
              <span className="font-semibold text-slate-700">{selectedQuote.producto}</span>
              {" · "}{selectedQuote.provincia}{" · "}
              <span className="font-bold text-[#009DD9]">{selectedQuote.total.toFixed(2).replace(".", ",")} €/mes</span>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Nombre del cliente <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={clienteNombre}
                  onChange={(e) => setClienteNombre(e.target.value)}
                  placeholder="Ej. Juan García"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#009DD9]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Teléfono <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <input
                  type="tel"
                  value={clienteTelefono}
                  onChange={(e) => setClienteTelefono(e.target.value)}
                  placeholder="Ej. 600 123 456"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#009DD9]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Email <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <input
                  type="email"
                  value={clienteEmail}
                  onChange={(e) => setClienteEmail(e.target.value)}
                  placeholder="Ej. cliente@email.com"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#009DD9]"
                />
              </div>
            </div>

            {/* ── Toggle puntos Segurísimos ── */}
            {selectedQuote && selectedQuote.totalPuntos > 0 && (
              <div className="flex items-center justify-between gap-3 mt-5 px-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⭐</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 leading-tight">Incluir puntos Segurísimos</p>
                    <p className="text-xs text-slate-400">Añade la sección de campaña al PDF</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIncludePuntosPdf((v) => !v)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${includePuntosPdf ? "bg-amber-400" : "bg-slate-200"}`}
                  role="switch"
                  aria-checked={includePuntosPdf}
                >
                  <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition duration-200 ${includePuntosPdf ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            )}

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowQuoteModal(false)}
                className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  try {
                    await generateQuotePdf(selectedQuote!, {
                      nombre:        clienteNombre   || undefined,
                      telefono:      clienteTelefono || undefined,
                      email:         clienteEmail    || undefined,
                      includePuntos: includePuntosPdf,
                    });
                    setShowQuoteModal(false);
                  } catch (err) {
                    console.error("[PDF] Error al generar el presupuesto:", err);
                    alert("No se ha podido generar el PDF. Consulta la consola para más detalles.");
                  }
                }}
                className="flex-1 px-4 py-2.5 bg-[#003087] hover:bg-[#002060] text-white font-semibold rounded-xl transition shadow-sm flex items-center justify-center gap-2"
              >
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
