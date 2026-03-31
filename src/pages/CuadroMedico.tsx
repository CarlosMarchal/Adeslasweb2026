import { useState } from "react";
import { motion } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { TarificadorProvider } from "@/components/TarificadorContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import heroBg from "@/assets/asisa_salud_seguro_medico.webp";

const stats = [
  { value: "+40.000", label: "Profesionales médicos" },
  { value: "+1.000", label: "Centros concertados" },
  { value: "18", label: "Hospitales propios" },
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
  "Soria", "Tarragona", "Tenerife", "Teruel", "Toledo", "Valencia",
  "Valladolid", "Vizcaya", "Zamora", "Zaragoza",
];

const CuadroMedico = () => {
  const [search, setSearch] = useState("");

  useSeo({
    title: "Cuadro Médico Adeslas 2026 | Descarga por provincia",
    description:
      "Descarga el cuadro médico Adeslas 2026 de tu provincia. Más de 40.000 profesionales, 1.000 centros y 1.200+ centros médicos en toda España.",
    canonical: "https://adeslas.marchalaseguradores.es/cuadro-medico",
  });

  const filtered = provincias.filter((p) =>
    p.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TarificadorProvider>
      <Header />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #003087 0%, #009FE3 65%, #009FE3 100%)",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBg})`,
            opacity: 0.12,
            mixBlendMode: "luminosity",
          }}
        />
        <div className="container mx-auto px-4 py-14 lg:py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
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
            <h1 className="text-primary-foreground mb-3 text-3xl md:text-[48px] leading-tight md:leading-[1.15]">
              Cuadro Médico
              <br />
              <span className="text-azul-claro">Adeslas 2026</span>
            </h1>
            <p
              className="text-lg max-w-2xl"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              Accede a la red médica más amplia: más de 40.000 profesionales,
              1.000 centros y 1.200+ centros médicos en toda España. Descarga el
              cuadro médico de tu provincia.
            </p>
          </motion.div>
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
              Descarga el cuadro médico de tu provincia
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filtered.map((p, i) => (
              <motion.a
                key={p}
                href={`/cuadros-medicos/${encodeURIComponent(p)}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.015, 0.3) }}
                className="group bg-blanco border border-borde p-4 flex items-center gap-3 transition-all hover:-translate-y-0.5 hover:border-azul-medio"
                style={{ borderRadius: "12px" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-azul-medio"
                  style={{ backgroundColor: "#E8F4FC" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-colors"
                  >
                    <path
                      d="M8 1v10M4 7l4 4 4-4M2 13h12"
                      stroke="#009FE3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:stroke-white"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gris-texto group-hover:text-azul-medio transition-colors">
                  {p}
                </span>
              </motion.a>
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
              Busca médicos y centros online
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
              Especialidades médicas disponibles
            </h2>
            <p className="text-gris-medio">
              Accede directamente a cualquiera de las especialidades incluidas en
              tu seguro.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {specialties.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="bg-gris-claro border border-borde p-4 text-center text-sm font-medium text-gris-texto"
                style={{ borderRadius: "12px" }}
              >
                {s}
              </motion.div>
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
