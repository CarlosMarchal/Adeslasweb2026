'use client';

import React from "react";

/* ───────── Bicolor/Tricolor Promo Pill ─────────────────────────────────────
 *
 * Diseño de referencia Adeslas:
 *  - Sección izquierda (magenta #E4097D): número grande + texto uppercase
 *    con prefijo "hasta" en pequeño encima del texto.
 *  - Sección central (cyan #009FE3): número + texto, borde izquierdo cóncavo.
 *  - Sección derecha opcional (azul marino #003087): igual que central.
 *  - Badge "+" blanco entre cada sección curvada.
 *  - Bordes exteriores: izquierdo = arco (curveH 50%), derecho = suave redondeado.
 *
 * Técnica de curvas:
 *   borderTopLeftRadius + borderBottomLeftRadius: curveH 50%
 *   + marginLeft: calc(-1 * curveH)
 *   + paddingLeft compensado: calc(padH + curveH)
 *   + paddingRight compensado (hasNext): calc(padH + curveH)  → evita solapamiento
 *
 * Responsive: clamp() 390 px (móvil) → 1440 px (desktop).
 * ────────────────────────────────────────────────────────────────────────── */

export interface PromoPillData {
  left:   { number: string; text: string };
  right?: { number: string; text: string };
  extra?: { number: string; text: string };
}

interface PromoPillProps {
  pill: PromoPillData;
  size?: "sm" | "md" | "lg";
}

const PromoPill = ({ pill, size: _size = "md" }: PromoPillProps) => {
  /* Sección principal (izquierda) — tamaños grandes
     Mínimos aumentados para que el pill se vea mayor en mobile (≤768 px) */
  const numFont    = "clamp(27px, 4.8vw, 58px)";
  const txtFont    = "clamp(9.5px, 1.1vw, 13px)";
  const prefixFont = "clamp(7.5px, 0.8vw, 9px)";
  const padV       = "clamp(13px, 2vw, 20px)";
  const padH       = "clamp(13px, 2.4vw, 28px)";
  const gap        = "clamp(5px, 0.7vw, 9px)";
  const curveH     = "clamp(14px, 2.5vw, 26px)";
  const badgeDia   = "clamp(22px, 3vw, 32px)";
  const plusFont   = "clamp(13px, 1.4vw, 16px)";
  /* Secciones secundarias (cyan / azul marino) — más compactas y menos protagonistas */
  const numFontSm  = "clamp(19px, 3.2vw, 38px)";
  const txtFontSm  = "clamp(8px, 0.95vw, 11px)";
  const padHSm     = "clamp(10px, 1.8vw, 20px)";

  type SectionProps = {
    bg: string;
    number: string;
    text: string;
    curved?: boolean;
    hasNext?: boolean;
    prefix?: string;
    secondary?: boolean;
  };

  const Section = ({ bg, number, text, curved, hasNext, prefix, secondary }: SectionProps) => {
    const nf  = secondary ? numFontSm : numFont;
    const tf  = secondary ? txtFontSm : txtFont;
    const ph  = secondary ? padHSm    : padH;
    return (
    <div style={{
      position: "relative" as const,
      background: bg,
      display: "flex",
      alignItems: "center",
      gap,
      paddingTop: padV,
      paddingBottom: padV,
      paddingLeft: curved ? `calc(${ph} + ${curveH})` : ph,
      paddingRight: hasNext ? `calc(${ph} + ${curveH})` : ph,
      flexShrink: 0,
      ...(curved && {
        borderTopLeftRadius:    `${curveH} 50%`,
        borderBottomLeftRadius: `${curveH} 50%`,
        marginLeft: `calc(-1 * ${curveH})`,
        zIndex: 1,
      }),
    }}>
      {curved && (
        <div style={{
          position: "absolute" as const,
          left: "0",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: badgeDia,
          height: badgeDia,
          borderRadius: "50%",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontSize: plusFont,
          color: "#003087",
          boxShadow: "0 1px 6px rgba(0,0,0,0.20)",
          zIndex: 2,
          flexShrink: 0,
        }}>+</div>
      )}
      <span style={{ fontSize: nf, fontWeight: 600, lineHeight: 1, color: "#fff", flexShrink: 0, letterSpacing: "-0.02em" }}>
        {number}
      </span>
      <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-start" }}>
        {prefix && (
          <span style={{ fontSize: prefixFont, fontWeight: 500, lineHeight: 1, color: "rgba(255,255,255,0.85)", textTransform: "lowercase" as const, letterSpacing: "0.04em", marginBottom: "2px" }}>
            {prefix}
          </span>
        )}
        <span style={{ fontSize: tf, fontWeight: 500, lineHeight: 1.25, color: "#fff", textTransform: "uppercase" as const, whiteSpace: "pre-line" as const }}>
          {text}
        </span>
      </div>
    </div>
    );
  };

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "stretch",
      borderTopLeftRadius:    `${curveH} 50%`,
      borderBottomLeftRadius: `${curveH} 50%`,
      borderTopRightRadius:    "clamp(8px, 1.2vw, 14px)",
      borderBottomRightRadius: "clamp(8px, 1.2vw, 14px)",
      overflow: "hidden",
      boxShadow: "0 6px 24px rgba(0,0,0,0.28)",
      isolation: "isolate" as React.CSSProperties["isolation"],
    }}>
      <Section bg="#E4097D" number={pill.left.number}  text={pill.left.text}  hasNext prefix="hasta" />
      {pill.right && <Section bg="#009FE3" number={pill.right.number} text={pill.right.text} curved hasNext={!!pill.extra} secondary />}
      {pill.extra && (
        <Section bg="#003087" number={pill.extra.number} text={pill.extra.text} curved secondary />
      )}
    </div>
  );
};

export default PromoPill;
