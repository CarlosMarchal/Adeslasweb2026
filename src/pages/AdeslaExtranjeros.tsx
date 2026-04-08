import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import TarificadorExtranjeros from "@/components/TarificadorExtranjeros";
import heroImg from "@/assets/seguro-salud-adeslas-extranjeros.webp";

const data: ProductPageData = {
  seoTitle: "Adeslas Extranjeros | Seguro Médico para Estudiantes y Residentes en España desde 38€",
  seoDescription:
    "Seguro médico para estudiantes extranjeros en España desde 38€/mes. Válido para visado de estudios y Extranjería. Cubre todos los requisitos exigidos. Alta en 24h.",
  seoCanonical:
    "https://adeslas.numero1salud.es/adeslas-extranjeros",
  seoOgImage: "https://adeslas.numero1salud.es/og-extranjeros.jpg",
  seoProductSchema: {
    name: "Adeslas Health Students / Newcomers Protection",
    description: "Seguro médico para extranjeros en España válido para visado. Cobertura médica completa homologada por el Gobierno de España.",
    category: "Seguro de Salud para Extranjeros",
    price: "38",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    { name: "Seguros Adeslas", url: "https://adeslas.numero1salud.es/" },
    { name: "Seguro Extranjeros", url: "https://adeslas.numero1salud.es/adeslas-extranjeros" },
  ],
  productSlug: "/adeslas-extranjeros",
  badge: "Válido para visado de estudios y residencia",
  heroTitle: "Seguro Médico para Extranjeros en España",
  heroImage: heroImg,
  heroHighlight: "ADESLAS HEALTH STUDENTS",
  heroSubtitle:
    "El seguro médico que necesitas para tu visado de estudios o residencia en España. Cubre todos los requisitos exigidos por Extranjería.",
  price: "38",
  pricePeriod: "mes",
  features: [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
            fill="#1c4a8d"
          />
        </svg>
      ),
      title: "Válido para visado de estudios",
      description:
        "Cubre todos los requisitos exigidos por Extranjería para conceder el visado de estudiante en España",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"
            fill="#1c4a8d"
          />
        </svg>
      ),
      title: "Válido para permisos de residencia",
      description:
        "Cubre todos los requisitos exigidos por Extranjería para conceder el visado de estudiante en España",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
            fill="#1c4a8d"
          />
        </svg>
      ),
      title: "Alta y certificado en 24h",
      description:
        "Póliza activa y certificado para Extranjería disponible en menos de 24 horas desde la contratación",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9h-3V8.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V11h-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3v3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3h3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"
            fill="#1c4a8d"
          />
        </svg>
      ),
      title: "Cobertura médica completa",
      description:
        "Médico general, especialistas, urgencias 24h, hospitalización, pruebas diagnósticas y cirugía",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            fill="#1c4a8d"
          />
        </svg>
      ),
      title: "También para residentes",
      description:
        "Adeslas Health Residents: seguro anual renovable para extranjeros con NIE o permiso de residencia",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"
            fill="#1c4a8d"
          />
        </svg>
      ),
      title: "+51.000 médicos",
      description:
        "Acceso al cuadro médico nacional de Adeslas en toda España, sin listas de espera",
    },
  ],
  cardName: "Adeslas Health Students",
  cardDescription:
    "Seguro médico para estudiantes extranjeros en España. Cubre todos los requisitos de Extranjería para el visado de estudios. Contratación desde 2 meses.",
  cardPill: "Estudiantes · hasta 35 años",
  cardPillDark: true,
  cardCoverages: [
    "Medicina general y especialistas",
    "Urgencias 24h en toda España",
    "Hospitalización y cirugía",
    "Pruebas diagnósticas e imagen",
    "Rehabilitación y fisioterapia",
    "Psicoterapia",
    "Telemedicina y videoconsultas",
    "Certificado oficial para visado de estudios",
    "Red nacional de más de 51.000 médicos",
  ],
  tabs: [
    {
      label: "Health Students",
      items: [
        "Desde 38€/mes para estudiantes extranjeros en España",
        "Contratación flexible: mínimo 2 meses, máximo 12 meses",
        "Cubre todos los requisitos de Extranjería para el visado de estudios",
        "Certificado oficial disponible en menos de 24 horas",
        "Medicina general, especialistas y urgencias 24h",
        "Hospitalización y cirugía cubiertos",
        "Pruebas diagnósticas: analíticas, radiografías, ecografías",
        "Rehabilitación, fisioterapia y psicoterapia",
        "Válido sin necesidad de tener NIE previo",
        "Puedes contratarlo desde tu país antes de llegar a España",
      ],
      /* Card override: Health Students */
      cardName: "Adeslas Health Students",
      cardDescription: "Seguro médico para estudiantes extranjeros en España. Válido para visado de estudios. Contratación desde 2 meses.",
      cardPrice: "38",
      cardPricePeriod: "mes",
      cardPill: "Estudiantes · hasta 35 años",
      cardPillDark: true,
      cardCoverages: [
        "Medicina general y especialistas",
        "Urgencias 24h en toda España",
        "Hospitalización y cirugía",
        "Pruebas diagnósticas e imagen",
        "Rehabilitación y fisioterapia",
        "Psicoterapia",
        "Telemedicina y videoconsultas",
        "Certificado oficial para visado de estudios",
        "Red nacional de más de 51.000 médicos",
      ],
    },
    {
      label: "Health Residents",
      items: [
        "Diseñado para extranjeros que fijan residencia en España",
        "Válido para obtener NIE y permiso de residencia",
        "Duración anual con renovación automática",
        "Sin copago en consultas y especialistas",
        "Sin períodos de carencia",
        "Medicina general, especialistas y urgencias 24h",
        "Hospitalización ilimitada en habitación individual",
        "Pruebas diagnósticas: analíticas, radiografías, TAC, resonancias",
        "Rehabilitación, fisioterapia y psicoterapia",
        "Certificado oficial para trámites de residencia",
      ],
      /* Card override: Health Residents */
      cardName: "Adeslas Health Residents",
      cardDescription: "Seguro médico para extranjeros residentes en España. Válido para NIE y permiso de residencia. Sin copago ni períodos de carencia.",
      cardPrice: "48,70",
      cardPricePeriod: "mes",
      cardPill: "Residentes · Precio según edad",
      cardPillDark: true,
      cardCoverages: [
        "Medicina general, especialistas y urgencias 24h",
        "Hospitalización ilimitada en habitación individual",
        "Pruebas diagnósticas: analíticas, radiografías, TAC, resonancias",
        "Rehabilitación, fisioterapia y psicoterapia",
        "Sin copago en consultas y especialistas",
        "Sin períodos de carencia",
        "Duración anual con renovación automática",
        "Certificado oficial para trámites de residencia",
        "Válido para NIE y permiso de residencia",
      ],
    },
    {
      label: "Documentación Extranjería",
      items: [
        "Certificado oficial de seguro médico privado para Extranjería",
        "Válido para visado de estudios (Health Students)",
        "Válido para NIE y permiso de residencia (Health Residents)",
        "Documento con todos los datos exigidos por Extranjería",
        "Disponible en formato digital y físico en menos de 24 horas",
        "Puedes contratarlo antes de llegar a España",
        "Válido en todas las oficinas de Extranjería de España",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Qué es Adeslas Health Students y para quién es?",
      a: "Adeslas Health Students es el seguro médico de Adeslas diseñado específicamente para estudiantes extranjeros que necesitan un seguro médico privado para obtener su visado de estudios en España. Cubre todos los requisitos exigidos por Extranjería para la concesión del visado de estudiante. Tiene un precio de 38€/mes y se puede contratar desde 2 meses hasta un máximo de 12 meses.",
    },
    {
      q: "¿Adeslas Health Students cumple los requisitos de Extranjería para el visado de estudios?",
      a: "Sí. Adeslas Health Students cubre exactamente todos los requisitos de cobertura médica exigidos por el Ministerio del Interior y las oficinas de Extranjería de España para conceder el visado de estudios: cobertura médica completa, urgencias, hospitalización y certificado oficial de seguro médico privado. Es uno de los seguros más aceptados por Extranjería.",
    },
    {
      q: "¿Cuánto cuesta Adeslas Health Students?",
      a: "Adeslas Health Students tiene un precio desde 38€/mes para estudiantes jóvenes (hasta 35 años). La prima puede variar según la edad del asegurado. Se puede contratar por un mínimo de 2 meses y un máximo de 12 meses, ajustándose exactamente al período de tu visado o estancia de estudios en España.",
    },
    {
      q: "¿Puedo contratar Adeslas Health Students por menos de un año?",
      a: "Sí. Adeslas Health Students permite contratar desde un mínimo de 2 meses hasta un máximo de 12 meses. Es la opción ideal si tu programa de estudios en España tiene una duración inferior a un año o si necesitas renovar el visado por períodos cortos.",
    },
    {
      q: "¿Puedo contratar el seguro desde mi país antes de llegar a España?",
      a: "Sí. Puedes contratar Adeslas Health Students desde cualquier país antes de viajar a España. Es muy recomendable hacerlo con antelación para tener el certificado de seguro médico listo cuando presentes tu solicitud de visado de estudios en el consulado español de tu país.",
    },
    {
      q: "¿Cuándo recibo el certificado para el visado de estudios?",
      a: "El certificado oficial de seguro médico para Extranjería está disponible en menos de 24 horas desde la formalización del contrato. El documento incluye todos los datos exigidos: número de póliza, datos del asegurado, cobertura, período de vigencia e importe. Se entrega en formato digital.",
    },
    {
      q: "¿Puedo contratar si aún no tengo NIE?",
      a: "Sí. Puedes contratar Adeslas Health Students únicamente con tu pasaporte y datos personales. No necesitas tener NIE previo, ya que precisamente el seguro te sirve para obtenerlo o para tramitar el visado de estudios.",
    },
    {
      q: "¿Qué cobertura médica incluye Adeslas Health Students?",
      a: (<>Adeslas Health Students incluye: medicina general y todas las especialidades médicas, urgencias 24 horas en toda España, hospitalización y cirugía, pruebas diagnósticas (analíticas, radiografías, ecografías, TAC), rehabilitación y fisioterapia, psicoterapia, y acceso a la red de más de 51.000 médicos de Adeslas en todo el territorio nacional. Si después necesitas una cobertura más completa, puedes consultar <Link to="/seguro-salud/adeslas-plena-total/" style={{color: "#009FE3", textDecoration: "underline"}}>nuestros seguros de salud</Link>.</>)
    },
    {
      q: "¿Qué diferencia hay entre Adeslas Health Students y Adeslas Health Residents?",
      a: "Adeslas Health Students está diseñado para estudiantes extranjeros con visado de estudios: precio fijo de 38€/mes, duración de 2 a 12 meses y no es renovable. Adeslas Health Residents está pensado para extranjeros que fijan residencia en España de forma más estable: duración anual, renovación automática, sin copago y sin períodos de carencia, válido para NIE y permiso de residencia.",
    },
    {
      q: "¿Qué es Adeslas Health Residents y cuándo debo contratarlo?",
      a: "Adeslas Health Residents es el seguro médico anual y renovable de Adeslas para extranjeros que establecen su residencia habitual en España. Es el indicado cuando necesitas un seguro para obtener el NIE, la tarjeta de residencia o el permiso de residencia de larga duración. Incluye cobertura médica completa sin copago y sin períodos de carencia.",
    },
    {
      q: "¿Adeslas Health Residents tiene copago o períodos de carencia?",
      a: "No. Adeslas Health Residents no tiene copago en ningún servicio médico y no aplica períodos de carencia, lo que significa que todas las coberturas están activas desde el primer día de la póliza.",
    },
    {
      q: "¿El seguro cubre urgencias médicas en toda España?",
      a: "Sí. Tanto Adeslas Health Students como Adeslas Health Residents cubren urgencias médicas las 24 horas del día, los 365 días del año, en toda la red de centros Adeslas de España. Puedes acudir a urgencias sin cita previa en cualquier centro concertado.",
    },
    {
      q: "¿Cómo contrato Adeslas Health Students o Health Residents?",
      a: "Puedes solicitar tu presupuesto y contratar directamente en esta página. Rellena el formulario con tus datos, elige el seguro que necesitas (Students o Residents) y la duración. Un asesor te contactará para completar la contratación y tendrás el certificado listo en menos de 24 horas.",
    },
  ],
  schemaFaq: true,
  useWhatsAppCta: true,
  whatsAppMessage: "Hola, estoy interesado/a en el seguro para extranjeros de Adeslas y me gustaría conocer el precio",
  customTarificador: <TarificadorExtranjeros compact />,
};

const AdeslaExtranjeros = () => <ProductPageTemplate data={data} />;

export default AdeslaExtranjeros;
