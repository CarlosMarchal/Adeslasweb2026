// TEMPORALMENTE PARALIZADO — pendiente de diagnóstico error Vercel EEXIST
// Código original preservado en git. Restaurar cuando se resuelva el conflicto de build.
import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ command: 'hangup' }, { status: 503 });
}

export async function GET() {
  return NextResponse.json({ ok: false, reason: 'service_paused' }, { status: 503 });
}
