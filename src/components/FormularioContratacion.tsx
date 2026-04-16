'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  ChevronLeft, Check, Shield, Lock, Phone,
  User, Users, Heart, CreditCard, AlertCircle, CheckCircle2, Calendar,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type DocType   = 'NIF' | 'NIE' | 'Pasaporte';
type Genero    = 'Hombre' | 'Mujer' | '';

const ENFERMEDADES: [string, string][] = [
  ['corazon',      'Corazón / cardiovascular'],
  ['hipertension', 'Hipertensión arterial'],
  ['vascular',     'Enfermedades vasculares'],
  ['colesterol',   'Colesterol elevado'],
  ['respiratorio', 'Enfermedades respiratorias'],
  ['diabetes',     'Diabetes'],
  ['tiroides',     'Tiroides'],
  ['renal',        'Enfermedad renal'],
  ['nervioso',     'Sistema nervioso'],
  ['psiquiatrica', 'Trastornos psiquiátricos'],
  ['digestivo',    'Aparato digestivo'],
  ['huesos',       'Huesos / articulaciones'],
  ['ocular',       'Enfermedades oculares'],
  ['tumor',        'Tumor / cáncer'],
  ['infecciosas',  'Enfermedades infecciosas'],
  ['otras',        'Otras enfermedades'],
];

interface AseguradoData {
  nombre: string;
  apellidos: string;
  docType: DocType;
  docNum: string;
  usarDniTitular: boolean;   // <14 años: tomar DNI del titular
  diaNac: string;
  mesNac: string;
  anioNac: string;
  genero: Genero;
  parentesco: string;
  edad: number;
}

interface SaludDetalle {
  peso: string;
  altura: string;
  fumador: boolean;
  alcohol: boolean;
  condiciones: string[];   // lista de keys de ENFERMEDADES
}

interface FormState {
  // Puente (step 0)
  fechaInicio: string;

  // Paso 1 – Titular
  nombre: string;
  apellidos: string;
  docType: DocType;
  docNum: string;
  diaNac: string;
  mesNac: string;
  anioNac: string;
  genero: Genero;
  email: string;
  telefono: string;

  // Paso 2 – Asegurados
  asegurados: AseguradoData[];

  // Paso 3 – Salud
  tieneCondiciones: 'no' | 'si' | null;
  saludDetalle: SaludDetalle[];

  // Paso 4 – Dirección y pago
  cp: string;
  poblacion: string;
  direccion: string;
  ibanTitular: string;
  iban: string;

  // Confirmación
  otraAseguradora: boolean;
  aceptaCondiciones: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// URL params received from ModalResultados
// ─────────────────────────────────────────────────────────────────────────────
interface ContratarParams {
  producto:       string;
  productoNombre: string;
  precio:         number;
  precioBase?:    number;
  descuento?:     number;
  nombre:         string;
  email:          string;
  telefono:       string;
  edades:         number[];
  provincia:      string;
}

// ─────────────────────────────────────────────────────────────────────────────
// IBAN validation (Spanish)
// ─────────────────────────────────────────────────────────────────────────────
function validateIBAN(raw: string): boolean {
  const iban = raw.replace(/[\s-]/g, '').toUpperCase();
  if (iban.length !== 24)          return false;
  if (!iban.startsWith('ES'))      return false;
  if (!/^[A-Z0-9]+$/.test(iban))  return false;
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const numeric    = rearranged.replace(/[A-Z]/g, (c) => String(c.charCodeAt(0) - 55));
  let mod          = '';
  for (const ch of numeric) { mod = String(Number(mod + ch) % 97); }
  return Number(mod) === 1;
}

function formatIBANInput(raw: string): string {
  const clean = raw.replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 24);
  return clean.match(/.{1,4}/g)?.join(' ') ?? clean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function saludVacia(): SaludDetalle {
  return { peso: '', altura: '', fumador: false, alcohol: false, condiciones: [] };
}

function aseguradoVacio(edad: number): AseguradoData {
  return {
    nombre: '', apellidos: '', docType: 'NIF', docNum: '',
    usarDniTitular: false,
    diaNac: '', mesNac: '', anioNac: '',
    genero: '', parentesco: '', edad,
  };
}

// Primera fecha disponible: hoy + 2 días (no se puede el mismo día ni el siguiente)
function getFirstAvailableDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const MONTH_NAMES_ES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
];

function formatDateLabel(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  return `${d} de ${MONTH_NAMES_ES[m - 1]} de ${y}`;
}

