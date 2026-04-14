import type { Metadata } from 'next';
import FormularioAlta from '../../../src/components/FormularioAlta';

export const metadata: Metadata = {
  title: 'Formulario de Alta Adeslas | Marchal Aseguradores',
  description:
    'Solicita tu alta en el seguro de salud Adeslas de forma rápida y segura. Rellena el formulario en menos de 5 minutos.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Alta Seguro de Salud Adeslas | Marchal Aseguradores',
    description: 'Contrata tu seguro de salud Adeslas online. Proceso 100% seguro y guiado.',
    url: 'https://adeslas.numero1salud.es/seguro-salud/adeslas-formulario-de-alta/',
    siteName: 'Marchal Aseguradores',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function FormularioAltaPage() {
  return <FormularioAlta />;
}
