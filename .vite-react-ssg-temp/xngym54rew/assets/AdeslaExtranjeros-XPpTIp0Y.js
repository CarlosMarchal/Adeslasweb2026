import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Link } from 'react-router-dom';
import { P as ProductPageTemplate } from './ProductPageTemplate-B1qRvlHR.js';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { e as extResidentsPricing, a as extStudentsPricing, p as provinces, T as TermsCheckbox, t as trackClickToCallContratacion } from '../main.mjs';
import 'lucide-react';
import './seguro-salud-adeslas-individual-Za9HuXEo.js';
import 'vite-react-ssg';
import '@tanstack/react-query';
import 'next-themes';
import 'sonner';
import '@radix-ui/react-toast';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-tooltip';
import 'react-helmet-async';
import 'react-dom';

const formatPrice = (price) => {
  const [int, dec] = price.toFixed(2).split(".");
  return { int, dec };
};
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
const isValidPhone = (phone, code = "+34") => {
  const digits = phone.replace(/\D/g, "");
  if (code === "+34") return digits.length === 9 && /^[67]/.test(digits);
  return digits.length >= 7 && digits.length <= 15;
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
  { flag: "🇺🇸", code: "+1", name: "EE.UU." }
];
function getExtResidentsPrice(age) {
  const brackets = Object.keys(extResidentsPricing).map(Number).sort((a, b) => a - b);
  let bracket = brackets[0];
  for (const b of brackets) {
    if (age >= b) bracket = b;
    else break;
  }
  const row = extResidentsPricing[String(bracket)];
  return row ? row[2] : null;
}
function getExtStudentsPrice(age) {
  if (age <= 35) {
    const row2 = extStudentsPricing["0-35"];
    return row2 ? row2[2] : null;
  }
  const brackets = Object.keys(extStudentsPricing).filter((k) => !k.includes("-")).map(Number).sort((a, b) => a - b);
  let bracket = brackets[0];
  for (const b of brackets) {
    if (age >= b) bracket = b;
    else break;
  }
  const row = extStudentsPricing[String(bracket)];
  return row ? row[2] : null;
}
const TarificadorExtranjeros = ({ compact = false }) => {
  const [step, setStep] = useState(0);
  const [modalidad, setModalidad] = useState("");
  const [edad, setEdad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+34");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [termsError, setTermsError] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [pendingModalidad, setPendingModalidad] = useState("");
  const stepLabels = ["Modalidad", "Tu edad", "Tus datos", "Tu precio"];
  useEffect(() => {
    if (showWhatsAppModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showWhatsAppModal]);
  const goToStep = (s) => setStep(s);
  const result = useMemo(() => {
    const ageNum = parseInt(edad, 10);
    if (isNaN(ageNum) || !modalidad) return null;
    const price = modalidad === "residentes" ? getExtResidentsPrice(ageNum) : getExtStudentsPrice(ageNum);
    return price;
  }, [edad, modalidad]);
  const handleSelectModalidad = (m) => {
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
    if (!isValidPhone(telefono, countryCode)) {
      setPhoneError(
        countryCode === "+34" ? "Introduce un móvil español válido (empieza por 6 o 7)" : "Introduce un número de teléfono válido"
      );
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
  const btnClass = compact ? "px-5 py-2 rounded-lg text-primary-foreground font-bold text-sm" : "px-6 py-2.5 rounded-lg text-primary-foreground font-bold text-sm";
  const btnStyle = { backgroundColor: "#E4097D", borderRadius: "7px" };
  const renderContent = () => /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -30 },
      transition: { duration: 0.2 },
      children: [
        step === 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-gris-texto font-bold text-sm mb-1", children: "¿Cuál es tu situación en España?" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: [
            { key: "residentes", emoji: "🏠", label: "Residente", sub: "Vivo o viviré en España" },
            { key: "estudiantes", emoji: "🎓", label: "Estudiante", sub: "Estudio o estudiaré en España" }
          ].map((opt) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleSelectModalidad(opt.key),
              className: "flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all hover:-translate-y-0.5",
              style: {
                borderColor: modalidad === opt.key ? "#009FE3" : "#D5E3F0",
                backgroundColor: modalidad === opt.key ? "#F0F7FF" : "#fff",
                borderRadius: "12px"
              },
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-2xl", children: opt.emoji }),
                /* @__PURE__ */ jsx("span", { className: "font-bold text-sm text-gris-texto", children: opt.label }),
                /* @__PURE__ */ jsx("span", { className: "text-[11px] text-gris-medio", children: opt.sub })
              ]
            },
            opt.key
          )) })
        ] }),
        step === 1 && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-gris-texto font-bold text-sm mb-1", children: "¿Cuántos años tienes?" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 0,
              max: 70,
              value: edad,
              onChange: (e) => {
                setEdad(e.target.value);
                setError("");
              },
              placeholder: "Edad",
              className: "w-full border border-borde px-3 py-2.5 text-sm text-gris-texto focus:outline-none focus:border-azul-medio",
              style: {
                borderRadius: "8px",
                borderColor: error ? "#EF4444" : void 0
              }
            }
          ),
          error && /* @__PURE__ */ jsx("p", { className: "text-[11px]", style: { color: "#EF4444" }, children: error }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => goToStep(0),
                className: "px-4 py-2 text-sm font-bold border border-borde hover:bg-gray-50",
                style: { borderRadius: "7px", color: "#009FE3" },
                children: "← Atrás"
              }
            ),
            /* @__PURE__ */ jsx("button", { onClick: handleAgeNext, className: btnClass, style: btnStyle, children: "Continuar →" })
          ] })
        ] }),
        step === 2 && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-gris-texto font-bold text-sm mb-1", children: "Déjanos tus datos para ver el precio" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: nombre,
              onChange: (e) => {
                setNombre(e.target.value);
                setError("");
              },
              placeholder: "Tu nombre",
              className: "w-full border border-borde px-3 py-2.5 text-sm text-gris-texto focus:outline-none focus:border-azul-medio",
              style: { borderRadius: "8px" }
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                value: email,
                onChange: (e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                },
                placeholder: "tu@email.com",
                className: "w-full border border-borde px-3 py-2.5 text-sm text-gris-texto focus:outline-none focus:border-azul-medio",
                style: {
                  borderRadius: "8px",
                  borderColor: emailError ? "#EF4444" : void 0
                }
              }
            ),
            emailError && /* @__PURE__ */ jsx("p", { className: "text-[11px] mt-0.5", style: { color: "#EF4444" }, children: emailError })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
              /* @__PURE__ */ jsx(
                "select",
                {
                  value: countryCode,
                  onChange: (e) => setCountryCode(e.target.value),
                  className: "border border-borde px-2 py-2.5 text-sm text-gris-texto bg-blanco focus:outline-none focus:border-azul-medio flex-shrink-0",
                  style: { borderRadius: "8px", width: "90px" },
                  children: countryCodes.map((c) => /* @__PURE__ */ jsxs("option", { value: c.code, children: [
                    c.flag,
                    " ",
                    c.code
                  ] }, c.code))
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  value: telefono,
                  onChange: (e) => {
                    setTelefono(e.target.value);
                    setPhoneError("");
                  },
                  placeholder: "600 000 000",
                  className: "w-full border border-borde px-3 py-2.5 text-sm text-gris-texto focus:outline-none focus:border-azul-medio",
                  style: {
                    borderRadius: "8px",
                    borderColor: phoneError ? "#EF4444" : void 0
                  }
                }
              )
            ] }),
            phoneError && /* @__PURE__ */ jsx("p", { className: "text-[11px] mt-0.5", style: { color: "#EF4444" }, children: phoneError })
          ] }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: provincia,
              onChange: (e) => {
                setProvincia(e.target.value);
                setError("");
              },
              className: "w-full border border-borde px-3 py-2.5 text-sm text-gris-texto bg-blanco focus:outline-none focus:border-azul-medio",
              style: { borderRadius: "8px" },
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona provincia" }),
                provinces.map((p) => /* @__PURE__ */ jsx("option", { value: p, children: p }, p))
              ]
            }
          ),
          error && /* @__PURE__ */ jsx("p", { className: "text-[11px]", style: { color: "#EF4444" }, children: error }),
          /* @__PURE__ */ jsx(
            TermsCheckbox,
            {
              checked: termsAccepted,
              onChange: (val) => {
                setTermsAccepted(val);
                if (val) setTermsError(false);
              },
              error: termsError
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => goToStep(1),
                className: "px-4 py-2 text-sm font-bold border border-borde hover:bg-gray-50",
                style: { borderRadius: "7px", color: "#009FE3" },
                children: "← Atrás"
              }
            ),
            /* @__PURE__ */ jsx("button", { onClick: handleShowResults, className: btnClass, style: btnStyle, children: "Ver mi precio →" })
          ] })
        ] }),
        step === 3 && /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          result !== null ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "rounded-xl p-6 mb-4",
                style: { backgroundColor: "#003087", borderRadius: "14px" },
                children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-xs mb-1", style: { color: "rgba(255,255,255,0.6)" }, children: [
                    "Adeslas Extranjeros ·",
                    " ",
                    modalidad === "residentes" ? "Residentes" : "Estudiantes"
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-center gap-1 mb-1", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-5xl font-black text-white", children: formatPrice(result).int }),
                    /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold text-white", children: [
                      ",",
                      formatPrice(result).dec,
                      "€"
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm", style: { color: "rgba(255,255,255,0.6)" }, children: "/mes" })
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: "rgba(255,255,255,0.5)" }, children: [
                    edad,
                    " años · ",
                    provincia
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gris-medio mb-3", children: "Un asesor se pondrá en contacto contigo para formalizar tu seguro y enviarte el certificado para Extranjería." }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "tel:917105000",
                onClick: () => trackClickToCallContratacion("tarificador_extranjeros"),
                className: "inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm",
                style: {
                  backgroundColor: "#E4097D",
                  color: "#fff",
                  borderRadius: "8px"
                },
                children: "Llámanos: 91 710 50 00"
              }
            )
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "text-3xl mb-3", children: "⚠️" }),
            /* @__PURE__ */ jsx("h3", { className: "text-gris-texto font-bold mb-2", children: "No disponible" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-medio mb-4", children: "No hemos encontrado tarifas para los datos seleccionados." })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: reset,
              className: "block mx-auto mt-3 text-xs text-azul-medio hover:underline",
              children: "↺ Calcular otra vez"
            }
          )
        ] })
      ]
    },
    step
  ) });
  const renderProgress = () => /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-1.5 mt-4", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx(
    "div",
    {
      className: "rounded-full transition-colors",
      style: {
        width: 24,
        height: 4,
        borderRadius: 2,
        backgroundColor: i === step ? "#009FE3" : i < step ? "#009FE3" : "#D5E3F0"
      }
    },
    i
  )) });
  const whatsAppModal = showWhatsAppModal && /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: { backgroundColor: "rgba(0,30,80,0.55)", backdropFilter: "blur(4px)" },
      onClick: (e) => {
        if (e.target === e.currentTarget) setShowWhatsAppModal(false);
      },
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.92, y: 16 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.92, y: 16 },
          transition: { duration: 0.22 },
          className: "bg-blanco rounded-2xl p-7 w-full max-w-sm relative",
          style: { boxShadow: "0 24px 64px rgba(0,30,80,0.25)" },
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setShowWhatsAppModal(false),
                className: "absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-gris-medio hover:bg-gris-claro transition-colors text-lg font-bold",
                "aria-label": "Cerrar",
                children: "×"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "text-center mb-5", children: [
              /* @__PURE__ */ jsx("span", { className: "text-5xl block mb-3", children: pendingModalidad === "residentes" ? "🏠" : "🎓" }),
              /* @__PURE__ */ jsx("h3", { className: "text-gris-texto font-bold text-lg mb-1", children: pendingModalidad === "residentes" ? "Residente en España" : "Estudiante en España" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-medio leading-relaxed", children: "Contáctanos por WhatsApp y te indicaremos en menos de 1 minuto el precio para tu situación." })
            ] }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: `https://wa.me/34611394319?text=${encodeURIComponent(
                  pendingModalidad === "residentes" ? "Hola, soy residente extranjero en España y me interesa el seguro médico Adeslas para residentes. ¿Me podéis indicar el precio para mi situación?" : "Hola, soy estudiante extranjero en España y me interesa el seguro Adeslas Health Students para mi visado de estudios. ¿Me podéis indicar el precio para mi situación?"
                )}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90",
                style: { backgroundColor: "#25D366", borderRadius: "12px" },
                onClick: () => setShowWhatsAppModal(false),
                children: [
                  /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) }),
                  "Contáctanos por WhatsApp"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setShowWhatsAppModal(false),
                className: "block w-full mt-3 text-xs text-gris-medio hover:text-gris-texto transition-colors text-center",
                children: "Cerrar"
              }
            )
          ]
        }
      )
    }
  );
  if (compact) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      whatsAppModal,
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-blanco rounded-2xl p-6 md:p-7 card-shadow",
          style: { borderRadius: "16px" },
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-gris-texto text-lg font-bold mb-4", children: "Calcula tu seguro para extranjeros" }),
            renderContent(),
            renderProgress()
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    whatsAppModal,
    /* @__PURE__ */ jsx("section", { id: "calculadora", className: "section-pad bg-gris-claro", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-3xl", children: /* @__PURE__ */ jsxs("div", { className: "bg-blanco rounded-[20px] overflow-hidden card-shadow", children: [
      /* @__PURE__ */ jsx("div", { className: "px-6 md:px-10 py-5", style: { backgroundColor: "#003087" }, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-primary-foreground text-lg md:text-xl", children: "Seguro para Extranjeros" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm", style: { color: "rgba(255,255,255,0.7)" }, children: stepLabels[step] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1.5", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "rounded-full transition-colors",
            style: {
              width: 32,
              height: 6,
              borderRadius: 3,
              backgroundColor: i === step ? "#009FE3" : i < step ? "rgba(0,159,227,0.45)" : "rgba(255,255,255,0.22)"
            }
          },
          i
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "px-6 md:px-10 py-8", children: renderContent() })
    ] }) }) })
  ] });
};

const heroImg = "/assets/seguro-salud-adeslas-extranjeros-BkJUAx4z.webp";

const data = {
  seoTitle: "Adeslas Extranjeros | Seguro Médico para Estudiantes y Residentes en España desde 38€",
  seoDescription: "Seguro médico para estudiantes extranjeros en España desde 38€/mes. Válido para visado de estudios y Extranjería. Cubre todos los requisitos exigidos. Alta en 24h.",
  seoCanonical: "https://adeslas.numero1salud.es/seguro-salud/adeslas-extranjeros/",
  seoNoindex: true,
  seoOgImage: "https://adeslas.numero1salud.es/og-extranjeros.jpg",
  seoProductSchema: {
    name: "Adeslas Health Students / Newcomers Protection",
    description: "Seguro médico para extranjeros en España válido para visado. Cobertura médica completa homologada por el Gobierno de España.",
    category: "Seguro de Salud para Extranjeros",
    price: "38",
    pricePeriod: "month"
  },
  seoBreadcrumbs: [
    { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
    { name: "Seguros Adeslas", url: "https://adeslas.numero1salud.es/" },
    { name: "Seguro Extranjeros", url: "https://adeslas.numero1salud.es/seguro-salud/adeslas-extranjeros/" }
  ],
  productSlug: "/adeslas-extranjeros",
  badge: "Válido para visado de estudios y residencia",
  heroTitle: "Seguro Médico para Extranjeros en España",
  heroImage: heroImg,
  heroHighlight: "ADESLAS HEALTH STUDENTS",
  heroSubtitle: "El seguro médico que necesitas para tu visado de estudios o residencia en España. Cubre todos los requisitos exigidos por Extranjería.",
  price: "38",
  pricePeriod: "mes",
  features: [
    {
      icon: /* @__PURE__ */ jsx("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
          fill: "#1c4a8d"
        }
      ) }),
      title: "Válido para visado de estudios",
      description: "Cubre todos los requisitos exigidos por Extranjería para conceder el visado de estudiante en España"
    },
    {
      icon: /* @__PURE__ */ jsx("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z",
          fill: "#1c4a8d"
        }
      ) }),
      title: "Válido para permisos de residencia",
      description: "Cubre todos los requisitos exigidos por Extranjería para conceder el visado de estudiante en España"
    },
    {
      icon: /* @__PURE__ */ jsx("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",
          fill: "#1c4a8d"
        }
      ) }),
      title: "Alta y certificado en 24h",
      description: "Póliza activa y certificado para Extranjería disponible en menos de 24 horas desde la contratación"
    },
    {
      icon: /* @__PURE__ */ jsx("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9h-3V8.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V11h-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h3v3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3h3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z",
          fill: "#1c4a8d"
        }
      ) }),
      title: "Cobertura médica completa",
      description: "Médico general, especialistas, urgencias 24h, hospitalización, pruebas diagnósticas y cirugía"
    },
    {
      icon: /* @__PURE__ */ jsx("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
          fill: "#1c4a8d"
        }
      ) }),
      title: "También para residentes",
      description: "Adeslas Health Residents: seguro anual renovable para extranjeros con NIE o permiso de residencia"
    },
    {
      icon: /* @__PURE__ */ jsx("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",
          fill: "#1c4a8d"
        }
      ) }),
      title: "+51.000 médicos",
      description: "Acceso al cuadro médico nacional de Adeslas en toda España, sin listas de espera"
    }
  ],
  cardName: "Adeslas Health Students",
  cardDescription: "Seguro médico para estudiantes extranjeros en España. Cubre todos los requisitos de Extranjería para el visado de estudios. Contratación desde 2 meses.",
  cardPill: "Estudiantes · hasta 35 años",
  cardPillDark: true,
  cardCoverages: [
    "Medicina general y especialistas",
    "Urgencias 24h en toda España",
    "Hospitalización y cirugía",
    "Pruebas diagnósticas e imagen",
    "Rehabilitación y fisioterapia",
    "Psicoterapia",
    "Telemedicina y videoconsultas",
    "Certificado oficial para visado de estudios",
    "Red nacional de más de 51.000 médicos"
  ],
  tabs: [
    {
      label: "Health Students",
      items: [
        "Desde 38€/mes para estudiantes extranjeros en España",
        "Contratación flexible: mínimo 2 meses, máximo 12 meses",
        "Cubre todos los requisitos de Extranjería para el visado de estudios",
        "Certificado oficial disponible en menos de 24 horas",
        "Medicina general, especialistas y urgencias 24h",
        "Hospitalización y cirugía cubiertos",
        "Pruebas diagnósticas: analíticas, radiografías, ecografías",
        "Rehabilitación, fisioterapia y psicoterapia",
        "Válido sin necesidad de tener NIE previo",
        "Puedes contratarlo desde tu país antes de llegar a España"
      ],
      /* Card override: Health Students */
      cardName: "Adeslas Health Students",
      cardDescription: "Seguro médico para estudiantes extranjeros en España. Válido para visado de estudios. Contratación desde 2 meses.",
      cardPrice: "38",
      cardPricePeriod: "mes",
      cardPill: "Estudiantes · hasta 35 años",
      cardPillDark: true,
      cardCoverages: [
        "Medicina general y especialistas",
        "Urgencias 24h en toda España",
        "Hospitalización y cirugía",
        "Pruebas diagnósticas e imagen",
        "Rehabilitación y fisioterapia",
        "Psicoterapia",
        "Telemedicina y videoconsultas",
        "Certificado oficial para visado de estudios",
        "Red nacional de más de 51.000 médicos"
      ]
    },
    {
      label: "Health Residents",
      items: [
        "Diseñado para extranjeros que fijan residencia en España",
        "Válido para obtener NIE y permiso de residencia",
        "Duración anual con renovación automática",
        "Sin copago en consultas y especialistas",
        "Sin períodos de carencia",
        "Medicina general, especialistas y urgencias 24h",
        "Hospitalización ilimitada en habitación individual",
        "Pruebas diagnósticas: analíticas, radiografías, TAC, resonancias",
        "Rehabilitación, fisioterapia y psicoterapia",
        "Certificado oficial para trámites de residencia"
      ],
      /* Card override: Health Residents */
      cardName: "Adeslas Health Residents",
      cardDescription: "Seguro médico para extranjeros residentes en España. Válido para NIE y permiso de residencia. Sin copago ni períodos de carencia.",
      cardPrice: "48,70",
      cardPricePeriod: "mes",
      cardPill: "Residentes · Precio según edad",
      cardPillDark: true,
      cardCoverages: [
        "Medicina general, especialistas y urgencias 24h",
        "Hospitalización ilimitada en habitación individual",
        "Pruebas diagnósticas: analíticas, radiografías, TAC, resonancias",
        "Rehabilitación, fisioterapia y psicoterapia",
        "Sin copago en consultas y especialistas",
        "Sin períodos de carencia",
        "Duración anual con renovación automática",
        "Certificado oficial para trámites de residencia",
        "Válido para NIE y permiso de residencia"
      ]
    },
    {
      label: "Documentación Extranjería",
      items: [
        "Certificado oficial de seguro médico privado para Extranjería",
        "Válido para visado de estudios (Health Students)",
        "Válido para NIE y permiso de residencia (Health Residents)",
        "Documento con todos los datos exigidos por Extranjería",
        "Disponible en formato digital y físico en menos de 24 horas",
        "Puedes contratarlo antes de llegar a España",
        "Válido en todas las oficinas de Extranjería de España"
      ]
    }
  ],
  faqs: [
    {
      q: "¿Qué es Adeslas Health Students y para quién es?",
      a: "Adeslas Health Students es el seguro médico de Adeslas diseñado específicamente para estudiantes extranjeros que necesitan un seguro médico privado para obtener su visado de estudios en España. Cubre todos los requisitos exigidos por Extranjería para la concesión del visado de estudiante. Tiene un precio de 38€/mes y se puede contratar desde 2 meses hasta un máximo de 12 meses."
    },
    {
      q: "¿Adeslas Health Students cumple los requisitos de Extranjería para el visado de estudios?",
      a: "Sí. Adeslas Health Students cubre exactamente todos los requisitos de cobertura médica exigidos por el Ministerio del Interior y las oficinas de Extranjería de España para conceder el visado de estudios: cobertura médica completa, urgencias, hospitalización y certificado oficial de seguro médico privado. Es uno de los seguros más aceptados por Extranjería."
    },
    {
      q: "¿Cuánto cuesta Adeslas Health Students?",
      a: "Adeslas Health Students tiene un precio desde 38€/mes para estudiantes jóvenes (hasta 35 años). La prima puede variar según la edad del asegurado. Se puede contratar por un mínimo de 2 meses y un máximo de 12 meses, ajustándose exactamente al período de tu visado o estancia de estudios en España."
    },
    {
      q: "¿Puedo contratar Adeslas Health Students por menos de un año?",
      a: "Sí. Adeslas Health Students permite contratar desde un mínimo de 2 meses hasta un máximo de 12 meses. Es la opción ideal si tu programa de estudios en España tiene una duración inferior a un año o si necesitas renovar el visado por períodos cortos."
    },
    {
      q: "¿Puedo contratar el seguro desde mi país antes de llegar a España?",
      a: "Sí. Puedes contratar Adeslas Health Students desde cualquier país antes de viajar a España. Es muy recomendable hacerlo con antelación para tener el certificado de seguro médico listo cuando presentes tu solicitud de visado de estudios en el consulado español de tu país."
    },
    {
      q: "¿Cuándo recibo el certificado para el visado de estudios?",
      a: "El certificado oficial de seguro médico para Extranjería está disponible en menos de 24 horas desde la formalización del contrato. El documento incluye todos los datos exigidos: número de póliza, datos del asegurado, cobertura, período de vigencia e importe. Se entrega en formato digital."
    },
    {
      q: "¿Puedo contratar si aún no tengo NIE?",
      a: "Sí. Puedes contratar Adeslas Health Students únicamente con tu pasaporte y datos personales. No necesitas tener NIE previo, ya que precisamente el seguro te sirve para obtenerlo o para tramitar el visado de estudios."
    },
    {
      q: "¿Qué cobertura médica incluye Adeslas Health Students?",
      a: /* @__PURE__ */ jsxs(Fragment, { children: [
        "Adeslas Health Students incluye: medicina general y todas las especialidades médicas, urgencias 24 horas en toda España, hospitalización y cirugía, pruebas diagnósticas (analíticas, radiografías, ecografías, TAC), rehabilitación y fisioterapia, psicoterapia, y acceso a la red de más de 51.000 médicos de Adeslas en todo el territorio nacional. Si después necesitas una cobertura más completa, puedes consultar ",
        /* @__PURE__ */ jsx(Link, { to: "/seguro-salud/adeslas-plena-total/", style: { color: "#009FE3", textDecoration: "underline" }, children: "nuestros seguros de salud" }),
        "."
      ] })
    },
    {
      q: "¿Qué diferencia hay entre Adeslas Health Students y Adeslas Health Residents?",
      a: "Adeslas Health Students está diseñado para estudiantes extranjeros con visado de estudios: precio fijo de 38€/mes, duración de 2 a 12 meses y no es renovable. Adeslas Health Residents está pensado para extranjeros que fijan residencia en España de forma más estable: duración anual, renovación automática, sin copago y sin períodos de carencia, válido para NIE y permiso de residencia."
    },
    {
      q: "¿Qué es Adeslas Health Residents y cuándo debo contratarlo?",
      a: "Adeslas Health Residents es el seguro médico anual y renovable de Adeslas para extranjeros que establecen su residencia habitual en España. Es el indicado cuando necesitas un seguro para obtener el NIE, la tarjeta de residencia o el permiso de residencia de larga duración. Incluye cobertura médica completa sin copago y sin períodos de carencia."
    },
    {
      q: "¿Adeslas Health Residents tiene copago o períodos de carencia?",
      a: "No. Adeslas Health Residents no tiene copago en ningún servicio médico y no aplica períodos de carencia, lo que significa que todas las coberturas están activas desde el primer día de la póliza."
    },
    {
      q: "¿El seguro cubre urgencias médicas en toda España?",
      a: "Sí. Tanto Adeslas Health Students como Adeslas Health Residents cubren urgencias médicas las 24 horas del día, los 365 días del año, en toda la red de centros Adeslas de España. Puedes acudir a urgencias sin cita previa en cualquier centro concertado."
    },
    {
      q: "¿Cómo contrato Adeslas Health Students o Health Residents?",
      a: "Puedes solicitar tu presupuesto y contratar directamente en esta página. Rellena el formulario con tus datos, elige el seguro que necesitas (Students o Residents) y la duración. Un asesor te contactará para completar la contratación y tendrás el certificado listo en menos de 24 horas."
    }
  ],
  schemaFaq: true,
  useWhatsAppCta: true,
  whatsAppMessage: "Hola, estoy interesado/a en el seguro para extranjeros de Adeslas y me gustaría conocer el precio",
  customTarificador: /* @__PURE__ */ jsx(TarificadorExtranjeros, { compact: true })
};
const AdeslaExtranjeros = () => /* @__PURE__ */ jsx(ProductPageTemplate, { data });

export { AdeslaExtranjeros as default };
