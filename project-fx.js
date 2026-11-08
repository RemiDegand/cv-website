// Web Designer (8 Nov 2026): project pages. A dashboard taller than its screen scrolls inside it (.screen-scroll).
// The "Scroll" pill shows only when there is more to see, and fades out once the visitor has scrolled (back at the top, it returns).
// A ResizeObserver re-checks when a hidden page (tab, team) is shown or the image loads.
document.querySelectorAll(".screen-scroll").forEach((box) => {
  const screen = box.closest(".monitor-screen");
  if (!screen) return;
  const update = () => {
    screen.classList.toggle("has-scroll", box.scrollHeight > box.clientHeight + 4);
    screen.classList.toggle("is-scrolled", box.scrollTop > 24);
  };
  box.addEventListener("scroll", update, { passive: true });
  box.querySelectorAll("img").forEach((img) => img.addEventListener("load", update));
  if ("ResizeObserver" in window) new ResizeObserver(update).observe(box);
  update();
});
