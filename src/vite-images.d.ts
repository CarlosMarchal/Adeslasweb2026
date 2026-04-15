// Declaraciones de tipos para assets importados (compatibilidad Vite → Next.js)
// En Vite los imports de imágenes devuelven string; aquí mantenemos esa tipificación
declare module "*.jpg" { const src: string; export default src; }
declare module "*.jpeg" { const src: string; export default src; }
declare module "*.png" { const src: string; export default src; }
declare module "*.webp" { const src: string; export default src; }
declare module "*.gif" { const src: string; export default src; }
declare module "*.svg" { const src: string; export default src; }
