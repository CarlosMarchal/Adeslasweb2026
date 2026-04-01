import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/seguro-medico-asisa-completa.webp";

const data: ProductPageData = {
  seoTitle: "Seguro Médico Adeslas Plena Plus| Sin Copagos + Hospitalización",
  seoDescription: "Adeslas Plena Total: seguro médico privado con hospitalización ilimitada, sin copagos y acceso a +51.000 médicos en España. Urgencias 24h. Desde 50,92€/mes.",
  seoCanonical: "https://adeslas.marchalaseguradores.es/asisa-completa",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-completa.jpg",
  seoProductSchema: {
    name: "Adeslas Plena Total",
    description: "Seguro médico privado con hospitalización ilimitada, sin copagos y acceso a más de 51.000 médicos en España.",
    category: "Seguro de Salud",
    price: "50.92",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Seguros de Salud", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Adeslas Plena Total", url: "https://adeslas.marchalaseguradores.es/asisa-completa" },
  ],
  productSlug: "/asisa-completa",
  badge: "Seguro más vendido",
  heroTitle: "Seguro Médico Adeslas Plena Total",
  heroImage: heroImg,
  heroHighlight: "Sin Copagos · Hospitalización Ilimitada",
  heroSubtitle: "Cobertura total con hospitalización y sin copagos. Acceso al cuadro médico nacional de Adeslas con más de 51.000 médicos.",
  price: "50,92",
  pricePeriod: "mes",
  features: [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9h-3V8.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V11h-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3v3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3h3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Cobertura completa",
      description: "Asistencia médica integral sin limitaciones"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Sin copagos",
      description: "Prima fija y servicios sin coste adicional"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 11H5v2h6v-2zm0-4H5v2h6V7zm0 8H5v2h6v-2zm8-1v-3.5c0-.83-.67-1.5-1.5-1.5.5-.83.5-2.17 0-3 .83 0 1.5-.67 1.5-1.5V4c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h1c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Especialidades médicas",
      description: "Acceso a todas las especialidades sin restricciones"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Urgencias 24h",
      description: "Atención médica de emergencia disponible día y noche"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Videoconsultas y telemedicina",
      description: "Consultas médicas remotas desde casa"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Mejor precio garantizado",
      description: "Relación calidad-precio sin competencia"
    }
  ],
  cardName: "Adeslas Plena Total",
  cardDescription: "Cobertura completa con un precio muy competitivo sin copago. El seguro más vendido de Adeslas.",
  cardCoverages: [
    "Cobertura completa",
    "Consulta con todas las especialidades médicas",
    "Urgencias y hospitalización",
    "Rehabilitación y fisioterapia",
    "Videoconsultas y chat Adeslas incluido",
    "Asistencia en el extranjero",
    "Libre elección de centros concertados",
    "Análisis clínicos",
    "Sin copagos"
  ],
  cardPill: "Sin copagos · Cobertura total",
  cardPillDark: true,
  tabs: [
    {
      label: "Coberturas",
      items: [
        "Preparación al parto",
        "Urgencias 24h",
        "Medicina general y especialidades",
        "Urgencias y hospitalización",
        "Libre elección médico",
        "Pediatría",
        "Enfermería",
        "Podología 12 sesiones",
        "Pruebas diagnósticas",
        "Análisis clínicos",
        "Sin copagos"
      ]
    },
    {
      label: "Más Adeslas",
      items: [
        "Asistencia viajes 20.000€",
        "Segunda opinión médica",
        "RAD Adeslas 24h",
        "Adeslas LIVE videoconsultas",
        "App Adeslas gestión móvil"
      ]
    },
    {
      label: "Condiciones",
      items: [
        "Edad máxima 70 años",
        "Renovación anual automática",
        "Sin copagos en todos los servicios"
      ]
    }
  ],
  faqs: [
    {
      q: "¿Qué cubre Adeslas Plena Total?",
      a: "Adeslas Plena Pluscubre asistencia médica integral sin copagos: medicina general, todas las especialidades, urgencias 24h, hospitalización ilimitada, cirugía ambulatoria y hospitalaria, pruebas diagnósticas (TAC, resonancia, analíticas), rehabilitación, psicoterapia y podología."
    },
    {
      q: "¿Tiene copagos Adeslas Plena Total?",
      a: "No. Con Adeslas Plena Pluspagas únicamente la prima mensual fija y accedes a todos los servicios sin ningún coste adicional. Es la modalidad sin copagos de la gama Completa."
    },
    {
      q: "¿Incluye hospitalización Adeslas Plena Total?",
      a: "Sí. La hospitalización es ilimitada e incluye: hospitalización médica, quirúrgica, pediátrica, psiquiátrica y hospital de día. Habitación individual con cama para acompañante incluida."
    },
    {
      q: "¿Cubre el parto y el embarazo Adeslas Plena Total?",
      a: "Sí. Adeslas Plena Pluscubre la preparación al parto, el seguimiento del embarazo, el parto y los cuidados postparto, con una carencia de 8 meses desde la fecha de efecto de la póliza. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información)."
    },
    {
      q: "¿Qué especialidades médicas incluye Adeslas Plena Total?",
      a: "Incluye acceso a todas las especialidades médicas: cardiología, traumatología, ginecología, pediatría, dermatología, neurología, oncología, oftalmología, otorrinolaringología, urología, endocrinología, psicoterapia y muchas más, sin necesidad de derivación previa."
    },
    {
      q: "¿Puedo elegir médico o centro con Adeslas Plena Total?",
      a: "Sí. Tienes libre elección entre más de 51.000 médicos y especialistas y más de 1.400 centros concertados en toda España, incluyendo los 18 hospitales y 36 centros médicos propios de Adeslas."
    },
    {
      q: "¿Cubre asistencia médica fuera de España?",
      a: (<>Sí. Adeslas Plena Plusincluye asistencia médica en viaje de 20.000€ por asegurado y viaje, tanto en España como en el extranjero. Para residentes habituales fuera de España existe la modalidad <Link to="/asisa-reembolso" style={{color: "#009FE3", textDecoration: "underline"}}>Reembolso</Link>.</>)
    },
    {
      q: "¿Tiene carencias Adeslas Plena Total?",
      a: "Sí. Las carencias estándar son: 8 meses para hospitalización y parto, y 6 meses para pruebas diagnósticas especiales, cirugía ambulatoria, psicoterapia y planificación familiar. Las urgencias y la medicina general no tienen carencias. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información)."
    },
    {
      q: "¿Puedo añadir coberturas opcionales a Adeslas Plena Total?",
      a: (<>Sí. Puedes añadir garantías opcionales como: <Link to="/asisa-dental" style={{color: "#009FE3", textDecoration: "underline"}}>seguro dental</Link> (desde 9,45€/mes), indemnización por hospitalización (desde 30€/día) y capital por fallecimiento en accidente (desde 10.000€).</>)
    },
    {
      q: "¿Qué ventajas digitales incluye Adeslas Plena Total?",
      a: "Incluye videoconsultas con médicos a través de Adeslas LIVE, orientación médica telefónica 24h (900 900 118), App Adeslas para gestión de citas y resultados, chat médico y acceso a Doctor Virtual."
    },
    {
      q: "¿Puedo contratar Adeslas Plena Pluspara toda mi familia?",
      a: "Sí. Puedes contratar Adeslas Plena Pluspara cada miembro de la familia con una póliza individual. A partir del 4º asegurado se aplica un descuento del 10% en las primas."
    },
    {
      q: "¿Cuál es la diferencia entre Adeslas Plena Plusy Adeslas Plena Total+?",
      a: (<>Adeslas Plena Plusno tiene copagos en ningún servicio. <Link to="/asisa-completa-plus" style={{color: "#009FE3", textDecoration: "underline"}}>Adeslas Plena Total+</Link> ofrece exactamente la misma cobertura médica pero con copagos reducidos (desde 2,50€ por consulta), lo que permite una prima mensual más económica.</>)
    },
    {
      q: "¿Hasta qué edad se puede contratar Adeslas Plena Total?",
      a: "La edad máxima de contratación es 70 años. Sin embargo, una vez contratado, no existe límite de permanencia: puedes mantener el seguro toda la vida sin que te den de baja por edad."
    },
    {
      q: "¿Cubre trasplantes y tratamientos de alta complejidad?",
      a: "Sí. Adeslas Plena Pluscubre trasplantes de médula ósea y córnea, así como prótesis e implantes necesarios por indicación médica."
    }
  ],
  showPromo: true,
  schemaFaq: true
};

export default function AsisaCompleta() {
  return <ProductPageTemplate data={data} />;
}
