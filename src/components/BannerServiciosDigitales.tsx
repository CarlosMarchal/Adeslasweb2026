import { motion } from "@/lib/motion";

export default function BannerServiciosDigitales() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-black" style={{ color: "#1A3A5C" }}>
          Y además, servicios de salud digital
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        {/* ── VIDEOLLAMADA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0 }}
          className="bg-white rounded-lg p-6 transition-all duration-250 hover:shadow-lg"
          style={{ border: "1px solid #E8EFF4" }}
        >
          <div className="mb-4 w-14 h-14 flex items-center justify-center rounded-lg" style={{ background: "#EBF7FD" }}>
            <svg width="36" height="36" viewBox="0 0 50 50" fill="none" aria-hidden="true">
              <rect x="2" y="8" width="30" height="22" rx="3" stroke="#1A3A5C" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M32 19l16-9v20l-16-9z" stroke="#1A3A5C" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
              <line x1="17" y1="13" x2="17" y2="25" stroke="#009FE3" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="11" y1="19" x2="23" y2="19" stroke="#009FE3" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="17" y1="30" x2="17" y2="40" stroke="#1A3A5C" strokeWidth="2" strokeLinecap="round" />
              <line x1="9" y1="40" x2="25" y2="40" stroke="#1A3A5C" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-base font-bold mb-2" style={{ color: "#1A3A5C" }}>
            Videollamada con tu médico
          </h3>
          <p className="text-sm leading-relaxed mb-2" style={{ color: "#5A7389" }}>
            Consulta con especialistas sin salir de casa.
          </p>
          <p className="text-xs font-bold leading-relaxed" style={{ color: "#009FE3" }}>
            Medicina General · Pediatría · Dermatología · Endocrinología · Digestivo · Ginecología · Psiquiatría · Traumatología
          </p>
        </motion.div>

        {/* ── AUTORIZACIONES ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.07 }}
          className="bg-white rounded-lg p-6 transition-all duration-250 hover:shadow-lg"
          style={{ border: "1px solid #E8EFF4" }}
        >
          <div className="mb-4 w-14 h-14 flex items-center justify-center rounded-lg" style={{ background: "#EBF7FD" }}>
            <svg width="36" height="36" viewBox="0 0 50 50" fill="none" aria-hidden="true">
              <path d="M8 4h22l14 13v29H8V4z" stroke="#1A3A5C" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
              <path d="M30 4v13h14" stroke="#1A3A5C" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
              <line x1="15" y1="24" x2="35" y2="24" stroke="#009FE3" strokeWidth="2" strokeLinecap="round" />
              <line x1="15" y1="30" x2="27" y2="30" stroke="#009FE3" strokeWidth="2" strokeLinecap="round" />
              <path d="M13 40l6 6 14-14" stroke="#1A3A5C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-base font-bold mb-2" style={{ color: "#1A3A5C" }}>
            Autorizaciones Online
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#5A7389" }}>
            Solicita y gestiona todas tus autorizaciones médicas desde la app de Adeslas, al instante. Sin llamadas ni papeles.
          </p>
        </motion.div>

        {/* ── CHAT MÉDICO 24H ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="bg-white rounded-lg p-6 transition-all duration-250 hover:shadow-lg"
          style={{ border: "1px solid #E8EFF4" }}
        >
          <div className="mb-4 w-14 h-14 flex items-center justify-center rounded-lg" style={{ background: "#EBF7FD" }}>
            <svg width="36" height="36" viewBox="0 0 50 50" fill="none" aria-hidden="true">
              <path
                d="M4 6h34a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H14l-9 7V9a3 3 0 0 1 3-3z"
                stroke="#1A3A5C" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"
              />
              <circle cx="14" cy="18" r="2.2" fill="#009FE3" />
              <circle cx="21" cy="18" r="2.2" fill="#009FE3" />
              <circle cx="28" cy="18" r="2.2" fill="#009FE3" />
              <circle cx="42" cy="42" r="7" stroke="#1A3A5C" strokeWidth="2" fill="#EBF7FD" />
              <line x1="42" y1="37" x2="42" y2="42" stroke="#1A3A5C" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="42" y1="42" x2="46" y2="42" stroke="#1A3A5C" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-base font-bold mb-2" style={{ color: "#1A3A5C" }}>
            Chat médico 24 horas
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#5A7389" }}>
            Consulta con un médico en cualquier momento del día o la noche, los 365 días del año. Sin esperas.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
