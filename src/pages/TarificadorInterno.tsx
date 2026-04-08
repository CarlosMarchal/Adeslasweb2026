import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Trash2, Plus, ChevronDown, ChevronUp, Gift } from "lucide-react";
import { products, provinces, getPrice, getZoneFromProvince } from "@/data/pricing";

/* ─── Constantes ────────────────────────────────────────────── */
const MAX_COMMERCIAL_DISCOUNT       = 5;  // % máximo para productos generales
const MAX_COMMERCIAL_DISCOUNT_PYMES = 10; // % máximo exclusivo Pymes Total

/**
 * Descuento automático por volumen según producto y nº de asegurados.
 * Reglas:
 *   · Adeslas GO                          → 2+ aseg: 10%
 *   · Adeslas Plena Vital / Plena Plus    → 4+ aseg: 10%
 *   · Plena Vital Total / Plena Total
 *     / Seniors Total                     → 3 aseg: 5% | 4 aseg: 10% | 5+: 15%
 *   · Resto de productos                  → sin descuento automático
 */
function getAutoDiscount(productId: string, n: number): number {
  switch (productId) {
    case "ya":                // Adeslas GO
      return n >= 2 ? 0.10 : 0;
    case "esencial":          // Adeslas Plena Vital
    case "completaPlusPlus":  // Adeslas Plena Plus
      return n >= 4 ? 0.10 : 0;
    case "completaPlus":      // Adeslas Plena Vital Total
    case "completa":          // Adeslas Plena Total
    case "seniors-total":     // Adeslas Seniors Total
      if (n >= 5) return 0.15;
      if (n >= 4) return 0.10;
      if (n >= 3) return 0.05;
      return 0;
    default:
      return 0;
  }
}

/** Etiqueta legible para el descuento automático */
function labelAutoDiscount(productId: string, n: number): string {
  const pct = getAutoDiscount(productId, n) * 100;
  if (pct === 0) return "";
  const trigger: Record<string, string> = {
    "ya":               "≥2 asegurados",
    "esencial":         "≥4 asegurados",
    "completaPlusPlus": "≥4 asegurados",
    "completaPlus":     n >= 5 ? "≥5 asegurados" : n >= 4 ? "≥4 asegurados" : "≥3 asegurados",
    "completa":         n >= 5 ? "≥5 asegurados" : n >= 4 ? "≥4 asegurados" : "≥3 asegurados",
    "seniors-total":    n >= 5 ? "≥5 asegurados" : n >= 4 ? "≥4 asegurados" : "≥3 asegurados",
  };
  return `Dto. ${pct}% (${trigger[productId] ?? ""})`;
}

/* ─── Clasificación de campaña "Segurísimos" por producto ───── */
type CampaignCat = "go" | "salud_sin" | "salud_con" | "seniors_sin" | "seniors_con" | "sin_puntos";

const CAMPAIGN_CAT: Record<string, CampaignCat> = {
  "ya":               "go",          // Adeslas GO (sin dental)
  "esencial":         "salud_sin",   // Plena Vital
  "completaPlus":     "salud_con",   // Plena Vital Total ← con dental
  "completaPlusPlus": "salud_sin",   // Plena Plus
  "completa":         "salud_con",   // Plena Total ← con dental
  "reembolso":        "salud_sin",   // Plena Extra
  "plena":            "salud_sin",   // Plena
  "pymes-total":      "sin_puntos",  // Pymes Total → no acumula puntos, dto comercial hasta 10%
  "negocios-nif":     "salud_sin",   // Negocios NIF
  "seniors":          "seniors_sin", // Seniors → abono en cuenta
  "seniors-total":    "seniors_con", // Seniors Total (con dental) → abono en cuenta
};

/* ─── Cálculo de puntos por asegurado ──────────────────────── */
function puntosXAsegurado(cat: CampaignCat, totalAsegurados: number): number {
  const es3plus = totalAsegurados >= 3;
  if (cat === "go")        return es3plus ? 500  : 250;
  if (cat === "salud_sin") return es3plus ? 1000 : 500;
  if (cat === "salud_con") return es3plus ? 1500 : 750;
  // "sin_puntos" y "seniors_*" → 0
  return 0;
}

/* ─── Cálculo de abono en cuenta por asegurado (Seniors) ────── */
function abonoXAsegurado(cat: CampaignCat, totalAsegurados: number): number {
  const es3plus = totalAsegurados >= 3;
  if (cat === "seniors_sin") return es3plus ? 100 : 50;
  if (cat === "seniors_con") return es3plus ? 150 : 75;
  return 0;
}

