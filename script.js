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

// Every simulation of the site works the same way (nothing moves without JS or with "reduce motion": the HTML holds its final state):
// - it starts only on a click on its start button, over its faded final state (simStart);
// - a click on it pauses it, another click resumes it (simClock; its wait stops counting during a pause);
// - at its end its content fades and a restart arrow appears, until it is clicked (restartAtEnd).
const simClocks = new WeakMap();
const simClock = (stage, { ignore = "button, a", onChange } = {}) => {
  let paused = false, playing = false;
  stage.classList.add("sim-stage");
  const badge = document.createElement("span");
  badge.className = "sim-paused";
  badge.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M7 5l13 7-13 7z"/></svg>Paused: click to resume';
  badge.hidden = true;
  stage.append(badge);
  const setPaused = (value) => {
    paused = value;
    badge.hidden = !paused;
    stage.classList.toggle("is-paused", paused);
    onChange?.(paused);
  };
  stage.addEventListener("click", (event) => {
    if (playing && !event.target.closest(ignore)) setPaused(!paused);
  });
  const clock = {
    stage,
    setPaused,
    isPaused: () => paused,
    play: (on) => { playing = on; stage.classList.toggle("is-playable", on); if (!on) setPaused(false); },
    wait: async (ms) => {
      let left = ms;
      while (left > 0) {
        const step = Math.min(left, 50);
        await new Promise((resolve) => setTimeout(resolve, step));
        if (!paused) left -= step;
      }
    },
  };
  simClocks.set(stage, clock);
  return clock;
};
const simButton = (stage, label, title, icon) => new Promise((resolve) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "sim-restart";
  button.ariaLabel = label;
  button.title = title;
  button.innerHTML = icon;
  stage.classList.add("sim-stage", "is-ended");
  stage.append(button);
  button.addEventListener("click", () => { button.remove(); stage.classList.remove("is-ended"); resolve(); });
});
const simStart = (clock, run) => {
  clock.stage.classList.add("is-waiting");
  simButton(clock.stage, "Start the simulation", "Start", '<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true"><path d="M8 5l12 7-12 7z"/></svg>').then(() => {
    clock.stage.classList.remove("is-waiting");
    clock.play(true);
    run();
  });
};
const restartAtEnd = async (stage) => {
  const clock = simClocks.get(stage);
  clock?.play(false);
  await simButton(stage, "Restart the simulation", "Restart", '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>');
  clock?.play(true);
};

// VAT page, "How it started": replays the accountant (icon + keyboard in the middle) copying 3 VAT amounts from the ERP into
// Excel, character by character, then the total that doesn't match (the 3rd amount is mistyped).
// Starts on its start button, then waits on the restart arrow. The HTML holds the final state, kept as is with "reduce motion".
const copySim = document.querySelector(".copy-sim");
if (copySim && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const erpRows = [...copySim.querySelectorAll(".copy-sim-erp tbody tr")];
  const cells = [...copySim.querySelectorAll(".copy-sim-excel tbody [data-typed]")];
  const total = copySim.querySelector(".copy-sim-total");
  const status = copySim.querySelector(".copy-sim-status");
  const finalStatus = status.textContent;
  const clock = simClock(copySim);
  const wait = clock.wait;
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
      await wait(2500);
      await restartAtEnd(copySim);
    }
  };
  simStart(clock, run);
}

// Cash flow page, "How it started": on the CFO's desktop, the quarter's entries are copied from the ERP export
// and pasted into the cash flow file, which already holds every past year. Each row takes longer to arrive,
// the file size meter fills up to red, a busy cursor spins, then Excel stops responding and crashes.
// Starts on its start button, then waits on the restart arrow; the HTML holds the final state, kept as is with "reduce motion".
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
  const clock = simClock(pasteSim);
  const wait = clock.wait;
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
      await wait(3000);
      await restartAtEnd(pasteSim);
    }
  };
  simStart(clock, run);
}

// Cash flow page, "What I built": the file at work. The user types the period and clicks Refresh, then the file shows
// the account detail, the cash flow statement and the checks. The HTML holds the statement, shown as is without JS.
// Pause / Restart icons in the screen's top bar (hidden without JS or with "reduce motion", where nothing moves)
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
  const clock = simClock(buildSim, { onChange: (paused) => { pauseButton.ariaLabel = pauseButton.title = paused ? "Play" : "Pause"; } });   // the icon follows .is-paused (CSS)
  let restart = false;
  const RESTART = Symbol("restart");
  const wait = (ms) => new Promise((resolve, reject) => {
    let last = performance.now();
    const tick = () => {
      if (restart) return reject(RESTART);
      const now = performance.now();
      if (!clock.isPaused()) ms -= now - last;
      last = now;
      if (ms <= 0) return resolve();
      setTimeout(tick, Math.min(ms, 50));
    };
    tick();
  });
  pauseButton.addEventListener("click", () => clock.setPaused(!clock.isPaused()));
  buildSim.querySelector(".build-restart").addEventListener("click", () => {
    restart = true;
    clock.setPaused(false);
    buildSim.querySelector(".sim-restart")?.click();   // already at the end: the icon acts like the arrow
  });
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
    await wait(2500);
  };
  // Waits on the restart arrow at the end; starts over at once when the Restart icon is clicked
  const run = async () => {
    controls.hidden = false;
    for (;;) {
      try { await play(); await restartAtEnd(buildSim); }
      catch (e) { if (e !== RESTART) throw e; restart = false; }
    }
  };
  simStart(clock, run);
}

