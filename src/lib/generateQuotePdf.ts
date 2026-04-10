/**
 * generateQuotePdf.ts — Presupuesto PDF corporativo Adeslas · Marchal Aseguradores
 * jsPDF + jspdf-autotable
 */

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ─── Logo (PNG blanco, base64) ─────────────────────────────── */
const LOGO_B64 = "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";

/* ─── Paleta corporativa ─────────────────────────────────────── */
const NAVY   : [number,number,number] = [0,   48, 135];   // #003087
const BLUE   : [number,number,number] = [0,  157, 217];   // #009DD9
const MAGENTA: [number,number,number] = [228,  9, 125];   // #E4097D
const SLATE  : [number,number,number] = [55,  65,  81];
const MIST   : [number,number,number] = [244, 247, 252];
const BORDER : [number,number,number] = [213, 220, 232];
const GREEN  : [number,number,number] = [16, 130,  60];
const AMBER  : [number,number,number] = [161,  95,   6];
const WHITE  : [number,number,number] = [255, 255, 255];
const AMBER_BG: [number,number,number] = [255, 251, 230];
const GREEN_BG: [number,number,number] = [240, 253, 244];

/* ─── Tipos públicos ─────────────────────────────────────────── */
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
  ratioAuto:             number;
  labelDescAuto:         string;
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

/* ─── Ficha de producto ─────────────────────────────────────── */
interface CoverageItem {
  icon:  string;   // letra mayúscula que aparece en el cuadrado NAVY
  title: string;   // texto de la cobertura
}

interface ProductInfo {
  badge:     string;
  desc:      string;
  coverages: CoverageItem[];
}

/** Crea una CoverageItem derivando el icono del primer carácter */
function cov(title: string, icon?: string): CoverageItem {
  return { icon: (icon ?? title[0]).toUpperCase(), title };
}

