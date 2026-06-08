import { Metadata } from "next";
import TarificadorInterno from "@/views/TarificadorInterno";

// /tarificador-interno/ — herramienta interna (noindex). Misma que /internal/tarificador.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Tarificador - Adeslas (Uso Interno)",
  description: "Herramienta interna de tarificación",
  alternates: { canonical: "https://adeslas.numero1salud.es/tarificador-interno/" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function Page() {
  return <TarificadorInterno />;
}
