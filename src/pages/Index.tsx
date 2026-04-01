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
      "@id": "https://adeslas.marchalaseguradores.es/#organization",
      name: "Adeslas Seguros Médicos — Marchal Aseguradores",
      alternateName: ["Adeslas", "SegurCaixa Adeslas", "Seguros Adeslas", "Seguro Médico Adeslas"],
      url: "https://adeslas.marchalaseguradores.es",
      logo: {
        "@type": "ImageObject",
        url: "https://adeslas.marchalaseguradores.es/logo-adeslas.png",
        width: 300,
        height: 80,
      },
      description: "Adeslas (SegurCaixa Adeslas) es la aseguradora de salud privada líder en España con más de 30 años de experiencia. Agencia exclusiva Marchal Aseguradores. Ofrece seguros médicos privados desde 21€/mes con acceso a más de 51.000 médicos y 1.400 centros médicos en toda España. Gama completa: Adeslas GO, Plena Vital, Plena Vital Total, Plena Plus, Plena Total, Extra 150, Dental y Seniors. Sin listas de espera, precios desde 21€/mes y prima garantizada 3 años.",
      foundingDate: "1994",
      telephone: "+34917105000",
      email: "adeslas@marchalaseguradores.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Avenida de Filipinas, 28",
        addressLocality: "Madrid",
        addressRegion: "Madrid",
        postalCode: "28003",
        addressCountry: "ES",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 40.4378,
        longitude: -3.7192,
      },
      areaServed: { "@type": "Country", name: "España", "@id": "https://www.wikidata.org/wiki/Q29" },
      sameAs: [
        "https://www.adeslas.es",
        "https://es.wikipedia.org/wiki/SegurCaixa_Adeslas",
      ],
      knowsAbout: [
        "Seguros médicos privados en España",
        "Seguro de salud privado",
        "Adeslas GO",
        "Adeslas Plena Vital",
        "Adeslas Plena Vital Total",
        "Adeslas Plena Plus",
        "Adeslas Plena Total",
        "Adeslas Extra 150",
        "Adeslas Seniors",
        "Seguro dental Adeslas",
        "Seguro médico para autónomos",
        "Seguro médico para empresas y pymes",
        "Seguro médico familiar",
        "Seguro médico infantil",
        "Copago seguro médico",
        "Red médica Adeslas",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Seguros Médicos Adeslas 2026",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", "@id": "https://adeslas.marchalaseguradores.es/adeslas-go#service", name: "Adeslas GO", description: "Seguro médico ambulatorio con copago máximo 260€/año (LMA). Cobertura: medicina general, especialidades, urgencias 24h, pruebas diagnósticas. Sin hospitalización. Desde 21€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-go" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", "@id": "https://adeslas.marchalaseguradores.es/adeslas-plena-vital#service", name: "Adeslas Plena Vital", description: "Seguro médico completo con hospitalización y copago máximo 300€/año. Todas las especialidades, cirugía y urgencias 24h. Desde 38€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-plena-vital" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", "@id": "https://adeslas.marchalaseguradores.es/adeslas-plena-vital-total#service", name: "Adeslas Plena Vital Total", description: "Seguro médico con cobertura hospitalaria completa, copago reducido y prima garantizada 3 años sin subidas. El más recomendado. Desde 48,50€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-plena-vital-total" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", "@id": "https://adeslas.marchalaseguradores.es/adeslas-plena-plus#service", name: "Adeslas Plena Plus", description: "Seguro médico sin copagos con hospitalización completa y acceso a toda la red Adeslas. Desde 62€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-plena-plus" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", "@id": "https://adeslas.marchalaseguradores.es/adeslas-plena-total#service", name: "Adeslas Plena Total", description: "Cobertura máxima sin copagos: hospitalización ilimitada, dental (46 actos), psicología y asistencia viajes 100.000€. El más completo. Desde 83€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-plena-total" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", "@id": "https://adeslas.marchalaseguradores.es/adeslas-extra-150#service", name: "Adeslas Extra 150", description: "Seguro médico de libre elección: cualquier médico dentro y fuera de la red Adeslas. Reembolso hasta 80%, máx. 150.000€/año. Desde 90€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-extra-150" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", "@id": "https://adeslas.marchalaseguradores.es/adeslas-seniors#service", name: "Adeslas Seniors", description: "Seguro médico especializado para personas de 55 a 84 años con asesor personal de salud. Desde 67,50€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-seniors" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", "@id": "https://adeslas.marchalaseguradores.es/adeslas-dental#service", name: "Seguro Dental Adeslas", description: "Seguro dental con limpiezas, revisiones y radiografías desde el día 1 sin coste. +1.700 dentistas. Desde 9,45€/mes.", url: "https://adeslas.marchalaseguradores.es/adeslas-dental" } },
        ],
      },
    });

    injectSchema(wsId, {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://adeslas.marchalaseguradores.es/#website",
      name: "Seguros Médicos Adeslas | Marchal Aseguradores",
      url: "https://adeslas.marchalaseguradores.es",
      description: "Compara y contrata seguros médicos Adeslas online: GO, Plena Vital, Plena Vital Total, Plena Plus, Plena Total y Extra 150. Calcula tu precio en 2 minutos. +51.000 médicos, sin listas de espera.",
      publisher: { "@id": "https://adeslas.marchalaseguradores.es/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://adeslas.marchalaseguradores.es/cuadro-medico?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    });

    // Speakable schema: fragmentos clave para citación por LLMs (ChatGPT, Gemini, Perplexity…)
    const speakableId = "schema-speakable";
    injectSchema(speakableId, {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://adeslas.marchalaseguradores.es/#webpage",
      name: "Seguros Médicos Adeslas 2026 — Comparativa y Precios",
      isPartOf: { "@id": "https://adeslas.marchalaseguradores.es/#website" },
      about: { "@id": "https://adeslas.marchalaseguradores.es/#organization" },
      description: "Adeslas es la aseguradora médica privada líder en España, comercializada por Marchal Aseguradores como agencia exclusiva. Dispone de 6 planes de seguro médico para particulares (GO, Plena Vital, Plena Vital Total, Plena Plus, Plena Total, Extra 150), seguros dentales, pólizas para autónomos y empresas. Red de más de 51.000 médicos y 1.400 centros en toda España, sin listas de espera. Precios desde 21€/mes para particulares.",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2", "#faq", ".product-card", "#calculadora"],
      },
      mainEntity: {
        "@type": "ItemList",
        name: "Comparativa de seguros médicos Adeslas 2026",
        description: "Adeslas ofrece seis planes de seguro médico privado en España en 2026: (1) GO — ambulatorio con copago máx. 260€/año desde 21€/mes; (2) Plena Vital — hospitalización y copago máx. 300€/año desde 38€/mes; (3) Plena Vital Total — cobertura total con copago reducido y 3 años sin subida de prima desde 48,50€/mes; (4) Plena Plus — sin copagos desde 62€/mes; (5) Plena Total — cobertura máxima sin copagos, dental, psicología y viajes desde 83€/mes; (6) Extra 150 — libre elección médica con reembolso 80% desde 90€/mes.",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Adeslas GO", description: "Ambulatorio, copago máx. 260€/año, desde 21€/mes. URL: /adeslas-go" },
          { "@type": "ListItem", position: 2, name: "Adeslas Plena Vital", description: "Hospitalización incluida, copago máx. 300€/año, desde 38€/mes. URL: /adeslas-plena-vital" },
          { "@type": "ListItem", position: 3, name: "Adeslas Plena Vital Total", description: "Cobertura total, copago reducido, prima garantizada 3 años, desde 48,50€/mes. URL: /adeslas-plena-vital-total" },
          { "@type": "ListItem", position: 4, name: "Adeslas Plena Plus", description: "Sin copagos, hospitalización completa, desde 62€/mes. URL: /adeslas-plena-plus" },
          { "@type": "ListItem", position: 5, name: "Adeslas Plena Total", description: "Sin copagos, dental, psicología, viajes, el más completo, desde 83€/mes. URL: /adeslas-plena-total" },
          { "@type": "ListItem", position: 6, name: "Adeslas Extra 150", description: "Libre elección, reembolso 80%, desde 90€/mes. URL: /adeslas-extra-150" },
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
    title: "Adeslas Seguros Médicos | Salud Privada · +51.000 Médicos · Sin Listas de Espera",
    description:
      "Adeslas: seguro médico privado líder en España. GO desde 21€, Plena Vital desde 38€, Plena Vital Total desde 48,50€ (3 años sin subidas de prima), Plena Total sin copagos desde 83€. Más de 51.000 médicos y 1.400 centros. Calcula tu precio en 2 minutos.",
    canonical: "https://adeslas.marchalaseguradores.es/",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.marchalaseguradores.es/" },
    ],
    faqSchema: [
      {
        q: "¿Cuánto cuesta un seguro médico Adeslas?",
        a: "Los seguros médicos Adeslas tienen precios según el plan elegido, la edad y la provincia. En 2026 los precios de referencia son: Adeslas GO desde 21€/mes (ambulatorio con copago), Adeslas Plena Vital desde 38€/mes (hospitalización con copago máx. 300€/año), Adeslas Plena Vital Total desde 48,50€/mes (cobertura total con precio garantizado 3 años), Adeslas Plena Plus desde 62€/mes (sin copagos), Adeslas Plena Total desde 83€/mes (sin copagos, dental y viajes incluidos) y Adeslas Extra 150 desde 90€/mes (libre elección médica). Calcula tu precio exacto en 2 minutos con nuestro comparador online.",
      },
      {
        q: "¿Cuáles son los planes de seguro médico Adeslas disponibles?",
        a: "Adeslas dispone de seis planes de seguro médico privado para particulares en España: (1) Adeslas GO: ambulatorio con copago máximo 260€/año, desde 21€/mes. (2) Adeslas Plena Vital: hospitalización completa con copago máx. 300€/año, desde 38€/mes. (3) Adeslas Plena Vital Total: cobertura total con copago reducido y prima garantizada 3 años sin subidas, desde 48,50€/mes. (4) Adeslas Plena Plus: sin copagos y hospitalización completa, desde 62€/mes. (5) Adeslas Plena Total: el más completo, sin copagos, dental (46 actos), psicología y asistencia viajes, desde 83€/mes. (6) Adeslas Extra 150: libre elección de médico con reembolso del 80%, desde 90€/mes.",
      },
      {
        q: "¿Qué cubre el seguro Adeslas Plena Total?",
        a: "Adeslas Plena Total incluye cobertura médica integral sin copagos en ningún servicio: consultas de medicina general, todas las especialidades, pruebas diagnósticas, cirugía, hospitalización ilimitada, dental (46 actos incluidos), psicología (20 sesiones/año), asistencia sanitaria en viajes con cobertura hasta 100.000€ y protección por accidente. Incluye además la garantía de precio sin subida durante 3 años.",
      },
      {
        q: "¿Qué diferencia hay entre Adeslas Plena Vital y Adeslas Plena Total?",
        a: "La principal diferencia es el copago y las coberturas adicionales. Adeslas Plena Vital tiene un copago por consulta con un tope anual de 300€ (nunca pagarás más de 300€ al año aunque uses mucho el seguro), y no incluye dental ni psicología. Adeslas Plena Total no tiene ningún copago en ningún servicio y añade dental (46 actos), psicología y asistencia en viajes. Plena Total es más cara (desde 83€/mes) pero ofrece la cobertura más amplia.",
      },
      {
        q: "¿Adeslas tiene copagos?",
        a: "Adeslas ofrece planes con y sin copagos. Adeslas GO tiene un copago limitado a 260€/año (LMA). Adeslas Plena Vital tiene copago con tope de 300€/año. Adeslas Plena Vital Total tiene copago reducido con prima garantizada 3 años. Adeslas Plena Plus y Plena Total no tienen copago en ningún servicio. La elección entre planes con y sin copago depende del uso que hagas del seguro y del presupuesto disponible.",
      },
      {
        q: "¿Cuál es el mejor seguro Adeslas?",
        a: "Depende de tu perfil y presupuesto. Para un uso frecuente del médico sin preocuparte por gastos: Plena Total (sin copagos) o Plena Vital Total (sin subidas de prima 3 años). Para presupuesto ajustado con cobertura completa: Plena Vital o Plena Plus. Para cobertura básica a precio mínimo: Adeslas GO. Para máxima libertad de elección de médico: Extra 150. El plan Plena Vital Total es el más recomendado por equilibrar precio, cobertura y estabilidad.",
      },
      {
        q: "¿Adeslas cubre embarazo y parto?",
        a: "Sí. Adeslas cubre embarazo y parto en los planes Plena Vital, Plena Vital Total, Plena Plus y Plena Total. La cobertura incluye seguimiento prenatal completo, parto vaginal y cesárea en habitación individual, neonatología y revisión postparto. Sin período de carencia adicional si se contrata con antelación al embarazo. Si procedes de otra aseguradora médica, pueden eliminarse las carencias.",
      },
      {
        q: "¿Puedo contratar Adeslas si soy autónomo?",
        a: "Sí. Adeslas dispone de planes específicos para autónomos con ventajas fiscales: los autónomos pueden deducir hasta 500€/año por asegurado (ellos mismos y su cónyuge e hijos dependientes) en el IRPF. Puedes elegir entre GO, Plena Vital, Plena Vital Total, Plena Plus o Plena Total según tus necesidades.",
      },
      {
        q: "¿Adeslas tiene seguro dental?",
        a: "Sí. Adeslas Dental es un seguro dental específico desde 9,45€/mes. Cubre limpiezas, revisiones y radiografías desde el primer día sin carencias. También incluye franquicias reducidas en endodoncia, implantes y ortodoncia. Los menores de 8 años se aseguran gratis. Puede contratarse de forma independiente o complementaria a cualquier seguro médico Adeslas.",
      },
      {
        q: "¿Cuáles son las ventajas de Adeslas frente a otras aseguradoras?",
        a: "Adeslas (SegurCaixa Adeslas) es la aseguradora de salud privada líder en España. Sus principales ventajas son: la red médica más amplia del sector con más de 51.000 médicos y 1.400 centros; acceso inmediato sin listas de espera; sin necesidad de derivación previa para ver especialistas; copagos limitados o nulos según el plan; garantía de precio 3 años sin subidas en los planes Plena Vital Total y Plena Total; y cobertura en toda España.",
      },
      {
        q: "¿Adeslas tiene listas de espera?",
        a: "No. Una de las principales ventajas de los seguros médicos Adeslas es el acceso inmediato a médicos y especialistas sin listas de espera. En la mayoría de especialidades puedes tener cita en 24-72 horas. No se necesita derivación del médico de cabecera para acceder directamente a un especialista.",
      },
      {
        q: "¿Adeslas tiene periodo de carencia?",
        a: "Adeslas no aplica períodos de carencia generales: la mayoría de coberturas están activas desde el primer día de contratación, incluidas urgencias, consultas y hospitalización. Solo algunas prestaciones muy específicas pueden tener condiciones particulares. Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información.",
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
