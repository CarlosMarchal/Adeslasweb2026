/**
 * build-lockfile.mjs — Genera tests/routes.lockfile.json (verdad de URLs, P0-1).
 *
 * Combina tres fuentes de verdad del repositorio:
 *   1. PAGE_META (src/data/pageMeta.ts): páginas servidas 200 + sus canónicas + alias.
 *   2. blogPosts (src/data/blogPosts.ts): /blog/<slug>/ → 200.
 *   3. next.config.js redirects(): redirecciones WordPress/legacy → 301/308.
 * Más la lista contractual de URLs publicadas (no pueden variar).
 *
 * NOTA: los estados son un CANDIDATO. La verdad final de cada estado (200 vs
 * 308 vs 301) la confirma `npm run crawl:prod` contra producción y `npm run
 * test:routes` contra el build local. Ninguna URL puede degradar a 404/500.
 *
 * Autor: Juan Carlos Díaz — Convertiam.
 */
import esbuild from "esbuild";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const ROOT = process.cwd();
const require = createRequire(import.meta.url);

// URLs publicadas que NO pueden variar (contrato P0-1). Estado esperado: 200.
const CONTRACT_URLS = [
  "/", "/sitemap.xml",
  "/seguro-salud/seguro-para-personas-mayores/", "/seguro-salud/pymes/",
  "/seguro-salud/seguro-familia/", "/seguro-salud/embarazo/", "/seguro-salud/autonomos/",
  "/seguro-salud/adeslas-seniors/", "/seguro-salud/adeslas-plena-total/",
  "/seguro-salud/adeslas-plena-plus/",
  "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/",
  "/seguro-salud/adeslas-plena-vital/",
  "/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/",
  "/seguro-salud/adeslas-individual/", "/seguro-salud/adeslas-go/",
  "/seguro-salud/adeslas-infantil/", "/seguro-salud/adeslas-extra-150/",
  "/seguro-salud/adeslas-ginecologia/", "/seguro-mascotas/", "/seguro-dental/",
  "/seguro-decesos/", "/seguro-accidentes/", "/cuadro-medico/", "/precios-y-ofertas/",
  "/contacto/", "/seguro-decesos-prima-unica/", "/precios-adeslas/",
  "/como-contratar-adeslas/", "/adeslas-blog/", "/alta-adeslas/",
  "/adeslas-asistencia-en-viaje/", "/adeslas-body-factory/", "/adeslas-extranjeros/",
  "/adeslas-adif-renfe/",
];

async function loadTs(relPath, appendExports = "") {
  const src = readFileSync(join(ROOT, relPath), "utf8") + appendExports;
  const out = await esbuild.transform(src, { loader: "ts", format: "esm" });
  const tmp = join(mkdtempSync(join(tmpdir(), "lock-")), "mod.mjs");
  writeFileSync(tmp, out.code);
  return import(pathToFileURL(tmp).href);
}

const REDIRECT = [301, 308]; // Next sirve permanent:true como 308; prod/Cloudflare puede dar 301.

const withSlash = (p) => {
  if (!p || p === "/") return "/";
  if (/\.[a-z0-9]+$/i.test(p)) return p; // ficheros (.xml, .pdf) no llevan barra
  return p.endsWith("/") ? p : p + "/";
};
const pathOf = (urlOrPath) => urlOrPath.replace(/^https?:\/\/[^/]+/, "") || "/";

const entries = new Map(); // url -> entry (dedup por url)
const add = (url, entry) => { if (!entries.has(url)) entries.set(url, { url, ...entry }); };

// ── 1. PAGE_META ────────────────────────────────────────────────────────────
const pageMod = await loadTs(
  "src/data/pageMeta.ts",
  "\nexport { CANONICAL_ALIASES, SEGURO_SALUD_ALIASES };"
);
const { PAGE_META, CANONICAL_ALIASES, SEGURO_SALUD_ALIASES } = pageMod;

for (const [key, meta] of Object.entries(PAGE_META)) {
  const canonical = withSlash(pathOf(meta.canonical));
  add(canonical, { expect: 200, indexable: !meta.noindex });
  // La clave (forma corta) también se sirve 200 si difiere de la canónica.
  const keyPath = withSlash(key);
  if (keyPath !== canonical) add(keyPath, { expect: 200, canonical });
  // Variante sin barra final → 308 a la forma con barra (trailingSlash:true).
  if (keyPath !== "/" && !/\.[a-z0-9]+$/i.test(keyPath)) {
    const noSlash = keyPath.replace(/\/$/, "");
    if (noSlash !== keyPath) add(noSlash, { expect: REDIRECT, redirectsTo: keyPath });
  }
}

// Alias inversos declarados en pageMeta (se sirven 200 con canonical en el <head>).
for (const alias of [...Object.keys(CANONICAL_ALIASES), ...Object.keys(SEGURO_SALUD_ALIASES)]) {
  add(withSlash(alias), { expect: 200 });
}

// ── 2. Blog posts ─────────────────────────────────────────────────────────────
const blogMod = await loadTs("src/data/blogPosts.ts");
for (const post of blogMod.blogPosts) {
  add(`/blog/${post.slug}/`, { expect: 200, indexable: true });
}

// ── 3. Redirects de next.config.js ───────────────────────────────────────────
const nextConfig = require(join(ROOT, "next.config.js"));
const redirects = await nextConfig.redirects();

// Convierte un patrón de Next (con :param / wildcard) en una URL representativa.
const sampleUrl = (source) =>
  source
    .replace(/:[A-Za-z]+[*+]/g, "muestra/fichero") // :path* / :slug+ → varios segmentos
    .replace(/:[A-Za-z]+/g, "muestra"); // :param → un segmento

for (const r of redirects) {
  // Las redirecciones condicionadas por query (?s=, ?q={search_term_string}) son
  // defensivas para URLs-plantilla que Google indexó; no son URLs publicadas y
  // pueden re-encadenarse al preservarse el query. Se documentan aparte, no se
  // añaden al lockfile fetcheable.
  if ((r.has || []).some((h) => h.type === "query")) continue;
  add(sampleUrl(r.source), { expect: REDIRECT, redirectsTo: withSlash(r.destination), wordpress: true });
}

// ── 4. URLs contractuales (garantía 200) ─────────────────────────────────────
for (const u of CONTRACT_URLS) add(withSlash(u), { expect: 200, contract: true });

// ── Salida ────────────────────────────────────────────────────────────────────
const lockfile = [...entries.values()].sort((a, b) => a.url.localeCompare(b.url));
const outPath = join(ROOT, "tests", "routes.lockfile.json");
writeFileSync(outPath, JSON.stringify(lockfile, null, 2) + "\n");

const n200 = lockfile.filter((e) => e.expect === 200).length;
const nRedir = lockfile.length - n200;
console.log(`✔ ${outPath}`);
console.log(`  ${lockfile.length} entradas — ${n200} esperan 200, ${nRedir} esperan redirección.`);
console.log(`  Confirma estados reales con: npm run crawl:prod  y  npm run test:routes`);
