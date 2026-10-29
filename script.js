// The menu link of the current page is marked "active" directly in each HTML file.

// Home: key experience and key projects carousels (one card at a time; arrows + dots in a row underneath).
document.querySelectorAll(".carousel").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const cards = [...track.children];
  const [prev, next] = carousel.parentElement.querySelectorAll(".carousel-arrow");   // in the nav row under the carousel
  const dotsBox = carousel.parentElement.querySelector(".carousel-dots");

  const current = () => Math.round(track.scrollLeft / (cards[1].offsetLeft - cards[0].offsetLeft));
  const goTo = (i) => track.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft });

  const dots = cards.map((card, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Show card " + (i + 1) + " of " + cards.length);
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

// Projects page: every project card as tall as the tallest one, across all the categories
// (cards 2 per row only; on phones each card keeps its own height). Measured again once the
// font is loaded and when the window is resized.
const catCards = [...document.querySelectorAll(".cat-grid .card")];
if (catCards.length) {
  const twoColumns = matchMedia("(min-width: 721px)");
  const root = document.documentElement;
  const equalize = () => {
    root.style.removeProperty("--card-h");
    if (!twoColumns.matches) return;
    root.style.setProperty("--card-h", Math.max(...catCards.map((card) => card.offsetHeight)) + "px");
  };
  equalize();
  document.fonts.ready.then(equalize);
  addEventListener("resize", equalize);

  // Filters: one business area at a time (All = every area) and the "Uses AI" switch, combined.
  // Hides the cards that don't match, then each category left empty (its section and its tile).
  // Every button shows how many projects it would give with the other filter as it is; a button
  // that would give none is disabled, so the page is never empty
  const filters = document.querySelector(".filters");
  if (filters) {
    const chips = [...filters.querySelectorAll(".filter-chip")];
    const aiSwitch = filters.querySelector(".filter-switch");
    let area = "";
    let aiOnly = false;
    const matches = (card, a, ai) => (!a || card.dataset.areas.split(" ").includes(a)) && (!ai || card.dataset.ai === "true");
    const count = (a, ai) => catCards.filter((card) => matches(card, a, ai)).length;
    const update = () => {
      catCards.forEach((card) => { card.hidden = !matches(card, area, aiOnly); });
      document.querySelectorAll(".cat-section").forEach((section) => {
        const empty = !section.querySelector(".card:not([hidden])");
        section.hidden = empty;
        document.querySelector(`.cat-tile[href="#${section.id}"]`).hidden = empty;
      });
      chips.forEach((chip) => {
        const n = count(chip.dataset.area, aiOnly);
        chip.setAttribute("aria-pressed", chip.dataset.area === area);
        chip.querySelector(".filter-count").textContent = n;
        chip.disabled = n === 0;
      });
      const nAi = count(area, true);
      aiSwitch.setAttribute("aria-checked", aiOnly);
      aiSwitch.querySelector(".filter-count").textContent = nAi;
      aiSwitch.disabled = nAi === 0 && !aiOnly;
      equalize();
    };
    chips.forEach((chip) => chip.addEventListener("click", () => { area = chip.dataset.area; update(); }));
    aiSwitch.addEventListener("click", () => { aiOnly = !aiOnly; update(); });
    filters.hidden = false;
    update();
  }
}

// Project pages: report viewer like Looker. Tabs, ‹ › arrows and the left/right keys on a tab switch
// the page shown. Two kinds:
//  - one tab per sales team (aged receivables): the team icons above follow the tabs, a click on an
//    icon shows its team;
//  - one tab per report page, with data-by-team on the .report (sales performance): the team icons
//    choose the team, and the page shown is the panel "<tab's aria-controls>-team-<n>".
document.querySelectorAll(".report").forEach((report) => {
  const tabs = [...report.querySelectorAll('[role="tab"]')];
  const arrows = report.querySelectorAll(".report-arrow");
  const count = report.querySelector(".report-count");
  const byTeam = report.hasAttribute("data-by-team");
  // Sales team icons above the report: the team shown is black, and its name is written next to them
  const part = report.closest(".block-part");
  const people = part ? [...part.querySelectorAll(".persona-icons .persona-icon")] : [];
  const personaName = part && part.querySelector(".persona-name");
  const teams = byTeam ? people.length : 1;
  const panel = (t, k) => document.getElementById(tabs[t].getAttribute("aria-controls") + (byTeam ? "-team-" + (k + 1) : ""));
  let current = 0;
  let team = 0;

  const show = (i, focus) => {
    current = Math.max(0, Math.min(tabs.length - 1, i));
    tabs.forEach((tab, t) => {
      const on = t === current;
      tab.setAttribute("aria-selected", on);
      tab.tabIndex = on ? 0 : -1;
      for (let k = 0; k < teams; k++) panel(t, k).hidden = !(on && k === team);
    });
    if (focus) tabs[current].focus();
    count.textContent = `Page ${current + 1} of ${tabs.length}`;
    const who = byTeam ? team : current;
    people.forEach((icon, p) => icon.classList.toggle("active", p === who));
    if (personaName) personaName.textContent = byTeam ? `Sales Team ${team + 1}` : "Sales " + tabs[current].textContent;
    arrows[0].disabled = current === 0;
    arrows[1].disabled = current === tabs.length - 1;
  };

  tabs.forEach((tab, t) => {
    tab.addEventListener("click", () => show(t));
    tab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") show(current + 1, true);
      if (e.key === "ArrowLeft") show(current - 1, true);
    });
  });
  arrows.forEach((arrow) => arrow.addEventListener("click", () => show(current + Number(arrow.dataset.dir))));
  people.forEach((icon, p) => icon.addEventListener("click", () => {
    if (byTeam) { team = p; show(current); } else show(p);
  }));
  // Load the hidden pages once the page is ready, so switching team is instant
  window.addEventListener("load", () => report.querySelectorAll("img").forEach((img) => (img.loading = "eager")));
  show(0);
});