// AI forecast adjustments page, "How it started": the forecaster says the analyses are done, then types again, in the old
// Google Sheet, the adjustments already written in sentences on the other screen: select the zone, current UTR loaded,
// every changed cell typed, "Add Adjustments", a look at the Export sheet (lines appearing one by one) and back, next zone.
// Starts on its start button and stops at the end on a faded restart arrow; the HTML holds the final state
// of Kyiv, kept as is with "reduce motion"
const adjSim = document.querySelector(".adj-sim");
if (adjSim && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const all = (sel) => [...adjSim.querySelectorAll(sel)];
  const items = all(".adj-sim-zones li:not(.adj-sim-more)");
  const cells = all(".adj-sim-input tbody td");   // 8 hours (08:00 to 15:00) x 7 days, row by row
  const pick = adjSim.querySelector(".adj-sim-pick");
  const button = adjSim.querySelector(".adj-sim-button");
  const saved = adjSim.querySelector(".adj-sim-saved");
  const status = adjSim.querySelector(".adj-sim-status");
  const finalStatus = status.textContent;
  const days = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
  const hours = [2, 3, 4, 5];   // 10:00 to 13:00: the other hours keep their value
  const menuItems = all(".adj-sim-menu span");
  const exportRows = all(".adj-sim-export tbody tr");
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  // Current UTR (08:00 to 15:00, Mon to Sun) and the sentences of each zone, as cells to change
  const zones = [
    { name: "Kyiv", id: 4, utr: [[3.47, 2.72, 4.00, 2.96, 3.97, 2.97, 2.62], [2.33, 3.12, 2.46, 3.64, 3.21, 3.98, 3.86], [2.76, 3.47, 3.28, 3.69, 2.63, 2.54, 3.73], [3.25, 2.89, 3.92, 3.79, 2.77, 3.94, 3.93], [3.19, 3.74, 2.57, 2.90, 2.87, 3.82, 3.26], [3.28, 2.56, 3.08, 3.96, 2.25, 3.23, 2.51], [2.94, 3.68, 2.54, 2.93, 2.66, 3.89, 3.03], [2.97, 2.35, 2.95, 2.40, 3.31, 2.37, 3.45]],
      rules: [{ days: days(0, 4), hours, f: (v) => v + 0.2 }, { days: [5, 6], hours, f: (v) => v * 0.9 }] },
    { name: "Lviv", id: 5, utr: [[2.74, 3.18, 2.59, 3.43, 2.96, 3.27, 2.83], [3.06, 2.77, 3.39, 2.68, 3.55, 2.91, 3.22], [2.48, 2.91, 3.05, 2.62, 3.34, 3.71, 3.12], [3.17, 2.66, 2.84, 3.41, 3.58, 3.26, 2.95], [3.62, 3.09, 2.73, 2.98, 3.21, 3.84, 3.47], [2.87, 3.35, 3.52, 3.14, 2.69, 3.03, 3.66], [3.31, 2.88, 3.46, 2.72, 3.09, 3.63, 2.79], [2.65, 3.24, 2.93, 3.57, 2.81, 3.15, 3.38]],
      rules: [{ days: days(0, 3), hours: [2, 3], f: (v) => v + 0.2 }, { days: days(0, 6), hours: [4, 5], f: (v) => v - 0.1 }] },
    // Last zone of the loop: selected and loaded, no rules typed
    { name: "Tbilisi", utr: [[3.12, 2.84, 3.36, 2.67, 3.48, 2.95, 3.21], [2.76, 3.29, 2.91, 3.44, 3.07, 3.58, 2.82], [3.33, 2.71, 3.15, 3.62, 2.89, 3.26, 3.04], [2.98, 3.41, 2.63, 3.18, 3.52, 2.79, 3.37], [3.24, 2.87, 3.49, 2.94, 3.11, 3.65, 2.73], [2.69, 3.31, 3.02, 3.56, 2.83, 3.17, 3.43], [3.47, 2.92, 3.28, 2.75, 3.39, 3.08, 2.86], [2.81, 3.13, 3.54, 2.99, 3.23, 2.68, 3.35]] },
  ];
  const [firstTab, exportTab] = all(".adj-sim-tab");
  const clock = simClock(adjSim.querySelector(".adj-sim-stage"));
  const wait = clock.wait;
  const openSheet = async (tab) => {
    tab.classList.add("is-pressed");
    await wait(250);
    tab.classList.remove("is-pressed");
    firstTab.classList.toggle("is-active", tab === firstTab);
    exportTab.classList.toggle("is-active", tab === exportTab);
    adjSim.classList.toggle("is-export", tab === exportTab);
  };
  // The Export sheet: the zone's changed slots, one line at a time ("…" on the last row). From the second zone on, the
  // first row already shows the last line of the previous zone: the new lines continue the same list
  let lastLine = null;
  const showExport = async (zone, utr) => {
    const hour = (h) => String(h).padStart(2, "0") + ":00";
    const lines = [];
    cells.forEach((td, i) => {
      if (!td.classList.contains("is-changed")) return;
      const r = Math.floor(i / 7), d = i % 7;
      lines.push([zone.id, dayNames[d], hour(8 + r), hour(9 + r), utr[r][d].toFixed(2)]);
    });
    const shown = lastLine ? [lastLine, ...lines] : lines;
    exportRows.forEach((tr, n) => {
      tr.classList.toggle("is-off", !(lastLine && n === 0));
      tr.classList.toggle("is-previous", Boolean(lastLine) && n === 0);
      if (n < exportRows.length - 1) shown[n].forEach((text, c) => { tr.children[c].textContent = text; });
    });
    await openSheet(exportTab);
    status.textContent = "Loading the Export sheet…";
    for (const tr of exportRows.slice(lastLine ? 1 : 0)) {
      await wait(300);
      tr.classList.remove("is-off");
    }
    lastLine = lines[lines.length - 1];
  };
  const type = async (cell, text) => {
    cell.textContent = "";
    cell.classList.add("is-typing", "is-changed");
    adjSim.classList.add("is-keying");
    for (const ch of text) { cell.textContent += ch; await wait(35); }
    adjSim.classList.remove("is-keying");
    cell.classList.remove("is-typing");
    await wait(40);
  };
  const run = async () => {
    for (;;) {
      items.forEach((li) => { li.classList.remove("is-on", "is-done"); li.querySelectorAll("span").forEach((s) => s.classList.remove("is-on", "is-done")); });
      cells.forEach((td) => { td.textContent = ""; td.classList.remove("is-changed", "is-typing"); });
      pick.textContent = "Select…";
      saved.textContent = "";
      status.textContent = "";
      lastLine = null;
      await wait(2000);
      adjSim.classList.add("is-flash");
      await wait(1000);
      adjSim.classList.remove("is-flash");
      await wait(1000);
      status.textContent = "Next week's adjustments, already written for the local teams.";
      await wait(1800);
      const done = [];
      for (const [z, zone] of zones.entries()) {
        const li = items[z];
        const sentences = [...li.querySelectorAll("span")];
        li.classList.add("is-on");
        status.textContent = `Zone ${z + 1}: select ${zone.name} in the list…`;
        cells.forEach((td) => { td.textContent = ""; td.classList.remove("is-changed"); });
        await wait(400);
        menuItems.forEach((item) => item.classList.remove("is-on"));
        adjSim.classList.add("is-picking");
        await wait(800);
        menuItems.forEach((item) => item.classList.toggle("is-on", item.textContent === zone.name));
        await wait(600);
        pick.textContent = zone.name;
        adjSim.classList.remove("is-picking");
        adjSim.classList.add("is-loading");
        status.textContent = `Loading the current UTR of ${zone.name}…`;
        await wait(1200);
        adjSim.classList.remove("is-loading");
        const utr = zone.utr.map((row) => [...row]);
        cells.forEach((td, i) => { td.textContent = utr[Math.floor(i / 7)][i % 7].toFixed(2); });
        await wait(500);
        if (!zone.rules) { sentences[0].classList.add("is-on"); break; }
        for (const [r, rule] of zone.rules.entries()) {
          sentences[r].classList.add("is-on");
          status.textContent = `Typing by hand: "${sentences[r].textContent}"`;
          for (const h of rule.hours) {
            for (const d of rule.days) {
              utr[h][d] = rule.f(utr[h][d]);
              await type(cells[h * 7 + d], utr[h][d].toFixed(2));
            }
          }
          sentences[r].classList.remove("is-on");
          sentences[r].classList.add("is-done");
          await wait(300);
        }
        status.textContent = "Click \"Add Adjustments\" to save the zone…";
        await wait(500);
        button.classList.add("is-pressed");
        await wait(250);
        button.classList.remove("is-pressed");
        done.push(zone.name);
        saved.textContent = "Saved: " + done.join(", ");
        li.classList.remove("is-on");
        li.classList.add("is-done");
        await wait(1000);
        status.textContent = "Open the Export sheet to see the adjustments…";
        await wait(900);
        await showExport(zone, utr);
        status.textContent = `${zone.name}'s adjustments are saved in the Export sheet.`;
        await wait(1800);
        status.textContent = "Back to the first sheet for the next zone…";
        await wait(700);
        await openSheet(firstTab);
        await wait(700);
      }
      status.textContent = finalStatus;
      await wait(2500);
      await restartAtEnd(adjSim.querySelector(".adj-sim-stage"));
    }
  };
  simStart(clock, run);
}

