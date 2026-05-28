import { NextRequest, NextResponse } from 'next/server';

// ================================================================
// API Route: POST /api/netelip-bridge
//
// Recibe el webhook de HubSpot cuando se asigna un propietario a un
// contacto con origen en la web de Adeslas. Lanza una llamada a la
// extensión Netelip del comercial asignado.
//
// El cliente NO recibe ninguna llamada en este punto. Solo suena el
// teléfono del comercial. Si el comercial descuelga, /api/netelip-control
// es quien hace el bridge hacia el cliente.
//
// Variables de entorno requeridas en Vercel:
//   NETELIP_TOKEN          → Token de autenticación del panel Netelip
//   NETELIP_API_NAME       → Nombre de la API Voice (ej: "APIce0a9")
//   NETELIP_CALLER_ID      → Número que ve el cliente (ej: "34917105000")
//   NETELIP_EXTENSION_MAP  → JSON: { "hubspot_owner_id": "extension" }
//   HUBSPOT_WEBHOOK_SECRET → Palabra secreta para validar el webhook
// ================================================================

// Mapa: HubSpot Owner ID → Extensión Netelip
// Añadir aquí nuevos comerciales cuando sea necesario
const getExtensionMap = (): Record<string, string> => {
  try {
    return JSON.parse(process.env.NETELIP_EXTENSION_MAP ?? '{}');
  } catch {
    console.error('[netelip-bridge] NETELIP_EXTENSION_MAP no es JSON válido');
    return {};
  }
};

// Normaliza teléfono español a formato Netelip: 34XXXXXXXXX (sin + ni 00)
function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-+().]/g, '');
  if (digits.startsWith('0034')) return digits.slice(2);    // 0034XX → 34XX
  if (digits.startsWith('34') && digits.length === 11) return digits;
  if (/^[679]\d{8}$/.test(digits)) return `34${digits}`;   // 9 dígitos sin prefijo
  return null;
}

export async function POST(req: NextRequest) {
  // ── 1. Validar secret del webhook ──────────────────────────────
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.HUBSPOT_WEBHOOK_SECRET) {
    console.warn('[netelip-bridge] Webhook secret inválido');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── 2. Parsear payload de HubSpot ──────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // HubSpot envía las propiedades en formato { properties: { phone: { value: "..." } } }
  const props = body.properties as Record<string, { value: string }> | undefined;
  const rawPhone = props?.phone?.value ?? props?.mobilephone?.value ?? '';
  const ownerId  = props?.hubspot_owner_id?.value ?? '';

  if (!rawPhone || !ownerId) {
    console.warn('[netelip-bridge] Payload sin teléfono u owner:', { rawPhone, ownerId });
    return NextResponse.json({ ok: false, reason: 'missing_data' });
  }

  // ── 3. Buscar extensión del comercial ──────────────────────────
  const extensionMap = getExtensionMap();
  const extension = extensionMap[ownerId];

  if (!extension) {
    console.warn('[netelip-bridge] Sin extensión para owner:', ownerId, '— Mapa:', extensionMap);
    return NextResponse.json({ ok: false, reason: 'no_extension_for_owner' });
  }

  // ── 4. Normalizar teléfono del cliente ────────────────────────
  const clientPhone = normalizePhone(rawPhone);
  if (!clientPhone) {
    console.warn('[netelip-bridge] Teléfono inválido:', rawPhone);
    return NextResponse.json({ ok: false, reason: 'invalid_phone' });
  }

  // ── 5. Lanzar llamada a la extensión del comercial ────────────
  // src  → número que ve el comercial en su terminal (teléfono del cliente)
  // dst  → extensión Netelip del comercial
  // userdata → teléfono del cliente, viaja con la llamada hasta /netelip-control
  const params = new URLSearchParams({
    token:    process.env.NETELIP_TOKEN!,
    api:      process.env.NETELIP_API_NAME!,
    src:      clientPhone,
    dst:      extension,
    typedst:  'extension',
    duration: '30',
    userdata: clientPhone,
  });

  let netelipResponse: { response: string; ID?: string };
  try {
    const res = await fetch('https://api.netelip.com/v1/voice', {
      method:  'POST',
      body:    params.toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal:  AbortSignal.timeout(8000),
    });
    netelipResponse = await res.json();
  } catch (err) {
    console.error('[netelip-bridge] Error llamando a Netelip API:', err);
    return NextResponse.json({ ok: false, reason: 'netelip_api_error' }, { status: 502 });
  }

  if (netelipResponse.response !== '200') {
    console.error('[netelip-bridge] Netelip rechazó la llamada:', netelipResponse);
    return NextResponse.json({ ok: false, reason: 'call_rejected', detail: netelipResponse });
  }

  console.log(`[netelip-bridge] ✅ Llamada lanzada — Extensión: ${extension} | Cliente: ${clientPhone} | ID: ${netelipResponse.ID}`);
  return NextResponse.json({ ok: true, callId: netelipResponse.ID });
}
