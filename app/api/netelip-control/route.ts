import { NextRequest, NextResponse } from 'next/server';

// ================================================================
// API Route: POST /api/netelip-control
//
// URL de control de llamadas salientes de Netelip API Voice.
// Netelip llama a este endpoint tras cada evento de la llamada que
// se lanzó desde /api/netelip-bridge.
//
// Flujo:
//   1. Netelip llama al comercial (extensión SIP o móvil PSTN)
//   2a. Comercial SIP descuelga  → statuscall=''     + userdata relleno → dial cliente
//   2b. Comercial PSTN descuelga → statuscall=answer + userdata relleno → dial cliente
//   3.  Cliente contesta tras bridge → statuscall=answer + userdata vacío → hangup control
//   4.  Nadie descuelga          → statuscall=noanswer → hangup
//       (el cliente NO recibe ninguna llamada en el caso 4)
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
  // Netelip envía multipart/form-data — usamos formData() nativo de Next.js
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch (e) {
    console.error('[netelip-control] Error parseando formData:', e);
    return NextResponse.json({ command: 'hangup' });
  }

  const statuscall  = ((formData.get('statuscall') as string) ?? '').toLowerCase();
  const clientPhone = (formData.get('userdata')    as string) ?? '';
  const callId      = (formData.get('ID')          as string) ?? '';
  const src         = (formData.get('src')         as string) ?? '';
  const dst         = (formData.get('dst')         as string) ?? '';

  console.log(`[netelip-control] evento — statuscall: "${statuscall}" | callId: ${callId} | src: ${src} | dst: ${dst} | clientPhone: ${clientPhone}`);

  // ── CALLBACK 1a: Comercial SIP (Zoiper) descuelga ─────────────
  // Para typedst=extension: el primer callback no lleva statuscall
  // pero sí lleva userdata con el teléfono del cliente.
  if (!statuscall && clientPhone) {
    const dialNumber = toDialFormat(clientPhone);
    console.log(`[netelip-control] ✅ Comercial (SIP) descolgó — Bridging a cliente: ${dialNumber}`);
    return NextResponse.json({
      command: 'dial',
      options: `pstn,${dialNumber},30,called,300`,
    });
  }

  // ── CALLBACK 1b: Comercial PSTN (móvil) descuelga ─────────────
  // Para typedst=pstn: Netelip envía statuscall=answer cuando el comercial
  // descuelga su móvil. El userdata relleno distingue este caso del
  // callback de "cliente contestó tras bridge" (que llega sin userdata).
  if (statuscall === 'answer' && clientPhone) {
    const dialNumber = toDialFormat(clientPhone);
    console.log(`[netelip-control] ✅ Comercial (PSTN) descolgó — Bridging a cliente: ${dialNumber}`);
    return NextResponse.json({
      command: 'dial',
      options: `pstn,${dialNumber},30,called,300`,
    });
  }

  // ── CALLBACK 2a: Cliente ha contestado (resultado del dial) ────
  // statuscall=answer SIN userdata: el bridge se completó correctamente.
  if (statuscall === 'answer' && !clientPhone) {
    console.log(`[netelip-control] ✅ Cliente contestó — llamada bridgeada correctamente`);
    return NextResponse.json({ command: 'hangup' });
  }

  // ── CALLBACK 2b: Cliente NO contestó (resultado del dial) ──────
  if (statuscall === 'noanswer' || statuscall === 'no answer' ||
      statuscall === 'busy'     || statuscall === 'cancel'    ||
      statuscall === 'chanunavail') {
    console.warn(`[netelip-control] ⚠️ Cliente NO contestó tras bridge (${statuscall})`);
    return NextResponse.json({ command: 'hangup' });
  }

  // ── CALLBACK intermedio vacío (Netelip polling mientras ejecuta dial) ──
  // Netelip llama al control URL mientras el dial está en progreso.
  // NO responder con hangup — dejar que el dial continúe.
  if (!statuscall && !clientPhone) {
    console.log('[netelip-control] Callback intermedio vacío — ignorando (dial en progreso)');
    return new Response('', { status: 200 });
  }

  // ── Cualquier otro estado no reconocido ────────────────────────
  console.warn(`[netelip-control] Estado no reconocido: "${statuscall}" | clientPhone: "${clientPhone}"`);
  return new Response('', { status: 200 });
}

// Netelip puede hacer una petición GET de validación al guardar la URL
export async function GET() {
  return NextResponse.json({ ok: true, service: 'netelip-control' });
}
