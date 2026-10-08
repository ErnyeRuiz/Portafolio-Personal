/* Una figura cuenta como "visible" desde este porcentaje, y como "completa"
   desde el segundo: tolera los redondeos de subpíxeles. */
const UMBRAL_VISIBLE = 0.1;
const UMBRAL_COMPLETA = 0.99;

export function iniciarCarrusel(raiz: HTMLElement) {
  const track = raiz.querySelector<HTMLElement>("[data-carousel-track]");
  const anterior = raiz.querySelector<HTMLButtonElement>("[data-carousel-prev]");
  const siguiente = raiz.querySelector<HTMLButtonElement>("[data-carousel-next]");
  const contador = raiz.querySelector("[data-carousel-count]");
  if (!track) return;

  const figuras = Array.from(track.querySelectorAll("figure"));
  const proporciones = new Map<Element, number>();

  const visibles = () =>
    figuras.filter((f) => (proporciones.get(f) ?? 0) >= UMBRAL_VISIBLE);
  const completa = (figura: Element | undefined) =>
    !!figura && (proporciones.get(figura) ?? 0) >= UMBRAL_COMPLETA;

  // El alto del track sigue a las capturas visibles, no a la más alta de
  // toda la galería (si no, las capturas bajas dejan huecos arriba/abajo).
  const ajustarAlto = () => {
    const alto = Math.ceil(
      Math.max(0, ...visibles().map((f) => f.getBoundingClientRect().height)),
    );
    if (alto > 0) track.style.height = `${alto}px`;
  };

  // Contador ("3 / 15" o "14–15 / 15" si se ven varias) y flechas
  // deshabilitadas en los extremos. Usa aria-disabled para no perder el foco.
  const actualizarEstado = () => {
    const indices = visibles().map((f) => figuras.indexOf(f) + 1);
    if (contador && indices.length > 0) {
      const primera = indices[0];
      const ultima = indices[indices.length - 1];
      contador.textContent =
        primera === ultima
          ? `${primera} / ${figuras.length}`
          : `${primera}–${ultima} / ${figuras.length}`;
    }
    anterior?.setAttribute("aria-disabled", String(completa(figuras[0])));
    siguiente?.setAttribute(
      "aria-disabled",
      String(completa(figuras[figuras.length - 1])),
    );
  };

  const actualizar = () => {
    ajustarAlto();
    actualizarEstado();
  };

  // IntersectionObserver avisa solo cuando una figura cruza un umbral:
  // no hace falta medir el layout en cada evento de scroll.
  const interseccion = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => proporciones.set(e.target, e.intersectionRatio));
      actualizar();
    },
    { root: track, threshold: [0, UMBRAL_VISIBLE, UMBRAL_COMPLETA, 1] },
  );
  const tamano = new ResizeObserver(actualizar);
  figuras.forEach((figura) => {
    interseccion.observe(figura);
    tamano.observe(figura);
  });

  anterior?.addEventListener("click", () => {
    if (anterior.getAttribute("aria-disabled") === "true") return;
    track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
  });
  siguiente?.addEventListener("click", () => {
    if (siguiente.getAttribute("aria-disabled") === "true") return;
    track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
  });
}
