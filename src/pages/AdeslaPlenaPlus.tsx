import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/seguro-medico-adeslas-plena-plus.webp";

const data: ProductPageData = {
  seoTitle: "Adeslas Plena Plus | Seguro Médico Sin Copagos · Cobertura Completa",
  seoDescription:
    "Adeslas Plena Plus: seguro médico sin copagos con cobertura completa (hospitalización, todas las especialidades, cirugía). Acceso +51.000 médicos. Desde 62,55€/mes.",
  seoCanonical:
    "https://adeslas.marchalaseguradores.es/adeslas-plena-plus",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-plena-plus.jpg",
  seoProductSchema: {
    name: "Adeslas Plena Plus",
    description: "Seguro médico sin copagos con cobertura completa: hospitalización, especialidades y cirugía. Red Adeslas +51.000 médicos.",
    category: "Seguro de Salud",
    price: "62",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Seguros de Salud", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Adeslas Plena Plus", url: "https://adeslas.marchalaseguradores.es/adeslas-plena-plus" },
  ],
  productSlug: "/adeslas-plena-plus",
  heroPromo: "Consigue puntos al contratar tu seguro ahora y conviértelos en regalos exclusivos",
  badge: "Sin copagos · Hospitalización incluida",
  heroTitle: "Seguro Médico Adeslas Plena Plus",
  heroImage: heroImg,
  heroHighlight: "Sin Copagos · Hospitalización y Especialidades",
  heroSubtitle:
    "Seguro sin copagos con cobertura médica completa (hospitalización ilimitada, todas las especialidades, cirugía). Acceso red Adeslas con +51.000 médicos.",
  price: "62",
  cardName: "Adeslas Plena Plus",
  cardDescription:
    "Seguro médico sin copagos con cobertura médica completa. La opción más equilibrada entre precio y protección.",
  cardPill: "Sin copagos · Cobertura completa",
  cardPillDark: false,
  cardPromoBadge: "🎁 Promoción puntos",
  cardCoverages: [
    "Hospitalización ilimitada (médica, quirúrgica, pediátrica, psiquiátrica)",
    "TODAS las especialidades médicas sin restricción",
    "Cirugía ambulatoria y hospitalaria",
    "Urgencias 24h domiciliarias, ambulatorias y hospitalarias",
    "Diagnóstico de alta tecnología (Resonancia, TAC, PET)",
    "Psicología clínica y psiquiatría (máx. 20 sesiones/año)",
    "Rehabilitación y fisioterapia sin límite de sesiones",
    "Medicina preventiva incluida",
    "Libre elección: +51.000 médicos y +1.400 centros"
  ],
  features: [
    {
      title: "Cobertura completa",
      description: "Medicina general y todas las especialidades",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L15.09 8.26h6.79l-5.5 4.15 2.1 6.36L12 14.71l-5.38 4.06 2.1-6.36-5.5-4.15h6.79z"
            stroke="#1c4a8d"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Urgencias 24h",
      description: "Domiciliarias, ambulatorias y hospitalarias",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 11l3 3L22 4"
            stroke="#1c4a8d"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
            stroke="#1c4a8d"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "+51.000 médicos",
      description: "Médicos y +1.400 centros en España",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="9" r="4" stroke="#1c4a8d" strokeWidth="1.5" />
          <path
            d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8"
            stroke="#1c4a8d"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Servicios digitales",
      description: "Videoconsultas, chat y app Adeslas LIVE",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect
            x="2"
            y="3"
            width="20"
            height="14"
            rx="1"
            stroke="#1c4a8d"
            strokeWidth="1.5"
          />
          <path
            d="M2 17h20M8 21h8"
            stroke="#1c4a8d"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ],
  tabs: [
    {
      label: "Coberturas",
      items: [
        "Medicina general, pediatría y enfermería",
        "TODAS las especialidades médicas (Cardiología, Traumatología, Oncología, etc.)",
        "Hospitalización ilimitada (médica, quirúrgica, pediátrica, psiquiátrica, hospital de día)",
        "Cirugía ambulatoria y hospitalaria",
        "Urgencias 24h domiciliarias, ambulatorias y hospitalarias",
        "Diagnóstico de alta tecnología (Resonancia, TAC, PET, etc.)",
        "Psicología clínica (máx. 20 sesiones/año) y psiquiatría",
        "Rehabilitación y fisioterapia sin límite de sesiones",
        "Trasplantes de médula ósea autóloga y córnea"
      ],
    },
    {
      label: "Ventajas",
      items: [
        "SIN COPAGOS en todos los servicios",
        "Cobertura médica IDÉNTICA a Adeslas Plena Total",
        "Libre elección entre +51.000 médicos y +1.400 centros",
        "Medicina preventiva incluida",
        "NO incluye cobertura dental (diferencia con Plena Total)",
        "Asistencia en viaje hasta 12.000€/año (emergencias médicas en España y extranjero)",
        "NO incluye cobertura de accidente (diferencia con Plena Total)"
      ],
    },
    {
      label: "Condiciones",
      items: [
        "SIN COPAGOS en ningún servicio",
        "Cuestionario de Salud obligatorio para todos los asegurados",
        "Tomador: ≥18 años",
        "Asegurados: hasta 70 años (>70 si mínimo 3 asegurados <60 años)",
        "Carencias: 8 meses hospitalización/parto, 6 meses cirugía/diagnóstico especial",
        "Descuentos: 10% a partir de 4 asegurados",
        "Bonificaciones: trimestral 2%, semestral 4%, anual 6%"
      ],
    },
  ],
  faqs: [
    {
      q: "¿Qué cubre Adeslas Plena Plus?",
      a: "Adeslas Plena Plus cubre cobertura médica COMPLETA: medicina general, pediatría, enfermería, TODAS las especialidades médicas, urgencias 24h, hospitalización ilimitada (médica, quirúrgica, pediátrica, psiquiátrica), cirugía ambulatoria y hospitalaria, diagnóstico de alta tecnología, psicología clínica (máx. 20 sesiones/año), rehabilitación y fisioterapia, trasplantes de médula ósea y córnea. TODO SIN COPAGOS."
    },
    {
      q: "¿Tiene copagos Adeslas Plena Plus?",
      a: "NO. Adeslas Plena Plus tiene CERO copagos. Pagas únicamente la prima mensual y accedes a TODOS los servicios sin ningún coste adicional."
    },
    {
      q: "¿Cuál es la diferencia entre Adeslas Plena Plus y Adeslas Plena Total?",
      a: (<>Ambos NO tienen copagos y tienen cobertura médica IDÉNTICA. La diferencia está en lo que INCLUYE además de medicina: <Link to="/adeslas-plena-total" style={{color: "#009FE3", textDecoration: "underline"}}>Adeslas Plena Total</Link> INCLUYE: cobertura dental (46 actos), asistencia viajes 100.000€, cobertura de accidente (fallecimiento, incapacidad). Adeslas Plena Plus SÍ incluye asistencia en viaje hasta 12.000€, pero NO incluye dental ni cobertura de accidente. Es la opción ideal si buscas cobertura médica completa sin copagos con protección básica en viaje.</>)
    },
    {
      q: "¿Incluye hospitalización Adeslas Plena Plus?",
      a: "Sí. Hospitalización ILIMITADA: médica, quirúrgica, pediátrica, psiquiátrica y hospital de día. Habitación individual con cama para acompañante. Sin copagos."
    },
    {
      q: "¿Cobre cirugía Adeslas Plena Plus?",
      a: "Sí. Cirugía ambulatoria y hospitalaria en TODAS las especialidades, sin copagos."
    },
    {
      q: "¿Qué especialidades incluye?",
      a: "TODAS: Alergología, Cardiología, Cirugía en todas sus modalidades, Dermatología, Endocrinología, Geriatría, Ginecología y Obstetricia, Neurología, Oftalmología, Oncología, Otorrinolaringología, Pediatría, Psicología Clínica (máx. 20 sesiones/año), Psiquiatría, Rehabilitación y Fisioterapia, Reumatología, Traumatología, Urología, y más."
    },
    {
      q: "¿Necesito cuestionario de salud?",
      a: "Sí. Adeslas Plena Plus requiere Cuestionario de Salud obligatorio para todos los asegurados (evaluación médica previa)."
    },
    {
      q: "¿Cubre psicología y psiquiatría?",
      a: "Sí. Psicología clínica (máx. 20 sesiones/año) y psiquiatría con hospitalización psiquiátrica ilimitada. Todo sin copagos."
    },
    {
      q: "¿Cubre trasplantes?",
      a: "Sí. Trasplantes de médula ósea autóloga y córnea, así como prótesis e implantes necesarios por indicación médica."
    },
    {
      q: "¿Incluye medicina preventiva?",
      a: "Sí. Adeslas Plena Plus incluye medicina preventiva: historia clínica, exploración general, analítica básica, ECG y pruebas diagnósticas según indicación médica."
    },
    {
      q: "¿Hasta qué edad puedo contratar?",
      a: "Los asegurados pueden contratar hasta los 70 años. Se admiten mayores de 70 años si el grupo tiene mínimo 3 asegurados menores de 60 años. El tomador debe ser ≥18 años."
    },
    {
      q: "¿Qué descuentos tiene Adeslas Plena Plus?",
      a: "Descuentos por número de asegurados: 10% a partir de 4 asegurados. Bonificaciones por forma de pago: trimestral 2%, semestral 4%, anual 6%. Módulo complementario: Adeslas DENTAL FAMILIA (15% descuento sobre DENTAL FAMILIA)."
    },
    {
      q: "¿Qué módulos complementarios puedo añadir?",
      a: "Puedes añadir: Adeslas DENTAL FAMILIA (15% descuento), Plus Ginecología y Pediatría, Plus Clínica Universitaria de Navarra."
    },
    {
      q: "¿Por qué elegir Adeslas Plena Plus?",
      a: "Adeslas Plena Plus ofrece cobertura médica COMPLETA sin copagos, con asistencia en viaje hasta 12.000€/año, a un precio más bajo que Adeslas Plena Total porque no incluye dental ni cobertura de accidente. Es ideal si buscas protección médica total sin copagos con precio ajustado."
    }
  ],
  schemaFaq: true,
  showPromo: true,
};

const AdeslaPlenaPlus = () => <ProductPageTemplate data={data} />;
export default AdeslaPlenaPlus;
