/**
 * generateQuotePdf.ts
 * Genera un presupuesto PDF descargable para el Tarificador Interno de Adeslas.
 * Usa jsPDF + jspdf-autotable.
 */

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ─── Colores corporativos ──────────────────────────────────── */
const AZUL_OSCURO : [number, number, number] = [0,  48, 135];   // #003087
const AZUL_CLARO  : [number, number, number] = [0, 157, 217];   // #009DD9
const MAGENTA     : [number, number, number] = [228,  9, 125];  // #E4097D
const GRIS_TEXTO  : [number, number, number] = [51,  51,  51];
const GRIS_CLARO  : [number, number, number] = [245, 247, 251];
const VERDE       : [number, number, number] = [22, 163,  74];
const AMBAR       : [number, number, number] = [217, 119,   6];

/* ─── Tipos ─────────────────────────────────────────────────── */
export interface ClienteInfo {
  nombre?: string;
  telefono?: string;
  email?: string;
}

export interface PersonaPrecio {
  edad: number;
  precio: number | null;
  banda: string;
}

export interface QuoteData {
  producto:              string;
  provincia:             string;
  zona:                  number;
  preciosPorPersona:     PersonaPrecio[];
  subtotal:              number;
  descAuto:              number;
  ratioAuto:             number;          // e.g. 0.10
  labelDescAuto:         string;          // e.g. "Dto. 10% (≥4 asegurados)"
  descComercial:         number;
  pctComercialEfectivo:  number;
  total:                 number;
  isSeniors:             boolean;
  totalPuntos:           number;
  puntosXAseg:           number;
  totalAbono:            number;
  abonoXAseg:            number;
  hayNulos:              boolean;
}

/* ─── Helpers ───────────────────────────────────────────────── */
function fmt(n: number): string {
  return n.toFixed(2).replace(".", ",") + " €";
}

function drawRect(
  doc: jsPDF,
  x: number, y: number, w: number, h: number,
  r: [number, number, number],
  g: [number, number, number] = r,
  radius = 0
) {
  doc.setFillColor(...r);
  if (radius > 0) {
    doc.roundedRect(x, y, w, h, radius, radius, "F");
  } else {
    doc.rect(x, y, w, h, "F");
  }
}

