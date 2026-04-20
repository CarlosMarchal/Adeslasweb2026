import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { ViteReactSSG } from 'vite-react-ssg';
import * as React from 'react';
import { useState, createContext, useContext, useRef, useEffect, Fragment as Fragment$1, useMemo, useCallback, lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLocation, Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Toaster as Toaster$2 } from 'sonner';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva } from 'class-variance-authority';
import { X, Phone, Shield, CheckCircle2, ChevronRight, Menu, ChevronDown, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { createPortal } from 'react-dom';

const PORTAL_ID = "6596944";
const FORM_GUID = "cd3fb712-acc6-42f7-8843-e42f1360c3c4";
const ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`;
function getGclid() {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("gclid") || params.get("gbraid") || params.get("wbraid") || sessionStorage.getItem("hs_gclid") || "";
  } catch {
    return "";
  }
}
function captureGclid() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("gclid") || params.get("gbraid") || params.get("wbraid");
    if (id) sessionStorage.setItem("hs_gclid", id);
  } catch {
  }
}
function getHutk() {
  try {
    const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
    return match ? match[1] : "";
  } catch {
    return "";
  }
}
function field(name, value) {
  return { objectTypeId: "0-1", name, value };
}
function buildFields(payload) {
  const gclid = getGclid();
  const fields = [
    field("tarificador", String(payload.source)),
    field("url_campana_ai", window.location.href)
  ];
  if (payload.phone) fields.push(field("phone", payload.phone));
  if (payload.firstname) fields.push(field("firstname", payload.firstname));
  if (payload.email) fields.push(field("email", payload.email));
  if (payload.city) fields.push(field("city", payload.city));
  if (payload.edad1) fields.push(field("edad1", payload.edad1));
  if (gclid) fields.push(field("hs_google_click_id", gclid));
  return fields;
}
async function submitToHubSpot(payload) {
  const hutk = getHutk();
  const context = {
    pageName: document.title,
    pageUri: window.location.href
  };
  if (hutk) context.hutk = hutk;
  const body = JSON.stringify({ fields: buildFields(payload), context });
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });
    if (res.ok) return;
    const err = await res.text();
    console.error("[HubSpot] Submission failed:", res.status, err);
  } catch (e) {
    console.error("[HubSpot] Network error:", e);
  }
}

async function sha256(value) {
  const normalized = value.replace(/\s/g, "").toLowerCase();
  const encoded = new TextEncoder().encode(normalized);
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function pushEvent(event, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
async function trackGenerateLead(phone, source, hubspotSource) {
  const hashedPhone = await sha256(phone);
  pushEvent("generate_lead", {
    lead_source: source,
    ...hubspotSource !== void 0 && { hubspot_source: hubspotSource },
    user_data: {
      sha256_phone_number: hashedPhone
    }
  });
}
function trackClickToCallContratacion(location) {
  pushEvent("click_to_call_contratacion", {
    phone_number: "917105000",
    click_location: location
  });
}
function trackClickToCallAsistencia(location) {
  pushEvent("click_to_call_asistencia", {
    phone_number: "919191898",
    click_location: location
  });
}
function trackPageView(pathname) {
  pushEvent("page_view", {
    page_path: pathname,
    page_title: document.title,
    page_location: window.location.href
  });
}
async function trackTarificadorSubmit(phone, source, hubspotSource) {
  const hashedPhone = await sha256(phone);
  pushEvent("generate_lead", {
    lead_source: source,
    ...hubspotSource !== void 0 && { hubspot_source: hubspotSource },
    user_data: {
      sha256_phone_number: hashedPhone
    }
  });
}

const Toaster$1 = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}

const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const LEGAL_TEXT = `AVISO LEGAL.

MARCHAL ASEGURADORES S.L.U., inscrita en la Dirección General de Seguros y Fondos de Pensiones con la clave 28101259, estando autorizada para realizar la actividad de mediación de seguros con contrato de agencia exclusiva con SEGURCAIXA ADESLAS S.A. de Seguros y Reaseguros. El código de identificación fiscal es B-86792017. Tiene concertado un seguro de Responsabilidad Civil y cubiertas las garantías financieras conforme a la normativa vigente.

TRATAMIENTO DE DATOS PERSONALES.

Los Datos Personales recogidos serán incorporados a los correspondientes ficheros titularidad de MARCHAL ASEGURADORES, S.L.U., al objeto de poder enviarle comunicaciones comerciales y tramitar las solicitudes, contrataciones, peticiones y consultas realizadas por los Usuarios, así como para ampliar y mejorar los servicios y contenidos a través de los diferentes medios con los que cuenta la compañía: email, WhatsApp, tlf...

Asimismo se le informa que los datos relativos a la salud que nos facilite a través de la correspondiente valoración médica, sólo serán recogidos por MARCHAL ASEGURADORES S.L.U. bajo su expreso consentimiento, y únicamente a los efectos de cumplir con las finalidades de mediación contractualmente establecidas con Usted, siempre con el más profundo respeto a su confidencialidad y observando en todo momento las prescripciones y medidas de seguridad exigibles por la legislación aplicable y en particular mantener la información en secreto y adoptar las cautelas destinadas a evitar su alteración, pérdida, tratamiento o acceso no autorizado.

Le informamos que podrá ejercer en su caso los derechos de acceso, rectificación, cancelación, olvido, portabilidad y oposición, enviándonos un correo electrónico a adeslas@marchalaseguradores.com`;
const TermsModal = ({ open, onClose }) => /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
  motion.div,
  {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    className: "fixed inset-0 z-[700] bg-black/60 overflow-y-auto",
    onClick: onClose,
    children: /* @__PURE__ */ jsx("div", { className: "flex min-h-full items-end sm:items-center justify-center px-4 pt-20 pb-4 sm:py-8", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { y: 40, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 40, opacity: 0 },
        transition: { type: "spring", damping: 28, stiffness: 320 },
        className: "bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg flex flex-col relative",
        style: {
          boxShadow: "0 24px 64px rgba(0,48,135,0.25)",
          maxHeight: "calc(100dvh - 6rem)"
        },
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center justify-between px-6 py-4 rounded-t-2xl flex-shrink-0",
              style: { backgroundColor: "#003087" },
              children: [
                /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-base leading-tight", children: "Aviso Legal y Política de Privacidad" }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: onClose,
                    className: "text-white/70 hover:text-white p-1 ml-3 flex-shrink-0",
                    children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "overflow-y-auto px-6 py-5 flex-1 overscroll-contain", children: LEGAL_TEXT.split("\n\n").map((para, i) => /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed mb-4 last:mb-0", children: para }, i)) }),
          /* @__PURE__ */ jsx("div", { className: "px-6 py-4 border-t border-gray-100 flex-shrink-0", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              className: "w-full py-2.5 rounded-xl text-white font-bold text-sm",
              style: { backgroundColor: "#E4097D" },
              children: "Entendido"
            }
          ) })
        ]
      }
    ) })
  }
) });
const TermsCheckbox = ({ checked, onChange, error }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 mt-1", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          id: "terms-check",
          checked,
          onChange: (e) => onChange(e.target.checked),
          className: "mt-0.5 flex-shrink-0 cursor-pointer",
          style: {
            width: 16,
            height: 16,
            accentColor: "#009FE3",
            outline: error ? "2px solid #EF4444" : void 0,
            borderRadius: 3
          }
        }
      ),
      /* @__PURE__ */ jsxs("label", { htmlFor: "terms-check", className: "text-[11px] text-gray-500 leading-snug cursor-pointer select-none", children: [
        "Acepto los",
        " ",
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: (e) => {
              e.preventDefault();
              setModalOpen(true);
            },
            className: "font-semibold underline",
            style: { color: "#009FE3" },
            children: "términos y condiciones"
          }
        ),
        " ",
        "y la política de privacidad"
      ] })
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "text-[11px] mt-0.5", style: { color: "#EF4444" }, children: "Debes aceptar los términos y condiciones para continuar" }),
    /* @__PURE__ */ jsx(TermsModal, { open: modalOpen, onClose: () => setModalOpen(false) })
  ] });
};

const Ctx = createContext({ openPhonePopup: () => {
} });
const usePhonePopup = () => useContext(Ctx);
const PhonePopupProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [termsError, setTermsError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const sourceRef = useRef(301);
  const formatPhoneDisplay = (raw) => {
    const d = raw.replace(/\D/g, "").slice(0, 9);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
    return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  };
  const handlePhoneChange = (e) => {
    setPhone(formatPhoneDisplay(e.target.value));
    if (phoneError) setPhoneError(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    if (!/^[67]\d{8}$/.test(phone.replace(/\s/g, ""))) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    await submitToHubSpot({ phone: "+34" + phone.replace(/\s/g, ""), source: sourceRef.current });
    trackGenerateLead(phone, "popup_te_llamamos", sourceRef.current);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setPhone("");
      setTermsAccepted(false);
      setOpen(false);
    }, 3e3);
  };
  return /* @__PURE__ */ jsxs(Ctx.Provider, { value: { openPhonePopup: (source = 301) => {
    sourceRef.current = source;
    setOpen(true);
  } }, children: [
    children,
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[600] flex items-center justify-center bg-black/50 p-4",
        onClick: () => setOpen(false),
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.95, opacity: 0, y: 8 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.95, opacity: 0, y: 8 },
            transition: { type: "spring", damping: 28, stiffness: 300 },
            className: "bg-white rounded-2xl w-full max-w-sm flex flex-col",
            style: {
              boxShadow: "0 24px 64px rgba(0,48,135,0.22)",
              maxHeight: "90dvh"
            },
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "flex-shrink-0 flex items-center justify-end px-4 py-2",
                  style: { borderBottom: "1px solid #F1F5F9" },
                  children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setOpen(false),
                      className: "w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors",
                      children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "overflow-y-auto flex-1 p-6 pt-5", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-center mb-5", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center",
                      style: { backgroundColor: "#E8F4FC" },
                      children: /* @__PURE__ */ jsx(Phone, { className: "w-6 h-6", style: { color: "#009FE3" } })
                    }
                  ),
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", style: { color: "#1a2b4a" }, children: "Te llamamos gratis" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Un asesor Adeslas te contactará en minutos" })
                ] }),
                sent ? /* @__PURE__ */ jsxs("div", { className: "text-center py-4", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center",
                      style: { backgroundColor: "#E8F4FC" },
                      children: /* @__PURE__ */ jsx("span", { className: "text-xl", style: { color: "#009FE3" }, children: "✓" })
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "font-bold", style: { color: "#009FE3" }, children: "¡Te llamamos enseguida!" })
                ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
                  phoneError && /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-center", style: { color: "#E4097D" }, children: "Por favor, introduce un teléfono válido" }),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 w-full h-12 rounded-xl border px-3 focus-within:ring-2 focus-within:ring-blue-100 transition-all",
                      style: { backgroundColor: "#fff", borderColor: phoneError ? "#E4097D" : "#E5E7EB" },
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "text-lg leading-none select-none", children: "🇪🇸" }),
                        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium select-none", style: { color: "#374151" }, children: "+34" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "tel",
                            value: phone,
                            onChange: handlePhoneChange,
                            placeholder: "600 000 000",
                            autoComplete: "tel",
                            inputMode: "numeric",
                            className: "flex-1 h-full text-base border-0 bg-transparent outline-none cursor-text",
                            style: { color: "#1A3A5C" }
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    TermsCheckbox,
                    {
                      checked: termsAccepted,
                      onChange: (val) => {
                        setTermsAccepted(val);
                        if (val) setTermsError(false);
                      },
                      error: termsError
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "submit",
                      className: "w-full py-3.5 rounded-xl text-white font-bold text-base btn-cta-magenta",
                      style: { backgroundColor: "#E4097D" },
                      children: "Te llamamos ahora"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] text-gray-400 mt-3", children: "Sin compromiso · Datos protegidos" })
              ] })
            ]
          }
        )
      }
    ) })
  ] });
};

const SITE = {
  name: "Adeslas Seguros Médicos",
  legalName: "Marchal Mediadores S.L.U.",
  url: "https://adeslas.numero1salud.es",
  phone: "+34917105000",
  email: "info@marchalconsultores.com",
  address: {
    street: "Avenida de Filipinas, 28",
    city: "Madrid",
    region: "Comunidad de Madrid",
    postalCode: "28003",
    country: "ES"
  },
  geo: { lat: 40.4386, lng: -3.7071 },
  logo: "https://adeslas.numero1salud.es/logo-adeslas.png",
  ogDefault: "https://adeslas.numero1salud.es/og-default.jpg",
  social: {
    facebook: "https://www.facebook.com/adeslas"
  }
};
const organizationJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": ["InsuranceAgency", "LocalBusiness"],
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: {
    "@type": "ImageObject",
    url: SITE.logo,
    width: 200,
    height: 60
  },
  image: SITE.ogDefault,
  description: "Agente Exclusivo de SegurCaixa Adeslas en Madrid. Especialistas en seguros médicos privados: Adeslas GO, Plena Vital, Plena Plus, Plena Total, Seniors y más. Asesoramiento personalizado, alta inmediata y sin periodo de carencia. Más de 51.000 médicos en toda España.",
  telephone: SITE.phone,
  email: SITE.email,
  foundingDate: "2005",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00"
    }
  ],
  areaServed: { "@type": "Country", name: "España", "@id": "https://www.wikidata.org/wiki/Q29" },
  knowsAbout: [
    "Seguros de salud privados en España",
    "Adeslas GO",
    "Adeslas Plena Vital",
    "Adeslas Plena Vital Total",
    "Adeslas Plena Plus",
    "Adeslas Plena Total",
    "Adeslas Extra 150",
    "Adeslas Seniors",
    "Adeslas Seniors Total",
    "Seguro médico para autónomos",
    "Seguro médico para pymes y empresas",
    "Seguro dental Adeslas",
    "Seguro de decesos Adeslas",
    "Seguros de mascotas",
    "Deducción fiscal IRPF seguros médicos autónomos",
    "Cuadro médico Adeslas por provincia"
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Seguros Médicos Adeslas 2026",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Adeslas GO",
          description: "Seguro ambulatorio con copago. Desde 21€/mes. Sin hospitalización programada.",
          url: `${SITE.url}/seguro-salud/adeslas-go/`
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Adeslas Plena Vital",
          description: "Seguro completo con hospitalización y copago LMA 260€/año. Desde 38€/mes.",
          url: `${SITE.url}/seguro-salud/adeslas-plena-vital/`
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Adeslas Plena Vital Total",
          description: "Plena Vital + dental, psicología y asistencia viaje. Con copago.",
          url: `${SITE.url}/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/`
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Adeslas Plena Plus",
          description: "Seguro completo sin copago. Hospitalización, cirugía, parto. Desde 50,92€/mes.",
          url: `${SITE.url}/seguro-salud/adeslas-plena-plus/`
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Adeslas Plena Total",
          description: "El seguro más completo de Adeslas. Sin copago, con dental, psicología y garantía de precio 3 años. Desde 83€/mes.",
          url: `${SITE.url}/seguro-salud/adeslas-plena-total/`
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Adeslas Extra 150",
          description: "Libre elección médica con reembolso del 80% hasta 150.000€/año.",
          url: `${SITE.url}/seguro-salud/adeslas-extra-150/`
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Adeslas Seniors",
          description: "Seguro médico para personas de 55 a 84 años. Sin límite de renovación.",
          url: `${SITE.url}/seguro-salud/adeslas-seniors/`
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Adeslas Seniors Total",
          description: "Seniors con dental, psicología y asistencia viaje. Para personas de 63 a 84 años.",
          url: `${SITE.url}/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/`
        }
      }
    ]
  },
  sameAs: [
    "https://www.adeslas.es",
    SITE.social.facebook,
    `${SITE.url}/contacto/`
  ]
});
const websiteJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  description: "Compara y contrata los seguros médicos Adeslas en España. Más de 51.000 médicos en 1.400 centros. Sin copago desde 50€/mes. Calcula tu precio en 2 minutos.",
  publisher: { "@id": `${SITE.url}/#organization` },
  inLanguage: "es-ES",
  about: {
    "@type": "Thing",
    name: "Seguros de salud privados en España",
    description: "Información y contratación de seguros médicos privados de Adeslas: GO, Plena Vital, Plena Plus, Plena Total, Extra 150, Seniors y Seniors Total."
  },
  keywords: "seguro médico Adeslas, contratar Adeslas, precio Adeslas 2026, alta Adeslas, Adeslas Plena Total, Adeslas GO, seguro salud privado España",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE.url}/cuadro-medico/?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
});
const localBusinessJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.url}/#localbusiness`,
  name: SITE.name,
  legalName: SITE.legalName,
  description: "Agencia Exclusiva Adeslas en Madrid. Asesoramiento personalizado para contratar tu seguro médico privado. Presupuesto sin compromiso por teléfono o en oficina.",
  url: `${SITE.url}/contacto/`,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00"
    }
  ],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Domiciliación bancaria, Tarjeta",
  image: SITE.ogDefault,
  logo: SITE.logo,
  hasMap: "https://maps.google.com/?q=Avenida+de+Filipinas+28+Madrid",
  areaServed: [
    { "@type": "City", name: "Madrid" },
    { "@type": "Country", name: "España" }
  ],
  sameAs: [SITE.url, SITE.social.facebook]
});
function useSeo({
  title,
  description,
  canonical,
  faqSchema,
  ogImage,
  ogType = "website",
  productSchema,
  breadcrumbs,
  addOrganizationSchema = false,
  addWebsiteSchema = false,
  addLocalBusinessSchema = false,
  noindex = false,
  robots,
  preloadImage
}) {
  const stringFaqs = faqSchema?.filter((f) => typeof f.a === "string");
  const faqJsonLd = stringFaqs && stringFaqs.length > 0 ? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: stringFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  }) : null;
  const productJsonLd = productSchema ? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: productSchema.name,
    description: productSchema.description,
    category: productSchema.category,
    image: productSchema.image ?? SITE.ogDefault,
    brand: { "@type": "Brand", name: "Adeslas" },
    offers: productSchema.price ? {
      "@type": "Offer",
      price: productSchema.price,
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: productSchema.price,
        priceCurrency: "EUR",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "1",
          unitText: productSchema.pricePeriod === "month" ? "month" : "year"
        }
      },
      availability: "https://schema.org/InStock",
      url: productSchema.url,
      seller: {
        "@type": "InsuranceAgency",
        name: "Marchal Mediadores · Agente Exclusivo Adeslas",
        url: SITE.url
      }
    } : void 0,
    provider: {
      "@type": "InsuranceAgency",
      name: "Adeslas",
      url: "https://www.adeslas.es",
      foundingDate: "1972",
      description: "SegurCaixa Adeslas, aseguradora de salud líder en España con más de 40 años de experiencia y más de 51.000 especialistas."
    }
  }) : null;
  const breadcrumbJsonLd = breadcrumbs && breadcrumbs.length > 0 ? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: b.url
    }))
  }) : null;
  const robotsContent = robots ?? (noindex ? "noindex, nofollow" : "index, follow");
  const finalOgImage = ogImage ?? SITE.ogDefault;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Helmet, { children: [
      /* @__PURE__ */ jsx("title", { children: title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: robotsContent }),
      /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonical }),
      preloadImage && /* @__PURE__ */ jsx(
        "link",
        {
          rel: "preload",
          as: "image",
          href: preloadImage,
          fetchPriority: "high",
          type: "image/webp"
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
      /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
      /* @__PURE__ */ jsx("meta", { property: "og:type", content: ogType }),
      /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonical }),
      /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "es_ES" }),
      /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: SITE.name }),
      /* @__PURE__ */ jsx("meta", { property: "og:image", content: finalOgImage }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
      /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
      /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: finalOgImage })
    ] }),
    faqJsonLd && /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: faqJsonLd }
      }
    ),
    productJsonLd && /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: productJsonLd }
      }
    ),
    breadcrumbJsonLd && /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: breadcrumbJsonLd }
      }
    ),
    addOrganizationSchema && /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: organizationJsonLd }
      }
    ),
    addWebsiteSchema && /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: websiteJsonLd }
      }
    ),
    addLocalBusinessSchema && /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: localBusinessJsonLd }
      }
    )
  ] });
}

