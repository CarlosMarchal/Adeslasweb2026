import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContratarContent from './ContratarContent';

// ─── SEO ─────────────────────────────────────────────────────────────────────
// Página de contratación: no indexar (datos de usuario, flujo privado)
export const metadata: Metadata = {
  title: 'Contratar Seguro de Salud Adeslas | Marchal Aseguradores',
  description: 'Proceso de alta de tu seguro Adeslas. Proceso guiado, seguro y en menos de 3 minutos.',
  robots: { index: false, follow: false },
};

// ─── Fallback mientras carga ──────────────────────────────────────────────────
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EEF5FB' }}>
      <div className="flex flex-col items-center gap-3">
        <div
          style={{
            width: 36, height: 36,
            border: '3px solid #D5E3F0',
            borderTopColor: '#009FE3',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
          }}
        />
        <p className="text-sm text-gray-500">Cargando tu seguro...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
// useSearchParams() must be inside Suspense in Next.js App Router
export default function ContratarPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ContratarContent />
    </Suspense>
  );
}
