// Experience page, dynamic key experience (3 Nov 2026, web design pass). Loaded by experience.html
// only, after script.js. Styles in experience-fx.css, all switched on by the .xfx class on <html>.
// Without JavaScript or with "reduce motion", nothing here runs and the page stays still.
(() => {
  const timeline = document.querySelector(".xp-timeline");
  if (!timeline || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const items = [...timeline.querySelectorAll(".xp-item")];
  const brandOf = (el) => getComputedStyle(el).getPropertyValue("--brand").trim() || getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#2563eb";
  document.documentElement.classList.add("xfx");

  // 1. The line: coloured with each company's colour at the height of its logo, cut at the scroll position
  const line = document.createElement("span");
  line.className = "xfx-line";
  const head = document.createElement("span");
  head.className = "xfx-head";
  [line, head].forEach((el) => { el.setAttribute("aria-hidden", "true"); timeline.prepend(el); });

  const paint = () => {
    const height = timeline.offsetHeight || 1;
    const stops = items.map((item) => {
      const dot = item.querySelector(".xp-dot");
      const y = ((item.offsetTop + (dot ? dot.offsetTop + dot.offsetHeight / 2 : 40)) / height) * 100;
      return `${brandOf(item)} ${y.toFixed(1)}%`;
    });
    line.style.setProperty("--grad", `linear-gradient(180deg, ${stops.join(", ")})`);
  };

  // The line's tip follows a point a little below the middle of the screen; every logo above it is "lit",
  // the last lit one is the current experience
  // Arriving on one experience from a link (e.g. experience.html#oslo from the Education page): the
  // browser puts that card at the top of the screen, above the line's tip, so it would be dimmed and
  // the card below lit. Until the visitor scrolls, that experience is the one in the light instead.
  const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
  let pinned = target && timeline.contains(target) ? target.closest(".xp-item") : null;
  if (pinned) {
    const unpin = () => { pinned = null; queue(); };
    ["wheel", "touchmove", "keydown", "mousedown"].forEach((type) => addEventListener(type, unpin, { once: true, passive: true }));
    // the logos load after the first jump and change the heights: jump to the card again once they have
    addEventListener("load", () => { if (pinned) { target.scrollIntoView({ block: "start", behavior: "instant" }); queue(); } });
  }

  let queued = false;
  const update = () => {
    queued = false;
    const box = timeline.getBoundingClientRect();
    let tip = innerHeight * 0.55;
    if (pinned) {   // the line stops at the pinned experience's logo
      const dot = pinned.querySelector(".xp-dot").getBoundingClientRect();
      tip = dot.top + dot.height / 2;
    }
    const p = Math.min(Math.max((tip - box.top) / box.height, 0), 1);
    timeline.style.setProperty("--p", (p * 100).toFixed(2) + "%");
    const tipY = box.top + p * box.height;
    let active = null;
    items.forEach((item) => {
      const dot = item.querySelector(".xp-dot");
      const r = dot.getBoundingClientRect();
      const lit = r.top + r.height / 2 <= tipY + 1;
      item.classList.toggle("is-lit", lit);
      if (lit) active = item;
    });
    items.forEach((item) => item.classList.toggle("is-active", item === active));
    head.style.setProperty("--head", active ? brandOf(active) : brandOf(items[0]));
  };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", () => { paint(); queue(); });
  addEventListener("load", () => { paint(); queue(); });   // logos change the heights once loaded
  paint();
  update();

  // 2. Each experience appears when it comes into view; its figures count up
  items.forEach((item) => {
    item.querySelectorAll(".figures li").forEach((li, i) => li.style.setProperty("--t", i));
    item.querySelectorAll(".tags li").forEach((li, i) => li.style.setProperty("--t", i));
  });
  const countUp = (item) => {
    item.querySelectorAll(".figures strong").forEach((el) => {
      const m = el.textContent.match(/^(\D*)(\d+)(\D*)$/);   // "5", "+8 pts", "€49k", "84+", "100%"; skips "€350k → €8k"
      if (!m) return;
      const [, before, digits, after] = m, end = Number(digits), start = performance.now(), duration = 1100;
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        el.textContent = before + Math.round(end * (1 - Math.pow(1 - t, 3))) + after;
        if (t < 1) requestAnimationFrame(step);
      };
      el.textContent = before + "0" + after;
      setTimeout(() => requestAnimationFrame(step), 450);
    });
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
      entry.target.classList.add("in");
      countUp(entry.target);
      io.unobserve(entry.target);
    }), { rootMargin: "0px 0px -10% 0px" });
    items.forEach((item) => io.observe(item));
  } else {
    items.forEach((item) => item.classList.add("in"));
  }

  // 3. Cards tilt a little towards the mouse, with a soft light where it is
  if (finePointer) {
    items.forEach((item) => {
      const card = item.querySelector(".xp-card");
      if (!card) return;
      let frame = 0;
      card.addEventListener("pointermove", (e) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          card.style.setProperty("--ry", ((x - 0.5) * 4).toFixed(2) + "deg");
          card.style.setProperty("--rx", ((0.5 - y) * 5).toFixed(2) + "deg");
          card.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
          card.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
        });
      });
      card.addEventListener("pointerleave", () => {
        cancelAnimationFrame(frame);
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }
})();

