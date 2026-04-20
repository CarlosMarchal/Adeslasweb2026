import { jsxs, jsx } from 'react/jsx-runtime';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { b as useSeo, c as TarificadorProvider, H as Header, d as Tarificador, i as imgSrc, C as CtaSection, F as Footer } from '../main.mjs';

const heroBg = "/assets/seguro-salud-adeslas-familias-wgv-e9vB.webp";

const SegmentPageTemplate = ({ data }) => {
  const [openFaq, setOpenFaq] = useState(null);
  const _seo = useSeo({
    title: data.seo.title,
    description: data.seo.description,
    canonical: data.seo.canonical,
    ogImage: data.seo.ogImage,
    breadcrumbs: data.seo.breadcrumbs,
    faqSchema: data.schemaFaq !== false ? data.faqs.map((f) => ({ q: f.question, a: f.answer })) : void 0
  });
  return /* @__PURE__ */ jsxs(TarificadorProvider, { children: [
    _seo,
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs(
        "section",
        {
          className: "relative overflow-hidden bg-cover bg-center flex items-center",
          style: { backgroundImage: `url(${imgSrc(data.heroBg || heroBg)})`, minHeight: "520px" },
          role: "img",
          "aria-label": `${data.heroTitle} — Adeslas seguros médicos privados`,
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/65" }),
            /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-12 lg:py-10 relative z-10 w-full", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8 lg:gap-10 items-center", children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                  className: "lg:pl-14 xl:pl-24",
                  children: [
                    /* @__PURE__ */ jsx("h1", { className: "text-white mb-3 text-[26px] md:text-[36px] leading-tight md:leading-[1.15] font-bold", children: data.heroTitle }),
                    /* @__PURE__ */ jsx("p", { className: "text-base mb-6 max-w-xl", style: { color: "rgba(255,255,255,0.88)" }, children: data.heroSubtitle }),
                    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: [
                      { emoji: "⭐", label: "+30 años de experiencia" },
                      { emoji: "🏥", label: "Sin listas de espera" },
                      { emoji: "👨‍⚕️", label: "+51.000 médicos" },
                      { emoji: "🏨", label: "+1.400 centros" }
                    ].map(({ emoji, label }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-white text-xs sm:text-sm", children: [
                      /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0", style: { background: "rgba(255,255,255,0.15)" }, children: emoji }),
                      label
                    ] }, label)) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.2 },
                  className: "hidden lg:block",
                  children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "rounded-2xl overflow-hidden max-w-[370px] mx-auto lg:ml-8 xl:ml-16",
                      style: { boxShadow: "0 20px 56px rgba(0,0,0,0.22)", height: "390px" },
                      children: /* @__PURE__ */ jsx(Tarificador, { compact: true })
                    }
                  )
                }
              )
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx("section", { className: "section-pad bg-blanco", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-gris-texto text-2xl md:text-3xl font-black mb-3", children: data.productsTitle }),
              /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-base", children: data.productsSubtitle })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 max-w-5xl mx-auto", children: data.recommendedProducts.map((product, idx) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: idx * 0.1, duration: 0.5 },
            className: `rounded-2xl overflow-hidden transition-all hover:-translate-y-1 ${product.highlighted ? "border-2 shadow-lg ring-1 ring-azul-medio/20" : "border border-borde"}`,
            style: { borderColor: product.highlighted ? "#009FE3" : void 0 },
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: `py-2.5 px-4 text-xs font-bold uppercase tracking-wider ${product.promoBadge ? "flex items-center justify-between gap-2" : "text-center"}`,
                  style: {
                    backgroundColor: product.highlighted ? "#009FE3" : "#F4F6FA",
                    color: product.highlighted ? "#fff" : "#6B8296"
                  },
                  children: [
                    /* @__PURE__ */ jsx("span", { className: product.promoBadge ? "" : "w-full text-center", children: product.badge }),
                    product.promoBadge && /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "flex-shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm whitespace-nowrap",
                        style: {
                          background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
                          boxShadow: "0 2px 8px rgba(249,115,22,0.40)"
                        },
                        children: product.promoBadge
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "p-6 bg-blanco", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-black mb-1", style: { color: "#003087" }, children: product.name }),
                /* @__PURE__ */ jsxs("div", { className: "mb-5 pb-4 border-b border-borde", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-gris-medio", children: "desde " }),
                  /* @__PURE__ */ jsxs("span", { className: "text-2xl font-black", style: { color: "#009FE3" }, children: [
                    product.price,
                    "€"
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-gris-medio", children: "/mes" })
                ] }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-2.5 mb-6", children: product.features.map((feature, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2.5 text-sm text-gris-texto", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 flex-shrink-0 mt-0.5", style: { color: "#009FE3" } }),
                  /* @__PURE__ */ jsx("span", { children: feature })
                ] }, i)) }),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: product.slug,
                    className: `w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 ${product.highlighted ? "btn-cta-blue" : "btn-cta-light"}`,
                    style: {
                      backgroundColor: product.highlighted ? "#009FE3" : "#F4F6FA",
                      color: product.highlighted ? "#fff" : "#003087",
                      borderRadius: "10px"
                    },
                    children: [
                      "Ver plan",
                      /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                    ]
                  }
                )
              ] })
            ]
          },
          product.slug
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "section-pad bg-gris-claro", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-black mb-5", style: { color: "#003087" }, children: data.contentTitle }),
            /* @__PURE__ */ jsx("p", { className: "text-base text-gris-medio mb-8 leading-relaxed", children: data.contentDescription }),
            /* @__PURE__ */ jsx("div", { className: "space-y-5", children: data.contentFeatures.map((f, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", style: { backgroundColor: "#E8F4FC" }, children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4", style: { color: "#009FE3" } }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-gris-texto mb-1", children: f.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-medio", children: f.description })
              ] })
            ] }, i)) })
          ]
        }
      ) }) }) }),
      /* @__PURE__ */ jsx(Tarificador, {}),
      /* @__PURE__ */ jsx("section", { className: "section-pad bg-gris-claro", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-[780px]", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-10",
            children: /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-black", style: { color: "#003087" }, children: "Preguntas frecuentes" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: data.faqs.map((faq, i) => {
          const isOpen = openFaq === i;
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.05 },
              className: "bg-blanco border border-borde overflow-hidden",
              style: { borderRadius: "12px" },
              children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setOpenFaq(isOpen ? null : i),
                    className: "w-full flex items-center justify-between p-5 text-left",
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "font-bold text-gris-texto text-[15px] pr-4", children: faq.question }),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200",
                          style: { backgroundColor: isOpen ? "#009FE3" : "#E8F4FC" },
                          children: /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: "text-lg font-bold transition-transform duration-200",
                              style: { color: isOpen ? "#fff" : "#009FE3", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" },
                              children: "+"
                            }
                          )
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { height: 0, opacity: 0 },
                    animate: { height: "auto", opacity: 1 },
                    exit: { height: 0, opacity: 0 },
                    transition: { duration: 0.25 },
                    children: /* @__PURE__ */ jsx("div", { className: "px-5 pb-5 text-sm text-gris-medio leading-relaxed", children: faq.answer })
                  }
                ) })
              ]
            },
            i
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsx(CtaSection, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};

export { SegmentPageTemplate as S, heroBg as h };
