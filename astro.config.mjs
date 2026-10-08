// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // Dominio de producción. Lo usan el sitemap y las URLs canónicas del <head>.
  site: "https://portafolio-personal-phi-black.vercel.app",

  // Oculta la barra de herramientas de Astro que aparece en `astro dev`.
  devToolbar: { enabled: false },

  // Variables del formulario de contacto: solo servidor, nunca llegan al cliente.
  env: {
    schema: {
      BREVO_API_KEY: envField.string({ context: "server", access: "secret" }),
      CONTACT_FROM_EMAIL: envField.string({
        context: "server",
        access: "secret",
      }),
      CONTACT_TO_EMAIL: envField.string({
        context: "server",
        access: "secret",
      }),
    },
    // Falla el build si falta alguna: mejor un deploy rojo que un formulario roto.
    validateSecrets: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // El sitio es estático; solo /api/contacto corre como función serverless.
  adapter: vercel(),

  // Español en la raíz, inglés bajo /en/. Sin redirección automática por idioma
  // del navegador: cada URL sirve siempre el mismo idioma.
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: { es: "es-ES", en: "en-US" },
      },
    }),
  ],
});
