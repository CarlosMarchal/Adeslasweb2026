import { motion } from "framer-motion";
import Tarificador from "@/components/Tarificador";
import heroBg from "@/assets/asisa_salud_seguro_medico.webp";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} role="img" aria-label="Seguro médico Adeslas — pareja sonriente con cobertura sanitaria privada completa">
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.65)" }} />

      <div className="max-w-[1280px] mx-auto px-12 lg:px-20 py-5 lg:py-7 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left column: badge, h1, description, trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full mb-6 text-sm text-white border" style={{ borderColor: "rgba(255,255,255,0.4)", background: "transparent" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#009DD9" }} />
              Seguros Médicos Adeslas
            </div>
            <h1 className="text-white mb-3 text-xl md:text-2xl lg:text-[1.5rem] leading-snug font-bold">
              Seguros Médicos Adeslas<br /><span style={{ color: "#009FE3" }}>Compara planes y calcula tu precio ahora</span>
            </h1>
            <p className="text-white/85 mb-6 text-sm md:text-base leading-relaxed max-w-md">
              GO desde 21€ · Plena Vital desde 38€ · Plena Total sin copagos desde 83€. Más de 51.000 médicos, sin listas de espera en toda España.
            </p>
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
