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
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // El sitio es estático; solo /api/contacto corre como función serverless.
  adapter: vercel(),

  integrations: [sitemap()],
});
