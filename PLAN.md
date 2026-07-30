# Plan — Portafolio personal

> Documento de arranque. Decisiones cerradas + pasos concretos para la siguiente sesión.
> Fecha: 2026-07-30

---

## 1. Decisiones cerradas

| Decisión | Elegido |
|---|---|
| Estilo visual | Dark con glow (referencia: `cursos.devtalles.com`) |
| Paleta | Cyan sobre azul noche (identidad propia, no la de DevTalles) |
| Stack | Astro 7 + Tailwind 4 + TypeScript |
| Contenido | Archivos Markdown con Content Collections |
| Deploy | Vercel (salida estática, sin adapter) |
| Secciones | Hero + grid de proyectos · Detalle por proyecto · Sobre mí + stack · Contacto |

### Proyectos a publicar

| # | Proyecto | Tipo | Stack |
|---|---|---|---|
| 1 | **CampingPlace** | Web | Angular 21 |
| 2 | **BarberAdmin** | Móvil (Android) | Flutter |

Son **dos**, y eso condiciona el diseño (ver §7). El sistema queda preparado para crecer: agregar un tercero será crear un `.md` y nada más.

### Referencia visual analizada

Del CSS real de DevTalles se tomó el **lenguaje**, no la marca:

- Fondo oscuro plano con **elipses radiales de baja opacidad** detrás del contenido (esto es lo que produce el resplandor).
- Tarjetas semi-transparentes sobre ese resplandor, esquinas de `18px`.
- Botones tipo píldora (`border-radius: 50px`).
- Degradados lineales a `135deg` en botones y bordes de tarjeta.
- Dos tipografías: una geométrica para títulos, una neutra para texto.

---

## 2. Prerrequisitos

Ya verificados en la máquina:

- Node `v22.17.0` ✔ (Astro 7 pide ≥ 18.20)
- npm `10.9.2` ✔
- git `2.50.0` ✔

Falta:

- [ ] Cuenta de GitHub con repo vacío creado para el portafolio
- [ ] Cuenta de Vercel vinculada a ese GitHub
- [ ] Extensión **Astro** de VS Code (`astro-build.astro-vscode`) — da resaltado y autocompletado en `.astro`

---

## 3. Crear el proyecto

> Nota: el scaffolder pide directorio vacío. Si se queja por este `PLAN.md`, moverlo un momento a `C:\Portafolio\` y devolverlo después.

```bash
# 1. Scaffold — plantilla mínima, TypeScript estricto, con git e instalación
npm create astro@latest . -- --template minimal --typescript strict --install --git

# 2. Tailwind 4 (configura solo el plugin de Vite y global.css)
npx astro add tailwind

# 3. Integraciones útiles
npx astro add sitemap

# 4. Tipografías auto-hospedadas (sin llamadas a Google en producción)
npm i @fontsource-variable/space-grotesk @fontsource-variable/dm-sans

