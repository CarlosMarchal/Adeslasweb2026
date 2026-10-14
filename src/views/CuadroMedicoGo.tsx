"use client";

/**
 * Cuadro Médico Adeslas GO 2026 — /cuadro-medico/go/
 *
 * Misma línea visual que /cuadro-medico/ y /cuadro-medico/seniors/. Todo el
 * contenido (provincias, especialidades por provincia, autorizaciones y FAQ) se
 * pre-renderiza en el HTML inicial: los desplegables usan <details> nativo para que
 * buscadores y rastreadores de IA lean el texto completo sin ejecutar JS.
 *
 * No añade tracking propio: la captación de leads la hace <CtaSection /> (sin cambios).
 * Autor: Juan Carlos Díaz — Convertiam.
 */
import { useState, useDeferredValue } from "react";
import { TarificadorProvider } from "@/components/TarificadorContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import { FAQ_SCHEMAS } from "@/data/faqSchemas";
import {
  PROVINCIAS_GO,
  PROVINCIAS_GO_PENDIENTES,
  SECCIONES_CUADRO_GO,
  AUTORIZACION_PREVIA_GO,
  goPdfUrl,
} from "@/data/cuadroMedicoGo";

const HERO_BG = "/images/seguro-medico-adeslas-go.webp";
const FAQS = FAQ_SCHEMAS["/cuadro-medico/go"] ?? [];
const MAX_ESPECIALIDADES = Math.max(...PROVINCIAS_GO.map((p) => p.especialidades.length));

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const stats = [
  { value: String(PROVINCIAS_GO.length), label: "Provincias en PDF" },
  { value: "2026", label: "Edición oficial" },
  { value: `Hasta ${MAX_ESPECIALIDADES}`, label: "Especialidades por provincia" },
  { value: "48 h", label: "Autorizaciones on-line" },
];

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M8 1v10M4 7l4 4 4-4M2 13h12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Chevron = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    className="flex-shrink-0 text-azul-medio transition-transform duration-200 group-open:rotate-180"
  >
    <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CuadroMedicoGo = () => {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const q = normalize(deferredSearch.trim());
  const filtered = q ? PROVINCIAS_GO.filter((p) => normalize(p.nombre).includes(q)) : PROVINCIAS_GO;

  return (
    <TarificadorProvider>
      <Header />

      {/* Hero — sin animación: el H1 es el elemento LCP */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          background: "linear-gradient(135deg, #003087 0%, #009FE3 65%, #009FE3 100%)",
          minHeight: "460px",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})`, opacity: 0.12, mixBlendMode: "luminosity" }}
        />
        <div className="container mx-auto px-4 py-10 lg:py-12 relative z-10">
          <nav aria-label="Migas de pan" className="mb-5 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
            <a href="/" className="hover:underline">Inicio</a>
            <span className="mx-2">/</span>
            <a href="/cuadro-medico/" className="hover:underline">Cuadro médico</a>
            <span className="mx-2">/</span>
            <span className="text-primary-foreground">GO</span>
          </nav>
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm text-primary-foreground"
              style={{ background: "rgba(255,255,255,0.11)", border: "1px solid rgba(255,255,255,0.22)" }}
            >
              <span className="w-2 h-2 rounded-full bg-azul-claro" />
              Seguro ambulatorio Adeslas GO
            </div>
            <h1 className="text-primary-foreground mb-3 text-[26px] md:text-[36px] leading-tight md:leading-[1.15]">
              Cuadro Médico
              <br />
              <span className="text-azul-claro">Adeslas GO 2026</span>
            </h1>
            <p className="text-lg max-w-2xl mb-8" style={{ color: "rgba(255,255,255,0.82)" }}>
              Descarga gratis el cuadro médico oficial del seguro Adeslas GO de tu
              provincia: médicos de familia, pediatras, especialistas y centros de
              pruebas diagnósticas concertados.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#provincias"
                className="inline-block px-7 py-3.5 text-primary-foreground font-extrabold text-base btn-cta-magenta"
                style={{ backgroundColor: "#E4097D", borderRadius: "7px" }}
              >
                Descargar mi cuadro médico
              </a>
              <a
                href="/seguro-salud/adeslas-go/"
                className="inline-block px-7 py-3.5 font-bold text-base text-primary-foreground transition-colors hover:bg-white/10"
                style={{ border: "1.5px solid rgba(255,255,255,0.55)", borderRadius: "7px" }}
              >
                Ver el seguro Adeslas GO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12" style={{ backgroundColor: "#003087" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-primary-foreground text-3xl md:text-4xl font-black">{s.value}</div>
                <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Descarga por provincia */}
      <section id="provincias" className="section-pad bg-blanco scroll-mt-24">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-gris-texto mb-3">Descarga el Cuadro Médico Adeslas GO 2026 por Provincia</h2>
            <p className="text-gris-medio max-w-2xl mx-auto mb-6">
              Elige tu provincia y descarga en PDF el cuadro médico Adeslas GO con todos los
              profesionales y centros concertados. Es el mismo cuadro que el de la póliza
              Adeslas Básico.
            </p>
            <label htmlFor="buscar-provincia-go" className="sr-only">
              Buscar provincia
            </label>
            <input
              id="buscar-provincia-go"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar provincia..."
              className="w-full max-w-md mx-auto border border-borde px-4 py-3 text-sm text-gris-texto focus:outline-none focus:border-azul-medio"
              style={{ borderRadius: "10px" }}
            />
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map((p) => (
              <li key={p.slug}>
                <a
                  href={goPdfUrl(p.slug)}
                  target="_blank"
                  rel="noopener"
                  title={`Descargar cuadro médico Adeslas GO 2026 ${p.nombre} (PDF)`}
                  className="group h-full bg-blanco border border-borde p-4 flex items-center gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-azul-medio hover:shadow-sm"
                  style={{ borderRadius: "12px" }}
                >
                  <span
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-azul-medio transition-colors duration-200 group-hover:bg-azul-medio group-hover:text-white"
                    style={{ backgroundColor: "#E8F4FC" }}
                  >
                    <DownloadIcon />
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-gris-texto group-hover:text-azul-medio transition-colors duration-200">
                      Adeslas GO {p.nombre}
                    </span>
                    <span className="text-xs text-gris-medio">
                      PDF · {p.paginas} págs. · {p.sizeMb} MB
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <p className="text-center text-gris-medio text-sm mt-8">
              Todavía no tenemos el cuadro GO de esa provincia.{" "}
              <a href="/cuadro-medico/" className="text-azul-medio font-semibold hover:underline">
                Consulta el cuadro médico general de Adeslas
              </a>{" "}
              o pídenos el tuyo en el formulario de abajo.
            </p>
          )}

          <p className="text-center text-gris-medio text-sm mt-8 max-w-3xl mx-auto">
            Próximamente: {PROVINCIAS_GO_PENDIENTES.join(", ")}. Mientras tanto, consulta el{" "}
            <a href="/cuadro-medico/" className="text-azul-medio font-semibold hover:underline">
              cuadro médico Adeslas 2026 de las 52 provincias
            </a>{" "}
            o solicítanos el cuadro GO de tu zona sin compromiso.
          </p>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="section-pad bg-gris-claro">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-gris-texto mb-3">Qué Incluye el Cuadro Médico Adeslas GO</h2>
            <p className="text-gris-medio max-w-2xl mx-auto">
              Cada PDF provincial sigue la misma estructura, para que encuentres rápido al
              médico, al especialista o el centro de pruebas que necesitas.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECCIONES_CUADRO_GO.map((s, i) => (
              <div key={s.titulo} className="bg-blanco border border-borde p-5" style={{ borderRadius: "12px" }}>
                <div className="text-azul-medio text-xs font-black mb-2">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-gris-texto text-base font-bold mb-2">{s.titulo}</h3>
                <p className="text-gris-medio text-sm leading-relaxed">{s.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Especialidades por provincia */}
      <section className="section-pad bg-blanco">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-gris-texto mb-3">Especialidades de Adeslas GO por Provincia</h2>
            <p className="text-gris-medio max-w-2xl mx-auto">
              Especialidades con médicos concertados en la capital de cada provincia, según el
              cuadro médico Adeslas GO 2026. Descarga el PDF para ver nombres, direcciones,
              teléfonos y los médicos del resto de municipios.
            </p>
          </div>
          <div className="space-y-3">
            {PROVINCIAS_GO.map((p) => (
              <details
                key={p.slug}
                className="group bg-blanco border border-borde open:border-azul-medio"
                style={{ borderRadius: "12px" }}
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-gris-texto text-base font-bold">
                    Médicos Adeslas GO en {p.nombre}
                    <span className="ml-2 text-xs font-medium text-gris-medio">
                      ({p.especialidades.length} especialidades)
                    </span>
                  </h3>
                  <Chevron />
                </summary>
                <div className="px-5 pb-5 text-sm text-gris-medio leading-relaxed">
                  <p className="mb-3">
                    <strong className="text-gris-texto">Especialidades:</strong> {p.especialidades.join(", ")}.
                  </p>
                  <p className="mb-4">
                    <strong className="text-gris-texto">Pruebas diagnósticas:</strong> {p.pruebas} apartados
                    {p.tratamientos.length > 0 && (
                      <>
                        {" "}· <strong className="text-gris-texto">Tratamientos especiales:</strong>{" "}
                        {p.tratamientos.join(", ")}
                      </>
                    )}
                    .
                  </p>
                  <a
                    href={goPdfUrl(p.slug)}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 font-semibold text-azul-medio hover:underline"
                  >
                    <DownloadIcon /> Cuadro médico Adeslas GO {p.nombre} (PDF)
                  </a>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Ambulatorio + autorizaciones */}
      <section className="section-pad bg-gris-claro">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
            <div>
              <h2 className="text-gris-texto mb-4">Un Cuadro Médico Ambulatorio: Qué Debes Saber</h2>
              <p className="text-gris-medio mb-4">
                Adeslas GO es un seguro ambulatorio: cubre consultas de medicina general,
                pediatría, especialistas y pruebas diagnósticas, pero no la hospitalización
                programada. Por eso su cuadro médico se centra en consultas y centros de
                diagnóstico.
              </p>
              <p className="text-gris-medio mb-4">
                Algunas pruebas y tratamientos requieren autorización previa. Puedes pedirla
                on-line desde el Área Cliente de Adeslas y recibirás la respuesta por e-mail en
                menos de 48 horas laborables.
              </p>
              <p className="text-gris-medio">
                ¿Necesitas también hospitalización y cirugía? Consulta el{" "}
                <a href="/cuadro-medico/" className="text-azul-medio font-semibold hover:underline">
                  cuadro médico completo de Adeslas
                </a>
                .
              </p>
            </div>
            <div className="bg-blanco border border-borde p-6" style={{ borderRadius: "12px" }}>
              <h3 className="text-gris-texto text-base font-bold mb-4">Necesitan autorización previa</h3>
              <ul className="grid gap-3">
                {AUTORIZACION_PREVIA_GO.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm text-gris-texto">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5 text-azul-medio">
                      <path d="M5 10.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Seguro GO */}
      <section className="section-pad bg-blanco">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-gris-texto mb-4">¿Aún no tienes el Seguro Adeslas GO?</h2>
          <p className="text-gris-medio mb-8 max-w-xl mx-auto">
            Adeslas GO es el seguro ambulatorio de Adeslas: acceso a los médicos y
            especialistas del cuadro que acabas de consultar, sin listas de espera. Te
            asesoramos gratis y sin compromiso.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/seguro-salud/adeslas-go/"
              className="inline-block px-8 py-4 text-primary-foreground font-extrabold text-base btn-cta-magenta"
              style={{ backgroundColor: "#E4097D", borderRadius: "7px" }}
            >
              Conocer Adeslas GO →
            </a>
            <a
              href="/precios-y-ofertas/"
              className="inline-block px-8 py-4 font-bold text-base text-azul-medio border border-azul-medio transition-colors hover:bg-azul-medio hover:text-white"
              style={{ borderRadius: "7px" }}
            >
              Ver precios y ofertas
            </a>
          </div>
        </div>
      </section>

      {/* FAQ visible (mismo texto que el FAQPage JSON-LD) */}
      <section className="section-pad bg-gris-claro">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-gris-texto mb-8 text-center">Preguntas Frecuentes sobre el Cuadro Médico Adeslas GO</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group bg-blanco border border-borde" style={{ borderRadius: "12px" }}>
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-gris-texto text-base font-bold">{f.q}</h3>
                  <Chevron />
                </summary>
                <p className="px-5 pb-5 text-sm text-gris-medio leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="text-xs text-gris-medio text-center mt-8">
            Información extraída de los cuadros médicos oficiales Adeslas GO 2026 de SegurCaixa
            Adeslas. El cuadro médico puede actualizarse durante el año; la versión vigente está
            siempre en el Área Cliente y la app de Adeslas.
          </p>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </TarificadorProvider>
  );
};

export default CuadroMedicoGo;
