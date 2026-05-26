import { useEffect, useState } from "react";
import { motion } from "../lib/motion";

// ─────────────────────────────────────────────
// Tipos (duplicados aquí para evitar importar desde app/)
// ─────────────────────────────────────────────

interface GoogleReview {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface ReviewsResponse {
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  place_url: string;
}

// ─────────────────────────────────────────────
// Sub-componentes
// ─────────────────────────────────────────────

const StarsFull = ({ rating, size = 15 }: { rating: number; size?: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        if (i < full) {
          return <span key={i} style={{ color: "#009FE3", fontSize: `${size}px` }}>★</span>;
        }
        if (i === full && half) {
          return (
            <span key={i} style={{ fontSize: `${size}px`, position: "relative", display: "inline-block" }}>
              <span style={{ color: "#D1E9F6" }}>★</span>
              <span style={{ color: "#009FE3", position: "absolute", left: 0, top: 0, width: "50%", overflow: "hidden", display: "inline-block" }}>★</span>
            </span>
          );
        }
        return <span key={i} style={{ color: "#D1E9F6", fontSize: `${size}px` }}>★</span>;
      })}
    </div>
  );
};

const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

const GoogleBadge = () => (
  <span
    className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full mb-3"
    style={{ background: "#F1F3F4", color: "#5F6368" }}
  >
    <GoogleLogo />
    Google
  </span>
);

const ReviewCard = ({ review, index }: { review: GoogleReview; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_CHARS = 180;
  const isLong = review.text.length > MAX_CHARS;
  const displayText = isLong && !expanded
    ? review.text.slice(0, MAX_CHARS).trimEnd() + "…"
    : review.text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative bg-blanco rounded-2xl p-6 card-shadow border border-borde"
      style={{ borderRadius: "16px" }}
    >
      <span
        className="absolute -top-2 left-5 leading-none select-none"
        style={{ fontFamily: "Georgia, serif", fontSize: "64px", color: "#E8F4FC" }}
      >
        "
      </span>
      <div className="relative pt-6">
        <div className="flex items-center gap-1 mb-2">
          <StarsFull rating={review.rating} size={14} />
        </div>
        <GoogleBadge />
        <p className="text-sm text-gris-texto mb-3 leading-relaxed">
          {displayText}
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-1 text-xs font-medium"
              style={{ color: "#009FE3" }}
            >
              {expanded ? "Ver menos" : "Ver más"}
            </button>
          )}
        </p>
        <div className="flex items-center gap-3 mt-auto">
          {review.profile_photo_url ? (
            <img
              src={review.profile_photo_url}
              alt={review.author_name}
              width={32}
              height={32}
              className="rounded-full object-cover flex-shrink-0"
              style={{ width: "32px", height: "32px" }}
            />
          ) : (
            <div
              className="flex-shrink-0 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ width: "32px", height: "32px", background: "#009FE3" }}
            >
              {review.author_name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div className="font-bold text-gris-texto text-sm">{review.author_name}</div>
            <div className="text-xs text-gris-medio">{review.relative_time_description}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Barra de rating global tipo Google Maps
const GlobalRatingBar = ({
  rating,
  total,
  placeUrl,
}: {
  rating: number;
  total: number;
  placeUrl: string;
}) => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
    <div className="flex flex-col items-center sm:items-start">
      <div className="flex items-end gap-2">
        <span className="font-black" style={{ fontSize: "56px", lineHeight: 1, color: "#1A3A5C" }}>
          {rating.toFixed(1)}
        </span>
        <StarsFull rating={rating} size={22} />
      </div>
      <span className="text-sm text-gris-medio mt-1">
        Basado en{" "}
        <a
          href={placeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
          style={{ color: "#009FE3" }}
        >
          {total.toLocaleString("es-ES")} reseñas en Google
        </a>
      </span>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────

const GoogleReviewsSection = () => {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then((json) => {
        if (json.error) throw new Error(json.error);
        setData(json);
      })
      .catch(() => setError(true));
  }, []);

  // Si hay error, no renderizamos nada (la sección simplemente no aparece)
  if (error) return null;

  // Skeleton mientras carga
  if (!data) {
    return (
      <section className="section-pad bg-gris-claro">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 w-72 bg-borde rounded animate-pulse mx-auto mb-3" />
            <div className="h-4 w-48 bg-borde rounded animate-pulse mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-blanco rounded-2xl p-6 card-shadow border border-borde h-52 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const topReviews = data.reviews.slice(0, 3);

  return (
    <section className="section-pad bg-gris-claro">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="text-gris-texto mb-3">Lo que opinan nuestros clientes en Google</h2>
          <p className="text-gris-medio max-w-lg mx-auto">
            Reseñas reales de Google My Business, sin editar.
          </p>
        </motion.div>

        <GlobalRatingBar
          rating={data.rating}
          total={data.user_ratings_total}
          placeUrl={data.place_url}
        />

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {topReviews.map((review: GoogleReview, i: number) => (
            <ReviewCard key={review.time} review={review} index={i} />
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={data.place_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border-2 transition-colors"
            style={{
              borderColor: "#009FE3",
              color: "#009FE3",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#009FE3";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#009FE3";
            }}
          >
            <GoogleLogo />
            Ver todas las reseñas en Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;