/* ─── Catálogo de premios ───────────────────────────────────── */
const PREMIOS = [
  {
    pts: 500,
    items: [
      "🎴 Tarjeta prepago 50 €",
      "📺 Netflix 50 € de saldo",
      "🎬 Disney+ 3 meses",
      "📡 Movistar+ 3 meses",
      "⚽ DAZN Fútbol 2 meses",
      "🏎️ DAZN Motor 2 meses",
      "🚨 Baliza emergencia V16",
    ],
  },
  {
    pts: 1000,
    items: [
      "📺 Netflix 100 € de saldo",
      "🏀 DAZN Baloncesto 12 meses",
      "🏆 DAZN Premium 3 meses",
    ],
  },
  {
    pts: 1500,
    items: [
      "📺 Netflix 150 € de saldo",
      "🎬 Disney+ 12 meses",
      "🏀 DAZN Baloncesto 12 meses",
      "🎧 Galaxy Buds3",
    ],
  },
  { pts: 2000,  items: ["🎧 AirPods 4"] },
  { pts: 3000,  items: ["⌚ Apple Watch SE 3 GPS 44 mm", "📱 Tablet Samsung Galaxy A11 WiFi 128 GB"] },
  { pts: 5000,  items: ["💻 iPad WiFi 256 GB"] },
  { pts: 7000,  items: ["⌚ Galaxy Watch Ultra LTE 47 mm"] },
  { pts: 10000, items: ["📱 iPhone 17 256 GB", "📱 Samsung Galaxy Z Flip7 256 GB"] },
];

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
  const [descuentoPymes, setDescuentoPymes]         = useState<number>(0);
  const [mostrarPremios, setMostrarPremios] = useState(false);
  const [grupo, setGrupo] = useState<"general" | "seniors" | "pymes">("general");

  const zona        = getZoneFromProvince(provincia);
  const pctGeneral  = Math.min(Math.max(descuentoComercial, 0), MAX_COMMERCIAL_DISCOUNT);
  const pctPymes    = Math.min(Math.max(descuentoPymes, 0), MAX_COMMERCIAL_DISCOUNT_PYMES);

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
          precio: getPrice(product, edad, zona),
          banda: getBandLabel(edad),
        }));

        const hayNulos = preciosPorPersona.some((p) => p.precio === null);
        const validCount = preciosPorPersona.filter((p) => p.precio !== null).length;
        const subtotal = preciosPorPersona.reduce((s, p) => s + (p.precio ?? 0), 0);

        // 1) Descuento automático por volumen (reglas específicas por producto)
        const ratioAuto = getAutoDiscount(product.id, asegurados.length);
        const descAuto = subtotal * ratioAuto;
        const baseTrasFamiliar = subtotal - descAuto;

        // 2) Descuento comercial: slider independiente según producto
        const pctComercialEfectivo = product.id === "pymes-total" ? pctPymes : pctGeneral;
        const descComercial = baseTrasFamiliar * (pctComercialEfectivo / 100);
        const total = baseTrasFamiliar - descComercial;

        // Puntos o abono
        const puntosXAseg = isSeniors ? 0 : puntosXAsegurado(cat, asegurados.length);
        const totalPuntos = puntosXAseg * validCount;
        const abonoXAseg  = isSeniors ? abonoXAsegurado(cat, asegurados.length) : 0;
        const totalAbono  = abonoXAseg * validCount;

        return {
          product, cat, isSeniors,
          subtotal, descAuto, ratioAuto, descComercial, total,
          preciosPorPersona, hayNulos,
          totalPuntos, totalAbono,
          puntosXAseg, abonoXAseg,
          pctComercialEfectivo,
        };
      })
      .filter((r) => r.subtotal > 0 && esElegible(r.product.id))
      .sort((a, b) => a.total - b.total);
  }, [asegurados, zona, pctGeneral, pctPymes, hayMayoresDe70, contMenoresDe65]);

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
      <Helmet>
        <title>Tarificador Interno · Adeslas 2026 — Marchal Aseguradores</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

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
                    💡 Descuentos automáticos: GO ≥2 · Plena/Plus ≥4 · Totales 3/4/5+ aseg.
                  </p>
                )}
              </div>
            </div>

            {/* Fila 2: Descuentos comerciales separados */}
            <div className={`border-t border-slate-100 pt-5 grid gap-6 ${grupo === "pymes" || grupo === "seniors" ? "md:grid-cols-1 max-w-md" : "md:grid-cols-2"}`}>

              {/* Descuento general (todos excepto Pymes Total) */}
              <div className={grupo === "pymes" ? "hidden" : "block"}>
                <label className="block text-sm font-semibold text-slate-600 mb-1">
                  Descuento comercial — resto de productos
                </label>
                <p className="text-xs text-slate-400 mb-3">Máx. 5% · Va contra tu comisión</p>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={5}
                    step={0.5}
                    value={descuentoComercial}
                    onChange={(e) => setDescuentoComercial(parseFloat(e.target.value))}
                    className="flex-1 accent-[#009DD9]"
                  />
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={5}
                      step={0.5}
                      value={descuentoComercial}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        if (!isNaN(v)) setDescuentoComercial(Math.min(5, Math.max(0, v)));
                      }}
                      className="w-14 px-2 py-2 border border-slate-200 rounded-lg text-center font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#009DD9]"
                    />
                    <span className="font-bold text-slate-600">%</span>
                  </div>
                </div>
                {descuentoComercial > 0 && (
                  <p className="text-xs font-semibold text-[#009DD9] mt-1.5">
                    ✓ Aplicando {descuentoComercial}% a todos los productos (excepto Pymes Total)
                  </p>
                )}
              </div>

              {/* Descuento exclusivo Pymes Total */}
              <div className={`bg-pink-50 border border-pink-200 rounded-xl p-4 ${grupo !== "pymes" ? "hidden" : ""}`}>
                <label className="block text-sm font-semibold text-pink-700 mb-1">
                  Descuento comercial — Pymes Total
                </label>
                <p className="text-xs text-pink-500 mb-3">Máx. 10% (5% agente + 5% compañía) · Va contra tu comisión</p>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.5}
                    value={descuentoPymes}
                    onChange={(e) => setDescuentoPymes(parseFloat(e.target.value))}
                    className="flex-1 accent-pink-500"
                  />
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={0}
                      max={10}
                      step={0.5}
                      value={descuentoPymes}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        if (!isNaN(v)) setDescuentoPymes(Math.min(10, Math.max(0, v)));
                      }}
                      className="w-14 px-2 py-2 border border-pink-200 rounded-lg text-center font-bold text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                    />
                    <span className="font-bold text-pink-600">%</span>
                  </div>
                </div>
                {descuentoPymes > 0 && (
                  <p className="text-xs font-semibold text-pink-600 mt-1.5">
                    ✓ Aplicando {descuentoPymes}% a Pymes Total
                  </p>
                )}
              </div>
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
              subtotal, descAuto, ratioAuto, descComercial, total,
              preciosPorPersona, hayNulos,
              totalPuntos, totalAbono,
              puntosXAseg, abonoXAseg,
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

                    {/* Incentivo campaña */}
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {!isSeniors && totalPuntos > 0 && (() => {
                        const tarjeta = Math.floor(totalPuntos / 500) * 50;
                        return (
                          <>
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full">
                              ⭐ {totalPuntos.toLocaleString()} puntos
                              <span className="font-normal text-amber-500">
                                ({puntosXAseg.toLocaleString()} × {asegurados.length} aseg.)
                              </span>
                            </span>
                            {tarjeta > 0 && (
                              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 bg-slate-800 text-white rounded-full">
                                🎴 Tarjeta prepago {tarjeta} €
                              </span>
                            )}
                          </>
                        );
                      })()}
                      {isSeniors && totalAbono > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full">
                          💶 Abono en cuenta: {totalAbono} €
                          <span className="font-normal text-green-500">
                            ({abonoXAseg} € × {asegurados.length} aseg.)
                          </span>
                        </span>
                      )}
                    </div>

                    {/* Resumen descuentos aplicados en la fila */}
                    {(ratioAuto > 0 || pctComercialEfectivo > 0) && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        Bruto {subtotal.toFixed(2)} €
                        {ratioAuto > 0 && ` · ${labelAutoDiscount(product.id, asegurados.length)} -${descAuto.toFixed(2)} €`}
                        {pctComercialEfectivo > 0 && ` · Comercial -${descComercial.toFixed(2)} €`}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      {(ratioAuto > 0 || pctComercialEfectivo > 0) && (
                        <p className="text-xs line-through text-slate-400">
                          {subtotal.toFixed(2)} €
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
                        {/* Incentivo */}
                        {!isSeniors && totalPuntos > 0 && (
                          <tr>
                            <td colSpan={4} className="pt-3">
                              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                                <p className="text-sm font-bold text-amber-800">
                                  ⭐ Campaña Segurísimos · Puntos
                                </p>
                                <p className="text-xs text-amber-700 mt-0.5">
                                  {puntosXAseg.toLocaleString()} puntos × {asegurados.length} asegurado{asegurados.length > 1 ? "s" : ""}
                                  {" = "}
                                  <span className="font-bold text-lg text-amber-800">
                                    {totalPuntos.toLocaleString()} puntos
                                  </span>
                                </p>
                                {Math.floor(totalPuntos / 500) * 50 > 0 && (
                                  <p className="text-xs font-bold text-slate-800 mt-1.5 bg-white border border-slate-300 rounded-lg px-3 py-1.5 inline-block">
                                    🎴 Tarjeta prepago disponible:{" "}
                                    <span className="text-base text-slate-900">
                                      {Math.floor(totalPuntos / 500) * 50} €
                                    </span>
                                    <span className="font-normal text-slate-400 ml-1">
                                      (o canjea por otros premios)
                                    </span>
                                  </p>
                                )}
                                <p className="text-xs text-amber-600 mt-1">
                                  {labelDental(cat)} ·{" "}
                                  {asegurados.length >= 3 ? "Tarifa 3+ asegurados" : "Tarifa 1-2 asegurados"}
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                        {isSeniors && totalAbono > 0 && (
                          <tr>
                            <td colSpan={4} className="pt-3">
                              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                                <p className="text-sm font-bold text-green-800">
                                  💶 Campaña Segurísimos · Abono en cuenta
                                </p>
                                <p className="text-xs text-green-700 mt-0.5">
                                  {abonoXAseg} € × {asegurados.length} asegurado{asegurados.length > 1 ? "s" : ""}
                                  {" = "}
                                  <span className="font-bold text-lg text-green-800">
                                    {totalAbono} €
                                  </span>
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                  {cat === "seniors_con" ? "Con dental (Seniors Total)" : "Sin dental"} ·{" "}
                                  {asegurados.length >= 3 ? "Tarifa 3+ asegurados" : "Tarifa 1-2 asegurados"} ·{" "}
                                  Abono directo en cuenta bancaria
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
                      {premiosAlcanzables.length > 0
                        ? `Hasta ${premiosAlcanzables.at(-1)?.items.join(", ")}`
                        : "Aún no se alcanzan premios"}
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
                  {/* Tarjeta prepago – siempre visible */}
                  <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-600">
                    🎴 <strong>Tarjeta prepago MoneyToPay</strong> · Cada 500 puntos = 50 € de saldo
                    {maxPuntos >= 500 && (
                      <span className="ml-2 font-bold text-green-600">
                        → {Math.floor(maxPuntos / 500) * 50} € disponibles
                      </span>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {PREMIOS.map((nivel) => {
                      const alcanzado = maxPuntos >= nivel.pts;
                      return (
                        <div
                          key={nivel.pts}
                          className={`rounded-xl border p-4 ${
                            alcanzado
                              ? "border-amber-300 bg-amber-50"
                              : "border-slate-200 bg-slate-50 opacity-50"
                          }`}
                        >
                          <p className={`text-xs font-bold mb-2 ${
                            alcanzado ? "text-amber-700" : "text-slate-500"
                          }`}>
                            {alcanzado ? "✓" : "🔒"} {nivel.pts.toLocaleString()} puntos
                          </p>
                          <ul className="space-y-1">
                            {nivel.items.map((item, i) => (
                              <li key={i} className={`text-xs ${alcanzado ? "text-amber-800" : "text-slate-500"}`}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-xs text-slate-400 mt-4 text-center">
                    Campaña válida hasta el 30/06/2026 · Catálogo sujeto a disponibilidad
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── Notas productos especiales ── */}
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl px-6 py-4 text-sm text-blue-800">
              <p className="font-bold mb-1">ℹ️ Adeslas PYMES Total</p>
              <p className="text-xs text-blue-700">
                No acumula puntos en la campaña Segurísimos. Descuento máximo: <strong>10%</strong> (5% agente + 5% compañía) · Va contra tu comisión.
              </p>
            </div>
          </div>

          {/* ── Footer ── */}
          <p className="text-center text-xs text-slate-400 pb-4">
            Tarifas 2026 · Solo para uso interno · No compartir públicamente
          </p>
        </div>
      </div>
    </>
  );
}
