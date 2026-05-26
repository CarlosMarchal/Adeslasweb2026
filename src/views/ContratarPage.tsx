import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import FormularioContratacion from '@/components/FormularioContratacion';

/**
 * ContratarPage — página de contratación para el flujo React Router
 *
 * Recibe los parámetros del tarificador via URL query string y los
 * pasa al componente FormularioContratacion.
 *
 * URL esperada (generada por ModalResultados):
 * /contratar?producto=adeslas-plena-total&productoNombre=...&precio=78.40
 *   &nombre=Juan&email=juan@email.com&telefono=+34600000000
 *   &edades=35,32,5&provincia=Madrid
 */
export default function ContratarPage() {
  const [searchParams] = useSearchParams();
  const navigate        = useNavigate();

  const producto       = searchParams.get('producto')       ?? '';
  const productoNombre = searchParams.get('productoNombre') ?? 'Seguro Adeslas';
  const precioStr      = searchParams.get('precio')         ?? '0';
  const precioBaseStr  = searchParams.get('precioBase')     ?? '';
  const descuentoStr   = searchParams.get('descuento')      ?? '';
  const nombre         = searchParams.get('nombre')         ?? '';
  const email          = searchParams.get('email')          ?? '';
  const telefono       = searchParams.get('telefono')       ?? '';
  const edadesStr      = searchParams.get('edades')         ?? '';
  const provincia      = searchParams.get('provincia')      ?? '';

  const precio     = parseFloat(precioStr)     || 0;
  const precioBase = precioBaseStr ? parseFloat(precioBaseStr) : undefined;
  const descuento  = descuentoStr  ? parseFloat(descuentoStr)  : undefined;
  const edades     = edadesStr
    ? edadesStr.split(',').map(Number).filter((n) => !isNaN(n))
    : [];

  // Redirigir a inicio si faltan parámetros críticos
  useEffect(() => {
    document.title = `Contratar ${productoNombre} | Marchal Aseguradores`;
    if (!producto || precio <= 0) {
      navigate('/', { replace: true });
    }
  }, [producto, precio, productoNombre, navigate]);

  if (!producto || precio <= 0) return null;

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
