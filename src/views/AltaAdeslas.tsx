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
    q: "¿Cómo darse de alta en Adeslas?",
    a: "Para darte de alta en Adeslas tienes tres opciones: calcula tu precio y solicita el alta online en nuestra web, llama al 91 710 50 00 (de lunes a viernes de 8:00 a 21:00) o solicita que te llamemos a través del formulario de contacto. El proceso es rápido y sin papeleos: solo necesitas tu DNI o NIE, una cuenta bancaria para la domiciliación y completar el cuestionario de salud.",
  },
  {
    q: "¿Qué documentación necesito para dar de alta un seguro Adeslas?",
    a: "Para el alta en Adeslas solo necesitas: DNI o NIE en vigor de todos los asegurados, número de cuenta bancaria (IBAN) para la domiciliación de las primas y completar el cuestionario de salud online. No necesitas certificados médicos previos para la mayoría de los planes.",
  },
  {
    q: "¿Cuándo empieza la cobertura después del alta en Adeslas?",
    a: "La cobertura de asistencia médica ambulatoria (médico general y urgencias) comienza el mismo día del alta o al día siguiente. Las carencias más habituales son: 3 meses para consultas de especialistas, 6 meses para ginecología y maternidad, y 8 meses para hospitalización y cirugía programada. Adeslas GO no aplica carencias en ambulatorio.",
  },
  {
    q: "¿Se puede dar de alta en Adeslas sin periodo de carencia?",
    a: "Sí. Si puedes acreditar que vienes de otra aseguradora con coberturas equivalentes y una antigüedad superior a 8 meses, Adeslas puede eliminar o reducir las carencias. Consúltanos antes de formalizar el alta para valorar tu situación y gestionar el traslado.",
  },
  {
    q: "¿Cuánto tarda el alta en Adeslas?",
    a: "El alta en Adeslas es prácticamente inmediata. Una vez completado el proceso online o telefónico, recibes la documentación de la póliza en 24-48 horas laborables. A partir de ahí ya puedes pedir cita con cualquier médico de la red Adeslas usando la app o el teléfono.",
  },
  {
    q: "¿Puede darse de alta en Adeslas alguien con una enfermedad preexistente?",
    a: "Depende de la patología. Adeslas evalúa las declaraciones del cuestionario de salud. Algunas condiciones preexistentes pueden quedar excluidas de la póliza, otras se aceptan con normalidad. Te recomendamos consultarnos antes para orientarte sobre qué plan se adapta mejor a tu situación.",
  },
  {
    q: "¿Tiene copago el alta en Adeslas?",
    a: "Depende del plan. Adeslas GO y Plena Vital tienen copago (Límite Máximo Anual de 260€/año). Adeslas Plena Plus y Plena Total no tienen ningún copago: pagas solo la prima mensual y todas las consultas son gratuitas. Puedes ver los precios en nuestra calculadora online.",
  },
];

/* ─── Paso a paso ─── */
const STEPS = [
  {
    num: "01",
    title: "Calcula tu precio",
    desc: "Introduce tu edad, provincia y número de asegurados en nuestro calculador. En menos de 2 minutos verás todos los planes disponibles con sus precios reales para 2026.",
  },
  {
    num: "02",
    title: "Elige tu plan",
    desc: "Compara las coberturas: GO (ambulatorio con copago), Plena Vital (con hospitalización), Plena Plus (sin copago) o Plena Total (el más completo). Te asesoramos sin compromiso.",
  },
  {
    num: "03",
    title: "Completa el cuestionario",
    desc: "Rellena el cuestionario de salud online de forma segura y confidencial. Es el paso obligatorio para todos los asegurados. Dura menos de 5 minutos.",
  },
  {
    num: "04",
    title: "Domicilia el pago",
    desc: "Indica tu IBAN para la domiciliación de las primas. Puedes elegir pago mensual, trimestral (2% dto.), semestral (4% dto.) o anual (6% dto.).",
  },
  {
    num: "05",
    title: "Recibe tu documentación",
    desc: "En 24-48 horas laborables recibirás tu póliza Adeslas por email. Ya puedes pedir cita con cualquier médico de la red a través de la app Adeslas o llamando al número de atención al cliente.",
  },
];

/* ─── Docs necesaria ─── */
const DOCS = [
  { icon: "🪪", title: "DNI o NIE en vigor", desc: "De todos los asegurados que se incorporen a la póliza. Válido también pasaporte para extranjeros." },
  { icon: "🏦", title: "Número de cuenta IBAN", desc: "Para la domiciliación de las primas mensuales, trimestrales o anuales." },
  { icon: "📋", title: "Cuestionario de salud", desc: "Formulario online que cumplimentas durante el proceso. Sin certificados médicos adicionales." },
  { icon: "📱", title: "Correo electrónico", desc: "Para recibir la documentación de la póliza y gestionar tu seguro desde la app Adeslas." },
];

