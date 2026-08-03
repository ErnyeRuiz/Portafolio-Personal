---
titulo: "CampingPlace"
resumen: "Plataforma para descubrir campings en Costa Rica: reseñas, favoritos y viajes, con vista pública y panel de administración por permisos."
tipo: "web"
portada: "../../assets/proyectos/camping-place/portada.png"
galeria:
  - src: "../../assets/proyectos/camping-place/login.png"
    alt: "Login"
  - src: "../../assets/proyectos/camping-place/registro.png"
    alt: "Registro"
  - src: "../../assets/proyectos/camping-place/explore.png"
    alt: "Explorar campings"
  - src: "../../assets/proyectos/camping-place/detalle-visita-camping.png"
    alt: "Detalle de visita a camping"
  - src: "../../assets/proyectos/camping-place/favoritos.png"
    alt: "Favoritos"
  - src: "../../assets/proyectos/camping-place/viaje-con-campings.png"
    alt: "Viaje con campings"
  - src: "../../assets/proyectos/camping-place/perfil.png"
    alt: "Perfil"
  - src: "../../assets/proyectos/camping-place/gestionar-campings.png"
    alt: "Gestionar mis campings"
  - src: "../../assets/proyectos/camping-place/agregar-camping.png"
    alt: "Agregar nuevo camping"
  - src: "../../assets/proyectos/camping-place/mobile-login.jpeg"
    alt: "Login — Móvil"
    tipo: "movil"
  - src: "../../assets/proyectos/camping-place/mobile-registro.jpeg"
    alt: "Registro — Móvil"
    tipo: "movil"
  - src: "../../assets/proyectos/camping-place/mobile-inicio.jpeg"
    alt: "Inicio — Móvil"
    tipo: "movil"
  - src: "../../assets/proyectos/camping-place/mobile-detalle-visita-camping.jpeg"
    alt: "Detalle de visita — Móvil"
    tipo: "movil"
  - src: "../../assets/proyectos/camping-place/mobile-resenas.jpeg"
    alt: "Reseñas — Móvil"
    tipo: "movil"
  - src: "../../assets/proyectos/camping-place/mobile-mis-viajes.jpeg"
    alt: "Mis viajes — Móvil"
    tipo: "movil"
stack: ["Angular 21", "TypeScript", "Signals", "RxJS", "Transloco"]
rol: "Frontend"
fecha: 2026-05-18
destacado: true
---

## Descripción

Plataforma web para descubrir sitios de camping en Costa Rica, con reseñas, favoritos y planificación de viajes:

- **Viajero:** busca campings, deja reseñas, marca favoritos y arma viajes combinando varios sitios.
- **Administrador:** publica y gestiona sitios de camping, sus imágenes, usuarios, roles y permisos.

El sistema centraliza la búsqueda de campings en un solo lugar con información confiable, en vez de depender de listados dispersos en redes sociales, con una vista pública para visitantes y un panel de administración con control de acceso basado en permisos.

## Detalles técnicos

El frontend sigue una arquitectura por *features* standalone (sin NgModules), con una capa `core` que concentra servicios, guards e interceptors transversales, `features` con lazy-loading por dominio y `shared` para componentes reutilizables.

- **State management:** Angular Signals en vez de NgRx — `AuthService` expone un signal de solo lectura para el usuario autenticado con un `computed` `isLoggedIn`, cada servicio HTTP tiene su propio signal `loading`, y un `LoadingService` centraliza el contador global que alimenta el loader compartido.
- **Navegación:** guards funcionales (`CanActivateFn`) que se componen (`canActivate: [authGuard, adminSectionGuard]`), con rutas lazy por feature y parámetros de ruta bindeados directo a signal inputs (`input.required({ transform: numberAttribute })`) sin suscribirse a `ActivatedRoute`.
- **Red y auth:** interceptor funcional que agrega el JWT a cada request; ante un 401, un `AuthRefreshCoordinator` comparte un único `Observable` (`shareReplay`) entre todas las peticiones concurrentes para disparar una sola llamada de refresh, y un `SessionRenewalService` renueva proactivamente cuando faltan menos de 5 minutos para que expire el token.
- **Contexto por request:** `HttpContextToken` tipados (`suppressHttpErrorFeedback`, `suppressHttpSuccessFeedback`, `isSecondAuthAttempt`) viajan en cada `HttpRequest` para que el interceptor de feedback sepa cuándo silenciar un toast y el de auth evite loops de refresh.
- **i18n:** Transloco con traducciones cargadas bajo demanda por idioma (`/i18n/{lang}.json`), persistencia en `localStorage` y detección del idioma del navegador como fallback.
