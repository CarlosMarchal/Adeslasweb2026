import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/seguro-medico-adeslas-extra-150.webp";

const data: ProductPageData = {
  seoTitle: "Adeslas Extra 150 | Seguro Médico Libre Elección · Reembolso 80%",
  seoDescription:
    "Adeslas Plena Extra 150: seguro médico sin copagos que combina red Adeslas (libre elección) con reembolso 80% fuera de red. Máximo 150.000€/año. Desde 90€/mes.",
  seoCanonical: "https://adeslas.numero1salud.es/seguro-salud/adeslas-extra-150/",
  seoOgImage: "https://adeslas.numero1salud.es/og-extra-150.jpg",
  seoProductSchema: {
    name: "Adeslas Plena Extra 150",
    description: "Seguro médico sin copagos con libre elección total (red Adeslas + reembolso 80% fuera de red). Máximo 150.000€/año.",
    category: "Seguro de Salud",
    price: "90",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    { name: "Seguros de Salud", url: "https://adeslas.numero1salud.es/" },
    { name: "Adeslas Plena Extra 150", url: "https://adeslas.numero1salud.es/seguro-salud/adeslas-extra-150/" },
  ],
  productSlug: "/seguro-salud/adeslas-extra-150/",
  heroPromo: "Consigue puntos al contratar tu seguro ahora y conviértelos en regalos exclusivos",
  cardPromoBadge: "🎁 Promoción puntos",
  badge: "Libre elección · Reembolso 80% · Máx. 150.000€/año",
  heroTitle: "Seguro Médico Adeslas Extra 150",
  heroImage: heroImg,
  heroHighlight: "Libre Elección de Médico · Reembolso 80%",
  heroSubtitle:
    "Sin copagos. Elige entre la red Adeslas (+51.000 médicos) o cualquier médico en España/extranjero. Reembolsamos 80% de costos. Máximo garantizado 150.000€/año.",
  price: "90",
  cardName: "Adeslas Plena Extra 150",
  cardDescription:
    "Seguro sin copagos con libertad total: utiliza red Adeslas o reembolsamos 80% si eliges otro profesional. Máximo 150.000€/año.",
  cardPill: "Sin copagos · Libre elección + Reembolso",
  cardPillDark: false,
  cardCoverages: [
    "Sin copagos en cuadro médico Adeslas",
    "Reembolso 80% fuera de red (máx. 150.000€/año)",
    "Hospitalización ilimitada (médica, quirúrgica, psiquiátrica)",
    "Todas las especialidades médicas",
    "Cirugía con hospitalización psiquiátrica 60 días/año",
    "Trasplantes: pulmón, hígado, corazón, médula ósea, riñón",
    "Diagnóstico de alta tecnología sin limitación",
    "Pago dentro de 15 días hábiles si usa reembolso",
    "Máximo garantizado 150.000€/año"
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
      description: "Cobertura internacional hasta 12.000€",
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
        "Medicina general y TODAS las especialidades",
        "Hospitalización ilimitada (médica, quirúrgica, pediátrica, psiquiátrica)",
        "Cirugía ambulatoria y hospitalaria",
        "Urgencias 24h domiciliarias y ambulatorias",
        "Diagnóstico de alta tecnología (Resonancia, TAC, PET)",
        "Tratamientos especiales (Quimioterapia, Radioterapia, Diálisis)",
        "Trasplantes: pulmón, hígado, corazón, médula ósea, riñón",
        "Psicología clínica y psiquiatría (hospitalización psiquiátrica 60 días/año)",
        "Rehabilitación y fisioterapia (máx. 1.500€/año)"
      ],
    },
    {
      label: "Modalidades de Pago",
      items: [
        "MODALIDAD 1: Cuadro Médico Adeslas - Libre elección sin copagos",
        "MODALIDAD 2: Reembolso - Elige cualquier médico/centro en España o extranjero, nosotros reembolsamos 80% del coste",
        "MODALIDAD 3: Combinada - Puedes usar ambas modalidades para diferentes servicios médicos",
        "Pago reembolso: dentro de 15 días hábiles",
        "Máximo anual garantizado: 150.000€",
        "Límites por servicio: Cirugía 40.000€, Asistencia Ambulatoria 40.000€, Prótesis 3.500€/año"
      ],
    },
    {
      label: "Condiciones",
      items: [
        "SIN copagos en cuadro médico Adeslas",
        "Reembolso 80% fuera de red (máximo 150.000€/año)",
        "Cuestionario de Salud obligatorio",
        "Tomador: ≥18 años",
        "Asegurados: hasta 64 años (>64 si mínimo 3 asegurados <60 años)",
        "Carencias: 8 meses hospitalización/parto, 6 meses cirugía/diagnóstico",
        "Descuentos: 10% a partir de 4 asegurados",
        "Bonificaciones: trimestral 2%, semestral 4%, anual 6%"
      ],
    },
  ],
  faqs: [
    {
      q: "¿Qué cubre Adeslas Plena Extra 150?",
      a: "Adeslas Plena Extra 150 cubre TODAS las especialidades médicas, hospitalización ilimitada (médica, quirúrgica, psiquiátrica), cirugía, urgencias 24h, diagnóstico de alta tecnología, trasplantes (pulmón, hígado, corazón, médula ósea, riñón), psicología, rehabilitación y tratamientos especiales. SIN copagos en la red Adeslas. Con reembolso 80% fuera de red (máx. 150.000€/año)."
    },
    {
      q: "¿Cómo funciona el reembolso 80% fuera de red?",
      a: "Adeslas Plena Extra 150 tiene DOS modalidades: 1) CUADRO MÉDICO: usas red Adeslas (+51.000 médicos) SIN copagos. 2) REEMBOLSO: eliges cualquier médico/centro en España o extranjero, pagas en el momento y Adeslas reembolsa 80% del coste dentro de 15 días hábiles. Puedes combinar ambas modalidades."
    },
    {
      q: "¿Cuál es el límite máximo anual (150.000€)?",
      a: "Es el máximo garantizado que Adeslas pagará por TODOS los servicios en el año. Incluye: Asistencia Ambulatoria máx. 40.000€, Cirugía máx. 40.000€, Hospitalización sin límite de gastos razonables, Trasplantes máx. 150.000€/año (especialmente para trasplantes de órganos complejos), Prótesis máx. 3.500€/año, Rehabilitación máx. 1.500€/año, Psicoterapia máx. 1.500€/año."
    },
    {
      q: "¿Tiene copagos Adeslas Plena Extra 150?",
      a: "NO. Adeslas Plena Extra 150 tiene CERO copagos cuando utilizas la red Adeslas (+51.000 médicos). Si eliges profesional fuera de red, tú pagas 100% en el momento y Adeslas reembolsa 80%, lo que significa tu copago efectivo es 20%."
    },
    {
      q: "¿Cubre trasplantes?",
      a: "Sí. Cubre trasplantes de ÓRGANOS: pulmón, hígado, corazón, médula ósea y riñón (hasta 150.000€/año). También cubre trasplante de córnea (hasta 10.000€/año). Esto es una ventaja importante comparado con otros seguros."
    },
    {
      q: "¿Cuál es la diferencia entre Adeslas Plena Extra 150 y Adeslas Plena Total?",
      a: (<>La cobertura médica es similar. <Link to="/seguro-salud/adeslas-plena-total/" style={{color: "#009FE3", textDecoration: "underline"}}>Adeslas Plena Total</Link> es SIN copagos pero limitado a red Adeslas, incluye dental (46 actos), asistencia viajes 100.000€ y cobertura de accidente. Adeslas Plena Extra 150 ofrece LIBERTAD TOTAL: usas red Adeslas sin copagos, o cualquier médico reembolso 80%. Ideal si viajas habitualmente o necesitas especialistas específicos fuera de red.</>)
    },
    {
      q: "¿Puedo usar Adeslas Plena Extra 150 en el extranjero?",
      a: "Sí. Puedes acceder a cualquier médico o centro en el extranjero. La modalidad de reembolso funciona en España y en el extranjero. Paga en el momento y Adeslas reembolsa 80% dentro de 15 días hábiles, sujeto a los límites máximos por servicio."
    },
    {
      q: "¿Hospitalización psiquiátrica tiene límite?",
      a: "Sí. Adeslas Plena Extra 150 cubre hospitalización psiquiátrica hasta 60 días/año (más que otros seguros que cubren 50 días). La cobertura es en red Adeslas sin copagos."
    },
    {
      q: "¿Necesito cuestionario de salud?",
      a: "Sí. Adeslas Plena Extra 150 requiere Cuestionario de Salud obligatorio para todos los asegurados (evaluación médica previa)."
    },
    {
      q: "¿Hasta qué edad puedo contratar?",
      a: "Los asegurados pueden contratar hasta los 70 años. Se admiten mayores de 70 años si el grupo tiene mínimo 3 asegurados menores de 60 años. El tomador debe ser ≥18 años. IMPORTANTE: Edad límite es 64, NO 70 como otros seguros."
    },
    {
      q: "¿Cuánto tiempo tarda el reembolso?",
      a: "Adeslas reembolsa dentro de 15 días hábiles desde que recibes la factura/documentación médica. Debes presentar: factura original, comprobante de pago, informe médico del servicio realizado."
    },
    {
      q: "¿Qué descuentos y bonificaciones tiene?",
      a: "Descuentos por número de asegurados: 10% a partir de 4 asegurados. Bonificaciones por forma de pago: trimestral 2%, semestral 4%, anual 6%. Módulo complementario: Adeslas DENTAL FAMILIA (15% descuento)."
    }
  ],
  schemaFaq: true,
  showPromo: true,
};

const AdeslaExtra150 = () => <ProductPageTemplate data={data} />;
export default AdeslaExtra150;
