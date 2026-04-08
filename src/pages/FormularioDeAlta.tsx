import { useEffect } from "react";
import { Phone } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FormularioDeAlta = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const _seo = useSeo({
    title:
      "Formulario de Alta Adeslas | Gestiona tu Seguro Médico",
    description:
      "Gestiona tu alta en Adeslas de forma rápida. Completa el formulario o llama al 91 710 50 00. Marchal Aseguradores, Agente Exclusivo Adeslas.",
    canonical:
      "https://adeslas.numero1salud.es/seguro-salud/adeslas-formulario-de-alta/",
    noindex: true,
  });

  return (
    <>
      {_seo}
      <Header />
      <main className="min-h-[calc(100vh-200px)] bg-white">
        <section className="section-pad">
          <div className="container mx-auto max-w-2xl">
            {/* Título principal */}
            <div className="text-center mb-8">
              <h1 className="text-gris-texto text-3xl md:text-4xl font-bold mb-3">
                Formulario de Alta Adeslas
              </h1>
              <p className="text-gris-medio text-base leading-relaxed">
                Completa el formulario y un asesor gestionará tu alta de forma
                rápida y segura
              </p>
            </div>

            {/* Bloque de contenido principal */}
            <div className="bg-gris-claro border border-borde rounded-2xl p-8 md:p-10 text-center">
              <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: "#E8F4FC" }}>
                <span style={{ color: "#009FE3" }} className="text-sm font-bold">
                  Formulario en integración
                </span>
              </div>

              <h2 className="text-gris-texto text-xl md:text-2xl font-bold mb-4">
                Formulario de alta en proceso de integración
              </h2>

              <p className="text-gris-medio text-base mb-8 max-w-lg mx-auto leading-relaxed">
                Estamos mejorando nuestro sistema de contratación online para
                ofrecerte una experiencia aún mejor. Mientras tanto, puedes
                gestionar tu alta de forma rápida y sencilla llamando a nuestro
                equipo de asesores.
              </p>

              {/* CTA Botón teléfono */}
              <a
                href="tel:917105000"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all duration-200 hover:shadow-lg"
                style={{ backgroundColor: "#E4097D" }}
              >
                <Phone className="w-5 h-5" />
                Llama al 91 710 50 00
              </a>

              {/* Información adicional */}
              <div className="mt-8 pt-8 border-t border-borde space-y-3">
                <p className="text-gris-medio text-sm">
                  <strong>Horario de atención:</strong> Lunes a Viernes, 9:00 a
                  20:00
                </p>
                <p className="text-gris-medio text-sm">
                  <strong>Atención especializada sin compromiso</strong> —
                  Nuestros asesores te guiarán en todo el proceso de
                  contratación.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FormularioDeAlta;
