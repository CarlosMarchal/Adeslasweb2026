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
  sinCopago:       boolean;
}

// ─── Coberturas 2026 ──────────────────────────────────────────────────────────
const PRODUCT_SPECS: Record<string, ProductSpec> = {
  ya:               { hospitalizacion: false, urgencias: false, extranjero: false,       farmacia: false,  fisioterapia: true,  sinCopago: false },
  esencial:         { hospitalizacion: true,  urgencias: true,  extranjero: '6.000 €',   farmacia: false,  fisioterapia: true,  sinCopago: false },
  plena:            { hospitalizacion: true,  urgencias: true,  extranjero: '6.000 €',   farmacia: false,  fisioterapia: true,  sinCopago: false },
  completaPlus:     { hospitalizacion: true,  urgencias: true,  extranjero: '60.000 €',  farmacia: '50 %', fisioterapia: true,  sinCopago: false },
  completaPlusPlus: { hospitalizacion: true,  urgencias: true,  extranjero: '60.000 €',  farmacia: '80 %', fisioterapia: true,  sinCopago: true  },
  completa:         { hospitalizacion: true,  urgencias: true,  extranjero: '100.000 €', farmacia: '50 %', fisioterapia: true,  sinCopago: true  },
  reembolso:        { hospitalizacion: true,  urgencias: true,  extranjero: 'Mundial',   farmacia: '80 %', fisioterapia: true,  sinCopago: false },
  seniors:          { hospitalizacion: true,  urgencias: true,  extranjero: '6.000 €',   farmacia: false,  fisioterapia: true,  sinCopago: false },
  'seniors-total':  { hospitalizacion: true,  urgencias: true,  extranjero: '60.000 €',  farmacia: '50 %', fisioterapia: true,  sinCopago: true  },
};

// ─── Filas de comparación ─────────────────────────────────────────────────────
type FeatureKey = 'especialidades' | 'diagnostico' | keyof ProductSpec;

const FEATURES: { key: FeatureKey; icon: string; label: string }[] = [
  { key: 'especialidades',  icon: '🩺', label: 'Especialidades'    },
  { key: 'diagnostico',     icon: '🔬', label: 'Diagnóstico'       },
  { key: 'hospitalizacion', icon: '🏥', label: 'Hospitalización'   },
  { key: 'urgencias',       icon: '🚨', label: 'Urgencias 24 h'    },
  { key: 'extranjero',      icon: '✈️', label: 'Extranjero'        },
  { key: 'farmacia',        icon: '💊', label: 'Farmacia'          },
  { key: 'fisioterapia',    icon: '🏃', label: 'Fisioterapia'      },
  { key: 'sinCopago',       icon: '💳', label: 'Sin copago'        },
];

// ─── Pills de copago ──────────────────────────────────────────────────────────
interface PillDef { label: string; bg: string; color: string }

const COPAGO_PILL: Record<string, PillDef> = {
  ya:               { label: 'Con copago',      bg: '#FEF3C7', color: '#92400E' },
  esencial:         { label: 'Con copago',      bg: '#FEF3C7', color: '#92400E' },
  plena:            { label: 'Copago reducido', bg: '#E0F2FE', color: '#0369A1' },
  completaPlus:     { label: 'Con copago',      bg: '#FEF3C7', color: '#92400E' },
  completaPlusPlus: { label: 'Sin copago',      bg: '#DCFCE7', color: '#15803D' },
  completa:         { label: 'Sin copago',      bg: '#DCFCE7', color: '#15803D' },
  reembolso:        { label: 'Sin copago',      bg: '#DCFCE7', color: '#15803D' },
  seniors:          { label: 'Con copago',      bg: '#FEF3C7', color: '#92400E' },
  'seniors-total':  { label: 'Sin copago',      bg: '#DCFCE7', color: '#15803D' },
};

// ─── Pills de tipo de cobertura ───────────────────────────────────────────────
const COVERAGE_PILL: Record<string, PillDef> = {
  ya:               { label: 'Ambulatoria',          bg: '#F3F4F6', color: '#374151' },
  esencial:         { label: 'Completa',             bg: '#EFF6FF', color: '#1D4ED8' },
  plena:            { label: 'Completa',             bg: '#EFF6FF', color: '#1D4ED8' },
  completaPlus:     { label: 'Completa',             bg: '#EFF6FF', color: '#1D4ED8' },
  completaPlusPlus: { label: 'Completa',             bg: '#EFF6FF', color: '#1D4ED8' },
  completa:         { label: 'Completa',             bg: '#EFF6FF', color: '#1D4ED8' },
  reembolso:        { label: 'Libre elección',       bg: '#FFF7ED', color: '#C2410C' },
  seniors:          { label: 'Completa · +55 años',  bg: '#EFF6FF', color: '#1D4ED8' },
  'seniors-total':  { label: 'Completa · +55 años',  bg: '#EFF6FF', color: '#1D4ED8' },
};

// ─── Columna destacada ────────────────────────────────────────────────────────
const HIGHLIGHTED_ID = 'completa';

