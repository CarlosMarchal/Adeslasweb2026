import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import heroImg from "@/assets/seguro-medico-adeslas-plena-vital.webp";

const data: ProductPageData = {
  seoTitle: "Adeslas Plena Vital | Seguro Médico Completo con Tope de Copago — Desde 38€",
  seoDescription: "Adeslas Plena Vital: hospitalización, todas las especialidades y urgencias 24h con copago máximo 300€/año. Red de +51.000 médicos y 1.400 centros. Sin listas de espera. Desde 38€/mes.",
  seoCanonical: "https://adeslas.numero1salud.es/adeslas-plena-vital",
  seoOgImage: "https://adeslas.numero1salud.es/og-vital.jpg",
  seoProductSchema: {
    name: "Adeslas Plena Vital",
    description: "Seguro médico completo con hospitalización, todas las especialidades y copagos limitados a 300€/año. Desde 38€/mes.",
    category: "Seguro de Salud",
    price: "38",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    { name: "Seguros de Salud", url: "https://adeslas.numero1salud.es/" },
    { name: "Adeslas Plena Vital", url: "https://adeslas.numero1salud.es/adeslas-plena-vital" },
  ],
  productSlug: "/seguro-salud/adeslas-plena-vital/",
  heroPromo: "Consigue puntos al contratar tu seguro ahora y conviértelos en regalos exclusivos",
  badge: "Cobertura completa · Copago máx. 300€/año",
  heroTitle: "Seguro Médico Adeslas Plena Vital",
  heroImage: heroImg,
  heroHighlight: "Hospitalización completa · Copago máximo 300€/año",
  heroSubtitle: "Hospitalización, cirugía y todas las especialidades con acceso a +51.000 médicos. Nunca pagarás más de 300€ al año en copagos, aunque uses mucho el seguro.",
  price: "38",
  pricePeriod: "mes",
  features: [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9h-3V8.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V11h-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3v3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3h3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Cobertura completa",
      description: "Hospitalización, especialidades y cirugía incluidas"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Copagos limitados",
      description: "Máximo 300€/año por asegurado"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 11H5v2h6v-2zm0-4H5v2h6V7zm0 8H5v2h6v-2zm8-1v-3.5c0-.83-.67-1.5-1.5-1.5.5-.83.5-2.17 0-3 .83 0 1.5-.67 1.5-1.5V4c0-.55-.45-1-1-1h-1c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h1c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Todas las especialidades",
      description: "Alergología, Cardiología, Traumatología y más"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Urgencias 24h",
      description: "Atención de emergencia todo el año"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Medicina preventiva",
      description: "Chequeos médicos anuales por edad"
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75-3.54L6.5 15h11z" fill="#1c4a8d"/>
        </svg>
      ),
      title: "Diagnóstico avanzado",
      description: "Alta tecnología, resonancia, TAC"
    }
  ],
  cardName: "Adeslas Plena Vital",
  cardDescription: "Seguro médico completo con hospitalización e ilimitadas especialidades. Copagos limitados a 300€/año.",
  cardCoverages: [
    "Hospitalización médica, quirúrgica, pediátrica y psiquiátrica",
    "Medicina general, pediatría y enfermería",
    "Todas las especialidades médicas",
    "Urgencias 24h domiciliarias y hospitalarias",
    "Diagnóstico de alta tecnología (Resonancia, TAC)",
    "Cirugía ambulatoria y hospitalaria",
    "Psicología clínica (máx. 20 sesiones/año)",
    "Rehabilitación y fisioterapia",
    "Copagos limitados a 300€/año"
  ],
  cardPill: "Copagos LMA 300€ · Cobertura total",
  cardPillDark: true,
  cardPromoBadge: "🎁 Promoción puntos",
  tabs: [
    {
      label: "Coberturas",
      items: [
        "Medicina general, pediatría y enfermería",
        "Todas las especialidades médicas (Alergología, Cardiología, Traumatología, etc.)",
        "Urgencias 24h domiciliarias, ambulatorias y hospitalarias",
        "Hospitalización (médica, quirúrgica, pediátrica, psiquiátrica y hospital de día)",
        "Cirugía ambulatoria y hospitalaria",
        "Diagnóstico de alta tecnología (Resonancia, TAC, etc.)",
        "Psicología clínica (máx. 20 sesiones/año)",
        "Rehabilitación y fisioterapia",
        "Análisis clínicos y anatomía patológica"
      ]
    },
    {
      label: "Copagos",
      items: [
        "Medicina general: 7€",
        "Domicilio: 14,50€",
        "Pediatría: 8€",
        "Enfermería: 2€",
        "Urgencias: 14,50€",
        "Especialidades consulta: 14,50€",
        "Actos quirúrgicos: 14,50€",
        "Psicología: 14,50€",
        "Rehabilitación: 5€ por sesión",
        "Logopedia: 5€ por sesión",
        "Alta tecnología: 45€",
        "Intervencionista: 45€",
        "Podología: 3€",
        "Parto: 45€",
        "Litotricia: 45€",
        "Límite máximo anual (LMA): 300€/asegurado/año"
      ]
    },
    {
      label: "Ventajas",
      items: [
        "Limite máximo anual (LMA) de copagos: 300€/asegurado/año",
        "Medicina preventiva: chequeos anuales adaptados por edad",
        "Libre elección entre +51.000 médicos y +1.400 centros",
        "Cuestionario de Salud obligatorio (evaluación médica previa)",
        "Carencias: 3-8 meses según cobertura",
        "Descuentos: 10% a partir de 4 asegurados",
        "Bonificaciones por pago: trimestral 2%, semestral 4%, anual 6%"
      ]
    },
    {
      label: "Condiciones",
      items: [
        "Copagos limitados a máximo 300€/asegurado/año",
        "Cuestionario de Salud obligatorio para todos los asegurados",
        "Tomador: ≥18 años",
        "Asegurados: hasta 70 años (>70 si mínimo 3 asegurados <60 años)",
        "Carencias: 8 meses hospitalización/parto, 6 meses cirugía/diagnóstico especial",
        "Renovación anual"
      ]
    }
  ],
  faqs: [
    {
      q: "¿Qué cubre Adeslas Plena Vital?",
      a: "Adeslas Plena Vital cubre asistencia médica COMPLETA: medicina general, pediatría, enfermería, TODAS las especialidades médicas, urgencias 24h, HOSPITALIZACIÓN (médica, quirúrgica, pediátrica, psiquiátrica), cirugía ambulatoria y hospitalaria, diagnóstico de alta tecnología, psicología clínica (máx. 20 sesiones/año), rehabilitación, fisioterapia, análisis y pruebas diagnósticas."
    },
    {
      q: "¿Tiene copagos Adeslas Plena Vital?",
      a: "Sí. A diferencia de lo que dice la página anterior, Adeslas Plena Vital SÍ tiene copagos, pero están limitados a un máximo de 300€ por asegurado y año. Por ejemplo: medicina general 7€, especialidades 14,50€, urgencias 14,50€, análisis 11,50€, alta tecnología diagnóstica 45€. Una vez alcanzados los 300€, los servicios restantes son gratuitos."
    },
    {
      q: "¿Cuál es el límite máximo anual (LMA) de copagos?",
      a: "El límite máximo anual de copagos es 300€ por asegurado. Esto significa que una vez pagas 300€ en copagos durante el año, todos los servicios adicionales son gratuitos hasta la renovación anual."
    },
    {
      q: "¿Incluye Adeslas Plena Vital hospitalización?",
      a: "Sí. Adeslas Plena Vital incluye hospitalización ILIMITADA: médica, quirúrgica, pediátrica, psiquiátrica y hospital de día. Habitación individual con cama para acompañante incluida. El copago por hospitalización es 14,50€."
    },
    {
      q: "¿Qué diferencia hay entre Adeslas Plena Vital y Adeslas GO?",
      a: (<>Ambos tienen copagos limitados, pero Adeslas Plena Vital es MUCHO más completo: <Link to="/seguro-salud/adeslas-go/" style={{color: "#009FE3", textDecoration: "underline"}}>Adeslas GO</Link> es solo ambulatorio (LMA 260€, sin hospitalización) mientras que Adeslas Plena Vital incluye HOSPITALIZACIÓN, CIRUGÍA y TODAS LAS ESPECIALIDADES (LMA 300€). Plena Vital es la opción más equilibrada en protección y precio.</>)
    },
    {
      q: "¿Cubre cirugía Adeslas Plena Vital?",
      a: "Sí. Adeslas Plena Vital cubre cirugía ambulatoria y hospitalaria completa, incluyendo todas las especialidades quirúrgicas."
    },
    {
      q: "¿Necesito cuestionario de salud para Adeslas Plena Vital?",
      a: "Sí. A diferencia de Adeslas GO, Adeslas Plena Vital requiere Cuestionario de Salud obligatorio para todos los asegurados. Esto es una evaluación médica previa."
    },
    {
      q: "¿Qué especialidades cubre?",
      a: "TODAS las especialidades médicas: Alergología, Cardiología, Cirugía en todas sus modalidades, Dermatología, Endocrinología, Geriatría, Ginecología y Obstetricia, Neurología, Oftalmología, Oncología, Otorrinolaringología, Pediatría, Psicología Clínica (máx. 20 sesiones/año), Psiquiatría, Rehabilitación y Fisioterapia, Reumatología, Traumatología, Urología, y más."
    },
    {
      q: "¿Incluye medicina preventiva?",
      a: "Sí. Adeslas Plena Vital incluye medicina preventiva con chequeos médicos anuales adaptados por edad y sexo."
    },
    {
      q: "¿Cubre psiquiatría y psicología clínica?",
      a: "Sí. Incluye psicología clínica (máx. 20 sesiones/año) y psiquiatría, con hospitalización psiquiátrica ilimitada."
    },
    {
      q: "¿Qué descuentos y bonificaciones tiene?",
      a: "Descuentos: 10% a partir de 4 asegurados. Bonificaciones por forma de pago: trimestral 2%, semestral 4%, anual 6%. Módulo complementario: Adeslas DENTAL FAMILIA con 15% descuento."
    },
    {
      q: "¿Hasta qué edad puedo contratar?",
      a: "Los asegurados pueden contratar hasta los 70 años. Se admiten mayores de 70 años si el grupo tiene mínimo 3 asegurados menores de 60 años. El tomador debe ser ≥18 años."
    }
  ],
  showPromo: true,
  schemaFaq: true
};

export default function AdeslaPlenaVital() {
  return <ProductPageTemplate data={data} />;
}
