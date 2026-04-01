import SegmentPageTemplate from "@/components/SegmentPageTemplate";
import type { SegmentPageData } from "@/components/SegmentPageTemplate";
import heroBg from "@/assets/ginecologia.jpg";

const data: SegmentPageData = {
  heroBg,
  seo: {
    title: "Adeslas Ginecología | Seguro Médico con Cobertura Ginecológica Completa",
    description: "Seguro médico con ginecología Adeslas: revisiones, mamografía, citología, salud hormonal y reproducción asistida. Especialistas sin esperas. Sin copagos desde 50,92€/mes.",
    canonical: "https://adeslas.marchalaseguradores.es/seguro-medico-ginecologia",
    ogImage: "https://adeslas.marchalaseguradores.es/og-ginecologia.jpg",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
      { name: "Seguros Médicos", url: "https://adeslas.marchalaseguradores.es/" },
      { name: "Seguro Ginecología", url: "https://adeslas.marchalaseguradores.es/seguro-medico-ginecologia" },
    ],
  },
  heroTitle: "Seguro Médico Adeslas con Ginecología Completa",
  heroSubtitle: "Accede a ginecología completa con Adeslas: especialistas, mamografía, citología, ecografías y cribados sin límites. +51.000 médicos y sin listas de espera.",
  heroPromo: "Consigue puntos al contratar tu seguro ahora y conviértelos en regalos exclusivos",
  contentTitle: "Toda la salud femenina cubierta con Adeslas",
  contentDescription: "La salud de la mujer requiere una atención ginecológica continua a lo largo de toda la vida: revisiones preventivas, control hormonal, diagnóstico precoz de cáncer de mama y cérvix, y atención especializada en fertilidad. Adeslas ofrece la cobertura ginecológica más completa del mercado, con acceso directo a ginecólogos expertos en toda España, mamografía sin límite de frecuencia y sin necesidad de derivación previa.",
  contentFeatures: [
    { title: "Ginecólogos expertos sin esperas", description: "Acceso directo a más de 2.000 ginecólogos en toda España. Sin lista de espera, sin derivación." },
    { title: "Pruebas de diagnóstico incluidas", description: "Mamografía, ecografía ginecológica, citología cervical (Papanicolaou) y colposcopia sin coste adicional." },
    { title: "Revisiones preventivas anuales", description: "Control ginecológico anual completo para detección precoz de patologías, incluido en el plan sin copago." },
    { title: "Salud hormonal y tratamientos", description: "Seguimiento de menopausia, terapia hormonal sustitutiva y tratamientos ginecológicos cubiertos." },
  ],
  productsTitle: "Planes con ginecología recomendados",
  productsSubtitle: "Elige la cobertura que mejor se adapte a tus necesidades de salud femenina",
  recommendedProducts: [
    {
      name: "Adeslas Plena Vital",
      slug: "/adeslas-plena-vital",
      price: "38",
      badge: "Económico",
      features: ["Ginecología ambulatoria completa", "Citología y ecografía incluidas", "Mamografía según prescripción", "Urgencias ginecológicas 24h", "Sin hospitalización programada"],
      highlighted: false,
      promoBadge: "🎁 Promoción puntos",
    },
    {
      name: "Adeslas Plena Total",
      slug: "/adeslas-plena-total",
      price: "83",
      badge: "Recomendado",
      features: ["Sin copagos en ginecología", "Hospitalización y cirugía incluidas", "Mamografía y pruebas diagnósticas sin límite", "Parto y cesárea cubiertos", "3 años sin subida de precio"],
      highlighted: true,
      promoBadge: "🎁 Promoción puntos",
    },
    {
      name: "Adeslas Extra 150",
      slug: "/adeslas-extra-150",
      price: "90",
      badge: "Máxima Cobertura",
      features: ["Libre elección de ginecólogo y hospital", "Reembolso hasta 90% del gasto", "Válido en centros públicos y privados", "Técnicas de reproducción asistida", "Cobertura internacional ilimitada"],
      highlighted: false,
    },
  ],
  tarificadorTitle: "Calcula tu precio personalizado",
  tarificadorSubtitle: "Obtén un presupuesto según tu edad y necesidades de cobertura",
  faqs: [
    { question: "¿Las revisiones ginecológicas periódicas están incluidas en Adeslas?", answer: "Sí. Adeslas incluye revisiones ginecológicas anuales sin copago en Adeslas Plena, Adeslas Plena Plus y Adeslas Plena Total. La revisión incluye exploración ginecológica, citología, ecografía transvaginal si está indicada y control general de salud femenina." },
    { question: "¿Cubre Adeslas la mamografía y las pruebas de cribado de cáncer de mama?", answer: "Sí. La mamografía digital está incluida en Adeslas Plena Plus y superiores, sin límite de frecuencia según prescripción médica. También cubre ecografía mamaria, biopsia guiada por imagen y mamografía 3D (tomosíntesis) en algunos centros y planes." },
    { question: "¿Está cubierta la citología cervical (Papanicolaou) y el test del VPH?", answer: "Sí. La citología cervical está incluida en todos los planes con cobertura ginecológica. El test del VPH (Virus del Papiloma Humano) también puede solicitarse como parte del cribado ginecológico en Adeslas Plena Plus y superiores." },
    { question: "¿Cubre Adeslas los tratamientos de reproducción asistida (FIV, inseminación)?", answer: "Con Adeslas Plena Total y Adeslas Extra 150 hay acceso a técnicas de reproducción asistida. Con Adeslas Extra 150 se reembolsan los gastos de fertilidad en clínicas especializadas hasta el límite anual de la modalidad contratada. Consulta las condiciones específicas de cada plan con tu asesor." },
    { question: "¿Incluye el seguro Adeslas la atención en menopausia y perimenopausia?", answer: "Sí. Adeslas cubre el seguimiento ginecológico durante la menopausia y perimenopausia: consultas, analíticas hormonales, densitometría ósea y prescripción de terapia hormonal sustitutiva (THS). La farmacia para tratamientos hormonales está incluida en el seguro." },
    { question: "¿Puedo elegir mi ginecólogo de confianza con Adeslas?", answer: "Con Adeslas Plena Plus puedes elegir entre los ginecólogos de la amplia red Adeslas en tu provincia. Con Adeslas Extra 150 tienes total libertad de elección: puedes ir a cualquier ginecólogo privado en España y recibir el reembolso del gasto." },
    { question: "¿Está cubierta la colposcopia y la biopsia cervical?", answer: "Sí. La colposcopia y la biopsia cervical están cubiertas cuando están médicamente indicadas, generalmente tras un resultado anormal en citología o test VPH. Son procedimientos incluidos en Adeslas Plena Plus y superiores sin copago adicional." },
    { question: "¿El seguro ginecológico Adeslas cubre el tratamiento de quistes ováricos o miomas?", answer: "Sí. Adeslas cubre el diagnóstico y tratamiento de patologías ginecológicas como quistes ováricos, miomas uterinos, endometriosis y otras. Esto incluye seguimiento ecográfico, tratamiento médico y cirugía laparoscópica o abierta cuando esté indicada, con hospitalización incluida en Adeslas Plena y superiores." },
    { question: "¿Cubre Adeslas la anticoncepción y la planificación familiar?", answer: "Adeslas cubre las consultas de planificación familiar y asesoramiento anticonceptivo con el ginecólogo. La inserción de DIU y el implante subcutáneo pueden estar cubiertos según el plan. Los anticonceptivos hormonales orales y los parches no están generalmente incluidos en el seguro de salud." },
    { question: "¿Incluye Adeslas la ecografía ginecológica transvaginal?", answer: "Sí. La ecografía transvaginal está incluida en Adeslas Plena Plus y superiores cuando está médicamente prescrita por el ginecólogo. Es especialmente útil para el diagnóstico de patología ovárica, uterina, seguimiento folicular en reproducción asistida y control ginecológico general." },
    { question: "¿Está cubirada la cirugía ginecológica (histerectomía, laparoscopia)?", answer: "Sí. Las cirugías ginecológicas programadas están cubiertas en Adeslas Plena Plus y Adeslas Plena Total: histerectomía, miomectomía, laparoscopia diagnóstica y quirúrgica, cirugía de ovario y otras intervenciones. La hospitalización, anestesia y todos los gastos asociados están incluidos sin copago." },
    { question: "¿Cuánto cuesta un seguro médico con cobertura ginecológica completa en Adeslas?", answer: "Para una mujer adulta, Adeslas Plena Plus (con ginecología completa incluida) parte desde aproximadamente 72€/mes. Con Adeslas Plena Total (dental + viajes + sin copago) desde 99€/mes. El precio varía según la edad y la provincia. Usa el calculador de esta página para obtener tu presupuesto exacto y sin compromiso en menos de 2 minutos." },
  ],
  schemaFaq: true,
};

export default function SeguroGinecologia() {
  return <SegmentPageTemplate data={data} />;
}
