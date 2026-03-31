import { Link } from "react-router-dom";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import ContactCtaCard from "@/components/ContactCtaCard";
import heroImg from "@/assets/seguro-mascotas-asisa.webp";

const data: ProductPageData = {
  seoTitle: "Seguro de Mascotas Adeslas | Perros y Gatos desde 1,9€/mes",
  seoDescription: "Seguro de mascotas Adeslas para perros y gatos en España. RC desde 1,9€/mes o asistencia veterinaria completa + RC desde 12,56€/mes. Sin carencias. +500 clínicas. Solicita precio.",
  seoCanonical: "https://adeslas.marchalaseguradores.es/asisa-mascotas",
  seoOgImage: "https://adeslas.marchalaseguradores.es/og-mascotas.jpg",
  seoProductSchema: {
    name: "Adeslas Decesos",
    description: "Seguro de mascotas Adeslas para perros y gatos en España. Modalidad RC (Responsabilidad Civil) desde 1,9€/mes y modalidad Asistencia Veterinaria + RC desde 12,56€/mes. Sin carencias, sin cuestionario de salud, urgencias 24h, cirugías, vacunas y +500 clínicas concertadas.",
    category: "Seguro de mascotas",
    price: "1.90",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    { name: "Seguro de Mascotas Adeslas", url: "https://adeslas.marchalaseguradores.es/asisa-mascotas" },
  ],
  badge: "Perros y gatos · RC desde 1,9€/mes",
  heroTitle: "Seguro de Mascotas Adeslas",
  heroHighlight: "Perros y Gatos · RC + Salud + Accidentes",
  heroSubtitle: "Dos seguros para proteger a tu mascota. Elige el que necesites:",
  heroContent: (
    <div className="grid grid-cols-2 gap-3 mb-8 max-w-lg">
      {/* Tarjeta RC */}
      <div
        style={{
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.22)",
          borderRadius: "14px",
        }}
        className="p-4"
      >
        <div className="text-sm font-bold text-white mb-2 leading-tight">
          Responsabilidad Civil
        </div>
        <div className="flex items-end gap-1 mb-3">
          <span className="text-2xl font-black leading-none text-white">1,9€</span>
          <span className="text-sm font-medium pb-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>/mes</span>
        </div>
        <div className="space-y-1.5">
          {["RC hasta 150.000€", "Defensa jurídica", "Válido para PPP"].map((f) => (
            <div key={f} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.82)" }}>
              <span className="text-azul-claro font-bold">✓</span> {f}
            </div>
          ))}
        </div>
      </div>
      {/* Tarjeta Asistencia + RC */}
      <div
        style={{
          background: "rgba(0,159,227,0.22)",
          border: "1px solid rgba(0,159,227,0.55)",
          borderRadius: "14px",
        }}
        className="p-4"
      >
        <div className="text-sm font-bold text-white mb-2 leading-tight">
          Asistencia Veterinaria<br />+ Responsabilidad Civil
        </div>
        <div className="flex items-end gap-1 mb-3">
          <span className="text-2xl font-black leading-none text-white">12,56€</span>
          <span className="text-sm font-medium pb-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>/mes</span>
        </div>
        <div className="space-y-1.5">
          {["Consultas y cirugías", "Urgencias 24h", "Vacunas incluidas", "+500 clínicas"].map((f) => (
            <div key={f} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.82)" }}>
              <span className="text-azul-claro font-bold">✓</span> {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  price: "1,9",
  pricePeriod: "mes",
  heroImage: heroImg,
  customTarificador: <ContactCtaCard />,
  usePhoneCallCta: true,
  hideHeroBadges: true,
  hideHeroPrice: true,
  cardName: "Adeslas Decesos",
  cardDescription: "Elige la cobertura que necesitas: solo RC desde 1,9€/mes o protección veterinaria completa + RC desde 12,56€/mes.",
  cardPill: "RC · Asistencia veterinaria · Urgencias 24h",
  cardPillDark: true,
  cardCoverages: [
    "Adeslas Decesos RC desde 1,9€/mes",
    "Adeslas Decesos Asistencia + RC desde 12,56€/mes",
    "Responsabilidad civil hasta 150.000€",
    "Defensa jurídica incluida",
    "Urgencias veterinarias 24h",
    "Cirugías y hospitalización cubiertos",
    "Vacunas incluidas (perros y gatos)",
    "+500 clínicas veterinarias concertadas",
    "Videoconsulta veterinaria",
  ],
  features: [
    {
      title: "Adeslas Decesos RC",
      description: "Cobertura de Responsabilidad Civil desde 1,9€/mes. Tres niveles: RC Básica, RC Estándar y RC Completa. Defensa jurídica incluida y garantías opcionales. Obligatorio por ley para perros de razas potencialmente peligrosas (PPP).",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Adeslas Decesos Asistencia + RC",
      description: "Cobertura veterinaria completa más RC desde 12,56€/mes. Consultas ilimitadas, cirugías, hospitalización, análisis, radiografías y vacunas incluidas en más de 500 clínicas concertadas en toda España.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5h-4.5v6H19v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Urgencias 24h y videoconsulta",
      description: "Servicio de urgencias veterinarias disponible las 24 horas, todos los días del año incluyendo festivos. Videoconsulta veterinaria desde casa. Teléfono de emergencias: 91 788 30 91.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Vacunas incluidas sin coste adicional",
      description: "Para perros: rabia, trivalente y tetravalente gratuitas. Para gatos: leucemia, rabia, trivalente y tetravalente incluidas. Todo en la red de más de 500 clínicas concertadas.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#1c4a8d"/>
        </svg>
      ),
    },
  ],
  tabs: [
    {
      label: "Adeslas Decesos RC",
      items: [
        "Responsabilidad civil frente a terceros: hasta 150.000€",
        "Tres niveles de cobertura: RC Básica, RC Estándar y RC Completa",
        "Defensa jurídica incluida en todos los niveles",
        "Desde 1,9€/mes",
        "Cubre daños corporales y materiales causados a terceros",
        "Requiere: microchip implantado + cartilla veterinaria + DNI del titular",
        "Garantía opcional: fallecimiento por accidente",
        "Garantía opcional: gastos de sacrificio (hasta 150€, carencia 6 meses)",
      ],
      cardName: "Adeslas Decesos RC",
      cardDescription: "Solo Responsabilidad Civil para perros y gatos. Desde 1,9€/mes. Cubre daños a terceros hasta 150.000€ con defensa jurídica incluida.",
      cardPrice: "1,9",
      cardPricePeriod: "mes",
      cardPill: "Solo RC · desde 1,9€/mes",
      cardPillDark: true,
      cardCoverages: [
        "RC hasta 150.000€ frente a terceros",
        "Tres niveles: RC Básica, Estándar y Completa",
        "Defensa jurídica incluida",
        "Cubre daños corporales y materiales a terceros",
        "Opcional: fallecimiento por accidente",
        "Opcional: gastos de sacrificio (hasta 150€)",
        "Desde 1,9€/mes",
      ],
    },
    {
      label: "Adeslas Decesos",
      items: [
        "Consultas veterinarias ilimitadas en clínicas concertadas",
        "Urgencias veterinarias 24h (tel. 91 788 30 91)",
        "Hospitalización veterinaria incluida",
        "Cirugías y anestesia cubiertas",
        "Análisis clínicos y pruebas diagnósticas",
        "Radiografías y ecografías",
        "Tratamientos médicos y medicación prescrita",
        "Videoconsulta veterinaria desde casa",
        "Responsabilidad civil hasta 150.000€ con defensa jurídica",
        "Sin carencias: cobertura desde el primer día de la póliza",
        "Sin cuestionario de salud ni exclusiones por raza, edad o patología",
        "Vacunas incluidas (perros: rabia, trivalente y tetravalente gratuitas; gatos: leucemia, rabia, trivalente, tetravalente)",
        "Red de +500 clínicas veterinarias concertadas en España",
        "Sin límite de edad una vez asegurado",
      ],
      cardName: "Adeslas Decesos",
      cardDescription: "Asistencia veterinaria completa + RC para perros y gatos. Sin carencias, sin cuestionario de salud y sin exclusiones por raza ni edad.",
      cardPrice: "12,56",
      cardPricePeriod: "mes",
      cardPill: "Asistencia Veterinaria + RC · desde 12,56€/mes",
      cardPillDark: true,
      cardCoverages: [
        "Consultas veterinarias ilimitadas",
        "Urgencias 24h y videoconsulta",
        "Hospitalización, cirugías y anestesia",
        "Vacunas incluidas (perros y gatos)",
        "RC hasta 150.000€ con defensa jurídica",
        "Sin carencias desde el primer día",
        "Sin cuestionario de salud",
        "Sin exclusiones por raza, edad ni patología",
        "+500 clínicas veterinarias concertadas",
      ],
    },
    {
      label: "Coberturas opcionales",
      items: [
        "Fallecimiento por accidente (disponible en ambas modalidades)",
        "Gastos de sacrificio: hasta 150€ (carencia 6 meses desde contratación)",
        "Robo de la mascota (carencia 15 días desde contratación)",
        "A partir de los 9 años de la mascota: coberturas opcionales se reducen un 15% anual",
        "Consulta condiciones específicas de cada opción al contratar",
      ],
    },
    {
      label: "Condiciones",
      items: [
        "Disponible para perros y gatos",
        "Adeslas Decesos RC: desde 1,9€/mes",
        "Adeslas Decesos (Asistencia + RC): desde 12,56€/mes",
        "Adeslas Decesos RC requiere: microchip + cartilla veterinaria + DNI titular",
        "Sin límite de edad para contratar Adeslas Decesos (Asistencia + RC)",
        "Sin carencias en asistencia veterinaria: cobertura desde el primer día",
        "Sin cuestionario de salud y sin exclusiones por raza, edad ni patología",
        "Coberturas opcionales: robo (carencia 15 días), sacrificio (carencia 6 meses)",
        "Renovación anual automática",
        "Red de +500 clínicas veterinarias concertadas",
      ],
    },
  ],
  faqs: [
    {
      q: "¿Cuántos seguros de mascotas tiene Adeslas?",
      a: "Adeslas ofrece dos seguros diferenciados para mascotas: Adeslas Decesos RC (solo Responsabilidad Civil, desde 1,9€/mes) y Adeslas Decesos (Asistencia Veterinaria completa + RC, desde 12,56€/mes). Puedes contratar el que mejor se adapte a tus necesidades.",
    },
    {
      q: "¿Cuál es la diferencia entre Adeslas Decesos RC y Adeslas Decesos?",
      a: "Adeslas Decesos RC cubre únicamente la Responsabilidad Civil: daños que tu mascota cause a terceras personas o sus bienes, hasta 150.000€. Es el seguro más económico, desde 1,9€/mes. Adeslas Decesos (Asistencia + RC) incluye además asistencia veterinaria completa: consultas ilimitadas, urgencias 24h, cirugías, hospitalización, vacunas y videoconsulta en +500 clínicas concertadas, desde 12,56€/mes.",
    },
    {
      q: "¿Qué cubre Adeslas Decesos RC?",
      a: "Adeslas Decesos RC cubre exclusivamente la Responsabilidad Civil: daños corporales y materiales causados a terceras personas por tu mascota, hasta 150.000€, con defensa jurídica incluida. Disponible en tres niveles: RC Básica, RC Estándar y RC Completa. Como garantías opcionales puedes añadir fallecimiento por accidente y gastos de sacrificio (hasta 150€, con carencia de 6 meses).",
    },
    {
      q: "¿Qué incluye Adeslas Decesos (Asistencia + RC)?",
      a: "Adeslas Decesos incluye asistencia veterinaria completa más RC: consultas ilimitadas en +500 clínicas concertadas, urgencias 24h, hospitalización, cirugías, anestesia, análisis, radiografías, ecografías, medicación prescrita, videoconsulta, vacunas incluidas y responsabilidad civil hasta 150.000€ con defensa jurídica.",
    },
    {
      q: "¿El seguro cubre razas potencialmente peligrosas (PPP)?",
      a: "Sí. Ambos seguros Adeslas Decesos cubren razas incluidas en el listado de perros potencialmente peligrosos (PPP). La cobertura de Responsabilidad Civil es especialmente importante para estas razas, ya que su tenencia exige por ley seguro de RC obligatorio.",
    },
    {
      q: "¿Qué vacunas están incluidas en Adeslas Decesos?",
      a: "En la modalidad Adeslas Decesos (Asistencia + RC), las vacunas están incluidas sin coste adicional: para perros, la rabia, la trivalente y la tetravalente son gratuitas; para gatos, las vacunas de leucemia, rabia, trivalente y tetravalente están incluidas.",
    },
    {
      q: "¿Cómo funciona la urgencia veterinaria 24h?",
      a: "El servicio de urgencias veterinarias está disponible las 24 horas del día, todos los días del año, incluyendo festivos y noches. Puedes llamar al 91 788 30 91. También está disponible la videoconsulta veterinaria para consultas no presenciales desde casa.",
    },
    {
      q: "¿Cuántas clínicas veterinarias tiene Adeslas concertadas?",
      a: "La red de Adeslas Decesos cuenta con más de 500 clínicas veterinarias concertadas en toda España. Puedes consultar los centros disponibles en tu zona a través de la app o web de Adeslas antes de contratar.",
    },
    {
      q: "¿Tiene carencias el seguro de mascotas Adeslas?",
      a: "No. La cobertura de asistencia veterinaria de Adeslas Decesos no tiene ningún periodo de carencia: puedes llevar a tu mascota al veterinario desde el primer día de la póliza. Solo las coberturas opcionales tienen carencia: 15 días para el robo y 6 meses para los gastos de sacrificio.",
    },
    {
      q: "¿Necesito hacer un cuestionario de salud para contratar?",
      a: "No. Adeslas Decesos no requiere cuestionario de salud ni declaración de patologías previas. No hay exclusiones por raza, por edad ni por el historial médico de la mascota. Cualquier perro o gato puede asegurarse independientemente de su estado de salud o raza.",
    },
    {
      q: "¿Cuánto cuesta el seguro de mascotas Adeslas?",
      a: (<>Adeslas Decesos RC (solo RC) tiene un precio desde 1,9€/mes. Adeslas Decesos (Asistencia veterinaria completa + RC) tiene un precio desde 12,56€/mes. El precio no varía por la raza, la edad ni el historial médico de la mascota. Solicita tu presupuesto personalizado sin compromiso. También puedes complementar la salud de toda tu familia con <Link to="/asisa-completa" style={{color: "#009FE3", textDecoration: "underline"}}>nuestros seguros de salud</Link>.</>)
    },
    {
      q: "¿Qué documentación necesito para contratar Adeslas Decesos RC?",
      a: "Para contratar Adeslas Decesos RC es obligatorio que tu mascota tenga: microchip implantado, cartilla veterinaria actualizada y DNI del titular del seguro. Estos requisitos son exigidos también por la normativa legal para perros PPP.",
    },
    {
      q: "¿Las coberturas opcionales tienen alguna limitación por edad?",
      a: "Sí. A partir de los 9 años de edad de la mascota, las coberturas opcionales (fallecimiento por accidente, gastos de sacrificio, robo) se reducen un 15% anual. La cobertura principal de asistencia veterinaria y la RC no tienen límite de edad una vez asegurado.",
    },
    {
      q: "¿Puedo contratar el seguro de mascotas para un gato senior?",
      a: "Sí. La modalidad Adeslas Decesos (Asistencia + RC) no tiene límite de edad para contratar. Una vez asegurado, la cobertura se mantiene sin importar la edad de la mascota. Las coberturas opcionales sí sufren una reducción anual del 15% a partir de los 9 años.",
    },
    {
      q: "¿Las cirugías están cubiertas en Adeslas Decesos?",
      a: "Sí, en la modalidad Adeslas Decesos (Asistencia + RC). Las cirugías necesarias por enfermedad o accidente están cubiertas, incluyendo anestesia, hospitalización y todas las pruebas diagnósticas previas. Las cirugías estéticas o electivas no están incluidas.",
    },
  ],
  schemaFaq: true,
  showPromo: true,
};

const AsisaMascotas = () => <ProductPageTemplate data={data} />;

export default AsisaMascotas;
