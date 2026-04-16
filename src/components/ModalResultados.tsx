'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Phone, Shield, CheckCircle2 } from 'lucide-react';

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface ProductSpec {
  hospitalizacion: boolean;
  urgencias:       boolean;
  extranjero:      string | false;
  farmacia:        string | false;
  fisioterapia:    boolean;
  dental:          boolean;
  chequeo:         boolean;   // chequeo médico anual incluido
}

// ─── Coberturas verificadas (2026) ────────────────────────────────────────────
// Extranjero: todos los seguros completos → 12.000 €
//             Vital Total → 30.000 € | Plena Total → 100.000 €
// Farmacia:   Vital Total y Plena Total → 50 % | Extra → no incluida
// Dental:     Vital Total, Plena Total, Seniors, Seniors Total
// Chequeo:    Vital Total, Plena Total
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

// ─── Filas de comparación ─────────────────────────────────────────────────────
type FeatureKey = 'especialidades' | 'diagnostico' | keyof ProductSpec;

const FEATURES: { key: FeatureKey; icon: string; label: string }[] = [
  { key: 'especialidades',  icon: '🩺', label: 'Especialidades'       },
  { key: 'diagnostico',     icon: '🔬', label: 'Diagnóstico'          },
  { key: 'hospitalizacion', icon: '🏥', label: 'Hospitalización'      },
  { key: 'urgencias',       icon: '🚨', label: 'Urgencias 24 h'       },
  { key: 'extranjero',      icon: '✈️', label: 'Extranjero'           },
  { key: 'farmacia',        icon: '💊', label: 'Farmacia'             },
  { key: 'fisioterapia',    icon: '🏃', label: 'Fisioterapia'         },
  { key: 'dental',          icon: '🦷', label: 'Dental incluido'      },
  { key: 'chequeo',         icon: '🩻', label: 'Chequeo médico anual' },
];

// ─── Pills copago ─────────────────────────────────────────────────────────────
interface PillDef { label: string; bg: string; color: string }

const COPAGO_PILL: Record<string, PillDef> = {
  ya:               { label: 'Con copago',      bg: '#FEF3C7', color: '#92400E' },
  esencial:         { label: 'Con copago',      bg: '#FEF3C7', color: '#92400E' },
  plena:            { label: 'Copago reducido', bg: '#E0F2FE', color: '#0369A1' },
  completaPlus:     { label: 'Con copago',      bg: '#FEF3C7', color: '#92400E' },
  completaPlusPlus: { label: 'Sin copago',      bg: '#DCFCE7', color: '#15803D' },
  completa:         { label: 'Sin copago',      bg: '#DCFCE7', color: '#15803D' },
  reembolso:        { label: 'Red sin copago',  bg: '#DCFCE7', color: '#15803D' },
  seniors:          { label: 'Con copago',      bg: '#FEF3C7', color: '#92400E' },
  'seniors-total':  { label: 'Con copago',      bg: '#FEF3C7', color: '#92400E' },
};

// ─── Pills cobertura ──────────────────────────────────────────────────────────
const COVERAGE_PILL: Record<string, PillDef> = {
  ya:               { label: 'Ambulatoria',         bg: '#F1F5F9', color: '#475569' },
  esencial:         { label: 'Completa',            bg: '#EFF6FF', color: '#1D4ED8' },
  plena:            { label: 'Completa',            bg: '#EFF6FF', color: '#1D4ED8' },
  completaPlus:     { label: 'Completa',            bg: '#EFF6FF', color: '#1D4ED8' },
  completaPlusPlus: { label: 'Completa',            bg: '#EFF6FF', color: '#1D4ED8' },
  completa:         { label: 'Completa',            bg: '#EFF6FF', color: '#1D4ED8' },
  reembolso:        { label: 'Libre elección',      bg: '#FFF7ED', color: '#C2410C' },
  seniors:          { label: 'Completa · +55 años', bg: '#EFF6FF', color: '#1D4ED8' },
  'seniors-total':  { label: 'Completa · +63 años', bg: '#EFF6FF', color: '#1D4ED8' },
};

const HIGHLIGHTED_ID = 'completa';

// ─── Helper ───────────────────────────────────────────────────────────────────
function getCoverage(productId: string, key: FeatureKey): string | boolean | false {
  if (key === 'especialidades' || key === 'diagnostico') return true;
  const spec = PRODUCT_SPECS[productId];
  if (!spec) return false;
  return spec[key as keyof ProductSpec] as string | boolean | false;
}

