import { motion } from "@/lib/motion";

export default function BannerServiciosDigitales() {
  return (
    <section className="rounded-2xl px-7 py-8" style={{ background: "#EBF7FD" }}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-[19px] font-black mb-6"
        style={{ color: "#1A3A5C" }}
      >
        Servicios de salud digital
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* ── VIDEOLLAMADA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0 }}
          className="bg-white rounded-xl p-5 flex flex-col gap-3 transition-all duration-250 hover:shadow-lg"
          style={{ border: "1px solid #D8EAF2" }}
        >
          <div
            className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ background: "#EBF7FD" }}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <rect x="1" y="4" width="16" height="13" rx="2" stroke="#1A3A5C" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M17 10.5l7-4v10l-7-4z" stroke="#1A3A5C" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
              <line x1="9" y1="7" x2="9" y2="14" stroke="#009FE3" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="5.5" y1="10.5" x2="12.5" y2="10.5" stroke="#009FE3" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9" y1="17" x2="9" y2="22" stroke="#1A3A5C" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="5" y1="22" x2="13" y2="22" stroke="#1A3A5C" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-black leading-snug mb-1" style={{ color: "#1A3A5C" }}>
              Videollamada con tu médico
            </p>
            <p className="text-xs font-bold mb-2" style={{ color: "#009FE3" }}>
              Medicina General y especialistas
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#4A6880" }}>
              Pediatría · Dermatología · Endocrinología · Digestivo · Ginecología · Psiquiatría · Traumatología
            </p>
          </div>
        </motion.div>

        {/* ── AUTORIZACIONES ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="bg-white rounded-xl p-5 flex flex-col gap-3 transition-all duration-250 hover:shadow-lg"
          style={{ border: "1px solid #D8EAF2" }}
        >
          <div
            className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ background: "#EBF7FD" }}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <path d="M5 2h11l7 7v15H5V2z" stroke="#1A3A5C" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
              <path d="M16 2v7h7" stroke="#1A3A5C" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
              <line x1="8" y1="13" x2="18" y2="13" stroke="#009FE3" strokeWidth="1.4" strokeLinecap="round" />
              <line x1="8" y1="16.5" x2="14" y2="16.5" stroke="#009FE3" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M7.5 20.5l3 3 7-7" stroke="#1A3A5C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-black leading-snug mb-1" style={{ color: "#1A3A5C" }}>
              Autorizaciones Online
            </p>
            <p className="text-xs font-bold mb-2" style={{ color: "#009FE3" }}>
              Sin llamadas, sin papeles
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#4A6880" }}>
              Solicita y gestiona todas tus autorizaciones médicas desde la app de Adeslas, al instante.
            </p>
          </div>
        </motion.div>

        {/* ── CHAT MÉDICO 24H ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="bg-white rounded-xl p-5 flex flex-col gap-3 transition-all duration-250 hover:shadow-lg"
          style={{ border: "1px solid #D8EAF2" }}
        >
          <div
            className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ background: "#EBF7FD" }}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <path
                d="M2 3h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2z"
                stroke="#1A3A5C" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"
              />
              <circle cx="8" cy="10" r="1.1" fill="#009FE3" />
              <circle cx="12" cy="10" r="1.1" fill="#009FE3" />
              <circle cx="16" cy="10" r="1.1" fill="#009FE3" />
              <circle cx="21.5" cy="21.5" r="4" stroke="#1A3A5C" strokeWidth="1.4" fill="#EBF7FD" />
              <line x1="21.5" y1="18.8" x2="21.5" y2="21.5" stroke="#1A3A5C" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="21.5" y1="21.5" x2="23.5" y2="21.5" stroke="#1A3A5C" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-black leading-snug mb-1" style={{ color: "#1A3A5C" }}>
              Chat médico 24 horas
            </p>
            <p className="text-xs font-bold mb-2" style={{ color: "#009FE3" }}>
              Disponible cualquier día del año
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#4A6880" }}>
              Consulta con un médico en cualquier momento, de día o de noche, sin esperas.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
