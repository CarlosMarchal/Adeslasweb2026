import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormularioAlta from "@/components/FormularioAlta";

const FormularioDeAlta = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Formulario de Alta Adeslas | Marchal Aseguradores";
  }, []);

  return (
    <>
      <Header />
      <FormularioAlta />
      <Footer />
    </>
  );
};

export default FormularioDeAlta;
