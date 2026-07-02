'use client';

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "@/lib/motion";
import { useSeo } from "@/hooks/use-seo";
import { TarificadorProvider, useTarificador } from "@/components/TarificadorContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BASE = "https://adeslas.numero1salud.es";

/* ─── FAQ data ─── */
const FAQS = [
  {
    q: "¿Cuánto cuesta un seguro Adeslas en 2026?",
    a: "Los precios de los seguros Adeslas en 2026 parten de 21€/mes (Adeslas GO para una persona de 30 años en Madrid). Los planes completos con hospitalización empiezan desde 38€/mes (Plena Vital con copago) o 50,92€/mes (Plena Plus sin copago). El precio exacto varía según tu edad, provincia y número de asegurados.",
  },
  {
    q: "¿Por qué varía el precio de Adeslas según la edad?",
    a: "Como en todos los seguros de salud, el precio de Adeslas aumenta con la edad porque el riesgo de usar los servicios médicos es mayor. El incremento es progresivo y se refleja en tablas actuariales. Para personas mayores de 55 años existen los planes Adeslas Seniors y Seniors Total, específicamente diseñados para este segmento.",
  },
  {
    q: "¿Hay descuentos en los precios de Adeslas para familias?",
    a: "Sí. Adeslas aplica descuentos por familia en determinados planes: 5% con 3 asegurados, 10% con 4 asegurados y 15% con 5 o más asegurados (en planes como Plena Total). Además, incluir hijos menores de cierta edad puede tener tarifas reducidas.",
  },
  {
    q: "¿Qué factores afectan al precio de Adeslas?",
    a: "El precio de un seguro Adeslas depende de: tu edad (factor más determinante), la provincia de residencia, el plan elegido (GO, Plena Vital, Plena Plus, Plena Total, etc.), el número de asegurados y la periodicidad de pago (mensual, trimestral, semestral o anual). El cuestionario de salud no afecta al precio base pero puede generar exclusiones.",
  },
  {
    q: "¿Tiene Adeslas descuentos por forma de pago?",
    a: "Sí. Adeslas ofrece bonificaciones sobre el precio mensual según la periodicidad: pago trimestral 2% de descuento, semestral 4% de descuento, anual 6% de descuento. El pago anual es la opción más económica a largo plazo.",
  },
  {
    q: "¿Puedo subir de plan Adeslas sin cambiar de precio?",
    a: "No. Cambiar a un plan superior implica pagar la diferencia de prima. Sin embargo, Adeslas Plena Total incluye una garantía de precio por 3 años, lo que significa que la prima no puede subir durante ese período, protegiéndote de revisiones anuales de tarifa.",
  },
  {
    q: "¿Los precios de Adeslas suben cada año?",
    a: "En general sí, como en todos los seguros médicos privados, las primas se revisan anualmente. La excepción es Adeslas Plena Total, que incluye una garantía de precio por 3 años. Esta garantía es uno de los argumentos más valorados de este plan.",
  },
];

/* ─── Precios por plan ─── */
const PLANES = [
  {
    nombre: "Adeslas GO",
    tipo: "Ambulatorio",
    desde: "21",
    unidad: "€/mes",
    copago: "Sí · LMA 260€/año",
    hospitalizacion: "No incluida",
    dental: "No",
    psicologia: "No",
    garantiaPrecio: "No",
    edadMax: "70 años",
    color: "#4A9FD4",
    slug: "/seguro-salud/adeslas-go/",
    destacado: false,
    pillar: "Básico",
  },
  {
    nombre: "Adeslas Plena Vital",
    tipo: "Completo con copago",
    desde: "38",
    unidad: "€/mes",
    copago: "Sí · LMA 260€/año",
    hospitalizacion: "Incluida",
    dental: "No",
    psicologia: "No",
    garantiaPrecio: "No",
    edadMax: "70 años",
    color: "#0078C8",
    slug: "/seguro-salud/adeslas-plena-vital/",
    destacado: false,
    pillar: "Popular",
  },
  {
    nombre: "Adeslas Plena Plus",
    tipo: "Completo sin copago",
    desde: "50,92",
    unidad: "€/mes",
    copago: "No",
    hospitalizacion: "Incluida",
    dental: "No",
    psicologia: "No",
    garantiaPrecio: "No",
    edadMax: "70 años",
    color: "#0057A8",
    slug: "/seguro-salud/adeslas-plena-plus/",
    destacado: false,
    pillar: "Sin copago",
  },
  {
    nombre: "Adeslas Plena Total",
    tipo: "El más completo",
    desde: "83",
    unidad: "€/mes",
    copago: "No",
    hospitalizacion: "Incluida",
    dental: "Sí (46 actos)",
    psicologia: "Sí (20 ses./año)",
    garantiaPrecio: "3 años",
    edadMax: "62 años",
    color: "#002D6E",
    slug: "/seguro-salud/adeslas-plena-total/",
    destacado: true,
    pillar: "Premium",
  },
];