const PRODUCT_SPECS = {
  ya: { hospitalizacion: false, urgencias: false, extranjero: false, farmacia: false, fisioterapia: true, dental: false, chequeo: false },
  esencial: { hospitalizacion: true, urgencias: true, extranjero: "12.000 €", farmacia: false, fisioterapia: true, dental: false, chequeo: false },
  plena: { hospitalizacion: true, urgencias: true, extranjero: "12.000 €", farmacia: false, fisioterapia: true, dental: false, chequeo: false },
  completaPlus: { hospitalizacion: true, urgencias: true, extranjero: "30.000 €", farmacia: "50 %", fisioterapia: true, dental: true, chequeo: true },
  completaPlusPlus: { hospitalizacion: true, urgencias: true, extranjero: "12.000 €", farmacia: false, fisioterapia: true, dental: false, chequeo: false },
  completa: { hospitalizacion: true, urgencias: true, extranjero: "100.000 €", farmacia: "50 %", fisioterapia: true, dental: true, chequeo: true },
  reembolso: { hospitalizacion: true, urgencias: true, extranjero: "12.000 €", farmacia: false, fisioterapia: true, dental: false, chequeo: false },
  seniors: { hospitalizacion: true, urgencias: true, extranjero: "12.000 €", farmacia: false, fisioterapia: true, dental: true, chequeo: false },
  "seniors-total": { hospitalizacion: true, urgencias: true, extranjero: "100.000 €", farmacia: "50 %", fisioterapia: true, dental: true, chequeo: false }
};
const FEATURE_GROUPS = [
  {
    label: "Cobertura médica",
    features: [
      { key: "analisis", icon: "🧪", label: "Análisis clínicos" },
      { key: "especialidades", icon: "🩺", label: "Especialistas" },
      { key: "diagnostico", icon: "🔬", label: "Diagnóstico" },
      { key: "hospitalizacion", icon: "🏥", label: "Hospitalización" },
      { key: "urgencias", icon: "🚑", label: "Urgencias 24 h" }
    ]
  },
  {
    label: "Coberturas adicionales",
    features: [
      { key: "extranjero", icon: "✈️", label: "Extranjero" },
      { key: "farmacia", icon: "💊", label: "Farmacia" }
    ]
  },
  {
    label: "Servicios incluidos",
    features: [
      { key: "fisioterapia", icon: "🏃", label: "Rehabilitación" },
      { key: "dental", icon: "🦷", label: "Dental incluido" },
      { key: "chequeo", icon: "🩻", label: "Chequeo médico anual" }
    ]
  }
];
const COPAGO_PILL = {
  ya: { label: "Con copago", bg: "#FEF3C7", color: "#92400E", border: "#FCD34D" },
  esencial: { label: "Con copago", bg: "#FEF3C7", color: "#92400E", border: "#FCD34D" },
  plena: { label: "Copago reducido", bg: "#E0F2FE", color: "#0369A1", border: "#7DD3FC" },
  completaPlus: { label: "Con copago", bg: "#FEF3C7", color: "#92400E", border: "#FCD34D" },
  completaPlusPlus: { label: "Sin copago", bg: "#DCFCE7", color: "#15803D", border: "#86EFAC" },
  completa: { label: "Sin copago", bg: "#DCFCE7", color: "#15803D", border: "#86EFAC" },
  reembolso: { label: "Sin copago", bg: "#DCFCE7", color: "#15803D", border: "#86EFAC" },
  seniors: { label: "Con copago", bg: "#FEF3C7", color: "#92400E", border: "#FCD34D" },
  "seniors-total": { label: "Con copago", bg: "#FEF3C7", color: "#92400E", border: "#FCD34D" }
};
const TABLE_NAME = {
  completaPlus: "Adeslas Vital Total"
};
const HIGHLIGHTED_IDS = /* @__PURE__ */ new Set(["completa", "completaPlus"]);
const PROMO_IDS = /* @__PURE__ */ new Set(["completa", "completaPlus"]);
const CATEGORY_MAP = {
  ya: "Ambulatorio",
  esencial: "Completo",
  plena: "Completo",
  completaPlus: "Completo",
  completaPlusPlus: "Completo",
  completa: "Completo",
  reembolso: "Reembolso",
  seniors: "Sénior",
  "seniors-total": "Sénior"
};
const CATEGORY_STYLE = {
  Ambulatorio: { color: "#C2410C", border: "#F97316", bg: "#FFF7ED" },
  Completo: { color: "#C2410C", border: "#F97316", bg: "#FFF7ED" },
  Reembolso: { color: "#C2410C", border: "#F97316", bg: "#FFF7ED" },
  Sénior: { color: "#6D28D9", border: "#8B5CF6", bg: "#F5F3FF" }
};
function getCoverage(productId, key) {
  if (key === "analisis" || key === "especialidades" || key === "diagnostico") return true;
  const spec = PRODUCT_SPECS[productId];
  if (!spec) return false;
  return spec[key];
}
function CheckIcon$1({ isHL = false }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      style: {
        display: "inline-flex",
        width: 22,
        height: 22,
        borderRadius: "50%",
        backgroundColor: isHL ? "#FFFFFF" : "#009FE3",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: isHL ? "0 2px 8px rgba(0,0,0,0.22)" : "0 2px 8px rgba(0,159,227,0.4)"
      },
      children: /* @__PURE__ */ jsx("svg", { width: "12", height: "10", viewBox: "0 0 12 10", fill: "none", children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M1.5 5L4.5 8L10.5 1.5",
          stroke: isHL ? "#003087" : "#FFFFFF",
          strokeWidth: "2.2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ) })
    }
  );
}
function CrossIcon({ isHL = false }) {
  return /* @__PURE__ */ jsx("span", { style: { display: "inline-flex", width: 22, height: 22, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5",
      stroke: isHL ? "rgba(255,255,255,0.45)" : "#CBD5E1",
      strokeWidth: "1.8",
      strokeLinecap: "round"
    }
  ) }) });
}
function ValueCell({ value, isHL }) {
  if (value === false) return /* @__PURE__ */ jsx(CrossIcon, { isHL });
  if (typeof value === "string") {
    return /* @__PURE__ */ jsx("span", { style: {
      display: "inline-block",
      fontSize: 10,
      fontWeight: 700,
      padding: "3px 8px",
      borderRadius: 20,
      backgroundColor: isHL ? "#FFFFFF" : "#DBEAFE",
      color: isHL ? "#003087" : "#1E40AF",
      lineHeight: 1.5,
      whiteSpace: "nowrap",
      letterSpacing: "0.01em",
      border: isHL ? "1px solid rgba(255,255,255,0.9)" : "1px solid #BFDBFE",
      boxShadow: isHL ? "0 1px 6px rgba(0,0,0,0.15)" : "none"
    }, children: value });
  }
  return /* @__PURE__ */ jsx(CheckIcon$1, { isHL });
}
const fmtPrice = (price) => {
  const [int, dec] = price.toFixed(2).split(".");
  return { int, dec };
};
const LABEL_W = 162;
const PROD_W = 138;
function ModalResultados({
  results,
  ages,
  provincia,
  nombre,
  email,
  telefono,
  numAsegurados,
  onClose
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  const scrollRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
      setHasScrolled(el.scrollLeft > 4);
    };
    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [results]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const categoryGroups = results.reduce((acc, r) => {
    const cat = CATEGORY_MAP[r.product.id] ?? "Completo";
    if (acc.length === 0 || acc[acc.length - 1].label !== cat) {
      acc.push({ label: cat, count: 1 });
    } else {
      acc[acc.length - 1].count++;
    }
    return acc;
  }, []);
  const primerNombre = nombre ? nombre.trim().split(" ")[0] : "";
  return createPortal(
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[9999] flex flex-col", style: { backgroundColor: "#EEF5FB" }, children: [
      /* @__PURE__ */ jsxs(
        "header",
        {
          className: "flex-shrink-0 px-4 py-3 sm:px-6 flex items-center justify-between",
          style: { background: "linear-gradient(120deg,#002266 0%,#003087 50%,#0077B6 100%)" },
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-sm leading-tight", children: primerNombre ? `¡Hola ${primerNombre}! Tu seguro está listo 🎉` : "Tu seguro Adeslas está listo 🎉" }),
              /* @__PURE__ */ jsxs("p", { className: "text-[11px] mt-0.5", style: { color: "rgba(255,255,255,0.65)" }, children: [
                numAsegurados,
                " ",
                numAsegurados === 1 ? "asegurado" : "asegurados",
                " · ",
                provincia
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "tel:917105000",
                  className: "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white",
                  style: { backgroundColor: "rgba(255,255,255,0.18)" },
                  children: [
                    /* @__PURE__ */ jsx(Phone, { className: "w-3 h-3" }),
                    " 91 710 50 00"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClose,
                  className: "w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0",
                  style: { backgroundColor: "rgba(255,255,255,0.18)" },
                  "aria-label": "Cerrar",
                  children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-white" })
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "px-3 py-4 sm:px-6 sm:py-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4 sm:gap-6 mb-4 text-[11px] text-gray-500 flex-wrap", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Shield, { className: "w-3.5 h-3.5 text-green-500 flex-shrink-0" }),
            " Contratación segura"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5 flex-shrink-0", style: { color: "#009FE3" } }),
            " Sin compromiso"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm leading-none", children: "🔒" }),
            " SSL cifrado"
          ] })
        ] }),
        results.length === 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-8 text-center shadow-sm max-w-sm mx-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "text-4xl mb-3", children: "⚠️" }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-800 mb-2", children: "No hay tarifas disponibles" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mb-5", children: "No hemos encontrado tarifas para los datos seleccionados." }),
          /* @__PURE__ */ jsx("button", { onClick: onClose, className: "text-sm font-semibold hover:underline", style: { color: "#009FE3" }, children: "← Volver al calculador" })
        ] }),
        results.length > 0 && /* @__PURE__ */ jsxs("div", { style: { position: "relative", maxWidth: 1200, margin: "0 auto" }, children: [
          canScrollRight && /* @__PURE__ */ jsxs(
            "div",
            {
              className: "sm:hidden flex items-center justify-center gap-1.5 mb-2",
              style: { color: "#009FE3", fontSize: 11, fontWeight: 600 },
              children: [
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5 opacity-70" }),
                /* @__PURE__ */ jsx("span", { children: "Desliza para ver todos los planes" }),
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5 opacity-70" })
              ]
            }
          ),
          canScrollRight && /* @__PURE__ */ jsx("div", { style: {
            position: "absolute",
            top: 0,
            right: 0,
            width: 56,
            height: "100%",
            zIndex: 15,
            pointerEvents: "none",
            background: "linear-gradient(to right, transparent, rgba(238,245,251,0.98))",
            borderRadius: "0 14px 14px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 10
          }, children: /* @__PURE__ */ jsx("div", { style: {
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "#003087",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.55,
            boxShadow: "0 2px 8px rgba(0,48,135,0.3)"
          }, children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-white" }) }) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: scrollRef,
              style: {
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: 14,
                boxShadow: "0 4px 28px rgba(0,48,135,0.13)",
                border: "1px solid #DDE5EF",
                scrollbarWidth: "thin",
                scrollbarColor: "#CBD5E1 transparent"
              },
              children: /* @__PURE__ */ jsxs("table", { style: {
                tableLayout: "fixed",
                borderCollapse: "separate",
                borderSpacing: 0,
                width: `${LABEL_W + results.length * PROD_W}px`,
                minWidth: `${LABEL_W + results.length * PROD_W}px`
              }, children: [
                /* @__PURE__ */ jsxs("colgroup", { children: [
                  /* @__PURE__ */ jsx("col", { style: { width: LABEL_W } }),
                  results.map((r) => /* @__PURE__ */ jsx("col", { style: { width: PROD_W } }, r.product.id))
                ] }),
                /* @__PURE__ */ jsxs("thead", { children: [
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { style: {
                      position: "sticky",
                      left: 0,
                      zIndex: 22,
                      backgroundColor: "#F8FAFC",
                      borderRight: "1px solid #DDE5EF",
                      borderBottom: "1px solid #DDE5EF",
                      padding: 0,
                      boxShadow: hasScrolled ? "4px 0 14px rgba(0,48,135,0.12)" : "none",
                      transition: "box-shadow 0.2s"
                    } }),
                    categoryGroups.map((group) => {
                      const s = CATEGORY_STYLE[group.label] ?? CATEGORY_STYLE["Completo"];
                      return /* @__PURE__ */ jsx(
                        "th",
                        {
                          colSpan: group.count,
                          style: {
                            backgroundColor: s.bg,
                            borderBottom: `2px solid ${s.border}`,
                            borderLeft: `1px solid ${s.border}`,
                            padding: "7px 10px",
                            textAlign: "center"
                          },
                          children: /* @__PURE__ */ jsx("span", { style: {
                            fontSize: 10,
                            fontWeight: 800,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: s.color
                          }, children: group.label })
                        },
                        group.label
                      );
                    })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { style: {
                      position: "sticky",
                      left: 0,
                      zIndex: 20,
                      backgroundColor: "#F8FAFC",
                      borderBottom: "2px solid #DDE5EF",
                      borderRight: "1px solid #DDE5EF",
                      padding: "16px 14px",
                      verticalAlign: "bottom",
                      textAlign: "left",
                      boxShadow: hasScrolled ? "4px 0 14px rgba(0,48,135,0.12)" : "none",
                      transition: "box-shadow 0.2s"
                    } }),
                    results.map((result) => {
                      const isHL = HIGHLIGHTED_IDS.has(result.product.id);
                      const hasDisc = result.originalPrice !== void 0;
                      const { int, dec } = fmtPrice(result.price);
                      const copago = COPAGO_PILL[result.product.id] ?? { label: "Con copago", bg: "#FEF3C7", color: "#92400E", border: "#FCD34D" };
                      return /* @__PURE__ */ jsx(
                        "th",
                        {
                          style: {
                            padding: 0,
                            verticalAlign: "top",
                            borderLeft: `1px solid ${isHL ? "#003087" : "#DDE5EF"}`,
                            borderBottom: `2px solid ${isHL ? "#003087" : "#DDE5EF"}`,
                            background: isHL ? "linear-gradient(160deg,#002266 0%,#003087 55%,#004DB3 100%)" : "#FFFFFF"
                          },
                          children: /* @__PURE__ */ jsxs("div", { style: {
                            padding: "12px 10px 14px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 6,
                            minHeight: 138
                          }, children: [
                            /* @__PURE__ */ jsx("p", { style: {
                              fontSize: 12,
                              fontWeight: 800,
                              lineHeight: 1.3,
                              textAlign: "center",
                              margin: 0,
                              color: isHL ? "#FFFFFF" : "#003087",
                              overflowWrap: "break-word",
                              wordBreak: "break-word",
                              hyphens: "auto",
                              width: "100%"
                            }, children: TABLE_NAME[result.product.id] ?? result.product.name }),
                            /* @__PURE__ */ jsxs("div", { style: { textAlign: "center" }, children: [
                              hasDisc && /* @__PURE__ */ jsxs("p", { style: {
                                fontSize: 9,
                                textDecoration: "line-through",
                                textAlign: "center",
                                color: isHL ? "rgba(255,255,255,0.45)" : "#CBD5E1",
                                margin: 0,
                                lineHeight: 1.2
                              }, children: [
                                fmtPrice(result.originalPrice).int,
                                ",",
                                fmtPrice(result.originalPrice).dec,
                                "€"
                              ] }),
                              /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 1, justifyContent: "center" }, children: [
                                /* @__PURE__ */ jsx("span", { style: { fontSize: 24, fontWeight: 900, lineHeight: 1, color: isHL ? "#FFFFFF" : "#003087" }, children: int }),
                                /* @__PURE__ */ jsxs("span", { style: { fontSize: 12, fontWeight: 700, color: isHL ? "#FFFFFF" : "#003087" }, children: [
                                  ",",
                                  dec,
                                  "€"
                                ] }),
                                /* @__PURE__ */ jsx("span", { style: { fontSize: 9, color: isHL ? "rgba(255,255,255,0.55)" : "#94A3B8", marginLeft: 2 }, children: "/mes" })
                              ] }),
                              hasDisc && /* @__PURE__ */ jsx("p", { style: { fontSize: 9, fontWeight: 700, color: "#4ADE80", textAlign: "center", margin: 0, lineHeight: 1.6 }, children: "🎉 −10 %" })
                            ] }),
                            /* @__PURE__ */ jsxs("div", { style: { marginTop: "auto", display: "flex", flexDirection: "column", gap: 5, alignItems: "center", width: "100%" }, children: [
                              /* @__PURE__ */ jsx("span", { style: {
                                display: "inline-block",
                                fontSize: 10,
                                fontWeight: 700,
                                padding: "3px 9px",
                                borderRadius: 20,
                                lineHeight: 1.5,
                                whiteSpace: "nowrap",
                                backgroundColor: isHL ? "rgba(255,255,255,0.18)" : copago.bg,
                                color: isHL ? "#FFFFFF" : copago.color,
                                border: isHL ? "1px solid rgba(255,255,255,0.3)" : `1px solid ${copago.border}`
                              }, children: copago.label }),
                              PROMO_IDS.has(result.product.id) && /* @__PURE__ */ jsx("span", { style: {
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                                fontSize: 10,
                                fontWeight: 800,
                                padding: "3px 9px",
                                borderRadius: 20,
                                lineHeight: 1.5,
                                whiteSpace: "nowrap",
                                backgroundColor: isHL ? "#FFFFFF" : "#003087",
                                color: isHL ? "#003087" : "#FFFFFF",
                                border: isHL ? "1px solid rgba(255,255,255,0.8)" : "1px solid #003087",
                                boxShadow: isHL ? "0 2px 8px rgba(0,0,0,0.18)" : "0 2px 8px rgba(0,48,135,0.30)"
                              }, children: "🔒 3 años sin subidas" })
                            ] })
                          ] })
                        },
                        result.product.id
                      );
                    })
                  ] })
                ] }),
                /* @__PURE__ */ jsx("tbody", { children: FEATURE_GROUPS.map((group, gi) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { style: {
                      position: "sticky",
                      left: 0,
                      zIndex: 10,
                      backgroundColor: "#EEF3FA",
                      borderTop: gi === 0 ? "none" : "2px solid #DDE5EF",
                      borderBottom: "1px solid #DDE5EF",
                      borderRight: "1px solid #DDE5EF",
                      padding: "7px 14px",
                      boxShadow: hasScrolled ? "4px 0 14px rgba(0,48,135,0.12)" : "none",
                      transition: "box-shadow 0.2s"
                    }, children: /* @__PURE__ */ jsx("span", { style: {
                      fontSize: 9,
                      fontWeight: 800,
                      color: "#64748B",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em"
                    }, children: group.label }) }),
                    results.map((r) => {
                      const isHL = HIGHLIGHTED_IDS.has(r.product.id);
                      return /* @__PURE__ */ jsx("td", { style: {
                        backgroundColor: isHL ? "rgba(0,48,135,0.07)" : "#EEF3FA",
                        borderTop: gi === 0 ? "none" : `2px solid ${isHL ? "rgba(0,48,135,0.15)" : "#DDE5EF"}`,
                        borderBottom: "1px solid #DDE5EF",
                        borderLeft: `1px solid ${isHL ? "rgba(0,48,135,0.12)" : "#DDE5EF"}`
                      } }, r.product.id);
                    })
                  ] }),
                  group.features.map((feat, fi) => {
                    const rowKey = `${gi}-${feat.key}`;
                    const isHovered = hoveredRow === rowKey;
                    const isLastInGroup = fi === group.features.length - 1;
                    const isAbsoluteLast = gi === FEATURE_GROUPS.length - 1 && isLastInGroup;
                    return /* @__PURE__ */ jsxs(
                      "tr",
                      {
                        onMouseEnter: () => setHoveredRow(rowKey),
                        onMouseLeave: () => setHoveredRow(null),
                        children: [
                          /* @__PURE__ */ jsx("td", { style: {
                            position: "sticky",
                            left: 0,
                            zIndex: 10,
                            backgroundColor: isHovered ? "#E8EEF8" : "#FFFFFF",
                            borderBottom: isAbsoluteLast ? "none" : "1px solid #F1F5F9",
                            borderRight: "1px solid #DDE5EF",
                            padding: "10px 14px",
                            boxShadow: hasScrolled ? "4px 0 14px rgba(0,48,135,0.12)" : "none",
                            transition: "background-color 0.12s, box-shadow 0.2s"
                          }, children: /* @__PURE__ */ jsxs("span", { style: {
                            fontSize: 12,
                            color: "#334155",
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                            whiteSpace: "nowrap"
                          }, children: [
                            /* @__PURE__ */ jsx("span", { style: { fontSize: 15, lineHeight: 1, flexShrink: 0 }, children: feat.icon }),
                            feat.label
                          ] }) }),
                          results.map((result) => {
                            const isHL = HIGHLIGHTED_IDS.has(result.product.id);
                            const val = getCoverage(result.product.id, feat.key);
                            return /* @__PURE__ */ jsx(
                              "td",
                              {
                                style: {
                                  borderBottom: isAbsoluteLast ? "none" : `1px solid ${isHL ? "rgba(0,48,135,0.07)" : "#F1F5F9"}`,
                                  borderLeft: `1px solid ${isHL ? "rgba(0,48,135,0.09)" : "#F1F5F9"}`,
                                  padding: "10px 6px",
                                  textAlign: "center",
                                  backgroundColor: isHL ? isHovered ? "rgba(0,48,135,0.09)" : "rgba(0,48,135,0.04)" : isHovered ? "#E8EEF8" : "#FFFFFF",
                                  transition: "background-color 0.12s"
                                },
                                children: /* @__PURE__ */ jsx(ValueCell, { value: val, isHL })
                              },
                              result.product.id
                            );
                          })
                        ]
                      },
                      feat.key
                    );
                  })
                ] }, group.label)) })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-6 mb-4 w-full max-w-screen-md mx-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("div", { className: "w-full border-t border-gray-200" }) }),
          /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-[11px] text-gray-400 bg-[#EEF5FB] px-3", children: "¿Tienes dudas sobre las coberturas?" })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-white rounded-2xl shadow-sm mb-20 sm:mb-8 w-full mx-auto overflow-hidden",
            style: { maxWidth: 400, border: "1px solid #E2E8F0" },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "px-4 py-2.5 text-center",
                  style: { backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" },
                  children: /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-gray-500", children: "Nuestros asesores te ayudan a elegir el seguro perfecto" })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 divide-x divide-gray-100", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "tel:917105000",
                    className: "flex flex-col items-center gap-1.5 py-4 px-3 text-center hover:bg-gray-50 transition-colors",
                    children: [
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                          style: { backgroundColor: "#EFF6FF" },
                          children: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4", style: { color: "#009FE3" } })
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { className: "text-xs font-bold", style: { color: "#003087" }, children: "91 710 50 00" }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 leading-tight", children: "Lun–Vie 9:00–19:00" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: `https://wa.me/34722567198?text=${encodeURIComponent("Hola, tengo dudas sobre las coberturas de los seguros Adeslas y me gustaría recibir asesoramiento personalizado. ¿Me pueden ayudar?")}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "flex flex-col items-center gap-1.5 py-4 px-3 text-center transition-colors",
                    style: { cursor: "pointer" },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.backgroundColor = "#F0FDF4";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
                          style: { backgroundColor: "#DCFCE7" },
                          children: /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "#16A34A", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" }) })
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { className: "text-xs font-bold", style: { color: "#15803D" }, children: "WhatsApp" }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 leading-tight", children: "Respuesta inmediata" })
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: `https://wa.me/34722567198?text=${encodeURIComponent("Hola, tengo dudas sobre las coberturas de los seguros Adeslas y me gustaría recibir asesoramiento personalizado. ¿Me pueden ayudar?")}`,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": "Contactar por WhatsApp",
          style: {
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 10001,
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#25D366",
            color: "#FFFFFF",
            padding: "10px 16px 10px 12px",
            borderRadius: 50,
            boxShadow: "0 4px 20px rgba(37,211,102,0.50)",
            textDecoration: "none",
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 1.2,
            transition: "transform 0.15s, box-shadow 0.15s",
            whiteSpace: "nowrap"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.60)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.50)";
          },
          children: [
            /* @__PURE__ */ jsx("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "#FFFFFF", style: { flexShrink: 0 }, children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" }) }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "¿Dudas? Escríbenos" }),
            /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: "Dudas" })
          ]
        }
      )
    ] }),
    document.body
  );
}

