"use client";

import { useState, useDeferredValue } from "react";
import { motion } from "@/lib/motion";
import { useSeo } from "@/hooks/use-seo";
import { TarificadorProvider } from "@/components/TarificadorContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
/* LCP fix: URL pública predecible */
const HERO_BG = "/images/adeslas-cuadro-medico.webp";

const stats = [
  { value: "+51.000", label: "Profesionales médicos" },
  { value: "+1.400", label: "Centros concertados" },
  { value: "52", label: "Provincias con cobertura" },
];

const specialties = [
  "Alergología", "Anestesiología", "Cardiología", "Cirugía general",
  "Dermatología", "Endocrinología", "Gastroenterología", "Ginecología",
  "Hematología", "Medicina interna", "Nefrología", "Neumología",
  "Neurología", "Oftalmología", "Oncología", "Otorrinolaringología",
  "Pediatría", "Psiquiatría", "Radiología", "Rehabilitación",
  "Reumatología", "Traumatología", "Urología", "Medicina preventiva",
];

/* Province → PDF mapping. Files live in /public/cuadros-medicos/ */
const provincias = [
  "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila",
  "Badajoz", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria",
  "Castellón", "Ceuta", "Ciudad Real", "Córdoba", "Cuenca",
  "Gerona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva", "Huesca",
  "Islas Baleares", "Jaén", "La Coruña", "La Rioja", "Las Palmas",
  "León", "Lérida", "Lugo", "Madrid", "Málaga", "Melilla", "Murcia",
  "Navarra", "Orense", "Palencia", "Pontevedra", "Salamanca", "Segovia",
  "Sevilla", "Soria", "Tarragona", "Tenerife", "Teruel", "Toledo", "Valencia",
  "Valladolid", "Vizcaya", "Zamora", "Zaragoza",
];

const CuadroMedicoSpaSeo = () =>
  useSeo({
    title: "Cuadro Médico Adeslas 2026 | +51.000 Médicos y 1.400 Centros en España",
    description:
      "Consulta y descarga el cuadro médico Adeslas 2026 por provincia. Más de 51.000 profesionales y 1.400 centros médicos en toda España. Sin listas de espera.",
    canonical: "https://adeslas.numero1salud.es/cuadro-medico/",
    ogImage: "https://adeslas.numero1salud.es/og-cuadro-medico.jpg",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
      { name: "Cuadro Médico", url: "https://adeslas.numero1salud.es/cuadro-medico/" },
    ],
    preloadImage: HERO_BG,
    faqSchema: [
      {
        q: "¿Cuántos médicos tiene Adeslas en su cuadro médico?",
        a: "El cuadro médico de Adeslas 2026 cuenta con más de 51.000 profesionales médicos y más de 1.400 centros concertados en toda España, distribuidos en 52 provincias.",
      },
      {
        q: "¿Cómo puedo consultar el cuadro médico Adeslas por provincia?",
        a: "Puedes consultar el cuadro médico Adeslas por provincia directamente en esta página. Selecciona tu provincia para acceder al listado actualizado de médicos y centros disponibles para tu seguro.",
      },
      {
        q: "¿Qué especialidades médicas incluye el cuadro Adeslas?",
        a: "El cuadro médico Adeslas incluye más de 40 especialidades médicas: medicina general, cardiología, dermatología, ginecología, pediatría, traumatología, oncología, neurología, psiquiatría, rehabilitación, oftalmología, otorrinolaringología y muchas más.",
      },
      {
        q: "¿El cuadro médico Adeslas incluye hospitales?",
        a: "Sí. Adeslas dispone de más de 1.400 centros concertados en España, incluyendo clínicas, centros de diagnóstico y hospitales de referencia en todas las provincias.",
      },
    ],
  });

