'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Phone, Shield, CheckCircle2, ChevronRight } from 'lucide-react';

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface ProductSpec {
  hospitalizacion: boolean;
  urgencias:       boolean;
  extranjero:      string | false;
  farmacia:        string | false;
  fisioterapia:    boolean;
  dental:          boolean;
  chequeo:         boolean;
}

// ─── Coberturas verificadas (2026) ────────────────────────────────────────────
const PRODUCT_SPECS: Record<string, ProductSpec> = {
  ya:               { hospitalizacion: false, urgencias: false, extranjero: false,        farmacia: false,  fisioterapia: true,  dental: false, chequeo: false },
  esencial:         { hospitalizacion: true,  urgencias: true,  extranjero: '12.000 €',   farmacia: false,  fisioterapia: true,  dental: false, chequeo: false },
  plena:            { hospitalizacion: true,  urgencias: true,  extranjero: '12.000 €',   farmacia: false,  fisioterapia: true,  dental: false, chequeo: false },
  completaPlus:     { hospitalizacion: true,  urgencias: true,  extranjero: '30.000 €',   farmacia: '50 %', fisioterapia: true,  dental: true,  chequeo: true  },
  completaPlusPlus: { hospitalizacion: true,  urgencias: true,  extranjero: '12.000 €',   farmacia: false,  fisioterapia: true,  dental: false, chequeo: false },
  completa:         { hospitalizacion: true,  urgencias: true,  extranjero: '100.000 €',  farmacia: '50 %', fisioterapia: true,  dental: true,  chequeo: true  },
  reembolso:        { hospitalizacion: true,  urgencias: true,  extranjero: '12.000 €',   farmacia: false,  fisioterapia: true,  dental: false, chequeo: false },
  seniors:          { hospitalizacion: true,  urgencias: true,  extranjero: '12.000 €',   farmacia: false,  fisioterapia: true,  dental: true,  chequeo: false },
  'seniors-total':  { hospitalizacion: true,  urgencias: true,  extranjero: '100.000 €',  farmacia: '50 %', fisioterapia: true,  dental: true,  chequeo: false },
};

// ─── Grupos de características ───────────────────────────────────────────────
type FeatureKey = 'analisis' | 'especialidades' | 'diagnostico' | keyof ProductSpec;

interface FeatureItem { key: FeatureKey; icon: string; label: string }

const FEATURE_GROUPS: { label: string; features: FeatureItem[] }[] = [
  {
    label: 'Cobertura médica',
    features: [
      { key: 'analisis',        icon: '🧪', label: 'Análisis clínicos' },
      { key: 'especialidades',  icon: '🩺', label: 'Especialistas'     },
      { key: 'diagnostico',     icon: '🔬', label: 'Diagnóstico'       },
      { key: 'hospitalizacion', icon: '🏥', label: 'Hospitalización'   },
      { key: 'urgencias',       icon: '🚑', label: 'Urgencias 24 h'    },
    ],
  },
  {
    label: 'Coberturas adicionales',
    features: [
      { key: 'extranjero', icon: '✈️', label: 'Extranjero' },
      { key: 'farmacia',   icon: '💊', label: 'Farmacia'   },
    ],
  },
  {
    label: 'Servicios incluidos',
    features: [
      { key: 'fisioterapia', icon: '🏃', label: 'Rehabilitación'       },
      { key: 'dental',       icon: '🦷', label: 'Dental incluido'      },
      { key: 'chequeo',      icon: '🩻', label: 'Chequeo médico anual' },
    ],
  },
];

// ─── Pills ────────────────────────────────────────────────────────────────────
interface PillDef { label: string; bg: string; color: string; border: string }

const COPAGO_PILL: Record<string, PillDef> = {
  ya:               { label: 'Con copago',      bg: '#FEF3C7', color: '#92400E', border: '#FCD34D' },
  esencial:         { label: 'Con copago',      bg: '#FEF3C7', color: '#92400E', border: '#FCD34D' },
  plena:            { label: 'Copago reducido', bg: '#E0F2FE', color: '#0369A1', border: '#7DD3FC' },
  completaPlus:     { label: 'Con copago',      bg: '#FEF3C7', color: '#92400E', border: '#FCD34D' },
  completaPlusPlus: { label: 'Sin copago',      bg: '#DCFCE7', color: '#15803D', border: '#86EFAC' },
  completa:         { label: 'Sin copago',      bg: '#DCFCE7', color: '#15803D', border: '#86EFAC' },
  reembolso:        { label: 'Sin copago',      bg: '#DCFCE7', color: '#15803D', border: '#86EFAC' },
  seniors:          { label: 'Con copago',      bg: '#FEF3C7', color: '#92400E', border: '#FCD34D' },
  'seniors-total':  { label: 'Con copago',      bg: '#FEF3C7', color: '#92400E', border: '#FCD34D' },
};

