import { motion } from "framer-motion";

const items = [
  { num: "01", title: "Asesor personal incluido", desc: "Un profesional dedicado te acompaña en cada paso, desde la contratación hasta la gestión de tus consultas." },
  { num: "02", title: "Libre elección de médico", desc: "Accede a más de 42.000 especialistas y elige el profesional que prefieras en cualquier momento." },
  { num: "03", title: "Telemedicina 24h incluida", desc: "Consulta médica online las 24 horas a través de Adeslas Live, sin coste adicional." },
];

const WhyAdeslaSection = () => (
  <section id="por-que" className="section-pad bg-gris-claro">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-gris-texto mb-3">¿Por qué Adeslas?</h2>
        <p className="text-gris-medio max-w-lg mx-auto">Más de 30 años cuidando de la salud de millones de personas.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-blanco rounded-2xl p-6 card-shadow transition-all duration-[250ms] hover:-translate-y-1"
            style={{ borderRadius: "16px" }}
          >
            <div className="text-3xl font-black text-azul-claro mb-3">{item.num}</div>
            <h3 className="text-gris-texto text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-gris-medio">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyAdeslaSection;
