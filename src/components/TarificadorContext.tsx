import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Tarificador from "@/components/Tarificador";

interface TarificadorContextType {
  openTarificador: (productSlug?: string) => void;
}

const TarificadorContext = createContext<TarificadorContextType>({ openTarificador: () => {} });

export const useTarificador = () => useContext(TarificadorContext);

export const TarificadorProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [productSlug, setProductSlug] = useState<string | undefined>();

  const openTarificador = useCallback((slug?: string) => {
    setProductSlug(slug);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setProductSlug(undefined);
  }, []);

  return (
    <TarificadorContext.Provider value={{ openTarificador }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[700] flex items-center justify-center bg-black/50 p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 8 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-full max-w-lg rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 24px 64px rgba(0,48,135,0.22)",
                maxHeight: "90dvh",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scrollable content — el close btn va dentro del header del Tarificador */}
              <div className="overflow-y-auto" style={{ maxHeight: "90dvh" }}>
                <Tarificador compact productSlug={productSlug} onClose={handleClose} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </TarificadorContext.Provider>
  );
};
