/**
 * Guardarraíl P0-2 — Escaneo de código fuente (lint bloqueante).
 *
 * Reemplaza a una regla ESLint a medida con un escaneo determinista del fuente:
 *  - Prohíbe `crypto.subtle` en src/lib/** (asíncrono → pérdida silenciosa de eventos).
 *  - Exige que las utilidades de tracking exportadas NO sean `async`.
 *
 * Si cualquiera de estas condiciones se viola, el commit/CI queda bloqueado.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (/\.(ts|tsx)$/.test(name)) acc.push(full);
  }
  return acc;
}

/** Elimina comentarios para no levantar falsos positivos sobre menciones
 *  documentales (p. ej. el comentario de tracking.ts que prohíbe crypto.subtle). */
function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "") // bloques /* ... */
    .replace(/(^|[^:])\/\/.*$/gm, "$1"); // líneas //... (preserva http://)
}

describe("Prohibido crypto.subtle en src/lib/** (P0-2)", () => {
  const libFiles = walk(join(ROOT, "src", "lib"));

  it("ningún archivo de src/lib usa crypto.subtle", () => {
    const offenders = libFiles.filter((f) =>
      /crypto\s*\.\s*subtle/.test(stripComments(readFileSync(f, "utf8")))
    );
    expect(
      offenders,
      `crypto.subtle es asíncrono y prohibido (usa js-sha256). Infractores:\n${offenders.join("\n")}`
    ).toEqual([]);
  });
});

describe("Las utilidades de tracking son síncronas (P0-2)", () => {
  const src = readFileSync(join(ROOT, "src", "lib", "tracking.ts"), "utf8");
  const fns = [
    "trackGenerateLead",
    "trackTarificadorSubmit",
    "trackClickToCallContratacion",
    "trackClickToCallAsistencia",
    "trackPageView",
  ];

  for (const fn of fns) {
    it(`${fn} no está declarada async`, () => {
      const asyncDecl = new RegExp(`export\\s+async\\s+function\\s+${fn}\\b`);
      expect(asyncDecl.test(src), `${fn} no puede ser async`).toBe(false);
      // Debe existir como función exportada (síncrona)
      expect(new RegExp(`export\\s+function\\s+${fn}\\b`).test(src)).toBe(true);
    });
  }
});
