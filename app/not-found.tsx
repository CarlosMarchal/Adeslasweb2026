import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada (404) | Adeslas Seguros Médicos",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F8FAFC] px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-extrabold" style={{ color: "#003087" }}>
          404
        </p>
        <h1 className="mt-4 mb-2 text-2xl font-bold" style={{ color: "#1A202C" }}>
          Página no encontrada
        </h1>
        <p className="mb-8 text-base" style={{ color: "#4A5568" }}>
          La página que buscas no existe o se ha movido. Te ayudamos a encontrar tu seguro Adeslas.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold text-white"
            style={{ backgroundColor: "#009FE3" }}
          >
            Volver al inicio
          </Link>
          <Link
            href="/cuadro-medico/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold border"
            style={{ borderColor: "#009FE3", color: "#009FE3" }}
          >
            Cuadro médico
          </Link>
        </div>
      </div>
    </main>
  );
}
