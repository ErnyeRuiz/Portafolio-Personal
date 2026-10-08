---
titulo: "BarberAdmin"
resumen: "App Android de gestión para barberías con múltiples experiencias según el rol: dueños, barberos y clientes."
tipo: "movil"
portada: "../../../assets/proyectos/barber-admin/dashboard-barbero.jpeg"
galeria:
  - src: "../../../assets/proyectos/barber-admin/dashboard-cliente.jpeg"
    alt: "Dashboard — Cliente"
  - src: "../../../assets/proyectos/barber-admin/crear-cuenta-varios-roles.jpeg"
    alt: "Crear cuenta (varios roles)"
  - src: "../../../assets/proyectos/barber-admin/crear-barberias-admin.jpeg"
    alt: "Crear barberías — Admin"
  - src: "../../../assets/proyectos/barber-admin/gestionar-barberia-admin.jpeg"
    alt: "Gestionar barbería — Admin"
  - src: "../../../assets/proyectos/barber-admin/administracion-barberos-admin.jpeg"
    alt: "Gestionar barberos — Admin"
  - src: "../../../assets/proyectos/barber-admin/nueva-cita-barbero.jpeg"
    alt: "Nueva cita — Barbero"
  - src: "../../../assets/proyectos/barber-admin/resumen-filtrado-barbero.jpeg"
    alt: "Resumen citas — Barbero"
  - src: "../../../assets/proyectos/barber-admin/reservar-cita-cliente.jpeg"
    alt: "Reservar cita — Cliente"
  - src: "../../../assets/proyectos/barber-admin/mis-citas-cliente.jpeg"
    alt: "Gestionar citas — Cliente"
  - src: "../../../assets/proyectos/barber-admin/menu.jpeg"
    alt: "Menú dinámico por rol"
  - src: "../../../assets/proyectos/barber-admin/horario-barberia-barbero-admin.jpeg"
    alt: "Horario de barbería y barbero"
  - src: "../../../assets/proyectos/barber-admin/productos-barbero.jpeg"
    alt: "Gestionar productos — Barbero"
  - src: "../../../assets/proyectos/barber-admin/registro-productos-venta-barbero.jpeg"
    alt: "Registro de productos para venta — Admin"
  - src: "../../../assets/proyectos/barber-admin/mantenimiento-servicios-admin.jpeg"
    alt: "Gestionar servicios — Admin"
  - src: "../../../assets/proyectos/barber-admin/ventas-productos-admin.jpeg"
    alt: "Gestionar ventas — Admin"
  - src: "../../../assets/proyectos/barber-admin/catalogo-productos-cliente.jpeg"
    alt: "Catálogo de productos — Cliente"
  - src: "../../../assets/proyectos/barber-admin/detalle-producto-cliente.jpeg"
    alt: "Detalle de producto — Cliente"
  - src: "../../../assets/proyectos/barber-admin/auditoria-admin.jpeg"
    alt: "Auditoría — Admin"
  - src: "../../../assets/proyectos/barber-admin/filtros.jpeg"
    alt: "Filtrado en listas"
stack: ["Flutter", "BLoC", "Clean Architecture", ".NET", "SQL"]
rol: "Android"
apk:
  url: "https://pub-66dadff9bc034ef991e435f0ccb4ccbe.r2.dev/barber-admin-1.0.0.apk"
  tamano: "75 MB"
  version: "1.0.0"
fecha: 2026-07-01
destacado: true
---

<!-- TODO: 2-3 líneas. Qué es, para quién, qué resuelve. Que se entienda en 10 segundos. -->

## Descripción

Aplicación completa para gestionar barberías, citas y clientes:

- **Administrador:** administra una o varias barberías, sus barberos, clientes, citas y productos.
- **Barbero:** puede trabajar de forma independiente o en varias barberías, gestionando sus citas y su horario.
- **Cliente:** puede asociarse a varias barberías y reservar citas con su barbero de preferencia.

El sistema además permite gestionar productos en venta, registro de pagos y auditoría, ofreciendo una interfaz fácil de usar para cada usuario.

## Detalles técnicos

El proyecto sigue **Clean Architecture** por feature, con tres capas (`domain`, `data`, `presentation`) y una regla de dependencia estricta: el dominio no conoce Flutter ni Dio, y la presentación solo habla con la capa de dominio a través de Cubits.

- **State management:** `flutter_bloc` (Cubit/Bloc) con estados inmutables generados con `freezed`, y manejo de errores explícito vía `Either<Failure, T>` de `fpdart` en vez de excepciones como control de flujo.
- **Navegación:** `go_router` con tres ramas de `ShellRoute` (una por rol) y guards que redirigen automáticamente según el estado de sesión.
- **Red y auth:** cliente HTTP con `Dio` y un interceptor que agrega el JWT a cada request y refresca el token automáticamente ante un 401, reintentando la petición original de forma transparente. Los tokens viven en `flutter_secure_storage`.
- **Inyección de dependencias:** `get_it`, separando infraestructura de larga vida (singletons) de repositorios/datasources (lazy singletons) y Cubits (factories, una instancia por pantalla).
- **Sistema de diseño propio:** componentes reutilizables (botones, inputs, bottom sheets, skeleton loaders, barra de filtros) con tema oscuro/claro configurable.