/* ─── Función principal ─────────────────────────────────────── */
export function generateQuotePdf(quote: QuoteData, cliente: ClienteInfo): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const PW = 210;   // page width mm
  const PH = 297;   // page height mm
  const ML = 14;    // margin left
  const MR = 14;    // margin right
  const CW = PW - ML - MR;  // content width

  /* ══════════════ CABECERA ══════════════════════════════════ */
  // Franja superior degradada (simulada con dos rectángulos)
  drawRect(doc, 0, 0, PW, 28, AZUL_OSCURO);
  drawRect(doc, PW * 0.55, 0, PW * 0.45, 28, AZUL_CLARO);

  // Título
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("PRESUPUESTO PERSONALIZADO", ML, 11);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Marchal Aseguradores · Agente exclusivo Adeslas", ML, 17);
  doc.text("91 710 50 00 · cmarchal@marchalconsultores.com", ML, 22);

  // Fecha (esquina superior derecha)
  const hoy = new Date().toLocaleDateString("es-ES", {
    day: "2-digit", month: "long", year: "numeric",
  });
  doc.setFontSize(8);
  doc.setTextColor(220, 240, 255);
  doc.text(hoy, PW - MR, 11, { align: "right" });
  doc.text("Adeslas 2026", PW - MR, 17, { align: "right" });

  let y = 34;

  /* ══════════════ DATOS DEL CLIENTE ═════════════════════════ */
  const tieneCliente = cliente.nombre || cliente.telefono || cliente.email;

  if (tieneCliente) {
    drawRect(doc, ML, y, CW, 24, GRIS_CLARO, GRIS_CLARO, 3);

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...AZUL_CLARO);
    doc.text("DATOS DEL CLIENTE", ML + 4, y + 6);

    doc.setTextColor(...GRIS_TEXTO);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    const col1 = ML + 4;
    const col2 = ML + 4 + CW / 3;
    const col3 = ML + 4 + (CW / 3) * 2;
    const rowY  = y + 14;

    if (cliente.nombre) {
      doc.setFont("helvetica", "bold");
      doc.text("Cliente", col1, y + 10);
      doc.setFont("helvetica", "normal");
      doc.text(cliente.nombre, col1, rowY);
    }
    if (cliente.telefono) {
      doc.setFont("helvetica", "bold");
      doc.text("Teléfono", col2, y + 10);
      doc.setFont("helvetica", "normal");
      doc.text(cliente.telefono, col2, rowY);
    }
    if (cliente.email) {
      doc.setFont("helvetica", "bold");
      doc.text("Email", col3, y + 10);
      doc.setFont("helvetica", "normal");
      doc.text(cliente.email, col3, rowY);
    }

    y += 29;
  }

  /* ══════════════ NOMBRE DEL PRODUCTO ═══════════════════════ */
  drawRect(doc, ML, y, CW, 14, AZUL_OSCURO, AZUL_OSCURO, 3);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text(quote.producto, ML + 5, y + 9.5);

  // Badge provincia
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(190, 220, 255);
  doc.text(`${quote.provincia} · Zona ${quote.zona}`, PW - MR - 2, y + 9.5, { align: "right" });

  y += 19;

  /* ══════════════ TABLA DE ASEGURADOS ═══════════════════════ */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...AZUL_OSCURO);
  doc.text("Desglose por asegurado", ML, y);
  y += 3;

  autoTable(doc, {
    startY: y,
    margin: { left: ML, right: MR },
    head: [["Persona", "Edad", "Tramo", "Prima mensual"]],
    body: quote.preciosPorPersona.map((p, i) => [
      `Persona ${i + 1}`,
      `${p.edad} años`,
      p.banda,
      p.precio !== null ? fmt(p.precio) : "N/D",
    ]),
    headStyles: {
      fillColor: AZUL_OSCURO,
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
      halign: "left",
    },
    bodyStyles: {
      fontSize: 9,
      textColor: GRIS_TEXTO,
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 25, halign: "center" },
      2: { cellWidth: 30, halign: "center" },
      3: { cellWidth: 40, halign: "right", fontStyle: "bold" },
    },
    alternateRowStyles: { fillColor: [248, 250, 253] },
    tableWidth: CW,
    theme: "grid",
  });

  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 6;

  /* ══════════════ RESUMEN DE PRECIOS ════════════════════════ */
  const boxH = 10 + (quote.ratioAuto > 0 ? 8 : 0) + (quote.pctComercialEfectivo > 0 ? 8 : 0) + 12;
  drawRect(doc, ML, y, CW, boxH, GRIS_CLARO, GRIS_CLARO, 3);

  let lineY = y + 8;
  const LabelX = ML + 5;
  const ValueX = ML + CW - 5;

  // Subtotal
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...GRIS_TEXTO);
  doc.text("Subtotal bruto", LabelX, lineY);
  doc.text(fmt(quote.subtotal), ValueX, lineY, { align: "right" });

  // Descuento automático
  if (quote.ratioAuto > 0) {
    lineY += 8;
    doc.setTextColor(...VERDE);
    doc.setFont("helvetica", "bold");
    doc.text(`${quote.labelDescAuto}`, LabelX, lineY);
    doc.text(`-${fmt(quote.descAuto)}`, ValueX, lineY, { align: "right" });
    doc.setFont("helvetica", "normal");
  }

  // Descuento comercial
  if (quote.pctComercialEfectivo > 0) {
    lineY += 8;
    doc.setTextColor(...AZUL_CLARO);
    doc.setFont("helvetica", "bold");
    doc.text(`Descuento comercial ${quote.pctComercialEfectivo}%`, LabelX, lineY);
    doc.text(`-${fmt(quote.descComercial)}`, ValueX, lineY, { align: "right" });
    doc.setFont("helvetica", "normal");
  }

  // Separador
  lineY += 4;
  doc.setDrawColor(200, 210, 220);
  doc.line(LabelX, lineY, ValueX, lineY);
  lineY += 6;

  // TOTAL
  drawRect(doc, ML + CW - 60, lineY - 6, 60, 12, AZUL_OSCURO, AZUL_OSCURO, 2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text(fmt(quote.total), ValueX - 2, lineY + 2, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...AZUL_OSCURO);
  doc.text("TOTAL MENSUAL", LabelX, lineY + 2);

  y = lineY + 12;

  /* ══════════════ INCENTIVOS CAMPAÑA SEGURÍSIMOS ════════════ */
  if (!quote.isSeniors && quote.totalPuntos > 0) {
    y += 4;
    const tarjeta = Math.floor(quote.totalPuntos / 500) * 50;
    const incentH = tarjeta > 0 ? 32 : 22;

    drawRect(doc, ML, y, CW, incentH, [255, 251, 235], [255, 251, 235], 3);
    doc.setDrawColor(...AMBAR);
    doc.roundedRect(ML, y, CW, incentH, 3, 3, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...AMBAR);
    doc.text("⭐  Campaña Segurísimos · Puntos", ML + 5, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(120, 80, 0);
    doc.text(
      `${quote.puntosXAseg.toLocaleString("es-ES")} puntos × ${quote.preciosPorPersona.length} asegurado${quote.preciosPorPersona.length > 1 ? "s" : ""} = `,
      ML + 5, y + 14,
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...AMBAR);
    const ptsTxt = `${quote.totalPuntos.toLocaleString("es-ES")} puntos`;
    doc.text(ptsTxt, ML + 5 + 73, y + 14);

    if (tarjeta > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 30, 30);
      doc.text(`🎴  Tarjeta prepago disponible: ${tarjeta} € (o canjea por otros premios)`, ML + 5, y + 23);
    }

    y += incentH + 4;
  }

  if (quote.isSeniors && quote.totalAbono > 0) {
    y += 4;
    drawRect(doc, ML, y, CW, 26, [240, 253, 244], [240, 253, 244], 3);
    doc.setDrawColor(...VERDE);
    doc.roundedRect(ML, y, CW, 26, 3, 3, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...VERDE);
    doc.text("💶  Campaña Segurísimos · Abono en cuenta", ML + 5, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(20, 83, 45);
    doc.text(
      `${quote.abonoXAseg} € × ${quote.preciosPorPersona.length} asegurado${quote.preciosPorPersona.length > 1 ? "s" : ""} = `,
      ML + 5, y + 14,
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...VERDE);
    doc.text(`${quote.totalAbono} € abono en cuenta`, ML + 5 + 68, y + 14);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(80, 120, 80);
    doc.text("Abono directo en cuenta bancaria tras la contratación.", ML + 5, y + 21);

    y += 30;
  }

  /* ══════════════ AVISO LEGAL ════════════════════════════════ */
  const avisoY = Math.max(y + 8, PH - 34);
  doc.setDrawColor(210, 220, 230);
  doc.line(ML, avisoY, PW - MR, avisoY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(150, 160, 170);
  const aviso = [
    "Este presupuesto tiene carácter orientativo y está sujeto a la aceptación por parte de Adeslas Seguros Médicos, S.A. Los precios indicados corresponden a",
    "la tarifa vigente en 2026 y pueden variar según el cuestionario de salud. Documento generado por Marchal Aseguradores S.L.U. — Agente exclusivo Adeslas.",
    "Reg. D.G.S. nº J-1234. Avenida de Filipinas, 28 · 28003 Madrid · Tel. 91 710 50 00 · cmarchal@marchalconsultores.com",
  ];
  aviso.forEach((line, i) => {
    doc.text(line, ML, avisoY + 5 + i * 4);
  });

  /* ══════════════ PIE DE PÁGINA ══════════════════════════════ */
  drawRect(doc, 0, PH - 8, PW, 8, AZUL_OSCURO);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(180, 210, 255);
  doc.text("Marchal Aseguradores · Agente exclusivo Adeslas · 91 710 50 00", PW / 2, PH - 3, { align: "center" });

  /* ══════════════ DESCARGA ═══════════════════════════════════ */
  const clienteSlug = cliente.nombre
    ? `_${cliente.nombre.replace(/\s+/g, "-").toLowerCase()}`
    : "";
  const productoSlug = quote.producto.replace(/\s+/g, "-").toLowerCase();
  const fecha = new Date().toISOString().slice(0, 10);
  doc.save(`presupuesto-adeslas_${productoSlug}${clienteSlug}_${fecha}.pdf`);
}
