import SegmentPageTemplate from "@/components/SegmentPageTemplate";
import type { SegmentPageData } from "@/components/SegmentPageTemplate";
import heroBg from "@/assets/Embarazadas.jpg";

const data: SegmentPageData = {
  heroBg,
  seo: {
    title: "Adeslas Embarazo | Seguro Médico para Embarazadas con Parto y Neonatología",
    description: "Seguro médico para embarazadas Adeslas: seguimiento prenatal completo, parto cubierto (vaginal y cesárea), neonatología y postparto. Sin copagos. Desde 50,92€/mes.",
    canonical: "https://adeslas.marchalaseguradores.es/seguro-medico-embarazadas",
    ogImage: "https://adeslas.marchalaseguradores.es/og-embarazadas.jpg",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
      { name: "Seguros Médicos", url: "https://adeslas.marchalaseguradores.es/" },
      { name: "Seguro Embarazadas", url: "https://adeslas.marchalaseguradores.es/seguro-medico-embarazadas" },
    ],
  },
  heroTitle: "Seguro Médico Adeslas para el Embarazo y el Parto",
  heroSubtitle: "Seguro Adeslas con cobertura completa en embarazo, parto y neonatología. Seguimiento prenatal sin límites de visitas y la mejor atención en el momento que más importa.",
  heroPromo: "Consigue puntos al contratar tu seguro ahora y conviértelos en regalos exclusivos",
  contentTitle: "Protege tu embarazo y a tu bebé desde el primer día",
  contentDescription: "El embarazo es uno de los momentos más importantes de tu vida y requiere la mejor atención médica. Adeslas cubre todo el proceso: consultas con ginecólogo, ecografías sin límite, análisis prenatales, parto hospitalario (vaginal o cesárea), habitación individual, neonatología para el recién nacido y seguimiento postparto. Sin copagos, sin sorpresas, con los mejores hospitales privados de España.",
  contentFeatures: [
    { title: "Seguimiento prenatal completo", description: "Todas las consultas con ginecólogo, ecografías y pruebas diagnósticas sin límite de visitas." },
    { title: "Parto hospitalario cubierto", description: "Parto vaginal o cesárea (programada o de urgencia) en habitación individual privada, sin coste adicional." },
    { title: "Neonatología para tu bebé", description: "El recién nacido tiene cobertura médica completa desde el primer momento: pediatra, neonatólogo y UCI neonatal si fuera necesario." },
    { title: "Apoyo en lactancia y postparto", description: "Asesoramiento en lactancia materna, revisiones postparto y apoyo psicológico perinatal incluidos." },
  ],
  productsTitle: "Planes para embarazadas recomendados",
  productsSubtitle: "Elige el plan que mejor se adapte a tu situación",
  recommendedProducts: [
    {
      name: "Adeslas Plena Vital",
      slug: "/adeslas-plena-vital",
      price: "38",
      badge: "Económico",
      features: ["Seguimiento prenatal ambulatorio", "Ginecólogo sin lista de espera", "Ecografías y analíticas incluidas", "Urgencias obstétricas 24h", "Sin hospitalización programada"],
      highlighted: false,
      promoBadge: "🎁 Promoción puntos",
    },
    {
      name: "Adeslas Plena Total",
      slug: "/adeslas-plena-total",
      price: "83",
      badge: "Recomendado",
      features: ["Parto vaginal y cesárea cubiertos", "Hospitalización ilimitada sin copago", "Neonatología para el recién nacido", "Sin copagos durante todo el embarazo", "3 años sin subida de precio"],
      highlighted: true,
      promoBadge: "🎁 Promoción puntos",
    },
    {
      name: "Adeslas Extra 150",
      slug: "/adeslas-extra-150",
      price: "90",
      badge: "Máxima Cobertura",
      features: ["Libre elección de ginecólogo y hospital", "Reembolso hasta 90% del gasto", "Válido en centros públicos y privados", "Cobertura psicológica perinatal", "Cobertura internacional ilimitada"],
      highlighted: false,
    },
  ],
  tarificadorTitle: "Calcula tu precio personalizado",
  tarificadorSubtitle: "Obtén un presupuesto según tu edad y situación",
  faqs: [
    { question: "¿Puedo contratar un seguro Adeslas si ya estoy embarazada?", answer: "Sí, Adeslas permite contratar durante el embarazo. Sin embargo, algunas coberturas relacionadas con el parto pueden tener condiciones si el embarazo está muy avanzado al contratar. Lo ideal es contratar antes del embarazo o en las primeras semanas de gestación para tener todas las coberturas activas desde el inicio." },
    { question: "¿Está cubierto el parto por cesárea con Adeslas?", answer: "Sí, tanto la cesárea programada como la cesárea de urgencia están completamente cubiertas con Adeslas Plena Plus y Adeslas Plena Total. No hay copago ni límite de coste. La atención se realiza en hospitales privados de la red Adeslas con habitación individual." },
    { question: "¿Cuántas ecografías y consultas prenatales cubre Adeslas?", answer: "Adeslas no limita el número de visitas al ginecólogo ni de ecografías durante el embarazo. Puedes hacer todas las revisiones que tu médico considere necesarias, incluidas ecografías de morfología, Doppler y pruebas de bienestar fetal, sin coste adicional." },
    { question: "¿Qué complicaciones del embarazo están cubiertas?", answer: "Adeslas cubre todas las complicaciones médicas del embarazo: diabetes gestacional, hipertensión, preeclampsia, amenaza de parto prematuro, placenta previa, pérdida gestacional y hospitalización por cualquier causa obstétrica. El seguro cubre tanto la madre como al bebé desde el nacimiento." },
    { question: "¿Incluye Adeslas la epidural en el parto?", answer: "Sí. La anestesia epidural durante el parto está incluida sin coste adicional en todos los planes que cubren parto hospitalario (Adeslas Plena, Adeslas Plena Plus y Adeslas Plena Total). El anestesiólogo forma parte del equipo médico cubierto por la póliza." },
    { question: "¿Mi bebé está cubierto desde que nace?", answer: "Sí. El recién nacido tiene cobertura desde el primer momento con acceso a pediatra, neonatólogo y, si fuera necesario, UCI neonatal. Tras el alta, se recomienda contratar una póliza individual para el bebé para mantener la continuidad asistencial." },
    { question: "¿Puedo elegir el hospital donde dar a luz con Adeslas?", answer: "Con Adeslas Plena Plus puedes elegir cualquier hospital de la red Adeslas en tu provincia. Con Adeslas Plena Total tienes además asistencia en viajes 100.000€ y mayor cobertura integral." },
    { question: "¿Cubre Adeslas la psicología perinatal y depresión postparto?", answer: "Con Adeslas Plena Plus y Adeslas Plena Total, la atención psicológica y psiquiátrica está incluida (hasta 20 sesiones/año), cubriendo trastornos perinatales como la depresión postparto, ansiedad durante el embarazo y otras necesidades de salud mental materna." },
    { question: "¿El seguro cubre pruebas genéticas prenatales como el test de Downs?", answer: "Adeslas cubre las pruebas de cribado prenatal estándar incluidas en el protocolo obstétrico. Para pruebas genéticas avanzadas como el cribado de ADN fetal en sangre materna (NIPT), consulta las condiciones específicas del plan elegido." },
    { question: "¿Qué incluye exactamente el postparto con Adeslas?", answer: "El postparto con Adeslas incluye: revisión ginecológica a las 6 semanas, control de la cicatrización (vaginal o de cesárea), asesoramiento en lactancia materna, apoyo psicológico si se necesita, y seguimiento pediátrico del recién nacido. Todo sin copagos adicionales en los planes Adeslas Plena Plus y Adeslas Plena Total." },
    { question: "¿Tiene carencia la cobertura de parto en Adeslas?", answer: "Si contratas Adeslas antes del embarazo, no hay carencias y todas las coberturas obstétricas están activas desde el primer día. Si contratas ya embarazada, puede aplicarse un período de espera para la cobertura del parto según el trimestre de gestación. Consulta con tu asesor para tu caso concreto. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información)." },
    { question: "¿Cuánto cuesta un seguro médico para embarazadas con Adeslas?", answer: "El precio depende de la edad y el plan elegido. Para una mujer de 30 años, Adeslas Plena Plus (con cobertura de parto completa) parte desde aproximadamente 72€/mes. Con Adeslas Plena Total (dental + viajes incluidos) desde 99€/mes. Usa el calculador de esta página para obtener tu presupuesto exacto en menos de 2 minutos." },
  ],
  schemaFaq: true,
};

export default function SeguroEmbarazadas() {
  return <SegmentPageTemplate data={data} />;
}
