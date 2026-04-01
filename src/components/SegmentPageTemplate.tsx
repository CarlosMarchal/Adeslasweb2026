import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { TarificadorProvider } from "@/components/TarificadorContext";
import { usePhonePopup } from "@/components/PhonePopupContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Tarificador from "@/components/Tarificador";
import CalcButton from "@/components/CalcButton";
import CtaSection from "@/components/CtaSection";
import defaultHeroBg from "@/assets/asisa_salud_seguro_medico.webp";

/* ───── Types ───── */

export interface SegmentSeo {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export interface SegmentFeature {
  title: string;
  description: string;
}

export interface SegmentProduct {
  name: string;
  slug: string;
  price: string;
  badge: string;
  features: string[];
  highlighted: boolean;
  promoBadge?: string;
}

export interface SegmentFaq {
  question: string;
  answer: string;
}

export interface SegmentPageData {
  seo: SegmentSeo;
  heroBg?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPromo?: string;
  contentTitle: string;
  contentDescription: string;
  contentFeatures: SegmentFeature[];
  productsTitle: string;
  productsSubtitle: string;
  recommendedProducts: SegmentProduct[];
  tarificadorTitle: string;
  tarificadorSubtitle: string;
  faqs: SegmentFaq[];
  schemaFaq?: boolean;
}

/* ───── Template ───── */

const SegmentPageTemplate = ({ data }: { data: SegmentPageData }) => {
  const { openPhonePopup } = usePhonePopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSeo({
    title: data.seo.title,
    description: data.seo.description,
    canonical: data.seo.canonical,
    ogImage: data.seo.ogImage,
    breadcrumbs: data.seo.breadcrumbs,
    faqSchema: data.schemaFaq !== false
      ? data.faqs.map((f) => ({ q: f.question, a: f.answer }))
      : undefined,
  });

  return (
    <TarificadorProvider>
      <Header />
      <main>
        {/* ── Hero with 2 columns — full photo + dark overlay, same as home ── */}
        <section
          className="relative overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${data.heroBg || defaultHeroBg})` }}
          role="img"
          aria-label={`${data.heroTitle} — Adeslas seguros médicos privados`}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/55" />

          <div className="container mx-auto px-4 py-7 lg:py-10 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
              {/* Left: text */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:pl-14 xl:pl-24"
              >
                <h1 className="text-white mb-3 text-[1.15rem] sm:text-xl md:text-2xl lg:text-[1.65rem] leading-snug font-bold">
                  {data.heroTitle}
                </h1>
                <p className="text-base mb-4 max-w-xl" style={{ color: "rgba(255,255,255,0.88)" }}>
                  {data.heroSubtitle}
                </p>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3 mb-8 lg:mb-0">
                  <CalcButton
                    className="px-6 py-3 rounded-lg font-bold text-sm cursor-pointer btn-cta-white"
                    style={{ backgroundColor: "#fff", color: "#003087", borderRadius: "7px" }}
                  >
                    Calcular mi precio →
                  </CalcButton>
                  <button
                    onClick={openPhonePopup}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm border cursor-pointer btn-cta-ghost"
                    style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff", borderRadius: "7px" }}
                  >
                    <Phone className="w-4 h-4" />
                    Te llamamos ahora
                  </button>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {[
                    { emoji: "⭐", label: "+30 años de experiencia" },
                    { emoji: "🏥", label: "Sin listas de espera" },
                    { emoji: "👨‍⚕️", label: "+51.000 médicos" },
                    { emoji: "🏨", label: "+1.400 centros" },
                  ].map(({ emoji, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-white text-xs sm:text-sm">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>{emoji}</span>
                      {label}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: tarificador — desktop */}
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

        {/* ── Recommended Products — right after hero ── */}
        <section className="section-pad bg-blanco">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-gris-texto text-2xl md:text-3xl font-black mb-3">
                {data.productsTitle}
              </h2>
              <p className="text-gris-medio text-base">{data.productsSubtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {data.recommendedProducts.map((product, idx) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={`rounded-2xl overflow-hidden transition-all hover:-translate-y-1 ${
                    product.highlighted
                      ? "border-2 shadow-lg ring-1 ring-azul-medio/20"
                      : "border border-borde"
                  }`}
                  style={{ borderColor: product.highlighted ? "#009FE3" : undefined }}
                >
                  {/* Badge header */}
                  <div
                    className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wider ${
                      product.promoBadge
                        ? "flex items-center justify-between gap-2"
                        : "text-center"
                    }`}
                    style={{
                      backgroundColor: product.highlighted ? "#009FE3" : "#F4F6FA",
                      color: product.highlighted ? "#fff" : "#6B8296",
                    }}
                  >
                    <span className={product.promoBadge ? "" : "w-full text-center"}>{product.badge}</span>
                    {product.promoBadge && (
                      <span
                        className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm whitespace-nowrap"
                        style={{
                          background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
                          boxShadow: "0 2px 8px rgba(249,115,22,0.40)",
                        }}
                      >
                        {product.promoBadge}
                      </span>
                    )}
                  </div>

                  <div className="p-6 bg-blanco">
                    <h3 className="text-xl font-black mb-1" style={{ color: "#003087" }}>
                      {product.name}
                    </h3>
                    <div className="mb-5 pb-4 border-b border-borde">
                      <span className="text-xs text-gris-medio">desde </span>
                      <span className="text-2xl font-black" style={{ color: "#009FE3" }}>
                        {product.price}€
                      </span>
                      <span className="text-sm text-gris-medio">/mes</span>
                    </div>

                    <ul className="space-y-2.5 mb-6">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gris-texto">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#009FE3" }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={product.slug}
                      className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 ${product.highlighted ? "btn-cta-blue" : "btn-cta-light"}`}
                      style={{
                        backgroundColor: product.highlighted ? "#009FE3" : "#F4F6FA",
                        color: product.highlighted ? "#fff" : "#003087",
                        borderRadius: "10px",
                      }}
                    >
                      Ver plan
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Content Section: Who is this for ── */}
        <section className="section-pad bg-gris-claro">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-black mb-5" style={{ color: "#003087" }}>
                  {data.contentTitle}
                </h2>
                <p className="text-base text-gris-medio mb-8 leading-relaxed">
                  {data.contentDescription}
                </p>
                <div className="space-y-5">
                  {data.contentFeatures.map((f, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#E8F4FC" }}>
                        <CheckCircle2 className="w-4 h-4" style={{ color: "#009FE3" }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gris-texto mb-1">{f.title}</h3>
                        <p className="text-sm text-gris-medio">{f.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Tarificador Section ── */}
        <Tarificador />

        {/* ── FAQ Section ── */}
        <section className="section-pad bg-gris-claro">
          <div className="container mx-auto px-4 max-w-[780px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-black" style={{ color: "#003087" }}>
                Preguntas frecuentes
              </h2>
            </motion.div>
            <div className="space-y-3">
              {data.faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-blanco border border-borde overflow-hidden"
                    style={{ borderRadius: "12px" }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-bold text-gris-texto text-[15px] pr-4">{faq.question}</span>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                        style={{ backgroundColor: isOpen ? "#009FE3" : "#E8F4FC" }}
                      >
                        <span
                          className="text-lg font-bold transition-transform duration-200"
                          style={{ color: isOpen ? "#fff" : "#009FE3", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
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
                            {faq.answer}
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

        <CtaSection />
      </main>
      <Footer />
    </TarificadorProvider>
  );
};

export default SegmentPageTemplate;
