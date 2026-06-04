/**
 * check-routes.mjs — Guardarraíl P0-1 contra el build LOCAL.
 *
 * Verifica cada URL del lockfile contra un servidor `next start` ya levantado
 * (por defecto http://localhost:3000; configurable con BASE_URL).
 * Falla (exit 1) ante cualquier URL degradada a 404/500 o cualquier discrepancia
 * de estado/redirección respecto al lockfile.
 *
 * Uso en CI:  next build && (next start &) && wait-on tcp:3000 && npm run test:routes
 *
 * Autor: Juan Carlos Díaz — Convertiam.
 */
import { checkAll, printReport } from "./_routes-lib.mjs";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

const report = await checkAll(BASE);
printReport(report, BASE);

if (report.criticals.length || report.mismatches.length) {
  console.error("\n❌ El lockfile de URLs no se cumple. Ninguna URL publicada puede cambiar (P0-1).");
  process.exit(1);
}
console.log("\n✔ Lockfile de URLs en verde.");