const provinceToZone = {
  // ZONA 1: Extremadura, Murcia, Galicia, Canarias, Ceuta, Melilla
  "Badajoz": 1,
  "Cáceres": 1,
  "Murcia": 1,
  "A Coruña": 1,
  "Lugo": 1,
  "Ourense": 1,
  "Pontevedra": 1,
  "Las Palmas": 1,
  "Santa Cruz de Tenerife": 1,
  "Ceuta": 1,
  "Melilla": 1,
  // ZONA 2: Andalucía, Cantabria, C. Valenciana, La Rioja
  "Almería": 2,
  "Cádiz": 2,
  "Córdoba": 2,
  "Granada": 2,
  "Huelva": 2,
  "Jaén": 2,
  "Málaga": 2,
  "Sevilla": 2,
  "Cantabria": 2,
  "Alicante": 2,
  "Castellón": 2,
  "Valencia": 2,
  "La Rioja": 2,
  // ZONA 3: Castilla y León
  "Ávila": 3,
  "Burgos": 3,
  "León": 3,
  "Palencia": 3,
  "Salamanca": 3,
  "Segovia": 3,
  "Soria": 3,
  "Valladolid": 3,
  "Zamora": 3,
  // ZONA 4: Cataluña (excl. Barcelona), Castilla-La Mancha, Madrid, Aragón
  "Girona": 4,
  "Lleida": 4,
  "Tarragona": 4,
  "Albacete": 4,
  "Ciudad Real": 4,
  "Cuenca": 4,
  "Guadalajara": 4,
  "Toledo": 4,
  "Madrid": 4,
  "Huesca": 4,
  "Teruel": 4,
  "Zaragoza": 4,
  // ZONA 5: Barcelona
  "Barcelona": 5,
  // ZONA 6: Baleares
  "Ibiza": 6,
  "Mallorca": 6,
  "Menorca": 6
};
const provinces = [
  "A Coruña",
  "Albacete",
  "Alicante",
  "Almería",
  "Ávila",
  "Badajoz",
  "Barcelona",
  "Burgos",
  "Cáceres",
  "Cádiz",
  "Cantabria",
  "Castellón",
  "Ceuta",
  "Ciudad Real",
  "Córdoba",
  "Cuenca",
  "Girona",
  "Granada",
  "Guadalajara",
  "Huelva",
  "Huesca",
  "Ibiza",
  "Jaén",
  "La Rioja",
  "Las Palmas",
  "León",
  "Lleida",
  "Lugo",
  "Madrid",
  "Málaga",
  "Mallorca",
  "Melilla",
  "Menorca",
  "Murcia",
  "Ourense",
  "Palencia",
  "Pontevedra",
  "Salamanca",
  "Santa Cruz de Tenerife",
  "Segovia",
  "Sevilla",
  "Soria",
  "Tarragona",
  "Teruel",
  "Toledo",
  "Valencia",
  "Valladolid",
  "Zamora",
  "Zaragoza"
];
const products = [
  /* ── ADESLAS GO ── */
  {
    id: "ya",
    name: "Adeslas GO",
    slug: "/adeslas-go",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-54": [21, 21.5, 22, 22.5, 23, 23.5],
      "55-69": [37.5, 39, 39.5, 40, 41, 41.5],
      "≥70": [50, 52, 53, 53.5, 54, 54.5]
    }
  },
  /* ── ADESLAS PLENA VITAL ── */
  {
    id: "esencial",
    name: "Adeslas Plena Vital",
    slug: "/adeslas-plena-vital",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-24": [38, 39, 39.5, 40, 41, 42.5],
      "25-44": [50, 50.5, 51, 52, 53.5, 54],
      "45-54": [61.5, 62, 63, 64, 66, 66.5],
      "55-59": [94, 95, 96.5, 99, 101, 103],
      "60-64": [117, 121, 124, 125.5, 126, 127],
      "65-69": [156, 163, 167, 167.5, 168, 169],
      "≥70": [168, 176, 179, 180, 181, 182]
    }
  },
  /* ── ADESLAS PLENA VITAL TOTAL ── */
  {
    id: "completaPlus",
    name: "Adeslas Plena Vital Total",
    slug: "/adeslas-plena-vital-total",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-24": [48.5, 49, 50, 50.5, 52, 53],
      "25-44": [59.5, 61, 62, 62.5, 63, 65],
      "45-54": [72.5, 73.5, 75, 75.5, 77, 78.5],
      "55-59": [110, 112, 114, 114.5, 115, 118],
      "60-62": [132, 133, 137, 137.5, 140, 142],
      "≥63": [196, 201, 210, 210.5, 230, 235]
    }
  },
  /* ── ADESLAS PLENA PLUS ── */
  {
    id: "completaPlusPlus",
    name: "Adeslas Plena Plus",
    slug: "/adeslas-plena-plus",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-24": [62, 64, 64, 66, 67, 69],
      "25-44": [72, 75, 76, 77, 79, 79],
      "45-54": [92, 94, 96, 99, 100, 105],
      "55-59": [149, 155, 159, 164, 166, 167],
      "60-64": [175, 181, 185, 196, 205, 207],
      "65-69": [239, 255, 259, 275, 289, 291],
      "≥70": [255, 259, 265, 279, 295, 297]
    }
  },
  /* ── ADESLAS PLENA TOTAL ── */
  {
    id: "completa",
    name: "Adeslas Plena Total",
    slug: "/adeslas-plena-total",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-24": [83, 85, 86, 87, 88.5, 89.5],
      "25-44": [99, 103, 104, 106, 108.5, 111],
      "45-54": [121, 124, 127, 131, 135.5, 137],
      "55-59": [169, 176, 179, 181, 189, 192],
      "60-62": [207, 217, 223, 227, 243, 247],
      "≥63": [273, 284, 288, 294, 315, 318]
    }
  },
  /* ── ADESLAS PLENA EXTRA ── */
  {
    id: "reembolso",
    name: "Adeslas Plena Extra",
    slug: "/adeslas-extra-150",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-24": [90, 93, 94, 102, 102.5, 104],
      "25-44": [106, 110, 111, 120, 120.5, 122],
      "45-54": [112, 118, 119, 129, 130, 132],
      "55-59": [174, 180, 185, 198, 198.5, 203],
      "60-64": [206, 210, 215, 228, 228.5, 233],
      "65-69": [293, 301, 308, 320, 321, 330],
      "≥70": [304, 309, 319, 329, 330, 340]
    }
  },
  /* ── ADESLAS PLENA (Plena básico) ── */
  {
    id: "plena",
    name: "Adeslas Plena",
    slug: "/seguro-salud/adeslas-plena-vital/",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-24": [50, 51, 52, 53, 54, 55],
      "25-44": [60, 62, 63, 64, 65, 66],
      "45-54": [72, 73, 74, 75, 78, 79],
      "55-59": [105, 107, 109, 110, 112, 114],
      "60-64": [128, 130, 131, 135, 139, 140],
      "65-69": [166, 167, 169, 172, 175, 179],
      "≥70": [225, 227, 229, 235, 239, 240]
    }
  },
  /* ── ADESLAS NEGOCIOS NIF (Autónomos) ── */
  {
    id: "negocios-nif",
    name: "Adeslas Negocios NIF",
    slug: "/seguro-salud/autonomos/",
    maxAge: 70,
    ageType: "range",
    prices: {
      "0-24": [55.5, 56.5, 57, 59, 61, 61.5],
      "25-44": [61, 63.5, 64.5, 65.5, 66.5, 68],
      "45-54": [79, 83, 84, 86.5, 88.5, 89.5],
      "55-59": [123, 127, 129, 134, 139, 139.5],
      "60-64": [153, 159, 160, 170, 175, 176],
      "65-69": [235, 238, 240, 249, 259, 264],
      "≥70": [239, 246, 249, 261, 265, 275]
    }
  },
  /* ── ADESLAS PYMES TOTAL ── */
  {
    id: "pymes-total",
    name: "Adeslas Pymes Total",
    slug: "/seguro-salud/pymes/",
    maxAge: 99,
    ageType: "range",
    prices: {
      "0-44": [60, 62, 63, 65, 66, 67],
      "45-54": [72, 73, 75, 76, 79, 80],
      "55-59": [89, 95, 98, 99, 105, 110],
      "60-67": [125, 129, 135, 139, 139, 145],
      "≥68": [189, 199, 205, 209, 219, 225]
    }
  },
  /* ── ADESLAS SENIORS ── */
  {
    id: "seniors",
    name: "Adeslas Seniors",
    slug: "/seguro-salud/adeslas-seniors/",
    maxAge: 84,
    ageType: "range",
    prices: {
      "55-59": [67.5, 70, 71, 72, 73, 74],
      "60-64": [86, 88, 89.5, 92, 93, 94],
      "65-69": [103, 105, 106, 111, 113, 115],
      "70-74": [133, 138, 140, 145, 149, 150],
      "75-79": [162, 167, 170, 175, 179, 183],
      "80-84": [170, 175, 177, 182, 188, 190]
    }
  },
  /* ── ADESLAS SENIORS TOTAL (Plena Total Seniors) ── */
  {
    id: "seniors-total",
    name: "Adeslas Seniors Total",
    slug: "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/",
    maxAge: 84,
    ageType: "range",
    prices: {
      "63-64": [101, 104, 105, 110, 113, 116],
      "65-69": [138, 142, 144, 145, 151.5, 155],
      "70-74": [172, 176, 180, 184, 190, 195],
      "75-84": [231, 239, 245, 252, 254, 259]
    }
  }
];
const extResidentsPricing = {
  "0": [225.76, 79.02, 70.55, 65.61],
  "5": [163.2, 57.12, 51, 47.43],
  "10": [155.84, 54.54, 48.7, 45.29],
  "15": [162.24, 56.78, 50.7, 47.15],
  "20": [167.74, 57.41, 53.05, 47.33],
  "25": [175.35, 61.37, 54.8, 50.96],
  "30": [189.6, 66.36, 59.25, 55.1],
  "35": [198.4, 69.44, 62, 57.66],
  "40": [212.64, 74.42, 66.45, 61.8],
  "45": [220.17, 77.06, 68.8, 63.99],
  "50": [243.84, 85.34, 76.2, 70.87],
  "55": [305.28, 106.85, 95.4, 88.72],
  "60": [395.52, 138.43, 123.6, 114.95],
  "65": [553.76, 193.82, 173.05, 160.94],
  "70": [675.68, 236.49, 211.15, 196.37]
};
const extStudentsPricing = {
  "0-35": [38, 38, 38, 38],
  "36": [198.72, 69.55, 62.1, 57.75],
  "37": [199.36, 69.78, 62.3, 57.94],
  "38": [202.7, 70.95, 63.35, 58.91],
  "39": [204, 71.4, 63.75, 59.29],
  "40": [212.64, 74.42, 66.45, 61.8],
  "45": [220.17, 77.06, 68.8, 63.99],
  "50": [243.84, 85.34, 76.2, 70.87],
  "55": [305.28, 106.85, 95.4, 88.72],
  "60": [395.52, 138.43, 123.6, 114.95],
  "65": [553.76, 193.82, 173.05, 160.94],
  "70": [675.68, 236.49, 211.15, 196.37]
};
function getPrice(product, age, zone) {
  const zoneIdx = zone - 1;
  if (zoneIdx < 0 || zoneIdx > 5) return null;
  if (product.ageType === "individual") {
    const key = age >= 71 ? "≥71" : String(age);
    const row = product.prices[key];
    return row ? row[zoneIdx] : null;
  }
  const ranges = Object.keys(product.prices);
  for (const rangeKey of ranges) {
    if (rangeKey.startsWith("≥")) {
      const minAge = parseInt(rangeKey.replace("≥", ""), 10);
      if (age >= minAge) return product.prices[rangeKey][zoneIdx];
    } else if (rangeKey.includes("-")) {
      const [lo, hi] = rangeKey.split("-").map(Number);
      if (age >= lo && age <= hi) return product.prices[rangeKey][zoneIdx];
    }
  }
  return null;
}
function getZoneFromProvince(province) {
  return provinceToZone[province] ?? 2;
}

