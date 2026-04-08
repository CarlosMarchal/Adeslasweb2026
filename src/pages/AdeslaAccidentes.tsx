import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import ContactCtaCard from "@/components/ContactCtaCard";
import heroImg from "@/assets/seguro-viaje-adeslas.webp";

const data: ProductPageData = {
  seoTitle: "Adeslas Accidentes | Seguro de Accidentes con Cobertura 24h desde 5,89€/mes",
  seoDescription: "Seguro de accidentes Adeslas con cobertura 24h en todo el mundo. Fallecimiento, invalidez, asistencia médica y hospitalización por accidente. Desde 5,89€/mes.",
  seoCanonical: "https://adeslas.numero1salud.es/seguro-accidentes/",
  seoOgImage: "https://adeslas.numero1salud.es/og-accidentes.jpg",
  seoProductSchema: {
    name: "Adeslas Accidentes",
    description: "Seguro de accidentes Adeslas con cobertura 24h en todo el mundo. Capital garantizado de 100% en fallecimiento o invalidez permanente total por accidente. En accidentes de tráfico, la indemnización se dobla a 200% del capital. Incluye asistencia médica, farmacia, hospitalización, cirugía, repatriación, atención dental por accidente y cancelación de tarjetas de crédito (hasta 3.000€). Sin períodos de carencia. Desde 5,89€/mes.",
    category: "Seguro de Accidentes",
    price: "5.89",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    { name: "Otros Seguros", url: "https://adeslas.numero1salud.es/" },
    { name: "Seguro de Accidentes", url: "https://adeslas.numero1salud.es/seguro-accidentes/" },
  ],
  badge: "Cobertura 24h · En todo el mundo",
  heroTitle: "Seguro de Accidentes Adeslas",
  heroHighlight: "Protección 24 Horas en Todo el Mundo",
  heroSubtitle: "Protección económica completa ante cualquier accidente: fallecimiento, invalidez permanente, hospitalización y asistencia médica urgente desde el primer día.",
  price: "desde 5,89",
  pricePeriod: "/mes",
  heroImage: heroImg,
  customTarificador: <ContactCtaCard />,
  usePhoneCallCta: true,
  hideHeroBadges: true,
  cardName: "Seguro de Accidentes Adeslas",
  cardDescription: "Protección económica inmediata ante accidentes: capital garantizado en caso de fallecimiento o invalidez, y cobertura médica completa.",
  cardPill: "Desde 5,89€/mes · Cobertura mundial",
  cardCoverages: [
    "Fallecimiento por accidente: 100% del capital asegurado",
    "Invalidez permanente total: 100% del capital",
    "Invalidez permanente parcial: % según baremo",
    "Asistencia médica completa por accidente",
    "Hospitalización y cirugía por accidente",
    "Repatriación nacional e internacional",
    "Atención dental por accidente",
    "Protección en accidentes de tráfico (200% capital)",
    "Cancelación de tarjetas de crédito (hasta 3.000€)",
    "Asistencia urgente 24h en todo el mundo",
  ],
  features: [
    {
      title: "Capital garantizado",
      description: "100% del capital asegurado en caso de fallecimiento o invalidez permanente total por accidente. Pago inmediato.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Cobertura en tráfico",
      description: "En accidentes de tráfico, la indemnización por invalidez permanente se dobla: 200% del capital asegurado.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm11 0c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM5 11h14V9.38c0-.14-.11-.26-.25-.26H5.25c-.14 0-.25.12-.25.26V11z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Asistencia médica completa",
      description: "Todos los gastos médicos, farmacéuticos y de hospitalización derivados del accidente quedan cubiertos.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 9.5c0 .83-.67 1.5-1.5 1.5S11 13.33 11 12.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM5 5h14v4h-2c-2.66 0-5 1.34-5 3s-2.34 3-5 3H5V5zm14 14H5v-4h2c2.66 0 5-1.34 5-3s2.34-3 5-3h2v10z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Cobertura mundial 24h",
      description: "Protección las 24 horas, los 365 días del año, en cualquier lugar del mundo. Sin franquicias ni períodos de carencia.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="#1c4a8d"/>
        </svg>
      ),
    },
  ],
  tabs: [
    {
      label: "Coberturas incluidas",
      items: [
        "Fallecimiento por accidente (100% del capital)",
        "Invalidez permanente total (100% del capital)",
        "Invalidez permanente parcial (% según baremo)",
        "En accidente de tráfico: 200% del capital por invalidez",
        "Asistencia médica, farmacéutica y hospitalización por accidente",
        "Intervenciones quirúrgicas por accidente",
        "Pruebas diagnósticas y radiologías por accidente",
        "Atención dental urgente por accidente",
        "Repatriación sanitaria nacional e internacional",
        "Repatriación de restos mortales",
        "Anticipo de gastos de sepelio",
        "Cancelación de tarjetas de crédito (hasta 3.000€)",
        "Asistencia jurídica en reclamaciones por accidente",
        "Asistencia 24h en todo el mundo",
      ],
    },
    {
      label: "Condiciones generales",
      items: [
        "Sin período de carencia — cobertura desde el primer día",
        "Cobertura 24 horas, 365 días al año",
        "Válido en todo el mundo",
        "Cobertura opcional para moto, scooter y ciclismo de competición",
        "Sin franquicia",
        "Contratación desde 18 hasta 65 años (consultar para otras edades)",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Qué cubre exactamente el seguro de accidentes?",
      a: "El seguro de accidentes Adeslas cubre las consecuencias económicas y médicas de un accidente: fallecimiento (100% del capital), invalidez permanente total o parcial, todos los gastos médicos y hospitalarios derivados del accidente, repatriación y asistencia jurídica. No cubre enfermedades, solo accidentes.",
    },
    {
      q: "¿Qué diferencia hay con un seguro de salud?",
      a: "El seguro de accidentes solo cubre situaciones derivadas de un accidente (lesión corporal involuntaria, súbita y externa). No cubre enfermedades ni consultas médicas rutinarias. Es un complemento ideal para quienes ya tienen seguro de salud y quieren protección económica adicional ante imprevistos.",
    },
    {
      q: "¿Incluye cobertura en moto o bicicleta?",
      a: "La cobertura básica incluye accidentes de tráfico estándar. Como cobertura opcional, se puede ampliar específicamente para accidentes en moto, scooter o ciclismo de competición.",
    },
    {
      q: "¿Qué pasa si el accidente es de tráfico?",
      a: "Los accidentes de tráfico están especialmente cubiertos: en caso de invalidez permanente causada por un accidente de tráfico, la indemnización es el doble del capital asegurado (200%).",
    },
    {
      q: "¿Hay período de carencia?",
      a: "No. El seguro de accidentes Adeslas no tiene período de carencia. La cobertura es efectiva desde el primer día de contrato, las 24 horas del día, en todo el mundo.",
    },
  ],
  schemaFaq: true,
  showPromo: true,
};

const AdeslaAccidentes = () => <ProductPageTemplate data={data} />;

export default AdeslaAccidentes;
