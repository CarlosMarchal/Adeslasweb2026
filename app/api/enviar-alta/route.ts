import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ================================================================
// API Route: POST /api/enviar-alta
// Recibe los datos del formulario y envía un email via Gmail SMTP.
//
// Variables de entorno requeridas en .env.local:
//   GMAIL_USER          → adeslas@numero1salud.es
//   GMAIL_APP_PASSWORD  → Contraseña de aplicación de Google (16 chars)
//   EMAIL_DESTINO       → adeslas@numero1salud.es (donde llegan los formularios)
// ================================================================

export async function POST(req: NextRequest) {
  try {
    const { subject, html, fromName, replyTo } = await req.json() as {
      subject: string;
      html: string;
      fromName: string;
      replyTo: string;
    };

    // Validación básica
    if (!subject || !html) {
      return NextResponse.json({ error: 'Faltan datos obligatorios.' }, { status: 400 });
    }

    // Configuración del transporte SMTP de Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // App Password de Google (no la contraseña normal)
      },
    });

    // Verificar conexión SMTP
    await transporter.verify();

    // Enviar email
    await transporter.sendMail({
      from: `"Formulario Adeslas" <${process.env.GMAIL_USER}>`,
      to: process.env.EMAIL_DESTINO ?? 'adeslas@numero1salud.es',
      replyTo: replyTo ?? undefined,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[enviar-alta] Error al enviar email:', err);
    return NextResponse.json(
      { error: 'Error interno al enviar el correo. Comprueba la configuración SMTP.' },
      { status: 500 },
    );
  }
}
