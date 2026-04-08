/* ───────── Pricing data for Adeslas Tarificador ─────────
   Source: TARIFAS PARTICULARES Y PYMES 2026
   Prices are monthly (primas netas mensuales).
   Zones: [Zona1, Zona2, Zona3, Zona4, Zona5, Zona6]
      Zona 1: Extremadura, Murcia y Galicia
      Zona 2: Canarias, Ceuta y Melilla
      Zona 3: Andalucía, Cantabria, Comunidad Valenciana y La Rioja
      Zona 4: Castilla-La Mancha, Madrid y Aragón
      Zona 5: Cataluña (excepto Barcelona) y Baleares
      Zona 6: Barcelona y Castilla y León
*/

export type ZonePrices = [number, number, number, number, number, number];

export interface ProductPricing {
  id: string;
  name: string;
  slug: string;
  maxAge: number;
  /** "individual" = age 0..70+, "range" = age bands */
  ageType: "individual" | "range";
  /** key = age band (string), value = [Z1,Z2,Z3,Z4,Z5,Z6] monthly prices */
  prices: Record<string, ZonePrices>;
}

/* ── Province → Zone mapping ── */
export const provinceToZone: Record<string, number> = {
  // ZONA 1: Extremadura, Murcia, Galicia
  "Badajoz":               1,
  "Cáceres":               1,
  "Murcia":                1,
  "A Coruña":              1,
  "Lugo":                  1,
  "Ourense":               1,
  "Pontevedra":            1,

  // ZONA 2: Canarias, Ceuta, Melilla
  "Las Palmas":            2,
  "Santa Cruz de Tenerife": 2,
  "Ceuta":                 2,
  "Melilla":               2,

  // ZONA 3: Andalucía, Cantabria, C. Valenciana, La Rioja
  "Almería":               3,
  "Cádiz":                 3,
  "Córdoba":               3,
  "Granada":               3,
  "Huelva":                3,
  "Jaén":                  3,
  "Málaga":                3,
  "Sevilla":               3,
  "Cantabria":             3,
  "Alicante":              3,
  "Castellón":             3,
  "Valencia":              3,
  "La Rioja":              3,

  // ZONA 4: Castilla-La Mancha, Madrid, Aragón
  "Albacete":              4,
  "Ciudad Real":           4,
  "Cuenca":                4,
  "Guadalajara":           4,
  "Toledo":                4,
  "Madrid":                4,
  "Huesca":                4,
  "Teruel":                4,
  "Zaragoza":              4,

  // ZONA 5: Cataluña (excl. Barcelona), Baleares
  "Girona":                5,
  "Lleida":                5,
  "Tarragona":             5,
  "Ibiza":                 5,
  "Mallorca":              5,
  "Menorca":               5,

  // ZONA 6: Barcelona, Castilla y León
  "Barcelona":             6,
  "Ávila":                 6,
  "Burgos":                6,
  "León":                  6,
  "Palencia":              6,
  "Salamanca":             6,
  "Segovia":               6,
  "Soria":                 6,
  "Valladolid":            6,
  "Zamora":                6,
};

export const provinces: string[] = [
  "A Coruña",
  "Albacete",
  "Alicante",
  "Almería",
  "Ávila",
  "Badajoz",
  "Barcelona",
  "Burgos",
  "Cáceres",
  "Cádiz",
  "Cantabria",
  "Castellón",
  "Ceuta",
  "Ciudad Real",
  "Córdoba",
  "Cuenca",
  "Girona",
  "Granada",
  "Guadalajara",
  "Huelva",
  "Huesca",
  "Ibiza",
  "Jaén",
  "La Rioja",
  "Las Palmas",
  "León",
  "Lleida",
  "Lugo",
  "Madrid",
  "Málaga",
  "Mallorca",
  "Melilla",
  "Menorca",
  "Murcia",
  "Ourense",
  "Palencia",
  "Pontevedra",
  "Salamanca",
  "Santa Cruz de Tenerife",
  "Segovia",
  "Sevilla",
  "Soria",
  "Tarragona",
  "Teruel",
  "Toledo",
  "Valencia",
  "Valladolid",
  "Zamora",
  "Zaragoza",
];

