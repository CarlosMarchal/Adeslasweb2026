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
      name: "Marchal Aseguradores — Correduría Oficial Adeslas",
      url: "https://adeslas.marchalaseguradores.es",
      logo: "https://adeslas.marchalaseguradores.es/logo-adeslas.png",
      description: "Correduría oficial autorizada de Adeslas (SegurCaixa Adeslas). Especialistas en seguros de salud Adeslas: Go, Plena Vital, Plena Plus, Plena Total y Extra 150. Asesoramiento personalizado y contratación online.",
      telephone: "+34 600 000 000",
      email: "cmarchal@marchalconsultores.com",
      address: { "@type": "PostalAddress", addressCountry: "ES" },
      areaServed: "ES",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Seguros de Salud Adeslas",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Go", url: "https://adeslas.marchalaseguradores.es/adeslas-go" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Plena Vital", url: "https://adeslas.marchalaseguradores.es/adeslas-plena-vital" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Plena Plus", url: "https://adeslas.marchalaseguradores.es/adeslas-plena-plus" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Plena Total", url: "https://adeslas.marchalaseguradores.es/adeslas-plena-total" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Extra 150", url: "https://adeslas.marchalaseguradores.es/adeslas-extra-150" } },
        ],
      },
    });

    injectSchema(wsId, {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Adeslas — Marchal Aseguradores",
      url: "https://adeslas.marchalaseguradores.es",
      description: "Comparador y calculador de seguros médicos Adeslas. Contratación online de Adeslas Go, Plena Vital, Plena Plus, Plena Total y Extra 150.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://adeslas.marchalaseguradores.es/cuadro-medico?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    });

    return () => {
      document.getElementById(orgId)?.remove();
      document.getElementById(wsId)?.remove();
    };
  }, []);

  useSeo({
    title: "Seguro Médico Adeslas | Calcula tu Precio Online — Desde 21€/mes",
    description:
      "Seguro médico Adeslas desde 21€/mes. Compara Adeslas Go, Plena Vital, Plena Plus, Plena Total y Extra 150. Sin copagos, 42.000 especialistas, 1.000+ centros en toda España. Contrata online en 2 minutos.",
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
        a: "Adeslas ofrece planes con y sin copagos. Adeslas Go y Plena Vital incluyen copagos con un Límite Máximo Anual (LMA) de 260€/año, lo que hace el coste muy predecible. Adeslas Plena Plus y Plena Total no tienen copagos en consultas y especialistas. Elige la opción que mejor se adapte a tu presupuesto.",
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
        a: "SegurCaixa Adeslas es la aseguradora de salud líder en España, con más de 42.000 especialistas y más de 1.000 centros médicos en toda la geografía nacional. Acceso sin listas de espera, sin necesidad de derivación previa, y con la red de cuadro médico más amplia del sector.",
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
