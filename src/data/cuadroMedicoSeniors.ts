/**
 * Cuadro médico Adeslas Seniors 2026 — datos por provincia.
 *
 * Fuente: cuadros médicos oficiales "Adeslas SENIORS · Cuadro Médico General 2026"
 * (PDF por provincia). Los PDF viven en /public/cuadros-medicos/seniors/ y heredan
 * el header `X-Robots-Tag: noindex` de `/cuadros-medicos/:file*` (next.config.js):
 * la página indexable es /cuadro-medico/seniors/.
 *
 * `urgencias`: centros del apartado "Urgencias generales hospitalarias" de cada PDF
 * (orden y nombres tal como figuran en el cuadro). Al publicar una nueva edición,
 * revisar esta lista contra el PDF correspondiente.
 *
 * Autor: Juan Carlos Díaz — Convertiam.
 */

export interface ProvinciaSeniors {
  nombre: string;
  slug: string;
  paginas: number;
  sizeMb: string;
  urgencias: string[];
}

export const SENIORS_PDF_DIR = "/cuadros-medicos/seniors";

export const seniorsPdfUrl = (slug: string) =>
  `${SENIORS_PDF_DIR}/cuadro-medico-adeslas-seniors-${slug}-2026.pdf`;

export const PROVINCIAS_SENIORS: ProvinciaSeniors[] = [
  {
    nombre: "Albacete",
    slug: "albacete",
    paginas: 92,
    sizeMb: "0,6",
    urgencias: ["Hospital Quirónsalud Santa Cristina", "Hospital Quirónsalud (Pl. Madroño)"],
  },
  {
    nombre: "Alicante",
    slug: "alicante",
    paginas: 142,
    sizeMb: "0,7",
    urgencias: [
      "Centro Médico Denia",
      "Hospital HCB Denia",
      "Hospital HLA San Carlos de Denia",
      "Hospital IMED Elche",
      "Hospital IMED Levante",
      "Hospital IMED San Jorge",
      "Hospital Quirónsalud Torrevieja",
      "Hospital Vithas Alicante",
      "Hospital Vithas Medimar",
    ],
  },
  {
    nombre: "Ávila",
    slug: "avila",
    paginas: 76,
    sizeMb: "0,5",
    urgencias: ["Hospital Santa Teresa"],
  },
  {
    nombre: "Barcelona",
    slug: "barcelona",
    paginas: 346,
    sizeMb: "1,6",
    urgencias: [
      "Clínica Corachán",
      "Clínica Nuestra Señora del Remei",
      "Clínica Sagrada Familia",
      "Clínica Tres Torres",
      "HM Nou Delfos",
      "HM Sant Jordi",
      "Hospital Quirón",
      "Hospital Universitari Sagrat Cor",
    ],
  },
  {
    nombre: "Girona",
    slug: "girona",
    paginas: 134,
    sizeMb: "0,7",
    urgencias: [
      "Clínica Bofill (Girona)",
      "Clínica Girona (Girona)",
      "Clínica Salus Infirmorum (Banyoles)",
      "Clínica Santa Creu (Figueres)",
    ],
  },
  {
    nombre: "Islas Baleares",
    slug: "islas-baleares",
    paginas: 128,
    sizeMb: "0,7",
    urgencias: [
      "Clínica Juaneda (Palma)",
      "Clínica Rotger (Palma)",
      "Hospital Juaneda Miramar (Palma)",
      "Hospital Quirónsalud Palmaplanas (Palma)",
      "Hospital Juaneda Muro (Mallorca)",
      "Hospital Parque Llevant (Mallorca)",
      "Hospital Juaneda Ciutadella (Menorca)",
      "Clínica Juaneda Mao (Menorca)",
      "Policlínica Nuestra Señora del Rosario (Ibiza)",
    ],
  },
  {
    nombre: "León",
    slug: "leon",
    paginas: 82,
    sizeMb: "0,6",
    urgencias: [
      "Clínica Ponferrada",
      "HM Regla",
      "HM San Francisco",
      "Real Fundación Hospital de la Reina",
    ],
  },
  {
    nombre: "Madrid",
    slug: "madrid",
    paginas: 362,
    sizeMb: "1,5",
    urgencias: [
      "HM Vallés",
      "Hospital Nuestra Señora del Rosario",
      "Hospital de Madrid",
      "Hospital Los Madroños",
      "Hospital Madrid Torrelodones",
      "Hospital San Rafael",
      "Hospital Sur",
      "Hospital Viamed Santa Elena",
      "Hospital Vithas La Milagrosa",
      "Hospital Vithas Madrid Aravaca",
      "Hospital Vithas Nuestra Señora de América",
    ],
  },
  {
    nombre: "Málaga",
    slug: "malaga",
    paginas: 170,
    sizeMb: "0,8",
    urgencias: ["Hospital Quirónsalud Málaga", "Hospital Recoletas Salud Marbella"],
  },
  {
    nombre: "Sevilla",
    slug: "sevilla",
    paginas: 142,
    sizeMb: "0,8",
    urgencias: [
      "Hospital Viamed Fátima",
      "Hospital Quirónsalud Sagrado Corazón",
      "Hospital Recoletas Salud Capuchinos",
      "Hospital San Agustín",
      "Hospital Vithas Sevilla",
    ],
  },
  {
    nombre: "Valladolid",
    slug: "valladolid",
    paginas: 94,
    sizeMb: "0,6",
    urgencias: [
      "Hospital Sagrado Corazón de Jesús",
      "Recoletas Campo Grande",
      "Recoletas Felipe II",
    ],
  },
  {
    nombre: "Zaragoza",
    slug: "zaragoza",
    paginas: 98,
    sizeMb: "0,6",
    urgencias: [
      "Clínica Montpellier",
      "Hospital HC Miraflores",
      "Hospital Quirónsalud Zaragoza",
      "Hospital Viamed Montecanal",
    ],
  },
];

