import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { captureGclid } from "@/lib/hubspot";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/* ── Planes ── */
import AdeslaGo from "./pages/AdeslaGo";
import AdeslaPlenaVital from "./pages/AdeslaPlenaVital";
import AdeslaPlenaVitalTotal from "./pages/AdeslaPlenaVitalTotal";
import AdeslaPlenaTotal from "./pages/AdeslaPlenaTotal";
import AdeslaExtra150 from "./pages/AdeslaExtra150";
import AdeslaPlenaPlus from "./pages/AdeslaPlenaPlus";
import AdeslasSeniors from "./pages/AdeslasSeniors";
import AdeslasSeniorsTotal from "./pages/AdeslasSeniorsTotal";

/* ── Autónomos, Pymes & Empresas ── */
import Autonomos from "./pages/Autonomos";
import PymesEmpresas from "./pages/PymesEmpresas";

/* ── Otros seguros ── */
import AdeslasDental from "./pages/AdeslasDental";
import AdeslaDecesos from "./pages/AdeslaDecesos";
import AdeslasMascotas from "./pages/AdeslasMascotas";
import AdeslaAsistenciaViaje from "./pages/AdeslaAsistenciaViaje";
import AdeslaAccidentes from "./pages/AdeslaAccidentes";

/* ── Páginas por segmento ── */
import SeguroIndividual from "./pages/SeguroIndividual";
import SeguroFamiliar from "./pages/SeguroFamiliar";
import SeguroInfantil from "./pages/SeguroInfantil";
import SeguroGinecologia from "./pages/SeguroGinecologia";
import SeguroEmbarazadas from "./pages/SeguroEmbarazadas";
import SeguroMayores from "./pages/SeguroMayores";

/* ── Institucionales ── */
import CuadroMedico from "./pages/CuadroMedico";
import Contacto from "./pages/Contacto";
import BlogSalud from "./pages/BlogSalud";
import BlogArticle from "./pages/BlogArticle";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import MiPrecio from "./pages/MiPrecio";
import PreciosOfertas from "./pages/PreciosOfertas";
import CookieBanner from "./components/CookieBanner";
import { PhonePopupProvider } from "./components/PhonePopupContext";

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
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Planes Adeslas */}
            <Route path="/adeslas-go" element={<AdeslaGo />} />
            <Route path="/adeslas-plena-vital" element={<AdeslaPlenaVital />} />
            <Route path="/adeslas-plena-vital-total" element={<AdeslaPlenaVitalTotal />} />
            <Route path="/adeslas-plena-total" element={<AdeslaPlenaTotal />} />
            <Route path="/adeslas-extra-150" element={<AdeslaExtra150 />} />
            <Route path="/adeslas-plena-plus" element={<AdeslaPlenaPlus />} />
            <Route path="/adeslas-seniors" element={<AdeslasSeniors />} />
            <Route path="/adeslas-seniors-total" element={<AdeslasSeniorsTotal />} />

            {/* Autónomos, Pymes & Empresas */}
            <Route path="/autonomos" element={<Autonomos />} />
            <Route path="/pymes-empresas" element={<PymesEmpresas />} />

            {/* Dental & Decesos */}
            <Route path="/adeslas-dental" element={<AdeslasDental />} />
            <Route path="/adeslas-decesos" element={<AdeslaDecesos />} />
            <Route path="/adeslas-mascotas" element={<AdeslasMascotas />} />
            <Route path="/adeslas-asistencia-viaje" element={<AdeslaAsistenciaViaje />} />
            <Route path="/adeslas-accidentes" element={<AdeslaAccidentes />} />

            {/* Páginas por segmento */}
            <Route path="/seguro-medico-individual" element={<SeguroIndividual />} />
            <Route path="/seguro-medico-familiar" element={<SeguroFamiliar />} />
            <Route path="/seguro-medico-infantil" element={<SeguroInfantil />} />
            <Route path="/seguro-medico-ginecologia" element={<SeguroGinecologia />} />
            <Route path="/seguro-medico-embarazadas" element={<SeguroEmbarazadas />} />
            <Route path="/seguro-medico-mayores" element={<SeguroMayores />} />

            {/* Institucionales */}
            <Route path="/cuadro-medico" element={<CuadroMedico />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/blog" element={<BlogSalud />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/mi-precio/:slug" element={<MiPrecio />} />
            <Route path="/precios-ofertas" element={<PreciosOfertas />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
        </BrowserRouter>
      </PhonePopupProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
