'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Phone, Shield, CheckCircle2 } from 'lucide-react';

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface ProductSpec {
  hospitalizacion: boolean;
  urgencias:       boolean;
  extranjero:      string | false;   // false = no cubierto, string = capital
  farmacia:        string | false;   // false = no, '50 %' / '80 %' = porcentaje
  fisioterapia:    boolean;
  sinCopago:       boolean;
}

// ─── Coberturas corregidas (2026) ─────────────────────────────────────────────
// GO (ya): solo ambulatorio + fisio, SIN urgencias, SIN hospitalización,
//          SIN asistencia extranjero, CON copago.
const PRODUCT_SPECS: Record<string, ProductSpec> = {
  ya:               { hospitalizacion: false, urgencias: false, extranjero: false,        farmacia: false,  fisioterapia: true,  sinCopago: false },
  esencial:         { hospitalizacion: true,  urgencias: true,  extranjero: '6.000 €',    farmacia: false,  fisioterapia: true,  sinCopago: false },
  plena:            { hospitalizacion: true,  urgencias: true,  extranjero: '6.000 €',    farmacia: false,  fisioterapia: true,  sinCopago: false },
  completaPlus:     { hospitalizacion: true,  urgencias: true,  extranjero: '60.000 €',   farmacia: '50 %', fisioterapia: true,  sinCopago: false },
  completaPlusPlus: { hospitalizacion: true,  urgencias: true,  extranjero: '60.000 €',   farmacia: '80 %', fisioterapia: true,  sinCopago: true  },
  completa:         { hospitalizacion: true,  urgencias: true,  extranjero: '100.000 €',  farmacia: '50 %', fisioterapia: true,  sinCopago: true  },
  reembolso:        { hospitalizacion: true,  urgencias: true,  extranjero: 'Mundial',    farmacia: '80 %', fisioterapia: true,  sinCopago: false },
  seniors:          { hospitalizacion: true,  urgencias: true,  extranjero: '6.000 €',    farmacia: false,  fisioterapia: true,  sinCopago: false },
  'seniors-total':  { hospitalizacion: true,  urgencias: true,  extranjero: '60.000 €',   farmacia: '50 %', fisioterapia: true,  sinCopago: true  },
};

// ─── Filas de la tabla comparativa ────────────────────────────────────────────
type FeatureKey = 'especialidades' | 'diagnostico' | keyof ProductSpec;

const FEATURES: { key: FeatureKey; icon: string; label: string }[] = [
  { key: 'especialidades',  icon: '🩺', label: 'Especialidades médicas' },
  { key: 'diagnostico',     icon: '🔬', label: 'Pruebas diagnósticas'   },
  { key: 'hospitalizacion', icon: '🏥', label: 'Hospitalización'        },
  { key: 'urgencias',       icon: '🚨', label: 'Urgencias 24 h'         },
  { key: 'extranjero',      icon: '✈️', label: 'Asistencia extranjero'  },
  { key: 'farmacia',        icon: '💊', label: 'Reembolso farmacia'     },
  { key: 'fisioterapia',    icon: '🏃', label: 'Fisioterapia'           },
  { key: 'sinCopago',       icon: '💳', label: 'Sin copago'             },
];

// ─── Helper: valor de cobertura para un producto ──────────────────────────────
function getCoverage(productId: string, key: FeatureKey): string | boolean | false {
  if (key === 'especialidades' || key === 'diagnostico') return true;
  const spec = PRODUCT_SPECS[productId];
  if (!spec) return false;
  return spec[key as keyof ProductSpec] as string | boolean | false;
}

// ─── Columna resaltada ────────────────────────────────────────────────────────
const HIGHLIGHTED_ID = 'completa';

