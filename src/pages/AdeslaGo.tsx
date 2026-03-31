import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/seguro-medico-asisa-ya.webp";

const data: ProductPageData = {
  seoTitle: "Seguro Adeslas GO | Seguro Ambulatorio desde 21€/mes",
  seoDescription: "Adeslas GO: seguro médico ambulatorio con copagos limitados a 260€/año. Medicina general, especialidades, chequeo médico anual y más. Sin hospitalización ni cirugía. Desde 21€/mes.",
  seoCanonical: "https://adeslas.marchalaseguradores.es/adeslas-go",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-go.jpg",
  seoProductSchema: {
    name: "Adeslas GO",
    description: "Seguro médico ambulatorio con copagos limitados a 260€/año. Medicina general, especialidades, chequeo médico anual. Desde 21€/mes.",
    category: "Seguro de Salud",
    price: "21",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Seguros de Salud", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Adeslas GO", url: "https://adeslas.marchalaseguradores.es/adeslas-go" },
  ],
  productSlug: "/adeslas-go",
  badge: "Ambulatorio · LMA 260€/año",
  heroTitle: "Seguro Médico Adeslas GO",
  heroImage: heroImg,
  heroHighlight: "Ambulatorio · LMA 260€/año",
  heroSubtitle: "Asistencia médica ambulatoria con copagos limitados. Medicina general, especialidades, chequeo anual adaptado a tu edad.",
  price: "21",
  pricePeriod: "mes",
  features: [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.8 10.9c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0l-3.72 3.72c-.39.39-.39 1.02 0 1.41l3.72 3.72c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L8.69 12l3.11-3.1zm.02-2.6l3.72-3.72c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 9l3.72 3.72c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0l-3.72-3.72c-.39-.39-.39-1.02 0-1.41z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Copagos limitados",
      description: "Máximo 260€/año por asegurado"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Chequeo médico anual",
      description: "Adaptado por edad y sexo, incluido"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 11H5v2h6v-2zm0-4H5v2h6V7zm0 8H5v2h6v-2zm8-1v-3.5c0-.83-.67-1.5-1.5-1.5.5-.83.5-2.17 0-3 .83 0 1.5-.67 1.5-1.5V4c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h1c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Especialidades médicas",
      description: "Medicina general, pediatría, enfermería y más"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Descuento dental",
      description: "Módulo Adeslas DENTAL FAMILIA con 15% descuento"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Sin hospitalización",
      description: "Cobertura ambulatoria únicamente"
    }
  ],
  cardName: "Adeslas GO",
  cardDescription: "Asistencia médica ambulatoria con copagos limitados a 260€/año. Medicina general, especialidades, chequeo médico anual.",
  cardCoverages: [
    "Medicina general, pediatría, enfermería",
    "Especialidades médicas variadas",
    "Chequeo médico anual (adaptado por edad y sexo)",
    "Pruebas diagnósticas de alta tecnología",
    "Descuento dental: módulo Adeslas DENTAL FAMILIA 15%",
    "Podología (hasta 12 sesiones/año)"
  ],
  cardPill: "Copagos LMA 260€ · Ambulatorio",
  cardPillDark: false,
  tabs: [
    {
      label: "Coberturas",
      items: [
        "Medicina general a domicilio y en consulta",
        "Pediatría y enfermería",
        "Especialidades médicas variadas",
        "Medios de diagnóstico de alta tecnología",
        "Chequeo médico anual adaptado por edad y sexo",
        "Pruebas prenatales y preparación al parto",
        "Podología (hasta 12 sesiones/año)",
        "Análisis clínicos y radiología"
      ]
    },
    {
      label: "Descuentos y ampliaciones",
      items: [
        "Descuento dental: módulo Adeslas DENTAL FAMILIA con 15% descuento",
        "Descuento 10% a partir de 2 asegurados",
        "Bonificaciones por forma de pago: trimestral 2%, semestral 4%, anual 6%",
        "Libre elección entre 40.000+ médicos y 1.000+ centros"
      ]
    },
    {
      label: "Condiciones",
      items: [
        "Cobertura ambulatoria sin hospitalización ni cirugía",
        "Límite máximo anual (LMA) 260€ para edades 0-54 años",
        "Tres copagos gratuitos/año por asegurado ≤16€",
        "Sin cuestionario de salud (sin requisitos médicos previos)",
        "Tomador: persona física ≥18 años",
        "Asegurados: hasta 70 años (>70 si mínimo 3 asegurados <60 años)"
      ]
    }
  ],
  faqs: [
    {
      q: "¿Qué cubre Adeslas GO?",
      a: "Adeslas GO cubre asistencia médica ambulatoria: medicina general, pediatría, enfermería, especialidades médicas, medios de diagnóstico de alta tecnología, chequeo médico anual adaptado por edad y sexo, pruebas prenatales, podología (hasta 12 sesiones/año). No incluye hospitalización ni cirugía. Puedes añadir el módulo Adeslas DENTAL FAMILIA con 15% descuento."
    },
    {
      q: "¿Tiene copagos Adeslas GO?",
      a: "Sí, Adeslas GO tiene copagos con un límite máximo anual (LMA) de 260€ por asegurado para edades 0-54 años. Copagos: MG 9€, Pediatría 10€, Enfermería 4€, Especialidades 16€, Psicología 16€, Rehabilitación 6€, Alta tecnología 70€, Resonancia 120€, Podología 5€, Chequeo 50€. Desde 1ª renovación con 25% descuento: MG 6,75€, Ped 7,50€, Especialidades 12€, Alta tecn 52,50€, RM 90€, Podología 3,75€, Chequeo 37,50€. Una vez alcanzado el límite, los servicios restantes son gratuitos."
    },
    {
      q: "¿Cuál es el límite máximo de copagos anuales?",
      a: "El límite máximo anual (LMA) es 260€ por asegurado para asegurados de 0-54 años. Esto garantiza que nunca pagarás más de esa cantidad en copagos al año, independientemente de cuántas veces uses el seguro. Además, tienes 3 copagos gratuitos al año si son ≤16€."
    },
    {
      q: "¿Puedo añadir dental a Adeslas GO?",
      a: "Sí. Puedes añadir el módulo complementario Adeslas DENTAL FAMILIA con 15% de descuento sobre la tarifa de DENTAL FAMILIA."
    },
    {
      q: "¿Incluye el chequeo médico anual?",
      a: "Sí. Adeslas GO incluye chequeo médico anual adaptado a tu edad y sexo. Este chequeo forma parte de la cobertura preventiva del producto."
    },
    {
      q: "¿Qué diferencia hay entre Adeslas GO y Adeslas Plena Vital?",
      a: (<>La principal diferencia es la cobertura: Adeslas GO es ambulatorio (sin hospitalización ni cirugía), mientras que <Link to="/adeslas-plena-vital" style={{color: "#009FE3", textDecoration: "underline"}}>Adeslas Plena Vital</Link> incluye hospitalización y cirugía completas, urgencias 24h y todas las especialidades. GO tiene un LMA de copagos de 260€/año desde 21€/mes; Plena Vital tiene un LMA de 300€/año desde 38€/mes. Si necesitas cobertura hospitalaria o urgencias, Plena Vital es la opción correcta.</>)
    },
    {
      q: "¿Incluye hospitalización Adeslas GO?",
      a: "No. Adeslas GO es un producto de cobertura ambulatoria exclusivamente. No incluye hospitalización ni cirugía. Si necesitas cobertura hospitalaria, debes contratar Adeslas Plena Vital, Adeslas Plena Total o Adeslas Plena Plus."
    },
    {
      q: "¿Necesito cuestionario de salud para contratar Adeslas GO?",
      a: "No. Adeslas GO no requiere cuestionario de salud. Puedes contratar sin necesidad de ser sometido a evaluación médica previa."
    },
    {
      q: "¿Incluye urgencias Adeslas GO?",
      a: "No. Adeslas GO es un producto ambulatorio que no incluye urgencias. Para cobertura de urgencias necesitas un plan con asistencia completa como Adeslas Plena Vital, Adeslas Plena Plus o Adeslas Plena Total."
    },
    {
      q: "¿Qué descuentos tiene Adeslas GO?",
      a: "Adeslas GO ofrece descuento del 10% a partir de 2 asegurados. Además, tienes bonificaciones por forma de pago: trimestral 2%, semestral 4%, anual 6%."
    },
    {
      q: "¿Hasta qué edad puedo contratar Adeslas GO?",
      a: "Los asegurados pueden estar hasta 70 años. Se admiten mayores de 70 años si el grupo tiene mínimo 3 asegurados menores de 60 años. El tomador debe ser persona física con ≥18 años."
    }
  ],
  showPromo: true,
  schemaFaq: true
};

export default function AdeslaGo() {
  return <ProductPageTemplate data={data} />;
}
