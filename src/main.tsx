import React from "react";
import { ViteReactSSG } from "vite-react-ssg/single-page";
import App from "./App.tsx";
import "./index.css";

/**
 * ViteReactSSG replaces createRoot:
 *  - Dev  (vite dev):        renders as a normal SPA with HMR.
 *  - Prod (vite-react-ssg build): pre-renders each route to static HTML.
 *
 * The fn callback runs before EACH route render. We replace context.app with
 * a fresh <App initialPath={routePath} /> element — this avoids any shared
 * module-level state and is safe regardless of concurrency settings.
 *
 * vite-react-ssg also wraps the app in <HelmetProvider> automatically,
 * so App.tsx must NOT include a second HelmetProvider.
 */
export const createRoot = ViteReactSSG(<App />, (context) => {
  if (typeof window === "undefined") {
    // SSG build: give each route its own App element with the correct initial path
    context.app = React.createElement(App, {
      initialPath: context.routePath || "/",
    });
  }
});
