import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/seguro-medico-asisa-esencial-e1765795761941.webp";

const data: ProductPageData = {
  seoTitle: "Seguro Adeslas Plena Vital | Ambulatorio Sin Copagos desde 32,97€/mes",
  seoDescription: "Adeslas Plena Vital: seguro médico ambulatorio sin copagos con acceso directo a 40.000+ especialistas, urgencias 24h y telemedicina incluida. Sin hospitalización. Desde 32,97€/mes.",
  seoCanonical: "https://adeslas.marchalaseguradores.es/asisa-esencial",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-esencial.jpg",
  seoProductSchema: {
    name: "Adeslas Plena Vital",
    description: "Seguro médico ambulatorio sin copagos con acceso directo a 40.000+ especialistas, urgencias 24h y telemedicina incluida.",
    category: "Seguro de Salud",
    price: "38",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Seguros de Salud", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Adeslas Plena Vital", url: "https://adeslas.marchalaseguradores.es/asisa-esencial" },
  ],
  productSlug: "/asisa-esencial",
  badge: "Ambulatorio sin copagos",
  heroTitle: "Seguro Médico Adeslas Plena Vital",
  heroImage: heroImg,
  heroHighlight: "Ambulatorio · Sin Copagos",
  heroSubtitle: "Toda la asistencia médica ambulatoria que necesitas, sin copagos, con acceso directo a especialistas y servicios digitales.",
  price: "38",
  pricePeriod: "mes",
  features: [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9h-3V8.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V11h-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3v3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3h3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Cobertura ambulatoria",
      description: "Asistencia médica completa sin hospitalización"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Sin copagos",
      description: "Acceso a servicios médicos sin coste adicional"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 11H5v2h6v-2zm0-4H5v2h6V7zm0 8H5v2h6v-2zm8-1v-3.5c0-.83-.67-1.5-1.5-1.5.5-.83.5-2.17 0-3 .83 0 1.5-.67 1.5-1.5V4c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h1c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Especialistas directos",
      description: "Acceso directo sin derivación médica"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Urgencias 24h",
      description: "Atención de emergencia disponible todo el día"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Doctor Virtual",
      description: "Consultas médicas en línea 24 horas"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75-3.54L6.5 15h11z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Asistencia en viaje",
      description: "Cobertura médica en el extranjero"
    }
  ],
  cardName: "Adeslas Plena Vital",
  cardDescription: "El seguro médico ambulatorio de Adeslas con mejor relación calidad-precio.",
  cardCoverages: [
    "Cobertura ambulatoria completa",
    "Medicina general y especialistas",
    "Urgencias 24h domiciliarias y ambulatorias",
    "Rehabilitación y fisioterapia",
    "Videoconsultas y Doctor Virtual",
    "Pruebas diagnósticas y análisis",
    "Podología (12 sesiones/año)",
    "Asistencia en viaje hasta 20.000€",
    "Sin copagos"
  ],
  cardPill: "Sin copagos · Ambulatorio",
  cardPillDark: true,
  tabs: [
    {
      label: "Coberturas",
      items: [
        "Medicina general y especialidades",
        "Urgencias 24h domiciliarias",
        "Libre elección médico 40.000+",
        "Pediatría libre elección",
        "Enfermería",
        "Podología 12 sesiones",
        "Pruebas diagnósticas",
        "Análisis clínicos",
        "Preparación al parto",
        "Sin copagos"
      ]
    },
    {
      label: "Más Adeslas",
      items: [
        "Doctor Virtual 24h",
        "App Adeslas",
        "Asistencia viajes 20.000€",
        "Segunda opinión médica",
        "Garantías opcionales (dental, hospitalización, accidente)"
      ]
    },
    {
      label: "Condiciones",
      items: [
        "No incluye hospitalización",
        "Carencia 6 meses para técnicas especiales/psicoterapia/planificación familiar",
        "Edad máxima 85 años",
        "Renovación anual"
      ]
    }
  ],
  faqs: [
    {
      q: "¿Qué cubre Adeslas Plena Vital?",
      a: "Adeslas Plena Vital cubre asistencia médica ambulatoria completa sin copagos: medicina general, más de 30 especialidades médicas, urgencias 24h domiciliarias y ambulatorias, pruebas diagnósticas (analíticas, radiografías, ecografías), podología (12 sesiones/año), psicoterapia, planificación familiar y segunda opinión médica."
    },
    {
      q: "¿Adeslas Plena Vital incluye hospitalización?",
      a: (<>No. Adeslas Plena Vital está diseñado exclusivamente para asistencia ambulatoria (sin ingreso hospitalario). Si necesitas hospitalización, puedes añadirla como garantía opcional o contratar <Link to="/asisa-completa" style={{color: "#009FE3", textDecoration: "underline"}}>Adeslas Plena Total</Link>, que sí la incluye desde el primer momento.</>)
    },
    {
      q: "¿Tiene copagos Adeslas Plena Vital?",
      a: "No. Con Adeslas Plena Vital pagas únicamente la prima mensual y accedes a todos los servicios ambulatorios sin ningún coste adicional por visita o consulta. Sin sorpresas en la factura."
    },
    {
      q: "¿Puedo elegir médico con Adeslas Plena Vital?",
      a: "Sí. Tienes libre elección entre más de 40.000 médicos y especialistas del cuadro médico de Adeslas, sin necesidad de derivación previa. Puedes ir directamente al especialista que necesites."
    },
    {
      q: "¿Qué diferencia hay entre Adeslas Plena Vital y Adeslas Plena Total?",
      a: (<>La diferencia principal es que <Link to="/asisa-completa" style={{color: "#009FE3", textDecoration: "underline"}}>Adeslas Plena Total</Link> incluye hospitalización, cirugía y prótesis, mientras que Adeslas Plena Vital cubre solo la asistencia ambulatoria (consultas, urgencias, diagnósticos sin ingreso). Adeslas Plena Vital tiene una prima más económica y está orientado a quienes no anticipan necesidades hospitalarias.</>)
    },
    {
      q: "¿Incluye rehabilitación y fisioterapia Adeslas Plena Vital?",
      a: "Sí. Adeslas Plena Vital cubre sesiones de rehabilitación y fisioterapia bajo prescripción médica, sin copagos adicionales."
    },
    {
      q: "¿Cubre psicoterapia y salud mental?",
      a: "Sí. Adeslas Plena Vital incluye psicoterapia con una carencia de 6 meses. Una vez superado este período, puedes acceder a sesiones con psicólogos y psiquiatras concertados sin copago. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información)."
    },
    {
      q: "¿Qué servicios digitales incluye Adeslas Plena Vital?",
      a: "Incluye Doctor Virtual para videoconsultas 24h, App Adeslas para gestión de citas y resultados, chat médico online y orientación médica telefónica 24h a través del 900 900 118."
    },
    {
      q: "¿Incluye asistencia en viaje Adeslas Plena Vital?",
      a: "Sí. Cubre asistencia médica urgente en viaje hasta 20.000€ por asegurado y desplazamiento, tanto dentro de España como en el extranjero."
    },
    {
      q: "¿Puedo añadir coberturas opcionales a Adeslas Plena Vital?",
      a: (<>Sí. Puedes ampliar la cobertura con garantías opcionales: hospitalización e indemnización diaria (desde 30€/día), capital por fallecimiento en accidente y <Link to="/asisa-dental" style={{color: "#009FE3", textDecoration: "underline"}}>seguro dental Adeslas</Link>. También puedes consultar <Link to="/asisa-completa" style={{color: "#009FE3", textDecoration: "underline"}}>Adeslas Plena Total</Link> si buscas hospitalización incluida desde el primer momento.</>)
    },
    {
      q: "¿Tiene carencias Adeslas Plena Vital?",
      a: "Las carencias son mínimas: 6 meses para pruebas diagnósticas especiales, técnicas especiales de tratamiento, psicoterapia y planificación familiar. La medicina general, especialistas y urgencias no tienen carencias. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información)."
    },
    {
      q: "¿Puede contratar Adeslas Plena Vital alguien mayor de 70 años?",
      a: "La edad máxima de contratación de Adeslas Plena Vital es 85 años, superior a otros seguros Adeslas. Una vez contratado, no hay límite de permanencia por edad."
    },
    {
      q: "¿Hasta qué edad puedo contratar Adeslas Plena Vital?",
      a: "Hasta los 85 años, sin límite de permanencia posterior. Es uno de los seguros médicos con mayor límite de contratación de Adeslas, ideal para personas mayores."
    }
  ],
  showPromo: true,
  schemaFaq: true
};

export default function AsisaEsencial() {
  return <ProductPageTemplate data={data} />;
}
