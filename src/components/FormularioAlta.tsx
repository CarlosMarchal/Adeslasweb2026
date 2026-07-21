'use client';

import { useState } from 'react';
import {
  Check, ChevronRight, ChevronLeft, Plus, User, Users,
  Heart, FileText, CreditCard, CheckCircle, Shield, Lock, X,
  Upload, Paperclip, CalendarDays,
} from 'lucide-react';
import { trackGenerateLead } from '@/lib/tracking';

// El envío de email se gestiona en el servidor:
// → app/api/enviar-alta/route.ts (Nodemailer + Gmail SMTP)
// Las credenciales van en .env.local (nunca en el cliente)

// -------------------- Types -------------------------
type TipoContratante = 'Particular' | 'Autonomo' | 'Juridica';
type TipoDoc = 'NIF' | 'NIE' | 'Pasaporte' | 'CIF';
type Genero = 'Hombre' | 'Mujer';
type Parentesco = '' | 'Titular' | 'Cónyuge' | 'Hijo' | 'Padre/Madre' | 'Otro';

interface PersonaBase {
  nombre: string;
  apellidos: string;
  docType: TipoDoc;
  docNum: string;
  fechaNacimiento: string;
  genero: Genero;
  telefono: string;
  email: string;
  direccion: string;
  poblacion: string;
  cp: string;
}

interface Tomador extends PersonaBase {
  tipo: TipoContratante;
}

interface Asegurado extends PersonaBase {
  mismoQueTomador: boolean;
  parentesco: Parentesco;
}

interface SaludAsegurado {
  peso: string;
  altura: string;
  fumador: boolean;
  alcohol: boolean;
  corazon: boolean;
  hipertension: boolean;
  vascular: boolean;
  colesterol: boolean;
  respiratorio: boolean;
  diabetes: boolean;
  tiroides: boolean;
  renal: boolean;
  nervioso: boolean;
  psiquiatrica: boolean;
  digestivo: boolean;
  huesos: boolean;
  ocular: boolean;
  tumor: boolean;
  infecciosas: boolean;
  otras: boolean;
}

interface DocsAdjuntos {
  tarjetas: File[];      // Tarjeta(s) sanitaria(s) de la aseguradora anterior
  recibo: File | null;   // Recibo bancario del último pago del seguro anterior
}

interface FormState {
  tomador: Tomador;
  asegurados: Asegurado[];
  salud: SaludAsegurado[];
  otraAseguradora: boolean;
  docs: DocsAdjuntos;
  fechaAlta: string;     // Fecha deseada de entrada en vigor del seguro
  pago: { titular: string; iban: string };
  aceptaCondiciones: boolean;
}

// -------------------- Initial values ----------------
const personaVacia = (): PersonaBase => ({
  nombre: '', apellidos: '', docType: 'NIF', docNum: '',
  fechaNacimiento: '', genero: 'Hombre',
  telefono: '', email: '', direccion: '', poblacion: '', cp: '',
});

const saludVacia = (): SaludAsegurado => ({
  peso: '', altura: '',
  fumador: false, alcohol: false,
  corazon: false, hipertension: false, vascular: false, colesterol: false,
  respiratorio: false, diabetes: false, tiroides: false, renal: false,
  nervioso: false, psiquiatrica: false, digestivo: false, huesos: false,
  ocular: false, tumor: false, infecciosas: false, otras: false,
});

const initialForm: FormState = {
  tomador: { ...personaVacia(), tipo: 'Particular' },
  asegurados: [{ ...personaVacia(), mismoQueTomador: false, parentesco: '' }],
  salud: [saludVacia()],
  otraAseguradora: false,
  docs: { tarjetas: [], recibo: null },
  fechaAlta: '',
  pago: { titular: '', iban: '' },
  aceptaCondiciones: false,
};

const TOTAL_STEPS = 6;

// Límites de adjuntos (Vercel limita el body a ~4,5 MB)
const MAX_FILE_MB = 3;
const MAX_TOTAL_MB = 4;
const ACCEPTED_TYPES = 'image/jpeg,image/png,image/webp,image/heic,application/pdf';

/** Mañana en formato YYYY-MM-DD (mínimo para la fecha de alta) */
const minFechaAlta = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

