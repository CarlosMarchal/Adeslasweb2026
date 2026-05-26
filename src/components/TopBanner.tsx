import { useState, useEffect } from "react";

const TopBanner = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY <= 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="overflow-hidden transition-all duration-300"
      style={{
        maxHeight: visible ? "48px" : "0px",
        opacity: visible ? 1 : 0,
        backgroundColor: "hsl(var(--azul-claro))",
      }}
    >
      <div className="py-2.5 text-center">
        <a
          href="#calculadora"
          className="text-primary-foreground font-bold"
          style={{ fontSize: "13px" }}
        >
          🎁 Oferta especial: descuentos exclusivos en todos los seguros Adeslas —{" "}
          <span className="underline">Calcula tu precio ahora</span>
        </a>
      </div>
    </div>
  );
};

export default TopBanner;