const PRODUCTS: Record<string, ProductInfo> = {
  "Adeslas GO": {
    badge: "Seguro Ambulatorio · Copago máx. 260 €/año",
    desc:  "Accede a más de 51.000 médicos y especialistas sin listas de espera, sin necesidad de derivación. Medicina general, diagnóstico completo y urgencias 24 h incluidos. Tu copago anual nunca supera los 260 €, sea cual sea el uso del seguro.",
    coverages: [
      cov("Medicina general y pediatría", "M"),
      cov("Urgencias 24 h en toda España", "U"),
      cov("Más de 40 especialidades médicas", "E"),
      cov("Telemedicina: tlf, chat y vídeo", "T"),
      cov("Pruebas diagnósticas incluidas", "P"),
      cov("Análisis clínicos incluidos", "A"),
      cov("Chequeo médico anual", "C"),
      cov("Rehabilitación física", "R"),
      cov("Diagnóstico por imagen (Rx, eco)", "D"),
      cov("Copago máx. garantizado 260 €/año", "G"),
      cov("Y mucho más...", "+"),
    ],
  },
  "Adeslas Plena Vital": {
    badge: "Cobertura Completa · Copago máx. 300 €/año",
    desc:  "Hospitalización, cirugía y todas las especialidades sin listas de espera, con acceso a más de 51.000 médicos en 1.400 centros. El copago anual nunca supera los 300 €, por mucho que uses el seguro a lo largo del año.",
    coverages: [
      cov("Medicina general y pediatría", "M"),
      cov("Urgencias 24 h en toda España", "U"),
      cov("Más de 40 especialidades médicas", "E"),
      cov("Hospitalización y cirugía incluidas", "H"),
      cov("Telemedicina: tlf, chat y vídeo", "T"),
      cov("Pruebas diagnósticas incluidas", "P"),
      cov("Análisis clínicos incluidos", "A"),
      cov("Chequeo médico anual", "C"),
      cov("Rehabilitación física", "R"),
      cov("Copago máx. garantizado 300 €/año", "G"),
      cov("Y mucho más...", "+"),
    ],
  },
  "Adeslas Plena Vital Total": {
    badge: "Precio Garantizado 3 Años · Dental Incluido",
    desc:  "Hospitalización completa y copago reducido con precio garantizado durante 3 años. Dental integrado con hasta 46 actos incluidos, asistencia en viajes y acceso a más de 51.000 médicos y 1.400 centros sin listas de espera.",
    coverages: [
      cov("Medicina general y pediatría", "M"),
      cov("Urgencias 24 h en toda España", "U"),
      cov("Más de 40 especialidades médicas", "E"),
      cov("Hospitalización y cirugía incluidas", "H"),
      cov("Dental: hasta 46 actos incluidos", "D"),
      cov("Telemedicina: tlf, chat y vídeo", "T"),
      cov("Análisis clínicos y TAC / RMN", "A"),
      cov("Chequeo médico anual", "C"),
      cov("Rehabilitación física", "R"),
      cov("Asistencia en viaje hasta 25.000 €", "V"),
      cov("Precio garantizado 3 años", "G"),
      cov("Y mucho más...", "+"),
    ],
  },
  "Adeslas Plena Plus": {
    badge: "Sin Copagos · Hospitalización Ilimitada",
    desc:  "Cobertura médica total sin copagos en ningún servicio de la red Adeslas: hospitalización ilimitada, cirugía, todas las especialidades y urgencias 24 h. Más de 51.000 médicos y 1.400 centros a tu disposición sin listas de espera.",
    coverages: [
      cov("Medicina general y pediatría", "M"),
      cov("Urgencias 24 h sin copago", "U"),
      cov("Más de 40 especialidades sin copago", "E"),
      cov("Hospitalización y cirugía sin límite", "H"),
      cov("Telemedicina: tlf, chat y vídeo", "T"),
      cov("Pruebas diagnósticas incluidas", "P"),
      cov("Análisis clínicos incluidos", "A"),
      cov("Chequeo médico anual", "C"),
      cov("Rehabilitación física", "R"),
      cov("Sin copagos en toda la red Adeslas", "S"),
      cov("Y mucho más...", "+"),
    ],
  },
  "Adeslas Plena Total": {
    badge: "Sin Copagos · Dental · Asistencia Viaje 100.000 €",
    desc:  "La cobertura más completa de Adeslas: sin copagos en ningún servicio, dental integrado con hasta 46 actos, asistencia en viajes hasta 100.000 €, hospitalización con cama para acompañante y precio garantizado 3 años.",
    coverages: [
      cov("Medicina general y pediatría", "M"),
      cov("Urgencias 24 h sin copago", "U"),
      cov("Más de 40 especialistas sin copago", "E"),
      cov("Rehabilitación física incluida", "R"),
      cov("Telemedicina: tlf, chat y vídeo", "T"),
      cov("Pruebas diagnósticas incluidas", "P"),
      cov("Análisis clínicos incluidos", "A"),
      cov("Chequeo médico anual", "C"),
      cov("Asistencia en viaje hasta 100.000 €", "V"),
      cov("Reembolso farmacia y fisioterapia", "F"),
      cov("Hospitalización y cama acompañante", "H"),
      cov("Y mucho más...", "+"),
    ],
  },
  "Adeslas Plena Extra": {
    badge: "Libre Elección · Reembolso 80 % · Hasta 150.000 €/año",
    desc:  "Sin copagos y con libre elección de médico tanto en España como en el extranjero. Reembolsamos el 80 % de los gastos médicos con un máximo de 150.000 € al año, incluidas las urgencias internacionales.",
    coverages: [
      cov("Medicina general y pediatría", "M"),
      cov("Urgencias 24 h nacionales e internacionales", "U"),
      cov("Libre elección de médico en España", "L"),
      cov("Especialistas en el extranjero", "E"),
      cov("Hospitalización y cirugía sin límite", "H"),
      cov("Reembolso 80 % (máx. 150.000 €/año)", "R"),
      cov("Telemedicina: tlf, chat y vídeo", "T"),
      cov("Análisis clínicos y diagnóstico avanzado", "A"),
      cov("Chequeo médico anual", "C"),
      cov("Sin copagos en la red Adeslas", "S"),
      cov("Y mucho más...", "+"),
    ],
  },
  "Adeslas Plena": {
    badge: "Sin Copagos · Cobertura Médica Completa",
    desc:  "Cobertura sanitaria completa sin copagos con acceso a toda la red Adeslas de más de 51.000 médicos y 1.400 centros. Hospitalización ilimitada, todas las especialidades, cirugía y urgencias 24 h sin franquicia.",
    coverages: [
      cov("Medicina general y pediatría", "M"),
      cov("Urgencias 24 h sin copago", "U"),
      cov("Más de 40 especialidades sin copago", "E"),
      cov("Hospitalización y cirugía ilimitadas", "H"),
      cov("Telemedicina: tlf, chat y vídeo", "T"),
      cov("Pruebas diagnósticas incluidas", "P"),
      cov("Análisis clínicos incluidos", "A"),
      cov("Chequeo médico anual", "C"),
      cov("Rehabilitación física", "R"),
      cov("Sin copagos en toda la red", "S"),
      cov("Y mucho más...", "+"),
    ],
  },
  "Adeslas Negocios NIF": {
    badge: "Para Autónomos · Sin Copagos · Deducible IRPF",
    desc:  "Seguro médico sin copagos diseñado específicamente para autónomos: chequeo anual, acceso a más de 51.000 médicos sin esperas y hasta 500 € al año deducibles en el IRPF. Un beneficio fiscal con toda la cobertura sanitaria.",
    coverages: [
      cov("Medicina general y pediatría", "M"),
      cov("Urgencias 24 h en toda España", "U"),
      cov("Más de 40 especialidades médicas", "E"),
      cov("Hospitalización y cirugía incluidas", "H"),
      cov("Telemedicina: tlf, chat y vídeo", "T"),
      cov("Pruebas diagnósticas incluidas", "P"),
      cov("Análisis clínicos incluidos", "A"),
      cov("Chequeo médico anual", "C"),
      cov("Rehabilitación física", "R"),
      cov("Deducible en IRPF hasta 500 €/año", "D"),
      cov("Y mucho más...", "+"),
    ],
  },
  "Adeslas Pymes Total": {
    badge: "Empresas hasta 15 Empleados · 3 Años sin Subidas",
    desc:  "Beneficio social 100 % deducible en el Impuesto de Sociedades para empresas de hasta 15 empleados. Sin copagos, chequeo anual, dental incluido y precio garantizado 3 años. La mejor forma de cuidar a tu equipo.",
    coverages: [
      cov("Medicina general y pediatría", "M"),
      cov("Urgencias 24 h en toda España", "U"),
      cov("Más de 40 especialidades sin copago", "E"),
      cov("Hospitalización y cirugía ilimitadas", "H"),
      cov("Dental incluido con principales actos", "D"),
      cov("Telemedicina: tlf, chat y vídeo", "T"),
      cov("Análisis clínicos incluidos", "A"),
      cov("Chequeo médico anual para empleados", "C"),
      cov("Precio garantizado 3 años", "G"),
      cov("100 % deducible en Impuesto de Sociedades", "F"),
      cov("Y mucho más...", "+"),
    ],
  },
  "Adeslas Seniors": {
    badge: "Personas de 55 a 84 Años · Asesor Personal 24 h",
    desc:  "Seguro médico específico para personas entre 55 y 84 años, con asesor de salud personal disponible las 24 h. Todas las especialidades, hospitalización completa y copago con tope anual garantizado.",
    coverages: [
      cov("Medicina general y pediatría", "M"),
      cov("Urgencias 24 h en toda España", "U"),
      cov("Más de 40 especialidades médicas", "E"),
      cov("Hospitalización y cirugía incluidas", "H"),
      cov("Telemedicina: tlf, chat y vídeo", "T"),
      cov("Diagnóstico avanzado: TAC y RMN", "D"),
      cov("Análisis clínicos incluidos", "A"),
      cov("Chequeo médico anual adaptado", "C"),
      cov("Rehabilitación física", "R"),
      cov("Asesor de salud personal 24 h", "A"),
      cov("Y mucho más...", "+"),
    ],
  },
  "Adeslas Seniors Total": {
    badge: "3 Años sin Subidas · Dental · Asistencia Viaje",
    desc:  "La cobertura más completa para personas mayores: precio garantizado 3 años, dental incluido, asistencia en viajes hasta 100.000 €, asesor de salud personal 24 h y topes de copago muy reducidos.",
    coverages: [
      cov("Medicina general y pediatría", "M"),
      cov("Urgencias 24 h en toda España", "U"),
      cov("Más de 40 especialidades médicas", "E"),
      cov("Hospitalización y cirugía ilimitadas", "H"),
      cov("Dental incluido con principales actos", "D"),
      cov("Telemedicina: tlf, chat y vídeo", "T"),
      cov("Análisis clínicos y TAC / RMN", "A"),
      cov("Chequeo médico anual adaptado", "C"),
      cov("Asistencia en viaje hasta 100.000 €", "V"),
      cov("Asesor de salud personal 24 h", "A"),
      cov("Precio garantizado 3 años", "G"),
      cov("Y mucho más...", "+"),
    ],
  },
};

