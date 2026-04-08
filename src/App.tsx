import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, MemoryRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { captureGclid } from "@/lib/hubspot";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PhonePopupProvider } from "./components/PhonePopupContext";
// true only in Node.js (vite-react-ssg SSR build), never in the browser
const isSSR = typeof window === "undefined";

/* ── Home page: eager (crítico para LCP en la ruta /) ── */
import Index from "./pages/Index";

/* ── Todas las demás páginas: lazy (se descargan solo cuando se navega a ellas) ── */
const NotFound = lazy(() => import("./pages/NotFound"));

/* Planes */
const AdeslaGo             = lazy(() => import("./pages/AdeslaGo"));
const AdeslaPlenaVital     = lazy(() => import("./pages/AdeslaPlenaVital"));
const AdeslaPlenaVitalTotal= lazy(() => import("./pages/AdeslaPlenaVitalTotal"));
const AdeslaPlenaTotal     = lazy(() => import("./pages/AdeslaPlenaTotal"));
const AdeslaExtra150       = lazy(() => import("./pages/AdeslaExtra150"));
const AdeslaPlenaPlus      = lazy(() => import("./pages/AdeslaPlenaPlus"));
const AdeslasSeniors       = lazy(() => import("./pages/AdeslasSeniors"));
const AdeslasSeniorsTotal  = lazy(() => import("./pages/AdeslasSeniorsTotal"));

/* Autónomos, Pymes & Empresas */
const Autonomos      = lazy(() => import("./pages/Autonomos"));
const PymesEmpresas  = lazy(() => import("./pages/PymesEmpresas"));

/* Extranjeros */
const AdeslaExtranjeros = lazy(() => import("./pages/AdeslaExtranjeros"));

/* Colectivos */
const AdeslaBodyFactory = lazy(() => import("./pages/AdeslaBodyFactory"));
const AdeslaAdifRenfe   = lazy(() => import("./pages/AdeslaAdifRenfe"));

/* Decesos Prima Única */
const AdeslaDeceosPrimaUnica = lazy(() => import("./pages/AdeslaDeceosPrimaUnica"));

/* Formulario de Alta */
const FormularioDeAlta = lazy(() => import("./pages/FormularioDeAlta"));

/* Landings de campaña (noindex) */
const LandingPlenaVitalOferta = lazy(() => import("./pages/LandingPlenaVitalOferta"));

/* Otros seguros */
const AdeslasDental        = lazy(() => import("./pages/AdeslasDental"));
const AdeslaDecesos        = lazy(() => import("./pages/AdeslaDecesos"));
const AdeslasMascotas      = lazy(() => import("./pages/AdeslasMascotas"));
const AdeslaAsistenciaViaje= lazy(() => import("./pages/AdeslaAsistenciaViaje"));
const AdeslaAccidentes     = lazy(() => import("./pages/AdeslaAccidentes"));

/* Segmentos */
const SeguroIndividual  = lazy(() => import("./pages/SeguroIndividual"));
const SeguroFamiliar    = lazy(() => import("./pages/SeguroFamiliar"));
const SeguroInfantil    = lazy(() => import("./pages/SeguroInfantil"));
const SeguroGinecologia = lazy(() => import("./pages/SeguroGinecologia"));
const SeguroEmbarazadas = lazy(() => import("./pages/SeguroEmbarazadas"));
const SeguroMayores     = lazy(() => import("./pages/SeguroMayores"));

/* Institucionales */
const CuadroMedico      = lazy(() => import("./pages/CuadroMedico"));
const Contacto          = lazy(() => import("./pages/Contacto"));
const BlogSalud         = lazy(() => import("./pages/BlogSalud"));
const BlogArticle       = lazy(() => import("./pages/BlogArticle"));
const PoliticaPrivacidad= lazy(() => import("./pages/PoliticaPrivacidad"));
const MiPrecio          = lazy(() => import("./pages/MiPrecio"));
const PreciosOfertas    = lazy(() => import("./pages/PreciosOfertas"));

