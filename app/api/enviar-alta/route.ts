import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ================================================================
// API Route: POST /api/enviar-alta
// Recibe los datos del formulario y envía un email via Gmail SMTP.
// Acepta:
//   - multipart/form-data → campos + documentación adjunta
//     (tarjeta_sanitaria[], recibo_bancario) que se reenvía como
//     adjuntos del email
//   - application/json    → solo campos (retrocompatible)
//
// Variables de entorno requeridas en .env.local:
//   GMAIL_USER          → adeslas@numero1salud.es
//   GMAIL_APP_PASSWORD  → Contraseña de aplicación de Google (16 chars)
//   EMAIL_DESTINO       → adeslas@numero1salud.es (donde llegan los formularios)
// ================================================================

// Límites de adjuntos (Vercel limita el body a ~4,5 MB)
const MAX_FILE_BYTES = 3 * 1024 * 1024;   // 3 MB por archivo
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;  // 4 MB en total
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf'];

interface Adjunto {
  filename: string;
  content: Buffer;
  contentType?: string;
}

/** Nombre descriptivo para el adjunto conservando la extensión original */
const nombreAdjunto = (prefijo: string, original: string, idx: number, total: number): string => {
  const ext = original.includes('.') ? original.slice(original.lastIndexOf('.')) : '';
  const sufijo = total > 1 ? `-${idx + 1}` : '';
  return `${prefijo}${sufijo}${ext}`;
};

export async function POST(req: NextRequest) {
  try {
    let subject = '';
    let html = '';
    let replyTo = '';
    const attachments: Adjunto[] = [];

    const contentType = req.headers.get('content-type') ?? '';

    if (contentType.includes('multipart/form-data')) {
      const fd = await req.formData();
      subject = (fd.get('subject') as string) ?? '';
      html    = (fd.get('html') as string) ?? '';
      replyTo = (fd.get('replyTo') as string) ?? '';

      const tarjetas = fd.getAll('tarjeta_sanitaria').filter((v): v is File => v instanceof File && v.size > 0);
      const recibos  = fd.getAll('recibo_bancario').filter((v): v is File => v instanceof File && v.size > 0);

      let totalBytes = 0;
      const procesar = async (files: File[], prefijo: string) => {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.size > MAX_FILE_BYTES) {
            throw new RespuestaError(`El archivo "${file.name}" supera el tamaño máximo permitido (3 MB).`);
          }
          if (file.type && !ALLOWED_MIME.includes(file.type)) {
            throw new RespuestaError(`Formato no permitido para "${file.name}". Usa JPG, PNG, WEBP, HEIC o PDF.`);
          }
          totalBytes += file.size;
          if (totalBytes > MAX_TOTAL_BYTES) {
            throw new RespuestaError('El conjunto de archivos adjuntos supera el tamaño máximo permitido (4 MB).');
          }
          attachments.push({
            filename: nombreAdjunto(prefijo, file.name, i, files.length),
            content: Buffer.from(await file.arrayBuffer()),
            contentType: file.type || undefined,
          });
        }
      };

      await procesar(tarjetas, 'Tarjeta-sanitaria');
      await procesar(recibos, 'Recibo-bancario-ultimo-pago');
    } else {
      // Retrocompatibilidad: cuerpo JSON sin adjuntos
      const body = await req.json() as { subject?: string; html?: string; replyTo?: string };
      subject = body.subject ?? '';
      html    = body.html ?? '';
      replyTo = body.replyTo ?? '';
    }

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

    // Enviar email (con la documentación adjunta si la hay)
    await transporter.sendMail({
      from: `"Formulario Adeslas" <${process.env.GMAIL_USER}>`,
      to: process.env.EMAIL_DESTINO ?? 'adeslas@numero1salud.es',
      replyTo: replyTo || undefined,
      subject,
      html,
      attachments: attachments.length ? attachments : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof RespuestaError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error('[enviar-alta] Error al enviar email:', err);
    return NextResponse.json(
      { error: 'Error interno al enviar el correo. Comprueba la configuración SMTP.' },
      { status: 500 },
    );
  }
}

/** Error de validación que se devuelve al cliente con status 400 */
class RespuestaError extends Error {}
