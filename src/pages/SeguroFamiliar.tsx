import SegmentPageTemplate from "@/components/SegmentPageTemplate";
import type { SegmentPageData } from "@/components/SegmentPageTemplate";
import heroBg from "@/assets/familia.jpg";

const data: SegmentPageData = {
  heroBg,
  seo: {
    title: "Adeslas Seguro Médico Familiar | Pediatría, Especialistas y Sin Copagos",
    description: "Adeslas seguro médico familiar: pediatría, especialistas y hospitalización para toda la familia desde 22,55€/mes. Descuento 10% desde el 4º asegurado. Sin listas de espera.",
    canonical: "https://adeslas.marchalaseguradores.es/seguro-medico-familiar",
    ogImage: "https://adeslas.marchalaseguradores.es/og-familiar.jpg",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
      { name: "Seguros Médicos", url: "https://adeslas.marchalaseguradores.es/" },
      { name: "Seguro Familiar", url: "https://adeslas.marchalaseguradores.es/seguro-medico-familiar" },
    ],
  },
  heroTitle: "Seguro Médico Adeslas para Familias",
  heroSubtitle: "Cubre a toda la familia con un seguro Adeslas: pediatría, ginecología, urgencias 24h y +51.000 médicos. Descuento del 10% a partir del 4.º asegurado.",
  heroPromo: "Consigue puntos al contratar tu seguro ahora y conviértelos en regalos exclusivos",
  contentTitle: "La salud de tu familia en buenas manos",
  contentDescription: "Como padre o madre, tu prioridad es la salud y bienestar de tu familia. Adeslas te ofrece planes familiares integrales que cubren todas las necesidades médicas de padres e hijos, con especial atención a la pediatría y el cuidado de los menores. Con más de 51.000 médicos y 1.400 centros en toda España, tienes acceso inmediato sin listas de espera.",
  contentFeatures: [
    { title: "Pediatría sin costes adicionales", description: "Consultas, revisiones y urgencias pediátricas incluidas en tu plan. Las vacunas no están cubiertas, sí el acto médico de administración con enfermería." },
    { title: "10% de descuento desde el 4º asegurado", description: "A partir del 4º miembro incluido en la póliza se aplica un 10% de descuento en la cuota mensual. Cuantos más asegurados, mayor es el ahorro para toda la familia." },
    { title: "Cobertura completa para todos", description: "Médicos, especialistas, cirugías, hospitalizaciones y urgencias para toda la familia." },
    { title: "Atención 24 horas", description: "Emergencias y urgencias disponibles en cualquier momento para tu tranquilidad." },
    { title: "Dental básico incluido para toda la familia", description: "Los planes Adeslas incluyen cobertura dental básica tanto para adultos como para niños: consultas odontológicas, revisiones, limpieza de boca básica y extracciones dentarias sin coste adicional." },
  ],
  productsTitle: "Planes familiares recomendados",
  productsSubtitle: "Elige el plan que mejor proteja a tu familia",
  recommendedProducts: [
    {
      name: "Adeslas Plena Vital",
      slug: "/adeslas-plena-vital",
      price: "38",
      badge: "Económico",
      features: ["Atención ambulatoria para toda la familia", "Pediatría sin lista de espera", "Urgencias 24h en toda España", "Diagnóstico completo incluido", "Precio por miembro desde 38€/mes"],
      highlighted: false,
      promoBadge: "🎁 Promoción puntos",
    },
    {
      name: "Adeslas Plena Total",
      slug: "/adeslas-plena-total",
      price: "83",
      badge: "Recomendado",
      features: ["Sin copagos para toda la familia", "Hospitalización ilimitada y parto cubierto", "Dental: 46 actos incluidos", "3 años sin subida de precio", "Descuento familiar desde el 4º asegurado"],
      highlighted: true,
      promoBadge: "🎁 Promoción puntos",
    },
    {
      name: "Adeslas Extra 150",
      slug: "/adeslas-extra-150",
      price: "90",
      badge: "Máxima Cobertura",
      features: ["Libre elección de médico y hospital", "Reembolso hasta 90% del gasto", "Válido en centros públicos y privados", "Cobertura internacional ilimitada", "Ideal para familias con necesidades especiales"],
      highlighted: false,
    },
  ],
  tarificadorTitle: "Calcula el precio para tu familia",
  tarificadorSubtitle: "Obtén un presupuesto personalizado según el número de miembros",
  faqs: [
    { question: "¿Cuántos miembros de la familia puedo incluir en un seguro Adeslas?", answer: "Puedes asegurar a todos los miembros de tu unidad familiar: padre, madre, hijos y otros dependientes. Cada persona recibe una póliza individual con coberturas adaptadas a su edad, y la gestión se centraliza en una sola cuenta familiar." },
    { question: "¿Hay descuento por contratar un seguro médico familiar?", answer: "Sí. Adeslas aplica descuentos por unidad familiar en los planes Plena Total y Plena Vital Total: 5% con 3 asegurados, 10% con 4 y 15% con 5 o más. En Plena y Plena Vital: 10% a partir de 4 asegurados. Es la forma más económica de cubrir la salud de toda la familia." },
    { question: "¿Qué cobertura de pediatría incluye el seguro familiar?", answer: "Adeslas cubre pediatría completa: consultas con pediatra, revisiones del desarrollo, diagnósticos, urgencias pediátricas 24h y hospitalización infantil sin copago adicional en Adeslas Plena Plus y superiores. Importante: las vacunas NO están cubiertas como medicamento, sí el acto médico de administración con enfermería." },
    { question: "¿Pueden los hijos seguir asegurados al cumplir 18 años?", answer: "Sí. Al cumplir 18 años, los hijos pueden continuar con su seguro Adeslas individual sin proceso de selección médica ni penalización por cambio de plan. Adeslas mantiene la continuidad asistencial para toda la vida." },
    { question: "¿El seguro familiar incluye cobertura dental para los niños?", answer: "Con Adeslas Plena Total y planes superiores, la cobertura dental de 46 actos está incluida. En Adeslas Plena Plus también algunos servicios dentales básicos como revisiones y consultas odontológicas están incluidos para todos los asegurados, incluidos los niños. Para tratamiento dental completo (limpiezas, empastes, ortodoncia), está disponible el seguro Adeslas Dental como opción adicional desde 9,45€/mes." },
    { question: "¿Está cubierto el parto si la madre está en el seguro familiar?", answer: "Sí. Con Adeslas Plena Plus y Adeslas Plena Total, el parto vaginal y la cesárea están cubiertos con hospitalización en habitación individual. Incluye seguimiento prenatal con ginecólogo, ecografías y control postparto." },
    { question: "¿Qué pasa si un miembro de la familia tiene una enfermedad previa?", answer: "Adeslas puede incluir a personas con enfermedades preexistentes. En algunos casos se aplican exclusiones o cuestionarios de salud. Los planes Adeslas Go y Plena Vital son los más accesibles para personas con historial médico previo." },
    { question: "¿Incluye el seguro familiar atención de salud mental y psicología?", answer: "Con Adeslas Plena Plus y Adeslas Plena Total, la psicología y psiquiatría están incluidas tanto para adultos como para niños. Es especialmente relevante para familias con menores en edad escolar o adolescentes." },
    { question: "¿Qué especialistas médicos están disponibles para toda la familia?", answer: "La red Adeslas cuenta con más de 51.000 médicos en toda España: pediatría, traumatología, dermatología, cardiología, ginecología, neurología, oftalmología, otorrinolaringología y muchas más. Sin derivación previa ni lista de espera." },
    { question: "¿Puedo añadir a los abuelos al seguro familiar Adeslas?", answer: "Sí. Adeslas Seniors no tiene límite de edad establecido, y los planes Plena Vital y Plena Plus permiten asegurar hasta los 70 años. Los abuelos pueden incorporarse a la póliza familiar con coberturas adaptadas a su edad y perfil de salud." },
    { question: "¿Tiene carencias el seguro médico familiar?", answer: "Adeslas no aplica períodos de carencia generales. La mayoría de coberturas están activas desde el primer día. Solo algunas prestaciones específicas como partos en embarazos muy avanzados o ciertas cirugías programadas pueden tener condiciones particulares. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información)." },
    { question: "¿Cuánto cuesta un seguro médico familiar con Adeslas?", answer: "El precio depende del número de miembros y sus edades. Un seguro familiar tipo (2 adultos y 2 hijos menores) con Adeslas Plena Plus parte desde aproximadamente 145€/mes. Usa el calculador para obtener un presupuesto exacto y sin compromiso." },
  ],
  schemaFaq: true,
};

export default function SeguroFamiliar() {
  return <SegmentPageTemplate data={data} />;
}
