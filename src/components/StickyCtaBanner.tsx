import { useState, useEffect } from "react";
import { X, Phone } from "lucide-react";
import { submitToHubSpot } from "@/lib/hubspot";
import { trackGenerateLead, trackClickToCallContratacion } from "@/lib/tracking";
import { AnimatePresence, motion } from "@/lib/motion";
import { TermsModal } from "@/components/TermsModal";

/* ─────────────────────────────────────────────────────────────────
   StickyCtaBanner — CRO sticky desktop
   Aparece en desktop (≥1024 px) tras scrollear > SCROLL_THRESHOLD px.
   Tracking: síncroNo ANTES del fetch (ver CLAUDE.md §3.1).
   lead_source: "sticky_banner_desktop_te_llamamos" | HubSpot source: 320
────────────────────────────────────────────────────────────────── */

const SCROLL_THRESHOLD = 400;   // px desde top para mostrar el banner
const HUBSPOT_SOURCE   = 301;   // 301 = Te Llamamos (fallback genérico — no tocar hubspot.ts sin autorización §8 CLAUDE.md)
const LEAD_SOURCE      = "sticky_banner_desktop_te_informamos";

const AZUL_ADESLAS    = "#003087";   // Azul oscuro corporativo Adeslas
const AZUL_INTERNO    = "#002268";   // Tono más oscuro para hover/borde input
const MAGENTA_CTA     = "#E4097D";   // CTA magenta corporativo Adeslas
const MAGENTA_HOVER   = "#C40068";   // Hover del CTA

function isPhoneValid(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 9 && /^[67]/.test(digits);
}

function formatPhoneDisplay(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 9);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
}

