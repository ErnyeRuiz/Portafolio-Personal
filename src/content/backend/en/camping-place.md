---
arquitectura: "Clean Architecture"
---

- **Description:** REST API that centralizes all the business logic for campsites in Costa Rica: a catalog of sites with images, reviews, favorites, trips and a granular roles and permissions system, consumed by the CampingPlace Angular frontend.
- **Scope:** 9 modules (auth, campsites and images, reviews, favorites, trips, users, roles, permissions, dashboard) plus a locations endpoint that integrates an external API of Costa Rica's provinces/cantons/districts.

## Technical details

- **CQRS with MediatR and `Result<T>` instead of exceptions** — each use case is a Command or Query with its Handler; business errors are modeled as `Result`/`Result<T>` with an error code instead of throwing exceptions, and a `ValidationPipelineBehavior` (a MediatR open behavior) short-circuits the pipeline with FluentValidation before reaching the handler.
- **Manual `Result` to HTTP mapping per controller** — each controller action calls the mediator and translates the error code (`.NotFound`, `.Forbidden`, etc.) into the matching HTTP status through a base `ApiController`; unhandled exceptions are caught by a `GlobalExceptionHandler` (.NET 8's `IExceptionHandler` interface) that returns a generic envelope.
- **JWT with flattened permissions in the token** — the access token embeds one `permission` claim for each permission of the user's role at login time, avoiding a database query on every request; a `PermissionAuthorizationHandler` centralizes the SuperUser bypass and a `PermissionAuthorizationPolicyProvider` dynamically resolves `Permission:*` policies without registering them one by one.
- **Opaque single-use rotating refresh tokens** — the value the client receives is 32 random bytes in base64url; the server only stores its SHA-256 hash, and each refresh revokes the used row and creates a new one, with inactivity expiry driven by the last-used date.
- **Admin activation delay without a background job** — instead of a scheduled job, login and refresh recompute on every attempt whether the configured number of hours since the user was created has passed, returning the remaining time if the account cannot operate yet.
- **Images on Cloudflare R2 through the S3 SDK** — up to 20 images per campsite validated in the domain, uploaded via `multipart/form-data` and stored with the AWS S3 SDK pointing at R2's S3-compatible endpoint (with payload signing disabled, an R2-specific adjustment compared to real S3).
