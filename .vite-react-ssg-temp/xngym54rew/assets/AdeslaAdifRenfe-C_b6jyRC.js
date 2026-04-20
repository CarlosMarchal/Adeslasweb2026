import { jsxs, jsx } from 'react/jsx-runtime';
import { P as ProductPageTemplate } from './ProductPageTemplate-B1qRvlHR.js';
import { Phone } from 'lucide-react';
import { h as heroImg } from './seguro-medico-adeslas-empresas-eMvpHKeC.js';
import 'react';
import 'framer-motion';
import '../main.mjs';
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
import './seguro-salud-adeslas-individual-Za9HuXEo.js';

const WhatsAppIcon = () => /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) });
const ContactCtaCardWhatsApp = ({
  waNumber,
  waMessage,
  phoneDisplay,
  phoneLabel
}) => {
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
  return /* @__PURE__ */ jsxs("div", { className: "p-5 flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
          style: { backgroundColor: "#E7F9EE" },
          children: /* @__PURE__ */ jsx(WhatsAppIcon, {})
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-gris-texto text-base font-bold leading-tight", children: "¿Quieres más información?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-xs mt-0.5", children: "Te asesoramos gratis y sin compromiso" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1.5", children: [
      "Asesor especializado en colectivos Renfe/ADIF",
      "Respuesta inmediata por WhatsApp",
      "Contratación fácil y sin papeleo"
    ].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-gris-texto", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0",
          style: { backgroundColor: "#E7F9EE" },
          children: /* @__PURE__ */ jsx("svg", { width: "10", height: "10", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M2.5 6L5 8.5L9.5 4",
              stroke: "#25D366",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) })
        }
      ),
      item
    ] }, item)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: waHref,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white cursor-pointer",
          style: { backgroundColor: "#25D366" },
          children: [
            /* @__PURE__ */ jsx(WhatsAppIcon, {}),
            "Escríbenos por WhatsApp"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: `tel:${phoneDisplay}`,
          className: "w-full py-3 rounded-xl font-bold text-sm text-center border-2 btn-cta-light",
          style: { borderColor: "#009FE3", color: "#009FE3", backgroundColor: "transparent" },
          children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 inline mr-1.5 mb-0.5" }),
            phoneLabel
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] text-gris-medio", children: "Sin compromiso · Datos protegidos · L–V 9:00–20:00" })
  ] });
};

