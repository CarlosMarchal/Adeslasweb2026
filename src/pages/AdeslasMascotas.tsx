import ProductPageTemplate from "@/components/ProductPageTemplate";
import type { ProductPageData } from "@/components/ProductPageTemplate";
import ContactCtaCard from "@/components/ContactCtaCard";
import heroImg from "@/assets/seguro-mascotas-adeslas.webp";

const data: ProductPageData = {
  seoTitle: "Adeslas Mascotas | Seguro para Perros y Gatos desde 5,85€/mes",
  seoDescription: "Seguro de mascotas Adeslas para perros y gatos. Básico desde 5,85€/mes (RC 200.000€) o Completo desde 24,74€/mes (+300 clínicas veterinarias). Sin restricción de raza ni edad.",
  seoCanonical: "https://adeslas.numero1salud.es/seguro-mascotas/",
  seoOgImage: "https://adeslas.numero1salud.es/og-mascotas.jpg",
  seoProductSchema: {
    name: "Adeslas Mascotas",
    description: "Seguro de mascotas Adeslas para perros y gatos. Modalidad Básica desde 5,85€/mes con responsabilidad civil hasta 200.000€, asistencia veterinaria 24h, muerte accidental hasta 1.000€ y robo hasta 800€. Modalidad Completa desde 24,74€/mes con +300 clínicas veterinarias concertadas, hasta 1.000€/año en gastos de clínica, vacunas y desparasitación incluidas. Sin restricción de raza ni edad. Microchip obligatorio.",
    category: "Seguro de Mascotas",
    price: "5.85",
    pricePeriod: "month",
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    { name: "Otros Seguros", url: "https://adeslas.numero1salud.es/" },
    { name: "Seguro Mascotas", url: "https://adeslas.numero1salud.es/seguro-mascotas/" },
  ],
  badge: "Perros y gatos · Sin restricción de raza ni edad",
  heroTitle: "Seguro de Mascotas Adeslas",
  heroHighlight: "Básico y Completo · Perros y Gatos",
  heroSubtitle: "Protege a tu mejor amigo con la cobertura más completa. Sin restricción de raza ni edad. Responsabilidad civil hasta 200.000€ y +300 clínicas veterinarias concertadas.",
  price: "desde 5,85",
  pricePeriod: "/mes",
  heroImage: heroImg,
  hideHeroBadges: true,
  hideHeroPrice: true,
  heroContent: (
    <div className="grid grid-cols-2 gap-3 mb-8 max-w-lg">
      <div style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: "14px" }} className="p-4">
        <div className="text-sm font-bold text-white mb-2">Básico</div>
        <div className="flex items-end gap-1 mb-3">
          <span className="text-2xl font-black leading-none text-white">5,85€</span>
          <span className="text-sm font-medium pb-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>/mes</span>
        </div>
        {["RC hasta 200.000€", "Asistencia veterinaria 24h", "Muerte accidental hasta 1.000€", "Robo hasta 800€"].map(f => (
          <div key={f} className="flex items-center gap-1.5 text-xs mb-1" style={{ color: "rgba(255,255,255,0.82)" }}>
            <span style={{ color: "#009DD9" }} className="font-bold">✓</span> {f}
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(0,157,217,0.22)", border: "1px solid rgba(0,157,217,0.55)", borderRadius: "14px" }} className="p-4">
        <div className="text-sm font-bold text-white mb-2">Completo</div>
        <div className="flex items-end gap-1 mb-3">
          <span className="text-2xl font-black leading-none text-white">24,74€</span>
          <span className="text-sm font-medium pb-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>/mes</span>
        </div>
        {["Todo lo del Básico", "+300 clínicas veterinarias", "Hasta 1.000€/año en clínica", "Vacunas y desparasitación"].map(f => (
          <div key={f} className="flex items-center gap-1.5 text-xs mb-1" style={{ color: "rgba(255,255,255,0.82)" }}>
            <span style={{ color: "#009DD9" }} className="font-bold">✓</span> {f}
          </div>
        ))}
      </div>
    </div>
  ),
  customTarificador: <ContactCtaCard />,
  usePhoneCallCta: true,
  cardName: "Seguro Mascotas Adeslas",
  cardDescription: "Protección completa para perros y gatos de cualquier raza y edad. RC obligatoria incluida y red de clínicas veterinarias en toda España.",
  cardPill: "Perros y gatos · 2 modalidades",
  cardCoverages: [
    "RC hasta 200.000€ (modalidad Básica)",
    "Asistencia veterinaria telefónica 24h",
    "Muerte accidental (hasta 1.000€)",
    "Robo o extravío (hasta 800€)",
    "Retirada de cadáver o eutanasia",
    "+300 clínicas veterinarias (modalidad Completa)",
    "Hasta 1.000€/año en clínica concertada",
    "Vacunaciones y desparasitación incluidas",
    "Urgencias veterinarias domiciliarias",
    "Pruebas diagnósticas y medicamentos",
  ],
  features: [
    {
      title: "Responsabilidad civil 200.000€",
      description: "Cubre los daños que tu mascota pueda causar a terceros. Obligatoria para PPP. Límite de 200.000€.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Red de +300 clínicas",
      description: "Acceso a más de 300 clínicas veterinarias concertadas en toda España en la modalidad Completo.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 9.5c0 .83-.67 1.5-1.5 1.5S11 13.33 11 12.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM5 5h14v4h-2c-2.66 0-5 1.34-5 3s-2.34 3-5 3H5V5zm14 14H5v-4h2c2.66 0 5-1.34 5-3s2.34-3 5-3h2v10z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Sin restricciones",
      description: "Válido para perros y gatos de cualquier raza y edad. El precio no varía según la raza.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#1c4a8d"/>
        </svg>
      ),
    },
    {
      title: "Asistencia 24h",
      description: "Orientación veterinaria telefónica disponible las 24 horas, 7 días a la semana.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="#1c4a8d"/>
        </svg>
      ),
    },
  ],
  tabs: [
    {
      label: "Básico — RC",
      items: [
        "Responsabilidad civil hasta 200.000€",
        "Muerte accidental (hasta 1.000€)",
        "Robo o extravío (hasta 800€)",
        "Asistencia veterinaria telefónica 24h",
        "Servicio de recogida de cadáver o eutanasia",
        "Pérdida o extravío del animal",
        "Repatriación desde el extranjero",
        "Válido para PPP (Perros Potencialmente Peligrosos)",
        "Microchip obligatorio",
      ],
    },
    {
      label: "Completo — RC + Salud",
      items: [
        "Todo lo incluido en Básico",
        "Acceso a +300 clínicas veterinarias concertadas",
        "Hasta 1.000€/año en gastos veterinarios en clínica",
        "Vacunaciones anuales obligatorias incluidas",
        "Desparasitación incluida",
        "Urgencias veterinarias domiciliarias",
        "Pruebas diagnósticas: análisis, ecografías",
        "Tratamientos y medicamentos incluidos",
        "Cirugías en clínicas concertadas",
        "Microchip obligatorio",
      ],
    },
  ],
  faqs: [
    {
      q: "¿El seguro de mascotas cubre cualquier raza?",
      a: "Sí. El seguro de mascotas Adeslas cubre perros y gatos de cualquier raza y edad, y el precio es el mismo independientemente de la raza. Para razas PPP (Potencialmente Peligrosas), la responsabilidad civil es obligatoria por ley y está incluida en ambas modalidades.",
    },
    {
      q: "¿Qué diferencia hay entre Básico y Completo?",
      a: "La modalidad Básica cubre Responsabilidad Civil (hasta 200.000€), muerte accidental, robo, extravío y asistencia veterinaria telefónica 24h. La modalidad Completa añade acceso a más de 300 clínicas veterinarias concertadas, hasta 1.000€/año en gastos de clínica, vacunas y desparasitación incluidas.",
    },
    {
      q: "¿Es obligatorio el microchip?",
      a: "Sí, el microchip es obligatorio para contratar el seguro de mascotas, tanto en la modalidad Básica como en la Completa. Es también un requisito legal para perros en España.",
    },
    {
      q: "¿Hay período de carencia?",
      a: "Algunas coberturas tienen períodos de carencia estándar. La responsabilidad civil y la asistencia telefónica están activas desde el primer día. La cobertura veterinaria en clínica puede tener un breve período de carencia para enfermedades preexistentes.",
    },
    {
      q: "¿Puedo usar cualquier clínica veterinaria?",
      a: "En la modalidad Completa, puedes acudir a cualquiera de las +300 clínicas veterinarias de la red Adeslas para que los gastos estén cubiertos hasta 1.000€/año. En la modalidad Básica solo dispones de asistencia telefónica veterinaria 24h, sin acceso a clínicas.",
    },
  ],
  schemaFaq: true,
  showPromo: true,
};

const AdeslasMascotas = () => <ProductPageTemplate data={data} />;

export default AdeslasMascotas;
