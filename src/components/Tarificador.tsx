import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { submitToHubSpot } from "@/lib/hubspot";
import { trackTarificadorSubmit } from "@/lib/tracking";
import { TermsCheckbox } from "@/components/TermsModal";
import {
  products,
  provinces,
  getPrice,
  getZoneFromProvince,
  type ProductPricing,
} from "@/data/pricing";

/* ───────── Props ───────── */

interface TarificadorProps {
  compact?: boolean;
  productSlug?: string;
  onClose?: () => void;
}

/* ───────── Helpers ───────── */

const formatPrice = (price: number) => {
  const [int, dec] = price.toFixed(2).split(".");
  return { int, dec };
};

/* ── Family discount ── */
const FAMILY_DISCOUNT_THRESHOLD = 4;
const FAMILY_DISCOUNT_RATE = 0.10;

const applyFamilyDiscount = (price: number, numPeople: number): number =>
  numPeople >= FAMILY_DISCOUNT_THRESHOLD ? price * (1 - FAMILY_DISCOUNT_RATE) : price;

const productLabels: Record<string, { tag: string; color: string }> = {
  ya: { tag: "Más económico", color: "#10B981" },
  esencial: { tag: "Con copagos", color: "#009FE3" },
  completaPlusPlus: { tag: "Con copago y 3 años sin subidas", color: "#6366F1" },
  completaPlus: { tag: "Sin copagos", color: "#8B5CF6" },
  completa: { tag: "Más vendido", color: "#003087" },
  reembolso: { tag: "Libre elección", color: "#D97706" },
};

const tipoOptions = [
  { label: "Solo para mí", sub: "Individual", defaultNum: 1 },
  { label: "Mi pareja y yo", sub: "2 asegurados", defaultNum: 2 },
  { label: "Familia con hijos", sub: "3 o más", defaultNum: 3 },
  { label: "Solo mis hijos", sub: "Seguro infantil", defaultNum: 1 },
];

/* ── Tipo icons — SVG personalizados, distintos de Adeslas ── */
const tipoIconColors = ["#009FE3", "#E4097D", "#003087", "#7C3AED"];

