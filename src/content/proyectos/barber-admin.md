---
titulo: "BarberAdmin"
resumen: "App Android de gestión para barberías: una sola app que sirve a dueños, barberos y clientes, cada uno con su propia experiencia."
tipo: "movil"
portada: "../../assets/proyectos/barber-admin/portada.jpeg"
galeria:
  - src: "../../assets/proyectos/barber-admin/login.jpeg"
    alt: "Login"
  - src: "../../assets/proyectos/barber-admin/registro-usuario.jpeg"
    alt: "Registro de usuario"
  - src: "../../assets/proyectos/barber-admin/crear-cuenta-varios-roles.jpeg"
    alt: "Crear cuenta (varios roles)"
  - src: "../../assets/proyectos/barber-admin/menu.jpeg"
    alt: "Menú"
  - src: "../../assets/proyectos/barber-admin/dashboard-cliente.jpeg"
    alt: "Dashboard — Cliente"
  - src: "../../assets/proyectos/barber-admin/catalogo-productos-cliente.jpeg"
    alt: "Catálogo de productos — Cliente"
  - src: "../../assets/proyectos/barber-admin/detalle-producto-cliente.jpeg"
    alt: "Detalle de producto — Cliente"
  - src: "../../assets/proyectos/barber-admin/reservar-cita-cliente.jpeg"
    alt: "Reservar cita — Cliente"
  - src: "../../assets/proyectos/barber-admin/mis-citas-cliente.jpeg"
    alt: "Mis citas — Cliente"
  - src: "../../assets/proyectos/barber-admin/nueva-cita-barbero.jpeg"
    alt: "Nueva cita — Barbero"
  - src: "../../assets/proyectos/barber-admin/resumen-filtrado-barbero.jpeg"
    alt: "Resumen filtrado — Barbero"
  - src: "../../assets/proyectos/barber-admin/registro-productos-venta-barbero.jpeg"
    alt: "Registro de productos para venta — Barbero"
  - src: "../../assets/proyectos/barber-admin/crear-barberias-admin.jpeg"
    alt: "Crear barberías — Admin"
  - src: "../../assets/proyectos/barber-admin/gestionar-barberia-admin.jpeg"
    alt: "Gestionar barbería — Admin"
  - src: "../../assets/proyectos/barber-admin/administracion-barberos-admin.jpeg"
    alt: "Administración de barberos — Admin"
  - src: "../../assets/proyectos/barber-admin/aprobacion-rechazo-barberos-admin.jpeg"
    alt: "Aprobación/rechazo de barberos — Admin"
  - src: "../../assets/proyectos/barber-admin/horario-barberia-barbero-admin.jpeg"
    alt: "Horario de barbería/barbero — Admin"
  - src: "../../assets/proyectos/barber-admin/mantenimiento-servicios-admin.jpeg"
    alt: "Mantenimiento de servicios — Admin"
  - src: "../../assets/proyectos/barber-admin/registrar-compra-productos-admin.jpeg"
    alt: "Registrar compra de productos — Admin"
  - src: "../../assets/proyectos/barber-admin/ventas-productos-admin.jpeg"
    alt: "Ventas de productos — Admin"
  - src: "../../assets/proyectos/barber-admin/auditoria-admin.jpeg"
    alt: "Auditoría — Admin"
  - src: "../../assets/proyectos/barber-admin/filtros.jpeg"
    alt: "Filtros"
  - src: "../../assets/proyectos/barber-admin/perfil.jpeg"
    alt: "Perfil"
stack: ["Flutter", "Dart", "BLoC", "Clean Architecture", "Android"]
rol: "Mobile"
fecha: 2026-07-01
destacado: true
---

<!-- TODO: 2-3 líneas. Qué es, para quién, qué resuelve. Que se entienda en 10 segundos. -->

## Descripción

Aplicación completa para gestionar barberias, citas y clientes:

- **Administrador:** administra una o varias barberías, sus barberos, clientes, citas y productos.
- **Barbero:** puede trabajar de forma independiente o en varias barberías, gestionando su citas y su horario.
- **Cliente:** puede asociarse a varias barberías y reservar citas con su barbero de preferencia.

El sistema ademas permite gestionar productos en venta, registro de pagos y auditoría, ofreciendo una interfaz facil de usar para cada usuario.

## Detalles técnicos

El proyecto sigue **Clean Architecture** por feature, con tres capas (`domain`, `data`, `presentation`) y una regla de dependencia estricta: el dominio no conoce Flutter ni Dio, y la presentación solo habla con la capa de dominio a través de Cubits.

- **State management:** `flutter_bloc` (Cubit/Bloc) con estados inmutables generados con `freezed`, y manejo de errores explícito vía `Either<Failure, T>` de `fpdart` en vez de excepciones como control de flujo.
- **Navegación:** `go_router` con tres ramas de `ShellRoute` (una por rol) y guards que redirigen automáticamente según el estado de sesión.
- **Red y auth:** cliente HTTP con `Dio` y un interceptor que agrega el JWT a cada request y refresca el token automáticamente ante un 401, reintentando la petición original de forma transparente. Los tokens viven en `flutter_secure_storage`.
- **Inyección de dependencias:** `get_it`, separando infraestructura de larga vida (singletons) de repositorios/datasources (lazy singletons) y Cubits (factories, una instancia por pantalla).
- **Sistema de diseño propio:** componentes reutilizables (botones, inputs, bottom sheets, skeleton loaders, barra de filtros) con tema oscuro/claro configurable.
