// Home only (3 Nov 2026, web design pass), loaded after script.js: typed line, mouse effects,
// numbers that count up, moving logo strip, toolbox pipeline (5 Nov), sections that
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

  // 2. Mouse: a soft light follows it in the hero, the photo and background move a little (depth)
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

  // 5. Sections appear as you scroll, one after the other within each group
  if (!reduce && canObserve) {
    const groups = [".home-proof .stat", ".marquee", "#about .section-head", ".tb-head", ".pl-stages", ".words-title", ".hobby"];
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