const DEFAULT_INFO: ProductInfo = {
  badge: "Seguro Adeslas 2026",
  desc:  "Cobertura médica con acceso a la red Adeslas de más de 51.000 médicos y 1.400 centros en toda España. Sin listas de espera y con atención médica personalizada.",
  coverages: [
    cov("Medicina general y pediatría", "M"),
    cov("Urgencias 24 h en toda España", "U"),
    cov("Más de 40 especialidades médicas", "E"),
    cov("Hospitalización y cirugía incluidas", "H"),
    cov("Diagnóstico por imagen incluido", "D"),
    cov("Análisis clínicos incluidos", "A"),
    cov("Telemedicina: tlf, chat y vídeo", "T"),
    cov("Chequeo médico anual", "C"),
    cov("Atención telefónica 24 h", "A"),
    cov("Y mucho más...", "+"),
  ],
};

/* ─── Helpers de dibujo ─────────────────────────────────────── */
function fillRect(
  doc: jsPDF,
  x: number, y: number, w: number, h: number,
  color: [number,number,number],
  r = 0,
) {
  doc.setFillColor(...color);
  r > 0 ? doc.roundedRect(x, y, w, h, r, r, "F")
        : doc.rect(x, y, w, h, "F");
}

function outlineRect(
  doc: jsPDF,
  x: number, y: number, w: number, h: number,
  color: [number,number,number],
  r = 0,
  lw = 0.3,
) {
  doc.setDrawColor(...color);
  doc.setLineWidth(lw);
  r > 0 ? doc.roundedRect(x, y, w, h, r, r, "S")
        : doc.rect(x, y, w, h, "S");
}

