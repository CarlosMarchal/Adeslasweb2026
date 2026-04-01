import { motion } from "framer-motion";

const items = [
  { icon: "coverage", title: "Cobertura completa", desc: "Acceso a toda la red de centros médicos concertados" },
  { icon: "diagnostic", title: "Pruebas diagnósticas", desc: "Pruebas de imagen y análisis sin coste adicional" },
  { icon: "urgency", title: "Urgencias 24h", desc: "Atención inmediata ante situaciones de emergencia" },
  { icon: "teleconsult", title: "Videoconsultas y telemedicina 24H", desc: "Consultas online con receta médica incluida" },
  { icon: "specialties", title: "Especialidades médicas", desc: "Acceso a más de 51.000 médicos" },
  { icon: "pregnancy", title: "Seguimiento del embarazo", desc: "Preparación al parto y seguimiento completo" },
  { icon: "rehab", title: "Rehabilitación y fisioterapia", desc: "Tratamientos de rehabilitación incluidos" },
  { icon: "abroad", title: "Asistencia en el extranjero", desc: "Cobertura cuando viajas fuera de España" },
];

// SVG icon component
const IconSvg = ({ type }: { type: string }) => {
  const iconColor = "#1A3A5C";
  const iconProps = { stroke: iconColor, strokeWidth: "1.5", fill: "none", viewBox: "0 0 24 24" };

  switch (type) {
    case "coverage":
      return (
        <svg width="32" height="32" {...iconProps}>
          <path d="M12 2L2 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
          <path d="M12 7v6l4 2" />
        </svg>
      );
    case "diagnostic":
      return (
        <svg width="32" height="32" {...iconProps}>
          <path d="M4 4h16v16H4z" />
          <path d="M8 8h8M8 12h8M8 16h4" />
        </svg>
      );
    case "urgency":
      return (
        <svg width="32" height="32" {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    case "teleconsult":
      return (
        <svg width="32" height="32" {...iconProps}>
          <path d="M4 6h16v12H4z" />
          <path d="M8 18h8M12 20v2M6 20v2M18 20v2" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "specialties":
      return (
        <svg width="32" height="32" {...iconProps}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          <path d="M12 8v8M16 12H8" />
        </svg>
      );
    case "pregnancy":
      return (
        <svg width="32" height="32" {...iconProps}>
          <circle cx="12" cy="4" r="2" />
          <path d="M12 6v6l-4 4v4h8v-4l-4-4V6" />
          <path d="M8 18h8" />
        </svg>
      );
    case "rehab":
      return (
        <svg width="32" height="32" {...iconProps}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
          <path d="M12 6v12M8 10l8 4" />
          <path d="M16 10l-8 4" />
        </svg>
      );
    case "abroad":
      return (
        <svg width="32" height="32" {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z" />
          <path d="M12 2v20M2 12h20" />
        </svg>
      );
    default:
      return null;
  }
};

const WhyAdeslaSection = () => (
  <section id="por-que" className="section-pad bg-white">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-[#1A3A5C] mb-3">¿Por qué elegir Adeslas como tu seguro médico privado?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">SegurCaixa Adeslas, la aseguradora de salud privada líder en España: más de 51.000 médicos, +1.400 centros y precios garantizados sin subidas durante 3 años</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-lg p-6 transition-all duration-250 hover:shadow-lg"
            style={{ border: "1px solid #E8EFF4" }}
          >
            <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-lg" style={{ background: "#EBF7FD" }}>
              <IconSvg type={item.icon} />
            </div>
            <h3 className="text-[#1A3A5C] text-base font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyAdeslaSection;
