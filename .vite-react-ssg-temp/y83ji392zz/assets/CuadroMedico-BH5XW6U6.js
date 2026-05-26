import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { b as useSeo, c as TarificadorProvider, H as Header, C as CtaSection, F as Footer } from '../main.mjs';
import 'vite-react-ssg/single-page';
import '@tanstack/react-query';
import 'react-router-dom';
import 'next-themes';
import 'sonner';
import '@radix-ui/react-toast';
import 'class-variance-authority';
import 'lucide-react';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-tooltip';
import 'react-helmet-async';
import 'react-dom';

const HERO_BG = "/images/adeslas-cuadro-medico.webp";
const stats = [
  { value: "+51.000", label: "Profesionales médicos" },
  { value: "+1.200", label: "Centros concertados" },
  { value: "52", label: "Provincias con cobertura" }
];
const specialties = [
  "Alergología",
  "Anestesiología",
  "Cardiología",
  "Cirugía general",
  "Dermatología",
  "Endocrinología",
  "Gastroenterología",
  "Ginecología",
  "Hematología",
  "Medicina interna",
  "Nefrología",
  "Neumología",
  "Neurología",
  "Oftalmología",
  "Oncología",
  "Otorrinolaringología",
  "Pediatría",
  "Psiquiatría",
  "Radiología",
  "Rehabilitación",
  "Reumatología",
  "Traumatología",
  "Urología",
  "Medicina preventiva"
];
const provincias = [
  "Álava",
  "Albacete",
  "Alicante",
  "Almería",
  "Asturias",
  "Ávila",
  "Badajoz",
  "Barcelona",
  "Burgos",
  "Cáceres",
  "Cádiz",
  "Cantabria",
  "Castellón",
  "Ceuta",
  "Ciudad Real",
  "Córdoba",
  "Cuenca",
  "Gerona",
  "Granada",
  "Guadalajara",
  "Guipúzcoa",
  "Huelva",
  "Huesca",
  "Islas Baleares",
  "Jaén",
  "La Coruña",
  "La Rioja",
  "Las Palmas",
  "León",
  "Lérida",
  "Lugo",
  "Madrid",
  "Málaga",
  "Melilla",
  "Murcia",
  "Navarra",
  "Orense",
  "Palencia",
  "Pontevedra",
  "Salamanca",
  "Segovia",
  "Sevilla",
  "Soria",
  "Tarragona",
  "Tenerife",
  "Teruel",
  "Toledo",
  "Valencia",
  "Valladolid",
  "Vizcaya",
  "Zamora",
  "Zaragoza"
];
const CuadroMedico = () => {
  const [search, setSearch] = useState("");
  const _seo = useSeo({
    title: "Cuadro Médico Adeslas 2026 | +51.000 Médicos y 1.400 Centros en España",
    description: "Consulta y descarga el cuadro médico Adeslas 2026 por provincia. Más de 51.000 profesionales y 1.400 centros médicos en toda España. Sin listas de espera.",
    canonical: "https://adeslas.numero1salud.es/cuadro-medico/",
    ogImage: "https://adeslas.numero1salud.es/og-cuadro-medico.jpg",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
      { name: "Cuadro Médico", url: "https://adeslas.numero1salud.es/cuadro-medico/" }
    ],
    preloadImage: HERO_BG,
    faqSchema: [
      {
        q: "¿Cuántos médicos tiene Adeslas en su cuadro médico?",
        a: "El cuadro médico de Adeslas 2026 cuenta con más de 51.000 profesionales médicos y más de 1.400 centros concertados en toda España, distribuidos en 52 provincias."
      },
      {
        q: "¿Cómo puedo consultar el cuadro médico Adeslas por provincia?",
        a: "Puedes consultar el cuadro médico Adeslas por provincia directamente en esta página. Selecciona tu provincia para acceder al listado actualizado de médicos y centros disponibles para tu seguro."
      },
      {
        q: "¿Qué especialidades médicas incluye el cuadro Adeslas?",
        a: "El cuadro médico Adeslas incluye más de 40 especialidades médicas: medicina general, cardiología, dermatología, ginecología, pediatría, traumatología, oncología, neurología, psiquiatría, rehabilitación, oftalmología, otorrinolaringología y muchas más."
      },
      {
        q: "¿El cuadro médico Adeslas incluye hospitales?",
        a: "Sí. Adeslas dispone de más de 1.200 centros concertados en España, incluyendo clínicas, centros de diagnóstico y hospitales de referencia en todas las provincias."
      }
    ]
  });
  const filtered = provincias.filter(
    (p) => p.toLowerCase().includes(search.toLowerCase())
  );
  return /* @__PURE__ */ jsxs(TarificadorProvider, { children: [
    _seo,
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative overflow-hidden flex items-center",
        style: {
          background: "linear-gradient(135deg, #003087 0%, #009FE3 65%, #009FE3 100%)",
          minHeight: "460px"
        },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center",
              style: {
                backgroundImage: `url(${HERO_BG})`,
                opacity: 0.12,
                mixBlendMode: "luminosity"
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-10 lg:py-12 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm text-primary-foreground",
                style: {
                  background: "rgba(255,255,255,0.11)",
                  border: "1px solid rgba(255,255,255,0.22)"
                },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-azul-claro" }),
                  "Red médica nacional"
                ]
              }
            ),
            /* @__PURE__ */ jsxs("h1", { className: "text-primary-foreground mb-3 text-[26px] md:text-[36px] leading-tight md:leading-[1.15]", children: [
              "Cuadro Médico",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-azul-claro", children: "Adeslas 2026" })
            ] }),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "text-lg max-w-2xl",
                style: { color: "rgba(255,255,255,0.82)" },
                children: "Accede a la red médica más amplia: más de 51.000 médicos, 1.400 centros y 1.200+ centros médicos en toda España. Descarga el cuadro médico de tu provincia."
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "py-12", style: { backgroundColor: "#003087" }, children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center", children: stats.map((s, i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.1 },
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-primary-foreground text-3xl md:text-4xl font-black", children: s.value }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "text-sm mt-1",
              style: { color: "rgba(255,255,255,0.7)" },
              children: s.label
            }
          )
        ]
      },
      i
    )) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-pad bg-blanco", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-4xl", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-8",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-gris-texto mb-3", children: "Descarga el Cuadro Médico Adeslas 2026 por Provincia" }),
            /* @__PURE__ */ jsx("p", { className: "text-gris-medio max-w-xl mx-auto mb-6", children: "Selecciona tu provincia para descargar el cuadro médico Adeslas 2026 en formato PDF con todos los profesionales, centros y hospitales disponibles." }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Buscar provincia...",
                className: "w-full max-w-md mx-auto border border-borde px-4 py-3 text-sm text-gris-texto focus:outline-none focus:border-azul-medio",
                style: { borderRadius: "10px" }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", children: filtered.map((p, i) => /* @__PURE__ */ jsxs(
        motion.a,
        {
          href: `/cuadros-medicos/Adeslas%20Cuadro%20Medico%20${encodeURIComponent(p)}%202026.pdf`,
          target: "_blank",
          rel: "noopener noreferrer",
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: Math.min(i * 0.015, 0.3) },
          className: "group bg-blanco border border-borde p-4 flex items-center gap-3 transition-all hover:-translate-y-0.5 hover:border-azul-medio",
          style: { borderRadius: "12px" },
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-azul-medio",
                style: { backgroundColor: "#E8F4FC" },
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 16 16",
                    fill: "none",
                    className: "transition-colors",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M8 1v10M4 7l4 4 4-4M2 13h12",
                        stroke: "#009FE3",
                        strokeWidth: "1.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        className: "group-hover:stroke-white"
                      }
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gris-texto group-hover:text-azul-medio transition-colors", children: p })
          ]
        },
        p
      )) }),
      filtered.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-gris-medio text-sm mt-8", children: "No se encontraron provincias con ese nombre." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "section-pad bg-gris-claro", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-3xl text-center", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-gris-texto mb-4", children: "Busca Médicos y Centros Adeslas Online por Especialidad" }),
          /* @__PURE__ */ jsx("p", { className: "text-gris-medio mb-8 max-w-xl mx-auto", children: "También puedes buscar médicos, centros y hospitales por especialidad y ubicación en el buscador oficial de Adeslas." }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://www.segurcaixaadeslas.es/es/cuadro-medico",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-block px-8 py-4 rounded-lg text-primary-foreground font-bold text-base btn-cta-magenta",
              style: { backgroundColor: "#E4097D", borderRadius: "7px" },
              children: "Buscador online de Adeslas →"
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-pad bg-blanco", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-4xl", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-10",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-gris-texto mb-3", children: "Especialidades Médicas Cubiertas por Adeslas" }),
            /* @__PURE__ */ jsx("p", { className: "text-gris-medio", children: "Más de 40 especialidades médicas incluidas en tu seguro Adeslas. Acceso directo sin derivaciones ni listas de espera." })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", children: specialties.map((s, i) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.02 },
          className: "bg-gris-claro border border-borde p-4 text-center text-sm font-medium text-gris-texto",
          style: { borderRadius: "12px" },
          children: s
        },
        s
      )) })
    ] }) }),
    /* @__PURE__ */ jsx(CtaSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};

export { CuadroMedico as default };
