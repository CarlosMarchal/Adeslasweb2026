import { Link } from "react-router-dom";
import { trackClickToCallContratacion, trackClickToCallAsistencia } from "@/lib/tracking";
import logoBlanco from "@/assets/Logo-adeslas-Marchal-blanco.png";

const Footer = () => (
  <footer style={{ backgroundColor: "#1A2B4A" }}>
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-[2fr_1.2fr_1.2fr_1.2fr_1.2fr] gap-6 lg:gap-8">
        {/* Logo y dirección */}
        <div>
          <img src={logoBlanco} alt="Adeslas Seguros Médicos — Salud Privada en España" className="h-8 object-contain mb-4" />
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Avenida de Filipinas, 28 · CP 28003<br />
            Madrid
          </p>
        </div>

        {/* Seguros de Salud */}
        <div>
          <h4 className="text-primary-foreground font-bold text-sm mb-3">Seguros de Salud Adeslas</h4>
          <div className="space-y-1.5">
            {[
              { label: "Adeslas Go", to: "/seguro-salud/adeslas-go/" },
              { label: "Adeslas Plena Vital", to: "/seguro-salud/adeslas-plena-vital/" },
              { label: "Adeslas Plena Total", to: "/seguro-salud/adeslas-plena-total/" },
              { label: "Adeslas Plena Total+", to: "/seguro-salud/adeslas-extra-150/" },
              { label: "Adeslas Plena Total++", to: "/seguro-salud/adeslas-plena-plus/" },
              { label: "Adeslas Extra 150", to: "/seguro-salud/adeslas-extra-150/" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="block text-sm transition-colors hover:text-primary-foreground" style={{ color: "rgba(255,255,255,0.5)" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Otros Seguros */}
        <div>
          <h4 className="text-primary-foreground font-bold text-sm mb-3">Otros Seguros Adeslas</h4>
          <div className="space-y-1.5">
            {[
              { label: "Dental", to: "/seguro-dental/" },
              { label: "Decesos", to: "/seguro-decesos/" },
              { label: "Mascotas", to: "/seguro-dental/" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="block text-sm transition-colors hover:text-primary-foreground" style={{ color: "rgba(255,255,255,0.5)" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Por Perfil */}
        <div>
          <h4 className="text-primary-foreground font-bold text-sm mb-3">Adeslas por Perfil de Asegurado</h4>
          <div className="space-y-1.5">
            {[
              { label: "Individual", to: "/seguro-salud/adeslas-individual/" },
              { label: "Familiar", to: "/seguro-salud/seguro-familia/" },
              { label: "Infantil", to: "/seguro-salud/adeslas-infantil/" },
              { label: "Ginecología", to: "/seguro-salud/adeslas-ginecologia/" },
              { label: "Embarazadas", to: "/seguro-salud/embarazo/" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="block text-sm transition-colors hover:text-primary-foreground" style={{ color: "rgba(255,255,255,0.5)" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Para Empresas y Recursos */}
        <div>
          <h4 className="text-primary-foreground font-bold text-sm mb-3">Adeslas para Empresas y Recursos</h4>
          <div className="space-y-1.5">
            {[
              { label: "Autónomos", to: "/seguro-salud/autonomos/" },
              { label: "Pymes", to: "/pymes" },
              { label: "Empresas", to: "/empresas" },
              { label: "Precios y Ofertas", to: "/seguro-salud/ofertas-adeslas-precios/" },
              { label: "Cuadro Médico", to: "/cuadro-medico/" },
              { label: "Blog", to: "/adeslas-blog/" },
              { label: "Contacto", to: "/contacto/" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="block text-sm transition-colors hover:text-primary-foreground" style={{ color: "rgba(255,255,255,0.5)" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Teléfonos de contacto - Segunda fila */}
      <div className="grid md:grid-cols-3 gap-6 mt-10 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div>
          <div className="text-[10px] uppercase tracking-wide text-primary-foreground font-bold mb-1">Nuevas contrataciones</div>
          <a href="tel:917105000" onClick={() => trackClickToCallContratacion("footer")} className="block text-sm hover:text-primary-foreground transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>
            91 710 50 00
          </a>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wide text-primary-foreground font-bold mb-1">Atención al cliente</div>
          <a href="tel:919191898" onClick={() => trackClickToCallAsistencia("footer")} className="block text-sm hover:text-primary-foreground transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>
            91 919 18 98
          </a>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wide text-primary-foreground font-bold mb-1">Horario de atención</div>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Lunes a Viernes: 8:00-21:00</p>
        </div>
      </div>
    </div>
    <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
      <div className="container mx-auto px-4 py-5">
        <p className="text-xs text-center mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
          © 2026 Marchal Aseguradores S.L.U. · CIF B-86792017 · Agencia Exclusiva de Adeslas S.A. · DGS 28101259
        </p>
        <div className="flex justify-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          <Link to="/politica-de-privacidad" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary-foreground transition-colors">Aviso legal</Link>
          <Link to="/politica-de-privacidad" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary-foreground transition-colors">Privacidad</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
