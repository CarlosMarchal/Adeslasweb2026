import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { TarificadorProvider, useTarificador } from "@/components/TarificadorContext";
import { usePhonePopup } from "@/components/PhonePopupContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalcButton from "@/components/CalcButton";
import CtaSection from "@/components/CtaSection";
import Tarificador from "@/components/Tarificador";
import heroBg from "@/assets/asisa_salud_seguro_medico.webp";

/* ─────────── Product data ─────────── */

const CheckIcon = () => (
  <div
    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
    style={{ backgroundColor: "#E8F4FC" }}
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2.5 6L5 8.5L9.5 4"
        stroke="#009FE3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

interface Plan {
  icon: string;
  name: string;
  slug: string;
  price: string;
  pill: string;
  pillDark: boolean;
  featured?: boolean;
  badge?: string;
  promoBadge?: string;
  coverages: string[];
}

const plans: Plan[] = [
  {
    icon: "💊",
    name: "Adeslas Go",
    slug: "/adeslas-go",
    price: "21",
    pill: "Ambulatoria · Copago medio",
    pillDark: false,
    coverages: [
      "Consultas médicas ilimitadas",
      "Pruebas diagnósticas básicas",
      "Telemedicina Adeslas Live 24 h",
      "Fisioterapia y rehabilitación",
    ],
  },
  {
    icon: "📋",
    name: "Adeslas Plena Vital",
    slug: "/adeslas-plena-vital",
    price: "38",
    pill: "Hospitalización · Copago LMA 300€",
    pillDark: false,
    promoBadge: "🎁 Promoción puntos",
    coverages: [
      "Todo lo de Adeslas Go sin copago",
      "Hospitalización por accidente",
      "Diagnósticos completos (TAC, eco…)",
      "Ginecología y pediatría",
      "Fisioterapia y rehabilitación",
    ],
  },
  {
    icon: "🛡",
    name: "Adeslas Plena Total",
    slug: "/adeslas-plena-total",
    price: "83",
    pill: "Sin copago · Cobertura total",
    pillDark: true,
    featured: true,
    badge: "El más vendido",
    promoBadge: "🎁 Promoción puntos",
    coverages: [
      "Hospitalización y cirugía sin límites",
      "Especialistas sin copago",
      "Urgencias nacionales 24 h",
      "Diagnósticos de alta tecnología",
      "Videoconsultas Adeslas Live",
    ],
  },
  {
    icon: "✨",
    name: "Adeslas Plena Plus",
    slug: "/adeslas-plena-plus",
    price: "50,92",
    pill: "Sin copago · Cobertura completa",
    pillDark: false,
    promoBadge: "🎁 Promoción puntos",
    coverages: [
      "Hospitalización y cirugía sin copago",
      "Especialistas sin copago ni derivación",
      "Parto vaginal y cesárea cubiertos",
      "Urgencias nacionales 24 h",
      "Videoconsultas Adeslas Live",
    ],
  },
  {
    icon: "🏆",
    name: "Adeslas Plena Vital Total",
    slug: "/adeslas-plena-vital-total",
    price: "55",
    pill: "Copago LMA 500€ · Con extras",
    pillDark: false,
    promoBadge: "🎁 Promoción puntos",
    coverages: [
      "Hospitalización y cirugía con copago",
      "Dental: 46 actos incluidos",
      "Psicología: 20 sesiones/año",
      "Asistencia viaje hasta 30.000€",
      "Reembolso farmacia 50% hasta 200€",
    ],
  },
  {
    icon: "💎",
    name: "Adeslas Extra 150",
    slug: "/adeslas-extra-150",
    price: "90",
    pill: "Libre elección · Reembolso 80 %",
    pillDark: false,
    promoBadge: "🎁 Promoción puntos",
    coverages: [
      "Elige cualquier médico o clínica",
      "Reembolso hasta el 80 % del gasto",
      "Cobertura internacional completa",
      "Sin autorización previa",
      "Segunda opinión médica internacional",
    ],
  },
];

/* ─────────── FAQs ─────────── */

const faqs = [
  {
    q: "¿Cuál es el seguro médico Adeslas más barato?",
    a: "Adeslas Go es el plan más económico, desde 21€/mes para personas de 0-54 años. Ofrece cobertura ambulatoria con copagos limitados a 260€/año e incluye especialidades, chequeo médico anual. No incluye hospitalización ni cirugía.",
  },
  {
    q: "¿Qué seguro Adeslas es mejor para una familia con niños?",
    a: "Adeslas Plena Total es el más recomendado para familias: sin copagos, hospitalización y cirugía ilimitadas, dental (46 actos), asistencia viajes 100.000€ y 3 años sin subida de precio. A partir de 3 asegurados se aplica un 5% de descuento (10% con 4, 15% con 5+).",
  },
  {
    q: "¿Qué diferencia hay entre Adeslas Plena Plusy Adeslas Plena Plus++?",
    a: "Adeslas Plena Plus no tiene copagos en ningún acto médico. Adeslas Plena Vital tiene copagos por consulta, pero están topados a un máximo de 300€/año por asegurado, por lo que sabes de antemano cuánto gastarás como máximo. Plena Vital tiene una prima mensual más baja.",
  },
  {
    q: "¿Necesito un seguro con hospitalización o me basta uno ambulatorio?",
    a: "Si tienes menos de 35 años, estás sano y no tienes hijos, un plan más básico como Adeslas Go (ambulatorio, LMA 260€/año) o Adeslas Plena Vital (hospitalización incluida, LMA 300€/año) puede ser suficiente. Si tienes familia, más de 40 años o quieres cobertura total ante cualquier imprevisto, Adeslas Plena Pluses la mejor opción.",
  },
  {
    q: "¿Cuánto tarda Adeslas en activar mi seguro?",
    a: "Las coberturas de urgencias se activan desde el primer día. Las coberturas generales suelen activarse en un plazo de 24-48 horas tras la firma de la póliza. Solo la hospitalización programada tiene un periodo de carencia de 8 meses. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información).",
  },
  {
    q: "¿Adeslas tiene copago en urgencias?",
    a: "Depende del plan: Adeslas Plena Plus y Adeslas Plena Total no tienen copago en urgencias. Adeslas Plena Vital sí tiene copago por visita de urgencias (14,50€). Las urgencias están disponibles 24h en todos los planes que incluyen cobertura completa.",
  },
  {
    q: "¿Puedo cambiar de plan Adeslas si mis necesidades cambian?",
    a: "Sí. Puedes solicitar un cambio de plan al vencimiento anual de tu póliza. Si necesitas ampliar coberturas (por ejemplo, de Plena Vital a Plena Plus) no se aplican nuevas carencias por el tiempo ya transcurrido.",
  },
  {
    q: "¿Qué seguro Adeslas recomiendan para autónomos?",
    a: "Para autónomos existe Adeslas Salud Pymes, específicamente diseñado para este colectivo. Incluye las mismas coberturas que los planes de particulares y es 100 % deducible en el IRPF como gasto de la actividad.",
  },
];

/* ─────────── Component ─────────── */

const PreciosOfertasInner = () => {
  const { openPhonePopup } = usePhonePopup();
  const { openTarificador } = useTarificador();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSeo({
    title: "Precios Seguros Médicos Adeslas 2026 | Ofertas desde 21 €/mes",
    description:
      "Consulta los precios de todos los seguros médicos Adeslas para particulares. Desde 21€/mes (Adeslas Go). Sin copagos desde 50€/mes (Adeslas Plena). Cobertura total desde 83€/mes (Adeslas Plena Total). Compara y calcula en 2 minutos.",
    canonical: "https://adeslas.marchalaseguradores.es/precios-ofertas",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
      { name: "Precios y Ofertas", url: "https://adeslas.marchalaseguradores.es/precios-ofertas" },
    ],
    faqSchema: faqs.map((f) => ({ q: f.q, a: f.a })),
  });

  return (
    <>
      <Header />

      {/* ────── Hero ────── */}
      <section
        className="relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Dark overlay — igual que el resto de páginas */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:pl-14 xl:pl-24"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm text-primary-foreground"
                style={{
                  background: "rgba(255,255,255,0.11)",
                  border: "1px solid rgba(255,255,255,0.22)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-azul-claro" />
                Las mejores ofertas y precios de Adeslas
              </div>

              <h1 className="text-primary-foreground mb-4 text-3xl md:text-[48px] leading-tight md:leading-[1.15]">
                Precios Seguros Médicos
                <br />
                <span className="text-azul-claro">Adeslas 2026</span>
              </h1>

              <p
                className="text-lg mb-6 max-w-lg"
                style={{ color: "rgba(255,255,255,0.82)" }}
              >
                Compara todos los planes de salud Adeslas para particulares.
                Calcula tu precio personalizado en menos de 2 minutos.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <CalcButton
                  className="px-6 py-3 rounded-lg font-bold text-sm cursor-pointer btn-cta-white"
                  style={{
                    backgroundColor: "#fff",
                    color: "#003087",
                    borderRadius: "7px",
                  }}
                >
                  Calcular mi precio →
                </CalcButton>
                <button
                  onClick={openPhonePopup}
                  className="px-6 py-3 rounded-lg font-bold text-sm border cursor-pointer btn-cta-ghost"
                  style={{
                    borderColor: "rgba(255,255,255,0.4)",
                    color: "#fff",
                    borderRadius: "7px",
                  }}
                >
                  Te llamamos gratis
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: "⭐", text: "+30 años de experiencia" },
                  { icon: "🏥", text: "1.200+ centros médicos" },
                  { icon: "👨‍⚕️", text: "+42.000 especialistas" },
                ].map((b) => (
                  <div
                    key={b.text}
                    className="flex items-center gap-2 text-primary-foreground text-sm"
                  >
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center text-base"
                      style={{ background: "rgba(255,255,255,0.10)" }}
                    >
                      {b.icon}
                    </span>
                    {b.text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Tarificador real (igual que el resto de páginas) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div
                className="rounded-2xl overflow-hidden max-w-[370px] mx-auto lg:ml-8 xl:ml-16"
                style={{ boxShadow: "0 20px 56px rgba(0,0,0,0.22)", height: "390px" }}
              >
                <Tarificador compact />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────── Promo banner ────── */}
      <section
        className="py-4"
        style={{ backgroundColor: "#F59E0B" }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold text-sm" style={{ color: "#1C1917" }}>
            🎁 Consulta nuestras promociones vigentes · Descuento familiar 10 % a partir del 4.º asegurado
          </p>
        </div>
      </section>

      {/* ────── Product cards ────── */}
      <section className="section-pad bg-blanco">
        <div className="container mx-auto">
          <h2 className="text-gris-texto text-2xl md:text-3xl mb-3 text-center">
            Seguros de salud Adeslas para particulares
          </h2>
          <p className="text-gris-medio text-center mb-10 max-w-2xl mx-auto">
            Desde la opción más económica hasta la cobertura premium con libre
            elección de médico.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-blanco border p-6 flex flex-col relative"
                style={{
                  borderRadius: "16px",
                  borderColor: p.featured ? "#009FE3" : "#D5E3F0",
                  borderWidth: p.featured ? 2 : 1,
                  boxShadow: p.featured
                    ? "0 8px 32px rgba(0,85,165,0.12)"
                    : "0 2px 8px rgba(0,48,135,0.06)",
                }}
              >
                {/* Badge "El más vendido" — siempre centrado arriba (fuera de la tarjeta) */}
                {p.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap"
                    style={{ backgroundColor: "#16A34A" }}
                  >
                    {p.badge}
                  </div>
                )}
                {/* Promo badge:
                    — Si hay TAMBIÉN badge (ej. Plena Total): va DENTRO arriba-derecha para no solaparse
                    — Si solo hay promoBadge: va fuera arriba-derecha */}
                {p.promoBadge && (
                  <div
                    className={
                      p.badge
                        ? "absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-md whitespace-nowrap"
                        : "absolute -top-3 right-4 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-md whitespace-nowrap"
                    }
                    style={{
                      background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
                      boxShadow: "0 3px 10px rgba(249,115,22,0.40)",
                    }}
                  >
                    {p.promoBadge}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3 mt-1">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: "#E8F4FC" }}
                  >
                    {p.icon}
                  </span>
                </div>

                <h3 className="text-gris-texto text-lg font-bold mb-1">
                  {p.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-sm text-gris-medio">desde</span>
                  <span className="text-3xl font-black" style={{ color: "#003087" }}>
                    {p.price}€
                  </span>
                  <span className="text-sm text-gris-medio">/mes</span>
                </div>

                <span
                  className="inline-block px-3 py-1 rounded-full text-[11px] font-bold mb-4 self-start"
                  style={{
                    backgroundColor: p.pillDark ? "#003087" : "#E8F4FC",
                    color: p.pillDark ? "#fff" : "#009FE3",
                  }}
                >
                  {p.pill}
                </span>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.coverages.map((c, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-gris-texto">
                      <CheckIcon />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>

                <CalcButton
                  className="w-full py-3 rounded-xl font-bold text-sm text-primary-foreground cursor-pointer btn-cta-magenta"
                  style={{ backgroundColor: "#E4097D", borderRadius: "10px" }}
                  productSlug={p.slug}
                >
                  Calcular mi precio
                </CalcButton>

                <Link
                  to={p.slug}
                  className="block text-center mt-2 py-2.5 rounded-xl text-sm font-bold transition-colors hover:bg-gris-claro"
                  style={{ color: "#009FE3", border: "1px solid #D5E3F0", borderRadius: "10px" }}
                >
                  Ver coberturas completas
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── FAQ ────── */}
      <section className="section-pad bg-gris-claro">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-gris-texto text-2xl md:text-3xl mb-8 text-center">
            Preguntas frecuentes sobre precios Adeslas
          </h2>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="bg-blanco border border-borde overflow-hidden"
                style={{ borderRadius: "12px" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-bold text-gris-texto pr-4">
                    {f.q}
                  </span>
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 text-gris-medio transition-transform"
                    style={{
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-4 text-sm text-gris-medio leading-relaxed">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────── Final CTA ────── */}
      <CtaSection />

      <Footer />
    </>
  );
};

const PreciosOfertas = () => (
  <TarificadorProvider>
    <PreciosOfertasInner />
  </TarificadorProvider>
);

export default PreciosOfertas;
