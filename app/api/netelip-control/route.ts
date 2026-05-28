import { NextRequest, NextResponse } from 'next/server';

// ================================================================
// API Route: POST /api/netelip-control
//
// URL de control de llamadas salientes de Netelip API Voice.
// Netelip llama a este endpoint tras cada evento de la llamada que
// se lanzó desde /api/netelip-bridge.
//
// Flujo:
//   1. Netelip llama a extensión del comercial (lanzado desde bridge)
//   2. Si comercial descuelga  → statuscall=answer  → bridge al cliente
//   3. Si nadie descuelga      → statuscall=noanswer → hangup
//      (el cliente NO recibe ninguna llamada en el caso 3)
//
// Esta URL debe estar configurada en el panel Netelip como
// "URL de control para llamadas salientes" de tu API Voice.
// ================================================================

// Convierte 34XXXXXXXXX → 0034XXXXXXXXX (formato que espera el comando dial)
function toDialFormat(phone: string): string {
  if (phone.startsWith('0034')) return phone;
  if (phone.startsWith('34')) return `00${phone}`;
  return `0034${phone}`;
}

export async function POST(req: NextRequest) {
  // Netelip envía los datos como form-urlencoded
  let data: URLSearchParams;
  try {
    const text = await req.text();
    data = new URLSearchParams(text);
  } catch {
    return NextResponse.json({ command: 'hangup' });
  }

  const statuscall = (data.get('statuscall') ?? '').toLowerCase();
  const clientPhone = data.get('userdata') ?? '';
  const callId      = data.get('ID') ?? '';
  const src         = data.get('src') ?? '';
  const dst         = data.get('dst') ?? '';

  console.log(`[netelip-control] evento — statuscall: ${statuscall} | callId: ${callId} | src: ${src} | dst: ${dst} | clientPhone: ${clientPhone}`);

  // ── Comercial descuelga → conectar con el cliente ──────────────
  if (statuscall === 'answer') {
    if (!clientPhone) {
      console.error('[netelip-control] answer recibido pero userdata (clientPhone) vacío');
      return NextResponse.json({ command: 'hangup' });
    }

    const dialNumber = toDialFormat(clientPhone);

    console.log(`[netelip-control] ✅ Comercial descolgó — Bridging a cliente: ${dialNumber}`);

    // El CallerID que ve el cliente es el 917105000 (src del lanzador era el teléfono
    // del cliente para que el comercial lo viera; ahora Netelip usa el número de la
    // centralita como origen hacia el cliente de forma automática).
    return NextResponse.json({
      command: 'dial',
      options: `pstn,${dialNumber},30,called,300`,
    });
  }

  // ── Comercial no descuelga / ocupado / cancelado ───────────────
  // El cliente NO ha recibido ninguna llamada. El lead ya está en HubSpot
  // desde el submit del formulario. Solo se loguea para trazabilidad.
  if (statuscall === 'noanswer' || statuscall === 'no answer' ||
      statuscall === 'busy'     || statuscall === 'cancel'    ||
      statuscall === 'chanunavail') {

    console.warn(`[netelip-control] ⚠️ Comercial NO contestó (${statuscall}) — clientPhone: ${clientPhone} — El lead ya está en HubSpot, pendiente de seguimiento manual.`);

    // Opcional: aquí podrías añadir una nota en HubSpot vía API indicando
    // "Llamada automática no atendida" para que el comercial tenga contexto.
    // Por ahora se deja como mejora futura y se loguea en Vercel.

    return NextResponse.json({ command: 'hangup' });
  }

  // ── Cualquier otro estado (CHANUNAVAIL, error, etc.) ──────────
  console.warn(`[netelip-control] Estado inesperado: ${statuscall}`);
  return NextResponse.json({ command: 'hangup' });
}

// Netelip puede hacer una petición GET de validación al guardar la URL
export async function GET() {
  return NextResponse.json({ ok: true, service: 'netelip-control' });
}
