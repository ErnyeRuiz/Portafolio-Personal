import { getCollection, getEntry, type CollectionEntry } from "astro:content";

import { IDIOMA_BASE } from "../i18n/utils";
import type { Lang } from "../i18n/ui";

/* Une el contenido en español (datos completos) con su traducción (solo los
   campos traducibles). Si falta una traducción o no cuadra, el build falla:
   mejor eso que publicar texto en español dentro de la versión en inglés. */

type ProyectoBase = CollectionEntry<"proyectos">;
type BackendBase = CollectionEntry<"backend">;

export interface Proyecto {
  id: string;
  /** Datos del español con los campos traducibles ya sustituidos. */
  data: ProyectoBase["data"];
  /** Entrada cuyo cuerpo markdown se renderiza (la del idioma pedido). */
  entry: ProyectoBase | CollectionEntry<"proyectosEn">;
}

export interface Backend {
  data: BackendBase["data"];
  entry: BackendBase | CollectionEntry<"backendEn">;
}

export async function obtenerProyectos(lang: Lang): Promise<Proyecto[]> {
  const todos = await getCollection("proyectos");
  const publicados = todos
    .filter(({ data }) => !data.draft)
    .sort((a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf());

  if (lang === IDIOMA_BASE) {
    return publicados.map((entry) => ({
      id: entry.id,
      data: entry.data,
      entry,
    }));
  }

  const traducciones = new Map(
    (await getCollection("proyectosEn")).map((entry) => [entry.id, entry]),
  );
  const ids = new Set(todos.map(({ id }) => id));
  for (const id of traducciones.keys()) {
    if (!ids.has(id)) {
      throw new Error(
        `proyectos/en/${id}.md no tiene su original en proyectos/es.`,
      );
    }
  }

  return publicados.map((base) => {
    const traduccion = traducciones.get(base.id);
    if (!traduccion) {
      throw new Error(`Falta la traducción proyectos/en/${base.id}.md.`);
    }
    const { galeria } = base.data;
    const { galeriaAlt, titulo, resumen, rol } = traduccion.data;
    if (galeriaAlt.length !== galeria.length) {
      throw new Error(
        `proyectos/en/${base.id}.md: galeriaAlt tiene ${galeriaAlt.length} textos y la galería ${galeria.length} capturas.`,
      );
    }
    return {
      id: base.id,
      entry: traduccion,
      data: {
        ...base.data,
        titulo,
        resumen,
        rol: rol ?? base.data.rol,
        galeria: galeria.map((captura, i) => ({
          ...captura,
          alt: galeriaAlt[i],
        })),
      },
    };
  });
}

/** Backend del proyecto; `undefined` si el proyecto no tiene sección de backend. */
export async function obtenerBackend(
  id: string,
  lang: Lang,
): Promise<Backend | undefined> {
  const base = await getEntry("backend", id);
  if (!base) return undefined;
  if (lang === IDIOMA_BASE) return { data: base.data, entry: base };

  const traduccion = await getEntry("backendEn", id);
  if (!traduccion) {
    throw new Error(`Falta la traducción backend/en/${id}.md.`);
  }
  return {
    entry: traduccion,
    data: {
      ...base.data,
      arquitectura: traduccion.data.arquitectura ?? base.data.arquitectura,
    },
  };
}

/** `getStaticPaths` compartido por las páginas de proyecto de cada idioma. */
export async function rutasProyectos(lang: Lang) {
  const proyectos = await obtenerProyectos(lang);
  return proyectos.map((proyecto) => ({
    params: { id: proyecto.id },
    props: { proyecto },
  }));
}