# 5. Levantar
npm run dev
```

**Importante:** no instalar `@astrojs/tailwind` — está descontinuado. Desde Astro 5.2 Tailwind entra por el plugin de Vite `@tailwindcss/vite`, que es lo que `astro add tailwind` configura.

**Tampoco** instalar `@astrojs/vercel`: ese adapter es solo para render en servidor. El sitio es estático, y Vercel detecta y sirve Astro estático sin configuración.

---

## 4. Estructura de carpetas

```
C:\Portafolio\Home\
├─ src\
│  ├─ content\
│  │  └─ proyectos\
│  │     ├─ camping-place.md
│  │     └─ barber-admin.md
│  ├─ content.config.ts        ← esquema y validación de los proyectos
│  ├─ layouts\
│  │  └─ BaseLayout.astro      ← <head>, meta/SEO, fondo con glow, header, footer
│  ├─ components\
│  │  ├─ Header.astro
│  │  ├─ Hero.astro
│  │  ├─ GlowBackground.astro  ← las elipses radiales
│  │  ├─ ProjectCard.astro
│  │  ├─ ProjectGrid.astro
│  │  ├─ DeviceFrame.astro     ← marco de navegador o de teléfono según el tipo
│  │  ├─ StackRow.astro        ← logos de tecnologías
│  │  ├─ About.astro
│  │  ├─ Contact.astro
│  │  └─ Footer.astro
│  ├─ pages\
│  │  ├─ index.astro           ← hero + grid + sobre mí + contacto
│  │  └─ proyectos\
│  │     └─ [id].astro         ← detalle de cada proyecto
│  │                             (un index.astro con listado completo NO hace falta
│  │                              con 2 proyectos; se agrega cuando haya ~6)
│  ├─ styles\
│  │  └─ global.css            ← tokens de diseño
│  └─ assets\
│     └─ proyectos\            ← capturas (Astro las optimiza al construir)
├─ public\                     ← favicon, CV en PDF, og-image
└─ astro.config.mjs
```

Regla: **imágenes de proyectos en `src/assets/`**, no en `public/`. Solo desde `src/` Astro las optimiza, convierte a WebP y genera los tamaños responsivos.

---

## 5. Sistema de diseño

`src/styles/global.css` — en Tailwind 4 los tokens se declaran con `@theme` y generan utilidades automáticamente (`bg-surface`, `text-accent`, `font-display`, `rounded-card`).

```css
@import "tailwindcss";

@theme {
  /* Superficies */
  --color-bg:           #0A0F1E;  /* azul noche */
  --color-surface:      #111827;  /* tarjetas */
  --color-border:       #1F2A3D;

  /* Acentos */
  --color-accent:       #0EA5E9;  /* cyan eléctrico */
  --color-accent-deep:  #0284C7;
  --color-accent-soft:  #A5F3FC;
  --color-pop:          #F472B6;  /* rosa, uso muy puntual */

  /* Texto */
  --color-ink:          #E6EDF7;
  --color-ink-muted:    #8FA3BF;

  /* Tipografía */
  --font-display: "Space Grotesk Variable", sans-serif;
  --font-sans:    "DM Sans Variable", sans-serif;

  /* Formas */
  --radius-card: 18px;
  --radius-pill: 50px;
}

/* El glow: elipses grandes de baja opacidad detrás de todo */
.glow-field {
  background:
    radial-gradient(ellipse 55% 65% at 75% 40%, color-mix(in oklab, var(--color-accent) 30%, transparent), transparent 70%),
    radial-gradient(ellipse 40% 60% at 10% 100%, color-mix(in oklab, var(--color-accent-deep) 20%, transparent), transparent 70%);
}

/* Borde con degradado, como las tarjetas de la referencia */
.card-gradient-border {
  background:
    linear-gradient(var(--color-surface), var(--color-surface)) padding-box,
    linear-gradient(135deg, var(--color-accent), transparent 60%) border-box;
  border: 1px solid transparent;
}
```

Las fuentes se importan una sola vez en `BaseLayout.astro`:

```astro
---
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/dm-sans";
import "../styles/global.css";
---
```

**Jerarquía:** Space Grotesk solo para títulos y números; DM Sans para todo lo demás. Mezclar más de dos fuentes es el error más común y el más visible.

---

## 6. Modelo de contenido

`src/content.config.ts` — el esquema valida en tiempo de build: si a un proyecto le falta un campo, `npm run build` falla con un mensaje claro en vez de romper la página.

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: ({ image }) => z.object({
    titulo:     z.string(),
    resumen:    z.string().max(160),          // se muestra en la tarjeta
    tipo:       z.enum(['web', 'movil']),     // decide el marco: navegador o teléfono
    portada:    image(),
    galeria:    z.array(image()).default([]), // capturas para la página de detalle
    stack:      z.array(z.string()),          // ["Angular 21"] / ["Flutter", "Dart"]
    rol:        z.string().optional(),        // "Full-stack", "Frontend"...
    fecha:      z.coerce.date(),
    destacado:  z.boolean().default(false),
    repo:       z.string().url().optional(),
    demo:       z.string().url().optional(),  // solo web
    apk:        z.string().url().optional(),  // solo móvil: descarga directa
    video:      z.string().url().optional(),  // solo móvil: demo grabada
    draft:      z.boolean().default(false),
  }),
});

export const collections = { proyectos };
```