const WA_NUMBER = "34615568486";
const WA_MESSAGE = "Hola, estoy interesado en el seguro de Adeslas para el colectivo de empleados y familiares de Adif-Renfe.";
const data = {
  seoTitle: "Adeslas ADIF Renfe | Seguro Médico para Empleados · Precios 2026",
  seoDescription: "Seguro médico Adeslas para empleados y familiares de Renfe y ADIF. Cobertura completa, videoconsultas, rehabilitación sin límite y asistencia en el extranjero. Desde 49,59€/mes. Llama al 615 56 84 86.",
  seoCanonical: "https://adeslas.numero1salud.es/adeslas-adif-renfe/",
  seoOgImage: "https://adeslas.numero1salud.es/og-adif-renfe.jpg",
  seoProductSchema: {
    name: "Adeslas Renfe y ADIF",
    description: "Seguro médico para empleados y familiares de Renfe y ADIF con cobertura completa y precios de colectivo exclusivos.",
    category: "Seguro de Salud",
    price: "49",
    pricePeriod: "month"
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    { name: "Seguros de Salud", url: "https://adeslas.numero1salud.es/" },
    {
      name: "Adeslas ADIF Renfe",
      url: "https://adeslas.numero1salud.es/adeslas-adif-renfe/"
    }
  ],
  productSlug: "/adeslas-adif-renfe/",
  badge: "Empleados Renfe y ADIF · Precios exclusivos 2026",
  heroTitle: "Seguro Médico Adeslas para Renfe y ADIF",
  heroImage: heroImg,
  heroHighlight: "Cobertura Completa · Precios exclusivos para empleados",
  heroSubtitle: "Seguro médico Adeslas con cobertura completa para empleados y familiares de Renfe y ADIF. Accede a más de 42.000 especialistas en toda España con precios exclusivos de colectivo.",
  price: "desde 49",
  pricePeriod: "/mes",
  customTarificador: /* @__PURE__ */ jsx(
    ContactCtaCardWhatsApp,
    {
      waNumber: WA_NUMBER,
      waMessage: WA_MESSAGE,
      phoneDisplay: "615568486",
      phoneLabel: "615 56 84 86"
    }
  ),
  useWhatsAppCta: true,
  whatsAppPhone: WA_NUMBER,
  whatsAppMessage: WA_MESSAGE,
  hubspotSource: 322,
  hideHeroBadges: true,
  cardName: "Adeslas Renfe y ADIF",
  cardDescription: "Seguro médico con cobertura completa para empleados y familiares de Renfe y ADIF a precios de colectivo exclusivos.",
  cardPill: "Empleados Renfe/ADIF · Colectivo",
  cardPillDark: false,
  cardCoverages: [
    "Medicina general y pruebas y análisis clínicos",
    "Videoconsultas y telemedicina incluidas",
    "TAC, Resonancia magnética y ecografía",
    "Urgencias 24h — +42.000 especialistas",
    "Especialidades médicas: pediatría, traumatología, ginecología, dermatología",
    "Seguimiento del embarazo y preparación al parto",
    "Rehabilitación y fisioterapia sin límite de sesiones",
    "Asistencia en el extranjero hasta 12.000€/año"
  ],
  features: [
    {
      title: "Cobertura completa",
      description: "Medicina general, especialidades y diagnóstico de alta tecnología",
      icon: /* @__PURE__ */ jsx("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M12 2L15.09 8.26h6.79l-5.5 4.15 2.1 6.36L12 14.71l-5.38 4.06 2.1-6.36-5.5-4.15h6.79z",
          stroke: "#1c4a8d",
          strokeWidth: "1.5",
          strokeLinejoin: "round"
        }
      ) })
    },
    {
      title: "Videoconsultas",
      description: "Telemedicina y Doctor Virtual disponible 24 horas",
      icon: /* @__PURE__ */ jsxs("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", children: [
        /* @__PURE__ */ jsx(
          "rect",
          {
            x: "2",
            y: "3",
            width: "20",
            height: "14",
            rx: "1",
            stroke: "#1c4a8d",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M2 17h20M8 21h8",
            stroke: "#1c4a8d",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        )
      ] })
    },
    {
      title: "+42.000 médicos",
      description: "Red completa de especialistas Adeslas en toda España",
      icon: /* @__PURE__ */ jsxs("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", children: [
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "9", r: "4", stroke: "#1c4a8d", strokeWidth: "1.5" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8",
            stroke: "#1c4a8d",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        )
      ] })
    },
    {
      title: "Rehabilitación sin límite",
      description: "Fisioterapia y rehabilitación sin límite de sesiones",
      icon: /* @__PURE__ */ jsxs("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M9 11l3 3L22 4",
            stroke: "#1c4a8d",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M20 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
            stroke: "#1c4a8d",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        )
      ] })
    }
  ],
  tabs: [
    {
      label: "Coberturas",
      items: [
        "Medicina general y análisis clínicos",
        "Videoconsultas y telemedicina",
        "TAC, Resonancia magnética y ecografía",
        "Urgencias 24h presenciales y domiciliarias",
        "Pediatría, traumatología, ginecología y dermatología",
        "Seguimiento del embarazo y preparación al parto",
        "Rehabilitación y fisioterapia sin límite de sesiones",
        "Asistencia en el extranjero hasta 12.000€/año",
        "+42.000 especialistas en toda España"
      ]
    },
    {
      label: "Precios 2026",
      items: [
        "De 0 a 19 años: 49,59€/mes",
        "De 20 a 54 años: 53,75€/mes",
        "De 55 a 64 años: 69,42€/mes",
        "Precios exclusivos de colectivo para empleados y familiares",
        "Extensible a la unidad familiar con precio especial"
      ]
    },
    {
      label: "Condiciones",
      items: [
        "Exclusivo para empleados y familiares de Renfe y ADIF",
        "Cuestionario de salud obligatorio",
        "La antigüedad se mantiene si el cambio se realiza el mismo día",
        "Para información y contratación: 615 56 84 86"
      ]
    }
  ],
  faqs: [
    {
      q: "¿Quién puede contratar el seguro Adeslas Renfe y ADIF?",
      a: "Está disponible para empleados en activo y familiares directos de Renfe y ADIF. Puedes extender la cobertura a tu unidad familiar."
    },
    {
      q: "¿Cuáles son los precios para 2026?",
      a: "De 0 a 19 años: 49,59€/mes; de 20 a 54 años: 53,75€/mes; de 55 a 64 años: 69,42€/mes. Precios exclusivos de colectivo."
    },
    {
      q: "¿Incluye rehabilitación sin límite?",
      a: "Sí. Rehabilitación y fisioterapia sin límite de sesiones incluidas en la cobertura."
    },
    {
      q: "¿Me mantienen la antigüedad de mi seguro actual?",
      a: "Sí, siempre que la baja en tu seguro actual y el alta en Adeslas se realicen el mismo día y aportes el recibo y condicionado de tu póliza vigente."
    },
    {
      q: "¿Cómo puedo contratar?",
      a: "Llama al 615 56 84 86 o solicita que te llamemos. Un asesor especializado gestionará tu alta con precios de colectivo."
    }
  ],
  schemaFaq: true,
  showPromo: false
};
const AdeslaAdifRenfe = () => /* @__PURE__ */ jsx(ProductPageTemplate, { data });

export { AdeslaAdifRenfe as default };
