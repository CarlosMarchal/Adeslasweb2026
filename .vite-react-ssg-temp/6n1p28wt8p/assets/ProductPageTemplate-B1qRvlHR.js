import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { u as usePhonePopup, b as useSeo, c as TarificadorProvider, P as PageCalcProvider, H as Header, d as Tarificador, C as CtaSection, F as Footer, i as imgSrc, f as CalcButton } from '../main.mjs';
import { h as heroBg } from './seguro-salud-adeslas-individual-Za9HuXEo.js';

const CheckIcon = () => /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0", style: { backgroundColor: "#E8F4FC" }, children: /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M2.5 6L5 8.5L9.5 4", stroke: "#009FE3", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) });
const FeatureIcon = ({ children, highlight }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: "w-10 h-10 rounded-xl flex items-center justify-center mb-3 flex-shrink-0",
    style: { backgroundColor: highlight ? "#003087" : "#E8F4FC" },
    children
  }
);
const CustomTarificadorModal = ({
  open,
  onClose,
  children
}) => /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
  motion.div,
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    className: "fixed inset-0 z-[700] flex items-center justify-center bg-black/50 p-4",
    onClick: onClose,
    children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { scale: 0.95, opacity: 0, y: 8 },
        animate: { scale: 1, opacity: 1, y: 0 },
        exit: { scale: 0.95, opacity: 0, y: 8 },
        transition: { type: "spring", damping: 28, stiffness: 300 },
        className: "bg-white rounded-2xl w-full max-w-lg flex flex-col",
        style: {
          boxShadow: "0 24px 64px rgba(0,48,135,0.22)",
          maxHeight: "90dvh"
        },
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex-shrink-0 flex items-center justify-end px-4 py-2",
              style: { borderBottom: "1px solid #F1F5F9" },
              children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClose,
                  className: "w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors",
                  children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "overflow-y-auto flex-1 p-1 pb-6", children })
        ]
      }
    )
  }
) });
const ProductHero = ({
  data,
  onMobileCalc
}) => {
  const { openPhonePopup } = usePhonePopup();
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "relative overflow-hidden bg-cover bg-center flex items-center",
      style: { backgroundImage: `url(${imgSrc(data.heroImage || heroBg)})`, minHeight: "520px" },
      role: "img",
      "aria-label": `${data.heroTitle}${data.heroHighlight ? " " + data.heroHighlight : ""} — Adeslas seguros médicos privados`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/65" }),
        /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12 lg:py-10 relative z-10 w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8 lg:gap-10 items-center", children: [
            /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "lg:pl-14 xl:pl-24", children: [
              data.badge && /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-2 rounded-full mb-4 text-sm text-white border", style: { borderColor: "rgba(255,255,255,0.4)", background: "transparent" }, children: [
                /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full flex-shrink-0", style: { background: "#009FE3" } }),
                data.badge
              ] }),
              /* @__PURE__ */ jsxs("h1", { className: "text-white mb-3 text-[26px] md:text-[36px] leading-tight md:leading-[1.15] font-bold", children: [
                data.heroTitle,
                data.heroHighlight && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("br", {}),
                  /* @__PURE__ */ jsx("span", { style: { color: "#009FE3" }, children: data.heroHighlight })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-base mb-3 max-w-2xl", style: { color: "rgba(255,255,255,0.92)" }, children: data.heroSubtitle }),
              data.heroContent && data.heroContent,
              !data.hideHeroPrice && /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2.5 flex-wrap mb-6", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", style: { color: "rgba(255,255,255,0.92)" }, children: "Desde" }),
                /* @__PURE__ */ jsxs("span", { className: "text-[48px] font-black leading-none", style: { color: "#fff" }, children: [
                  data.price,
                  "€"
                ] }),
                /* @__PURE__ */ jsxs("span", { style: { color: "rgba(255,255,255,0.85)" }, className: "text-lg", children: [
                  "/",
                  data.pricePeriod || "mes"
                ] })
              ] }),
              !data.hideHeroBadges && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3 mt-2", children: [
                { emoji: "⭐", label: "+30 años de experiencia" },
                { emoji: "🏥", label: "Sin listas de espera" },
                { emoji: "👨‍⚕️", label: "+51.000 médicos" },
                { emoji: "🏨", label: "+1.400 centros" }
              ].map(({ emoji, label }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-white text-xs sm:text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0", style: { background: "rgba(255,255,255,0.15)" }, children: emoji }),
                label
              ] }, label)) })
            ] }),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.2 },
                className: "hidden lg:block",
                children: data.customTarificador ? (
                  /* ContactCtaCard y similares */
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "bg-white rounded-2xl overflow-hidden max-w-[370px] mx-auto lg:ml-8 xl:ml-16",
                      style: { boxShadow: "0 20px 56px rgba(0,0,0,0.22)" },
                      children: data.customTarificador
                    }
                  )
                ) : (
                  /* Tarificador en card blanca */
                  /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden max-w-[370px] mx-auto lg:ml-8 xl:ml-16", style: { boxShadow: "0 20px 56px rgba(0,0,0,0.22)", height: "390px" }, children: /* @__PURE__ */ jsx(Tarificador, { compact: true, productSlug: data.productSlug }) })
                )
              }
            )
          ] }),
          data.heroPromo && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.65, duration: 0.45, ease: "easeOut" },
              className: "flex justify-center mt-6",
              children: /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-center max-w-xs sm:max-w-none",
                  style: {
                    background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(249,115,22,0.45)"
                  },
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "flex-shrink-0", style: { fontSize: 14 }, children: "🎁" }),
                    /* @__PURE__ */ jsx("span", { children: "Consigue puntos al contratar este seguro y canjéalo por tarjeta monedero o regalos" })
                  ]
                }
              )
            }
          )
        ] })
      ]
    }
  );
};
const FeaturesGrid = ({ features, productName }) => /* @__PURE__ */ jsx("section", { className: "section-pad bg-blanco", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
  /* @__PURE__ */ jsxs("h2", { className: "text-gris-texto text-2xl md:text-3xl mb-8 text-center max-w-3xl mx-auto", children: [
    "¿Qué incluye ",
    productName,
    "?"
  ] }),
  /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto", children: features.map((f, i) => /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: i * 0.07 },
      className: `flex items-start gap-3 p-4 hover:-translate-y-0.5 transition-all duration-[250ms] ${f.highlight ? "border-2" : "border border-borde card-shadow hover:card-shadow-hover"}`,
      style: {
        borderRadius: "14px",
        borderColor: f.highlight ? "#009FE3" : void 0,
        backgroundColor: f.highlight ? "#F0F9FF" : "#fff",
        boxShadow: f.highlight ? "0 4px 18px rgba(0,159,227,0.15)" : void 0
      },
      children: [
        /* @__PURE__ */ jsx(FeatureIcon, { highlight: f.highlight, children: /* @__PURE__ */ jsx("span", { style: { filter: f.highlight ? "brightness(0) invert(1)" : void 0 }, children: f.icon }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-gris-texto text-sm font-bold leading-snug", children: f.title }),
            f.highlight && /* @__PURE__ */ jsx(
              "span",
              {
                className: "flex-shrink-0 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full",
                style: { backgroundColor: "#009FE3", color: "#fff", marginTop: "1px" },
                children: "★ Incluido"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gris-medio leading-relaxed", children: f.description })
        ] })
      ]
    },
    i
  )) })
] }) });
const ProductDetail = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { openPhonePopup } = usePhonePopup();
  const tab = data.tabs[activeTab];
  const cardName = tab.cardName ?? data.cardName;
  const cardDescription = tab.cardDescription ?? data.cardDescription;
  const cardCoverages = tab.cardCoverages ?? data.cardCoverages;
  const cardPill = tab.cardPill ?? data.cardPill;
  const cardPillDark = tab.cardPillDark ?? data.cardPillDark;
  const cardPrice = tab.cardPrice ?? data.price;
  const cardPricePeriod = tab.cardPricePeriod ?? (data.pricePeriod || "mes");
  return /* @__PURE__ */ jsx("section", { className: "section-pad bg-gris-claro", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-gris-texto text-2xl md:text-3xl mb-8 text-center", children: [
      "Coberturas y modalidades de ",
      data.cardName
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[340px_1fr] gap-8 items-start", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.2 },
          className: "bg-blanco border-2 border-azul-medio p-6 lg:sticky lg:top-28 min-w-0 overflow-hidden relative",
          style: { borderRadius: "16px" },
          children: [
            data.cardPromoBadge && /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-md whitespace-nowrap",
                style: {
                  background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
                  boxShadow: "0 3px 10px rgba(249,115,22,0.40)"
                },
                children: data.cardPromoBadge
              }
            ),
            /* @__PURE__ */ jsx("h3", { className: "text-gris-texto mb-1", children: cardName }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-medio mb-3", children: cardDescription }),
            !data.hideCardPrice && /* @__PURE__ */ jsxs("div", { className: "price-style mb-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-gris-medio", children: "desde " }),
              cardPrice,
              "€",
              /* @__PURE__ */ jsxs("span", { className: "text-base font-normal text-gris-medio", children: [
                "/",
                cardPricePeriod.replace(/^\//, "")
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "px-3 py-1.5 rounded-xl text-xs font-bold mb-5 w-max max-w-full",
                style: {
                  backgroundColor: cardPillDark ? "#003087" : "#E8F4FC",
                  color: cardPillDark ? "#fff" : "#009FE3",
                  wordBreak: "break-word",
                  overflowWrap: "break-word"
                },
                children: cardPill
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "space-y-2.5 mb-6", children: cardCoverages.map((c) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gris-texto", children: [
              /* @__PURE__ */ jsx(CheckIcon, {}),
              c
            ] }, c)) }),
            data.useWhatsAppCta ? /* @__PURE__ */ jsxs(
              "a",
              {
                href: `https://wa.me/${data.whatsAppPhone ?? "34611394319"}${data.whatsAppMessage ? `?text=${encodeURIComponent(data.whatsAppMessage)}` : ""}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center justify-center gap-2 w-full text-center py-3 rounded-lg font-bold text-sm cursor-pointer btn-cta-whatsapp",
                style: { backgroundColor: "#25D366", color: "#fff", borderRadius: "7px" },
                children: [
                  /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) }),
                  "Consúltanos por WhatsApp"
                ]
              }
            ) : data.usePhoneCallCta ? /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => openPhonePopup(data.hubspotSource ?? 301),
                className: "block w-full text-center py-3 rounded-lg text-primary-foreground font-bold text-sm cursor-pointer btn-cta-magenta",
                style: { backgroundColor: "#E4097D", borderRadius: "7px" },
                children: "Te llamamos ahora →"
              }
            ) : /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => openPhonePopup(data.hubspotSource ?? 301),
                className: "block w-full text-center py-3 rounded-lg text-primary-foreground font-bold text-sm cursor-pointer btn-cta-magenta",
                style: { backgroundColor: "#E4097D", borderRadius: "7px" },
                children: "Solicitar llamada →"
              }
            )
          ]
        },
        activeTab
      ),
      /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, children: [
        /* @__PURE__ */ jsx("div", { className: "flex gap-1 mb-6 bg-blanco border border-borde p-1", style: { borderRadius: "12px" }, children: data.tabs.map((tab2, i) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveTab(i),
            className: `flex-1 py-2.5 px-4 text-sm font-bold transition-colors cursor-pointer${activeTab !== i ? " hover:bg-[#EBF7FD]" : ""}`,
            style: {
              borderRadius: "8px",
              backgroundColor: activeTab === i ? "#009FE3" : "transparent",
              color: activeTab === i ? "#fff" : "#6B8296"
            },
            children: tab2.label
          },
          tab2.label
        )) }),
        /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            transition: { duration: 0.2 },
            className: "bg-blanco border border-borde p-6",
            style: { borderRadius: "16px" },
            children: /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: data.tabs[activeTab].items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-sm text-gris-texto leading-relaxed", children: [
              /* @__PURE__ */ jsx(CheckIcon, {}),
              /* @__PURE__ */ jsx("span", { children: item })
            ] }, i)) })
          },
          activeTab
        ) })
      ] })
    ] })
  ] }) });
};
const ProductFaqSection = ({ faqs, productName }) => {
  const [openIndex, setOpenIndex] = useState(null);
  return /* @__PURE__ */ jsx("section", { className: "section-pad bg-blanco", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-[780px]", children: [
    /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-gris-texto mb-3", children: [
        "Preguntas frecuentes sobre ",
        productName
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gris-medio", children: [
        "Resolvemos las dudas más habituales sobre coberturas, precios y contratación de ",
        productName,
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: faqs.map((faq, i) => {
      const isOpen = openIndex === i;
      return /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.05 },
          className: "bg-gris-claro border border-borde overflow-hidden",
          style: { borderRadius: "12px" },
          children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => setOpenIndex(isOpen ? null : i), className: "w-full flex items-center justify-between p-5 text-left", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-gris-texto text-[15px] pr-4", children: faq.q }),
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200", style: { backgroundColor: isOpen ? "#009FE3" : "#E8F4FC" }, children: /* @__PURE__ */ jsx("span", { className: "text-lg font-bold transition-transform duration-200", style: { color: isOpen ? "#fff" : "#009FE3", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }, children: "+" }) })
            ] }),
            /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.25 }, children: /* @__PURE__ */ jsx("div", { className: "px-5 pb-5 text-sm text-gris-medio leading-relaxed", children: faq.a }) }) })
          ]
        },
        i
      );
    }) })
  ] }) });
};
const PromoBanner = ({ onCalcClick }) => /* @__PURE__ */ jsx("section", { className: "section-pad", style: { background: "linear-gradient(135deg, #003087 0%, #009FE3 100%)" }, children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-3xl text-center", children: /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, children: [
  /* @__PURE__ */ jsx("div", { className: "inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6", style: { backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }, children: "Promoción vigente" }),
  /* @__PURE__ */ jsx("h2", { className: "text-primary-foreground text-2xl md:text-3xl mb-4", children: "Aprovecha nuestras promociones vigentes" }),
  /* @__PURE__ */ jsx("p", { className: "text-base mb-6 max-w-2xl mx-auto", style: { color: "rgba(255,255,255,0.8)" }, children: "Consulta con nosotros las promociones disponibles y encuentra la mejor opción para ti." }),
  onCalcClick ? /* @__PURE__ */ jsx(
    "button",
    {
      onClick: onCalcClick,
      className: "px-6 py-3 rounded-lg font-bold text-sm cursor-pointer btn-cta-white",
      style: { backgroundColor: "#fff", color: "#003087", borderRadius: "7px" },
      children: "Calcular mi precio →"
    }
  ) : /* @__PURE__ */ jsx(CalcButton, { className: "px-6 py-3 rounded-lg font-bold text-sm cursor-pointer btn-cta-white", style: { backgroundColor: "#fff", color: "#003087", borderRadius: "7px" }, children: "Calcular mi precio →" })
] }) }) });
const ProductPageTemplate = ({ data }) => {
  const [customTarificadorOpen, setCustomTarificadorOpen] = useState(false);
  const openCustom = data.customTarificador ? () => setCustomTarificadorOpen(true) : void 0;
  const { openPhonePopup } = usePhonePopup();
  const waPhone = data.whatsAppPhone ?? "34611394319";
  const waMsg = data.whatsAppMessage ?? "";
  const waUrl = `https://wa.me/${waPhone}${waMsg ? `?text=${encodeURIComponent(waMsg)}` : ""}`;
  const mobileCalcAction = data.useWhatsAppCta ? () => window.open(waUrl, "_blank", "noopener,noreferrer") : data.customTarificador ? () => openPhonePopup(data.hubspotSource ?? 301) : () => document.getElementById("calculadora")?.scrollIntoView({ behavior: "smooth" });
  const mobileCalcLabel = data.useWhatsAppCta ? "WhatsApp" : data.customTarificador ? "Solicitar llamada" : void 0;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const _seo = useSeo({
    title: data.seoTitle,
    description: data.seoDescription,
    canonical: data.seoCanonical,
    faqSchema: data.schemaFaq !== false ? data.faqs : void 0,
    ogImage: data.seoOgImage,
    ogType: "product",
    productSchema: data.seoProductSchema ? { ...data.seoProductSchema, url: data.seoCanonical, image: data.seoOgImage } : void 0,
    breadcrumbs: data.seoBreadcrumbs,
    noindex: data.seoNoindex
  });
  return /* @__PURE__ */ jsxs(TarificadorProvider, { children: [
    _seo,
    /* @__PURE__ */ jsxs(PageCalcProvider, { value: { onCalcClick: mobileCalcAction, calcLabel: mobileCalcLabel }, children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx(ProductHero, { data, onMobileCalc: openCustom }),
      !data.customTarificador && /* @__PURE__ */ jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsx(Tarificador, { productSlug: data.productSlug }) }),
      /* @__PURE__ */ jsx(FeaturesGrid, { features: data.features, productName: data.cardName }),
      /* @__PURE__ */ jsx(ProductDetail, { data }),
      /* @__PURE__ */ jsx(ProductFaqSection, { faqs: data.faqs, productName: data.cardName }),
      data.showPromo !== false && /* @__PURE__ */ jsx(PromoBanner, { onCalcClick: openCustom }),
      /* @__PURE__ */ jsx(CtaSection, { onCalcClick: openCustom }),
      /* @__PURE__ */ jsx(Footer, {}),
      data.customTarificador && /* @__PURE__ */ jsx(
        CustomTarificadorModal,
        {
          open: customTarificadorOpen,
          onClose: () => setCustomTarificadorOpen(false),
          children: data.customTarificador
        }
      )
    ] })
  ] });
};

export { ProductPageTemplate as P };