const MESES = [
  '', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

// ─────────────────────────────────────────────────────────────────────────────
// Email body builder
// ─────────────────────────────────────────────────────────────────────────────
function buildEmailHTML(form: FormState, params: ContratarParams): string {
  const td  = 'padding:8px 12px;border:1px solid #e2e8f0;font-size:13px;';
  const th  = 'padding:10px 12px;background:#f0f9ff;color:#0369a1;text-align:left;font-weight:700;border:1px solid #e2e8f0;font-size:13px;';
  const th2 = 'padding:10px 12px;background:#dbeafe;color:#1e40af;text-align:left;font-weight:700;border:1px solid #e2e8f0;font-size:13px;';

  const aseguradosHtml = form.asegurados.map((a, i) => {
    const s = form.saludDetalle[i] ?? saludVacia();
    const enf = form.tieneCondiciones === 'si'
      ? (s.condiciones.length > 0
          ? s.condiciones.map((k) => ENFERMEDADES.find(([id]) => id === k)?.[1] ?? k).join(', ')
          : 'Ninguna declarada')
      : 'No declara condiciones';

    return `
      <tr><td colspan="2" style="${th2}">
        Asegurado ${i + 1} (${a.parentesco || 'Titular'}) — ${a.nombre} ${a.apellidos}
      </td></tr>
      <tr><td style="${td}width:35%">Documento</td><td style="${td}">${a.docNum ? `${a.docType}: ${a.docNum}` : 'DNI del titular'}</td></tr>
      <tr><td style="${td}">Fecha nacimiento</td><td style="${td}">${a.diaNac}/${a.mesNac}/${a.anioNac}</td></tr>
      <tr><td style="${td}">Género</td><td style="${td}">${a.genero}</td></tr>
      ${form.tieneCondiciones === 'si' ? `
      <tr><td style="${td}">Peso / Altura</td><td style="${td}">${s.peso ? s.peso + ' kg' : '—'} / ${s.altura ? s.altura + ' cm' : '—'}</td></tr>
      <tr><td style="${td}">Hábitos</td><td style="${td}">${[s.fumador && 'Fumador', s.alcohol && 'Alcohol'].filter(Boolean).join(', ') || 'Ninguno'}</td></tr>
      <tr><td style="${td}">Condiciones (últ. 5 años)</td><td style="${td}">${enf}</td></tr>
      ` : ''}
    `;
  }).join('');

  const precio = params.precio.toFixed(2).replace('.', ',');
  const fecha  = form.fechaInicio
    ? new Date(form.fechaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—';

  return `
    <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#1e293b;">
      <div style="background:linear-gradient(120deg,#002266 0%,#003087 50%,#0077B6 100%);padding:24px;text-align:center;border-radius:8px 8px 0 0;">
        <h1 style="color:white;margin:0;font-size:22px;">🏥 Nueva Solicitud de Alta — Adeslas</h1>
        <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">
          Recibida el ${new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}
        </p>
      </div>

      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr><th colspan="2" style="${th}">PRODUCTO CONTRATADO</th></tr>
        <tr><td style="${td}width:35%">Producto</td><td style="${td}font-weight:700;color:#003087;">${params.productoNombre}</td></tr>
        <tr><td style="${td}">Precio mensual</td><td style="${td}font-size:16px;font-weight:700;color:#E4097D;">${precio} €/mes</td></tr>
        ${params.precioBase ? `<tr><td style="${td}">Precio sin descuento</td><td style="${td}text-decoration:line-through;color:#94a3b8;">${params.precioBase.toFixed(2).replace('.', ',')} €/mes (−10% familia)</td></tr>` : ''}
        <tr><td style="${td}">Provincia</td><td style="${td}">${params.provincia}</td></tr>
        <tr><td style="${td}">Fecha de inicio</td><td style="${td}">${fecha}</td></tr>
        <tr><td style="${td}">Viene de otra aseguradora</td><td style="${td}">${form.otraAseguradora ? 'Sí' : 'No'}</td></tr>

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
        <tr><td style="${td}">IBAN</td><td style="${td}font-family:monospace;letter-spacing:1px;">${form.iban.replace(/[^A-Z0-9]/gi,'').replace(/.{4}/g,'$& ').trim()}</td></tr>
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

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

// Progress bar  ─────────────────────────────────────────────────────────────
interface ProgressBarProps { step: number; total: number; label: string }

function ProgressBar({ step, total, label }: ProgressBarProps) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-500">{label}</span>
        <span className="text-xs text-gray-400">Paso {step} de {total}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: '#009FE3' }}
        />
      </div>
    </div>
  );
}

// Field wrapper  ─────────────────────────────────────────────────────────────
function Field({
  label, error, hint, children,
}: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs mt-1" style={{ color: '#EF4444' }}>
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="text-xs mt-1 text-gray-400">{hint}</p>
      )}
    </div>
  );
}

const inputCls = 'w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#009FE3]/30 focus:border-[#009FE3] bg-white transition-colors';
const selectCls = `${inputCls} bg-white cursor-pointer`;
const radioBtnCls = (active: boolean) =>
  `flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all cursor-pointer text-center ${
    active
      ? 'border-[#009FE3] bg-[#009FE3]/8 text-[#003087]'
      : 'border-gray-200 text-gray-500 hover:border-gray-300'
  }`;

// ─────────────────────────────────────────────────────────────────────────────
// Calendar date picker
// ─────────────────────────────────────────────────────────────────────────────
function CalendarPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  // Min date: today + 2 (no same day, no tomorrow)
  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  // Max date: 3 months ahead
  const maxDate = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    d.setHours(23, 59, 59, 999);
    return d;
  }, []);

  // View state: which month/year we're looking at
  const [viewYear, setViewYear]   = useState(minDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(minDate.getMonth()); // 0-indexed

  const DAY_HEADERS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  // First day of the month (Mon=0 … Sun=6)
  const firstDayOffset = useMemo(() => {
    const dow = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
    return (dow + 6) % 7; // shift: Mon=0
  }, [viewYear, viewMonth]);

  const daysInMonth = useMemo(
    () => new Date(viewYear, viewMonth + 1, 0).getDate(),
    [viewYear, viewMonth],
  );

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  // Prev disabled if we're already on the minimum month
  const canGoPrev =
    viewYear > minDate.getFullYear() ||
    (viewYear === minDate.getFullYear() && viewMonth > minDate.getMonth());
  // Next disabled 3 months ahead
  const canGoNext =
    viewYear < maxDate.getFullYear() ||
    (viewYear === maxDate.getFullYear() && viewMonth < maxDate.getMonth());

  const toDateStr = (d: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const isDisabled = (d: number) => {
    const date = new Date(viewYear, viewMonth, d);
    return date < minDate || date > maxDate;
  };
  const isSelected = (d: number) => value === toDateStr(d);
  const isFirstAvailable = (d: number) =>
    toDateStr(d) === `${minDate.getFullYear()}-${String(minDate.getMonth() + 1).padStart(2, '0')}-${String(minDate.getDate()).padStart(2, '0')}`;
  const isToday = (d: number) => {
    const t = new Date();
    return d === t.getDate() && viewMonth === t.getMonth() && viewYear === t.getFullYear();
  };

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-colors disabled:opacity-30 hover:bg-gray-100"
          aria-label="Mes anterior"
        >
          ‹
        </button>
        <span className="text-sm font-bold text-gray-700">
          {MONTH_NAMES_ES[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          disabled={!canGoNext}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-colors disabled:opacity-30 hover:bg-gray-100"
          aria-label="Mes siguiente"
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_HEADERS.map((h) => (
          <div key={h} className="text-center text-xs font-semibold text-gray-400 py-1">
            {h}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {/* Empty offset cells */}
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`e${i}`} />
        ))}
        {/* Day buttons */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
          const disabled = isDisabled(d);
          const selected = isSelected(d);
          const first    = isFirstAvailable(d) && !selected;
          const today    = isToday(d);

          let cls = 'relative h-9 w-9 mx-auto rounded-full text-sm transition-all flex items-center justify-center ';
          if (disabled)        cls += 'text-gray-300 cursor-not-allowed ';
          else if (selected)   cls += 'font-black text-white shadow-md ';
          else if (first)      cls += 'font-bold ring-2 ring-offset-1 ';
          else                 cls += 'hover:bg-gray-100 text-gray-700 ';

          return (
            <button
              key={d}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onChange(toDateStr(d))}
              className={cls}
              style={
                selected
                  ? { backgroundColor: '#003087' }
                  : first
                    ? { color: '#009FE3', '--tw-ring-color': '#009FE3' } as React.CSSProperties
                    : undefined
              }
            >
              {d}
              {today && !selected && (
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: disabled ? '#D1D5DB' : '#009FE3' }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected date label */}
      {value && (
        <div
          className="mt-3 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold"
          style={{ backgroundColor: '#EFF6FF', color: '#003087' }}
        >
          <Calendar className="w-4 h-4" />
          Inicio: {formatDateLabel(value)}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
interface Props { params: ContratarParams }

export default function FormularioContratacion({ params }: Props) {
  // ── Internal step:
  // 0 = Puente  1 = Titular  2 = Asegurados  3 = Salud
  // 4 = Pago    5 = Revisión  6 = Enviado
  const [step, setStep]       = useState(0);
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState<FormState>({
    fechaInicio:      getFirstAvailableDate(),
    nombre:           params.nombre.trim().split(' ')[0] ?? '',
    apellidos:        params.nombre.trim().split(' ').slice(1).join(' ') ?? '',
    docType:          'NIF',
    docNum:           '',
    diaNac:           '',
    mesNac:           '',
    anioNac:          '',
    genero:           '',
    email:            params.email,
    telefono:         params.telefono,
    asegurados:       params.edades.map((e) => aseguradoVacio(e)),
    tieneCondiciones: null,
    saludDetalle:     params.edades.map(() => saludVacia()),
    cp:               '',
    poblacion:        '',
    direccion:        '',
    ibanTitular:      `${params.nombre.trim().split(' ')[0] ?? ''} ${params.nombre.trim().split(' ').slice(1).join(' ') ?? ''}`.trim(),
    iban:             '',
    otraAseguradora:  false,
    aceptaCondiciones: false,
  });

  // ── Generic updaters ─────────────────────────────────────────────────────
  const upd = useCallback(<K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  }, []);

  const updAsegurado = useCallback(<K extends keyof AseguradoData>(
    idx: number, key: K, val: AseguradoData[K],
  ) => {
    setForm((f) => {
      const arr = [...f.asegurados];
      arr[idx]  = { ...arr[idx], [key]: val };
      return { ...f, asegurados: arr };
    });
    setErrors((e) => { const n = { ...e }; delete n[`a${idx}_${key}`]; return n; });
  }, []);

  const updSalud = useCallback(<K extends keyof SaludDetalle>(
    idx: number, key: K, val: SaludDetalle[K],
  ) => {
    setForm((f) => {
      const arr = [...f.saludDetalle];
      arr[idx]  = { ...arr[idx], [key]: val };
      return { ...f, saludDetalle: arr };
    });
  }, []);

  const toggleCondicion = useCallback((idx: number, key: string) => {
    setForm((f) => {
      const arr = [...f.saludDetalle];
      const cur = arr[idx].condiciones;
      arr[idx] = {
        ...arr[idx],
        condiciones: cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key],
      };
      return { ...f, saludDetalle: arr };
    });
  }, []);

  const err = (key: string) => errors[key];

  // ── Validations ──────────────────────────────────────────────────────────
  const validateStep1 = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.nombre.trim())    e.nombre    = 'El nombre es obligatorio';
    if (!form.apellidos.trim()) e.apellidos = 'Los apellidos son obligatorios';
    if (!form.docNum.trim())    e.docNum    = 'El número de documento es obligatorio';
    if (!form.diaNac || !form.mesNac || !form.anioNac)
                                e.fechaNac  = 'La fecha de nacimiento es obligatoria';
    if (!form.genero)           e.genero    = 'Selecciona el género';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
                                e.email     = 'Introduce un email válido';
    if (!form.telefono.trim())  e.telefono  = 'El teléfono es obligatorio';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = (): boolean => {
    const e: Record<string, string> = {};
    form.asegurados.forEach((a, i) => {
      if (!a.nombre.trim())    e[`a${i}_nombre`]    = 'Nombre obligatorio';
      if (!a.apellidos.trim()) e[`a${i}_apellidos`] = 'Apellidos obligatorios';
      if (!a.usarDniTitular && !a.docNum.trim())
                               e[`a${i}_docNum`]    = 'Documento obligatorio';
      if (!a.genero)           e[`a${i}_genero`]    = 'Selecciona el género';
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = (): boolean => {
    if (form.tieneCondiciones === null) {
      setErrors({ salud: 'Por favor, responde la pregunta de salud' });
      return false;
    }
    return true;
  };

  const validateStep4 = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.cp.trim() || form.cp.length !== 5)
      e.cp        = 'Introduce un código postal válido (5 dígitos)';
    if (!form.poblacion.trim())
      e.poblacion = 'La población es obligatoria';
    if (!form.direccion.trim())
      e.direccion = 'La dirección es obligatoria';
    if (!form.ibanTitular.trim())
      e.ibanTitular = 'El titular de la cuenta es obligatorio';
    if (!form.iban.trim())
      e.iban = 'El IBAN es obligatorio';
    else if (!validateIBAN(form.iban))
      e.iban = 'El IBAN no es válido. Comprueba que empieza por ES y tiene 24 caracteres';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep5 = (): boolean => {
    if (!form.aceptaCondiciones) {
      setErrors({ condiciones: 'Debes aceptar las condiciones generales' });
      return false;
    }
    return true;
  };

  // ── Navigation ───────────────────────────────────────────────────────────
  const next = () => {
    let valid = true;
    if (step === 1) valid = validateStep1();
    if (step === 2) valid = validateStep2();
    if (step === 3) valid = validateStep3();
    if (step === 4) valid = validateStep4();
    if (!valid) return;
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prev = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validateStep5()) return;
    setSending(true);
    try {
      const res = await fetch('/api/enviar-alta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject:  `Alta Adeslas — ${form.nombre} ${form.apellidos} — ${params.productoNombre}`,
          html:     buildEmailHTML(form, params),
          fromName: `${form.nombre} ${form.apellidos}`,
          replyTo:  form.email,
        }),
      });
      if (!res.ok) throw new Error('Error de servidor');
      setStep(6);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErrors({ submit: 'No hemos podido enviar la solicitud. Por favor, inténtalo de nuevo o llámanos al 91 710 50 00.' });
    } finally {
      setSending(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // STEP ICONS
  const stepIcons = [Calendar, User, Users, Heart, CreditCard, CheckCircle2];
  const stepLabels = ['Resumen', 'Tus datos', 'Asegurados', 'Salud', 'Pago', 'Revisión'];

  // ─────────────────────────────────────────────────────────────────────────
  // WRAPPER LAYOUT
  // ─────────────────────────────────────────────────────────────────────────
  const precio = params.precio.toFixed(2).replace('.', ',');

  if (step === 6) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#EEF5FB' }}>
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#DCFCE7' }}
          >
            <Check className="w-10 h-10" style={{ color: '#16A34A' }} />
          </div>
          <h2 className="text-2xl font-black mb-3" style={{ color: '#003087' }}>
            ¡Solicitud enviada!
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-2">
            Hemos recibido tu solicitud de alta en{' '}
            <strong className="text-gray-700">{params.productoNombre}</strong>.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Nuestro equipo se pondrá en contacto contigo en las próximas{' '}
            <strong className="text-gray-700">24 horas</strong> para confirmar todos los detalles.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-600">
            📧 Recibirás un resumen en <strong>{form.email}</strong>
          </div>
          <a
            href="tel:917105000"
            className="inline-flex items-center gap-2 font-bold text-lg"
            style={{ color: '#009FE3' }}
          >
            <Phone className="w-5 h-5" />
            91 710 50 00
          </a>
          <p className="text-xs text-gray-400 mt-1">Adeslas · Sin compromiso</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: '#EEF5FB' }}>

      {/* ── Top bar ── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6"
        style={{ background: 'linear-gradient(120deg,#002266 0%,#003087 50%,#0077B6 100%)' }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            aria-label="Volver"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div>
            <p className="text-white font-bold text-sm leading-tight">
              {params.productoNombre}
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {precio} €/mes · {params.provincia}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.7)' }} />
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Proceso seguro
          </span>
          <a
            href="tel:917105000"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white ml-2"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <Phone className="w-3.5 h-3.5" />
            91 710 50 00
          </a>
        </div>
      </header>

      {/* ── Step progress (pasos 1-4 visibles) ── */}
      {step >= 1 && step <= 5 && (
        <div className="bg-white border-b border-gray-100 px-4 py-3 sm:px-6 sticky top-[56px] z-40">
          <div className="max-w-xl mx-auto">
            <div className="flex items-center justify-between gap-1">
              {[1, 2, 3, 4].map((s) => {
                const done    = step > s;
                const active  = step === s;
                const Icon    = stepIcons[s];
                return (
                  <div key={s} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: done ? '#16A34A' : active ? '#009FE3' : '#E5E7EB',
                      }}
                    >
                      {done
                        ? <Check className="w-4 h-4 text-white" />
                        : <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-gray-400'}`} />
                      }
                    </div>
                    <span className={`text-[10px] font-semibold ${active ? 'text-[#003087]' : done ? 'text-green-600' : 'text-gray-400'}`}>
                      {stepLabels[s]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Content — pb-24 deja espacio al botón sticky ── */}
      <div className="max-w-xl mx-auto px-4 py-6 pb-24 sm:px-6">

        {/* ════════════════════════════════════════════════════════════
            STEP 0 — PUENTE / RESUMEN
        ════════════════════════════════════════════════════════════ */}
        {step === 0 && (
          <div>
            <h1 className="text-2xl font-black mb-1" style={{ color: '#003087' }}>
              Tu seguro está listo 🎉
            </h1>
            <p className="text-gray-500 text-sm mb-5">
              Revisa el resumen y dinos cuándo quieres empezar.
            </p>

            {/* Tarjeta resumen */}
            <div
              className="rounded-2xl p-5 mb-5 text-white"
              style={{ background: 'linear-gradient(120deg,#002266 0%,#003087 50%,#0077B6 100%)' }}
            >
              <p className="text-xs font-semibold mb-1 opacity-75">{params.provincia}</p>
              <h2 className="text-xl font-black mb-2">{params.productoNombre}</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-black">{precio.split(',')[0]}</span>
                <span className="text-lg font-bold">,{precio.split(',')[1]}€</span>
                <span className="text-sm opacity-70">/mes</span>
              </div>
              {params.precioBase && (
                <p className="text-xs opacity-75 line-through">
                  Sin descuento: {params.precioBase.toFixed(2).replace('.', ',')} €/mes
                </p>
              )}
              <p className="text-xs mt-2 opacity-70">
                {params.edades.length} {params.edades.length === 1 ? 'asegurado' : 'asegurados'}
                {params.edades.length > 0 && ` · ${params.edades.join(', ')} años`}
              </p>
            </div>

            {/* Fecha de inicio — calendario */}
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                📅 ¿Cuándo quieres que empiece tu seguro?
              </label>
              <CalendarPicker
                value={form.fechaInicio}
                onChange={(v) => upd('fechaInicio', v)}
              />
            </div>

            {/* Badges confianza */}
            <div className="flex justify-center gap-5 text-xs text-gray-500 mb-3">
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-green-500" /> 100% seguro</span>
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-blue-400" /> SSL cifrado</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Sin compromiso</span>
            </div>

            {/* CTA sticky — igual que NavButtons pero solo con "Continuar" */}
            <div
              className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
              style={{
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(8px)',
                borderTop: '1px solid #E5E7EB',
                boxShadow: '0 -4px 16px rgba(0,0,0,0.07)',
              }}
            >
              <div className="max-w-xl mx-auto">
                <button
                  onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full py-3.5 rounded-xl font-bold text-white text-base tracking-wide transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ backgroundColor: '#E4097D' }}
                >
                  Continuar con la contratación →
                </button>
                <p className="text-xs text-gray-400 text-center mt-1.5">
                  Solo 4 pasos · Aproximadamente 3 minutos
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            STEP 1 — DATOS DEL TITULAR
        ════════════════════════════════════════════════════════════ */}
        {step === 1 && (
          <div>
            <ProgressBar step={1} total={4} label="Tus datos personales" />

            <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
              <h2 className="font-black text-lg mb-4" style={{ color: '#003087' }}>
                Tus datos personales
              </h2>

              {/* ── Documento de identidad — PRIMER campo (máxima visibilidad) ── */}
              <div
                className="rounded-xl p-3.5 mb-4"
                style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}
              >
                <p className="text-xs font-semibold mb-2" style={{ color: '#1D4ED8' }}>
                  🪪 Documento de identidad del tomador *
                </p>
                <div className="flex gap-2">
                  <select
                    className={selectCls}
                    style={{ width: '8.5rem', flexShrink: 0 }}
                    value={form.docType}
                    onChange={(e) => upd('docType', e.target.value as DocType)}
                  >
                    <option value="NIF">NIF / DNI</option>
                    <option value="NIE">NIE</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                  <input
                    type="text"
                    className={inputCls}
                    style={{ flex: '1 1 auto', minWidth: 0, textTransform: 'uppercase' }}
                    value={form.docNum}
                    onChange={(e) => upd('docNum', e.target.value.toUpperCase().slice(0, 15))}
                    placeholder={form.docType === 'NIF' ? '12345678A' : form.docType === 'NIE' ? 'X1234567A' : 'Nº Pasaporte'}
                    autoComplete="off"
                    inputMode="text"
                  />
                </div>
                {err('docNum') && (
                  <p className="flex items-center gap-1 text-xs mt-1.5" style={{ color: '#EF4444' }}>
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    {err('docNum')}
                  </p>
                )}
                {!err('docNum') && form.docType === 'NIF' && (
                  <p className="text-xs mt-1.5 text-gray-400">Formato: 8 dígitos + letra (ej. 12345678A)</p>
                )}
              </div>

              {/* Nombre */}
              <Field label="Nombre *" error={err('nombre')}>
                <input
                  type="text"
                  className={inputCls}
                  value={form.nombre}
                  onChange={(e) => upd('nombre', e.target.value)}
                  placeholder="Tu nombre"
                  autoComplete="given-name"
                />
              </Field>

              {/* Apellidos */}
              <Field label="Apellidos *" error={err('apellidos')}>
                <input
                  type="text"
                  className={inputCls}
                  value={form.apellidos}
                  onChange={(e) => upd('apellidos', e.target.value)}
                  placeholder="Tus apellidos"
                  autoComplete="family-name"
                />
              </Field>

              {/* Fecha de nacimiento */}
              <Field label="Fecha de nacimiento *" error={err('fechaNac')}>
                <div className="flex gap-2">
                  <select
                    className={`${selectCls} flex-1`}
                    value={form.diaNac}
                    onChange={(e) => upd('diaNac', e.target.value)}
                  >
                    <option value="">Día</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={String(d).padStart(2, '0')}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <select
                    className={`${selectCls} flex-[1.5]`}
                    value={form.mesNac}
                    onChange={(e) => upd('mesNac', e.target.value)}
                  >
                    <option value="">Mes</option>
                    {MESES.slice(1).map((m, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>{m}</option>
                    ))}
                  </select>
                  <select
                    className={`${selectCls} flex-1`}
                    value={form.anioNac}
                    onChange={(e) => upd('anioNac', e.target.value)}
                  >
                    <option value="">Año</option>
                    {Array.from({ length: 70 }, (_, i) => new Date().getFullYear() - 18 - i).map((y) => (
                      <option key={y} value={String(y)}>{y}</option>
                    ))}
                  </select>
                </div>
              </Field>

              {/* Género */}
              <Field label="Género *" error={err('genero')}>
                <div className="flex gap-2">
                  <button className={radioBtnCls(form.genero === 'Hombre')} onClick={() => upd('genero', 'Hombre')}>
                    Hombre
                  </button>
                  <button className={radioBtnCls(form.genero === 'Mujer')} onClick={() => upd('genero', 'Mujer')}>
                    Mujer
                  </button>
                </div>
              </Field>

              {/* Email */}
              <Field
                label="Email *"
                error={err('email')}
                hint="Te enviaremos el resumen de tu póliza aquí"
              >
                <input
                  type="email"
                  className={inputCls}
                  value={form.email}
                  onChange={(e) => upd('email', e.target.value.trim())}
                  placeholder="tu@email.com"
                  autoComplete="email"
                  inputMode="email"
                />
              </Field>

              {/* Teléfono */}
              <Field label="Teléfono *" error={err('telefono')}>
                <input
                  type="tel"
                  className={inputCls}
                  value={form.telefono}
                  onChange={(e) => upd('telefono', e.target.value.replace(/\D/g, '').slice(0, 15))}
                  placeholder="600 000 000"
                  autoComplete="tel"
                  inputMode="numeric"
                />
              </Field>
            </div>

            <NavButtons onPrev={prev} onNext={next} />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            STEP 2 — ASEGURADOS
        ════════════════════════════════════════════════════════════ */}
        {step === 2 && (
          <div>
            <ProgressBar step={2} total={4} label="Datos de los asegurados" />

            <div className="space-y-4 mb-4">
              {form.asegurados.map((a, i) => {
                const esMenor14 = a.edad < 14;
                const esTitular = i === 0;

                return (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
                    {/* Cabecera asegurado */}
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: esTitular ? '#003087' : '#009FE3' }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm">
                          {esTitular ? 'Titular del seguro' : `Asegurado ${i + 1}`}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {a.edad} años{esMenor14 ? ' · menor de 14 años' : ''}
                        </p>
                      </div>
                    </div>

                    {/* Copiar datos del titular (solo en asegurado 1 si no es el titular) */}
                    {esTitular && (
                      <button
                        onClick={() => {
                          updAsegurado(0, 'nombre',    form.nombre);
                          updAsegurado(0, 'apellidos', form.apellidos);
                          updAsegurado(0, 'docType',   form.docType);
                          updAsegurado(0, 'docNum',    form.docNum);
                          updAsegurado(0, 'diaNac',    form.diaNac);
                          updAsegurado(0, 'mesNac',    form.mesNac);
                          updAsegurado(0, 'anioNac',   form.anioNac);
                          updAsegurado(0, 'genero',    form.genero);
                        }}
                        className="w-full mb-3 py-2 text-xs font-semibold rounded-xl border border-dashed border-[#009FE3] text-[#009FE3] hover:bg-[#009FE3]/8 transition-colors"
                      >
                        ↓ Copiar mis datos del paso anterior
                      </button>
                    )}

                    {/* Nombre */}
                    <Field label="Nombre *" error={err(`a${i}_nombre`)}>
                      <input
                        type="text"
                        className={inputCls}
                        value={a.nombre}
                        onChange={(e) => updAsegurado(i, 'nombre', e.target.value)}
                        placeholder="Nombre"
                        autoComplete="off"
                      />
                    </Field>

                    {/* Apellidos */}
                    <Field label="Apellidos *" error={err(`a${i}_apellidos`)}>
                      <input
                        type="text"
                        className={inputCls}
                        value={a.apellidos}
                        onChange={(e) => updAsegurado(i, 'apellidos', e.target.value)}
                        placeholder="Apellidos"
                        autoComplete="off"
                      />
                    </Field>

                    {/* Documento — lógica especial <14 */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Documento de identidad *
                      </label>
                      {esMenor14 && (
                        <label className="flex items-center gap-2 mb-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-[#009FE3] w-4 h-4"
                            checked={a.usarDniTitular}
                            onChange={(e) => updAsegurado(i, 'usarDniTitular', e.target.checked)}
                          />
                          <span className="text-sm text-gray-600">
                            Usar el DNI del titular <span className="text-gray-400">(menor sin DNI propio)</span>
                          </span>
                        </label>
                      )}
                      {!a.usarDniTitular && (
                        <div className="flex gap-2">
                          <select
                            className={selectCls}
                            style={{ width: '8.5rem', flexShrink: 0 }}
                            value={a.docType}
                            onChange={(e) => updAsegurado(i, 'docType', e.target.value as DocType)}
                          >
                            <option value="NIF">NIF</option>
                            <option value="NIE">NIE</option>
                            <option value="Pasaporte">Pasaporte</option>
                          </select>
                          <input
                            type="text"
                            className={inputCls}
                            style={{ flex: '1 1 auto', minWidth: 0, textTransform: 'uppercase' }}
                            value={a.docNum}
                            onChange={(e) => updAsegurado(i, 'docNum', e.target.value.toUpperCase().slice(0, 15))}
                            placeholder="Nº documento"
                          />
                        </div>
                      )}
                      {a.usarDniTitular && (
                        <div
                          className="px-3 py-2.5 rounded-xl text-sm text-gray-500 border border-gray-200 bg-gray-50"
                        >
                          Se usará el DNI del titular: <strong>{form.docNum || '—'}</strong>
                        </div>
                      )}
                      {err(`a${i}_docNum`) && (
                        <p className="flex items-center gap-1 text-xs mt-1" style={{ color: '#EF4444' }}>
                          <AlertCircle className="w-3 h-3" />
                          {err(`a${i}_docNum`)}
                        </p>
                      )}
                    </div>

                    {/* Fecha nacimiento */}
                    <Field label="Fecha de nacimiento">
                      <div className="flex gap-2">
                        <select
                          className={`${selectCls} flex-1`}
                          value={a.diaNac}
                          onChange={(e) => updAsegurado(i, 'diaNac', e.target.value)}
                        >
                          <option value="">Día</option>
                          {Array.from({ length: 31 }, (_, d) => d + 1).map((d) => (
                            <option key={d} value={String(d).padStart(2, '0')}>{d}</option>
                          ))}
                        </select>
                        <select
                          className={`${selectCls} flex-[1.5]`}
                          value={a.mesNac}
                          onChange={(e) => updAsegurado(i, 'mesNac', e.target.value)}
                        >
                          <option value="">Mes</option>
                          {MESES.slice(1).map((m, mi) => (
                            <option key={mi + 1} value={String(mi + 1).padStart(2, '0')}>{m}</option>
                          ))}
                        </select>
                        <select
                          className={`${selectCls} flex-1`}
                          value={a.anioNac}
                          onChange={(e) => updAsegurado(i, 'anioNac', e.target.value)}
                        >
                          <option value="">Año</option>
                          {Array.from({ length: 90 }, (_, idx) => new Date().getFullYear() - idx).map((y) => (
                            <option key={y} value={String(y)}>{y}</option>
                          ))}
                        </select>
                      </div>
                    </Field>

                    {/* Género */}
                    <Field label="Género *" error={err(`a${i}_genero`)}>
                      <div className="flex gap-2">
                        <button className={radioBtnCls(a.genero === 'Hombre')} onClick={() => updAsegurado(i, 'genero', 'Hombre')}>
                          Hombre
                        </button>
                        <button className={radioBtnCls(a.genero === 'Mujer')} onClick={() => updAsegurado(i, 'genero', 'Mujer')}>
                          Mujer
                        </button>
                      </div>
                    </Field>

                    {/* Parentesco (no para el primer asegurado / titular) */}
                    {!esTitular && (
                      <Field label="Parentesco con el titular">
                        <select
                          className={selectCls}
                          value={a.parentesco}
                          onChange={(e) => updAsegurado(i, 'parentesco', e.target.value)}
                        >
                          <option value="">Selecciona...</option>
                          <option value="Cónyuge">Cónyuge / Pareja</option>
                          <option value="Hijo">Hijo/a</option>
                          <option value="Padre/Madre">Padre / Madre</option>
                          <option value="Otro">Otro familiar</option>
                        </select>
                      </Field>
                    )}
                  </div>
                );
              })}
            </div>

            <NavButtons onPrev={prev} onNext={next} />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            STEP 3 — DECLARACIÓN DE SALUD
        ════════════════════════════════════════════════════════════ */}
        {step === 3 && (
          <div>
            <ProgressBar step={3} total={4} label="Declaración de salud" />

            <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
              <div className="flex items-start gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#DBEAFE' }}
                >
                  <Heart className="w-5 h-5" style={{ color: '#1D4ED8' }} />
                </div>
                <div>
                  <h2 className="font-black text-lg leading-tight" style={{ color: '#003087' }}>
                    Declaración de salud
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Esta información es necesaria para la contratación. Adeslas cubre la mayoría
                    de condiciones desde el primer día.
                  </p>
                </div>
              </div>

              {/* Pregunta principal */}
              <p className="text-sm font-semibold text-gray-700 mb-3">
                ¿Alguno de los asegurados ha sido diagnosticado o tratado en los últimos
                5 años por alguna enfermedad o condición médica?
              </p>

              <div className="space-y-2 mb-2">
                <label
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    form.tieneCondiciones === 'no'
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="salud"
                    className="sr-only"
                    checked={form.tieneCondiciones === 'no'}
                    onChange={() => upd('tieneCondiciones', 'no')}
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      form.tieneCondiciones === 'no' ? 'border-green-500' : 'border-gray-300'
                    }`}
                  >
                    {form.tieneCondiciones === 'no' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">No, ninguno</p>
                    <p className="text-xs text-gray-500">Todos los asegurados gozan de buena salud</p>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                    form.tieneCondiciones === 'si'
                      ? 'border-[#009FE3] bg-[#009FE3]/8'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="salud"
                    className="sr-only"
                    checked={form.tieneCondiciones === 'si'}
                    onChange={() => upd('tieneCondiciones', 'si')}
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      form.tieneCondiciones === 'si' ? 'border-[#009FE3]' : 'border-gray-300'
                    }`}
                  >
                    {form.tieneCondiciones === 'si' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#009FE3]" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Sí, uno o más</p>
                    <p className="text-xs text-gray-500">Completaré los detalles a continuación</p>
                  </div>
                </label>
              </div>

              {err('salud') && (
                <p className="flex items-center gap-1 text-xs mt-1 mb-3" style={{ color: '#EF4444' }}>
                  <AlertCircle className="w-3 h-3" />
                  {err('salud')}
                </p>
              )}

              {/* Detalle por asegurado (si responde Sí) */}
              {form.tieneCondiciones === 'si' && (
                <div className="mt-4 space-y-6">
                  {form.asegurados.map((a, i) => {
                    const s = form.saludDetalle[i];
                    return (
                      <div key={i}>
                        <h4 className="font-bold text-sm text-gray-700 mb-3 border-t border-gray-100 pt-4">
                          {i === 0 ? 'Titular' : `Asegurado ${i + 1}`}
                          {a.nombre ? ` — ${a.nombre} ${a.apellidos}` : ''}
                        </h4>

                        {/* Peso / Altura */}
                        <div className="flex gap-3 mb-3">
                          <Field label="Peso (kg)">
                            <input
                              type="number"
                              className={inputCls}
                              value={s.peso}
                              onChange={(e) => updSalud(i, 'peso', e.target.value)}
                              placeholder="70"
                              min={20} max={250}
                              inputMode="numeric"
                            />
                          </Field>
                          <Field label="Altura (cm)">
                            <input
                              type="number"
                              className={inputCls}
                              value={s.altura}
                              onChange={(e) => updSalud(i, 'altura', e.target.value)}
                              placeholder="170"
                              min={50} max={250}
                              inputMode="numeric"
                            />
                          </Field>
                        </div>

                        {/* Hábitos */}
                        <div className="flex gap-3 mb-3">
                          <label className="flex items-center gap-2 cursor-pointer text-sm">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300 text-[#009FE3]"
                              checked={s.fumador}
                              onChange={(e) => updSalud(i, 'fumador', e.target.checked)}
                            />
                            Fumador/a
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer text-sm">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300 text-[#009FE3]"
                              checked={s.alcohol}
                              onChange={(e) => updSalud(i, 'alcohol', e.target.checked)}
                            />
                            Consumo de alcohol
                          </label>
                        </div>

                        {/* Enfermedades en grid */}
                        <p className="text-xs font-semibold text-gray-600 mb-2">
                          Marca las condiciones que aplican (últ. 5 años):
                        </p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {ENFERMEDADES.map(([key, label]) => (
                            <label
                              key={key}
                              className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer text-xs transition-all ${
                                s.condiciones.includes(key)
                                  ? 'border-[#009FE3] bg-[#009FE3]/8 text-gray-800'
                                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
                              }`}
                            >
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={s.condiciones.includes(key)}
                                onChange={() => toggleCondicion(i, key)}
                              />
                              <div
                                className={`w-3.5 h-3.5 rounded border flex-shrink-0 flex items-center justify-center ${
                                  s.condiciones.includes(key)
                                    ? 'border-[#009FE3] bg-[#009FE3]'
                                    : 'border-gray-300'
                                }`}
                              >
                                {s.condiciones.includes(key) && (
                                  <Check className="w-2 h-2 text-white" />
                                )}
                              </div>
                              {label}
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <NavButtons onPrev={prev} onNext={next} />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            STEP 4 — DIRECCIÓN Y PAGO
        ════════════════════════════════════════════════════════════ */}
        {step === 4 && (
          <div>
            <ProgressBar step={4} total={4} label="Dirección y forma de pago" />

            {/* Dirección */}
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
              <h2 className="font-black text-lg mb-4" style={{ color: '#003087' }}>
                Dirección de la póliza
              </h2>

              <Field label="Código postal *" error={err('cp')}>
                <input
                  type="text"
                  className={inputCls}
                  value={form.cp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 5);
                    upd('cp', val);
                  }}
                  placeholder="28001"
                  inputMode="numeric"
                  maxLength={5}
                />
              </Field>

              <Field label="Población *" error={err('poblacion')}>
                <input
                  type="text"
                  className={inputCls}
                  value={form.poblacion}
                  onChange={(e) => upd('poblacion', e.target.value)}
                  placeholder="Ciudad / Municipio"
                  autoComplete="address-level2"
                />
              </Field>

              <Field label="Dirección completa *" error={err('direccion')}>
                <input
                  type="text"
                  className={inputCls}
                  value={form.direccion}
                  onChange={(e) => upd('direccion', e.target.value)}
                  placeholder="Calle, número, piso..."
                  autoComplete="street-address"
                />
              </Field>
            </div>

            {/* Pago */}
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
              <h2 className="font-black text-lg mb-1" style={{ color: '#003087' }}>
                Domiciliación bancaria
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Se emitirá un recibo mensual de <strong>{precio} €</strong> el primer día de cada mes.
              </p>

              <Field label="Titular de la cuenta *" error={err('ibanTitular')}>
                <input
                  type="text"
                  className={inputCls}
                  value={form.ibanTitular}
                  onChange={(e) => upd('ibanTitular', e.target.value)}
                  placeholder="Nombre del titular bancario"
                  autoComplete="name"
                />
              </Field>

              <Field
                label="IBAN *"
                error={err('iban')}
                hint={!err('iban') ? 'Formato: ES00 0000 0000 00 0000000000' : undefined}
              >
                <div className="relative">
                  <input
                    type="text"
                    className={`${inputCls} font-mono tracking-wider uppercase pr-10`}
                    value={form.iban}
                    onChange={(e) => {
                      const val = formatIBANInput(e.target.value);
                      upd('iban', val);
                    }}
                    placeholder="ES00 0000 0000 00 0000000000"
                    autoComplete="off"
                    inputMode="text"
                    maxLength={29}
                    spellCheck={false}
                  />
                  {form.iban && validateIBAN(form.iban) && (
                    <CheckCircle2
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: '#16A34A' }}
                    />
                  )}
                </div>
              </Field>

              {/* Resumen mensual */}
              <div
                className="mt-2 flex items-center justify-between p-3 rounded-xl text-sm"
                style={{ backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD' }}
              >
                <span className="text-gray-600">Cuota mensual</span>
                <span className="font-black text-lg" style={{ color: '#003087' }}>
                  {precio} €/mes
                </span>
              </div>

              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <Shield className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                Tus datos bancarios están cifrados y protegidos
              </div>
            </div>

            <NavButtons onPrev={prev} onNext={next} />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            STEP 5 — REVISIÓN Y CONFIRMACIÓN
        ════════════════════════════════════════════════════════════ */}
        {step === 5 && (
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-black" style={{ color: '#003087' }}>
                Revisa tu solicitud
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Comprueba que todo es correcto antes de confirmar.
              </p>
            </div>

            {/* Producto */}
            <SummaryCard title="Producto">
              <SummaryRow label="Seguro" value={params.productoNombre} highlight />
              <SummaryRow label="Precio mensual" value={`${precio} €/mes`} highlight />
              <SummaryRow label="Provincia" value={params.provincia} />
              <SummaryRow
                label="Fecha de inicio"
                value={new Date(form.fechaInicio).toLocaleDateString('es-ES', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              />
            </SummaryCard>

            {/* Titular */}
            <SummaryCard title="Titular">
              <SummaryRow label="Nombre" value={`${form.nombre} ${form.apellidos}`} />
              <SummaryRow label="Documento" value={`${form.docType}: ${form.docNum}`} />
              <SummaryRow label="Fecha nac." value={`${form.diaNac}/${form.mesNac}/${form.anioNac}`} />
              <SummaryRow label="Email" value={form.email} />
              <SummaryRow label="Teléfono" value={form.telefono} />
            </SummaryCard>

            {/* Asegurados */}
            <SummaryCard title={`Asegurados (${form.asegurados.length})`}>
              {form.asegurados.map((a, i) => (
                <SummaryRow
                  key={i}
                  label={i === 0 ? 'Titular' : a.parentesco || `Asegurado ${i + 1}`}
                  value={`${a.nombre} ${a.apellidos} (${a.edad} años)`}
                />
              ))}
            </SummaryCard>

            {/* Salud */}
            <SummaryCard title="Declaración de salud">
              <SummaryRow
                label="Condiciones previas"
                value={form.tieneCondiciones === 'no' ? 'Ninguna declarada' : 'Sí, declaradas'}
              />
            </SummaryCard>

            {/* Pago */}
            <SummaryCard title="Forma de pago">
              <SummaryRow label="Titular cuenta" value={form.ibanTitular} />
              <SummaryRow
                label="IBAN"
                value={`****${form.iban.replace(/\s/g, '').slice(-4)}`}
              />
              <SummaryRow label="Modalidad" value="Mensual · Domiciliación bancaria" />
            </SummaryCard>

            {/* Condiciones */}
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#009FE3] flex-shrink-0"
                  checked={form.aceptaCondiciones}
                  onChange={(e) => upd('aceptaCondiciones', e.target.checked)}
                />
                <span className="text-sm text-gray-600 leading-relaxed">
                  He leído y acepto las{' '}
                  <a
                    href="https://adeslas.numero1salud.es/condiciones-generales/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline"
                    style={{ color: '#009FE3' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Condiciones Generales
                  </a>
                  , la{' '}
                  <a
                    href="https://adeslas.numero1salud.es/politica-de-privacidad/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline"
                    style={{ color: '#009FE3' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Política de Privacidad
                  </a>{' '}
                  y el tratamiento de mis datos conforme al RGPD.
                </span>
              </label>
              {err('condiciones') && (
                <p className="flex items-center gap-1 text-xs mt-2" style={{ color: '#EF4444' }}>
                  <AlertCircle className="w-3 h-3" />
                  {err('condiciones')}
                </p>
              )}
            </div>

            {/* ¿Viene de otra aseguradora? */}
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#009FE3]"
                  checked={form.otraAseguradora}
                  onChange={(e) => upd('otraAseguradora', e.target.checked)}
                />
                <span className="text-sm text-gray-600">
                  Actualmente tengo seguro médico con otra compañía
                </span>
              </label>
            </div>

            {err('submit') && (
              <div
                className="flex items-center gap-2 p-4 rounded-xl mb-4 text-sm"
                style={{ backgroundColor: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA' }}
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {err('submit')}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={handleSubmit}
                disabled={sending}
                className="w-full py-4 rounded-2xl font-bold text-white text-base tracking-wide transition-all hover:opacity-90 active:scale-[0.98] shadow-lg disabled:opacity-50"
                style={{ backgroundColor: '#E4097D' }}
              >
                {sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando solicitud...
                  </span>
                ) : (
                  'Confirmar y contratar →'
                )}
              </button>
              <button
                onClick={prev}
                className="w-full py-3 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Editar datos
              </button>
            </div>

            <p className="text-xs text-center text-gray-400 mt-3">
              🔒 Proceso 100% seguro · Tus datos están protegidos
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared sub-components
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Botones de navegación — fijos en la parte inferior de la pantalla.
 * El contenido principal tiene pb-24 para no quedar tapado.
 */
function NavButtons({
  onPrev,
  onNext,
  nextLabel = 'Siguiente →',
}: {
  onPrev: () => void;
  onNext: () => void;
  nextLabel?: string;
}) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3"
      style={{
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid #E5E7EB',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.07)',
      }}
    >
      <div className="max-w-xl mx-auto flex gap-3">
        <button
          onClick={onPrev}
          className="flex items-center gap-1.5 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Atrás
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 rounded-xl font-bold text-white text-sm tracking-wide transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: '#E4097D' }}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}

function SummaryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-3">
      <div className="px-4 py-2.5 font-bold text-sm" style={{ backgroundColor: '#F0F9FF', color: '#0369A1' }}>
        {title}
      </div>
      <div className="px-4 py-2 divide-y divide-gray-50">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 gap-3">
      <span className="text-xs text-gray-500 flex-shrink-0">{label}</span>
      <span className={`text-xs text-right ${highlight ? 'font-black text-base' : 'font-semibold text-gray-800'}`}
        style={highlight ? { color: '#003087' } : undefined}>
        {value}
      </span>
    </div>
  );
}