// AI forecast adjustments page, the example: the sentences are typed in the message box and sent, the AI thinks and replies
// part by part, the export appears row by row, then the forecaster clicks its download icon. Starts on its start button, then waits on the restart arrow; the HTML holds the final state, kept as is with
// "reduce motion"
const aiChat = document.querySelector(".ai-chat");
if (aiChat && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const [sent, reply] = aiChat.querySelectorAll(".story-line");
  const replyParts = [...reply.querySelectorAll(".ai-reply > span")];
  const file = aiChat.querySelector(".ai-file");
  const download = aiChat.querySelector(".ai-download");
  const table = aiChat.querySelector(".ai-export");
  const rows = [...table.querySelectorAll("tbody tr")];
  const input = aiChat.querySelector(".ai-input");
  const inputText = aiChat.querySelector(".ai-input-text");
  const send = aiChat.querySelector(".ai-send");
  const placeholder = inputText.textContent;
  const sentences = sent.querySelector(".story-bubble").textContent;
  const clock = simClock(aiChat);
  const wait = clock.wait;
  const run = async () => {
    for (;;) {
      [sent, reply, ...replyParts, file, table, ...rows].forEach((el) => el.classList.add("is-off"));
      file.classList.remove("is-cursor", "is-at", "is-done");
      await wait(1000);
      input.classList.add("is-filled");
      inputText.textContent = "";
      for (let i = 1; i <= 70; i++) { inputText.textContent = sentences.slice(0, i); await wait(20); }
      inputText.textContent = sentences;
      await wait(600);
      send.classList.add("is-pressed");
      await wait(200);
      send.classList.remove("is-pressed");
      input.classList.remove("is-filled");
      inputText.textContent = placeholder;
      sent.classList.remove("is-off");
      await wait(900);
      aiChat.classList.add("is-thinking");
      reply.classList.remove("is-off");
      await wait(2000);
      aiChat.classList.remove("is-thinking");
      for (const part of replyParts) { part.classList.remove("is-off"); await wait(900); }
      file.classList.remove("is-off");
      table.classList.remove("is-off");
      for (const row of rows) { await wait(400); row.classList.remove("is-off"); }
      await wait(900);
      file.classList.add("is-cursor");
      await wait(300);
      file.classList.add("is-at");
      await wait(1000);
      download.classList.add("is-pressed");
      await wait(200);
      download.classList.remove("is-pressed");
      file.classList.add("is-done");
      await wait(500);
      file.classList.remove("is-cursor");
      await wait(2500);
      await restartAtEnd(aiChat);
    }
  };
  simStart(clock, run);
}

