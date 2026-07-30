// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: cambiar por la URL real de Vercel. La necesitan el sitemap
  // y las URLs canónicas del <head>.
  site: 'https://ejemplo.vercel.app',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});