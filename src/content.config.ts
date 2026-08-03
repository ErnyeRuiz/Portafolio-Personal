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
      galeria: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            // Solo si una captura puntual necesita otro marco que el del
            // proyecto (ej. capturas móviles dentro de un proyecto "web").
            tipo: z.enum(["web", "movil"]).optional(),
          }),
        )
        .default([]),
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

// Un archivo por proyecto, con el mismo id que su contraparte en
// `proyectos` (ej. "camping-place"), para poder cruzarlos en [id].astro.
const backend = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/backend" }),
  schema: z.object({
    arquitectura: z.string(), // ej. "Clean Architecture + CQRS"
    stack: z.array(z.string()),
    repo: z.string().url().optional(), // si vive en un repo aparte del frontend
  }),
});

export const collections = { proyectos, backend };