const TipoIcon = ({ index, active }: { index: number; active: boolean }) => {
  const c = active ? "#fff" : tipoIconColors[index];
  const s = { fill: "none", stroke: c, strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  /* 0 — Solo para mí: persona con escudo de salud (individual + protección) */
  if (index === 0) return (
    <svg viewBox="0 0 28 28" width={22} height={22} {...s}>
      <circle cx="14" cy="8" r="4.5" />
      <path d="M5 26v-2a9 9 0 0 1 18 0v2" />
      {/* badge escudo abajo-derecha */}
      <path d="M20 17.5c0 0-1.5-.8-2.5-.8s-2.5.8-2.5.8v2.5c0 1.2.9 2.2 2.5 2.8 1.6-.6 2.5-1.6 2.5-2.8v-2.5z" strokeWidth={1.3} />
    </svg>
  );

  /* 1 — Mi pareja y yo: dos personas con corazón entre ellas */
  if (index === 1) return (
    <svg viewBox="0 0 32 28" width={24} height={22} {...s}>
      <circle cx="9" cy="8" r="4" />
      <path d="M1 26v-1.5A7.5 7.5 0 0 1 16 24" />
      <circle cx="23" cy="8" r="4" />
      <path d="M31 26v-1.5A7.5 7.5 0 0 0 16 24" />
      {/* corazón central */}
      <path d="M16 17c0 0-3-2-3-4a2 2 0 0 1 3-1.5A2 2 0 0 1 19 13c0 2-3 4-3 4z" strokeWidth={1.3} />
    </svg>
  );

  /* 2 — Familia con hijos: 2 adultos grandes + 2 niños pequeños debajo */
  if (index === 2) return (
    <svg viewBox="0 0 34 28" width={26} height={22} {...s}>
      {/* adultos */}
      <circle cx="10" cy="6.5" r="4" />
      <circle cx="24" cy="6.5" r="4" />
      <path d="M2 23v-1.2a8 8 0 0 1 16 0V23" />
      <path d="M16 23v-1.2a8 8 0 0 1 16 0V23" />
      {/* niños — círculos más pequeños en la parte inferior */}
      <circle cx="14" cy="19" r="2.2" strokeWidth={1.3} />
      <circle cx="20" cy="19" r="2.2" strokeWidth={1.3} />
    </svg>
  );

  /* 3 — Solo mis hijos: bebé / niño con proporciones infantiles (cabeza grande) */
  return (
    <svg viewBox="0 0 28 30" width={20} height={22} {...s}>
      {/* cabeza grande = infantil */}
      <circle cx="14" cy="9" r="6" />
      <path d="M6 28v-2a8 8 0 0 1 16 0v2" />
      {/* lazo/gorrito arriba */}
      <path d="M10 4c0 0 1.5-2.5 4-2.5S18 4 18 4" strokeWidth={1.2} />
    </svg>
  );
};

/* ── Phone / email validation ── */

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

/* Max local digits per country code */
const getMaxPhoneDigits = (code: string) => {
  if (["+34", "+33", "+351", "+56"].includes(code)) return 9; // Spain, France, Portugal, Chile
  return 10; // UK, USA, Argentina, Mexico, Colombia, Germany, Italy…
};

const isValidPhone = (phone: string, code = "+34") => {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= getMaxPhoneDigits(code);
};

/* ── Country codes ── */
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

/* ── Product slug → HubSpot source number ── */
const slugToSource: Record<string, import("@/lib/hubspot").HubSpotSource> = {
  // Slugs tal como vienen de la prop productSlug de cada página
  "/seguro-salud/adeslas-go/":                                                          303,
  "/seguro-salud/adeslas-plena-vital/":                                                 304,
  "/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/": 313,
  "/seguro-salud/adeslas-plena-total/":                                                 305,
  "/seguro-salud/adeslas-extra-150/":                                                   306,
  "/seguro-salud/adeslas-plena-plus/":                                                  307,
  "/seguro-salud/adeslas-seniors/":                                                     314,
  "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/":            315,
  "/seguro-salud/autonomos/":                                                            319,
  "/seguro-salud/pymes/":                                                               320,
  "/seguro-salud/empresas/":                                                            320,
  "/seguro-dental/":                                                                    308,
  "/seguro-decesos/":                                                                   309,
  "/seguro-adeslas-decesos-prima-unica/":                                               323,
  "/seguro-mascotas/":                                                                  318,
  "/adeslas-asistencia-en-viaje/":                                                      316,
  "/seguro-accidentes/":                                                                317,
  "/adeslas-body-factory/":                                                             321,
  "/adeslas-adif-renfe/":                                                               322,
  "/adeslas-extranjeros":                                                               312,
  // Slugs cortos del catálogo de pricing (fallback por si se pasa sin barra inicial)
  "/adeslas-go":                                                                        303,
  "/adeslas-plena-vital":                                                               304,
  "/adeslas-plena-vital-total":                                                         313,
  "/adeslas-plena-plus":                                                                307,
  "/adeslas-plena-total":                                                               305,
  "/adeslas-extra-150":                                                                 306,
  "seniors":                                                                            314,
  "seniors-total":                                                                      315,
  "pymes-total":                                                                        320,
};

/* ───────── Component ───────── */

const Tarificador = ({ compact = false, productSlug, onClose }: TarificadorProps) => {
  /*
    Steps:
    0 = Tipo de seguro
    1 = Asegurados + edades  (skipped if tipo === 0 "Solo para mí")
    2 = Datos contacto + provincia
    3 = Resultados (comparative only — single product redirects to /mi-precio)
  */
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [tipo, setTipo] = useState(-1);
  const [numAsegurados, setNumAsegurados] = useState(1);
  const [edades, setEdades] = useState<string[]>([""]);
  const [provincia, setProvincia] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+34");
  const [telefono, setTelefono] = useState("");
  const [ageError, setAgeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [termsError, setTermsError] = useState(false);

  const singleProduct = productSlug
    ? products.find(
        (p) => p.slug === `/${productSlug}` || p.slug === productSlug
      )
    : undefined;

  const zone = useMemo(() => {
    if (!provincia) return 3;
    return getZoneFromProvince(provincia);
  }, [provincia]);

  const stepLabels = [
    "Tipo de seguro",
    "Asegurados",
    "Tus datos",
    "Tu precio",
  ];

  /* ── Navigation ── */

  const goToStep = (s: number) => setStep(s);

  const handleNumChange = (delta: number) => {
    const n = Math.max(1, Math.min(10, numAsegurados + delta));
    setNumAsegurados(n);
    setEdades((prev) => {
      const arr = [...prev];
      while (arr.length < n) arr.push("");
      return arr.slice(0, n);
    });
  };

  /* When tipo is selected → auto-advance */
  const handleTipoSelect = (i: number) => {
    setTipo(i);
    const opt = tipoOptions[i];
    setNumAsegurados(opt.defaultNum);
    setEdades(Array(opt.defaultNum).fill(""));

    // Auto-advance after a tiny delay for visual feedback
    setTimeout(() => {
      if (i === 0) {
        // "Solo para mí" → skip step 1, go straight to step 1 but with 1 age field shown
        // Actually we still need their age, so go to step 1 but simplified (1 person)
        goToStep(1);
      } else {
        goToStep(1);
      }
    }, 200);
  };

  /* Validate ages before step 2 → 3 */
  const validateAges = (): boolean => {
    const parsed = edades.map((e) => parseInt(e, 10));
    if (parsed.some((a) => isNaN(a) || a < 0)) {
      setAgeError("Introduce todas las edades correctamente");
      return false;
    }
    if (parsed.some((a) => a > 70)) {
      setAgeError("La edad máxima de contratación es 70 años");
      return false;
    }
    // "Mi pareja y yo" → both must be ≥18
    if (tipo === 1 && parsed.some((a) => a < 18)) {
      setAgeError("Ambos asegurados deben ser mayores de 18 años");
      return false;
    }
    setAgeError("");
    return true;
  };

  const handleShowResults = () => {
    // Validate contact
    if (!nombre.trim()) {
      setAgeError("Introduce tu nombre");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Introduce un email válido");
      return;
    }
    setEmailError("");
    if (!isValidPhone(telefono, countryCode)) {
      setPhoneError("Introduce un número de teléfono válido");
      return;
    }
    setPhoneError("");
    if (!provincia) {
      setAgeError("Selecciona una provincia");
      return;
    }
    setAgeError("");
    if (!termsAccepted) {
      setTermsError(true);
      return;
    }
    setTermsError(false);

    // Send lead to HubSpot
    const source = singleProduct
      ? (slugToSource[productSlug ?? ""] ?? 302)
      : 302;
    submitToHubSpot({
      firstname: nombre.trim(),
      email,
      phone: `${countryCode}${telefono}`,
      city: provincia,
      edad1: edades.filter(Boolean).join(","),
      source,
    });
    trackTarificadorSubmit(`${countryCode}${telefono}`, `tarificador_${source}`);

    // Single product → redirect to personalized landing
    if (singleProduct) {
      const z = getZoneFromProvince(provincia);
      const parsed = edades.map((e) => parseInt(e, 10)).filter((a) => !isNaN(a));
      const basePrice = parsed.reduce((sum, age) => sum + getPrice(singleProduct, age, z), 0);
      const hasDiscount = parsed.length >= FAMILY_DISCOUNT_THRESHOLD;
      const finalPrice = applyFamilyDiscount(basePrice, parsed.length);
      const slug = singleProduct.slug.replace(/^\//, ""); // remove leading slash
      const params = new URLSearchParams();
      params.set("nombre", nombre.trim());
      params.set("precio", finalPrice.toFixed(2));
      params.set("edades", parsed.join(","));
      params.set("provincia", provincia);
      if (hasDiscount) {
        params.set("descuento", "10");
        params.set("precioBase", basePrice.toFixed(2));
      }
      navigate(`/mi-precio/${slug}?${params.toString()}`);
      return;
    }

    goToStep(3);
  };

  /* ── Pricing calculation ── */

  const results = useMemo(() => {
    const parsed = edades
      .map((e) => parseInt(e, 10))
      .filter((a) => !isNaN(a));
    if (parsed.length === 0 || !provincia) return [];

    const numPeople = parsed.length;
    const hasDiscount = numPeople >= FAMILY_DISCOUNT_THRESHOLD;

    if (singleProduct) {
      let total = 0;
      for (const age of parsed) {
        const p = getPrice(singleProduct, age, zone);
        if (p === null) return [];
        total += p;
      }
      const discounted = applyFamilyDiscount(total, numPeople);
      return [{ product: singleProduct, price: discounted, originalPrice: hasDiscount ? total : undefined }];
    }

    return products
      .map((prod) => {
        let total = 0;
        for (const age of parsed) {
          const p = getPrice(prod, age, zone);
          if (p === null) return null;
          total += p;
        }
        const discounted = applyFamilyDiscount(total, numPeople);
        return { product: prod, price: discounted, originalPrice: hasDiscount ? total : undefined };
      })
      .filter(
        (r): r is { product: ProductPricing; price: number; originalPrice?: number } => r !== null
      )
      .sort((a, b) => a.price - b.price);
  }, [edades, provincia, singleProduct, zone]);

  const reset = () => {
    setStep(0);
    setTipo(-1);
    setNumAsegurados(1);
    setEdades([""]);
    setProvincia("");
    setNombre("");
    setEmail("");
    setTelefono("");
    setAgeError("");
    setEmailError("");
    setPhoneError("");
    setTermsAccepted(false);
    setTermsError(false);
  };

  const parsedAges = edades.map((e) => parseInt(e, 10));
  const contactValid =
    nombre.trim() &&
    isValidEmail(email) &&
    isValidPhone(telefono, countryCode) &&
    !!provincia;

  /* ─── Country flag selector ─── */
  const selectedCountry = countryCodes.find((c) => c.code === countryCode) || countryCodes[0];

  /* PhoneInput inlined below to avoid remount on every render */

  /* ─── Render step content ─── */

  const renderStepContent = (isCompact: boolean) => {
    const btnClass = isCompact
      ? "px-5 py-2 rounded-lg text-primary-foreground font-bold text-sm"
      : "px-6 py-2.5 rounded-lg text-primary-foreground font-bold text-sm";
    const btnStyle = { backgroundColor: "#E4097D", borderRadius: "7px" };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
        >
          {/* ── Step 0: Insurance type ── */}
          {step === 0 && (
            <div className="space-y-3">
              <p className="text-gris-texto font-bold text-sm mb-1">
                ¿Para quién es el seguro?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {tipoOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleTipoSelect(i)}
                    className="border-2 p-2 text-center transition-all duration-200"
                    style={{
                      borderColor: tipo === i ? tipoIconColors[i] : "#D5E3F0",
                      backgroundColor: tipo === i ? `${tipoIconColors[i]}12` : "#fff",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-1"
                      style={{
                        backgroundColor: tipo === i ? tipoIconColors[i] : `${tipoIconColors[i]}18`,
                      }}
                    >
                      <TipoIcon index={i} active={tipo === i} />
                    </div>
                    <div className="font-bold text-[11px] text-gris-texto leading-tight">
                      {opt.label}
                    </div>
                    <div className="text-[9px] text-gris-medio">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 1: Ages ── */}
          {step === 1 && (
            <div>
              {/* "Solo para mí" → simplified: just one age */}
              {tipo === 0 && (
                <>
                  <p className="text-gris-texto font-bold text-sm mb-3">
                    ¿Cuántos años tienes?
                  </p>
                  <input
                    type="number"
                    value={edades[0]}
                    onChange={(ev) => {
                      const raw = ev.target.value.replace(/\D/g, "");
                      if (raw === "") { setEdades([""]); setAgeError(""); return; }
                      const num = Math.min(parseInt(raw, 10), 70);
                      setEdades([String(num)]);
                      setAgeError("");
                    }}
                    placeholder="Ej: 35"
                    min={0}
                    max={70}
                    className="w-full border border-borde px-3 py-2.5 text-sm text-gris-texto focus:outline-none focus:border-azul-medio mb-3"
                    style={{ borderRadius: "8px" }}
                  />
                </>
              )}

              {/* Others: numAsegurados + ages */}
              {tipo !== 0 && (
                <>
                  <p className="text-gris-texto font-bold text-sm mb-3">
                    {tipo === 1
                      ? "Edades (ambos mayores de 18)"
                      : tipo === 3
                      ? "¿Cuántos hijos y sus edades?"
                      : "¿Cuántos asegurados y sus edades?"}
                  </p>
                  {tipo !== 1 && (
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() => handleNumChange(-1)}
                        className="w-9 h-9 border-2 border-borde text-lg font-bold text-gris-texto hover:bg-azul-suave"
                        style={{ borderRadius: "10px" }}
                      >
                        −
                      </button>
                      <span className="text-xl font-bold text-gris-texto w-6 text-center">
                        {numAsegurados}
                      </span>
                      <button
                        onClick={() => handleNumChange(1)}
                        className="w-9 h-9 border-2 border-borde text-lg font-bold text-gris-texto hover:bg-azul-suave"
                        style={{ borderRadius: "10px" }}
                      >
                        +
                      </button>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {edades.map((e, i) => (
                      <div key={i}>
                        <label className="text-[10px] text-gris-medio mb-0.5 block">
                          {tipo === 1
                            ? i === 0
                              ? "Tu edad"
                              : "Edad pareja"
                            : tipo === 3
                            ? `Hijo ${i + 1}`
                            : `Asegurado ${i + 1}`}
                        </label>
                        <input
                          type="number"
                          value={e}
                          onChange={(ev) => {
                            const raw = ev.target.value.replace(/\D/g, "");
                            const arr = [...edades];
                            if (raw === "") { arr[i] = ""; }
                            else { arr[i] = String(Math.min(parseInt(raw, 10), 70)); }
                            setEdades(arr);
                            setAgeError("");
                          }}
                          min={0}
                          max={70}
                          className="w-16 border border-borde px-2 py-1.5 text-center text-sm text-gris-texto focus:outline-none focus:border-azul-medio"
                          style={{ borderRadius: "8px" }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {ageError && (
                <p
                  className="text-xs font-bold mb-2"
                  style={{ color: "#EF4444" }}
                >
                  {ageError}
                </p>
              )}
              <div className="flex justify-between">
                <button
                  onClick={() => goToStep(0)}
                  className="text-sm text-gris-medio hover:text-gris-texto"
                >
                  ← Atrás
                </button>
                <button
                  onClick={() => {
                    if (validateAges()) goToStep(2);
                  }}
                  className={btnClass}
                  style={btnStyle}
                >
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Contact + province ── */}
          {step === 2 && (
            <div>
              <div className="space-y-1.5 mb-2">
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value);
                    setAgeError("");
                  }}
                  placeholder="Tu nombre"
                  className="w-full border border-borde px-3 py-2 text-sm text-gris-texto focus:outline-none focus:border-azul-medio"
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
                    className="w-full border border-borde px-3 py-2 text-sm text-gris-texto focus:outline-none focus:border-azul-medio"
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
                      className="border border-borde px-2 py-2 text-sm text-gris-texto bg-blanco focus:outline-none focus:border-azul-medio flex-shrink-0"
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
                        const onlyDigits = e.target.value.replace(/\D/g, "");
                        setTelefono(onlyDigits.slice(0, getMaxPhoneDigits(countryCode)));
                        setPhoneError("");
                      }}
                      placeholder="600 000 000"
                      className="w-full border border-borde px-3 py-2 text-sm text-gris-texto focus:outline-none focus:border-azul-medio"
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
                    setAgeError("");
                  }}
                  className="w-full border border-borde px-3 py-2 text-sm text-gris-texto bg-blanco focus:outline-none focus:border-azul-medio"
                  style={{ borderRadius: "8px" }}
                >
                  <option value="">Selecciona provincia</option>
                  {provinces.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              {ageError && (
                <p className="text-xs font-bold mb-1.5" style={{ color: "#EF4444" }}>
                  {ageError}
                </p>
              )}
              <TermsCheckbox
                checked={termsAccepted}
                onChange={(val) => { setTermsAccepted(val); if (val) setTermsError(false); }}
                error={termsError}
              />
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => goToStep(1)}
                  className="text-sm text-gris-medio hover:text-gris-texto"
                >
                  ← Atrás
                </button>
                <button
                  onClick={handleShowResults}
                  className={`${btnClass} disabled:opacity-40`}
                  style={btnStyle}
                >
                  Ver mi precio →
                </button>
              </div>
              <p className="text-[10px] text-gris-medio mt-1.5 text-center">
                Sin compromiso · Datos protegidos
              </p>
            </div>
          )}

          {/* ── Step 3: Results ── */}
          {step === 3 && (
            <ResultsView
              results={results}
              ages={parsedAges.filter((a) => !isNaN(a))}
              provincia={provincia}
              zone={zone}
              singleProduct={!!singleProduct}
              compact={isCompact}
              onReset={reset}
              numAsegurados={numAsegurados}
              nombre={nombre}
            />
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  /* ─── Progress dots ─── */

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

  /* ─── Compact mode ─── */

  if (compact) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden">
        {/* Cabecera degradado Adeslas */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ background: "linear-gradient(120deg, #002266 0%, #003087 45%, #0077B6 100%)" }}
        >
          <div>
            <p className="text-white font-bold text-[13px] whitespace-nowrap">
              Calculadora de seguros Adeslas
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.75)" }}>
              {stepLabels[step]}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Progress bars */}
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 28, height: 4, borderRadius: 2,
                    backgroundColor:
                      i === step ? "#fff"
                      : i < step ? "rgba(255,255,255,0.6)"
                      : "rgba(255,255,255,0.22)",
                    transition: "background-color 0.3s",
                  }}
                />
              ))}
            </div>
            {/* Close button (solo en modal) */}
            {onClose && (
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        </div>
        {/* Cuerpo — altura fija para que el hero no cambie de tamaño al avanzar pasos */}
        <div className="px-5 py-3 flex flex-col justify-center" style={{ height: "310px", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "#D5E3F0 transparent" }}>
          {renderStepContent(true)}
          {renderProgress()}
        </div>
      </div>
    );
  }

  /* ─── Full section mode (homepage) ─── */

  return (
    <section id="calculadora" className="section-pad bg-gris-claro">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ color: "#003087" }}
          >
            Compara tu seguro médico{" "}
            <span style={{ color: "#009FE3" }}>en segundos</span>
          </h2>
          <p className="text-gris-medio mt-2 max-w-lg mx-auto">
            Introduce tus datos y compara las tarifas de todos los seguros Adeslas
            al instante.
          </p>
        </div>

        <div className="bg-blanco rounded-[20px] overflow-hidden card-shadow">
          <div
            className="px-6 md:px-10 py-5"
            style={{ background: "linear-gradient(120deg, #002266 0%, #003087 45%, #0077B6 100%)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-primary-foreground text-lg md:text-xl">
                  Calculadora de seguros Adeslas
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
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
                          ? "#fff"
                          : i < step
                          ? "rgba(255,255,255,0.55)"
                          : "rgba(255,255,255,0.22)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="px-6 md:px-10 py-8">
            {renderStepContent(false)}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────── Results View ───────── */

interface ResultsViewProps {
  results: { product: ProductPricing; price: number; originalPrice?: number }[];
  ages: number[];
  provincia: string;
  zone: number;
  singleProduct: boolean;
  compact: boolean;
  onReset: () => void;
  numAsegurados: number;
  nombre?: string;
}

const ResultsView = ({
  results,
  ages,
  provincia,
  zone,
  singleProduct,
  compact,
  onReset,
  numAsegurados,
  nombre = "",
}: ResultsViewProps) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-6">
        <div className="text-3xl mb-3">⚠️</div>
        <h3 className="text-gris-texto font-bold mb-2">
          No hay resultados disponibles
        </h3>
        <p className="text-sm text-gris-medio mb-4">
          No hemos encontrado tarifas para los datos seleccionados.
        </p>
        <button
          onClick={onReset}
          className="text-sm text-azul-medio hover:underline"
        >
          ← Volver a intentar
        </button>
      </div>
    );
  }

  const isMultiple = numAsegurados > 1;

  /* Single product */
  if (singleProduct && results[0]) {
    const { int, dec } = formatPrice(results[0].price);
    const hasDiscount = results[0].originalPrice !== undefined;
    return (
      <div className="text-center">
        {hasDiscount && (
          <div
            className="rounded-xl px-4 py-2 mb-3 flex items-center justify-center gap-2 text-xs font-bold"
            style={{ backgroundColor: "#DCFCE7", color: "#166534", borderRadius: "10px" }}
          >
            🎉 Descuento familiar 10% aplicado ({numAsegurados} asegurados)
          </div>
        )}
        <div
          className="rounded-xl p-6 mb-4"
          style={{ backgroundColor: "#003087", borderRadius: "14px" }}
        >
          <p
            className="text-xs mb-2"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {isMultiple
              ? `${results[0].product.name} · ${numAsegurados} asegurados`
              : `Tu precio para ${results[0].product.name}`}
          </p>
          {hasDiscount && (
            <p className="text-sm line-through mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>
              {formatPrice(results[0].originalPrice!).int},{formatPrice(results[0].originalPrice!).dec}€/mes
            </p>
          )}
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-5xl font-black text-white">{int}</span>
            <span className="text-xl font-bold text-white">,{dec}€</span>
            <span
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              /mes
            </span>
          </div>
          {hasDiscount && (
            <p className="text-xs font-bold mb-1" style={{ color: "#86EFAC" }}>
              Ahorro: {formatPrice(results[0].originalPrice! - results[0].price).int},{formatPrice(results[0].originalPrice! - results[0].price).dec}€/mes
            </p>
          )}
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            {ages.join(", ")} años · {provincia}
            {isMultiple && " · Total familia"}
          </p>
        </div>
        <p className="text-xs text-gris-medio mb-3">
          Un asesor se pondrá en contacto contigo para formalizar tu seguro.
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
        <button
          onClick={onReset}
          className="block mx-auto mt-3 text-xs text-azul-medio hover:underline"
        >
          ↺ Calcular otra vez
        </button>
      </div>
    );
  }

  /* Comparative */
  const discountApplied = results.some((r) => r.originalPrice !== undefined);
  return (
    <div>
      {discountApplied && (
        <div
          className="rounded-xl px-4 py-2.5 mb-3 flex items-center gap-2 text-xs font-bold"
          style={{ backgroundColor: "#DCFCE7", color: "#166534", borderRadius: "10px" }}
        >
          🎉 <span>Descuento familiar 10% aplicado por ser {numAsegurados} asegurados. ¡Ahorro incluido en los precios!</span>
        </div>
      )}
      {isMultiple && (
        <p className="text-xs text-gris-medio mb-3 text-center">
          Precios mensuales para {numAsegurados} asegurados (
          {ages.join(", ")} años) en {provincia}
        </p>
      )}
      <div className="space-y-3">
        {results.map(({ product, price, originalPrice }, i) => {
          const label = productLabels[product.id];
          const isBest = i === 0;
          const { int, dec } = formatPrice(price);

          return (
            <div
              key={product.id}
              className="border-2 p-4 flex items-center gap-4 transition-all"
              style={{
                borderColor: isBest ? "#009FE3" : "#E2E8F0",
                backgroundColor: isBest ? "#F0F7FF" : "#fff",
                borderRadius: "14px",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  backgroundColor: isBest ? "#009FE3" : "#E2E8F0",
                  color: isBest ? "#fff" : "#6B8296",
                }}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-gris-texto">
                    {product.name}
                  </span>
                  {label && (
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: label.color }}
                    >
                      {label.tag}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                {originalPrice !== undefined && (
                  <p className="text-[10px] line-through text-gris-medio leading-none mb-0.5">
                    {formatPrice(originalPrice).int},{formatPrice(originalPrice).dec}€
                  </p>
                )}
                <div className="flex items-baseline gap-0.5">
                  <span
                    className="text-xl font-black"
                    style={{ color: "#003087" }}
                  >
                    {int}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#003087" }}
                  >
                    ,{dec}€
                  </span>
                </div>
                <span className="text-[10px] text-gris-medio">/mes</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 text-center">
        {!isMultiple && (
          <p className="text-xs text-gris-medio mb-3">
            Precios mensuales netos para {ages[0]} años en {provincia}.
          </p>
        )}
        <p className="text-xs text-gris-medio mb-3">
          Un asesor se pondrá en contacto contigo.
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
        <button
          onClick={onReset}
          className="block mx-auto mt-3 text-xs text-azul-medio hover:underline"
        >
          ↺ Calcular otra vez
        </button>
      </div>
    </div>
  );
};

export default Tarificador;
