import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Phone, Shield, Star, Award, CheckCircle2, X, Clock } from 'lucide-react';
import { b as useSeo, i as imgSrc, t as trackClickToCallContratacion, l as logoAzul } from '../main.mjs';
import 'vite-react-ssg/single-page';
import '@tanstack/react-query';
import 'next-themes';
import 'sonner';
import '@radix-ui/react-toast';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-tooltip';
import 'react-helmet-async';
import 'react-dom';

const productData = {
  "adeslas-go": {
    name: "Adeslas GO",
    tagline: "El seguro médico más accesible de Adeslas",
    badge: "Más económico",
    badgeColor: "#10B981",
    highlight: "Cobertura ambulatoria completa desde el primer día",
    features: [
      "Medicina general y urgencias 24h",
      "+51.000 médicos médicos en España",
      "Diagnósticos y pruebas médicas básicas",
      "Pediatría y ginecología incluidas",
      "Doctor Virtual disponible 24h",
      "Sin periodo de carencia para urgencias",
      "App Adeslas para gestionar tu seguro"
    ],
    ideal: "Ideal si buscas cobertura esencial al menor precio."
  },
  "adeslas-plena-vital": {
    name: "Adeslas Plena Vital",
    tagline: "Ambulatoria completa con hospitalización por accidente",
    badge: "Cobertura ambulatoria",
    badgeColor: "#009FE3",
    highlight: "Todo lo ambulatorio más hospitalización por accidente",
    features: [
      "Medicina general y todos los especialistas",
      "Hospitalización por accidente incluida",
      "Diagnósticos completos: analíticas, radiología, ecografías",
      "Pediatría y ginecología completas",
      "Urgencias presenciales y Doctor Virtual 24h",
      "Fisioterapia y rehabilitación",
      "App Adeslas para gestionar tu seguro"
    ],
    ideal: "Ideal si quieres más cobertura que el básico con un precio muy competitivo."
  },
  "adeslas-plena-total": {
    name: "Adeslas Plena Total",
    tagline: "El seguro más vendido. Sin copagos. Sin sorpresas.",
    badge: "Más vendido",
    badgeColor: "#003087",
    highlight: "Cobertura total sin copago en consultas, urgencias y hospitalización",
    features: [
      "Sin copago en consultas y urgencias",
      "Hospitalización y cirugía completas",
      "+51.000 médicos en toda España",
      "Diagnósticos de alta tecnología (TAC, resonancias…)",
      "Rehabilitación y fisioterapia incluidas",
      "Cobertura internacional hasta 14.000€",
      "Doctor Virtual 24h incluido",
      "Adeslas Dental opcional"
    ],
    ideal: "La opción más equilibrada: cobertura total sin pagar por cada consulta."
  },
  "adeslas-plena-vital-total": {
    name: "Adeslas Plena Vital Total",
    tagline: "Todo lo de Completa, con ampliaciones en hospitalización",
    badge: "Copago reducido",
    badgeColor: "#8B5CF6",
    highlight: "Prestaciones ampliadas y copagos más bajos que en Completa",
    features: [
      "Todo lo incluido en Adeslas Plena Total",
      "Copagos reducidos en todas las consultas",
      "Mayor cobertura en prótesis e implantes",
      "Habitación individual garantizada en hospitalización",
      "Cobertura dental ampliada",
      "Cobertura internacional hasta 18.000€",
      "Servicio de segunda opinión médica"
    ],
    ideal: "Ideal si quieres un plus de cobertura y mayor confort sin llegar al tope."
  },
  "adeslas-plena-plus": {
    name: "Adeslas Plena Plus",
    tagline: "La cobertura máxima con tope de gasto garantizado",
    badge: "Copago máx. 300€/año",
    badgeColor: "#6366F1",
    highlight: "Nunca pagarás más de 300€ en copagos al año, sin importar cuánto uses el seguro",
    features: [
      "Todo lo incluido en Adeslas Plena Total+",
      "Tope de copago de 300€/año garantizado",
      "Prótesis dentales completas incluidas",
      "Ortodoncia incluida",
      "Cobertura internacional premium",
      "Servicio de medicina preventiva",
      "Asistencia en viaje completa"
    ],
    ideal: "La tranquilidad de saber exactamente cuánto gastarás al año, como máximo."
  },
  "adeslas-extra-150": {
    name: "Adeslas Plena Extra",
    tagline: "Libertad total. Cualquier médico. En cualquier parte del mundo.",
    badge: "Libre elección",
    badgeColor: "#D97706",
    highlight: "Elige cualquier médico de España o del mundo y Adeslas te reembolsa el gasto",
    features: [
      "Cualquier médico, sin red cerrada",
      "Reembolso del gasto médico hasta el límite contratado",
      "Cobertura en todo el mundo",
      "Sin necesidad de autorización previa",
      "Historial médico unificado",
      "Servicio de segunda opinión médica internacional",
      "Hospitalización en cualquier clínica privada"
    ],
    ideal: "Para quienes valoran la libertad absoluta de elección médica."
  }
};
const CallConfirmPopup = ({ nombre, onClose }) => /* @__PURE__ */ jsx(
  motion.div,
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    className: "fixed inset-0 z-[600] flex items-center justify-center bg-black/50 px-4",
    onClick: onClose,
    children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { scale: 0.92, opacity: 0, y: 12 },
        animate: { scale: 1, opacity: 1, y: 0 },
        exit: { scale: 0.92, opacity: 0, y: 12 },
        transition: { duration: 0.25, ease: "easeOut" },
        className: "bg-white rounded-2xl p-8 w-full max-w-sm relative text-center",
        style: { boxShadow: "0 24px 64px rgba(0,48,135,0.18)" },
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              className: "absolute top-4 right-4 text-gris-medio hover:text-gris-texto transition-colors",
              children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center",
              style: { backgroundColor: "#E8F4FC" },
              children: /* @__PURE__ */ jsx(Phone, { className: "w-7 h-7", style: { color: "#009FE3" } })
            }
          ),
          /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-[#003087] mb-2", children: [
            "¡Gracias",
            nombre ? `, ${nombre}` : "",
            "!"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-gris-medio mb-5 leading-relaxed", children: [
            "Hemos recibido tu solicitud. Uno de nuestros asesores especializados se pondrá en contacto contigo ",
            /* @__PURE__ */ jsx("strong", { className: "text-gris-texto", children: "lo antes posible" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "rounded-xl p-4 mb-5 flex items-start gap-3 text-left",
              style: { backgroundColor: "#F0F7FF" },
              children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 flex-shrink-0 mt-0.5", style: { color: "#009FE3" } }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-[#003087] mb-0.5", children: "Horario de atención" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gris-medio", children: "Lunes a viernes: 9:00 – 20:00 h" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gris-medio", children: "Sábado y domingo: cerrado" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gris-medio mb-3", children: "¿Prefieres llamar tú? Estamos en" }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:917105000",
              onClick: () => trackClickToCallContratacion("mi_precio"),
              className: "inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl text-white btn-cta-magenta",
              style: { backgroundColor: "#E4097D" },
              children: [
                /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
                "91 710 50 00"
              ]
            }
          )
        ]
      }
    )
  }
);
const MiPrecio = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [showCallPopup, setShowCallPopup] = useState(false);
  const nombre = searchParams.get("nombre") || "";
  const precioRaw = searchParams.get("precio") || "0";
  const edadesRaw = searchParams.get("edades") || "";
  const provincia = searchParams.get("provincia") || "";
  const descuento = searchParams.get("descuento") || "";
  const precioBaseRaw = searchParams.get("precioBase") || "";
  const precio = parseFloat(precioRaw);
  const precioBase = precioBaseRaw ? parseFloat(precioBaseRaw) : null;
  const hasDiscount = descuento === "10" && precioBase !== null;
  const edades = edadesRaw ? edadesRaw.split(",") : [];
  const producto = productData[slug || ""] || null;
  const [int, dec] = precio.toFixed(2).split(".");
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    meta.content = "noindex, nofollow";
    return () => {
      if (meta) meta.content = "index, follow";
    };
  }, []);
  const _seo = useSeo({
    title: producto ? `Tu cotización ${producto.name}${nombre ? ` · ${nombre}` : ""} | Adeslas` : "Tu cotización Adeslas",
    description: `Cotización personalizada para ${producto?.name || "Adeslas"}. Precio calculado para ${provincia}.`,
    canonical: ""
  });
  if (!producto) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex items-center justify-center", children: [
      _seo,
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gris-medio mb-4", children: "Producto no encontrado" }),
        /* @__PURE__ */ jsx(Link, { to: "/", className: "text-azul-medio hover:underline", children: "← Volver al inicio" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#F8FAFC]", children: [
    _seo,
    /* @__PURE__ */ jsx(AnimatePresence, { children: showCallPopup && /* @__PURE__ */ jsx(CallConfirmPopup, { nombre, onClose: () => setShowCallPopup(false) }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white border-b border-[#E2E8F0]", style: { height: 64 }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 h-full flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("img", { src: imgSrc(logoAzul), alt: "Adeslas Seguros Médicos", className: "h-10 object-contain", width: "105", height: "44" }) }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/",
          className: "flex items-center gap-1.5 text-sm text-gris-medio hover:text-azul-medio transition-colors",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Volver al inicio"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto px-4 py-10", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-1 space-y-5", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]",
            children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-medio mb-1", children: "Tu cotización personalizada" }),
              nombre && /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-black text-[#003087] mb-1", children: [
                "Hola, ",
                nombre,
                " 👋"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gris-medio", children: [
                "Hemos calculado tu precio para",
                " ",
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-gris-texto", children: producto.name }),
                provincia && /* @__PURE__ */ jsxs(Fragment, { children: [
                  " en ",
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: provincia })
                ] }),
                edades.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                  " (",
                  edades.join(", "),
                  " ",
                  edades.length === 1 && edades[0] === "1" ? "año" : "años",
                  ")"
                ] }),
                "."
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.1 },
            className: "rounded-2xl p-7 text-white",
            style: { background: "linear-gradient(145deg, #003087 0%, #009FE3 100%)" },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3 flex-wrap", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide",
                    style: { backgroundColor: producto.badgeColor },
                    children: producto.badge
                  }
                ),
                hasDiscount && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide",
                    style: { backgroundColor: "#16A34A", color: "#fff" },
                    children: "🎉 -10% familiar"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold mb-1", style: { color: "rgba(255,255,255,0.75)" }, children: producto.name }),
              hasDiscount && precioBase && /* @__PURE__ */ jsxs("p", { className: "text-sm line-through mb-0.5", style: { color: "rgba(255,255,255,0.4)" }, children: [
                precioBase.toFixed(2).replace(".", ","),
                "€/mes"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1 mb-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-5xl font-black", children: int }),
                /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold", children: [
                  ",",
                  dec,
                  "€"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-sm ml-1", style: { color: "rgba(255,255,255,0.6)" }, children: "/mes" })
              ] }),
              hasDiscount && precioBase && /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold mb-1", style: { color: "#86EFAC" }, children: [
                "Ahorro: ",
                (precioBase - precio).toFixed(2).replace(".", ","),
                "€/mes con descuento familiar"
              ] }),
              edades.length > 1 && /* @__PURE__ */ jsxs("p", { className: "text-xs mt-1", style: { color: "rgba(255,255,255,0.55)" }, children: [
                "Total para ",
                edades.length,
                " asegurados"
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "mt-4 pt-4 text-xs",
                  style: { borderTop: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.55)" },
                  children: hasDiscount ? "Precio con descuento familiar (4+ asegurados) · Sin compromiso" : "Precio neto mensual · Sin compromiso"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.2 },
            className: "space-y-3",
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setShowCallPopup(true),
                  className: "w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 btn-cta-magenta active:scale-[0.98]",
                  style: { backgroundColor: "#E4097D" },
                  children: [
                    /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
                    "Quiero que me llamen"
                  ]
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-center text-[11px] text-gris-medio", children: "Atención personalizada · Sin compromiso" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.4, delay: 0.35 },
            className: "bg-white rounded-2xl p-5 border border-[#E2E8F0] space-y-3",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 text-sm text-gris-texto", children: [
                /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4 flex-shrink-0 text-[#003087]" }),
                /* @__PURE__ */ jsx("span", { children: "Más de 30 años de experiencia" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 text-sm text-gris-texto", children: [
                /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 flex-shrink-0 text-[#003087]" }),
                /* @__PURE__ */ jsx("span", { children: "+51.000 médicos en toda España" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 text-sm text-gris-texto", children: [
                /* @__PURE__ */ jsx(Award, { className: "w-4 h-4 flex-shrink-0 text-[#003087]" }),
                /* @__PURE__ */ jsx("span", { children: "Sin periodo de espera para urgencias" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.15 },
          className: "lg:col-span-2 space-y-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-7 shadow-sm border border-[#E2E8F0]", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-[#003087] mb-1", children: producto.name }),
              /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-sm mb-4", children: producto.tagline }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "rounded-xl p-4 text-sm font-semibold",
                  style: { backgroundColor: "#EEF4FF", color: "#003087" },
                  children: [
                    "✦ ",
                    producto.highlight
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-7 shadow-sm border border-[#E2E8F0]", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-[13px] font-black text-[#003087] mb-5 uppercase tracking-wide", children: "¿Qué incluye tu seguro?" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: producto.features.map((feature, i) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: -8 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.2 + i * 0.06 },
                  className: "flex items-start gap-3",
                  children: [
                    /* @__PURE__ */ jsx(
                      CheckCircle2,
                      {
                        className: "w-5 h-5 flex-shrink-0 mt-0.5",
                        style: { color: "#009FE3" }
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "text-sm text-gris-texto", children: feature })
                  ]
                },
                i
              )) }),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "mt-6 pt-5 flex items-start gap-3",
                  style: { borderTop: "1px solid #E2E8F0" },
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xl", children: "💡" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-medio", children: producto.ideal })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "rounded-2xl p-6 flex items-center justify-between gap-4",
                style: { backgroundColor: "#EEF4FF" },
                children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "font-bold text-[#003087] text-sm mb-1", children: "¿Quieres ver otras opciones?" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gris-medio", children: "Compara todos los seguros Adeslas con tu precio calculado" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: "/",
                      className: "flex-shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm text-white btn-cta-dark",
                      style: { backgroundColor: "#003087" },
                      children: "Ver comparativa"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setShowCallPopup(true),
                className: "w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 btn-cta-magenta",
                style: { backgroundColor: "#E4097D" },
                children: [
                  /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
                  "Quiero que me llamen"
                ]
              }
            ) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-[#E2E8F0] bg-white mt-10 py-5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gris-medio", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Marchal Mediadores S.L. · Agente Exclusivo Adeslas"
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/politica-de-privacidad", className: "hover:underline", children: "Aviso Legal y Privacidad" })
    ] }) })
  ] });
};

export { MiPrecio as default };
