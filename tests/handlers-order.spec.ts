/**
 * Guardarraíl P0-2 — Orden de los handlers de formulario.
 *
 * Regla dura: dentro de un handler de envío, la llamada a `track*` debe ser
 * SÍNCRONA y PRIMERO, antes de cualquier `await`. Si un `await` (típicamente el
 * fetch a HubSpot) precede al tracking, el evento puede perderse cuando el
 * usuario cierra la pestaña antes de que la promesa resuelva.
 *
 * El test localiza funciones async que contienen una llamada `track*` y verifica
 * que la primera `track*` aparece antes del primer `await` del cuerpo del handler.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const TRACK_CALL = /\btrack(?:GenerateLead|TarificadorSubmit|ClickToCall\w+|PageView)\s*\(/;

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (/\.tsx?$/.test(name)) acc.push(full);
  }
  return acc;
}

/** Devuelve el índice del cierre `}` que casa con la `{` en openIdx. */
function matchBrace(src: string, openIdx: number): number {
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return src.length;
}

/** Extrae cuerpos de funciones `async` del archivo (arrow y declaración). */
function asyncBodies(src: string): string[] {
  const bodies: string[] = [];
  // const x = async (...) => {   |   x = async (...): T => {
  const arrow = /async\s*\([^)]*\)\s*(?::[^=>{]+)?=>\s*\{/g;
  // async function name(...) {
  const fn = /async\s+function\s+\w*\s*\([^)]*\)\s*\{/g;
  for (const re of [arrow, fn]) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(src)) !== null) {
      const openIdx = src.indexOf("{", m.index + m[0].length - 1);
      if (openIdx === -1) continue;
      bodies.push(src.slice(openIdx, matchBrace(src, openIdx) + 1));
    }
  }
  return bodies;
}

describe("Handlers de formulario: track* antes de cualquier await (P0-2)", () => {
  const files = [...walk(join(ROOT, "src", "components")), ...walk(join(ROOT, "src", "views"))]
    .filter((f) => {
      const s = readFileSync(f, "utf8");
      return s.includes("@/lib/tracking") && TRACK_CALL.test(s);
    });

  it("hay handlers con tracking que auditar", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    it(`orden correcto en ${file.replace(ROOT + "/", "")}`, () => {
      const src = readFileSync(file, "utf8");
      const violations: string[] = [];
      for (const body of asyncBodies(src)) {
        const trackIdx = body.search(TRACK_CALL);
        if (trackIdx === -1) continue; // handler sin tracking → no aplica
        const awaitIdx = body.search(/\bawait\b/);
        if (awaitIdx !== -1 && awaitIdx < trackIdx) {
          violations.push(body.slice(0, 200).replace(/\s+/g, " ").trim());
        }
      }
      expect(
        violations,
        `Hay un 'await' antes del primer track* en un handler de ${file}. ` +
          `El tracking debe ser síncrono y primero (CLAUDE.md §3.1).`
      ).toEqual([]);
    });
  }
});
