import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import ContactCtaCard from "@/components/ContactCtaCard";
import heroImg from "@/assets/asisa_salud_seguro_medico.webp";

const data: ProductPageData = {
  seoTitle: "Adeslas Viaje | Seguro de Asistencia en Viaje desde 8,50€/día — Cobertura Mundial",
  seoDescription: "Seguro de asistencia en viaje Adeslas con cobertura mundial. Emergencias médicas, repatriación, cancelación de vuelos y equipaje. Contrata por días, semanas o meses. Desde 8,50€/día.",
  seoCanonical: "https://adeslas.marchalaseguradores.es/adeslas-asistencia-viaje",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-viaje.jpg",
  seoProductSchema: {
    name: "Adeslas Asistencia en Viaje",
    description: "Seguro de asistencia en viaje Adeslas con cobertura mundial. Cubre emergencias médicas, hospitalización, farmacia, repatriación médica urgente y de restos mortales, vuelta anticipada por fallecimiento de familiar, cancelación de vuelo, retraso de transporte, pérdida y robo de equipaje, COVID-19 con test y gastos de cuarentena, y asistencia 24h en todo el mundo. Sin permanencia mínima. Contrata por días, semanas o meses según tu viaje. Desde 8,50€/día.",
    category: "Seguro de Viaje",
    price: "8.50",
    pricePeriod: "day",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Otros Seguros", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Asistencia en Viaje", url: "https://adeslas.marchalaseguradores.es/adeslas-asistencia-viaje" },
  ],
  badge: "Cobertura mundial · Sin permanencia",
  heroTitle: "Adeslas Asistencia en Viaje",
  heroHighlight: "Cobertura Mundial sin Permanencia",
  heroSubtitle: "Seguro de viaje con asistencia médica de emergencia en todo el mundo. Contrata por días, semanas o meses según tu viaje.",
  price: "desde 8,50",
  pricePeriod: "/día",
  heroImage: heroImg,
  customTarificador: <ContactCtaCard />,
  usePhoneCallCta: true,
  hideHeroBadges: true,
  cardName: "Adeslas Asistencia en Viaje",
  cardDescription: "Protección médica completa durante tus viajes al extranjero. Sin compromisos de permanencia, contrata solo para los días que necesitas.",
  cardPill: "Sin permanencia · Cobertura mundial",
  cardCoverages: [
    "Emergencias médicas en el extranjero",
    "Hospitalización y farmacia",
    "Repatriación médica urgente y por fallecimiento",
    "Vuelta anticipada por fallecimiento de familiar",
    "Cancelación de vuelo o viaje",
    "Retraso de transporte",
    "Pérdida y robo de equipaje",
    "COVID-19: asistencia médica, test y cuarentena",
    "Asistencia 24h en todo el mundo",
  ],
  features: [
    {
      title: "Emergencias médicas globales",
      description: "Cobertura de gastos médicos urgentes, farmacia y hospitalización en cualquier país del mundo.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 9.5c0 .83-.67 1.5-1.5 1.5S11 13.33 11 12.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM5 5h14v4h-2c-2.66 0-5 1.34-5 3s-2.34 3-5 3H5V5zm14 14H5v-4h2c2.66 0 5-1.34 5-3s2.34-3 5-3h2v10z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Repatriación incluida",
      description: "Repatriación médica urgente y repatriación de restos mortales si fuera necesario. Sin coste adicional.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.42V7z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Cancelación y equipaje",
      description: "Cobertura por cancelación de vuelo, retrasos de transporte y pérdida o robo de equipaje.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "COVID-19 cubierto",
      description: "Asistencia médica completa por COVID-19: consultas, test diagnóstico, hospitalización y gastos de cuarentena obligatoria.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#1c4a8d"/>
        </svg>
      ),
    },
  ],
  tabs: [
    {
      label: "Coberturas médicas",
      items: [
        "Urgencias médicas en el extranjero",
        "Hospitalización en destino",
        "Farmacia y medicamentos",
        "Pruebas diagnósticas urgentes",
        "Ambulancia y transporte sanitario",
        "Repatriación médica urgente",
        "Repatriación de restos mortales",
        "Vuelta anticipada por hospitalización o fallecimiento de familiar de primer grado",
        "Gastos de estancia por hospitalización prolongada",
        "Asistencia médica COVID-19",
        "Test PCR u otras pruebas COVID-19",
        "Gastos de cuarentena obligatoria (COVID-19)",
      ],
    },
    {
      label: "Otras coberturas",
      items: [
        "Cancelación de vuelo o viaje",
        "Retraso de vuelo (a partir de cierto número de horas)",
        "Pérdida de equipaje facturado",
        "Retraso de equipaje",
        "Robo de documentos en destino",
        "Asistencia jurídica en destino",
        "Asistencia 24h en todo el mundo",
        "Sin permanencia mínima",
        "Contratación por días, semanas o meses",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Cubre el COVID-19 durante el viaje?",
      a: "Sí. El seguro de asistencia en viaje Adeslas incluye cobertura completa por COVID-19: asistencia médica en destino, pruebas diagnósticas (PCR), hospitalización si fuera necesaria y gastos derivados de una cuarentena obligatoria impuesta por las autoridades del país de destino.",
    },
    {
      q: "¿Puedo contratar el seguro solo para unos días?",
      a: "Sí, una de las principales ventajas es la flexibilidad: puedes contratar el seguro por días, semanas o meses según la duración de tu viaje. No hay período mínimo de contratación ni compromiso de permanencia.",
    },
    {
      q: "¿Incluye la repatriación al fallecimiento?",
      a: "Sí. El seguro cubre tanto la repatriación médica urgente si sufres una emergencia grave, como la repatriación de restos mortales al país de residencia en caso de fallecimiento durante el viaje.",
    },
    {
      q: "¿Qué pasa si pierdo el equipaje?",
      a: "El seguro incluye cobertura por pérdida, robo o retraso del equipaje facturado en vuelos tanto nacionales como internacionales. Se indemniza según el importe asegurado y la documentación del siniestro.",
    },
    {
      q: "¿Es válido para viajes de trabajo?",
      a: "Sí, el seguro es válido tanto para viajes de ocio como de negocios. Cubre emergencias médicas, hospitalización y otras incidencias independientemente del motivo del viaje, siempre que se trate de un desplazamiento fuera del lugar de residencia habitual.",
    },
  ],
  schemaFaq: true,
  showPromo: true,
};

const AdeslaAsistenciaViaje = () => <ProductPageTemplate data={data} />;

export default AdeslaAsistenciaViaje;
