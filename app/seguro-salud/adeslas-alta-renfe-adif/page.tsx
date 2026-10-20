import type { Metadata } from 'next';
import FormularioAltaRenfeAdif from '../../../src/components/FormularioAltaRenfeAdif';

// Página privada del colectivo Renfe / Adif: noindex y fuera del sitemap
// (no está en src/data/pageMeta.ts). Solo se accede por enlace directo.
export const metadata: Metadata = {
  title: 'Alta Adeslas para empleados y familiares de Renfe y Adif | Marchal Aseguradores',
  description:
    'Proceso de alta en el seguro de salud Adeslas exclusivo para empleados y familiares de Renfe y Adif.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: 'https://adeslas.numero1salud.es/seguro-salud/adeslas-alta-renfe-adif/' },
  openGraph: {
    title: 'Alta Adeslas · Empleados y familiares de Renfe y Adif',
    description: 'Proceso de alta en el seguro de salud Adeslas exclusivo para empleados y familiares de Renfe y Adif.',
    url: 'https://adeslas.numero1salud.es/seguro-salud/adeslas-alta-renfe-adif/',
    siteName: 'Marchal Aseguradores',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function FormularioAltaRenfeAdifPage() {
  return <FormularioAltaRenfeAdif />;
}
