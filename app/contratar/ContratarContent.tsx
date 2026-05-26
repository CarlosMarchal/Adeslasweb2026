'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import FormularioContratacion from '@/components/FormularioContratacion';

// ─────────────────────────────────────────────────────────────────────────────
// Reads URL params and feeds them into FormularioContratacion
//
// Expected URL params (set by ModalResultados → handleContratar):
//   producto        — product slug (e.g. "adeslas-plena-total")
//   productoNombre  — display name (e.g. "Adeslas Plena Total")
//   precio          — monthly price as string (e.g. "78.40")
//   precioBase      — base price before discount (optional)
//   descuento       — discount % (optional, "10")
//   nombre          — user name from tarificador
//   email           — user email from tarificador
//   telefono        — user phone (with country code) from tarificador
//   edades          — comma-separated ages (e.g. "35,32,5")
//   provincia       — province name (e.g. "Madrid")
// ─────────────────────────────────────────────────────────────────────────────

export default function ContratarContent() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  // Parse params (searchParams may be null during SSR prerender)
  const producto       = searchParams?.get('producto')       ?? '';
  const productoNombre = searchParams?.get('productoNombre') ?? 'Seguro Adeslas';
  const precioStr      = searchParams?.get('precio')         ?? '0';
  const precioBaseStr  = searchParams?.get('precioBase')     ?? '';
  const descuentoStr   = searchParams?.get('descuento')      ?? '';
  const nombre         = searchParams?.get('nombre')         ?? '';
  const email          = searchParams?.get('email')          ?? '';
  const telefono       = searchParams?.get('telefono')       ?? '';
  const edadesStr      = searchParams?.get('edades')         ?? '';
  const provincia      = searchParams?.get('provincia')      ?? '';

  const precio     = parseFloat(precioStr)     || 0;
  const precioBase = precioBaseStr ? parseFloat(precioBaseStr) : undefined;
  const descuento  = descuentoStr  ? parseFloat(descuentoStr)  : undefined;
  const edades     = edadesStr
    ? edadesStr.split(',').map(Number).filter((n) => !isNaN(n))
    : [];

  // Redirect to home if critical params are missing
  useEffect(() => {
    if (!producto || precio <= 0) {
      router.replace('/');
    }
  }, [producto, precio, router]);

  if (!producto || precio <= 0) {
    return null;
  }

  return (
    <FormularioContratacion
      params={{
        producto,
        productoNombre,
        precio,
        precioBase,
        descuento,
        nombre,
        email,
        telefono,
        edades,
        provincia,
      }}
    />
  );
}
