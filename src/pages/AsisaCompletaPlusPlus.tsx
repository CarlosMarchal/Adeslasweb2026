import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/seguro-medico-asisa-completa-plus-plus-e1765796355480.webp";

const data: ProductPageData = {
  seoTitle: "Seguro Adeslas Plena Total++ | Cobertura Total, Copago Máx. 300€/año",
  seoDescription:
    "Adeslas Plena Total++: cobertura médica completa con hospitalización y copago limitado a 300€/año por asegurado. Urgencias, cirugía y 40.000+ especialistas. Desde 22,55€/mes.",
  seoCanonical:
    "https://adeslas.marchalaseguradores.es/asisa-completa-plus-plus",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-completa-plusplus.jpg",
  seoProductSchema: {
    name: "Adeslas Plena Total++",
    description: "Seguro médico con cobertura total y copago anual máximo de 300€. Hospitalización, especialistas y urgencias 24h incluidas.",
    category: "Seguro de Salud",
    price: "62",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Seguros de Salud", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Adeslas Plena Total++", url: "https://adeslas.marchalaseguradores.es/asisa-completa-plus-plus" },
  ],
  productSlug: "/asisa-completa-plus-plus",
  badge: "Copago limitado 300€/año",
  heroTitle: "Seguro Médico Adeslas Plena Total++",
  heroImage: heroImg,
  heroHighlight: "Cobertura Total · Copago Máx. 300€/año",
  heroSubtitle:
    "Cobertura médica integral con copagos medios y un límite máximo anual de 300€. Más de 40.000 profesionales y 1.000 centros.",
  price: "62",
  cardName: "Adeslas Plena Plus++",
  cardDescription:
    "Cobertura completa al mejor precio con copago limitado. El producto estrella de Adeslas.",
  cardPill: "Copago máx. 300€/año",
  cardPillDark: false,
  cardCoverages: [
    "Cobertura completa con hospitalización",
    "Copagos medios (máx. 300€/año)",
    "Urgencias 24h domiciliarias y hospitalarias",
    "Todas las especialidades médicas",
    "Cirugía y prótesis incluidas",
    "Trasplantes cubiertos",
    "Asistencia en viaje (20.000€)",
    "Videoconsultas Adeslas LIVE",
    "Libre elección de centros",
  ],
  features: [
    {
      title: "Cobertura completa",
      description: "Medicina general y todas las especialidades",
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
      title: "Copago máx. 300€/año",
      description: "Control de gastos con límite anual garantizado",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 11c0-3.314 2.686-6 6-6h6c3.314 0 6 2.686 6 6v2c0 3.314-2.686 6-6 6h-6c-3.314 0-6-2.686-6-6v-2z"
            stroke="#1c4a8d"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="2" stroke="#1c4a8d" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      title: "Urgencias 24h",
      description: "Domiciliarias, ambulatorias y hospitalarias",
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
    {
      title: "40.000+ especialistas",
      description: "Médicos y 1.000+ centros en España",
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
      title: "Asistencia internacional",
      description: "Cobertura viajes hasta 20.000€",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
            stroke="#1c4a8d"
            strokeWidth="1.5"
          />
          <path
            d="M2 12h20M12 2c-2.21 5.5-2.21 15 0 20"
            stroke="#1c4a8d"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Servicios digitales",
      description: "Videoconsultas, chat y app Adeslas LIVE",
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
  ],
  tabs: [
    {
      label: "Coberturas",
      items: [
        "Urgencias 24h: domiciliarias y ambulatorias",
        "Medicina general y todas las especialidades",
        "Hospitalización: médica, quirúrgica, pediátrica, psiquiátrica",
        "Cirugía ambulatoria e intervenciones",
        "Pruebas diagnósticas y técnicas especiales",
        "Pediatría libre elección hasta 14 años",
        "Enfermería domiciliaria",
        "Podología: 12 sesiones/año",
        "Prótesis e implantes",
        "Trasplantes: médula ósea y córnea",
      ],
    },
    {
      label: "Más Adeslas",
      items: [
        "Asistencia viajes: 20.000€",
        "Segunda opinión médica",
        "Orientación médica 24h",
        "App Adeslas con citas y consultas",
        "Adeslas LIVE: videoconsultas",
        "Programas de bienestar",
      ],
    },
    {
      label: "Condiciones",
      items: [
        "Copagos medios con máximo 300€/año",
        "Edad máxima: 70 años",
        "Renovación anual",
        "Carencias: hospitalización y parto (8 meses), cirugía ambulatoria (6 meses)",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Qué cubre Adeslas Plena Total++?",
      a: "Adeslas Plena Total++ cubre asistencia médica completa: medicina general, todas las especialidades, urgencias 24h, hospitalización ilimitada (médica, quirúrgica, pediátrica, psiquiátrica y hospital de día), cirugía ambulatoria, prótesis, implantes, trasplantes, pruebas diagnósticas, rehabilitación, podología y psicoterapia. Con copagos medios y límite máximo anual de 300€.",
    },
    {
      q: "¿Qué significa que Adeslas Plena Total++ tiene un límite máximo de copagos de 300€/año?",
      a: "Significa que durante cada año de póliza, el total de copagos que pagas nunca superará los 300€ por asegurado, independientemente de cuántas veces uses el seguro. Una vez alcanzado ese límite, el resto de servicios son gratuitos hasta la renovación anual.",
    },
    {
      q: "¿Cuál es el importe de los copagos en Adeslas Plena Total++?",
      a: "Los copagos de Adeslas Plena Total++ son moderados: médico general 7€, especialista 10€, urgencias y hospitalización 14€, resonancia/TAC 40€, rehabilitación 3,50€/sesión, psicoterapia 13€/sesión. Con el límite garantizado de 300€/año.",
    },
    {
      q: "¿Cuál es la diferencia entre Adeslas Plena Total+, Completa++ y Completa sin copago?",
      a: (<>Las tres tienen la misma cobertura médica. <Link to="/asisa-completa" style={{color: "#009FE3", textDecoration: "underline"}}>Adeslas Plena Total</Link> (sin copago): prima más alta, cero pagos por uso. <Link to="/asisa-completa-plus" style={{color: "#009FE3", textDecoration: "underline"}}>Adeslas Plena Total+</Link> (copago reducido): prima media, copagos reducidos sin límite. Adeslas Plena Total++ (copago medio con límite): prima más baja, copagos medios con tope garantizado de 300€/año. Adeslas Plena Total++ es ideal si usas el seguro poco o de forma irregular.</>)
    },
    {
      q: "¿Incluye hospitalización Adeslas Plena Total++?",
      a: "Sí. Hospitalización ilimitada: médica, quirúrgica, pediátrica, psiquiátrica y hospital de día. Habitación individual con cama para acompañante. Copago por hospitalización: 14€.",
    },
    {
      q: "¿Cubre el parto y el embarazo Adeslas Plena Total++?",
      a: "Sí. Cubre preparación al parto, seguimiento del embarazo, el parto y los cuidados postparto. La carencia para parto es de 8 meses desde la fecha de efecto de la póliza. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información).",
    },
    {
      q: "¿Incluye asistencia psiquiátrica Adeslas Plena Total++?",
      a: "Sí. Adeslas Plena Total++ cubre hospitalización psiquiátrica con carencia de 8 meses, así como psicoterapia ambulatoria (20-40 sesiones anuales) con carencia de 6 meses. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información).",
    },
    {
      q: "¿Cubre trasplantes y prótesis?",
      a: "Sí. Adeslas Plena Total++ cubre trasplantes de médula ósea y córnea, así como prótesis e implantes necesarios por indicación médica.",
    },
    {
      q: "¿Qué asistencia en viaje incluye Adeslas Plena Total++?",
      a: "Incluye asistencia médica en viaje hasta 20.000€ por asegurado y desplazamiento, tanto en España como en el extranjero. Es uno de los límites más altos de la gama.",
    },
    {
      q: "¿Puedo elegir médico y centro con Adeslas Plena Total++?",
      a: "Sí. Libre elección entre más de 40.000 médicos y especialistas y más de 1.000 centros concertados de Adeslas en toda España.",
    },
    {
      q: "¿Tiene carencias Adeslas Plena Total++?",
      a: "Sí. Carencias estándar: 8 meses para hospitalización y parto, 6 meses para técnicas diagnósticas especiales, cirugía ambulatoria, psicoterapia y planificación familiar. Las urgencias y medicina general no tienen carencias. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información).",
    },
    {
      q: "¿Por qué elegir Adeslas Plena Total++ frente a otros seguros médicos?",
      a: "Adeslas Plena Total++ es ideal para quien quiere cobertura médica completa con hospitalización y cirugía al menor precio mensual posible, con la garantía de que nunca pagará más de 300€ al año en copagos. Es el equilibrio perfecto entre protección total y ahorro en la prima mensual.",
    },
    {
      q: "¿Hasta qué edad puedo contratar Adeslas Plena Total++?",
      a: "Hasta los 70 años, sin límite de permanencia posterior. Puedes mantener el seguro indefinidamente una vez contratado.",
    },
  ],
  schemaFaq: true,
  showPromo: true,
};

const AsisaCompletaPlusPlus = () => <ProductPageTemplate data={data} />;
export default AsisaCompletaPlusPlus;
