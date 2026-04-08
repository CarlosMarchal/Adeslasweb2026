// Tarificador Adeslas 2026 - Datos de tarifas por producto y zona
export interface TarifaProducto {
  nombre: string;
  codigoHS?: number;
  rangos: {
    edad: string;
    zonas: {
      zona1: number;
      zona2: number;
      zona3: number;
      zona4: number;
      zona5: number;
      zona6: number;
    };
  }[];
}

export const TARIFAS_ADESLAS: Record<string, TarifaProducto> = {
  "plena-total": {
    nombre: "Adeslas Plena Total",
    codigoHS: 305,
    rangos: [
      { edad: "0-24", zonas: { zona1: 83, zona2: 85, zona3: 86, zona4: 87, zona5: 88.5, zona6: 89.5 } },
      { edad: "25-44", zonas: { zona1: 99, zona2: 103, zona3: 104, zona4: 106, zona5: 108.5, zona6: 111 } },
      { edad: "45-54", zonas: { zona1: 121, zona2: 124, zona3: 127, zona4: 131, zona5: 135.5, zona6: 137 } },
      { edad: "55-59", zonas: { zona1: 169, zona2: 176, zona3: 179, zona4: 181, zona5: 189, zona6: 192 } },
      { edad: "60-62", zonas: { zona1: 207, zona2: 217, zona3: 223, zona4: 227, zona5: 243, zona6: 247 } },
      { edad: "63+", zonas: { zona1: 273, zona2: 284, zona3: 288, zona4: 294, zona5: 315, zona6: 318 } },
    ],
  },
  "plena-vital-total": {
    nombre: "Adeslas Plena Vital Total",
    codigoHS: 304,
    rangos: [
      { edad: "0-24", zonas: { zona1: 48.5, zona2: 49, zona3: 50, zona4: 50.5, zona5: 52, zona6: 53 } },
      { edad: "25-44", zonas: { zona1: 59.5, zona2: 61, zona3: 62, zona4: 62.5, zona5: 63, zona6: 65 } },
      { edad: "45-54", zonas: { zona1: 72.5, zona2: 73.5, zona3: 75, zona4: 75.5, zona5: 77, zona6: 78.5 } },
      { edad: "55-59", zonas: { zona1: 110, zona2: 112, zona3: 114, zona4: 114.5, zona5: 115, zona6: 118 } },
      { edad: "60-62", zonas: { zona1: 132, zona2: 133, zona3: 137, zona4: 137.5, zona5: 140, zona6: 142 } },
      { edad: "63+", zonas: { zona1: 196, zona2: 201, zona3: 210, zona4: 210.5, zona5: 230, zona6: 235 } },
    ],
  },
  "plena-plus": {
    nombre: "Adeslas Plena Plus",
    codigoHS: 307,
    rangos: [
      { edad: "0-24", zonas: { zona1: 62, zona2: 64, zona3: 64, zona4: 66, zona5: 67, zona6: 69 } },
      { edad: "25-44", zonas: { zona1: 72, zona2: 75, zona3: 76, zona4: 77, zona5: 79, zona6: 79 } },
      { edad: "45-54", zonas: { zona1: 92, zona2: 94, zona3: 96, zona4: 99, zona5: 100, zona6: 105 } },
      { edad: "55-59", zonas: { zona1: 149, zona2: 155, zona3: 159, zona4: 164, zona5: 166, zona6: 167 } },
      { edad: "60-64", zonas: { zona1: 175, zona2: 181, zona3: 185, zona4: 196, zona5: 205, zona6: 207 } },
      { edad: "65-69", zonas: { zona1: 239, zona2: 255, zona3: 259, zona4: 275, zona5: 289, zona6: 291 } },
      { edad: "70+", zonas: { zona1: 255, zona2: 259, zona3: 265, zona4: 279, zona5: 295, zona6: 297 } },
    ],
  },
  "negocios-nif": {
    nombre: "Adeslas Negocios NIF",
    rangos: [
      { edad: "0-24", zonas: { zona1: 55.5, zona2: 56.5, zona3: 57, zona4: 59, zona5: 61, zona6: 61.5 } },
      { edad: "25-44", zonas: { zona1: 61, zona2: 63.5, zona3: 64.5, zona4: 65.5, zona5: 66.5, zona6: 68 } },
      { edad: "45-54", zonas: { zona1: 79, zona2: 83, zona3: 84, zona4: 86.5, zona5: 88.5, zona6: 89.5 } },
      { edad: "55-59", zonas: { zona1: 123, zona2: 127, zona3: 129, zona4: 134, zona5: 139, zona6: 139.5 } },
      { edad: "60-64", zonas: { zona1: 153, zona2: 159, zona3: 160, zona4: 170, zona5: 175, zona6: 176 } },
      { edad: "65-69", zonas: { zona1: 235, zona2: 238, zona3: 240, zona4: 249, zona5: 259, zona6: 264 } },
      { edad: "70+", zonas: { zona1: 239, zona2: 246, zona3: 249, zona4: 261, zona5: 265, zona6: 275 } },
    ],
  },
  "plena": {
    nombre: "Adeslas Plena",
    rangos: [
      { edad: "0-24", zonas: { zona1: 50, zona2: 51, zona3: 52, zona4: 53, zona5: 54, zona6: 55 } },
      { edad: "25-44", zonas: { zona1: 60, zona2: 62, zona3: 63, zona4: 64, zona5: 65, zona6: 66 } },
      { edad: "45-54", zonas: { zona1: 72, zona2: 73, zona3: 74, zona4: 75, zona5: 78, zona6: 79 } },
      { edad: "55-59", zonas: { zona1: 119, zona2: 125, zona3: 127, zona4: 129, zona5: 132, zona6: 134 } },
      { edad: "60-64", zonas: { zona1: 147, zona2: 152, zona3: 155, zona4: 158, zona5: 164, zona6: 167 } },
      { edad: "65-69", zonas: { zona1: 198, zona2: 207, zona3: 210, zona4: 215, zona5: 228, zona6: 231 } },
      { edad: "70+", zonas: { zona1: 215, zona2: 225, zona3: 228, zona4: 234, zona5: 247, zona6: 250 } },
    ],
  },
  "plena-vital": {
    nombre: "Adeslas Plena Vital",
    rangos: [
      { edad: "0-24", zonas: { zona1: 38, zona2: 39, zona3: 39.5, zona4: 40, zona5: 41, zona6: 42.5 } },
      { edad: "25-44", zonas: { zona1: 50, zona2: 50.5, zona3: 51, zona4: 52, zona5: 53.5, zona6: 54 } },
      { edad: "45-54", zonas: { zona1: 61.5, zona2: 62, zona3: 63, zona4: 64, zona5: 66, zona6: 66.5 } },
      { edad: "55-59", zonas: { zona1: 87, zona2: 90, zona3: 91.5, zona4: 93, zona5: 95, zona6: 96.5 } },
      { edad: "60-64", zonas: { zona1: 110, zona2: 111.5, zona3: 113.5, zona4: 116, zona5: 119, zona6: 121 } },
      { edad: "65-69", zonas: { zona1: 158, zona2: 165, zona3: 167, zona4: 173, zona5: 186, zona6: 190 } },
      { edad: "70+", zonas: { zona1: 173, zona2: 182, zona3: 185, zona4: 193, zona5: 207, zona6: 212 } },
    ],
  },
  "plena-extra": {
    nombre: "Adeslas Plena Extra",
    rangos: [
      { edad: "0-24", zonas: { zona1: 90, zona2: 93, zona3: 94, zona4: 102, zona5: 102.5, zona6: 104 } },
      { edad: "25-44", zonas: { zona1: 106, zona2: 110, zona3: 111, zona4: 120, zona5: 120.5, zona6: 122 } },
      { edad: "45-54", zonas: { zona1: 112, zona2: 118, zona3: 119, zona4: 129, zona5: 130, zona6: 132 } },
      { edad: "55-59", zonas: { zona1: 189, zona2: 198, zona3: 201, zona4: 216, zona5: 223, zona6: 227 } },
      { edad: "60-64", zonas: { zona1: 223, zona2: 235, zona3: 239, zona4: 256, zona5: 268, zona6: 274 } },
      { edad: "65-69", zonas: { zona1: 297, zona2: 313, zona3: 320, zona4: 346, zona5: 370, zona6: 377 } },
      { edad: "70+", zonas: { zona1: 333, zona2: 351, zona3: 359, zona4: 388, zona5: 415, zona6: 424 } },
    ],
  },
  "go": {
    nombre: "Adeslas Go",
    codigoHS: 303,
    rangos: [
      { edad: "0-54", zonas: { zona1: 21, zona2: 21.5, zona3: 22, zona4: 22.5, zona5: 23, zona6: 23.5 } },
      { edad: "55-69", zonas: { zona1: 37.5, zona2: 39, zona3: 39.5, zona4: 40, zona5: 41, zona6: 41.5 } },
      { edad: "70+", zonas: { zona1: 50, zona2: 52, zona3: 53, zona4: 53.5, zona5: 54, zona6: 54.5 } },
    ],
  },
  "plena-total-seniors": {
    nombre: "Adeslas Plena Total Seniors",
    rangos: [
      { edad: "63-64", zonas: { zona1: 101, zona2: 104, zona3: 105, zona4: 110, zona5: 113, zona6: 116 } },
      { edad: "65-69", zonas: { zona1: 138, zona2: 142, zona3: 144, zona4: 145, zona5: 151.5, zona6: 155 } },
      { edad: "70-74", zonas: { zona1: 172, zona2: 176, zona3: 180, zona4: 184, zona5: 190, zona6: 195 } },
      { edad: "75-79", zonas: { zona1: 213, zona2: 220, zona3: 225, zona4: 232, zona5: 240, zona6: 246 } },
      { edad: "80+", zonas: { zona1: 259, zona2: 269, zona3: 275, zona4: 285, zona5: 296, zona6: 305 } },
    ],
  },
  "seniors": {
    nombre: "Adeslas Seniors",
    rangos: [
      { edad: "55-59", zonas: { zona1: 67.5, zona2: 70, zona3: 71, zona4: 72, zona5: 73, zona6: 74 } },
      { edad: "60-64", zonas: { zona1: 86, zona2: 88, zona3: 89.5, zona4: 92, zona5: 93, zona6: 94 } },
      { edad: "65-69", zonas: { zona1: 103, zona2: 105, zona3: 106, zona4: 111, zona5: 113, zona6: 115 } },
      { edad: "70-74", zonas: { zona1: 127, zona2: 130, zona3: 133, zona4: 140, zona5: 145, zona6: 150 } },
      { edad: "75-79", zonas: { zona1: 157, zona2: 163, zona3: 168, zona4: 178, zona5: 188, zona6: 196 } },
      { edad: "80+", zonas: { zona1: 192, zona2: 201, zona3: 208, zona4: 221, zona5: 234, zona6: 246 } },
    ],
  },
};

