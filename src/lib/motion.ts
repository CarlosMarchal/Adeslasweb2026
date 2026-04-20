/**
 * Re-export de framer-motion usando LazyMotion + m (en lugar de motion completo).
 *
 * WHY: `motion.div` importa el renderer COMPLETO de framer-motion (~60 KB gz).
 *      `m.div` dentro de <LazyMotion features={domAnimation}> solo carga las
 *      features DOM básicas (~18 KB gz). El wrapper LazyMotion está en App.tsx.
 *
 * USAGE: En todos los componentes sustituir
 *   import { motion, AnimatePresence } from "framer-motion"
 * por
 *   import { motion, AnimatePresence } from "@/lib/motion"
 *
 * El JSX (<motion.div>, <motion.section>, etc.) permanece idéntico.
 */
export { m as motion, AnimatePresence } from "framer-motion";
