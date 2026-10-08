---
arquitectura: "Clean Architecture"
---

- **Description:** multi-tenant backend for multiple barbershops, with roles that coexist in a single user (a Barber can also be a Client) and the active barbershop context embedded in the session.
- **Scope:** 12 modules (auth, barbershops, services, appointments, haircuts, products, purchases, sales, inventory, clients, auditing), deployed to production with CI/CD.

## Technical details

- **Clean Architecture per feature with CQRS** — each use case is a MediatR Command or Query with its Handler and Validator (FluentValidation); handlers return `ErrorOr<T>` instead of using exceptions as control flow.
- **JWT auth + refresh token** — 60-minute access token and 30-day refresh token stored as a hash and rotated on every use; the active barbershop travels as a claim (`barberiaId`) and defines the context of the whole request, avoiding extra headers or parameters.
- **Composite roles per user** — the same user can be both Barber and Client in the same barbershop at once; an `ICurrentUserContext` centralizes claim reading so no handler reads the JWT directly.
- **Client-side GUID v7 PKs** (`Guid.CreateVersion7()`) on business entities to avoid fragmenting the clustered index in SQL Server; catalogs (roles, payment methods, statuses) use `int identity`.
- **Uniform soft delete** through a `deletedAt` column with a global query filter in EF Core, plus timestamps (`createdAt`/`updatedAt`) filled in automatically in the `SaveChangesAsync` override.
- **External integrations** — images on Cloudflare R2 (`multipart/form-data`), transactional emails (registration OTP and password recovery) through Brevo, and deployment on MonsterASP.net with CI/CD through GitHub Actions.
