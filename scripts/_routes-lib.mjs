/**
 * _routes-lib.mjs — Lógica compartida de verificación de URLs (P0-1).
 * La usan check-routes.mjs (build local) y crawl-prod.mjs (producción).
 *
 * Autor: Juan Carlos Díaz — Convertiam.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

export function loadLockfile() {
  return JSON.parse(
    readFileSync(join(process.cwd(), "tests", "routes.lockfile.json"), "utf8")
  );
}

const stripTrailing = (p) => (p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p);
const pathOnly = (loc) => {
  if (!loc) return "";
  try {
    return new URL(loc, "http://x").pathname;
  } catch {
    return loc;
  }
};

const expectsRedirect = (e) => Array.isArray(e.expect);

const UA = { "user-agent": "adeslas-routes-guard" };

/** Sigue manualmente la cadena de redirecciones, hop a hop. */
async function follow(startUrl, maxHops = 6) {
  let url = startUrl;
  const hops = [];
  for (let n = 0; n < maxHops; n++) {
    const res = await fetch(url, { redirect: "manual", headers: UA });
    const location = res.headers.get("location");
    hops.push({ status: res.status, location });
    if (res.status >= 300 && res.status < 400 && location) {
      url = new URL(location, url).href;
      continue;
    }
    return { finalStatus: res.status, finalUrl: url, hops };
  }
  return { finalStatus: "TOO_MANY_REDIRECTS", finalUrl: url, hops };
}

/** Verifica una entrada del lockfile contra `base`. Devuelve un resultado. */
async function checkOne(base, entry) {
  const target = base + entry.url;
  let chain;
  try {
    chain = await follow(target);
  } catch (err) {
    return { entry, ok: false, severity: "error", got: `FETCH_FAIL ${err.code || err.message}` };
  }
  const { finalStatus, finalUrl, hops } = chain;
  const firstStatus = hops[0].status;

  // Regla dura P0-1: ninguna URL puede degradar a 404/500 (en ningún salto ni al final).
  if (hops.some((h) => h.status === 404 || h.status >= 500)) {
    return { entry, ok: false, severity: "critical", got: `${firstStatus} → ${finalStatus}` };
  }

  if (expectsRedirect(entry)) {
    const firstOk = entry.expect.includes(firstStatus); // primer salto 301/308
    const finalPath = stripTrailing(pathOnly(finalUrl));
    const want = stripTrailing(entry.redirectsTo || "");
    const destOk = !want || finalPath === want || finalPath.startsWith(want + "/") || finalPath.startsWith(want);
    if (firstOk && destOk && finalStatus === 200) return { entry, ok: true, got: `${firstStatus} → ${finalPath}` };
    return {
      entry, ok: false, severity: "mismatch",
      got: `${firstStatus} → ${finalPath} (${finalStatus})`,
      want: `${entry.expect.join("/")} → ${want || "(destino)"}`,
    };
  }

  // expect === 200 — no debe redirigir.
  if (firstStatus === 200) return { entry, ok: true, got: 200 };
  return { entry, ok: false, severity: "mismatch", got: `${firstStatus} → ${stripTrailing(pathOnly(finalUrl))}`, want: 200 };
}

/**
 * Verifica todas las entradas con concurrencia limitada.
 * @returns { results, criticals, mismatches }
 */
export async function checkAll(base, { concurrency = 12 } = {}) {
  const lock = loadLockfile();
  const results = [];
  let i = 0;
  async function worker() {
    while (i < lock.length) {
      const entry = lock[i++];
      results.push(await checkOne(base, entry));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));

  const criticals = results.filter((r) => r.severity === "critical" || r.severity === "error");
  const mismatches = results.filter((r) => r.severity === "mismatch");
  return { results, criticals, mismatches, total: lock.length };
}

export function printReport({ results, criticals, mismatches, total }, base) {
  const ok = results.filter((r) => r.ok).length;
  console.log(`\nRutas verificadas contra ${base}: ${ok}/${total} OK`);
  if (criticals.length) {
    console.log(`\n🔴 CRÍTICO — URLs degradadas a 404/500 o sin respuesta (${criticals.length}):`);
    for (const r of criticals) console.log(`   ${r.entry.url}  →  ${r.got}`);
  }
  if (mismatches.length) {
    console.log(`\n🟡 Discrepancias de estado/redirección (${mismatches.length}):`);
    for (const r of mismatches) console.log(`   ${r.entry.url}  esperado ${r.want}  obtuvo ${r.got}`);
  }
  if (!criticals.length && !mismatches.length) console.log("✅ Todas las URLs coinciden con el lockfile.");
}
