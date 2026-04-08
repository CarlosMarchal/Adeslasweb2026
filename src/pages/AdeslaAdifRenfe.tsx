import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import ContactCtaCard from "@/components/ContactCtaCard";
import heroImg from "@/assets/seguro-medico-adeslas-empresas.webp";

const data: ProductPageData = {
  seoTitle:
    "Adeslas ADIF Renfe | Seguro Médico para Empleados · Precios 2026",
  seoDescription:
    "Seguro médico Adeslas para empleados y familiares de Renfe y ADIF. Cobertura completa, videoconsultas, rehabilitación sin límite y asistencia en el extranjero. Desde 49,59€/mes. Llama al 91 710 50 00.",
  seoCanonical:
    "https://adeslas.numero1salud.es/adeslas-adif-renfe/",
  seoOgImage: "https://adeslas.numero1salud.es/og-adif-renfe.jpg",
  seoProductSchema: {
    name: "Adeslas Renfe y ADIF",
    description:
      "Seguro médico para empleados y familiares de Renfe y ADIF con cobertura completa y precios de colectivo exclusivos.",
    category: "Seguro de Salud",
    price: "49",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    { name: "Seguros de Salud", url: "https://adeslas.numero1salud.es/" },
    {
      name: "Adeslas ADIF Renfe",
      url: "https://adeslas.numero1salud.es/adeslas-adif-renfe/",
    },
  ],
  productSlug: "/adeslas-adif-renfe/",
  badge: "Empleados Renfe y ADIF · Precios exclusivos 2026",
  heroTitle: "Seguro Médico Adeslas para Renfe y ADIF",
  heroImage: heroImg,
  heroHighlight: "Cobertura Completa · Precios exclusivos para empleados",
  heroSubtitle:
    "Seguro médico Adeslas con cobertura completa para empleados y familiares de Renfe y ADIF. Accede a más de 42.000 especialistas en toda España con precios exclusivos de colectivo.",
  price: "desde 49",
  pricePeriod: "/mes",
  customTarificador: <ContactCtaCard />,
  usePhoneCallCta: true,
  hubspotSource: 322,
  hideHeroBadges: true,
  cardName: "Adeslas Renfe y ADIF",
  cardDescription:
    "Seguro médico con cobertura completa para empleados y familiares de Renfe y ADIF a precios de colectivo exclusivos.",
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
    "Asistencia en el extranjero hasta 12.000€/año",
  ],
  features: [
    {
      title: "Cobertura completa",
      description:
        "Medicina general, especialidades y diagnóstico de alta tecnología",
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
      title: "Videoconsultas",
      description: "Telemedicina y Doctor Virtual disponible 24 horas",
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
      description: "Red completa de especialistas Adeslas en toda España",
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
      title: "Rehabilitación sin límite",
      description: "Fisioterapia y rehabilitación sin límite de sesiones",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 11l3 3L22 4"
            stroke="#1c4a8d"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
            stroke="#1c4a8d"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
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
        "+42.000 especialistas en toda España",
      ],
    },
    {
      label: "Precios 2026",
      items: [
        "De 0 a 19 años: 49,59€/mes",
        "De 20 a 54 años: 53,75€/mes",
        "De 55 a 64 años: 69,42€/mes",
        "Precios exclusivos de colectivo para empleados y familiares",
        "Extensible a la unidad familiar con precio especial",
      ],
    },
    {
      label: "Condiciones",
      items: [
        "Exclusivo para empleados y familiares de Renfe y ADIF",
        "Cuestionario de salud obligatorio",
        "La antigüedad se mantiene si el cambio se realiza el mismo día",
        "Para información y contratación: 91 710 50 00",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Quién puede contratar el seguro Adeslas Renfe y ADIF?",
      a: "Está disponible para empleados en activo y familiares directos de Renfe y ADIF. Puedes extender la cobertura a tu unidad familiar.",
    },
    {
      q: "¿Cuáles son los precios para 2026?",
      a: "De 0 a 19 años: 49,59€/mes; de 20 a 54 años: 53,75€/mes; de 55 a 64 años: 69,42€/mes. Precios exclusivos de colectivo.",
    },
    {
      q: "¿Incluye rehabilitación sin límite?",
      a: "Sí. Rehabilitación y fisioterapia sin límite de sesiones incluidas en la cobertura.",
    },
    {
      q: "¿Me mantienen la antigüedad de mi seguro actual?",
      a: "Sí, siempre que la baja en tu seguro actual y el alta en Adeslas se realicen el mismo día y aportes el recibo y condicionado de tu póliza vigente.",
    },
    {
      q: "¿Cómo puedo contratar?",
      a: "Llama al 91 710 50 00 o solicita que te llamemos. Un asesor especializado gestionará tu alta con precios de colectivo.",
    },
  ],
  schemaFaq: true,
  showPromo: false,
};

const AdeslaAdifRenfe = () => <ProductPageTemplate data={data} />;

export default AdeslaAdifRenfe;
