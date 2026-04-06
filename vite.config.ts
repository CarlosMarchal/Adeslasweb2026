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
          // Heavy animation library — largest single vendor
          if (id.includes("framer-motion")) return "vendor-motion";
          // React core — changes rarely, maximise cache hits
          if (id.includes("react-dom") || id.includes("/react/") || id.includes("scheduler")) return "vendor-react";
          // Routing
          if (id.includes("react-router")) return "vendor-router";
          // Server-state / data fetching
          if (id.includes("@tanstack")) return "vendor-query";
          // Icon pack — tree-shaken but still sizeable
          if (id.includes("lucide-react")) return "vendor-icons";
          // All Radix UI primitives bundled together
          if (id.includes("@radix-ui")) return "vendor-radix";
          // Everything else (date-fns, zod, embla, etc.)
          return "vendor-misc";
        },
      },
    },
  },
}));
