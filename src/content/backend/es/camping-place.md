---
arquitectura: "Clean Architecture"
stack:
  [
    ".NET 8",
    "Entity Framework Core",
    "SQL Server",
    "MediatR",
    "FluentValidation",
  ]
# repo: "https://github.com/usuario/camping-place-api" # agregar si el repo del API está publicado por separado
---

- **Descripcion:** API REST que centraliza toda la lógica de negocio de campings en Costa Rica: catálogo de sitios con imágenes, reseñas, favoritos, viajes y un sistema de roles y permisos granulares, consumida por el frontend Angular de CampingPlace.
- **Alcance:** 9 módulos (auth, campsites e imágenes, reseñas, favoritos, viajes, usuarios, roles, permisos, dashboard) más un endpoint de ubicaciones que integra una API externa de provincias/cantones/distritos de Costa Rica.

## Detalles técnicos

- **CQRS con MediatR y `Result<T>` en vez de excepciones** — cada caso de uso es un Command o Query con su Handler; los errores de negocio se modelan como `Result`/`Result<T>` con código de error en vez de lanzar excepciones, y un `ValidationPipelineBehavior` (open behavior de MediatR) corta el pipeline con FluentValidation antes de llegar al handler.
- **Mapeo manual de `Result` a HTTP por controller** — cada acción del controller llama al mediator y traduce el código de error (`.NotFound`, `.Forbidden`, etc.) al status HTTP correspondiente a través de un `ApiController` base; las excepciones no controladas las captura un `GlobalExceptionHandler` (interfaz `IExceptionHandler` de .NET 8) devolviendo un envelope genérico.
- **JWT con permisos aplanados en el token** — el access token embebe un claim `permission` por cada permiso del rol del usuario al momento del login, evitando una consulta a base de datos en cada request; un `PermissionAuthorizationHandler` centraliza el bypass de SuperUser y un `PermissionAuthorizationPolicyProvider` resuelve dinámicamente políticas `Permission:*` sin registrarlas una por una.
- **Refresh tokens opacos con rotación de un solo uso** — el valor que recibe el cliente son 32 bytes aleatorios en base64url; el servidor solo persiste su hash SHA-256, y cada refresh revoca la fila usada y crea una nueva, con expiración por inactividad controlada por la fecha de último uso.
- **Delay de activación de Admins sin job en segundo plano** — en vez de un scheduled job, el login y el refresh recalculan en cada intento si ya pasaron las horas configuradas desde la creación del usuario, devolviendo el tiempo restante si la cuenta todavía no puede operar.
- **Imágenes en Cloudflare R2 vía SDK de S3** — hasta 20 imágenes por campsite validadas en el dominio, subidas por `multipart/form-data` y almacenadas con el SDK de AWS S3 apuntando al endpoint S3-compatible de R2 (con la firma de payload deshabilitada, un ajuste propio de R2 frente a S3 real).
