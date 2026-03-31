import { useTarificador } from "@/components/TarificadorContext";

interface CalcButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Pass product slug to open tarificador in single-product mode */
  productSlug?: string;
}

const CalcButton = ({ children, className, style, productSlug }: CalcButtonProps) => {
  const { openTarificador } = useTarificador();
  return (
    <button onClick={() => openTarificador(productSlug)} className={className} style={style}>
      {children}
    </button>
  );
};

export default CalcButton;