// Project pages: before / after switch (production plan). A tab shows its view; the left/right keys
// on a tab move to the other one.
document.querySelectorAll(".compare").forEach((box) => {
  const tabs = [...box.querySelectorAll('[role="tab"]')];
  const show = (i, focus) => {
    tabs.forEach((tab, t) => {
      tab.setAttribute("aria-selected", t === i);
      tab.tabIndex = t === i ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = t !== i;
    });
    if (focus) tabs[i].focus();
  };
  tabs.forEach((tab, t) => {
    tab.addEventListener("click", () => show(t));
    tab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") show(Math.min(t + 1, tabs.length - 1), true);
      if (e.key === "ArrowLeft") show(Math.max(t - 1, 0), true);
    });
  });
});

// Project pages: scroll reveal, always top to bottom. Each .reveal (a block's title, then each of
// its parts) appears when it scrolls into view; CSS fades its elements up one after the other.
// Parts that arrive together come in page order (waiting at most 1.2 s), and showing a part also
// shows every part above it, so nothing stays hidden behind the reader (e.g. after a jump from
// the block bar). Without JavaScript, or with "reduce motion", everything is simply shown.
const reveals = [...document.querySelectorAll(".reveal")];
if (reveals.length && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("reveal-on");
  // Number the elements of each part in reading order (--i): its children, and the items of
  // its .reveal-stagger lists (chat messages, bullets, steps, pills, tags) right after their list
  reveals.forEach((part) => {
    let i = 0;
    [...part.children].forEach((child) => {
      child.style.setProperty("--i", i++);
      if (child.matches(".reveal-stagger")) [...child.children].forEach((item) => item.style.setProperty("--i", i++));
    });
  });
  // Show every hidden part up to (and including) index `last`, one after the other
  const showUpTo = (last) => {
    reveals.slice(0, last + 1).filter((el) => !el.classList.contains("is-visible")).forEach((el, i) => {
      el.style.setProperty("--d", `${Math.min(i * 0.3, 1.2)}s`);
      el.classList.add("is-visible");
      observer.unobserve(el);
    });
  };
  const observer = new IntersectionObserver((entries) => {
    const seen = entries.filter((e) => e.isIntersecting).map((e) => reveals.indexOf(e.target));
    if (seen.length) showUpTo(Math.max(...seen));
  }, { rootMargin: "0px 0px -20% 0px" });   // a part appears once it's a fifth of the way up the screen
  reveals.forEach((el) => observer.observe(el));
  // At the bottom of the page (or on a screen taller than the page), show whatever is left
  const showRest = () => {
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) showUpTo(reveals.length - 1);
  };
  addEventListener("scroll", showRest, { passive: true });
  addEventListener("load", showRest);
}

