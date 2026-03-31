import SegmentPageTemplate from "@/components/SegmentPageTemplate";
import type { SegmentPageData } from "@/components/SegmentPageTemplate";
import heroBg from "@/assets/individual.webp";

const data: SegmentPageData = {
  heroBg,
  seo: {
    title: "Adeslas Seguro Médico Individual | Todos los Planes desde 21€/mes",
    description: "Adeslas seguro médico individual desde 21€/mes. GO, Plena Vital, Plena Plus y Plena Total. Acceso a 42.000+ especialistas, urgencias 24h, hospitalización sin listas de espera. Calcula tu precio en 2 minutos.",
    canonical: "https://adeslas.marchalaseguradores.es/seguro-medico-individual",
    ogImage: "https://adeslas.marchalaseguradores.es/og-individual.jpg",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
      { name: "Seguros Médicos", url: "https://adeslas.marchalaseguradores.es/" },
      { name: "Seguro Individual", url: "https://adeslas.marchalaseguradores.es/seguro-medico-individual" },
    ],
  },
  heroTitle: "Seguro de Salud Adeslas Individual",
  heroSubtitle: "Flexible, adaptado a tus necesidades y con acceso inmediato a especialistas. Protege tu salud con un seguro privado diseñado para ti.",
  heroPromo: "Consigue puntos al contratar tu seguro ahora y conviértelos en regalos exclusivos",
  contentTitle: "Un seguro médico pensado para ti",
  contentDescription: "Si buscas un seguro médico privado individual en España, Adeslas ofrece la gama más completa del mercado: desde el plan más económico (Adeslas Go desde 21€/mes) hasta cobertura total sin copagos con Adeslas Plena Total. Sin listas de espera y con acceso inmediato a más de 42.000 especialistas en toda España.",
  contentFeatures: [
    { title: "Acceso inmediato a especialistas", description: "Sin listas de espera ni derivaciones. Consulta con cualquier especialista de la red Adeslas desde el primer día para urgencias, consultas y diagnósticos." },
    { title: "Flexibilidad total de plan", description: "Elige el plan que mejor se ajuste a tu presupuesto y necesidades: Adeslas Go, Plena Vital, Plena Plus, Plena Total o Extra 150." },
    { title: "Precios competitivos garantizados", description: "Desde 21€/mes (Adeslas Go) para adultos jóvenes. Precio fijo sin sorpresas ni revisiones anuales abusivas." },
    { title: "Amplia red médica en toda España", description: "Más de 42.000 especialistas y 1.000 centros concertados. Sin derivaciones ni burocracia." },
  ],
  productsTitle: "Planes individuales recomendados",
  productsSubtitle: "Elige el plan que mejor se adapte a tus necesidades y presupuesto",
  recommendedProducts: [
    {
      name: "Adeslas Plena Vital",
      slug: "/adeslas-plena-vital",
      price: "38",
      badge: "Económico",
      features: ["Atención ambulatoria completa", "Acceso a +42.000 especialistas", "Urgencias 24h sin lista de espera", "Diagnóstico avanzado incluido", "Sin hospitalización programada"],
      highlighted: false,
      promoBadge: "🎁 Promoción puntos",
    },
    {
      name: "Adeslas Plena Total",
      slug: "/adeslas-plena-total",
      price: "83",
      badge: "Recomendado",
      features: ["Sin copagos en todos los servicios", "Hospitalización ilimitada incluida", "Dental: 46 actos incluidos", "3 años sin subida de precio", "Asistencia viajes 100.000€"],
      highlighted: true,
      promoBadge: "🎁 Promoción puntos",
    },
    {
      name: "Adeslas Extra 150",
      slug: "/adeslas-extra-150",
      price: "90",
      badge: "Máxima Cobertura",
      features: ["Libre elección de médico y hospital", "Reembolso 80% cualquier profesional", "Válido en España y en el extranjero", "Red Adeslas sin copago + reembolso combinados", "Máximo garantizado 150.000€/año"],
      highlighted: false,
    },
  ],
  tarificadorTitle: "Calcula tu precio personalizado",
  tarificadorSubtitle: "Compara todos los seguros Adeslas y encuentra el mejor para ti",
  faqs: [
    { question: "¿Cuál es el seguro médico individual más barato de Adeslas?", answer: "Adeslas Go es el seguro individual más económico, con precio desde 21€/mes para personas de 0-54 años. Ofrece cobertura ambulatoria con copagos y un límite máximo anual de 260€ en copagos. Importante: es un producto de cobertura ambulatoria exclusivamente y NO incluye hospitalización ni cirugía." },
    { question: "¿Tienen carencia los seguros individuales de Adeslas?", answer: "Sí. En determinadas coberturas, Adeslas aplica períodos de carencia. Las más habituales son: parto y prestaciones relacionadas con el embarazo, algunas intervenciones quirúrgicas programadas, ortodoncia y determinados tratamientos oncológicos. Las coberturas de urgencias, consultas con médico general y especialistas, pruebas diagnósticas y hospitalización por accidente o enfermedad aguda están disponibles desde el primer día. Consulta las condiciones concretas del plan que elijas. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información)." },
    { question: "¿Puedo contratar un seguro individual a cualquier edad?", answer: "Sí. Adeslas ofrece seguros individuales desde el nacimiento. La edad máxima varía por plan: Plena Total hasta 62 años, Plena Plus y Plena Vital hasta 70 años, y Adeslas Seniors sin edad máxima establecida. Cuanto antes se contrata, mejor es el precio mensual." },
    { question: "¿Qué cubre un seguro médico individual Adeslas?", answer: "Incluye consultas con médico general y especialistas, pruebas diagnósticas (analíticas, radiografías, resonancias), cirugías, hospitalización en habitación individual, urgencias 24h, fisioterapia y según el plan: parto, dental, psicología y cobertura internacional." },
    { question: "¿Cuál es la diferencia entre Adeslas Plena Vital, Plena Plus y Extra 150?", answer: "Adeslas Plena Vital incluye cobertura médica completa con copagos limitados a 260€/año (LMA). Adeslas Plena Plus ofrece la misma cobertura pero sin ningún copago. Adeslas Extra 150 combina la red Adeslas (sin copago) con reembolso del 80% en cualquier profesional o centro, hasta 150.000€/año." },
    { question: "¿Puedo cambiar de plan en cualquier momento?", answer: "No se pueden ampliar coberturas durante la vigencia de la póliza. El cambio se ha de solicitar con un mes de antelación a la fecha de renovación de la póliza, mediante nuevo cuestionario de salud, y el cambio ha de ser aceptado por la Delegación." },
    { question: "¿El seguro individual cubre las urgencias en toda España?", answer: "Sí. Las urgencias médicas están cubiertas en toda la red Adeslas de España, las 24 horas del día, los 365 días del año. También existe cobertura de urgencias en el extranjero en la mayoría de planes." },
    { question: "¿Puedo asegurarme si tengo una enfermedad crónica?", answer: "Adeslas analiza cada caso individualmente. En muchos casos se puede contratar con exclusiones específicas para condiciones preexistentes. Los planes Adeslas Go y Plena Vital son los más accesibles para personas con historial médico previo." },
    { question: "¿El seguro individual incluye cobertura dental?", answer: "Todos los planes Adeslas incluyen algunos servicios dentales básicos como revisiones y consultas odontológicas. Para tratamiento dental completo (limpiezas, empastes, extracciones, ortodoncia), está disponible Adeslas Dental como póliza adicional: si ya dispones de un seguro de salud Adeslas, el precio es de 9,45€/mes; si no eres asegurado de salud Adeslas, el precio del seguro dental es de 11,80€/mes." },
    { question: "¿Puedo usar el seguro en hospitales públicos?", answer: "Con Adeslas Extra 150 sí, ya que reembolsa gastos médicos en cualquier centro, incluidos hospitales públicos. En los demás planes, la cobertura es exclusiva de la red concertada Adeslas privada." },
    { question: "¿Cómo solicito el seguro médico individual Adeslas?", answer: "Puedes calcularlo y solicitarlo en esta misma página en menos de 2 minutos. Completa el formulario con tu edad y provincia, compara precios y elige el plan. Un asesor te contactará para completar la contratación sin compromiso." },
    { question: "¿Qué es Adeslas Extra 150 y para quién es ideal?", answer: "Adeslas Plena Extra 150 es ideal para personas que quieren libertad total de elección médica: combina el uso de la red Adeslas (sin copago) con el reembolso del 80% de cualquier médico o centro en España o el extranjero. El límite máximo es 150.000€/año. Es el plan más premium para autónomos, directivos y viajeros frecuentes." },
  ],
  schemaFaq: true,
};

export default function SeguroIndividual() {
  return <SegmentPageTemplate data={data} />;
}
