import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ================================================================
// API Route: POST /api/enviar-alta-renfe-adif
// Alta Adeslas del colectivo Renfe / Adif. Mismo SMTP que
// /api/enviar-alta, pero con destino propio.
//
// Variables de entorno:
//   GMAIL_USER                  → cuenta remitente (la misma que el formulario general)
//   GMAIL_APP_PASSWORD          → contraseña de aplicación de Google
//   EMAIL_DESTINO_RENFE_ADIF    → opcional; por defecto adeslas.adif-renfe@numero1salud.es
// ================================================================

const DESTINO_POR_DEFECTO = 'adeslas.adif-renfe@numero1salud.es';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { subject?: string; html?: string; replyTo?: string };
    const subject = body.subject ?? '';
    const html    = body.html ?? '';
    const replyTo = body.replyTo ?? '';

    if (!subject || !html) {
      return NextResponse.json({ error: 'Faltan datos obligatorios.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Formulario Adeslas Renfe/Adif" <${process.env.GMAIL_USER}>`,
      to: process.env.EMAIL_DESTINO_RENFE_ADIF || DESTINO_POR_DEFECTO,
      replyTo: replyTo || undefined,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[enviar-alta-renfe-adif] Error al enviar email:', err);
    return NextResponse.json(
      { error: 'Error interno al enviar el correo. Comprueba la configuración SMTP.' },
      { status: 500 },
    );
  }
}