/** Contenido común de cada PDF (índice general del cuadro Seniors 2026). */
export const SECCIONES_CUADRO_SENIORS = [
  { titulo: "Oficinas de información", texto: "Delegaciones y oficinas de atención al cliente de Adeslas en tu provincia, con dirección y horario." },
  { titulo: "Médicos asesores de salud", texto: "Asesores médicos que te orientan sobre tu proceso asistencial, también en remoto." },
  { titulo: "Servicios de urgencia", texto: "Urgencias hospitalarias generales y por especialidad, urgencias ambulatorias, a domicilio y ambulancias." },
  { titulo: "Especialistas en la capital", texto: "Medicina familiar, enfermería y más de 40 especialidades médicas y quirúrgicas, ordenadas por especialidad." },
  { titulo: "Pruebas diagnósticas", texto: "Análisis clínicos, radiología, resonancia magnética, TAC, densitometría ósea, pruebas cardiovasculares y ecografías." },
  { titulo: "Tratamientos especiales", texto: "Oxigenoterapia, unidad del tratamiento del dolor, fisioterapia, rehabilitación y psicología, entre otros." },
  { titulo: "Centros hospitalarios", texto: "Hospitales y clínicas concertados de la provincia para ingresos y cirugía." },
  { titulo: "Poblaciones y asistencia nacional", texto: "Médicos por municipio y centros concertados en el resto de España para cuando te desplazas." },
];

/** Servicios que precisan autorización previa (según el cuadro Seniors 2026). */
export const AUTORIZACION_PREVIA = [
  "Hospitalización y hospitalización de día",
  "Intervenciones quirúrgicas, también en cirugía ambulatoria",
  "TAC, resonancia magnética y Doppler transcraneal",
  "Medicina nuclear, incluidos PET-TAC y PET-RMN",
  "Estudios y tratamientos endoscópicos y neurofisiológicos",
  "Ergometría, Holter, hemodinámica y electrofisiología cardiaca",
  "Oxigenoterapia y terapias respiratorias domiciliarias",
  "Rehabilitación, fisioterapia y logopedia",
  "Oncología médica y radioterápica",
  "Unidad del dolor, psicoterapia y ambulancias programadas",
];