// Forecast accuracy page, "How it started": on Looker, the forecaster sets the filters (country, city, zone, last complete days
// or weeks, how many, weekdays) and clicks Load, for one zone. Starts on its start button and stops on the restart arrow; the HTML holds the final state.
const lookerSim = document.querySelector(".lk-sim");
if (lookerSim && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const clock = simClock(lookerSim);
  const SPEED = 1.3;   // plays 1.3 times faster than the waits written below
  const wait = (ms) => clock.wait(ms / SPEED);
  const $ = (selector) => lookerSim.querySelector(selector);
  const panels = $(".lk-panels");
  const filter = (name) => $(`[data-filter="${name}"]`);
  const bars = [...lookerSim.querySelectorAll(".lk-bar")];
  const checks = [...lookerSim.querySelectorAll(".lk-check")];
  const [segDays] = $(".lk-seg").children;
  const number = $(".lk-number");
  const load = $(".lk-load");
  const slotCols = [...lookerSim.querySelectorAll(".lk-stack")];
  const status = $(".lk-status");
  const finalStatus = status.textContent;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  // Same drawing as the charts held in the HTML: one point per day for the actual and for the target, linked by a line
  const lineChart = (actual, target, min, max) => {
    const x = (i) => 32 + i * 42;
    const y = (v) => 104 - ((v - min) / (max - min)) * 92;
    const line = (values) => values.map((v, i) => `${x(i)},${y(v).toFixed(1)}`).join(" ");
    const dots = (values, cls) => values.map((v, i) => `<circle class="${cls}" cx="${x(i)}" cy="${y(v).toFixed(1)}" r="3.2"/>`).join("");
    return `<line class="lk-axis" x1="24" x2="296" y1="12" y2="12"/><line class="lk-axis" x1="24" x2="296" y1="104" y2="104"/><text x="0" y="16">${max}</text><text x="0" y="108">${min}</text>`
      + days.map((d, i) => `<text x="${x(i)}" y="124" text-anchor="middle">${d}</text>`).join("")
      + `<polyline class="lk-target" points="${line(target)}"/>${dots(target, "lk-dot-target")}<polyline class="lk-actual" points="${line(actual)}"/>${dots(actual, "lk-dot-actual")}`;
  };
  const utrTarget = [2.5, 2.5, 2.5, 2.5, 2.6, 2.7, 2.7];
  const dtTarget = [30, 30, 30, 30, 32, 32, 32];
  // Made-up figures for Zone 1. Bars: [over, under, proper] %. Too few slots = Utilization Rate and Delivery Time above target.
  // Slots: [assigned, unassigned] per day (total slots opened - assigned = unassigned)
  const zone1 = { bars: [[18,12,70],[20,14,66],[16,12,72],[18,16,66],[14,24,62],[12,38,50],[14,34,52]], utr: [2.4,2.4,2.5,2.5,2.8,3.2,3.1], dt: [29,30,29,31,34,41,39], slots: [[400,20],[400,22],[410,20],[415,25],[450,25],[470,20],[465,20]] };
  const draw = (view) => {
    bars.forEach((bar, d) => [...bar.children].forEach((part, p) => { part.style.height = `${view.bars[d][p]}%`; }));
    $('[data-chart="utr"]').innerHTML = lineChart(view.utr, utrTarget, 1.5, 3.5);
    $('[data-chart="dt"]').innerHTML = lineChart(view.dt, dtTarget, 20, 45);
    const most = Math.max(...view.slots.map(([assigned, unassigned]) => assigned + unassigned));
    slotCols.forEach((col, d) => {
      const [assigned, unassigned] = view.slots[d];
      const total = assigned + unassigned;
      const [label, red, green] = col.children;
      label.textContent = total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total;
      red.style.height = `${unassigned / most * 100}%`;
      green.style.height = `${assigned / most * 100}%`;
    });
  };
  // A drop-down opens under its filter, the choice lights up, then it is selected
  const choose = async (name, options, value) => {
    const select = filter(name);
    const menu = document.createElement("ul");
    menu.className = "lk-menu";
    menu.innerHTML = options.map((o) => `<li${o === value ? ' class="is-on"' : ""}>${o}</li>`).join("");
    select.parentElement.append(menu);
    await wait(750);
    menu.remove();
    select.textContent = value;
    await wait(250);
  };
  const clickLoad = async (view) => {
    load.classList.add("is-pressed");
    await wait(250);
    load.classList.remove("is-pressed");
    panels.classList.remove("is-empty");
    panels.classList.add("is-loading");
    await wait(1200);
    draw(view);
    panels.classList.remove("is-loading");
  };
  const zones = ["Zone 1", "Zone 2", "Zone 3", "All"];
  const run = async () => {
    for (;;) {
      ["country", "city", "zone"].forEach((name) => { filter(name).textContent = ""; });
      segDays.classList.remove("is-on");
      number.textContent = "";
      checks.forEach((check) => check.classList.remove("is-on"));
      panels.classList.add("is-empty");
      await wait(700);
      status.textContent = "Select a country, a city and a zone…";
      await choose("country", ["Country A", "Country B"], "Country A");
      await choose("city", ["City 1", "City 2", "All"], "City 1");
      await choose("zone", zones, "Zone 1");
      status.textContent = "Last complete days or weeks, and how many…";
      await wait(500);
      segDays.classList.add("is-on");
      await wait(500);
      number.classList.add("is-typing");
      await wait(350);
      number.textContent = "7";
      await wait(350);
      number.classList.remove("is-typing");
      status.textContent = "Tick the weekdays…";
      for (const check of checks) { await wait(170); check.classList.add("is-on"); }
      await wait(350);
      status.textContent = "Load, and wait.";
      await clickLoad(zone1);
      status.textContent = finalStatus;
      await wait(2500);
      await restartAtEnd(lookerSim);
    }
  };
  simStart(clock, run);
}

