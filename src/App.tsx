import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { captureGclid } from "@/lib/hubspot";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PhonePopupProvider } from "./components/PhonePopupContext";

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
const Autonomos    = lazy(() => import("./pages/Autonomos"));
const PymesEmpresas= lazy(() => import("./pages/PymesEmpresas"));

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PhonePopupProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />

              {/* Planes Adeslas */}
              <Route path="/adeslas-go"               element={<AdeslaGo />} />
              <Route path="/adeslas-plena-vital"      element={<AdeslaPlenaVital />} />
              <Route path="/adeslas-plena-vital-total"element={<AdeslaPlenaVitalTotal />} />
              <Route path="/adeslas-plena-total"      element={<AdeslaPlenaTotal />} />
              <Route path="/adeslas-extra-150"        element={<AdeslaExtra150 />} />
              <Route path="/adeslas-plena-plus"       element={<AdeslaPlenaPlus />} />
              <Route path="/adeslas-seniors"          element={<AdeslasSeniors />} />
              <Route path="/adeslas-seniors-total"    element={<AdeslasSeniorsTotal />} />

              {/* Autónomos, Pymes & Empresas */}
              <Route path="/autonomos"     element={<Autonomos />} />
              <Route path="/pymes-empresas"element={<PymesEmpresas />} />

              {/* Dental & otros */}
              <Route path="/adeslas-dental"         element={<AdeslasDental />} />
              <Route path="/adeslas-decesos"        element={<AdeslaDecesos />} />
              <Route path="/adeslas-mascotas"       element={<AdeslasMascotas />} />
              <Route path="/adeslas-asistencia-viaje"element={<AdeslaAsistenciaViaje />} />
              <Route path="/adeslas-accidentes"     element={<AdeslaAccidentes />} />

              {/* Páginas por segmento */}
              <Route path="/seguro-medico-individual" element={<SeguroIndividual />} />
              <Route path="/seguro-medico-familiar"   element={<SeguroFamiliar />} />
              <Route path="/seguro-medico-infantil"   element={<SeguroInfantil />} />
              <Route path="/seguro-medico-ginecologia"element={<SeguroGinecologia />} />
              <Route path="/seguro-medico-embarazadas"element={<SeguroEmbarazadas />} />
              <Route path="/seguro-medico-mayores"    element={<SeguroMayores />} />

              {/* Institucionales */}
              <Route path="/cuadro-medico"         element={<CuadroMedico />} />
              <Route path="/contacto"              element={<Contacto />} />
              <Route path="/blog"                  element={<BlogSalud />} />
              <Route path="/blog/:slug"            element={<BlogArticle />} />
              <Route path="/politica-de-privacidad"element={<PoliticaPrivacidad />} />
              <Route path="/mi-precio/:slug"       element={<MiPrecio />} />
              <Route path="/precios-ofertas"       element={<PreciosOfertas />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PhonePopupProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
