---
arquitectura: "Clean Architecture"
stack:
  [
    ".NET 10",
    "Entity Framework Core",
    "SQL Server",
    "MediatR",
    "FluentValidation",
  ]
#repo: "https://github.com/usuario/barber-admin-api" # agregar si el repo del API está publicado por separado
---

- **Descripcion:** backend multi-tenant para varias barberías, con roles que conviven en un mismo usuario (un Barbero puede además ser Cliente) y contexto de barbería activa embebido en la sesión.
- **Alcance:** 12 módulos (auth, barberías, servicios, citas, cortes, productos, compras, ventas, inventario, clientes, auditoría), desplegado en producción con CI/CD.

## Detalles técnicos

- **Clean Architecture por feature con CQRS** — cada caso de uso es un Command o Query de MediatR con su Handler y Validator (FluentValidation); los handlers retornan `ErrorOr<T>` en vez de usar excepciones como control de flujo.
- **Auth JWT + refresh token** — access token de 60 min, refresh token de 30 días almacenado como hash con rotación en cada uso; la barbería activa viaja como claim (`barberiaId`) y define el contexto de todo el request, evitando headers o parámetros adicionales.
- **Roles compuestos por usuario** — un mismo usuario puede ser Barbero y Cliente en la misma barbería simultáneamente; un `ICurrentUserContext` centraliza la lectura de claims para que ningún handler lea el JWT directamente.
- **PKs GUID v7 client-side** (`Guid.CreateVersion7()`) en entidades de negocio para no fragmentar el índice clusterizado en SQL Server; los catálogos (roles, medios de pago, estados) usan `int identity`.
- **Soft delete uniforme** vía columna `deletedAt` con global query filter en EF Core, más timestamps (`createdAt`/`updatedAt`) rellenados automáticamente en el override de `SaveChangesAsync`.
- **Integraciones externas** — imágenes en Cloudflare R2 (`multipart/form-data`), emails transaccionales (OTP de registro y recuperación de contraseña) vía Brevo, y deploy en MonsterASP.net con CI/CD por GitHub Actions.
