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
    q: "¿Cómo contratar Adeslas online?",
    a: "Para contratar Adeslas online: usa el calculador en nuestra web, introduce tu edad y provincia, elige el plan, completa el cuestionario de salud y proporciona tu IBAN. En 24-48 horas recibes la documentación de tu póliza. El proceso completo dura menos de 10 minutos.",
  },
  {
    q: "¿Cuánto tarda en contratarse un seguro Adeslas?",
    a: "El proceso de contratación en sí dura menos de 10 minutos online. La documentación de la póliza llega en 24-48 horas laborables. Desde la recepción de la póliza ya puedes usar la tarjeta Adeslas para pedir cita con cualquier médico de la red.",
  },
  {
    q: "¿Qué información necesito para contratar Adeslas?",
    a: "Solo necesitas el DNI o NIE de todos los asegurados, un número de cuenta IBAN para la domiciliación y completar el cuestionario de salud online. No se requieren certificados médicos previos.",
  },
  {
    q: "¿Puedo contratar Adeslas por teléfono?",
    a: "Sí. Puedes contratar tu seguro Adeslas llamando al 91 710 50 00 de lunes a viernes de 8:00 a 21:00. Nuestros asesores te guiarán en la elección del plan más adecuado, calcularán tu precio exacto y tramitarán toda la contratación telefónicamente.",
  },
  {
    q: "¿Hay un mínimo de permanencia al contratar Adeslas?",
    a: "No. Los seguros Adeslas se renuevan anualmente de forma automática, pero puedes cancelarlos cuando quieras respetando el preaviso establecido en las condiciones particulares (generalmente 30 días antes del vencimiento anual).",
  },
  {
    q: "¿Puedo contratar Adeslas para toda la familia?",
    a: "Sí. Puedes incluir a tu cónyuge, hijos y otros familiares en la misma póliza. Existen descuentos por familia: 5% con 3 asegurados, 10% con 4 y 15% con 5 o más (en planes como Plena Total). Cada asegurado completa su propio cuestionario de salud.",
  },
  {
    q: "¿Qué es mejor contratar: Adeslas con o sin copago?",
    a: "Depende de tu uso previsto. Si ves al médico con frecuencia, un plan sin copago (Plena Plus o Plena Total) puede salirte más económico a largo plazo. Si eres una persona sana que quiere cobertura de urgencias y alguna consulta, Adeslas GO o Plena Vital con copago (máximo 260€/año) suelen ser más económicos mensualmente.",
  },
];

/* ─── 3 formas de contratar ─── */
const FORMAS = [
  {
    icon: "💻",
    title: "Online · 24h",
    desc: "Usa nuestro calculador online, elige tu plan y completa el proceso en menos de 10 minutos desde cualquier dispositivo. Documentación en tu email en 24-48h.",
    cta: "Calcular precio online",
    action: "tarificador",
  },
  {
    icon: "📞",
    title: "Por teléfono",
    desc: "Llama al 91 710 50 00 (Lun-Vie 8:00-21:00). Un asesor especializado te explica cada plan, calcula tu precio exacto y tramita el alta por teléfono sin que muevas un dedo.",
    cta: "Llamar ahora",
    action: "tel:917105000",
  },
  {
    icon: "✉️",
    title: "Solicitar llamada",
    desc: "Déjanos tus datos y te llamamos en el horario que mejor te venga. Sin esperas, sin colas, con asesoramiento personalizado y sin ningún tipo de compromiso.",
    cta: "Solicitar llamada",
    action: "/contacto/",
  },
];

/* ─── Paso a paso ─── */
const STEPS = [
  {
    num: "01",
    title: "Calcula tu precio exacto",
    desc: "Introduce tu edad, provincia y el número de asegurados en nuestro calculador. Verás al instante el precio real de todos los planes Adeslas disponibles para tu perfil en 2026.",
    tip: "El precio varía según edad y provincia. Persona de 30 años en Madrid desde 21€/mes.",
  },
  {
    num: "02",
    title: "Compara y elige tu plan",
    desc: "Revisa las coberturas de cada plan: GO (ambulatorio), Plena Vital (con hospitalización y copago), Plena Plus (sin copago) o Plena Total (el más completo: dental, psicología y garantía de precio 3 años).",
    tip: "¿No sabes cuál elegir? Nuestros asesores te orientan sin compromiso.",
  },
  {
    num: "03",
    title: "Rellena el cuestionario de salud",
    desc: "Todos los asegurados deben completar un cuestionario de salud online breve. Es obligatorio y tarda menos de 5 minutos. Basado en tus respuestas, Adeslas confirma la aceptación.",
    tip: "Si vienes de otra aseguradora con +8 meses de antigüedad, pueden eliminarse las carencias.",
  },
  {
    num: "04",
    title: "Elige la periodicidad de pago",
    desc: "Domicilia tu prima con tu IBAN. Puedes pagar mensualmente o beneficiarte de descuentos: 2% trimestral, 4% semestral o 6% anual. El primer cobro se realiza al formalizar el contrato.",
    tip: "El pago anual ofrece el mayor descuento: 6% sobre el precio mensual.",
  },
  {
    num: "05",
    title: "Recibe tu póliza y comienza a usar Adeslas",
    desc: "En 24-48 horas laborables recibirás la documentación completa de tu póliza en tu email. Descarga la app Adeslas, busca tu médico en el cuadro médico y empieza a disfrutar de tu seguro.",
    tip: "Las urgencias y medicina general están disponibles desde el primer día.",
  },
];

