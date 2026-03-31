import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import ContactCtaCard from "@/components/ContactCtaCard";
import heroImg from "@/assets/seguro-medico-asisa-pymes-e1765796817464.webp";

const data: ProductPageData = {
  seoTitle: "Adeslas Seguros Médicos para Empresas y Pymes | EMPRESAS desde 56€/mes",
  seoDescription: "Adeslas ofrece seguros médicos para empresas y pymes sin copagos. EMPRESAS desde 56€/mes, PYMES TOTAL desde 60€/mes con chequeo anual, dental y garantía de precio 3 años. +48.000 médicos.",
  seoCanonical: "https://adeslas.marchalaseguradores.es/pymes-empresas",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-pymes-empresas.jpg",
  seoProductSchema: {
    name: "Adeslas EMPRESAS — Seguro Médico para Pymes y Empresas",
    description: "Seguro médico Adeslas para empresas (CIF). Sin copagos, cobertura sanitaria completa para empleados. Adeslas EMPRESAS (5 a 99 asegurados) y Adeslas PYMES TOTAL (hasta 15 asegurados, chequeo médico incluido y dental).",
    category: "Seguro de salud para empresas",
    price: "0",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Seguro Médico Pymes y Empresas Adeslas", url: "https://adeslas.marchalaseguradores.es/pymes-empresas" },
  ],
  badge: "Empresas · Sin Copago · Beneficio Social",
  heroTitle: "Seguro Médico para",
  heroHighlight: "Pymes y Empresas — Adeslas",
  heroSubtitle: "El seguro médico de empresa sin copagos. Fideliza a tus empleados con la mejor sanidad privada y obtén ventajas fiscales para empresa y trabajadores.",
  price: "56",
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
        <div className="text-sm font-bold text-white mb-1 leading-tight">Adeslas EMPRESAS</div>
        <div className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.60)" }}>5 a 99 asegurados</div>
        <div className="space-y-1.5">
          {["Sin copagos", "Cobertura completa", "+48.000 médicos"].map(f => (
            <div key={f} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.82)" }}>
              <span className="text-azul-claro font-bold">✓</span> {f}
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          <span className="text-sm font-bold text-white">Desde <span className="text-base font-black" style={{ color: "#009FE3" }}>56€</span>/mes</span>
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
        <div className="text-sm font-bold text-white mb-1 leading-tight">Adeslas PYMES TOTAL</div>
        <div className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.60)" }}>Hasta 15 asegurados</div>
        <div className="space-y-1.5">
          {["Chequeo médico anual", "Dental incluido", "3 años sin subida"].map(f => (
            <div key={f} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.82)" }}>
              <span className="text-azul-claro font-bold">✓</span> {f}
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2" style={{ borderTop: "1px solid rgba(0,159,227,0.3)" }}>
          <span className="text-sm font-bold text-white">Desde <span className="text-base font-black" style={{ color: "#009FE3" }}>60€</span>/mes</span>
        </div>
      </div>
    </div>
  ),
  cardName: "Adeslas Pymes y Empresas",
  cardDescription: "Dos productos para empresas: Adeslas EMPRESAS (5-99 asegurados) y Adeslas PYMES TOTAL (hasta 15, con chequeo médico y dental incluidos). Sin copagos en ambos.",
  cardPill: "EMPRESAS · PYMES TOTAL",
  cardPillDark: true,
  cardCoverages: [
    "Medicina general, pediatría y +40 especialidades",
    "Hospitalización en habitación individual con acompañante",
    "Urgencias 24h · cirugía completa · trasplantes",
    "Embarazo, parto, prótesis e implantes",
    "Diagnóstico: analíticas, ecografías, TAC, resonancias",
    "Sin copago en todas las consultas",
    "Chequeo médico anual por edades (PYMES TOTAL)",
    "Dental incluido con 46 actos gratuitos (PYMES TOTAL)",
    "3 años sin incremento de prima (PYMES TOTAL)",
  ],
  features: [
    {
      title: "El beneficio social más valorado",
      description: "El seguro de salud es el beneficio social más demandado por los trabajadores en España. Ofrecerlo a tus empleados es la mejor herramienta de atracción y fidelización de talento, y aporta ventajas fiscales tanto a la empresa como a cada trabajador.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#1c4a8d" />
        </svg>
      ),
    },
    {
      title: "Sin copago para los empleados",
      description: "Adeslas EMPRESAS y PYMES TOTAL no tienen copagos. Los empleados acceden a médicos, especialistas, urgencias y pruebas diagnósticas sin pagar nada en cada visita. Esto aumenta el uso del seguro y la satisfacción de la plantilla.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d" />
        </svg>
      ),
    },
    {
      title: "Chequeo médico anual incluido",
      description: "Adeslas PYMES TOTAL incluye un chequeo médico anual adaptado a la edad de cada asegurado: analítica completa, electrocardiograma, ecografías, pruebas ginecológicas, audiometría y más. También incluye asistencia en viaje al extranjero hasta 30.000€.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#1c4a8d" />
        </svg>
      ),
    },
    {
      title: "Dental incluido en PYMES TOTAL",
      description: "Adeslas PYMES TOTAL incluye cobertura dental con 46 actos gratuitos: limpiezas bucales, consultas urgentes, revisiones, educación bucodental, fluorizaciones, ortopantomografías, pruebas diagnósticas, estudios tomográficos y pulpotomía, entre otros.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h2v3c0 .55.45 1 1 1s1-.45 1-1v-3h2c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" fill="#1c4a8d" />
        </svg>
      ),
    },
    {
      title: "3 años sin incremento de prima",
      description: "Adeslas PYMES TOTAL garantiza 3 años de duración sin incremento en la prima. Las empresas tienen certeza total sobre el coste del seguro a medio plazo, facilitando la planificación presupuestaria.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#1c4a8d" />
        </svg>
      ),
    },
    {
      title: "Reembolsos y farmacia",
      description: "Adeslas PYMES TOTAL incluye reembolso del 50% en farmacia (hasta 200€/año/asegurado), reembolso de Rehabilitación y Fisioterapia (hasta 500€), Podología (hasta 200€) y Logopedia y Foniatría (hasta 500€).",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M20 6h-2.18c.07-.44.18-.88.18-1.34C18 2.54 15.52 1 13.5 1c-1.23 0-2.31.5-3.12 1.3L9 3.67 7.62 2.3C6.81 1.5 5.73 1 4.5 1 2.48 1 0 2.54 0 4.66 0 5.12.11 5.56.18 6H2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8.5 11H10v-1.5H8.5V14H10v-1.5h1.5V14H13v1.5h-1.5V17z" fill="#1c4a8d" />
        </svg>
      ),
    },
  ],
  tabs: [
    {
      label: "Adeslas EMPRESAS",
      items: [
        "Medicina general, pediatría, enfermería y +40 especialidades",
        "Hospitalización sin límite en habitación individual con acompañante",
        "Urgencias 24h todos los días del año",
        "Cirugía ambulatoria y hospitalaria · anestesia incluida",
        "Embarazo y parto · trasplantes · prótesis e implantes",
        "Analíticas, ecografías, radiología, TAC y resonancias",
        "Rehabilitación, fisioterapia y podología",
        "Psiquiatría, oncología, diálisis y litotricia renal",
        "Sin copago en todas las consultas y servicios",
        "Para personas jurídicas de 5 a 99 asegurados (CIF)",
        "Edad máxima: 67 años · cuestionario de salud obligatorio",
        "Descuentos: trimestral 2%, semestral 4%, anual 6%",
      ],
      cardName: "Adeslas EMPRESAS",
      cardDescription: "Cobertura sanitaria completa sin copagos para empresas de 5 a 99 asegurados. La mejor red médica privada para tus empleados.",
      cardPrice: "56",
      cardPricePeriod: "mes",
      cardPill: "5 a 99 asegurados · Sin copago",
      cardPillDark: true,
      cardCoverages: [
        "Medicina general y +40 especialidades",
        "Hospitalización ilimitada en hab. individual",
        "Urgencias 24h · Cirugía · Trasplantes",
        "Embarazo y parto cubiertos",
        "Diagnóstico completo incluido",
        "Sin copago en todas las consultas",
        "+48.000 médicos y 1.500 centros",
        "Módulos complementarios disponibles",
      ],
    },
    {
      label: "Adeslas PYMES TOTAL",
      items: [
        "Todas las coberturas de Adeslas EMPRESAS incluidas",
        "Chequeo médico anual adaptado a la edad de cada asegurado",
        "Asistencia en viaje al extranjero: hasta 30.000€",
        "Cobertura dental: 46 actos gratuitos (limpiezas, consultas, revisiones, ortopantomografías…)",
        "Reembolso farmacia: 50% hasta 200€/asegurado/año",
        "Reembolso Rehabilitación y Fisioterapia: hasta 500€/año",
        "Reembolso Podología: hasta 200€/año",
        "Reembolso Logopedia y Foniatría: hasta 500€/año",
        "3 años de duración sin incremento de prima",
        "Compromisos de servicio: autorizaciones máx. 48h, reembolsos en 3 días",
        "Para empresas CIF (A o B), hasta 15 asegurados",
        "Edad máxima: 67 años · cuestionario de salud obligatorio",
      ],
      cardName: "Adeslas PYMES TOTAL",
      cardDescription: "Cobertura total sin copagos, chequeo médico anual y dental incluidos. 3 años sin incremento de prima para pymes de hasta 15 empleados.",
      cardPrice: "60",
      cardPricePeriod: "mes",
      cardPill: "Hasta 15 asegurados · Todo incluido",
      cardPillDark: true,
      cardCoverages: [
        "Todas las coberturas de Adeslas EMPRESAS",
        "Chequeo médico anual por edades",
        "Dental: 46 actos gratuitos incluidos",
        "Reembolso farmacia 50% (máx. 200€/año)",
        "Reembolso rehabilitación y fisioterapia",
        "Asistencia en viaje extranjero 30.000€",
        "3 años sin incremento de prima",
        "Compromisos de servicio garantizados",
      ],
    },
    {
      label: "Chequeo médico",
      items: [
        "Hasta 30 años: historia clínica, analítica, electrocardiograma, radiografía tórax, examen ginecológico con citología, agudeza visual, audiometría y espirometría",
        "De 31 a 45 años: todas las anteriores + ecografía mamaria (bianual o anual desde los 40 años según criterio médico)",
        "Desde 46 años: todas las anteriores + analítica PSA/HDL/fosfatasa alcalina/hemorragias ocultas, ecografía ginecológica/prostática y prueba de esfuerzo",
        "Cita para chequeo garantizada en máximo 30 días hábiles",
        "Realizado en centros concertados incluidos en el cuadro médico Adeslas",
      ],
    },
    {
      label: "Condiciones",
      items: [
        "Adeslas EMPRESAS: personas jurídicas (CIF) de 5 a 99 asegurados",
        "Adeslas PYMES TOTAL: empresa CIF (A o B) con domicilio en España, hasta 15 asegurados",
        "Edad máxima de contratación: 67 años en ambos productos",
        "Para asegurados mayores de 67 años: necesario que haya 3 asegurados menores de 60 años",
        "Cuestionario de Salud obligatorio para todos los asegurados",
        "Cónyuges y descendientes pueden incluirse en la póliza en el momento de incorporación del trabajador",
        "Carencias EMPRESAS: exento si contratación ≥12 asegurados · 8 meses hospitalización y tratamientos especiales",
        "PYMES TOTAL: mismas carencias que Adeslas EMPRESAS",
        "PYMES TOTAL: no aplica descuento por número de asegurados",
        "EMPRESAS: descuentos por forma de pago: trimestral 2%, semestral 4%, anual 6%",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Cuál es la diferencia entre Adeslas EMPRESAS y Adeslas PYMES TOTAL?",
      a: "Adeslas EMPRESAS está diseñado para empresas de 5 a 99 asegurados, con cobertura sanitaria completa sin copagos. Adeslas PYMES TOTAL es para pymes de hasta 15 asegurados e incluye todo lo de EMPRESAS más chequeo médico anual por edades, cobertura dental con 46 actos gratuitos, reembolso de farmacia, fisioterapia, podología y logopedia, asistencia en viaje al extranjero y 3 años de duración sin incremento de prima.",
    },
    {
      q: "¿Tienen copago los seguros de empresa Adeslas?",
      a: "No. Ni Adeslas EMPRESAS ni Adeslas PYMES TOTAL tienen copagos. Los empleados acuden al médico, especialista o urgencias sin pagar nada adicional por visita, lo que maximiza el uso del seguro y la satisfacción de la plantilla.",
    },
    {
      q: "¿Qué ventajas fiscales tiene el seguro médico de empresa?",
      a: "Para la empresa, las primas pagadas por los empleados son un gasto deducible en el Impuesto de Sociedades. Para los trabajadores, las primas abonadas por la empresa (hasta 500€/persona/año) no tributan como retribución en especie en el IRPF. Esto beneficia fiscalmente tanto a la empresa como a cada empleado.",
    },
    {
      q: "¿Qué incluye el chequeo médico anual de PYMES TOTAL?",
      a: "El chequeo se adapta a la edad de cada asegurado. Hasta 30 años: historia clínica, analítica, electrocardiograma, radiografía de tórax, examen ginecológico con citología, agudeza visual, audiometría y espirometría. De 31 a 45 añade ecografía mamaria. Desde 46 años incluye además analítica avanzada (PSA, HDL, fosfatasa alcalina), ecografía ginecológica/prostática y prueba de esfuerzo.",
    },
    {
      q: "¿Qué dental incluye Adeslas PYMES TOTAL?",
      a: "PYMES TOTAL incluye cobertura dental con 46 actos gratuitos: limpiezas bucales, consultas y consultas urgentes, revisiones, educación bucodental, fluorizaciones, ortopantomografías, pruebas diagnósticas, estudios tomográficos y pulpotomía, entre otros. Para el resto de actos odontológicos se aplican importes por acto según la clínica elegida del cuadro médico.",
    },
    {
      q: "¿Cuántos trabajadores necesito para contratar Adeslas EMPRESAS?",
      a: "Para Adeslas EMPRESAS se necesita un mínimo de 5 asegurados y un máximo de 99. Para Adeslas PYMES TOTAL el máximo es de 15 asegurados. En ambos casos el tomador debe ser una persona jurídica (empresa con CIF).",
    },
    {
      q: "¿La empresa puede pagar solo una parte de la prima?",
      a: "Sí. En la modalidad de Adhesión Voluntaria, la empresa no asume el coste total del seguro, sino que paga las primas de solo una parte de la plantilla, repercutiendo el importe en nómina al trabajador. En Adhesión Obligatoria, la empresa se hace cargo de las primas de todos los trabajadores sin excepción.",
    },
    {
      q: "¿Es obligatorio el cuestionario de salud?",
      a: "Sí, el cuestionario de salud es obligatorio para todos los asegurados. En Adhesión Obligatoria quedan exentos si el grupo supera los 50 asegurados. En Adhesión Voluntaria la exención aplica desde 75 asegurados. Los mayores de 67 años siempre estarán sujetos a cuestionario médico.",
    },
    {
      q: "¿Qué garantiza PYMES TOTAL respecto a la prima?",
      a: "Adeslas PYMES TOTAL garantiza 3 años de duración sin incremento en la prima. La empresa conoce con exactitud el coste del seguro médico durante ese período, lo que facilita enormemente la planificación presupuestaria.",
    },
    {
      q: "¿Puedo añadir el dental a Adeslas EMPRESAS?",
      a: "Sí. Para Adeslas EMPRESAS puedes contratar como módulo complementario el seguro Adeslas Dental Negocios y Empresas con un 15% de descuento. Adeslas PYMES TOTAL ya incluye dental de base.",
    },
  ],
  schemaFaq: true,
  showPromo: true,
};

const PymesEmpresas = () => <ProductPageTemplate data={data} />;

export default PymesEmpresas;
