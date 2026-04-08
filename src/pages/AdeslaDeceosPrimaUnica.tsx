import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import ContactCtaCard from "@/components/ContactCtaCard";
import heroImg from "@/assets/seguro-decesos-adeslas.webp";

const data: ProductPageData = {
  seoTitle:
    "Adeslas Decesos Prima Única | Pago Único · Cobertura Vitalicia",
  seoDescription:
    "Seguro de decesos Adeslas de Prima Única. Un solo pago inicial garantiza el servicio funerario completo de forma vitalicia. Sin cuotas mensuales ni renovaciones. Traslado y repatriación incluidos. Llama al 91 710 50 00.",
  seoCanonical:
    "https://adeslas.numero1salud.es/seguro-adeslas-decesos-prima-unica/",
  seoOgImage: "https://adeslas.numero1salud.es/og-decesos-prima-unica.jpg",
  seoProductSchema: {
    name: "Adeslas Decesos Prima Única",
    description:
      "Seguro de decesos con pago único que garantiza cobertura vitalicia sin renovaciones ni incrementos de prima.",
    category: "Seguro de Decesos",
    price: "2",
    pricePeriod: "mes equivalente",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    { name: "Seguros Adeslas", url: "https://adeslas.numero1salud.es/" },
    {
      name: "Adeslas Decesos Prima Única",
      url: "https://adeslas.numero1salud.es/seguro-adeslas-decesos-prima-unica/",
    },
  ],
  productSlug: "/seguro-adeslas-decesos-prima-unica/",
  badge: "Pago único · Cobertura vitalicia",
  heroTitle: "Seguro de Decesos Adeslas Prima Única",
  heroImage: heroImg,
  heroHighlight: "Un solo pago · Tranquilidad para siempre",
  heroSubtitle:
    "Deja cubiertos todos los gastos funerarios con un único pago y evita preocupaciones futuras a tu familia. Cobertura vitalicia sin cuotas mensuales ni renovaciones.",
  price: "",
  pricePeriod: "",
  customTarificador: <ContactCtaCard />,
  usePhoneCallCta: true,
  hideHeroBadges: true,
  hideHeroPrice: true,
  hideCardPrice: true,
  cardName: "Adeslas Decesos Prima Única",
  cardDescription:
    "Un único pago inicial garantiza el servicio funerario completo de por vida. Sin cuotas ni renovaciones anuales.",
  cardPill: "Pago único · Vitalicio",
  cardPillDark: true,
  cardCoverages: [
    "Servicio funerario completo (inhumación o incineración)",
    "Féretro y urna cineraria incluidos",
    "Sala de velatorio y coche fúnebre",
    "Trámites administrativos y documentación",
    "Asistencia a la familia 24 horas",
    "Traslado nacional e internacional",
    "Repatriación desde cualquier país del mundo",
    "Cobertura vitalicia — sin renovaciones ni cuotas",
  ],
  features: [
    {
      title: "Pago único",
      description:
        "Se paga una sola vez y la cobertura es vitalicia. Sin cuotas mensuales ni revisiones anuales.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill="#1c4a8d"
          />
        </svg>
      ),
    },
    {
      title: "Servicio completo",
      description:
        "Gestión integral del sepelio: féretro, tanatorio, trámites y asesor funerario especializado.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-2-13h4v6h-4z"
            fill="#1c4a8d"
          />
        </svg>
      ),
    },
    {
      title: "Traslado y repatriación",
      description:
        "Traslado dentro de España y repatriación internacional incluidos.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5h2c0-1.66 1.34-3 3-3s3 1.34 3 3c0 3-4.5 4-4.5 4v2h3v-1.5c2.5-1 4.5-2.5 4.5-5.5 0-2.76-2.24-5-5-5z"
            fill="#1c4a8d"
          />
        </svg>
      ),
    },
    {
      title: "Asistencia 24/7",
      description:
        "Familia atendida las 24 horas. Gestionado por especialistas en decesos.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"
            fill="#1c4a8d"
          />
        </svg>
      ),
    },
  ],
  tabs: [
    {
      label: "Coberturas",
      items: [
        "Inhumación o incineración",
        "Féretro y urna cineraria",
        "Acondicionamiento sanitario y estético del fallecido",
        "Sala de velatorio o capilla ardiente",
        "Coche fúnebre y vehículo de acompañamiento",
        "Nicho temporal según localidad",
        "Servicio religioso u oratorio",
        "Coronas de flores, libro de firmas y recordatorios",
        "Gestión de documentación y trámites administrativos",
        "Asesor funerario especializado que coordina todo el servicio",
      ],
    },
    {
      label: "¿Qué incluye?",
      items: [
        "Traslado dentro de España entre municipios",
        "Repatriación de restos mortales desde el extranjero",
        "Si el sepelio se realiza en el extranjero, reembolso hasta el capital asegurado",
        "Asesoramiento profesional desde el primer momento",
        "Gestión integral sin que la familia tenga que preocuparse de nada",
      ],
    },
    {
      label: "Condiciones",
      items: [
        "Pago único al momento de la contratación",
        "Cobertura vitalicia — no tiene vencimiento",
        "Sin cuotas mensuales ni renovaciones anuales",
        "Sin incrementos futuros de prima",
        "Especialmente orientado a personas de edad avanzada",
        "Para información: 91 710 50 00",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Qué es el Seguro de Decesos Prima Única de Adeslas?",
      a: "Es un seguro de decesos que, mediante un único pago inicial, garantiza la prestación completa del servicio funerario de forma vitalicia. No tiene cuotas mensuales, ni renovaciones anuales, ni incrementos futuros de prima.",
    },
    {
      q: "¿Qué significa prima única?",
      a: "Significa que el seguro se paga una sola vez al contratar y la cobertura es vitalicia. No existen cuotas mensuales, renovaciones anuales ni incrementos futuros de prima.",
    },
    {
      q: "¿Qué cubre el Seguro de Decesos Prima Única?",
      a: "Cubre la prestación completa del servicio funerario: inhumación o incineración, féretro, sala velatorio, coche fúnebre, trámites administrativos y asesor funerario especializado, dentro del capital asegurado contratado.",
    },
    {
      q: "¿Incluye traslado o repatriación?",
      a: "Sí. Incluye traslado dentro de España y repatriación desde cualquier país del mundo hasta España. Si el sepelio se realiza en el extranjero, se reembolsan los gastos hasta el límite del capital asegurado.",
    },
    {
      q: "¿Está pensado para personas mayores?",
      a: "Sí. El seguro de decesos prima única está especialmente orientado a personas de edad avanzada que desean dejar cubiertos todos los gastos funerarios sin asumir pagos periódicos.",
    },
    {
      q: "¿Cuál es la diferencia entre el seguro de decesos y el seguro de vida?",
      a: "El seguro de decesos presta directamente el servicio funerario y gestiona todos los trámites. El seguro de vida indemniza con una cantidad económica a los beneficiarios, pero no organiza el sepelio.",
    },
    {
      q: "¿Cómo puedo informarme o contratar?",
      a: "Puedes llamar al 91 710 50 00 o solicitar que te llamemos gratis. Un asesor especializado te informará sin compromiso y gestionará tu contratación.",
    },
  ],
  schemaFaq: true,
  showPromo: false,
};

const AdeslaDeceosPrimaUnica = () => <ProductPageTemplate data={data} />;

export default AdeslaDeceosPrimaUnica;
