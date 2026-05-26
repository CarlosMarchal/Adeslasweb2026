/**
 * Re-export de framer-motion.
 *
 * NOTE: Se exporta `motion` directamente (no `m`) para compatibilidad con
 * optimizePackageImports en Next.js 14. La optimización de bundle se delega a
 * experimental.optimizePackageImports en next.config.js.
 *
 * USAGE: En todos los componentes:
 *   import { motion, AnimatePresence } from "@/lib/motion"
 *
 * El JSX (<motion.div>, <motion.section>, etc.) permanece idéntico.
 */
export { motion, AnimatePresence } from "framer-motion";
