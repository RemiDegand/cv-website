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

// Education: click a school to "zoom in" on it: its details open on its right (under it on
// phones) and the schools below glide down to make room.
const timeline = document.querySelector(".timeline");
if (timeline) {
  const items = [...timeline.querySelectorAll(".edu-item")];
  const closeButton = document.querySelector(".edu-close");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const DURATION = 400;
  const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";   // fast start, soft landing
  let selected = null;

  // One details card per school, built from its <template> and placed right after the school
  const cards = items.map((item) => {
    const school = item.dataset.school;
    const card = document.createElement("aside");
    card.className = "card edu-detail";
    card.id = "edu-detail-" + school;
    card.hidden = true;
    card.append(document.getElementById("detail-" + school).content.cloneNode(true));
    item.after(card);
    return card;
  });

  // Copy of the card being closed, left in place for a moment so it can fade out
  const fadeOut = (card) => {
    const ghost = card.cloneNode(true);
    ghost.removeAttribute("id");
    ghost.setAttribute("aria-hidden", "true");
    Object.assign(ghost.style, {
      position: "absolute", top: card.offsetTop + "px", left: card.offsetLeft + "px",
      width: card.offsetWidth + "px", margin: "0", gridColumn: "auto", animation: "none", pointerEvents: "none",
    });
    timeline.append(ghost);
    ghost.animate([{ opacity: 1 }, { opacity: 0, transform: "scale(0.97)" }], { duration: 200, easing: "ease-out" })
      .finished.then(() => ghost.remove());
  };

  // Scroll only when the school is hidden under the menu or low on the screen
  const reveal = (item) => {
    const top = item.getBoundingClientRect().top;
    if (top < 80 || top > window.innerHeight * 0.6) {
      item.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    }
  };

  // Smooth layout change ("FLIP" technique): note where every school is, apply the change,
  // then slide each school from its old place to its new one. Only transforms are animated,
  // so the browser doesn't recompute the layout at every frame (no lag).
  const animate = (change, revealItem) => {
    if (reduceMotion.matches) {
      change();
      if (revealItem) reveal(revealItem);
      return;
    }
    const before = items.map((item) => item.getBoundingClientRect().top);   // includes any slide in progress
    const oldHeight = timeline.offsetHeight;
    const openCard = cards.find((card) => !card.hidden);
    if (openCard) fadeOut(openCard);
    [timeline, ...items].forEach((el) => el.getAnimations().forEach((a) => a.cancel()));

    change();

    const newHeight = timeline.offsetHeight;
    const moves = items.map((item, i) => before[i] - item.getBoundingClientRect().top);
    if (revealItem) reveal(revealItem);   // scrolls at the same time as the slide, not after
    items.forEach((item, i) => {
      if (moves[i]) item.animate([{ transform: `translateY(${moves[i]}px)` }, { transform: "none" }], { duration: DURATION, easing: EASE });
    });
    // The timeline line grows/shrinks with the schools (and the footer follows smoothly)
    timeline.animate([{ height: oldHeight + "px" }, { height: newHeight + "px" }], { duration: DURATION, easing: EASE });
  };

  // Show the details of one school only (null = back to the plain timeline)
  const show = (item) => {
    selected = item;
    timeline.classList.toggle("zoomed", item !== null);
    items.forEach((other, i) => {
      const isSelected = other === item;
      other.classList.toggle("selected", isSelected);
      other.setAttribute("aria-expanded", String(isSelected));
      cards[i].hidden = !isSelected;
    });
    closeButton.hidden = item === null;
  };

  // Also used to switch school: the old card fades out while the new one zooms in
  const open = (item) => animate(() => show(item), item);

  const close = () => {
    if (!selected) return;
    const last = selected;
    animate(() => show(null));
    last.focus({ preventScroll: true });
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
  closeButton.addEventListener("click", close);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
}

// Experience: other experiences. Click a row to show its card (from its <template>) on the
// right, or right under the row on phones. The first row is open when the page loads.
const xpBrowse = document.querySelector(".xp-browse");
if (xpBrowse) {
  const list = xpBrowse.querySelector(".xp-list");
  const detail = xpBrowse.querySelector(".xp-detail");
  const rows = list.querySelectorAll(".xp-row");
  const phone = window.matchMedia("(max-width: 720px)");

  function show(row) {
    rows.forEach((r) => {
      r.classList.toggle("selected", r === row);
      r.setAttribute("aria-pressed", r === row);
    });
    detail.replaceChildren(document.getElementById("xp-" + row.dataset.id).content.cloneNode(true));
    if (phone.matches) row.after(detail);
    else if (detail.parentElement !== xpBrowse) xpBrowse.appendChild(detail);
  }

  rows.forEach((row) => row.addEventListener("click", () => show(row)));
  phone.addEventListener("change", () => show(list.querySelector(".xp-row.selected")));
  show(rows[0]);
}

// Later: chatbot window (Phase 2).