const CuadroMedico = ({ renderSeo = true }: { renderSeo?: boolean } = {}) => {
  const [search, setSearch] = useState("");
  // useDeferredValue: el input se actualiza inmediatamente (sin lag visual),
  // pero el filtrado de las 52 provincias se difiere al siguiente frame idle.
  // Esto elimina el bloqueo del main thread en cada keystroke en móvil.
  const deferredSearch = useDeferredValue(search);

  const filtered = provincias.filter((p) =>
    p.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  return (
    <TarificadorProvider>
      {renderSeo && <CuadroMedicoSpaSeo />}
      <Header />

      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          background:
            "linear-gradient(135deg, #003087 0%, #009FE3 65%, #009FE3 100%)",
          minHeight: "460px",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            opacity: 0.12,
            mixBlendMode: "luminosity",
          }}
        />
        <div className="container mx-auto px-4 py-10 lg:py-12 relative z-10">
          {/* Sin animación fade-in en el hero: el H1 es el elemento LCP y debe
              ser visible de forma inmediata para no penalizar Core Web Vitals */}
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm text-primary-foreground"
              style={{
                background: "rgba(255,255,255,0.11)",
                border: "1px solid rgba(255,255,255,0.22)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-azul-claro" />
              Red médica nacional
            </div>
            <h1 className="text-primary-foreground mb-3 text-[26px] md:text-[36px] leading-tight md:leading-[1.15]">
              Cuadro Médico
              <br />
              <span className="text-azul-claro">Adeslas 2026</span>
            </h1>
            <p
              className="text-lg max-w-2xl"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              Accede a la red médica más amplia: más de 51.000 médicos y
              1.400+ centros médicos en toda España. Descarga el
              cuadro médico de tu provincia.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12" style={{ backgroundColor: "#003087" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-primary-foreground text-3xl md:text-4xl font-black">
                  {s.value}
                </div>
                <div
                  className="text-sm mt-1"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cuadros médicos por provincia */}
      <section className="section-pad bg-blanco">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-gris-texto mb-3">
              Descarga el Cuadro Médico Adeslas 2026 por Provincia
            </h2>
            <p className="text-gris-medio max-w-xl mx-auto mb-6">
              Selecciona tu provincia para descargar el cuadro médico Adeslas 2026
              en formato PDF con todos los profesionales, centros y hospitales
              disponibles.
            </p>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar provincia..."
              className="w-full max-w-md mx-auto border border-borde px-4 py-3 text-sm text-gris-texto focus:outline-none focus:border-azul-medio"
              style={{ borderRadius: "10px" }}
            />
          </motion.div>

          {/* INP FIX: se usan <a> nativos en lugar de motion.a.
              Razón: motion.a crea un IntersectionObserver por cada tarjeta (52 provincias).
              Cuando el usuario escribe en el buscador, React re-renderiza las 52 tarjetas y
              framer-motion re-evalúa el estado de animación de cada una → bloqueo de
              ~240 ms en el main thread en móvil (INP 244 ms según GSC, mayo 2026).
              Las transiciones hover siguen funcionando 100% vía CSS (Tailwind transition-*). */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filtered.map((p) => (
              <a
                key={p}
                href={`/cuadros-medicos/Adeslas%20Cuadro%20Medico%20${encodeURIComponent(p)}%202026.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-blanco border border-borde p-4 flex items-center gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-azul-medio hover:shadow-sm"
                style={{ borderRadius: "12px" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-azul-medio"
                  style={{ backgroundColor: "#E8F4FC" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8 1v10M4 7l4 4 4-4M2 13h12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-azul-medio group-hover:text-white transition-colors duration-200"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gris-texto group-hover:text-azul-medio transition-colors duration-200">
                  {p}
                </span>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gris-medio text-sm mt-8">
              No se encontraron provincias con ese nombre.
            </p>
          )}
        </div>
      </section>

      {/* External buscador */}
      <section className="section-pad bg-gris-claro">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-gris-texto mb-4">
              Busca Médicos y Centros Adeslas Online por Especialidad
            </h2>
            <p className="text-gris-medio mb-8 max-w-xl mx-auto">
              También puedes buscar médicos, centros y hospitales por
              especialidad y ubicación en el buscador oficial de Adeslas.
            </p>
            <a
              href="https://www.segurcaixaadeslas.es/es/cuadro-medico"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-lg text-primary-foreground font-bold text-base btn-cta-magenta"
              style={{ backgroundColor: "#E4097D", borderRadius: "7px" }}
            >
              Buscador online de Adeslas →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Specialties */}
      <section className="section-pad bg-blanco">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-gris-texto mb-3">
              Especialidades Médicas Cubiertas por Adeslas
            </h2>
            <p className="text-gris-medio">
              Más de 40 especialidades médicas incluidas en tu seguro Adeslas. Acceso directo sin derivaciones ni listas de espera.
            </p>
          </motion.div>
          {/* INP FIX: grid estático sin motion — las 24 especialidades son contenido
              puramente informativo, no requieren animación de entrada. */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {specialties.map((s) => (
              <div
                key={s}
                className="bg-gris-claro border border-borde p-4 text-center text-sm font-medium text-gris-texto"
                style={{ borderRadius: "12px" }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </TarificadorProvider>
  );
};

export default CuadroMedico;
