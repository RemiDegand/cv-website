// Projects page, upgrade (3 Nov 2026, web design pass). Loaded by projects.html only, after
// script.js (which handles the filters and the equal card heights). Styles in projects-fx.css,
// switched on by the .pfx class on <html>. The cards and tiles are generated from
// content/projects.json: everything here reads them, nothing here needs editing when projects change.
(() => {
  const page = document.getElementById("projects");
  const overview = page && page.querySelector(".cat-overview");
  if (!overview) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const sections = [...page.querySelectorAll(".cat-section")];
  const cards = [...page.querySelectorAll(".cat-grid > .card.project")];
  const tiles = [...overview.querySelectorAll(".cat-tile")];
  document.documentElement.classList.add("pfx");
  tiles.forEach((tile, i) => tile.style.setProperty("--i", i));
  sections.forEach((section) => [...section.querySelectorAll(".cat-grid > .card")].forEach((card, i) => card.style.setProperty("--i", i)));

  // 1. Numbers under the title, counted from the cards (stay right when projects are added)
  const companies = new Set(cards.map((card) => (card.querySelector(".project-org")?.textContent || "").split("·")[0].trim()).filter(Boolean));
  const stats = [
    [cards.length, "project", "projects", ""],
    [companies.size, "company", "companies", ""],
    [sections.length, "category", "categories", ""],
    [cards.filter((card) => card.dataset.ai === "true").length, "uses AI", "use AI", "stat-ai"],
  ];
  const list = document.createElement("ul");
  list.className = "proj-stats";
  list.setAttribute("aria-label", "In numbers");
  stats.forEach(([n, one, many, cls]) => {
    const li = document.createElement("li");
    if (cls) li.className = cls;
    li.innerHTML = `<strong data-count="${n}">${n}</strong>${n === 1 ? one : many}`;
    list.append(li);
  });
  (page.querySelector(".projects-lead") || page.querySelector(".page-title")).after(list);
  if (!reduce) {
    list.querySelectorAll("[data-count]").forEach((el) => {
      const end = Number(el.dataset.count), start = performance.now() + 300, duration = 1000;
      el.textContent = "0";
      const step = (now) => {
        const t = Math.min(Math.max((now - start) / duration, 0), 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      setTimeout(() => { el.textContent = end; }, 300 + duration + 400);   // safety net: always ends on the real number
    });
  }

  // 2. Sticky category bar: same links as the overview tiles, shown once the tiles are passed
  const nav = document.createElement("nav");
  nav.className = "proj-nav";
  nav.setAttribute("aria-label", "Jump to a category");
  const inner = document.createElement("div");
  inner.className = "proj-nav-inner";
  const bar = document.createElement("span");
  bar.className = "proj-nav-bar";
  bar.setAttribute("aria-hidden", "true");
  const links = tiles.map((tile) => {
    const a = document.createElement("a");
    a.href = tile.getAttribute("href");
    const icon = tile.querySelector(".cat-icon svg");
    a.innerHTML = (icon ? icon.outerHTML : "") + `<span>${tile.querySelector("strong").textContent}</span>`;
    a.hidden = tile.hidden;
    inner.append(a);
    return a;
  });
  inner.append(bar);
  nav.append(inner);
  (page.querySelector(".filters") || overview).after(nav);

  // the filters hide tiles (and their sections): hide the matching links too
  new MutationObserver(() => { tiles.forEach((tile, i) => { links[i].hidden = tile.hidden; }); queue(); })
    .observe(overview, { attributes: true, subtree: true, attributeFilter: ["hidden"] });

  const menuHeight = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--menu-height")) || 64;
  let current = null, queued = false;
  const moveBar = (link) => {
    if (!link || link.hidden) { bar.style.width = "0px"; return; }
    bar.style.width = link.offsetWidth + "px";
    bar.style.transform = `translateX(${link.offsetLeft}px)`;
  };
  const update = () => {
    queued = false;
    const top = menuHeight();
    nav.classList.toggle("is-shown", overview.getBoundingClientRect().bottom < top);
    // current category: the last visible section whose top has passed under the bar
    const line = top + 90;
    let found = null;
    sections.forEach((section) => { if (!section.hidden && section.getBoundingClientRect().top <= line) found = section; });
    if (!found) found = sections.find((s) => !s.hidden) || null;
    if (found !== current) {
      current = found;
      sections.forEach((s) => s.classList.toggle("is-current", s === current));
      links.forEach((a) => a.classList.toggle("is-current", current && a.getAttribute("href") === "#" + current.id));
      const link = links.find((a) => a.classList.contains("is-current"));
      moveBar(link);
      if (link && nav.classList.contains("is-shown")) link.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", () => { moveBar(links.find((a) => a.classList.contains("is-current"))); queue(); });
  update();

  // 3. Sections come in as you scroll; cards shown again by a filter pop back in
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) { entry.target.classList.add("in"); io.unobserve(entry.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    sections.forEach((s) => io.observe(s));
    new MutationObserver((records) => records.forEach((r) => {
      const card = r.target;
      if (!card.hidden && r.oldValue !== null) {   // was hidden, now shown
        card.classList.remove("pfx-back");
        void card.offsetWidth;   // restart the animation
        card.classList.add("pfx-back");
        card.addEventListener("animationend", () => card.classList.remove("pfx-back"), { once: true });
      }
    })).observe(page, { attributes: true, subtree: true, attributeFilter: ["hidden"], attributeOldValue: true });
  } else {
    sections.forEach((s) => s.classList.add("in"));
  }

  // 4. Cards: arrow button, slight tilt towards the mouse with a light in the company colour
  cards.forEach((card) => {
    const go = document.createElement("span");
    go.className = "proj-go";
    go.setAttribute("aria-hidden", "true");
    go.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    card.append(go);
    if (!finePointer || reduce) return;
    let frame = 0;
    card.addEventListener("pointermove", (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--ry", ((x - 0.5) * 5).toFixed(2) + "deg");
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
})();
