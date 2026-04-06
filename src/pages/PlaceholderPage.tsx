import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams } from "react-router-dom";

const PlaceholderPage = ({ title }: { title: string }) => (
  <>
    <Header />
    <div className="min-h-[60vh] flex items-center justify-center bg-gris-claro">
      <div className="text-center">
        <h1 className="text-gris-texto text-3xl md:text-[40px] mb-4">{title}</h1>
        <p className="text-gris-medio">Página en construcción. Próximamente disponible.</p>
        <a href="/#calculadora" className="inline-block mt-6 px-6 py-3 rounded-lg text-primary-foreground font-bold text-sm btn-cta-magenta" style={{ backgroundColor: "#E4097D", borderRadius: "7px" }}>
          Calcular mi precio →
        </a>
      </div>
    </div>
    <Footer />
  </>
);

export default PlaceholderPage;