// ─── Check icon — corporativo Adeslas ────────────────────────────────────────
function CheckIcon({ isHL = false }: { isHL?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        width: 18,
        height: 18,
        borderRadius: '50%',
        backgroundColor: isHL ? 'rgba(255,255,255,0.92)' : '#009FE3',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: isHL ? 'none' : '0 1px 4px rgba(0,159,227,0.35)',
      }}
    >
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path
          d="M1 4L3.5 6.5L9 1"
          stroke={isHL ? '#003087' : '#FFFFFF'}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// ─── Cross icon ───────────────────────────────────────────────────────────────
function CrossIcon() {
  return (
    <span style={{ display: 'inline-flex', width: 18, height: 18, alignItems: 'center', justifyContent: 'center' }}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="#D1D5DB" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// ─── Celda valor ──────────────────────────────────────────────────────────────
function ValueCell({ value, isHL }: { value: string | boolean | false; isHL: boolean }) {
  if (value === false) return <CrossIcon />;
  if (typeof value === 'string') {
    return (
      <span style={{
        display: 'inline-block',
        fontSize: 9,
        fontWeight: 800,
        padding: '2px 6px',
        borderRadius: 20,
        backgroundColor: isHL ? 'rgba(255,255,255,0.18)' : '#DBEAFE',
        color: isHL ? '#FFFFFF' : '#1D4ED8',
        lineHeight: 1.5,
        whiteSpace: 'nowrap',
        letterSpacing: '0.02em',
      }}>
        {value}
      </span>
    );
  }
  return <CheckIcon isHL={isHL} />;
}

// ─── Tipos componente ─────────────────────────────────────────────────────────
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

// ─── Componente ───────────────────────────────────────────────────────────────
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
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    check();
    el.addEventListener('scroll', check);
    window.addEventListener('resize', check);
    return () => { el.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }, [results]);

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

  // ── Anchos ──────────────────────────────────────────────────────────────────
  const LABEL_W = 112;
  const PROD_W  = 116;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex flex-col" style={{ backgroundColor: '#EEF5FB' }}>

      {/* ── Cabecera ── */}
      <header
        className="flex-shrink-0 px-4 py-3 sm:px-6 flex items-center justify-between"
        style={{ background: 'linear-gradient(120deg,#002266 0%,#003087 50%,#0077B6 100%)' }}
      >
        <div>
          <p className="text-white font-bold text-sm leading-tight">
            {primerNombre ? `¡Hola ${primerNombre}! Tu seguro está listo 🎉` : 'Tu seguro Adeslas está listo 🎉'}
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {numAsegurados} {numAsegurados === 1 ? 'asegurado' : 'asegurados'} · {provincia}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="tel:917105000"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
          >
            <Phone className="w-3 h-3 mr-0.5" /> 91 710 50 00
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

      {/* ── Contenido ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-3 py-4 sm:px-6 sm:py-5 flex flex-col items-center">

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-5 mb-4 text-[11px] text-gray-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-green-500" /> Contratación segura
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-[#009FE3]" /> Sin compromiso
            </span>
            <span className="flex items-center gap-1">🔒 SSL cifrado</span>
          </div>

          {/* Sin resultados */}
          {results.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm max-w-sm">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="font-bold text-gray-800 mb-2">No hay tarifas disponibles</h3>
              <p className="text-sm text-gray-500 mb-5">No hemos encontrado tarifas para los datos seleccionados.</p>
              <button onClick={onClose} className="text-sm font-semibold hover:underline" style={{ color: '#009FE3' }}>
                ← Volver al calculador
              </button>
            </div>
          )}

          {/* ── Tabla comparativa — centrada ── */}
          {results.length > 0 && (
            <div style={{ position: 'relative', width: '100%', maxWidth: 960 }}>

              {/* Gradiente scroll derecho */}
              {canScrollRight && (
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 44, height: '100%', zIndex: 15, pointerEvents: 'none',
                  background: 'linear-gradient(to right, transparent, rgba(238,245,251,0.97))',
                  borderRadius: '0 12px 12px 0',
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 6,
                }}>
                  <span style={{ fontSize: 20, color: '#003087', opacity: 0.5, fontWeight: 700 }}>›</span>
                </div>
              )}

              <p className="sm:hidden text-center text-[10px] text-gray-400 mb-1.5">← desliza para comparar →</p>

              <div
                ref={scrollRef}
                style={{
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch' as never,
                  borderRadius: 12,
                  boxShadow: '0 2px 20px rgba(0,48,135,0.10)',
                  border: '1px solid #E2E8F0',
                }}
              >
                <table style={{
                  tableLayout: 'fixed',
                  borderCollapse: 'separate',
                  borderSpacing: 0,
                  width: `${LABEL_W + results.length * PROD_W}px`,
                }}>
                  <colgroup>
                    <col style={{ width: LABEL_W }} />
                    {results.map((r) => <col key={r.product.id} style={{ width: PROD_W }} />)}
                  </colgroup>

                  {/* ══ CABECERAS ══ */}
                  <thead>
                    <tr>
                      {/* Columna etiqueta sticky */}
                      <th style={{
                        position: 'sticky', left: 0, zIndex: 20,
                        backgroundColor: '#F8FAFC',
                        borderBottom: '2px solid #E2E8F0',
                        borderRight: '1px solid #E2E8F0',
                        padding: '12px 10px',
                        verticalAlign: 'bottom', textAlign: 'left',
                      }}>
                        <span style={{
                          fontSize: 9, fontWeight: 700, color: '#94A3B8',
                          textTransform: 'uppercase', letterSpacing: '0.08em',
                        }}>
                          Cobertura
                        </span>
                      </th>

                      {results.map((result) => {
                        const isHL       = result.product.id === HIGHLIGHTED_ID;
                        const hasDisc    = result.originalPrice !== undefined;
                        const { int, dec } = fmtPrice(result.price);
                        const copago     = COPAGO_PILL[result.product.id]   ?? { label: 'Con copago',  bg: '#FEF3C7', color: '#92400E' };
                        const coverage   = COVERAGE_PILL[result.product.id] ?? { label: 'Completa',    bg: '#EFF6FF', color: '#1D4ED8' };

                        return (
                          <th
                            key={result.product.id}
                            style={{
                              padding: 0, verticalAlign: 'top',
                              borderLeft: `1px solid ${isHL ? '#003087' : '#E2E8F0'}`,
                              borderBottom: `2px solid ${isHL ? '#003087' : '#E2E8F0'}`,
                              background: isHL
                                ? 'linear-gradient(160deg,#002266 0%,#003087 55%,#004DB3 100%)'
                                : '#FFFFFF',
                            }}
                          >
                            {/* Banner destacado */}
                            {isHL && (
                              <div style={{
                                backgroundColor: '#E4097D',
                                color: '#FFF',
                                fontSize: 9, fontWeight: 900,
                                textAlign: 'center',
                                padding: '3px 6px',
                                letterSpacing: '0.05em',
                              }}>
                                🏆 MÁS COMPLETO
                              </div>
                            )}

                            {/* Contenido cabecera — flex column con altura uniforme */}
                            <div style={{
                              padding: '8px 8px 10px',
                              display: 'flex', flexDirection: 'column',
                              alignItems: 'center', gap: 4,
                              minHeight: isHL ? 128 : 134,   // altura uniforme
                            }}>
                              {/* Nombre */}
                              <p style={{
                                fontSize: 11, fontWeight: 900, lineHeight: 1.25,
                                textAlign: 'center', margin: 0,
                                color: isHL ? '#FFFFFF' : '#003087',
                              }}>
                                {result.product.name}
                              </p>

                              {/* Precio */}
                              <div>
                                {hasDisc && (
                                  <p style={{
                                    fontSize: 9, textDecoration: 'line-through', textAlign: 'center',
                                    color: isHL ? 'rgba(255,255,255,0.45)' : '#CBD5E1', margin: 0, lineHeight: 1,
                                  }}>
                                    {fmtPrice(result.originalPrice!).int},{fmtPrice(result.originalPrice!).dec}€
                                  </p>
                                )}
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 1, justifyContent: 'center' }}>
                                  <span style={{ fontSize: 22, fontWeight: 900, lineHeight: 1, color: isHL ? '#FFFFFF' : '#003087' }}>{int}</span>
                                  <span style={{ fontSize: 11, fontWeight: 700, color: isHL ? '#FFFFFF' : '#003087' }}>,{dec}€</span>
                                  <span style={{ fontSize: 9, color: isHL ? 'rgba(255,255,255,0.55)' : '#94A3B8', marginLeft: 1 }}>/mes</span>
                                </div>
                                {hasDisc && (
                                  <p style={{ fontSize: 9, fontWeight: 700, color: '#4ADE80', textAlign: 'center', margin: 0, lineHeight: 1.4 }}>🎉 −10%</p>
                                )}
                              </div>

                              {/* Pills — siempre en la misma posición (mt-auto los empuja al fondo) */}
                              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', width: '100%' }}>
                                {/* Pill copago */}
                                <span style={{
                                  display: 'inline-block', fontSize: 9, fontWeight: 700,
                                  padding: '2px 7px', borderRadius: 20, lineHeight: 1.5,
                                  whiteSpace: 'nowrap',
                                  backgroundColor: isHL ? 'rgba(255,255,255,0.18)' : copago.bg,
                                  color: isHL ? '#FFFFFF' : copago.color,
                                }}>
                                  {copago.label}
                                </span>
                                {/* Pill cobertura */}
                                <span style={{
                                  display: 'inline-block', fontSize: 9, fontWeight: 700,
                                  padding: '2px 7px', borderRadius: 20, lineHeight: 1.5,
                                  whiteSpace: 'nowrap',
                                  backgroundColor: isHL ? 'rgba(255,255,255,0.13)' : coverage.bg,
                                  color: isHL ? 'rgba(255,255,255,0.85)' : coverage.color,
                                }}>
                                  {coverage.label}
                                </span>
                              </div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>

                  {/* ══ FILAS ══ */}
                  <tbody>
                    {FEATURES.map((feat, fi) => {
                      const isEven = fi % 2 === 0;
                      const isLast = fi === FEATURES.length - 1;
                      return (
                        <tr key={feat.key}>
                          {/* Etiqueta sticky */}
                          <td style={{
                            position: 'sticky', left: 0, zIndex: 10,
                            backgroundColor: isEven ? '#F8FAFC' : '#FFFFFF',
                            borderBottom: isLast ? 'none' : '1px solid #F1F5F9',
                            borderRight: '1px solid #E2E8F0',
                            padding: '8px 10px',
                          }}>
                            <span style={{
                              fontSize: 11, color: '#334155',
                              display: 'flex', alignItems: 'center', gap: 5,
                              fontWeight: 500, whiteSpace: 'nowrap',
                            }}>
                              <span style={{ fontSize: 13, lineHeight: 1 }}>{feat.icon}</span>
                              {feat.label}
                            </span>
                          </td>

                          {/* Valores */}
                          {results.map((result) => {
                            const isHL = result.product.id === HIGHLIGHTED_ID;
                            const val  = getCoverage(result.product.id, feat.key);
                            return (
                              <td
                                key={result.product.id}
                                style={{
                                  borderBottom: isLast ? 'none' : '1px solid #F1F5F9',
                                  borderLeft: `1px solid ${isHL ? 'rgba(0,48,135,0.08)' : '#F1F5F9'}`,
                                  padding: '8px 4px',
                                  textAlign: 'center',
                                  backgroundColor: isHL
                                    ? (isEven ? 'rgba(0,48,135,0.055)' : 'rgba(0,48,135,0.02)')
                                    : (isEven ? '#F8FAFC' : '#FFFFFF'),
                                }}
                              >
                                <ValueCell value={val} isHL={isHL} />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>

                  {/* ══ CTAs ══ */}
                  <tfoot>
                    <tr>
                      <td style={{
                        position: 'sticky', left: 0, zIndex: 10,
                        backgroundColor: '#F8FAFC',
                        borderTop: '2px solid #E2E8F0',
                        padding: '10px 8px',
                      }} />
                      {results.map((result) => {
                        const isHL = result.product.id === HIGHLIGHTED_ID;
                        return (
                          <td
                            key={result.product.id}
                            style={{
                              borderTop: `2px solid ${isHL ? '#003087' : '#E2E8F0'}`,
                              borderLeft: '1px solid #E2E8F0',
                              padding: '10px 7px',
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
                                fontSize: 10, fontWeight: 800,
                                padding: '7px 4px',
                                borderRadius: 8, border: 'none', cursor: 'pointer',
                                letterSpacing: '0.01em', lineHeight: 1.3,
                                boxShadow: isHL ? '0 3px 12px rgba(228,9,125,0.4)' : '0 1px 4px rgba(228,9,125,0.2)',
                                transition: 'opacity 0.15s, transform 0.1s',
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                              Contratar →
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Separador */}
          <div className="relative my-5 w-full max-w-screen-md">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-[11px] text-gray-400 bg-[#EEF5FB] px-3">
              o si prefieres hablar con un asesor
            </div>
          </div>

          {/* Teléfono */}
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm mb-4 w-full max-w-xs">
            <p className="text-xs text-gray-500 mb-1.5">Nuestro equipo resuelve cualquier duda al instante</p>
            <a href="tel:917105000" className="inline-flex items-center gap-2 font-extrabold text-lg" style={{ color: '#009FE3' }}>
              <Phone className="w-4 h-4" /> 91 710 50 00
            </a>
            <p className="text-[10px] text-gray-400 mt-1">Adeslas · Lun–Vie 9:00–19:00</p>
          </div>

        </div>
      </main>
    </div>,
    document.body,
  );
}
