import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/seguro-medico-asisa-completa-plus.webp";

const data: ProductPageData = {
  seoTitle: "Seguro Adeslas Plena Total+ | Hospitalización con Copago Reducido",
  seoDescription:
    "Adeslas Plena Total+: seguro médico completo con hospitalización, cirugía y copagos reducidos. Toda la cobertura de Adeslas Plena Plusa precio más bajo. Desde 29,34€/mes.",
  seoCanonical: "https://adeslas.marchalaseguradores.es/asisa-completa-plus",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-completa-plus.jpg",
  seoProductSchema: {
    name: "Adeslas Plena Total+",
    description: "Seguro médico con hospitalización y copago reducido. Acceso al cuadro médico nacional de Adeslas con más de 51.000 médicos.",
    category: "Seguro de Salud",
    price: "48.50",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Seguros de Salud", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Adeslas Plena Total+", url: "https://adeslas.marchalaseguradores.es/asisa-completa-plus" },
  ],
  productSlug: "/asisa-completa-plus",
  badge: "Cobertura completa con copago",
  heroTitle: "Seguro Médico Adeslas Plena Total+",
  heroImage: heroImg,
  heroHighlight: "Hospitalización · Copago Reducido",
  heroSubtitle:
    "Cobertura médica integral con hospitalización incluida y copagos ajustados, para que pagues solo cuando utilizas el servicio.",
  price: "48,50",
  cardName: "Adeslas Plena Plus+",
  cardDescription:
    "El seguro médico completo con copagos reducidos para quienes buscan flexibilidad.",
  cardPill: "Copago reducido · Cobertura total",
  cardPillDark: false,
  cardCoverages: [
    "Cobertura completa con hospitalización",
    "Copagos reducidos",
    "Todas las especialidades médicas",
    "Urgencias y hospitalización",
    "Cirugía ambulatoria",
    "Rehabilitación y fisioterapia",
    "Videoconsultas y chat Adeslas",
    "Asistencia en el extranjero (20.000€)",
    "Libre elección de centros",
  ],
  features: [
    {
      title: "Cobertura completa",
      description: "Medicina general y todas las especialidades médicas",
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
      title: "Copagos reducidos",
      description: "Pago flexible solo cuando utilizas el servicio",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#1c4a8d" strokeWidth="1.5" />
          <path
            d="M12 7v5l3.5 2"
            stroke="#1c4a8d"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Hospitalización incluida",
      description: "Médica, quirúrgica y pediátrica sin límite",
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
      title: "+51.000 médicos",
      description: "Libre elección de médicos y 1.400 centros",
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
      title: "Servicios digitales",
      description: "Videoconsultas, chat y app móvil Adeslas",
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
      title: "Asistencia en viajes",
      description: "Cobertura internacional hasta 20.000€",
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
  ],
  tabs: [
    {
      label: "Coberturas",
      items: [
        "Medicina general y todas las especialidades",
        "Urgencias 24h y hospitalización completa",
        "Libre elección: +51.000 médicos y +1.400 centros",
        "Pediatría hasta 14 años",
        "Enfermería domiciliaria",
        "Podología: 12 sesiones/año",
        "Pruebas diagnósticas y análisis clínicos",
        "Cirugía ambulatoria y prótesis",
        "Trasplantes: médula ósea y córnea",
      ],
    },
    {
      label: "Más Adeslas",
      items: [
        "Videoconsultas y chat médico",
        "Asistencia viajes: 20.000€",
        "Segunda opinión médica",
        "Orientación médica 24h",
        "App Adeslas con gestión de citas",
        "Programa Adeslas Videoconsultas 24h",
      ],
    },
    {
      label: "Condiciones",
      items: [
        "Copagos reducidos: pago por uso",
        "Edad máxima: 70 años",
        "Renovación anual",
        "Carencias: hospitalización/cirugía/parto (6-8 meses)",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Qué cubre Adeslas Plena Total+?",
      a: "Adeslas Plena Total+ cubre asistencia médica integral con copagos reducidos: medicina general, todas las especialidades médicas, urgencias 24h, hospitalización completa (médica, quirúrgica, pediátrica y psiquiátrica), cirugía ambulatoria, pruebas diagnósticas avanzadas, rehabilitación, psicoterapia, podología y planificación familiar.",
    },
    {
      q: "¿Tiene copagos Adeslas Plena Total+?",
      a: "Sí, pero son copagos reducidos (bajos). Por ejemplo: médico general 2,50€, especialista 3€, urgencias y hospitalización 6€, resonancia magnética 10€, rehabilitación 1,50€ por sesión. Estos copagos permiten una prima mensual más económica que Adeslas Plena Plussin copagos.",
    },
    {
      q: "¿Cuál es la diferencia entre Adeslas Plena Plusy Adeslas Plena Total+?",
      a: (<>La cobertura médica es idéntica. La diferencia está en el modelo de pago: <Link to="/asisa-completa" style={{color: "#009FE3", textDecoration: "underline"}}>Adeslas Plena Total</Link> no tiene ningún copago (prima más alta), mientras que Adeslas Plena Total+ tiene copagos reducidos (prima más baja). Si usas el seguro con frecuencia, Adeslas Plena Pluspuede resultar más económica a largo plazo.</>)
    },
    {
      q: "¿Incluye hospitalización Adeslas Plena Total+?",
      a: "Sí. Adeslas Plena Total+ incluye hospitalización ilimitada: médica, quirúrgica, pediátrica, psiquiátrica y hospital de día. Habitación individual con cama para acompañante. El copago por hospitalización es de 6€.",
    },
    {
      q: "¿Cubre el parto y el embarazo Adeslas Plena Total+?",
      a: "Sí. Cubre preparación al parto, seguimiento del embarazo, el parto y los cuidados postparto. La carencia es de 8 meses desde la fecha de efecto de la póliza. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información).",
    },
    {
      q: "¿Qué especialidades médicas incluye Adeslas Plena Total+?",
      a: "Incluye todas las especialidades médicas: cardiología, traumatología, ginecología, pediatría, dermatología, neurología, oncología, oftalmología, urología, psicología, endocrinología y más, con acceso directo sin derivación previa.",
    },
    {
      q: "¿Puedo elegir médico o centro con Adeslas Plena Total+?",
      a: "Sí. Tienes libre elección entre más de 51.000 médicos y especialistas y más de 1.400 centros concertados de Adeslas en toda España.",
    },
    {
      q: "¿Cubre trasplantes e implantes Adeslas Plena Total+?",
      a: "Sí. Adeslas Plena Total+ cubre trasplantes de médula ósea y córnea, así como prótesis e implantes necesarios por indicación médica.",
    },
    {
      q: "¿Incluye servicios digitales Adeslas Plena Total+?",
      a: "Sí. Incluye videoconsultas a través de Adeslas Videoconsultas 24h, chat médico, orientación médica telefónica 24h y App Adeslas para gestión de citas, resultados y recetas.",
    },
    {
      q: "¿Cubre asistencia médica en el extranjero?",
      a: "Sí. Incluye asistencia médica en viaje hasta 20.000€ por asegurado y desplazamiento, tanto en España como fuera.",
    },
    {
      q: "¿Tiene carencias Adeslas Plena Total+?",
      a: "Sí. Carencias estándar: 8 meses para hospitalización y parto, 6 meses para cirugía ambulatoria, técnicas diagnósticas especiales, psicoterapia y planificación familiar. Las urgencias y la medicina general no tienen carencias. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información).",
    },
    {
      q: "¿Puedo añadir coberturas opcionales a Adeslas Plena Total+?",
      a: (<>Sí. Puedes ampliar con garantías opcionales: <Link to="/asisa-dental" style={{color: "#009FE3", textDecoration: "underline"}}>seguro dental</Link> (desde 9,45€/mes), indemnización por hospitalización (desde 30€/día) y capital por fallecimiento en accidente.</>)
    },
    {
      q: "¿Hasta qué edad puedo contratar Adeslas Plena Total+?",
      a: "Hasta los 70 años, sin límite de permanencia posterior. Una vez contratado puedes mantenerlo durante toda la vida.",
    },
  ],
  schemaFaq: true,
  showPromo: true,
};

const AsisaCompletaPlus = () => <ProductPageTemplate data={data} />;
export default AsisaCompletaPlus;
