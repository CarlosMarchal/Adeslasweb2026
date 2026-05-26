import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import ContactCtaCard from "@/components/ContactCtaCard";
import heroImg from "@/assets/seguro-decesos-adeslas.webp";

const data: ProductPageData = {
  seoTitle: "Adeslas Decesos | Sepelio, Repatriación y Trámites desde 9€/mes",
  seoDescription: "Seguro de decesos Adeslas gestionado por Ocaso. Sepelio completo, repatriación internacional, billete acompañante y trámites incluidos. Atención 24h: 900 14 15 16. Límite 70 años (prima única para mayores). Desde 9€/mes.",
  seoCanonical: "https://adeslas.numero1salud.es/seguro-decesos/",
  hubspotSource: 309,
  seoOgImage: "https://adeslas.numero1salud.es/og-decesos.jpg",
  seoProductSchema: {
    name: "Adeslas Decesos",
    description: "Seguro de decesos Adeslas gestionado por Ocaso. Cubre: sepelio completo, féretro o urna, tanatorio, trámites administrativos, traslado nacional e internacional y repatriación desde el extranjero. Repatriación: el asegurado debe ser residente en España y no haber permanecido más de 90 días consecutivos en el extranjero antes del fallecimiento. Si el fallecimiento ocurre en el extranjero incluye billete ida y vuelta para acompañante (clase turista), gastos de estancia entre 175€ y 200€ diarios con máximo 10 días, y servicio de intérprete. Atención 24h/365 días: teléfono 900 14 15 16 (desde el extranjero +34 91 542 02 03). Límite de edad: 70 años en modalidad prima periódica; mayores de 70 años disponible en modalidad prima única. Prima desde 9€/mes.",
    category: "Seguro de Decesos",
    price: "9",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    { name: "Seguros Adeslas", url: "https://adeslas.numero1salud.es/" },
    { name: "Adeslas Decesos", url: "https://adeslas.numero1salud.es/seguro-decesos/" },
  ],
  badge: "Cobertura inmediata · Gestión por Ocaso",
  heroTitle: "Seguro de Decesos Adeslas",
  heroHighlight: "Gestión Integral · Repatriación incluida",
  heroSubtitle: "Tranquilidad para ti y tu familia. Gestión completa del sepelio, trámites administrativos y repatriación en cualquier punto de España o el extranjero.",
  price: "desde 9",
  pricePeriod: "/mes",
  heroImage: heroImg,
  customTarificador: <ContactCtaCard />,
  usePhoneCallCta: true,
  hideHeroBadges: true,
  cardName: "Adeslas Decesos",
  cardDescription: "Evita que tu familia tenga que preocuparse por los trámites y los gastos en el momento más difícil.",
  cardPill: "Cobertura inmediata · Gestión Ocaso",
  cardPillDark: true,
  cardCoverages: [
    "Gestión completa del sepelio",
    "Traslado nacional e internacional",
    "Féretro y urna cineraria",
    "Esquela en prensa digital",
    "Trámites administrativos y burocráticos",
    "Asistencia 24h los 365 días del año",
    "Límite de edad: 70 años (prima periódica)",
    "Cobertura para toda la unidad familiar",
  ],
  features: [
    {
      title: "Gestión integral",
      description: "Nos encargamos de todos los trámites: sepelio, traslados, documentación y gestiones administrativas. Tu familia solo tiene que llamar.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Cobertura inmediata",
      description: "La cobertura es efectiva desde el momento de la contratación. Sin periodos de espera.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Asistencia 24/7",
      description: "Línea de atención disponible las 24 horas, los 365 días del año. Gestionado por Ocaso, especialistas en decesos.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Cobertura familiar",
      description: "Un único seguro puede cubrir a toda la unidad familiar, ofreciendo protección completa a todos los miembros del hogar.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#1c4a8d"/>
        </svg>
      ),
    },
  ],
  tabs: [
    {
      label: "Servicios incluidos",
      items: [
        "Gestión completa del sepelio",
        "Féretro o urna cineraria de calidad",
        "Tanatorio y sala de velatorio",
        "Esquela en prensa digital",
        "Trámites administrativos y civiles",
        "Certificados de defunción y registro",
        "Comunicación a la Seguridad Social",
      ],
    },
    {
      label: "Traslados y repatriación",
      items: [
        "Traslado nacional hasta 200 km",
        "Traslado nacional ilimitado (según modalidad)",
        "Repatriación desde el extranjero",
        "Traslado de restos al país de origen",
        "Vehículo fúnebre adaptado",
        "Asistencia consular si es necesario",
      ],
    },
    {
      label: "Condiciones",
      items: [
        "Cobertura efectiva desde el primer día",
        "Límite de edad: 70 años (prima periódica)",
        "Mayores de 70 años: modalidad prima única disponible",
        "Cobertura en toda España y extranjero",
        "Opción individual o familiar",
        "Asistencia 24h los 365 días",
        "Prima mensual desde 9€",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Qué trámites incluye el seguro de decesos Adeslas?",
      a: "El seguro cubre la gestión integral: féretro o urna cineraria, tanatorio y sala de velatorio, esquela en prensa digital, certificados de defunción, registro civil, comunicación a la Seguridad Social y todos los trámites administrativos y burocráticos necesarios.",
    },
    {
      q: "¿Incluye el velatorio y el funeral completo?",
      a: "Sí. El seguro de decesos Adeslas incluye la organización y gestión completa del sepelio: traslado, velatorio, féretro o urna cineraria, floristería básica, esquela y todos los trámites. Tu familia solo tiene que hacer una llamada.",
    },
    {
      q: "¿Incluye la repatriación desde el extranjero?",
      a: (
        <>
          Sí. El seguro cubre el traslado y repatriación de restos mortales desde cualquier punto de España o del extranjero, incluyendo los trámites consulares necesarios. Para que la repatriación esté cubierta deben cumplirse las siguientes condiciones:
          <ul style={{ marginTop: "8px", paddingLeft: "20px", listStyleType: "disc" }}>
            <li><strong>Residencia:</strong> El asegurado debe ser residente en España.</li>
            <li><strong>Límite de estancia:</strong> No puede haber permanecido más de 90 días consecutivos en el extranjero antes del fallecimiento.</li>
          </ul>
        </>
      ),
    },
    {
      q: "¿Qué pasa si el fallecimiento ocurre en el extranjero?",
      a: (
        <>
          Adeslas gestiona completamente la repatriación: traslado de restos mortales al lugar indicado, coordinación con consulados y gestión de toda la documentación internacional necesaria. Además incluye:
          <ul style={{ marginTop: "8px", paddingLeft: "20px", listStyleType: "disc" }}>
            <li><strong>Billete para un acompañante:</strong> Se facilita un billete de ida y vuelta (clase turista) para que una persona designada viaje al lugar del fallecimiento y regrese acompañando los restos.</li>
            <li><strong>Gastos de estancia:</strong> Se abonan gastos de alojamiento y manutención del acompañante (entre 175€ y 200€ diarios, según la póliza) con un límite máximo de 10 días.</li>
            <li><strong>Servicio de intérprete:</strong> Si el acompañante necesita ayuda con el idioma para las gestiones administrativas y legales del traslado.</li>
          </ul>
        </>
      ),
    },
    {
      q: "¿Puede cubrir a toda la familia con un solo seguro?",
      a: "Sí. Existe la modalidad familiar que cubre a todos los miembros de la unidad familiar bajo una única póliza, con una prima conjunta más ventajosa que contratar pólizas individuales.",
    },
    {
      q: "¿Hay límite de edad para contratar el seguro de decesos?",
      a: "El límite de edad para contratar el seguro de decesos Adeslas en modalidad de prima periódica es de 70 años. Las personas mayores de 70 años pueden contratar el seguro en modalidad de prima única. Consulta con un asesor las condiciones específicas.",
    },
    {
      q: "¿Cuánto cuesta el seguro de decesos Adeslas?",
      a: "El seguro de decesos Adeslas está disponible desde 9€/mes, variando según la modalidad (individual o familiar), la edad del asegurado y las coberturas seleccionadas. Contacta para obtener un presupuesto personalizado.",
    },
    {
      q: "¿Incluye nicho o parcela en el cementerio?",
      a: "La cobertura básica incluye los servicios funerarios esenciales. La concesión de nicho o parcela en cementerio puede estar incluida en modalidades superiores o como garantía adicional. Consulta las condiciones de tu póliza específica.",
    },
    {
      q: "¿Qué hago cuando ocurre el fallecimiento?",
      a: (
        <>
          El servicio es atendido de inmediato y gestionado por <strong>Ocaso</strong>. Solo tienes que llamar al teléfono de asistencia en caso de fallecimiento:
          <ul style={{ marginTop: "8px", paddingLeft: "20px", listStyleType: "disc" }}>
            <li><strong>900 14 15 16</strong> — disponible 24 horas / 365 días (número específico para asistencia por fallecimiento).</li>
            <li>Si llamas desde el extranjero: <strong>+34 91 542 02 03</strong>.</li>
          </ul>
          Un equipo de especialistas se pone en marcha inmediatamente y se encarga de gestionar todos los trámites, coordinando el sepelio completo. La familia no tiene que ocuparse de ningún papeleo.
        </>
      ),
    },
    {
      q: "¿Qué diferencia hay entre seguro de decesos y seguro de vida?",
      a: (<>El seguro de decesos cubre los gastos del sepelio y gestiona todos los trámites del funeral. El <Link to="/seguro-dental/" style={{color: "#009FE3", textDecoration: "underline"}}>seguro de vida</Link> paga un capital económico a los beneficiarios designados. Son productos complementarios: el de decesos protege de los gastos inmediatos del fallecimiento, el de vida protege el futuro económico de la familia.</>)
    },
  ],
  schemaFaq: true,
  showPromo: true,
};

const AdeslaDecesos = () => <ProductPageTemplate data={data} />;

export default AdeslaDecesos;
