'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Phone, Shield, CheckCircle2 } from 'lucide-react';

// ─── Coverage specs per product ───────────────────────────────────────────────
interface ProductSpec {
  extranjero: string | false;  // false = no cubierto, string = capital
  farmacia:   string | false;
  fisioterapia: boolean;
  sinCopago: boolean;
}

const PRODUCT_SPECS: Record<string, ProductSpec> = {
  ya:               { extranjero: '6.000 €',  farmacia: false,   fisioterapia: false, sinCopago: true  },
  esencial:         { extranjero: '6.000 €',  farmacia: false,   fisioterapia: true,  sinCopago: false },
  plena:            { extranjero: '6.000 €',  farmacia: false,   fisioterapia: true,  sinCopago: false },
  completaPlus:     { extranjero: '60.000 €', farmacia: '50 %',  fisioterapia: true,  sinCopago: false },
  completaPlusPlus: { extranjero: '60.000 €', farmacia: '80 %',  fisioterapia: true,  sinCopago: true  },
  completa:         { extranjero: '60.000 €', farmacia: '50 %',  fisioterapia: true,  sinCopago: true  },
  reembolso:        { extranjero: 'Mundial',  farmacia: '80 %',  fisioterapia: true,  sinCopago: false },
  seniors:          { extranjero: '6.000 €',  farmacia: false,   fisioterapia: true,  sinCopago: false },
  'seniors-total':  { extranjero: '60.000 €', farmacia: '50 %',  fisioterapia: true,  sinCopago: true  },
};

// Rows always shown in the coverage mini-table
const COVERAGE_ROWS: { key: keyof ProductSpec | 'especialidades' | 'diagnostico' | 'urgencias'; icon: string; label: string }[] = [
  { key: 'especialidades', icon: '🩺', label: 'Especialidades médicas' },
  { key: 'diagnostico',    icon: '🔬', label: 'Pruebas diagnósticas'  },
  { key: 'urgencias',      icon: '🚨', label: 'Urgencias 24 h'        },
  { key: 'extranjero',     icon: '✈️', label: 'Asistencia extranjero' },
  { key: 'farmacia',       icon: '💊', label: 'Reembolso farmacia'    },
  { key: 'fisioterapia',   icon: '🏃', label: 'Fisioterapia'          },
];

// ─── Product labels (copago pill) ─────────────────────────────────────────────
const productLabels: Record<string, { tag: string; color: string }> = {
  ya:               { tag: 'Sin copago',                       color: '#10B981' },
  esencial:         { tag: 'Con copago',                       color: '#009FE3' },
  plena:            { tag: 'Copago reducido',                  color: '#0EA5E9' },
  completaPlusPlus: { tag: 'Sin copago',                       color: '#6366F1' },
  completaPlus:     { tag: 'Con copago · 3 años sin subidas',  color: '#7C3AED' },
  completa:         { tag: 'Sin copago · 3 años sin subidas',  color: '#003087' },
  reembolso:        { tag: 'Reembolso 80% · Libre elección',   color: '#D97706' },
  seniors:          { tag: 'Mayores 55–84 años',               color: '#F59E0B' },
  'seniors-total':  { tag: 'Sin copago · 3 años sin subidas',  color: '#0369A1' },
};

// ─── Highlight: ONLY Plena Total ──────────────────────────────────────────────
const HIGHLIGHTED_IDS = new Set(['completa']);
const HIGHLIGHT_BANNER: Record<string, { text: string; bg: string }> = {
  completa: { text: '🏆 El más completo · 3 años sin subida de prima', bg: '#003087' },
};

// ─── Types ─────────────────────────────────────────────────────────────────────
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

// ─── Helpers ───────────────────────────────────────────────────────────────────
const formatPrice = (price: number) => {
  const [int, dec] = price.toFixed(2).split('.');
  return { int, dec };
};

// Helper: get a coverage row value for a product
function getCoverageValue(
  productId: string,
  key: string,
): string | boolean | false {
  // These 3 are always covered for all Adeslas products
  if (key === 'especialidades' || key === 'diagnostico' || key === 'urgencias') return true;
  const spec = PRODUCT_SPECS[productId];
  if (!spec) return false;
  return spec[key as keyof ProductSpec] as string | boolean | false;
}

