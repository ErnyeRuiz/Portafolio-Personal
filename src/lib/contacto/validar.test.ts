import { describe, expect, it } from "vitest";

import { MAX_EMAIL, MAX_MENSAJE, MAX_NOMBRE, validarContacto } from "./validar";

const valido = {
  nombre: "Ana Pérez",
  email: "ana@correo.com",
  mensaje: "Hola, me interesa tu trabajo.",
};

describe("validarContacto", () => {
  it("acepta un mensaje válido y recorta los espacios", () => {
    const r = validarContacto({
      nombre: "  Ana Pérez ",
      email: " ana@correo.com ",
      mensaje: " Hola ",
    });
    expect(r).toEqual({
      ok: true,
      valor: { nombre: "Ana Pérez", email: "ana@correo.com", mensaje: "Hola" },
    });
  });

  it.each([null, undefined, "texto", 42])(
    "rechaza una entrada que no es objeto (%s)",
    (entrada) => {
      expect(validarContacto(entrada)).toMatchObject({ ok: false });
    },
  );

  it.each(["nombre", "email", "mensaje"])(
    "rechaza el campo %s vacío",
    (campo) => {
      for (const vacio of ["", "   ", undefined]) {
        const r = validarContacto({ ...valido, [campo]: vacio });
        expect(r).toEqual({ ok: false, error: "campos_incompletos" });
      }
    },
  );

  it.each([
    ["nombre", MAX_NOMBRE],
    ["mensaje", MAX_MENSAJE],
  ])("acepta el largo máximo de %s y rechaza uno más", (campo, max) => {
    expect(
      validarContacto({ ...valido, [campo]: "a".repeat(max) }),
    ).toMatchObject({ ok: true });
    expect(
      validarContacto({ ...valido, [campo]: "a".repeat(max + 1) }),
    ).toEqual({
      ok: false,
      error: "mensaje_largo",
    });
  });

  it("limita el largo del email a 254 caracteres", () => {
    const local = "a".repeat(MAX_EMAIL - "@x.co".length);
    expect(
      validarContacto({ ...valido, email: `${local}@x.co` }),
    ).toMatchObject({ ok: true });
    expect(validarContacto({ ...valido, email: `a${local}@x.co` })).toEqual({
      ok: false,
      error: "mensaje_largo",
    });
  });

  it.each(["sin-arroba", "a@b", "a b@c.com", "@c.com", "a@.com "])(
    "rechaza el email inválido %j",
    (email) => {
      expect(validarContacto({ ...valido, email })).toEqual({
        ok: false,
        error: "email_invalido",
      });
    },
  );

  it("marca como spam cuando el honeypot viene lleno", () => {
    expect(validarContacto({ ...valido, hp_campo: "soy un bot" })).toEqual({
      ok: false,
      error: "solicitud_invalida",
      spam: true,
    });
  });

  it("ignora un honeypot vacío", () => {
    expect(validarContacto({ ...valido, hp_campo: "  " })).toMatchObject({
      ok: true,
    });
  });
});
