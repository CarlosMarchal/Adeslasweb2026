import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { H as Header, F as Footer } from '../main.mjs';
import { Check, Shield, Lock, User, Users, Heart, FileText, CreditCard, CheckCircle, X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import 'vite-react-ssg/single-page';
import '@tanstack/react-query';
import 'react-router-dom';
import 'next-themes';
import 'sonner';
import '@radix-ui/react-toast';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-tooltip';
import 'framer-motion';
import 'react-helmet-async';
import 'react-dom';

const personaVacia = () => ({
  nombre: "",
  apellidos: "",
  docType: "NIF",
  docNum: "",
  fechaNacimiento: "",
  genero: "Hombre",
  telefono: "",
  email: "",
  direccion: "",
  poblacion: "",
  cp: ""
});
const saludVacia = () => ({
  peso: "",
  altura: "",
  fumador: false,
  alcohol: false,
  corazon: false,
  hipertension: false,
  vascular: false,
  colesterol: false,
  respiratorio: false,
  diabetes: false,
  tiroides: false,
  renal: false,
  nervioso: false,
  psiquiatrica: false,
  digestivo: false,
  huesos: false,
  ocular: false,
  tumor: false,
  infecciosas: false,
  otras: false
});
const initialForm = {
  tomador: { ...personaVacia(), tipo: "Particular" },
  asegurados: [{ ...personaVacia(), mismoQueTomador: false, parentesco: "" }],
  salud: [saludVacia()],
  otraAseguradora: false,
  pago: { titular: "", iban: "" },
  aceptaCondiciones: false
};
const TOTAL_STEPS = 6;
function FormularioAlta() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const stepsMeta = [
    { num: 1, label: "TOMADOR", Icon: User },
    { num: 2, label: "ASEGURADOS", Icon: Users },
    { num: 3, label: "SALUD", Icon: Heart },
    { num: 4, label: "DOCS", Icon: FileText },
    { num: 5, label: "PAGO", Icon: CreditCard },
    { num: 6, label: "CONFIRMAR", Icon: CheckCircle }
  ];
  const updateTomador = (field, value) => setForm((f) => ({ ...f, tomador: { ...f.tomador, [field]: value } }));
  const updateAsegurado = (idx, field, value) => setForm((f) => {
    const asegurados = [...f.asegurados];
    asegurados[idx] = { ...asegurados[idx], [field]: value };
    return { ...f, asegurados };
  });
  const updateSalud = (idx, field, value) => setForm((f) => {
    const salud = [...f.salud];
    salud[idx] = { ...salud[idx], [field]: value };
    return { ...f, salud };
  });
  const copiarDatosTomador = (idx) => {
    const t = form.tomador;
    const campos = [
      "nombre",
      "apellidos",
      "docType",
      "docNum",
      "fechaNacimiento",
      "genero",
      "telefono",
      "email",
      "direccion",
      "poblacion",
      "cp"
    ];
    setForm((f) => {
      const asegurados = [...f.asegurados];
      const updated = { ...asegurados[idx] };
      campos.forEach((c) => {
        updated[c] = t[c];
      });
      updated.parentesco = "Titular";
      asegurados[idx] = updated;
      return { ...f, asegurados };
    });
  };
  const addAsegurado = () => {
    setForm((f) => ({
      ...f,
      asegurados: [...f.asegurados, { ...personaVacia(), mismoQueTomador: false, parentesco: "" }],
      salud: [...f.salud, saludVacia()]
    }));
  };
  const removeAsegurado = (idx) => {
    setForm((f) => ({
      ...f,
      asegurados: f.asegurados.filter((_, i) => i !== idx),
      salud: f.salud.filter((_, i) => i !== idx)
    }));
  };
  const isValidSpanishMobile = (tel) => /^[67]\d{8}$/.test(tel.replace(/\s/g, ""));
  const validatePersona = (p) => {
    if (!p.nombre || !p.apellidos || !p.docNum || !p.fechaNacimiento || !p.email || !p.direccion || !p.poblacion || !p.cp) return false;
    if (!p.telefono || !isValidSpanishMobile(p.telefono)) return false;
    return true;
  };
  const validate = () => {
    setError("");
    if (step === 1 && !validatePersona(form.tomador)) {
      const phoneOk = isValidSpanishMobile(form.tomador.telefono);
      setError(
        !phoneOk && form.tomador.telefono ? "El teléfono del tomador debe ser un móvil español (9 dígitos, empieza por 6 o 7)." : "Por favor, rellena todos los campos obligatorios antes de continuar."
      );
      return false;
    }
    if (step === 2) {
      for (const a of form.asegurados) {
        if (!validatePersona(a) || !a.parentesco) {
          const phoneOk = isValidSpanishMobile(a.telefono);
          setError(
            !phoneOk && a.telefono ? `El teléfono de ${a.nombre || "un asegurado"} debe ser un móvil español (empieza por 6 o 7).` : "Por favor, rellena todos los campos obligatorios de cada asegurado, incluido el parentesco."
          );
          return false;
        }
      }
    }
    if (step === 5 && (!form.pago.titular || !form.pago.iban)) {
      setError("Por favor, introduce el titular y el IBAN de la cuenta bancaria.");
      return false;
    }
    if (step === 6 && !form.aceptaCondiciones) {
      setError("Debes aceptar las condiciones generales para confirmar la solicitud.");
      return false;
    }
    return true;
  };
  const next = () => {
    if (!validate()) return;
    setError("");
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const prev = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const formatEmailBody = () => {
    const t = form.tomador;
    const tdStyle = "padding:8px 12px;border:1px solid #e2e8f0;";
    const thStyle = "padding:10px 12px;background:#f0f9ff;color:#0369a1;text-align:left;font-weight:600;border:1px solid #e2e8f0;";
    const aseguradosRows = form.asegurados.map((a, i) => {
      const s = form.salud[i] ?? saludVacia();
      const enf = [
        ["corazon", "Corazón"],
        ["hipertension", "Hipertensión"],
        ["vascular", "Vascular"],
        ["colesterol", "Colesterol"],
        ["respiratorio", "Respiratorio"],
        ["diabetes", "Diabetes"],
        ["tiroides", "Tiroides"],
        ["renal", "Renal"],
        ["nervioso", "Nervioso"],
        ["psiquiatrica", "Psiquiátrica"],
        ["digestivo", "Digestivo"],
        ["huesos", "Huesos"],
        ["ocular", "Ocular"],
        ["tumor", "Tumor"],
        ["infecciosas", "Infecciosas"],
        ["otras", "Otras"]
      ].filter(([k]) => s[k]).map(([, label]) => label).join(", ") || "Ninguna";
      const habitos = [s.fumador && "Fumador", s.alcohol && "Alcohol"].filter(Boolean).join(", ") || "Ninguno";
      return `
        <tr><td colspan="2" style="${thStyle}background:#dbeafe;">
          Asegurado ${i + 1}: ${a.nombre} ${a.apellidos} — ${a.parentesco}
        </td></tr>
        <tr><td style="${tdStyle}">Doc.</td><td style="${tdStyle}">${a.docType}: ${a.docNum}</td></tr>
        <tr><td style="${tdStyle}">Fecha nac.</td><td style="${tdStyle}">${a.fechaNacimiento}</td></tr>
        <tr><td style="${tdStyle}">Género</td><td style="${tdStyle}">${a.genero}</td></tr>
        <tr><td style="${tdStyle}">Teléfono</td><td style="${tdStyle}">${a.telefono}</td></tr>
        <tr><td style="${tdStyle}">Email</td><td style="${tdStyle}">${a.email}</td></tr>
        <tr><td style="${tdStyle}">Dirección</td><td style="${tdStyle}">${a.direccion}, ${a.poblacion} ${a.cp}</td></tr>
        <tr><td style="${tdStyle}">Peso / Altura</td><td style="${tdStyle}">${s.peso} kg / ${s.altura} cm</td></tr>
        <tr><td style="${tdStyle}">Hábitos</td><td style="${tdStyle}">${habitos}</td></tr>
        <tr><td style="${tdStyle}">Enfermedades (5a.)</td><td style="${tdStyle}">${enf}</td></tr>
      `;
    }).join("");
    return `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#1e293b;">
        <div style="background:#0891b2;padding:24px;text-align:center;border-radius:8px 8px 0 0;">
          <h1 style="color:white;margin:0;font-size:22px;letter-spacing:0.5px;">🏥 Nueva Solicitud de Alta — Adeslas</h1>
          <p style="color:#e0f2fe;margin:6px 0 0;font-size:14px;">Recibida el ${(/* @__PURE__ */ new Date()).toLocaleString("es-ES", { dateStyle: "full", timeStyle: "short" })}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:0;">
          <tr><th colspan="2" style="${thStyle}">TOMADOR</th></tr>
          <tr><td style="${tdStyle}width:35%">Tipo</td><td style="${tdStyle}">${t.tipo}</td></tr>
          <tr><td style="${tdStyle}">Nombre completo</td><td style="${tdStyle}">${t.nombre} ${t.apellidos}</td></tr>
          <tr><td style="${tdStyle}">Documento</td><td style="${tdStyle}">${t.docType}: ${t.docNum}</td></tr>
          <tr><td style="${tdStyle}">Fecha nacimiento</td><td style="${tdStyle}">${t.fechaNacimiento}</td></tr>
          <tr><td style="${tdStyle}">Género</td><td style="${tdStyle}">${t.genero}</td></tr>
          <tr><td style="${tdStyle}">Teléfono</td><td style="${tdStyle}">${t.telefono}</td></tr>
          <tr><td style="${tdStyle}">Email</td><td style="${tdStyle}">${t.email}</td></tr>
          <tr><td style="${tdStyle}">Dirección</td><td style="${tdStyle}">${t.direccion}, ${t.poblacion} ${t.cp}</td></tr>

          <tr><th colspan="2" style="${thStyle}">ASEGURADOS (${form.asegurados.length})</th></tr>
          ${aseguradosRows}

          <tr><th colspan="2" style="${thStyle}">DOCUMENTACIÓN</th></tr>
          <tr><td style="${tdStyle}">¿Viene de otra aseguradora?</td><td style="${tdStyle}">${form.otraAseguradora ? "✅ Sí" : "❌ No"}</td></tr>

          <tr><th colspan="2" style="${thStyle}">PAGO</th></tr>
          <tr><td style="${tdStyle}">Titular de la cuenta</td><td style="${tdStyle}">${form.pago.titular}</td></tr>
          <tr><td style="${tdStyle}">IBAN</td><td style="${tdStyle}font-family:monospace;">${form.pago.iban}</td></tr>
        </table>
        <div style="background:#dcfce7;border:1px solid #86efac;padding:16px;margin-top:16px;border-radius:8px;text-align:center;">
          <p style="margin:0;color:#166534;font-weight:600;">✅ El usuario ha aceptado las condiciones generales y el tratamiento de datos (RGPD)</p>
        </div>
        <p style="font-size:12px;color:#94a3b8;text-align:center;margin-top:16px;">
          Solicitud enviada desde adeslas.numero1salud.es — Marchal Aseguradores
        </p>
      </div>
    `;
  };
  const handleSubmit = async () => {
    if (!validate()) return;
    setSending(true);
    try {
      const res = await fetch("/api/enviar-alta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `Alta Adeslas — ${form.tomador.nombre} ${form.tomador.apellidos}`,
          html: formatEmailBody(),
          fromName: `${form.tomador.nombre} ${form.tomador.apellidos}`,
          replyTo: form.tomador.email
        })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Error desconocido");
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Error al enviar formulario:", err);
      setError("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo o llámanos al 91 710 50 00.");
    } finally {
      setSending(false);
    }
  };
  if (submitted) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsx(Check, { className: "w-10 h-10 text-green-600" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-3", children: "¡Solicitud enviada!" }),
      /* @__PURE__ */ jsxs("p", { className: "text-gray-500 mb-6 text-sm leading-relaxed", children: [
        "Hemos recibido tu solicitud de alta en Adeslas. Nuestro equipo se pondrá en contacto contigo en las próximas ",
        /* @__PURE__ */ jsx("strong", { children: "24 horas" }),
        " para confirmar todos los detalles."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-400", children: [
        "¿Tienes alguna duda? Llámanos al",
        " ",
        /* @__PURE__ */ jsx("a", { href: "tel:917105000", className: "font-bold text-cyan-600 hover:underline", children: "91 710 50 00" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 pt-6 border-t border-gray-100 text-xs text-gray-400", children: "Marchal Aseguradores · Agentes de Adeslas" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-cyan-600 font-semibold text-sm tracking-wide", children: [
        /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4" }),
        "CONTRATACIÓN SEGURA"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-green-600 text-sm font-medium", children: [
        /* @__PURE__ */ jsx(Lock, { className: "w-3.5 h-3.5" }),
        "SSL SEGURO"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto px-4 pt-8 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "relative flex items-start justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-5 left-5 right-5 h-px bg-gray-200" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute top-5 left-5 h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500",
          style: { width: `calc(${(step - 1) / (TOTAL_STEPS - 1) * 100}% - 0px)` }
        }
      ),
      stepsMeta.map(({ num, label, Icon }) => {
        const done = step > num;
        const active = step === num;
        return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center relative z-10 flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white ${done ? "border-indigo-500 bg-indigo-500 text-white" : active ? "border-cyan-500 text-cyan-500" : "border-gray-300 text-gray-400"}`, children: done ? /* @__PURE__ */ jsx(Check, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("span", { className: `text-xs mt-1.5 font-medium text-center leading-tight hidden sm:block ${active ? "text-cyan-600" : done ? "text-indigo-500" : "text-gray-400"}`, children: label })
        ] }, num);
      })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 pb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500",
            style: { width: `${step / TOTAL_STEPS * 100}%` }
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8", children: [
          step === 1 && /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-1", children: "¿Quién contrata el seguro?" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-6", children: "Datos del titular de la póliza" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 mb-6", children: ["Particular", "Autonomo", "Juridica"].map((tipo) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => updateTomador("tipo", tipo),
                className: `py-2.5 px-4 rounded-lg border-2 font-medium text-sm transition-all ${form.tomador.tipo === tipo ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-gray-200 text-gray-600 hover:border-gray-300"}`,
                children: tipo === "Autonomo" ? "Autónomo" : tipo === "Juridica" ? "Empresa" : tipo
              },
              tipo
            )) }),
            /* @__PURE__ */ jsx(PersonaForm, { data: form.tomador, id: "tomador", onChange: (f, v) => updateTomador(f, v) })
          ] }),
          step === 2 && /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-1", children: "¿Quiénes estarán asegurados?" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-6", children: "Personas con cobertura sanitaria" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-5", children: form.asegurados.map((a, i) => /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-xl p-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
                /* @__PURE__ */ jsxs("h3", { className: "font-semibold text-gray-800", children: [
                  "Asegurado ",
                  i + 1
                ] }),
                i > 0 && /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeAsegurado(i),
                    className: "text-red-400 hover:text-red-600 transition p-1 rounded-full hover:bg-red-50",
                    children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-5 cursor-pointer hover:bg-gray-100 transition select-none", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: a.mismoQueTomador,
                    onChange: (e) => {
                      updateAsegurado(i, "mismoQueTomador", e.target.checked);
                      if (e.target.checked) copiarDatosTomador(i);
                    },
                    className: "w-4 h-4 accent-cyan-500 shrink-0"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700", children: "Mismo que tomador" })
              ] }),
              /* @__PURE__ */ jsx(PersonaForm, { data: a, id: `aseg-${i}`, onChange: (f, v) => updateAsegurado(i, f, v) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Parentesco *" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: a.parentesco,
                    onChange: (e) => updateAsegurado(i, "parentesco", e.target.value),
                    className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "", children: "Seleccionar…" }),
                      /* @__PURE__ */ jsx("option", { value: "Titular", children: "Titular" }),
                      /* @__PURE__ */ jsx("option", { value: "Cónyuge", children: "Cónyuge" }),
                      /* @__PURE__ */ jsx("option", { value: "Hijo", children: "Hijo/a" }),
                      /* @__PURE__ */ jsx("option", { value: "Padre/Madre", children: "Padre / Madre" }),
                      /* @__PURE__ */ jsx("option", { value: "Otro", children: "Otro" })
                    ]
                  }
                )
              ] })
            ] }, i)) }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: addAsegurado,
                className: "mt-4 w-full border-2 border-dashed border-cyan-300 rounded-xl py-4 text-cyan-600 font-medium text-sm hover:border-cyan-400 hover:bg-cyan-50 transition flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                  "Añadir otro asegurado"
                ]
              }
            )
          ] }),
          step === 3 && /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-1", children: "Estado de salud" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-6", children: "Salud de cada asegurado" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-6", children: form.asegurados.map((a, i) => {
              const s = form.salud[i] ?? saludVacia();
              return /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-xl p-5", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-800 mb-5", children: a.nombre ? `${a.nombre} ${a.apellidos}` : `Asegurado ${i + 1}` }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 mb-5", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Peso (kg)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        placeholder: "70",
                        min: 20,
                        max: 300,
                        value: s.peso,
                        onChange: (e) => updateSalud(i, "peso", e.target.value),
                        className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Altura (cm)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "number",
                        placeholder: "175",
                        min: 50,
                        max: 250,
                        value: s.altura,
                        onChange: (e) => updateSalud(i, "altura", e.target.value),
                        className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700 mb-2", children: "Hábitos:" }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 mb-5", children: [["fumador", "Fumador"], ["alcohol", "Alcohol"]].map(([k, label]) => /* @__PURE__ */ jsx(CheckboxCard, { label, checked: s[k], onChange: (v) => updateSalud(i, k, v) }, k)) }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700 mb-2", children: "Enfermedades últimos 5 años:" }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: [
                  ["corazon", "Corazón"],
                  ["hipertension", "Hipertensión"],
                  ["vascular", "Vascular"],
                  ["colesterol", "Colesterol"],
                  ["respiratorio", "Respiratorio"],
                  ["diabetes", "Diabetes"],
                  ["tiroides", "Tiroides"],
                  ["renal", "Renal"],
                  ["nervioso", "Nervioso"],
                  ["psiquiatrica", "Psiquiátrica"],
                  ["digestivo", "Digestivo"],
                  ["huesos", "Huesos"],
                  ["ocular", "Ocular"],
                  ["tumor", "Tumor"],
                  ["infecciosas", "Infecciosas"],
                  ["otras", "Otras"]
                ].map(([k, label]) => /* @__PURE__ */ jsx(CheckboxCard, { label, checked: s[k], onChange: (v) => updateSalud(i, k, v), small: true }, k)) })
              ] }, i);
            }) })
          ] }),
          step === 4 && /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-1", children: "¿Vienes de otra aseguradora?" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-6", children: "Agiliza tu alta si ya tienes seguro" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              { value: false, label: "No, no procedo de otra aseguradora" },
              { value: true, label: "Sí, vengo de otra aseguradora" }
            ].map((opt) => /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setForm((f) => ({ ...f, otraAseguradora: opt.value })),
                className: `p-5 rounded-xl border-2 text-left transition-all ${form.otraAseguradora === opt.value ? "border-cyan-500 bg-cyan-50" : "border-gray-200 hover:border-gray-300"}`,
                children: [
                  /* @__PURE__ */ jsx("div", { className: `w-4 h-4 rounded-full border-2 mb-3 flex items-center justify-center ${form.otraAseguradora === opt.value ? "border-cyan-500" : "border-gray-300"}`, children: form.otraAseguradora === opt.value && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-cyan-500" }) }),
                  /* @__PURE__ */ jsx("span", { className: `text-sm font-medium ${form.otraAseguradora === opt.value ? "text-cyan-700" : "text-gray-600"}`, children: opt.label })
                ]
              },
              String(opt.value)
            )) })
          ] }),
          step === 5 && /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-1", children: "¿Cómo quieres pagar?" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-6", children: "Cuenta para domiciliar recibos" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Titular de la cuenta *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Nombre completo del titular",
                    value: form.pago.titular,
                    onChange: (e) => setForm((f) => ({ ...f, pago: { ...f.pago, titular: e.target.value } })),
                    className: "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "IBAN *" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "ES00 0000 0000 0000 0000 0000",
                    value: form.pago.iban,
                    onChange: (e) => setForm((f) => ({ ...f, pago: { ...f.pago, iban: e.target.value.toUpperCase() } })),
                    className: "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-1", children: "24 caracteres · ej: ES12 3456 7890 1234 5678 9012" })
              ] })
            ] })
          ] }),
          step === 6 && /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-1", children: "Confirma tu solicitud" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-6", children: "Revisa y acepta las condiciones" }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-5 mb-5 text-sm space-y-3 divide-y divide-gray-200", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "flex justify-between items-baseline mb-1", children: /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-xs uppercase tracking-wide font-medium", children: "Tomador" }) }),
                /* @__PURE__ */ jsxs("p", { className: "font-semibold text-gray-900", children: [
                  form.tomador.nombre,
                  " ",
                  form.tomador.apellidos
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-xs", children: [
                  form.tomador.email,
                  " · ",
                  form.tomador.telefono
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-3", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-gray-500 text-xs uppercase tracking-wide font-medium", children: [
                  "Asegurados (",
                  form.asegurados.length,
                  ")"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: form.asegurados.map((a, i) => /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium", children: [
                  a.nombre,
                  " ",
                  a.apellidos
                ] }, i)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "pt-3", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-xs uppercase tracking-wide font-medium", children: "Cuenta bancaria" }),
                /* @__PURE__ */ jsx("p", { className: "font-mono font-medium text-gray-800 mt-1 text-sm", children: form.pago.iban }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-xs", children: form.pago.titular })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 cursor-pointer p-4 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition select-none", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: form.aceptaCondiciones,
                  onChange: (e) => setForm((f) => ({ ...f, aceptaCondiciones: e.target.checked })),
                  className: "w-4 h-4 mt-0.5 accent-cyan-500 shrink-0"
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-700 leading-relaxed", children: [
                "Acepto las ",
                /* @__PURE__ */ jsx("a", { href: "#", className: "text-cyan-600 underline", children: "condiciones generales" }),
                ", la ",
                /* @__PURE__ */ jsx("a", { href: "#", className: "text-cyan-600 underline", children: "política de privacidad" }),
                " y el tratamiento de mis datos de salud. Declaro que toda la información es cierta y autorizo a Adeslas a tramitar mi alta."
              ] })
            ] })
          ] }),
          error && /* @__PURE__ */ jsxs("div", { className: "mt-5 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "shrink-0 mt-0.5", children: "⚠️" }),
            error
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-8 pt-6 border-t border-gray-100", children: [
            step > 1 ? /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: prev,
                className: "flex items-center gap-1.5 text-gray-500 hover:text-gray-800 font-medium text-sm transition",
                children: [
                  /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" }),
                  "Atrás"
                ]
              }
            ) : /* @__PURE__ */ jsx("div", {}),
            step < TOTAL_STEPS ? /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: next,
                className: "flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition shadow-sm",
                children: [
                  "Siguiente",
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
                ]
              }
            ) : /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: handleSubmit,
                disabled: sending,
                className: "flex items-center gap-2 px-8 py-3 bg-pink-600 hover:bg-pink-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg transition shadow-sm",
                children: sending ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                  "Enviando…"
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  "Confirmar Contratación",
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
                ] })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-gray-400 mt-4", children: "Marchal Aseguradores · Agentes exclusivos de Adeslas · Tus datos están protegidos" })
    ] })
  ] });
}
function PersonaForm({ data, id, onChange }) {
  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400";
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Juan",
            value: data.nombre,
            onChange: (e) => onChange("nombre", e.target.value),
            className: inputClass
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Apellidos *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Pérez García",
            value: data.apellidos,
            onChange: (e) => onChange("apellidos", e.target.value),
            className: inputClass
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Doc." }),
        /* @__PURE__ */ jsxs("select", { value: data.docType, onChange: (e) => onChange("docType", e.target.value), className: inputClass, children: [
          /* @__PURE__ */ jsx("option", { children: "NIF" }),
          /* @__PURE__ */ jsx("option", { children: "NIE" }),
          /* @__PURE__ */ jsx("option", { children: "Pasaporte" }),
          /* @__PURE__ */ jsx("option", { children: "CIF" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nº documento *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "12345678A",
            value: data.docNum,
            onChange: (e) => onChange("docNum", e.target.value.toUpperCase()),
            className: inputClass
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Fecha de nacimiento *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "date",
            value: data.fechaNacimiento,
            onChange: (e) => onChange("fechaNacimiento", e.target.value),
            className: inputClass
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Género" }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-5 pt-2.5", children: ["Hombre", "Mujer"].map((g) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer text-sm text-gray-700", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              name: `genero-${id}`,
              value: g,
              checked: data.genero === g,
              onChange: () => onChange("genero", g),
              className: "accent-cyan-500"
            }
          ),
          g
        ] }, g)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Teléfono *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            placeholder: "612 345 678",
            value: data.telefono,
            onChange: (e) => onChange("telefono", e.target.value),
            className: inputClass
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            placeholder: "email@ejemplo.com",
            value: data.email,
            onChange: (e) => onChange("email", e.target.value),
            className: inputClass
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Dirección *" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Calle, número, piso…",
          value: data.direccion,
          onChange: (e) => onChange("direccion", e.target.value),
          className: inputClass
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Población *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Madrid",
            value: data.poblacion,
            onChange: (e) => onChange("poblacion", e.target.value),
            className: inputClass
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "C.P. *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "28001",
            maxLength: 5,
            value: data.cp,
            onChange: (e) => onChange("cp", e.target.value),
            className: inputClass
          }
        )
      ] })
    ] })
  ] });
}
function CheckboxCard({ label, checked, onChange, small = false }) {
  return /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-2 rounded-lg border cursor-pointer transition select-none ${small ? "p-2 text-xs" : "p-3 text-sm"} ${checked ? "border-cyan-300 bg-cyan-50 text-cyan-700" : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"}`, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "checkbox",
        checked,
        onChange: (e) => onChange(e.target.checked),
        className: "w-3.5 h-3.5 accent-cyan-500 shrink-0"
      }
    ),
    label
  ] });
}

const FormularioDeAlta = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Formulario de Alta Adeslas | Marchal Aseguradores";
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(FormularioAlta, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};

export { FormularioDeAlta as default };