// Forecast accuracy page, "The app at work", following the real app: Market Overview and the Insights of a country, Global Zones with
// the deep dive, Zone Insights and FC Schedule of one zone; FC Alerts sorted by order volume, with zones disappearing. Plays with a mouse, then the restart arrow.
// A click on the simulation pauses it, another click resumes it. The buttons really work: a click on a step, Insights, the zone,
// Zone Insights, × or FC Schedule stops the play and does it.
// The HTML holds the FC Schedule (step 2), kept with "reduce motion".
const faSim = document.querySelector(".fa-sim:not(.ais-sim, .chat-sim)");
if (faSim) {
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const steps = [...faSim.querySelectorAll(".fa-steps button")];
  const views = [...faSim.querySelectorAll(".fa-view")];
  const stage = faSim.querySelector(".fa-views");
  const status = faSim.querySelector(".fa-status");
  const details = faSim.querySelector(".fa-details");
  const modal = (name) => faSim.querySelector(`.fa-modal[data-modal="${name}"]`);
  const texts = [
    "Market Performance on top, then the breakdown by country and by area, down to the zone, with no selection.",
    "All the zones with their main KPIs, with no selection.",
    status.textContent,
    "Alerts keep only the zones below the threshold, biggest zones first.",
  ];
  const stepOfView = [0, 1, 1, 2];   // the FC Schedule opens from Global Zones, so it belongs to step 2
  const viewOfStep = [0, 1, 3];
  // FC Alerts in its final state: sorted by order volume, only the zones at or below 70 % of Proper FC
  const alertRows = [...faSim.querySelectorAll(".fa-arow")];
  const alertBody = faSim.querySelector(".fa-alert-rows");
  const sortHead = faSim.querySelector(".fa-sort");
  const sliderVal = faSim.querySelector(".fa-slider-val");
  const sliderFill = faSim.querySelector(".fa-filters .fa-track i");
  const alertCount = faSim.querySelector(".fa-alert-count");
  const setSlider = (t) => {
    sliderVal.textContent = `${t}%`;
    sliderFill.style.setProperty("--v", `${t}%`);
    alertRows.forEach((row) => { row.hidden = Number(row.dataset.pf) > t; });
    alertCount.textContent = `Viewing ${Math.round(40 - (100 - t) * 0.6)} zones`;
  };
  const setSorted = (sorted) => {
    const order = [...alertRows].sort((a, b) => (sorted ? b.dataset.orders - a.dataset.orders : a.dataset.n - b.dataset.n));
    alertBody.append(...order);
    sortHead.classList.toggle("is-sorted", sorted);
    sortHead.querySelector("span").textContent = sorted ? "▼" : "↕";
  };
  const cursor = document.createElement("span");
  cursor.className = "fa-cursor";
  cursor.innerHTML = '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M3 1l13 9.5-6 1 3.5 6.5-2.5 1.3-3.5-6.5L3 17z" fill="#fff" stroke="#1d2230" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  faSim.append(cursor);   // on the whole simulation, not the screen: the mouse also goes to the tabs above it
  const asia = faSim.querySelector(".fa-markets b");
  // The very beginning: no market selected, no section, nothing on the screen
  const setEmpty = () => {
    asia.classList.remove("is-on");
    views.forEach((view) => view.classList.remove("is-on"));
    steps.forEach((step) => { step.classList.remove("is-on"); step.removeAttribute("aria-current"); });
    status.textContent = "";
  };
  const closeModals = () => faSim.querySelectorAll(".fa-modal.is-open").forEach((m) => m.classList.remove("is-open"));
  const openModal = (name) => { closeModals(); const m = modal(name); m.classList.add("is-open"); m.querySelector(".fa-modal-scroll").scrollTop = 0; };
  const show = (index) => {
    closeModals();
    views.forEach((view, i) => view.classList.toggle("is-on", i === index));
    views[index].scrollTop = 0;
    steps.forEach((step, i) => {
      step.classList.toggle("is-on", i === stepOfView[index]);
      if (i === stepOfView[index]) step.setAttribute("aria-current", "step");
      else step.removeAttribute("aria-current");
    });
    status.textContent = texts[index];
  };
  let playing = 0;   // changes when a button is clicked: the play in progress stops
  const clock = simClock(faSim);
  const stopPlay = () => {
    clock.play(false);
    playing++;
    faSim.querySelector(".sim-restart")?.remove();
    faSim.classList.remove("is-ended");
    views.forEach((view) => view.classList.remove("is-playing"));
    cursor.classList.remove("is-on");
    asia.classList.add("is-on");
    details.hidden = false;
    setSorted(true);
    setSlider(70);
  };
  steps.forEach((step, i) => step.addEventListener("click", () => { stopPlay(); show(viewOfStep[i]); }));
  faSim.querySelectorAll("[data-open]").forEach((button) => button.addEventListener("click", () => { stopPlay(); openModal(button.dataset.open); }));
  faSim.querySelectorAll(".fa-close").forEach((button) => button.addEventListener("click", () => { stopPlay(); closeModals(); }));
  faSim.querySelector("[data-schedule]").addEventListener("click", () => { stopPlay(); show(2); });
  faSim.querySelector(".fa-link").addEventListener("click", () => { const wasHidden = details.hidden; stopPlay(); details.hidden = !wasHidden; });

  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const run = async () => {
      const me = ++playing;
      // Waits for ms of play: the time doesn't run while the simulation is paused
      const pause = async (ms) => {
        let left = ms * 0.6;   // the speed of the whole simulation
        while (left > 0 && me === playing) {
          const step = Math.min(left, 50);
          await wait(step);
          if (!clock.isPaused()) left -= step;
        }
        return me === playing;
      };
      const showAll = async (view, selector, ms) => {
        for (const el of view.querySelectorAll(selector)) {
          el.classList.add("is-in");
          if (!await pause(ms)) return false;
        }
        return true;
      };
      // The mouse goes to an element, then presses it
      const mouseTo = async (el) => {
        const box = faSim.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        cursor.classList.add("is-on");
        cursor.style.transform = `translate(${r.left - box.left + r.width / 2}px, ${r.top - box.top + r.height / 2}px)`;
        return pause(800);
      };
      // The mouse rests in the middle of the screen, ready to scroll
      const mouseCentre = () => {
        const box = faSim.getBoundingClientRect();
        const r = stage.getBoundingClientRect();
        cursor.style.transform = `translate(${r.left - box.left + r.width * 0.55}px, ${r.top - box.top + r.height * 0.55}px)`;
      };
      const press = async (el) => {
        el.classList.add("fa-is-pressed");
        const alive = await pause(300);
        el.classList.remove("fa-is-pressed");
        return alive;
      };
      // The mouse wheel: scrolls a window so that a part comes to the top
      const scrollTo = async (box, part) => {
        const from = box.scrollTop;
        const to = Math.min(from + part.getBoundingClientRect().top - box.getBoundingClientRect().top - 48, box.scrollHeight - box.clientHeight);
        for (let i = 1; i <= 25; i++) {
          box.scrollTop = from + ((to - from) * i) / 25;
          if (!await pause(30)) return false;
        }
        return true;
      };
      const readParts = async (name) => {
        const m = modal(name);
        const box = m.querySelector(".fa-modal-scroll");
        for (const part of m.querySelectorAll("[data-part]")) {
          if (!await scrollTo(box, part) || !await pause(3200)) return false;
        }
        const close = m.querySelector(".fa-close");
        if (!await mouseTo(close) || !await press(close)) return false;
        m.classList.remove("is-open");
        return pause(400);
      };
      const [overview, global, schedule, alerts] = views;
      for (;;) {
        views.forEach((view) => {
          view.classList.add("is-playing");
          view.querySelectorAll(".is-in").forEach((el) => el.classList.remove("is-in"));
        });
        details.hidden = true;
        cursor.classList.remove("is-on");

        // 1. Nothing on the screen; the mouse selects Asia, then Market Overview; then the Insights of a country
        setEmpty();
        mouseCentre();
        cursor.classList.add("is-on");
        if (!await pause(500)) return;
        status.textContent = "Select a market…";
        if (!await mouseTo(asia) || !await press(asia)) return;
        asia.classList.add("is-on");
        status.textContent = "…then a section.";
        if (!await mouseTo(steps[0]) || !await press(steps[0])) return;
        show(0);
        // Almost at once: the market performance and both breakdowns
        if (!await showAll(overview, ".fa-a", 15) || !await pause(3000)) return;
        const insights = overview.querySelector("[data-open]");
        status.textContent = "A click on Insights opens the country: KPIs on top, then 3 reports below.";
        if (!await mouseTo(insights) || !await press(insights)) return;
        openModal("market");
        if (!await pause(1500)) return;
        mouseCentre();
        if (!await pause(500) || !await readParts("market")) return;

        // 2. Global Zones: the mouse clicks its tab; list, click on a zone, Zone Insights, then the FC Schedule button
        status.textContent = "Next section: Global Zones.";
        if (!await mouseTo(steps[1]) || !await press(steps[1])) return;
        show(1);
        status.textContent = "Global Zones: every zone with its main KPIs: Delivery Time, Utilization Rate, forecast accuracy and capacity.";
        if (!await showAll(global, ".fa-a", 40) || !await pause(2500)) return;
        const zone = global.querySelector(".fa-link");
        status.textContent = "A click on a zone opens its deep dive: secondary KPIs, buttons to go further, and comments for the action plan.";
        if (!await mouseTo(zone) || !await press(zone)) return;
        details.hidden = false;
        if (!await pause(3500)) return;
        const zoneInsights = global.querySelector('[data-open="zone"]');
        status.textContent = "Zone Insights: KPIs on top, the AI summary, then 3 reports.";
        if (!await mouseTo(zoneInsights) || !await press(zoneInsights)) return;
        openModal("zone");
        if (!await pause(1500)) return;
        mouseCentre();
        if (!await pause(500) || !await readParts("zone")) return;
        const scheduleButton = global.querySelector("[data-schedule]");
        status.textContent = "The most used view: a click on FC Schedule.";
        if (!await mouseTo(scheduleButton) || !await pause(600) || !await press(scheduleButton)) return;

        // Still step 2: the FC Schedule of the zone
        cursor.classList.remove("is-on");
        show(2);
        if (!await showAll(schedule, ".fa-a", 250)) return;
        for (const row of schedule.querySelectorAll(".fa-grid tbody tr")) {
          row.querySelectorAll(".fa-c").forEach((c) => c.classList.add("is-in"));
          if (!await pause(130)) return;
        }
        if (!await pause(800) || !await showAll(schedule, ".fa-late", 500) || !await pause(3500)) return;

        // 3. FC Alerts: the mouse clicks its tab; the list, sorted by order volume, then Proper FC at 70 %: the zones above it disappear
        status.textContent = "Next section: FC Alerts.";
        if (!await mouseTo(steps[2]) || !await press(steps[2])) return;
        setSorted(false);
        setSlider(100);
        show(3);
        status.textContent = "FC Alerts: filters on top, then the zones with their main KPIs.";
        if (!await showAll(alerts, ".fa-a", 200) || !await pause(1500)) return;
        status.textContent = "Sort by order volume, biggest zones first…";
        if (!await mouseTo(sortHead) || !await press(sortHead)) return;
        setSorted(true);
        if (!await pause(1600)) return;
        status.textContent = "…then Proper FC at 70%: only the zones below stay.";
        const thumb = () => sliderFill;
        const box = faSim.getBoundingClientRect();
        const placeOnThumb = () => {
          const r = thumb().getBoundingClientRect();
          cursor.style.transform = `translate(${r.right - box.left}px, ${r.top - box.top}px)`;
        };
        placeOnThumb();
        cursor.classList.add("is-on");
        if (!await pause(900)) return;
        for (let t = 100; t >= 70; t--) {
          setSlider(t);
          placeOnThumb();
          if (!await pause(130)) return;
        }
        status.textContent = texts[3];
        cursor.classList.remove("is-on");
        if (!await pause(3000)) return;
        await restartAtEnd(faSim);
      }
    };
    simStart(clock, run);
  }
}