Los dos proyectos reales:

`src/content/proyectos/camping-place.md`

```markdown
---
titulo: "CampingPlace"
resumen: "Plataforma web para descubrir y reservar sitios de camping."
tipo: "web"
portada: "../../assets/proyectos/camping-place/portada.png"
galeria:
  - "../../assets/proyectos/camping-place/listado.png"
  - "../../assets/proyectos/camping-place/detalle.png"
stack: ["Angular 21", "TypeScript"]
rol: "Frontend"
fecha: 2026-06-01
destacado: true
repo: "https://github.com/usuario/camping-place"
demo: "https://camping-place.vercel.app"
---

## El problema
...

## Decisiones técnicas
...
```

`src/content/proyectos/barber-admin.md`

```markdown
---
titulo: "BarberAdmin"
resumen: "App Android para que barberías gestionen citas, clientes y caja."
tipo: "movil"
portada: "../../assets/proyectos/barber-admin/portada.png"
galeria:
  - "../../assets/proyectos/barber-admin/agenda.png"
  - "../../assets/proyectos/barber-admin/caja.png"
stack: ["Flutter", "Dart", "Android"]
rol: "Mobile"
fecha: 2026-07-01
destacado: true
repo: "https://github.com/usuario/barber-admin"
apk: "https://github.com/usuario/barber-admin/releases/latest"
---

## El problema
...

## Decisiones técnicas
...
```

Consulta en las páginas (API actual de Astro 7):

```ts
import { getCollection, render } from 'astro:content';

const proyectos = (await getCollection('proyectos', ({ data }) => !data.draft))
  .sort((a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf());
```

---

## 7. Layout con solo dos proyectos

El error más común de un portafolio nuevo es usar una cuadrícula de 3 columnas con 2 proyectos: queda un hueco a la derecha y el sitio grita "esto está a medias". Con dos proyectos hay que ocupar el espacio **a propósito**.

**Decisión: filas alternadas a ancho completo, no cuadrícula.**

```
┌──────────────────────────────────────────────────────────┐
│  ╔══════════════════╗   01 / WEB                         │
│  ║  ▓▓ navegador ▓▓ ║   CampingPlace                     │
│  ║  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ║   Plataforma para descubrir y      │
│  ╚══════════════════╝   reservar sitios de camping.      │
│                         [Angular 21] [TypeScript]        │
│                         Ver caso →   Repo ↗   Demo ↗     │
├──────────────────────────────────────────────────────────┤
│   02 / MÓVIL                       ┌────────┐            │
│   BarberAdmin                      │ ▓▓▓▓▓▓ │  teléfono  │
│   App Android para gestionar       │ ▓▓▓▓▓▓ │            │
│   citas, clientes y caja.          │ ▓▓▓▓▓▓ │            │
│   [Flutter] [Dart] [Android]       └────────┘            │
│   Ver caso →   Repo ↗   APK ↓                            │
└──────────────────────────────────────────────────────────┘
        imagen izquierda / derecha alternada por fila
```

Por qué funciona:

- Cada proyecto ocupa una pantalla entera, así que **dos se sienten suficientes** en vez de escasos.
- Hay sitio para una captura grande y de verdad legible, que es lo que convence.
- El glow cyan luce más detrás de una composición amplia que detrás de tarjetitas.
- Alternar el lado de la imagen da ritmo al hacer scroll.

**Cada tipo con su marco** (componente `DeviceFrame.astro`, condicionado por el campo `tipo`):

- `web` → marco de navegador (barra superior con tres puntos y una barra de URL falsa). La captura va apaisada.
- `movil` → marco de teléfono, vertical y más estrecho. Nunca meter una captura de móvil dentro de un rectángulo apaisado: se ve diminuta y con dos franjas vacías a los lados.