const COVERAGE_PILL: Record<string, PillDef> = {
  ya:               { label: 'Ambulatoria',    bg: '#F1F5F9', color: '#475569', border: '#CBD5E1' },
  esencial:         { label: 'Completa',       bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  plena:            { label: 'Completa',       bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  completaPlus:     { label: 'Completa',       bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  completaPlusPlus: { label: 'Completa',       bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  completa:         { label: 'Completa',       bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  reembolso:        { label: 'Completa + Reembolso', bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  seniors:          { label: '+55 años',       bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE' },
  'seniors-total':  { label: '+63 años',       bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE' },
};

// Columnas con fondo azul destacado
const HIGHLIGHTED_IDS = new Set(['completa', 'completaPlus']);
// Columnas que muestran la pill "3 años sin subidas"
const PROMO_IDS       = new Set(['completa', 'completaPlus']);

// ─── Categorías de producto (para cabecera agrupada) ─────────────────────────
const CATEGORY_MAP: Record<string, string> = {
  ya:               'Ambulatorio',
  esencial:         'Completo',
  plena:            'Completo',
  completaPlus:     'Completo',
  completaPlusPlus: 'Completo',
  completa:         'Completo',
  reembolso:        'Reembolso',
  seniors:          'Sénior',
  'seniors-total':  'Sénior',
};

const CATEGORY_STYLE: Record<string, { color: string; border: string; bg: string }> = {
  Ambulatorio: { color: '#475569', border: '#94A3B8', bg: '#F8FAFC' },
  Completo:    { color: '#1D4ED8', border: '#3B82F6', bg: '#EFF6FF' },
  Reembolso:   { color: '#C2410C', border: '#F97316', bg: '#FFF7ED' },
  Sénior:      { color: '#6D28D9', border: '#8B5CF6', bg: '#F5F3FF' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getCoverage(productId: string, key: FeatureKey): string | boolean | false {
  // Siempre incluidos en todos los productos
  if (key === 'analisis' || key === 'especialidades' || key === 'diagnostico') return true;
  const spec = PRODUCT_SPECS[productId];
  if (!spec) return false;
  return spec[key as keyof ProductSpec] as string | boolean | false;
}

// ─── CheckIcon corporativo Adeslas ────────────────────────────────────────────
// isHL=false → círculo azul #009FE3 con ✓ blanco (columnas normales)
// isHL=true  → círculo blanco puro con ✓ azul oscuro (columna destacada)
function CheckIcon({ isHL = false }: { isHL?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        width: 22,
        height: 22,
        borderRadius: '50%',
        backgroundColor: isHL ? '#FFFFFF' : '#009FE3',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: isHL
          ? '0 2px 8px rgba(0,0,0,0.22)'
          : '0 2px 8px rgba(0,159,227,0.4)',
      }}
    >
      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
        <path
          d="M1.5 5L4.5 8L10.5 1.5"
          stroke={isHL ? '#003087' : '#FFFFFF'}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// ─── CrossIcon ────────────────────────────────────────────────────────────────
// isHL=true → × blanco semitransparente visible sobre fondo azul oscuro
function CrossIcon({ isHL = false }: { isHL?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', width: 22, height: 22, alignItems: 'center', justifyContent: 'center' }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5"
          stroke={isHL ? 'rgba(255,255,255,0.45)' : '#CBD5E1'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

// ─── ValueCell ────────────────────────────────────────────────────────────────
function ValueCell({ value, isHL }: { value: string | boolean | false; isHL: boolean }) {
  if (value === false) return <CrossIcon isHL={isHL} />;
  if (typeof value === 'string') {
    return (
      <span style={{
        display: 'inline-block',
        fontSize: 10,
        fontWeight: 700,
        padding: '3px 8px',
        borderRadius: 20,
        backgroundColor: isHL ? '#FFFFFF' : '#DBEAFE',
        color: isHL ? '#003087' : '#1E40AF',
        lineHeight: 1.5,
        whiteSpace: 'nowrap',
        letterSpacing: '0.01em',
        border: isHL ? '1px solid rgba(255,255,255,0.9)' : '1px solid #BFDBFE',
        boxShadow: isHL ? '0 1px 6px rgba(0,0,0,0.15)' : 'none',
      }}>
        {value}
      </span>
    );
  }
  return <CheckIcon isHL={isHL} />;
}

// ─── Tipos del componente ─────────────────────────────────────────────────────
interface ProductResult {
  product: { id: string; name: string; slug: string };
  price: number;
  originalPrice?: number;
}

interface ModalResultadosProps {
  results:       ProductResult[];
  ages:          number[];
  provincia:     string;
  nombre:        string;
  email:         string;
  telefono:      string;
  numAsegurados: number;
  onClose:       () => void;
}

const fmtPrice = (price: number) => {
  const [int, dec] = price.toFixed(2).split('.');
  return { int, dec };
};

// ─── Dimensiones ──────────────────────────────────────────────────────────────
const LABEL_W = 162;   // ancho suficiente para "Chequeo médico anual"
const PROD_W  = 138;   // columnas de producto más holgadas

// ─── Componente principal ─────────────────────────────────────────────────────
export default function ModalResultados({
  results,
  ages,
  provincia,
  nombre,
  email,
  telefono,
  numAsegurados,
  onClose,
}: ModalResultadosProps) {

  // Bloquear scroll del body
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Scroll horizontal → indicador + sombra sticky
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hasScrolled,    setHasScrolled]    = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
      setHasScrolled(el.scrollLeft > 4);
    };
    check();
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [results]);

  // Hover por fila
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  // Grupos de categoría para la cabecera agrupada (Ambulatorio / Completo / Reembolso)
  const categoryGroups = results.reduce<{ label: string; count: number }[]>((acc, r) => {
    const cat = CATEGORY_MAP[r.product.id] ?? 'Completo';
    if (acc.length === 0 || acc[acc.length - 1].label !== cat) {
      acc.push({ label: cat, count: 1 });
    } else {
      acc[acc.length - 1].count++;
    }
    return acc;
  }, []);

  // Navegar a contratación
  const handleContratar = (result: ProductResult) => {
    const params = new URLSearchParams();
    params.set('producto',       result.product.slug.replace(/^\//, ''));
    params.set('productoNombre', result.product.name);
    params.set('precio',         result.price.toFixed(2));
    if (result.originalPrice !== undefined) {
      params.set('precioBase', result.originalPrice.toFixed(2));
      params.set('descuento',  '10');
    }
    params.set('nombre',    nombre);
    params.set('email',     email);
    params.set('telefono',  telefono);
    params.set('edades',    ages.join(','));
    params.set('provincia', provincia);
    window.location.href = `/contratar?${params.toString()}`;
  };

  const primerNombre = nombre ? nombre.trim().split(' ')[0] : '';

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex flex-col" style={{ backgroundColor: '#EEF5FB' }}>

      {/* ══ CABECERA ══════════════════════════════════════════════════════════ */}
      <header
        className="flex-shrink-0 px-4 py-3 sm:px-6 flex items-center justify-between"
        style={{ background: 'linear-gradient(120deg,#002266 0%,#003087 50%,#0077B6 100%)' }}
      >
        <div>
          <p className="text-white font-bold text-sm leading-tight">
            {primerNombre
              ? `¡Hola ${primerNombre}! Tu seguro está listo 🎉`
              : 'Tu seguro Adeslas está listo 🎉'}
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {numAsegurados} {numAsegurados === 1 ? 'asegurado' : 'asegurados'} · {provincia}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="tel:917105000"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
          >
            <Phone className="w-3 h-3" /> 91 710 50 00
          </a>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
            aria-label="Cerrar"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </header>

      {/* ══ CONTENIDO ═════════════════════════════════════════════════════════ */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-3 py-4 sm:px-6 sm:py-5">

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 text-[11px] text-gray-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> Contratación segura
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#009FE3' }} /> Sin compromiso
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-sm leading-none">🔒</span> SSL cifrado
            </span>
          </div>

          {/* Sin resultados */}
          {results.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm max-w-sm mx-auto">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="font-bold text-gray-800 mb-2">No hay tarifas disponibles</h3>
              <p className="text-sm text-gray-500 mb-5">No hemos encontrado tarifas para los datos seleccionados.</p>
              <button onClick={onClose} className="text-sm font-semibold hover:underline" style={{ color: '#009FE3' }}>
                ← Volver al calculador
              </button>
            </div>
          )}

          {/* ══ TABLA COMPARATIVA ══════════════════════════════════════════════ */}
          {results.length > 0 && (
            <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto' }}>

              {/* Indicador scroll mobile */}
              {canScrollRight && (
                <div
                  className="sm:hidden flex items-center justify-center gap-1.5 mb-2"
                  style={{ color: '#009FE3', fontSize: 11, fontWeight: 600 }}
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                  <span>Desliza para ver todos los planes</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                </div>
              )}

              {/* Degradado derecho indicador scroll */}
              {canScrollRight && (
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 56, height: '100%', zIndex: 15, pointerEvents: 'none',
                  background: 'linear-gradient(to right, transparent, rgba(238,245,251,0.98))',
                  borderRadius: '0 14px 14px 0',
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10,
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    backgroundColor: '#003087',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: 0.55,
                    boxShadow: '0 2px 8px rgba(0,48,135,0.3)',
                  }}>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              {/* Contenedor scroll */}
              <div
                ref={scrollRef}
                style={{
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch' as never,
                  borderRadius: 14,
                  boxShadow: '0 4px 28px rgba(0,48,135,0.13)',
                  border: '1px solid #DDE5EF',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#CBD5E1 transparent',
                }}
              >
                <table style={{
                  tableLayout: 'fixed',
                  borderCollapse: 'separate',
                  borderSpacing: 0,
                  width: `${LABEL_W + results.length * PROD_W}px`,
                  minWidth: `${LABEL_W + results.length * PROD_W}px`,
                }}>
                  <colgroup>
                    <col style={{ width: LABEL_W }} />
                    {results.map((r) => <col key={r.product.id} style={{ width: PROD_W }} />)}
                  </colgroup>

                  {/* ════ CABECERAS ════ */}
                  <thead>

                    {/* ── Fila de categorías agrupadas ── */}
                    <tr>
                      {/* Celda esquina superior — sticky */}
                      <th style={{
                        position: 'sticky', left: 0, zIndex: 22,
                        backgroundColor: '#F8FAFC',
                        borderRight: '1px solid #DDE5EF',
                        borderBottom: '1px solid #DDE5EF',
                        padding: 0,
                        boxShadow: hasScrolled ? '4px 0 14px rgba(0,48,135,0.12)' : 'none',
                        transition: 'box-shadow 0.2s',
                      }} />
                      {categoryGroups.map((group) => {
                        const s = CATEGORY_STYLE[group.label] ?? CATEGORY_STYLE['Completo'];
                        return (
                          <th
                            key={group.label}
                            colSpan={group.count}
                            style={{
                              backgroundColor: s.bg,
                              borderBottom: `2px solid ${s.border}`,
                              borderLeft: `1px solid ${s.border}`,
                              padding: '7px 10px',
                              textAlign: 'center',
                            }}
                          >
                            <span style={{
                              fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
                              textTransform: 'uppercase', color: s.color,
                            }}>
                              {group.label}
                            </span>
                          </th>
                        );
                      })}
                    </tr>

                    {/* ── Fila de columnas de producto ── */}
                    <tr>
                      {/* Celda esquina inferior — sticky */}
                      <th style={{
                        position: 'sticky', left: 0, zIndex: 20,
                        backgroundColor: '#F8FAFC',
                        borderBottom: '2px solid #DDE5EF',
                        borderRight: '1px solid #DDE5EF',
                        padding: '16px 14px',
                        verticalAlign: 'bottom', textAlign: 'left',
                        boxShadow: hasScrolled ? '4px 0 14px rgba(0,48,135,0.12)' : 'none',
                        transition: 'box-shadow 0.2s',
                      }} />

                      {results.map((result) => {
                        const isHL    = HIGHLIGHTED_IDS.has(result.product.id);
                        const hasDisc = result.originalPrice !== undefined;
                        const { int, dec } = fmtPrice(result.price);
                        const copago = COPAGO_PILL[result.product.id] ?? { label: 'Con copago', bg: '#FEF3C7', color: '#92400E', border: '#FCD34D' };

                        return (
                          <th
                            key={result.product.id}
                            style={{
                              padding: 0, verticalAlign: 'top',
                              borderLeft: `1px solid ${isHL ? '#003087' : '#DDE5EF'}`,
                              borderBottom: `2px solid ${isHL ? '#003087' : '#DDE5EF'}`,
                              background: isHL
                                ? 'linear-gradient(160deg,#002266 0%,#003087 55%,#004DB3 100%)'
                                : '#FFFFFF',
                            }}
                          >
                            {/* Contenido cabecera — altura uniforme en todas las columnas */}
                            <div style={{
                              padding: '12px 10px 14px',
                              display: 'flex', flexDirection: 'column',
                              alignItems: 'center', gap: 6,
                              minHeight: 138,
                            }}>
                              {/* Nombre producto */}
                              <p style={{
                                fontSize: 12, fontWeight: 800, lineHeight: 1.3,
                                textAlign: 'center', margin: 0,
                                color: isHL ? '#FFFFFF' : '#003087',
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                                hyphens: 'auto',
                                width: '100%',
                              }}>
                                {result.product.name}
                              </p>

                              {/* Precio */}
                              <div style={{ textAlign: 'center' }}>
                                {hasDisc && (
                                  <p style={{
                                    fontSize: 9, textDecoration: 'line-through', textAlign: 'center',
                                    color: isHL ? 'rgba(255,255,255,0.45)' : '#CBD5E1',
                                    margin: 0, lineHeight: 1.2,
                                  }}>
                                    {fmtPrice(result.originalPrice!).int},{fmtPrice(result.originalPrice!).dec}€
                                  </p>
                                )}
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 1, justifyContent: 'center' }}>
                                  <span style={{ fontSize: 24, fontWeight: 900, lineHeight: 1, color: isHL ? '#FFFFFF' : '#003087' }}>
                                    {int}
                                  </span>
                                  <span style={{ fontSize: 12, fontWeight: 700, color: isHL ? '#FFFFFF' : '#003087' }}>
                                    ,{dec}€
                                  </span>
                                  <span style={{ fontSize: 9, color: isHL ? 'rgba(255,255,255,0.55)' : '#94A3B8', marginLeft: 2 }}>
                                    /mes
                                  </span>
                                </div>
                                {hasDisc && (
                                  <p style={{ fontSize: 9, fontWeight: 700, color: '#4ADE80', textAlign: 'center', margin: 0, lineHeight: 1.6 }}>
                                    🎉 −10 %
                                  </p>
                                )}
                              </div>

                              {/* Pills — copago + promo (cobertura movida a cabecera de grupo) */}
                              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', width: '100%' }}>
                                {/* Pill copago */}
                                <span style={{
                                  display: 'inline-block', fontSize: 10, fontWeight: 700,
                                  padding: '3px 9px', borderRadius: 20, lineHeight: 1.5,
                                  whiteSpace: 'nowrap',
                                  backgroundColor: isHL ? 'rgba(255,255,255,0.18)' : copago.bg,
                                  color: isHL ? '#FFFFFF' : copago.color,
                                  border: isHL ? '1px solid rgba(255,255,255,0.3)' : `1px solid ${copago.border}`,
                                }}>
                                  {copago.label}
                                </span>

                                {/* Pill promocional: 3 años sin subidas */}
                                {PROMO_IDS.has(result.product.id) && (
                                  <span style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 4,
                                    fontSize: 10, fontWeight: 800,
                                    padding: '3px 9px', borderRadius: 20, lineHeight: 1.5,
                                    whiteSpace: 'nowrap',
                                    backgroundColor: isHL ? '#FFFFFF' : '#003087',
                                    color: isHL ? '#003087' : '#FFFFFF',
                                    border: isHL ? '1px solid rgba(255,255,255,0.8)' : '1px solid #003087',
                                    boxShadow: isHL
                                      ? '0 2px 8px rgba(0,0,0,0.18)'
                                      : '0 2px 8px rgba(0,48,135,0.30)',
                                  }}>
                                    🔒 3 años sin subidas
                                  </span>
                                )}
                              </div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>

                  {/* ════ FILAS AGRUPADAS ════ */}
                  <tbody>
                    {FEATURE_GROUPS.map((group, gi) => (
                      <Fragment key={group.label}>

                        {/* ── Cabecera de grupo ── */}
                        <tr>
                          <td style={{
                            position: 'sticky', left: 0, zIndex: 10,
                            backgroundColor: '#EEF3FA',
                            borderTop: gi === 0 ? 'none' : '2px solid #DDE5EF',
                            borderBottom: '1px solid #DDE5EF',
                            borderRight: '1px solid #DDE5EF',
                            padding: '7px 14px',
                            boxShadow: hasScrolled ? '4px 0 14px rgba(0,48,135,0.12)' : 'none',
                            transition: 'box-shadow 0.2s',
                          }}>
                            <span style={{
                              fontSize: 9, fontWeight: 800, color: '#64748B',
                              textTransform: 'uppercase', letterSpacing: '0.1em',
                            }}>
                              {group.label}
                            </span>
                          </td>
                          {results.map((r) => {
                            const isHL = HIGHLIGHTED_IDS.has(r.product.id);
                            return (
                              <td key={r.product.id} style={{
                                backgroundColor: isHL ? 'rgba(0,48,135,0.07)' : '#EEF3FA',
                                borderTop: gi === 0 ? 'none' : `2px solid ${isHL ? 'rgba(0,48,135,0.15)' : '#DDE5EF'}`,
                                borderBottom: '1px solid #DDE5EF',
                                borderLeft: `1px solid ${isHL ? 'rgba(0,48,135,0.12)' : '#DDE5EF'}`,
                              }} />
                            );
                          })}
                        </tr>

                        {/* ── Filas de características ── */}
                        {group.features.map((feat, fi) => {
                          const rowKey = `${gi}-${feat.key}`;
                          const isHovered = hoveredRow === rowKey;
                          const isLastInGroup = fi === group.features.length - 1;
                          const isAbsoluteLast = gi === FEATURE_GROUPS.length - 1 && isLastInGroup;

                          return (
                            <tr
                              key={feat.key}
                              onMouseEnter={() => setHoveredRow(rowKey)}
                              onMouseLeave={() => setHoveredRow(null)}
                            >
                              {/* Etiqueta sticky */}
                              <td style={{
                                position: 'sticky', left: 0, zIndex: 10,
                                backgroundColor: isHovered ? '#E8EEF8' : '#FFFFFF',
                                borderBottom: isAbsoluteLast ? 'none' : '1px solid #F1F5F9',
                                borderRight: '1px solid #DDE5EF',
                                padding: '10px 14px',
                                boxShadow: hasScrolled ? '4px 0 14px rgba(0,48,135,0.12)' : 'none',
                                transition: 'background-color 0.12s, box-shadow 0.2s',
                              }}>
                                <span style={{
                                  fontSize: 12, color: '#334155', fontWeight: 500,
                                  display: 'flex', alignItems: 'center', gap: 7,
                                  whiteSpace: 'nowrap',
                                }}>
                                  <span style={{ fontSize: 15, lineHeight: 1, flexShrink: 0 }}>{feat.icon}</span>
                                  {feat.label}
                                </span>
                              </td>

                              {/* Valores */}
                              {results.map((result) => {
                                const isHL = HIGHLIGHTED_IDS.has(result.product.id);
                                const val  = getCoverage(result.product.id, feat.key);
                                return (
                                  <td
                                    key={result.product.id}
                                    style={{
                                      borderBottom: isAbsoluteLast ? 'none' : `1px solid ${isHL ? 'rgba(0,48,135,0.07)' : '#F1F5F9'}`,
                                      borderLeft: `1px solid ${isHL ? 'rgba(0,48,135,0.09)' : '#F1F5F9'}`,
                                      padding: '10px 6px',
                                      textAlign: 'center',
                                      backgroundColor: isHL
                                        ? (isHovered ? 'rgba(0,48,135,0.09)' : 'rgba(0,48,135,0.04)')
                                        : (isHovered ? '#E8EEF8' : '#FFFFFF'),
                                      transition: 'background-color 0.12s',
                                    }}
                                  >
                                    <ValueCell value={val} isHL={isHL} />
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </Fragment>
                    ))}
                  </tbody>

                  {/* ════ CTAs — desactivados temporalmente, reactivar en fase de contratación ════
                  <tfoot>
                    <tr>
                      <td style={{
                        position: 'sticky', left: 0, zIndex: 10,
                        backgroundColor: '#F8FAFC',
                        borderTop: '2px solid #DDE5EF',
                        padding: '12px 10px',
                        boxShadow: hasScrolled ? '4px 0 14px rgba(0,48,135,0.12)' : 'none',
                        transition: 'box-shadow 0.2s',
                      }} />
                      {results.map((result) => {
                        const isHL = HIGHLIGHTED_IDS.has(result.product.id);
                        return (
                          <td
                            key={result.product.id}
                            style={{
                              borderTop: `2px solid ${isHL ? '#003087' : '#DDE5EF'}`,
                              borderLeft: '1px solid #DDE5EF',
                              padding: '12px 8px',
                              textAlign: 'center',
                              backgroundColor: isHL ? 'rgba(0,48,135,0.04)' : '#FFFFFF',
                            }}
                          >
                            <button
                              onClick={() => handleContratar(result)}
                              style={{
                                width: '100%',
                                backgroundColor: '#E4097D',
                                color: '#FFF',
                                fontSize: 11, fontWeight: 800,
                                padding: '9px 6px',
                                borderRadius: 9, border: 'none', cursor: 'pointer',
                                letterSpacing: '0.02em', lineHeight: 1.3,
                                boxShadow: isHL
                                  ? '0 4px 16px rgba(228,9,125,0.48)'
                                  : '0 2px 8px rgba(228,9,125,0.28)',
                                transition: 'opacity 0.15s, transform 0.12s',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = '0.88';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = '1';
                                e.currentTarget.style.transform = 'translateY(0)';
                              }}
                            >
                              Contratar →
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  </tfoot>
                  ════ fin CTAs desactivados ════ */}
                </table>
              </div>
            </div>
          )}

          {/* Separador */}
          <div className="relative mt-6 mb-4 w-full max-w-screen-md mx-auto">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-[11px] text-gray-400 bg-[#EEF5FB] px-3">
              ¿Tienes dudas sobre las coberturas?
            </div>
          </div>

          {/* Card contacto dual: teléfono + WhatsApp */}
          <div
            className="bg-white rounded-2xl shadow-sm mb-20 sm:mb-8 w-full mx-auto overflow-hidden"
            style={{ maxWidth: 400, border: '1px solid #E2E8F0' }}
          >
            <div
              className="px-4 py-2.5 text-center"
              style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}
            >
              <p className="text-xs font-semibold text-gray-500">
                Nuestros asesores te ayudan a elegir el seguro perfecto
              </p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-100">

              {/* Teléfono */}
              <a
                href="tel:917105000"
                className="flex flex-col items-center gap-1.5 py-4 px-3 text-center hover:bg-gray-50 transition-colors"
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#EFF6FF' }}
                >
                  <Phone className="w-4 h-4" style={{ color: '#009FE3' }} />
                </span>
                <span className="text-xs font-bold" style={{ color: '#003087' }}>91 710 50 00</span>
                <span className="text-[10px] text-gray-400 leading-tight">Lun–Vie 9:00–19:00</span>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/34722567198?text=${encodeURIComponent('Hola, tengo dudas sobre las coberturas de los seguros Adeslas y me gustaría recibir asesoramiento personalizado. ¿Me pueden ayudar?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 py-4 px-3 text-center transition-colors"
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F0FDF4'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#DCFCE7' }}
                >
                  {/* WhatsApp SVG */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#16A34A">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </span>
                <span className="text-xs font-bold" style={{ color: '#15803D' }}>WhatsApp</span>
                <span className="text-[10px] text-gray-400 leading-tight">Respuesta inmediata</span>
              </a>
            </div>
          </div>

        </div>
      </main>

      {/* ══ BOTÓN WHATSAPP FLOTANTE ════════════════════════════════════════════
           Visible siempre en mobile (fixed bottom-right), se oculta en desktop
           donde el card de contacto ya es visible en el scroll ══════════════ */}
      <a
        href={`https://wa.me/34722567198?text=${encodeURIComponent('Hola, tengo dudas sobre las coberturas de los seguros Adeslas y me gustaría recibir asesoramiento personalizado. ¿Me pueden ayudar?')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 10001,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          padding: '10px 16px 10px 12px',
          borderRadius: 50,
          boxShadow: '0 4px 20px rgba(37,211,102,0.50)',
          textDecoration: 'none',
          fontSize: 13,
          fontWeight: 700,
          lineHeight: 1.2,
          transition: 'transform 0.15s, box-shadow 0.15s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(37,211,102,0.60)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.50)';
        }}
      >
        {/* Icono WhatsApp */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF" style={{ flexShrink: 0 }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        {/* Texto oculto en mobile muy pequeño, visible en pantallas medias */}
        <span className="hidden sm:inline">¿Dudas? Escríbenos</span>
        <span className="sm:hidden">Dudas</span>
      </a>

    </div>,
    document.body,
  );
}
