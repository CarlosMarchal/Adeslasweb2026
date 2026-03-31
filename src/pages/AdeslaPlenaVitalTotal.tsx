import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/seguro-medico-asisa-esencial-e1765795761941.webp";

const data: ProductPageData = {
  seoTitle: "Adeslas Plena Vital Total | Cobertura Completa con Copagos desde 48,50€",
  seoDescription: "Adeslas Plena Vital Total: cobertura médica completa con hospitalización. Copago máximo 500€/año. Dental incluido. Sin subidas de prima 3 años. Desde 48,50€/mes.",
  seoCanonical: "https://adeslas.marchalaseguradores.es/adeslas-plena-vital-total",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-vital-total.jpg",
  seoProductSchema: {
    name: "Adeslas Plena Vital Total",
    description: "Cobertura médica completa con hospitalización, copago máximo 500€/año, dental incluido. Desde 48,50€/mes.",
    category: "Seguro de Salud",
    price: "48.50",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Planes Adeslas", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Adeslas Plena Vital Total", url: "https://adeslas.marchalaseguradores.es/adeslas-plena-vital-total" },
  ],
  productSlug: "/adeslas-plena-vital-total",
  heroPromo: "Consigue puntos al contratar tu seguro ahora y conviértelos en regalos exclusivos",
  cardPromoBadge: "🎁 Promoción puntos",
  badge: "3 años sin subidas de prima",
  heroTitle: "Adeslas Plena Vital Total",
  heroImage: heroImg,
  heroHighlight: "Cobertura Completa con Tope de Copago",
  heroSubtitle: "Seguro médico con hospitalización completa, dental incluido y un máximo de 500€ anuales en copagos. Sin subidas garantizadas durante 3 años.",
  price: "48,50",
  pricePeriod: "mes",
  features: [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9h-3V8.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V11h-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3v3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3h3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Cobertura hospitalaria completa",
      description: "Hospitalización médica, quirúrgica, psiquiátrica y pediátrica con UCI. Todo cubierto sin sorpresas."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Copago con tope garantizado",
      description: "Máximo 500€ al año por asegurado. Una vez alcanzado el límite, el resto del año es sin coste."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 11H5v2h6v-2zm0-4H5v2h6V7zm0 8H5v2h6v-2zm8-1v-3.5c0-.83-.67-1.5-1.5-1.5.5-.83.5-2.17 0-3 .83 0 1.5-.67 1.5-1.5V4c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h1c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Dental incluido (46 actos)",
      description: "46 actos dentales sin coste adicional: limpiezas, consultas, ortopantomografías, fluorizaciones, pulpotomías y más."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Sin subidas de precio",
      description: "Prima garantizada sin incrementos durante los primeros 3 años de contrato.",
      highlight: true
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75-3.54L6.5 15h11z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Diagnóstico avanzado",
      description: "TAC, resonancias magnéticas, genética y alta tecnología sin límite de pruebas."
    }
  ],
  cardName: "Adeslas Plena Vital Total",
  cardDescription: "Cobertura total como el Plena, pero con copagos reducidos con un tope anual de 500€ por asegurado.",
  cardPill: "Con copago · Máx. 500€/año",
  cardCoverages: [
    "Medicina general y pediatría",
    "Urgencias 24h en centros concertados",
    "Hospitalización médica, quirúrgica y psiquiátrica",
    "Diagnóstico de alta tecnología (TAC, resonancias)",
    "Rehabilitación y fisioterapia sin límite",
    "Psicología (20-40 sesiones/año)",
    "Podología (12 sesiones/año)",
    "Dental incluido",
    "Chequeo médico anual",
    "Sin subida de prima durante 3 años"
  ],
  tabs: [
    {
      label: "Coberturas incluidas",
      items: [
        "Medicina general y enfermería",
        "Pediatría y ginecología completas",
        "Urgencias 24h presenciales y domiciliarias",
        "Todas las especialidades médicas",
        "Hospitalización médica y quirúrgica",
        "UCI y cuidados intensivos",
        "Hospitalización psiquiátrica",
        "Cirugía ambulatoria",
        "Laboratorio y análisis clínicos",
        "Radiología y ecografías",
        "TAC, resonancias y PET",
        "Test genéticos",
        "Rehabilitación y fisioterapia",
        "Logopedia",
        "Psicología (20-40 sesiones/año)",
        "Podología (12 sesiones/año)",
        "Quimioterapia y radioterapia",
        "Trasplantes",
        "Dental básico incluido",
        "Chequeo médico anual",
        "Videoconsulta y telemedicina 24h",
        "Ambulancia y transporte sanitario"
      ]
    },
    {
      label: "Copagos",
      items: [
        "Medicina general: 7€",
        "Domicilio: 14,50€",
        "Pediatría: 8€",
        "Enfermería: 2€",
        "Urgencias: 14,50€",
        "Especialidades: 14,50€",
        "Actos quirúrgicos: 14,50€",
        "Psicología: 14,50€",
        "Rehabilitación/fisio: 5€ por sesión",
        "Logopedia/foniatría: 5€ por sesión",
        "Análisis clínicos: 11,50€",
        "Anatomía patológica: 11,50€",
        "Radiología: 11,50€",
        "Alta tecnología: 45€",
        "Diagnóstico intervencionista: 45€",
        "Terapias respiratorias domicilio: 2€ por día",
        "Preparación al parto: 45€",
        "Litotricia renal: 45€",
        "Podología: 3€",
        "Chequeo médico anual: 50€",
        "Límite máximo anual (LMA): 500€ por asegurado/año"
      ]
    },
    {
      label: "Condiciones",
      items: [
        "Límite máximo anual (LMA) de copagos: 500€/asegurado/año",
        "Reembolso farmacia: 50% hasta 200€/año",
        "Reembolso logopedia: 50% hasta 500€/año",
        "Dental incluido: 46 actos sin coste adicional (Adeslas Dental Total)",
        "Asistencia viaje en el extranjero hasta 30.000€",
        "Chequeo médico anual incluido",
        "Prima garantizada sin incrementos durante 3 años",
        "Asegurados: hasta 62 años (>62 si mínimo 3 asegurados <60 años)",
        "Tomador: ≥18 años"
      ]
    }
  ],
  faqs: [
    {
      q: "¿Qué diferencia hay entre Plena Vital Total y Plena Total?",
      a: "Plena Total no tiene copagos en ningún servicio. Plena Vital Total sí tiene copagos pero con un tope anual de 500€ por asegurado: una vez alcanzado ese límite, el resto del año no pagas nada más. Es una opción más económica para quien no necesita usar el seguro con mucha frecuencia."
    },
    {
      q: "¿El dental está incluido en el precio?",
      a: "Sí, Adeslas Plena Vital Total incluye 46 actos dentales sin coste adicional (cobertura Adeslas Dental Total): limpiezas bucales, consulta y consulta urgente, revisión, educación bucodental, fluorizaciones, ortopantomografías, pruebas diagnósticas, estudios tomográficos, pulpotomía y más. Para el resto de actos se aplican tarifas reducidas según el tipo de clínica concertada."
    },
    {
      q: "¿Cuánto es el tope de copago anual?",
      a: "El tope máximo de copagos es de 500€ por asegurado al año. Una vez alcanzado, el resto de servicios durante ese año son sin coste. Este límite se renueva cada año de póliza."
    },
    {
      q: "¿Tiene carencias?",
      a: "El plan tiene carencias estándar similares al Plena Vital: diagnóstico de alta tecnología 3 meses, hospitalización 8 meses, maternidad 8 meses. Urgencias y medicina general están cubiertas desde el primer día. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información)."
    },
    {
      q: "¿La prima sube cada año?",
      a: "No durante los primeros 3 años. Adeslas Plena Vital Total garantiza que el precio no sube durante los 3 primeros años del contrato."
    },
    {
      q: "¿Puedo contratar el plan para toda la familia?",
      a: "Sí. Se puede contratar para toda la unidad familiar. Con 3 o más asegurados se puede acceder a descuentos familiares de hasta el 50% de reembolso en especialistas fuera de red."
    },
    {
      q: "¿Hasta qué edad puedo contratar?",
      a: "Los asegurados pueden estar hasta 62 años. Se admiten mayores de 62 años si el grupo tiene mínimo 3 asegurados menores de 60 años. El tomador debe ser ≥18 años."
    },
    {
      q: "¿Incluye asistencia en viajes?",
      a: "Sí. Adeslas Plena Vital Total incluye asistencia médica urgente en viajes dentro y fuera de España hasta un máximo de 30.000€. Esto cubre emergencias médicas, hospitalización, traslado médico y repatriación si fuera necesario."
    },
    {
      q: "¿Incluye reembolso de farmacia?",
      a: "Sí. Adeslas Plena Vital Total incluye reembolso del 50% de medicamentos financiados por el SNS, prescritos por un médico para patologías cubiertas, hasta un máximo de 200€ por asegurado y año. Para logopedia y foniatría el reembolso es del 50% hasta 500€ por asegurado y año."
    }
  ],
  showPromo: true,
  schemaFaq: true
};

export default function AdeslaPlenaVitalTotal() {
  return <ProductPageTemplate data={data} />;
}
