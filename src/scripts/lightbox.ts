interface Captura {
  src: string;
  alt: string;
}

/* Visor a pantalla completa. `dialog` trae las capturas ampliadas en
   `data-items`; `disparadores` son los botones de la galería que lo abren. */
export function iniciarVisor(
  dialog: HTMLDialogElement,
  disparadores: NodeListOf<HTMLButtonElement>,
) {
  const capturas: Captura[] = JSON.parse(dialog.dataset.items ?? "[]");
  const img = dialog.querySelector<HTMLImageElement>("[data-lightbox-img]")!;
  const pie = dialog.querySelector("[data-lightbox-caption]")!;
  const contador = dialog.querySelector("[data-lightbox-count]")!;
  let actual = 0;

  const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
  let turno = 0;
  let abiertoConTeclado = false;

  const pintar = (i: number) => {
    actual = (i + capturas.length) % capturas.length;
    const { src, alt } = capturas[actual];
    img.src = src;
    img.alt = alt;
    pie.textContent = alt;
    contador.textContent = `${actual + 1} / ${capturas.length}`;
  };

  // `dir` = 1 avanza, -1 retrocede: la captura actual sale hacia un lado y la
  // nueva entra desde el contrario. Sin `dir` (apertura) cambia sin animar.
  const mostrar = async (i: number, dir = 0) => {
    const mio = ++turno;
    if (!dir || sinMovimiento.matches || !dialog.open) return pintar(i);

    img.getAnimations().forEach((a) => a.cancel());
    const salida = img.animate(
      [
        { opacity: 1, transform: "translateX(0)" },
        { opacity: 0, transform: `translateX(${-dir * 48}px)` },
      ],
      { duration: 140, easing: "ease-in", fill: "forwards" },
    );
    await salida.finished.catch(() => {});
    if (mio !== turno) return;

    pintar(i);
    await img.decode().catch(() => {});
    if (mio !== turno) return;

    salida.cancel();
    img.animate(
      [
        { opacity: 0, transform: `translateX(${dir * 48}px)` },
        { opacity: 1, transform: "translateX(0)" },
      ],
      { duration: 220, easing: "ease-out" },
    );
  };

  disparadores.forEach((disparador) =>
    disparador.addEventListener("click", (e) => {
      // detail === 0 es un "click" disparado por teclado (Enter/Espacio).
      abiertoConTeclado = e.detail === 0;
      mostrar(Number(disparador.dataset.lightboxOpen));
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }),
  );

  // Al cerrar, el navegador devuelve el foco al botón que abrió el visor; con
  // Escape eso pinta el anillo de :focus-visible sobre la captura. Si se abrió
  // con mouse/táctil lo soltamos; con teclado se conserva para no perder el foco.
  dialog.addEventListener("close", () => {
    document.documentElement.style.overflow = "";
    if (!abiertoConTeclado && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  });
  dialog
    .querySelector("[data-lightbox-close]")
    ?.addEventListener("click", () => dialog.close());
  dialog
    .querySelector("[data-lightbox-prev]")
    ?.addEventListener("click", () => mostrar(actual - 1, -1));
  dialog
    .querySelector("[data-lightbox-next]")
    ?.addEventListener("click", () => mostrar(actual + 1, 1));

  // Click fuera de la imagen y los controles cierra el visor.
  dialog.addEventListener("click", (e) => {
    const el = e.target as HTMLElement;
    if (el === dialog || el.parentElement === dialog) dialog.close();
  });

  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") mostrar(actual - 1, -1);
    if (e.key === "ArrowRight") mostrar(actual + 1, 1);
  });

  // Swipe horizontal en pantallas táctiles. Un gesto con dos dedos (pinch-zoom)
  // no cuenta como swipe.
  let inicioX = 0;
  let conDosDedos = false;
  dialog.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length > 1) conDosDedos = true;
      else inicioX = e.touches[0].clientX;
    },
    { passive: true },
  );
  dialog.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - inicioX;
      if (!conDosDedos && Math.abs(dx) > 50) {
        const dir = dx < 0 ? 1 : -1;
        mostrar(actual + dir, dir);
      }
      if (e.touches.length === 0) conDosDedos = false;
    },
    { passive: true },
  );
}
