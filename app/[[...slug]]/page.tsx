/**
 * Catch-all route: sirve el SPA de React Router (src/App.tsx) para todas las rutas
 * que no tienen una página explícita en /app (contratar, internal/tarificador, api).
 */
import nextDynamic from 'next/dynamic';

// Exporta la config estática para Next.js
export const dynamic = 'force-static';

// Cargamos App.tsx sin SSR para evitar problemas con react-router-dom
const AppSPA = nextDynamic(() => import('@/App'), { ssr: false });

export default function CatchAllPage() {
  return <AppSPA />;
}