/* ─── Comparativa planes ─── */
const PLANES = [
  {
    nombre: "Adeslas GO",
    precio: "Desde 21€/mes",
    copago: "Sí (LMA 260€/año)",
    hospitalizacion: false,
    dental: false,
    psicologia: false,
    slug: "/seguro-salud/adeslas-go/",
    destacado: false,
  },
  {
    nombre: "Adeslas Plena Vital",
    precio: "Desde 38€/mes",
    copago: "Sí (LMA 260€/año)",
    hospitalizacion: true,
    dental: false,
    psicologia: false,
    slug: "/seguro-salud/adeslas-plena-vital/",
    destacado: false,
  },
  {
    nombre: "Adeslas Plena Plus",
    precio: "Desde 50,92€/mes",
    copago: "No",
    hospitalizacion: true,
    dental: false,
    psicologia: false,
    slug: "/seguro-salud/adeslas-plena-plus/",
    destacado: false,
  },
  {
    nombre: "Adeslas Plena Total",
    precio: "Desde 83€/mes",
    copago: "No",
    hospitalizacion: true,
    dental: true,
    psicologia: true,
    slug: "/seguro-salud/adeslas-plena-total/",
    destacado: true,
  },
];

/* ─── CTA Button ─── */
const CtaButton = ({ label = "Calcular precio y contratar" }: { label?: string }) => {
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

/* ─── FormaCard ─── */
const FormaCard = ({ forma }: { forma: typeof FORMAS[number] }) => {
  const { openTarificador } = useTarificador();
  const handleClick = () => {
    if (forma.action === "tarificador") openTarificador();
  };
  return (
    <div className="bg-white rounded-2xl p-7 border shadow-sm flex flex-col" style={{ borderColor: "#E8EEF6" }}>
      <div className="text-4xl mb-4">{forma.icon}</div>
      <h3 className="font-black text-lg mb-3" style={{ color: "#1A2B4A" }}>{forma.title}</h3>
      <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "#4A5568" }}>{forma.desc}</p>
      {forma.action === "tarificador" ? (
        <button
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
          style={{ color: "#009FE3" }}
        >
          {forma.cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      ) : forma.action.startsWith("tel:") ? (
        <a href={forma.action} className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors" style={{ color: "#009FE3" }}>
          {forma.cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      ) : (
        <Link to={forma.action} className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors" style={{ color: "#009FE3" }}>
          {forma.cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      )}
    </div>
  );
};

/* ─── Main page ─── */
const ComoContratarAdeslasSEO = () => {
  // SSG: el SEO lo aporta el Server Component (generateMetadata). Este useSeo es
  // inerte (su retorno no se renderiza); se llama solo en cliente para no construir
  // el <Helmet> en el prerender (causaba BAILOUT_TO_CLIENT_SIDE_RENDERING).
  if (typeof window !== "undefined") useSeo({
    title: "Cómo Contratar Adeslas 2026 | Guía Paso a Paso · Alta Online en 2 min",
    description: "Guía completa para contratar un seguro Adeslas en 2026: 3 formas de contratación, paso a paso, qué plan elegir y precios actualizados. Contrata online, por teléfono o solicita que te llamemos.",
    canonical: `${BASE}/como-contratar-adeslas/`,
    faqSchema: FAQS,
    breadcrumbs: [
      { name: "Inicio", url: `${BASE}/` },
      { name: "Cómo contratar Adeslas", url: `${BASE}/como-contratar-adeslas/` },
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
            <span>Cómo contratar Adeslas</span>
          </nav>
          <div className="max-w-2xl">
            <div
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{ background: "rgba(0,159,227,0.25)", color: "#7ECEF4", border: "1px solid rgba(0,159,227,0.4)" }}
            >
              Guía actualizada 2026
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
              Cómo Contratar<br />
              <span style={{ color: "#5EC6F1" }}>Adeslas</span> en 2026:<br />
              Guía Paso a Paso
            </h1>
            <p className="text-base md:text-lg mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
              Tres formas de contratar tu seguro Adeslas. Online en 10 minutos, por teléfono con asesoramiento personalizado o solicitando que te llamemos. Alta inmediata y sin papeleos.
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
            <div className="flex flex-wrap gap-4 mt-8">
              {["Sin compromiso", "Alta en 24-48h", "+51.000 médicos", "Sin papeleos"].map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                  <span style={{ color: "#5EC6F1" }}>✓</span> {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3 Formas de contratar ── */}
      <section className="py-14 md:py-20" style={{ background: "#F7FAFE" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: "#1A2B4A" }}>
              3 formas de contratar tu seguro Adeslas
            </h2>
            <p className="text-base" style={{ color: "#6B7280" }}>
              Elige el canal que más te convenga. El resultado es el mismo: tu póliza en 24-48h.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {FORMAS.map((f) => <FormaCard key={f.title} forma={f} />)}
          </div>
        </div>
      </section>

      {/* ── Paso a paso ── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black mb-3" style={{ color: "#1A2B4A" }}>
              Del precio al alta: proceso completo de contratación Adeslas
            </h2>
            <p className="text-base" style={{ color: "#6B7280" }}>
              Conoce todos los pasos para contratar tu seguro médico Adeslas en 2026
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {STEPS.map((s) => (
              <div key={s.num} className="flex gap-5 items-start">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm text-white"
                  style={{ background: "linear-gradient(135deg, #0057A8, #009FE3)" }}
                >
                  {s.num}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-base mb-1.5" style={{ color: "#1A2B4A" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: "#4A5568" }}>{s.desc}</p>
                  {s.tip && (
                    <div className="text-xs px-3 py-2 rounded-lg inline-block" style={{ background: "rgba(0,159,227,0.08)", color: "#0057A8" }}>
                      💡 {s.tip}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <CtaButton label="Empezar la contratación" />
          </div>
        </div>
      </section>

      {/* ── Comparativa planes ── */}
      <section className="py-14 md:py-18" style={{ background: "#F7FAFE" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-center" style={{ color: "#1A2B4A" }}>
            ¿Qué plan Adeslas contratar? Comparativa rápida
          </h2>
          <p className="text-base text-center mb-10" style={{ color: "#6B7280" }}>
            Los 4 planes de salud Adeslas más contratados en 2026
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {PLANES.map((p) => (
              <div
                key={p.nombre}
                className="rounded-2xl p-6 flex flex-col border"
                style={{
                  background: p.destacado ? "linear-gradient(135deg, #0057A8, #0089D0)" : "white",
                  borderColor: p.destacado ? "#0057A8" : "#E8EEF6",
                  boxShadow: p.destacado ? "0 8px 32px rgba(0,87,168,0.25)" : undefined,
                }}
              >
                {p.destacado && (
                  <div className="text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full mb-3 text-center" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
                    ⭐ El más popular
                  </div>
                )}
                <h3 className="font-black text-base mb-2" style={{ color: p.destacado ? "white" : "#1A2B4A" }}>
                  {p.nombre}
                </h3>
                <p className="text-xl font-black mb-4" style={{ color: p.destacado ? "#7ECEF4" : "#009FE3" }}>{p.precio}</p>
                <div className="space-y-2 flex-1 mb-5">
                  {[
                    { label: "Copago", val: p.copago },
                    { label: "Hospitalización", val: p.hospitalizacion ? "✓" : "✗" },
                    { label: "Dental incluido", val: p.dental ? "✓" : "✗" },
                    { label: "Psicología", val: p.psicologia ? "✓" : "✗" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-xs">
                      <span style={{ color: p.destacado ? "rgba(255,255,255,0.7)" : "#6B7280" }}>{row.label}</span>
                      <span className="font-semibold" style={{ color: p.destacado ? "white" : "#1A2B4A" }}>{row.val}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to={p.slug}
                  className="text-xs font-bold text-center py-2 px-4 rounded-xl transition-all"
                  style={{
                    background: p.destacado ? "rgba(255,255,255,0.15)" : "rgba(0,87,168,0.08)",
                    color: p.destacado ? "white" : "#0057A8",
                  }}
                >
                  Ver plan completo →
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-4" style={{ color: "#9CA3AF" }}>
            * Precios desde para persona de 30 años en Madrid. Precio exacto varía por edad y provincia.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-center" style={{ color: "#1A2B4A" }}>
            Preguntas frecuentes sobre cómo contratar Adeslas
          </h2>
          <p className="text-base text-center mb-10" style={{ color: "#6B7280" }}>
            Todo lo que necesitas saber antes de contratar
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

      {/* ── CTA final ── */}
      <section className="py-14 md:py-20" style={{ background: "linear-gradient(135deg, #002D6E, #0057A8)" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
            ¿Listo para contratar tu seguro Adeslas?
          </h2>
          <p className="text-base md:text-lg mb-8" style={{ color: "rgba(255,255,255,0.8)" }}>
            Calcula tu precio, compara planes y contrata online en menos de 10 minutos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CtaButton label="Calcular precio y contratar" />
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

const ComoContratarAdeslas = () => (
  <TarificadorProvider>
    <Header />
    <main>
      <ComoContratarAdeslasSEO />
    </main>
    <Footer />
  </TarificadorProvider>
);

export default ComoContratarAdeslas;
