// Declaraciones de tipos para assets importados (compatibilidad Vite → Next.js)
// Next.js resuelve imágenes como StaticImageData; declaramos `any` para que
// sea compatible tanto con <img src={logo}> como con next/image's StaticImageData.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare module "*.jpg"  { const src: any; export default src; }
declare module "*.jpeg" { const src: any; export default src; }
declare module "*.png"  { const src: any; export default src; }
declare module "*.webp" { const src: any; export default src; }
declare module "*.gif"  { const src: any; export default src; }
declare module "*.svg"  { const src: any; export default src; }
