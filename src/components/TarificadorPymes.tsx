import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { provinces, getZoneFromProvince } from "@/data/pricing";
import { submitToHubSpot } from "@/lib/hubspot";
import { TermsCheckbox } from "@/components/TermsModal";

/* ─────────────────────────────────────────────────────
   Adeslas Salud Pymes / Salud Pymes Plus
   Pricing: [Z1, Z2, Z3, Z4, Z5] — primas netas mensuales 2026
   ───────────────────────────────────────────────────── */

type ZonePrices5 = [number, number, number, number, number];

const PYMES_PRICES: Record<string, ZonePrices5> = {
  "0-44":  [95.20,  33.32,  29.75,  27.67,  34.81],
  "45-54": [116.80, 40.88,  36.50,  33.95,  42.71],
  "55-59": [141.44, 49.50,  44.20,  41.11,  51.71],
  "60-64": [168.00, 58.80,  52.50,  48.83,  61.43],
  "65-70": [283.20, 99.12,  88.50,  82.31, 103.55],
};

const PLUS_PRICES: Record<string, ZonePrices5> = {
  "0-44":  [161.60,  56.56,  50.50,  46.97,  59.09],
  "45-54": [193.60,  67.76,  60.50,  56.27,  70.79],
  "55-59": [241.60,  84.56,  75.50,  70.22,  88.34],
  "60-64": [294.40, 103.04,  92.00,  85.56, 107.64],
  "65-70": [448.00, 156.80, 140.00, 130.20, 163.80],
};

/* Map age → price bracket */
function getBracket(age: number): string | null {
  if (age >= 0  && age <= 44) return "0-44";
  if (age >= 45 && age <= 54) return "45-54";
  if (age >= 55 && age <= 59) return "55-59";
  if (age >= 60 && age <= 64) return "60-64";
  if (age >= 65 && age <= 70) return "65-70";
  return null;
}

/* Price for one person given age and zone (1-5) */
function getPriceForAge(table: Record<string, ZonePrices5>, age: number, zone: number): number | null {
  const bracket = getBracket(age);
  if (!bracket) return null;
  const price = table[bracket]?.[zone - 1];
  return price != null ? price : null;
}

/* ── Helpers ── */
const formatNum = (n: number) => {
  const [int, dec] = n.toFixed(2).split(".");
  return { int, dec };
};

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());
const getMaxPhoneDigits = (code: string) => ["+34", "+33", "+351", "+56"].includes(code) ? 9 : 10;
const isValidPhone = (p: string, code = "+34") => {
  const d = p.replace(/\D/g, "");
  return d.length >= 7 && d.length <= getMaxPhoneDigits(code);
};

const COUNTRY_CODES = [
  { flag: "🇪🇸", code: "+34", name: "España"       },
  { flag: "🇫🇷", code: "+33", name: "Francia"      },
  { flag: "🇵🇹", code: "+351",name: "Portugal"     },
  { flag: "🇬🇧", code: "+44", name: "Reino Unido"  },
  { flag: "🇩🇪", code: "+49", name: "Alemania"     },
  { flag: "🇮🇹", code: "+39", name: "Italia"       },
  { flag: "🇦🇷", code: "+54", name: "Argentina"    },
  { flag: "🇲🇽", code: "+52", name: "México"       },
  { flag: "🇨🇴", code: "+57", name: "Colombia"     },
  { flag: "🇺🇸", code: "+1",  name: "EE.UU."       },
];

const PYMES_KEY_FEATURES = [
  "Medicina general y +40 especialidades",
  "Hospitalización en hab. individual con acompañante",
  "Urgencias 24h · Cirugía · Trasplantes · Prótesis",
  "Embarazo y parto cubiertos",
  "Adeslas LIVE: telemedicina, psicólogo, fisioterapeuta",
  "Dental preventiva incluida",
  "Indemnización fallecimiento por accidente: 6.000€",
  "Sin carencias (excepto maternidad y psiquiátrica)",
  "Con copago por consulta",
];

