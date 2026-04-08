/**
 * Module-level variable that holds the current route path during SSG rendering.
 * Updated by ViteReactSSG's fn callback in main.tsx before each page render.
 * Not used on the client side (window is defined there).
 */
export let ssrRoutePath = "/";

export function setSSRRoutePath(path: string) {
  ssrRoutePath = path;
}