/* ─── Tabla edad/precio estimado Plena Vital ─── */
const PRECIO_TABLA = [
  { edad: "25–29", go: "21–23", vital: "38–41", plus: "51–55", total: "83–89" },
  { edad: "30–34", go: "22–25", vital: "40–44", plus: "53–59", total: "88–95" },
  { edad: "35–39", go: "24–28", vital: "43–49", plus: "57–65", total: "95–105" },
  { edad: "40–44", go: "27–32", vital: "48–56", plus: "63–74", total: "105–120" },
  { edad: "45–49", go: "31–38", vital: "55–66", plus: "72–87", total: "120–143" },
  { edad: "50–54", go: "38–46", vital: "66–80", plus: "87–105", total: "143–170" },
];

/* ─── Factores de precio ─── */
const FACTORES = [
  { icon: "🎂", title: "Edad", desc: "El factor más determinante. A mayor edad, mayor prima. El incremento es progresivo." },
  { icon: "📍", title: "Provincia", desc: "El precio varía por comunidad autónoma. Madrid, Cataluña y País Vasco suelen ser más altas." },
  { icon: "👨‍👩‍👧‍👦", title: "Número de asegurados", desc: "Con 3+ asegurados hay descuentos. Más asegurados = mayor descuento (hasta 15% en Plena Total)." },
  { icon: "📅", title: "Periodicidad de pago", desc: "Descuento del 2% trimestral, 4% semestral y 6% anual sobre el precio mensual." },
  { icon: "🏥", title: "Plan elegido", desc: "GO es el más económico. Plena Total el más caro pero también el más completo." },
  { icon: "🔒", title: "Garantía de precio", desc: "Solo Plena Total incluye garantía de precio 3 años: la prima no puede subir durante ese periodo." },
];

/* ─── CTA Button ─── */
const CtaButton = ({ label = "Calcular mi precio exacto" }: { label?: string }) => {
  const { openTarificador } = useTarificador();
  return (
    <button
      onClick={() => openTarificador()}
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-base transition-all hover:scale-[1.03] active:scale-[0.98]"
      style={{ background: "linear-gradient(135deg, #009FE3, #0078C8)" }}
    >
      {label}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  );
};