const formatPrice = (price) => {
  const [int, dec] = price.toFixed(2).split(".");
  return { int, dec };
};
const FAMILY_DISCOUNT_THRESHOLD = 4;
const FAMILY_DISCOUNT_RATE = 0.1;
const applyFamilyDiscount = (price, numPeople) => numPeople >= FAMILY_DISCOUNT_THRESHOLD ? price * (1 - FAMILY_DISCOUNT_RATE) : price;
const INDIVIDUAL_PRODUCT_IDS = /* @__PURE__ */ new Set([
  "ya",
  "plena",
  "esencial",
  "completaPlus",
  "completaPlusPlus",
  "completa",
  "reembolso"
]);
const productLabels = {
  ya: { tag: "Cobertura ambulatoria", color: "#10B981" },
  esencial: { tag: "Copagos medios", color: "#009FE3" },
  plena: { tag: "Copagos reducidos", color: "#0EA5E9" },
  completaPlusPlus: { tag: "Completa sin copagos", color: "#6366F1" },
  completaPlus: { tag: "Copagos · 3 años sin subidas", color: "#8B5CF6" },
  completa: { tag: "Recomendado · 3 años sin subidas", color: "#003087" },
  reembolso: { tag: "Libre elección", color: "#D97706" },
  seniors: { tag: "Recomendado personas mayores", color: "#F59E0B" },
  "seniors-total": { tag: "Personas mayores · 3 años sin subidas", color: "#0369A1" }
};
const tipoOptions = [
  { label: "Solo para mí", sub: "Individual", defaultNum: 1 },
  { label: "Mi pareja y yo", sub: "2 asegurados", defaultNum: 2 },
  { label: "Familia con hijos", sub: "3 o más", defaultNum: 3 },
  { label: "Solo mis hijos", sub: "Seguro infantil", defaultNum: 1 }
];
const tipoIconColors = ["#009FE3", "#E4097D", "#003087", "#7C3AED"];
const TipoIcon = ({ index, active }) => {
  const c = active ? "#fff" : tipoIconColors[index];
  const s = { fill: "none", stroke: c, strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  if (index === 0) return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 28 28", width: 22, height: 22, ...s, children: [
    /* @__PURE__ */ jsx("circle", { cx: "14", cy: "8", r: "4.5" }),
    /* @__PURE__ */ jsx("path", { d: "M5 26v-2a9 9 0 0 1 18 0v2" }),
    /* @__PURE__ */ jsx("path", { d: "M20 17.5c0 0-1.5-.8-2.5-.8s-2.5.8-2.5.8v2.5c0 1.2.9 2.2 2.5 2.8 1.6-.6 2.5-1.6 2.5-2.8v-2.5z", strokeWidth: 1.3 })
  ] });
  if (index === 1) return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 32 28", width: 24, height: 22, ...s, children: [
    /* @__PURE__ */ jsx("circle", { cx: "9", cy: "8", r: "4" }),
    /* @__PURE__ */ jsx("path", { d: "M1 26v-1.5A7.5 7.5 0 0 1 16 24" }),
    /* @__PURE__ */ jsx("circle", { cx: "23", cy: "8", r: "4" }),
    /* @__PURE__ */ jsx("path", { d: "M31 26v-1.5A7.5 7.5 0 0 0 16 24" }),
    /* @__PURE__ */ jsx("path", { d: "M16 17c0 0-3-2-3-4a2 2 0 0 1 3-1.5A2 2 0 0 1 19 13c0 2-3 4-3 4z", strokeWidth: 1.3 })
  ] });
  if (index === 2) return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 34 28", width: 26, height: 22, ...s, children: [
    /* @__PURE__ */ jsx("circle", { cx: "10", cy: "6.5", r: "4" }),
    /* @__PURE__ */ jsx("circle", { cx: "24", cy: "6.5", r: "4" }),
    /* @__PURE__ */ jsx("path", { d: "M2 23v-1.2a8 8 0 0 1 16 0V23" }),
    /* @__PURE__ */ jsx("path", { d: "M16 23v-1.2a8 8 0 0 1 16 0V23" }),
    /* @__PURE__ */ jsx("circle", { cx: "14", cy: "19", r: "2.2", strokeWidth: 1.3 }),
    /* @__PURE__ */ jsx("circle", { cx: "20", cy: "19", r: "2.2", strokeWidth: 1.3 })
  ] });
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 28 30", width: 20, height: 22, ...s, children: [
    /* @__PURE__ */ jsx("circle", { cx: "14", cy: "9", r: "6" }),
    /* @__PURE__ */ jsx("path", { d: "M6 28v-2a8 8 0 0 1 16 0v2" }),
    /* @__PURE__ */ jsx("path", { d: "M10 4c0 0 1.5-2.5 4-2.5S18 4 18 4", strokeWidth: 1.2 })
  ] });
};
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
const getMaxPhoneDigits = (code) => {
  if (["+34", "+33", "+351", "+56"].includes(code)) return 9;
  return 10;
};
const isValidPhone = (phone, code = "+34") => {
  const digits = phone.replace(/\D/g, "");
  if (code === "+34") return digits.length === 9 && /^[67]/.test(digits);
  return digits.length >= 7 && digits.length <= getMaxPhoneDigits(code);
};
const countryCodes = [
  { flag: "🇪🇸", code: "+34", name: "España" },
  { flag: "🇫🇷", code: "+33", name: "Francia" },
  { flag: "🇵🇹", code: "+351", name: "Portugal" },
  { flag: "🇬🇧", code: "+44", name: "Reino Unido" },
  { flag: "🇩🇪", code: "+49", name: "Alemania" },
  { flag: "🇮🇹", code: "+39", name: "Italia" },
  { flag: "🇦🇷", code: "+54", name: "Argentina" },
  { flag: "🇲🇽", code: "+52", name: "México" },
  { flag: "🇨🇴", code: "+57", name: "Colombia" },
  { flag: "🇨🇱", code: "+56", name: "Chile" },
  { flag: "🇺🇸", code: "+1", name: "EE.UU." }
];
const slugToSource = {
  // Slugs tal como vienen de la prop productSlug de cada página
  "/seguro-salud/adeslas-go/": 303,
  "/seguro-salud/adeslas-plena-vital/": 304,
  "/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/": 313,
  "/seguro-salud/adeslas-plena-total/": 305,
  "/seguro-salud/adeslas-extra-150/": 306,
  "/seguro-salud/adeslas-plena-plus/": 307,
  "/seguro-salud/adeslas-seniors/": 314,
  "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/": 315,
  "/seguro-salud/autonomos/": 319,
  "/seguro-salud/pymes/": 320,
  "/seguro-salud/empresas/": 320,
  "/seguro-dental/": 308,
  "/seguro-decesos/": 309,
  "/seguro-adeslas-decesos-prima-unica/": 323,
  "/seguro-mascotas/": 318,
  "/adeslas-asistencia-en-viaje/": 316,
  "/seguro-accidentes/": 317,
  "/adeslas-body-factory/": 321,
  "/adeslas-adif-renfe/": 322,
  "/adeslas-extranjeros": 312,
  // Slugs cortos del catálogo de pricing (fallback por si se pasa sin barra inicial)
  "/adeslas-go": 303,
  "/adeslas-plena-vital": 304,
  "/adeslas-plena-vital-total": 313,
  "/adeslas-plena-plus": 307,
  "/adeslas-plena-total": 305,
  "/adeslas-extra-150": 306,
  "seniors": 314,
  "seniors-total": 315,
  "pymes-total": 320
};
const Tarificador = ({ compact = false, productSlug, onClose }) => {
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [tipo, setTipo] = useState(-1);
  const [numAsegurados, setNumAsegurados] = useState(1);
  const [edades, setEdades] = useState([""]);
  const [provincia, setProvincia] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+34");
  const [telefono, setTelefono] = useState("");
  const [ageError, setAgeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [termsError, setTermsError] = useState(false);
  const compactBodyRef = useRef(null);
  useEffect(() => {
    if (step === 3 && compactBodyRef.current) {
      compactBodyRef.current.scrollTop = 0;
    }
  }, [step]);
  const singleProduct = productSlug ? products.find(
    (p) => p.slug === `/${productSlug}` || p.slug === productSlug
  ) : void 0;
  const zone = useMemo(() => {
    if (!provincia) return 3;
    return getZoneFromProvince(provincia);
  }, [provincia]);
  const stepLabels = [
    "Tipo de seguro",
    "Asegurados",
    "Tus datos",
    "Tu precio"
  ];
  const goToStep = (s) => setStep(s);
  const handleNumChange = (delta) => {
    const n = Math.max(1, Math.min(10, numAsegurados + delta));
    setNumAsegurados(n);
    setEdades((prev) => {
      const arr = [...prev];
      while (arr.length < n) arr.push("");
      return arr.slice(0, n);
    });
  };
  const handleTipoSelect = (i) => {
    setTipo(i);
    const opt = tipoOptions[i];
    setNumAsegurados(opt.defaultNum);
    setEdades(Array(opt.defaultNum).fill(""));
    setTimeout(() => {
      if (i === 0) {
        goToStep(1);
      } else {
        goToStep(1);
      }
    }, 200);
  };
  const validateAges = () => {
    const parsed = edades.map((e) => parseInt(e, 10));
    if (parsed.some((a) => isNaN(a) || a < 0)) {
      setAgeError("Introduce todas las edades correctamente");
      return false;
    }
    if (parsed.some((a) => a > 70)) {
      setAgeError("La edad máxima de contratación es 70 años");
      return false;
    }
    if (tipo === 1 && parsed.some((a) => a < 18)) {
      setAgeError("Ambos asegurados deben ser mayores de 18 años");
      return false;
    }
    setAgeError("");
    return true;
  };
  const handleShowResults = async () => {
    if (!nombre.trim()) {
      setAgeError("Introduce tu nombre");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Introduce un email válido");
      return;
    }
    setEmailError("");
    if (!isValidPhone(telefono, countryCode)) {
      setPhoneError(
        countryCode === "+34" ? "Introduce un móvil español válido (6xx xxx xxx o 7xx xxx xxx)" : "Introduce un número de teléfono válido"
      );
      return;
    }
    setPhoneError("");
    if (!provincia) {
      setAgeError("Selecciona una provincia");
      return;
    }
    setAgeError("");
    if (!termsAccepted) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    const source = singleProduct ? slugToSource[productSlug ?? ""] ?? 302 : 302;
    await submitToHubSpot({
      firstname: nombre.trim(),
      email,
      phone: `${countryCode}${telefono}`,
      city: provincia,
      edad1: edades.filter(Boolean).join(","),
      source
    });
    trackTarificadorSubmit(`${countryCode}${telefono}`, `tarificador_${source}`, source);
    setShowModal(true);
  };
  const results = useMemo(() => {
    const parsed = edades.map((e) => parseInt(e, 10)).filter((a) => !isNaN(a));
    if (parsed.length === 0 || !provincia) return [];
    const numPeople = parsed.length;
    const hasDiscount = numPeople >= FAMILY_DISCOUNT_THRESHOLD;
    if (singleProduct) {
      let total = 0;
      for (const age of parsed) {
        const p = getPrice(singleProduct, age, zone);
        if (p === null) return [];
        total += p;
      }
      const discounted = applyFamilyDiscount(total, numPeople);
      return [{ product: singleProduct, price: discounted, originalPrice: hasDiscount ? total : void 0 }];
    }
    return products.filter((prod) => INDIVIDUAL_PRODUCT_IDS.has(prod.id)).map((prod) => {
      let total = 0;
      for (const age of parsed) {
        const p = getPrice(prod, age, zone);
        if (p === null) return null;
        total += p;
      }
      const discounted = applyFamilyDiscount(total, numPeople);
      return { product: prod, price: discounted, originalPrice: hasDiscount ? total : void 0 };
    }).filter(
      (r) => r !== null
    ).sort((a, b) => a.price - b.price);
  }, [edades, provincia, singleProduct, zone]);
  const reset = () => {
    setStep(0);
    setTipo(-1);
    setNumAsegurados(1);
    setEdades([""]);
    setProvincia("");
    setNombre("");
    setEmail("");
    setTelefono("");
    setAgeError("");
    setEmailError("");
    setPhoneError("");
    setTermsAccepted(false);
    setTermsError(false);
    setShowModal(false);
  };
  const parsedAges = edades.map((e) => parseInt(e, 10));
  nombre.trim() && isValidEmail(email) && isValidPhone(telefono, countryCode) && !!provincia;
  countryCodes.find((c) => c.code === countryCode) || countryCodes[0];
  const renderStepContent = (isCompact) => {
    const btnClass = isCompact ? "px-5 py-2 rounded-lg text-primary-foreground font-bold text-sm" : "px-6 py-2.5 rounded-lg text-primary-foreground font-bold text-sm";
    const btnStyle = { backgroundColor: "#E4097D", borderRadius: "7px" };
    return /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -30 },
        transition: { duration: 0.2 },
        children: [
          step === 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-gris-texto font-bold text-sm mb-1", children: "¿Para quién es el seguro?" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: tipoOptions.map((opt, i) => /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => handleTipoSelect(i),
                className: "border-2 p-2 text-center transition-all duration-200",
                style: {
                  borderColor: tipo === i ? tipoIconColors[i] : "#D5E3F0",
                  backgroundColor: tipo === i ? `${tipoIconColors[i]}12` : "#fff",
                  borderRadius: "10px"
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-1",
                      style: {
                        backgroundColor: tipo === i ? tipoIconColors[i] : `${tipoIconColors[i]}18`
                      },
                      children: /* @__PURE__ */ jsx(TipoIcon, { index: i, active: tipo === i })
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "font-bold text-[11px] text-gris-texto leading-tight", children: opt.label }),
                  /* @__PURE__ */ jsx("div", { className: "text-[9px] text-gris-medio", children: opt.sub })
                ]
              },
              i
            )) })
          ] }),
          step === 1 && /* @__PURE__ */ jsxs("div", { children: [
            tipo === 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("p", { className: "text-gris-texto font-bold text-sm mb-3", children: "¿Cuántos años tienes?" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  value: edades[0],
                  onChange: (ev) => {
                    const raw = ev.target.value.replace(/\D/g, "");
                    if (raw === "") {
                      setEdades([""]);
                      setAgeError("");
                      return;
                    }
                    const num = Math.min(parseInt(raw, 10), 70);
                    setEdades([String(num)]);
                    setAgeError("");
                  },
                  placeholder: "Ej: 35",
                  min: 0,
                  max: 70,
                  className: "w-full border border-borde px-3 py-2.5 text-sm text-gris-texto focus:outline-none focus:border-azul-medio mb-3",
                  style: { borderRadius: "8px" }
                }
              )
            ] }),
            tipo !== 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("p", { className: "text-gris-texto font-bold text-sm mb-3", children: tipo === 1 ? "Edades (ambos mayores de 18)" : tipo === 3 ? "¿Cuántos hijos y sus edades?" : "¿Cuántos asegurados y sus edades?" }),
              tipo !== 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleNumChange(-1),
                    className: "w-9 h-9 border-2 border-borde text-lg font-bold text-gris-texto hover:bg-azul-suave",
                    style: { borderRadius: "10px" },
                    children: "−"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-gris-texto w-6 text-center", children: numAsegurados }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleNumChange(1),
                    className: "w-9 h-9 border-2 border-borde text-lg font-bold text-gris-texto hover:bg-azul-suave",
                    style: { borderRadius: "10px" },
                    children: "+"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: edades.map((e, i) => /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] text-gris-medio mb-0.5 block", children: tipo === 1 ? i === 0 ? "Tu edad" : "Edad pareja" : tipo === 3 ? `Hijo ${i + 1}` : `Asegurado ${i + 1}` }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "number",
                    value: e,
                    onChange: (ev) => {
                      const raw = ev.target.value.replace(/\D/g, "");
                      const arr = [...edades];
                      if (raw === "") {
                        arr[i] = "";
                      } else {
                        arr[i] = String(Math.min(parseInt(raw, 10), 70));
                      }
                      setEdades(arr);
                      setAgeError("");
                    },
                    min: 0,
                    max: 70,
                    className: "w-16 border border-borde px-2 py-1.5 text-center text-sm text-gris-texto focus:outline-none focus:border-azul-medio",
                    style: { borderRadius: "8px" }
                  }
                )
              ] }, i)) })
            ] }),
            ageError && /* @__PURE__ */ jsx(
              "p",
              {
                className: "text-xs font-bold mb-2",
                style: { color: "#EF4444" },
                children: ageError
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => goToStep(0),
                  className: "text-sm text-gris-medio hover:text-gris-texto",
                  children: "← Atrás"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    if (validateAges()) goToStep(2);
                  },
                  className: btnClass,
                  style: btnStyle,
                  children: "Continuar →"
                }
              )
            ] })
          ] }),
          step === 2 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 mb-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: nombre,
                  onChange: (e) => {
                    setNombre(e.target.value);
                    setAgeError("");
                  },
                  placeholder: "Tu nombre",
                  className: "w-full border border-borde px-3 py-2 text-sm text-gris-texto focus:outline-none focus:border-azul-medio",
                  style: { borderRadius: "8px" }
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    value: email,
                    onChange: (e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    },
                    placeholder: "tu@email.com",
                    className: "w-full border border-borde px-3 py-2 text-sm text-gris-texto focus:outline-none focus:border-azul-medio",
                    style: {
                      borderRadius: "8px",
                      borderColor: emailError ? "#EF4444" : void 0
                    }
                  }
                ),
                emailError && /* @__PURE__ */ jsx("p", { className: "text-[11px] mt-0.5", style: { color: "#EF4444" }, children: emailError })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
                  /* @__PURE__ */ jsx(
                    "select",
                    {
                      value: countryCode,
                      onChange: (e) => setCountryCode(e.target.value),
                      className: "border border-borde px-2 py-2 text-sm text-gris-texto bg-blanco focus:outline-none focus:border-azul-medio flex-shrink-0",
                      style: { borderRadius: "8px", width: "90px" },
                      children: countryCodes.map((c) => /* @__PURE__ */ jsxs("option", { value: c.code, children: [
                        c.flag,
                        " ",
                        c.code
                      ] }, c.code))
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "tel",
                      value: telefono,
                      onChange: (e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, "");
                        setTelefono(onlyDigits.slice(0, getMaxPhoneDigits(countryCode)));
                        setPhoneError("");
                      },
                      placeholder: "600 000 000",
                      className: "w-full border border-borde px-3 py-2 text-sm text-gris-texto focus:outline-none focus:border-azul-medio",
                      style: {
                        borderRadius: "8px",
                        borderColor: phoneError ? "#EF4444" : void 0
                      }
                    }
                  )
                ] }),
                phoneError && /* @__PURE__ */ jsx("p", { className: "text-[11px] mt-0.5", style: { color: "#EF4444" }, children: phoneError })
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: provincia,
                  onChange: (e) => {
                    setProvincia(e.target.value);
                    setAgeError("");
                  },
                  className: "w-full border border-borde px-3 py-2 text-sm text-gris-texto bg-blanco focus:outline-none focus:border-azul-medio",
                  style: { borderRadius: "8px" },
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona provincia" }),
                    provinces.map((p) => /* @__PURE__ */ jsx("option", { children: p }, p))
                  ]
                }
              )
            ] }),
            ageError && /* @__PURE__ */ jsx("p", { className: "text-xs font-bold mb-1.5", style: { color: "#EF4444" }, children: ageError }),
            /* @__PURE__ */ jsx(
              TermsCheckbox,
              {
                checked: termsAccepted,
                onChange: (val) => {
                  setTermsAccepted(val);
                  if (val) setTermsError(false);
                },
                error: termsError
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => goToStep(1),
                  className: "text-sm text-gris-medio hover:text-gris-texto",
                  children: "← Atrás"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleShowResults,
                  className: `${btnClass} disabled:opacity-40`,
                  style: btnStyle,
                  children: "Ver mi precio →"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gris-medio mt-1.5 text-center", children: "Sin compromiso · Datos protegidos" })
          ] }),
          step === 3 && /* @__PURE__ */ jsx(
            ResultsView,
            {
              results,
              ages: parsedAges.filter((a) => !isNaN(a)),
              provincia,
              zone,
              singleProduct: !!singleProduct,
              compact: isCompact,
              onReset: reset,
              numAsegurados,
              nombre
            }
          )
        ]
      },
      step
    ) });
  };
  const renderProgress = () => /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-1.5 mt-4", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx(
    "div",
    {
      className: "rounded-full transition-colors",
      style: {
        width: 24,
        height: 4,
        borderRadius: 2,
        backgroundColor: i === step ? "#009FE3" : i < step ? "#009FE3" : "#D5E3F0"
      }
    },
    i
  )) });
  if (showModal) {
    return /* @__PURE__ */ jsx(
      ModalResultados,
      {
        results,
        ages: parsedAges.filter((a) => !isNaN(a)),
        provincia,
        nombre,
        email,
        telefono: `${countryCode}${telefono}`,
        numAsegurados,
        onClose: () => setShowModal(false)
      }
    );
  }
  if (compact) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl overflow-hidden", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "px-5 py-3 flex items-center justify-between",
          style: { background: "linear-gradient(120deg, #002266 0%, #003087 45%, #0077B6 100%)" },
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-white font-bold text-[13px] whitespace-nowrap", children: "Calculadora de seguros Adeslas" }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] mt-0.5", style: { color: "rgba(255,255,255,0.75)" }, children: stepLabels[step] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex gap-1.5", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    width: 28,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: i === step ? "#fff" : i < step ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.22)",
                    transition: "background-color 0.3s"
                  }
                },
                i
              )) }),
              onClose && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClose,
                  className: "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
                  style: { background: "rgba(255,255,255,0.15)" },
                  children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-white" })
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          ref: compactBodyRef,
          className: `px-5 py-3 flex flex-col ${step === 3 ? "justify-start" : "justify-center"}`,
          style: { height: "310px", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "#D5E3F0 transparent" },
          children: [
            renderStepContent(true),
            renderProgress()
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsx("section", { id: "calculadora", className: "section-pad bg-gris-claro", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxs(
        "h2",
        {
          className: "text-2xl md:text-3xl font-bold",
          style: { color: "#003087" },
          children: [
            "Compara tu seguro médico",
            " ",
            /* @__PURE__ */ jsx("span", { style: { color: "#009FE3" }, children: "en segundos" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-gris-medio mt-2 max-w-lg mx-auto", children: "Introduce tus datos y compara las tarifas de todos los seguros Adeslas al instante." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-blanco rounded-[20px] overflow-hidden card-shadow", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "px-6 md:px-10 py-5",
          style: { background: "linear-gradient(120deg, #002266 0%, #003087 45%, #0077B6 100%)" },
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-primary-foreground text-lg md:text-xl", children: "Calculadora de seguros Adeslas" }),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "text-sm",
                  style: { color: "rgba(255,255,255,0.7)" },
                  children: stepLabels[step]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-1.5", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx(
              "div",
              {
                className: "rounded-full transition-colors",
                style: {
                  width: 32,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: i === step ? "#fff" : i < step ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)"
                }
              },
              i
            )) })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "px-6 md:px-10 py-8", children: renderStepContent(false) })
    ] })
  ] }) });
};
const ResultsView = ({
  results,
  ages,
  provincia,
  zone,
  singleProduct,
  compact,
  onReset,
  numAsegurados,
  nombre = ""
}) => {
  if (results.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "text-center py-6", children: [
      /* @__PURE__ */ jsx("div", { className: "text-3xl mb-3", children: "⚠️" }),
      /* @__PURE__ */ jsx("h3", { className: "text-gris-texto font-bold mb-2", children: "No hay resultados disponibles" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-medio mb-4", children: "No hemos encontrado tarifas para los datos seleccionados." }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onReset,
          className: "text-sm text-azul-medio hover:underline",
          children: "← Volver a intentar"
        }
      )
    ] });
  }
  const isMultiple = numAsegurados > 1;
  if (singleProduct && results[0]) {
    const { int, dec } = formatPrice(results[0].price);
    const hasDiscount = results[0].originalPrice !== void 0;
    return /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      hasDiscount && /* @__PURE__ */ jsxs(
        "div",
        {
          className: "rounded-xl px-4 py-2 mb-3 flex items-center justify-center gap-2 text-xs font-bold",
          style: { backgroundColor: "#DCFCE7", color: "#166534", borderRadius: "10px" },
          children: [
            "🎉 Descuento familiar 10% aplicado (",
            numAsegurados,
            " asegurados)"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "rounded-xl p-6 mb-4",
          style: { backgroundColor: "#003087", borderRadius: "14px" },
          children: [
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "text-xs mb-2",
                style: { color: "rgba(255,255,255,0.6)" },
                children: isMultiple ? `${results[0].product.name} · ${numAsegurados} asegurados` : `Tu precio para ${results[0].product.name}`
              }
            ),
            hasDiscount && /* @__PURE__ */ jsxs("p", { className: "text-sm line-through mb-1", style: { color: "rgba(255,255,255,0.45)" }, children: [
              formatPrice(results[0].originalPrice).int,
              ",",
              formatPrice(results[0].originalPrice).dec,
              "€/mes"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-center gap-1 mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-5xl font-black text-white", children: int }),
              /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold text-white", children: [
                ",",
                dec,
                "€"
              ] }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "text-sm",
                  style: { color: "rgba(255,255,255,0.6)" },
                  children: "/mes"
                }
              )
            ] }),
            hasDiscount && /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold mb-1", style: { color: "#86EFAC" }, children: [
              "Ahorro: ",
              formatPrice(results[0].originalPrice - results[0].price).int,
              ",",
              formatPrice(results[0].originalPrice - results[0].price).dec,
              "€/mes"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs", style: { color: "rgba(255,255,255,0.5)" }, children: [
              ages.join(", "),
              " años · ",
              provincia,
              isMultiple && " · Total familia"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gris-medio mb-3", children: "Un asesor se pondrá en contacto contigo para formalizar tu seguro." }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "tel:917105000",
          className: "inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm",
          style: {
            backgroundColor: "#E4097D",
            color: "#fff",
            borderRadius: "8px"
          },
          children: "Llámanos: 91 710 50 00"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onReset,
          className: "block mx-auto mt-3 text-xs text-azul-medio hover:underline",
          children: "↺ Calcular otra vez"
        }
      )
    ] });
  }
  const discountApplied = results.some((r) => r.originalPrice !== void 0);
  return /* @__PURE__ */ jsxs("div", { children: [
    discountApplied && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "rounded-xl px-4 py-2.5 mb-3 flex items-center gap-2 text-xs font-bold",
        style: { backgroundColor: "#DCFCE7", color: "#166534", borderRadius: "10px" },
        children: [
          "🎉 ",
          /* @__PURE__ */ jsxs("span", { children: [
            "Descuento familiar 10% aplicado por ser ",
            numAsegurados,
            " asegurados. ¡Ahorro incluido en los precios!"
          ] })
        ]
      }
    ),
    isMultiple && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gris-medio mb-3 text-center", children: [
      "Precios mensuales para ",
      numAsegurados,
      " asegurados (",
      ages.join(", "),
      " años) en ",
      provincia
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: results.map(({ product, price, originalPrice }, i) => {
      const label = productLabels[product.id];
      const isBest = i === 0;
      const { int, dec } = formatPrice(price);
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "border-2 p-4 flex items-center gap-4 transition-all",
          style: {
            borderColor: isBest ? "#009FE3" : "#E2E8F0",
            backgroundColor: isBest ? "#F0F7FF" : "#fff",
            borderRadius: "14px"
          },
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                style: {
                  backgroundColor: isBest ? "#009FE3" : "#E2E8F0",
                  color: isBest ? "#fff" : "#6B8296"
                },
                children: i + 1
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-sm text-gris-texto", children: product.name }),
              label && /* @__PURE__ */ jsx(
                "span",
                {
                  className: "text-[9px] font-bold px-2 py-0.5 rounded-full text-white",
                  style: { backgroundColor: label.color },
                  children: label.tag
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "text-right flex-shrink-0", children: [
              originalPrice !== void 0 && /* @__PURE__ */ jsxs("p", { className: "text-[10px] line-through text-gris-medio leading-none mb-0.5", children: [
                formatPrice(originalPrice).int,
                ",",
                formatPrice(originalPrice).dec,
                "€"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-0.5", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "text-xl font-black",
                    style: { color: "#003087" },
                    children: int
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "span",
                  {
                    className: "text-sm font-bold",
                    style: { color: "#003087" },
                    children: [
                      ",",
                      dec,
                      "€"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gris-medio", children: "/mes" })
            ] })
          ]
        },
        product.id
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "pt-4 text-center", children: [
      !isMultiple && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gris-medio mb-3", children: [
        "Precios mensuales netos para ",
        ages[0],
        " años en ",
        provincia,
        "."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gris-medio mb-3", children: "Un asesor se pondrá en contacto contigo." }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "tel:917105000",
          className: "inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm",
          style: {
            backgroundColor: "#E4097D",
            color: "#fff",
            borderRadius: "8px"
          },
          children: "Llámanos: 91 710 50 00"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onReset,
          className: "block mx-auto mt-3 text-xs text-azul-medio hover:underline",
          children: "↺ Calcular otra vez"
        }
      )
    ] })
  ] });
};

const TarificadorContext = createContext({ openTarificador: () => {
} });
const useTarificador = () => useContext(TarificadorContext);
const TarificadorProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [productSlug, setProductSlug] = useState();
  const openTarificador = useCallback((slug) => {
    setProductSlug(slug);
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
    setProductSlug(void 0);
  }, []);
  return /* @__PURE__ */ jsxs(TarificadorContext.Provider, { value: { openTarificador }, children: [
    children,
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[700] flex items-center justify-center bg-black/50 p-4",
        onClick: handleClose,
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { scale: 0.95, opacity: 0, y: 8 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.95, opacity: 0, y: 8 },
            transition: { type: "spring", damping: 28, stiffness: 300 },
            className: "w-full max-w-lg rounded-2xl overflow-hidden",
            style: {
              boxShadow: "0 24px 64px rgba(0,48,135,0.22)",
              maxHeight: "90dvh"
            },
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsx("div", { className: "overflow-y-auto", style: { maxHeight: "90dvh" }, children: /* @__PURE__ */ jsx(Tarificador, { compact: true, productSlug, onClose: handleClose }) })
          }
        )
      }
    ) })
  ] });
};

const logoAzul = "data:image/webp;base64,UklGRrQOAABXRUJQVlA4WAoAAAAQAAAA0QAAVwAAQUxQSAACAAABkEPbtqk9++F3bLvK+NvYtm0blW32+bsklW3btm3byXvv7s/lt0e6iGDktm0kdZDWs527OHkAANio9Pb716TffjwrARtxzcEIGib9ZtgbTjw29hs/+eObTQmCjfLfNYQPRWHFaWsQBfRkwC5w4sM6eqQCuTwOC/le0WgI99NjpYPGNBKgCarHvuxiTlRLkBwHN0ZYR+irYHtMsFDsY+SJBsHn+WEBDpoyICniQc1o52J69IkKORYuYGMbfR2shAMLWQ90iIBXU2HZyI4Zq3jxZznYLroxUHK1hONiLj0deBwP18Ym+kpYAQfOdSUi4GlYKPmZRgmv8gNVImMlr/zJBrpEnyjpmgKT6SnB4yggR0vwuQTYpYZVSLnIQAvHUeQJjZZXbuWq+FkLhq9LVY8818KPyq0jvZhBvX5qMOwwjoEaBi9QQ8AJORTzos+Fq/WwdLcesfKIHraf1sPBSzRqOHZbD2dv6eH0TUHhqZ755C1F3PwvekXRjy7p4big2dchRTNkRasYRStNRbsBinZsFO2qKdr5VLQ7regEQdEpj6KTOEGnpYpOtBW5DhQ5QxS5dyQ5rBS54BQ5FfW4STU5fhW5shU55xVlN8DGdjEZKIqyhBRlcinKtpOTEakpa1VRZrGi7G81GfrL4CiqoqCm0sXHorDkVCPRVTFGUFUfAFZQOCCODAAA8DUAnQEq0gBYAD4xGIpDoiGhE6ocrCADBLEAaXL9v2D8gNoy75/IP2l/FX5Xqq/UfxF63ev6K/1l/kv6V+QHug/r/sA/N/sAfqn/u/7Z6wH6Ae4D+negD+gfzP/wf4f3kP7B/mf8d7i/yd9wD+T/2frCf3G9gT9sfSf/7P/O+Cr9vP3F9o//yewB//+Bk3T4v/SPt7y/Xofud+a/MDkz4AX49/Nv75+XvB42D9AL19+P/53+ychX1s9Fn9V4x6gH/Ov7T6sH9Z/7v8558fzX/G/+L/LfAZ/Kv6r/0f7r2zv2I9mj9zCI/KHiO0kG1ebu79Qp1ssSVG081sPoXe0ECfj4wVy7KKXfrO5luXSJC/CFbycpkZk5r5xd10y0z7MGqUfmvIeI3Xubmup9H/VVBTvggYd9HWnvm2N/4zHg1QxKPjXSJJojSHPt7xQhfRpms1rQqLsLNNcqMKaF0397fJDOcGfDdwK974QCs93RRZxRY4zGrpTcYtow7vpBPQhgzomhH1QXeFghjD/Uj2KeXaKGSkN/jaik7KF0ZPDfTaYonGi6J0g7Ye9eFhTfo15u8KznPRCIqMAA/qCNXfFY9uTyAvKE59iKZiH4usLDbevstyy18L3obXDNiyRQl2WDwbL5LcjPKm9m3+FScMa5/qraKVWjkFJNt3GuSjmDwXd1XH4b/tud8LdMEyo7jaaKCAAAO5pBXx1EzSyuaoI0Qoa1mv+W/hepEEXr+1rnz4TzVROYfK9+EfpqfGa8yyAXb3nk7wDmQbTu3ulX/8HoOevPE9zMUwLAiVif4K+8nwsFeAhE3K1oN32PsHVMZS0CZrlMW4vth8rwRl9Z6oOSxq6oRBPrpJtWuF+b3leab39ThgQ7x7lT/CSPmsXaUtn7R70WfjTMEd1V61frK/kV//bIlL1pBjtNPs3Q1G8ruKl8LpOI06NsWVsHvR8rwT1AjzkFFqQHhqqwaEPDpDX6CpFp+3jSl18tHjMV9BhzMbuctM6OA4a//s4LFpX2lhpPmD+Zi4l9uYORKUJZMlt8K63SWYXQO8CRk73v6AM7wFT56/LcS9MhrjLIWDBhOvJEK3e6qLs5Eoj+XHtUagef/ZH7/f7z8r8Cef9Dm5RPmKXjoXVEz13U25FY8Qe8pepsjF8qMUGvwAsDSa1qYIp/oMD+jwC6OekgUmGB/C/bnWR4A8LQ8hh23OCsACvyQF774Mvk269M67B8bzuRUt0NQ6Uxf/uQXzD//7IL5vDzHJbqcAXiOwnbvDd0s/G4uxq17eEy0fJPlBXS0Yf//E2nCzkibaLAYr+wPkABnJXfjoPqX4fyHU5ImXxa+59z9AUDzfE7U0I+IGycy11XPFafvYoXWsT1/ladmi9GxrUftv2wj1l6YRSBO+tNeMfK9WsFJVvohwQS1Zq8gF5NxMtAU+mVnbZYgaHvhmkdlZO5HkNc+ekBxgG0Xzl2aoxjyUWWXY7DAELsHZWNUhVnhxwebt4Yrn6YSONDja691fJ2Qr7c83hQmAXUv4iuc8bGT6lkgtJXiPn2y3stdB/7C7VMNsn3sVsu6+djlgE7AviF0h96/iqMO5jolWgZh+zz4KO77NBvJqxxwDcm5OOFQebOT1geb1kYFW8iGQgUjn5jPiDXrV+DaCgEiGra7NY+DXy6M+ioDTgS4Q07a/+3ZoRmTWpwZGtFf2EOy/xilKT4zaXEGz8h6SKVvfklOK5ljoYsFpFRDqxF20iWE+f2t+3jJiyV0xl0PlCdHc1zcLDBz16Yu7WG9xVm+tL1VWe/UA1zHT+0y3jCBTkCJ7EQDgA9F9C1rivmTZmnEs/n929p6CO1om+JoCX/5cQBzKq8tXZjFsjMTwrrPR28IigMqxIQX8FuIDIeceDH0PSLdCbeUfB05dBp2tU3o8Bq32XYa3E7F+lcAFLd1PHmfEsecwIvQctTf8jqIX/sy468dIlLzwcz+QvcgSt3fOnT/9xCLS9rE7fbZtoDdgJ3t9pGuA37l0H1fOCaL7DR2DpS40/qsrrg146uYn0wLe8ckdN7gS11rt7VG2f76Ix1eS09C5xn5zGknE6BZpDvuoKgAjqg22xoz/qKNbRD2gB2WraldweWlFNyurvHV1NT5iKuOMKWbZxcz426//BmQPczYDUWNxv1VqK33qPRcuIASN5CDlKGZWht3qxCiZBZx+Gy0tv3l7Gzdqfqjdvipxcwvav+S6H9QOod/jK7KWIjRsz+jP2yvwr0lT2dDU9A+2ugZLlDUXNI23C0oCo4pj7QYr6o1KwI3ZGKFN1/ofFxR0KdMB6n6of6vA5AZdNS+Ok+hyohGI7RzURTWM/FTFCcIGSeMXOWhVZXHNHWrZnSGPbRKVlQLYL3+pZcSUjPH84XTJ1scV0xLoVvfoRg/w1qIQe0/RQMEXUENUAJxUdxHFTtvBLToUPrKooomY4QB4WNiuBg0BhUu13DiLdvY7XTzfI7x+Eq0MuoDV29Ntpco64v/pdm3FMszf/9ANIxlSmBF714HS9yPzc7kDZfHZVAg19NHgWPpmq1Ouh4oA5J9ZS4c8BePql0jcibGDPjRtBO1H0SlLyAA5DoxFMfBdbNc44Pkmw6zFnh5gvlIokuxTZtiyBOrP9AFOjZ4+yEuX6u9rCEjcEIDoZWVyF5n5Xwul/7Qf6+dnC2tfZbAn7zKdVc7ul7uWJiPj0T6Jzyk5xqI1uhM2M2L5muPffGm97xZ64R0sAv32bVUhIoknpFPpTabzVTwmVMb2oaQ43Edcpl9QX7MNkoU18oc/xxUHjboqFuzKumfHL1JMibZaHhCnBx0bWD+nRK4ET5hnt81n7pYxjLaKqBCX6xoFvHO4R7dM49Ur57xHq6GPnSFioS0etNmuONe5ui/vLO3LnQhFcUUC/2mHKhvcXFqrOA6hN6XR4lXWoJxSLI00EXNAXMrnjlgvq7GvrXhv9GGQFr2EBuhpc9Kx5d85a5jELK/Ue9JhcpXV6S0ATdQHr8EtTJ00gWdEkkLvqCWaZ/oglI/4ozaC9y/NqYdxhLcQPdUgw0hust/QjEsEbf0sBeUeh+wjBjztzV4btiCVco04V3WFFf4U6hb9vvwpLlKpJWU8JkTNBinhOUQTR4h0fPH/N8MKfIF4JG6YcUYMPbrhSSZ3g4rPGH0UFS2OeIq2ZrNIR0G2X6WEgmwB5dWUUPbxapwf8XDl7dvdQnwnm0CMLZpgJfmCJvKv8UJZhQmi2v8KnYEhqXbZwyVaVdIfbJO3sZFC3EGj67ob9hk2MUnt2Vrpc4guQ3t4qJGQec1edSQLPTapYDB/HbPOor/l9A3pK0uxVdWKOAn22gcP/iss+Ksx8pQNO8WaOwZWQ5iVmK1ocPmNi23CVCm58vtwBYxxK5VyXaJavZVNQK4+v+JXxGOXeRIKju0dcRRYK4mWCpvBrAf4wIORU7s4s7gEGChWfmIBWP9mG5f1xbo8zCRpssBa6JEV8uJyWxy7CDpk/UVmLTh+Xqb3ID31tb6+EW6Y+2dKiWbfvnhwrFZbAruDg2WEa3RrU96HgspxD1DKl3B9+BmtEExGUGyee+pMbqFO7Sxz/nJQ+v743nmQj0k8rj7DJ9KR/R5Jl9SWKP1PRjktS5DeneXw+4433oDRI4f6sOTbykj6G7oQ8QWVeufEEVNNSCGCj/E56eI6zcCjQnJnFFcERXABUZMKFLaxS6EfzdsOmReztKOrn4Jm1xyhZiBn/hrSEtHUTXo0WVW9P9t/t9rRpi9NLbOv+g4rn3FECFiu/qvYq8rWaG9tEzBsUki4J6ft6TV1cMPuZz20dN+aDYniCPS+ft7Ia6S99kSwdVsYHKKM2c/Cy/53mAajDny63ebZyJkdM807/1g0RZxpSr7jKisAO+yzCSK99M7z33kXFoSKODzyM9qyIB+DXd3Vq0uDwO2qdRXB8xXjnVRGjBH//7zRjjlQbZtSLPkOw9Hu5J2g2ipXXjopRZ4psObBK5TaQRK+UCg2cgOMuPAsD2SleXljaiAsGbALFALkABHKykB2UgggtJHKMb8eATQANZW9dlYgr41lyqHd9haap/DPXbovqSsS7B1qMvje8H+hMrVHfLi7omOA4A/qk313taFPuH/JsNcqR9kX4+yCe99VMNIgWPJV6uPVVN+OJ6UsrgyR44jBHngHbMbRXk7Y26IeJwH43htwKDjx5dvuFgNAexUWvzm5AqUwMAAAZKVPOJDygYC1abqmDKvFjl+3vvsk41Ompr8mE5wfLA85B/ycTkr0q4d0pPpecpP/6PwAAAAA==";

