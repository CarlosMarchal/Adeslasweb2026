import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/seguro-medico-asisa-ya.webp";

const data: ProductPageData = {
  seoTitle: "Seguro Adeslas Go | El Más Económico desde 13,39€/mes",
  seoDescription: "Adeslas Go: seguro médico ambulatorio con copago limitado a 250€/año. Urgencias 24h, 30+ especialidades y telemedicina incluidos. La opción más asequible de Adeslas. Desde 13,39€/mes.",
  seoCanonical: "https://adeslas.marchalaseguradores.es/asisa-ya",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-ya.jpg",
  seoProductSchema: {
    name: "Adeslas Go",
    description: "Seguro médico ambulatorio con copago limitado a 250€/año. Urgencias 24h, 30+ especialidades y telemedicina desde 13,39€/mes.",
    category: "Seguro de Salud",
    price: "21",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Seguros de Salud", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Adeslas Go", url: "https://adeslas.marchalaseguradores.es/asisa-ya" },
  ],
  productSlug: "/asisa-ya",
  badge: "El más económico",
  heroTitle: "Seguro Médico Adeslas Go",
  heroImage: heroImg,
  heroHighlight: "Ambulatorio · Copago Medio",
  heroSubtitle: "Asistencia médica ambulatoria con copagos medios. Especialistas, urgencias y telemedicina desde el primer día.",
  price: "21",
  pricePeriod: "mes",
  features: [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.8 10.9c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0l-3.72 3.72c-.39.39-.39 1.02 0 1.41l3.72 3.72c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L8.69 12l3.11-3.1zm.02-2.6l3.72-3.72c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 9l3.72 3.72c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0l-3.72-3.72c-.39-.39-.39-1.02 0-1.41z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Precio económico",
      description: "La opción más asequible del mercado"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Copagos medios",
      description: "Costos moderados por cada consulta"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 11H5v2h6v-2zm0-4H5v2h6V7zm0 8H5v2h6v-2zm8-1v-3.5c0-.83-.67-1.5-1.5-1.5.5-.83.5-2.17 0-3 .83 0 1.5-.67 1.5-1.5V4c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h1c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Especialidades médicas",
      description: "Más de 30 especialidades disponibles"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Urgencias 24h",
      description: "Atención de emergencia disponible"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Telemedicina",
      description: "Videoconsultas y atención remota"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Garantías opcionales",
      description: "Ampliable según tus necesidades"
    }
  ],
  cardName: "Adeslas Go",
  cardDescription: "Asistencia médica ambulatoria, especialistas y urgencias sin hospitalización.",
  cardCoverages: [
    "Cobertura ambulatoria",
    "Copagos medios",
    "Urgencias domiciliarias y ambulatorias 24h",
    "Medicina general, pediatría y más de 30 especialidades",
    "Psicoterapia y podología",
    "Asistencia en viaje",
    "Posibilidad de añadir garantías opcionales: dental e indemnización por accidente"
  ],
  cardPill: "Copagos medios · Ambulatorio",
  cardPillDark: false,
  tabs: [
    {
      label: "Coberturas",
      items: [
        "Medicina general y 30+ especialidades",
        "Urgencias domiciliarias y ambulatorias 24h",
        "Pediatría",
        "Enfermería",
        "Podología",
        "Psicoterapia",
        "Pruebas diagnósticas",
        "Análisis clínicos"
      ]
    },
    {
      label: "Más Adeslas",
      items: [
        "Telemedicina y videoconsultas",
        "App Adeslas",
        "Asistencia en viaje",
        "Garantías opcionales: dental e indemnización por accidente"
      ]
    },
    {
      label: "Condiciones",
      items: [
        "Cobertura ambulatoria (sin hospitalización ni cirugías)",
        "Copagos medios",
        "Edad máxima contratación 85 años"
      ]
    }
  ],
  faqs: [
    {
      q: "¿Qué cubre Adeslas Go?",
      a: "Adeslas Go cubre asistencia médica ambulatoria con copagos medios: medicina general, más de 30 especialidades médicas, urgencias domiciliarias y ambulatorias 24h, pediatría, pruebas diagnósticas, análisis clínicos, psicoterapia, podología, planificación familiar y asistencia en viaje. No incluye hospitalización ni cirugías."
    },
    {
      q: "¿Tiene copagos Adeslas Go?",
      a: "Sí, Adeslas Go tiene copagos medios con un límite máximo garantizado de 250€ por asegurado y año. Por ejemplo: médico general 7€, especialista 10€, urgencias 14€, resonancia 40€. Una vez alcanzado el límite de 250€, el resto de servicios son gratuitos ese año."
    },
    {
      q: "¿Cuál es el límite máximo de copagos anuales en Adeslas Go?",
      a: "El límite máximo de copagos en Adeslas Go es de 250€ por asegurado al año. Esto garantiza que nunca pagarás más de esa cantidad en copagos, independientemente del uso que hagas del seguro durante ese año."
    },
    {
      q: "¿Qué diferencia hay entre Adeslas Go y Adeslas Plena Vital?",
      a: (<>La diferencia principal es el modelo de pago: <Link to="/asisa-esencial" style={{color: "#009FE3", textDecoration: "underline"}}>Adeslas Plena Vital</Link> no tiene copagos (prima fija más alta) mientras que Adeslas Go tiene copagos medios con límite de 250€/año (prima mensual más baja, desde 13,39€). Ambos cubren asistencia ambulatoria sin hospitalización. Elige YA si usas poco el seguro; elige Esencial si vas al médico frecuentemente.</>)
    },
    {
      q: "¿Incluye hospitalización Adeslas Go?",
      a: (<>No. Adeslas Go es un producto de cobertura básica ambulatoria y NO incluye hospitalización. Importante: al ser un producto de cobertura básica, tampoco es posible ampliar la póliza añadiendo la garantía de hospitalización. Si necesitas cobertura hospitalaria, debes contratar <Link to="/asisa-completa" style={{color: "#009FE3", textDecoration: "underline"}}>Adeslas Plena Total</Link>, Completa+ o Completa++. Lo que sí puedes añadir opcionalmente a Adeslas Go es el seguro dental y la indemnización por accidente.</>)
    },
    {
      q: "¿Incluye urgencias Adeslas Go?",
      a: "Sí. Adeslas Go incluye urgencias domiciliarias y ambulatorias las 24 horas del día, los 365 días del año. El copago por urgencias es de 14€, con el límite anual de 250€ aplicable."
    },
    {
      q: "¿Incluye rehabilitación y fisioterapia?",
      a: "Sí. Adeslas Go cubre sesiones de rehabilitación y fisioterapia con un copago de 3,50€ por sesión, sujeto al límite máximo anual de 250€."
    },
    {
      q: "¿Cubre psicoterapia Adeslas Go?",
      a: "Sí. Incluye psicoterapia con un copago de 13€ por sesión, con carencia de 6 meses y límite de 20-40 sesiones anuales según indicación médica. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información)."
    },
    {
      q: "¿Tiene asistencia en viaje Adeslas Go?",
      a: "Sí. Incluye asistencia médica urgente en viaje hasta 20.000€ por asegurado y desplazamiento, tanto en España como en el extranjero."
    },
    {
      q: "¿Puedo añadir coberturas a Adeslas Go?",
      a: "Sí, pero con limitaciones. Al ser un producto de cobertura básica, NO es posible añadir la garantía de hospitalización. Las garantías opcionales disponibles son: seguro dental Adeslas e indemnización por accidente (capital por fallecimiento desde 10.000€)."
    },
    {
      q: "¿Puedo elegir médico con Adeslas Go?",
      a: "Sí. Adeslas Go ofrece libre elección entre los médicos y especialistas del cuadro médico de Adeslas, con acceso a más de 51.000 médicos y 1.400 centros en toda España."
    },
    {
      q: "¿Hasta qué edad puedo contratar Adeslas Go?",
      a: "La edad máxima de contratación de Adeslas Go es 85 años, sin límite de permanencia posterior."
    }
  ],
  showPromo: true,
  schemaFaq: true
};

export default function AsisaYA() {
  return <ProductPageTemplate data={data} />;
}
