import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import ContactCtaCard from "@/components/ContactCtaCard";
import heroImg from "@/assets/seguro-medico-adeslas-autonomos.webp";

const MedicalIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d" />
  </svg>
);

const data: ProductPageData = {
  seoTitle: "Seguro Médico Adeslas para Autónomos | Deducible IRPF · Sin Copago",
  seoDescription: "Seguro médico Adeslas para autónomos: sin copagos, deducible en IRPF hasta 500€/asegurado/año, +51.000 médicos y 1.400 centros. El seguro que cuida tu salud y te ahorra en impuestos.",
  seoCanonical: "https://adeslas.numero1salud.es/seguro-salud/autonomos/",
  hubspotSource: 319,
  seoOgImage: "https://adeslas.numero1salud.es/og-autonomos.jpg",
  seoProductSchema: {
    name: "Adeslas NEGOCIOS — Seguro Médico Autónomos",
    description: "Seguro médico Adeslas NEGOCIOS para autónomos (persona física NIF). Sin copagos, cobertura sanitaria completa, más de +51.000 médicos y 1.400 centros. Deducible en IRPF hasta 500€/persona/año.",
    category: "Seguro de salud para autónomos",
    price: "0",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    { name: "Seguro Médico Autónomos Adeslas NEGOCIOS", url: "https://adeslas.numero1salud.es/seguro-salud/autonomos/" },
  ],
  badge: "Autónomos · Sin Copago · Deducible IRPF",
  heroTitle: "Seguro Médico Adeslas para",
  heroHighlight: "Autónomos · Deducible IRPF · Sin Copago",
  heroSubtitle: "El seguro médico Adeslas diseñado para autónomos: sin copagos, cobertura completa, +51.000 médicos sin listas de espera y hasta 500€/año deducibles en tu IRPF.",
  price: "55,50",
  pricePeriod: "mes",
  heroImage: heroImg,
  hideHeroPrice: true,
  customTarificador: <ContactCtaCard />,
  heroContent: (
    <div className="grid grid-cols-2 gap-3 mb-8 max-w-lg">
      <div
        style={{
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.22)",
          borderRadius: "14px",
        }}
        className="p-4"
      >
        <div className="text-sm font-bold text-white mb-2 leading-tight">Sin copagos</div>
        <div className="space-y-1.5">
          {["Sin coste por consulta", "Todas las especialidades", "Hospitalización incluida"].map(f => (
            <div key={f} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.82)" }}>
              <span className="text-azul-claro font-bold">✓</span> {f}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: "rgba(0,159,227,0.22)",
          border: "1px solid rgba(0,159,227,0.55)",
          borderRadius: "14px",
        }}
        className="p-4"
      >
        <div className="text-sm font-bold text-white mb-2 leading-tight">Ventajas fiscales</div>
        <div className="space-y-1.5">
          {["Deducible en IRPF", "Hasta 500€/persona/año", "Familia incluida"].map(f => (
            <div key={f} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.82)" }}>
              <span className="text-azul-claro font-bold">✓</span> {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  cardName: "Adeslas NEGOCIOS — Autónomos",
  cardDescription: "Cobertura sanitaria completa sin copagos para autónomos. Acceso a más de +51.000 médicos y 1.400 centros. Deducible en IRPF.",
  cardPill: "Sin copago · Persona física NIF",
  cardPillDark: true,
  cardPromoBadge: "🎁 Promoción puntos",
  cardCoverages: [
    "Medicina general, pediatría y +40 especialidades",
    "Hospitalización en habitación individual con acompañante",
    "Urgencias 24h · cirugía completa",
    "Embarazo, parto · trasplantes · prótesis",
    "Enfermería, podología y fisioterapia",
    "Diagnóstico: analíticas, ecografías, radiología",
    "Sin copago en todas las consultas",
    "Deducible en IRPF hasta 500€/persona/año",
    "+51.000 médicos y 1.400 centros Adeslas",
  ],
  features: [
    {
      title: "Sin copago en cada consulta",
      description: "Adeslas NEGOCIOS no tiene copagos. Puedes ir al médico todas las veces que necesites sin pagar nada por consulta, urgencia o prueba diagnóstica. Máxima comodidad y tranquilidad para ti y tu familia.",
      icon: <MedicalIcon />,
    },
    {
      title: "Deducible en IRPF",
      description: "Las primas del seguro médico son gasto deducible en tu declaración de la renta como autónomo: hasta 500€/persona/año para ti, tu cónyuge e hijos dependientes (1.500€/año para personas con discapacidad reconocida).",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="#1c4a8d" />
        </svg>
      ),
    },
    {
      title: "Red médica Adeslas",
      description: "Acceso a más de 48.000 profesionales médicos y 1.400 centros de atención médicoasistencial en toda España. La red privada más amplia del mercado, con todas las especialidades cubiertas.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#1c4a8d" />
        </svg>
      ),
    },
    {
      title: "Hospitalización completa",
      description: "Hospitalización sin límite de días en habitación individual con cama para acompañante. Incluye cirugía, anestesia, trasplantes, prótesis e implantes, embarazo y parto en todos los centros Adeslas.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" fill="#1c4a8d" />
        </svg>
      ),
    },
    {
      title: "Cobertura diagnóstica",
      description: "Acceso a analíticas, ecografías, radiología convencional, TAC, resonancias y técnicas especiales sin necesidad de autorización previa para la mayoría de pruebas. Diagnóstico rápido y fiable.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M20 6h-2.18c.07-.44.18-.88.18-1.34C18 2.54 15.52 1 13.5 1c-1.23 0-2.31.5-3.12 1.3L9 3.67 7.62 2.3C6.81 1.5 5.73 1 4.5 1 2.48 1 0 2.54 0 4.66 0 5.12.11 5.56.18 6H2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8.5 11H10v-1.5H8.5V14H10v-1.5h1.5V14H13v1.5h-1.5V17z" fill="#1c4a8d" />
        </svg>
      ),
    },
    {
      title: "Módulos complementarios",
      description: "Amplía tu cobertura con módulos opcionales: Dental Autónomos Adeslas (15% de descuento), Plus Ginecología y Pediatría, Plus Clínica Universitaria de Navarra o Plus Prestación Económica por Incapacidad Temporal.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#1c4a8d" />
        </svg>
      ),
    },
  ],
  tabs: [
    {
      label: "Coberturas",
      items: [
        "Medicina general, pediatría y enfermería",
        "Más de 40 especialidades médicas cubiertas",
        "Hospitalización sin límite de días en habitación individual con acompañante",
        "Urgencias 24 horas todos los días del año",
        "Cirugía ambulatoria y hospitalaria · anestesia incluida",
        "Embarazo, parto y atención neonatal",
        "Trasplantes, prótesis e implantes quirúrgicos",
        "Analíticas, ecografías, radiología, TAC y resonancias",
        "Rehabilitación, fisioterapia y podología",
        "Psiquiatría y psicología clínica",
        "Oncología · diálisis · litotricia renal",
        "Sin copago en todas las consultas y servicios",
      ],
    },
    {
      label: "Ventajas fiscales",
      items: [
        "Prima deducible como gasto de actividad económica en IRPF",
        "Hasta 500€/persona/año deducibles: autónomo + cónyuge + hijos",
        "Hasta 1.500€/año por persona con discapacidad reconocida",
        "Aplica tanto en estimación directa como en módulos",
        "Familia completa incluida en la misma póliza",
        "Primas de familiares directos también deducibles",
        "Pago flexible: mensual, trimestral (2% dto.), semestral (4% dto.) o anual (6% dto.)",
        "Compatible con RETA y cualquier forma de trabajo autónomo",
      ],
    },
    {
      label: "Módulos opcionales",
      items: [
        "Adeslas Dental Autónomos: 15% de descuento en dental al contratar junto con NEGOCIOS",
        "Plus Ginecología y Pediatría: coberturas ampliadas en estas especialidades",
        "Plus Clínica Universitaria de Navarra: acceso a la Clínica Universidad de Navarra",
        "Plus Prestación Económica por Incapacidad Temporal (IT): subsidio diario durante baja",
        "Cónyuge e hijos pueden incluirse en la misma póliza",
      ],
    },
    {
      label: "Condiciones",
      items: [
        "Tomador de la póliza: persona física (NIF) — diseñado para autónomos",
        "Edad máxima de contratación con NIF: 70 años",
        "Cuestionario de salud obligatorio para todos los asegurados",
        "Carencias (persona física): 3 meses consultas generales, 6 meses ginecología/maternidad, 8 meses hospitalización y cirugía programada",
        "Se pueden eliminar carencias si el asegurado acredita coberturas iguales con una antigüedad superior a 8 meses en la competencia",
        "Descuentos por forma de pago: trimestral 2%, semestral 4%, anual 6%",
        "Red médica: +48.000 profesionales y 1.400 centros Adeslas",
        "Gestión de autorizaciones online · renovación anual automática",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Qué es Adeslas NEGOCIOS para autónomos?",
      a: "Adeslas NEGOCIOS es el seguro médico de Adeslas diseñado específicamente para autónomos (tomador persona física con NIF). Ofrece cobertura sanitaria completa sin copagos, con acceso a más de +51.000 médicos y 1.400 centros en toda España. Es deducible en el IRPF del autónomo.",
    },
    {
      q: "¿Tiene copago Adeslas NEGOCIOS?",
      a: "No. Adeslas NEGOCIOS no tiene copagos. Puedes acudir al médico, al especialista o a urgencias todas las veces que necesites sin pagar nada adicional por consulta. El importe de la prima mensual cubre toda la asistencia sanitaria.",
    },
    {
      q: "¿Cuánto me puedo deducir en IRPF por el seguro médico como autónomo?",
      a: "Las primas del seguro médico son deducibles en tu declaración de la renta: hasta 500€/persona/año para el autónomo, su cónyuge e hijos dependientes. Para personas con discapacidad reconocida el límite sube a 1.500€/persona. Aplica tanto en estimación directa como en módulos.",
    },
    {
      q: "¿Cuál es la edad máxima para contratar Adeslas NEGOCIOS como autónomo?",
      a: "La edad máxima de contratación para el tomador persona física (NIF) es de 70 años. Para los asegurados incluidos en la póliza no hay límite de edad establecido en la contratación inicial.",
    },
    {
      q: "¿Tiene carencias Adeslas NEGOCIOS?",
      a: "Sí, como todos los seguros médicos tiene periodos de carencia: 3 meses para consultas generales, 6 meses para ginecología y maternidad, y 8 meses para hospitalización y cirugía programada. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información).",
    },
    {
      q: "¿Qué cubre Adeslas NEGOCIOS?",
      a: "Cubre medicina general, pediatría, enfermería, más de 40 especialidades, hospitalización ilimitada en habitación individual con acompañante, urgencias 24h, cirugía, embarazo y parto, trasplantes, prótesis, diagnóstico (analíticas, ecografías, radiología, TAC, resonancias), rehabilitación, fisioterapia, psiquiatría, oncología y diálisis, todo sin copago.",
    },
    {
      q: "¿Puedo incluir a mi familia en Adeslas NEGOCIOS?",
      a: "Sí. Puedes incluir a tu cónyuge o pareja de hecho y a tus hijos en la misma póliza. Las primas de familiares directos también son deducibles en el IRPF hasta 500€/persona/año, lo que hace muy ventajosa la contratación familiar.",
    },
    {
      q: "¿Hay descuentos por forma de pago?",
      a: "Sí. Adeslas NEGOCIOS ofrece bonificaciones según la periodicidad del pago: 2% de descuento en pago trimestral, 4% en semestral y 6% en anual.",
    },
    {
      q: "¿Qué módulos opcionales puedo añadir?",
      a: "Puedes ampliar tu cobertura con: Adeslas Dental Autónomos (con 15% de descuento al contratarlo junto con NEGOCIOS), Plus Ginecología y Pediatría, Plus Clínica Universitaria de Navarra y Plus Prestación Económica por Incapacidad Temporal (IT), que proporciona un subsidio diario durante la baja.",
    },
    {
      q: "¿Es obligatorio el cuestionario de salud?",
      a: "Sí. Para contratar Adeslas NEGOCIOS es obligatorio completar un cuestionario de salud para todos los asegurados. No obstante, si vienes de otra aseguradora con coberturas similares y antigüedad superior a 8 meses, se pueden aplicar condiciones especiales.",
    },
  ],
  schemaFaq: true,
  showPromo: true,
};

const Autonomos = () => <ProductPageTemplate data={data} />;

export default Autonomos;
