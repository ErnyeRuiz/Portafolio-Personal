import { getRelativeLocaleUrl } from "astro:i18n";

import { ui, type ClaveUi, type Lang } from "./ui";

export const IDIOMAS = Object.keys(ui) as Lang[];
/** Debe coincidir con `i18n.defaultLocale` de astro.config.mjs. */
export const IDIOMA_BASE: Lang = "es";

/** Valor de `og:locale` por idioma. */
export const LOCALE_OG: Record<Lang, string> = {
  es: "es_ES",
  en: "en_US",
};

/** Idioma de la página a partir de `Astro.currentLocale`. */
export function obtenerLang(locale: string | undefined): Lang {
  return IDIOMAS.find((l) => l === locale) ?? IDIOMA_BASE;
}

export function otroIdioma(lang: Lang): Lang {
  return IDIOMAS.find((l) => l !== lang) ?? IDIOMA_BASE;
}

/** `t("clave", { nombre: "valor" })` reemplaza cada `{nombre}` del texto. */
export function useTranslations(lang: Lang) {
  return (clave: ClaveUi, valores?: Record<string, string | number>) => {
    const texto: string = ui[lang][clave];
    if (!valores) return texto;
    return texto.replace(/\{(\w+)\}/g, (previo, nombre: string) =>
      nombre in valores ? String(valores[nombre]) : previo,
    );
  };
}

/** URL relativa de `ruta` (sin prefijo de idioma, ej. "proyectos/x") en `lang`. */
export function rutaLocal(lang: Lang, ruta = "") {
  return getRelativeLocaleUrl(lang, ruta);
}

/** Quita el prefijo de idioma de un pathname: "/en/proyectos/x" -> "proyectos/x". */
export function rutaSinIdioma(pathname: string) {
  const segmentos = pathname.split("/").filter(Boolean);
  const primero = segmentos[0] as Lang | undefined;
  if (primero && primero !== IDIOMA_BASE && IDIOMAS.includes(primero)) {
    segmentos.shift();
  }
  return segmentos.join("/");
}