**Cuando haya más proyectos:** al llegar a 4 o más, esas filas alternadas se vuelven larguísimas. Ahí se cambia a cuadrícula de 2 columnas y se deja el formato de fila ancha solo para los marcados `destacado: true`. El componente `ProjectGrid` debe escribirse ya con eso en mente: recibe la lista y decide el layout, para que el cambio a futuro sea de un solo archivo.

**Y algo honesto:** con dos proyectos, la página de detalle (§7, paso 5) importa más que la portada. Un reclutador ve dos tarjetas en segundos; lo que le hace quedarse es abrir CampingPlace y leer qué problema resolviste y por qué elegiste lo que elegiste. Vale más invertir en dos casos bien contados que en una portada con más secciones.

---

## 8. Orden de construcción

Pensado para tener algo visible rápido y no quedarse atascado en detalles al inicio.

1. **Base** — scaffold, Tailwind, tokens en `global.css`, fuentes, `BaseLayout` con el fondo glow. *Meta: fondo oscuro con resplandor y un título con la tipografía correcta.*
2. **Contenido** — `content.config.ts` + los dos `.md` con datos reales (aunque las capturas sean provisionales).
3. **Fila de proyecto** — `ProjectCard` + `DeviceFrame` + `ProjectGrid` según §7. *Aquí ya se ve el sitio.*
4. **Hero** — nombre, una frase de qué hacés, dos botones (ver proyectos / contacto).
5. **Detalle** — `proyectos/[id].astro` con `getStaticPaths()` + `render()`, galería de capturas y estilos de prosa para el Markdown. **Con solo dos proyectos, este paso es el que más pesa.**
6. **Sobre mí + stack + contacto + footer.**
7. **Pulido** — responsive, animaciones de entrada al hacer scroll, estados hover, meta tags y og-image, favicon.
8. **Deploy.**

Los pasos 1–3 definen si el sitio se ve bien y el 5 si convence; conviene no apurar ninguno.

**Capturas que hay que preparar** (se pueden dejar para el final, pero sin ellas el sitio no se sostiene):

- CampingPlace: 1 portada apaisada + 2–3 pantallas.
- BarberAdmin: 1 portada vertical + 2–3 pantallas del emulador o del teléfono.

---

## 9. Deploy en Vercel

```bash
git add . && git commit -m "Portafolio inicial"
git remote add origin https://github.com/USUARIO/REPO.git
git push -u origin main
```

Luego en vercel.com → **Add New → Project → Import** el repo. Vercel detecta Astro solo:

- Framework preset: `Astro`
- Build command: `npm run build`
- Output directory: `dist`

Sin variables de entorno, sin adapter, sin `vercel.json`. Cada `git push` a `main` publica; cada rama genera una URL de preview para revisar antes de mezclar.

Después: añadir el dominio propio en Settings → Domains (opcional).

---

## 10. Verificación antes de dar por terminado

- [ ] `npm run build` sin errores ni warnings de esquema
- [ ] Lighthouse ≥ 95 en Performance y Accessibility
- [ ] Se ve bien a 375px de ancho (móvil) y a 1440px
- [ ] Contraste de texto suficiente: el gris `--color-ink-muted` sobre el fondo debe pasar AA
- [ ] Todas las imágenes con `alt` descriptivo
- [ ] Agregar un proyecto nuevo = crear un `.md` y hacer push, nada más
- [ ] La captura de BarberAdmin se ve en marco vertical, no estirada en uno apaisado

---

## Notas técnicas para no tropezar

- **No usar `@astrojs/tailwind`** (descontinuado). Tailwind 4 entra por `@tailwindcss/vite`.
- La API de content collections cambió en Astro 5: es `loader: glob()`, y el render es `render(entry)` importado de `astro:content`, **no** `entry.render()`. Mucho tutorial en internet todavía muestra la forma vieja.
- En páginas dinámicas el parámetro se llama `id` (antes era `slug`).
- Astro no envía JavaScript al navegador por defecto. Para animaciones basta CSS; si algo necesita JS de verdad, se marca ese componente puntual y no la página entera.
