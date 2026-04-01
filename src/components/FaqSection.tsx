import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "¿Cuánto cuesta un seguro médico Adeslas?",
    a: "Los precios de los seguros médicos Adeslas dependen de la edad, la cobertura elegida y la provincia. Como referencia orientativa para una persona adulta: Adeslas GO desde 21€/mes (ambulatorio con copago), Adeslas Plena Vital desde 38€/mes (hospitalización con copago LMA 300€/año), Adeslas Plena Plus desde 50,92€/mes (sin copagos), Adeslas Plena Total desde 83€/mes (cobertura máxima sin copagos). Usa nuestro calculador online para obtener tu precio exacto en 2 minutos.",
  },
  {
    q: "¿Qué cubre el seguro Adeslas Plena Total?",
    a: "Adeslas Plena Total es la cobertura más completa de la gama: atención médica integral sin copagos, hospitalización ilimitada en habitación individual, cirugía, todas las especialidades, urgencias 24h, dental (46 actos incluidos), psicología (20 sesiones/año), asistencia en viajes hasta 100.000€ y garantía de precio sin subida durante 3 años. Es el plan ideal para quienes buscan la máxima tranquilidad sin letra pequeña.",
  },
  {
    q: "¿Adeslas tiene copagos?",
    a: "Adeslas ofrece planes con y sin copagos para adaptarse a todos los presupuestos. Adeslas GO tiene copagos con un Límite Máximo Anual (LMA) de 260€/año. Adeslas Plena Vital tiene copagos con LMA de 300€/año. Adeslas Plena Plus y Adeslas Plena Total no tienen copagos en ninguna consulta ni especialista. El copago con LMA garantiza que nunca pagarás más de esa cantidad en un año.",
  },
  {
    q: "¿Adeslas cubre embarazo y parto?",
    a: "Sí. Adeslas cubre embarazo y parto completo en los planes Adeslas Plena Plus y Adeslas Plena Total. La cobertura incluye seguimiento prenatal sin límite de visitas, parto vaginal y cesárea en habitación individual privada, neonatología y UCI neonatal si fuera necesario, y revisión postparto. Sin periodo de carencia si se contrata antes del embarazo. Si vienes de otra aseguradora médica, puede eliminarse la carencia: consúltanos.",
  },
  {
    q: "¿Puedo contratar Adeslas si soy autónomo?",
    a: "Sí, y es una de las mejores decisiones fiscales y sanitarias que puedes tomar. Adeslas NEGOCIOS está diseñado específicamente para autónomos con NIF: sin copagos, cobertura completa con más de 48.000 médicos y 1.500 centros en toda España. Además, los autónomos pueden deducirse hasta 500€ por persona asegurada al año en el IRPF (incluidos cónyuge e hijos). Solicita tu precio personalizado sin compromiso.",
  },
  {
    q: "¿Adeslas tiene seguro dental?",
    a: "Sí. Adeslas Dental es un seguro odontológico especializado disponible de forma individual o familiar. Desde 9,45€/mes incluye limpiezas, revisiones, radiografías y extracciones simples sin coste desde el primer día. Los implantes, ortodoncia y endodoncia tienen franquicias muy reducidas. Los menores de 8 años se incluyen gratis en la póliza familiar. Más de 1.700 profesionales en toda España.",
  },
  {
    q: "¿Cuáles son las ventajas de Adeslas frente a otras aseguradoras?",
    a: "SegurCaixa Adeslas es la aseguradora de salud líder en España, con más de 51.000 médicos y más de 1.400 centros médicos en toda la geografía nacional. Las principales ventajas son: acceso directo a especialistas sin derivaciones ni listas de espera, cuadro médico más amplio del sector privado español, telemedicina 24/7, precio garantizado sin subidas durante 3 años en la mayoría de planes, y cobertura completa desde el primer día.",
  },
  {
    q: "¿Adeslas tiene telemedicina?",
    a: "Sí. Todos los planes principales de Adeslas incluyen telemedicina 24 horas los 7 días de la semana. Puedes consultar con médicos y especialistas por videollamada desde cualquier dispositivo, recibir recetas médicas online y obtener diagnósticos iniciales sin necesidad de desplazarte. Es especialmente útil para urgencias menores, seguimiento de tratamientos y consultas de madrugada.",
  },
  {
    q: "¿Puedo contratar Adeslas siendo extranjero en España?",
    a: "Sí. Adeslas dispone de un seguro médico específico para extranjeros en España (Newcomers Protection) que cumple los requisitos de visado de estudiante y residencia. Cubre asistencia médica completa, hospitalización, urgencias y repatriación. También puedes contratar cualquier plan estándar de Adeslas si dispones de NIE o documentación de residencia válida. Nuestros asesores te ayudan a tramitar toda la documentación necesaria.",
  },
  {
    q: "¿Adeslas tiene periodo de carencia?",
    a: "Adeslas no aplica períodos de carencia generales: la gran mayoría de coberturas están activas desde el primer día de contratación. Solo la hospitalización programada tiene una carencia de 8 meses. Si vienes de otra aseguradora médica con al menos 6 meses de antigüedad, pueden eliminarse las carencias por traslado. Consulta con nosotros las condiciones exactas de tu caso.",
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
          <h2 className="text-gris-texto mb-3">Preguntas frecuentes sobre seguros médicos Adeslas</h2>
          <p className="text-gris-medio">Resolvemos las dudas más habituales sobre los seguros Adeslas — precios, coberturas y contratación.</p>
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
