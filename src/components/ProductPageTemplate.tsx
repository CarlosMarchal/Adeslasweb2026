import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { TarificadorProvider } from "@/components/TarificadorContext";
import { PageCalcProvider } from "@/components/PageCalcContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalcButton from "@/components/CalcButton";
import Tarificador from "@/components/Tarificador";
import CtaSection from "@/components/CtaSection";
import { usePhonePopup } from "@/components/PhonePopupContext";
import heroBg from "@/assets/seguro-salud-adeslas-individual.webp";

/* ───────── Types ───────── */

export interface ProductFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface ProductTab {
  label: string;
  items: string[];
  /* Optional card overrides — when set, the left card updates to match this tab */
  cardName?: string;
  cardDescription?: string;
  cardCoverages?: string[];
  cardPill?: string;
  cardPillDark?: boolean;
  cardPrice?: string;
  cardPricePeriod?: string;
}

export interface ProductFaq {
  q: string;
  a: string | React.ReactNode;
}

export interface ProductPageData {
  /* SEO */
  seoTitle: string;
  seoDescription: string;
  seoCanonical: string;
  seoOgImage?: string;
  seoProductSchema?: {
    name: string;
    description: string;
    category: string;
    price?: string;
    pricePeriod?: string;
  };
  seoBreadcrumbs?: Array<{ name: string; url: string }>;

  /* Hero */
  badge?: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  price: string;
  pricePeriod?: string;
  heroImage?: string;          /* custom hero background image (import) */
  heroGradient?: string;       /* custom gradient override */

  /* Features grid */
  features: ProductFeature[];

  /* Product card */
  cardName: string;
  cardDescription: string;
  cardCoverages: string[];
  cardPill: string;
  cardPillDark?: boolean;
  cardPromoBadge?: string;

  /* Tabs content */
  tabs: ProductTab[];

  /* FAQ */
  faqs: ProductFaq[];

  /* Promo (optional) */
  showPromo?: boolean;

  /* Schema.org structured data */
  schemaFaq?: boolean;

  /* Product slug for tarificador (e.g. "/seguro-salud/adeslas-plena-total/") */
  productSlug?: string;

  /* Optional custom tarificador component to replace the default one */
  customTarificador?: React.ReactNode;

  /* Replace "Solicitar llamada" CalcButton with phone popup CTA */
  usePhoneCallCta?: boolean;

  /* Replace card CTA with WhatsApp button */
  useWhatsAppCta?: boolean;

  /* Predefined WhatsApp message (used when useWhatsAppCta is true) */
  whatsAppMessage?: string;

  /* Optional promo banner shown in hero below subtitle */
  heroPromo?: string;

  /* Optional custom content rendered in the hero below the subtitle/promobar (e.g. pricing cards) */
  heroContent?: React.ReactNode;

  /* Hide the medical trust badges in the hero (use for non-health products) */
  hideHeroBadges?: boolean;

  /* Hide the price display in the hero (use when two products with different prices) */
  hideHeroPrice?: boolean;

  /* Hide the price row in the product card (use for prima única or price-on-request products) */
  hideCardPrice?: boolean;
}

/* ───────── Sub-components ───────── */

const CheckIcon = () => (
  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#E8F4FC" }}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 4" stroke="#009FE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </div>
);

