import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "¿Cuánto cuesta un seguro médico Adeslas?",
    a: "El precio de un seguro médico Adeslas varía según edad, cobertura y modalidad elegida. Adeslas Plena Vital comienza desde 13€/mes, mientras que Adeslas Plena Plusofrece cobertura integral sin copagos. Utiliza nuestro calculador online para obtener tu presupuesto personalizado en menos de 2 minutos.",
  },
  {
    q: "¿Qué cubre el seguro Adeslas Plena Total?",
    a: "Adeslas Plena Plusincluye atención médica integral: consultas con especialistas, pruebas diagnósticas, cirugía, hospitalización y rehabilitación. Es ideal para familias que buscan cobertura completa sin copagos. Las versiones Completa+ y Completa++ amplifican aún más las coberturas con servicios premium.",
  },
  {
    q: "¿Adeslas tiene copagos?",
    a: "Adeslas ofrece planes con y sin copagos. Adeslas Plena Vital y YA incluyen copagos reducidos para mantener precios bajos. Adeslas Plena Total, Completa+ y Completa++ pueden contratarse sin copagos, pagando una prima fija mensual. Elige la opción que mejor se adapte a tu presupuesto.",
  },
  {
    q: "¿Adeslas cubre embarazo y parto?",
    a: "Sí, Adeslas cubre embarazo y parto en los planes de cobertura completa como Adeslas Plena Total, Completa+ y Completa++. La cobertura incluye controles obstétricos, parto y postparto. Consulta los periodos de carencia y cobertura específica de cada plan.",
  },
  {
    q: "¿Puedo contratar Adeslas si soy autónomo?",
    a: "Sí. Adeslas es ideal para autónomos. Puedes elegir cualquiera de sus planes: Adeslas Plena Vital, Completa o Reembolso. Los autónomos pueden deducir el 100% de la prima del seguro médico en sus impuestos. Accede a nuestro calculador para obtener el presupuesto adaptado a tus necesidades.",
  },
  {
    q: "¿Adeslas tiene seguro dental?",
    a: "Sí, Adeslas Dental es un seguro especializado disponible de forma individual o familiar. Cubre limpiezas, tratamientos, endodoncias e implantes. Puede contratarse de forma independiente o complementaria a otros seguros Adeslas, mejorando tu cobertura bucodental.",
  },
  {
    q: "¿Cuáles son las ventajas de Adeslas frente a otras aseguradoras?",
    a: "Adeslas es una cooperativa médica con +30 años de experiencia, liderada por médicos. Cuenta con 1.200+ centros médicos, 42.000 especialistas en toda España y modelo sanitario centrado en el paciente. Los beneficios se reinvierten en calidad asistencial, no en accionistas.",
  },
  {
    q: "¿Adeslas tiene telemedicina?",
    a: "Sí, Adeslas ofrece servicios de telemedicina 24/7 para consultas virtuales con médicos especialistas. Disponible en todos los planes principales. Accede desde cualquier dispositivo sin desplazamientos, ideal para consultas urgentes o diagnósticos iniciales.",
  },
  {
    q: "¿Puedo contratar Adeslas siendo extranjero en España?",
    a: "Sí. Adeslas ofrece el producto 'Newcomers Protection' diseñado específicamente para extranjeros en España. Cubre asistencia médica, hospitalización y otros servicios. También puedes contratar cualquier seguro estándar si tienes NIE o documentación válida.",
  },
  {
    q: "¿Adeslas tiene periodo de carencia?",
    a: "Algunos servicios pueden estar sujetos a periodos de carencia, especialmente hospitalización y tratamientos complejos. Otros servicios básicos están disponibles desde el primer día. Adeslas ofrece promociones que pueden reducir o eliminar carencias. Consulta las condiciones específicas de cada plan.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-pad bg-gris-claro">
      <div className="container mx-auto max-w-[780px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-gris-texto mb-3">Preguntas frecuentes</h2>
          <p className="text-gris-medio">Resolvemos las dudas más habituales sobre los seguros Adeslas.</p>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-blanco border border-borde overflow-hidden"
                style={{ borderRadius: "12px" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-bold text-gris-texto text-[15px] pr-4">{faq.q}</span>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                    style={{ backgroundColor: isOpen ? "#009FE3" : "#E8F4FC" }}
                  >
                    <span
                      className="text-lg font-bold transition-transform duration-200"
                      style={{
                        color: isOpen ? "#fff" : "#009FE3",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 text-sm text-gris-medio leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
