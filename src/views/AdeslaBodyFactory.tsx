import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import ContactCtaCard from "@/components/ContactCtaCard";
import heroImg from "@/assets/seguro-medico-adeslas-plena-total.webp";

const data: ProductPageData = {
  seoTitle: "Adeslas Body Factory | Seguro Médico para Socios · Cobertura Completa",
  seoDescription:
    "Seguro médico Adeslas exclusivo para socios y familiares de Body Factory. Cobertura completa sin copagos, dental incluido, videoconsultas 24h y seguimiento del embarazo. Llama al 91 710 50 00.",
  seoCanonical:
    "https://adeslas.numero1salud.es/adeslas-body-factory/",
  seoOgImage: "https://adeslas.numero1salud.es/og-body-factory.jpg",
  seoProductSchema: {
    name: "Adeslas Body Factory",
    description:
      "Seguro médico exclusivo para socios y familiares de Body Factory con cobertura completa, dental incluido y sin copagos.",
    category: "Seguro de Salud",
    price: "68",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    { name: "Seguros de Salud", url: "https://adeslas.numero1salud.es/" },
    {
      name: "Adeslas Body Factory",
      url: "https://adeslas.numero1salud.es/adeslas-body-factory/",
    },
  ],
  productSlug: "/adeslas-body-factory/",
  badge: "Exclusivo socios Body Factory · Cobertura completa",
  heroTitle: "Seguro Médico Adeslas para Socios Body Factory",
  heroImage: heroImg,
  heroHighlight: "Cobertura Completa · Dental incluido · Sin Copagos",
  heroSubtitle:
    "Seguro médico con cobertura completa para socios y familiares de Body Factory. Accede a todo el cuadro médico Adeslas sin copagos y al mejor precio exclusivo.",
  price: "68",
  pricePeriod: "/mes",
  customTarificador: <ContactCtaCard />,
  usePhoneCallCta: true,
  hubspotSource: 321,
  hideHeroBadges: true,
  cardName: "Adeslas Body Factory",
  cardDescription:
    "Seguro médico exclusivo para socios y familiares de Body Factory con cobertura completa y dental incluido.",
  cardPill: "Exclusivo socios · Sin copagos",
  cardPillDark: false,
  cardCoverages: [
    "Asistencia sanitaria completa y dental sin copagos",
    "Videoconsultas y chequeo médico completo incluido",
    "Urgencias 24h — +42.000 especialistas",
    "Seguimiento del embarazo y preparación al parto",
    "Rehabilitación: 20 sesiones/año + reembolso fuera de cuadro",
    "Asistencia en el extranjero hasta 12.000€/año",
    "Precios exclusivos para socios Body Factory",
  ],
  features: [
    {
      title: "Cobertura completa",
      description: "Asistencia sanitaria completa y dental incluido",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L15.09 8.26h6.79l-5.5 4.15 2.1 6.36L12 14.71l-5.38 4.06 2.1-6.36-5.5-4.15h6.79z"
            stroke="#1c4a8d"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Videoconsultas 24h",
      description: "Chequeo médico completo y videoconsulta incluidos",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect
            x="2"
            y="3"
            width="20"
            height="14"
            rx="1"
            stroke="#1c4a8d"
            strokeWidth="1.5"
          />
          <path
            d="M2 17h20M8 21h8"
            stroke="#1c4a8d"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "+42.000 médicos",
      description: "Acceso a toda la red de especialistas Adeslas",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="9" r="4" stroke="#1c4a8d" strokeWidth="1.5" />
          <path
            d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8"
            stroke="#1c4a8d"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Asistencia viaje",
      description: "Cobertura en el extranjero hasta 12.000€/año",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5h2c0-1.66 1.34-3 3-3s3 1.34 3 3c0 3-4.5 4-4.5 4v2h3v-1.5c2.5-1 4.5-2.5 4.5-5.5 0-2.76-2.24-5-5-5z"
            fill="#1c4a8d"
          />
        </svg>
      ),
    },
  ],
  tabs: [
    {
      label: "Coberturas",
      items: [
        "Asistencia sanitaria completa y dental sin copagos",
        "Videoconsultas y Doctor Virtual 24h",
        "Chequeo médico completo",
        "Urgencias 24h presenciales y domiciliarias",
        "Seguimiento del embarazo y preparación al parto",
        "Rehabilitación: 20 sesiones/año + reembolso fuera de cuadro",
        "Asistencia en el extranjero hasta 12.000€/año",
        "+42.000 médicos y especialistas en toda España",
      ],
    },
    {
      label: "Precios",
      items: [
        "De 0 a 44 años: 68,26€/mes",
        "De 44 a 54 años: 90,53€/mes",
        "De 55 a 64 años: 147,40€/mes",
        "Precios exclusivos para socios y familiares de Body Factory",
        "Descuento especial al contratar junto a más asegurados",
      ],
    },
    {
      label: "Condiciones",
      items: [
        "Exclusivo para socios y familiares de Body Factory",
        "Cuestionario de salud obligatorio",
        "Límite de edad: consultar condiciones",
        "Para información y contratación: 91 710 50 00",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Quién puede contratar el seguro Adeslas Body Factory?",
      a: "El seguro está diseñado exclusivamente para socios y familiares de Body Factory. Puedes extender la cobertura a tu unidad familiar a precios especiales.",
    },
    {
      q: "¿Qué precio tiene el seguro para socios Body Factory?",
      a: "Los precios exclusivos para socios son: de 0 a 44 años: 68,26€/mes; de 44 a 54 años: 90,53€/mes; de 55 a 64 años: 147,40€/mes. Llama al 91 710 50 00 para obtener tu precio exacto.",
    },
    {
      q: "¿Incluye cobertura dental?",
      a: "Sí. El seguro Adeslas Body Factory incluye asistencia sanitaria completa con dental, sin copagos adicionales.",
    },
    {
      q: "¿Cómo puedo contratarlo?",
      a: "Llama al 91 710 50 00 o solicita que te llamemos gratis. Un asesor especializado te atenderá y gestionará tu alta.",
    },
    {
      q: "¿Me mantienen la antigüedad si vengo de otra aseguradora?",
      a: "Sí, siempre que la baja en tu seguro actual y el alta en Adeslas se realicen el mismo día y aportes el recibo y condicionado de tu póliza vigente.",
    },
  ],
  schemaFaq: true,
  showPromo: false,
};

const AdeslaBodyFactory = () => <ProductPageTemplate data={data} />;

export default AdeslaBodyFactory;