// Other experiences (Leadership & volunteering, Hands-on), 4 Nov 2026 web design pass. Styles at the end
// of experience-fx.css. Adds an icon + count to each group title, marks Hands-on rows as compact, puts the
// group name on top of the details card, and makes the rows come in one after the other (not with
// "reduce motion"). script.js still builds the details card; this only decorates it.
(() => {
  const browse = document.querySelector(".xp-browse");
  if (!browse) return;
  const list = browse.querySelector(".xp-list");
  const detail = browse.querySelector(".xp-detail");
  const svg = (d) => `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const icons = [
    svg('<path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20"/><circle cx="9" cy="7.5" r="3.5"/><path d="M22 20v-1.5a4 4 0 0 0-3-3.9M16 4.1a3.5 3.5 0 0 1 0 6.8"/>'),
    svg('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>'),
  ];
  const rows = [...list.querySelectorAll(".xp-row")];

  list.querySelectorAll(".group-title").forEach((title, g) => {
    title.dataset.label = title.textContent.trim();
    let n = 0;
    for (let el = title.nextElementSibling; el && !el.classList.contains("group-title"); el = el.nextElementSibling) {
      if (!el.classList.contains("xp-row")) continue;
      n++;
      if (g > 0) el.classList.add("xm-compact");
    }
    const icon = document.createElement("span");
    icon.className = "xm-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = icons[g] || icons[0];
    const count = document.createElement("span");
    count.className = "xm-count";
    count.setAttribute("aria-hidden", "true");
    count.textContent = n;
    title.prepend(icon);
    title.append(count);
  });

  const groupOf = (row) => {
    let el = row.previousElementSibling;
    while (el && !el.classList.contains("group-title")) el = el.previousElementSibling;
    return el;
  };
  const decorate = () => {
    const card = detail.querySelector(".card");
    if (!card || card.querySelector(".xm-kicker")) return;
    const row = list.querySelector(".xp-row.selected");
    const group = row && groupOf(row);
    if (group) {
      const kicker = document.createElement("p");
      kicker.className = "xm-kicker";
      kicker.textContent = group.dataset.label;
      card.prepend(kicker);
    }
    card.querySelectorAll(".figures li").forEach((li, i) => li.style.setProperty("--t", i));
  };
  new MutationObserver(decorate).observe(detail, { childList: true });
  decorate();

  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("xm-motion");
  rows.forEach((row, i) => row.style.setProperty("--i", i));
  const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
    const row = entry.target;
    row.classList.add("in");
    setTimeout(() => row.classList.add("xm-done"), 600 + rows.indexOf(row) * 45);
    io.unobserve(row);
  }), { rootMargin: "0px 0px -5% 0px" });
  rows.forEach((row) => io.observe(row));
})();