// Project pages: block bar (1 How it started · 2 Context… ). Highlights the block being read
// (the last one whose top has passed 40% of the screen) and marks the ones above as read.
const blockNav = document.querySelector(".block-nav");
if (blockNav) {
  const links = [...blockNav.querySelectorAll("a")];
  const blocks = links.map((link) => document.querySelector(link.hash));
  const update = () => {
    let current = 0;
    blocks.forEach((block, i) => { if (block.getBoundingClientRect().top < innerHeight * 0.4) current = i; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) current = blocks.length - 1;
    links.forEach((link, i) => {
      link.classList.toggle("active", i === current);
      link.classList.toggle("done", i < current);
      if (i === current) link.setAttribute("aria-current", "step");
      else link.removeAttribute("aria-current");
    });
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
}

// VAT page, "How it started": replays the accountant (icon + keyboard in the middle) copying 3 VAT amounts from the ERP into
// Excel, character by character, then the total that doesn't match (the 3rd amount is mistyped).
// Starts once on screen and loops. The HTML holds the final state, kept as is with "reduce motion".
const copySim = document.querySelector(".copy-sim");
if (copySim && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const erpRows = [...copySim.querySelectorAll(".copy-sim-erp tbody tr")];
  const cells = [...copySim.querySelectorAll(".copy-sim-excel tbody [data-typed]")];
  const total = copySim.querySelector(".copy-sim-total");
  const status = copySim.querySelector(".copy-sim-status");
  const finalStatus = status.textContent;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const type = async (cell, speed) => {
    cell.classList.add("is-typing");
    copySim.classList.add("is-keying");   // the accountant's keyboard taps
    for (const ch of cell.dataset.typed) { cell.textContent += ch; await wait(speed); }
    copySim.classList.remove("is-keying");
    await wait(350);
    cell.classList.remove("is-typing");
  };
  const run = async () => {
    for (;;) {
      copySim.classList.remove("is-wrong");
      [...cells, total].forEach((cell) => { cell.textContent = ""; cell.classList.remove("is-red"); });
      await wait(900);
      for (const [i, cell] of cells.entries()) {
        status.textContent = `Copying entry ${i + 1} of ${cells.length} by hand…`;
        erpRows[i].classList.add("is-copying");
        await wait(700);
        await type(cell, 160);
        if (cell.matches(".copy-sim-typo")) cell.classList.add("is-red");   // the mistyped amount turns red as soon as it's written
        erpRows[i].classList.remove("is-copying");
        await wait(300);
      }
      status.textContent = "Adding up the VAT…";
      await type(total, 90);
      await wait(400);
      copySim.classList.add("is-wrong");
      status.textContent = finalStatus;
      await wait(4500);
    }
  };
  const start = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { start.disconnect(); run(); }
  }, { rootMargin: "0px 0px -20% 0px" });
  start.observe(copySim);
}

