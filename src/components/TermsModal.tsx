import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Legal text ─── */
const LEGAL_TEXT = `AVISO LEGAL.

MARCHAL ASEGURADORES S.L.U., inscrita en la Dirección General de Seguros y Fondos de Pensiones con la clave 28101259, estando autorizada para realizar la actividad de mediación de seguros con contrato de agencia exclusiva con SEGURCAIXA ADESLAS S.A. de Seguros y Reaseguros. El código de identificación fiscal es B-86792017. Tiene concertado un seguro de Responsabilidad Civil y cubiertas las garantías financieras conforme a la normativa vigente.

TRATAMIENTO DE DATOS PERSONALES.

Los Datos Personales recogidos serán incorporados a los correspondientes ficheros titularidad de MARCHAL ASEGURADORES, S.L.U., al objeto de poder enviarle comunicaciones comerciales y tramitar las solicitudes, contrataciones, peticiones y consultas realizadas por los Usuarios, así como para ampliar y mejorar los servicios y contenidos a través de los diferentes medios con los que cuenta la compañía: email, WhatsApp, tlf...

Asimismo se le informa que los datos relativos a la salud que nos facilite a través de la correspondiente valoración médica, sólo serán recogidos por MARCHAL ASEGURADORES S.L.U. bajo su expreso consentimiento, y únicamente a los efectos de cumplir con las finalidades de mediación contractualmente establecidas con Usted, siempre con el más profundo respeto a su confidencialidad y observando en todo momento las prescripciones y medidas de seguridad exigibles por la legislación aplicable y en particular mantener la información en secreto y adoptar las cautelas destinadas a evitar su alteración, pérdida, tratamiento o acceso no autorizado.

Le informamos que podrá ejercer en su caso los derechos de acceso, rectificación, cancelación, olvido, portabilidad y oposición, enviándonos un correo electrónico a adeslas@marchalaseguradores.com`;

/* ─── Modal ─── */
interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

export const TermsModal = ({ open, onClose }: TermsModalProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[700] bg-black/60 overflow-y-auto"
        onClick={onClose}
      >
        {/* Inner wrapper: centrado vertical con padding superior que esquiva el header */}
        <div className="flex min-h-full items-end sm:items-center justify-center px-4 pt-20 pb-4 sm:py-8">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg flex flex-col relative"
            style={{
              boxShadow: "0 24px 64px rgba(0,48,135,0.25)",
              maxHeight: "calc(100dvh - 6rem)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 rounded-t-2xl flex-shrink-0"
              style={{ backgroundColor: "#003087" }}
            >
              <h3 className="text-white font-bold text-base leading-tight">
                Aviso Legal y Política de Privacidad
              </h3>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white p-1 ml-3 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Body — scroll interno */}
            <div className="overflow-y-auto px-6 py-5 flex-1 overscroll-contain">
              {LEGAL_TEXT.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl text-white font-bold text-sm"
                style={{ backgroundColor: "#E4097D" }}
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ─── Checkbox + link ─── */
interface TermsCheckboxProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  error?: boolean;
}

export const TermsCheckbox = ({ checked, onChange, error }: TermsCheckboxProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-start gap-2 mt-1">
        <input
          type="checkbox"
          id="terms-check"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 flex-shrink-0 cursor-pointer"
          style={{
            width: 16,
            height: 16,
            accentColor: "#009FE3",
            outline: error ? "2px solid #EF4444" : undefined,
            borderRadius: 3,
          }}
        />
        <label htmlFor="terms-check" className="text-[11px] text-gray-500 leading-snug cursor-pointer select-none">
          Acepto los{" "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
            className="font-semibold underline"
            style={{ color: "#009FE3" }}
          >
            términos y condiciones
          </button>
          {" "}y la política de privacidad
        </label>
      </div>
      {error && (
        <p className="text-[11px] mt-0.5" style={{ color: "#EF4444" }}>
          Debes aceptar los términos y condiciones para continuar
        </p>
      )}
      <TermsModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
