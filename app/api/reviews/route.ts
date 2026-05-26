import { NextResponse } from 'next/server';

// ================================================================
// API Route: GET /api/reviews
// Devuelve el rating global y las reseñas del negocio en Google.
//
// Caché ISR: revalidate = 86400 (24 h)
// → Google Places API solo se llama una vez al día como máximo.
//
// Variables de entorno requeridas en .env.local:
//   GOOGLE_PLACES_API_KEY  → API key de Google Cloud (Places API habilitada)
//   GOOGLE_PLACE_ID        → Place ID del negocio en Google Maps
// ================================================================

export const revalidate = 86400; // 24 horas

export interface GoogleReview {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface ReviewsResponse {
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  place_url: string;
}

// ── Filtrado y selección de reseñas ─────────────────────────────────────────
//
// Criterios (en orden):
//   1. Rating == 5 (único entero estrictamente > 4,5 en Google)
//   2. Texto no vacío y con sustancia (>= 40 caracteres)
//   3. Puntuación de relevancia comercial (keywords de seguro/servicio)
//   4. Máximo 3 reseñas mostradas
//
// Declaradas a nivel de módulo para no recrearlas en cada petición.
// ─────────────────────────────────────────────────────────────────────────────

const COMMERCIAL_KEYWORDS = [
  'seguro', 'segura', 'seguros', 'póliza', 'cobertura', 'coberturas',
  'médico', 'médica', 'médicos', 'médicas', 'clínica', 'hospital',
  'atención', 'servicio', 'servicios', 'precio', 'precios', 'cuota',
  'contratar', 'contratado', 'contratamos', 'contrata', 'contrato',
  'tramitar', 'tramité', 'gestión', 'gestiones', 'gestor',
  'adeslas', 'salud', 'sanidad', 'aseguradora', 'compañía',
  'copago', 'prima', 'consulta', 'especialista', 'urgencias',
  'marchal', 'asesor', 'asesora', 'profesional', 'rápido', 'rápida',
  'recomiendo', 'recomendable', 'excelente', 'estupendo', 'genial',
];

const commercialScore = (text: string): number => {
  const lower = text.toLowerCase();
  return COMMERCIAL_KEYWORDS.reduce(
    (score, kw) => score + (lower.includes(kw) ? 1 : 0),
    0
  );
};

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: 'Faltan variables de entorno GOOGLE_PLACES_API_KEY o GOOGLE_PLACE_ID.' },
      { status: 500 }
    );
  }

  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}` +
      `&fields=name,rating,user_ratings_total,reviews,url` +
      `&language=es` +
      `&reviews_sort=most_relevant` +
      `&key=${apiKey}`;

    const res = await fetch(url, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      throw new Error(`Google Places respondió con status ${res.status}`);
    }

    const data = await res.json();

    if (data.status !== 'OK') {
      throw new Error(`Google Places error: ${data.status} — ${data.error_message ?? ''}`);
    }

    const result = data.result;
    const allReviews: GoogleReview[] = result.reviews ?? [];

    const filtered = allReviews
      .filter((r: GoogleReview) => r.rating >= 5 && r.text?.trim().length >= 40)
      .sort((a: GoogleReview, b: GoogleReview) => commercialScore(b.text) - commercialScore(a.text))
      .slice(0, 3);

    const payload: ReviewsResponse = {
      rating: result.rating ?? 0,
      user_ratings_total: result.user_ratings_total ?? 0,
      reviews: filtered,
      place_url: result.url ?? `https://search.google.com/local/reviews?placeid=${placeId}`,
    };

    return NextResponse.json(payload);
  } catch (err) {
    console.error('[/api/reviews]', err);
    return NextResponse.json(
      { error: 'No se pudieron cargar las reseñas de Google.' },
      { status: 500 }
    );
  }
}
