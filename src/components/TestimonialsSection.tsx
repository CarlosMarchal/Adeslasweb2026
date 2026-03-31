import { motion } from "framer-motion";

const testimonials = [
  {
    name: "María G.",
    product: "Adeslas Plena Total",
    text: "Contraté Adeslas Plena Plushace 2 años y la experiencia ha sido excelente. El asesor personal me ayudó a elegir el mejor plan para mi familia y siempre resuelve mis dudas rápidamente.",
  },
  {
    name: "Carlos R.",
    product: "Adeslas Plena Plus++",
    text: "Después de comparar varias aseguradoras, me decanté por Adeslas. La relación calidad-precio es inmejorable y la telemedicina 24h es un servicio que utilizo mucho.",
  },
  {
    name: "Ana L.",
    product: "Seguro Familiar",
    text: "Tenemos toda la familia asegurada con Adeslas. Mis hijos van al pediatra sin esperas y los especialistas son de primera. Muy contentos con el servicio.",
  },
];

const Stars = () => (
  <div className="flex gap-0.5 mb-3">
    {[...Array(5)].map((_, i) => (
      <span key={i} style={{ color: "#009FE3", fontSize: "16px" }}>★</span>
    ))}
  </div>
);

const TestimonialsSection = () => (
  <section className="section-pad bg-blanco">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-gris-texto mb-3">Opiniones de clientes asegurados con Adeslas</h2>
        <p className="text-gris-medio max-w-lg mx-auto">Clientes reales que confían en Adeslas para cuidar su salud y la de su familia.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative bg-blanco rounded-2xl p-6 card-shadow border border-borde"
            style={{ borderRadius: "16px" }}
          >
            <span
              className="absolute -top-2 left-5 leading-none select-none"
              style={{ fontFamily: "Georgia, serif", fontSize: "64px", color: "#E8F4FC" }}
            >
              "
            </span>
            <div className="relative pt-6">
              <Stars />
              <p className="text-sm text-gris-texto mb-4 leading-relaxed">{t.text}</p>
              <div>
                <div className="font-bold text-gris-texto text-sm">{t.name}</div>
                <div className="text-xs text-gris-medio">{t.product}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
