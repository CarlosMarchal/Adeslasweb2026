import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Blog slugs — keep in sync with src/data/blogPosts.ts
const blogSlugs = [
  "como-mejorar-tu-energia-diaria",
  "dieta-mediterranea-en-casa",
  "revisiones-medicas-por-edad",
  "salud-bucodental-guia-completa",
  "gestion-emocional-dia-a-dia",
  "salud-familiar-estilo-de-vida",
  "caminar-beneficios-reales",
  "superalimentos-que-incorporar",
  "higiene-sueno-adultos",
  "comparativa-seguros-medicos-adeslas-2026",
];

// Static routes to pre-render (match App.tsx Routes exactly)
const staticRoutes = [
  "/",
  /* Planes Adeslas */
  "/seguro-salud/adeslas-go/",
  "/seguro-salud/adeslas-plena-vital/",
  "/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/",
  "/seguro-salud/adeslas-plena-total/",
  "/seguro-salud/adeslas-extra-150/",
  "/seguro-salud/adeslas-plena-plus/",
  "/seguro-salud/adeslas-seniors/",
  "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/",
  /* Autónomos, Pymes & Empresas */
  "/seguro-salud/autonomos/",
  "/seguro-salud/pymes/",
  "/seguro-salud/empresas/",
  /* Extranjeros */
  "/seguro-salud/adeslas-extranjeros/",
  /* Otros seguros */
  "/seguro-dental/",
  "/seguro-decesos/",
  "/seguro-mascotas/",
  "/adeslas-asistencia-en-viaje/",
  "/seguro-accidentes/",
  /* Segmentos */
  "/seguro-salud/adeslas-individual/",
  "/seguro-salud/seguro-familia/",
  "/seguro-salud/adeslas-infantil/",
  "/seguro-salud/adeslas-ginecologia/",
  "/seguro-salud/embarazo/",
  "/seguro-salud/seguro-para-personas-mayores/",
  /* Institucionales */
  "/cuadro-medico/",
  "/contacto/",
  "/adeslas-blog/",
  "/politica-de-privacidad",
  "/seguro-salud/ofertas-adeslas-precios/",
  "/precios-y-ofertas/",
  /* Colectivos */
  "/adeslas-body-factory/",
  "/adeslas-adif-renfe/",
  /* Decesos Prima Única */
  "/seguro-adeslas-decesos-prima-unica/",
  /* Formulario de Alta */
  "/seguro-salud/adeslas-formulario-de-alta/",
  /* Landing campaña (noindex pero pre-renderizable) */
  "/adeslasplenavitaloferta/",
  /* Herramientas internas (noindex) */
  "/tarificador-interno/",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  cacheDir: "/tmp/vite-cache",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    emptyOutDir: false,
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          if (
            id.includes("react-dom") || id.includes("/react/") || id.includes("scheduler") ||
            id.includes("framer-motion") || id.includes("react-router") ||
            id.includes("sonner") || id.includes("vaul") || id.includes("cmdk") ||
            id.includes("embla") || id.includes("recharts") || id.includes("next-themes") ||
            id.includes("react-hook-form") || id.includes("react-day-picker") ||
            id.includes("react-international-phone") || id.includes("react-resizable") ||
            id.includes("input-otp") || id.includes("react-helmet-async") ||
            id.includes("vite-react-ssg")
          ) return "vendor-react";
          if (id.includes("@tanstack")) return "vendor-query";
          if (id.includes("lucide-react")) return "vendor-icons";
          if (id.includes("@radix-ui")) return "vendor-radix";
          return "vendor-misc";
        },
      },
    },
  },
  ssgOptions: {
    script: "async",
    formatting: "minify",
    crittersOptions: false,
    // concurrency: 1 prevents race conditions when sharing ssrRoutePath between
    // parallel renders (the module variable is set before each render in main.tsx).
    concurrency: 1,
    includedRoutes: () => [
      ...staticRoutes,
      ...blogSlugs.map((slug) => `/blog/${slug}`),
    ],
  },
}));
