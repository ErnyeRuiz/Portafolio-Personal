import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const proyectos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/proyectos" }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      resumen: z.string().max(160), // se muestra en la tarjeta
      tipo: z.enum(["web", "movil"]), // decide el marco: navegador o teléfono
      portada: image(),
      galeria: z.array(image()).default([]),
      stack: z.array(z.string()),
      rol: z.string().optional(),
      fecha: z.coerce.date(),
      destacado: z.boolean().default(false),
      repo: z.string().url().optional(),
      demo: z.string().url().optional(), // solo web
      apk: z.string().url().optional(), // solo móvil
      video: z.string().url().optional(), // solo móvil
      draft: z.boolean().default(false),
    }),
});

export const collections = { proyectos };