/* ── Fallback mientras carga la página ── */
const PageLoader = () => (
  <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
    <div style={{
      width: 36, height: 36,
      border: "3px solid #E8EFF4",
      borderTopColor: "#009FE3",
      borderRadius: "50%",
      animation: "adeslas-spin 0.7s linear infinite",
    }} />
    <style>{`@keyframes adeslas-spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    captureGclid();
  }, [pathname]);
  return null;
};

/* Routes content — same for both SSR (MemoryRouter) and client (BrowserRouter) */
const AppRoutes = () => (
  <Suspense fallback={isSSR ? null : <PageLoader />}>
    {!isSSR && <ScrollToTop />}
    <Routes>
              <Route path="/" element={<Index />} />

              {/* Planes Adeslas */}
              <Route path="/seguro-salud/adeslas-go/"               element={<AdeslaGo />} />
              <Route path="/seguro-salud/adeslas-plena-vital/"      element={<AdeslaPlenaVital />} />
              <Route path="/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/"element={<AdeslaPlenaVitalTotal />} />
              <Route path="/seguro-salud/adeslas-plena-total/"      element={<AdeslaPlenaTotal />} />
              <Route path="/seguro-salud/adeslas-extra-150/"        element={<AdeslaExtra150 />} />
              <Route path="/seguro-salud/adeslas-plena-plus/"       element={<AdeslaPlenaPlus />} />
              <Route path="/seguro-salud/adeslas-seniors/"          element={<AdeslasSeniors />} />
              <Route path="/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/"    element={<AdeslasSeniorsTotal />} />

              {/* Autónomos, Pymes & Empresas */}
              <Route path="/seguro-salud/autonomos/"  element={<Autonomos />} />
              <Route path="/seguro-salud/pymes/"      element={<PymesEmpresas />} />
              <Route path="/seguro-salud/empresas/"   element={<PymesEmpresas />} />

              {/* Extranjeros */}
              <Route path="/seguro-salud/adeslas-extranjeros/" element={<AdeslaExtranjeros />} />

              {/* Dental & otros */}
              <Route path="/seguro-dental/"         element={<AdeslasDental />} />
              <Route path="/seguro-decesos/"        element={<AdeslaDecesos />} />
              <Route path="/seguro-mascotas/"       element={<AdeslasMascotas />} />
              <Route path="/adeslas-asistencia-en-viaje/"element={<AdeslaAsistenciaViaje />} />
              <Route path="/seguro-accidentes/"     element={<AdeslaAccidentes />} />

              {/* Páginas por segmento */}
              <Route path="/seguro-salud/adeslas-individual/" element={<SeguroIndividual />} />
              <Route path="/seguro-salud/seguro-familia/"   element={<SeguroFamiliar />} />
              <Route path="/seguro-salud/adeslas-infantil/"   element={<SeguroInfantil />} />
              <Route path="/seguro-salud/adeslas-ginecologia/"element={<SeguroGinecologia />} />
              <Route path="/seguro-salud/embarazo/"element={<SeguroEmbarazadas />} />
              <Route path="/seguro-salud/seguro-para-personas-mayores/"    element={<SeguroMayores />} />

              {/* Institucionales */}
              <Route path="/cuadro-medico/"         element={<CuadroMedico />} />
              <Route path="/contacto/"              element={<Contacto />} />
              <Route path="/adeslas-blog/"          element={<BlogSalud />} />
              <Route path="/blog/:slug"             element={<BlogArticle />} />
              <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
              <Route path="/mi-precio/:slug"        element={<MiPrecio />} />
              <Route path="/seguro-salud/ofertas-adeslas-precios/" element={<PreciosOfertas />} />
              {/* Alias — misma página de precios con URL alternativa del WordPress */}
              <Route path="/precios-y-ofertas/"     element={<PreciosOfertas />} />
              {/* Redirect 301: /calcula-tu-seguro/ → /contacto/ */}
              <Route path="/calcula-tu-seguro/"     element={<Navigate to="/contacto/" replace />} />

              {/* Colectivos */}
              <Route path="/adeslas-body-factory/"  element={<AdeslaBodyFactory />} />
              <Route path="/adeslas-adif-renfe/"    element={<AdeslaAdifRenfe />} />

              {/* Decesos Prima Única */}
              <Route path="/seguro-adeslas-decesos-prima-unica/" element={<AdeslaDeceosPrimaUnica />} />

              {/* Formulario de Alta */}
              <Route path="/seguro-salud/adeslas-formulario-de-alta/" element={<FormularioDeAlta />} />

              {/* Landings de campaña Google Ads (noindex) */}
              <Route path="/adeslasplenavitaloferta/" element={<LandingPlenaVitalOferta />} />

              <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

/**
 * App shell.
 * • During SSG (isSSR=true): MemoryRouter initialised with the current route
 *   path so React Router renders the correct page component → Helmet captures
 *   the right meta tags → vite-react-ssg injects them into the static HTML.
 * • In the browser: normal BrowserRouter SPA behaviour.
 * NOTE: <HelmetProvider> is NOT included here — vite-react-ssg wraps the app
 * in <HelmetProvider> automatically on both server and client.
 */
interface AppProps {
  /** Used during SSG: initialises MemoryRouter at this path so each page renders correctly. */
  initialPath?: string;
}

const App = ({ initialPath = "/" }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PhonePopupProvider>
        {isSSR ? (
          <MemoryRouter initialEntries={[initialPath]}>
            <AppRoutes />
          </MemoryRouter>
        ) : (
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        )}
      </PhonePopupProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
