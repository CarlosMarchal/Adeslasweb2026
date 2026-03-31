import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import ContactCtaCard from "@/components/ContactCtaCard";
import heroImg from "@/assets/seguro-dental-asisa-e1765797007662.webp";

const data: ProductPageData = {
  seoTitle: "Adeslas Dental | Seguro Dental desde 9,45€/mes — Limpiezas y Revisiones desde el Día 1",
  seoDescription: "Adeslas Dental: seguro dental desde 9,45€/mes. Limpiezas, revisiones y radiografías desde el día 1 sin coste. Implantes, endodoncia y ortodoncia con franquicias reducidas. Menores de 8 años gratis. +1.700 profesionales en España.",
  seoCanonical: "https://adeslas.marchalaseguradores.es/adeslas-dental",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-dental.jpg",
  seoProductSchema: {
    name: "Adeslas Dental",
    description: "Seguro dental para particulares y familias desde 9,45€/mes. Incluye sin coste: revisiones, diagnósticos, limpiezas, radiografías y extracciones simples. Franquicias reducidas en implantes, endodoncia, ortodoncia y prótesis. Modalidad familiar disponible: mínimo un adulto asegurado; menores de 8 años con prima gratuita hasta el 31 de diciembre del año en que cumplan esa edad. Red de más de 1.700 profesionales y clínicas propias Adeslas Dental certificadas ISO 9001 en toda España.",
    category: "Seguro Dental",
    price: "9.45",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Seguros Adeslas", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Adeslas Dental", url: "https://adeslas.marchalaseguradores.es/adeslas-dental" },
  ],
  badge: "Sin carencias desde el día 1",
  heroTitle: "Seguro Dental Adeslas",
  heroImage: heroImg,
  customTarificador: <ContactCtaCard />,
  heroHighlight: "La mejor protección bucodental",
  heroSubtitle: "Diagnóstico completo, limpiezas, radiografías y extracciones simples incluidos sin coste. Franquicias reducidas en implantes, endodoncia y ortodoncia.",
  price: "9,45",
  cardName: "Adeslas Dental",
  cardDescription: "Tu salud bucodental protegida desde el primer día. Individual o familiar.",
  cardPill: "Sin carencias · Desde 9,45€/mes",
  cardPillDark: true,
  cardCoverages: [
    "Revisiones y diagnósticos incluidos",
    "Limpiezas de boca (tartrectomía) incluidas",
    "Radiografías básicas sin coste",
    "Extracciones simples incluidas",
    "Implantes con franquicia reducida",
    "Endodoncia con franquicia reducida",
    "Ortodoncia con brackets (todas las modalidades)",
    "Urgencias dentales 24h/365 días",
    "Red de 1.700+ profesionales concertados",
  ],
  features: [
    {
      title: "Revisiones y limpiezas gratis",
      description: "Revisiones, limpiezas de boca y radiografías incluidas sin coste. El mantenimiento preventivo cubierto desde el día 1.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.5.7 2.8 1.7 3.7C7.8 11.3 7 12.8 7 14.5c0 2.5 1.5 4.5 3.5 5.3V21a1 1 0 002 0v-1.2c2-.8 3.5-2.8 3.5-5.3 0-1.7-.8-3.2-2.2-4.3 1-.9 1.7-2.2 1.7-3.7C15.5 4 13.5 2 12 2zm0 2c.8 0 1.5.9 1.5 2.5S12.8 9 12 9s-1.5-.9-1.5-2.5S11.2 4 12 4zm0 7c1.7 0 3 1.6 3 3.5S13.7 18 12 18s-3-1.6-3-3.5S10.3 11 12 11z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Sin carencias ni esperas",
      description: "Cobertura activa desde el momento de la contratación. Sin periodos de espera de ningún tipo.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Implantes y ortodoncia accesibles",
      description: "Implantes, endodoncia, ortodoncia y prótesis con franquicias fijas muy por debajo del precio de mercado.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Urgencias dentales 24h",
      description: "Atención para dolores agudos, traumatismos e infecciones los 365 días del año. El examen de urgencia, incluido sin coste.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "1.700+ profesionales en España",
      description: "Red de clínicas propias certificadas ISO 9001 en toda España. Siempre tendrás una cerca de casa o del trabajo.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Individual o familiar",
      description: "Modalidad individual o familiar en una sola póliza. Menores de 8 años con prima gratuita. Contratación en minutos.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#1c4a8d"/>
        </svg>
      ),
    },
  ],
  tabs: [
    {
      label: "Incluidos sin coste",
      items: [
        "Examen inicial, diagnóstico y presupuesto",
        "Revisión odontológica general y consulta profesional",
        "Examen periodontal y examen de urgencia",
        "Radiografías: intraoral, oclusal, aleta, lateral de cráneo, panorámica y telerradiografía",
        "Tartrectomía (limpieza de boca) con o sin flúor",
        "Obturación provisional",
        "Extracciones simples, torus maxilares y frenectomía",
        "Quistectomía y fenestración",
        "Estudio de implantología (modelos y fotos)",
        "Fluorizaciones y selladores oclusales (odontopediatría)",
        "Reimplantación por piezas",
        "Apicoformación por sesión y apicectomía",
        "Periodontograma",
      ],
    },
    {
      label: "Con franquicia",
      items: [
        "Endodoncia unirradicular, birradicular y multirradicular",
        "Implante (fase quirúrgica) · Mantenimiento de implantología",
        "Corona CAD-CAM (prótesis fija y sobre implante)",
        "Extracción dentaria quirúrgica",
        "Ortodoncia con brackets metálicos",
        "Ortodoncia con brackets estéticos y autoligados",
        "Curetaje por cuadrante (raspado y alisado radicular)",
        "Obturación estética y gran reconstrucción coronaria",
        "Estudio tomográfico (T.C.) de una o dos arcadas",
        "Aditamento protésico por implante",
        "Elevación de seno · Regeneración con membrana",
        "Cirugía periodontal a colgajo · Gingivectomía",
      ],
    },
    {
      label: "Condiciones",
      items: [
        "Sin esperas ni carencias: cobertura desde el primer día",
        "Modalidad individual o familiar, sin límite de edad",
        "Menores de 8 años con prima gratuita (hasta 31 dic del año que cumplen 8)",
        "Precio preferente al combinar con seguro de salud Adeslas",
        "Centros exclusivos Adeslas Dental certificados ISO 9001",
        "Red de más de 1.700 profesionales concertados en toda España",
        "Los servicios marcados con (*) admiten terapia láser",
        "Los servicios marcados con (**) admiten terapia ENDOLASSIK",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Qué servicios están incluidos sin coste en el seguro dental Adeslas?",
      a: (
        <>
          El seguro dental Adeslas incluye sin ningún coste: revisiones y diagnósticos completos, examen periodontal, consulta profesional, todas las radiografías básicas (intraoral, oclusal, panorámica, telerradiografía), limpieza de boca (tartrectomía) con o sin flúor, extracciones simples, frenectomía, quistectomía, fluorizaciones, selladores oclusales y el estudio previo de implantología. Para el detalle completo de costes por tratamiento, <a href="/franquicias-asisa-dental-2026.pdf" target="_blank" rel="noopener noreferrer" style={{color:"#009FE3",textDecoration:"underline"}}>consulta la tabla de franquicias 2026</a>.
        </>
      ),
    },
    {
      q: "¿Qué son las franquicias en el seguro dental Adeslas?",
      a: (
        <>
          Las franquicias son los importes fijos que el asegurado abona directamente en clínica por ciertos tratamientos (implantes, endodoncia, ortodoncia, prótesis…). Son precios cerrados, muy inferiores a los del mercado privado. Puedes consultar todos los importes en la <a href="/franquicias-asisa-dental-2026.pdf" target="_blank" rel="noopener noreferrer" style={{color:"#009FE3",textDecoration:"underline"}}>tabla oficial de franquicias Adeslas Dental 2026</a>.
        </>
      ),
    },
    {
      q: "¿Tiene carencias el seguro dental Adeslas?",
      a: "No. El seguro dental Adeslas no tiene ningún periodo de carencia. Todos los servicios incluidos — revisiones, limpiezas, radiografías y extracciones simples — están disponibles desde el primer día de contratación, sin esperas.",
    },
    {
      q: "¿Cuánto cuesta el seguro dental Adeslas?",
      a: (
        <>
          El seguro dental Adeslas cuesta desde <strong>9,45€/mes</strong> si ya tienes un seguro de salud Adeslas, o a precio individual si contratas solo el dental. Existe también modalidad familiar para cubrir a toda la familia. Los menores de 8 años tienen prima gratuita hasta el 31 de diciembre del año en que cumplan esa edad.
        </>
      ),
    },
    {
      q: "¿Cubre implantes dentales el seguro dental Adeslas?",
      a: (
        <>
          Sí. El seguro dental Adeslas cubre los implantes con una franquicia reducida muy por debajo del precio de mercado, tanto en la fase quirúrgica como en el aditamento protésico y la corona final. También cubre el mantenimiento de implantología y la elevación de seno cuando es necesaria. Consulta los importes exactos en la <a href="/franquicias-asisa-dental-2026.pdf" target="_blank" rel="noopener noreferrer" style={{color:"#009FE3",textDecoration:"underline"}}>tabla de franquicias 2026</a>.
        </>
      ),
    },
    {
      q: "¿Cubre endodoncia el seguro dental Adeslas?",
      a: (
        <>
          Sí. La endodoncia está cubierta con una franquicia fija según el tipo de diente (unirradicular, birradicular o multirradicular), siempre muy inferior al precio de mercado. También cubre la reendodoncia y la apicoformación. Si lo prefieres, el tratamiento puede realizarse con tecnología ENDOLASSIK. Ver importes en la <a href="/franquicias-asisa-dental-2026.pdf" target="_blank" rel="noopener noreferrer" style={{color:"#009FE3",textDecoration:"underline"}}>tabla de franquicias</a>.
        </>
      ),
    },
    {
      q: "¿Cubre ortodoncia e Invisalign el seguro dental Adeslas?",
      a: (
        <>
          Sí. La ortodoncia se cubre con franquicias fijas para todas las modalidades: brackets metálicos, brackets estéticos, brackets autoligados metálicos y estéticos, y tratamientos interceptivos para niños. Todos los precios incluyen los retenedores finales. Consulta los importes en la <a href="/franquicias-asisa-dental-2026.pdf" target="_blank" rel="noopener noreferrer" style={{color:"#009FE3",textDecoration:"underline"}}>tabla completa de franquicias</a>.
        </>
      ),
    },
    {
      q: "¿Puedo usar cualquier dentista o solo los de la red Adeslas?",
      a: "Los servicios incluidos sin coste y las franquicias reducidas aplican exclusivamente en la red de clínicas propias Adeslas Dental (certificadas ISO 9001) y los más de 1.700 profesionales concertados. Fuera de esta red, los servicios no tienen cobertura.",
    },
    {
      q: "¿Puedo contratar el seguro dental solo para mis hijos?",
      a: "Sí. El seguro dental Adeslas es flexible: puedes contratarlo de forma individual para cualquier miembro de la familia, incluidos menores. Los niños menores de 8 años tienen prima gratuita hasta el 31 de diciembre del año en que cumplan esa edad.",
    },
    {
      q: "¿Puedo asegurar a toda la familia con Adeslas Dental?",
      a: (
        <>
          Sí. La modalidad familiar cubre a 2 o más asegurados. Es necesario que al menos un adulto figure como asegurado en la póliza. Los menores de 8 años no pagan prima. Puedes combinarlo con un <Link to="/adeslas-plena-total" style={{color: "#009FE3", textDecoration: "underline"}}>seguro de salud Adeslas</Link> para obtener el precio preferente del dental.
        </>
      ),
    },
    {
      q: "¿Qué pasa si necesito una intervención dental urgente?",
      a: "El seguro dental Adeslas cubre urgencias dentales (dolor agudo, traumatismo, infección) en las clínicas de la red. Dispones de una línea de urgencias dental disponible 24 horas al día, 365 días al año. El examen de urgencia está incluido sin coste.",
    },
    {
      q: "¿Cubre periodoncia (encías) el seguro dental Adeslas?",
      a: (
        <>
          Sí. El periodontograma y el diagnóstico periodontal son gratuitos. Los tratamientos de periodoncia (curetaje, cirugía periodontal a colgajo, gingivectomía, regeneración con membrana) se cubren con franquicias reducidas. Consulta todos los importes en la <a href="/franquicias-asisa-dental-2026.pdf" target="_blank" rel="noopener noreferrer" style={{color:"#009FE3",textDecoration:"underline"}}>tabla de franquicias 2026</a>.
        </>
      ),
    },
  ],
  schemaFaq: true,
  showPromo: true,
};

const AdeslasDental = () => <ProductPageTemplate data={data} />;

export default AdeslasDental;
