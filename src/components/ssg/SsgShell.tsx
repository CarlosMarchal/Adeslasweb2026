"use client";

/**
 * SsgShell — shell para las páginas migradas a Server Components SSG.
 *
 * Reutiliza los componentes existentes (Header, Footer, Tarificador, etc.) SIN
 * tocarlos. Esos componentes dependen de react-router (`useLocation`, `<Link>`),
 * que aquí no existe porque no hay SPA. En vez de duplicarlos, montamos el
 * `Router` de bajo nivel de react-router con un `navigator` propio cuya
 * navegación hace una **carga completa de página** (window.location) — el
 * comportamiento correcto en un sitio multipágina SSG. Así el diseño queda
 * pixel-idéntico al SPA y no se modifica ningún componente compartido.
 *
 * Provee además PhonePopupProvider (el popup "Te llamamos" global). Los
 * providers de Tarificador y PageCalc los aporta ProductPageTemplate.
 *
 * Autor: Juan Carlos Díaz — Convertiam.
 */
import { Router } from "react-router-dom";
import type { ReactNode } from "react";
import { PhonePopupProvider } from "@/components/PhonePopupContext";

type To = string | { pathname?: string; search?: string; hash?: string };

const href = (to: To): string =>
  typeof to === "string"
    ? to
    : `${to.pathname ?? ""}${to.search ?? ""}${to.hash ?? ""}`;

/** Navigator que convierte toda navegación de react-router en carga completa. */
const fullPageNavigator = {
  createHref: href,
  encodeLocation: (to: To) => {
    const path = typeof to === "string" ? { pathname: to } : to;
    return { pathname: path.pathname ?? "", search: path.search ?? "", hash: path.hash ?? "" };
  },
  go: (delta: number) => {
    if (typeof window !== "undefined") window.history.go(delta);
  },
  push: (to: To) => {
    if (typeof window !== "undefined") window.location.assign(href(to));
  },
  replace: (to: To) => {
    if (typeof window !== "undefined") window.location.replace(href(to));
  },
};

export default function SsgShell({
  pathname,
  children,
}: {
  pathname: string;
  children: ReactNode;
}) {
  const location = { pathname, search: "", hash: "", state: null, key: "default" };
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Router location={location} navigator={fullPageNavigator as any}>
      <PhonePopupProvider>{children}</PhonePopupProvider>
    </Router>
  );
}
