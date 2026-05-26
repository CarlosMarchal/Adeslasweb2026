/**
 * PageCalcContext — allows any page to override the default "Calcular mi precio"
 * action used by Header's sticky bottom bar and top-bar button.
 *
 * ProductPageTemplate provides this when `customTarificador` is set,
 * so Autónomos / Pymes / Empresas open TarificadorPymes instead of the
 * generic Tarificador.
 */
import { createContext, useContext } from "react";

interface PageCalcContextType {
  /** If defined, "Calcular mi precio" CTAs in Header will call this instead of openTarificador() */
  onCalcClick?: () => void;
  /** Optional label override for the CTA button (default: "Calcular mi precio") */
  calcLabel?: string;
}

const PageCalcContext = createContext<PageCalcContextType>({});

export const usePageCalc = () => useContext(PageCalcContext);

export const PageCalcProvider = PageCalcContext.Provider;
