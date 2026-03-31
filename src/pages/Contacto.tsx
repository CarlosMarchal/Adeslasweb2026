import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { TarificadorProvider } from "@/components/TarificadorContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePhonePopup } from "@/components/PhonePopupContext";
import heroBg from "@/assets/asisa_salud_seguro_medico.webp";

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
    detail: "91 991 19 99",
    href: "tel:919911999",
    description: "Si ya eres cliente Adeslas, te ayudamos con cualquier gestión de tu póliza.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#1c4a8d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" stroke="#1c4a8d" strokeWidth="2"/></svg>
    ),
    title: "Oficina",
    detail: "Avda. Europa, 18, Pozuelo de Alarcón",
    href: "https://maps.google.com/?q=Avenida+Europa+18+Pozuelo+de+Alarcon+Madrid",
    description: "Oficina Adeslas en Pozuelo de Alarcón, Madrid. Atención personalizada para seguros médicos. Llama al 91 710 50 00.",
  },
];

/* ── Contact Form ── */

const interestOptions = [
  "Seguro médico particular",
  "Seguro para autónomos",
  "Seguro para empresas/pymes",
  "Seguro dental",
  "Otros seguros (vida, decesos, mascotas)",
  "Ya soy cliente – consulta sobre mi póliza",
];

