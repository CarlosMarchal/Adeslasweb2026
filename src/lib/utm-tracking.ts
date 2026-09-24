/* ─────────────────────────────────────────────
   Captura de parámetros UTM para HubSpot
   Portal:  6596944
   Web:     Adeslas · Marchal Aseguradores

   Persiste los UTM en "first touch": el primer valor que llega en la
   sesión es el que se conserva, aunque el usuario navegue después a
   URLs sin query string. Necesario tras la migración a SSG, donde la
   navegación es full-page y descarta los parámetros de la landing.

   Las propiedades de contacto (utm_source, utm_medium, utm_campaign,
   utm_term, hsa_net) ya existen en el CRM: aquí solo se envían.

   Autor: Juan Carlos Díaz — Convertiam.
───────────────────────────────────────────── */

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "hsa_net",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];

/** Guarda los UTM de la URL en sessionStorage la primera vez que aparecen (first touch) */
export function captureUtmParams(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      // El primer valor manda: no se sobrescribe en navegaciones posteriores.
      if (value && !sessionStorage.getItem(`hs_${key}`)) {
        sessionStorage.setItem(`hs_${key}`, value);
      }
    }
  } catch {
    // ignore
  }
}

/** Lee un UTM de la URL actual o, si no está, del valor persistido en sessionStorage */
export function getUtm(key: UtmKey | string): string {
  if (typeof window === "undefined") return "";
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get(key) || sessionStorage.getItem(`hs_${key}`) || "";
  } catch {
    return "";
  }
}

/** Campos con el formato de la HubSpot Forms API (contacto = objectTypeId "0-1").
 *  Solo devuelve los UTM que tengan valor. */
export function getUtmHubSpotFields(): Array<{
  objectTypeId: string;
  name: string;
  value: string;
}> {
  return UTM_KEYS.map((name) => ({
    objectTypeId: "0-1",
    name,
    value: getUtm(name),
  })).filter((f) => f.value);
}
