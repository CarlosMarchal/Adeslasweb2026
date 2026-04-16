'use client';

import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { captureGclid } from "@/lib/hubspot";
import { trackPageView } from "@/lib/tracking";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PhonePopupProvider } from "./components/PhonePopupContext";
import { HelmetProvider } from "react-helmet-async";

/* ── Home page: eager (crítico para LCP en la ruta /) ── */
import Index from "./views/Index";

/* ── Todas las demás páginas: lazy (se descargan solo cuando se navega a ellas) ── */
const NotFound = lazy(() => import("./views/NotFound"));

/* Planes */
const AdeslaGo             = lazy(() => import("./views/AdeslaGo"));
const AdeslaPlenaVital     = lazy(() => import("./views/AdeslaPlenaVital"));
const AdeslaPlenaVitalTotal= lazy(() => import("./views/AdeslaPlenaVitalTotal"));
const AdeslaPlenaTotal     = lazy(() => import("./views/AdeslaPlenaTotal"));
const AdeslaExtra150       = lazy(() => import("./views/AdeslaExtra150"));
const AdeslaPlenaPlus      = lazy(() => import("./views/AdeslaPlenaPlus"));
const AdeslasSeniors       = lazy(() => import("./views/AdeslasSeniors"));
const AdeslasSeniorsTotal  = lazy(() => import("./views/AdeslasSeniorsTotal"));

/* Autónomos, Pymes & Empresas */
const Autonomos    = lazy(() => import("./views/Autonomos"));
const PymesEmpresas= lazy(() => import("./views/PymesEmpresas"));

/* Extranjeros & Colectivos */
const AdeslaExtranjeros      = lazy(() => import("./views/AdeslaExtranjeros"));
const AdeslaBodyFactory      = lazy(() => import("./views/AdeslaBodyFactory"));
const AdeslaAdifRenfe        = lazy(() => import("./views/AdeslaAdifRenfe"));
const AdeslaDeceosPrimaUnica = lazy(() => import("./views/AdeslaDeceosPrimaUnica"));

/* Formulario Alta & Landings */
const FormularioDeAlta        = lazy(() => import("./views/FormularioDeAlta"));
const LandingPlenaVitalOferta = lazy(() => import("./views/LandingPlenaVitalOferta"));

/* Otros seguros */
const AdeslasDental        = lazy(() => import("./views/AdeslasDental"));
const AdeslaDecesos        = lazy(() => import("./views/AdeslaDecesos"));
const AdeslasMascotas      = lazy(() => import("./views/AdeslasMascotas"));
const AdeslaAsistenciaViaje= lazy(() => import("./views/AdeslaAsistenciaViaje"));
const AdeslaAccidentes     = lazy(() => import("./views/AdeslaAccidentes"));

/* Segmentos */
const SeguroIndividual  = lazy(() => import("./views/SeguroIndividual"));
const SeguroFamiliar    = lazy(() => import("./views/SeguroFamiliar"));
const SeguroInfantil    = lazy(() => import("./views/SeguroInfantil"));
const SeguroGinecologia = lazy(() => import("./views/SeguroGinecologia"));
const SeguroEmbarazadas = lazy(() => import("./views/SeguroEmbarazadas"));
const SeguroMayores     = lazy(() => import("./views/SeguroMayores"));

/* Institucionales */
const CuadroMedico      = lazy(() => import("./views/CuadroMedico"));
const Contacto          = lazy(() => import("./views/Contacto"));
const BlogSalud         = lazy(() => import("./views/BlogSalud"));
const BlogArticle       = lazy(() => import("./views/BlogArticle"));
const PoliticaPrivacidad= lazy(() => import("./views/PoliticaPrivacidad"));
const MiPrecio          = lazy(() => import("./views/MiPrecio"));
const PreciosOfertas    = lazy(() => import("./views/PreciosOfertas"));

/* Uso interno */
const TarificadorInterno = lazy(() => import("./views/TarificadorInterno"));

/* Contratación (nuevo flujo CRO) */
const ContratarPage = lazy(() => import("./views/ContratarPage"));

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
    trackPageView(pathname);
  }, [pathname]);
  return null;
};

const App = () => (
  <HelmetProvider>
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

              {/* Colectivos especiales */}
              <Route path="/adeslas-extranjeros"    element={<AdeslaExtranjeros />} />
              <Route path="/adeslas-body-factory"   element={<AdeslaBodyFactory />} />
              <Route path="/adeslas-adif-renfe"     element={<AdeslaAdifRenfe />} />

              {/* Dental & otros */}
              <Route path="/adeslas-dental"         element={<AdeslasDental />} />
              <Route path="/adeslas-decesos"        element={<AdeslaDecesos />} />
              <Route path="/adesla-decesos-prima-unica" element={<AdeslaDeceosPrimaUnica />} />
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

              {/* Formulario de Alta (legacy) */}
              <Route path="/seguro-salud/adeslas-formulario-de-alta" element={<FormularioDeAlta />} />

              {/* Landings campaña (noindex) */}
              <Route path="/oferta-plena-vital"    element={<LandingPlenaVitalOferta />} />

              {/* Herramienta interna — no indexada en Google */}
              <Route path="/tarificador-interno" element={<TarificadorInterno />} />

              {/* Proceso de contratación — flujo CRO 4 pasos */}
              <Route path="/contratar" element={<ContratarPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PhonePopupProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
