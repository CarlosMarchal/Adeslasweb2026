import { Metadata } from 'next';
import TarificadorInterno from '@/views/TarificadorInterno';

export const metadata: Metadata = {
  title: 'Tarificador - Adeslas (Uso Interno)',
  description: 'Herramienta interna de tarificación',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function TarificadorPage() {
  return <TarificadorInterno />;
}
