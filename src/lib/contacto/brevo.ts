import type { MensajeContacto, Resultado } from "./validar";

export interface ConfigBrevo {
  apiKey: string;
  remitente: string;
  destino: string;
}

const TIMEOUT_MS = 8000;

export const escapar = (texto: string) =>
  texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function enviarConBrevo(
  { nombre, email, mensaje }: MensajeContacto,
  { apiKey, remitente, destino }: ConfigBrevo,
): Promise<Resultado<null>> {
  try {
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
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!respuesta.ok) {
      console.error("Contacto: Brevo respondió", respuesta.status);
      return { ok: false, error: "envio_fallido" };
    }
    return { ok: true, valor: null };
  } catch (error) {
    console.error("Contacto: falló la llamada a Brevo", error);
    return { ok: false, error: "envio_fallido" };
  }
}
