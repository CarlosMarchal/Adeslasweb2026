import { motion } from "@/lib/motion";

const testimonials = [
  {
    name: "Laura M.",
    location: "Madrid",
    product: "Adeslas Plena Plus",
    rating: 5,
    date: "marzo 2025",
    text: "Me operé de menisco y solo esperé 9 días desde la primera consulta hasta la intervención. En la pública me habían dado fecha para 8 meses después. La diferencia es brutal.",
  },
  {
    name: "Javier S.",
    location: "Valencia",
    product: "Adeslas GO",
    rating: 4,
    date: "enero 2025",
    text: "Lo contraté sin muchas expectativas y me ha sorprendido. Dermatólogo en 2 días, copago asumible y la app va muy bien. Cuando tenga familia ampliaré sin dudarlo.",
  },
  {
    name: "Rosa T.",
    location: "Barcelona",
    product: "Adeslas Plena Vital",
    rating: 5,
    date: "febrero 2025",
    text: "Tres hijos asegurados. La pediatra por videollamada a cualquier hora y en urgencias sin esperas. Lo mejor que hemos hecho para la familia, sin exagerar.",
  },
  {
    name: "Miguel A.",
    location: "Sevilla",
    product: "Adeslas Plena Total",
    rating: 5,
    date: "noviembre 2024",
    text: "El asesor me explicó todo sin presionarme. Elegí Plena Total y estoy muy contento: sin copagos, dental incluido y atención al cliente que coge el teléfono de verdad.",
  },
  {
    name: "Carmen R.",
    location: "Bilbao",
    product: "Adeslas Plena Vital",
    rating: 4,
    date: "diciembre 2024",
    text: "Llevaba años en la pública y el cambio es notable. Consultas en el día muchas veces y especialistas que te dedican tiempo. El precio es justo para lo que ofrece.",
  },
  {
    name: "Andrés P.",
    location: "Zaragoza",
    product: "Adeslas GO",
    rating: 5,
    date: "octubre 2024",
    text: "Autónomo y sin seguro privado hasta los 34 años. Debí haberlo contratado antes. Tres veces al médico este año y siempre una experiencia rápida y sin complicaciones.",
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

const VerifiedBadge = () => (
  <span
    className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full mb-3"
    style={{ background: "#EAF7EF", color: "#1A8A4A" }}
  >
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 3L5 9L2 6" stroke="#1A8A4A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    Reseña verificada
  </span>
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
        <h2 className="text-gris-texto mb-3">Lo que dicen nuestros asegurados</h2>
        <p className="text-gris-medio max-w-lg mx-auto">
          Opiniones reales de clientes verificados.
        </p>
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
              <VerifiedBadge />
              <p className="text-sm text-gris-texto mb-4 leading-relaxed">{t.text}</p>
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-bold text-gris-texto text-sm">{t.name} <span className="font-normal text-gris-medio">· {t.location}</span></div>
                  <div className="text-xs text-gris-medio">{t.product}</div>
                </div>
                {t.date && (
                  <span className="text-xs text-gris-medio opacity-70">{t.date}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
