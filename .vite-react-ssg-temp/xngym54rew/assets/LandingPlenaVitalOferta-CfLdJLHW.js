import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { u as usePhonePopup, b as useSeo, i as imgSrc, l as logoAzul } from '../main.mjs';
import 'vite-react-ssg';
import '@tanstack/react-query';
import 'react-router-dom';
import 'next-themes';
import 'sonner';
import '@radix-ui/react-toast';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-tooltip';
import 'react-helmet-async';
import 'react-dom';

const LandingPlenaVitalOferta = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { openPhonePopup } = usePhonePopup();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const _seo = useSeo({
    title: "Adeslas Plena Vital | Oferta Exclusiva · Cobertura Completa desde 38€/mes",
    description: "Seguro médico Adeslas Plena Vital: hospitalización, todas las especialidades y copagos limitados a 300€/año. Oferta exclusiva. ¡Quiero más información!",
    canonical: "https://adeslas.numero1salud.es/adeslasplenavitaloferta/",
    robots: "noindex, nofollow"
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
    "+51.000 médicos en toda España"
  ];
  const faqs = [
    {
      q: "¿Qué cubre Adeslas Plena Vital?",
      a: "Cobertura médica COMPLETA: medicina general, pediatría, TODAS las especialidades médicas, urgencias 24h, HOSPITALIZACIÓN, cirugía, diagnóstico de alta tecnología, psicología clínica, rehabilitación y fisioterapia."
    },
    {
      q: "¿Tiene copagos?",
      a: "Sí, pero están LIMITADOS a 300€ por asegurado y año. Por ejemplo: medicina general 7€, especialidades 14,50€, urgencias 14,50€. Una vez alcanzados los 300€, los servicios son GRATIS."
    },
    {
      q: "¿Incluye hospitalización?",
      a: "Sí. Hospitalización ILIMITADA: médica, quirúrgica, pediátrica y psiquiátrica. Habitación individual con cama para acompañante incluida."
    },
    {
      q: "¿Cuánto cuesta?",
      a: "Desde 38€/mes con cobertura médica completa. Precios ajustados según edad y número de asegurados. Contáctanos para tu presupuesto personalizado."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    _seo,
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 bg-white border-b border-borde", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: imgSrc(logoAzul),
          alt: "Adeslas Marchal",
          className: "h-10 object-contain",
          width: "105",
          height: "44"
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "tel:917105000",
          className: "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm text-white transition-all duration-200 hover:shadow-lg",
          style: { backgroundColor: "#E4097D" },
          children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "91 710 50 00" }),
            /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Llamar" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "bg-white", children: [
      /* @__PURE__ */ jsx(
        "section",
        {
          className: "relative overflow-hidden py-12 md:py-20",
          style: {
            background: "linear-gradient(135deg, #003087 0%, #009FE3 100%)"
          },
          children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 max-w-3xl text-center", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-white border border-white/30 bg-white/10", children: [
                  /* @__PURE__ */ jsx("span", { className: "flex-shrink-0", children: "✨" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-bold", children: "OFERTA EXCLUSIVA" })
                ] }),
                /* @__PURE__ */ jsxs("h1", { className: "text-white text-3xl md:text-5xl font-black mb-4 leading-tight", children: [
                  "Seguro Médico ",
                  /* @__PURE__ */ jsx("span", { className: "block text-2xl md:text-4xl mt-2", children: "Adeslas Plena Vital" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed", children: "Hospitalización completa, todas las especialidades y copagos limitados a 300€/año. Acceso a +51.000 médicos sin listas de espera." }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-8", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "text-6xl md:text-7xl font-black",
                        style: { color: "#fff" },
                        children: "38€"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "text-white/80 block text-lg", children: "/mes" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "h-20 w-px bg-white/20 hidden sm:block" }),
                  /* @__PURE__ */ jsxs("div", { className: "text-center text-white", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold mb-2", children: "Desde edad:" }),
                    /* @__PURE__ */ jsx("p", { className: "text-2xl font-black", children: "0 a 70 años" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => openPhonePopup(313),
                    className: "inline-block px-8 py-4 rounded-lg font-bold text-lg text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
                    style: { backgroundColor: "#E4097D" },
                    children: "Quiero más información →"
                  }
                )
              ]
            }
          ) })
        }
      ),
      /* @__PURE__ */ jsx("section", { className: "section-pad bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-4xl", children: [
        /* @__PURE__ */ jsx(
          motion.h2,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-gris-texto text-3xl md:text-4xl font-bold text-center mb-12",
            children: "Coberturas incluidas"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: coverages.map((coverage, i) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.05 },
            className: "flex items-start gap-3 p-4 bg-gris-claro border border-borde rounded-lg hover:shadow-md transition-all duration-200",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                  style: { backgroundColor: "#009FE3" },
                  children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 12 12",
                      fill: "none",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          d: "M2.5 6L5 8.5L9.5 4",
                          stroke: "white",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      )
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-gris-texto text-sm font-semibold", children: coverage })
            ]
          },
          i
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "section-pad bg-gris-claro", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-2xl text-center", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-gris-texto text-2xl md:text-3xl font-bold mb-6", children: "Precios exclusivos" }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-azul-medio rounded-2xl p-8 mb-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-3 gap-6 mb-8", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-sm mb-2", children: "0 a 44 años" }),
                  /* @__PURE__ */ jsx("p", { className: "text-4xl font-black text-gris-texto", children: "38€" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-xs mt-1", children: "/mes" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-sm mb-2", children: "44 a 54 años" }),
                  /* @__PURE__ */ jsx("p", { className: "text-4xl font-black text-gris-texto", children: "52€" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-xs mt-1", children: "/mes" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-sm mb-2", children: "55 a 70 años" }),
                  /* @__PURE__ */ jsx("p", { className: "text-4xl font-black text-gris-texto", children: "78€" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-xs mt-1", children: "/mes" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-sm", children: "Descuento del 10% a partir de 4 asegurados" })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => openPhonePopup(313),
                className: "inline-block px-8 py-4 rounded-lg font-bold text-lg text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto",
                style: { backgroundColor: "#E4097D" },
                children: "Quiero más información →"
              }
            )
          ]
        }
      ) }) }),
      /* @__PURE__ */ jsx("section", { className: "section-pad bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-2xl", children: [
        /* @__PURE__ */ jsx(
          motion.h2,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-gris-texto text-3xl font-bold text-center mb-12",
            children: "Preguntas frecuentes"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.05 },
              className: "bg-gris-claro border border-borde overflow-hidden rounded-lg",
              children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setOpenIndex(isOpen ? null : i),
                    className: "w-full flex items-center justify-between p-5 text-left hover:bg-white/50 transition-colors",
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "font-bold text-gris-texto text-base pr-4", children: faq.q }),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200",
                          style: {
                            backgroundColor: isOpen ? "#009FE3" : "#E8F4FC"
                          },
                          children: /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: "text-lg font-bold transition-transform duration-200",
                              style: {
                                color: isOpen ? "#fff" : "#009FE3",
                                transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
                              },
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
                    children: /* @__PURE__ */ jsx("div", { className: "px-5 pb-5 text-sm text-gris-medio leading-relaxed", children: faq.a })
                  }
                ) })
              ]
            },
            i
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsx(
        "section",
        {
          className: "section-pad text-center",
          style: { background: "linear-gradient(135deg, #003087 0%, #009FE3 100%)" },
          children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-2xl", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              children: [
                /* @__PURE__ */ jsx("h2", { className: "text-white text-2xl md:text-3xl font-bold mb-4", children: "Solicita tu presupuesto" }),
                /* @__PURE__ */ jsx("p", { className: "text-white/80 text-base mb-8", children: "Completa tu información y un asesor especializado te llamará para explicarte todos los detalles sin compromiso." }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => openPhonePopup(313),
                    className: "inline-block px-8 py-4 rounded-lg font-bold text-lg text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
                    style: { backgroundColor: "#E4097D" },
                    children: "Llamar ahora al 91 710 50 00 →"
                  }
                )
              ]
            }
          ) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "bg-gris-claro border-t border-borde py-6", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-xs", children: "Marchal Aseguradores, SL | Agente Exclusivo Adeslas" }),
      /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-xs mt-2", children: "Tel. 91 710 50 00 | L–V 9:00–20:00" }),
      /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-[10px] mt-3", children: "Política de privacidad · Aviso legal · Datos protegidos" })
    ] }) })
  ] });
};

export { LandingPlenaVitalOferta as default };