const FeatureIcon = ({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) => (
  <div
    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 flex-shrink-0"
    style={{ backgroundColor: highlight ? "#003087" : "#E8F4FC" }}
  >
    {children}
  </div>
);

/* ───────── Custom Tarificador Mobile Modal ───────── */

const CustomTarificadorModal = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[700] flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 8 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="bg-white rounded-2xl w-full max-w-lg flex flex-col"
          style={{
            boxShadow: "0 24px 64px rgba(0,48,135,0.22)",
            maxHeight: "90dvh",
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Sticky header with close button — always visible */}
          <div
            className="flex-shrink-0 flex items-center justify-end px-4 py-2"
            style={{ borderBottom: "1px solid #F1F5F9" }}
          >
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 p-1 pb-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ───────── Product Hero ───────── */

const ProductHero = ({
  data,
  onMobileCalc,
}: {
  data: ProductPageData;
  onMobileCalc?: () => void;
}) => {
  const { openPhonePopup } = usePhonePopup();
  return (
  <section
    className="relative overflow-hidden bg-cover bg-center flex items-center"
    style={{ backgroundImage: `url(${data.heroImage || heroBg})`, minHeight: "520px" }}
    role="img"
    aria-label={`${data.heroTitle}${data.heroHighlight ? " " + data.heroHighlight : ""} — Adeslas seguros médicos privados`}
  >
    {/* Dark overlay — same approach as home HeroSection */}
    <div className="absolute inset-0 bg-black/65" />

    <div className="container mx-auto px-4 py-12 lg:py-10 relative z-10 w-full">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:pl-14 xl:pl-24">
          {data.badge && (
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full mb-4 text-sm text-white border" style={{ borderColor: "rgba(255,255,255,0.4)", background: "transparent" }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#009FE3" }} />
              {data.badge}
            </div>
          )}

          <h1 className="text-white mb-3 text-[26px] md:text-[36px] leading-tight md:leading-[1.15] font-bold">
            {data.heroTitle}
            {data.heroHighlight && (
              <><br /><span style={{ color: "#009FE3" }}>{data.heroHighlight}</span></>
            )}
          </h1>

          <p className="text-base mb-3 max-w-2xl" style={{ color: "rgba(255,255,255,0.92)" }}>
            {data.heroSubtitle}
          </p>

          {data.heroContent && data.heroContent}

          {/* Price */}
          {!data.hideHeroPrice && (
            <div className="flex items-end gap-2.5 flex-wrap mb-6">
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.92)" }}>Desde</span>
              <span className="text-[48px] font-black leading-none" style={{ color: "#fff" }}>{data.price}€</span>
              <span style={{ color: "rgba(255,255,255,0.85)" }} className="text-lg">/{data.pricePeriod || "mes"}</span>
            </div>
          )}

          {/* Trust badges — médicos, solo en páginas de salud */}
          {!data.hideHeroBadges && (
            <div className="flex flex-wrap gap-3 mt-2">
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
          )}
        </motion.div>

        {/* Tarificador inline - desktop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block"
        >
          {data.customTarificador ? (
            /* ContactCtaCard y similares */
            <div
              className="bg-white rounded-2xl overflow-hidden max-w-[370px] mx-auto lg:ml-8 xl:ml-16"
              style={{ boxShadow: "0 20px 56px rgba(0,0,0,0.22)" }}
            >
              {data.customTarificador}
            </div>
          ) : (
            /* Tarificador en card blanca */
            <div className="rounded-2xl overflow-hidden max-w-[370px] mx-auto lg:ml-8 xl:ml-16" style={{ boxShadow: "0 20px 56px rgba(0,0,0,0.22)", height: "390px" }}>
              <Tarificador compact productSlug={data.productSlug} />
            </div>
          )}
        </motion.div>
      </div>

      {/* Píldora promo puntos regalo — centrada, fondo del hero */}
      {data.heroPromo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.45, ease: "easeOut" }}
          className="flex justify-center mt-6"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-center max-w-xs sm:max-w-none"
            style={{
              background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(249,115,22,0.45)",
            }}
          >
            <span className="flex-shrink-0" style={{ fontSize: 14 }}>🎁</span>
            <span>Consigue puntos al contratar este seguro y canjéalo por tarjeta monedero o regalos</span>
          </div>
        </motion.div>
      )}
    </div>
  </section>
  );
};

/* ───────── Features Grid ───────── */

