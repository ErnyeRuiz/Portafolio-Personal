---
titulo: "CampingPlace"
resumen: "Platform to discover campsites in Costa Rica: trips, favorite places and reviews, with a public view and an admin panel."
rol: "Web"
galeriaAlt:
  - "Login"
  - "Sign up"
  - "Explore campsites"
  - "Campsite visit detail"
  - "Favorites"
  - "Trip with multiple campsites"
  - "Profile"
  - "Manage my campsites"
  - "Add new campsite"
  - "Login — Mobile"
  - "Sign up — Mobile"
  - "Home — Mobile"
  - "Visit detail — Mobile"
  - "Reviews — Mobile"
  - "My trips — Mobile"
---

## Description

A web platform to discover campsites in Costa Rica, with reviews, favorites and trip planning:

- **Traveler:** searches for campsites, leaves reviews, saves favorites and builds trips combining several sites.
- **Admin:** publishes and manages campsites, their images, users, roles and permissions.

The system brings campsite search into one place with reliable information, instead of relying on listings scattered across social media, with a public view for visitors and an admin panel with permission-based access control.

## Technical details

The frontend follows a standalone _feature_-based architecture (no NgModules), with a `core` layer for cross-cutting services, guards and interceptors, `features` lazy-loaded per domain and `shared` for reusable components.

- **State management:** Angular Signals instead of NgRx — `AuthService` exposes a read-only signal for the authenticated user with an `isLoggedIn` `computed`, each HTTP service has its own `loading` signal, and a `LoadingService` centralizes the global counter that drives the shared loader.
- **Navigation:** functional guards (`CanActivateFn`) that compose (`canActivate: [authGuard, adminSectionGuard]`), with lazy routes per feature and route parameters bound directly to signal inputs (`input.required({ transform: numberAttribute })`) without subscribing to `ActivatedRoute`.
- **Networking and auth:** functional interceptor that adds the JWT to every request; on a 401, an `AuthRefreshCoordinator` shares a single `Observable` (`shareReplay`) across all concurrent requests to trigger just one refresh call, and a `SessionRenewalService` proactively renews the session when less than 5 minutes remain before the token expires.
- **Per-request context:** typed `HttpContextToken`s (`suppressHttpErrorFeedback`, `suppressHttpSuccessFeedback`, `isSecondAuthAttempt`) travel with each `HttpRequest` so the feedback interceptor knows when to silence a toast and the auth interceptor avoids refresh loops.
- **i18n:** Transloco with translations loaded on demand per language (`/i18n/{lang}.json`), persisted in `localStorage`, with browser language detection as a fallback.
