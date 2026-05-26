// ── SSR/SSG polyfills ─────────────────────────────────────────────────────
// Some client-only APIs are accessed at module-load time in certain packages.
// Provide minimal stubs so vite-react-ssg doesn't crash during pre-rendering.
if (typeof globalThis.window === 'undefined') {
  const noop = () => {}
  const noopReturn = () => ({})
  ;(globalThis as Record<string, unknown>).window = globalThis
  ;(globalThis as Record<string, unknown>).document = {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({
      setAttribute: noop, getAttribute: () => null, style: {},
      appendChild: noop, removeChild: noop, classList: { add: noop, remove: noop },
    }),
    createElementNS: () => ({
      setAttribute: noop, getAttribute: () => null, style: {},
    }),
    createTextNode: () => ({}),
    head: { appendChild: noop, querySelector: () => null },
    body: { appendChild: noop, removeChild: noop, classList: { add: noop, remove: noop } },
    addEventListener: noop,
    removeEventListener: noop,
    cookie: '',
    location: { href: '/', pathname: '/', search: '', hash: '' },
  }
  try {
    Object.defineProperty(globalThis, 'navigator', {
      value: { userAgent: 'Node.js', language: 'es' }, configurable: true,
    })
  } catch (_) {}

  ;(globalThis as Record<string, unknown>).localStorage = {
    getItem: () => null, setItem: noop, removeItem: noop, clear: noop,
  }
  ;(globalThis as Record<string, unknown>).sessionStorage = {
    getItem: () => null, setItem: noop, removeItem: noop, clear: noop,
  }
  ;(globalThis as Record<string, unknown>).matchMedia = () => ({
    matches: false, addListener: noop, removeListener: noop,
    addEventListener: noop, removeEventListener: noop,
  })
  ;(globalThis as Record<string, unknown>).MutationObserver = class {
    observe = noop; disconnect = noop; takeRecords = () => []
  }
  ;(globalThis as Record<string, unknown>).ResizeObserver = class {
    observe = noop; disconnect = noop; unobserve = noop
  }
  ;(globalThis as Record<string, unknown>).IntersectionObserver = class {
    observe = noop; disconnect = noop; unobserve = noop
  }
  ;(globalThis as Record<string, unknown>).requestAnimationFrame = (fn: () => void) => { fn(); return 0 }
  ;(globalThis as Record<string, unknown>).cancelAnimationFrame = noop
  ;(globalThis as Record<string, unknown>).HTMLElement = class {}
  ;(globalThis as Record<string, unknown>).SVGElement = class {}
  ;(globalThis as Record<string, unknown>).CustomEvent = class { constructor() {} }
  ;(globalThis as Record<string, unknown>).Event = class { constructor() {} }
}

import { ViteReactSSG } from 'vite-react-ssg/single-page'
import App from './App'
import './App.css'
import { setSSRRoutePath } from './ssg-context'

export const createRoot = ViteReactSSG(
  <App />,
  ({ path }) => {
    // Set SSR route path before each page render so components
    // that need it (Helmet canonical URLs, etc.) can read it.
    if (typeof window === 'undefined') {
      setSSRRoutePath(path ?? '/')
    }
  },
)