function imgSrc(img) {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object" && "src" in img && typeof img.src === "string") {
    return img.src;
  }
  return String(img);
}

const PageCalcContext = createContext({});
const usePageCalc = () => useContext(PageCalcContext);
const PageCalcProvider = PageCalcContext.Provider;

const I = (d, extra) => /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("path", { d }),
  extra
] });
const IC = (d, cx, cy, r) => /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("circle", { cx, cy, r }),
  /* @__PURE__ */ jsx("path", { d })
] });
const icoIndividual = IC("M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", 12, 7, 4);
const icoFamilia = /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }),
  /* @__PURE__ */ jsx("circle", { cx: "9", cy: "7", r: "4" }),
  /* @__PURE__ */ jsx("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
  /* @__PURE__ */ jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
] });
const icoInfantil = /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsx("path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }),
  /* @__PURE__ */ jsx("line", { x1: "9", y1: "9", x2: "9.01", y2: "9", strokeWidth: "3" }),
  /* @__PURE__ */ jsx("line", { x1: "15", y1: "9", x2: "15.01", y2: "9", strokeWidth: "3" })
] });
const icoGinecologia = /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "9", r: "6" }),
  /* @__PURE__ */ jsx("line", { x1: "12", y1: "15", x2: "12", y2: "22" }),
  /* @__PURE__ */ jsx("line", { x1: "9", y1: "19", x2: "15", y2: "19" })
] });
const icoEmbarazadas = I("M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z");
const icoMayores = /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("circle", { cx: "10", cy: "4", r: "2.5" }),
  /* @__PURE__ */ jsx("path", { d: "M10 6.5v5l-2.5 5.5 2.5 5" }),
  /* @__PURE__ */ jsx("path", { d: "M10 11.5H7l2 5" }),
  /* @__PURE__ */ jsx("path", { d: "M14 19l2.5 3.5" })
] });
const icoAutonomos = /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("rect", { x: "2", y: "7", width: "20", height: "14", rx: "2" }),
  /* @__PURE__ */ jsx("path", { d: "M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" }),
  /* @__PURE__ */ jsx("line", { x1: "12", y1: "12", x2: "12", y2: "12", strokeWidth: "3" })
] });
const icoPymes = /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
  /* @__PURE__ */ jsx("polyline", { points: "9 22 9 12 15 12 15 22" })
] });
const icoDental = /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M12 2c-3.5 0-6.5 2.5-6.5 6 0 1.5.4 2.7 1 3.7C7 13.6 7 14.3 7 15v6a1 1 0 0 0 2 0v-4h6v4a1 1 0 0 0 2 0v-6c0-.7 0-1.4.5-3.3.6-1 1-2.2 1-3.7C18.5 4.5 15.5 2 12 2z" }) });
const icoDecesos = /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("path", { d: "M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" }),
  /* @__PURE__ */ jsx("line", { x1: "16", y1: "8", x2: "2", y2: "22" }),
  /* @__PURE__ */ jsx("line", { x1: "17", y1: "15", x2: "9", y2: "15" })
] });
const icoMascotas = /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("circle", { cx: "5", cy: "5.5", r: "1.5" }),
  /* @__PURE__ */ jsx("circle", { cx: "10", cy: "3.5", r: "1.5" }),
  /* @__PURE__ */ jsx("circle", { cx: "14.5", cy: "3.5", r: "1.5" }),
  /* @__PURE__ */ jsx("circle", { cx: "19", cy: "5.5", r: "1.5" }),
  /* @__PURE__ */ jsx("path", { d: "M12 12.5c-3.5 0-6.5 2-6.5 5 0 2 1.8 3.5 4 3.5.8 0 1.5-.5 2.5-.5s1.7.5 2.5.5c2.2 0 4-1.5 4-3.5 0-3-3-5-6.5-5z" })
] });
const icoViaje = I("M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5c-1.5-1.5-3.5-1.5-5 0L11 6 2.8 4.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L8 12l-1 4-2 2 2.5 2.5L9.5 18l4 6.5c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z");
const icoAccidentes = /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }),
  /* @__PURE__ */ jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
  /* @__PURE__ */ jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16", strokeWidth: "2.5" })
] });
const icoPlenaTotal = /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }),
  /* @__PURE__ */ jsx("polyline", { points: "9 12 11 14 15 10" })
] });
const icoPlenaPlus = /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M2 20h20M5 20 2 7l5 4 5-9 5 9 5-4-3 13" }) });
const icoExtra150 = /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("polyline", { points: "15 3 21 3 21 9" }),
  /* @__PURE__ */ jsx("polyline", { points: "9 21 3 21 3 15" }),
  /* @__PURE__ */ jsx("line", { x1: "21", y1: "3", x2: "14", y2: "10" }),
  /* @__PURE__ */ jsx("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
] });
const icoGo = /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) });
const icoPlenaVital = /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M22 12h-4l-3 9L9 3l-3 9H2" }) });
const icoPlenaVitalTotal = /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }),
  /* @__PURE__ */ jsx("line", { x1: "12", y1: "9", x2: "12", y2: "15" }),
  /* @__PURE__ */ jsx("line", { x1: "9", y1: "12", x2: "15", y2: "12" })
] });
const icoSeniors = /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("circle", { cx: "10", cy: "4", r: "2.5" }),
  /* @__PURE__ */ jsx("path", { d: "M10 6.5v5.5l-2 4.5 2 6" }),
  /* @__PURE__ */ jsx("path", { d: "M10 12h-3l1.5 4.5" }),
  /* @__PURE__ */ jsx("path", { d: "M14.5 18l2 4" })
] });
const icoSeniorsTotal = /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#003087", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("circle", { cx: "9", cy: "4", r: "2.5" }),
  /* @__PURE__ */ jsx("path", { d: "M9 6.5v5.5l-2 4.5 2 6" }),
  /* @__PURE__ */ jsx("path", { d: "M9 12h-3l1.5 4.5" }),
  /* @__PURE__ */ jsx("path", { d: "M16 9l2 2 4-4" })
] });
const megaSeguros = {
  particulares: [
    { icon: icoIndividual, label: "Individual", sub: "Seguro médico para ti", to: "/seguro-salud/adeslas-individual/" },
    { icon: icoFamilia, label: "Familia", sub: "Protege a toda la familia", to: "/seguro-salud/seguro-familia/" },
    { icon: icoInfantil, label: "Infantil", sub: "Seguro para los más pequeños", to: "/seguro-salud/adeslas-infantil/" },
    { icon: icoGinecologia, label: "Ginecología", sub: "Cobertura ginecológica completa", to: "/seguro-salud/adeslas-ginecologia/" },
    { icon: icoEmbarazadas, label: "Embarazadas", sub: "Seguimiento del embarazo y parto", to: "/seguro-salud/embarazo/" },
    { icon: icoMayores, label: "Personas mayores", sub: "Cobertura especializada para seniors", to: "/seguro-salud/seguro-para-personas-mayores/" }
  ],
  empresas: [
    { icon: icoAutonomos, label: "Autónomos", sub: "Adeslas NEGOCIOS — sin copago, deducible IRPF", to: "/seguro-salud/autonomos/" },
    { icon: icoPymes, label: "Pymes y Empresas", sub: "Adeslas EMPRESAS y PYMES TOTAL — sin copago para empleados", to: "/seguro-salud/pymes/" }
  ],
  dental: [
    { icon: icoDental, label: "Adeslas Dental Max", sub: "Revisiones, ortodoncia, implantes", to: "/seguro-dental/" }
  ],
  otros: [
    { icon: icoDecesos, label: "Adeslas Decesos", sub: "Gestión completa del sepelio", to: "/seguro-decesos/" },
    { icon: icoMascotas, label: "Adeslas Mascotas", sub: "Perros y gatos desde 5,85€/mes", to: "/seguro-mascotas/" },
    { icon: icoViaje, label: "Asistencia en Viaje", sub: "Cobertura mundial sin permanencia", to: "/adeslas-asistencia-en-viaje/" },
    { icon: icoAccidentes, label: "Seguro de Accidentes", sub: "Protección 24h en todo el mundo", to: "/seguro-accidentes/" }
  ]
};
const megaPlanes = {
  sinCopago: [
    { icon: icoPlenaTotal, label: "Adeslas Plena Total", sub: "La opción más vendida. Sin copagos.", badge: "Sin subidas 3 años", to: "/seguro-salud/adeslas-plena-total/" },
    { icon: icoPlenaPlus, label: "Adeslas Plena Plus", sub: "Cobertura total premium. Lo mejor de Adeslas.", to: "/seguro-salud/adeslas-plena-plus/" },
    { icon: icoExtra150, label: "Adeslas Extra 150", sub: "Libre elección + reembolso 80%.", to: "/seguro-salud/adeslas-extra-150/" }
  ],
  conCopago: [
    { icon: icoGo, label: "Adeslas Go", sub: "La más económica. Cobertura ambulatoria.", to: "/seguro-salud/adeslas-go/" },
    { icon: icoPlenaVital, label: "Adeslas Plena Vital", sub: "Cobertura completa con copagos reducidos.", to: "/seguro-salud/adeslas-plena-vital/" },
    { icon: icoPlenaVitalTotal, label: "Adeslas Plena Vital Total", sub: "Cobertura total. Copago máx. 500€/año.", badge: "Sin subidas 3 años", to: "/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/" },
    { icon: icoSeniors, label: "Adeslas Seniors", sub: "Para mayores de 55. Asesor personal.", to: "/seguro-salud/adeslas-seniors/" },
    { icon: icoSeniorsTotal, label: "Adeslas Seniors Total", sub: "Mayores 63-84. Dental incluida.", badge: "Sin subidas 3 años", to: "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/" }
  ]
};
const MegaLink = ({ icon, label, sub, badge, to, onClick }) => /* @__PURE__ */ jsxs(
  Link,
  {
    to,
    onClick,
    className: "flex items-start gap-2.5 px-3 py-2 rounded-lg transition-colors duration-150 hover:bg-azul-suave hover:text-azul-medio text-[14px] group",
    style: { color: "#374151" },
    children: [
      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", style: { backgroundColor: "#E8F4FC" }, children: icon }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold", children: label }),
          badge && /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white whitespace-nowrap", style: { backgroundColor: "#374151" }, children: badge })
        ] }),
        sub && /* @__PURE__ */ jsx("div", { className: "text-xs mt-0.5", style: { color: "#6B7280" }, children: sub })
      ] })
    ]
  }
);
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(null);
  const [headerBottom, setHeaderBottom] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [navPhone, setNavPhone] = useState("");
  const [navPhoneError, setNavPhoneError] = useState(false);
  const [mobilePhone, setMobilePhone] = useState("");
  const [mobilePhoneError, setMobilePhoneError] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [stickyBottom, setStickyBottom] = useState(0);
  const headerRef = useRef(null);
  const megaTimeoutRef = useRef();
  const { openTarificador } = useTarificador();
  const { onCalcClick, calcLabel } = usePageCalc();
  const { openPhonePopup } = usePhonePopup();
  const { pathname } = useLocation();
  const measureHeader = useCallback(() => {
    requestAnimationFrame(() => {
      if (headerRef.current) {
        setHeaderBottom(headerRef.current.getBoundingClientRect().bottom);
      }
    });
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      measureHeader();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    measureHeader();
    window.addEventListener("resize", measureHeader);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measureHeader);
    };
  }, [measureHeader]);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      setStickyBottom(Math.max(0, window.innerHeight - vv.offsetTop - vv.height));
    };
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    update();
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setMegaOpen(null);
        setShowPhonePopup(false);
        setShowThankYouModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  const openMega = (key) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setMegaOpen(key);
  };
  const closeMega = () => {
    megaTimeoutRef.current = setTimeout(() => setMegaOpen(null), 120);
  };
  const isPhoneValid = (phone) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length === 9 && /^[67]/.test(digits);
  };
  const formatPhoneDisplay = (raw) => {
    const d = raw.replace(/\D/g, "").slice(0, 9);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
    return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  };
  const handleNavPhoneChange = (e) => {
    setNavPhone(formatPhoneDisplay(e.target.value));
    if (navPhoneError) setNavPhoneError(false);
  };
  const handleNavPhoneSubmit = async (e) => {
    e.preventDefault();
    if (!isPhoneValid(navPhone)) {
      setNavPhoneError(true);
      return;
    }
    setNavPhoneError(false);
    await submitToHubSpot({ phone: "+34" + navPhone.replace(/\s/g, ""), source: 301 });
    trackGenerateLead(navPhone, "header_desktop_te_llamamos", 301);
    setNavPhone("");
    setShowThankYouModal(true);
  };
  const handleMobilePhoneChange = (e) => {
    setMobilePhone(formatPhoneDisplay(e.target.value));
    if (mobilePhoneError) setMobilePhoneError(false);
  };
  const handleMobilePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!isPhoneValid(mobilePhone)) {
      setMobilePhoneError(true);
      return;
    }
    setMobilePhoneError(false);
    await submitToHubSpot({ phone: "+34" + mobilePhone.replace(/\s/g, ""), source: 301 });
    trackGenerateLead(mobilePhone, "header_mobile_te_llamamos", 301);
    setMobilePhone("");
    setShowPhonePopup(false);
    setShowThankYouModal(true);
  };
  const navItems = [
    { key: "seguros", label: "Seguros", hasMega: true },
    { key: "planes", label: "Planes", hasMega: true },
    { key: "precios", label: "Precios y ofertas", to: "/seguro-salud/ofertas-adeslas-precios/" },
    { key: "blog", label: "Blog Salud", to: "/adeslas-blog/" },
    { key: "cuadro", label: "Cuadro médico", to: "/cuadro-medico/" },
    { key: "contacto", label: "Contacto", to: "/contacto/" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { ref: headerRef, className: `sticky top-0 z-50 bg-white transition-shadow duration-200${scrolled ? " shadow-md" : ""}`, children: [
      /* @__PURE__ */ jsx("div", { className: "border-b", style: { borderColor: "#E8EFF4" }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1280px] mx-auto flex items-center justify-between px-12 lg:px-20", style: { height: 84 }, children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ jsx("img", { src: imgSrc(logoAzul), alt: "Adeslas — Seguros Médicos Privados en España", className: "h-10 lg:h-11 object-contain", width: "105", height: "44" }),
          !scrolled && /* @__PURE__ */ jsx("div", { className: "hidden xl:flex items-center pl-3", style: { borderLeft: "1px solid #D5E3F0" }, children: /* @__PURE__ */ jsx("span", { className: "text-[11px] leading-tight", style: { color: "#C0D0DC" }, children: "Marchal Aseguradores · Agente exclusivo Adeslas" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:917105000",
              onClick: () => trackClickToCallContratacion("header_desktop"),
              className: "flex items-center gap-2.5 px-4 py-2.5 rounded-lg border transition-colors hover:border-[#009FE3] group",
              style: { borderColor: "#D5E3F0" },
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0", style: { backgroundColor: "#EEF5FF" }, children: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4", style: { color: "#009FE3" } }) }),
                /* @__PURE__ */ jsxs("div", { className: "leading-tight", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] font-medium", style: { color: "#6B8296" }, children: "Nuevas contrataciones" }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", style: { color: "#003087" }, children: "91 710 50 00" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:919191898",
              onClick: () => trackClickToCallAsistencia("header_desktop"),
              className: "flex items-center gap-2.5 px-4 py-2.5 rounded-lg border transition-colors hover:border-[#009FE3] group",
              style: { borderColor: "#D5E3F0" },
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0", style: { backgroundColor: "#EEF5FF" }, children: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4", style: { color: "#009FE3" } }) }),
                /* @__PURE__ */ jsxs("div", { className: "leading-tight", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] font-medium", style: { color: "#6B8296" }, children: "Atención al cliente" }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", style: { color: "#003087" }, children: "91 91 91 898" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openTarificador(),
              className: "flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-white btn-cta-magenta active:scale-[0.98] cursor-pointer ml-1",
              style: { backgroundColor: "#E4097D" },
              children: "Calcular mi precio"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors",
            onClick: () => setMobileOpen(!mobileOpen),
            style: { minWidth: 44, minHeight: 44 },
            "aria-label": mobileOpen ? "Cerrar menú" : "Abrir menú",
            children: mobileOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6", style: { color: "#1A3A5C" } }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6", style: { color: "#1A3A5C" } })
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:block border-b", style: { borderColor: "#E8EFF4", backgroundColor: "#FAFCFE" }, children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1280px] mx-auto flex items-center justify-between px-12 lg:px-20", style: { height: 48 }, children: [
        /* @__PURE__ */ jsx("nav", { className: "flex items-center gap-1", children: navItems.map(
          (item) => item.hasMega ? /* @__PURE__ */ jsx(
            "div",
            {
              className: "relative",
              onMouseEnter: () => openMega(item.key),
              onMouseLeave: closeMega,
              children: /* @__PURE__ */ jsxs(
                "button",
                {
                  className: "flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 hover:bg-white hover:text-[#009FE3]",
                  style: { color: megaOpen === item.key ? "#009FE3" : "#374151" },
                  children: [
                    item.label,
                    /* @__PURE__ */ jsx(
                      ChevronDown,
                      {
                        className: "w-3.5 h-3.5 transition-transform duration-200",
                        style: { transform: megaOpen === item.key ? "rotate(180deg)" : "rotate(0deg)" }
                      }
                    )
                  ]
                }
              )
            },
            item.key
          ) : /* @__PURE__ */ jsx(
            Link,
            {
              to: item.to,
              className: "px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 hover:bg-white hover:text-[#009FE3]",
              style: { color: "#374151" },
              children: item.label
            },
            item.key
          )
        ) }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleNavPhoneSubmit, className: "flex flex-col items-end gap-1", children: [
          navPhoneError && /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", style: { color: "#E4097D" }, children: "Por favor, introduce un teléfono válido" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-0", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center rounded-l-lg border border-r-0 overflow-hidden gap-1.5 px-2",
                style: { borderColor: navPhoneError ? "#E4097D" : "#D5E3F0", backgroundColor: "#fff", height: 36 },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-base leading-none select-none", children: "🇪🇸" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium select-none", style: { color: "#374151" }, children: "+34" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "tel",
                      value: navPhone,
                      onChange: handleNavPhoneChange,
                      placeholder: "600 000 000",
                      autoComplete: "tel",
                      inputMode: "numeric",
                      className: "h-8 text-sm border-0 bg-transparent outline-none w-[130px] px-1 cursor-text",
                      style: { color: "#1A3A5C" }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "submit",
                className: "flex items-center gap-1.5 px-4 text-sm font-bold text-white rounded-r-lg btn-cta-dark active:scale-[0.98] cursor-pointer whitespace-nowrap",
                style: { backgroundColor: "#003087", height: 36 },
                children: [
                  /* @__PURE__ */ jsx(Phone, { className: "w-3.5 h-3.5" }),
                  "Te llamamos"
                ]
              }
            )
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: megaOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.16, ease: "easeOut" },
        className: "hidden lg:block fixed left-0 right-0 w-full bg-white z-[400]",
        style: {
          top: headerBottom,
          borderTop: "3px solid #E4097D",
          borderBottom: "1px solid #D5E3F0",
          boxShadow: "0 16px 48px rgba(0,48,135,0.12)"
        },
        onMouseEnter: () => openMega(megaOpen),
        onMouseLeave: closeMega,
        children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1200px] mx-auto px-8 py-9 flex items-start gap-0", children: [
          megaOpen === "seguros" && /* @__PURE__ */ jsx(MegaSegurosContent, { onNavigate: () => setMegaOpen(null) }),
          megaOpen === "planes" && /* @__PURE__ */ jsx(MegaPlanesContent, { onNavigate: () => setMegaOpen(null), onOpenPhonePopup: () => openPhonePopup() })
        ] })
      },
      megaOpen
    ) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "lg:hidden fixed inset-0 bg-black/30 z-[299]",
          onClick: () => setMobileOpen(false)
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          transition: { duration: 0.22, ease: "easeOut" },
          className: "lg:hidden fixed left-0 right-0 bg-white z-[300] overflow-y-auto rounded-b-2xl",
          style: {
            top: headerRef.current?.getBoundingClientRect().bottom ?? 68,
            maxHeight: "calc(100vh - 68px - 64px)",
            boxShadow: "0 16px 48px rgba(0,48,135,0.15)"
          },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "py-2", children: [
              /* @__PURE__ */ jsxs(MobileAccordionItem, { label: "Seguros", isOpen: mobileExpanded === "seguros", onToggle: () => setMobileExpanded(mobileExpanded === "seguros" ? null : "seguros"), children: [
                /* @__PURE__ */ jsx(MobileGroup, { title: "PARTICULARES", items: megaSeguros.particulares, onClose: () => setMobileOpen(false) }),
                /* @__PURE__ */ jsx(MobileGroup, { title: "AUTÓNOMOS Y NEGOCIOS", items: megaSeguros.empresas, onClose: () => setMobileOpen(false) }),
                /* @__PURE__ */ jsx(MobileGroup, { title: "DENTAL", items: megaSeguros.dental, onClose: () => setMobileOpen(false) }),
                /* @__PURE__ */ jsx(MobileGroup, { title: "OTROS SEGUROS", items: megaSeguros.otros, onClose: () => setMobileOpen(false) })
              ] }),
              /* @__PURE__ */ jsxs(MobileAccordionItem, { label: "Planes", isOpen: mobileExpanded === "planes", onToggle: () => setMobileExpanded(mobileExpanded === "planes" ? null : "planes"), children: [
                /* @__PURE__ */ jsx(MobileGroup, { title: "SIN COPAGO", items: megaPlanes.sinCopago, onClose: () => setMobileOpen(false) }),
                /* @__PURE__ */ jsx(MobileGroup, { title: "CON COPAGO", items: megaPlanes.conCopago, onClose: () => setMobileOpen(false) })
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: "/seguro-salud/ofertas-adeslas-precios/", onClick: () => setMobileOpen(false), className: "flex items-center justify-between px-5 py-4 text-[15px] font-semibold text-gris-texto border-b border-borde/50 hover:bg-gris-claro transition-colors", children: [
                "Precios y ofertas",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-gris-medio" })
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: "/adeslas-blog/", onClick: () => setMobileOpen(false), className: "flex items-center justify-between px-5 py-4 text-[15px] font-semibold text-gris-texto border-b border-borde/50 hover:bg-gris-claro transition-colors", children: [
                "Blog Salud",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-gris-medio" })
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: "/cuadro-medico/", onClick: () => setMobileOpen(false), className: "flex items-center justify-between px-5 py-4 text-[15px] font-semibold text-gris-texto border-b border-borde/50 hover:bg-gris-claro transition-colors", children: [
                "Cuadro médico",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-gris-medio" })
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: "/contacto/", onClick: () => setMobileOpen(false), className: "flex items-center justify-between px-5 py-4 text-[15px] font-semibold text-gris-texto hover:bg-gris-claro transition-colors", children: [
                "Contacto",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-gris-medio" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "px-5 py-4 flex flex-col gap-3 border-t border-borde/50", style: { backgroundColor: "#F8FAFC" }, children: [
              /* @__PURE__ */ jsxs("a", { href: "tel:917105000", onClick: () => trackClickToCallContratacion("header_mobile"), className: "flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-borde text-sm", style: { color: "#003087" }, children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", style: { backgroundColor: "#E4097D" }, children: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 text-white" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gris-medio font-normal leading-none mb-0.5", children: "Nuevas contrataciones" }),
                  /* @__PURE__ */ jsx("div", { className: "font-bold", children: "91 710 50 00" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("a", { href: "tel:919191898", onClick: () => trackClickToCallAsistencia("header_mobile"), className: "flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-borde text-sm", style: { color: "#003087" }, children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", style: { backgroundColor: "#009FE3" }, children: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 text-white" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-[10px] text-gris-medio font-normal leading-none mb-0.5", children: "Atención al cliente" }),
                  /* @__PURE__ */ jsx("div", { className: "font-bold", children: "91 91 91 898" })
                ] })
              ] })
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "lg:hidden fixed left-0 right-0 z-[500] bg-white border-t border-borde flex gap-2.5 px-4 pt-2.5",
        style: {
          bottom: stickyBottom,
          boxShadow: "0 -4px 20px rgba(0,48,135,0.10)",
          paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))"
        },
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => openPhonePopup(),
              className: "flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-bold text-sm border-2 active:scale-[0.98] btn-cta-light",
              style: { borderColor: "#009FE3", color: "#009FE3" },
              children: [
                /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
                "Te llamamos"
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onCalcClick ?? (() => openTarificador()),
              className: "flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-bold text-sm text-white active:scale-[0.98] btn-cta-blue",
              style: { backgroundColor: "#009FE3" },
              children: calcLabel ?? "Calcular mi precio"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: showThankYouModal && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[700] flex items-center justify-center bg-black/50 px-4",
        onClick: () => setShowThankYouModal(false),
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.92, opacity: 0, y: 12 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.92, opacity: 0, y: 12 },
            transition: { duration: 0.25, ease: "easeOut" },
            className: "bg-white rounded-2xl p-7 w-full max-w-sm relative text-center",
            style: { boxShadow: "0 32px 80px rgba(0,48,135,0.22)" },
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx("button", { onClick: () => setShowThankYouModal(false), className: "absolute top-3 right-3 text-gris-medio p-1 hover:text-gris-texto transition-colors", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center", style: { background: "linear-gradient(135deg, #E4097D 0%, #003087 100%)" }, children: /* @__PURE__ */ jsx("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M5 13l4 4L19 7", stroke: "white", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-black mb-1", style: { color: "#003087" }, children: "¡Ya tenemos tu número!" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-medio mb-5 leading-relaxed", children: "Uno de nuestros asesores te llamará lo antes posible para ayudarte a encontrar el seguro que mejor se adapta a ti." }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-xl px-5 py-4 mb-5 text-left", style: { backgroundColor: "#EEF5FF" }, children: [
                /* @__PURE__ */ jsx("div", { className: "text-[11px] font-bold uppercase tracking-wider mb-2", style: { color: "#009FE3" }, children: "Horario de atención" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gris-texto font-medium", children: "Lunes – Viernes" }),
                    /* @__PURE__ */ jsx("span", { className: "font-bold", style: { color: "#003087" }, children: "9:00 – 20:00" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gris-texto font-medium", children: "Sábados" }),
                    /* @__PURE__ */ jsx("span", { className: "font-bold", style: { color: "#003087" }, children: "9:00 – 14:00" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("a", { href: "tel:917105000", className: "flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm border-2", style: { borderColor: "#E4097D", color: "#E4097D" }, onClick: () => {
                trackClickToCallContratacion("thank_you_modal");
                setShowThankYouModal(false);
              }, children: [
                /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
                "O llámanos: 91 710 50 00"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gris-medio mt-3", children: "Sin compromiso · Datos protegidos · Respuesta en minutos" })
            ]
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: showPhonePopup && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[600] flex items-center justify-center bg-black/50 px-4",
        onClick: () => setShowPhonePopup(false),
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { scale: 0.95, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.95, opacity: 0 },
            className: "bg-white rounded-2xl p-6 w-full max-w-sm relative",
            style: { boxShadow: "0 24px 64px rgba(0,48,135,0.2)" },
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx("button", { onClick: () => setShowPhonePopup(false), className: "absolute top-3 right-3 text-gris-medio p-1", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxs("div", { className: "text-center mb-5", children: [
                /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center", style: { backgroundColor: "#FCE4F0" }, children: /* @__PURE__ */ jsx(Phone, { className: "w-6 h-6", style: { color: "#E4097D" } }) }),
                /* @__PURE__ */ jsx("h3", { className: "text-gris-texto text-lg font-bold", children: "Te llamamos gratis" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-medio", children: "Un asesor Adeslas te contactará en minutos" })
              ] }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleMobilePhoneSubmit, className: "space-y-3", children: [
                mobilePhoneError && /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-center", style: { color: "#E4097D" }, children: "Por favor, introduce un teléfono válido" }),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 w-full h-12 rounded-xl border px-3 focus-within:ring-2 focus-within:ring-azul-suave transition-all",
                    style: { backgroundColor: "#fff", borderColor: mobilePhoneError ? "#E4097D" : "#D5E3F0" },
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "text-lg leading-none select-none", children: "🇪🇸" }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium select-none", style: { color: "#374151" }, children: "+34" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "tel",
                          value: mobilePhone,
                          onChange: handleMobilePhoneChange,
                          placeholder: "600 000 000",
                          autoComplete: "tel",
                          inputMode: "numeric",
                          className: "flex-1 h-full text-base border-0 bg-transparent outline-none cursor-text",
                          style: { color: "#1A3A5C" }
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full py-3.5 rounded-xl text-white font-bold text-base btn-cta-magenta", style: { backgroundColor: "#E4097D" }, children: "Te llamamos ahora" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] text-gris-medio mt-3", children: "Sin compromiso · Datos protegidos" })
            ]
          }
        )
      }
    ) })
  ] });
};
const MegaSegurosContent = ({ onNavigate }) => {
  const { openTarificador } = useTarificador();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "w-[30%] pr-6 border-r border-borde", children: [
      /* @__PURE__ */ jsx("div", { className: "label-style mb-2", style: { color: "#374151" }, children: "Particulares" }),
      megaSeguros.particulares.map((item) => /* @__PURE__ */ jsx(MegaLink, { ...item, onClick: onNavigate }, item.label))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-[22%] px-6 border-r border-borde", children: [
      /* @__PURE__ */ jsx("div", { className: "label-style mb-2", style: { color: "#374151" }, children: "Autónomos y negocios" }),
      megaSeguros.empresas.map((item) => /* @__PURE__ */ jsx(MegaLink, { ...item, onClick: onNavigate }, item.label))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-[22%] px-6 border-r border-borde", children: [
      /* @__PURE__ */ jsx("div", { className: "label-style mb-2", style: { color: "#374151" }, children: "Dental" }),
      megaSeguros.dental.map((item) => /* @__PURE__ */ jsx(MegaLink, { ...item, onClick: onNavigate }, item.label)),
      /* @__PURE__ */ jsx("div", { className: "label-style mb-2 mt-4", style: { color: "#374151" }, children: "Otros seguros" }),
      megaSeguros.otros.map((item) => /* @__PURE__ */ jsx(MegaLink, { ...item, onClick: onNavigate }, item.label))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-[240px] flex-shrink-0 ml-auto p-6 rounded-[14px] text-white flex flex-col justify-between", style: { background: "linear-gradient(145deg, #003087 0%, #009FE3 100%)" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] font-black uppercase tracking-[1.4px]", style: { color: "#7DD4F8" }, children: "Recomendado" }),
        /* @__PURE__ */ jsx("div", { className: "text-lg font-black mt-1 mb-1", children: "Adeslas Plena Vital Total" }),
        /* @__PURE__ */ jsxs("div", { className: "text-[13px] leading-[1.55]", style: { color: "rgba(255,255,255,0.70)" }, children: [
          "Hospitalización completa con copago reducido. ",
          /* @__PURE__ */ jsx("span", { className: "font-bold", style: { color: "#7DD4F8" }, children: "3 años sin subidas de prima." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "font-black text-[28px]", children: [
          "desde 48,50€ ",
          /* @__PURE__ */ jsx("span", { className: "text-[13px] font-normal", style: { color: "rgba(255,255,255,0.60)" }, children: "/mes" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => openTarificador("/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/"),
            className: "block w-full text-center py-2.5 rounded-[7px] font-bold text-sm mt-3 btn-cta-magenta cursor-pointer",
            style: { backgroundColor: "#E4097D", color: "#fff" },
            children: "Calcular mi precio →"
          }
        )
      ] })
    ] })
  ] });
};
const MegaPlanesContent = ({ onNavigate, onOpenPhonePopup }) => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsxs("div", { className: "w-[30%] pr-6 border-r border-borde", children: [
    /* @__PURE__ */ jsx("div", { className: "label-style mb-2", style: { color: "#374151" }, children: "Sin copago" }),
    megaPlanes.sinCopago.map((item) => /* @__PURE__ */ jsx(MegaLink, { ...item, onClick: onNavigate }, item.label))
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "w-[30%] px-6 border-r border-borde", children: [
    /* @__PURE__ */ jsx("div", { className: "label-style mb-2", style: { color: "#374151" }, children: "Con copago" }),
    megaPlanes.conCopago.map((item) => /* @__PURE__ */ jsx(MegaLink, { ...item, onClick: onNavigate }, item.label))
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "w-[240px] flex-shrink-0 ml-auto p-6 rounded-[14px] text-white flex flex-col justify-between", style: { background: "linear-gradient(145deg, #003087 0%, #009FE3 100%)" }, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-[10px] font-black uppercase tracking-[1.4px]", style: { color: "#7DD4F8" }, children: "¿No sabes cuál elegir?" }),
      /* @__PURE__ */ jsx("div", { className: "text-lg font-black mt-1 mb-1", children: "Te lo explicamos" }),
      /* @__PURE__ */ jsx("div", { className: "text-[13px] leading-[1.55]", style: { color: "rgba(255,255,255,0.70)" }, children: "Un asesor personal te explica las diferencias en 2 minutos. Sin compromiso." })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          onNavigate();
          onOpenPhonePopup();
        },
        className: "block w-full text-center py-2.5 rounded-[7px] font-bold text-sm mt-4 btn-cta-magenta cursor-pointer",
        style: { backgroundColor: "#E4097D", color: "#fff" },
        children: "Hablar con un asesor →"
      }
    )
  ] })
] });
const MobileAccordionItem = ({ label, isOpen, onToggle, children }) => /* @__PURE__ */ jsxs("div", { className: "border-b border-borde/50", children: [
  /* @__PURE__ */ jsxs("button", { onClick: onToggle, className: "flex items-center justify-between w-full px-5 py-4 text-[15px] font-semibold text-gris-texto hover:bg-gris-claro transition-colors", children: [
    label,
    /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-gris-medio transition-transform duration-200", style: { transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" } })
  ] }),
  /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.3, ease: "easeInOut" }, className: "overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "bg-gris-claro rounded-b-lg mx-3 mb-3 overflow-hidden", style: { borderRadius: "12px" }, children }) }) })
] });
const MobileGroup = ({ title, items, onClose }) => /* @__PURE__ */ jsxs("div", { children: [
  /* @__PURE__ */ jsx("div", { className: "px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-[1.4px]", style: { color: "#003087" }, children: title }),
  items.map((item) => /* @__PURE__ */ jsxs(
    Link,
    {
      to: item.to,
      onClick: onClose,
      className: "flex items-center gap-2 text-[13px] py-2.5 px-4 text-gris-medio hover:text-azul-medio hover:bg-white transition-colors",
      style: { borderBottom: "1px solid rgba(213,227,240,0.5)" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "w-6 h-6 flex items-center justify-center flex-shrink-0", children: item.icon }),
        /* @__PURE__ */ jsx("span", { children: item.label })
      ]
    },
    item.label
  ))
] });

const HERO_BG = "/images/hero-adeslas-seguros-medicos.webp";
const HeroSection = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-cover bg-center", style: { backgroundImage: `url(${HERO_BG})`, minHeight: "460px" }, role: "img", "aria-label": "Seguros médicos Adeslas 2026 — compara todos los planes Adeslas y calcula tu precio online desde 21€/mes", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: "rgba(0,0,0,0.65)" } }),
    /* @__PURE__ */ jsx("div", { className: "max-w-[1280px] mx-auto px-12 lg:px-20 py-8 lg:py-10 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8 lg:gap-10 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-full mb-6 text-sm text-white border", style: { borderColor: "rgba(255,255,255,0.4)", background: "transparent" }, children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full", style: { background: "#009DD9" } }),
          "Seguros Médicos Adeslas"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-white mb-3 text-[26px] md:text-[36px] leading-tight md:leading-[1.15] font-bold", children: [
          "Seguros Médicos Adeslas",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { style: { color: "#009FE3" }, children: "Compara planes y calcula tu precio ahora" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-white/85 mb-6 text-sm md:text-base leading-relaxed max-w-md", children: "GO desde 21€ · Plena Vital desde 38€ · Plena Total sin copagos desde 83€. Más de 51.000 médicos, sin listas de espera en toda España." }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: [
          { emoji: "⭐", label: "+30 años de experiencia" },
          { emoji: "🏥", label: "Sin listas de espera" },
          { emoji: "👨‍⚕️", label: "+51.000 médicos" },
          { emoji: "🏨", label: "+1.400 centros" }
        ].map(({ emoji, label }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-white text-xs sm:text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0", style: { background: "rgba(255,255,255,0.15)" }, children: emoji }),
          label
        ] }, label)) })
      ] }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.35 },
          className: "hidden lg:block",
          children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl overflow-hidden max-w-[370px] mx-auto lg:ml-8 xl:ml-16", style: { boxShadow: "0 20px 56px rgba(0,0,0,0.22)", height: "390px" }, children: /* @__PURE__ */ jsx(Tarificador, { compact: true }) })
        }
      )
    ] }) })
  ] });
};