// Forecast accuracy page, "AI summaries": same view as the app above. In Global Zones the mouse opens a zone, then Zone Insights, and it stays
// on the AI summary, explained day by day under the screen. A click pauses it. Starts on its start button, stops on the restart arrow.
// The HTML holds the final state, kept without JS or with "reduce motion".
const aiSim = document.querySelector(".ais-sim");
if (aiSim && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  
  const stage = aiSim.querySelector(".fa-views");
  const view = aiSim.querySelector(".fa-view");
  const details = aiSim.querySelector(".fa-details");
  const modal = aiSim.querySelector(".fa-modal");
  const zone = aiSim.querySelector(".fa-link");
  const insights = aiSim.querySelector('[data-go="insights"]');
  const status = aiSim.querySelector(".fa-status");
  const finalStatus = status.textContent;
  const days = [...aiSim.querySelectorAll(".ais-day")];
  const dayTexts = [
    "Monday: the AI sees Over FC up in the afternoon and links it to orders below Orders FC.",
    "Tuesday: the same pattern as Monday: Over FC up in the afternoon, with orders below Orders FC.",
    "Wednesday: no variation to explain: orders are in line with Orders FC.",
    "Thursday: nearly stable, with the first signs of the weekend: orders start to grow in the evening.",
    "Friday: Under FC up in the evening, which the AI links to orders above Orders FC and more Missing Capacity.",
    "Saturday: Proper FC down in the evening, with orders rising and Delivery Time above target.",
    "Sunday: Under FC still high. Missing Capacity is stable, so the AI points to the orders.",
  ];
  const cursor = document.createElement("span");
  cursor.className = "fa-cursor";
  cursor.innerHTML = '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M3 1l13 9.5-6 1 3.5 6.5-2.5 1.3-3.5-6.5L3 17z" fill="#fff" stroke="#1d2230" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  aiSim.append(cursor);
  const clock = simClock(aiSim, { ignore: ".sim-restart" });   // its buttons are only pictures: a click on them pauses too
  const pause = clock.wait;
  const mouseTo = async (el) => {
    const box = aiSim.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    cursor.classList.add("is-on");
    cursor.style.transform = `translate(${r.left - box.left + r.width / 2}px, ${r.top - box.top + r.height / 2}px)`;
    await pause(500);
  };
  const press = async (el) => {
    el.classList.add("fa-is-pressed");
    await pause(200);
    el.classList.remove("fa-is-pressed");
  };
  const reset = () => {
    modal.classList.remove("is-open");
    modal.querySelector(".fa-modal-scroll").scrollTop = 0;
    details.hidden = true;
    days.forEach((day) => day.classList.remove("is-on"));
    view.scrollTop = 0;
    status.textContent = "Global Zones: every zone with its main KPIs.";
  };
  const run = async () => {
    for (;;) {
      reset();
      await pause(1200);
      status.textContent = "A click on a zone opens its deep dive.";
      await mouseTo(zone);
      await press(zone);
      details.hidden = false;
      await pause(1000);
      status.textContent = "Zone Insights opens on the AI summary, already written: nothing to ask for.";
      await mouseTo(insights);
      await press(insights);
      modal.classList.add("is-open");
      cursor.classList.remove("is-on");
      await pause(2600);
      for (const [i, day] of days.entries()) {
        days.forEach((d) => d.classList.remove("is-on"));
        day.classList.add("is-on");
        status.textContent = dayTexts[i];
        const box = modal.querySelector(".fa-modal-scroll");
        const below = day.getBoundingClientRect().bottom - box.getBoundingClientRect().bottom;
        if (below > 0) box.scrollTop += below + 12;   // the summary is taller than the screen
        await pause(2600);
      }
      days.forEach((d) => d.classList.remove("is-on"));
      status.textContent = finalStatus;
      await pause(2000);
      await restartAtEnd(aiSim);
    }
  };
  simStart(clock, run);
}

