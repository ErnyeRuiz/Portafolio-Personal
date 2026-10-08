export const MAX_NOMBRE = 100;
export const MAX_EMAIL = 254;
export const MAX_MENSAJE = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface MensajeContacto {
  nombre: string;
  email: string;
  mensaje: string;
}

/** Códigos de error de la API; el cliente los traduce según el idioma. */
export type CodigoError =
  | "solicitud_invalida"
  | "campos_incompletos"
  | "mensaje_largo"
  | "email_invalido"
  | "origen_no_permitido"
  | "envio_fallido";

/** `spam` marca el honeypot: se descarta sin avisar al bot. */
export type Resultado<T> =
  { ok: true; valor: T } | { ok: false; error: CodigoError; spam?: boolean };

const texto = (valor: unknown) => String(valor ?? "").trim();

export function validarContacto(input: unknown): Resultado<MensajeContacto> {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "solicitud_invalida" };
  }
  const datos = input as Record<string, unknown>;

  // Honeypot: los bots lo llenan, las personas no lo ven.
  if (typeof datos.hp_campo === "string" && datos.hp_campo.trim() !== "") {
    return { ok: false, error: "solicitud_invalida", spam: true };
  }

  const nombre = texto(datos.nombre);
  const email = texto(datos.email);
  const mensaje = texto(datos.mensaje);

  if (!nombre || !email || !mensaje) {
    return { ok: false, error: "campos_incompletos" };
  }
  if (
    nombre.length > MAX_NOMBRE ||
    email.length > MAX_EMAIL ||
    mensaje.length > MAX_MENSAJE
  ) {
    return { ok: false, error: "mensaje_largo" };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "email_invalido" };
  }

  return { ok: true, valor: { nombre, email, mensaje } };
}
