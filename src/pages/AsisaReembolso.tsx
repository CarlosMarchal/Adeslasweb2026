import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/seguro-medico-asisa-reembolso-100000-e1765796532629.webp";

const data: ProductPageData = {
  seoTitle: "Seguro Adeslas Extra 150 | Libre Elección Médica, Reembolso hasta 80%",
  seoDescription:
    "Adeslas Extra 150: seguro médico con libertad total de médico y centro. Reembolso hasta 80% de gastos dentro y fuera del cuadro, sin copagos. Cobertura mundial. Desde 59,71€/mes.",
  seoCanonical:
    "https://adeslas.marchalaseguradores.es/asisa-reembolso",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-reembolso.jpg",
  seoProductSchema: {
    name: "Adeslas Extra 150 100.000",
    description: "Seguro médico con libre elección de médico y reembolso hasta el 80% del gasto. Ámbito internacional y cobertura completa.",
    category: "Seguro de Salud",
    price: "90",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Seguros de Salud", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Adeslas Extra 150", url: "https://adeslas.marchalaseguradores.es/asisa-reembolso" },
  ],
  productSlug: "/asisa-reembolso",
  badge: "Máxima libertad médica",
  heroTitle: "Seguro Médico Adeslas Extra 150",
  heroImage: heroImg,
  heroHighlight: "Libre Elección de Médico · Reembolso hasta 80%",
  heroSubtitle:
    "Cobertura médica completa sin copagos con la libertad de acudir al médico que prefieras. Reembolso de hasta el 80% de los gastos.",
  price: "90",
  cardName: "Adeslas Extra 150 100.000",
  cardDescription:
    "Cobertura completa con reembolso de gastos y máxima libertad médica.",
  cardPill: "Sin copagos · Reembolso",
  cardPillDark: true,
  cardCoverages: [
    "Sin copagos con reembolso hasta 80%",
    "Libre elección dentro y fuera del cuadro",
    "Hospitalización completa",
    "Todas las especialidades médicas",
    "Cirugía, prótesis e implantes",
    "Trasplantes cubiertos",
    "Cobertura internacional",
    "Doctor Virtual y App Adeslas",
    "Suma asegurada: 100.000€/año",
  ],
  features: [
    {
      title: "Libre elección total",
      description: "Médicos y centros dentro y fuera del cuadro",
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
      title: "Sin copagos",
      description: "Prima fija sin pagos adicionales por uso",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12l2 2 4-4m7 4a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="#1c4a8d"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Reembolso hasta 80%",
      description: "Recupera hasta el 80% de tus gastos médicos",
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
      title: "Hospitalización completa",
      description: "Médica, quirúrgica, psiquiátrica y más",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="1"
            stroke="#1c4a8d"
            strokeWidth="1.5"
          />
          <path
            d="M9 12h6M12 9v6"
            stroke="#1c4a8d"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Cobertura internacional",
      description: "Asistencia viaje y reembolso en el extranjero",
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
      description: "Doctor Virtual, app y orientación 24h",
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
        "Medicina general, pediatría y enfermería",
        "Todas las especialidades médicas",
        "Hospitalización completa: médica, quirúrgica, psiquiátrica",
        "Cirugía ambulatoria y hospital de día",
        "Prótesis, implantes y trasplantes",
        "Podología: 12 sesiones/año",
        "Psicoterapia: 20-40 sesiones",
        "Planificación familiar",
        "Medicina preventiva",
        "Estomatología y odontología básica",
      ],
    },
    {
      label: "Más Adeslas",
      items: [
        "Reembolso hasta 80% de gastos",
        "Suma asegurada: 100.000€/año por asegurado",
        "Doctor Virtual 24h",
        "App Adeslas con gestión integral",
        "Orientación médica permanente",
        "Cobertura internacional: 20.000€/viaje",
        "Traslado sanitario y repatriación",
      ],
    },
    {
      label: "Condiciones",
      items: [
        "Sin copagos con sistema de reembolso",
        "Suma asegurada: 100.000€/año por asegurado",
        "Cobertura mundial",
        "Edad máxima: 70 años",
        "Tres modalidades de límite anual",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Qué cubre Adeslas Extra 150?",
      a: "Adeslas Extra 150 cubre asistencia médica completa sin copagos: medicina general, todas las especialidades, urgencias 24h, hospitalización ilimitada, cirugía ambulatoria y hospitalaria, prótesis, implantes, trasplantes, pruebas diagnósticas, psicoterapia, podología y planificación familiar. Además, permite acudir a médicos fuera del cuadro con reembolso de hasta el 80% del gasto.",
    },
    {
      q: "¿Cómo funciona el reembolso de gastos en Adeslas Extra 150?",
      a: "Cuando acudes a un médico o centro fuera del cuadro médico de Adeslas, pagas la consulta y luego presentas la factura. Adeslas te reembolsa hasta el 80% del importe, con un límite anual de 100.000€ por asegurado.",
    },
    {
      q: "¿Qué modalidades de Adeslas Extra 150 existen?",
      a: "La modalidad estándar es Adeslas Extra 150 100.000€, con reembolso de hasta el 80% de los gastos médicos fuera del cuadro, con un límite anual de 100.000€ por asegurado. Consulta con tu asesor si necesitas una cobertura superior.",
    },
    {
      q: "¿Puedo ir a cualquier médico o solo al cuadro médico?",
      a: "Tienes total libertad. Puedes acudir a los 40.000+ médicos y especialistas del cuadro médico Adeslas sin trámites ni facturas, o elegir cualquier médico fuera del cuadro en España o el extranjero y solicitar el reembolso posterior.",
    },
    {
      q: "¿Tiene copagos Adeslas Extra 150?",
      a: "No. Con Adeslas Extra 150 pagas únicamente la prima mensual fija. Dentro del cuadro médico el acceso es directo sin coste adicional. Fuera del cuadro pagas y Adeslas te reembolsa el porcentaje acordado.",
    },
    {
      q: "¿Incluye hospitalización y cirugía Adeslas Extra 150?",
      a: "Sí. Hospitalización completa (médica, quirúrgica, pediátrica y psiquiátrica), cirugía ambulatoria y hospitalaria, prótesis e implantes y trasplantes de médula ósea y córnea. Tanto dentro como fuera del cuadro médico.",
    },
    {
      q: "¿Se puede usar el reembolso en hospitales públicos?",
      a: "El reembolso de Adeslas Extra 150 aplica principalmente a gastos en centros privados fuera del cuadro médico de Adeslas. La atención en la sanidad pública en España es gratuita y no genera gastos reembolsables.",
    },
    {
      q: "¿Cuánto tiempo tarda el reembolso de gastos médicos?",
      a: "Adeslas gestiona las solicitudes de reembolso en un plazo estándar de 15-30 días hábiles desde la recepción de la documentación completa (facturas originales, diagnóstico e informe médico).",
    },
    {
      q: "¿Cubre asistencia médica internacional?",
      a: "Sí. Adeslas Extra 150 incluye cobertura médica mundial. Además de la asistencia en viaje hasta 20.000€ incluida en todos los productos, el reembolso se aplica también a gastos médicos en el extranjero según los términos del contrato.",
    },
    {
      q: "¿Tiene carencias Adeslas Extra 150?",
      a: "Sí. Las carencias estándar son: 8 meses para hospitalización y parto, 6 meses para cirugía ambulatoria, técnicas diagnósticas especiales, psicoterapia y planificación familiar. La medicina general y urgencias no tienen carencias. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información).",
    },
    {
      q: "¿Incluye cobertura dental Adeslas Extra 150?",
      a: (<>Adeslas Extra 150 incluye odontología básica preventiva (revisiones, diagnósticos). Para tratamientos dentales completos se puede añadir el <Link to="/asisa-dental" style={{color: "#009FE3", textDecoration: "underline"}}>seguro Adeslas Dental</Link> como garantía opcional.</>)
    },
    {
      q: "¿Tiene servicios digitales Adeslas Extra 150?",
      a: "Sí. Doctor Virtual 24h, App Adeslas, videoconsultas, orientación médica telefónica 24h y gestión de citas online.",
    },
    {
      q: "¿Hasta qué edad puedo contratar Adeslas Extra 150?",
      a: "La edad máxima de contratación es 70 años, sin límite de permanencia posterior. El asegurado debe residir en España al menos 9 meses al año.",
    },
  ],
  schemaFaq: true,
  showPromo: true,
};

const AsisaReembolso = () => <ProductPageTemplate data={data} />;
export default AsisaReembolso;
