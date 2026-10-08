---
titulo: "BarberAdmin"
resumen: "Android management app for barbershops with different experiences per role: owners, barbers and clients."
rol: "Android"
galeriaAlt:
  - "Dashboard — Client"
  - "Create account (multiple roles)"
  - "Create barbershops — Admin"
  - "Manage barbershop — Admin"
  - "Manage barbers — Admin"
  - "New appointment — Barber"
  - "Appointments summary — Barber"
  - "Book appointment — Client"
  - "Manage appointments — Client"
  - "Dynamic menu per role"
  - "Barbershop and barber schedule"
  - "Manage products — Barber"
  - "Register products for sale — Admin"
  - "Manage services — Admin"
  - "Manage sales — Admin"
  - "Product catalog — Client"
  - "Product detail — Client"
  - "Audit log — Admin"
  - "List filtering"
---

<!-- TODO: 2-3 lines. What it is, who it's for, what it solves. It should be clear in 10 seconds. -->

## Description

A complete application to manage barbershops, appointments and clients:

- **Admin:** manages one or several barbershops, along with their barbers, clients, appointments and products.
- **Barber:** can work independently or across several barbershops, managing their own appointments and schedule.
- **Client:** can join several barbershops and book appointments with their preferred barber.

The system also handles products for sale, payment records and auditing, offering an easy-to-use interface for each type of user.

## Technical details

The project follows **Clean Architecture** per feature, with three layers (`domain`, `data`, `presentation`) and a strict dependency rule: the domain knows nothing about Flutter or Dio, and the presentation layer only talks to the domain layer through Cubits.

- **State management:** `flutter_bloc` (Cubit/Bloc) with immutable states generated with `freezed`, and explicit error handling through `Either<Failure, T>` from `fpdart` instead of exceptions as control flow.
- **Navigation:** `go_router` with three `ShellRoute` branches (one per role) and guards that redirect automatically based on the session state.
- **Networking and auth:** HTTP client built on `Dio` with an interceptor that adds the JWT to every request and refreshes the token automatically on a 401, transparently retrying the original request. Tokens are stored in `flutter_secure_storage`.
- **Dependency injection:** `get_it`, separating long-lived infrastructure (singletons) from repositories/datasources (lazy singletons) and Cubits (factories, one instance per screen).
- **Custom design system:** reusable components (buttons, inputs, bottom sheets, skeleton loaders, filter bar) with a configurable dark/light theme.