// Cash flow page, "How it started": on the CFO's desktop, the quarter's entries are copied from the ERP export
// and pasted into the cash flow file, which already holds every past year. Each row takes longer to arrive,
// the file size meter fills up to red, a busy cursor spins, then Excel stops responding and crashes.
// Starts once on screen and loops; the HTML holds the final state, kept as is with "reduce motion".
const pasteSim = document.querySelector(".paste-sim");
if (pasteSim && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const rows = [...pasteSim.querySelectorAll(".paste-grid tbody tr")];
  const tabs = [...pasteSim.querySelectorAll(".paste-tabs span")];
  const newTab = pasteSim.querySelector(".paste-new");
  const newName = newTab.textContent;
  const segments = [...pasteSim.querySelectorAll(".paste-meter-bar i")];
  const calc = pasteSim.querySelector(".paste-calc");
  const title = pasteSim.querySelector(".paste-xl .paste-win-bar");
  const status = pasteSim.querySelector(".paste-status");
  const finalStatus = status.textContent;
  const finalTitle = title.textContent;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const size = (n) => segments.forEach((s, i) => s.classList.toggle("is-on", i < n));   // file size meter
  const activeTab = (tab) => tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
  const run = async () => {
    for (;;) {
      pasteSim.classList.remove("is-selected", "is-flying", "is-busy", "is-frozen", "is-crashed");
      title.textContent = finalTitle.replace(" (Not Responding)", "");
      rows.slice(1).forEach((row) => row.classList.add("is-empty"));   // row 1 = the headers
      newTab.classList.add("is-hidden");
      newTab.textContent = newName;
      activeTab(newTab.nextElementSibling);
      size(6);   // already heavy: every past quarter is in the file
      calc.textContent = "Ready";
      status.textContent = "The new quarter's entries, exported from the ERP.";
      await wait(1500);
      status.textContent = "Copying every entry of the quarter…";
      pasteSim.classList.add("is-selected");
      await wait(1400);
      // A new sheet in front of all the others, renamed by hand after the quarter: the tabs get even narrower
      status.textContent = "Adding one more sheet for the quarter…";
      newTab.textContent = "Sheet" + tabs.length;
      newTab.classList.remove("is-hidden");
      activeTab(newTab);
      await wait(900);
      newTab.textContent = "";
      newTab.classList.add("is-renaming");
      for (const ch of newName) { newTab.textContent += ch; await wait(140); }
      newTab.classList.remove("is-renaming");
      await wait(400);
      status.textContent = "Pasting the entries, next to every past quarter…";
      pasteSim.classList.add("is-flying");
      await wait(1000);
      // Each row takes longer than the one before: the file is getting heavier
      const steps = [[300, 12, 7], [700, 27, 8], [1200, 41, 8], [1700, 52, 9], [2300, 58, 10]];
      for (const [i, [ms, pct, n]] of steps.entries()) {
        await wait(ms);
        rows[i + 1].classList.remove("is-empty");
        calc.textContent = `Calculating: ${pct}%`;
        size(n);
        if (i === 1) { pasteSim.classList.add("is-busy"); status.textContent = "Excel is getting slower…"; }
      }
      await wait(1200);
      pasteSim.classList.add("is-frozen");
      title.textContent = finalTitle;
      status.textContent = "Excel stopped responding…";
      await wait(2500);
      pasteSim.classList.add("is-crashed");
      status.textContent = finalStatus;
      await wait(5000);
    }
  };
  const start = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { start.disconnect(); run(); }
  }, { rootMargin: "0px 0px -20% 0px" });
  start.observe(pasteSim);
}

