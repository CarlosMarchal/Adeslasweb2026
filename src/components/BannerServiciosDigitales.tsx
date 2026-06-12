import { motion } from "@/lib/motion";

export default function BannerServiciosDigitales() {
  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-4 text-xs font-bold"
          style={{ background: "rgba(0,159,227,0.15)", color: "#009FE3" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#009FE3" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
          </svg>
          Incluido en tu seguro
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
          Y además, servicios de salud digital
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          Accede desde la app de Adeslas, cuando lo necesites
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* ── VIDEOLLAMADA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0 }}
          className="bg-white rounded-2xl p-6 flex flex-col gap-4 transition-all duration-250 hover:-translate-y-1"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
        >
          <div
            className="w-14 h-14 flex items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg, #e8f6fd 0%, #c9ecf9 100%)" }}
          >
            <svg width="34" height="34" viewBox="0 0 50 50" fill="none" aria-hidden="true">
              <rect x="2" y="8" width="30" height="22" rx="3" stroke="#1A3A5C" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M32 19l16-9v20l-16-9z" stroke="#1A3A5C" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
              <line x1="17" y1="13" x2="17" y2="25" stroke="#009FE3" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="11" y1="19" x2="23" y2="19" stroke="#009FE3" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="17" y1="30" x2="17" y2="40" stroke="#1A3A5C" strokeWidth="2" strokeLinecap="round" />
              <line x1="9" y1="40" x2="25" y2="40" stroke="#1A3A5C" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: "#1A3A5C" }}>
              Videollamada con tu médico
            </h3>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#5A7389" }}>
              Consulta con especialistas sin salir de casa.
            </p>
            <p className="text-xs font-bold leading-relaxed" style={{ color: "#009FE3" }}>
              Medicina General · Pediatría · Dermatología · Endocrinología · Digestivo · Ginecología · Psiquiatría · Traumatología
            </p>
          </div>
        </motion.div>

        {/* ── AUTORIZACIONES ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.07 }}
          className="bg-white rounded-2xl p-6 flex flex-col gap-4 transition-all duration-250 hover:-translate-y-1"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
        >
          <div
            className="w-14 h-14 flex items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg, #e8f6fd 0%, #c9ecf9 100%)" }}
          >
            <svg width="34" height="34" viewBox="0 0 50 50" fill="none" aria-hidden="true">
              <path d="M8 4h22l14 13v29H8V4z" stroke="#1A3A5C" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
              <path d="M30 4v13h14" stroke="#1A3A5C" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
              <line x1="15" y1="24" x2="35" y2="24" stroke="#009FE3" strokeWidth="2" strokeLinecap="round" />
              <line x1="15" y1="30" x2="27" y2="30" stroke="#009FE3" strokeWidth="2" strokeLinecap="round" />
              <path d="M13 40l6 6 14-14" stroke="#1A3A5C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: "#1A3A5C" }}>
              Autorizaciones Online
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#5A7389" }}>
              Solicita y gestiona todas tus autorizaciones médicas desde la app al instante. Sin llamadas ni papeles.
            </p>
          </div>
        </motion.div>

        {/* ── CHAT MÉDICO 24H ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="bg-white rounded-2xl p-6 flex flex-col gap-4 transition-all duration-250 hover:-translate-y-1"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
        >
          <div
            className="w-14 h-14 flex items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg, #e8f6fd 0%, #c9ecf9 100%)" }}
          >
            <svg width="34" height="34" viewBox="0 0 50 50" fill="none" aria-hidden="true">
              <path
                d="M4 6h34a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H14l-9 7V9a3 3 0 0 1 3-3z"
                stroke="#1A3A5C" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"
              />
              <circle cx="14" cy="18" r="2.4" fill="#009FE3" />
              <circle cx="21" cy="18" r="2.4" fill="#009FE3" />
              <circle cx="28" cy="18" r="2.4" fill="#009FE3" />
              <circle cx="42" cy="42" r="7" stroke="#1A3A5C" strokeWidth="2" fill="white" />
              <line x1="42" y1="37" x2="42" y2="42" stroke="#1A3A5C" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="42" y1="42" x2="46" y2="42" stroke="#1A3A5C" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: "#1A3A5C" }}>
              Chat médico 24 horas
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#5A7389" }}>
              Consulta con un médico en cualquier momento, los 365 días del año. Sin esperas.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