const CalcButton = ({ children, className, style, productSlug }) => {
  const { openTarificador } = useTarificador();
  return /* @__PURE__ */ jsx("button", { onClick: () => openTarificador(productSlug), className, style, children });
};

const CheckIcon = () => /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0", style: { backgroundColor: "#E8F4FC" }, children: /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M2.5 6L5 8.5L9.5 4", stroke: "#009FE3", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) });
const featuredProducts = [
  {
    icon: "💊",
    name: "Adeslas Go",
    slug: "/seguro-salud/adeslas-go/",
    href: "/seguro-salud/adeslas-go/",
    price: "21,00",
    pill: "Cobertura ambulatoria · Con copago",
    pillDark: false,
    featured: false,
    coverages: ["Consultas médicas ilimitadas", "Urgencias 24h", "Pruebas diagnósticas", "Telemedicina 24h", "Fisioterapia"]
  },
  {
    icon: "🛡",
    name: "Adeslas Plena Total",
    slug: "/seguro-salud/adeslas-plena-total/",
    href: "/seguro-salud/adeslas-plena-total/",
    price: "83,00",
    pill: "Sin copago · Cobertura total",
    pillDark: true,
    featured: true,
    badge: "El más vendido",
    promoBadge: "🎁 Promoción puntos",
    coverages: ["Hospitalización completa", "Cirugía sin límites", "Especialistas sin copago", "Urgencias nacionales", "Videoconsultas 24h"]
  },
  {
    icon: "🏆",
    name: "Adeslas Plena Vital",
    slug: "/seguro-salud/adeslas-plena-vital/",
    href: "/seguro-salud/adeslas-plena-vital/",
    price: "48,00",
    pill: "Cobertura total · Copago reducido",
    pillDark: false,
    promoBadge: "🎁 Promoción puntos",
    coverages: ["Hospitalización completa", "Cirugía sin límites", "Especialistas con copago", "Urgencias nacionales", "Videoconsultas 24h"]
  }
];
const allProducts = [
  { icon: "💊", name: "Adeslas Go", href: "/seguro-salud/adeslas-go/", tag: "Más económico", desc: "Cobertura ambulatoria con copago. Ideal para quienes buscan lo esencial." },
  { icon: "📋", name: "Adeslas Plena Vital", href: "/seguro-salud/adeslas-plena-vital/", tag: "Copago reducido", desc: "Cobertura total con copagos reducidos. La mejor relación calidad-precio." },
  { icon: "🛡", name: "Adeslas Plena Total", href: "/seguro-salud/adeslas-plena-total/", tag: "El más vendido", desc: "Cobertura total sin copago: hospitalización, cirugía y especialistas." },
  { icon: "💎", name: "Adeslas Extra 150", href: "/seguro-salud/adeslas-extra-150/", tag: "Cobertura ampliada", desc: "Sin copagos con coberturas ampliadas. Para quienes quieren más." },
  { icon: "🏆", name: "Adeslas Plena Plus", href: "/seguro-salud/adeslas-plena-plus/", tag: "Máxima cobertura", desc: "Lo mejor de Adeslas. Cobertura premium sin límites." },
  { icon: "🦷", name: "Adeslas Dental", href: "/seguro-dental/", tag: "Dental", desc: "Limpieza, empastes y ortodoncia para toda la familia sin esperas." },
  { icon: "🕊️", name: "Adeslas Decesos", href: "/seguro-decesos/", tag: "Decesos", desc: "Gestión completa del sepelio en España y el extranjero, 24h." }
];
const ProductCarousel = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };
  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);
  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    canScrollLeft && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => scroll("left"),
        className: "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground transition-opacity",
        style: { backgroundColor: "#009FE3", boxShadow: "0 4px 12px rgba(0,48,135,0.25)" },
        "aria-label": "Anterior",
        children: /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M10 4L6 8l4 4", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
      }
    ),
    canScrollRight && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => scroll("right"),
        className: "absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground transition-opacity",
        style: { backgroundColor: "#009FE3", boxShadow: "0 4px 12px rgba(0,48,135,0.25)" },
        "aria-label": "Siguiente",
        children: /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M6 4l4 4-4 4", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollRef,
        className: "flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide",
        style: { scrollbarWidth: "none", msOverflowStyle: "none" },
        children: allProducts.map((p) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: p.href,
            className: "group snap-start flex-shrink-0 w-[240px] rounded-xl p-5 transition-all duration-200 hover:-translate-y-1",
            style: {
              border: "1px solid #D5E3F0",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,48,135,0.06)"
            },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                /* @__PURE__ */ jsx("span", { className: "w-10 h-10 rounded-lg flex items-center justify-center text-xl", style: { backgroundColor: "#E8F4FC" }, children: p.icon }),
                /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full text-[11px] font-bold", style: { backgroundColor: "#E8F4FC", color: "#009FE3" }, children: p.tag })
              ] }),
              /* @__PURE__ */ jsx("h4", { className: "text-gris-texto font-bold text-sm mb-1 group-hover:text-azul-medio transition-colors", children: p.name }),
              /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-xs leading-relaxed", children: p.desc }),
              /* @__PURE__ */ jsx("span", { className: "inline-block mt-3 text-azul-medio text-xs font-bold group-hover:underline", children: "Ver seguro →" })
            ]
          },
          p.name
        ))
      }
    )
  ] });
};
const ProductsSection = () => /* @__PURE__ */ jsx("section", { id: "seguros", className: "section-pad bg-blanco", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
  /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5 },
      className: "text-center mb-12",
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-gris-texto mb-3", children: "Seguros Médicos Adeslas — Compara y Elige tu Plan" }),
        /* @__PURE__ */ jsx("p", { className: "text-gris-medio max-w-lg mx-auto", children: "Toda la gama Adeslas desde 21€/mes: ambulatorio, hospitalización completa, sin copagos y libre elección de médico. Encuentra el plan ideal para ti y tu familia." })
      ]
    }
  ),
  /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-5 max-w-5xl mx-auto", children: featuredProducts.map((p, i) => /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: i * 0.1 },
      className: "relative bg-blanco rounded-2xl p-6 card-shadow transition-all duration-[250ms] hover:-translate-y-1 hover:card-shadow-hover",
      style: {
        borderRadius: "16px",
        border: p.featured ? "2px solid #009FE3" : "1px solid #D5E3F0"
      },
      children: [
        p.badge && /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-primary-foreground text-xs font-bold whitespace-nowrap",
            style: { backgroundColor: "#009FE3" },
            children: p.badge
          }
        ),
        p.promoBadge && /* @__PURE__ */ jsx(
          "div",
          {
            className: p.badge ? "absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-md whitespace-nowrap" : "absolute -top-3 right-4 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-md whitespace-nowrap",
            style: {
              background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
              boxShadow: "0 3px 10px rgba(249,115,22,0.40)"
            },
            children: p.promoBadge
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4",
            style: { backgroundColor: p.featured ? "#003087" : "#E8F4FC" },
            children: p.icon
          }
        ),
        /* @__PURE__ */ jsx("h3", { className: "text-gris-texto mb-1", children: p.name }),
        /* @__PURE__ */ jsxs("div", { className: "price-style mb-2", children: [
          "desde ",
          p.price,
          "€",
          /* @__PURE__ */ jsx("span", { className: "text-base font-normal text-gris-medio", children: "/mes" })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "inline-block px-3 py-1 rounded-full text-xs font-bold mb-5",
            style: {
              backgroundColor: p.pillDark ? "#003087" : "#E8F4FC",
              color: p.pillDark ? "#fff" : "#009FE3"
            },
            children: p.pill
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "space-y-2.5 mb-6", children: p.coverages.map((c) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-gris-texto", children: [
          /* @__PURE__ */ jsx(CheckIcon, {}),
          c
        ] }, c)) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(
            CalcButton,
            {
              productSlug: p.slug,
              className: "block w-full text-center py-2.5 rounded-lg text-primary-foreground font-bold text-sm cursor-pointer btn-cta-magenta",
              style: { backgroundColor: "#E4097D", borderRadius: "7px" },
              children: "Calcular mi precio"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: p.href,
              className: "block w-full py-2.5 rounded-lg text-azul-medio font-bold text-sm border border-borde transition-colors hover:bg-azul-suave text-center",
              style: { borderRadius: "7px" },
              children: "Ver coberturas completas"
            }
          )
        ] })
      ]
    },
    p.name
  )) }),
  /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5 },
      className: "mt-16 max-w-5xl mx-auto",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-gris-texto text-lg font-bold", children: "Toda la gama de seguros Adeslas" }),
          /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-sm mt-1", children: "Salud, dental, decesos, mascotas, accidentes, viaje y más" })
        ] }) }),
        /* @__PURE__ */ jsx(ProductCarousel, {})
      ]
    }
  )
] }) });

