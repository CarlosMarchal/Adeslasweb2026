/**
 * imgSrc — compatibilidad Vite → Next.js para imports de imágenes.
 *
 * En Vite: `import img from './img.webp'` devuelve un string (URL pública).
 * En Next.js: devuelve un objeto `StaticImageData { src, width, height, ... }`.
 *
 * Esta función extrae la URL del string de forma segura en ambos entornos.
 */
export function imgSrc(img: unknown): string {
  if (!img) return '';
  if (typeof img === 'string') return img;
  // StaticImageData: { src: string; width: number; height: number }
  if (typeof img === 'object' && 'src' in img && typeof (img as { src: string }).src === 'string') {
    return (img as { src: string }).src;
  }
  return String(img);
}
