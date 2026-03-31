import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TermsCheckbox } from "@/components/TermsModal";
import {
  provinces,
  getZoneFromProvince,
  extResidentsPricing,
  extStudentsPricing,
} from "@/data/pricing";

/* ───────── Helpers ───────── */

const formatPrice = (price: number) => {
  const [int, dec] = price.toFixed(2).split(".");
  return { int, dec };
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

const isValidPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
};

const countryCodes = [
  { flag: "🇪🇸", code: "+34", name: "España" },
  { flag: "🇫🇷", code: "+33", name: "Francia" },
  { flag: "🇵🇹", code: "+351", name: "Portugal" },
  { flag: "🇬🇧", code: "+44", name: "Reino Unido" },
  { flag: "🇩🇪", code: "+49", name: "Alemania" },
  { flag: "🇮🇹", code: "+39", name: "Italia" },
  { flag: "🇦🇷", code: "+54", name: "Argentina" },
  { flag: "🇲🇽", code: "+52", name: "México" },
  { flag: "🇨🇴", code: "+57", name: "Colombia" },
  { flag: "🇨🇱", code: "+56", name: "Chile" },
  { flag: "🇺🇸", code: "+1", name: "EE.UU." },
];

/**
 * Extranjeros pricing uses 4 payment columns:
 *  [0] = Anual, [1] = Trimestral, [2] = Mensual, [3] = Mensual (domiciliado)
 * We show column [2] (Mensual) as the default monthly price.
 */
function getExtResidentsPrice(age: number): number | null {
  // Range-based: find the closest lower bracket (0,5,10,15,20,...,70)
  const brackets = Object.keys(extResidentsPricing)
    .map(Number)
    .sort((a, b) => a - b);
  let bracket = brackets[0];
  for (const b of brackets) {
    if (age >= b) bracket = b;
    else break;
  }
  const row = extResidentsPricing[String(bracket)];
  return row ? row[2] : null; // column 2 = mensual
}

function getExtStudentsPrice(age: number): number | null {
  // "0-35" is a special flat range
  if (age <= 35) {
    const row = extStudentsPricing["0-35"];
    return row ? row[2] : null;
  }
  // Individual ages 36-70
  const brackets = Object.keys(extStudentsPricing)
    .filter((k) => !k.includes("-"))
    .map(Number)
    .sort((a, b) => a - b);
  let bracket = brackets[0];
  for (const b of brackets) {
    if (age >= b) bracket = b;
    else break;
  }
  const row = extStudentsPricing[String(bracket)];
  return row ? row[2] : null;
}

/* ───────── Component ───────── */

interface Props {
  compact?: boolean;
}