/* ─── FAQ Accordion ─── */
const FaqItem = ({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) => (
  <div className="border-b" style={{ borderColor: "#E8EEF6" }}>
    <button
      className="w-full flex items-center justify-between gap-4 py-5 text-left font-semibold text-sm md:text-base"
      style={{ color: "#1A2B4A" }}
      onClick={onToggle}
      aria-expanded={open}
    >
      <span>{q}</span>
      <motion.span
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-lg font-bold"
        style={{ background: open ? "#009FE3" : "#1A2B4A" }}
      >
        +
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <p className="pb-5 text-sm leading-relaxed" style={{ color: "#4A5568" }}>{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ─── Main page ─── */
const PreciosAdeslasSEO = () => {
  // SSG: el SEO lo aporta el Server Component (generateMetadata). Este useSeo es
  // inerte (su retorno no se renderiza); se llama solo en cliente para no construir
  // el <Helmet> en el prerender (causaba BAILOUT_TO_CLIENT_SIDE_RENDERING).
  if (typeof window !== "undefined") useSeo({
    title: "Precios Adeslas 2026 | Tarifas Actualizadas · Desde 21€/mes",
    description: "Todos los precios de los seguros Adeslas en 2026: GO desde 21€, Plena Vital desde 38€, Plena Plus desde 50,92€ y Plena Total desde 83€/mes. Tabla de precios por edad y factores que afectan a tu tarifa.",
    canonical: `${BASE}/precios-adeslas/`,
    faqSchema: FAQS,
    breadcrumbs: [
      { name: "Inicio", url: `${BASE}/` },
      { name: "Precios Adeslas 2026", url: `${BASE}/precios-adeslas/` },
    ],
    ogImage: `${BASE}/og-default.jpg`,
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #002D6E 0%, #0057A8 55%, #0078C8 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
            <circle cx="700" cy="-50" r="300" fill="white" />
            <circle cx="100" cy="450" r="250" fill="white" />
          </svg>
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <nav className="flex items-center gap-2 text-xs mb-8 opacity-70 text-white">
            <Link to="/" className="hover:opacity-100">Inicio</Link>
            <span>›</span>
            <span>Precios Adeslas 2026</span>
          </nav>
          <div className="max-w-2xl">
            <div
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(0,159,227,0.25)", color: "#7ECEF4", border: "1px solid rgba(0,159,227,0.4)" }}
            >
              Tarifas actualizadas 2026
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
              Precios <span style={{ color: "#5EC6F1" }}>Adeslas</span> 2026:<br />
              Todas las Tarifas<br />
              Actualizadas
            </h1>
            <p className="text-base md:text-lg mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
              Consulta los precios actualizados de todos los seguros Adeslas para 2026. Tabla completa de tarifas por plan, factores que afectan al precio y calculador para obtener tu precio exacto en 2 minutos.
            </p>
            <div className="flex flex-wrap gap-3">
              <CtaButton />
              <a
                href="tel:917105000"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white text-base border-2 transition-all hover:bg-white hover:text-blue-900"
                style={{ borderColor: "rgba(255,255,255,0.4)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/></svg>
                91 710 50 00
              </a>
            </div>
            {/* Precio highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              {[
                { plan: "GO", desde: "21€/mes" },
                { plan: "Plena Vital", desde: "38€/mes" },
                { plan: "Plena Plus", desde: "50,92€/mes" },
                { plan: "Plena Total", desde: "83€/mes" },
              ].map((p) => (
                <div key={p.plan} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <div className="text-xs opacity-70 text-white mb-1">{p.plan}</div>
                  <div className="font-black text-sm" style={{ color: "#7ECEF4" }}>Desde {p.desde}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tarjetas de planes con precios ── */}
      <section className="py-14 md:py-20" style={{ background: "#F7FAFE" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: "#1A2B4A" }}>
              Precios de los seguros Adeslas 2026
            </h2>
            <p className="text-base" style={{ color: "#6B7280" }}>
              Precio desde para una persona de 30 años en Madrid. Usa el calculador para obtener tu precio exacto.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {PLANES.map((p) => (
              <div
                key={p.nombre}
                className="rounded-2xl overflow-hidden flex flex-col border"
                style={{
                  borderColor: p.destacado ? "#0057A8" : "#E8EEF6",
                  boxShadow: p.destacado ? "0 8px 32px rgba(0,87,168,0.2)" : undefined,
                }}
              >
                <div className="p-5 text-white" style={{ background: p.color }}>
                  {p.destacado && (
                    <div className="text-xs font-bold mb-2 opacity-80">⭐ Más contratado</div>
                  )}
                  <div className="text-xs font-semibold opacity-80 mb-1">{p.pillar}</div>
                  <h3 className="font-black text-base mb-2">{p.nombre}</h3>
                  <div className="text-xs opacity-70 mb-3">{p.tipo}</div>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-black">{p.desde}</span>
                    <span className="text-sm opacity-80 mb-1">{p.unidad}</span>
                  </div>
                </div>
                <div className="flex-1 p-5 bg-white space-y-3">
                  {[
                    { label: "Copago", val: p.copago },
                    { label: "Hospitalización", val: p.hospitalizacion },
                    { label: "Dental", val: p.dental },
                    { label: "Psicología", val: p.psicologia },
                    { label: "Garantía precio", val: p.garantiaPrecio },
                    { label: "Edad máx.", val: p.edadMax },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-xs border-b pb-2.5" style={{ borderColor: "#F3F6FA" }}>
                      <span style={{ color: "#6B7280" }}>{row.label}</span>
                      <span className="font-semibold" style={{ color: "#1A2B4A" }}>{row.val}</span>
                    </div>
                  ))}
                </div>
                <div className="p-5 pt-0 bg-white">
                  <Link
                    to={p.slug}
                    className="block text-xs font-bold text-center py-2.5 px-4 rounded-xl transition-all"
                    style={{ background: "rgba(0,87,168,0.08)", color: "#0057A8" }}
                  >
                    Ver plan completo →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <CtaButton label="Ver mi precio exacto ahora" />
          </div>
        </div>
      </section>

      {/* ── Tabla de precios por edad ── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-center" style={{ color: "#1A2B4A" }}>
            Tabla de precios Adeslas por edad (2026)
          </h2>
          <p className="text-base text-center mb-10" style={{ color: "#6B7280" }}>
            Precios orientativos en euros/mes para una persona en Madrid. Rango mín-máx según provincia.
          </p>
          <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "#E8EEF6" }}>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ background: "#1A2B4A", color: "white" }}>
                  <th className="px-4 py-3.5 text-left">Edad</th>
                  <th className="px-4 py-3.5 text-center">GO (€/mes)</th>
                  <th className="px-4 py-3.5 text-center">Plena Vital (€/mes)</th>
                  <th className="px-4 py-3.5 text-center">Plena Plus (€/mes)</th>
                  <th className="px-4 py-3.5 text-center">Plena Total (€/mes)</th>
                </tr>
              </thead>
              <tbody>
                {PRECIO_TABLA.map((row, i) => (
                  <tr key={row.edad} className="border-b" style={{ borderColor: "#E8EEF6", background: i % 2 === 0 ? "white" : "#FAFCFF" }}>
                    <td className="px-4 py-3.5 font-semibold" style={{ color: "#1A2B4A" }}>{row.edad} años</td>
                    <td className="px-4 py-3.5 text-center" style={{ color: "#4A9FD4" }}>{row.go}</td>
                    <td className="px-4 py-3.5 text-center" style={{ color: "#0078C8" }}>{row.vital}</td>
                    <td className="px-4 py-3.5 text-center" style={{ color: "#0057A8" }}>{row.plus}</td>
                    <td className="px-4 py-3.5 text-center font-semibold" style={{ color: "#002D6E" }}>{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-center mt-3" style={{ color: "#9CA3AF" }}>
            * Precios orientativos. El precio exacto depende de tu edad exacta, provincia, tipo de plan y número de asegurados. Usa el calculador para obtener tu tarifa real.
          </p>
        </div>
      </section>

      {/* ── Factores que afectan al precio ── */}
      <section className="py-14 md:py-18" style={{ background: "#F7FAFE" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-center" style={{ color: "#1A2B4A" }}>
            ¿Qué factores determinan el precio de Adeslas?
          </h2>
          <p className="text-base text-center mb-10" style={{ color: "#6B7280" }}>
            Conoce qué influye en la tarifa para optimizar tu contratación
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {FACTORES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#E8EEF6" }}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-sm mb-2" style={{ color: "#1A2B4A" }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Descuentos disponibles ── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-center" style={{ color: "#1A2B4A" }}>
            Descuentos disponibles en Adeslas 2026
          </h2>
          <p className="text-base text-center mb-10" style={{ color: "#6B7280" }}>
            Formas de reducir el precio de tu seguro Adeslas
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                titulo: "Descuentos por forma de pago",
                items: [
                  "Pago mensual: precio base (sin descuento)",
                  "Pago trimestral: 2% de descuento sobre precio mensual",
                  "Pago semestral: 4% de descuento",
                  "Pago anual: 6% de descuento — el más rentable",
                ],
              },
              {
                titulo: "Descuentos familiares (Plena Total)",
                items: [
                  "2 asegurados: precio estándar",
                  "3 asegurados: 5% de descuento",
                  "4 asegurados: 10% de descuento",
                  "5 o más asegurados: 15% de descuento",
                ],
              },
              {
                titulo: "Otras ventajas de precio",
                items: [
                  "Garantía de precio 3 años: solo en Plena Total",
                  "Deducción IRPF autónomos: hasta 500€/persona/año",
                  "Módulo Dental con 15% de dto. al contratar NEGOCIOS",
                  "Sin copago desde Plena Plus: el uso frecuente sale a cuenta",
                ],
              },
              {
                titulo: "¿Cuándo merece la pena el plan sin copago?",
                items: [
                  "Si vas al médico más de 5 veces al año",
                  "Si tienes hijos pequeños (muchas visitas pediátricas)",
                  "Si tienes condiciones crónicas que requieren seguimiento",
                  "Si quieres máxima tranquilidad sin sorpresas en el gasto",
                ],
              },
            ].map((bloque) => (
              <div key={bloque.titulo} className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#E8EEF6" }}>
                <h3 className="font-bold text-sm mb-4" style={{ color: "#1A2B4A" }}>{bloque.titulo}</h3>
                <div className="space-y-2">
                  {bloque.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs" style={{ color: "#4A5568" }}>
                      <span className="text-blue-500 font-bold mt-0.5">›</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 md:py-20" style={{ background: "#F7FAFE" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-center" style={{ color: "#1A2B4A" }}>
            Preguntas frecuentes sobre los precios de Adeslas
          </h2>
          <p className="text-base text-center mb-10" style={{ color: "#6B7280" }}>
            Resuelve tus dudas sobre las tarifas y precios de los seguros Adeslas en 2026
          </p>
          <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#E8EEF6" }}>
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                q={faq.q}
                a={faq.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Ver más planes ── */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-xl font-black mb-3" style={{ color: "#1A2B4A" }}>Explora todos los planes Adeslas</h2>
          <p className="text-sm mb-6" style={{ color: "#6B7280" }}>Compara precios y coberturas de cada plan en detalle</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Adeslas GO", to: "/seguro-salud/adeslas-go/" },
              { label: "Plena Vital", to: "/seguro-salud/adeslas-plena-vital/" },
              { label: "Plena Vital Total", to: "/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/" },
              { label: "Plena Plus", to: "/seguro-salud/adeslas-plena-plus/" },
              { label: "Plena Total", to: "/seguro-salud/adeslas-plena-total/" },
              { label: "Extra 150", to: "/seguro-salud/adeslas-extra-150/" },
              { label: "Seniors", to: "/seguro-salud/adeslas-seniors/" },
              { label: "Seniors Total", to: "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/" },
            ].map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="text-xs font-semibold px-4 py-2 rounded-xl border transition-colors hover:text-white hover:border-blue-600"
                style={{ borderColor: "#D1D9E8", color: "#1A2B4A", background: "white" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#0057A8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#1A2B4A"; }}
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-14 md:py-20" style={{ background: "linear-gradient(135deg, #002D6E, #0057A8)" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
            ¿Quieres conocer tu precio exacto en Adeslas?
          </h2>
          <p className="text-base md:text-lg mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
            Introduce tu edad y provincia y obtén tu precio real en menos de 2 minutos. Sin compromiso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CtaButton label="Calcular mi precio exacto" />
            <a
              href="tel:917105000"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white text-base border-2 transition-all hover:bg-white hover:text-blue-900"
              style={{ borderColor: "rgba(255,255,255,0.4)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/></svg>
              91 710 50 00
            </a>
          </div>
          <p className="text-xs mt-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            Lunes a viernes · 8:00 – 21:00 · Sin compromiso
          </p>
        </div>
      </section>
    </>
  );
};

const PreciosAdeslas = () => (
  <TarificadorProvider>
    <Header />
    <main>
      <PreciosAdeslasSEO />
    </main>
    <Footer />
  </TarificadorProvider>
);

export default PreciosAdeslas;