// ─── Component ─────────────────────────────────────────────────────────────────
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

  // ── renderizamos en document.body via portal para evitar
  //    problemas con transforms de framer-motion y stacking contexts ──
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
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6">

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

          {/* ── Grid de productos ── */}
          {results.length > 0 && (
            <div className={`grid gap-3 ${
              results.length === 1
                ? 'grid-cols-1 max-w-sm mx-auto'
                : results.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
                  : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
            }`}>
              {results.map((result) => {
                const { int, dec }    = formatPrice(result.price);
                const label           = productLabels[result.product.id] ?? { tag: 'Seguro de salud', color: '#003087' };
                const isHighlighted   = HIGHLIGHTED_IDS.has(result.product.id);
                const highlightBanner = HIGHLIGHT_BANNER[result.product.id];
                const hasDiscount     = result.originalPrice !== undefined;
                const spec            = PRODUCT_SPECS[result.product.id];

                // Borders: only Plena Total highlighted, rest uniform
                const cardBorder = isHighlighted ? `2px solid ${label.color}` : '2px solid #E5E7EB';
                const cardShadow = isHighlighted
                  ? `0 8px 32px ${label.color}30`
                  : '0 2px 10px rgba(0,0,0,0.05)';

                return (
                  <div
                    key={result.product.id}
                    className="bg-white rounded-2xl overflow-hidden flex flex-col transition-transform hover:scale-[1.012] active:scale-[0.99]"
                    style={{ boxShadow: cardShadow, border: cardBorder }}
                  >
                    {/* Highlighted banner — solo Plena Total */}
                    {highlightBanner && (
                      <div
                        className="flex items-center justify-center gap-1.5 py-1.5 text-white text-xs font-bold tracking-wide"
                        style={{ backgroundColor: highlightBanner.bg }}
                      >
                        {highlightBanner.text}
                      </div>
                    )}

                    <div className="p-4 flex flex-col flex-1">
                      {/* Tag copago + descuento */}
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-1.5">
                        <span
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${label.color}1A`,
                            color: label.color,
                          }}
                        >
                          {label.tag}
                        </span>
                        {hasDiscount && (
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
                          >
                            🎉 −10% familia
                          </span>
                        )}
                      </div>

                      {/* Nombre del producto */}
                      <h3 className="font-black text-base leading-tight mb-1" style={{ color: '#003087' }}>
                        {result.product.name}
                      </h3>
                      <p className="text-xs text-gray-400 mb-3">
                        {numAsegurados} {numAsegurados === 1 ? 'asegurado' : 'asegurados'}
                        {ages.length > 0 && ` · ${ages.join(', ')} años`}
                        {' · '}{provincia}
                      </p>

                      {/* ── Tabla de coberturas ✓/✗ ── */}
                      <div
                        className="rounded-xl mb-3 overflow-hidden"
                        style={{ border: '1px solid #E5E7EB' }}
                      >
                        {COVERAGE_ROWS.map((row, ri) => {
                          const val     = getCoverageValue(result.product.id, row.key);
                          const hasIt   = val !== false;
                          const detail  = typeof val === 'string' ? val : null;
                          const isLast  = ri === COVERAGE_ROWS.length - 1;

                          return (
                            <div
                              key={row.key}
                              className="flex items-center justify-between px-3 py-1.5 text-xs"
                              style={{
                                borderBottom: isLast ? 'none' : '1px solid #F3F4F6',
                                backgroundColor: ri % 2 === 0 ? '#FAFAFA' : '#FFFFFF',
                              }}
                            >
                              <span className="flex items-center gap-1.5 text-gray-600">
                                <span className="text-sm leading-none">{row.icon}</span>
                                {row.label}
                              </span>
                              <span
                                className="font-bold flex-shrink-0 ml-2"
                                style={{ color: hasIt ? '#16A34A' : '#D1D5DB' }}
                              >
                                {hasIt
                                  ? detail
                                    ? <span className="text-[10px] font-semibold" style={{ color: '#16A34A' }}>{detail}</span>
                                    : '✓'
                                  : '✗'}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Copago badge */}
                      {spec && (
                        <div className="flex items-center gap-1.5 mb-3">
                          <span
                            className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                            style={
                              spec.sinCopago
                                ? { backgroundColor: '#DCFCE7', color: '#15803D' }
                                : { backgroundColor: '#FEF3C7', color: '#92400E' }
                            }
                          >
                            {spec.sinCopago ? '✓ Sin copago' : '⚠ Con copago'}
                          </span>
                        </div>
                      )}

                      {/* Precio */}
                      <div className="mt-auto pt-2 border-t border-gray-100">
                        {hasDiscount && (
                          <p className="text-xs text-gray-400 line-through text-right">
                            {formatPrice(result.originalPrice!).int},{formatPrice(result.originalPrice!).dec} €/mes
                          </p>
                        )}
                        <div className="flex items-baseline gap-0.5 justify-end mb-2">
                          <span className="text-3xl font-black" style={{ color: '#003087' }}>
                            {int}
                          </span>
                          <span className="text-base font-bold" style={{ color: '#003087' }}>
                            ,{dec}€
                          </span>
                          <span className="text-xs text-gray-400 ml-0.5">/mes</span>
                        </div>
                        {hasDiscount && (
                          <p className="text-[11px] font-semibold text-right mb-2" style={{ color: '#16A34A' }}>
                            Ahorro {formatPrice(result.originalPrice! - result.price).int},{formatPrice(result.originalPrice! - result.price).dec}€/mes
                          </p>
                        )}

                        {/* CTA — siempre rojo corporativo */}
                        <button
                          onClick={() => handleContratar(result)}
                          className="w-full py-3 rounded-xl font-bold text-white text-sm tracking-wide transition-all hover:opacity-90 active:scale-[0.98]"
                          style={{ backgroundColor: '#E4097D' }}
                        >
                          Contratar {result.product.name} →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
              Marchal Aseguradores · Lun–Vie 9:00–19:00
            </p>
          </div>

        </div>
      </main>
    </div>,
    document.body,
  );
}
