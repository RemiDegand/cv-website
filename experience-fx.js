// Experience page, dynamic key experience (3 Nov 2026, web design pass). Loaded by experience.html
// only, after script.js. Styles in experience-fx.css, all switched on by the .xfx class on <html>.
// Without JavaScript or with "reduce motion", nothing here runs and the page stays still.
(() => {
  // 3 timelines since 7 Nov 2026 (Key experience, Leadership & volunteering, Hands-on): each has its own line;
  // the spotlight is shared, so only one experience on the whole page is lit at a time
  const timelines = [...document.querySelectorAll(".xp-timeline")];
  if (!timelines.length || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const items = timelines.flatMap((tl) => [...tl.querySelectorAll(".xp-item")]);
  const brandOf = (el) => getComputedStyle(el).getPropertyValue("--brand").trim() || getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#2563eb";
  document.documentElement.classList.add("xfx");

  // 1. The line of each timeline: coloured with each company's colour at the height of its logo, cut at the scroll position
  const lines = timelines.map((timeline) => {
    const line = document.createElement("span");
    line.className = "xfx-line";
    const head = document.createElement("span");
    head.className = "xfx-head";
    [line, head].forEach((el) => { el.setAttribute("aria-hidden", "true"); timeline.prepend(el); });
    return { timeline, line, head, items: [...timeline.querySelectorAll(".xp-item")] };
  });

  const paint = () => lines.forEach(({ timeline, line, items: its }) => {
    const height = timeline.offsetHeight || 1;
    const stops = its.map((item) => {
      const dot = item.querySelector(".xp-dot");
      const y = ((item.offsetTop + (dot ? dot.offsetTop + dot.offsetHeight / 2 : 40)) / height) * 100;
      return `${brandOf(item)} ${y.toFixed(1)}%`;
    });
    line.style.setProperty("--grad", `linear-gradient(180deg, ${stops.join(", ")})`);
  });

  // The line's tip follows a point a little below the middle of the screen; every logo above it is "lit",
  // the last lit one on the page is the current experience
  // Arriving on one experience from a link (e.g. experience.html#oslo from the Education page): the
  // browser puts that card at the top of the screen, above the line's tip, so it would be dimmed and
  // the card below lit. Until the visitor scrolls, that experience is the one in the light instead.
  const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
  let pinned = target ? target.closest(".xp-item") : null;
  if (pinned) {
    const unpin = () => { pinned = null; queue(); };
    ["wheel", "touchmove", "keydown", "mousedown"].forEach((type) => addEventListener(type, unpin, { once: true, passive: true }));
    // the logos load after the first jump and change the heights: jump to the card again once they have
    addEventListener("load", () => { if (pinned) { target.scrollIntoView({ block: "start", behavior: "instant" }); queue(); } });
  }

  let queued = false;
  const update = () => {
    queued = false;
    let tip = innerHeight * 0.55;
    if (pinned) {   // the line stops at the pinned experience's logo
      const dot = pinned.querySelector(".xp-dot").getBoundingClientRect();
      tip = dot.top + dot.height / 2;
    }
    let active = null;
    lines.forEach(({ timeline, head, items: its }) => {
      const box = timeline.getBoundingClientRect();
      const p = Math.min(Math.max((tip - box.top) / box.height, 0), 1);
      timeline.style.setProperty("--p", (p * 100).toFixed(2) + "%");
      const tipY = box.top + p * box.height;
      let last = null;
      its.forEach((item) => {
        const r = item.querySelector(".xp-dot").getBoundingClientRect();
        const lit = r.top + r.height / 2 <= tipY + 1;
        item.classList.toggle("is-lit", lit);
        if (lit) last = item;
      });
      if (last) active = last;
      head.style.setProperty("--head", brandOf(last || its[0]));
    });
    items.forEach((item) => item.classList.toggle("is-active", item === active));
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
    const chapters = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
      entry.target.classList.add("in");
      chapters.unobserve(entry.target);
    }), { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".xp-chapter").forEach((ch) => chapters.observe(ch));
  } else {
    items.forEach((item) => item.classList.add("in"));
    document.querySelectorAll(".xp-chapter").forEach((ch) => ch.classList.add("in"));
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

