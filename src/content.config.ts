import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Cada idioma vive en su carpeta. `es` trae los datos completos; `en` solo lo
// traducible (ver `proyectosEn` y `backendEn`). Los ids son iguales en ambos
// (ej. "camping-place"). `src/lib/proyectos.ts` los une y valida la paridad.
const proyectos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/proyectos/es" }),
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
      apk: z
        .object({
          url: z.string().url(),
          tamano: z.string().optional(), // ej. "75 MB"
          version: z.string().optional(), // ej. "1.0.0"
        })
        .optional(), // solo móvil
      video: z.string().url().optional(), // solo móvil
      draft: z.boolean().default(false),
    }),
});

// Solo los campos traducibles de un proyecto. `galeriaAlt` va en el mismo
// orden que `galeria` del archivo en español.
const proyectosEn = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/proyectos/en" }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string().max(160),
    rol: z.string().optional(),
    galeriaAlt: z.array(z.string()).default([]),
  }),
});

// Un archivo por proyecto, con el mismo id que su contraparte en
// `proyectos` (ej. "camping-place"), para poder cruzarlos en la página.
const backend = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/backend/es" }),
  schema: z.object({
    arquitectura: z.string(), // ej. "Clean Architecture + CQRS"
    stack: z.array(z.string()),
    repo: z.string().url().optional(), // si vive en un repo aparte del frontend
  }),
});

const backendEn = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/backend/en" }),
  schema: z.object({
    arquitectura: z.string().optional(), // si falta, se usa la del español
  }),
});

export const collections = { proyectos, proyectosEn, backend, backendEn };
