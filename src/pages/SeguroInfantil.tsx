import SegmentPageTemplate from "@/components/SegmentPageTemplate";
import type { SegmentPageData } from "@/components/SegmentPageTemplate";
import heroBg from "@/assets/seguro-salud-adeslas-infantil.webp";

const data: SegmentPageData = {
  heroBg,
  seo: {
    title: "Adeslas Seguro Médico Infantil | Pediatría desde el Nacimiento",
    description: "Seguro médico infantil Adeslas para niños de 0 a 17 años: pediatría especializada, urgencias pediátricas 24h y especialistas sin esperas. Sin copagos desde 50€/mes (Plena) o cobertura total sin copagos desde 83€/mes (Plena Total).",
    canonical: "https://adeslas.numero1salud.es/seguro-medico-infantil",
    ogImage: "https://adeslas.numero1salud.es/og-infantil.jpg",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
      { name: "Seguros Médicos", url: "https://adeslas.numero1salud.es/" },
      { name: "Seguro Infantil", url: "https://adeslas.numero1salud.es/seguro-medico-infantil" },
    ],
  },
  heroTitle: "Seguro Médico Adeslas para Niños",
  heroSubtitle: "Seguro médico Adeslas infantil con pediatría especializada, urgencias 24h y acceso a +51.000 médicos. Cobertura desde el primer día de vida sin periodos de carencia.",
  heroPromo: "Consigue puntos al contratar tu seguro ahora y conviértelos en regalos exclusivos",
  contentTitle: "Cuidado médico integral para tus hijos, desde el nacimiento",
  contentDescription: "Los niños tienen necesidades médicas específicas que requieren especialistas pediátricos, vacunas, revisiones del desarrollo y atención urgente disponible a cualquier hora. Adeslas ofrece seguros médicos infantiles que cubren todo el crecimiento de tus hijos desde el nacimiento hasta los 18 años, con la red de pediatras más amplia de España y sin listas de espera.",
  contentFeatures: [
    { title: "Pediatría especializada sin esperas", description: "Acceso directo a pediatras y especialistas infantiles en toda España sin necesidad de derivación previa." },
    { title: "Pediatría completa desde el nacimiento", description: "Consultas, revisiones del desarrollo, urgencias pediátricas y especialistas sin esperas. Las vacunas no están cubiertas como medicamento, sí el acto médico de administración con enfermería." },
    { title: "Urgencias pediátricas 24 horas", description: "Servicio de urgencias pediátricas disponible a cualquier hora del día o la noche, los 365 días del año." },
    { title: "Precio accesible para toda la familia", description: "Planes infantiles Adeslas desde 21€/mes (Adeslas Go, ambulatorio) o desde 50€/mes (Adeslas Plena, completo con hospitalización). Se puede combinar con el seguro familiar para mayor ahorro." },
  ],
  productsTitle: "Planes infantiles recomendados",
  productsSubtitle: "Elige la cobertura que mejor se adapte a las necesidades de tu hijo",
  recommendedProducts: [
    {
      name: "Adeslas Plena Vital",
      slug: "/seguro-salud/adeslas-plena-vital/",
      price: "38",
      badge: "Económico",
      features: ["Pediatría ambulatoria completa", "Urgencias pediátricas 24h", "Especialistas infantiles sin espera", "Diagnóstico avanzado incluido", "Sin hospitalización programada"],
      highlighted: false,
      promoBadge: "🎁 Promoción puntos",
    },
    {
      name: "Adeslas Plena Total",
      slug: "/seguro-salud/adeslas-plena-total/",
      price: "83",
      badge: "Recomendado",
      features: ["Sin copagos en todas las consultas", "Hospitalización infantil ilimitada", "Dental: 46 actos incluidos", "Psicología (20 sesiones/año)", "3 años sin subida de precio"],
      highlighted: true,
      promoBadge: "🎁 Promoción puntos",
    },
    {
      name: "Adeslas Extra 150",
      slug: "/seguro-salud/adeslas-extra-150/",
      price: "90",
      badge: "Máxima Cobertura",
      features: ["Libre elección de pediatra y hospital", "Reembolso hasta 90% del gasto", "Válido en centros públicos y privados", "Cobertura en toda España y extranjero", "Sin restricciones de red médica"],
      highlighted: false,
    },
  ],
  tarificadorTitle: "Calcula el precio del seguro de tu hijo",
  tarificadorSubtitle: "Obtén un presupuesto personalizado para la edad de tu hijo",
  faqs: [
    { question: "¿Desde qué edad puedo contratar un seguro médico para mi hijo con Adeslas?", answer: "Puedes asegurar a tu hijo desde el mismo día de su nacimiento. Adeslas cubre al recién nacido con acceso inmediato a pediatra, neonatólogo y todas las prestaciones pediátricas desde las primeras horas de vida." },
    { question: "¿Las vacunas están incluidas en el seguro infantil Adeslas?", answer: "No. Las vacunas como medicamento no están cubiertas en ningún plan Adeslas. Lo que sí está cubierto es el acto médico de administración con enfermería, es decir, la consulta de enfermería para ponerlas. Las propias vacunas deben adquirirse aparte o a través de la sanidad pública." },
    { question: "¿Qué especialidades pediátricas cubre el seguro Adeslas?", answer: "Adeslas cubre todas las especialidades pediátricas: cardiología pediátrica, neumología, gastroenterología, otorrinolaringología, oftalmología, traumatología, neurología pediátrica, dermatología y psicología infantil, entre otras. Sin necesidad de derivación previa." },
    { question: "¿Cubre el seguro infantil la ortodoncia o el dentista?", answer: "Adeslas Plena Total incluye 46 actos dentales sin coste adicional. Adeslas Plena Plus incluye servicios dentales básicos como revisiones y consultas odontológicas. La ortodoncia infantil y los tratamientos dentales completos (limpiezas, empastes, extracciones) no están incluidos en los seguros de salud y requieren contratar Adeslas Dental como póliza adicional." },
    { question: "¿Tiene copagos el seguro médico infantil de Adeslas?", answer: "Con Adeslas Plena Total, las consultas con pediatra y especialistas no tienen copago para los niños. Con Adeslas Go hay copagos con un límite máximo anual de 260€ (edades 0-54), lo que lo convierte en una opción muy previsible en coste. Adeslas Go es un producto ambulatorio: no incluye hospitalización ni cirugías." },
    { question: "¿Qué pasa cuando mi hijo cumple 18 años?", answer: "Al cumplir 18 años, tu hijo puede mantener la continuidad con Adeslas en un plan individual para jóvenes adultos, sin necesidad de pasar un nuevo proceso de selección médica. Adeslas garantiza la continuidad asistencial de por vida." },
    { question: "¿Cubre el seguro infantil las urgencias nocturnas y de fin de semana?", answer: "Sí. Las urgencias pediátricas están cubiertas 24 horas al día, 7 días a la semana, 365 días al año en toda la red Adeslas de España. Puedes acudir a urgencias pediátricas sin cita previa en los centros concertados." },
    { question: "¿Incluye el seguro infantil atención de salud mental y psicología?", answer: "Con Adeslas Plena Plus y Adeslas Plena Total, la psicología infantil (hasta 20 sesiones/año) y la psiquiatría pediátrica están incluidas. Es especialmente relevante para niños con TDAH, trastornos del aprendizaje, ansiedad escolar u otras necesidades de salud mental." },
    { question: "¿Está cubierta la hospitalización si mi hijo necesita ingresar?", answer: "Sí. Con Adeslas Plena Plus y Adeslas Plena Total, la hospitalización infantil está completamente cubierta sin copago, en habitación individual con acompañante. Incluye cirugías pediátricas, anestesia y todos los gastos hospitalarios." },
    { question: "¿Puedo añadir el seguro de mi hijo al seguro familiar Adeslas?", answer: "Sí. Los hijos pueden incluirse en la unidad familiar con descuento por número de asegurados. Es la opción más económica para proteger a todos los miembros de la familia con un seguro médico privado Adeslas." },
    { question: "¿Cubre el seguro infantil Adeslas las enfermedades raras o crónicas?", answer: "Adeslas cubre el seguimiento y tratamiento de enfermedades crónicas en niños como asma, alergias alimentarias, diabetes tipo 1, epilepsia y otras patologías pediátricas crónicas. Para enfermedades raras, las coberturas dependen del tratamiento específico requerido." },
    { question: "¿Cuánto cuesta un seguro médico infantil con Adeslas?", answer: "El precio depende de la edad del niño y el plan elegido. Adeslas Go para niños pequeños puede partir desde 21€/mes (solo ambulatorio), Adeslas Plena desde aproximadamente 50€/mes (con hospitalización), y Adeslas Plena Total desde 83€/mes (sin copagos + dental). Usa el calculador de esta página para obtener el precio exacto para la edad de tu hijo." },
  ],
  schemaFaq: true,
};

export default function SeguroInfantil() {
  return <SegmentPageTemplate data={data} />;
}