const TarificadorExtranjeros = ({ compact = false }: Props) => {
  const [step, setStep] = useState(0);
  const [modalidad, setModalidad] = useState<"residentes" | "estudiantes" | "">("");
  const [edad, setEdad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+34");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [pendingModalidad, setPendingModalidad] = useState<"residentes" | "estudiantes" | "">("");

  const stepLabels = ["Modalidad", "Tu edad", "Tus datos", "Tu precio"];

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (showWhatsAppModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showWhatsAppModal]);

  const goToStep = (s: number) => setStep(s);

  const result = useMemo(() => {
    const ageNum = parseInt(edad, 10);
    if (isNaN(ageNum) || !modalidad) return null;
    const price =
      modalidad === "residentes"
        ? getExtResidentsPrice(ageNum)
        : getExtStudentsPrice(ageNum);
    return price;
  }, [edad, modalidad]);

  const handleSelectModalidad = (m: "residentes" | "estudiantes") => {
    setPendingModalidad(m);
    setModalidad(m);
    setShowWhatsAppModal(true);
  };

  const handleAgeNext = () => {
    const ageNum = parseInt(edad, 10);
    if (isNaN(ageNum) || ageNum < 0) {
      setError("Introduce una edad válida");
      return;
    }
    if (ageNum > 70) {
      setError("La edad máxima de contratación es 70 años");
      return;
    }
    if (modalidad === "estudiantes" && ageNum < 0) {
      setError("Introduce una edad válida");
      return;
    }
    setError("");
    goToStep(2);
  };

  const handleShowResults = () => {
    if (!nombre.trim()) {
      setError("Introduce tu nombre");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Introduce un email válido");
      return;
    }
    setEmailError("");
    if (!isValidPhone(telefono)) {
      setPhoneError("Introduce un número de teléfono válido");
      return;
    }
    setPhoneError("");
    if (!provincia) {
      setError("Selecciona una provincia");
      return;
    }
    setError("");
    if (!termsAccepted) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    goToStep(3);
  };

  const reset = () => {
    setStep(0);
    setModalidad("");
    setEdad("");
    setProvincia("");
    setNombre("");
    setEmail("");
    setTelefono("");
    setError("");
    setEmailError("");
    setPhoneError("");
    setTermsAccepted(false);
    setTermsError(false);
  };

  const btnClass = compact
    ? "px-5 py-2 rounded-lg text-primary-foreground font-bold text-sm"
    : "px-6 py-2.5 rounded-lg text-primary-foreground font-bold text-sm";
  const btnStyle = { backgroundColor: "#E4097D", borderRadius: "7px" };

  const renderContent = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.2 }}
      >
        {/* Step 0: Modalidad */}
        {step === 0 && (
          <div className="space-y-3">
            <p className="text-gris-texto font-bold text-sm mb-1">
              ¿Cuál es tu situación en España?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "residentes" as const, emoji: "🏠", label: "Residente", sub: "Vivo o viviré en España" },
                { key: "estudiantes" as const, emoji: "🎓", label: "Estudiante", sub: "Estudio o estudiaré en España" },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleSelectModalidad(opt.key)}
                  className="flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all hover:-translate-y-0.5"
                  style={{
                    borderColor: modalidad === opt.key ? "#009FE3" : "#D5E3F0",
                    backgroundColor: modalidad === opt.key ? "#F0F7FF" : "#fff",
                    borderRadius: "12px",
                  }}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="font-bold text-sm text-gris-texto">{opt.label}</span>
                  <span className="text-[11px] text-gris-medio">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Age */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-gris-texto font-bold text-sm mb-1">
              ¿Cuántos años tienes?
            </p>
            <input
              type="number"
              min={0}
              max={70}
              value={edad}
              onChange={(e) => {
                setEdad(e.target.value);
                setError("");
              }}
              placeholder="Edad"
              className="w-full border border-borde px-3 py-2.5 text-sm text-gris-texto focus:outline-none focus:border-azul-medio"
              style={{
                borderRadius: "8px",
                borderColor: error ? "#EF4444" : undefined,
              }}
            />
            {error && (
              <p className="text-[11px]" style={{ color: "#EF4444" }}>
                {error}
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => goToStep(0)}
                className="px-4 py-2 text-sm font-bold border border-borde hover:bg-gray-50"
                style={{ borderRadius: "7px", color: "#009FE3" }}
              >
                ← Atrás
              </button>
              <button onClick={handleAgeNext} className={btnClass} style={btnStyle}>
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Contact */}
        {step === 2 && (
          <div className="space-y-3">
            <p className="text-gris-texto font-bold text-sm mb-1">
              Déjanos tus datos para ver el precio
            </p>
            <input
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                setError("");
              }}
              placeholder="Tu nombre"
              className="w-full border border-borde px-3 py-2.5 text-sm text-gris-texto focus:outline-none focus:border-azul-medio"
              style={{ borderRadius: "8px" }}
            />
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="tu@email.com"
                className="w-full border border-borde px-3 py-2.5 text-sm text-gris-texto focus:outline-none focus:border-azul-medio"
                style={{
                  borderRadius: "8px",
                  borderColor: emailError ? "#EF4444" : undefined,
                }}
              />
              {emailError && (
                <p className="text-[11px] mt-0.5" style={{ color: "#EF4444" }}>
                  {emailError}
                </p>
              )}
            </div>
            <div>
              <div className="flex gap-1.5">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="border border-borde px-2 py-2.5 text-sm text-gris-texto bg-blanco focus:outline-none focus:border-azul-medio flex-shrink-0"
                  style={{ borderRadius: "8px", width: "90px" }}
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => {
                    setTelefono(e.target.value);
                    setPhoneError("");
                  }}
                  placeholder="600 000 000"
                  className="w-full border border-borde px-3 py-2.5 text-sm text-gris-texto focus:outline-none focus:border-azul-medio"
                  style={{
                    borderRadius: "8px",
                    borderColor: phoneError ? "#EF4444" : undefined,
                  }}
                />
              </div>
              {phoneError && (
                <p className="text-[11px] mt-0.5" style={{ color: "#EF4444" }}>
                  {phoneError}
                </p>
              )}
            </div>
            <select
              value={provincia}
              onChange={(e) => {
                setProvincia(e.target.value);
                setError("");
              }}
              className="w-full border border-borde px-3 py-2.5 text-sm text-gris-texto bg-blanco focus:outline-none focus:border-azul-medio"
              style={{ borderRadius: "8px" }}
            >
              <option value="">Selecciona provincia</option>
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {error && (
              <p className="text-[11px]" style={{ color: "#EF4444" }}>
                {error}
              </p>
            )}
            <TermsCheckbox
              checked={termsAccepted}
              onChange={(val) => { setTermsAccepted(val); if (val) setTermsError(false); }}
              error={termsError}
            />
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => goToStep(1)}
                className="px-4 py-2 text-sm font-bold border border-borde hover:bg-gray-50"
                style={{ borderRadius: "7px", color: "#009FE3" }}
              >
                ← Atrás
              </button>
              <button onClick={handleShowResults} className={btnClass} style={btnStyle}>
                Ver mi precio →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 3 && (
          <div className="text-center">
            {result !== null ? (
              <>
                <div
                  className="rounded-xl p-6 mb-4"
                  style={{ backgroundColor: "#003087", borderRadius: "14px" }}
                >
                  <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Adeslas Extranjeros ·{" "}
                    {modalidad === "residentes" ? "Residentes" : "Estudiantes"}
                  </p>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-5xl font-black text-white">
                      {formatPrice(result).int}
                    </span>
                    <span className="text-xl font-bold text-white">
                      ,{formatPrice(result).dec}€
                    </span>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                      /mes
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {edad} años · {provincia}
                  </p>
                </div>
                <p className="text-xs text-gris-medio mb-3">
                  Un asesor se pondrá en contacto contigo para formalizar tu
                  seguro y enviarte el certificado para Extranjería.
                </p>
                <a
                  href="tel:917105000"
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm"
                  style={{
                    backgroundColor: "#E4097D",
                    color: "#fff",
                    borderRadius: "8px",
                  }}
                >
                  Llámanos: 91 710 50 00
                </a>
              </>
            ) : (
              <>
                <div className="text-3xl mb-3">⚠️</div>
                <h3 className="text-gris-texto font-bold mb-2">
                  No disponible
                </h3>
                <p className="text-sm text-gris-medio mb-4">
                  No hemos encontrado tarifas para los datos seleccionados.
                </p>
              </>
            )}
            <button
              onClick={reset}
              className="block mx-auto mt-3 text-xs text-azul-medio hover:underline"
            >
              ↺ Calcular otra vez
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  const renderProgress = () => (
    <div className="flex justify-center gap-1.5 mt-4">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-full transition-colors"
          style={{
            width: 24,
            height: 4,
            borderRadius: 2,
            backgroundColor:
              i === step ? "#009FE3" : i < step ? "#009FE3" : "#D5E3F0",
          }}
        />
      ))}
    </div>
  );

  /* ── WhatsApp Modal ── */
  const whatsAppModal = showWhatsAppModal && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,30,80,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) setShowWhatsAppModal(false); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.22 }}
        className="bg-blanco rounded-2xl p-7 w-full max-w-sm relative"
        style={{ boxShadow: "0 24px 64px rgba(0,30,80,0.25)" }}
      >
        {/* Close */}
        <button
          onClick={() => setShowWhatsAppModal(false)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gris-medio hover:bg-gris-claro transition-colors text-lg font-bold"
          aria-label="Cerrar"
        >
          ×
        </button>

        {/* Icon + header */}
        <div className="text-center mb-5">
          <span className="text-5xl block mb-3">
            {pendingModalidad === "residentes" ? "🏠" : "🎓"}
          </span>
          <h3 className="text-gris-texto font-bold text-lg mb-1">
            {pendingModalidad === "residentes" ? "Residente en España" : "Estudiante en España"}
          </h3>
          <p className="text-sm text-gris-medio leading-relaxed">
            Contáctanos por WhatsApp y te indicaremos en menos de 1 minuto el precio para tu situación.
          </p>
        </div>

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/34611394319?text=${encodeURIComponent(
            pendingModalidad === "residentes"
              ? "Hola, soy residente extranjero en España y me interesa el seguro médico Adeslas para residentes. ¿Me podéis indicar el precio para mi situación?"
              : "Hola, soy estudiante extranjero en España y me interesa el seguro Adeslas Health Students para mi visado de estudios. ¿Me podéis indicar el precio para mi situación?"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#25D366", borderRadius: "12px" }}
          onClick={() => setShowWhatsAppModal(false)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Contáctanos por WhatsApp
        </a>

        <button
          onClick={() => setShowWhatsAppModal(false)}
          className="block w-full mt-3 text-xs text-gris-medio hover:text-gris-texto transition-colors text-center"
        >
          Cerrar
        </button>
      </motion.div>
    </div>
  );

  if (compact) {
    return (
      <>
        {whatsAppModal}
        <div
          className="bg-blanco rounded-2xl p-6 md:p-7 card-shadow"
          style={{ borderRadius: "16px" }}
        >
          <h3 className="text-gris-texto text-lg font-bold mb-4">
            Calcula tu seguro para extranjeros
          </h3>
          {renderContent()}
          {renderProgress()}
        </div>
      </>
    );
  }

  return (
    <>
      {whatsAppModal}
    <section id="calculadora" className="section-pad bg-gris-claro">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-blanco rounded-[20px] overflow-hidden card-shadow">
          <div className="px-6 md:px-10 py-5" style={{ backgroundColor: "#003087" }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-primary-foreground text-lg md:text-xl">
                  Seguro para Extranjeros
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {stepLabels[step]}
                </p>
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-full transition-colors"
                    style={{
                      width: 32,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor:
                        i === step
                          ? "#009FE3"
                          : i < step
                          ? "rgba(0,159,227,0.45)"
                          : "rgba(255,255,255,0.22)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="px-6 md:px-10 py-8">{renderContent()}</div>
        </div>
      </div>
    </section>
    </>
  );
};

export default TarificadorExtranjeros;