const items = [
  { icon: "coverage", title: "Cobertura completa", desc: "Acceso a toda la red de centros médicos concertados" },
  { icon: "diagnostic", title: "Pruebas diagnósticas", desc: "Pruebas de imagen y análisis sin coste adicional" },
  { icon: "urgency", title: "Urgencias 24h", desc: "Atención inmediata ante situaciones de emergencia" },
  { icon: "teleconsult", title: "Videoconsultas y telemedicina 24H", desc: "Consultas online con receta médica incluida" },
  { icon: "specialties", title: "Especialidades médicas", desc: "Acceso a más de 51.000 médicos" },
  { icon: "pregnancy", title: "Seguimiento del embarazo", desc: "Preparación al parto y seguimiento completo" },
  { icon: "rehab", title: "Rehabilitación y fisioterapia", desc: "Tratamientos de rehabilitación incluidos" },
  { icon: "abroad", title: "Asistencia en el extranjero", desc: "Cobertura cuando viajas fuera de España" }
];
const IconSvg = ({ type }) => {
  const iconColor = "#1A3A5C";
  const iconProps = { stroke: iconColor, strokeWidth: "1.5", fill: "none", viewBox: "0 0 24 24" };
  switch (type) {
    case "coverage":
      return /* @__PURE__ */ jsxs("svg", { width: "32", height: "32", ...iconProps, children: [
        /* @__PURE__ */ jsx("path", { d: "M12 2L2 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" }),
        /* @__PURE__ */ jsx("path", { d: "M12 7v6l4 2" })
      ] });
    case "diagnostic":
      return /* @__PURE__ */ jsxs("svg", { width: "32", height: "32", ...iconProps, children: [
        /* @__PURE__ */ jsx("path", { d: "M4 4h16v16H4z" }),
        /* @__PURE__ */ jsx("path", { d: "M8 8h8M8 12h8M8 16h4" })
      ] });
    case "urgency":
      return /* @__PURE__ */ jsxs("svg", { width: "32", height: "32", ...iconProps, children: [
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsx("path", { d: "M12 6v6l4 2" })
      ] });
    case "teleconsult":
      return /* @__PURE__ */ jsxs("svg", { width: "32", height: "32", ...iconProps, children: [
        /* @__PURE__ */ jsx("path", { d: "M4 6h16v12H4z" }),
        /* @__PURE__ */ jsx("path", { d: "M8 18h8M12 20v2M6 20v2M18 20v2" }),
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" })
      ] });
    case "specialties":
      return /* @__PURE__ */ jsxs("svg", { width: "32", height: "32", ...iconProps, children: [
        /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" }),
        /* @__PURE__ */ jsx("path", { d: "M12 8v8M16 12H8" })
      ] });
    case "pregnancy":
      return /* @__PURE__ */ jsxs("svg", { width: "32", height: "32", ...iconProps, children: [
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "4", r: "2" }),
        /* @__PURE__ */ jsx("path", { d: "M12 6v6l-4 4v4h8v-4l-4-4V6" }),
        /* @__PURE__ */ jsx("path", { d: "M8 18h8" })
      ] });
    case "rehab":
      return /* @__PURE__ */ jsxs("svg", { width: "32", height: "32", ...iconProps, children: [
        /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" }),
        /* @__PURE__ */ jsx("path", { d: "M12 6v12M8 10l8 4" }),
        /* @__PURE__ */ jsx("path", { d: "M16 10l-8 4" })
      ] });
    case "abroad":
      return /* @__PURE__ */ jsxs("svg", { width: "32", height: "32", ...iconProps, children: [
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsx("path", { d: "M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20z" }),
        /* @__PURE__ */ jsx("path", { d: "M12 2v20M2 12h20" })
      ] });
    default:
      return null;
  }
};
const WhyAdeslaSection = () => /* @__PURE__ */ jsx("section", { id: "por-que", className: "section-pad bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
  /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      className: "text-center mb-16",
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-[#1A3A5C] mb-3", children: "¿Por qué elegir Adeslas como tu seguro médico privado?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 max-w-2xl mx-auto text-lg", children: "SegurCaixa Adeslas, la aseguradora de salud privada líder en España: más de 51.000 médicos, +1.400 centros y precios garantizados sin subidas durante 3 años" })
      ]
    }
  ),
  /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: items.map((item, i) => /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: i * 0.05 },
      className: "bg-white rounded-lg p-6 transition-all duration-250 hover:shadow-lg",
      style: { border: "1px solid #E8EFF4" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 w-12 h-12 flex items-center justify-center rounded-lg", style: { background: "#EBF7FD" }, children: /* @__PURE__ */ jsx(IconSvg, { type: item.icon }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-[#1A3A5C] text-base font-bold mb-2", children: item.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: item.desc })
      ]
    },
    item.title
  )) })
] }) });

const stats = [
  { value: 50, prefix: "+", suffix: " años", label: "de experiencia" },
  { value: 4e4, prefix: "+", suffix: "", label: "especialistas" },
  { value: 18, prefix: "", suffix: "", label: "hospitales propios" },
  { value: 1e3, prefix: "+", suffix: "", label: "centros médicos" }
];
const CountUp = ({ target, prefix, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  const format = (n) => n >= 1e3 ? n.toLocaleString("es-ES") : n.toString();
  return /* @__PURE__ */ jsx("div", { ref, className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: "text-4xl md:text-5xl font-black text-primary-foreground mb-1", children: [
    prefix,
    format(count),
    suffix
  ] }) });
};
const StatsSection = () => /* @__PURE__ */ jsx("section", { className: "py-16 px-4", style: { backgroundColor: "#003087" }, children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-8", children: stats.map((s) => /* @__PURE__ */ jsxs(
  motion.div,
  {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    children: [
      /* @__PURE__ */ jsx(CountUp, { target: s.value, prefix: s.prefix, suffix: s.suffix }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-sm mt-1", style: { color: "rgba(255,255,255,0.7)" }, children: s.label })
    ]
  },
  s.label
)) }) }) });

const testimonials = [
  {
    name: "Laura M.",
    location: "Madrid",
    product: "Adeslas Plena Plus",
    rating: 5,
    text: "Me operé de menisco el mes pasado y no esperé ni 10 días desde que pedí la primera consulta hasta la intervención. En la seguridad social me decían 8 meses. Sin duda merece cada euro."
  },
  {
    name: "Javier S.",
    location: "Valencia",
    product: "Adeslas GO",
    rating: 4.5,
    text: "Empecé con el plan GO para tantear y ha superado lo que esperaba. Cita con el dermatólogo en 2 días, la app funciona muy bien y el copago es muy asumible. Cuando tenga familia ampliaré el plan."
  },
  {
    name: "Rosa T.",
    location: "Barcelona",
    product: "Plena Vital — Seguro familiar",
    rating: 5,
    text: "Tres hijos y los tres asegurados. La pediatra nos responde por videollamada para cosas del día a día y en urgencias no hay esperas eternas. Es la mejor decisión que he tomado para la familia."
  },
  {
    name: "Miguel A.",
    location: "Sevilla",
    product: "Adeslas Plena Total",
    rating: 4.5,
    text: "El asesor me explicó las diferencias entre planes sin presionarme nada. Al final elegí Plena Total y estoy muy contento: sin copagos, dental incluido y el servicio al cliente responde enseguida."
  },
  {
    name: "Carmen R.",
    location: "Bilbao",
    product: "Adeslas Plena Vital",
    rating: 5,
    text: "Llevaba años en la pública y el cambio es brutal. Consultas en el mismo día muchas veces, especialistas de verdad y sobre todo tranquilidad. El precio es razonable para lo que ofrece."
  },
  {
    name: "Andrés P.",
    location: "Zaragoza",
    product: "Adeslas GO",
    rating: 4.5,
    text: "Contraté para tener algo de cobertura siendo autónomo y ha sido perfecto. He ido al médico tres veces este año y la experiencia siempre ha sido muy buena. Repetiré sin duda."
  }
];
const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0.5 mb-3", children: [...Array(5)].map((_, i) => {
    if (i < full) {
      return /* @__PURE__ */ jsx("span", { style: { color: "#009FE3", fontSize: "15px" }, children: "★" }, i);
    }
    if (i === full && half) {
      return /* @__PURE__ */ jsxs("span", { style: { fontSize: "15px", position: "relative", display: "inline-block" }, children: [
        /* @__PURE__ */ jsx("span", { style: { color: "#D1E9F6" }, children: "★" }),
        /* @__PURE__ */ jsx("span", { style: { color: "#009FE3", position: "absolute", left: 0, top: 0, width: "50%", overflow: "hidden", display: "inline-block" }, children: "★" })
      ] }, i);
    }
    return /* @__PURE__ */ jsx("span", { style: { color: "#D1E9F6", fontSize: "15px" }, children: "★" }, i);
  }) });
};
const TestimonialsSection = () => /* @__PURE__ */ jsx("section", { className: "section-pad bg-blanco", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
  /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      className: "text-center mb-12",
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-gris-texto mb-3", children: "Opiniones de clientes asegurados con Adeslas" }),
        /* @__PURE__ */ jsx("p", { className: "text-gris-medio max-w-lg mx-auto", children: "Clientes reales que confían en Adeslas para cuidar su salud y la de su familia." })
      ]
    }
  ),
  /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-5 max-w-5xl mx-auto", children: testimonials.slice(0, 3).map((t, i) => /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: i * 0.1 },
      className: "relative bg-blanco rounded-2xl p-6 card-shadow border border-borde",
      style: { borderRadius: "16px" },
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute -top-2 left-5 leading-none select-none",
            style: { fontFamily: "Georgia, serif", fontSize: "64px", color: "#E8F4FC" },
            children: '"'
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative pt-6", children: [
          /* @__PURE__ */ jsx(Stars, { rating: t.rating }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-texto mb-4 leading-relaxed", children: t.text }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "font-bold text-gris-texto text-sm", children: [
              t.name,
              " ",
              /* @__PURE__ */ jsxs("span", { className: "font-normal text-gris-medio", children: [
                "· ",
                t.location
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-gris-medio", children: t.product })
          ] })
        ] })
      ]
    },
    t.name
  )) })
] }) });

const faqs = [
  {
    q: "¿Cuánto cuesta un seguro médico Adeslas?",
    a: "Los precios de los seguros médicos Adeslas dependen de la edad, la cobertura elegida y la provincia. Como referencia orientativa para una persona adulta: Adeslas GO desde 21€/mes (ambulatorio con copago), Adeslas Plena Vital desde 38€/mes (hospitalización con copago LMA 300€/año), Adeslas Plena Plus desde 50,92€/mes (sin copagos), Adeslas Plena Total desde 83€/mes (cobertura máxima sin copagos). Usa nuestro calculador online para obtener tu precio exacto en 2 minutos."
  },
  {
    q: "¿Qué cubre el seguro Adeslas Plena Total?",
    a: "Adeslas Plena Total es la cobertura más completa de la gama: atención médica integral sin copagos, hospitalización ilimitada en habitación individual, cirugía, todas las especialidades, urgencias 24h, dental (46 actos incluidos), psicología (20 sesiones/año), asistencia en viajes hasta 100.000€ y garantía de precio sin subida durante 3 años. Es el plan ideal para quienes buscan la máxima tranquilidad sin letra pequeña."
  },
  {
    q: "¿Adeslas tiene copagos?",
    a: "Adeslas ofrece planes con y sin copagos para adaptarse a todos los presupuestos. Adeslas GO tiene copagos con un Límite Máximo Anual (LMA) de 260€/año. Adeslas Plena Vital tiene copagos con LMA de 300€/año. Adeslas Plena Plus y Adeslas Plena Total no tienen copagos en ninguna consulta ni especialista. El copago con LMA garantiza que nunca pagarás más de esa cantidad en un año."
  },
  {
    q: "¿Adeslas cubre embarazo y parto?",
    a: "Sí. Adeslas cubre embarazo y parto completo en los planes Adeslas Plena Plus y Adeslas Plena Total. La cobertura incluye seguimiento prenatal sin límite de visitas, parto vaginal y cesárea en habitación individual privada, neonatología y UCI neonatal si fuera necesario, y revisión postparto. Sin periodo de carencia si se contrata antes del embarazo. Si vienes de otra aseguradora médica, puede eliminarse la carencia: consúltanos."
  },
  {
    q: "¿Puedo contratar Adeslas si soy autónomo?",
    a: "Sí, y es una de las mejores decisiones fiscales y sanitarias que puedes tomar. Adeslas NEGOCIOS está diseñado específicamente para autónomos con NIF: sin copagos, cobertura completa con más de +51.000 médicos y 1.400 centros en toda España. Además, los autónomos pueden deducirse hasta 500€ por persona asegurada al año en el IRPF (incluidos cónyuge e hijos). Solicita tu precio personalizado sin compromiso."
  },
  {
    q: "¿Adeslas tiene seguro dental?",
    a: "Sí. Adeslas Dental es un seguro odontológico especializado disponible de forma individual o familiar. Desde 9,45€/mes incluye limpiezas, revisiones, radiografías y extracciones simples sin coste desde el primer día. Los implantes, ortodoncia y endodoncia tienen franquicias muy reducidas. Los menores de 8 años se incluyen gratis en la póliza familiar. Más de 1.700 profesionales en toda España."
  },
  {
    q: "¿Cuáles son las ventajas de Adeslas frente a otras aseguradoras?",
    a: "SegurCaixa Adeslas es la aseguradora de salud líder en España, con más de 51.000 médicos y más de 1.400 centros médicos en toda la geografía nacional. Las principales ventajas son: acceso directo a especialistas sin derivaciones ni listas de espera, cuadro médico más amplio del sector privado español, telemedicina 24/7, precio garantizado sin subidas durante 3 años en la mayoría de planes, y cobertura completa desde el primer día."
  },
  {
    q: "¿Adeslas tiene telemedicina?",
    a: "Sí. Todos los planes principales de Adeslas incluyen telemedicina 24 horas los 7 días de la semana. Puedes consultar con médicos y especialistas por videollamada desde cualquier dispositivo, recibir recetas médicas online y obtener diagnósticos iniciales sin necesidad de desplazarte. Es especialmente útil para urgencias menores, seguimiento de tratamientos y consultas de madrugada."
  },
  {
    q: "¿Adeslas tiene periodo de carencia?",
    a: "Adeslas no aplica períodos de carencia generales: la gran mayoría de coberturas están activas desde el primer día de contratación. Solo la hospitalización programada tiene una carencia de 8 meses. Si vienes de otra aseguradora médica con al menos 6 meses de antigüedad, pueden eliminarse las carencias por traslado. Consulta con nosotros las condiciones exactas de tu caso."
  }
];
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return /* @__PURE__ */ jsx("section", { id: "faq", className: "section-pad bg-gris-claro", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-[780px]", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "text-center mb-12",
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-gris-texto mb-3", children: "Preguntas frecuentes sobre seguros médicos Adeslas" }),
          /* @__PURE__ */ jsx("p", { className: "text-gris-medio", children: "Resolvemos las dudas más habituales sobre los seguros Adeslas — precios, coberturas y contratación." })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: faqs.map((faq, i) => {
      const isOpen = openIndex === i;
      return /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.05 },
          className: "bg-blanco border border-borde overflow-hidden",
          style: { borderRadius: "12px" },
          children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setOpenIndex(isOpen ? null : i),
                className: "w-full flex items-center justify-between p-5 text-left",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-gris-texto text-[15px] pr-4", children: faq.q }),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200",
                      style: { backgroundColor: isOpen ? "#009FE3" : "#E8F4FC" },
                      children: /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "text-lg font-bold transition-transform duration-200",
                          style: {
                            color: isOpen ? "#fff" : "#009FE3",
                            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
                          },
                          children: "+"
                        }
                      )
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                transition: { duration: 0.25 },
                children: /* @__PURE__ */ jsx("div", { className: "px-5 pb-5 text-sm text-gris-medio leading-relaxed", children: faq.a })
              }
            ) })
          ]
        },
        i
      );
    }) })
  ] }) });
};

const CtaSection = ({ onCalcClick } = {}) => {
  const { openPhonePopup } = usePhonePopup();
  return /* @__PURE__ */ jsx("section", { id: "contacto", className: "py-20 px-4 text-center", style: { background: "linear-gradient(135deg, #003087, #009FE3)" }, children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-2xl", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-primary-foreground mb-5 text-2xl md:text-4xl", children: "Contrata tu Seguro Médico Adeslas hoy — Sin Esperas, Sin Sorpresas" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-3 mb-8", children: [
          onCalcClick ? /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onCalcClick,
              className: "px-6 py-3 rounded-lg font-bold text-sm cursor-pointer btn-cta-white",
              style: { backgroundColor: "#fff", color: "#003087", borderRadius: "7px" },
              children: "Calcular mi precio →"
            }
          ) : /* @__PURE__ */ jsx(
            CalcButton,
            {
              className: "px-6 py-3 rounded-lg font-bold text-sm cursor-pointer btn-cta-white",
              style: { backgroundColor: "#fff", color: "#003087", borderRadius: "7px" },
              children: "Calcular mi precio →"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openPhonePopup(),
              className: "px-6 py-3 rounded-lg font-bold text-sm border cursor-pointer btn-cta-ghost",
              style: { borderColor: "rgba(255,255,255,0.4)", color: "#fff", borderRadius: "7px" },
              children: "📞 Te llamamos gratis"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-8 text-sm", style: { color: "rgba(255,255,255,0.7)" }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("a", { href: "tel:917105000", onClick: () => trackClickToCallContratacion("cta_section"), className: "text-primary-foreground font-bold", children: "91 710 50 00" }),
            /* @__PURE__ */ jsx("div", { children: "Nuevas contrataciones" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("a", { href: "tel:919191898", onClick: () => trackClickToCallAsistencia("cta_section"), className: "text-primary-foreground font-bold", children: "91 919 18 98" }),
            /* @__PURE__ */ jsx("div", { children: "Atención al cliente" })
          ] })
        ] })
      ]
    }
  ) }) });
};

const logoBlanco = "/assets/Logo-adeslas-Marchal-blanco-B4ZCFlj_.webp";

