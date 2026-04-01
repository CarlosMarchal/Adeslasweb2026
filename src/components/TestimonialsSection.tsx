import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Laura M.",
    location: "Madrid",
    product: "Adeslas Plena Plus",
    rating: 5,
    text: "Me operé de menisco el mes pasado y no esperé ni 10 días desde que pedí la primera consulta hasta la intervención. En la seguridad social me decían 8 meses. Sin duda merece cada euro.",
  },
  {
    name: "Javier S.",
    location: "Valencia",
    product: "Adeslas GO",
    rating: 4.5,
    text: "Empecé con el plan GO para tantear y ha superado lo que esperaba. Cita con el dermatólogo en 2 días, la app funciona muy bien y el copago es muy asumible. Cuando tenga familia ampliaré el plan.",
  },
  {
    name: "Rosa T.",
    location: "Barcelona",
    product: "Plena Vital — Seguro familiar",
    rating: 5,
    text: "Tres hijos y los tres asegurados. La pediatra nos responde por videollamada para cosas del día a día y en urgencias no hay esperas eternas. Es la mejor decisión que he tomado para la familia.",
  },
  {
    name: "Miguel A.",
    location: "Sevilla",
    product: "Adeslas Plena Total",
    rating: 4.5,
    text: "El asesor me explicó las diferencias entre planes sin presionarme nada. Al final elegí Plena Total y estoy muy contento: sin copagos, dental incluido y el servicio al cliente responde enseguida.",
  },
  {
    name: "Carmen R.",
    location: "Bilbao",
    product: "Adeslas Plena Vital",
    rating: 5,
    text: "Llevaba años en la pública y el cambio es brutal. Consultas en el mismo día muchas veces, especialistas de verdad y sobre todo tranquilidad. El precio es razonable para lo que ofrece.",
  },
  {
    name: "Andrés P.",
    location: "Zaragoza",
    product: "Adeslas GO",
    rating: 4.5,
    text: "Contraté para tener algo de cobertura siendo autónomo y ha sido perfecto. He ido al médico tres veces este año y la experiencia siempre ha sido muy buena. Repetiré sin duda.",
  },
];

const Stars = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => {
        if (i < full) {
          return <span key={i} style={{ color: "#009FE3", fontSize: "15px" }}>★</span>;
        }
        if (i === full && half) {
          return (
            <span key={i} style={{ fontSize: "15px", position: "relative", display: "inline-block" }}>
              <span style={{ color: "#D1E9F6" }}>★</span>
              <span style={{ color: "#009FE3", position: "absolute", left: 0, top: 0, width: "50%", overflow: "hidden", display: "inline-block" }}>★</span>
            </span>
          );
        }
        return <span key={i} style={{ color: "#D1E9F6", fontSize: "15px" }}>★</span>;
      })}
    </div>
  );
};

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
        {testimonials.slice(0, 3).map((t, i) => (
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
              <Stars rating={t.rating} />
              <p className="text-sm text-gris-texto mb-4 leading-relaxed">{t.text}</p>
              <div>
                <div className="font-bold text-gris-texto text-sm">{t.name} <span className="font-normal text-gris-medio">· {t.location}</span></div>
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
