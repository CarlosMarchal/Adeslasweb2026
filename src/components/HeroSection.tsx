import { motion } from "framer-motion";
import Tarificador from "@/components/Tarificador";
import heroBg from "@/assets/asisa_salud_seguro_medico.webp";
import CalcButton from "@/components/CalcButton";
import { usePhonePopup } from "@/components/PhonePopupContext";

const HeroSection = () => {
  const { openPhonePopup } = usePhonePopup();

  return (
    <section className="relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} role="img" aria-label="Seguro médico Adeslas — pareja sonriente con cobertura sanitaria privada completa">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="container mx-auto px-4 py-7 lg:py-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left column: badge, h1, description, CTAs, trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:pl-14 xl:pl-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full mb-6 text-sm text-white border" style={{ borderColor: "rgba(255,255,255,0.4)", background: "transparent" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#009DD9" }} />
              Seguro de salud Adeslas
            </div>
            <h1 className="text-white mb-3 text-xl md:text-2xl lg:text-[1.5rem] leading-snug font-bold">
              Seguro Médico Adeslas<br /><span>Encuentra el plan que mejor se adapta a ti</span>
            </h1>
            <p className="text-white/85 mb-4 text-sm md:text-base leading-relaxed max-w-md">
              Cobertura médica completa con +51.000 médicos, sin listas de espera y sin subidas de prima durante 3 años.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => document.getElementById('tarificador-mobile')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-lg font-bold text-sm cursor-pointer btn-cta-white"
                style={{ backgroundColor: "#fff", color: "#003087", borderRadius: "7px" }}
              >
                Calcular mi precio →
              </button>
              <button
                onClick={openPhonePopup}
                className="px-6 py-3 rounded-lg font-bold text-sm border cursor-pointer flex items-center gap-2 btn-cta-ghost"
                style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff", borderRadius: "7px", background: "rgba(255,255,255,0.1)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Te llamamos ahora
              </button>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {[
                { emoji: "⭐", label: "+30 años de experiencia" },
                { emoji: "🏥", label: "Sin listas de espera" },
                { emoji: "👨‍⚕️", label: "+51.000 médicos" },
                { emoji: "🏨", label: "+1.400 centros" },
              ].map(({ emoji, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-white text-xs sm:text-sm">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>{emoji}</span>
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column: white callback form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="rounded-2xl overflow-hidden max-w-[370px] mx-auto lg:ml-8 xl:ml-16" style={{ boxShadow: "0 20px 56px rgba(0,0,0,0.22)", height: "390px" }}>
              <Tarificador compact />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
