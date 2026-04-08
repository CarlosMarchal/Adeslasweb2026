import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { usePhonePopup } from "@/components/PhonePopupContext";
import logo from "@/assets/Logo-adeslas-Marchal-color.webp";

const LandingPlenaVitalOferta = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { openPhonePopup } = usePhonePopup();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const _seo = useSeo({
    title:
      "Adeslas Plena Vital | Oferta Exclusiva · Cobertura Completa desde 38€/mes",
    description:
      "Seguro médico Adeslas Plena Vital: hospitalización, todas las especialidades y copagos limitados a 300€/año. Oferta exclusiva. ¡Quiero más información!",
    canonical:
      "https://adeslas.numero1salud.es/adeslasplenavitaloferta/",
    robots: "noindex, nofollow",
  });

  const coverages = [
    "Hospitalización completa",
    "Medicina general y especialidades",
    "Urgencias 24 horas",
    "Cirugía ambulatoria y hospitalaria",
    "Diagnóstico de alta tecnología",
    "Rehabilitación y fisioterapia",
    "Videoconsultas incluidas",
    "Copagos limitados a 300€/año",
    "+51.000 médicos en toda España",
  ];

  const faqs = [
    {
      q: "¿Qué cubre Adeslas Plena Vital?",
      a: "Cobertura médica COMPLETA: medicina general, pediatría, TODAS las especialidades médicas, urgencias 24h, HOSPITALIZACIÓN, cirugía, diagnóstico de alta tecnología, psicología clínica, rehabilitación y fisioterapia.",
    },
    {
      q: "¿Tiene copagos?",
      a: "Sí, pero están LIMITADOS a 300€ por asegurado y año. Por ejemplo: medicina general 7€, especialidades 14,50€, urgencias 14,50€. Una vez alcanzados los 300€, los servicios son GRATIS.",
    },
    {
      q: "¿Incluye hospitalización?",
      a: "Sí. Hospitalización ILIMITADA: médica, quirúrgica, pediátrica y psiquiátrica. Habitación individual con cama para acompañante incluida.",
    },
    {
      q: "¿Cuánto cuesta?",
      a: "Desde 38€/mes con cobertura médica completa. Precios ajustados según edad y número de asegurados. Contáctanos para tu presupuesto personalizado.",
    },
  ];

  return (
    <>
      {_seo}
      {/* Header mínimo */}
      <header className="sticky top-0 z-50 bg-white border-b border-borde">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img
            src={logo}
            alt="Adeslas Marchal"
            className="h-10"
          />
          <a
            href="tel:917105000"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm text-white transition-all duration-200 hover:shadow-lg"
            style={{ backgroundColor: "#E4097D" }}
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">91 710 50 00</span>
            <span className="sm:hidden">Llamar</span>
          </a>
        </div>
      </header>

      <main className="bg-white">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden py-12 md:py-20"
          style={{
            background: "linear-gradient(135deg, #003087 0%, #009FE3 100%)",
          }}
        >
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-white border border-white/30 bg-white/10">
                <span className="flex-shrink-0">✨</span>
                <span className="text-sm font-bold">OFERTA EXCLUSIVA</span>
              </div>

              <h1 className="text-white text-3xl md:text-5xl font-black mb-4 leading-tight">
                Seguro Médico <span className="block text-2xl md:text-4xl mt-2">Adeslas Plena Vital</span>
              </h1>

              <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Hospitalización completa, todas las especialidades y copagos
                limitados a 300€/año. Acceso a +51.000 médicos sin listas de
                espera.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <div className="text-center">
                  <span
                    className="text-6xl md:text-7xl font-black"
                    style={{ color: "#fff" }}
                  >
                    38€
                  </span>
                  <span className="text-white/80 block text-lg">/mes</span>
                </div>
                <div className="h-20 w-px bg-white/20 hidden sm:block" />
                <div className="text-center text-white">
                  <p className="text-sm font-bold mb-2">Desde edad:</p>
                  <p className="text-2xl font-black">0 a 70 años</p>
                </div>
              </div>

              <button
                onClick={() => openPhonePopup(201)}
                className="inline-block px-8 py-4 rounded-lg font-bold text-lg text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                style={{ backgroundColor: "#E4097D" }}
              >
                Quiero más información →
              </button>
            </motion.div>
          </div>
        </section>

        {/* Coberturas Section */}
        <section className="section-pad bg-white">
          <div className="container mx-auto max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gris-texto text-3xl md:text-4xl font-bold text-center mb-12"
            >
              Coberturas incluidas
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coverages.map((coverage, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-gris-claro border border-borde rounded-lg hover:shadow-md transition-all duration-200"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#009FE3" }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2.5 6L5 8.5L9.5 4"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-gris-texto text-sm font-semibold">
                    {coverage}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Precio destacado */}
        <section className="section-pad bg-gris-claro">
          <div className="container mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-gris-texto text-2xl md:text-3xl font-bold mb-6">
                Precios exclusivos
              </h2>
              <div className="bg-white border-2 border-azul-medio rounded-2xl p-8 mb-8">
                <div className="grid sm:grid-cols-3 gap-6 mb-8">
                  <div>
                    <p className="text-gris-medio text-sm mb-2">0 a 44 años</p>
                    <p className="text-4xl font-black text-gris-texto">38€</p>
                    <p className="text-gris-medio text-xs mt-1">/mes</p>
                  </div>
                  <div>
                    <p className="text-gris-medio text-sm mb-2">44 a 54 años</p>
                    <p className="text-4xl font-black text-gris-texto">52€</p>
                    <p className="text-gris-medio text-xs mt-1">/mes</p>
                  </div>
                  <div>
                    <p className="text-gris-medio text-sm mb-2">55 a 70 años</p>
                    <p className="text-4xl font-black text-gris-texto">78€</p>
                    <p className="text-gris-medio text-xs mt-1">/mes</p>
                  </div>
                </div>
                <p className="text-gris-medio text-sm">
                  Descuento del 10% a partir de 4 asegurados
                </p>
              </div>

              <button
                onClick={() => openPhonePopup(201)}
                className="inline-block px-8 py-4 rounded-lg font-bold text-lg text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto"
                style={{ backgroundColor: "#E4097D" }}
              >
                Quiero más información →
              </button>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-pad bg-white">
          <div className="container mx-auto max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gris-texto text-3xl font-bold text-center mb-12"
            >
              Preguntas frecuentes
            </motion.h2>

            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-gris-claro border border-borde overflow-hidden rounded-lg"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-white/50 transition-colors"
                    >
                      <span className="font-bold text-gris-texto text-base pr-4">
                        {faq.q}
                      </span>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                        style={{
                          backgroundColor: isOpen ? "#009FE3" : "#E8F4FC",
                        }}
                      >
                        <span
                          className="text-lg font-bold transition-transform duration-200"
                          style={{
                            color: isOpen ? "#fff" : "#009FE3",
                            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          }}
                        >
                          +
                        </span>
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-5 pb-5 text-sm text-gris-medio leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="section-pad text-center"
          style={{ background: "linear-gradient(135deg, #003087 0%, #009FE3 100%)" }}
        >
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                Solicita tu presupuesto
              </h2>
              <p className="text-white/80 text-base mb-8">
                Completa tu información y un asesor especializado te llamará
                para explicarte todos los detalles sin compromiso.
              </p>
              <button
                onClick={() => openPhonePopup(201)}
                className="inline-block px-8 py-4 rounded-lg font-bold text-lg text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                style={{ backgroundColor: "#E4097D" }}
              >
                Llamar ahora al 91 710 50 00 →
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer mínimo */}
      <footer className="bg-gris-claro border-t border-borde py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gris-medio text-xs">
            Marchal Aseguradores, SL | Agente Exclusivo Adeslas
          </p>
          <p className="text-gris-medio text-xs mt-2">
            Tel. 91 710 50 00 | L–V 9:00–20:00
          </p>
          <p className="text-gris-medio text-[10px] mt-3">
            Política de privacidad · Aviso legal · Datos protegidos
          </p>
        </div>
      </footer>
    </>
  );
};

export default LandingPlenaVitalOferta;
