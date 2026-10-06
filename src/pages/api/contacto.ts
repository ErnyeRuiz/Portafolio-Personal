import type { APIRoute } from "astro";

export const prerender = false;

const MAX_NOMBRE = 100;
const MAX_MENSAJE = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const escapar = (texto: string) =>
  texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.BREVO_API_KEY;
  const remitente = import.meta.env.CONTACT_FROM_EMAIL;
  const destino = import.meta.env.CONTACT_TO_EMAIL;

  if (!apiKey || !remitente || !destino) {
    console.error("Contacto: faltan variables de entorno.");
    return json({ ok: false, error: "No se pudo enviar el mensaje." }, 500);
  }

  let datos: Record<string, unknown>;
  try {
    datos = await request.json();
  } catch {
    return json({ ok: false, error: "Solicitud inválida." }, 400);
  }

  // Honeypot: los bots lo llenan, las personas no lo ven.
  if (typeof datos.website === "string" && datos.website.trim() !== "") {
    return json({ ok: true });
  }

  const nombre = String(datos.nombre ?? "").trim();
  const email = String(datos.email ?? "").trim();
  const mensaje = String(datos.mensaje ?? "").trim();

  if (!nombre || !email || !mensaje) {
    return json({ ok: false, error: "Completa todos los campos." }, 400);
  }
  if (nombre.length > MAX_NOMBRE || mensaje.length > MAX_MENSAJE) {
    return json({ ok: false, error: "El mensaje es demasiado largo." }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: "El correo no es válido." }, 400);
  }

  const respuesta = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Portafolio", email: remitente },
      to: [{ email: destino }],
      replyTo: { name: nombre, email },
      subject: `Mensaje desde el portafolio — ${nombre}`,
      htmlContent: `<p><strong>${escapar(nombre)}</strong> (${escapar(email)})</p><p>${escapar(mensaje).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!respuesta.ok) {
    console.error("Contacto: Brevo respondió", respuesta.status);
    return json({ ok: false, error: "No se pudo enviar el mensaje." }, 502);
  }

  return json({ ok: true });
};
