/* Textos de la interfaz. `en` debe tener exactamente las mismas claves que
   `es`: si falta o sobra una, TypeScript falla (`npm run check`). */
const es = {
  "sitio.titulo": "Ernye Ruiz — Desarrollador Full Stack",
  "sitio.descripcion":
    "Portafolio de Ernye Ruiz, desarrollador Full Stack. .NET, Angular, Flutter y SQL Server.",

  "layout.saltar": "Saltar al contenido",

  "nav.principal": "Principal",
  "nav.sobreMi": "Sobre mí",
  "nav.proyectos": "Proyectos",
  "nav.contacto": "Contacto",
  "nav.abrirMenu": "Abrir menú",
  "nav.cerrarMenu": "Cerrar menú",
  "idioma.codigo": "ES",
  "idioma.cambiar": "Ver esta página en español",

  "hero.saludo": "¡Hola!",
  "hero.nombre": "Soy Ernye",
  "hero.rolAntes": "Soy desarrollador",
  "hero.rolDespues": "",

  "about.p1":
    "Soy un desarrollador apasionado por la programación y la arquitectura de sistemas. Me gusta especialmente trabajar en la lógica del backend aunque también disfruto el desarrollo frontend y móvil. Me motiva aprender nuevas tecnologías, afrontar desafíos y colaborar con equipos de desarrollo.",
  "about.p2":
    "Cuando no estoy frente a la pantalla, suelo hacer actividad física, compartir tiempo con mis seres queridos y fortalecer mi relación con Dios.",
  "about.cliente": "Cliente",
  "about.datos": "Datos",
  "about.movil": "móvil",
  "about.modelado": "Modelado",

  "proyectos.titulo": "Proyectos",
  "proyectos.intro": "Lo que he desarrollado y mis conocimientos técnicos.",
  "proyectos.capturaDe": "Captura de {titulo}",
  "proyectos.verCasoDe": "Ver el caso de {titulo}",
  "proyectos.verCaso": "Ver caso →",
  "proyectos.tipoWeb": "Frontend",
  "proyectos.tipoMovil": "Mobile",

  "accion.repositorio": "Repositorio ↗",
  "accion.visitar": "Visitar ↗",
  "accion.descargarApk": "Descargar APK ↓",

  "proyecto.volver": "← Volver a proyectos",
  "proyecto.soloAndroid": "Solo Android",
  "proyecto.avisoApk":
    "Tu teléfono puede pedirte permitir la instalación desde este navegador.",
  "proyecto.backend": "Backend",

  "galeria.titulo": "Galería",
  "galeria.region": "Galería de capturas",
  "galeria.ampliar": "Ampliar: {alt}",
  "galeria.anterior": "Captura anterior",
  "galeria.siguiente": "Siguiente captura",

  "visor.etiqueta": "Visor de capturas",
  "visor.cerrar": "Cerrar visor",

  "qr.dock": "Llevar al celular",
  "qr.boton": "Llévalo en tu celular",
  "qr.escanea": "Escanea con tu celular",
  "qr.cerrar": "Cerrar",
  "qr.apk": "APK",
  "qr.apkDescripcion": "Descargar el APK desde el celular",
  "qr.sitio": "Sitio",
  "qr.sitioDescripcion": "Abrir el sitio desde el celular",
  "qr.repo": "Repo",
  "qr.repoDescripcion": "Abrir el repositorio desde el celular",

  "contacto.titulo": "Contacto",
  "contacto.intro": "¿Tienes un proyecto en mente o quieres conversar? Escríbeme.",
  "contacto.nombre": "Nombre",
  "contacto.correo": "Correo",
  "contacto.mensaje": "Mensaje",
  "contacto.honeypot": "No completar",
  "contacto.enviar": "Enviar mensaje",
  "contacto.enviando": "Enviando…",
  "contacto.exitoTitulo": "¡Mensaje enviado!",
  "contacto.exitoTexto": "Te responderé pronto.",
  "contacto.otro": "Enviar otro mensaje",
  "contacto.correoDirecto": "Correo directo",
  "contacto.disponible": "Disponible para nuevos proyectos y oportunidades.",

  // Una por cada `CodigoError` de la API, más el fallo de red del navegador.
  "error.solicitud_invalida": "Solicitud inválida.",
  "error.campos_incompletos": "Completa todos los campos.",
  "error.mensaje_largo": "El mensaje es demasiado largo.",
  "error.email_invalido": "El correo no es válido.",
  "error.origen_no_permitido": "Origen no permitido.",
  "error.envio_fallido": "No se pudo enviar el mensaje.",
  "error.conexion": "Error de conexión. Intenta de nuevo.",

  "404.titulo": "Página no encontrada",
  "404.etiqueta": "Error 404",
  "404.antes": "Esta página no",
  "404.resaltado": "existe",
  "404.texto":
    "Puede que el enlace esté roto o que el proyecto ya no esté publicado.",
  "404.volver": "Volver al inicio",
} as const;

