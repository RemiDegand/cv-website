// Home only (3 Nov 2026, web design pass), loaded after script.js: typed line, mouse effects,
// numbers that count up, moving logo strip, carousels that play by themselves, sections that
// appear as you scroll. Without JavaScript or with "reduce motion", the page is complete and still.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 1. "I build …": types each word, deletes it, types the next
  const rotator = document.querySelector(".rotator");
  if (rotator && !reduce) {
    const words = rotator.dataset.words.split("|");
    rotator.closest(".hero-rotator").classList.add("typing");
    rotator.textContent = words[0];
    (async () => {
      let w = 0;
      await wait(2400);
      for (;;) {
        while (rotator.textContent.length) { rotator.textContent = rotator.textContent.slice(0, -1); await wait(45); }
        w = (w + 1) % words.length;
        await wait(250);
        for (const letter of words[w]) { rotator.textContent += letter; await wait(85); }
        await wait(2000);
      }
    })();
  }

  // 2. Mouse: a soft light follows it in the hero, the photo and background move a little (depth);
  //    on the "How this site works" tiles, a light follows it too
  const hero = document.querySelector(".hero-live");
  if (hero && finePointer && !reduce) {
    let frame = 0;
    hero.addEventListener("pointermove", (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        hero.style.setProperty("--mx", x + "px");
        hero.style.setProperty("--my", y + "px");
        hero.style.setProperty("--px", ((x / r.width - 0.5) * 2).toFixed(3));
        hero.style.setProperty("--py", ((y / r.height - 0.5) * 2).toFixed(3));
      });
    });
    hero.addEventListener("pointerleave", () => { hero.style.setProperty("--px", 0); hero.style.setProperty("--py", 0); });
  }
  if (finePointer) {
    document.querySelectorAll(".site-map .cat-tile").forEach((tile) => {
      tile.addEventListener("pointermove", (e) => {
        const r = tile.getBoundingClientRect();
        tile.style.setProperty("--x", e.clientX - r.left + "px");
        tile.style.setProperty("--y", e.clientY - r.top + "px");
      });
      tile.addEventListener("pointerleave", () => { tile.style.removeProperty("--x"); tile.style.removeProperty("--y"); });
    });
  }

  // 3. Logo strip: a second copy of the logos follows the first, so the strip loops without a gap
  const marquee = document.querySelector(".marquee");
  if (marquee && !reduce) {
    const track = marquee.querySelector(".marquee-track");
    [...track.children].forEach((li) => {
      const copy = li.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      track.append(copy);
    });
    marquee.classList.add("is-ready");
  }

  const canObserve = "IntersectionObserver" in window;

  // 4. Numbers count up from 0 when they come into view
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && !reduce && canObserve) {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      const el = entry.target, end = Number(el.dataset.count), start = performance.now(), duration = 1400;
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));   // fast, then slows down
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }), { threshold: 0.6 });
    counters.forEach((el) => { el.textContent = "0"; io.observe(el); });
  }

  // 5. Key experience / key projects play by themselves: the active dot fills up in 6 s (CSS),
  //    then the next card comes. Paused while the mouse or keyboard focus is on it, or off screen.
  //    A visitor who swipes, scrolls sideways or uses an arrow or a dot takes over: autoplay stops.
  if (!reduce) {
    document.querySelectorAll(".home-col").forEach((col) => {
      const nav = col.querySelector(".carousel-nav");
      const dotsBox = col.querySelector(".carousel-dots");
      const track = col.querySelector(".carousel-track");
      if (!nav || !dotsBox || !track || dotsBox.children.length < 2) return;
      let hover = false, focus = false, visible = false;
      const sync = () => nav.classList.toggle("paused", hover || focus || !visible || document.hidden);
      nav.classList.add("autoplay", "paused");
      col.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { hover = true; sync(); } });
      col.addEventListener("pointerleave", () => { hover = false; sync(); });
      col.addEventListener("focusin", () => { focus = true; sync(); });
      col.addEventListener("focusout", () => { focus = false; sync(); });
      document.addEventListener("visibilitychange", sync);
      if (canObserve) new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.5 }).observe(col);
      else { visible = true; sync(); }

      const stop = () => nav.classList.remove("autoplay");
      track.addEventListener("touchstart", stop, { passive: true });
      track.addEventListener("wheel", (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) stop(); }, { passive: true });
      nav.addEventListener("pointerdown", stop);
      nav.addEventListener("keydown", stop);

      dotsBox.addEventListener("animationend", (e) => {
        if (e.animationName !== "dot-fill" || !nav.classList.contains("autoplay")) return;
        const dots = [...dotsBox.children];
        const i = dots.findIndex((dot) => dot.classList.contains("active"));
        dots[(i + 1) % dots.length].click();   // after the last card, back to the first
      });
    });
  }

  // 6. Sections appear as you scroll, one after the other within each group
  if (!reduce && canObserve) {
    const groups = [".home-proof .stat", ".marquee", ".site-map .section-head", ".site-map .cat-tile",
      ".home-col", "#about .section-head", ".hobby"];
    const items = [];
    groups.forEach((selector) => document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add("h-reveal");
      el.style.setProperty("--i", i);
      items.push(el);
    }));
    document.documentElement.classList.add("h-reveal-on");
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      // also shows what is already above the screen (page reloaded halfway down)
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    }), { rootMargin: "0px 0px -8% 0px" });
    items.forEach((el) => io.observe(el));
  }
})();
