import { createContext, useContext, useState, useRef, type ReactNode } from "react";
import { submitToHubSpot, type HubSpotSource } from "@/lib/hubspot";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { TermsCheckbox } from "@/components/TermsModal";

/* ─── Context ─── */
interface PhonePopupCtx { openPhonePopup: (source?: HubSpotSource) => void }
const Ctx = createContext<PhonePopupCtx>({ openPhonePopup: () => {} });
export const usePhonePopup = () => useContext(Ctx);

/* ─── Provider + Popup ─── */
export const PhonePopupProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const sourceRef = useRef<HubSpotSource>(201);

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 11) setPhone(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    const digits = phone.replace(/\D/g, "");
    if (digits.length >= 9 && digits.length <= 11) {
      submitToHubSpot({ phone, source: sourceRef.current });
      setSent(true);
      setTimeout(() => { setSent(false); setPhone(""); setTermsAccepted(false); setOpen(false); }, 3000);
    }
  };

  return (
    <Ctx.Provider value={{ openPhonePopup: (source = 201) => { sourceRef.current = source; setOpen(true); } }}>
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] flex items-center justify-center bg-black/50 p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 8 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="bg-white rounded-2xl w-full max-w-sm flex flex-col"
              style={{
                boxShadow: "0 24px 64px rgba(0,48,135,0.22)",
                maxHeight: "90dvh",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky header with close button */}
              <div
                className="flex-shrink-0 flex items-center justify-end px-4 py-2"
                style={{ borderBottom: "1px solid #F1F5F9" }}
              >
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1 p-6 pt-5">
                <div className="text-center mb-5">
                  <div
                    className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
                    style={{ backgroundColor: "#E8F4FC" }}
                  >
                    <Phone className="w-6 h-6" style={{ color: "#009FE3" }} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: "#1a2b4a" }}>Te llamamos gratis</h3>
                  <p className="text-sm text-gray-500">Un asesor Adeslas te contactará en minutos</p>
                </div>

                {sent ? (
                  <div className="text-center py-4">
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: "#E8F4FC" }}
                    >
                      <span className="text-xl" style={{ color: "#009FE3" }}>✓</span>
                    </div>
                    <p className="font-bold" style={{ color: "#009FE3" }}>¡Te llamamos enseguida!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <PhoneInput
                      defaultCountry="es"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="Tu número de teléfono"
                      inputClassName="!w-full !h-12 !text-base !rounded-xl !border-0 !bg-transparent !outline-none"
                      countrySelectorStyleProps={{
                        buttonClassName: "!h-12 !border-0 !bg-transparent !px-2",
                        flagClassName: "!w-6 !h-5",
                      }}
                      className="!w-full !h-12 !rounded-xl !border !border-gray-200 focus-within:!border-blue-500 focus-within:!ring-2 focus-within:!ring-blue-100 !transition-all"
                    />
                    <TermsCheckbox
                      checked={termsAccepted}
                      onChange={(val) => { setTermsAccepted(val); if (val) setTermsError(false); }}
                      error={termsError}
                    />
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl text-white font-bold text-base btn-cta-magenta"
                      style={{ backgroundColor: "#E4097D" }}
                    >
                      Te llamamos ahora
                    </button>
                  </form>
                )}
                <p className="text-center text-[10px] text-gray-400 mt-3">
                  Sin compromiso · Datos protegidos
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
};
