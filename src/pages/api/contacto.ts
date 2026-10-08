import type { APIRoute } from "astro";
import {
  BREVO_API_KEY,
  CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL,
} from "astro:env/server";

import { enviarConBrevo } from "../../lib/contacto/brevo";
import { validarContacto } from "../../lib/contacto/validar";

export const prerender = false;

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// Solo acepta envíos hechos desde el propio sitio (producción, preview o dev).
const origenPermitido = (request: Request, site: URL | undefined) => {
  const origen = request.headers.get("origin");
  if (!origen) return false;
  return origen === new URL(request.url).origin || origen === site?.origin;
};

export const POST: APIRoute = async ({ request, site }) => {
  if (!origenPermitido(request, site)) {
    return json({ ok: false, error: "origen_no_permitido" }, 403);
  }

  let datos: unknown;
  try {
    datos = await request.json();
  } catch {
    return json({ ok: false, error: "solicitud_invalida" }, 400);
  }

  const validado = validarContacto(datos);
  if (!validado.ok) {
    // El honeypot responde como si hubiera funcionado.
    return validado.spam
      ? json({ ok: true })
      : json({ ok: false, error: validado.error }, 400);
  }

  const envio = await enviarConBrevo(validado.valor, {
    apiKey: BREVO_API_KEY,
    remitente: CONTACT_FROM_EMAIL,
    destino: CONTACT_TO_EMAIL,
  });
  return envio.ok
    ? json({ ok: true })
    : json({ ok: false, error: envio.error }, 502);
};
