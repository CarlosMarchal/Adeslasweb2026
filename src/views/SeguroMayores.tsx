import SegmentPageTemplate from "@/components/SegmentPageTemplate";
import type { SegmentPageData } from "@/components/SegmentPageTemplate";
import heroBg from "@/assets/seguro-salud-adeslas-mayores.webp";

const data: SegmentPageData = {
  heroBg,
  seo: {
    title: "Adeslas Seniors | Seguro Médico para Personas Mayores de 55 años desde 67,50€/mes",
    description: "Seguros médicos Adeslas específicos para personas de 55 a 84 años. Adeslas Seniors desde 67,50€/mes y Adeslas Seniors Total desde 101€/mes. Asesor de salud personal, hospitalización completa y garantía de precio 3 años. Sin listas de espera.",
    canonical: "https://adeslas.numero1salud.es/seguro-salud/seguro-para-personas-mayores/",
    ogImage: "https://adeslas.numero1salud.es/og-mayores.jpg",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
      { name: "Seguros Médicos", url: "https://adeslas.numero1salud.es/" },
      { name: "Seguro Personas Mayores", url: "https://adeslas.numero1salud.es/seguro-salud/seguro-para-personas-mayores/" },
    ],
  },
  heroTitle: "Seguro de Salud Adeslas para Personas Mayores",
  heroSubtitle: "Seguros médicos diseñados específicamente para personas de 55 a 84 años: asesor de salud personal, más de 40 especialidades, hospitalización completa y precios garantizados.",
  heroPromo: "Consigue puntos al contratar tu seguro ahora y conviértelos en regalos exclusivos",
  contentTitle: "Cobertura médica especializada para mayores de 55",
  contentDescription: "Adeslas dispone de dos seguros médicos diseñados exclusivamente para personas de 55 a 84 años: Adeslas Seniors (55-84 años) y Adeslas Seniors Total (63-84 años). Ambos incluyen asesor de salud personal, todas las especialidades médicas, hospitalización en habitación individual con cama para acompañante y los medios de diagnóstico más avanzados.",
  contentFeatures: [
    { title: "Asesor Médico de Salud personal", description: "Un profesional médico asignado que te orienta hacia el especialista adecuado, gestiona autorizaciones y reduce tus copagos ambulatorios a un máximo de 250€ al año cuando accedes a través de él." },
    { title: "Más de 40 especialidades médicas", description: "Acceso completo a geriatría, cardiología, oncología, traumatología, neurología, dermatología y más de 40 especialidades. Sin lista de espera ni derivaciones previas." },
    { title: "Hospitalización en habitación individual", description: "Ingreso médico, quirúrgico y psiquiátrico en habitación individual con cama para acompañante. UCI y cuidados intensivos incluidos." },
    { title: "Diagnóstico de alta tecnología", description: "TAC, resonancias magnéticas, pruebas genéticas, PET, colonoscopia, ecografías y toda la tecnología diagnóstica disponible en la red Adeslas." },
  ],
  productsTitle: "Planes específicos para personas mayores",
  productsSubtitle: "Elige el plan que mejor se adapte a tu edad y necesidades",
  recommendedProducts: [
    {
      name: "Adeslas Seniors",
      slug: "/seguro-salud/adeslas-seniors/",
      price: "67,50",
      badge: "Para 55-84 años",
      features: ["Acceso a +40 especialidades médicas", "Hospitalización en habitación individual", "Asesor Médico de Salud personal", "Copago ambulatorio máx. 250€/año (vía asesor)", "Asistencia internacional 12.000€/año"],
      highlighted: false,
      promoBadge: "🎁 Promoción puntos",
    },
    {
      name: "Adeslas Seniors Total",
      slug: "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/",
      price: "101",
      badge: "Recomendado · 63-84 años",
      features: ["Todo lo de Seniors más:", "Dental: 46 actos incluidos + 50% primer implante", "Chequeo médico anual preventivo", "Asistencia viajes hasta 100.000€", "3 años sin subida de prima garantizados"],
      highlighted: true,
      promoBadge: "🎁 Promoción puntos",
    },
  ],
  tarificadorTitle: "Calcula tu precio personalizado",
  tarificadorSubtitle: "Obtén un presupuesto para Adeslas Seniors según tu edad y provincia",
  faqs: [
    { question: "¿Cuál es la diferencia entre Adeslas Seniors y Adeslas Seniors Total?", answer: "Adeslas Seniors está diseñado para personas de 55 a 84 años (se admiten de 50 a 54 si van acompañados de alguien de 55+). Adeslas Seniors Total es para personas de 63 a 84 años (se admiten de 60 a 62 si van con alguien de 63+). Las coberturas médicas son las mismas, pero Seniors Total añade: dental con 46 actos incluidos + 50% en primer implante, chequeo médico anual (copago 50€), asistencia en viajes hasta 100.000€, reembolso de fisioterapia/podología/farmacia y garantía de precio sin subidas durante 3 años." },
    { question: "¿Hasta qué edad puedo contratar Adeslas Seniors?", answer: "Adeslas Seniors acepta nuevas contrataciones hasta los 84 años, lo que lo convierte en uno de los pocos seguros del mercado que permite acceder a cobertura médica completa en edades avanzadas. Es obligatorio un cuestionario de salud específico para este segmento." },
    { question: "¿Qué es el Asesor Médico de Salud y para qué sirve?", answer: "El Asesor Médico de Salud es un profesional médico asignado personalmente que te orienta hacia el especialista más adecuado para cada consulta. Cuando accedes a la asistencia ambulatoria a través de él, el copago total anual tiene un tope de 250€/año. En acceso libre (sin pasar por el asesor), no hay límite de copago, aunque los copagos por consulta son algo más elevados." },
    { question: "¿Qué copagos tiene Adeslas Seniors?", answer: "Accediendo vía Asesor Médico de Salud: consultas 5€, análisis 9€, ecografía 9€, TAC/resonancia 30€. El límite máximo anual ambulatorio es 250€/año. En acceso libre: consultas 17€, TAC/resonancia 100€, sin límite anual. Copago hospitalario: 100€/día de ingreso (médico o quirúrgico), urgencia hospitalaria 25€, con un límite máximo anual hospitalario de 800€." },
    { question: "¿Qué copagos tiene Adeslas Seniors Total?", answer: "Los mismos copagos que Adeslas Seniors: accediendo vía asesor, consultas 5€, análisis 9€, TAC/resonancia 30€, con tope de 250€/año. Además incluye el chequeo médico anual con copago específico de 50€ (que NO computa para el tope de 250€). Los copagos hospitalarios son idénticos, con tope de 800€/año." },
    { question: "¿Adeslas Seniors Total cubre la prima sin subidas?", answer: "Sí. Adeslas Seniors Total garantiza que la prima no sube durante los 3 primeros años del contrato. A partir del año 4, puede ajustarse con transparencia y preaviso, pero los primeros 3 años el precio está completamente bloqueado." },
    { question: "¿Qué dental incluye Adeslas Seniors Total?", answer: "Adeslas Seniors Total incluye 46 actos dentales sin coste adicional: limpiezas bucales, consulta y consulta urgente, revisión, educación bucodental, fluorizaciones, ortopantomografías, pruebas diagnósticas, estudios tomográficos, pulpotomía, entre otros. Además, incluye un 50% de descuento en el primer implante dental en una Clínica Dental Adeslas." },
    { question: "¿Qué incluye el chequeo médico anual de Seniors Total?", answer: "El chequeo anual preventivo de Adeslas Seniors Total incluye historia clínica y exploración general, ECG, radiografía de tórax, analítica completa (serie roja, fórmula, VSS, glucosa, ácido úrico, colesterol, triglicéridos, PSA), ecografía abdominal y examen ginecológico con citología vaginal, ecografía mamaria y mamografía según criterio médico. El copago es de 50€ y no computa para el límite ambulatorio anual." },
    { question: "¿Cubre enfermedades preexistentes?", answer: "Sí. Adeslas Seniors acepta preexistencias. Es obligatorio declarar todas las enfermedades en el cuestionario de salud específico. Las condiciones se estudian individualmente: en algunos casos se aplican exclusiones o sobreprimas para ciertas patologías preexistentes." },
    { question: "¿Hay descuentos por contratar varios asegurados?", answer: "Sí. Adeslas Seniors aplica un 10% de descuento a partir de tres asegurados en póliza. Adeslas Seniors Total aplica: 5% con 3 asegurados, 10% con 4, y 15% con 5 o más. Además, ambos tienen bonificaciones por pago: 2% trimestral, 4% semestral, 6% anual." },
    { question: "¿Cuándo entran en vigor las coberturas?", answer: "La mayoría de coberturas están disponibles desde el primer día: medicina general, urgencias, especialidades ambulatorias y pruebas básicas. Las carencias más habituales son: medios de diagnóstico de alta tecnología (3 meses), hospitalización programada (8 meses), intervenciones quirúrgicas (8 meses), quimioterapia y oncología radioterápica (8 meses). Las urgencias vitales no tienen carencia. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información)." },
    { question: "¿Puedo añadir el módulo dental al seguro Seniors?", answer: "Sí. Adeslas Seniors permite contratar Adeslas DENTAL FAMILIA como módulo complementario, con un 15% de descuento sobre la tarifa del seguro dental. Recuerda que Adeslas Seniors Total ya incluye 46 actos dentales y no necesita módulo adicional para cobertura básica." },
  ],
  schemaFaq: true,
};

export default function SeguroMayores() {
  return <SegmentPageTemplate data={data} />;
}
