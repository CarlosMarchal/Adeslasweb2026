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
  const _seo = useSeo({
    title: "Adeslas Seguros Médicos | Salud Privada · +51.000 Médicos · Sin Listas de Espera",
    description:
      "Adeslas: seguro médico privado líder en España. GO desde 21€, Plena Vital desde 38€, Plena Vital Total desde 48,50€ (3 años sin subidas de prima), Plena Total sin copagos desde 83€. Más de 51.000 médicos y 1.400 centros. Calcula tu precio en 2 minutos.",
    canonical: "https://adeslas.numero1salud.es/",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    ],
    addOrganizationSchema: true,
    addWebsiteSchema: true,
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
      {_seo}
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
