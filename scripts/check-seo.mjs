/**
 * check-seo.mjs — Guardarraíl SEO/GEO (snapshots del HTML de salida).
 *
 * Verifica el HTML INICIAL (server-rendered) de cada URL indexable contra un
 * servidor levantado (BASE_URL, por defecto http://localhost:3000). Dos modos:
 *
 *   • baseline (ruta NO migrada): exige title, meta description, canonical y
 *     ≥1 bloque JSON-LD válido. No falla por el parche actual (h1 sr-only,
 *     cuerpo client-side) — es el estado heredado que la migración debe mejorar.
 *   • enforce (ruta en tests/migrated-routes.json): además exige un <h1> REAL
 *     visible (no sr-only) y contenido real en el HTML (sin
 *     BAILOUT_TO_CLIENT_SIDE_RENDERING ni <body> vacío).
 *
 * Flags:
 *   --write-baseline   Captura tests/seo-baseline.json (referencia para detectar
 *                      regresiones tras migrar). No verifica.
 *
 * Autor: Juan Carlos Díaz — Convertiam.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import * as cheerio from "cheerio";

const ROOT = process.cwd();
const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const WRITE_BASELINE = process.argv.includes("--write-baseline");

const lockfile = JSON.parse(readFileSync(join(ROOT, "tests", "routes.lockfile.json"), "utf8"));
const migrated = new Set(
  JSON.parse(readFileSync(join(ROOT, "tests", "migrated-routes.json"), "utf8")).migrated || []
);
const indexable = lockfile.filter((e) => e.expect === 200 && e.indexable);

const SR_ONLY = /position:\s*absolute/i; // heurística de h1 oculto (sr-only inline)

function analyze(html) {
  const $ = cheerio.load(html);
  const title = ($("title").first().text() || "").trim();
  const description = ($('meta[name="description"]').attr("content") || "").trim();
  const canonical = ($('link[rel="canonical"]').attr("href") || "").trim();
  const jsonLd = $('script[type="application/ld+json"]')
    .toArray()
    .map((el) => {
      try { JSON.parse($(el).text()); return true; } catch { return false; }
    })
    .filter(Boolean).length;

  const h1s = $("h1").toArray();
  const visibleH1 = h1s.some((el) => {
    const style = ($(el).attr("style") || "");
    const cls = ($(el).attr("class") || "");
    const hidden = SR_ONLY.test(style) || /\bsr-only\b/.test(cls);
    return !hidden && ($(el).text() || "").trim().length > 0;
  });
  const bailout = /BAILOUT_TO_CLIENT_SIDE_RENDERING/.test(html);
  const bodyText = ($("body").text() || "").replace(/\s+/g, " ").trim();

  return { title, description, canonical, jsonLd, h1Count: h1s.length, visibleH1, bailout, bodyLen: bodyText.length };
}

async function getHtml(url) {
  const res = await fetch(BASE + url, { redirect: "follow", headers: { "user-agent": "adeslas-seo-guard" } });
  return { status: res.status, html: await res.text() };
}

const failures = [];
const baseline = {};

for (const entry of indexable) {
  let r;
  try { r = await getHtml(entry.url); }
  catch (err) { failures.push(`${entry.url} — fetch falló (${err.code || err.message})`); continue; }
  if (r.status !== 200) { failures.push(`${entry.url} — status ${r.status} (esperado 200)`); continue; }

  const a = analyze(r.html);
  baseline[entry.url] = { title: a.title, canonical: a.canonical, jsonLd: a.jsonLd, h1Count: a.h1Count };

  if (WRITE_BASELINE) continue;

  // Presencia base (todas las indexables)
  if (!a.title) failures.push(`${entry.url} — falta <title>`);
  if (!a.description) failures.push(`${entry.url} — falta meta description`);
  if (!a.canonical) failures.push(`${entry.url} — falta link canonical`);
  if (a.jsonLd < 1) failures.push(`${entry.url} — sin JSON-LD válido`);

  // Enforce (solo rutas migradas)
  if (migrated.has(entry.url)) {
    if (!a.visibleH1) failures.push(`${entry.url} — [migrada] sin <h1> visible (sigue sr-only)`);
    if (a.bailout) failures.push(`${entry.url} — [migrada] HTML con BAILOUT_TO_CLIENT_SIDE_RENDERING`);
    if (a.bodyLen < 500) failures.push(`${entry.url} — [migrada] cuerpo casi vacío (${a.bodyLen} chars)`);
  }
}

if (WRITE_BASELINE) {
  writeFileSync(join(ROOT, "tests", "seo-baseline.json"), JSON.stringify(baseline, null, 2) + "\n");
  console.log(`✔ Línea base SEO escrita: tests/seo-baseline.json (${Object.keys(baseline).length} URLs)`);
  process.exit(0);
}

console.log(`SEO verificado contra ${BASE}: ${indexable.length} URLs indexables · ${migrated.size} en modo enforce`);
if (failures.length) {
  console.error(`\n❌ ${failures.length} problemas SEO:`);
  for (const f of failures) console.error(`   ${f}`);
  process.exit(1);
}
console.log("✅ Snapshots SEO en verde.");
