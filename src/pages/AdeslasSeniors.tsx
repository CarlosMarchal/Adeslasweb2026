import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import ContactCtaCard from "@/components/ContactCtaCard";
import heroImg from "@/assets/seguro-medico-adeslas-seniors.webp";

const data: ProductPageData = {
  seoTitle: "Adeslas Seniors | Seguro Médico para Mayores desde 67,50€ · 3 Meses Gratis",
  seoDescription: "Seguro médico Adeslas Seniors para mayores de 55 a 84 años. 3 meses gratis. Asesor médico personal, oncología, cardiología, rehabilitación y cobertura completa. Copago reducido. Desde 67,50€/mes.",
  seoCanonical: "https://adeslas.numero1salud.es/seguro-salud/adeslas-seniors/",
  seoOgImage: "https://adeslas.numero1salud.es/og-seniors.jpg",
  seoProductSchema: {
    name: "Adeslas Seniors",
    description: "Seguro médico específico para mayores de 55 años con asesor de salud personal y copago reducido. Desde 67,50€/mes.",
    category: "Seguro de Salud",
    price: "67.50",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    { name: "Planes Adeslas", url: "https://adeslas.numero1salud.es/" },
    { name: "Adeslas Seniors", url: "https://adeslas.numero1salud.es/seguro-salud/adeslas-seniors/" },
  ],
  customTarificador: <ContactCtaCard />,
  heroPromo: "Consigue puntos al contratar tu seguro ahora y conviértelos en regalos exclusivos",
  badge: "Para personas de 55 a 84 años",
  heroTitle: "Adeslas Seniors",
  heroImage: heroImg,
  heroHighlight: "Atención Médica Personalizada para Mayores de 55",
  heroSubtitle: "Seguro médico específico para personas de 55 a 84 años con asesor de salud personal, especialidades completas y copago con tope anual garantizado.",
  price: "67,50",
  pricePeriod: "mes",
  features: [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9h-3V8.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V11h-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3v3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3h3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Asesor de salud personal",
      description: "Tu propio asesor médico que te orienta hacia el especialista adecuado, reduciendo tiempos y copagos."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Especialidades completas (+40)",
      description: "Acceso a más de 40 especialidades: cardiología, oncología, ortopedia, gastroenterología, psiquiatría, urología y más."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 11H5v2h6v-2zm0-4H5v2h6V7zm0 8H5v2h6v-2zm8-1v-3.5c0-.83-.67-1.5-1.5-1.5.5-.83.5-2.17 0-3 .83 0 1.5-.67 1.5-1.5V4c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h1c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Hospitalización completa",
      description: "Hospitalización médica, quirúrgica, psiquiátrica y pediátrica con UCI. Habitación individual con cama para acompañante."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Chequeo preventivo",
      description: "Revisiones médicas anuales preventivas personalizadas según tu edad y sexo: cardiovascular, oncológico y metabólico."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Oncología y cirugía robótica",
      description: "Cobertura completa para quimioterapia, radioterapia, cirugía robótica, implantes y prótesis quirúrgicas."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75-3.54L6.5 15h11z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Dental y telemedicina",
      description: "Dental básico incluido y videoconsulta 24h para resolver consultas desde casa sin desplazamiento."
    }
  ],
  cardName: "Adeslas Seniors",
  cardDescription: "Diseñado específicamente para personas de 55 a 84 años con necesidades médicas más frecuentes. Incluye asesor de salud personal y copago reducido.",
  cardPill: "55-84 años · Asesor personal",
  cardPromoBadge: "🎁 Promoción puntos",
  cardCoverages: [
    "Medicina general y especialidades (+40 especialidades)",
    "Urgencias 24h presenciales y domiciliarias",
    "Hospitalización médica, quirúrgica y psiquiátrica (50 días/año)",
    "Oncología, cardiología y urología completas",
    "Diagnóstico avanzado (TAC, resonancias, genética)",
    "Rehabilitación y fisioterapia",
    "Chequeo preventivo personalizado por grupos de edad",
    "Dental básico incluido",
    "Asesor de salud personal",
    "Asistencia internacional hasta 12.000€/año"
  ],
  tabs: [
    {
      label: "Coberturas incluidas",
      items: [
        "Medicina general y enfermería",
        "Más de 40 especialidades médicas",
        "Urgencias 24h presenciales y domiciliarias",
        "Hospitalización médica y quirúrgica",
        "Hospitalización psiquiátrica (50 días/año)",
        "UCI y cuidados intensivos",
        "Diagnóstico de alta tecnología (TAC, resonancias)",
        "Test genéticos",
        "Oncología: quimio, radio y trasplantes",
        "Cirugía robótica",
        "Implantes y prótesis quirúrgicas",
        "Rehabilitación y fisioterapia",
        "Psicología y psiquiatría",
        "Podología (12 sesiones/año)",
        "Chequeo preventivo cardiovascular y oncológico",
        "Dental básico incluido",
        "Telemedicina y videoconsulta 24h",
        "Asesor de salud personal",
        "Asistencia internacional 12.000€/año",
        "Ambulancia y transporte sanitario"
      ]
    },
    {
      label: "Condiciones de contratación",
      items: [
        "Edad de contratación: 55 a 84 años",
        "Cuestionario de salud obligatorio",
        "Preexistencias aceptadas (según cuestionario)",
        "Copago reducido con asesor de salud",
        "Tope de copago anual por asegurado",
        "Habitación individual garantizada en hospitalización",
        "Descuento del 10% con 4+ asegurados"
      ]
    }
  ],
  faqs: [
    {
      q: "¿Hasta qué edad puedo contratar Adeslas Seniors?",
      a: "Adeslas Seniors permite la contratación desde los 55 hasta los 84 años. Es uno de los pocos seguros médicos del mercado que acepta nuevas contrataciones hasta esa edad. Se requiere cuestionario de salud, pero las preexistencias se estudian caso a caso."
    },
    {
      q: "¿Qué es el asesor de salud personal?",
      a: "El asesor de salud es un profesional médico que te ayuda a elegir el especialista más adecuado para cada consulta, optimizando tanto los tiempos como los copagos. Si acudes con su derivación, el copago se reduce significativamente."
    },
    {
      q: "¿Qué copagos tiene Adeslas Seniors?",
      a: "LMA ambulatorio: 250€/año (vía asesor de salud) o sin límite en acceso libre. Consultas 5€, análisis 9€, RM/TAC 30€, etc. LMA hospitalario: 800€/año (ingreso 100€/día, urgencias hospitalarias 25€)."
    },
    {
      q: "¿Cubre enfermedades preexistentes?",
      a: "Sí, Adeslas Seniors acepta preexistencias. Deben declararse en el cuestionario de salud y se estudian individualmente. En algunos casos pueden aplicarse exclusiones o sobreprimas específicas para ciertas condiciones preexistentes."
    },
    {
      q: "¿Tiene dental el seguro Seniors?",
      a: "Sí, incluye dental básico. Para tratamientos más complejos como ortodoncia e implantología se aplica un descuento adicional del 10% en las clínicas Adeslas Dental."
    }
  ],
  showPromo: true,
  schemaFaq: true
};

export default function AdeslasSeniors() {
  return <ProductPageTemplate data={data} />;
}
