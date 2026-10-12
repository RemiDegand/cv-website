// The menu link of the current page is marked "active" directly in each HTML file.

// Home: key experience carousel (arrows + dots, one card at a time).
document.querySelectorAll(".carousel").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const cards = [...track.children];
  const [prev, next] = carousel.querySelectorAll(".carousel-arrow");
  const dotsBox = carousel.parentElement.querySelector(".carousel-dots");

  const current = () => Math.round(track.scrollLeft / (cards[1].offsetLeft - cards[0].offsetLeft));
  const goTo = (i) => track.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft });

  const dots = cards.map((card, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Show experience " + (i + 1) + " of " + cards.length);
    dot.addEventListener("click", () => goTo(i));
    dotsBox.append(dot);
    return dot;
  });

  const update = () => {
    const i = current();
    prev.disabled = i === 0;
    next.disabled = i === cards.length - 1;
    dots.forEach((dot, j) => dot.classList.toggle("active", j === i));
  };

  [prev, next].forEach((arrow) =>
    arrow.addEventListener("click", () => goTo(Math.min(Math.max(current() + Number(arrow.dataset.dir), 0), cards.length - 1)))
  );
  track.addEventListener("scroll", update, { passive: true });
  update();
});

// Education: click a school to open its details on the right (under the school on phones).
const eduLayout = document.querySelector(".edu-layout");
if (eduLayout) {
  const panel = document.getElementById("edu-detail");
  const items = [...eduLayout.querySelectorAll(".edu-item")];
  const phone = window.matchMedia("(max-width: 720px)");
  let selected = null;

  // Desktop: panel in the right column, level with the selected school (its "<" arrow points at it).
  // Phone: panel right after the selected school.
  const timeline = eduLayout.querySelector(".timeline");
  const placePanel = () => {
    if (selected && phone.matches) selected.after(panel);
    else eduLayout.append(panel);
    const offset = selected ? selected.getBoundingClientRect().top - timeline.getBoundingClientRect().top : 0;
    panel.style.setProperty("--panel-offset", Math.max(offset, 0) + "px");
  };

  const close = () => {
    if (!selected) return;
    selected.setAttribute("aria-expanded", "false");
    selected.focus();
    selected = null;
    panel.hidden = true;
    eduLayout.classList.remove("has-detail");
  };

  const open = (item) => {
    if (selected) selected.setAttribute("aria-expanded", "false");
    selected = item;
    item.setAttribute("aria-expanded", "true");
    panel.replaceChildren(document.getElementById("detail-" + item.dataset.school).content.cloneNode(true));
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "edu-close";
    closeButton.setAttribute("aria-label", "Close details");
    closeButton.textContent = "×";
    closeButton.addEventListener("click", close);
    panel.prepend(closeButton);
    eduLayout.classList.add("has-detail");   // first, so the timeline has its final (narrower) width
    panel.hidden = false;
    placePanel();
    // Replay the opening animation when switching school
    panel.style.animation = "none";
    panel.offsetHeight;
    panel.style.animation = "";
  };

  const toggle = (item) => (item === selected ? close() : open(item));

  items.forEach((item) => {
    item.addEventListener("click", () => toggle(item));
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle(item);
      }
    });
  });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  phone.addEventListener("change", placePanel);
  window.addEventListener("resize", placePanel);   // school text may wrap differently
}

// Later: chatbot window (Phase 2).