const en: Record<keyof typeof es, string> = {
  "sitio.titulo": "Ernye Ruiz — Full Stack Developer",
  "sitio.descripcion":
    "Portfolio of Ernye Ruiz, Full Stack developer. .NET, Angular, Flutter and SQL Server.",

  "layout.saltar": "Skip to content",

  "nav.principal": "Main",
  "nav.sobreMi": "About me",
  "nav.proyectos": "Projects",
  "nav.contacto": "Contact",
  "nav.abrirMenu": "Open menu",
  "nav.cerrarMenu": "Close menu",
  "idioma.codigo": "EN",
  "idioma.cambiar": "View this page in English",

  "hero.saludo": "Hi!",
  "hero.nombre": "I'm Ernye",
  "hero.rolAntes": "I'm a",
  "hero.rolDespues": "developer",

  "about.p1":
    "I'm a developer passionate about programming and systems architecture. I especially enjoy working on backend logic, although I also enjoy frontend and mobile development. I'm motivated by learning new technologies, taking on challenges and collaborating with development teams.",
  "about.p2":
    "When I'm away from the screen, I usually exercise, spend time with my loved ones and strengthen my relationship with God.",
  "about.cliente": "Client",
  "about.datos": "Data",
  "about.movil": "mobile",
  "about.modelado": "Modeling",

  "proyectos.titulo": "Projects",
  "proyectos.intro": "What I've built and my technical skills.",
  "proyectos.capturaDe": "Screenshot of {titulo}",
  "proyectos.verCasoDe": "View the {titulo} case study",
  "proyectos.verCaso": "View case →",
  "proyectos.tipoWeb": "Frontend",
  "proyectos.tipoMovil": "Mobile",

  "accion.repositorio": "Repository ↗",
  "accion.visitar": "Visit ↗",
  "accion.descargarApk": "Download APK ↓",

  "proyecto.volver": "← Back to projects",
  "proyecto.soloAndroid": "Android only",
  "proyecto.avisoApk":
    "Your phone may ask you to allow installation from this browser.",
  "proyecto.backend": "Backend",

  "galeria.titulo": "Gallery",
  "galeria.region": "Screenshot gallery",
  "galeria.ampliar": "Enlarge: {alt}",
  "galeria.anterior": "Previous screenshot",
  "galeria.siguiente": "Next screenshot",

  "visor.etiqueta": "Screenshot viewer",
  "visor.cerrar": "Close viewer",

  "qr.dock": "Take it to your phone",
  "qr.boton": "Take it on your phone",
  "qr.escanea": "Scan with your phone",
  "qr.cerrar": "Close",
  "qr.apk": "APK",
  "qr.apkDescripcion": "Download the APK from your phone",
  "qr.sitio": "Site",
  "qr.sitioDescripcion": "Open the site from your phone",
  "qr.repo": "Repo",
  "qr.repoDescripcion": "Open the repository from your phone",

  "contacto.titulo": "Contact",
  "contacto.intro": "Have a project in mind or just want to chat? Drop me a line.",
  "contacto.nombre": "Name",
  "contacto.correo": "Email",
  "contacto.mensaje": "Message",
  "contacto.honeypot": "Do not fill in",
  "contacto.enviar": "Send message",
  "contacto.enviando": "Sending…",
  "contacto.exitoTitulo": "Message sent!",
  "contacto.exitoTexto": "I'll get back to you soon.",
  "contacto.otro": "Send another message",
  "contacto.correoDirecto": "Direct email",
  "contacto.disponible": "Available for new projects and opportunities.",

  "error.solicitud_invalida": "Invalid request.",
  "error.campos_incompletos": "Please fill in all the fields.",
  "error.mensaje_largo": "The message is too long.",
  "error.email_invalido": "The email address is not valid.",
  "error.origen_no_permitido": "Origin not allowed.",
  "error.envio_fallido": "The message could not be sent.",
  "error.conexion": "Connection error. Please try again.",

  "404.titulo": "Page not found",
  "404.etiqueta": "Error 404",
  "404.antes": "This page",
  "404.resaltado": "doesn't exist",
  "404.texto":
    "The link may be broken or the project may no longer be published.",
  "404.volver": "Back to home",
};

export const ui = { es, en };

export type Lang = keyof typeof ui;
export type ClaveUi = keyof typeof es;
