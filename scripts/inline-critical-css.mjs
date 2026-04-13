/**
 * inline-critical-css.mjs
 *
 * Post-build: itera todos los .html del dist/, aplica critters para:
 *   1. Extraer el CSS crítico (above-the-fold) e inlinarlo en <style>
 *   2. Convertir el bundle CSS completo a carga async no-bloqueante:
 *      <link rel="preload" as="style" onload="this.rel='stylesheet';this.onload=null">
 *
 * NOTA: critters 0.0.24 con preload:'swap' produce rel="stylesheet" onload="this.rel='stylesheet'"
 * (no-op). Por eso usamos preload:'none' para que critters solo inlinee el CSS crítico,
 * y luego aplicamos nosotros la transformación a rel="preload" manualmente.
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

// Critters: solo inlinea CSS crítico (preload:'none' = no toca el link original).
// Nosotros convertimos el link a preload en el paso siguiente.
const critters = new Critters({
  path: distDir,
  publicPath: "/",
  preload: "none",            // No modificar el <link> — lo haremos manualmente
  pruneSource: false,         // Mantiene el CSS completo (sin FOUC si JS falla)
  mergeStylesheets: true,
  inlineFonts: false,
  preloadFonts: false,
  logLevel: "warn",
});

// Convierte <link rel="stylesheet" href="..."> a carga async con el truco media=print.
// Es el método más compatible: funciona en todos los navegadores sin JS (media=print
// fuerza la descarga sin bloquear render; onload cambia a media=all para aplicarlo).
function makeAsyncCss(html) {
  return html.replace(
    /<link\s+rel="stylesheet"\s+crossorigin="?[^"]*"?\s+href="(\/assets\/[^"]+\.css)">/g,
    (_, href) =>
      `<link rel="preload" as="style" crossorigin href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
      `<noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`
  );
}

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
    // Paso 1: critters inlinea el CSS crítico
    const withCritical = await critters.process(html);
    // Paso 2: convertimos el link completo a async (rel="preload" as="style")
    const withAsyncCss = makeAsyncCss(withCritical);
    writeFileSync(file, withAsyncCss, "utf8");
    ok++;
  } catch (err) {
    console.warn(`  ⚠ ${path.relative(distDir, file)}: ${err.message}`);
    errors++;
  }
}

console.log(`✅ Procesadas ${ok} páginas${errors > 0 ? ` (${errors} con errores, sin cambios)` : ""}.`);