// ================================================================
// MAIN COMPONENT
// ================================================================
export default function FormularioAlta() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const stepsMeta = [
    { num: 1, label: 'TOMADOR',    Icon: User },
    { num: 2, label: 'ASEGURADOS', Icon: Users },
    { num: 3, label: 'SALUD',      Icon: Heart },
    { num: 4, label: 'DOCS',       Icon: FileText },
    { num: 5, label: 'PAGO',       Icon: CreditCard },
    { num: 6, label: 'CONFIRMAR',  Icon: CheckCircle },
  ];

  // -------------------- Helpers -----------------------
  const updateTomador = (field: keyof Tomador, value: string) =>
    setForm(f => ({ ...f, tomador: { ...f.tomador, [field]: value } }));

  const updateAsegurado = (idx: number, field: keyof Asegurado, value: unknown) =>
    setForm(f => {
      const asegurados = [...f.asegurados];
      asegurados[idx] = { ...asegurados[idx], [field]: value };
      return { ...f, asegurados };
    });

  const updateSalud = (idx: number, field: keyof SaludAsegurado, value: unknown) =>
    setForm(f => {
      const salud = [...f.salud];
      salud[idx] = { ...salud[idx], [field]: value };
      return { ...f, salud };
    });

  const copiarDatosTomador = (idx: number) => {
    const t = form.tomador;
    const campos: (keyof PersonaBase)[] = [
      'nombre', 'apellidos', 'docType', 'docNum', 'fechaNacimiento',
      'genero', 'telefono', 'email', 'direccion', 'poblacion', 'cp',
    ];
    setForm(f => {
      const asegurados = [...f.asegurados];
      const updated = { ...asegurados[idx] };
      campos.forEach(c => { (updated as Record<string, unknown>)[c] = t[c]; });
      updated.parentesco = 'Titular';
      asegurados[idx] = updated;
      return { ...f, asegurados };
    });
  };

  const addAsegurado = () => {
    setForm(f => ({
      ...f,
      asegurados: [...f.asegurados, { ...personaVacia(), mismoQueTomador: false, parentesco: '' }],
      salud: [...f.salud, saludVacia()],
    }));
  };

  const removeAsegurado = (idx: number) => {
    setForm(f => ({
      ...f,
      asegurados: f.asegurados.filter((_, i) => i !== idx),
      salud: f.salud.filter((_, i) => i !== idx),
    }));
  };

  // -------------------- Adjuntos ----------------------
  const totalDocsMB = (docs: DocsAdjuntos): number => {
    const bytes = docs.tarjetas.reduce((acc, f) => acc + f.size, 0) + (docs.recibo?.size ?? 0);
    return bytes / (1024 * 1024);
  };

  /** Valida tamaño individual y total antes de aceptar un archivo */
  const validaArchivo = (file: File, docs: DocsAdjuntos): string | null => {
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      return `"${file.name}" supera los ${MAX_FILE_MB} MB. Reduce su tamaño o haz una foto con menos resolución.`;
    }
    if (totalDocsMB(docs) + file.size / (1024 * 1024) > MAX_TOTAL_MB) {
      return `El conjunto de archivos supera los ${MAX_TOTAL_MB} MB. Elimina alguno o usa archivos más ligeros.`;
    }
    return null;
  };

  const addTarjetas = (files: FileList | null) => {
    if (!files) return;
    setError('');
    for (const file of Array.from(files)) {
      const err = validaArchivo(file, form.docs);
      if (err) { setError(err); return; }
    }
    setForm(f => ({ ...f, docs: { ...f.docs, tarjetas: [...f.docs.tarjetas, ...Array.from(files)] } }));
  };

  const removeTarjeta = (idx: number) =>
    setForm(f => ({ ...f, docs: { ...f.docs, tarjetas: f.docs.tarjetas.filter((_, i) => i !== idx) } }));

  const setRecibo = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setError('');
    const err = validaArchivo(file, { ...form.docs, recibo: null });
    if (err) { setError(err); return; }
    setForm(f => ({ ...f, docs: { ...f.docs, recibo: file } }));
  };

  const removeRecibo = () =>
    setForm(f => ({ ...f, docs: { ...f.docs, recibo: null } }));

  // -------------------- Validation --------------------
  /** Móvil español válido: 9 dígitos empezando por 6 o 7 */
  const isValidSpanishMobile = (tel: string) => /^[67]\d{8}$/.test(tel.replace(/\s/g, ''));

  const validatePersona = (p: PersonaBase) => {
    if (!p.nombre || !p.apellidos || !p.docNum || !p.fechaNacimiento || !p.email || !p.direccion || !p.poblacion || !p.cp) return false;
    if (!p.telefono || !isValidSpanishMobile(p.telefono)) return false;
    return true;
  };

  const validate = (): boolean => {
    setError('');
    if (step === 1 && !validatePersona(form.tomador)) {
      const phoneOk = isValidSpanishMobile(form.tomador.telefono);
      setError(
        !phoneOk && form.tomador.telefono
          ? 'El teléfono del tomador debe ser un móvil español (9 dígitos, empieza por 6 o 7).'
          : 'Por favor, rellena todos los campos obligatorios antes de continuar.'
      );
      return false;
    }
    if (step === 2) {
      for (const a of form.asegurados) {
        if (!validatePersona(a) || !a.parentesco) {
          const phoneOk = isValidSpanishMobile(a.telefono);
          setError(
            !phoneOk && a.telefono
              ? `El teléfono de ${a.nombre || 'un asegurado'} debe ser un móvil español (empieza por 6 o 7).`
              : 'Por favor, rellena todos los campos obligatorios de cada asegurado, incluido el parentesco.'
          );
          return false;
        }
      }
    }
    if (step === 5 && (!form.pago.titular || !form.pago.iban)) {
      setError('Por favor, introduce el titular y el IBAN de la cuenta bancaria.');
      return false;
    }
    if (step === 6) {
      if (!form.fechaAlta) {
        setError('Indica la fecha en la que quieres que tu seguro entre en vigor.');
        return false;
      }
      if (form.fechaAlta < minFechaAlta()) {
        setError('La fecha de alta debe ser una fecha futura.');
        return false;
      }
      if (!form.aceptaCondiciones) {
        setError('Debes aceptar las condiciones generales para confirmar la solicitud.');
        return false;
      }
    }
    return true;
  };

  // -------------------- Navigation --------------------
  const next = () => {
    if (!validate()) return;
    setError('');
    setStep(s => Math.min(s + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prev = () => {
    setError('');
    setStep(s => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -------------------- Email body --------------------
  const formatEmailBody = (): string => {
    const t = form.tomador;
    const tdStyle = 'padding:8px 12px;border:1px solid #e2e8f0;';
    const thStyle = 'padding:10px 12px;background:#f0f9ff;color:#0369a1;text-align:left;font-weight:600;border:1px solid #e2e8f0;';

    const aseguradosRows = form.asegurados.map((a, i) => {
      const s = form.salud[i] ?? saludVacia();
      const enf = ([
        ['corazon', 'Corazón'], ['hipertension', 'Hipertensión'], ['vascular', 'Vascular'],
        ['colesterol', 'Colesterol'], ['respiratorio', 'Respiratorio'], ['diabetes', 'Diabetes'],
        ['tiroides', 'Tiroides'], ['renal', 'Renal'], ['nervioso', 'Nervioso'],
        ['psiquiatrica', 'Psiquiátrica'], ['digestivo', 'Digestivo'], ['huesos', 'Huesos'],
        ['ocular', 'Ocular'], ['tumor', 'Tumor'], ['infecciosas', 'Infecciosas'], ['otras', 'Otras'],
      ] as [keyof SaludAsegurado, string][])
        .filter(([k]) => s[k])
        .map(([, label]) => label)
        .join(', ') || 'Ninguna';

      const habitos = [s.fumador && 'Fumador', s.alcohol && 'Alcohol'].filter(Boolean).join(', ') || 'Ninguno';

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
    }).join('');

    return `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#1e293b;">
        <div style="background:#0891b2;padding:24px;text-align:center;border-radius:8px 8px 0 0;">
          <h1 style="color:white;margin:0;font-size:22px;letter-spacing:0.5px;">🏥 Nueva Solicitud de Alta — Adeslas</h1>
          <p style="color:#e0f2fe;margin:6px 0 0;font-size:14px;">Recibida el ${new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}</p>
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

          <tr><th colspan="2" style="${thStyle}">FECHA DE ALTA</th></tr>
          <tr><td style="${tdStyle}">Fecha de alta deseada</td><td style="${tdStyle}font-weight:600;">${
            form.fechaAlta
              ? new Date(form.fechaAlta + 'T00:00:00').toLocaleDateString('es-ES', { dateStyle: 'full' })
              : '—'
          }</td></tr>

          <tr><th colspan="2" style="${thStyle}">DOCUMENTACIÓN</th></tr>
          <tr><td style="${tdStyle}">¿Viene de otra aseguradora?</td><td style="${tdStyle}">${form.otraAseguradora ? '✅ Sí' : '❌ No'}</td></tr>
          ${form.otraAseguradora ? `
          <tr><td style="${tdStyle}">Tarjeta sanitaria</td><td style="${tdStyle}">${
            form.docs.tarjetas.length
              ? `📎 ${form.docs.tarjetas.length} archivo(s) adjunto(s): ${form.docs.tarjetas.map(f => f.name).join(', ')}`
              : 'No aportada'
          }</td></tr>
          <tr><td style="${tdStyle}">Recibo bancario último pago</td><td style="${tdStyle}">${
            form.docs.recibo ? `📎 Adjunto: ${form.docs.recibo.name}` : 'No aportado'
          }</td></tr>` : ''}

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

  // -------------------- Submit ------------------------
  const handleSubmit = async () => {
    if (!validate()) return;
    // Tracking síncrono ANTES del fetch — evento de conversión al dataLayer
    trackGenerateLead(form.tomador.telefono, "formulario_alta_completo");
    setSending(true);
    try {
      // FormData (multipart) para poder adjuntar la documentación al email
      const fd = new FormData();
      fd.append('subject',  `Alta Adeslas — ${form.tomador.nombre} ${form.tomador.apellidos}`);
      fd.append('html',     formatEmailBody());
      fd.append('fromName', `${form.tomador.nombre} ${form.tomador.apellidos}`);
      fd.append('replyTo',  form.tomador.email);
      if (form.otraAseguradora) {
        form.docs.tarjetas.forEach(file => fd.append('tarjeta_sanitaria', file, file.name));
        if (form.docs.recibo) fd.append('recibo_bancario', form.docs.recibo, form.docs.recibo.name);
      }

      const res = await fetch('/api/enviar-alta', {
        method: 'POST',
        body: fd, // sin Content-Type manual: el navegador añade el boundary multipart
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? 'Error desconocido');
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error al enviar formulario:', err);
      setError('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo o llámanos al 91 710 50 00.');
    } finally {
      setSending(false);
    }
  };

  // -------------------- Success screen ----------------
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">¡Solicitud enviada!</h2>
          <p className="text-gray-500 mb-6 text-sm leading-relaxed">
            Hemos recibido tu solicitud de alta en Adeslas. Nuestro equipo se pondrá en
            contacto contigo en las próximas <strong>24 horas</strong> para confirmar
            todos los detalles.
          </p>
          <p className="text-sm text-gray-400">
            ¿Tienes alguna duda? Llámanos al{' '}
            <a href="tel:917105000" className="font-bold text-cyan-600 hover:underline">
              91 710 50 00
            </a>
          </p>
          <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-400">
            Marchal Aseguradores · Agentes de Adeslas
          </div>
        </div>
      </div>
    );
  }

  // ========================= RENDER ==========================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* -------- Header -------- */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-600 font-semibold text-sm tracking-wide">
          <Shield className="w-4 h-4" />
          CONTRATACIÓN SEGURA
        </div>
        <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
          <Lock className="w-3.5 h-3.5" />
          SSL SEGURO
        </div>
      </div>

      {/* -------- Stepper -------- */}
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-4">
        <div className="relative flex items-start justify-between">
          {/* Background line */}
          <div className="absolute top-5 left-5 right-5 h-px bg-gray-200" />
          {/* Filled line */}
          <div
            className="absolute top-5 left-5 h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `calc(${((step - 1) / (TOTAL_STEPS - 1)) * 100}% - 0px)` }}
          />
          {stepsMeta.map(({ num, label, Icon }) => {
            const done   = step > num;
            const active = step === num;
            return (
              <div key={num} className="flex flex-col items-center relative z-10 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white ${
                  done   ? 'border-indigo-500 bg-indigo-500 text-white'
                  : active ? 'border-cyan-500 text-cyan-500'
                  : 'border-gray-300 text-gray-400'
                }`}>
                  {done ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className={`text-xs mt-1.5 font-medium text-center leading-tight hidden sm:block ${
                  active ? 'text-cyan-600'
                  : done  ? 'text-indigo-500'
                  : 'text-gray-400'
                }`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* -------- Card -------- */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Top progress bar */}
          <div
            className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />

          <div className="p-6 md:p-8">

            {/* ======================================================
                PASO 1 — TOMADOR
            ====================================================== */}
            {step === 1 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">¿Quién contrata el seguro?</h2>
                <p className="text-sm text-gray-500 mb-6">Datos del titular de la póliza</p>

                {/* Tipo contratante */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {(['Particular', 'Autonomo', 'Juridica'] as TipoContratante[]).map(tipo => (
                    <button
                      key={tipo} type="button"
                      onClick={() => updateTomador('tipo', tipo)}
                      className={`py-2.5 px-4 rounded-lg border-2 font-medium text-sm transition-all ${
                        form.tomador.tipo === tipo
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {tipo === 'Autonomo' ? 'Autónomo' : tipo === 'Juridica' ? 'Empresa' : tipo}
                    </button>
                  ))}
                </div>

                <PersonaForm data={form.tomador} id="tomador" onChange={(f, v) => updateTomador(f as keyof Tomador, v)} />
              </section>
            )}

            {/* ======================================================
                PASO 2 — ASEGURADOS
            ====================================================== */}
            {step === 2 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">¿Quiénes estarán asegurados?</h2>
                <p className="text-sm text-gray-500 mb-6">Personas con cobertura sanitaria</p>

                <div className="space-y-5">
                  {form.asegurados.map((a, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-5">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-800">Asegurado {i + 1}</h3>
                        {i > 0 && (
                          <button type="button" onClick={() => removeAsegurado(i)}
                            className="text-red-400 hover:text-red-600 transition p-1 rounded-full hover:bg-red-50">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      {/* Checkbox mismo que tomador */}
                      <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-5 cursor-pointer hover:bg-gray-100 transition select-none">
                        <input
                          type="checkbox"
                          checked={a.mismoQueTomador}
                          onChange={e => {
                            updateAsegurado(i, 'mismoQueTomador', e.target.checked);
                            if (e.target.checked) copiarDatosTomador(i);
                          }}
                          className="w-4 h-4 accent-cyan-500 shrink-0"
                        />
                        <span className="text-sm font-medium text-gray-700">Mismo que tomador</span>
                      </label>

                      <PersonaForm data={a} id={`aseg-${i}`} onChange={(f, v) => updateAsegurado(i, f as keyof Asegurado, v)} />

                      {/* Parentesco */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parentesco *</label>
                        <select
                          value={a.parentesco}
                          onChange={e => updateAsegurado(i, 'parentesco', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                          <option value="">Seleccionar…</option>
                          <option value="Titular">Titular</option>
                          <option value="Cónyuge">Cónyuge</option>
                          <option value="Hijo">Hijo/a</option>
                          <option value="Padre/Madre">Padre / Madre</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Añadir asegurado */}
                <button
                  type="button" onClick={addAsegurado}
                  className="mt-4 w-full border-2 border-dashed border-cyan-300 rounded-xl py-4 text-cyan-600 font-medium text-sm hover:border-cyan-400 hover:bg-cyan-50 transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Añadir otro asegurado
                </button>
              </section>
            )}

            {/* ======================================================
                PASO 3 — SALUD
            ====================================================== */}
            {step === 3 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Estado de salud</h2>
                <p className="text-sm text-gray-500 mb-6">Salud de cada asegurado</p>

                <div className="space-y-6">
                  {form.asegurados.map((a, i) => {
                    const s = form.salud[i] ?? saludVacia();
                    return (
                      <div key={i} className="border border-gray-200 rounded-xl p-5">
                        <h3 className="font-semibold text-gray-800 mb-5">
                          {a.nombre ? `${a.nombre} ${a.apellidos}` : `Asegurado ${i + 1}`}
                        </h3>

                        {/* Peso y Altura */}
                        <div className="grid grid-cols-2 gap-4 mb-5">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                            <input
                              type="number" placeholder="70" min={20} max={300}
                              value={s.peso}
                              onChange={e => updateSalud(i, 'peso', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
                            <input
                              type="number" placeholder="175" min={50} max={250}
                              value={s.altura}
                              onChange={e => updateSalud(i, 'altura', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            />
                          </div>
                        </div>

                        {/* Hábitos */}
                        <p className="text-sm font-medium text-gray-700 mb-2">Hábitos:</p>
                        <div className="grid grid-cols-2 gap-3 mb-5">
                          {([['fumador', 'Fumador'], ['alcohol', 'Alcohol']] as [keyof SaludAsegurado, string][]).map(([k, label]) => (
                            <CheckboxCard key={k} label={label} checked={s[k] as boolean} onChange={v => updateSalud(i, k, v)} />
                          ))}
                        </div>

                        {/* Enfermedades */}
                        <p className="text-sm font-medium text-gray-700 mb-2">Enfermedades últimos 5 años:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {([
                            ['corazon','Corazón'], ['hipertension','Hipertensión'], ['vascular','Vascular'], ['colesterol','Colesterol'],
                            ['respiratorio','Respiratorio'], ['diabetes','Diabetes'], ['tiroides','Tiroides'], ['renal','Renal'],
                            ['nervioso','Nervioso'], ['psiquiatrica','Psiquiátrica'], ['digestivo','Digestivo'], ['huesos','Huesos'],
                            ['ocular','Ocular'], ['tumor','Tumor'], ['infecciosas','Infecciosas'], ['otras','Otras'],
                          ] as [keyof SaludAsegurado, string][]).map(([k, label]) => (
                            <CheckboxCard key={k} label={label} checked={s[k] as boolean} onChange={v => updateSalud(i, k, v)} small />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ======================================================
                PASO 4 — DOCS
            ====================================================== */}
            {step === 4 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">¿Vienes de otra aseguradora?</h2>
                <p className="text-sm text-gray-500 mb-6">Agiliza tu alta si ya tienes seguro</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { value: false, label: 'No, no procedo de otra aseguradora' },
                    { value: true,  label: 'Sí, vengo de otra aseguradora' },
                  ].map(opt => (
                    <button
                      key={String(opt.value)} type="button"
                      onClick={() => setForm(f => ({ ...f, otraAseguradora: opt.value }))}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        form.otraAseguradora === opt.value
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 mb-3 flex items-center justify-center ${
                        form.otraAseguradora === opt.value ? 'border-cyan-500' : 'border-gray-300'
                      }`}>
                        {form.otraAseguradora === opt.value && (
                          <div className="w-2 h-2 rounded-full bg-cyan-500" />
                        )}
                      </div>
                      <span className={`text-sm font-medium ${form.otraAseguradora === opt.value ? 'text-cyan-700' : 'text-gray-600'}`}>
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Documentación de la aseguradora anterior */}
                {form.otraAseguradora && (
                  <div className="mt-6 space-y-5">
                    <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-xl text-sm text-cyan-800 leading-relaxed">
                      <strong>Agiliza tu alta:</strong> adjunta una imagen, documento o fotografía de la{' '}
                      <strong>tarjeta sanitaria</strong> de tu aseguradora actual y el{' '}
                      <strong>recibo bancario del último pago</strong>. Los recibiremos junto a tu solicitud.
                      Si no los tienes a mano, puedes continuar sin adjuntarlos.
                    </div>

                    <FileUploadField
                      label="Tarjeta sanitaria de tu aseguradora actual"
                      hint="Imagen, foto o PDF · puedes subir varias tarjetas (una por asegurado)"
                      multiple
                      files={form.docs.tarjetas}
                      onAdd={addTarjetas}
                      onRemove={removeTarjeta}
                    />

                    <FileUploadField
                      label="Recibo bancario del último pago de tu seguro anterior"
                      hint="Imagen, foto o PDF"
                      files={form.docs.recibo ? [form.docs.recibo] : []}
                      onAdd={setRecibo}
                      onRemove={removeRecibo}
                    />

                    <p className="text-xs text-gray-400">
                      Máx. {MAX_FILE_MB} MB por archivo · {MAX_TOTAL_MB} MB en total · Formatos: JPG, PNG, WEBP, HEIC, PDF
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* ======================================================
                PASO 5 — PAGO
            ====================================================== */}
            {step === 5 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">¿Cómo quieres pagar?</h2>
                <p className="text-sm text-gray-500 mb-6">Cuenta para domiciliar recibos</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titular de la cuenta *</label>
                    <input
                      type="text" placeholder="Nombre completo del titular"
                      value={form.pago.titular}
                      onChange={e => setForm(f => ({ ...f, pago: { ...f.pago, titular: e.target.value } }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IBAN *</label>
                    <input
                      type="text" placeholder="ES00 0000 0000 0000 0000 0000"
                      value={form.pago.iban}
                      onChange={e => setForm(f => ({ ...f, pago: { ...f.pago, iban: e.target.value.toUpperCase() } }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <p className="text-xs text-gray-400 mt-1">24 caracteres · ej: ES12 3456 7890 1234 5678 9012</p>
                  </div>
                </div>
              </section>
            )}

            {/* ======================================================
                PASO 6 — CONFIRMAR
            ====================================================== */}
            {step === 6 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Confirma tu solicitud</h2>
                <p className="text-sm text-gray-500 mb-6">Revisa y acepta las condiciones</p>

                {/* Fecha de alta deseada */}
                <div className="mb-5 p-4 border border-cyan-200 bg-cyan-50/50 rounded-xl">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-1">
                    <CalendarDays className="w-4 h-4 text-cyan-600" />
                    ¿Cuándo quieres que empiece tu seguro? *
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Fecha en la que deseas que tu póliza entre en vigor</p>
                  <input
                    type="date"
                    min={minFechaAlta()}
                    value={form.fechaAlta}
                    onChange={e => setForm(f => ({ ...f, fechaAlta: e.target.value }))}
                    className="w-full sm:w-64 border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                {/* Resumen */}
                <div className="bg-gray-50 rounded-xl p-5 mb-5 text-sm space-y-3 divide-y divide-gray-200">
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">Tomador</span>
                    </div>
                    <p className="font-semibold text-gray-900">{form.tomador.nombre} {form.tomador.apellidos}</p>
                    <p className="text-gray-500 text-xs">{form.tomador.email} · {form.tomador.telefono}</p>
                  </div>
                  <div className="pt-3">
                    <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">Asegurados ({form.asegurados.length})</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.asegurados.map((a, i) => (
                        <span key={i} className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
                          {a.nombre} {a.apellidos}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-3">
                    <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">Cuenta bancaria</span>
                    <p className="font-mono font-medium text-gray-800 mt-1 text-sm">{form.pago.iban}</p>
                    <p className="text-gray-500 text-xs">{form.pago.titular}</p>
                  </div>
                  {form.otraAseguradora && (
                    <div className="pt-3">
                      <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">Documentación adjunta</span>
                      <p className="text-gray-700 text-xs mt-1 flex items-center gap-1.5">
                        <Paperclip className="w-3 h-3 text-gray-400" />
                        {form.docs.tarjetas.length + (form.docs.recibo ? 1 : 0) > 0
                          ? `${form.docs.tarjetas.length} tarjeta(s) sanitaria(s)${form.docs.recibo ? ' · 1 recibo bancario' : ''}`
                          : 'Sin documentos adjuntos'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Consentimiento */}
                <label className="flex items-start gap-3 cursor-pointer p-4 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition select-none">
                  <input
                    type="checkbox"
                    checked={form.aceptaCondiciones}
                    onChange={e => setForm(f => ({ ...f, aceptaCondiciones: e.target.checked }))}
                    className="w-4 h-4 mt-0.5 accent-cyan-500 shrink-0"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    Acepto las <a href="#" className="text-cyan-600 underline">condiciones generales</a>,
                    la <a href="#" className="text-cyan-600 underline">política de privacidad</a> y el
                    tratamiento de mis datos de salud. Declaro que toda la información es cierta y
                    autorizo a Adeslas a tramitar mi alta.
                  </span>
                </label>
              </section>
            )}

            {/* -------- Error -------- */}
            {error && (
              <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
                <span className="shrink-0 mt-0.5">⚠️</span>
                {error}
              </div>
            )}

            {/* -------- Navegación -------- */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button
                  type="button" onClick={prev}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 font-medium text-sm transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Atrás
                </button>
              ) : <div />}

              {step < TOTAL_STEPS ? (
                <button
                  type="button" onClick={next}
                  className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition shadow-sm"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button" onClick={handleSubmit} disabled={sending}
                  className="flex items-center gap-2 px-8 py-3 bg-pink-600 hover:bg-pink-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg transition shadow-sm"
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando…
                    </>
                  ) : (
                    <>
                      Confirmar Contratación
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Marchal Aseguradores · Agentes exclusivos de Adeslas · Tus datos están protegidos
        </p>
      </div>
    </div>
  );
}

// ================================================================
// SUB-COMPONENTS
// ================================================================

interface PersonaFormProps {
  data: PersonaBase;
  id: string;
  onChange: (field: string, value: string) => void;
}

function PersonaForm({ data, id, onChange }: PersonaFormProps) {
  const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400';

  return (
    <div className="space-y-4">
      {/* Nombre + Apellidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input type="text" placeholder="Juan" value={data.nombre}
            onChange={e => onChange('nombre', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos *</label>
          <input type="text" placeholder="Pérez García" value={data.apellidos}
            onChange={e => onChange('apellidos', e.target.value)} className={inputClass} />
        </div>
      </div>

      {/* Doc */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Doc.</label>
          <select value={data.docType} onChange={e => onChange('docType', e.target.value)} className={inputClass}>
            <option>NIF</option><option>NIE</option><option>Pasaporte</option><option>CIF</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nº documento *</label>
          <input type="text" placeholder="12345678A" value={data.docNum}
            onChange={e => onChange('docNum', e.target.value.toUpperCase())} className={inputClass} />
        </div>
      </div>

      {/* Fecha + Género */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento *</label>
          <input type="date" value={data.fechaNacimiento}
            onChange={e => onChange('fechaNacimiento', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
          <div className="flex gap-5 pt-2.5">
            {(['Hombre', 'Mujer'] as Genero[]).map(g => (
              <label key={g} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input type="radio" name={`genero-${id}`} value={g}
                  checked={data.genero === g} onChange={() => onChange('genero', g)}
                  className="accent-cyan-500" />
                {g}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Teléfono + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
          <input type="tel" placeholder="612 345 678" value={data.telefono}
            onChange={e => onChange('telefono', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input type="email" placeholder="email@ejemplo.com" value={data.email}
            onChange={e => onChange('email', e.target.value)} className={inputClass} />
        </div>
      </div>

      {/* Dirección */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección *</label>
        <input type="text" placeholder="Calle, número, piso…" value={data.direccion}
          onChange={e => onChange('direccion', e.target.value)} className={inputClass} />
      </div>

      {/* Población + CP */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Población *</label>
          <input type="text" placeholder="Madrid" value={data.poblacion}
            onChange={e => onChange('poblacion', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">C.P. *</label>
          <input type="text" placeholder="28001" maxLength={5} value={data.cp}
            onChange={e => onChange('cp', e.target.value)} className={inputClass} />
        </div>
      </div>
    </div>
  );
}

interface FileUploadFieldProps {
  label: string;
  hint: string;
  files: File[];
  multiple?: boolean;
  onAdd: (files: FileList | null) => void;
  onRemove: (idx: number) => void;
}

function FileUploadField({ label, hint, files, multiple = false, onAdd, onRemove }: FileUploadFieldProps) {
  const formatSize = (bytes: number) =>
    bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <p className="text-xs text-gray-400 mb-2">{hint}</p>

      {(multiple || files.length === 0) && (
        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-cyan-300 rounded-xl py-6 px-4 cursor-pointer text-cyan-600 hover:border-cyan-400 hover:bg-cyan-50 transition text-sm font-medium">
          <Upload className="w-5 h-5" />
          Pulsa para subir o hacer una foto
          <input
            type="file"
            accept={ACCEPTED_TYPES}
            multiple={multiple}
            className="hidden"
            onChange={e => { onAdd(e.target.files); e.target.value = ''; }}
          />
        </label>
      )}

      {files.length > 0 && (
        <ul className="mt-2 space-y-2">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              <span className="flex items-center gap-2 text-sm text-gray-700 min-w-0">
                <Paperclip className="w-4 h-4 text-cyan-500 shrink-0" />
                <span className="truncate">{f.name}</span>
                <span className="text-xs text-gray-400 shrink-0">({formatSize(f.size)})</span>
              </span>
              <button type="button" onClick={() => onRemove(i)}
                className="text-red-400 hover:text-red-600 transition p-1 rounded-full hover:bg-red-50 shrink-0">
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface CheckboxCardProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  small?: boolean;
}

function CheckboxCard({ label, checked, onChange, small = false }: CheckboxCardProps) {
  return (
    <label className={`flex items-center gap-2 rounded-lg border cursor-pointer transition select-none ${small ? 'p-2 text-xs' : 'p-3 text-sm'} ${
      checked
        ? 'border-cyan-300 bg-cyan-50 text-cyan-700'
        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
    }`}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        className="w-3.5 h-3.5 accent-cyan-500 shrink-0" />
      {label}
    </label>
  );
}
