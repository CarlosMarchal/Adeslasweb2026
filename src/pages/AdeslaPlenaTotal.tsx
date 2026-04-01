import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/seguro-medico-asisa-completa.webp";

const data: ProductPageData = {
  seoTitle: "Seguro Médico Adeslas Plena Total | Sin Copagos + Dental + Viajes",
  seoDescription: "Adeslas Plena Total: seguro médico completo sin copagos, hospitalización ilimitada, cobertura dental (46 actos), asistencia viajes 100.000€ y accidente. Desde 83€/mes.",
  seoCanonical: "https://adeslas.marchalaseguradores.es/adeslas-plena-total",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-total.jpg",
  seoProductSchema: {
    name: "Adeslas Plena Total",
    description: "Seguro médico completo sin copagos, hospitalización, dental (46 actos), asistencia viajes 100.000€ y cobertura de accidente.",
    category: "Seguro de Salud",
    price: "83",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Seguros de Salud", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Adeslas Plena Total", url: "https://adeslas.marchalaseguradores.es/adeslas-plena-total" },
  ],
  productSlug: "/adeslas-plena-total",
  heroPromo: "Consigue puntos al contratar tu seguro ahora y conviértelos en regalos exclusivos",
  badge: "3 años sin subidas de prima",
  heroTitle: "Seguro Médico Adeslas Plena Total",
  heroImage: heroImg,
  heroHighlight: "Sin Copagos · Dental + Viajes + Accidente",
  heroSubtitle: "Cobertura médica completa sin copagos, hospitalización ilimitada, dental (46 actos), asistencia viajes 100.000€ y protección por accidente.",
  price: "83",
  pricePeriod: "mes",
  features: [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9h-3V8.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V11h-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3v3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3h3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Cobertura médica completa",
      description: "Hospitalización, especialidades, cirugía, diagnóstico"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Sin copagos",
      description: "Acceso sin coste adicional a cualquier servicio"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 11H5v2h6v-2zm0-4H5v2h6V7zm0 8H5v2h6v-2zm8-1v-3.5c0-.83-.67-1.5-1.5-1.5.5-.83.5-2.17 0-3 .83 0 1.5-.67 1.5-1.5V4c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h1c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Cobertura dental",
      description: "46 actos dentales incluidos (limpiezas, consultas, etc.)"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Asistencia viajes",
      description: "Cobertura internacional hasta 100.000€"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Cobertura de accidente",
      description: "Capital fallecimiento, incapacidad permanente"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Contrato 3 años",
      description: "Sin aumento de prima durante 3 años",
      highlight: true
    }
  ],
  cardName: "Adeslas Plena Total",
  cardDescription: "Cobertura médica completa sin copagos: hospitalización, dental (46 actos), asistencia viajes 100.000€ y protección por accidente.",
  cardCoverages: [
    "Hospitalización (médica, quirúrgica, pediátrica, psiquiátrica)",
    "Todas las especialidades médicas sin restricciones",
    "Cirugía ambulatoria y hospitalaria",
    "Diagnóstico de alta tecnología y tratamientos especiales",
    "Cobertura dental: 46 actos dentales incluidos",
    "Asistencia viajes: hasta 100.000€",
    "Cobertura de accidente: fallecimiento y incapacidad",
    "Medicina preventiva: chequeos anuales adaptados",
    "Contrato de 3 años sin aumento de prima"
  ],
  cardPill: "Sin copagos · Protección total",
  cardPillDark: true,
  cardPromoBadge: "🎁 Promoción puntos",
  tabs: [
    {
      label: "Coberturas",
      items: [
        "Medicina general, pediatría y enfermería",
        "TODAS las especialidades médicas",
        "Hospitalización ilimitada (médica, quirúrgica, pediátrica, psiquiátrica)",
        "Cirugía ambulatoria y hospitalaria",
        "Diagnóstico de alta tecnología (Resonancia, TAC, PET)",
        "Tratamientos especiales (Quimioterapia, Radioterapia, Trasplantes)",
        "Cobertura dental: 46 actos dentales (limpiezas, consultas, urgencia, etc.)",
        "Psicología clínica (máx. 20 sesiones/año) y psiquiatría",
        "Rehabilitación y fisioterapia sin límite de sesiones"
      ]
    },
    {
      label: "Incluye Además",
      items: [
        "Asistencia viajes: hasta 100.000€ (España y extranjero)",
        "Cobertura de accidente: fallecimiento por accidente 30.000€ (60.000€ por circulación)",
        "Incapacidad permanente por accidente: 30.000€",
        "Infarto de miocardio: capital 6.000€",
        "Medicina preventiva: chequeos anuales (Historia clínica, analítica, ECG, etc.)",
        "Farmacia: reembolso 50% hasta 200€/año",
        "Contrato 3 años sin aumento de prima"
      ]
    },
    {
      label: "Condiciones",
      items: [
        "SIN copagos en todos los servicios",
        "Cuestionario de Salud obligatorio",
        "Tomador: ≥18 años",
        "Asegurados: hasta 62 años (>62 si mínimo 3 asegurados <60 años)",
        "Carencias: 8 meses hospitalización/parto, 6 meses cirugía/diagnóstico especial",
        "Descuentos: 5% a partir de 3 asegurados, 10% con 4, 15% con 5+",
        "Bonificaciones por pago: trimestral 2%, semestral 4%, anual 6%"
      ]
    }
  ],
  faqs: [
    {
      q: "¿Qué cubre Adeslas Plena Total?",
      a: "Adeslas Plena Total cubre: medicina general, TODAS las especialidades, urgencias 24h, hospitalización ilimitada (médica, quirúrgica, pediátrica, psiquiátrica), cirugía ambulatoria y hospitalaria, diagnóstico de alta tecnología, tratamientos especiales (Quimioterapia, Radioterapia, Trasplantes), cobertura dental (46 actos), psicología (máx. 20 sesiones/año), rehabilitación, asistencia viajes 100.000€ y cobertura de accidente. TODO SIN COPAGOS."
    },
    {
      q: "¿Tiene copagos Adeslas Plena Total?",
      a: "No. Adeslas Plena Total NO tiene copagos. Pagas única y exclusivamente la prima mensual y accedes a TODOS los servicios sin ningún coste adicional."
    },
    {
      q: "¿Incluye cobertura dental Adeslas Plena Total?",
      a: "Sí. Incluye 46 actos dentales gratuitos: limpiezas, consulta y consulta urgente, revisión, educación bucodental, fluorizaciones, ortopantomografías, pruebas diagnósticas, estudios tomográficos, pulpotomía, entre otros."
    },
    {
      q: "¿Qué es la asistencia viajes de 100.000€?",
      a: "Adeslas Plena Total incluye asistencia médica urgente en viajes dentro y fuera de España hasta un máximo de 100.000€ por viaje. Esto cubre emergencias médicas, hospitalización, traslado médico y repatriación si es necesario."
    },
    {
      q: "¿Qué cobertura de accidente ofrece?",
      a: "Adeslas Plena Total incluye: Fallecimiento por accidente 30.000€ (60.000€ si es accidente de circulación), Fallecimiento por infarto de miocardio 6.000€, Incapacidad absoluta y permanente 30.000€ (60.000€ por accidente de circulación)."
    },
    {
      q: "¿Cuál es el contrato especial de 3 años?",
      a: "Adeslas Plena Total se contrata por 3 años sin aumento de prima. Esto significa que tu precio mensual se mantiene constante durante esos 3 años, sin incremento por edad o por cualquier otra causa."
    },
    {
      q: "¿Incluye farmacia?",
      a: "Sí. Adeslas Plena Total incluye reembolso de farmacia al 50% de medicamentos financiados por el SNS, hasta un máximo de 200€ por asegurado y año."
    },
    {
      q: "¿Qué chequeos incluye la medicina preventiva?",
      a: "Incluye chequeos anuales adaptados por edad: hasta 30 años (historia clínica, exploración, analítica, ECG, radiografía tórax, examen ginecológico, agudeza visual, audiometría, espirometría). De 31-45 (más ecografía mamaria y abdominal). Desde 46 (más analítica PSA, ecografía ginecológica/prostática, prueba de esfuerzo)."
    },
    {
      q: "¿Necesito cuestionario de salud?",
      a: "Sí. Adeslas Plena Total requiere Cuestionario de Salud obligatorio para todos los asegurados (evaluación médica previa)."
    },
    {
      q: "¿Hasta qué edad puedo contratar?",
      a: "Los asegurados pueden contratar hasta los 70 años. Se admiten mayores de 70 años si el grupo tiene mínimo 3 asegurados menores de 60 años. El tomador debe ser ≥18 años."
    },
    {
      q: "¿Qué descuentos tiene Adeslas Plena Total?",
      a: "Descuentos por número de asegurados: 5% con 3 asegurados, 10% con 4, 15% con 5 o más. Bonificaciones por forma de pago: trimestral 2%, semestral 4%, anual 6%."
    },
    {
      q: "¿Cubre trasplantes?",
      a: "Sí. Adeslas Plena Total cubre trasplantes de médula ósea autóloga y córnea, así como prótesis e implantes necesarios por indicación médica."
    },
    {
      q: "¿Qué módulos complementarios puedo añadir?",
      a: "Puedes añadir: Adeslas DENTAL FAMILIA (15% descuento), Plus Ginecología y Pediatría, Plus Clínica Universitaria de Navarra."
    },
    {
      q: "¿Por qué elegir Adeslas Plena Total?",
      a: "Adeslas Plena Total es la opción más completa: sin copagos, con dental incluida (46 actos), asistencia viajes 100.000€, cobertura de accidente, contrato 3 años sin aumento de prima. Es el seguro de máxima protección si buscas tranquilidad total."
    }
  ],
  showPromo: true,
  schemaFaq: true
};

export default function AdeslaPlenaTotal() {
  return <ProductPageTemplate data={data} />;
}
