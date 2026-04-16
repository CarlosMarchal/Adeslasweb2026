import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import ContactCtaCard from "@/components/ContactCtaCard";
import heroImg from "@/assets/seguro-medico-adeslas-seniors-total.webp";

const data: ProductPageData = {
  seoTitle: "Adeslas Seniors Total | Cobertura Completa para Mayores de 63 años desde 101€",
  seoDescription: "Adeslas Seniors Total: seguro médico para personas de 63 a 84 años sin subida de prima garantizada 3 años. Hospitalización, oncología, asistencia viajes 100.000€ y asesor personal. Desde 101€/mes.",
  seoCanonical: "https://adeslas.numero1salud.es/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/",
  hubspotSource: 315,
  seoOgImage: "https://adeslas.numero1salud.es/og-seniors-total.jpg",
  seoProductSchema: {
    name: "Adeslas Seniors Total",
    description: "Cobertura médica completa para mayores de 63 años sin subida de prima 3 años, asistencia viajes 100.000€, dental incluida y topes de copago reducidos. Desde 101€/mes.",
    category: "Seguro de Salud",
    price: "101.00",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    { name: "Planes Adeslas", url: "https://adeslas.numero1salud.es/" },
    { name: "Adeslas Seniors Total", url: "https://adeslas.numero1salud.es/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/" },
  ],
  customTarificador: <ContactCtaCard />,
  heroPromo: "Consigue puntos al contratar tu seguro ahora y conviértelos en regalos exclusivos",
  badge: "3 años sin subidas de prima",
  heroTitle: "Adeslas Seniors Total",
  heroImage: heroImg,
  heroHighlight: "La Máxima Cobertura para la Tercera Edad",
  heroSubtitle: "Seguro médico completo para personas de 63 a 84 años. Sin subidas de prima garantizadas 3 años, asesor de salud personal y topes de copago anuales muy reducidos.",
  price: "101",
  pricePeriod: "mes",
  features: [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9h-3V8.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V11h-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3v3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3h3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Topes de copago garantizados",
      description: "Copago ambulatorio máximo 250€/año. Copago hospitalización máximo 800€/año. Previsibilidad total del gasto."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Sin subidas de prima",
      description: "Prima garantizada sin incrementos durante los primeros 3 años de contrato. Precio fijo y predecible.",
      highlight: true
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 11H5v2h6v-2zm0-4H5v2h6V7zm0 8H5v2h6v-2zm8-1v-3.5c0-.83-.67-1.5-1.5-1.5.5-.83.5-2.17 0-3 .83 0 1.5-.67 1.5-1.5V4c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h1c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Asesor de salud personal",
      description: "Asesor dedicado que responde en 72 horas para guiarte al mejor especialista y reducir tus copagos."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Hospitalización sin límite",
      description: "Hospitalización médica, quirúrgica y psiquiátrica completa sin límite de días ni exclusiones por edad."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 11H5v2h6v-2zm0-4H5v2h6V7zm0 8H5v2h6v-2zm8-1v-3.5c0-.83-.67-1.5-1.5-1.5.5-.83.5-2.17 0-3 .83 0 1.5-.67 1.5-1.5V4c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h1c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Dental incluida",
      description: "46 actos dentales incluidos + 50% en primer implante en Clínica Dental Adeslas"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke="#1c4a8d" strokeWidth="1.5"/><path d="M2 12h20M12 2c-2.21 5.5-2.21 15 0 20" stroke="#1c4a8d" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: "Asistencia viajes",
      description: "Cobertura internacional hasta 100.000€"
    }
  ],
  cardName: "Adeslas Seniors Total",
  cardDescription: "La cobertura más completa para personas mayores. Garantía de precio 3 años, asistencia viajes 100.000€, dental incluida y topes de copago anuales muy competitivos.",
  cardPill: "63-84 años · Sin subidas 3 años",
  cardPromoBadge: "🎁 Promoción puntos",
  cardCoverages: [
    "Todas las coberturas médicas del plan Seniors",
    "Hospitalización completa sin límite de días",
    "Dental incluida: 46 actos incluidos + 50% primer implante",
    "Tope copago ambulatorio: 250€/año",
    "Tope copago hospitalización: 800€/año",
    "Chequeo médico anual (copago 50€)",
    "Asistencia viajes: hasta 100.000€",
    "Reembolso: rehab/fisio 50% hasta 500€, podología 50% hasta 200€, farmacia 50% hasta 200€",
    "Asesor de salud personal con respuesta en 72h",
    "Videoconsulta, chat y teléfono 24h",
    "Garantía de precio sin subidas 3 años"
  ],
  tabs: [
    {
      label: "Coberturas incluidas",
      items: [
        "Medicina general y enfermería",
        "Más de 40 especialidades médicas",
        "Urgencias 24h presenciales y domiciliarias",
        "Hospitalización médica y quirúrgica (sin límite de días)",
        "Hospitalización psiquiátrica",
        "UCI y cuidados intensivos",
        "Diagnóstico de alta tecnología (TAC, resonancias)",
        "Test genéticos",
        "Oncología completa",
        "Cirugía robótica y laparoscópica",
        "Implantes y prótesis quirúrgicas",
        "Rehabilitación y fisioterapia (50% hasta 500€/año)",
        "Psicología y psiquiatría",
        "Podología (12 sesiones/año, 50% hasta 200€/año)",
        "Chequeo médico anual preventivo (copago 50€)",
        "Dental: 46 actos incluidos + 50% primer implante en Clínica Dental Adeslas",
        "Farmacia: reembolso 50% hasta 200€/año",
        "Asistencia viajes: hasta 100.000€",
        "Telemedicina 24h (vídeo, chat, teléfono)",
        "Asesor de salud personal (respuesta 72h)",
        "Ambulancia y transporte sanitario",
        "Receta electrónica y tarjeta digital"
      ]
    },
    {
      label: "Condiciones y copagos",
      items: [
        "Edad de contratación: 63 a 84 años (se admiten 60-62 si hay asegurado ≥63)",
        "Cuestionario de salud obligatorio",
        "Preexistencias aceptadas (según cuestionario)",
        "Copago LMA ambulatorio: 250€/año (vía asesor), sin límite (acceso libre)",
        "Copago LMA hospitalario: 800€/año (ingreso 100€/día, urgencias 25€)",
        "Chequeo anual: copago 50€",
        "Descuentos: 3 asegurados 5%, 4 asegurados 10%, 5+ 15%",
        "Bonificaciones: trimestral 2%, semestral 4%, anual 6%",
        "Sin subida de prima garantizada 3 años"
      ]
    }
  ],
  faqs: [
    {
      q: "¿Qué diferencia hay entre Seniors y Seniors Total?",
      a: "Adeslas Seniors es para personas de 55 a 84 años con copagos estándar. Adeslas Seniors Total es para 63 a 84 años y tiene topes de copago anuales mucho más reducidos (250€ ambulatorio, 800€ hospitalización), incluye dental (46 actos + 50% primer implante), asistencia viajes hasta 100.000€, y garantía de precio 3 años. Es la opción con mayor tranquilidad económica para la tercera edad."
    },
    {
      q: "¿La prima no sube nunca?",
      a: "Durante los primeros 3 años del contrato, la prima está garantizada sin incrementos. A partir del año 4, puede ajustarse conforme al IPC sanitario, pero el incremento será siempre transparente y comunicado con antelación."
    },
    {
      q: "¿Qué incluye el chequeo médico anual?",
      a: "El chequeo anual preventivo incluye revisión cardiovascular, oncológica y metabólica adaptada a la edad y sexo del asegurado. Tiene un copago específico de 50€, incluido en el plan (NO suma al tope de copago de 250€ ambulatorio)."
    },
    {
      q: "¿Puedo contratar a los 80 años?",
      a: "Sí. Adeslas Seniors Total acepta contrataciones hasta los 84 años, lo que lo hace único en el mercado. Se requiere cuestionario de salud y las condiciones se estudian individualmente para cada persona."
    },
    {
      q: "¿Cómo funciona el asesor de salud personal?",
      a: "El asesor es un médico asignado específicamente a ti que puede consultar en hasta 72 horas por videollamada, teléfono o chat. Te orienta hacia el especialista adecuado, gestiona autorizaciones y, si acudes con su derivación (vía asesor), el copago ambulatorio se reduce a 250€/año. En acceso libre, sin límite."
    }
  ],
  showPromo: true,
  schemaFaq: true
};

export default function AdeslasSeniorsTotal() {
  return <ProductPageTemplate data={data} />;
}
