// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Dominio de producción. Lo usan el sitemap y las URLs canónicas del <head>.
  site: 'https://portafolio-personal-phi-black.vercel.app',

  vite: {
    plugins: [tailwindcss()]
  },

  // El sitio es estático; solo /api/contacto corre como función serverless.
  adapter: vercel(),

  integrations: [sitemap()]
});