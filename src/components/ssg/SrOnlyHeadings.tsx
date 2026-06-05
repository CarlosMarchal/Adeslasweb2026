import { getPageMeta } from "@/data/pageMeta";

/**
 * SrOnlyHeadings — Server Component que preserva los títulos OCULTOS (sr-only)
 * que ya servía producción vía el catch-all (h1/h2 con keywords para SEO).
 *
 * Decisión documentada (ver docs/SSG-HIDDEN-HEADINGS.md): a petición del cliente,
 * las páginas migradas CONSERVAN el h1/h2 oculto de PAGE_META, además del h1
 * visible del hero. Esto mantiene exactamente las señales de keyword que tenía
 * producción. Implica dos h1 en la página (uno visible, uno oculto); es un
 * compromiso conocido y revisable.
 *
 * Estilo idéntico al del catch-all (app/[[...slug]]/page.tsx).
 * Autor: Juan Carlos Díaz — Convertiam.
 */
const SR_ONLY: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
};

export function SrOnlyHeadings({ pathname }: { pathname: string }) {
  const meta = getPageMeta(pathname);
  if (meta.noindex) return null;
  return (
    <>
      <h1 style={SR_ONLY}>{meta.h1 ?? meta.title.split(" | ")[0]}</h1>
      {meta.h2 && <h2 style={SR_ONLY}>{meta.h2}</h2>}
    </>
  );
}