const FeaturesGrid = ({ features, productName }: { features: ProductFeature[]; productName: string }) => (
  <section className="section-pad bg-blanco">
    <div className="container mx-auto">
      <h2 className="text-gris-texto text-2xl md:text-3xl mb-8 text-center max-w-3xl mx-auto">
        ¿Qué incluye {productName}?
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className={`flex items-start gap-3 p-4 hover:-translate-y-0.5 transition-all duration-[250ms] ${
              f.highlight
                ? "border-2"
                : "border border-borde card-shadow hover:card-shadow-hover"
            }`}
            style={{
              borderRadius: "14px",
              borderColor: f.highlight ? "#009FE3" : undefined,
              backgroundColor: f.highlight ? "#F0F9FF" : "#fff",
              boxShadow: f.highlight ? "0 4px 18px rgba(0,159,227,0.15)" : undefined,
            }}
          >
            <FeatureIcon highlight={f.highlight}>
              {/* Re-render icon with white tint if highlighted */}
              <span style={{ filter: f.highlight ? "brightness(0) invert(1)" : undefined }}>
                {f.icon}
              </span>
            </FeatureIcon>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-gris-texto text-sm font-bold leading-snug">{f.title}</h3>
                {f.highlight && (
                  <span
                    className="flex-shrink-0 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#009FE3", color: "#fff", marginTop: "1px" }}
                  >
                    ★ Incluido
                  </span>
                )}
              </div>
              <p className="text-xs text-gris-medio leading-relaxed">{f.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────── Product Card + Tabs ───────── */

const ProductDetail = ({ data }: { data: ProductPageData }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { openPhonePopup } = usePhonePopup();

  /* Resolve card fields: tab overrides take precedence over page defaults */
  const tab = data.tabs[activeTab];
  const cardName        = tab.cardName        ?? data.cardName;
  const cardDescription = tab.cardDescription ?? data.cardDescription;
  const cardCoverages   = tab.cardCoverages   ?? data.cardCoverages;
  const cardPill        = tab.cardPill        ?? data.cardPill;
  const cardPillDark    = tab.cardPillDark    ?? data.cardPillDark;
  const cardPrice       = tab.cardPrice       ?? data.price;
  const cardPricePeriod = tab.cardPricePeriod ?? (data.pricePeriod || "mes");

  return (
    <section className="section-pad bg-gris-claro">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-gris-texto text-2xl md:text-3xl mb-8 text-center">
          Coberturas y modalidades de {data.cardName}
        </h2>
        <div className="grid lg:grid-cols-[340px_1fr] gap-8 items-start">
          {/* Product card */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-blanco border-2 border-azul-medio p-6 lg:sticky lg:top-28 min-w-0 overflow-hidden relative"
            style={{ borderRadius: "16px" }}
          >
            {data.cardPromoBadge && (
              <div
                className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-md whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
                  boxShadow: "0 3px 10px rgba(249,115,22,0.40)",
                }}
              >
                {data.cardPromoBadge}
              </div>
            )}
            <h3 className="text-gris-texto mb-1">{cardName}</h3>
            <p className="text-sm text-gris-medio mb-3">{cardDescription}</p>
            {!data.hideCardPrice && (
              <div className="price-style mb-3">
                <span className="text-sm font-normal text-gris-medio">desde </span>{cardPrice}€<span className="text-base font-normal text-gris-medio">/{cardPricePeriod.replace(/^\//, "")}</span>
              </div>
            )}
            <div
              className="px-3 py-1.5 rounded-xl text-xs font-bold mb-5 w-max max-w-full"
              style={{
                backgroundColor: cardPillDark ? "#003087" : "#E8F4FC",
                color: cardPillDark ? "#fff" : "#009FE3",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {cardPill}
            </div>
            <div className="space-y-2.5 mb-6">
              {cardCoverages.map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm text-gris-texto">
                  <CheckIcon />
                  {c}
                </div>
              ))}
            </div>
            {data.useWhatsAppCta ? (
              <a
                href={`https://wa.me/34611394319${data.whatsAppMessage ? `?text=${encodeURIComponent(data.whatsAppMessage)}` : ""}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full text-center py-3 rounded-lg font-bold text-sm cursor-pointer btn-cta-whatsapp"
                style={{ backgroundColor: "#25D366", color: "#fff", borderRadius: "7px" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Consúltanos por WhatsApp
              </a>
            ) : data.usePhoneCallCta ? (
              <button
                onClick={openPhonePopup}
                className="block w-full text-center py-3 rounded-lg text-primary-foreground font-bold text-sm cursor-pointer btn-cta-magenta"
                style={{ backgroundColor: "#E4097D", borderRadius: "7px" }}
              >
                Te llamamos ahora →
              </button>
            ) : (
              <button
                onClick={() => openPhonePopup()}
                className="block w-full text-center py-3 rounded-lg text-primary-foreground font-bold text-sm cursor-pointer btn-cta-magenta"
                style={{ backgroundColor: "#E4097D", borderRadius: "7px" }}
              >
                Solicitar llamada →
              </button>
            )}
          </motion.div>

          {/* Tabs content */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex gap-1 mb-6 bg-blanco border border-borde p-1" style={{ borderRadius: "12px" }}>
              {data.tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 py-2.5 px-4 text-sm font-bold transition-colors cursor-pointer${activeTab !== i ? " hover:bg-[#EBF7FD]" : ""}`}
                  style={{
                    borderRadius: "8px",
                    backgroundColor: activeTab === i ? "#009FE3" : "transparent",
                    color: activeTab === i ? "#fff" : "#6B8296",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-blanco border border-borde p-6"
                style={{ borderRadius: "16px" }}
              >
                <ul className="space-y-3">
                  {data.tabs[activeTab].items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gris-texto leading-relaxed">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ───────── Product FAQ ───────── */

const ProductFaqSection = ({ faqs, productName }: { faqs: ProductFaq[]; productName: string }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-pad bg-blanco">
      <div className="container mx-auto max-w-[780px]">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-gris-texto mb-3">Preguntas frecuentes sobre {productName}</h2>
          <p className="text-gris-medio">Resolvemos las dudas más habituales sobre coberturas, precios y contratación de {productName}.</p>
        </motion.div>
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
                className="bg-gris-claro border border-borde overflow-hidden"
                style={{ borderRadius: "12px" }}
              >
                <button onClick={() => setOpenIndex(isOpen ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-bold text-gris-texto text-[15px] pr-4">{faq.q}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200" style={{ backgroundColor: isOpen ? "#009FE3" : "#E8F4FC" }}>
                    <span className="text-lg font-bold transition-transform duration-200" style={{ color: isOpen ? "#fff" : "#009FE3", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <div className="px-5 pb-5 text-sm text-gris-medio leading-relaxed">{faq.a}</div>
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
};

/* ───────── Promo Banner ───────── */

const PromoBanner = ({ onCalcClick }: { onCalcClick?: () => void }) => (
  <section className="section-pad" style={{ background: "linear-gradient(135deg, #003087 0%, #009FE3 100%)" }}>
    <div className="container mx-auto max-w-3xl text-center">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6" style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}>
          Promoción vigente
        </div>
        <h2 className="text-primary-foreground text-2xl md:text-3xl mb-4">Aprovecha nuestras promociones vigentes</h2>
        <p className="text-base mb-6 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.8)" }}>
          Consulta con nosotros las promociones disponibles y encuentra la mejor opción para ti.
        </p>
        {onCalcClick ? (
          <button
            onClick={onCalcClick}
            className="px-6 py-3 rounded-lg font-bold text-sm cursor-pointer btn-cta-white"
            style={{ backgroundColor: "#fff", color: "#003087", borderRadius: "7px" }}
          >
            Calcular mi precio →
          </button>
        ) : (
          <CalcButton className="px-6 py-3 rounded-lg font-bold text-sm cursor-pointer btn-cta-white" style={{ backgroundColor: "#fff", color: "#003087", borderRadius: "7px" }}>
            Calcular mi precio →
          </CalcButton>
        )}
      </motion.div>
    </div>
  </section>
);

/* ───────── Main Template ───────── */

const ProductPageTemplate = ({ data }: { data: ProductPageData }) => {
  const [customTarificadorOpen, setCustomTarificadorOpen] = useState(false);
  const openCustom = data.customTarificador ? () => setCustomTarificadorOpen(true) : undefined;
  const { openPhonePopup } = usePhonePopup();

  // Mobile sticky CTA routing:
  // - customTarificador pages → phone popup (no calculator)
  // - regular product pages  → scroll to the inline tarificador below the hero
  const mobileCalcAction = data.customTarificador
    ? () => openPhonePopup()
    : () => document.getElementById("calculadora")?.scrollIntoView({ behavior: "smooth" });
  const mobileCalcLabel = data.customTarificador ? "Solicitar llamada" : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const _seo = useSeo({
    title: data.seoTitle,
    description: data.seoDescription,
    canonical: data.seoCanonical,
    faqSchema: data.schemaFaq !== false ? data.faqs : undefined,
    ogImage: data.seoOgImage,
    ogType: "product",
    productSchema: data.seoProductSchema
      ? { ...data.seoProductSchema, url: data.seoCanonical }
      : undefined,
    breadcrumbs: data.seoBreadcrumbs,
  });

  return (
    <TarificadorProvider>
      {_seo}
      <PageCalcProvider value={{ onCalcClick: mobileCalcAction, calcLabel: mobileCalcLabel }}>
        <Header />
        <ProductHero data={data} onMobileCalc={openCustom} />
        {/* Tarificador inline — visible only on mobile, matches home layout */}
        {!data.customTarificador && (
          <div className="lg:hidden">
            <Tarificador productSlug={data.productSlug} />
          </div>
        )}
        <FeaturesGrid features={data.features} productName={data.cardName} />
        <ProductDetail data={data} />
        <ProductFaqSection faqs={data.faqs} productName={data.cardName} />
        {data.showPromo !== false && <PromoBanner onCalcClick={openCustom} />}
        <CtaSection onCalcClick={openCustom} />
        <Footer />
        {/* Global modal for customTarificador (mobile + desktop CTA) */}
        {data.customTarificador && (
          <CustomTarificadorModal
            open={customTarificadorOpen}
            onClose={() => setCustomTarificadorOpen(false)}
          >
            {data.customTarificador}
          </CustomTarificadorModal>
        )}
      </PageCalcProvider>
    </TarificadorProvider>
  );
};

export default ProductPageTemplate;