/* ─── Planes para el alta ─── */
const PLANES = [
  { nombre: "Adeslas GO", desde: "21€/mes", copago: "Sí (LMA 260€/año)", hospitalizacion: "No", slug: "/seguro-salud/adeslas-go/" },
  { nombre: "Adeslas Plena Vital", desde: "38€/mes", copago: "Sí (LMA 260€/año)", hospitalizacion: "Sí", slug: "/seguro-salud/adeslas-plena-vital/" },
  { nombre: "Adeslas Plena Plus", desde: "50,92€/mes", copago: "No", hospitalizacion: "Sí", slug: "/seguro-salud/adeslas-plena-plus/" },
  { nombre: "Adeslas Plena Total ⭐", desde: "83€/mes", copago: "No", hospitalizacion: "Sí + dental + psicología", slug: "/seguro-salud/adeslas-plena-total/" },
];

/* ─── CTA Button ─── */
const CtaButton = ({ label = "Calcular precio y solicitar alta" }: { label?: string }) => {
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
      className="w-full flex items-center justify-between gap-4 py-5 text-left font-semibold text-sm md:text-base transition-colors"
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
const AltaAdeslasSEO = () => {
  // SSG: el SEO lo aporta el Server Component (generateMetadata). Este useSeo es
  // inerte (su retorno no se renderiza); se llama solo en cliente para no construir
  // el <Helmet> en el prerender (causaba BAILOUT_TO_CLIENT_SIDE_RENDERING).
  if (typeof window !== "undefined") useSeo({
    title: "Alta en Adeslas 2026 | Cómo Darse de Alta Online · Sin Esperas",
    description: "Guía completa para darse de alta en Adeslas en 2026: documentación necesaria, pasos del proceso, cuándo empieza la cobertura y todos los planes disponibles. Alta online en 2 minutos.",
    canonical: `${BASE}/alta-adeslas/`,
    faqSchema: FAQS,
    breadcrumbs: [
      { name: "Inicio", url: `${BASE}/` },
      { name: "Alta en Adeslas", url: `${BASE}/alta-adeslas/` },
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
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-8 opacity-70 text-white">
            <Link to="/" className="hover:opacity-100">Inicio</Link>
            <span>›</span>
            <span>Alta en Adeslas</span>
          </nav>
          <div className="max-w-2xl">
            <div
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(0,159,227,0.25)", color: "#7ECEF4", border: "1px solid rgba(0,159,227,0.4)" }}
            >
              Guía actualizada 2026
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-5">
              Alta en Adeslas:<br />
              <span style={{ color: "#5EC6F1" }}>Guía Completa</span> para<br />
              Nuevos Asegurados
            </h1>
            <p className="text-base md:text-lg mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
              Todo lo que necesitas saber para darte de alta en Adeslas en 2026: documentación, pasos del proceso, cuándo empieza la cobertura y qué plan elegir. Alta online en menos de 2 minutos.
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
            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-8">
              {["Alta en 24-48h", "+51.000 médicos", "Sin papeleos", "Asesoramiento gratuito"].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                  <span style={{ color: "#5EC6F1" }}>✓</span> {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Documentación necesaria ── */}
      <section className="py-14 md:py-20" style={{ background: "#F7FAFE" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: "#1A2B4A" }}>
              Documentación para el alta en Adeslas
            </h2>
            <p className="text-base" style={{ color: "#6B7280" }}>
              Solo necesitas estos 4 elementos. Sin certificados médicos adicionales.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {DOCS.map((d) => (
              <div key={d.title} className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#E8EEF6" }}>
                <div className="text-3xl mb-3">{d.icon}</div>
                <h3 className="font-bold text-sm mb-2" style={{ color: "#1A2B4A" }}>{d.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proceso paso a paso ── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: "#1A2B4A" }}>
              Cómo darse de alta en Adeslas: paso a paso
            </h2>
            <p className="text-base" style={{ color: "#6B7280" }}>
              El proceso completo de alta en Adeslas en 5 pasos simples
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-5">
            {STEPS.map((s, i) => (
              <div key={s.num} className="flex gap-5 items-start">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm text-white"
                  style={{ background: "linear-gradient(135deg, #0057A8, #009FE3)" }}
                >
                  {s.num}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-base mb-1.5" style={{ color: "#1A2B4A" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4A5568" }}>{s.desc}</p>
                  {i < STEPS.length - 1 && (
                    <div className="ml-[-26px] mt-3 w-0.5 h-4" style={{ background: "#E8EEF6", marginLeft: "auto" }} />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <CtaButton label="Empezar el alta ahora" />
          </div>
        </div>
      </section>

      {/* ── Cuándo empieza la cobertura ── */}
      <section className="py-14 md:py-18" style={{ background: "#F7FAFE" }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-center" style={{ color: "#1A2B4A" }}>
            ¿Cuándo empieza la cobertura tras el alta en Adeslas?
          </h2>
          <p className="text-base text-center mb-10" style={{ color: "#6B7280" }}>
            Los periodos de carencia varían según el tipo de asistencia
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { tipo: "Urgencias y medicina general", espera: "Desde el 1er día", color: "#10B981" },
              { tipo: "Especialistas ambulatorios", espera: "3 meses", color: "#F59E0B" },
              { tipo: "Ginecología y maternidad", espera: "6 meses", color: "#F59E0B" },
              { tipo: "Hospitalización y cirugía programada", espera: "8 meses", color: "#EF4444" },
              { tipo: "Diagnóstico básico (análisis, radiología)", espera: "Desde el 1er día", color: "#10B981" },
              { tipo: "Sin carencias si vienes de otra aseguradora", espera: "Consultar condiciones", color: "#009FE3" },
            ].map((item) => (
              <div key={item.tipo} className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8EEF6" }}>
                <div className="w-3 h-3 rounded-full mb-3" style={{ background: item.color }} />
                <p className="text-sm font-semibold mb-1" style={{ color: "#1A2B4A" }}>{item.tipo}</p>
                <p className="text-xs font-bold" style={{ color: item.color }}>{item.espera}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-2xl" style={{ background: "rgba(0,159,227,0.08)", border: "1px solid rgba(0,159,227,0.2)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "#0057A8" }}>
              <strong>¿Vienes de otra aseguradora?</strong> Si llevas más de 8 meses asegurado con coberturas similares, Adeslas puede eliminar las carencias. Consúltanos antes de formalizar el alta y gestionamos el traslado por ti.
            </p>
          </div>
        </div>
      </section>

      {/* ── Planes disponibles para el alta ── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-center" style={{ color: "#1A2B4A" }}>
            Planes disponibles para darse de alta en Adeslas
          </h2>
          <p className="text-base text-center mb-10" style={{ color: "#6B7280" }}>
            Elige el plan que mejor se adapta a tus necesidades y presupuesto
          </p>
          <div className="overflow-x-auto max-w-4xl mx-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ background: "#1A2B4A", color: "white" }}>
                  <th className="px-4 py-3 text-left rounded-tl-xl">Plan Adeslas</th>
                  <th className="px-4 py-3 text-center">Precio desde</th>
                  <th className="px-4 py-3 text-center">Copago</th>
                  <th className="px-4 py-3 text-center rounded-tr-xl">Hospitalización</th>
                </tr>
              </thead>
              <tbody>
                {PLANES.map((p, i) => (
                  <tr key={p.nombre} className="border-b hover:bg-blue-50 transition-colors" style={{ borderColor: "#E8EEF6", background: i % 2 === 0 ? "white" : "#FAFCFF" }}>
                    <td className="px-4 py-4 font-semibold" style={{ color: "#1A2B4A" }}>
                      <Link to={p.slug} className="hover:text-blue-600 transition-colors">{p.nombre}</Link>
                    </td>
                    <td className="px-4 py-4 text-center font-bold" style={{ color: "#009FE3" }}>{p.desde}</td>
                    <td className="px-4 py-4 text-center text-xs">{p.copago}</td>
                    <td className="px-4 py-4 text-center text-xs">{p.hospitalizacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs mt-4" style={{ color: "#9CA3AF" }}>
            * Precios indicativos para persona de 30 años en Madrid. El precio exacto varía por edad y provincia.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 md:py-20" style={{ background: "#F7FAFE" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-center" style={{ color: "#1A2B4A" }}>
            Preguntas frecuentes sobre el alta en Adeslas
          </h2>
          <p className="text-base text-center mb-10" style={{ color: "#6B7280" }}>
            Todo lo que necesitas saber antes de darte de alta
          </p>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
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

      {/* ── CTA final ── */}
      <section className="py-14 md:py-20" style={{ background: "linear-gradient(135deg, #002D6E, #0057A8)" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
            ¿Listo para darte de alta en Adeslas?
          </h2>
          <p className="text-base md:text-lg mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
            Calcula tu precio en 2 minutos y solicita el alta online. Sin compromiso, sin esperas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CtaButton label="Calcular precio y solicitar alta" />
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
            Lunes a viernes · 8:00 – 21:00 · Asesoramiento gratuito sin compromiso
          </p>
        </div>
      </section>
    </>
  );
};

const AltaAdeslas = () => (
  <TarificadorProvider>
    <Header />
    <main>
      <AltaAdeslasSEO />
    </main>
    <Footer />
  </TarificadorProvider>
);

export default AltaAdeslas;
