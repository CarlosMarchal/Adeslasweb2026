/**
 * crawl-prod.mjs — Cotejo del lockfile contra PRODUCCIÓN en vivo (P0-1).
 *
 * Captura el estado real (status + Location) de cada URL en
 * https://adeslas.numero1salud.es y lo concilia con tests/routes.lockfile.json.
 * Sirve para (a) fijar la línea base real antes de migrar y (b) confirmar tras
 * cada deploy que ninguna URL publicada ha cambiado.
 *
 * Requiere salida a internet. Si el entorno no la tiene, ejecútalo en local:
 *   npm run crawl:prod
 *
 * Exit 1 solo si detecta degradación crítica (404/500). Las discrepancias de
 * redirección se reportan para revisión humana (la dirección exacta de cada 301
 * la dicta GSC + el canonical, no una suposición — ver PLAN §5.1).
 *
 * Autor: Juan Carlos Díaz — Convertiam.
 */
import { checkAll, printReport } from "./_routes-lib.mjs";

const BASE = (process.env.PROD_URL || "https://adeslas.numero1salud.es").replace(/\/$/, "");

console.log(`Crawleando producción: ${BASE} …`);
const report = await checkAll(BASE, { concurrency: 8 });
printReport(report, BASE);

if (report.criticals.length) {
  console.error("\n🔴 Hay URLs publicadas degradadas a 404/500 en producción.");
  process.exit(1);
}
if (report.mismatches.length) {
  console.log("\nℹ Revisa las discrepancias y, si reflejan el estado correcto, actualiza el lockfile.");
}