export default function StickyCtaBanner() {
  const [visible,      setVisible]      = useState(false);
  const [dismissed,    setDismissed]    = useState(false);
  const [phone,        setPhone]        = useState("");
  const [phoneError,   setPhoneError]   = useState(false);
  const [privacyOk,      setPrivacyOk]      = useState(false);
  const [privacyError,   setPrivacyError]   = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [sent,           setSent]           = useState(false);
  const [ctaHover,       setCtaHover]       = useState(false);
  const [inputFocus,     setInputFocus]     = useState(false);

  /* Mostrar tras scroll */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneDisplay(e.target.value));
    if (phoneError) setPhoneError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    if (!isPhoneValid(phone))  { setPhoneError(true);   hasError = true; }
    if (!privacyOk)            { setPrivacyError(true); hasError = true; }
    if (hasError) return;

    /* ── TRACKING SÍNCRONO PRIMERO — antes de cualquier await (CLAUDE.md §3.1) ── */
    trackGenerateLead(phone, LEAD_SOURCE, HUBSPOT_SOURCE);

    /* ── HubSpot: fire-and-forget, no bloquea UI ni tracking ── */
    submitToHubSpot({
      phone: "+34" + phone.replace(/\s/g, ""),
      source: HUBSPOT_SOURCE,
    }).catch((err) => console.error("[HubSpot sticky banner]", err));

    setSent(true);
    setPhone("");
    setPrivacyOk(false);
  };

  if (dismissed) return null;

  return (
    <>
    {/* Modal de términos — z-index superior al banner (480) */}
    <TermsModal open={termsModalOpen} onClose={() => setTermsModalOpen(false)} />
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{   y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          /* Solo desktop — en mobile ya existe la barra inferior del Header */
          className="hidden lg:flex fixed bottom-0 left-0 right-0 z-[480] flex-col"
          style={{ backgroundColor: AZUL_ADESLAS, boxShadow: "0 -4px 32px rgba(0,48,135,0.30)" }}
          role="complementary"
          aria-label="Banner de contacto"
        >
          {/* ── Pill superior "¿QUIERES CONTRATAR?" ── */}
          <div className="flex justify-center" style={{ marginTop: -18 }}>
            <div
              className="px-5 py-1.5 rounded-full text-white text-[12px] font-black uppercase tracking-[1.5px]"
              style={{ backgroundColor: AZUL_ADESLAS, border: "2px solid rgba(255,255,255,0.30)" }}
            >
              ¿Quieres más información?
            </div>
          </div>

          {/* ── Contenido principal ── */}
          <div
            className="max-w-[1280px] mx-auto w-full flex items-center gap-6 px-10 lg:px-16"
            style={{ height: 72 }}
          >
            {/* Columna izq — "TE LLAMAMOS GRATIS" */}
            <div className="flex flex-col leading-none flex-shrink-0" style={{ minWidth: 140 }}>
              <span className="text-white text-[11px] font-bold uppercase tracking-[1.2px]" style={{ opacity: 0.8 }}>
                TE INFORMAMOS
              </span>
              <span className="text-white font-black" style={{ fontSize: 19, lineHeight: 1.1 }}>
                SIN COMPROMISO
              </span>
            </div>

            {/* Divisor */}
            <div style={{ width: 1, height: 40, backgroundColor: "rgba(255,255,255,0.25)", flexShrink: 0 }} />

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="flex items-center gap-3 flex-1">
              {sent ? (
                /* Estado de confirmación */
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-white font-bold text-sm">
                    ¡Perfecto! Te llamamos en breve.{" "}
                    <span style={{ opacity: 0.8, fontWeight: 400 }}>Sin compromiso.</span>
                  </p>
                  {/* O llama directamente */}
                  <a
                    href="tel:917105000"
                    onClick={() => trackClickToCallContratacion("sticky_banner_desktop")}
                    className="ml-auto flex items-center gap-1.5 text-white text-sm font-bold underline underline-offset-2 flex-shrink-0"
                    style={{ opacity: 0.85 }}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    91 710 50 00
                  </a>
                </div>
              ) : (
                <>
                  {/* Input teléfono */}
                  <div
                    className="flex items-center gap-2 rounded-lg px-4 flex-shrink-0"
                    style={{
                      backgroundColor: "#ffffff",
                      height: 50,
                      border: `2.5px solid ${phoneError ? "#FF4D4D" : inputFocus ? "#009FE3" : "rgba(255,255,255,0.85)"}`,
                      minWidth: 250,
                      boxShadow: inputFocus ? "0 0 0 3px rgba(0,159,227,0.25)" : "0 2px 8px rgba(0,0,0,0.15)",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                    }}
                  >
                    <span className="text-lg leading-none select-none">🇪🇸</span>
                    <span className="text-sm font-bold select-none" style={{ color: "#374151" }}>+34</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      onFocus={() => setInputFocus(true)}
                      onBlur={() => setInputFocus(false)}
                      placeholder="Tu teléfono"
                      autoComplete="tel"
                      inputMode="numeric"
                      className="h-full text-[15px] font-medium border-0 bg-transparent outline-none flex-1 cursor-text"
                      style={{ color: "#1A3A5C", minWidth: 120 }}
                    />
                  </div>

                  {/* Checkbox términos — abre TermsModal al clicar el enlace */}
                  <div className="flex items-start gap-2 flex-shrink-0" style={{ maxWidth: 180 }}>
                    <div
                      onClick={() => {
                        setPrivacyOk(!privacyOk);
                        if (privacyError) setPrivacyError(false);
                      }}
                      className="flex-shrink-0 flex items-center justify-center rounded cursor-pointer transition-colors mt-0.5"
                      style={{
                        width: 18,
                        height: 18,
                        backgroundColor: privacyOk ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.12)",
                        border: `2px solid ${privacyError ? "#FF4D4D" : "rgba(255,255,255,0.50)"}`,
                      }}
                    >
                      {privacyOk && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke={AZUL_ADESLAS} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[11px] leading-snug" style={{ color: "rgba(255,255,255,0.80)" }}>
                      Acepto{" "}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setTermsModalOpen(true); }}
                        className="underline underline-offset-1 font-semibold cursor-pointer"
                        style={{ color: "rgba(255,255,255,0.97)" }}
                      >
                        términos y condiciones
                      </button>
                      <br />y la política de privacidad
                    </span>
                  </div>

                  {/* Errores inline */}
                  {(phoneError || privacyError) && (
                    <div className="flex flex-col gap-0.5 flex-shrink-0">
                      {phoneError   && <span className="text-[10px] font-bold" style={{ color: "#FFB3B3" }}>Teléfono no válido</span>}
                      {privacyError && <span className="text-[10px] font-bold" style={{ color: "#FFB3B3" }}>Acepta la privacidad</span>}
                    </div>
                  )}

                  {/* Botón CTA naranja */}
                  <button
                    type="submit"
                    onMouseEnter={() => setCtaHover(true)}
                    onMouseLeave={() => setCtaHover(false)}
                    className="flex items-center justify-center gap-2 font-black text-white rounded-lg px-7 transition-all active:scale-[0.97] flex-shrink-0 cursor-pointer"
                    style={{
                      backgroundColor: ctaHover ? MAGENTA_HOVER : MAGENTA_CTA,
                      height: 46,
                      fontSize: 15,
                      letterSpacing: "0.5px",
                      boxShadow: ctaHover
                        ? "0 4px 20px rgba(228,9,125,0.55)"
                        : "0 2px 12px rgba(228,9,125,0.40)",
                      transition: "background-color 0.15s, box-shadow 0.15s",
                    }}
                  >
                    <Phone className="w-4 h-4" />
                    QUIERO QUE ME LLAMEN
                  </button>
                </>
              )}
            </form>

            {/* Botón cerrar */}
            <button
              onClick={() => setDismissed(true)}
              aria-label="Cerrar banner"
              className="flex-shrink-0 ml-2 p-1.5 rounded-full transition-colors hover:bg-white/10 active:bg-white/20 cursor-pointer"
              style={{ color: "rgba(255,255,255,0.60)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* ── Micro-texto garantía ── */}
          <div
            className="text-center pb-1.5"
            style={{ color: "rgba(255,255,255,0.45)", fontSize: 10 }}
          >
            Sin compromiso · Datos protegidos · Atención personalizada
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