// Forecast accuracy page, "Chatbot": same view as the app above. On Market Overview the mouse opens the chatbot, then 2 questions are typed and sent,
// and each answer arrives after the thinking dots. Starts on its start button; a click pauses it. The HTML holds the final state.
const chatSim = document.querySelector(".chat-sim");
if (chatSim && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const clock = simClock(chatSim, { ignore: ".sim-restart" });   // its buttons are only pictures: a click on them pauses too
  const wait = clock.wait;
  const panel = chatSim.querySelector(".chat-panel");
  const button = chatSim.querySelector(".fa-chat");
  const box = chatSim.querySelector(".chat-messages");
  const messages = [...chatSim.querySelectorAll(".chat-msg")];
  const texts = messages.map((m) => m.textContent);
  const dots = chatSim.querySelector(".chat-dots");
  const input = chatSim.querySelector(".chat-input");
  const send = chatSim.querySelector(".chat-send");
  const status = chatSim.querySelector(".fa-status");
  const finalStatus = status.textContent;
  const cursor = document.createElement("span");
  cursor.className = "fa-cursor";
  cursor.innerHTML = '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M3 1l13 9.5-6 1 3.5 6.5-2.5 1.3-3.5-6.5L3 17z" fill="#fff" stroke="#1d2230" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  chatSim.append(cursor);
  const mouseTo = async (el) => {
    const frame = chatSim.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    cursor.classList.add("is-on");
    cursor.style.transform = `translate(${r.left - frame.left + r.width / 2}px, ${r.top - frame.top + r.height / 2}px)`;
    await wait(500);
  };
  const press = async (el) => {
    el.classList.add("fa-is-pressed");
    await wait(200);
    el.classList.remove("fa-is-pressed");
  };
  const toBottom = () => { box.scrollTop = box.scrollHeight; };
  const ask = async (i) => {
    await mouseTo(input);
    await wait(150);
    cursor.classList.remove("is-on");
    for (const ch of texts[i]) { input.textContent += ch; await wait(28); }
    await wait(300);
    await mouseTo(send);
    await press(send);
    cursor.classList.remove("is-on");
    input.textContent = "";
    messages[i].hidden = false;
    toBottom();
    await wait(300);
    dots.hidden = false;
    box.append(dots);
    toBottom();
    await wait(1100);
    dots.hidden = true;
    const answer = messages[i + 1];
    answer.textContent = "";
    answer.hidden = false;
    for (const word of texts[i + 1].split(" ")) {
      answer.textContent += (answer.textContent ? " " : "") + word;
      toBottom();
      await wait(45);
    }
  };
  const run = async () => {
    for (;;) {
      panel.hidden = true;
      messages.forEach((m) => { m.hidden = true; });
      dots.hidden = true;
      input.textContent = "";
      cursor.classList.remove("is-on");
      status.textContent = "A metric isn't clear? The chatbot is one click away, on every page of the app.";
      await wait(1000);
      await mouseTo(button);
      await press(button);
      panel.hidden = false;
      status.textContent = "The chatbot opens: it knows the queries behind each metric.";
      await wait(900);
      await ask(0);
      status.textContent = "It explains how the metric is computed…";
      await wait(3000);
      status.textContent = "…and a new question goes deeper.";
      await ask(2);
      await wait(1500);
      status.textContent = finalStatus;
      await wait(2500);
      await restartAtEnd(chatSim);
    }
  };
  simStart(clock, run);
}

// Later: chatbot window (Phase 2).
