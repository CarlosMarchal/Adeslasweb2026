import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { TarificadorProvider } from "@/components/TarificadorContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroBg from "@/assets/seguro-salud-adeslas-individual.webp";

const contactMethods = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="#1c4a8d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    title: "Nuevas contrataciones",
    detail: "91 710 50 00",
    href: "tel:917105000",
    description: "Llámanos para contratar o solicitar información sobre cualquier seguro Adeslas.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="#1c4a8d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    title: "Atención al cliente",
    detail: "91 919 18 98",
    href: "tel:919191898",
    description: "Si ya eres cliente Adeslas, te ayudamos con cualquier gestión de tu póliza.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#1c4a8d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" stroke="#1c4a8d" strokeWidth="2"/></svg>
    ),
    title: "Oficina",
    detail: "Avenida de Filipinas, 28, Madrid",
    href: "https://maps.google.com/?q=Avenida+de+Filipinas+28+28003+Madrid",
    description: "Oficina Adeslas en Madrid (Avenida de Filipinas, 28). Atención personalizada para seguros médicos. Llama al 91 710 50 00.",
  },
];


const Contacto = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const _seo = useSeo({
    title: "Contacto Adeslas | Solicita tu Seguro Médico — Atención Personalizada",
    description: "Contacta con Adeslas Seguros Médicos. Solicita información sobre tu seguro, compara planes o pide una llamada gratuita. Tel. 91 710 50 00.",
    canonical: "https://adeslas.numero1salud.es/contacto/",
    ogImage: "https://adeslas.numero1salud.es/og-contacto.jpg",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
      { name: "Contacto", url: "https://adeslas.numero1salud.es/contacto/" },
    ],
    addLocalBusinessSchema: true,
    faqSchema: [
      {
        q: "¿Cómo puedo contactar con Adeslas para contratar un seguro?",
        a: "Puedes llamarnos al 91 710 50 00 (lunes a viernes de 9h a 19h), solicitar que te llamemos gratis a través del formulario de nuestra web, o visitar nuestra oficina en Avenida de Filipinas, 28, Madrid.",
      },
      {
        q: "¿Cuánto tarda en activarse el seguro médico Adeslas?",
        a: "El alta se tramita en el momento de la contratación. Recibirás tu tarjeta digital en menos de 24 horas y podrás empezar a usar el seguro desde el día siguiente a tu alta.",
      },
      {
        q: "¿Puedo pedir presupuesto sin compromiso?",
        a: "Sí. Puedes solicitar un presupuesto personalizado sin compromiso llamando al 91 710 50 00 o rellenando el formulario de nuestra web. Un asesor te contactará en menos de 2 horas en horario de oficina.",
      },
      {
        q: "¿Tienen oficina física en Madrid?",
        a: "Sí. Nuestra oficina está en Avenida de Filipinas, 28, Madrid (28003). Atención personalizada de lunes a viernes de 9h a 19h. También puedes gestionar todo por teléfono o email.",
      },
      {
        q: "¿Puedo contratar Adeslas para toda mi familia?",
        a: "Sí. Puedes asegurar a tu cónyuge e hijos en la misma póliza familiar. Llámanos al 91 710 50 00 y te daremos un presupuesto personalizado para toda la unidad familiar.",
      },
    ],
  });

  return (
    <TarificadorProvider>
      {_seo}
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden flex items-center" style={{ background: "linear-gradient(135deg, #003087 0%, #009FE3 65%, #009FE3 100%)", minHeight: "460px" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})`, opacity: 0.12, mixBlendMode: "luminosity" }} />
        <div className="container mx-auto px-4 py-10 lg:py-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <h1 className="text-primary-foreground mb-3 text-[26px] md:text-[36px] leading-tight md:leading-[1.15]">
              Contacta con<br /><span className="text-azul-claro">Adeslas Seguros Médicos</span>
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: "rgba(255,255,255,0.82)" }}>
              Solicita información sobre cualquier seguro Adeslas, resuelve tus dudas o pide una llamada gratuita sin compromiso.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact methods */}
      <section className="section-pad bg-blanco">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((m, i) => (
              <motion.a
                key={i}
                href={m.href}
                target={m.href.startsWith("http") ? "_blank" : undefined}
                rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-blanco border border-borde p-6 hover:-translate-y-1 transition-all duration-[250ms] card-shadow hover:card-shadow-hover block text-center"
                style={{ borderRadius: "16px" }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#E8F4FC" }}>
                  {m.icon}
                </div>
                <h3 className="text-gris-texto text-lg font-bold mb-1">{m.title}</h3>
                <div className="text-azul-medio font-black text-xl mb-2">{m.detail}</div>
                <p className="text-sm text-gris-medio">{m.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Map / Address */}
      <section className="section-pad bg-blanco">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <h2 className="text-gris-texto mb-3">Oficina Adeslas Madrid — Avenida de Filipinas</h2>
            <p className="text-gris-medio">Avenida de Filipinas, 28 · CP 28003, Madrid</p>
          </motion.div>
          <div className="bg-gris-claro border border-borde overflow-hidden" style={{ borderRadius: "16px" }}>
            <iframe
              title="Ubicación Oficina Adeslas Madrid"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.5!2d-3.7026!3d40.4369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAvenida+de+Filipinas+28+Madrid!5e0!3m2!1ses!2ses!4v1"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="text-center mt-6">
            <p className="text-gris-texto font-bold">Avenida de Filipinas, 28 · CP 28003</p>
            <p className="text-gris-medio">Madrid, España</p>
          </div>
        </div>
      </section>

      <Footer />
    </TarificadorProvider>
  );
};

export default Contacto;