const PLUS_KEY_FEATURES = [
  "Medicina general y +40 especialidades",
  "Hospitalización en hab. individual con acompañante",
  "Urgencias 24h · Cirugía · Trasplantes · Prótesis",
  "Embarazo y parto cubiertos",
  "Adeslas LIVE: telemedicina, psicólogo, fisioterapeuta",
  "Dental preventiva incluida",
  "Indemnización fallecimiento por accidente: 6.000€",
  "Sin copago en todas las consultas",
];

/* ─── Component ─── */

interface TarificadorPymesProps {
  context?: "autonomos" | "pymes" | "empresas";
}

const TarificadorPymes = ({ context = "pymes" }: TarificadorPymesProps) => {
  /*
    Step 0 = Edades de los asegurados (con añadir/quitar)
    Step 1 = Formulario de contacto + provincia
    Step 2 = Resultados
  */

  const [step, setStep] = useState(0);

  /* Ages — starts with 1 empty slot */
  const [edades, setEdades] = useState<string[]>([""]);
  const [ageError, setAgeError] = useState("");

  /* Derived */
  const numAsegurados = edades.length;

  const addPerson = () => {
    if (edades.length < 10) setEdades(prev => [...prev, ""]);
  };

  const removePerson = (i: number) => {
    if (edades.length <= 1) return;
    setEdades(prev => prev.filter((_, idx) => idx !== i));
    setAgeError("");
  };

  /* Step 1 state */
  const [nombre,        setNombre]        = useState("");
  const [email,         setEmail]         = useState("");
  const [countryCode,   setCountryCode]   = useState("+34");
  const [telefono,      setTelefono]      = useState("");
  const [provincia,     setProvincia]     = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError,    setTermsError]    = useState(false);
  const [emailError,    setEmailError]    = useState("");
  const [phoneError,    setPhoneError]    = useState("");
  const [formError,     setFormError]     = useState("");

  const zone = useMemo(() => {
    if (!provincia) return 4; // default to zone 4 (most common)
    const z = getZoneFromProvince(provincia);
    return (z && z >= 1 && z <= 5) ? z : 4;
  }, [provincia]);

  /* Validate all ages filled and ≤ 70 */
  const validateAges = (): boolean => {
    const parsed = edades.map(e => parseInt(e, 10));
    if (parsed.some(a => isNaN(a) || a < 0)) {
      setAgeError("Introduce todas las edades correctamente"); return false;
    }
    if (parsed.some(a => a > 70)) {
      setAgeError("La edad máxima de contratación es 70 años"); return false;
    }
    setAgeError(""); return true;
  };

  /* Step labels */
  const stepLabels = ["Asegurados", "Tus datos", "Tu precio"];

  const contextTitle =
    context === "autonomos" ? "Calcula tu precio como autónomo" :
    context === "empresas"  ? "Precio para tu empresa"          :
                              "Precio para tu pyme";

  /* ── Price calculation ── */
  const parsedAges = useMemo(() => edades.map(e => parseInt(e, 10)), [edades]);

  const totalPymes = useMemo(() => {
    const valid = parsedAges.filter(a => !isNaN(a) && a >= 0);
    if (valid.length === 0) return null;
    let sum = 0;
    for (const age of valid) {
      const p = getPriceForAge(PYMES_PRICES, age, zone);
      if (p === null) return null;
      sum += p;
    }
    return sum;
  }, [parsedAges, zone]);

  const totalPlus = useMemo(() => {
    const valid = parsedAges.filter(a => !isNaN(a) && a >= 0);
    if (valid.length === 0) return null;
    let sum = 0;
    for (const age of valid) {
      const p = getPriceForAge(PLUS_PRICES, age, zone);
      if (p === null) return null;
      sum += p;
    }
    return sum;
  }, [parsedAges, zone]);

  /* Per-person breakdown */
  const perPersonPymes = useMemo(() =>
    parsedAges
      .filter(a => !isNaN(a) && a >= 0)
      .map(age => ({ age, price: getPriceForAge(PYMES_PRICES, age, zone) })),
    [parsedAges, zone]
  );
  const perPersonPlus = useMemo(() =>
    parsedAges
      .filter(a => !isNaN(a) && a >= 0)
      .map(age => ({ age, price: getPriceForAge(PLUS_PRICES, age, zone) })),
    [parsedAges, zone]
  );

  /* ── Submit contact form → results ── */
  const handleShowResults = () => {
    if (!nombre.trim()) { setFormError("Introduce tu nombre"); return; }
    setFormError("");
    if (!isValidEmail(email)) { setEmailError("Introduce un email válido"); return; }
    setEmailError("");
    if (!isValidPhone(telefono, countryCode)) { setPhoneError("Introduce un número de teléfono válido"); return; }
    setPhoneError("");
    if (!provincia) { setFormError("Selecciona una provincia"); return; }
    setFormError("");
    if (!termsAccepted) { setTermsError(true); return; }
    setTermsError(false);

    submitToHubSpot({
      firstname: nombre.trim(),
      email,
      phone: `${countryCode}${telefono}`,
      city: provincia,
      edad1: parsedAges.filter(a => !isNaN(a)).join(","),
      source: 212,
    });

    setStep(2);
  };

  const reset = () => {
    setStep(0);
    setEdades([""]);
    setAgeError("");
    setNombre(""); setEmail(""); setTelefono(""); setProvincia("");
    setFormError(""); setEmailError(""); setPhoneError("");
    setTermsAccepted(false); setTermsError(false);
  };

  /* ── Style helpers ── */
  const btnStyle = { backgroundColor: "#E4097D", borderRadius: "7px" };
  const btnClass = "px-5 py-2.5 rounded-lg text-white font-bold text-sm transition-colors hover:opacity-90";

  /* ══════════════════ RENDER ══════════════════ */
  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ borderRadius: "16px" }}>

      {/* ── Header ── */}
      <div className="px-6 py-4 flex items-center justify-between" style={{ backgroundColor: "#003087" }}>
        <div>
          <h3 className="text-white font-bold text-base">{contextTitle}</h3>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.70)" }}>
            {stepLabels[step]}
          </p>
        </div>
        {/* Progress dots — 3 steps */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: 32, height: 5, borderRadius: 3,
                backgroundColor: i === step ? "#009FE3" : i < step ? "rgba(0,159,227,0.45)" : "rgba(255,255,255,0.22)",
                transition: "background-color 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Steps ── */}
      <div className="px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >

            {/* ════════ STEP 0: Edades ════════ */}
            {step === 0 && (
              <div>
                <p className="font-bold text-sm mb-4" style={{ color: "#003087" }}>
                  ¿Cuántos asegurados y sus edades?
                </p>

                {/* ── Contador +/− ── */}
                <div className="flex items-center gap-3 mb-5">
                  <button
                    onClick={() => removePerson(edades.length - 1)}
                    disabled={numAsegurados <= 1}
                    className="w-9 h-9 rounded-xl border-2 flex items-center justify-center text-lg font-bold transition-colors"
                    style={{
                      borderColor: numAsegurados <= 1 ? "#E2E8F0" : "#009FE3",
                      color: numAsegurados <= 1 ? "#CBD5E1" : "#009FE3",
                    }}
                  >
                    −
                  </button>
                  <div className="text-center min-w-[2rem]">
                    <span className="text-3xl font-black" style={{ color: "#003087" }}>{numAsegurados}</span>
                  </div>
                  <button
                    onClick={addPerson}
                    disabled={numAsegurados >= 10}
                    className="w-9 h-9 rounded-xl border-2 flex items-center justify-center text-lg font-bold transition-colors"
                    style={{
                      borderColor: numAsegurados >= 10 ? "#E2E8F0" : "#009FE3",
                      color: numAsegurados >= 10 ? "#CBD5E1" : "#009FE3",
                    }}
                  >
                    +
                  </button>
                  <span className="text-xs" style={{ color: "#94A3B8" }}>
                    {numAsegurados === 1 ? "asegurado" : "asegurados"} · máx. 10
                  </span>
                </div>

                {/* ── Campos de edad: horizontal en desktop, wrap en mobile ── */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {edades.map((e, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-1.5 relative"
                    >
                      <label className="text-[11px] font-semibold" style={{ color: "#64748B" }}>
                        {numAsegurados === 1 ? "Tu edad" : `Asegurado ${i + 1}`}
                      </label>
                      <input
                        type="number"
                        value={e}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={ev => {
                          const raw = ev.target.value.replace(/\D/g, "");
                          const arr = [...edades];
                          arr[i] = raw === "" ? "" : String(Math.min(parseInt(raw, 10), 70));
                          setEdades(arr);
                          setAgeError("");
                        }}
                        placeholder="35"
                        min={0} max={70}
                        className="border text-center text-sm font-bold focus:outline-none focus:border-blue-400 transition-colors py-2.5"
                        style={{
                          width: "68px",
                          borderRadius: "10px",
                          borderColor: ageError && e === "" ? "#EF4444" : "#D5E3F0",
                          color: "#003087",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <p className="text-xs mb-4" style={{ color: "#94A3B8" }}>
                  Edad máxima de contratación: 70 años
                </p>

                {ageError && (
                  <p className="text-xs font-bold mb-3" style={{ color: "#EF4444" }}>{ageError}</p>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={() => { if (validateAges()) setStep(1); }}
                    className={btnClass}
                    style={btnStyle}
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            )}

            {/* ════════ STEP 1: Formulario de contacto ════════ */}
            {step === 1 && (
              <div>
                <p className="font-bold text-sm mb-3" style={{ color: "#003087" }}>
                  Tus datos de contacto
                </p>

                <div className="space-y-2.5 mb-3">
                  {/* Nombre */}
                  <input
                    type="text"
                    value={nombre}
                    onChange={e => { setNombre(e.target.value); setFormError(""); }}
                    placeholder="Tu nombre *"
                    className="w-full border px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                    style={{ borderRadius: "8px", borderColor: "#D5E3F0", color: "#003087" }}
                  />

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setEmailError(""); }}
                      placeholder="tu@email.com *"
                      className="w-full border px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                      style={{
                        borderRadius: "8px",
                        borderColor: emailError ? "#EF4444" : "#D5E3F0",
                        color: "#003087",
                      }}
                    />
                    {emailError && <p className="text-[11px] mt-0.5" style={{ color: "#EF4444" }}>{emailError}</p>}
                  </div>

                  {/* Teléfono con prefijo */}
                  <div>
                    <div className="flex gap-1.5">
                      <select
                        value={countryCode}
                        onChange={e => setCountryCode(e.target.value)}
                        className="border px-2 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400 flex-shrink-0"
                        style={{ borderRadius: "8px", borderColor: "#D5E3F0", width: "90px" }}
                      >
                        {COUNTRY_CODES.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        value={telefono}
                        onChange={e => {
                          const digits = e.target.value.replace(/\D/g, "");
                          setTelefono(digits.slice(0, getMaxPhoneDigits(countryCode)));
                          setPhoneError("");
                        }}
                        placeholder="600 000 000 *"
                        className="flex-1 border px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition-colors"
                        style={{
                          borderRadius: "8px",
                          borderColor: phoneError ? "#EF4444" : "#D5E3F0",
                          color: "#003087",
                        }}
                      />
                    </div>
                    {phoneError && <p className="text-[11px] mt-0.5" style={{ color: "#EF4444" }}>{phoneError}</p>}
                  </div>

                  {/* Provincia */}
                  <select
                    value={provincia}
                    onChange={e => { setProvincia(e.target.value); setFormError(""); }}
                    className="w-full border px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-blue-400 transition-colors"
                    style={{ borderRadius: "8px", borderColor: "#D5E3F0", color: provincia ? "#003087" : "#94A3B8" }}
                  >
                    <option value="">Selecciona provincia *</option>
                    {provinces.map(p => <option key={p} style={{ color: "#003087" }}>{p}</option>)}
                  </select>
                </div>

                {formError && (
                  <p className="text-xs font-bold mb-2" style={{ color: "#EF4444" }}>{formError}</p>
                )}

                <TermsCheckbox
                  checked={termsAccepted}
                  onChange={v => { setTermsAccepted(v); if (v) setTermsError(false); }}
                  error={termsError}
                />

                <div className="flex justify-between mt-3">
                  <button onClick={() => setStep(0)} className="text-sm font-medium" style={{ color: "#64748B" }}>
                    ← Atrás
                  </button>
                  <button onClick={handleShowResults} className={btnClass} style={btnStyle}>
                    Ver mi precio →
                  </button>
                </div>

                <p className="text-[10px] text-center mt-3" style={{ color: "#94A3B8" }}>
                  Sin compromiso · Datos protegidos
                </p>
              </div>
            )}

            {/* ════════ STEP 2: Resultados ════════ */}
            {step === 2 && (
              <ResultsView
                totalPymes={totalPymes}
                totalPlus={totalPlus}
                perPersonPymes={perPersonPymes}
                perPersonPlus={perPersonPlus}
                nombre={nombre}
                provincia={provincia}
                zone={zone}
                numAsegurados={numAsegurados}
                onReset={reset}
              />
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   ResultsView — separate sub-component
   ══════════════════════════════════════════════ */

interface ResultsViewProps {
  totalPymes: number | null;
  totalPlus: number | null;
  perPersonPymes: { age: number; price: number | null }[];
  perPersonPlus:  { age: number; price: number | null }[];
  nombre: string;
  provincia: string;
  zone: number;
  numAsegurados: number;
  onReset: () => void;
}

const ResultsView = ({
  totalPymes, totalPlus, perPersonPymes, perPersonPlus,
  nombre, provincia, zone, numAsegurados, onReset,
}: ResultsViewProps) => {
  const noResults = totalPymes === null || totalPlus === null;

  if (noResults) {
    return (
      <div className="text-center py-6">
        <p className="text-2xl mb-2">⚠️</p>
        <p className="font-bold mb-1" style={{ color: "#003087" }}>
          No se ha podido calcular el precio
        </p>
        <p className="text-sm mb-4" style={{ color: "#64748B" }}>
          Alguna de las edades introducidas supera el límite de contratación (70 años).
        </p>
        <button
          onClick={onReset}
          className="px-5 py-2 rounded-lg text-white text-sm font-bold"
          style={{ backgroundColor: "#E4097D" }}
        >
          Volver a calcular
        </button>
      </div>
    );
  }

  const pP   = formatNum(totalPymes);
  const plusP = formatNum(totalPlus);

  return (
    <div className="space-y-4">
      {/* Greeting */}
      {nombre && (
        <p className="text-sm font-semibold" style={{ color: "#003087" }}>
          {nombre}, aquí tienes tu precio personalizado:
        </p>
      )}

      {/* Summary bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
        style={{ background: "#EFF6FF", color: "#009FE3" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#009FE3" />
        </svg>
        <span>{provincia} · Zona {zone} · {numAsegurados} {numAsegurados === 1 ? "asegurado" : "asegurados"}</span>
      </div>

      {/* Product cards */}
      <div className="space-y-3">

        {/* ── Salud Pymes ── */}
        <div className="rounded-xl border-2 overflow-hidden" style={{ borderColor: "#D5E3F0" }}>
          <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: "#EFF6FF" }}>
            <div>
              <span className="font-bold text-sm" style={{ color: "#003087" }}>Adeslas Salud Pymes</span>
              <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "#FEF3C7", color: "#92400E" }}>
                Con copago
              </span>
            </div>
            <div className="text-right">
              <div className="flex items-end gap-0.5 justify-end">
                <span className="text-2xl font-black leading-none" style={{ color: "#003087" }}>{pP.int}</span>
                <span className="text-base font-bold leading-none mb-0.5" style={{ color: "#003087" }}>,{pP.dec}€</span>
              </div>
              <div className="text-[10px]" style={{ color: "#64748B" }}>/mes</div>
            </div>
          </div>
          <div className="px-4 py-3">
            {numAsegurados > 1 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {perPersonPymes.map((p, i) => (
                  <div key={i} className="text-xs px-2 py-1 rounded-lg" style={{ background: "#F1F5F9", color: "#475569" }}>
                    Aseg. {i + 1} ({p.age}a): {p.price != null ? `${formatNum(p.price).int},${formatNum(p.price).dec}€` : "—"}
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-1">
              {PYMES_KEY_FEATURES.map(f => (
                <div key={f} className="flex items-start gap-1.5 text-xs" style={{ color: "#475569" }}>
                  <span className="flex-shrink-0 mt-0.5 font-bold" style={{ color: "#009FE3" }}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Salud Pymes Plus ── */}
        <div className="rounded-xl border-2 overflow-hidden" style={{ borderColor: "#009FE3" }}>
          <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: "#003087" }}>
            <div>
              <span className="font-bold text-sm text-white">Adeslas Salud Pymes Plus</span>
              <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "#009FE3", color: "white" }}>
                Sin copago
              </span>
            </div>
            <div className="text-right">
              <div className="flex items-end gap-0.5 justify-end">
                <span className="text-2xl font-black leading-none text-white">{plusP.int}</span>
                <span className="text-base font-bold leading-none mb-0.5 text-white">,{plusP.dec}€</span>
              </div>
              <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.70)" }}>/mes</div>
            </div>
          </div>
          <div className="px-4 py-3" style={{ background: "#EFF6FF" }}>
            {numAsegurados > 1 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {perPersonPlus.map((p, i) => (
                  <div key={i} className="text-xs px-2 py-1 rounded-lg" style={{ background: "#F1F5F9", color: "#475569" }}>
                    Aseg. {i + 1} ({p.age}a): {p.price != null ? `${formatNum(p.price).int},${formatNum(p.price).dec}€` : "—"}
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-1">
              {PLUS_KEY_FEATURES.map(f => (
                <div key={f} className="flex items-start gap-1.5 text-xs" style={{ color: "#475569" }}>
                  <span className="flex-shrink-0 mt-0.5 font-bold" style={{ color: "#009FE3" }}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <a
        href={`https://wa.me/34611394319?text=${encodeURIComponent(
          `Hola, quiero contratar Adeslas Salud Pymes. ${numAsegurados} asegurado${numAsegurados > 1 ? "s" : ""} en ${provincia}. Precio calculado: Pymes ${pP.int},${pP.dec}€/mes · Plus ${plusP.int},${plusP.dec}€/mes.`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-colors hover:opacity-90"
        style={{ backgroundColor: "#25D366", color: "#fff" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Contactar por WhatsApp
      </a>

      {/* Recalcular */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="text-sm font-medium underline underline-offset-2"
          style={{ color: "#64748B" }}
        >
          Recalcular
        </button>
      </div>

      {/* Footnote */}
      <p className="text-[10px] text-center" style={{ color: "#94A3B8" }}>
        Primas netas mensuales 2026 · Impuestos no incluidos
      </p>
    </div>
  );
};

export default TarificadorPymes;
