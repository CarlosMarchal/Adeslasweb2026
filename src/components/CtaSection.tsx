import { motion } from "framer-motion";
import CalcButton from "@/components/CalcButton";
import { usePhonePopup } from "@/components/PhonePopupContext";
import { trackClickToCallContratacion, trackClickToCallAsistencia } from "@/lib/tracking";

interface CtaSectionProps {
  /** When set, overrides the default CalcButton to open a specific tarificador (e.g. TarificadorPymes modal) */
  onCalcClick?: () => void;
}

const CtaSection = ({ onCalcClick }: CtaSectionProps = {}) => {
  const { openPhonePopup } = usePhonePopup();

  return (
    <section id="contacto" className="py-20 px-4 text-center" style={{ background: "linear-gradient(135deg, #003087, #009FE3)" }}>
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-primary-foreground mb-5 text-2xl md:text-4xl">
            Contrata tu Seguro Médico Adeslas hoy — Sin Esperas, Sin Sorpresas
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {onCalcClick ? (
              <button
                onClick={onCalcClick}
                className="px-6 py-3 rounded-lg font-bold text-sm cursor-pointer btn-cta-white"
                style={{ backgroundColor: "#fff", color: "#003087", borderRadius: "7px" }}
              >
                Calcular mi precio →
              </button>
            ) : (
              <CalcButton
                className="px-6 py-3 rounded-lg font-bold text-sm cursor-pointer btn-cta-white"
                style={{ backgroundColor: "#fff", color: "#003087", borderRadius: "7px" }}
              >
                Calcular mi precio →
              </CalcButton>
            )}
            <button
              onClick={() => openPhonePopup()}
              className="px-6 py-3 rounded-lg font-bold text-sm border cursor-pointer btn-cta-ghost"
              style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff", borderRadius: "7px" }}
            >
              📞 Te llamamos gratis
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            <div>
              <a href="tel:917105000" onClick={() => trackClickToCallContratacion("cta_section")} className="text-primary-foreground font-bold">91 710 50 00</a>
              <div>Nuevas contrataciones</div>
            </div>
            <div>
              <a href="tel:919191898" onClick={() => trackClickToCallAsistencia("cta_section")} className="text-primary-foreground font-bold">91 919 18 98</a>
              <div>Atención al cliente</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
