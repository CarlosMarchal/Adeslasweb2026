import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solicitud de Alta — Adeslas | Marchal Aseguradores",
  description: "Formulario de solicitud y cuestionario de salud para alta en Adeslas.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SolicitudAltaPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Solicitud y Cuestionario de Salud
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          Rellena el formulario, fírmalo y envíanoslo a{" "}
          <a href="mailto:cmarchal@marchalconsultores.com" className="text-blue-600 underline">
            cmarchal@marchalconsultores.com
          </a>
        </p>
        <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
          <iframe
            src="/solicitud-alta.pdf"
            className="w-full"
            style={{ height: "85vh", minHeight: 600 }}
            title="Solicitud y Cuestionario de Salud Adeslas"
          />
        </div>
        <p className="mt-4 text-center text-sm text-gray-400">
          Si no se visualiza correctamente,{" "}
          <a href="/solicitud-alta.pdf" download className="text-blue-600 underline">
            descarga el PDF aquí
          </a>
          .
        </p>
      </div>
    </main>
  );
}
