"use client";

import { motion, AnimatePresence } from "@/lib/motion";
import { useState, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { TarificadorProvider } from "@/components/TarificadorContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Tarificador from "@/components/Tarificador";
import CtaSection from "@/components/CtaSection";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import defaultHeroBg from "@/assets/seguro-salud-adeslas-familias.webp";
import { imgSrc } from "@/lib/imgSrc";
import PromoPill from "@/components/PromoPill";
import type { PromoPillData } from "@/components/PromoPill";
import BannerServiciosDigitales from "@/components/BannerServiciosDigitales";

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
  heroBg?: string | unknown; /* accepts StaticImageData from Next.js image imports */
  heroTitle: string;
  heroSubtitle: string;
  heroPromo?: string;
  heroPromoPill?: PromoPillData;
  /** Barra de promoción amarilla (#F59E0B) que aparece entre el hero y las tarjetas de productos */
  promoBar?: string;
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
  /** Muestra el banner de servicios digitales (videollamada, autorizaciones, chat 24h) antes de las reseñas */
  showServiciosDigitales?: boolean;
}

/* ───── FAQ Section (componente aislado) ─────────────────────────────────────
   INP FIX: el estado openFaq vivía en SegmentPageTemplate, de modo que cada click
   en una pregunta provocaba el re-render completo del template (hero + productos +
   todos los motion.div con whileInView). En móvil esto genera > 200 ms de trabajo
   en el main thread antes del siguiente paint → INP 271 ms (GSC, mayo 2026).
   Extrayendo el estado al componente hijo el re-render queda confinado solo a
   FaqSection, que es mucho más ligero. memo() evita que re-renders del padre
   propaguen trabajo innecesario a este bloque. */
interface FaqSectionProps {
  faqs: SegmentFaq[];
}

const FaqSection = memo(({ faqs }: FaqSectionProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggle = useCallback((i: number) => {
    setOpenFaq((prev) => (prev === i ? null : i));
  }, []);

  return (
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
          {faqs.map((faq, i) => {
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
                  onClick={() => toggle(i)}
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
  );
});

FaqSection.displayName = "FaqSection";

/* ───── Template ───── */

/* SEO del SPA (react-helmet). En las rutas SSG (renderSeo={false}) los metadatos
   los aporta generateMetadata nativo de Next, así que no se monta este componente
   y no se requiere HelmetProvider. */
const SpaSeo = ({ data }: { data: SegmentPageData }) => {
  const _seo = useSeo({
    title: data.seo.title,
    description: data.seo.description,
    canonical: data.seo.canonical,
    ogImage: data.seo.ogImage,
    breadcrumbs: data.seo.breadcrumbs,
    faqSchema: data.schemaFaq !== false
      ? data.faqs.map((f) => ({ q: f.question, a: f.answer }))
      : undefined,
  });
  return <>{_seo}</>;
};

const SegmentPageTemplate = ({ data, renderSeo = true }: { data: SegmentPageData; renderSeo?: boolean }) => {
  return (
    <TarificadorProvider>
      {renderSeo && <SpaSeo data={data} />}
      <Header />
      <main>
        {/* ── Hero with 2 columns — full photo + dark overlay, same as home ── */}
        <section
          className="relative overflow-hidden flex items-center"
          style={{ minHeight: "520px" }}
          role="img"
          aria-label={`${data.heroTitle} — Adeslas seguros médicos privados`}
        >
          {/* LCP FIX: <img> con sizes correcto — el navegador elige la resolución
              adecuada al viewport sin descargar más píxeles de los necesarios */}
          <img
            src={imgSrc(data.heroBg || defaultHeroBg)}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 1440px"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/65" />

          <div className="container mx-auto px-4 py-12 lg:py-10 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
              {/* Left: text */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:pl-14 xl:pl-24"
              >
                <h1 className="text-white mb-3 text-[26px] md:text-[36px] leading-tight md:leading-[1.15] font-semibold">
                  {data.heroTitle}
                </h1>
                <p className="text-base mb-4 max-w-xl" style={{ color: "rgba(255,255,255,0.88)" }}>
                  {data.heroSubtitle}
                </p>

                {/* Promo pill campaña Jun-Dic 2026 */}
                {data.heroPromoPill && (
                  <div className="mb-6">
                    <PromoPill pill={data.heroPromoPill} />
                  </div>
                )}

                {/* Trust badges */}
                <div className="flex flex-wrap gap-3">
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

        {/* ── Promo bar (opcional) — entre hero y tarjetas ── */}
        {data.promoBar && (
          <section className="py-4" style={{ backgroundColor: "#F59E0B" }}>
            <div className="container mx-auto px-4 text-center">
              <p className="font-bold text-sm" style={{ color: "#1C1917" }}>
                {data.promoBar}
              </p>
            </div>
          </section>
        )}

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
                    className="py-2 px-4 text-xs font-bold uppercase tracking-wider text-center"
                    style={{
                      backgroundColor: product.highlighted ? "#009FE3" : "#F4F6FA",
                      color: product.highlighted ? "#fff" : "#6B8296",
                    }}
                  >
                    <span>{product.badge}</span>
                    {product.promoBadge && (
                      <div className="flex justify-center mt-1">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white leading-tight text-center"
                          style={{
                            background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
                            boxShadow: "0 2px 8px rgba(249,115,22,0.40)",
                            maxWidth: "100%",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                          }}
                        >
                          {product.promoBadge}
                        </span>
                      </div>
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
                      className={`w-full py-3 rounded-lg font-extrabold text-sm flex items-center justify-center gap-2 ${product.highlighted ? "btn-cta-blue" : "btn-cta-light"}`}
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

        {/* ── Banner servicios digitales (opcional por página) ── */}
        {data.showServiciosDigitales && (
          <section className="section-pad" style={{ background: "#003087" }}>
            <div className="container mx-auto px-4 max-w-5xl">
              <BannerServiciosDigitales />
            </div>
          </section>
        )}

        {/* ── Reseñas reales de Google — antes de FAQ para reforzar social proof ── */}
        <GoogleReviewsSection />
        {/* ── FAQ Section — renderizado en componente aislado (ver FaqSection arriba) ── */}
        <FaqSection faqs={data.faqs} />

        <CtaSection />
      </main>
      <Footer />
    </TarificadorProvider>
  );
};

export default SegmentPageTemplate;
