import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const COOKIE_KEY = "adeslas_cookie_consent";

/** Read consent from storage (try localStorage, fall back to sessionStorage) */
const getConsent = (): string | null => {
  try {
    return localStorage.getItem(COOKIE_KEY);
  } catch {
    try {
      return sessionStorage.getItem(COOKIE_KEY);
    } catch {
      return null;
    }
  }
};

/** Persist consent */
const setConsent = (value: string) => {
  try {
    localStorage.setItem(COOKIE_KEY, value);
  } catch {
    try {
      sessionStorage.setItem(COOKIE_KEY, value);
    } catch {
      /* silently fail */
    }
  }
};

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    setConsent("all");
    setVisible(false);
    // Activate analytics immediately via Consent Mode v2
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const reject = () => {
    setConsent("essential");
    setVisible(false);
    // Keep analytics denied
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 inset-x-0 z-[9999] p-4 md:p-6"
        >
          <div
            className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 p-5 md:p-6"
            style={{
              background: "#fff",
              borderRadius: "16px",
              boxShadow:
                "0 -4px 32px rgba(0,48,135,0.12), 0 8px 24px rgba(0,0,0,0.08)",
              border: "1px solid #D5E3F0",
            }}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#E8F4FC" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#009FE3" strokeWidth="1.5" />
                <circle cx="7" cy="8" r="1.5" fill="#009FE3" />
                <circle cx="13" cy="7" r="1" fill="#009FE3" />
                <circle cx="11" cy="13" r="1.5" fill="#009FE3" />
                <circle cx="6" cy="13" r="1" fill="#009FE3" />
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="text-sm text-gris-texto leading-relaxed">
                Utilizamos cookies propias y de terceros para mejorar tu
                experiencia, analizar el tráfico y mostrarte contenido
                personalizado. Puedes aceptar todas o solo las esenciales.{" "}
                <Link
                  to="/politica-de-privacidad"
                  className="font-bold hover:underline"
                  style={{ color: "#009FE3" }}
                >
                  Más información
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={reject}
                className="flex-1 md:flex-none px-5 py-2.5 text-sm font-bold border transition-colors hover:bg-gray-50"
                style={{
                  borderRadius: "8px",
                  borderColor: "#D5E3F0",
                  color: "#009FE3",
                }}
              >
                Solo esenciales
              </button>
              <button
                onClick={accept}
                className="flex-1 md:flex-none px-5 py-2.5 text-sm font-bold text-white transition-colors"
                style={{
                  borderRadius: "8px",
                  backgroundColor: "#009FE3",
                }}
              >
                Aceptar todas
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