export const products: ProductPricing[] = [
  /* ── ADESLAS GO ── */
  {
    id: "ya",
    name: "Adeslas GO",
    slug: "/adeslas-go",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-54":  [21,    21.50, 22,    22.50, 23,    23.50],
      "55-69": [37.50, 39,    39.50, 40,    41,    41.50],
      "≥70":   [50,    52,    53,    53.50, 54,    54.50],
    },
  },

  /* ── ADESLAS PLENA VITAL ── */
  {
    id: "esencial",
    name: "Adeslas Plena Vital",
    slug: "/adeslas-plena-vital",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-24":  [38,    39,    39.50, 40,     41,    42.50],
      "25-44": [50,    50.50, 51,    52,     53.50, 54],
      "45-54": [61.50, 62,    63,    64,     66,    66.50],
      "55-59": [94,    95,    96.50, 99,     101,   103],
      "60-64": [117,   121,   124,   125.50, 126,   127],
      "65-69": [156,   163,   167,   167.50, 168,   169],
      "≥70":   [168,   176,   179,   180,    181,   182],
    },
  },

  /* ── ADESLAS PLENA VITAL TOTAL ── */
  {
    id: "completaPlus",
    name: "Adeslas Plena Vital Total",
    slug: "/adeslas-plena-vital-total",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-24":  [48.50, 49,    50,    50.50,  52,    53],
      "25-44": [59.50, 61,    62,    62.50,  63,    65],
      "45-54": [72.50, 73.50, 75,    75.50,  77,    78.50],
      "55-59": [110,   112,   114,   114.50, 115,   118],
      "60-62": [132,   133,   137,   137.50, 140,   142],
      "≥63":   [196,   201,   210,   210.50, 230,   235],
    },
  },

  /* ── ADESLAS PLENA PLUS ── */
  {
    id: "completaPlusPlus",
    name: "Adeslas Plena Plus",
    slug: "/adeslas-plena-plus",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-24":  [62,    64,    64,    66,    67,    69],
      "25-44": [72,    75,    76,    77,    79,    79],
      "45-54": [92,    94,    96,    99,    100,   105],
      "55-59": [149,   155,   159,   164,   166,   167],
      "60-64": [175,   181,   185,   196,   205,   207],
      "65-69": [239,   255,   259,   275,   289,   291],
      "≥70":   [255,   259,   265,   279,   295,   297],
    },
  },

  /* ── ADESLAS PLENA TOTAL ── */
  {
    id: "completa",
    name: "Adeslas Plena Total",
    slug: "/adeslas-plena-total",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-24":  [83,    85,    86,    87,    88.50,  89.50],
      "25-44": [99,    103,   104,   106,   108.50, 111],
      "45-54": [121,   124,   127,   131,   135.50, 137],
      "55-59": [169,   176,   179,   181,   189,    192],
      "60-62": [207,   217,   223,   227,   243,    247],
      "≥63":   [273,   284,   288,   294,   315,    318],
    },
  },

  /* ── ADESLAS PLENA EXTRA ── */
  {
    id: "reembolso",
    name: "Adeslas Plena Extra",
    slug: "/adeslas-extra-150",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-24":  [90,    93,    94,    102,   102.50, 104],
      "25-44": [106,   110,   111,   120,   120.50, 122],
      "45-54": [112,   118,   119,   129,   130,    132],
      "55-59": [174,   180,   185,   198,   198.50, 203],
      "60-64": [206,   210,   215,   228,   228.50, 233],
      "65-69": [293,   301,   308,   320,   321,    330],
      "≥70":   [304,   309,   319,   329,   330,    340],
    },
  },

  /* ── ADESLAS PLENA (Plena básico) ── */
  {
    id: "plena",
    name: "Adeslas Plena",
    slug: "/seguro-salud/adeslas-plena-vital/",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-24":  [50,    51,    52,    53,    54,    55],
      "25-44": [60,    62,    63,    64,    65,    66],
      "45-54": [72,    73,    74,    75,    78,    79],
      "55-59": [119,   125,   127,   129,   132,   134],
      "60-64": [147,   152,   155,   158,   164,   167],
      "65-69": [198,   207,   210,   215,   228,   231],
      "≥70":   [215,   225,   228,   234,   247,   250],
    },
  },

  /* ── ADESLAS NEGOCIOS NIF (Autónomos) ── */
  {
    id: "negocios-nif",
    name: "Adeslas Negocios NIF",
    slug: "/seguro-salud/autonomos/",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-24":  [55.50, 56.50, 57,    59,    61,    61.50],
      "25-44": [61,    63.50, 64.50, 65.50, 66.50, 68],
      "45-54": [79,    83,    84,    86.50, 88.50, 89.50],
      "55-59": [123,   127,   129,   134,   139,   139.50],
      "60-64": [153,   159,   160,   170,   175,   176],
      "65-69": [235,   238,   240,   249,   259,   264],
      "≥70":   [239,   246,   249,   261,   265,   275],
    },
  },

  /* ── ADESLAS SENIORS ── */
  {
    id: "seniors",
    name: "Adeslas Seniors",
    slug: "/seguro-salud/adeslas-seniors/",
    maxAge: 84,
    ageType: "range",
    prices: {
      "55-59": [67.50, 70,    71,    72,    73,    74],
      "60-64": [86,    88,    89.50, 92,    93,    94],
      "65-69": [103,   105,   106,   111,   113,   115],
      "70-74": [127,   130,   133,   140,   145,   150],
      "75-79": [157,   163,   168,   178,   188,   196],
      "≥80":   [192,   201,   208,   221,   234,   246],
    },
  },

  /* ── ADESLAS SENIORS TOTAL (Plena Total Seniors) ── */
  {
    id: "seniors-total",
    name: "Adeslas Seniors Total",
    slug: "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/",
    maxAge: 84,
    ageType: "range",
    prices: {
      "63-64": [101,   104,   105,   110,   113,   116],
      "65-69": [138,   142,   144,   145,   151.50, 155],
      "70-74": [172,   176,   180,   184,   190,   195],
      "75-79": [213,   220,   225,   232,   240,   246],
      "≥80":   [259,   269,   275,   285,   296,   305],
    },
  },
];

