/**
 * inline-critical-css.mjs
 *
 * Post-build: itera todos los .html del dist/, aplica critters para:
 *   1. Extraer el CSS crítico (above-the-fold) e inlinarlo en <style>
 *   2. Cargar el bundle CSS completo de forma async (no render-blocking)
 *      mediante <link rel="preload" as="style" onload="this.rel='stylesheet'">
 *
 * Esto elimina el "Solicitudes que bloquean el renderizado" de PageSpeed.
 *
 * Ejecutar después de `vite-react-ssg build`:
 *   node scripts/inline-critical-css.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { glob } from "glob";
import Critters from "critters";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "../dist");

// Critters: extrae CSS crítico e inlinea; carga el resto async con preload+swap
const critters = new Critters({
  path: distDir,
  publicPath: "/",
  preload: "swap",          // <link rel="preload" onload="this.rel='stylesheet'">
  pruneSource: false,       // Mantiene el CSS completo (sin riesgo de FOUC en JS-off)
  mergeStylesheets: true,   // Un solo <style> inline con todo el CSS crítico
  inlineFonts: false,       // Las fuentes ya tienen preload en index.html
  preloadFonts: false,
  logLevel: "warn",
});

// Encuentra todos los HTML generados por SSG
const htmlFiles = await glob("**/*.html", {
  cwd: distDir,
  absolute: true,
});

console.log(`⚡ Inlineando CSS crítico en ${htmlFiles.length} páginas...`);

let ok = 0;
let errors = 0;

for (const file of htmlFiles) {
  try {
    const html = readFileSync(file, "utf8");
    const processed = await critters.process(html);
    writeFileSync(file, processed, "utf8");
    ok++;
  } catch (err) {
    console.warn(`  ⚠ ${path.relative(distDir, file)}: ${err.message}`);
    errors++;
  }
}

console.log(`✅ Procesadas ${ok} páginas${errors > 0 ? ` (${errors} con errores, sin cambios)` : ""}.`);