const Footer = () => /* @__PURE__ */ jsxs("footer", { style: { backgroundColor: "#1A2B4A" }, children: [
  /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[2fr_1.2fr_1.2fr_1.2fr_1.2fr] gap-6 lg:gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("img", { src: imgSrc(logoBlanco), alt: "Adeslas Seguros Médicos — Salud Privada en España", className: "h-8 object-contain mb-4", width: "189", height: "64" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm leading-relaxed", style: { color: "rgba(255,255,255,0.5)" }, children: [
          "Avenida de Filipinas, 28 · CP 28003",
          /* @__PURE__ */ jsx("br", {}),
          "Madrid"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-primary-foreground font-bold text-sm mb-3", children: "Seguros de Salud Adeslas" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: [
          { label: "Adeslas Go", to: "/seguro-salud/adeslas-go/" },
          { label: "Adeslas Plena Vital", to: "/seguro-salud/adeslas-plena-vital/" },
          { label: "Adeslas Plena Total", to: "/seguro-salud/adeslas-plena-total/" },
          { label: "Adeslas Plena Vital Total", to: "/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/" },
          { label: "Adeslas Plena Plus", to: "/seguro-salud/adeslas-plena-plus/" },
          { label: "Adeslas Extra 150", to: "/seguro-salud/adeslas-extra-150/" }
        ].map((l) => /* @__PURE__ */ jsx(Link, { to: l.to, className: "block text-sm transition-colors hover:text-primary-foreground", style: { color: "rgba(255,255,255,0.5)" }, children: l.label }, l.to)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-primary-foreground font-bold text-sm mb-3", children: "Otros Seguros Adeslas" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: [
          { label: "Dental", to: "/seguro-dental/" },
          { label: "Decesos", to: "/seguro-decesos/" },
          { label: "Mascotas", to: "/seguro-dental/" }
        ].map((l) => /* @__PURE__ */ jsx(Link, { to: l.to, className: "block text-sm transition-colors hover:text-primary-foreground", style: { color: "rgba(255,255,255,0.5)" }, children: l.label }, l.to)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-primary-foreground font-bold text-sm mb-3", children: "Adeslas por Perfil de Asegurado" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: [
          { label: "Individual", to: "/seguro-salud/adeslas-individual/" },
          { label: "Familiar", to: "/seguro-salud/seguro-familia/" },
          { label: "Infantil", to: "/seguro-salud/adeslas-infantil/" },
          { label: "Ginecología", to: "/seguro-salud/adeslas-ginecologia/" },
          { label: "Embarazadas", to: "/seguro-salud/embarazo/" }
        ].map((l) => /* @__PURE__ */ jsx(Link, { to: l.to, className: "block text-sm transition-colors hover:text-primary-foreground", style: { color: "rgba(255,255,255,0.5)" }, children: l.label }, l.to)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-primary-foreground font-bold text-sm mb-3", children: "Adeslas para Empresas y Recursos" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: [
          { label: "Autónomos", to: "/seguro-salud/autonomos/" },
          { label: "Pymes", to: "/pymes" },
          { label: "Empresas", to: "/empresas" },
          { label: "Precios y Ofertas", to: "/seguro-salud/ofertas-adeslas-precios/" },
          { label: "Cuadro Médico", to: "/cuadro-medico/" },
          { label: "Blog", to: "/adeslas-blog/" },
          { label: "Contacto", to: "/contacto/" }
        ].map((l) => /* @__PURE__ */ jsx(Link, { to: l.to, className: "block text-sm transition-colors hover:text-primary-foreground", style: { color: "rgba(255,255,255,0.5)" }, children: l.label }, l.to)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6 mt-10 pt-8 border-t", style: { borderColor: "rgba(255,255,255,0.1)" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-wide text-primary-foreground font-bold mb-1", children: "Nuevas contrataciones" }),
        /* @__PURE__ */ jsx("a", { href: "tel:917105000", onClick: () => trackClickToCallContratacion("footer"), className: "block text-sm hover:text-primary-foreground transition-colors", style: { color: "rgba(255,255,255,0.7)" }, children: "91 710 50 00" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-wide text-primary-foreground font-bold mb-1", children: "Atención al cliente" }),
        /* @__PURE__ */ jsx("a", { href: "tel:919191898", onClick: () => trackClickToCallAsistencia("footer"), className: "block text-sm hover:text-primary-foreground transition-colors", style: { color: "rgba(255,255,255,0.7)" }, children: "91 919 18 98" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-wide text-primary-foreground font-bold mb-1", children: "Horario de atención" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", style: { color: "rgba(255,255,255,0.7)" }, children: "Lunes a Viernes: 8:00-21:00" })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "border-t", style: { borderColor: "rgba(255,255,255,0.1)" }, children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-5", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs text-center mb-2", style: { color: "rgba(255,255,255,0.35)" }, children: "© 2026 Marchal Aseguradores S.L.U. · CIF B-86792017 · Agencia Exclusiva de Adeslas S.A. · DGS 28101259" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4 text-xs", style: { color: "rgba(255,255,255,0.35)" }, children: [
      /* @__PURE__ */ jsx(Link, { to: "/politica-de-privacidad", onClick: () => window.scrollTo(0, 0), className: "hover:text-primary-foreground transition-colors", children: "Aviso legal" }),
      /* @__PURE__ */ jsx(Link, { to: "/politica-de-privacidad", onClick: () => window.scrollTo(0, 0), className: "hover:text-primary-foreground transition-colors", children: "Privacidad" })
    ] })
  ] }) })
] });

const Index = () => {
  const _seo = useSeo({
    title: "Adeslas Seguros Médicos | Salud Privada · +51.000 Médicos · Sin Listas de Espera",
    description: "Adeslas: seguro médico privado líder en España. GO desde 21€, Plena Vital desde 38€, Plena Vital Total desde 48,50€ (3 años sin subidas de prima), Plena Total sin copagos desde 83€. Más de 51.000 médicos y 1.400 centros. Calcula tu precio en 2 minutos.",
    canonical: "https://adeslas.numero1salud.es/",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.numero1salud.es/" }
    ],
    addOrganizationSchema: true,
    addWebsiteSchema: true,
    faqSchema: [
      {
        q: "¿Cuánto cuesta un seguro médico Adeslas?",
        a: "Los seguros médicos Adeslas tienen precios según el plan elegido, la edad y la provincia. En 2026 los precios de referencia son: Adeslas GO desde 21€/mes (ambulatorio con copago), Adeslas Plena Vital desde 38€/mes (hospitalización con copago máx. 300€/año), Adeslas Plena Vital Total desde 48,50€/mes (cobertura total con precio garantizado 3 años), Adeslas Plena Plus desde 62€/mes (sin copagos), Adeslas Plena Total desde 83€/mes (sin copagos, dental y viajes incluidos) y Adeslas Extra 150 desde 90€/mes (libre elección médica). Calcula tu precio exacto en 2 minutos con nuestro comparador online."
      },
      {
        q: "¿Cuáles son los planes de seguro médico Adeslas disponibles?",
        a: "Adeslas dispone de seis planes de seguro médico privado para particulares en España: (1) Adeslas GO: ambulatorio con copago máximo 260€/año, desde 21€/mes. (2) Adeslas Plena Vital: hospitalización completa con copago máx. 300€/año, desde 38€/mes. (3) Adeslas Plena Vital Total: cobertura total con copago reducido y prima garantizada 3 años sin subidas, desde 48,50€/mes. (4) Adeslas Plena Plus: sin copagos y hospitalización completa, desde 62€/mes. (5) Adeslas Plena Total: el más completo, sin copagos, dental (46 actos), psicología y asistencia viajes, desde 83€/mes. (6) Adeslas Extra 150: libre elección de médico con reembolso del 80%, desde 90€/mes."
      },
      {
        q: "¿Qué cubre el seguro Adeslas Plena Total?",
        a: "Adeslas Plena Total incluye cobertura médica integral sin copagos en ningún servicio: consultas de medicina general, todas las especialidades, pruebas diagnósticas, cirugía, hospitalización ilimitada, dental (46 actos incluidos), psicología (20 sesiones/año), asistencia sanitaria en viajes con cobertura hasta 100.000€ y protección por accidente. Incluye además la garantía de precio sin subida durante 3 años."
      },
      {
        q: "¿Qué diferencia hay entre Adeslas Plena Vital y Adeslas Plena Total?",
        a: "La principal diferencia es el copago y las coberturas adicionales. Adeslas Plena Vital tiene un copago por consulta con un tope anual de 300€ (nunca pagarás más de 300€ al año aunque uses mucho el seguro), y no incluye dental ni psicología. Adeslas Plena Total no tiene ningún copago en ningún servicio y añade dental (46 actos), psicología y asistencia en viajes. Plena Total es más cara (desde 83€/mes) pero ofrece la cobertura más amplia."
      },
      {
        q: "¿Adeslas tiene copagos?",
        a: "Adeslas ofrece planes con y sin copagos. Adeslas GO tiene un copago limitado a 260€/año (LMA). Adeslas Plena Vital tiene copago con tope de 300€/año. Adeslas Plena Vital Total tiene copago reducido con prima garantizada 3 años. Adeslas Plena Plus y Plena Total no tienen copago en ningún servicio. La elección entre planes con y sin copago depende del uso que hagas del seguro y del presupuesto disponible."
      },
      {
        q: "¿Cuál es el mejor seguro Adeslas?",
        a: "Depende de tu perfil y presupuesto. Para un uso frecuente del médico sin preocuparte por gastos: Plena Total (sin copagos) o Plena Vital Total (sin subidas de prima 3 años). Para presupuesto ajustado con cobertura completa: Plena Vital o Plena Plus. Para cobertura básica a precio mínimo: Adeslas GO. Para máxima libertad de elección de médico: Extra 150. El plan Plena Vital Total es el más recomendado por equilibrar precio, cobertura y estabilidad."
      },
      {
        q: "¿Adeslas cubre embarazo y parto?",
        a: "Sí. Adeslas cubre embarazo y parto en los planes Plena Vital, Plena Vital Total, Plena Plus y Plena Total. La cobertura incluye seguimiento prenatal completo, parto vaginal y cesárea en habitación individual, neonatología y revisión postparto. Sin período de carencia adicional si se contrata con antelación al embarazo. Si procedes de otra aseguradora médica, pueden eliminarse las carencias."
      },
      {
        q: "¿Puedo contratar Adeslas si soy autónomo?",
        a: "Sí. Adeslas dispone de planes específicos para autónomos con ventajas fiscales: los autónomos pueden deducir hasta 500€/año por asegurado (ellos mismos y su cónyuge e hijos dependientes) en el IRPF. Puedes elegir entre GO, Plena Vital, Plena Vital Total, Plena Plus o Plena Total según tus necesidades."
      },
      {
        q: "¿Adeslas tiene seguro dental?",
        a: "Sí. Adeslas Dental es un seguro dental específico desde 9,45€/mes. Cubre limpiezas, revisiones y radiografías desde el primer día sin carencias. También incluye franquicias reducidas en endodoncia, implantes y ortodoncia. Los menores de 8 años se aseguran gratis. Puede contratarse de forma independiente o complementaria a cualquier seguro médico Adeslas."
      },
      {
        q: "¿Cuáles son las ventajas de Adeslas frente a otras aseguradoras?",
        a: "Adeslas (SegurCaixa Adeslas) es la aseguradora de salud privada líder en España. Sus principales ventajas son: la red médica más amplia del sector con más de 51.000 médicos y 1.400 centros; acceso inmediato sin listas de espera; sin necesidad de derivación previa para ver especialistas; copagos limitados o nulos según el plan; garantía de precio 3 años sin subidas en los planes Plena Vital Total y Plena Total; y cobertura en toda España."
      },
      {
        q: "¿Adeslas tiene listas de espera?",
        a: "No. Una de las principales ventajas de los seguros médicos Adeslas es el acceso inmediato a médicos y especialistas sin listas de espera. En la mayoría de especialidades puedes tener cita en 24-72 horas. No se necesita derivación del médico de cabecera para acceder directamente a un especialista."
      },
      {
        q: "¿Adeslas tiene periodo de carencia?",
        a: "Adeslas no aplica períodos de carencia generales: la mayoría de coberturas están activas desde el primer día de contratación, incluidas urgencias, consultas y hospitalización. Solo algunas prestaciones muy específicas pueden tener condiciones particulares. Si procedes de otra aseguradora médica, pueden eliminarse las carencias. Consúltanos para más información."
      }
    ]
  });
  return /* @__PURE__ */ jsxs(TarificadorProvider, { children: [
    _seo,
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsx(ProductsSection, {}),
    /* @__PURE__ */ jsx(Tarificador, {}),
    /* @__PURE__ */ jsx(WhyAdeslaSection, {}),
    /* @__PURE__ */ jsx(StatsSection, {}),
    /* @__PURE__ */ jsx(TestimonialsSection, {}),
    /* @__PURE__ */ jsx(FaqSection, {}),
    /* @__PURE__ */ jsx(CtaSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};

const NotFound = lazy(() => import('./assets/NotFound-Cc0Vrfzu.js'));
const AdeslaGo = lazy(() => import('./assets/AdeslaGo-DsEpesTo.js'));
const AdeslaPlenaVital = lazy(() => import('./assets/AdeslaPlenaVital-CIcefIZc.js'));
const AdeslaPlenaVitalTotal = lazy(() => import('./assets/AdeslaPlenaVitalTotal-DYXygUA7.js'));
const AdeslaPlenaTotal = lazy(() => import('./assets/AdeslaPlenaTotal-eNhBAQQA.js'));
const AdeslaExtra150 = lazy(() => import('./assets/AdeslaExtra150-vUUcGP3G.js'));
const AdeslaPlenaPlus = lazy(() => import('./assets/AdeslaPlenaPlus-Byflnzos.js'));
const AdeslasSeniors = lazy(() => import('./assets/AdeslasSeniors-BGpBFDHQ.js'));
const AdeslasSeniorsTotal = lazy(() => import('./assets/AdeslasSeniorsTotal-BVIIPpcO.js'));
const Autonomos = lazy(() => import('./assets/Autonomos-yrK8Nkvr.js'));
const PymesEmpresas = lazy(() => import('./assets/PymesEmpresas-EZzMU3re.js'));
const AdeslaExtranjeros = lazy(() => import('./assets/AdeslaExtranjeros-XPpTIp0Y.js'));
const AdeslaBodyFactory = lazy(() => import('./assets/AdeslaBodyFactory-DhfeVwtS.js'));
const AdeslaAdifRenfe = lazy(() => import('./assets/AdeslaAdifRenfe-C_b6jyRC.js'));
const AdeslaDeceosPrimaUnica = lazy(() => import('./assets/AdeslaDeceosPrimaUnica-BpaHjS9z.js'));
const FormularioDeAlta = lazy(() => import('./assets/FormularioDeAlta-EyDhA6Ot.js'));
const LandingPlenaVitalOferta = lazy(() => import('./assets/LandingPlenaVitalOferta-CfLdJLHW.js'));
const AdeslasDental = lazy(() => import('./assets/AdeslasDental-Dm_8nc7j.js'));
const AdeslaDecesos = lazy(() => import('./assets/AdeslaDecesos-CIRUyMQv.js'));
const AdeslasMascotas = lazy(() => import('./assets/AdeslasMascotas-Daq6FqkG.js'));
const AdeslaAsistenciaViaje = lazy(() => import('./assets/AdeslaAsistenciaViaje-DxIwcE9N.js'));
const AdeslaAccidentes = lazy(() => import('./assets/AdeslaAccidentes-b7haGLlo.js'));
const SeguroIndividual = lazy(() => import('./assets/SeguroIndividual-CJxQ-PPO.js'));
const SeguroFamiliar = lazy(() => import('./assets/SeguroFamiliar-CAhPxc2i.js'));
const SeguroInfantil = lazy(() => import('./assets/SeguroInfantil-9e7NxRoB.js'));
const SeguroGinecologia = lazy(() => import('./assets/SeguroGinecologia-Gl6b5FP7.js'));
const SeguroEmbarazadas = lazy(() => import('./assets/SeguroEmbarazadas-DYibdp2M.js'));
const SeguroMayores = lazy(() => import('./assets/SeguroMayores-D_0L6Qo3.js'));
const CuadroMedico = lazy(() => import('./assets/CuadroMedico-CkHi1N85.js'));
const Contacto = lazy(() => import('./assets/Contacto-QPC8RI78.js'));
const BlogSalud = lazy(() => import('./assets/BlogSalud-CnK9oY0A.js'));
const BlogArticle = lazy(() => import('./assets/BlogArticle-Bi3eLlue.js'));
const PoliticaPrivacidad = lazy(() => import('./assets/PoliticaPrivacidad-C3xzYLDk.js'));
const MiPrecio = lazy(() => import('./assets/MiPrecio-DnN9eP4q.js'));
const PreciosOfertas = lazy(() => import('./assets/PreciosOfertas-BSgoPYAZ.js'));
const TarificadorInterno = lazy(() => import('./assets/TarificadorInterno-DdQ4Li65.js'));
const ContratarPage = lazy(() => import('./assets/ContratarPage-BKUiW4mf.js'));
const PageLoader = () => /* @__PURE__ */ jsxs("div", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }, children: [
  /* @__PURE__ */ jsx("div", { style: {
    width: 36,
    height: 36,
    border: "3px solid #E8EFF4",
    borderTopColor: "#009FE3",
    borderRadius: "50%",
    animation: "adeslas-spin 0.7s linear infinite"
  } }),
  /* @__PURE__ */ jsx("style", { children: `@keyframes adeslas-spin { to { transform: rotate(360deg); } }` })
] });
const queryClient = new QueryClient();
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    captureGclid();
    trackPageView(pathname);
  }, [pathname]);
  return null;
};
const App = () => /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsx(Toaster$1, {}),
  /* @__PURE__ */ jsx(PhonePopupProvider, { children: /* @__PURE__ */ jsxs(BrowserRouter, { children: [
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(PageLoader, {}), children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-go", element: /* @__PURE__ */ jsx(AdeslaGo, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-plena-vital", element: /* @__PURE__ */ jsx(AdeslaPlenaVital, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-plena-vital-total", element: /* @__PURE__ */ jsx(AdeslaPlenaVitalTotal, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-plena-total", element: /* @__PURE__ */ jsx(AdeslaPlenaTotal, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-extra-150", element: /* @__PURE__ */ jsx(AdeslaExtra150, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-plena-plus", element: /* @__PURE__ */ jsx(AdeslaPlenaPlus, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-seniors", element: /* @__PURE__ */ jsx(AdeslasSeniors, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-seniors-total", element: /* @__PURE__ */ jsx(AdeslasSeniorsTotal, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/autonomos", element: /* @__PURE__ */ jsx(Autonomos, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/pymes-empresas", element: /* @__PURE__ */ jsx(PymesEmpresas, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-extranjeros", element: /* @__PURE__ */ jsx(AdeslaExtranjeros, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-body-factory", element: /* @__PURE__ */ jsx(AdeslaBodyFactory, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-adif-renfe", element: /* @__PURE__ */ jsx(AdeslaAdifRenfe, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-dental", element: /* @__PURE__ */ jsx(AdeslasDental, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-dental", element: /* @__PURE__ */ jsx(AdeslasDental, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-decesos", element: /* @__PURE__ */ jsx(AdeslaDecesos, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-decesos", element: /* @__PURE__ */ jsx(AdeslaDecesos, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adesla-decesos-prima-unica", element: /* @__PURE__ */ jsx(AdeslaDeceosPrimaUnica, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-decesos-prima-unica", element: /* @__PURE__ */ jsx(AdeslaDeceosPrimaUnica, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-adeslas-decesos-prima-unica", element: /* @__PURE__ */ jsx(AdeslaDeceosPrimaUnica, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-mascotas", element: /* @__PURE__ */ jsx(AdeslasMascotas, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-mascotas", element: /* @__PURE__ */ jsx(AdeslasMascotas, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-asistencia-viaje", element: /* @__PURE__ */ jsx(AdeslaAsistenciaViaje, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-asistencia-en-viaje", element: /* @__PURE__ */ jsx(AdeslaAsistenciaViaje, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-accidentes", element: /* @__PURE__ */ jsx(AdeslaAccidentes, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-accidentes", element: /* @__PURE__ */ jsx(AdeslaAccidentes, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-medico-individual", element: /* @__PURE__ */ jsx(SeguroIndividual, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-medico-familiar", element: /* @__PURE__ */ jsx(SeguroFamiliar, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-medico-infantil", element: /* @__PURE__ */ jsx(SeguroInfantil, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-medico-ginecologia", element: /* @__PURE__ */ jsx(SeguroGinecologia, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-medico-embarazadas", element: /* @__PURE__ */ jsx(SeguroEmbarazadas, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-medico-mayores", element: /* @__PURE__ */ jsx(SeguroMayores, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/cuadro-medico", element: /* @__PURE__ */ jsx(CuadroMedico, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/contacto", element: /* @__PURE__ */ jsx(Contacto, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/blog", element: /* @__PURE__ */ jsx(BlogSalud, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/adeslas-blog", element: /* @__PURE__ */ jsx(BlogSalud, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/blog/:slug", element: /* @__PURE__ */ jsx(BlogArticle, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/politica-de-privacidad", element: /* @__PURE__ */ jsx(PoliticaPrivacidad, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/mi-precio/:slug", element: /* @__PURE__ */ jsx(MiPrecio, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/precios-ofertas", element: /* @__PURE__ */ jsx(PreciosOfertas, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/precios-y-ofertas", element: /* @__PURE__ */ jsx(PreciosOfertas, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/adeslas-go/", element: /* @__PURE__ */ jsx(AdeslaGo, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/adeslas-plena-vital/", element: /* @__PURE__ */ jsx(AdeslaPlenaVital, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/", element: /* @__PURE__ */ jsx(AdeslaPlenaVitalTotal, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/adeslas-plena-total/", element: /* @__PURE__ */ jsx(AdeslaPlenaTotal, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/adeslas-extra-150/", element: /* @__PURE__ */ jsx(AdeslaExtra150, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/adeslas-plena-plus/", element: /* @__PURE__ */ jsx(AdeslaPlenaPlus, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/adeslas-seniors/", element: /* @__PURE__ */ jsx(AdeslasSeniors, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/", element: /* @__PURE__ */ jsx(AdeslasSeniorsTotal, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/autonomos/", element: /* @__PURE__ */ jsx(Autonomos, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/pymes/", element: /* @__PURE__ */ jsx(PymesEmpresas, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/pymes", element: /* @__PURE__ */ jsx(PymesEmpresas, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/empresas/", element: /* @__PURE__ */ jsx(PymesEmpresas, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/adeslas-individual/", element: /* @__PURE__ */ jsx(SeguroIndividual, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/seguro-familia/", element: /* @__PURE__ */ jsx(SeguroFamiliar, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/adeslas-infantil/", element: /* @__PURE__ */ jsx(SeguroInfantil, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/adeslas-ginecologia/", element: /* @__PURE__ */ jsx(SeguroGinecologia, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/embarazo/", element: /* @__PURE__ */ jsx(SeguroEmbarazadas, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/seguro-para-personas-mayores/", element: /* @__PURE__ */ jsx(SeguroMayores, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/ofertas-adeslas-precios/", element: /* @__PURE__ */ jsx(PreciosOfertas, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/seguro-salud/adeslas-formulario-de-alta", element: /* @__PURE__ */ jsx(FormularioDeAlta, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/oferta-plena-vital", element: /* @__PURE__ */ jsx(LandingPlenaVitalOferta, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/tarificador-interno", element: /* @__PURE__ */ jsx(TarificadorInterno, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/contratar", element: /* @__PURE__ */ jsx(ContratarPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
    ] }) })
  ] }) })
] }) }) });

const createRoot = ViteReactSSG(
  /* @__PURE__ */ jsx(App, {}),
  ({ path }) => {
  }
);

export { CtaSection as C, Footer as F, Header as H, PageCalcProvider as P, TermsCheckbox as T, extStudentsPricing as a, useSeo as b, TarificadorProvider as c, createRoot, Tarificador as d, extResidentsPricing as e, CalcButton as f, useTarificador as g, products as h, imgSrc as i, getPrice as j, getZoneFromProvince as k, logoAzul as l, provinces as p, trackClickToCallContratacion as t, usePhonePopup as u };