function sectionLabel(
  doc: jsPDF,
  text: string,
  x: number, y: number,
) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...BLUE);
  doc.text(text, x, y);
}

function fmt(n: number): string {
  return n.toFixed(2).replace(".", ",") + " €";
}

/* ═══════════════════════════════════════════════════════════════
   FUNCIÓN PRINCIPAL
═══════════════════════════════════════════════════════════════ */
export function generateQuotePdf(quote: QuoteData, cliente: ClienteInfo): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const PW = 210, PH = 297, ML = 14, MR = 14, CW = PW - ML - MR;
  const SAFE_BOTTOM = PH - 14;   // reserva para aviso legal + footer

  const info = PRODUCTS[quote.producto] ?? DEFAULT_INFO;
  const hoy  = new Date().toLocaleDateString("es-ES", {
    day: "2-digit", month: "long", year: "numeric",
  });

  /* ── helper: nueva página si no cabe "needed" mm ─── */
  let y = 0;
  function newPage(): void {
    doc.addPage();
    y = 16;
  }
  function ensureSpace(needed: number): void {
    if (y + needed > SAFE_BOTTOM) newPage();
  }

  /* ── helper: footer (se dibuja en todas las páginas al final) ─ */
  function drawFooters(): void {
    const total = doc.getNumberOfPages();
    for (let p = 1; p <= total; p++) {
      doc.setPage(p);
      // Barra footer navy
      fillRect(doc, 0, PH - 11, PW, 11, NAVY);
      // Acento izquierdo magenta
      fillRect(doc, 0, PH - 11, 4, 11, MAGENTA);
      // Punto separador centrado
      fillRect(doc, PW / 2 - 0.5, PH - 11, 1, 11, [0, 70, 155]);
      // Texto izquierda
      doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(...WHITE);
      doc.text("Marchal Aseguradores · Agente exclusivo Adeslas", 8, PH - 6.5);
      // Texto derecha
      doc.setFont("helvetica", "normal"); doc.setFontSize(6.5);
      doc.setTextColor(165, 200, 245);
      doc.text(
        `adeslas.numero1salud.es  ·  Tel. 91 710 50 00  ·  ${p > 1 ? `Pág. ${p}` : ""}`,
        PW - 8, PH - 6.5, { align: "right" },
      );
      // Línea divisoria legal
      doc.setDrawColor(...BORDER); doc.setLineWidth(0.2);
      doc.line(ML, PH - 14, PW - MR, PH - 14);
      // Aviso legal compacto
      doc.setFont("helvetica", "italic"); doc.setFontSize(5.5);
      doc.setTextColor(170, 175, 185);
      doc.text(
        "Presupuesto orientativo sujeto a aceptación por Adeslas Seguros Médicos S.A. Precios tarifa 2026. Emitido por Marchal Aseguradores S.L.U. — Avda. de Filipinas 28, 28003 Madrid.",
        ML, PH - 15.5,
      );
    }
  }

  /* ════════════════════════════════════════════════════════════
     § 1 · CABECERA (compacta — 26 mm)
  ════════════════════════════════════════════════════════════ */
  const HDR = 26;

  fillRect(doc, 0, 0, PW, HDR, NAVY);
  fillRect(doc, PW * 0.63, 0, PW * 0.37, HDR, [0, 58, 148]);
  fillRect(doc, 0, 0, 3.5, HDR, BLUE);
  fillRect(doc, 0, HDR - 2, PW, 2, MAGENTA);

  // Logo (derecha)
  try {
    doc.addImage("data:image/png;base64," + LOGO_B64, "PNG", PW - MR - 48, 5, 46, 15);
  } catch {
    doc.setFont("helvetica", "bold"); doc.setFontSize(8);
    doc.setTextColor(...WHITE);
    doc.text("ADESLAS · MARCHAL", PW - MR, 11, { align: "right" });
  }

  // Título
  doc.setFont("helvetica", "bold"); doc.setFontSize(16); doc.setTextColor(...WHITE);
  doc.text("PRESUPUESTO", ML + 7, 10.5);

  // Subtítulo con nombre
  if (cliente.nombre) {
    doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(175, 212, 255);
    const prefix = "Personalizado para  ";
    doc.text(prefix, ML + 7, 16.5);
    const prefW = doc.getTextWidth(prefix);
    doc.setFont("helvetica", "bold"); doc.setTextColor(...WHITE);
    const nombreShort = doc.splitTextToSize(cliente.nombre, CW - prefW - 58)[0] as string;
    doc.text(nombreShort, ML + 7 + prefW, 16.5);
  } else {
    doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(175, 212, 255);
    doc.text("Presupuesto personalizado · 2026", ML + 7, 16.5);
  }

  // Fecha
  doc.setFont("helvetica", "italic"); doc.setFontSize(6); doc.setTextColor(140, 185, 235);
  doc.text(`Emitido el ${hoy}`, ML + 7, HDR - 4);

  y = HDR + 4;

  /* ════════════════════════════════════════════════════════════
     § 2 · DATOS DEL CLIENTE (franja compacta bajo el header)
  ════════════════════════════════════════════════════════════ */
  const tieneCliente = cliente.nombre || cliente.telefono || cliente.email;
  if (tieneCliente) {
    const fields = [
      { label: "CLIENTE",   value: cliente.nombre },
      { label: "TELÉFONO",  value: cliente.telefono },
      { label: "EMAIL",     value: cliente.email },
    ].filter(f => f.value);

    const STRIP_H = 11;
    fillRect(doc, ML, y, CW, STRIP_H, [236, 242, 255], 3);
    outlineRect(doc, ML, y, CW, STRIP_H, [195, 212, 245], 3, 0.4);
    fillRect(doc, ML, y, 3, STRIP_H, BLUE, 3);
    fillRect(doc, ML, y + 3, 3, STRIP_H - 3, BLUE);

    const fieldW = CW / fields.length;
    fields.forEach((f, i) => {
      const fx = ML + i * fieldW + (i === 0 ? 8 : 5);
      if (i > 0) {
        doc.setDrawColor(...BORDER); doc.setLineWidth(0.25);
        doc.line(ML + i * fieldW, y + 2, ML + i * fieldW, y + STRIP_H - 2);
      }
      doc.setFont("helvetica", "bold"); doc.setFontSize(5.5); doc.setTextColor(110, 130, 175);
      doc.text(f.label!, fx, y + 4);
      doc.setFont("helvetica", "bold"); doc.setFontSize(7.8); doc.setTextColor(...NAVY);
      const val = doc.splitTextToSize(f.value!, fieldW - 8)[0] as string;
      doc.text(val, fx, y + 9);
    });

    y += STRIP_H + 3;
  }

  /* ════════════════════════════════════════════════════════════
     § 3 · PRODUCTO
  ════════════════════════════════════════════════════════════ */
  ensureSpace(30);
  const PROD_H = 24;

  fillRect(doc, ML + 0.4, y + 0.4, CW, PROD_H, [215, 224, 240], 4);
  fillRect(doc, ML, y, CW, PROD_H, WHITE, 4);
  outlineRect(doc, ML, y, CW, PROD_H, BORDER, 4, 0.3);
  fillRect(doc, ML, y, 5, PROD_H, NAVY, 4);
  fillRect(doc, ML, y + 4, 5, PROD_H - 4, NAVY);

  // Nombre
  doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.setTextColor(...NAVY);
  doc.text(quote.producto, ML + 10, y + 8.5);

  // Badge
  const bw = doc.getTextWidth(info.badge) + 8;
  fillRect(doc, ML + 10, y + 10.5, bw, 6, [0, 130, 200], 3);
  doc.setFont("helvetica", "bold"); doc.setFontSize(6); doc.setTextColor(...WHITE);
  doc.text(info.badge, ML + 14, y + 14.8);

  // Ubicación
  doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(...BLUE);
  doc.text(`${quote.provincia}  ·  Zona ${quote.zona}`, ML + CW - 6, y + 8.5, { align: "right" });

  // Descripción (máx 2 líneas, font reducido)
  doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(70, 82, 100);
  const descArr = doc.splitTextToSize(info.desc, CW - 18) as string[];
  doc.text(descArr.slice(0, 2), ML + 10, y + 20);

  y += PROD_H + 3;

  /* ════════════════════════════════════════════════════════════
     § 4 · COBERTURAS INCLUIDAS
  ════════════════════════════════════════════════════════════ */
  ensureSpace(16);
  sectionLabel(doc, "COBERTURAS INCLUIDAS", ML, y + 1);
  y += 4;

  const COLS  = 3;
  const GAP   = 3;
  const COL_W = (CW - GAP * (COLS - 1)) / COLS;   // ≈ 58.7 mm
  const COV   = info.coverages;
  const ROWS  = Math.ceil(COV.length / COLS);

  for (let row = 0; row < ROWS; row++) {
    const rowItems = COV.slice(row * COLS, row * COLS + COLS);
    const textW    = COL_W - 11;    // más ancho que antes para menos wrapping
    const maxLines = rowItems.reduce((acc, item) => {
      doc.setFontSize(6.5);          // medir con el font que se usará
      const lines = doc.splitTextToSize(item.title, textW) as string[];
      return Math.max(acc, lines.length);
    }, 1);
    const cellH = Math.max(maxLines * 3.6 + 7, 9.5);  // más compacto que antes

    ensureSpace(cellH + 2);

    rowItems.forEach((item, col) => {
      const cx = ML + col * (COL_W + GAP);
      const isLast = item.icon === "+";

      const cardBg: [number,number,number] = isLast ? [230, 242, 255] : MIST;
      fillRect(doc,    cx, y, COL_W, cellH, cardBg, 2.5);
      outlineRect(doc, cx, y, COL_W, cellH, isLast ? [160, 200, 240] : BORDER, 2.5, 0.3);

      // Icono (ligeramente más pequeño: 5×5mm)
      const iconSz = 5;
      const iconX  = cx + 3;
      const iconY  = y + (cellH - iconSz) / 2;
      const iconBg: [number,number,number] = isLast ? BLUE : NAVY;
      fillRect(doc, iconX, iconY, iconSz, iconSz, iconBg, 1.5);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(item.icon.length === 1 ? 5.5 : 4);
      doc.setTextColor(...WHITE);
      const letterW = doc.getTextWidth(item.icon);
      doc.text(item.icon, iconX + (iconSz - letterW) / 2, iconY + iconSz - 1.2);

      // Texto cobertura
      doc.setFontSize(6.5);
      const titleLines = doc.splitTextToSize(item.title, textW) as string[];
      const textStartY = y + (cellH - titleLines.length * 3.6) / 2 + 3.5;
      doc.setFont("helvetica", isLast ? "bolditalic" : "normal");
      doc.setTextColor(...(isLast ? BLUE : SLATE));
      doc.text(titleLines, cx + 10, textStartY);
    });

    y += cellH + 1.5;
  }

  y += 3;

  /* ════════════════════════════════════════════════════════════
     § 5 · DESGLOSE POR ASEGURADO
  ════════════════════════════════════════════════════════════ */
  ensureSpace(35);
  sectionLabel(doc, "DESGLOSE POR ASEGURADO", ML, y + 1);
  y += 3;

  autoTable(doc, {
    startY: y,
    margin: { left: ML, right: MR },
    head: [["#", "Edad", "Tramo", "Prima mensual"]],
    body: quote.preciosPorPersona.map((p, i) => [
      String(i + 1),
      `${p.edad} años`,
      p.banda,
      p.precio !== null ? fmt(p.precio) : "N/D",
    ]),
    headStyles: {
      fillColor: NAVY,
      textColor: WHITE,
      fontSize: 7.2,
      fontStyle: "bold",
      halign: "left",
      cellPadding: { top: 2.5, bottom: 2.5, left: 4, right: 4 },
    },
    bodyStyles: {
      fontSize: 7.8,
      textColor: SLATE,
      cellPadding: { top: 2.5, bottom: 2.5, left: 4, right: 4 },
    },
    columnStyles: {
      0: { cellWidth: 14, halign: "center" },
      1: { cellWidth: 28, halign: "center" },
      2: { cellWidth: 36, halign: "center" },
      3: { cellWidth: 46, halign: "right", fontStyle: "bold" },
    },
    alternateRowStyles: { fillColor: [247, 250, 255] },
    tableWidth: CW,
    theme: "grid",
    didDrawPage: () => { y = 16; },
  });

  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 5;

  /* ════════════════════════════════════════════════════════════
     § 6 · RESUMEN DE PRECIOS
  ════════════════════════════════════════════════════════════ */
  const hayDesc = quote.ratioAuto > 0 || quote.pctComercialEfectivo > 0;

  const nDescLines = (quote.ratioAuto > 0 ? 1 : 0) + (quote.pctComercialEfectivo > 0 ? 1 : 0);
  const topCardH   = 8 + (nDescLines * 7) + 4;   // más compacto: 8 base, 7/línea, 4 padding

  ensureSpace(topCardH + 25);
  sectionLabel(doc, "RESUMEN DE PRECIOS", ML, y + 1);
  y += 4;

  /* ─── Tarjeta desglose ─── */
  fillRect(doc, ML, y, CW, topCardH, [248, 250, 255], 3);
  outlineRect(doc, ML, y, CW, topCardH, BORDER, 3, 0.3);
  fillRect(doc, ML, y, 3.5, topCardH, NAVY, 3);
  fillRect(doc, ML, y + 3, 3.5, topCardH - 3, NAVY);

  const LX = ML + 11, RX = ML + CW - 8;
  let lY = y + 8;

  // Subtotal
  doc.setFont("helvetica", "normal"); doc.setFontSize(7.8); doc.setTextColor(120, 130, 148);
  doc.text("Subtotal bruto", LX, lY);
  doc.text(fmt(quote.subtotal), RX, lY, { align: "right" });

  if (quote.ratioAuto > 0) {
    lY += 7;
    fillRect(doc, LX, lY - 4.5, 2.5, 5, GREEN, 1);
    doc.setFont("helvetica", "bold"); doc.setFontSize(7.8); doc.setTextColor(...GREEN);
    doc.text(quote.labelDescAuto, LX + 5, lY);
    doc.text(`- ${fmt(quote.descAuto)}`, RX, lY, { align: "right" });
  }

  if (quote.pctComercialEfectivo > 0) {
    lY += 7;
    fillRect(doc, LX, lY - 4.5, 2.5, 5, BLUE, 1);
    doc.setFont("helvetica", "bold"); doc.setFontSize(7.8); doc.setTextColor(...BLUE);
    doc.text(`Descuento comercial  ${quote.pctComercialEfectivo} %`, LX + 5, lY);
    doc.text(`- ${fmt(quote.descComercial)}`, RX, lY, { align: "right" });
  }

  y += topCardH + 2;

  /* ─── Caja TOTAL navy ─── */
  const totH = hayDesc ? 21 : 14;
  fillRect(doc, ML, y, CW, totH, NAVY, 3);
  fillRect(doc, ML, y + totH - 5, CW, 5, NAVY, 0);     // cuadrar esquinas inferiores
  fillRect(doc, ML, y + totH - 2, CW, 2, MAGENTA, 0);  // remate magenta

  doc.setFont("helvetica", "bold"); doc.setFontSize(10.5); doc.setTextColor(...WHITE);
  doc.text("TOTAL MENSUAL", LX - 2, y + 9);

  doc.setFont("helvetica", "bold"); doc.setFontSize(19); doc.setTextColor(...WHITE);
  doc.text(fmt(quote.total), RX, y + 12, { align: "right" });
  doc.setFont("helvetica", "normal"); doc.setFontSize(6); doc.setTextColor(175, 210, 248);
  doc.text("al mes", RX, y + 15.5, { align: "right" });

  if (hayDesc) {
    const saving     = quote.subtotal - quote.total;
    const savingStr  = fmt(saving);

    // Medir las dos partes del texto por separado
    doc.setFont("helvetica", "bold"); doc.setFontSize(5.5);
    const lblW = doc.getTextWidth("AHORRO MENSUAL");
    doc.setFont("helvetica", "bold"); doc.setFontSize(9);
    const amtW = doc.getTextWidth(savingStr);

    // Dimensiones de la píldora
    const padX  = 4;
    const sepW  = 4;   // espacio entre etiqueta y cantidad
    const pillW = padX + lblW + sepW + amtW + padX;
    const pillH = 7;
    const pillX = LX - 2;
    const pillY = y + 12.5;

    // Fondo verde con esquinas bien redondeadas
    fillRect(doc, pillX, pillY, pillW, pillH, [22, 150, 68], 3.5);

    // Línea separadora vertical blanca tenue entre etiqueta y cantidad
    const sepX = pillX + padX + lblW + sepW * 0.5;
    doc.setDrawColor(255, 255, 255); doc.setLineWidth(0.3);
    doc.line(sepX, pillY + 1.5, sepX, pillY + pillH - 1.5);

    // Etiqueta "AHORRO MENSUAL" pequeña
    doc.setFont("helvetica", "bold"); doc.setFontSize(5.5); doc.setTextColor(...WHITE);
    doc.text("AHORRO MENSUAL", pillX + padX, pillY + pillH - 2.2);

    // Importe más grande y destacado
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(...WHITE);
    doc.text(savingStr, pillX + padX + lblW + sepW, pillY + pillH - 2);
  }

  y += totH + 5;

  /* ════════════════════════════════════════════════════════════
     § 7 · CAMPAÑA SEGURÍSIMOS
  ════════════════════════════════════════════════════════════ */
  if (!quote.isSeniors && quote.totalPuntos > 0) {
    ensureSpace(26);
    const camH = 22;

    fillRect(doc, ML, y, CW, camH, AMBER_BG, 4);
    fillRect(doc, ML, y, CW, 8, [248, 235, 185], 4);
    fillRect(doc, ML, y + 4, CW, 4, [248, 235, 185]);
    outlineRect(doc, ML, y, CW, camH, [200, 145, 20], 4, 0.4);
    fillRect(doc, ML, y, 4, camH, AMBER, 4);
    fillRect(doc, ML, y + 4, 4, camH - 4, AMBER);

    doc.setFont("helvetica", "bold"); doc.setFontSize(6.2); doc.setTextColor(115, 68, 0);
    doc.text("CAMPANA SEGURISIMOS 2026", ML + 10, y + 5.5);
    doc.setDrawColor(200, 145, 20); doc.setLineWidth(0.2);
    doc.line(ML + 10, y + 7, ML + CW - 8, y + 7);

    const nAseg = quote.preciosPorPersona.length;
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(95, 60, 0);
    doc.text(
      `${quote.puntosXAseg.toLocaleString("es-ES")} pts/asegurado  x  ${nAseg} asegurado${nAseg > 1 ? "s" : ""}`,
      ML + 10, y + 13,
    );

    doc.setFont("helvetica", "bold"); doc.setFontSize(6); doc.setTextColor(160, 110, 30);
    doc.text("PUNTOS CONSEGUIDOS", RX, y + 13, { align: "right" });
    doc.setFont("helvetica", "bold"); doc.setFontSize(15); doc.setTextColor(120, 68, 0);
    doc.text(`${quote.totalPuntos.toLocaleString("es-ES")} puntos`, RX, y + 20, { align: "right" });

    y += camH + 5;
  }

  if (quote.isSeniors && quote.totalAbono > 0) {
    ensureSpace(26);
    const camH = 22;

    fillRect(doc, ML, y, CW, camH, GREEN_BG, 4);
    fillRect(doc, ML, y, CW, 8, [215, 245, 220], 4);
    fillRect(doc, ML, y + 4, CW, 4, [215, 245, 220]);
    outlineRect(doc, ML, y, CW, camH, [80, 160, 90], 4, 0.4);
    fillRect(doc, ML, y, 4, camH, GREEN, 4);
    fillRect(doc, ML, y + 4, 4, camH - 4, GREEN);

    doc.setFont("helvetica", "bold"); doc.setFontSize(6.2); doc.setTextColor(18, 80, 38);
    doc.text("CAMPANA SEGURISIMOS 2026", ML + 10, y + 5.5);
    doc.setDrawColor(80, 160, 90); doc.setLineWidth(0.2);
    doc.line(ML + 10, y + 7, ML + CW - 8, y + 7);

    const nAseg2 = quote.preciosPorPersona.length;
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(18, 75, 38);
    doc.text(
      `${quote.abonoXAseg} EUR/asegurado  x  ${nAseg2} asegurado${nAseg2 > 1 ? "s" : ""}`,
      ML + 10, y + 13,
    );

    doc.setFont("helvetica", "bold"); doc.setFontSize(6); doc.setTextColor(14, 100, 50);
    doc.text("IMPORTE A ABONAR", RX, y + 13, { align: "right" });
    doc.setFont("helvetica", "bold"); doc.setFontSize(15); doc.setTextColor(12, 90, 45);
    doc.text(`${quote.totalAbono} EUR de abono`, RX, y + 20, { align: "right" });

    y += camH + 5;
  }

  /* ════════════════════════════════════════════════════════════
     § 8 · FOOTER EN TODAS LAS PÁGINAS + DESCARGA
  ════════════════════════════════════════════════════════════ */
  drawFooters();

  const slug    = quote.producto.replace(/\s+/g, "-").toLowerCase();
  const client  = cliente.nombre ? `_${cliente.nombre.replace(/\s+/g, "-").toLowerCase()}` : "";
  const dateStr = new Date().toISOString().slice(0, 10);
  doc.save(`presupuesto-adeslas_${slug}${client}_${dateStr}.pdf`);
}