const ContactForm = () => {
  const { openPhonePopup } = usePhonePopup();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="formulario" className="section-pad bg-gris-claro">
      <div className="container mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-gris-texto mb-2">Escríbenos sobre tu seguro Adeslas</h2>
            <p className="text-gris-medio mb-8">Rellena el formulario y un asesor personal Adeslas te contactará en menos de 24 horas sin compromiso.</p>

            {submitted ? (
              <div className="bg-blanco border border-borde p-8 text-center" style={{ borderRadius: "16px" }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#E8F4FC" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#009FE3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 className="text-gris-texto text-xl font-bold mb-2">¡Mensaje enviado!</h3>
                <p className="text-gris-medio">Un asesor personal te contactará en las próximas horas. Gracias por confiar en Adeslas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gris-texto mb-1.5">Nombre completo *</label>
                    <input
                      id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                      placeholder="Tu nombre y apellidos"
                      className="w-full px-4 py-3 bg-blanco border border-borde text-sm text-gris-texto placeholder:text-gris-medio/60 focus:outline-none focus:border-azul-medio transition-colors"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gris-texto mb-1.5">Email *</label>
                    <input
                      id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 bg-blanco border border-borde text-sm text-gris-texto placeholder:text-gris-medio/60 focus:outline-none focus:border-azul-medio transition-colors"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gris-texto mb-1.5">Teléfono *</label>
                    <input
                      id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                      placeholder="611 222 333"
                      className="w-full px-4 py-3 bg-blanco border border-borde text-sm text-gris-texto placeholder:text-gris-medio/60 focus:outline-none focus:border-azul-medio transition-colors"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-bold text-gris-texto mb-1.5">¿En qué estás interesado?</label>
                    <select
                      id="interest" name="interest" value={formData.interest} onChange={handleChange}
                      className="w-full px-4 py-3 bg-blanco border border-borde text-sm text-gris-texto focus:outline-none focus:border-azul-medio transition-colors appearance-none"
                      style={{ borderRadius: "10px" }}
                    >
                      <option value="">Selecciona una opción</option>
                      {interestOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gris-texto mb-1.5">Mensaje</label>
                  <textarea
                    id="message" name="message" rows={4} value={formData.message} onChange={handleChange}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    className="w-full px-4 py-3 bg-blanco border border-borde text-sm text-gris-texto placeholder:text-gris-medio/60 focus:outline-none focus:border-azul-medio transition-colors resize-none"
                    style={{ borderRadius: "10px" }}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 accent-azul-medio" />
                  <label htmlFor="terms" className="text-xs text-gris-medio leading-relaxed">
                    Acepto la <a href="/aviso-legal" className="text-azul-medio underline">política de privacidad</a> y los <a href="/aviso-legal" className="text-azul-medio underline">términos y condiciones</a>. Consiento el tratamiento de mis datos para recibir información sobre seguros Adeslas.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-primary-foreground font-bold text-sm btn-cta-magenta"
                  style={{ backgroundColor: "#E4097D", borderRadius: "7px" }}
                >
                  Enviar mensaje →
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar info */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="space-y-5">
            <div className="bg-blanco border border-borde p-6" style={{ borderRadius: "16px" }}>
              <h3 className="text-gris-texto text-lg font-bold mb-3">¿Prefieres que te llamemos?</h3>
              <p className="text-sm text-gris-medio mb-4">Solicita una llamada gratuita y un asesor te contactará sin compromiso.</p>
              <button
                onClick={() => openPhonePopup()}
                className="block w-full text-center py-3 rounded-lg text-primary-foreground font-bold text-sm cursor-pointer btn-cta-magenta"
                style={{ backgroundColor: "#E4097D", borderRadius: "7px" }}
              >
                Solicitar llamada →
              </button>
            </div>

            <div className="bg-blanco border border-borde p-6" style={{ borderRadius: "16px" }}>
              <h3 className="text-gris-texto text-lg font-bold mb-3">Horario de atención</h3>
              <div className="space-y-2 text-sm text-gris-medio">
                <div className="flex justify-between"><span>Lunes a viernes</span><span className="font-bold text-gris-texto">9:00 – 20:00</span></div>
                <div className="flex justify-between"><span>Sábado y domingo</span><span className="text-gris-medio">Cerrado</span></div>
              </div>
            </div>

            <div className="bg-blanco border border-borde p-6" style={{ borderRadius: "16px" }}>
              <h3 className="text-gris-texto text-lg font-bold mb-3">Contacto directo</h3>
              <div className="space-y-3 text-sm">
                <a href="tel:917105000" className="flex items-center gap-3 text-gris-texto hover:text-azul-medio transition-colors">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#E8F4FC" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="#009FE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span><span className="font-bold">91 710 50 00</span> · Nuevas altas</span>
                </a>
                <a href="tel:919911999" className="flex items-center gap-3 text-gris-texto hover:text-azul-medio transition-colors">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#E8F4FC" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="#009FE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span><span className="font-bold">91 991 19 99</span> · Clientes</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contacto = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useSeo({
    title: "Contacto Adeslas | Solicita tu Seguro Médico — Atención Personalizada",
    description: "Contacta con Adeslas Seguros Médicos. Solicita información sobre tu seguro, compara planes o pide una llamada gratuita. Tel. 91 710 50 00.",
    canonical: "https://adeslas.marchalaseguradores.es/contacto",
  });

  return (
    <TarificadorProvider>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #003087 0%, #009FE3 65%, #009FE3 100%)" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})`, opacity: 0.12, mixBlendMode: "luminosity" }} />
        <div className="container mx-auto px-4 py-14 lg:py-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <h1 className="text-primary-foreground mb-3 text-3xl md:text-[48px] leading-tight md:leading-[1.15]">
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

      {/* Contact form */}
      <ContactForm />

      {/* Map / Address */}
      <section className="section-pad bg-blanco">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <h2 className="text-gris-texto mb-3">Oficina Adeslas Madrid — Pozuelo de Alarcón</h2>
            <p className="text-gris-medio">Avda. Europa, 18 · Pozuelo de Alarcón, Madrid</p>
          </motion.div>
          <div className="bg-gris-claro border border-borde overflow-hidden" style={{ borderRadius: "16px" }}>
            <iframe
              title="Ubicación Oficina Adeslas Madrid"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.5!2d-3.8144!3d40.4365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMayor+2+Pozuelo+de+Alarcon!5e0!3m2!1ses!2ses!4v1"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="text-center mt-6">
            <p className="text-gris-texto font-bold">Avda. Europa, 18 · CP 28224</p>
            <p className="text-gris-medio">Pozuelo de Alarcón, Madrid, España</p>
          </div>
        </div>
      </section>

      <Footer />
    </TarificadorProvider>
  );
};

export default Contacto;
