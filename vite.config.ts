import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
    // Split vendor libraries into separate cached chunks
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          // React core + todas las librerías que llaman a React.createContext en la inicialización
          // Deben estar en el mismo chunk para evitar el error "createContext is undefined"
          if (
            id.includes("react-dom") || id.includes("/react/") || id.includes("scheduler") ||
            id.includes("framer-motion") || id.includes("react-router") ||
            id.includes("sonner") || id.includes("vaul") || id.includes("cmdk") ||
            id.includes("embla") || id.includes("recharts") || id.includes("next-themes") ||
            id.includes("react-hook-form") || id.includes("react-day-picker") ||
            id.includes("react-international-phone") || id.includes("react-resizable") ||
            id.includes("input-otp")
          ) return "vendor-react";
          // Server-state / data fetching
          if (id.includes("@tanstack")) return "vendor-query";
          // Icon pack — tree-shaken but still sizeable
          if (id.includes("lucide-react")) return "vendor-icons";
          // All Radix UI primitives bundled together
          if (id.includes("@radix-ui")) return "vendor-radix";
          // Pure utilities without React dependency (date-fns, zod, clsx, etc.)
          return "vendor-misc";
        },
      },
    },
  },
}));
