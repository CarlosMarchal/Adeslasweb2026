'use client';

import { useEffect } from 'react';
import { X, Phone, Shield, CheckCircle2, Star } from 'lucide-react';

// ─── Product labels ────────────────────────────────────────────────────────────
const productLabels: Record<string, { tag: string; color: string }> = {
  ya:               { tag: 'Cobertura ambulatoria',                  color: '#10B981' },
  esencial:         { tag: 'Copagos medios',                         color: '#009FE3' },
  plena:            { tag: 'Copagos reducidos',                      color: '#0EA5E9' },
  completaPlusPlus: { tag: 'Completa sin copagos',                   color: '#6366F1' },
  completaPlus:     { tag: 'Copagos · 3 años sin subidas',           color: '#8B5CF6' },
  completa:         { tag: 'Recomendado · 3 años sin subidas',       color: '#003087' },
  reembolso:        { tag: 'Libre elección',                         color: '#D97706' },
  seniors:          { tag: 'Recomendado personas mayores',           color: '#F59E0B' },
  'seniors-total':  { tag: 'Personas mayores · 3 años sin subidas',  color: '#0369A1' },
};

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ProductResult {
  product: { id: string; name: string; slug: string };
  price: number;
  originalPrice?: number;
}

interface ModalResultadosProps {
  results: ProductResult[];
  ages: number[];
  provincia: string;
  nombre: string;
  email: string;
  telefono: string;
  numAsegurados: number;
  onClose: () => void;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
const formatPrice = (price: number) => {
  const [int, dec] = price.toFixed(2).split('.');
  return { int, dec };
};

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
  // Block body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Navigate to contracting flow
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

  return (
    /* ── Overlay fondo ── */
    <div
      className="fixed inset-0 z-[500] flex flex-col"
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
            {primerNombre ? `¡Hola ${primerNombre}! Tu seguro está listo 🎉` : 'Tu seguro Adeslas está listo 🎉'}
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
        <div className="max-w-2xl mx-auto px-4 py-5 sm:px-6">

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mb-5 text-xs text-gray-500 flex-wrap">
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
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="font-bold text-gray-800 mb-2">No hay tarifas disponibles</h3>
              <p className="text-sm text-gray-500 mb-5">
                No hemos encontrado tarifas para los datos seleccionados. Prueba otra combinación o
                llámanos.
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

          {/* Tarjetas de productos */}
          <div className="space-y-3">
            {results.map((result, index) => {
              const { int, dec } = formatPrice(result.price);
              const label = productLabels[result.product.id] ?? { tag: 'Seguro de salud', color: '#003087' };
              const isTop = index === 0 && results.length > 1;
              const hasDiscount = result.originalPrice !== undefined;

              return (
                <div
                  key={result.product.id}
                  className="bg-white rounded-2xl overflow-hidden transition-transform hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    boxShadow: isTop
                      ? '0 6px 28px rgba(0, 48, 135, 0.16)'
                      : '0 2px 10px rgba(0,0,0,0.06)',
                    border: isTop ? '2px solid #009FE3' : '2px solid #EEF5FB',
                  }}
                >
                  {/* Banner "Mejor precio" */}
                  {isTop && (
                    <div
                      className="flex items-center justify-center gap-1.5 py-1.5 text-white text-xs font-bold"
                      style={{ backgroundColor: '#009FE3' }}
                    >
                      <Star className="w-3 h-3 fill-white" />
                      Mejor precio
                    </div>
                  )}

                  <div className="p-4 sm:p-5">
                    {/* Tag + descuento */}
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: `${label.color}1A`,
                          color: label.color,
                        }}
                      >
                        {label.tag}
                      </span>
                      {hasDiscount && (
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: '#DCFCE7', color: '#166534' }}
                        >
                          🎉 Descuento familiar −10%
                        </span>
                      )}
                    </div>

                    {/* Nombre + precio */}
                    <div className="flex items-end justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg leading-tight" style={{ color: '#003087' }}>
                          {result.product.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {numAsegurados} {numAsegurados === 1 ? 'asegurado' : 'asegurados'}
                          {ages.length > 0 && ` · ${ages.join(', ')} años`}
                          {' · '}{provincia}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        {hasDiscount && (
                          <p className="text-xs text-gray-400 line-through">
                            {formatPrice(result.originalPrice!).int},{formatPrice(result.originalPrice!).dec} €/mes
                          </p>
                        )}
                        <div className="flex items-baseline gap-0.5 justify-end">
                          <span className="text-3xl font-black" style={{ color: '#003087' }}>
                            {int}
                          </span>
                          <span className="text-base font-bold" style={{ color: '#003087' }}>
                            ,{dec}€
                          </span>
                          <span className="text-xs text-gray-400 ml-0.5">/mes</span>
                        </div>
                        {hasDiscount && (
                          <p className="text-[11px] font-semibold" style={{ color: '#16A34A' }}>
                            Ahorro {formatPrice(result.originalPrice! - result.price).int},{formatPrice(result.originalPrice! - result.price).dec}€/mes
                          </p>
                        )}
                      </div>
                    </div>

                    {/* CTA contratar */}
                    <button
                      onClick={() => handleContratar(result)}
                      className="w-full mt-4 py-3.5 rounded-xl font-bold text-white text-sm tracking-wide transition-all hover:opacity-90 active:scale-[0.98]"
                      style={{ backgroundColor: '#E4097D' }}
                    >
                      Contratar {result.product.name} →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Separador "o llámanos" */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400 bg-[#EEF5FB] px-3">
              o si prefieres hablar con un asesor
            </div>
          </div>

          {/* Teléfono */}
          <div className="bg-white rounded-2xl p-5 text-center shadow-sm mb-6">
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
            <p className="text-xs text-gray-400 mt-1.5">
              Marchal Aseguradores · Lun–Vie 9:00–19:00
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
