import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application Form — Adeslas Health Insurance | Marchal Aseguradores",
  description: "Application form and health questionnaire for Adeslas health insurance.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SolicitudAltaInglesPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Application Form &amp; Health Questionnaire
        </h1>
        <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
          <iframe
            src="/solicitud-alta-ingles.pdf"
            className="w-full"
            style={{ height: "85vh", minHeight: 600 }}
            title="Adeslas Health Insurance Application Form"
          />
        </div>
        <p className="mt-4 text-center text-sm text-gray-400">
          If the document does not display correctly,{" "}
          <a href="/solicitud-alta-ingles.pdf" download className="text-blue-600 underline">
            download the PDF here
          </a>
          .
        </p>
      </div>
    </main>
  );
}
