# Portafolio personal

Sitio donde publico mis proyectos. Estático, sin base de datos: cada proyecto es
un archivo Markdown y publicar uno nuevo es hacer commit.

**Sitio:** https://portafolio-personal-phi-black.vercel.app

## Stack

| Pieza | Qué |
|---|---|
| [Astro 7](https://astro.build) | Framework. Cero JavaScript al navegador por defecto |
| [Tailwind 4](https://tailwindcss.com) | Estilos, vía el plugin de Vite |
| TypeScript | Modo `strict` |
| Content Collections | Los proyectos, validados con Zod en tiempo de build |
| Vercel | Despliegue |

## Arrancar

```bash
npm install
npm run dev      # http://localhost:4321
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila a `dist/` |
| `npm run preview` | Sirve lo compilado, para revisar antes de publicar |

## Estructura

```
src/
├─ config.ts                 Datos del sitio (nombre, redes, URL)
├─ content.config.ts         Esquema de los proyectos
├─ content/proyectos/        Un .md por proyecto
├─ assets/proyectos/         Capturas (Astro las optimiza a WebP)
├─ styles/global.css         Tokens de diseño, glow y animaciones
├─ layouts/BaseLayout.astro  <head>, SEO, header y footer
├─ components/
└─ pages/
   ├─ index.astro
   └─ proyectos/[id].astro   Página de detalle de cada proyecto
```

## Agregar un proyecto

1. Poné las capturas en `src/assets/proyectos/<nombre-del-proyecto>/`.
2. Creá `src/content/proyectos/<nombre-del-proyecto>.md`:

```markdown
---
titulo: "Mi Proyecto"
resumen: "Una frase de qué es y para quién." # máximo 160 caracteres
tipo: "web"                                   # "web" | "movil"
portada: "../../assets/proyectos/mi-proyecto/portada.png"
galeria:
  - "../../assets/proyectos/mi-proyecto/pantalla-1.png"
stack: ["Angular 21", "TypeScript"]
rol: "Frontend"
fecha: 2026-07-01
destacado: true
repo: "https://github.com/usuario/repo"       # opcional
demo: "https://ejemplo.com"                   # opcional, solo web
apk: "https://ejemplo.com/app.apk"            # opcional, solo móvil
---

## El problema
...

## Decisiones técnicas
...
```

3. `npm run build` para comprobar. Si falta un campo o sobra, el build falla con
   un mensaje concreto en vez de romper la página.

`tipo` decide cómo se presenta la captura: `web` la mete en un marco de navegador
y `movil` en uno de teléfono.

## Diseño

Tema oscuro con resplandor cyan. Los tokens viven en `src/styles/global.css`
dentro de `@theme`, y Tailwind genera las utilidades solo (`--color-surface`
produce `bg-surface`). Para cambiar la paleta entera basta con tocar ahí.

| Token | Valor |
|---|---|
| Fondo | `#0a0f1e` |
| Superficie | `#111827` |
| Acento | `#0ea5e9` |
| Tipografías | Space Grotesk (títulos) · DM Sans (texto) |

## Ramas

- `main` — producción. Lo que está publicado.
- `development` — trabajo diario. Cada push genera una URL de preview en Vercel.
