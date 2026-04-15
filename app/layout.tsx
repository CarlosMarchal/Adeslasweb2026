import type { Metadata } from 'next';
import './globals.css';
import '../src/App.css';

export const metadata: Metadata = {
  title: 'Adeslas 2026',
  description: 'Web Adeslas - Seguros de Salud',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
