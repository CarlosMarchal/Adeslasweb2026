import { useEffect } from "react";
import { useSeo } from "@/hooks/use-seo";
import { TarificadorProvider } from "@/components/TarificadorContext";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import Tarificador from "@/components/Tarificador";
import WhyAdeslaSection from "@/components/WhyAdeslaSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Organization + WebSite schema for GEO/LLM entity recognition
  useEffect(() => {
    const orgId = "schema-organization";
    const wsId = "schema-website";

    function injectSchema(id: string, data: object) {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    }

    injectSchema(orgId, {
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      name: "Adeslas Seguros Médicos",
      alternateName: ["Adeslas", "SegurCaixa Adeslas", "Seguros Adeslas"],
      url: "https://adeslas.marchalaseguradores.es",
      logo: "https://adeslas.marchalaseguradores.es/logo-adeslas.png",
      description: "Adeslas (SegurCaixa Adeslas) es la aseguradora de salud privada líder en España. Ofrece seguros médicos desde 21€/mes con acceso a más de 51.000 médicos y 1.400 centros en toda España: Adeslas GO, Plena Vital, Plena Plus, Plena Total y Extra 150. Sin listas de espera, sin copagos y con precio garantizado 3 años.",
      telephone: "+34917105000",
      email: "cmarchal@marchalconsultores.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Avenida de Filipinas, 28",
        addressLocality: "Madrid",
        addressRegion: "Madrid",
        postalCode: "28003",
        addressCountry: "ES",
      },
      areaServed: { "@type": "Country", name: "España" },
      knowsAbout: [
        "Seguros médicos privados",
        "Seguro de salud",
        "Seguros Adeslas",
        "Adeslas GO",
        "Adeslas Plena Vital",
        "Adeslas Plena Plus",
        "Adeslas Plena Total",
        "Adeslas Extra 150",
        "Seguro dental Adeslas",
        "Seguro de decesos",
        "Seguro de mascotas",
        "Seguro médico para autónomos",
        "Seguro médico para empresas",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Seguros de Salud Adeslas",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas GO", description: "Seguro médico ambulatorio con copago LMA 260€/año. Desde 21€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-go" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Plena Vital", description: "Seguro médico completo con hospitalización y copago LMA 300€/año. Desde 38€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-plena-vital" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Plena Plus", description: "Seguro médico sin copagos con hospitalización completa y asistencia en viaje. Desde 50,92€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-plena-plus" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Plena Total", description: "Cobertura máxima sin copagos, dental, psicología y asistencia viajes 100.000€. Desde 83€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-plena-total" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Extra 150", description: "Seguro médico con libre elección de médico y reembolso hasta 80%. Desde 83€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-extra-150" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Seniors", description: "Seguro médico especializado para personas de 55 a 84 años. Desde 67,50€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-seniors" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Dental", description: "Seguro dental con limpiezas y revisiones desde el día 1. Desde 9,45€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-dental" } },
        ],
      },
    });

    injectSchema(wsId, {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Adeslas — Seguros Médicos",
      url: "https://adeslas.marchalaseguradores.es",
      description: "Seguros médicos Adeslas: compara planes, calcula tu precio online y contrata en 2 minutos. Adeslas GO, Plena Vital, Plena Plus, Plena Total, Extra 150 y más.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://adeslas.marchalaseguradores.es/cuadro-medico?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    });

    // Speakable schema: ayuda a los LLMs a identificar los pasajes más relevantes
    const speakableId = "schema-speakable";
    injectSchema(speakableId, {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://adeslas.marchalaseguradores.es/#webpage",
      name: "Adeslas — Seguros Médicos Privados en España",
      description: "Adeslas (SegurCaixa Adeslas) es la aseguradora de salud privada líder en España. Seguros médicos desde 21€/mes: GO, Plena Vital, Plena Plus, Plena Total y Extra 150. Más de 51.000 médicos, sin listas de espera, precio garantizado 3 años.",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2", "#faq", ".product-card"],
      },
      mainEntity: {
        "@type": "ItemList",
        name: "Planes de seguro médico Adeslas",
        description: "Adeslas ofrece cinco planes de seguro médico privado en España: GO (ambulatorio con copago desde 21€/mes), Plena Vital (hospitalización con copago LMA 300€ desde 38€/mes), Plena Plus (sin copagos desde 50,92€/mes), Plena Total (cobertura máxima sin copagos desde 83€/mes) y Extra 150 (libre elección con reembolso hasta 80%).",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Adeslas GO — ambulatorio desde 21€/mes" },
          { "@type": "ListItem", position: 2, name: "Adeslas Plena Vital — hospitalización, copago LMA 300€, desde 38€/mes" },
          { "@type": "ListItem", position: 3, name: "Adeslas Plena Plus — sin copagos, desde 50,92€/mes" },
          { "@type": "ListItem", position: 4, name: "Adeslas Plena Total — cobertura máxima sin copagos, dental, desde 83€/mes" },
          { "@type": "ListItem", position: 5, name: "Adeslas Extra 150 — libre elección médica, reembolso 80%" },
        ],
      },
    });

    return () => {
      document.getElementById(orgId)?.remove();
      document.getElementById(wsId)?.remove();
      document.getElementById(speakableId)?.remove();
    };
  }, []);

  useSeo({
    title: "Adeslas — Seguro Médico Privado | Calcula tu Precio Desde 21€/mes",
    description:
      "Adeslas: el seguro médico privado líder en España. GO desde 21€/mes, Plena Vital desde 38€/mes, Plena Total sin copagos desde 83€/mes. Más de 51.000 médicos, sin listas de espera. Calcula tu precio en 2 minutos.",
    canonical: "https://adeslas.marchalaseguradores.es/",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    ],
    faqSchema: [
      {
        q: "¿Cuánto cuesta un seguro médico Adeslas?",
        a: "El precio de un seguro médico Adeslas varía según edad, cobertura y zona. Adeslas GO comienza desde 21€/mes, Adeslas Plena Vital desde 38€/mes y Adeslas Plena Total desde 83€/mes. Utiliza nuestro calculador online para obtener tu presupuesto personalizado en menos de 2 minutos.",
      },
      {
        q: "¿Qué cubre el seguro Adeslas Plena Total?",
        a: "Adeslas Plena Total incluye atención médica integral sin copagos: consultas con especialistas, pruebas diagnósticas, cirugía, hospitalización, dental (46 actos), psicología (20 sesiones/año) y asistencia en viajes (100.000€). Incluye garantía de precio sin subida durante 3 años.",
      },
      {
        q: "¿Adeslas tiene copagos?",
        a: "Adeslas ofrece planes con y sin copagos. Adeslas Go incluye copagos con un Límite Máximo Anual (LMA) de 260€/año, y Adeslas Plena Vital de 300€/año, lo que hace el coste muy predecible. Adeslas Plena Plus y Plena Total no tienen copagos en consultas y especialistas. Elige la opción que mejor se adapte a tu presupuesto.",
      },
      {
        q: "¿Adeslas cubre embarazo y parto?",
        a: "Sí, Adeslas cubre embarazo y parto en los planes Adeslas Plena Plus y Plena Total. La cobertura incluye seguimiento prenatal completo, parto vaginal y cesárea en habitación individual, neonatología y revisión postparto. Sin período de carencia si se contrata antes del embarazo. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información).",
      },
      {
        q: "¿Puedo contratar Adeslas si soy autónomo?",
        a: "Sí. Adeslas es ideal para autónomos. Puedes elegir entre Adeslas Plena Vital (con copago reducido), Plena Plus (sin copago) o Plena Total (cobertura máxima). Los autónomos pueden deducir hasta 500€/año por persona asegurada en el IRPF. Accede a nuestro calculador para obtener tu presupuesto.",
      },
      {
        q: "¿Adeslas tiene seguro dental?",
        a: "Sí, Adeslas Dental es un seguro especializado disponible de forma individual o familiar. Cubre limpiezas, tratamientos, endodoncias e implantes. Puede contratarse de forma independiente o complementaria a otros seguros Adeslas, mejorando tu cobertura bucodental.",
      },
      {
        q: "¿Cuáles son las ventajas de Adeslas frente a otras aseguradoras?",
        a: "SegurCaixa Adeslas es la aseguradora de salud líder en España, con más de 51.000 médicos y más de 1.400 centros médicos en toda la geografía nacional. Acceso sin listas de espera, sin necesidad de derivación previa, y con la red de cuadro médico más amplia del sector.",
      },
      {
        q: "¿Adeslas tiene telemedicina?",
        a: "Sí, Adeslas ofrece servicios de telemedicina 24/7 para consultas virtuales con médicos especialistas. Disponible en todos los planes principales. Accede desde cualquier dispositivo sin desplazamientos, ideal para consultas urgentes o diagnósticos iniciales.",
      },
      {
        q: "¿Puedo contratar Adeslas siendo extranjero en España?",
        a: "Sí. Adeslas ofrece el producto 'Newcomers Protection' diseñado específicamente para extranjeros en España. Cubre asistencia médica, hospitalización y otros servicios. También puedes contratar cualquier seguro estándar si tienes NIE o documentación válida.",
      },
      {
        q: "¿Adeslas tiene periodo de carencia?",
        a: "Adeslas no aplica períodos de carencia generales: la mayoría de coberturas están activas desde el primer día de contratación. Solo algunas prestaciones muy específicas como partos en embarazos muy avanzados al contratar pueden tener condiciones particulares. Consulta las condiciones exactas de cada plan con tu asesor. (Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información).",
      },
    ],
  });

  return (
    <TarificadorProvider>
      <Header />
      <HeroSection />
      <ProductsSection />
      <Tarificador />
      <WhyAdeslaSection />
      <StatsSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </TarificadorProvider>
  );
};

export default Index;