// Mapeo de provincias a zonas
export const PROVINCIAS_ZONAS: Record<string, keyof TarifaProducto["rangos"][0]["zonas"]> = {
  "Álava": "zona2",
  "Albacete": "zona3",
  "Alicante": "zona3",
  "Almería": "zona3",
  "Ávila": "zona1",
  "Badajoz": "zona1",
  "Barcelona": "zona5",
  "Burgos": "zona1",
  "Cáceres": "zona2",
  "Cádiz": "zona2",
  "Castellón": "zona4",
  "Ciudad Real": "zona2",
  "Córdoba": "zona3",
  "Cuenca": "zona2",
  "Girona": "zona5",
  "Granada": "zona3",
  "Guadalajara": "zona2",
  "Guipúzcoa": "zona5",
  "Huelva": "zona1",
  "Huesca": "zona5",
  "Jaén": "zona2",
  "La Coruña": "zona1",
  "La Laguna": "zona6",
  "La Palma": "zona6",
  "La Rioja": "zona4",
  "Las Palmas": "zona6",
  "León": "zona1",
  "Lleida": "zona4",
  "Lugo": "zona1",
  "Madrid": "zona2",
  "Málaga": "zona2",
  "Murcia": "zona4",
  "Navarra": "zona4",
  "Ourense": "zona1",
  "Palencia": "zona1",
  "Palma de Mallorca": "zona5",
  "Palmas": "zona6",
  "Pamplona": "zona4",
  "Pontevedra": "zona1",
  "Salamanca": "zona1",
  "Santa Cruz de Tenerife": "zona6",
  "Santander": "zona2",
  "Segovia": "zona1",
  "Sevilla": "zona2",
  "Soria": "zona1",
  "Tarragona": "zona4",
  "Tenerife": "zona6",
  "Teruel": "zona3",
  "Toledo": "zona2",
  "Valencia": "zona3",
  "Valladolid": "zona1",
  "Vizcaya": "zona5",
  "Zamora": "zona1",
  "Zaragoza": "zona4",
};

export const PROVINCIAS_LISTA = Object.keys(PROVINCIAS_ZONAS).sort();

// Función para obtener la tarifa
export function obtenerTarifa(
  productoId: string,
  provincia: string,
  edadAsegurado: number
): number | null {
  const producto = TARIFAS_ADESLAS[productoId];
  if (!producto) return null;

  const zona = PROVINCIAS_ZONAS[provincia];
  if (!zona) return null;

  // Encontrar el rango de edad correcto
  const rango = producto.rangos.find((r) => {
    const [min, max] = r.edad.split("-").map((e) => parseInt(e.replace("+", ""), 10));
    if (isNaN(max)) {
      // Rango como "63+" o "70+"
      return edadAsegurado >= min;
    }
    return edadAsegurado >= min && edadAsegurado <= max;
  });

  if (!rango) return null;

  return rango.zonas[zona];
}