// ─── Helper valor de cobertura ────────────────────────────────────────────────
function getCoverage(productId: string, key: FeatureKey): string | boolean | false {
  if (key === 'especialidades' || key === 'diagnostico') return true;
  const spec = PRODUCT_SPECS[productId];
  if (!spec) return false;
  return spec[key as keyof ProductSpec] as string | boolean | false;
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

// ─── Celda valor ──────────────────────────────────────────────────────────────
function ValueCell({ value }: { value: string | boolean | false }) {
  if (value === false) {
    return <span style={{ color: '#D1D5DB', fontSize: 15 }}>✗</span>;
  }
  if (typeof value === 'string') {
    return (
      <span style={{
        display: 'inline-block',
        fontSize: 9,
        fontWeight: 800,
        padding: '2px 5px',
        borderRadius: 20,
        backgroundColor: '#DBEAFE',
        color: '#1D4ED8',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}>
        {value}
      </span>
    );
  }
  return <span style={{ color: '#16A34A', fontSize: 15 }}>✓</span>;
}

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
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Indicador de scroll horizontal
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };
    check();
    el.addEventListener('scroll', check);
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
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

  // ── Anchos de columna ─────────────────────────────────────────────────────
  // Label col: fija; producto cols: igual para todas
  const LABEL_W  = 108;
  const PROD_W   = 112;
  const totalW   = LABEL_W + results.length * PROD_W;

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

      {/* ── Contenido scrollable ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-2 py-3 sm:px-4 sm:py-4 max-w-screen-xl mx-auto">

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mb-3 text-[11px] text-gray-500 flex-wrap">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-green-500" /> Contratación segura
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-blue-500" /> Sin compromiso
            </span>
            <span className="flex items-center gap-1">🔒 SSL cifrado</span>
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

          {/* ── Tabla comparativa ── */}
          {results.length > 0 && (
            <div style={{ position: 'relative' }}>

              {/* Indicador de scroll derecho */}
              {canScrollRight && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 40,
                    height: '100%',
                    background: 'linear-gradient(to right, transparent, rgba(238,245,251,0.95))',
                    zIndex: 15,
                    pointerEvents: 'none',
                    borderRadius: '0 14px 14px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: 6,
                  }}
                >
                  <span style={{ fontSize: 16, color: '#003087', opacity: 0.6 }}>›</span>
                </div>
              )}

              {/* Pista de scroll en mobile */}
              <p className="sm:hidden text-center text-[10px] text-gray-400 mb-1.5">
                ← desliza para comparar →
              </p>

              <div
                ref={scrollRef}
                style={{
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch' as never,
                  borderRadius: 14,
                  boxShadow: '0 1px 12px rgba(0,0,0,0.08)',
                  border: '1px solid #E5E7EB',
                }}
              >
                <table
                  style={{
                    tableLayout: 'fixed',
                    borderCollapse: 'separate',
                    borderSpacing: 0,
                    width: `${totalW}px`,
                    minWidth: `${totalW}px`,
                  }}
                >

                  {/* Anchos de columna */}
                  <colgroup>
                    <col style={{ width: LABEL_W }} />
                    {results.map((r) => (
                      <col key={r.product.id} style={{ width: PROD_W }} />
                    ))}
                  </colgroup>

                  {/* ── CABECERAS ── */}
                  <thead>
                    <tr>
                      {/* Etiqueta sticky */}
                      <th
                        style={{
                          position: 'sticky',
                          left: 0,
                          zIndex: 20,
                          backgroundColor: '#F1F5F9',
                          borderBottom: '2px solid #E2E8F0',
                          borderRight: '1px solid #E2E8F0',
                          padding: '10px 8px',
                          verticalAlign: 'bottom',
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          Cobertura
                        </span>
                      </th>

                      {/* Una columna por producto */}
                      {results.map((result) => {
                        const isHL       = result.product.id === HIGHLIGHTED_ID;
                        const hasDisc    = result.originalPrice !== undefined;
                        const { int, dec } = fmtPrice(result.price);
                        const copagoPill = COPAGO_PILL[result.product.id]    ?? { label: 'Con copago',  bg: '#FEF3C7', color: '#92400E' };
                        const coverPill  = COVERAGE_PILL[result.product.id]  ?? { label: 'Completa',    bg: '#EFF6FF', color: '#1D4ED8' };

                        return (
                          <th
                            key={result.product.id}
                            style={{
                              padding: 0,
                              verticalAlign: 'top',
                              borderLeft: `1px solid ${isHL ? '#003087' : '#E2E8F0'}`,
                              borderBottom: `2px solid ${isHL ? '#003087' : '#E2E8F0'}`,
                              background: isHL
                                ? 'linear-gradient(170deg,#002266 0%,#003087 55%,#004DB3 100%)'
                                : '#FFFFFF',
                            }}
                          >
                            {/* Banner top destacado */}
                            {isHL && (
                              <div style={{
                                backgroundColor: '#E4097D',
                                color: '#FFF',
                                fontSize: 9,
                                fontWeight: 900,
                                textAlign: 'center',
                                padding: '3px 6px',
                                letterSpacing: '0.04em',
                              }}>
                                🏆 MÁS COMPLETO
                              </div>
                            )}

                            <div style={{ padding: '8px 7px 10px' }}>
                              {/* Nombre */}
                              <p style={{
                                fontSize: 11,
                                fontWeight: 900,
                                lineHeight: 1.25,
                                marginBottom: 5,
                                color: isHL ? '#FFFFFF' : '#003087',
                              }}>
                                {result.product.name}
                              </p>

                              {/* Precio */}
                              {hasDisc && (
                                <p style={{ fontSize: 9, color: isHL ? 'rgba(255,255,255,0.45)' : '#CBD5E1', textDecoration: 'line-through', marginBottom: 1, lineHeight: 1 }}>
                                  {fmtPrice(result.originalPrice!).int},{fmtPrice(result.originalPrice!).dec}€
                                </p>
                              )}
                              <div style={{ display: 'flex', alignItems: 'baseline', gap: 1, marginBottom: 5 }}>
                                <span style={{ fontSize: 20, fontWeight: 900, lineHeight: 1, color: isHL ? '#FFFFFF' : '#003087' }}>{int}</span>
                                <span style={{ fontSize: 11, fontWeight: 700, color: isHL ? '#FFFFFF' : '#003087' }}>,{dec}€</span>
                                <span style={{ fontSize: 9,  color: isHL ? 'rgba(255,255,255,0.55)' : '#94A3B8', marginLeft: 1 }}>/mes</span>
                              </div>
                              {hasDisc && (
                                <p style={{ fontSize: 9, fontWeight: 700, color: '#4ADE80', marginBottom: 4, lineHeight: 1 }}>🎉 −10%</p>
                              )}

                              {/* Pill copago */}
                              <div style={{ marginBottom: 4 }}>
                                <span style={{
                                  display: 'inline-block',
                                  fontSize: 9,
                                  fontWeight: 700,
                                  padding: '2px 6px',
                                  borderRadius: 20,
                                  lineHeight: 1.5,
                                  backgroundColor: isHL ? 'rgba(255,255,255,0.15)' : copagoPill.bg,
                                  color: isHL ? '#FFFFFF' : copagoPill.color,
                                  whiteSpace: 'nowrap',
                                }}>
                                  {copagoPill.label}
                                </span>
                              </div>

                              {/* Pill tipo cobertura */}
                              <div>
                                <span style={{
                                  display: 'inline-block',
                                  fontSize: 9,
                                  fontWeight: 700,
                                  padding: '2px 6px',
                                  borderRadius: 20,
                                  lineHeight: 1.5,
                                  backgroundColor: isHL ? 'rgba(255,255,255,0.12)' : coverPill.bg,
                                  color: isHL ? 'rgba(255,255,255,0.85)' : coverPill.color,
                                  whiteSpace: 'nowrap',
                                }}>
                                  {coverPill.label}
                                </span>
                              </div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>

                  {/* ── FILAS COBERTURAS ── */}
                  <tbody>
                    {FEATURES.map((feat, fi) => {
                      const isEven = fi % 2 === 0;
                      const isLast = fi === FEATURES.length - 1;
                      return (
                        <tr key={feat.key}>
                          {/* Etiqueta sticky */}
                          <td style={{
                            position: 'sticky',
                            left: 0,
                            zIndex: 10,
                            backgroundColor: isEven ? '#F8FAFC' : '#FFFFFF',
                            borderBottom: isLast ? 'none' : '1px solid #F1F5F9',
                            borderRight: '1px solid #E2E8F0',
                            padding: '7px 8px',
                          }}>
                            <span style={{ fontSize: 11, color: '#475569', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
                              <span style={{ fontSize: 13 }}>{feat.icon}</span>
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
                                  borderLeft: `1px solid ${isHL ? 'rgba(0,48,135,0.1)' : '#F1F5F9'}`,
                                  padding: '7px 4px',
                                  textAlign: 'center',
                                  backgroundColor: isHL
                                    ? (isEven ? 'rgba(0,48,135,0.055)' : 'rgba(0,48,135,0.02)')
                                    : (isEven ? '#F8FAFC' : '#FFFFFF'),
                                }}
                              >
                                <ValueCell value={val} />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>

                  {/* ── FILA CTAs ── */}
                  <tfoot>
                    <tr>
                      <td style={{
                        position: 'sticky',
                        left: 0,
                        zIndex: 10,
                        backgroundColor: '#F1F5F9',
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
                              padding: '10px 6px',
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
                                fontSize: 10,
                                fontWeight: 800,
                                padding: '7px 4px',
                                borderRadius: 8,
                                border: 'none',
                                cursor: 'pointer',
                                letterSpacing: '0.01em',
                                lineHeight: 1.3,
                                boxShadow: isHL ? '0 2px 10px rgba(228,9,125,0.35)' : 'none',
                                transition: 'opacity 0.15s, transform 0.1s',
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)'; }}
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
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-[11px] text-gray-400 bg-[#EEF5FB] px-3">
              o si prefieres hablar con un asesor
            </div>
          </div>

          {/* Teléfono */}
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm mb-4 max-w-xs mx-auto">
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