// Cash flow page, "What I built": the file at work. The user types the period and clicks Refresh, then the file shows
// the account detail, the cash flow statement and the checks. The HTML holds the statement, shown as is without JS.
// Pause / Restart buttons under it (hidden without JS or with "reduce motion", where nothing moves)
const buildSim = document.querySelector(".build-sim");
if (buildSim && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const all = (sel) => [...buildSim.querySelectorAll(sel)];
  const steps = all(".build-steps li");
  const notes = all(".build-notes > .shot-notes");
  const views = all(".build-views > .sheet-canvas");
  const tabs = all(".sheet-tabs span");
  const title = buildSim.querySelector(".monitor-title");
  const button = buildSim.querySelector(".build-refresh");
  const status = buildSim.querySelector(".build-status");
  const inputs = all(".b-in");
  const dates = inputs.map((td) => td.textContent);
  const filled = all(".b-val, .b-cat, .b-gap, .b-ratio");
  const rows = all(".b-row");
  const finalStatus = status.textContent;
  const controls = buildSim.querySelector(".sim-controls");
  const pauseButton = buildSim.querySelector(".build-pause");
  // Pause stops the clock of every wait; Restart makes the current wait fail, so the loop starts over
  let paused = false;
  let restart = false;
  const RESTART = Symbol("restart");
  const wait = (ms) => new Promise((resolve, reject) => {
    let last = performance.now();
    const tick = () => {
      if (restart) return reject(RESTART);
      const now = performance.now();
      if (!paused) ms -= now - last;
      last = now;
      if (ms <= 0) return resolve();
      setTimeout(tick, Math.min(ms, 50));
    };
    tick();
  });
  const setPaused = (value) => {
    paused = value;
    buildSim.classList.toggle("is-paused", paused);
    pauseButton.textContent = paused ? "▶ Play" : "❚❚ Pause";
  };
  pauseButton.addEventListener("click", () => setPaused(!paused));
  buildSim.querySelector(".build-restart").addEventListener("click", () => { restart = true; setPaused(false); });
  const step = (n, text) => {
    steps.forEach((li, i) => { li.classList.toggle("is-done", i < n); li.classList.toggle("is-on", i === n); });
    notes.forEach((set, i) => set.classList.toggle("is-shown", i === Math.min(n, notes.length - 1)));   // the last step keeps its notes
    status.textContent = text;
  };
  const show = (view, sheet) => {
    views.forEach((v) => v.classList.toggle("is-shown", v.dataset.view === view));
    tabs.forEach((t) => t.classList.toggle("on", t.textContent === sheet));
    title.textContent = "Excel · " + sheet;
  };
  const reveal = async (els, ms) => {
    for (const el of els) { el.classList.remove("is-blank", "is-empty"); el.classList.add("is-new"); await wait(ms); }
  };
  // One pass of the simulation, from the empty file to the checks
  const play = async () => {
    buildSim.classList.remove("is-loading");
    button.classList.remove("is-hover", "is-pressed");
    all(".is-new").forEach((el) => el.classList.remove("is-new"));
    filled.forEach((el) => el.classList.add("is-blank"));
    rows.forEach((row) => row.classList.add("is-empty"));
    inputs.forEach((td) => { td.textContent = ""; td.classList.remove("is-typing"); });
    show("statement", "Cash flow");
    step(0, "The user picks the start and end of the period.");
    await wait(900);
    for (const [i, td] of inputs.entries()) {
      td.classList.add("is-typing");
      for (const ch of dates[i]) { td.textContent += ch; await wait(90); }
      await wait(300);
      td.classList.remove("is-typing");
    }
    await wait(500);
    step(1, "One click on Refresh: MyReport loads the day's entries from the ERP. Nothing is stored in the file.");
    button.classList.add("is-hover");
    await wait(700);
    button.classList.add("is-pressed");
    await wait(250);
    button.classList.remove("is-pressed", "is-hover");
    buildSim.classList.add("is-loading");
    await wait(2000);
    buildSim.classList.remove("is-loading");
    step(2, "Every account with its balances; a mapping table gives each one its cash flow category.");
    show("accounts", "Check");
    await wait(500);
    await reveal(rows, 180);
    await wait(300);
    await reveal(all(".b-cat"), 260);
    await wait(1800);
    step(3, "The cash flow statement for the period: operating, investing and financing cash flow, then the change in cash.");
    show("statement", "Cash flow");
    await wait(500);
    await reveal(all(".b-val"), 110);
    await wait(2400);
    step(4, "The control table: every check must be 0, so an inconsistency shows up at once. Then the financial ratios.");
    show("checks", "Check");
    await wait(500);
    await reveal(all(".b-gap"), 300);
    await wait(300);
    await reveal(all(".b-ratio"), 250);
    await wait(1500);
    step(5, finalStatus);
    await wait(4000);
  };
  // Starts over at the end, or as soon as Restart is clicked
  const run = async () => {
    controls.hidden = false;
    for (;;) {
      try { await play(); }
      catch (e) { if (e !== RESTART) throw e; restart = false; }
    }
  };
  const start = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { start.disconnect(); run(); }
  }, { rootMargin: "0px 0px -20% 0px" });
  start.observe(buildSim);
}

// Later: chatbot window (Phase 2).