export const dentalPricing = {
  asegurado: {
    "1": 9.45,
    "2": 17.4,
    "3": 21.65,
    "4": 25.9,
    "5": 29.3,
    "6": 32.7,
    "7": 36.1,
    "8": 39.5,
    "9": 42.9,
    "10": 46.3,
  },
  noAsegurado: {
    "1": 11.8,
    "2": 20.5,
    "3": 25.5,
    "4": 30.5,
    "5": 34.5,
    "6": 38.5,
    "7": 42.5,
    "8": 46.5,
    "9": 50.5,
    "10": 54.5,
  },
};

export const extResidentsPricing: Record<string, [number, number, number, number]> = {
  "0": [225.76, 79.02, 70.55, 65.61],
  "5": [163.2, 57.12, 51.0, 47.43],
  "10": [155.84, 54.54, 48.7, 45.29],
  "15": [162.24, 56.78, 50.7, 47.15],
  "20": [167.74, 57.41, 53.05, 47.33],
  "25": [175.35, 61.37, 54.8, 50.96],
  "30": [189.6, 66.36, 59.25, 55.1],
  "35": [198.4, 69.44, 62.0, 57.66],
  "40": [212.64, 74.42, 66.45, 61.8],
  "45": [220.17, 77.06, 68.8, 63.99],
  "50": [243.84, 85.34, 76.2, 70.87],
  "55": [305.28, 106.85, 95.4, 88.72],
  "60": [395.52, 138.43, 123.6, 114.95],
  "65": [553.76, 193.82, 173.05, 160.94],
  "70": [675.68, 236.49, 211.15, 196.37],
};

export const extStudentsPricing: Record<string, [number, number, number, number]> = {
  "0-35": [38.0, 38.0, 38.0, 38.0],
  "36": [198.72, 69.55, 62.1, 57.75],
  "37": [199.36, 69.78, 62.3, 57.94],
  "38": [202.7, 70.95, 63.35, 58.91],
  "39": [204.0, 71.4, 63.75, 59.29],
  "40": [212.64, 74.42, 66.45, 61.8],
  "45": [220.17, 77.06, 68.8, 63.99],
  "50": [243.84, 85.34, 76.2, 70.87],
  "55": [305.28, 106.85, 95.4, 88.72],
  "60": [395.52, 138.43, 123.6, 114.95],
  "65": [553.76, 193.82, 173.05, 160.94],
  "70": [675.68, 236.49, 211.15, 196.37],
};

/** Get the price for a product given age and zone (1-6) */
export function getPrice(product: ProductPricing, age: number, zone: number): number | null {
  const zoneIdx = zone - 1;
  if (zoneIdx < 0 || zoneIdx > 5) return null;

  if (product.ageType === "individual") {
    // Individual age lookup: exact age or ≥71
    const key = age >= 71 ? "≥71" : String(age);
    const row = product.prices[key];
    return row ? row[zoneIdx] : null;
  }

  // Range-based lookup
  const ranges = Object.keys(product.prices);
  for (const rangeKey of ranges) {
    if (rangeKey.startsWith("≥")) {
      const minAge = parseInt(rangeKey.replace("≥", ""), 10);
      if (age >= minAge) return product.prices[rangeKey][zoneIdx];
    } else if (rangeKey.includes("-")) {
      const [lo, hi] = rangeKey.split("-").map(Number);
      if (age >= lo && age <= hi) return product.prices[rangeKey][zoneIdx];
    }
  }
  return null;
}

/** Get zone number from province name */
export function getZoneFromProvince(province: string): number {
  return provinceToZone[province] ?? 3; // Default zona 3 (Andalucía/Valencia/Cantabria)
}

/** Get dental monthly price */
export function getDentalPrice(members: number, isAseguradoSalud: boolean): number | null {
  const key = String(Math.min(members, 10));
  const table = isAseguradoSalud ? dentalPricing.asegurado : dentalPricing.noAsegurado;
  return table[key] ?? null;
}

/** Get all product prices for comparison (returns sorted by price) */
export function getAllPrices(age: number, zone: number): { product: ProductPricing; price: number }[] {
  return products
    .map((p) => ({ product: p, price: getPrice(p, age, zone) }))
    .filter((r): r is { product: ProductPricing; price: number } => r.price !== null)
    .sort((a, b) => a.price - b.price);
}
