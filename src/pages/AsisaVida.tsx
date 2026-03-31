import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import ContactCtaCard from "@/components/ContactCtaCard";
import heroImg from "@/assets/seguro-vida-asisa.webp";

const data: ProductPageData = {
  seoTitle: "Seguro de Vida Adeslas Tranquilidad | Desde 30€/año",
  seoDescription: "Adeslas Dental Tranquilidad desde 30€/año. Capital hasta 720.000€. Fallecimiento, IPA y accidente. 20% dto. para siempre contratando antes del 15 de abril.",
  seoCanonical: "https://adeslas.marchalaseguradores.es/asisa-vida",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-vida.jpg",
  seoProductSchema: {
    name: "Adeslas Dental Tranquilidad",
    description: "Seguro de vida Temporal Anual Renovable (TAR) que cubre fallecimiento por cualquier causa hasta los 75 años, con capital máximo de 720.000€. Garantías opcionales por accidente, IPA y diagnóstico de cáncer ginecológico femenino.",
    category: "Seguro de vida",
    price: "30",
    pricePeriod: "year",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Seguro de Vida Adeslas Tranquilidad", url: "https://adeslas.marchalaseguradores.es/asisa-vida" },
  ],
  badge: "Prima mínima desde 30€/año",
  heroTitle: "Seguro de Vida Adeslas",
  heroHighlight: "Capital hasta 720.000€ · Modalidad Flexible",
  heroSubtitle: "Protege el futuro económico de tu familia ante cualquier imprevisto. Capital hasta 720.000€, garantías opcionales flexibles y modalidad Temporal Anual Renovable.",
  heroPromo: "20% de descuento para toda la vida si contratas antes del 15 de abril de 2026",
  price: "desde 30",
  pricePeriod: "/año",
  heroImage: heroImg,
  customTarificador: <ContactCtaCard />,
  usePhoneCallCta: true,
  hideHeroBadges: true,
  cardName: "Adeslas Dental Tranquilidad",
  cardDescription: "La tranquilidad de saber que tu familia estará protegida económicamente pase lo que pase. El seguro de vida más competitivo de España.",
  cardPill: "🎁 20% dto. para toda la vida · Hasta el 15 de abril",
  cardPillDark: true,
  cardCoverages: [
    "Fallecimiento por cualquier causa (hasta 75 años)",
    "Capital máximo asegurable: 720.000€",
    "Garantía opcional: Fallecimiento por Accidente",
    "Garantía opcional: IPA por cualquier causa o por accidente",
    "Garantía opcional: Accidente de Circulación",
    "Garantía opcional: Cáncer Ginecológico Femenino",
    "Beneficiarios a tu elección",
    "Renovación automática anual (TAR)",
  ],
  features: [
    {
      title: "Cobertura principal garantizada",
      description: "Fallecimiento por cualquier causa cubierto hasta los 75 años. Capital máximo de 720.000€ elegido por el tomador.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Garantías opcionales personalizables",
      description: "Amplía tu póliza añadiendo garantías opcionales: fallecimiento por accidente, IPA, accidente de circulación y diagnóstico de cáncer ginecológico femenino (vigentes hasta los 67 años).",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "20% de descuento para toda la vida",
      description: "Contrata antes del 15 de abril de 2026 y obtén un 20% de descuento en tu prima para siempre. Una oferta exclusiva por tiempo limitado.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Prima desde 30€/año",
      description: "Prima mínima anual de 30€ (impuestos incluidos, 2026). La prima se actualiza con tu edad en cada renovación. Pago mensual, trimestral, semestral o anual sin recargo.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="#1c4a8d"/>
        </svg>
      ),
    },
  ],
  tabs: [
    {
      label: "Cobertura incluida",
      items: [
        "Fallecimiento por cualquier causa (permanencia hasta los 75 años)",
        "Capital máximo asegurable: 720.000€",
        "Beneficiarios designados libremente por el tomador",
        "Primas anuales con opción mensual, trimestral o semestral sin recargo",
        "Renovación automática anual — Temporal Anual Renovable (TAR)",
        "El contrato se extingue en caso de fallecimiento o IPA del asegurado",
      ],
    },
    {
      label: "Garantías opcionales",
      items: [
        "Fallecimiento por Accidente: capital igual al de la garantía principal",
        "Incapacidad Permanente y Absoluta (IPA) por cualquier causa",
        "Incapacidad Permanente y Absoluta (IPA) por Accidente",
        "Fallecimiento por Accidente de Circulación: capital igual al de la garantía principal",
        "IPA por Accidente de Circulación",
        "Diagnóstico de Cáncer Ginecológico Femenino: 10.000€, 20.000€ o 30.000€ (carencia 120 días)",
        "Todas las garantías opcionales vigentes hasta los 67 años",
      ],
    },
    {
      label: "Condiciones",
      items: [
        "Edad de contratación: de 18 a 66 años",
        "Permanencia: hasta 75 años (garantía principal), 67 años (garantías opcionales)",
        "Prima variable: se actualiza con la edad actuarial en cada renovación anual",
        "Prima mínima anual: 30€ (impuestos incluidos, 2026)",
        "🎁 20% de descuento para toda la vida si contratas antes del 15 de abril de 2026",
        "Requiere cumplimentar cuestionario de salud en la contratación",
        "No tiene valor de rescate, reducción ni anticipos",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Qué es el seguro Adeslas Dental Tranquilidad?",
      a: "Adeslas Dental Tranquilidad es un seguro de vida en modalidad Temporal Anual Renovable (TAR) que cubre el fallecimiento por cualquier causa hasta los 75 años de permanencia, con capital máximo de 720.000€. Permite personalizar la póliza con garantías opcionales adicionales vigentes hasta los 67 años: fallecimiento por accidente, IPA, fallecimiento por accidente de circulación y diagnóstico de cáncer ginecológico femenino.",
    },
    {
      q: "¿Cuánto cuesta el seguro de vida Adeslas?",
      a: "La prima mínima anual es de 30€ por persona (impuestos incluidos, 2026). El precio depende de la edad del asegurado y del capital elegido. Como referencia, para 100.000€ de capital de fallecimiento, la prima anual es de 37,04€ a los 30 años, 84,47€ a los 40 años y 142,45€ a los 45 años. Si contratas antes del 15 de abril de 2026, obtienes un 20% de descuento para toda la vida de la póliza.",
    },
    {
      q: "¿Necesito pasar un reconocimiento médico para contratar?",
      a: "No es necesario un reconocimiento médico físico. Sin embargo, sí es obligatorio cumplimentar un cuestionario de salud en el momento de la contratación. La emisión de la póliza está supeditada a la aceptación del riesgo por parte de Adeslas Dental.",
    },
    {
      q: "¿Qué cubre el seguro de vida Adeslas Tranquilidad?",
      a: "La cobertura principal es el fallecimiento por cualquier causa hasta los 75 años, con capital máximo de 720.000€. Como garantías opcionales (vigentes hasta los 67 años) puedes añadir: fallecimiento por accidente, fallecimiento por accidente de circulación, Incapacidad Permanente y Absoluta (IPA) por cualquier causa, IPA por accidente, IPA por accidente de circulación, y diagnóstico de cáncer ginecológico femenino.",
    },
    {
      q: "¿Hay alguna promoción activa en el seguro de vida Adeslas?",
      a: "Sí. Hasta el 15 de abril de 2026, Adeslas ofrece un 20% de descuento para toda la vida de la póliza a todos los nuevos asegurados que contraten el seguro de vida Tranquilidad. Este descuento se aplica de forma permanente sobre la prima en cada renovación anual. Consúltanos para beneficiarte de esta oferta.",
    },
    {
      q: "¿Qué es la garantía de Cáncer Ginecológico Femenino?",
      a: "Es una garantía opcional que cubre el diagnóstico de cáncer ginecológico maligno: mama, cérvix (cuello uterino), útero, ovario, vagina, vulva y trompas de Falopio. Disponible en tres importes: 10.000€, 20.000€ o 30.000€. Tiene una carencia de 120 días desde la contratación. El importe cobrado se considera un anticipo de la suma asegurada por fallecimiento. No cubre cánceres premaligno, no invasivos o displasia cervical CIN1, CIN-2 o CIN-3.",
    },
    {
      q: "¿Qué es la Incapacidad Permanente y Absoluta (IPA)?",
      a: "La IPA se produce cuando el asegurado queda imposibilitado de forma definitiva e irreversible para ejercer cualquier tipo de trabajo u ocupación, ya sea por enfermedad o accidente. En ese caso, se abona el capital contratado en la garantía de IPA, que es igual al de la garantía principal de fallecimiento.",
    },
    {
      q: "¿Qué diferencia hay entre la garantía de accidente y la de accidente de circulación?",
      a: "Son dos garantías opcionales independientes y acumulables. La garantía de fallecimiento por accidente cubre el fallecimiento causado por accidente (causa violenta, súbita, externa y ajena; el infarto de miocardio no se considera accidente). La de accidente de circulación es específica para accidentes de tráfico. Si contratas la garantía principal de fallecimiento más ambas garantías opcionales de accidente, el capital total acumulado en caso de accidente de circulación puede llegar a triplicar el capital principal.",
    },
    {
      q: "¿La prima es fija durante toda la vida del seguro?",
      a: "No. Al ser un seguro Temporal Anual Renovable (TAR), la prima se actualiza en cada renovación anual en función de la edad actuarial del asegurado. La prima aumenta progresivamente con la edad. No se prevé variación en la tarifa salvo que se comunique al tomador conforme a la legislación vigente.",
    },
    {
      q: "¿Hasta qué edad puedo contratar y hasta cuándo me cubre?",
      a: "La edad mínima de contratación es 18 años y la máxima de entrada es 66 años. La garantía principal de fallecimiento por cualquier causa cubre hasta los 75 años de permanencia. Las garantías opcionales tienen un límite de permanencia de 67 años.",
    },
    {
      q: "¿Quién puede ser beneficiario del seguro de vida?",
      a: "El tomador designa libremente a sus beneficiarios: cónyuge, pareja, hijos, familiares u otras personas. Los beneficiarios pueden cambiarse en cualquier momento comunicándolo por escrito a Adeslas.",
    },
    {
      q: "¿Tiene valor de rescate o puedo solicitar un anticipo del capital?",
      a: "No. El seguro de vida Adeslas Tranquilidad carece de valores de rescate, reducción y anticipos. Es un seguro de riesgo puro (TAR), no un seguro de ahorro.",
    },
    {
      q: "¿Qué excluye el seguro de vida Adeslas?",
      a: "Quedan excluidos de cobertura: el suicidio durante el primer año de vigencia; fallecimiento o IPA en la práctica de deportes de alto riesgo (boxeo, submarinismo, alpinismo, paracaidismo, parapente, ala delta, espeleología, vuelo en ultraligeros, etc.); siniestros derivados de enfermedades o accidentes previos a la contratación; actos delictivos del asegurado; y riesgos extraordinarios cubiertos por el Consorcio de Compensación de Seguros.",
    },
    {
      q: "¿Puedo contratar el seguro de vida Adeslas para cubrir una hipoteca?",
      a: (<>Sí. Adeslas también ofrece el producto Vida Capital Decreciente, específicamente diseñado para cubrir el capital pendiente de una hipoteca, con un Pack de Protección Hipotecaria que incluye defensa del consumidor, asesoramiento jurídico telefónico y mediación en conflictos hipotecarios. Complementa tu protección con el <Link to="/asisa-decesos" style={{color: "#009FE3", textDecoration: "underline"}}>seguro de Decesos</Link> para cobertura integral de gastos funerarios.</>)
    },
    {
      q: "¿Cómo se cobra el capital en caso de fallecimiento?",
      a: "Los beneficiarios deben presentar a Adeslas: el certificado de defunción, el certificado del Registro de Seguros de Vida, el DNI del fallecido y de los beneficiarios, y los datos bancarios para el ingreso. Una vez recibida la documentación completa, Adeslas gestiona el pago del capital asegurado.",
    },
    {
      q: "¿El seguro de vida Adeslas tiene desgravación fiscal?",
      a: "Las primas del seguro de vida no son deducibles en el IRPF para particulares (salvo contrataciones vinculadas a hipotecas anteriores a 2013). El capital percibido por los beneficiarios tributa según la normativa vigente en materia de Impuesto sobre Sucesiones y Donaciones, IRPF e Impuesto sobre el Patrimonio.",
    },
  ],
  schemaFaq: true,
  showPromo: true,
};

const AsisaVida = () => <ProductPageTemplate data={data} />;

export default AsisaVida;