// ─── Etiquetas de copago por producto ─────────────────────────────────────────
const COPAGO_LABELS: Record<string, string> = {
  ya:               'Ambulatorio · Con copago',
  esencial:         'Con copago',
  plena:            'Copago reducido',
  completaPlus:     'Con copago',
  completaPlusPlus: 'Sin copago',
  completa:         'Sin copago',
  reembolso:        'Reembolso · Libre elección',
  seniors:          '55–84 años',
  'seniors-total':  'Sin copago',
};

// ─── Tipos ────────────────────────────────────────────────────────────────────
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

const formatPrice = (price: number) => {
  const [int, dec] = price.toFixed(2).split('.');
  return { int, dec };
};

// ─── Celda de valor ───────────────────────────────────────────────────────────
function CoverageCell({ value, isHighlighted }: { value: string | boolean | false; isHighlighted: boolean }) {
  if (value === false) {
    return (
      <span className="text-base" style={{ color: '#D1D5DB' }}>✗</span>
    );
  }
  if (typeof value === 'string') {
    return (
      <span
        className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-tight"
        style={{
          backgroundColor: isHighlighted ? 'rgba(255,255,255,0.18)' : '#DBEAFE',
          color:           isHighlighted ? '#FFFFFF' : '#1D4ED8',
        }}
      >
        {value}
      </span>
    );
  }
  // true → check verde
  return (
    <span className="text-base" style={{ color: '#16A34A' }}>✓</span>
  );
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

  // ── Portal: evita problemas con stacking contexts de framer-motion ──────────
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{ backgroundColor: '#EEF5FB' }}
    >
      {/* ── Cabecera ── */}
      <header
        className="flex-shrink-0 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between"
        style={{
          background: 'linear-gradient(120deg, #002266 0%, #003087 50%, #0077B6 100%)',
        }}
      >
        <div>
          <p className="text-white font-bold text-base leading-tight">
            {primerNombre
              ? `¡Hola ${primerNombre}! Tu seguro está listo 🎉`
              : 'Tu seguro Adeslas está listo 🎉'}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {numAsegurados} {numAsegurados === 1 ? 'asegurado' : 'asegurados'} · {provincia}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="tel:917105000"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
          >
            <Phone className="w-3.5 h-3.5" />
            91 710 50 00
          </a>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
            aria-label="Volver al tarificador"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </header>

      {/* ── Contenido scrollable ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-full mx-auto px-3 py-4 sm:px-5">

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mb-4 text-xs text-gray-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-green-500" />
              Contratación segura
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
              Sin compromiso
            </span>
            <span className="flex items-center gap-1">
              🔒 SSL cifrado
            </span>
          </div>

          {/* Sin resultados */}
          {results.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm max-w-sm mx-auto">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="font-bold text-gray-800 mb-2">No hay tarifas disponibles</h3>
              <p className="text-sm text-gray-500 mb-5">
                No hemos encontrado tarifas para los datos seleccionados.
              </p>
              <button
                onClick={onClose}
                className="text-sm font-semibold hover:underline"
                style={{ color: '#009FE3' }}
              >
                ← Volver al calculador
              </button>
            </div>
          )}

          {/* ── Tabla comparativa ── */}
          {results.length > 0 && (
            <div
              className="rounded-2xl overflow-hidden shadow-sm"
              style={{ border: '1px solid #E5E7EB' }}
            >
              {/* Scroll horizontal en móvil */}
              <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <table
                  style={{
                    borderCollapse: 'separate',
                    borderSpacing: 0,
                    minWidth: `${140 + results.length * 130}px`,
                    width: '100%',
                  }}
                >
                  {/* ── Cabeceras de producto ── */}
                  <thead>
                    <tr>
                      {/* Celda etiqueta — sticky izquierda */}
                      <th
                        style={{
                          position: 'sticky',
                          left: 0,
                          zIndex: 20,
                          width: 140,
                          minWidth: 140,
                          backgroundColor: '#F8FAFC',
                          borderBottom: '2px solid #E5E7EB',
                          borderRight: '1px solid #E5E7EB',
                          padding: '12px 10px',
                          textAlign: 'left',
                          verticalAlign: 'bottom',
                        }}
                      >
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                          Cobertura
                        </span>
                      </th>

                      {/* Una columna por producto */}
                      {results.map((result) => {
                        const isHighlighted  = result.product.id === HIGHLIGHTED_ID;
                        const hasDiscount    = result.originalPrice !== undefined;
                        const { int, dec }   = formatPrice(result.price);
                        const copagoLabel    = COPAGO_LABELS[result.product.id] ?? 'Seguro de salud';
                        const sinCopago      = PRODUCT_SPECS[result.product.id]?.sinCopago ?? false;

                        return (
                          <th
                            key={result.product.id}
                            style={{
                              minWidth: 130,
                              padding: '0',
                              borderBottom: `2px solid ${isHighlighted ? '#003087' : '#E5E7EB'}`,
                              borderLeft: '1px solid #E5E7EB',
                              verticalAlign: 'top',
                              background: isHighlighted
                                ? 'linear-gradient(160deg, #002266 0%, #003087 60%, #004DB3 100%)'
                                : '#FFFFFF',
                            }}
                          >
                            {/* Banner top para el destacado */}
                            {isHighlighted && (
                              <div
                                style={{
                                  backgroundColor: '#E4097D',
                                  color: '#FFFFFF',
                                  fontSize: 10,
                                  fontWeight: 800,
                                  textAlign: 'center',
                                  padding: '4px 8px',
                                  letterSpacing: '0.02em',
                                }}
                              >
                                🏆 MÁS COMPLETO · 3 años sin subida
                              </div>
                            )}

                            <div style={{ padding: '10px 10px 12px' }}>
                              {/* Nombre producto */}
                              <p
                                style={{
                                  fontSize: 12,
                                  fontWeight: 900,
                                  lineHeight: 1.2,
                                  marginBottom: 6,
                                  color: isHighlighted ? '#FFFFFF' : '#003087',
                                }}
                              >
                                {result.product.name}
                              </p>

                              {/* Precio */}
                              {hasDiscount && (
                                <p style={{ fontSize: 10, color: isHighlighted ? 'rgba(255,255,255,0.55)' : '#9CA3AF', textDecoration: 'line-through', marginBottom: 1 }}>
                                  {formatPrice(result.originalPrice!).int},{formatPrice(result.originalPrice!).dec} €
                                </p>
                              )}
                              <div style={{ display: 'flex', alignItems: 'baseline', gap: 1, marginBottom: 6 }}>
                                <span style={{ fontSize: 22, fontWeight: 900, lineHeight: 1, color: isHighlighted ? '#FFFFFF' : '#003087' }}>
                                  {int}
                                </span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: isHighlighted ? '#FFFFFF' : '#003087' }}>
                                  ,{dec}€
                                </span>
                                <span style={{ fontSize: 10, color: isHighlighted ? 'rgba(255,255,255,0.6)' : '#9CA3AF', marginLeft: 2 }}>
                                  /mes
                                </span>
                              </div>
                              {hasDiscount && (
                                <p style={{ fontSize: 10, fontWeight: 700, color: '#4ADE80', marginBottom: 4 }}>
                                  🎉 −10% familia
                                </p>
                              )}

                              {/* Copago pill */}
                              <span
                                style={{
                                  display: 'inline-block',
                                  fontSize: 10,
                                  fontWeight: 700,
                                  padding: '2px 7px',
                                  borderRadius: 20,
                                  backgroundColor: sinCopago
                                    ? (isHighlighted ? 'rgba(74,222,128,0.25)' : '#DCFCE7')
                                    : (isHighlighted ? 'rgba(255,255,255,0.15)' : '#FEF9C3'),
                                  color: sinCopago
                                    ? (isHighlighted ? '#4ADE80' : '#15803D')
                                    : (isHighlighted ? 'rgba(255,255,255,0.85)' : '#92400E'),
                                }}
                              >
                                {copagoLabel}
                              </span>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>

                  {/* ── Filas de cobertura ── */}
                  <tbody>
                    {FEATURES.map((feature, fi) => {
                      const isEven = fi % 2 === 0;
                      return (
                        <tr key={feature.key}>
                          {/* Etiqueta — sticky izquierda */}
                          <td
                            style={{
                              position: 'sticky',
                              left: 0,
                              zIndex: 10,
                              backgroundColor: isEven ? '#F9FAFB' : '#FFFFFF',
                              borderBottom: fi < FEATURES.length - 1 ? '1px solid #F3F4F6' : 'none',
                              borderRight: '1px solid #E5E7EB',
                              padding: '9px 10px',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <span style={{ fontSize: 12, color: '#4B5563', display: 'flex', alignItems: 'center', gap: 5 }}>
                              <span style={{ fontSize: 14 }}>{feature.icon}</span>
                              {feature.label}
                            </span>
                          </td>

                          {/* Valor por producto */}
                          {results.map((result) => {
                            const isHighlighted = result.product.id === HIGHLIGHTED_ID;
                            const value = getCoverage(result.product.id, feature.key);
                            return (
                              <td
                                key={result.product.id}
                                style={{
                                  borderBottom: fi < FEATURES.length - 1 ? '1px solid #F3F4F6' : 'none',
                                  borderLeft: '1px solid #E5E7EB',
                                  padding: '9px 10px',
                                  textAlign: 'center',
                                  backgroundColor: isHighlighted
                                    ? (isEven ? 'rgba(0,48,135,0.07)' : 'rgba(0,48,135,0.03)')
                                    : (isEven ? '#F9FAFB' : '#FFFFFF'),
                                }}
                              >
                                <CoverageCell value={value} isHighlighted={false} />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>

                  {/* ── Fila de CTAs ── */}
                  <tfoot>
                    <tr>
                      {/* Celda vacía sticky */}
                      <td
                        style={{
                          position: 'sticky',
                          left: 0,
                          zIndex: 10,
                          backgroundColor: '#F8FAFC',
                          borderTop: '2px solid #E5E7EB',
                          padding: '12px 10px',
                        }}
                      />

                      {results.map((result) => {
                        const isHighlighted = result.product.id === HIGHLIGHTED_ID;
                        return (
                          <td
                            key={result.product.id}
                            style={{
                              borderTop: `2px solid ${isHighlighted ? '#003087' : '#E5E7EB'}`,
                              borderLeft: '1px solid #E5E7EB',
                              padding: '12px 8px',
                              textAlign: 'center',
                              backgroundColor: isHighlighted
                                ? 'rgba(0,48,135,0.04)'
                                : '#FFFFFF',
                            }}
                          >
                            <button
                              onClick={() => handleContratar(result)}
                              style={{
                                width: '100%',
                                backgroundColor: '#E4097D',
                                color: '#FFFFFF',
                                fontSize: 11,
                                fontWeight: 800,
                                padding: '8px 6px',
                                borderRadius: 10,
                                border: 'none',
                                cursor: 'pointer',
                                letterSpacing: '0.01em',
                                transition: 'opacity 0.15s',
                                lineHeight: 1.3,
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
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

          {/* Separador "o llámanos" */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400 bg-[#EEF5FB] px-3">
              o si prefieres hablar con un asesor
            </div>
          </div>

          {/* Teléfono */}
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm mb-4 max-w-sm mx-auto">
            <p className="text-sm text-gray-500 mb-2">
              Nuestro equipo te resuelve cualquier duda al instante
            </p>
            <a
              href="tel:917105000"
              className="inline-flex items-center gap-2 font-extrabold text-xl"
              style={{ color: '#009FE3' }}
            >
              <Phone className="w-5 h-5" />
              91 710 50 00
            </a>
            <p className="text-xs text-gray-400 mt-1">
              Adeslas · Lun–Vie 9:00–19:00
            </p>
          </div>

        </div>
      </main>
    </div>,
    document.body,
  );
}
