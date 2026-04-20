import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, Phone, ChevronLeft, Lock, Calendar, User, Users, Heart, CreditCard, CheckCircle2, Shield, AlertCircle } from 'lucide-react';

const ENFERMEDADES = [
  ["corazon", "Corazón / cardiovascular"],
  ["hipertension", "Hipertensión arterial"],
  ["vascular", "Enfermedades vasculares"],
  ["colesterol", "Colesterol elevado"],
  ["respiratorio", "Enfermedades respiratorias"],
  ["diabetes", "Diabetes"],
  ["tiroides", "Tiroides"],
  ["renal", "Enfermedad renal"],
  ["nervioso", "Sistema nervioso"],
  ["psiquiatrica", "Trastornos psiquiátricos"],
  ["digestivo", "Aparato digestivo"],
  ["huesos", "Huesos / articulaciones"],
  ["ocular", "Enfermedades oculares"],
  ["tumor", "Tumor / cáncer"],
  ["infecciosas", "Enfermedades infecciosas"],
  ["otras", "Otras enfermedades"]
];
function validateIBAN(raw) {
  const iban = raw.replace(/[\s-]/g, "").toUpperCase();
  if (iban.length !== 24) return false;
  if (!iban.startsWith("ES")) return false;
  if (!/^[A-Z0-9]+$/.test(iban)) return false;
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));
  let mod = "";
  for (const ch of numeric) {
    mod = String(Number(mod + ch) % 97);
  }
  return Number(mod) === 1;
}
function formatIBANInput(raw) {
  const clean = raw.replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 24);
  return clean.match(/.{1,4}/g)?.join(" ") ?? clean;
}
function saludVacia() {
  return { peso: "", altura: "", fumador: false, alcohol: false, condiciones: [] };
}
function aseguradoVacio(edad) {
  return {
    nombre: "",
    apellidos: "",
    docType: "NIF",
    docNum: "",
    usarDniTitular: false,
    diaNac: "",
    mesNac: "",
    anioNac: "",
    genero: "",
    parentesco: "",
    edad
  };
}
function getFirstAvailableDate() {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + 2);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
const MONTH_NAMES_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];
function formatDateLabel(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d} de ${MONTH_NAMES_ES[m - 1]} de ${y}`;
}
const MESES = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];
function buildEmailHTML(form, params) {
  const td = "padding:8px 12px;border:1px solid #e2e8f0;font-size:13px;";
  const th = "padding:10px 12px;background:#f0f9ff;color:#0369a1;text-align:left;font-weight:700;border:1px solid #e2e8f0;font-size:13px;";
  const th2 = "padding:10px 12px;background:#dbeafe;color:#1e40af;text-align:left;font-weight:700;border:1px solid #e2e8f0;font-size:13px;";
  const aseguradosHtml = form.asegurados.map((a, i) => {
    const s = form.saludDetalle[i] ?? saludVacia();
    const enf = form.tieneCondiciones === "si" ? s.condiciones.length > 0 ? s.condiciones.map((k) => ENFERMEDADES.find(([id]) => id === k)?.[1] ?? k).join(", ") : "Ninguna declarada" : "No declara condiciones";
    return `
      <tr><td colspan="2" style="${th2}">
        Asegurado ${i + 1} (${a.parentesco || "Titular"}) — ${a.nombre} ${a.apellidos}
      </td></tr>
      <tr><td style="${td}width:35%">Documento</td><td style="${td}">${a.docNum ? `${a.docType}: ${a.docNum}` : "DNI del titular"}</td></tr>
      <tr><td style="${td}">Fecha nacimiento</td><td style="${td}">${a.diaNac}/${a.mesNac}/${a.anioNac}</td></tr>
      <tr><td style="${td}">Género</td><td style="${td}">${a.genero}</td></tr>
      ${form.tieneCondiciones === "si" ? `
      <tr><td style="${td}">Peso / Altura</td><td style="${td}">${s.peso ? s.peso + " kg" : "—"} / ${s.altura ? s.altura + " cm" : "—"}</td></tr>
      <tr><td style="${td}">Hábitos</td><td style="${td}">${[s.fumador && "Fumador", s.alcohol && "Alcohol"].filter(Boolean).join(", ") || "Ninguno"}</td></tr>
      <tr><td style="${td}">Condiciones (últ. 5 años)</td><td style="${td}">${enf}</td></tr>
      ` : ""}
    `;
  }).join("");
  const precio = params.precio.toFixed(2).replace(".", ",");
  const fecha = form.fechaInicio ? new Date(form.fechaInicio).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : "—";
  return `
    <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#1e293b;">
      <div style="background:linear-gradient(120deg,#002266 0%,#003087 50%,#0077B6 100%);padding:24px;text-align:center;border-radius:8px 8px 0 0;">
        <h1 style="color:white;margin:0;font-size:22px;">🏥 Nueva Solicitud de Alta — Adeslas</h1>
        <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">
          Recibida el ${(/* @__PURE__ */ new Date()).toLocaleString("es-ES", { dateStyle: "full", timeStyle: "short" })}
        </p>
      </div>

      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr><th colspan="2" style="${th}">PRODUCTO CONTRATADO</th></tr>
        <tr><td style="${td}width:35%">Producto</td><td style="${td}font-weight:700;color:#003087;">${params.productoNombre}</td></tr>
        <tr><td style="${td}">Precio mensual</td><td style="${td}font-size:16px;font-weight:700;color:#E4097D;">${precio} €/mes</td></tr>
        ${params.precioBase ? `<tr><td style="${td}">Precio sin descuento</td><td style="${td}text-decoration:line-through;color:#94a3b8;">${params.precioBase.toFixed(2).replace(".", ",")} €/mes (−10% familia)</td></tr>` : ""}
        <tr><td style="${td}">Provincia</td><td style="${td}">${params.provincia}</td></tr>
        <tr><td style="${td}">Fecha de inicio</td><td style="${td}">${fecha}</td></tr>
        <tr><td style="${td}">Viene de otra aseguradora</td><td style="${td}">${form.otraAseguradora ? "Sí" : "No"}</td></tr>

        <tr><th colspan="2" style="${th}">TOMADOR</th></tr>
        <tr><td style="${td}">Nombre completo</td><td style="${td}font-weight:600;">${form.nombre} ${form.apellidos}</td></tr>
        <tr><td style="${td}">Documento</td><td style="${td}">${form.docType}: ${form.docNum}</td></tr>
        <tr><td style="${td}">Fecha nacimiento</td><td style="${td}">${form.diaNac}/${form.mesNac}/${form.anioNac}</td></tr>
        <tr><td style="${td}">Género</td><td style="${td}">${form.genero}</td></tr>
        <tr><td style="${td}">Email</td><td style="${td}">${form.email}</td></tr>
        <tr><td style="${td}">Teléfono</td><td style="${td}">${form.telefono}</td></tr>
        <tr><td style="${td}">Dirección</td><td style="${td}">${form.direccion}, ${form.poblacion} (${form.cp})</td></tr>

        <tr><th colspan="2" style="${th}">ASEGURADOS (${form.asegurados.length})</th></tr>
        ${aseguradosHtml}

        <tr><th colspan="2" style="${th}">DATOS DE PAGO</th></tr>
        <tr><td style="${td}">Titular de la cuenta</td><td style="${td}">${form.ibanTitular}</td></tr>
        <tr><td style="${td}">IBAN</td><td style="${td}font-family:monospace;letter-spacing:1px;">${form.iban.replace(/[^A-Z0-9]/gi, "").replace(/.{4}/g, "$& ").trim()}</td></tr>
        <tr><td style="${td}">Modalidad de pago</td><td style="${td}">Mensual (domiciliación bancaria)</td></tr>
      </table>

      <div style="background:#dcfce7;border:1px solid #86efac;padding:16px;margin-top:16px;border-radius:8px;text-align:center;">
        <p style="margin:0;color:#166534;font-weight:700;font-size:14px;">
          ✅ El usuario ha aceptado las condiciones generales y el tratamiento de datos (RGPD)
        </p>
      </div>
      <p style="font-size:12px;color:#94a3b8;text-align:center;margin-top:16px;">
        Solicitud enviada desde adeslas.numero1salud.es
      </p>
    </div>
  `;
}
function ProgressBar({ step, total, label }) {
  const pct = Math.round(step / total * 100);
  return /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-gray-500", children: label }),
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400", children: [
        "Paso ",
        step,
        " de ",
        total
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-1.5 bg-gray-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-full rounded-full transition-all duration-500",
        style: { width: `${pct}%`, backgroundColor: "#009FE3" }
      }
    ) })
  ] });
}
function Field({
  label,
  error,
  hint,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1.5", children: label }),
    children,
    error && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-xs mt-1", style: { color: "#EF4444" }, children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3 flex-shrink-0" }),
      error
    ] }),
    !error && hint && /* @__PURE__ */ jsx("p", { className: "text-xs mt-1 text-gray-400", children: hint })
  ] });
}
const inputCls = "w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#009FE3]/30 focus:border-[#009FE3] bg-white transition-colors";
const selectCls = `${inputCls} bg-white cursor-pointer`;
const radioBtnCls = (active) => `flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all cursor-pointer text-center ${active ? "border-[#009FE3] bg-[#009FE3]/8 text-[#003087]" : "border-gray-200 text-gray-500 hover:border-gray-300"}`;
function CalendarPicker({ value, onChange }) {
  const minDate = useMemo(() => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + 2);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const maxDate = useMemo(() => {
    const d = /* @__PURE__ */ new Date();
    d.setMonth(d.getMonth() + 3);
    d.setHours(23, 59, 59, 999);
    return d;
  }, []);
  const [viewYear, setViewYear] = useState(minDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(minDate.getMonth());
  const DAY_HEADERS = ["L", "M", "X", "J", "V", "S", "D"];
  const firstDayOffset = useMemo(() => {
    const dow = new Date(viewYear, viewMonth, 1).getDay();
    return (dow + 6) % 7;
  }, [viewYear, viewMonth]);
  const daysInMonth = useMemo(
    () => new Date(viewYear, viewMonth + 1, 0).getDate(),
    [viewYear, viewMonth]
  );
  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };
  const canGoPrev = viewYear > minDate.getFullYear() || viewYear === minDate.getFullYear() && viewMonth > minDate.getMonth();
  const canGoNext = viewYear < maxDate.getFullYear() || viewYear === maxDate.getFullYear() && viewMonth < maxDate.getMonth();
  const toDateStr = (d) => `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const isDisabled = (d) => {
    const date = new Date(viewYear, viewMonth, d);
    return date < minDate || date > maxDate;
  };
  const isSelected = (d) => value === toDateStr(d);
  const isFirstAvailable = (d) => toDateStr(d) === `${minDate.getFullYear()}-${String(minDate.getMonth() + 1).padStart(2, "0")}-${String(minDate.getDate()).padStart(2, "0")}`;
  const isToday = (d) => {
    const t = /* @__PURE__ */ new Date();
    return d === t.getDate() && viewMonth === t.getMonth() && viewYear === t.getFullYear();
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: prevMonth,
          disabled: !canGoPrev,
          className: "w-8 h-8 flex items-center justify-center rounded-full transition-colors disabled:opacity-30 hover:bg-gray-100",
          "aria-label": "Mes anterior",
          children: "‹"
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-gray-700", children: [
        MONTH_NAMES_ES[viewMonth],
        " ",
        viewYear
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: nextMonth,
          disabled: !canGoNext,
          className: "w-8 h-8 flex items-center justify-center rounded-full transition-colors disabled:opacity-30 hover:bg-gray-100",
          "aria-label": "Mes siguiente",
          children: "›"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 mb-1", children: DAY_HEADERS.map((h) => /* @__PURE__ */ jsx("div", { className: "text-center text-xs font-semibold text-gray-400 py-1", children: h }, h)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-7 gap-y-0.5", children: [
      Array.from({ length: firstDayOffset }).map((_, i) => /* @__PURE__ */ jsx("div", {}, `e${i}`)),
      Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
        const disabled = isDisabled(d);
        const selected = isSelected(d);
        const first = isFirstAvailable(d) && !selected;
        const today = isToday(d);
        let cls = "relative h-9 w-9 mx-auto rounded-full text-sm transition-all flex items-center justify-center ";
        if (disabled) cls += "text-gray-300 cursor-not-allowed ";
        else if (selected) cls += "font-black text-white shadow-md ";
        else if (first) cls += "font-bold ring-2 ring-offset-1 ";
        else cls += "hover:bg-gray-100 text-gray-700 ";
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            disabled,
            onClick: () => !disabled && onChange(toDateStr(d)),
            className: cls,
            style: selected ? { backgroundColor: "#003087" } : first ? { color: "#009FE3", "--tw-ring-color": "#009FE3" } : void 0,
            children: [
              d,
              today && !selected && /* @__PURE__ */ jsx(
                "span",
                {
                  className: "absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                  style: { backgroundColor: disabled ? "#D1D5DB" : "#009FE3" }
                }
              )
            ]
          },
          d
        );
      })
    ] }),
    value && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "mt-3 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold",
        style: { backgroundColor: "#EFF6FF", color: "#003087" },
        children: [
          /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
          "Inicio: ",
          formatDateLabel(value)
        ]
      }
    )
  ] });
}
function FormularioContratacion({ params }) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    fechaInicio: getFirstAvailableDate(),
    nombre: params.nombre.trim().split(" ")[0] ?? "",
    apellidos: params.nombre.trim().split(" ").slice(1).join(" ") ?? "",
    docType: "NIF",
    docNum: "",
    diaNac: "",
    mesNac: "",
    anioNac: "",
    genero: "",
    email: params.email,
    telefono: params.telefono,
    asegurados: params.edades.map((e) => aseguradoVacio(e)),
    tieneCondiciones: null,
    saludDetalle: params.edades.map(() => saludVacia()),
    cp: "",
    poblacion: "",
    direccion: "",
    ibanTitular: `${params.nombre.trim().split(" ")[0] ?? ""} ${params.nombre.trim().split(" ").slice(1).join(" ") ?? ""}`.trim(),
    iban: "",
    otraAseguradora: false,
    aceptaCondiciones: false
  });
  const upd = useCallback((key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => {
      const n = { ...e };
      delete n[key];
      return n;
    });
  }, []);
  const updAsegurado = useCallback((idx, key, val) => {
    setForm((f) => {
      const arr = [...f.asegurados];
      arr[idx] = { ...arr[idx], [key]: val };
      return { ...f, asegurados: arr };
    });
    setErrors((e) => {
      const n = { ...e };
      delete n[`a${idx}_${key}`];
      return n;
    });
  }, []);
  const updSalud = useCallback((idx, key, val) => {
    setForm((f) => {
      const arr = [...f.saludDetalle];
      arr[idx] = { ...arr[idx], [key]: val };
      return { ...f, saludDetalle: arr };
    });
  }, []);
  const toggleCondicion = useCallback((idx, key) => {
    setForm((f) => {
      const arr = [...f.saludDetalle];
      const cur = arr[idx].condiciones;
      arr[idx] = {
        ...arr[idx],
        condiciones: cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key]
      };
      return { ...f, saludDetalle: arr };
    });
  }, []);
  const err = (key) => errors[key];
  const validateStep1 = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!form.apellidos.trim()) e.apellidos = "Los apellidos son obligatorios";
    if (!form.docNum.trim()) e.docNum = "El número de documento es obligatorio";
    if (!form.diaNac || !form.mesNac || !form.anioNac)
      e.fechaNac = "La fecha de nacimiento es obligatoria";
    if (!form.genero) e.genero = "Selecciona el género";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      e.email = "Introduce un email válido";
    if (!form.telefono.trim()) e.telefono = "El teléfono es obligatorio";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateStep2 = () => {
    const e = {};
    form.asegurados.forEach((a, i) => {
      if (!a.nombre.trim()) e[`a${i}_nombre`] = "Nombre obligatorio";
      if (!a.apellidos.trim()) e[`a${i}_apellidos`] = "Apellidos obligatorios";
      if (!a.usarDniTitular && !a.docNum.trim())
        e[`a${i}_docNum`] = "Documento obligatorio";
      if (!a.genero) e[`a${i}_genero`] = "Selecciona el género";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateStep3 = () => {
    if (form.tieneCondiciones === null) {
      setErrors({ salud: "Por favor, responde la pregunta de salud" });
      return false;
    }
    return true;
  };
  const validateStep4 = () => {
    const e = {};
    if (!form.cp.trim() || form.cp.length !== 5)
      e.cp = "Introduce un código postal válido (5 dígitos)";
    if (!form.poblacion.trim())
      e.poblacion = "La población es obligatoria";
    if (!form.direccion.trim())
      e.direccion = "La dirección es obligatoria";
    if (!form.ibanTitular.trim())
      e.ibanTitular = "El titular de la cuenta es obligatorio";
    if (!form.iban.trim())
      e.iban = "El IBAN es obligatorio";
    else if (!validateIBAN(form.iban))
      e.iban = "El IBAN no es válido. Comprueba que empieza por ES y tiene 24 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateStep5 = () => {
    if (!form.aceptaCondiciones) {
      setErrors({ condiciones: "Debes aceptar las condiciones generales" });
      return false;
    }
    return true;
  };
  const next = () => {
    let valid = true;
    if (step === 1) valid = validateStep1();
    if (step === 2) valid = validateStep2();
    if (step === 3) valid = validateStep3();
    if (step === 4) valid = validateStep4();
    if (!valid) return;
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const prev = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSubmit = async () => {
    if (!validateStep5()) return;
    setSending(true);
    try {
      const res = await fetch("/api/enviar-alta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `Alta Adeslas — ${form.nombre} ${form.apellidos} — ${params.productoNombre}`,
          html: buildEmailHTML(form, params),
          fromName: `${form.nombre} ${form.apellidos}`,
          replyTo: form.email
        })
      });
      if (!res.ok) throw new Error("Error de servidor");
      setStep(6);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrors({ submit: "No hemos podido enviar la solicitud. Por favor, inténtalo de nuevo o llámanos al 91 710 50 00." });
    } finally {
      setSending(false);
    }
  };
  const stepIcons = [Calendar, User, Users, Heart, CreditCard, CheckCircle2];
  const stepLabels = ["Resumen", "Tus datos", "Asegurados", "Salud", "Pago", "Revisión"];
  const precio = params.precio.toFixed(2).replace(".", ",");
  if (step === 6) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center p-4", style: { backgroundColor: "#EEF5FB" }, children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
          style: { backgroundColor: "#DCFCE7" },
          children: /* @__PURE__ */ jsx(Check, { className: "w-10 h-10", style: { color: "#16A34A" } })
        }
      ),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black mb-3", style: { color: "#003087" }, children: "¡Solicitud enviada!" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm leading-relaxed mb-2", children: [
        "Hemos recibido tu solicitud de alta en",
        " ",
        /* @__PURE__ */ jsx("strong", { className: "text-gray-700", children: params.productoNombre }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm leading-relaxed mb-6", children: [
        "Nuestro equipo se pondrá en contacto contigo en las próximas",
        " ",
        /* @__PURE__ */ jsx("strong", { className: "text-gray-700", children: "24 horas" }),
        " para confirmar todos los detalles."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600", children: [
        "📧 Recibirás un resumen en ",
        /* @__PURE__ */ jsx("strong", { children: form.email })
      ] }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "tel:917105000",
          className: "inline-flex items-center gap-2 font-bold text-lg",
          style: { color: "#009FE3" },
          children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }),
            "91 710 50 00"
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Adeslas · Sin compromiso" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen pb-16", style: { backgroundColor: "#EEF5FB" }, children: [
    /* @__PURE__ */ jsxs(
      "header",
      {
        className: "sticky top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6",
        style: { background: "linear-gradient(120deg,#002266 0%,#003087 50%,#0077B6 100%)" },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => window.history.back(),
                className: "w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-80",
                style: { backgroundColor: "rgba(255,255,255,0.15)" },
                "aria-label": "Volver",
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4 text-white" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-sm leading-tight", children: params.productoNombre }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: "rgba(255,255,255,0.7)" }, children: [
                precio,
                " €/mes · ",
                params.provincia
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Lock, { className: "w-3.5 h-3.5", style: { color: "rgba(255,255,255,0.7)" } }),
            /* @__PURE__ */ jsx("span", { className: "text-xs", style: { color: "rgba(255,255,255,0.7)" }, children: "Proceso seguro" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:917105000",
                className: "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white ml-2",
                style: { backgroundColor: "rgba(255,255,255,0.15)" },
                children: [
                  /* @__PURE__ */ jsx(Phone, { className: "w-3.5 h-3.5" }),
                  "91 710 50 00"
                ]
              }
            )
          ] })
        ]
      }
    ),
    step >= 1 && step <= 5 && /* @__PURE__ */ jsx("div", { className: "bg-white border-b border-gray-100 px-4 py-3 sm:px-6 sticky top-[56px] z-40", children: /* @__PURE__ */ jsx("div", { className: "max-w-xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between gap-1", children: [1, 2, 3, 4].map((s) => {
      const done = step > s;
      const active = step === s;
      const Icon = stepIcons[s];
      return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-8 h-8 rounded-full flex items-center justify-center transition-all",
            style: {
              backgroundColor: done ? "#16A34A" : active ? "#009FE3" : "#E5E7EB"
            },
            children: done ? /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-white" }) : /* @__PURE__ */ jsx(Icon, { className: `w-3.5 h-3.5 ${active ? "text-white" : "text-gray-400"}` })
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `text-[10px] font-semibold ${active ? "text-[#003087]" : done ? "text-green-600" : "text-gray-400"}`, children: stepLabels[s] })
      ] }, s);
    }) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto px-4 py-6 pb-24 sm:px-6", children: [
      step === 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black mb-1", style: { color: "#003087" }, children: "Tu seguro está listo 🎉" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-5", children: "Revisa el resumen y dinos cuándo quieres empezar." }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "rounded-2xl p-5 mb-5 text-white",
            style: { background: "linear-gradient(120deg,#002266 0%,#003087 50%,#0077B6 100%)" },
            children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold mb-1 opacity-75", children: params.provincia }),
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-black mb-2", children: params.productoNombre }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1 mb-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-black", children: precio.split(",")[0] }),
                /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold", children: [
                  ",",
                  precio.split(",")[1],
                  "€"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-sm opacity-70", children: "/mes" })
              ] }),
              params.precioBase && /* @__PURE__ */ jsxs("p", { className: "text-xs opacity-75 line-through", children: [
                "Sin descuento: ",
                params.precioBase.toFixed(2).replace(".", ","),
                " €/mes"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs mt-2 opacity-70", children: [
                params.edades.length,
                " ",
                params.edades.length === 1 ? "asegurado" : "asegurados",
                params.edades.length > 0 && ` · ${params.edades.join(", ")} años`
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-4 mb-4 shadow-sm", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-3", children: "📅 ¿Cuándo quieres que empiece tu seguro?" }),
          /* @__PURE__ */ jsx(
            CalendarPicker,
            {
              value: form.fechaInicio,
              onChange: (v) => upd("fechaInicio", v)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-5 text-xs text-gray-500 mb-3", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Shield, { className: "w-3.5 h-3.5 text-green-500" }),
            " 100% seguro"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Lock, { className: "w-3.5 h-3.5 text-blue-400" }),
            " SSL cifrado"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5 text-blue-400" }),
            " Sin compromiso"
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed bottom-0 left-0 right-0 z-50 px-4 py-3",
            style: {
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(8px)",
              borderTop: "1px solid #E5E7EB",
              boxShadow: "0 -4px 16px rgba(0,0,0,0.07)"
            },
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setStep(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  },
                  className: "w-full py-3.5 rounded-xl font-bold text-white text-base tracking-wide transition-all hover:opacity-90 active:scale-[0.98]",
                  style: { backgroundColor: "#E4097D" },
                  children: "Continuar con la contratación →"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 text-center mt-1.5", children: "Solo 4 pasos · Aproximadamente 3 minutos" })
            ] })
          }
        )
      ] }),
      step === 1 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(ProgressBar, { step: 1, total: 4, label: "Tus datos personales" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-black text-lg mb-4", style: { color: "#003087" }, children: "Tus datos personales" }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "rounded-xl p-3.5 mb-4",
              style: { backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE" },
              children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold mb-2", style: { color: "#1D4ED8" }, children: "🪪 Documento de identidad del tomador *" }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      className: selectCls,
                      style: { width: "8.5rem", flexShrink: 0 },
                      value: form.docType,
                      onChange: (e) => upd("docType", e.target.value),
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "NIF", children: "NIF / DNI" }),
                        /* @__PURE__ */ jsx("option", { value: "NIE", children: "NIE" }),
                        /* @__PURE__ */ jsx("option", { value: "Pasaporte", children: "Pasaporte" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      className: inputCls,
                      style: { flex: "1 1 auto", minWidth: 0, textTransform: "uppercase" },
                      value: form.docNum,
                      onChange: (e) => upd("docNum", e.target.value.toUpperCase().slice(0, 15)),
                      placeholder: form.docType === "NIF" ? "12345678A" : form.docType === "NIE" ? "X1234567A" : "Nº Pasaporte",
                      autoComplete: "off",
                      inputMode: "text"
                    }
                  )
                ] }),
                err("docNum") && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-xs mt-1.5", style: { color: "#EF4444" }, children: [
                  /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3 flex-shrink-0" }),
                  err("docNum")
                ] }),
                !err("docNum") && form.docType === "NIF" && /* @__PURE__ */ jsx("p", { className: "text-xs mt-1.5 text-gray-400", children: "Formato: 8 dígitos + letra (ej. 12345678A)" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(Field, { label: "Nombre *", error: err("nombre"), children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: inputCls,
              value: form.nombre,
              onChange: (e) => upd("nombre", e.target.value),
              placeholder: "Tu nombre",
              autoComplete: "given-name"
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "Apellidos *", error: err("apellidos"), children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: inputCls,
              value: form.apellidos,
              onChange: (e) => upd("apellidos", e.target.value),
              placeholder: "Tus apellidos",
              autoComplete: "family-name"
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "Fecha de nacimiento *", error: err("fechaNac"), children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: `${selectCls} flex-1`,
                value: form.diaNac,
                onChange: (e) => upd("diaNac", e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Día" }),
                  Array.from({ length: 31 }, (_, i) => i + 1).map((d) => /* @__PURE__ */ jsx("option", { value: String(d).padStart(2, "0"), children: d }, d))
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: `${selectCls} flex-[1.5]`,
                value: form.mesNac,
                onChange: (e) => upd("mesNac", e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Mes" }),
                  MESES.slice(1).map((m, i) => /* @__PURE__ */ jsx("option", { value: String(i + 1).padStart(2, "0"), children: m }, i + 1))
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "select",
              {
                className: `${selectCls} flex-1`,
                value: form.anioNac,
                onChange: (e) => upd("anioNac", e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Año" }),
                  Array.from({ length: 70 }, (_, i) => (/* @__PURE__ */ new Date()).getFullYear() - 18 - i).map((y) => /* @__PURE__ */ jsx("option", { value: String(y), children: y }, y))
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(Field, { label: "Género *", error: err("genero"), children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx("button", { className: radioBtnCls(form.genero === "Hombre"), onClick: () => upd("genero", "Hombre"), children: "Hombre" }),
            /* @__PURE__ */ jsx("button", { className: radioBtnCls(form.genero === "Mujer"), onClick: () => upd("genero", "Mujer"), children: "Mujer" })
          ] }) }),
          /* @__PURE__ */ jsx(
            Field,
            {
              label: "Email *",
              error: err("email"),
              hint: "Te enviaremos el resumen de tu póliza aquí",
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "email",
                  className: inputCls,
                  value: form.email,
                  onChange: (e) => upd("email", e.target.value.trim()),
                  placeholder: "tu@email.com",
                  autoComplete: "email",
                  inputMode: "email"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(Field, { label: "Teléfono *", error: err("telefono"), children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              className: inputCls,
              value: form.telefono,
              onChange: (e) => upd("telefono", e.target.value.replace(/\D/g, "").slice(0, 15)),
              placeholder: "600 000 000",
              autoComplete: "tel",
              inputMode: "numeric"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(NavButtons, { onPrev: prev, onNext: next })
      ] }),
      step === 2 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(ProgressBar, { step: 2, total: 4, label: "Datos de los asegurados" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4 mb-4", children: form.asegurados.map((a, i) => {
          const esMenor14 = a.edad < 14;
          const esTitular = i === 0;
          return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0",
                  style: { backgroundColor: esTitular ? "#003087" : "#009FE3" },
                  children: i + 1
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-800 text-sm", children: esTitular ? "Titular del seguro" : `Asegurado ${i + 1}` }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400", children: [
                  a.edad,
                  " años",
                  esMenor14 ? " · menor de 14 años" : ""
                ] })
              ] })
            ] }),
            esTitular && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  updAsegurado(0, "nombre", form.nombre);
                  updAsegurado(0, "apellidos", form.apellidos);
                  updAsegurado(0, "docType", form.docType);
                  updAsegurado(0, "docNum", form.docNum);
                  updAsegurado(0, "diaNac", form.diaNac);
                  updAsegurado(0, "mesNac", form.mesNac);
                  updAsegurado(0, "anioNac", form.anioNac);
                  updAsegurado(0, "genero", form.genero);
                },
                className: "w-full mb-3 py-2 text-xs font-semibold rounded-xl border border-dashed border-[#009FE3] text-[#009FE3] hover:bg-[#009FE3]/8 transition-colors",
                children: "↓ Copiar mis datos del paso anterior"
              }
            ),
            /* @__PURE__ */ jsx(Field, { label: "Nombre *", error: err(`a${i}_nombre`), children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: inputCls,
                value: a.nombre,
                onChange: (e) => updAsegurado(i, "nombre", e.target.value),
                placeholder: "Nombre",
                autoComplete: "off"
              }
            ) }),
            /* @__PURE__ */ jsx(Field, { label: "Apellidos *", error: err(`a${i}_apellidos`), children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: inputCls,
                value: a.apellidos,
                onChange: (e) => updAsegurado(i, "apellidos", e.target.value),
                placeholder: "Apellidos",
                autoComplete: "off"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1.5", children: "Documento de identidad *" }),
              esMenor14 && /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 mb-2 cursor-pointer", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    className: "rounded border-gray-300 text-[#009FE3] w-4 h-4",
                    checked: a.usarDniTitular,
                    onChange: (e) => updAsegurado(i, "usarDniTitular", e.target.checked)
                  }
                ),
                /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-600", children: [
                  "Usar el DNI del titular ",
                  /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "(menor sin DNI propio)" })
                ] })
              ] }),
              !a.usarDniTitular && /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    className: selectCls,
                    style: { width: "8.5rem", flexShrink: 0 },
                    value: a.docType,
                    onChange: (e) => updAsegurado(i, "docType", e.target.value),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "NIF", children: "NIF" }),
                      /* @__PURE__ */ jsx("option", { value: "NIE", children: "NIE" }),
                      /* @__PURE__ */ jsx("option", { value: "Pasaporte", children: "Pasaporte" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    className: inputCls,
                    style: { flex: "1 1 auto", minWidth: 0, textTransform: "uppercase" },
                    value: a.docNum,
                    onChange: (e) => updAsegurado(i, "docNum", e.target.value.toUpperCase().slice(0, 15)),
                    placeholder: "Nº documento"
                  }
                )
              ] }),
              a.usarDniTitular && /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "px-3 py-2.5 rounded-xl text-sm text-gray-500 border border-gray-200 bg-gray-50",
                  children: [
                    "Se usará el DNI del titular: ",
                    /* @__PURE__ */ jsx("strong", { children: form.docNum || "—" })
                  ]
                }
              ),
              err(`a${i}_docNum`) && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-xs mt-1", style: { color: "#EF4444" }, children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3" }),
                err(`a${i}_docNum`)
              ] })
            ] }),
            /* @__PURE__ */ jsx(Field, { label: "Fecha de nacimiento", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: `${selectCls} flex-1`,
                  value: a.diaNac,
                  onChange: (e) => updAsegurado(i, "diaNac", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Día" }),
                    Array.from({ length: 31 }, (_, d) => d + 1).map((d) => /* @__PURE__ */ jsx("option", { value: String(d).padStart(2, "0"), children: d }, d))
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: `${selectCls} flex-[1.5]`,
                  value: a.mesNac,
                  onChange: (e) => updAsegurado(i, "mesNac", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Mes" }),
                    MESES.slice(1).map((m, mi) => /* @__PURE__ */ jsx("option", { value: String(mi + 1).padStart(2, "0"), children: m }, mi + 1))
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: `${selectCls} flex-1`,
                  value: a.anioNac,
                  onChange: (e) => updAsegurado(i, "anioNac", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Año" }),
                    Array.from({ length: 90 }, (_, idx) => (/* @__PURE__ */ new Date()).getFullYear() - idx).map((y) => /* @__PURE__ */ jsx("option", { value: String(y), children: y }, y))
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx(Field, { label: "Género *", error: err(`a${i}_genero`), children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("button", { className: radioBtnCls(a.genero === "Hombre"), onClick: () => updAsegurado(i, "genero", "Hombre"), children: "Hombre" }),
              /* @__PURE__ */ jsx("button", { className: radioBtnCls(a.genero === "Mujer"), onClick: () => updAsegurado(i, "genero", "Mujer"), children: "Mujer" })
            ] }) }),
            !esTitular && /* @__PURE__ */ jsx(Field, { label: "Parentesco con el titular", children: /* @__PURE__ */ jsxs(
              "select",
              {
                className: selectCls,
                value: a.parentesco,
                onChange: (e) => updAsegurado(i, "parentesco", e.target.value),
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona..." }),
                  /* @__PURE__ */ jsx("option", { value: "Cónyuge", children: "Cónyuge / Pareja" }),
                  /* @__PURE__ */ jsx("option", { value: "Hijo", children: "Hijo/a" }),
                  /* @__PURE__ */ jsx("option", { value: "Padre/Madre", children: "Padre / Madre" }),
                  /* @__PURE__ */ jsx("option", { value: "Otro", children: "Otro familiar" })
                ]
              }
            ) })
          ] }, i);
        }) }),
        /* @__PURE__ */ jsx(NavButtons, { onPrev: prev, onNext: next })
      ] }),
      step === 3 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(ProgressBar, { step: 3, total: 4, label: "Declaración de salud" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm mb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-5", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                style: { backgroundColor: "#DBEAFE" },
                children: /* @__PURE__ */ jsx(Heart, { className: "w-5 h-5", style: { color: "#1D4ED8" } })
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "font-black text-lg leading-tight", style: { color: "#003087" }, children: "Declaración de salud" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Esta información es necesaria para la contratación. Adeslas cubre la mayoría de condiciones desde el primer día." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-gray-700 mb-3", children: "¿Alguno de los asegurados ha sido diagnosticado o tratado en los últimos 5 años por alguna enfermedad o condición médica?" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-2", children: [
            /* @__PURE__ */ jsxs(
              "label",
              {
                className: `flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${form.tieneCondiciones === "no" ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-gray-300"}`,
                children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      name: "salud",
                      className: "sr-only",
                      checked: form.tieneCondiciones === "no",
                      onChange: () => upd("tieneCondiciones", "no")
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${form.tieneCondiciones === "no" ? "border-green-500" : "border-gray-300"}`,
                      children: form.tieneCondiciones === "no" && /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-green-500" })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-800", children: "No, ninguno" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Todos los asegurados gozan de buena salud" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "label",
              {
                className: `flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${form.tieneCondiciones === "si" ? "border-[#009FE3] bg-[#009FE3]/8" : "border-gray-200 hover:border-gray-300"}`,
                children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "radio",
                      name: "salud",
                      className: "sr-only",
                      checked: form.tieneCondiciones === "si",
                      onChange: () => upd("tieneCondiciones", "si")
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${form.tieneCondiciones === "si" ? "border-[#009FE3]" : "border-gray-300"}`,
                      children: form.tieneCondiciones === "si" && /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-[#009FE3]" })
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-gray-800", children: "Sí, uno o más" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "Completaré los detalles a continuación" })
                  ] })
                ]
              }
            )
          ] }),
          err("salud") && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-xs mt-1 mb-3", style: { color: "#EF4444" }, children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3" }),
            err("salud")
          ] }),
          form.tieneCondiciones === "si" && /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-6", children: form.asegurados.map((a, i) => {
            const s = form.saludDetalle[i];
            return /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h4", { className: "font-bold text-sm text-gray-700 mb-3 border-t border-gray-100 pt-4", children: [
                i === 0 ? "Titular" : `Asegurado ${i + 1}`,
                a.nombre ? ` — ${a.nombre} ${a.apellidos}` : ""
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mb-3", children: [
                /* @__PURE__ */ jsx(Field, { label: "Peso (kg)", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    className: inputCls,
                    value: s.peso,
                    onChange: (e) => updSalud(i, "peso", e.target.value),
                    placeholder: "70",
                    min: 20,
                    max: 250,
                    inputMode: "numeric"
                  }
                ) }),
                /* @__PURE__ */ jsx(Field, { label: "Altura (cm)", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    className: inputCls,
                    value: s.altura,
                    onChange: (e) => updSalud(i, "altura", e.target.value),
                    placeholder: "170",
                    min: 50,
                    max: 250,
                    inputMode: "numeric"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mb-3", children: [
                /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer text-sm", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      className: "w-4 h-4 rounded border-gray-300 text-[#009FE3]",
                      checked: s.fumador,
                      onChange: (e) => updSalud(i, "fumador", e.target.checked)
                    }
                  ),
                  "Fumador/a"
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer text-sm", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      className: "w-4 h-4 rounded border-gray-300 text-[#009FE3]",
                      checked: s.alcohol,
                      onChange: (e) => updSalud(i, "alcohol", e.target.checked)
                    }
                  ),
                  "Consumo de alcohol"
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-gray-600 mb-2", children: "Marca las condiciones que aplican (últ. 5 años):" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-1.5", children: ENFERMEDADES.map(([key, label]) => /* @__PURE__ */ jsxs(
                "label",
                {
                  className: `flex items-center gap-2 p-2 rounded-lg border cursor-pointer text-xs transition-all ${s.condiciones.includes(key) ? "border-[#009FE3] bg-[#009FE3]/8 text-gray-800" : "border-gray-200 text-gray-600 hover:border-gray-300"}`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "checkbox",
                        className: "sr-only",
                        checked: s.condiciones.includes(key),
                        onChange: () => toggleCondicion(i, key)
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `w-3.5 h-3.5 rounded border flex-shrink-0 flex items-center justify-center ${s.condiciones.includes(key) ? "border-[#009FE3] bg-[#009FE3]" : "border-gray-300"}`,
                        children: s.condiciones.includes(key) && /* @__PURE__ */ jsx(Check, { className: "w-2 h-2 text-white" })
                      }
                    ),
                    label
                  ]
                },
                key
              )) })
            ] }, i);
          }) })
        ] }),
        /* @__PURE__ */ jsx(NavButtons, { onPrev: prev, onNext: next })
      ] }),
      step === 4 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(ProgressBar, { step: 4, total: 4, label: "Dirección y forma de pago" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-black text-lg mb-4", style: { color: "#003087" }, children: "Dirección de la póliza" }),
          /* @__PURE__ */ jsx(Field, { label: "Código postal *", error: err("cp"), children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: inputCls,
              value: form.cp,
              onChange: (e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                upd("cp", val);
              },
              placeholder: "28001",
              inputMode: "numeric",
              maxLength: 5
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "Población *", error: err("poblacion"), children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: inputCls,
              value: form.poblacion,
              onChange: (e) => upd("poblacion", e.target.value),
              placeholder: "Ciudad / Municipio",
              autoComplete: "address-level2"
            }
          ) }),
          /* @__PURE__ */ jsx(Field, { label: "Dirección completa *", error: err("direccion"), children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: inputCls,
              value: form.direccion,
              onChange: (e) => upd("direccion", e.target.value),
              placeholder: "Calle, número, piso...",
              autoComplete: "street-address"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-black text-lg mb-1", style: { color: "#003087" }, children: "Domiciliación bancaria" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 mb-4", children: [
            "Se emitirá un recibo mensual de ",
            /* @__PURE__ */ jsxs("strong", { children: [
              precio,
              " €"
            ] }),
            " el primer día de cada mes."
          ] }),
          /* @__PURE__ */ jsx(Field, { label: "Titular de la cuenta *", error: err("ibanTitular"), children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: inputCls,
              value: form.ibanTitular,
              onChange: (e) => upd("ibanTitular", e.target.value),
              placeholder: "Nombre del titular bancario",
              autoComplete: "name"
            }
          ) }),
          /* @__PURE__ */ jsx(
            Field,
            {
              label: "IBAN *",
              error: err("iban"),
              hint: !err("iban") ? "Formato: ES00 0000 0000 00 0000000000" : void 0,
              children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    className: `${inputCls} font-mono tracking-wider uppercase pr-10`,
                    value: form.iban,
                    onChange: (e) => {
                      const val = formatIBANInput(e.target.value);
                      upd("iban", val);
                    },
                    placeholder: "ES00 0000 0000 00 0000000000",
                    autoComplete: "off",
                    inputMode: "text",
                    maxLength: 29,
                    spellCheck: false
                  }
                ),
                form.iban && validateIBAN(form.iban) && /* @__PURE__ */ jsx(
                  CheckCircle2,
                  {
                    className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4",
                    style: { color: "#16A34A" }
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "mt-2 flex items-center justify-between p-3 rounded-xl text-sm",
              style: { backgroundColor: "#F0F9FF", border: "1px solid #BAE6FD" },
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: "Cuota mensual" }),
                /* @__PURE__ */ jsxs("span", { className: "font-black text-lg", style: { color: "#003087" }, children: [
                  precio,
                  " €/mes"
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-3 text-xs text-gray-500", children: [
            /* @__PURE__ */ jsx(Shield, { className: "w-3.5 h-3.5 text-green-500 flex-shrink-0" }),
            "Tus datos bancarios están cifrados y protegidos"
          ] })
        ] }),
        /* @__PURE__ */ jsx(NavButtons, { onPrev: prev, onNext: next })
      ] }),
      step === 5 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-black", style: { color: "#003087" }, children: "Revisa tu solicitud" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Comprueba que todo es correcto antes de confirmar." })
        ] }),
        /* @__PURE__ */ jsxs(SummaryCard, { title: "Producto", children: [
          /* @__PURE__ */ jsx(SummaryRow, { label: "Seguro", value: params.productoNombre, highlight: true }),
          /* @__PURE__ */ jsx(SummaryRow, { label: "Precio mensual", value: `${precio} €/mes`, highlight: true }),
          /* @__PURE__ */ jsx(SummaryRow, { label: "Provincia", value: params.provincia }),
          /* @__PURE__ */ jsx(
            SummaryRow,
            {
              label: "Fecha de inicio",
              value: new Date(form.fechaInicio).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(SummaryCard, { title: "Titular", children: [
          /* @__PURE__ */ jsx(SummaryRow, { label: "Nombre", value: `${form.nombre} ${form.apellidos}` }),
          /* @__PURE__ */ jsx(SummaryRow, { label: "Documento", value: `${form.docType}: ${form.docNum}` }),
          /* @__PURE__ */ jsx(SummaryRow, { label: "Fecha nac.", value: `${form.diaNac}/${form.mesNac}/${form.anioNac}` }),
          /* @__PURE__ */ jsx(SummaryRow, { label: "Email", value: form.email }),
          /* @__PURE__ */ jsx(SummaryRow, { label: "Teléfono", value: form.telefono })
        ] }),
        /* @__PURE__ */ jsx(SummaryCard, { title: `Asegurados (${form.asegurados.length})`, children: form.asegurados.map((a, i) => /* @__PURE__ */ jsx(
          SummaryRow,
          {
            label: i === 0 ? "Titular" : a.parentesco || `Asegurado ${i + 1}`,
            value: `${a.nombre} ${a.apellidos} (${a.edad} años)`
          },
          i
        )) }),
        /* @__PURE__ */ jsx(SummaryCard, { title: "Declaración de salud", children: /* @__PURE__ */ jsx(
          SummaryRow,
          {
            label: "Condiciones previas",
            value: form.tieneCondiciones === "no" ? "Ninguna declarada" : "Sí, declaradas"
          }
        ) }),
        /* @__PURE__ */ jsxs(SummaryCard, { title: "Forma de pago", children: [
          /* @__PURE__ */ jsx(SummaryRow, { label: "Titular cuenta", value: form.ibanTitular }),
          /* @__PURE__ */ jsx(
            SummaryRow,
            {
              label: "IBAN",
              value: `****${form.iban.replace(/\s/g, "").slice(-4)}`
            }
          ),
          /* @__PURE__ */ jsx(SummaryRow, { label: "Modalidad", value: "Mensual · Domiciliación bancaria" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-sm mb-4", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                className: "mt-0.5 w-4 h-4 rounded border-gray-300 text-[#009FE3] flex-shrink-0",
                checked: form.aceptaCondiciones,
                onChange: (e) => upd("aceptaCondiciones", e.target.checked)
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-600 leading-relaxed", children: [
              "He leído y acepto las",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://adeslas.numero1salud.es/condiciones-generales/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "font-semibold underline",
                  style: { color: "#009FE3" },
                  onClick: (e) => e.stopPropagation(),
                  children: "Condiciones Generales"
                }
              ),
              ", la",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://adeslas.numero1salud.es/politica-de-privacidad/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "font-semibold underline",
                  style: { color: "#009FE3" },
                  onClick: (e) => e.stopPropagation(),
                  children: "Política de Privacidad"
                }
              ),
              " ",
              "y el tratamiento de mis datos conforme al RGPD."
            ] })
          ] }),
          err("condiciones") && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-xs mt-2", style: { color: "#EF4444" }, children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3" }),
            err("condiciones")
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white rounded-2xl p-5 shadow-sm mb-5", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              className: "w-4 h-4 rounded border-gray-300 text-[#009FE3]",
              checked: form.otraAseguradora,
              onChange: (e) => upd("otraAseguradora", e.target.checked)
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600", children: "Actualmente tengo seguro médico con otra compañía" })
        ] }) }),
        err("submit") && /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center gap-2 p-4 rounded-xl mb-4 text-sm",
            style: { backgroundColor: "#FEF2F2", color: "#991B1B", border: "1px solid #FECACA" },
            children: [
              /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 flex-shrink-0" }),
              err("submit")
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleSubmit,
              disabled: sending,
              className: "w-full py-4 rounded-2xl font-bold text-white text-base tracking-wide transition-all hover:opacity-90 active:scale-[0.98] shadow-lg disabled:opacity-50",
              style: { backgroundColor: "#E4097D" },
              children: sending ? /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" }),
                "Enviando solicitud..."
              ] }) : "Confirmar y contratar →"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: prev,
              className: "w-full py-3 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors",
              children: "← Editar datos"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-gray-400 mt-3", children: "🔒 Proceso 100% seguro · Tus datos están protegidos" })
      ] })
    ] })
  ] });
}
function NavButtons({
  onPrev,
  onNext,
  nextLabel = "Siguiente →"
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed bottom-0 left-0 right-0 z-50 px-4 py-3",
      style: {
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid #E5E7EB",
        boxShadow: "0 -4px 16px rgba(0,0,0,0.07)"
      },
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-xl mx-auto flex gap-3", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: onPrev,
            className: "flex items-center gap-1.5 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-300 transition-colors",
            children: [
              /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" }),
              "Atrás"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onNext,
            className: "flex-1 py-3 rounded-xl font-bold text-white text-sm tracking-wide transition-all hover:opacity-90 active:scale-[0.98]",
            style: { backgroundColor: "#E4097D" },
            children: nextLabel
          }
        )
      ] })
    }
  );
}
function SummaryCard({ title, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl overflow-hidden shadow-sm mb-3", children: [
    /* @__PURE__ */ jsx("div", { className: "px-4 py-2.5 font-bold text-sm", style: { backgroundColor: "#F0F9FF", color: "#0369A1" }, children: title }),
    /* @__PURE__ */ jsx("div", { className: "px-4 py-2 divide-y divide-gray-50", children })
  ] });
}
function SummaryRow({ label, value, highlight }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2 gap-3", children: [
    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 flex-shrink-0", children: label }),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: `text-xs text-right ${highlight ? "font-black text-base" : "font-semibold text-gray-800"}`,
        style: highlight ? { color: "#003087" } : void 0,
        children: value
      }
    )
  ] });
}

function ContratarPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const producto = searchParams.get("producto") ?? "";
  const productoNombre = searchParams.get("productoNombre") ?? "Seguro Adeslas";
  const precioStr = searchParams.get("precio") ?? "0";
  const precioBaseStr = searchParams.get("precioBase") ?? "";
  const descuentoStr = searchParams.get("descuento") ?? "";
  const nombre = searchParams.get("nombre") ?? "";
  const email = searchParams.get("email") ?? "";
  const telefono = searchParams.get("telefono") ?? "";
  const edadesStr = searchParams.get("edades") ?? "";
  const provincia = searchParams.get("provincia") ?? "";
  const precio = parseFloat(precioStr) || 0;
  const precioBase = precioBaseStr ? parseFloat(precioBaseStr) : void 0;
  const descuento = descuentoStr ? parseFloat(descuentoStr) : void 0;
  const edades = edadesStr ? edadesStr.split(",").map(Number).filter((n) => !isNaN(n)) : [];
  useEffect(() => {
    document.title = `Contratar ${productoNombre} | Marchal Aseguradores`;
    if (!producto || precio <= 0) {
      navigate("/", { replace: true });
    }
  }, [producto, precio, productoNombre, navigate]);
  if (!producto || precio <= 0) return null;
  return /* @__PURE__ */ jsx(
    FormularioContratacion,
    {
      params: {
        producto,
        productoNombre,
        precio,
        precioBase,
        descuento,
        nombre,
        email,
        telefono,
        edades,
        provincia
      }
    }
  );
}

export { ContratarPage as default };
