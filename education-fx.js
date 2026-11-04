// Education page, aesthetic pass (3 Nov 2026, web design pass). Loaded by education.html only,
// after script.js (which builds the details cards and handles the clicks). Styles in
// education-fx.css, switched on by the .efx class on <html>.
(() => {
  const timeline = document.querySelector(".timeline");
  if (!timeline) return;
  const items = [...timeline.querySelectorAll(".edu-item")];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const phone = matchMedia("(max-width: 720px)");
  document.documentElement.classList.add("efx");
  items.forEach((item, i) => item.style.setProperty("--i", i));

  // Each details card (built by script.js right after its school) spans the rows of its school and
  // of the schools below it, so the schools under the open one stay close instead of being pushed
  // down by the card's height (CSS, computers only: --span)
  // (+1: the card also spans an empty stretchy row after the last school, which takes any extra height)
  timeline.style.setProperty("--n", items.length);
  items.forEach((item, i) => {
    const card = item.nextElementSibling;
    if (card && card.classList.contains("edu-detail")) card.style.setProperty("--span", items.length - i + 1);
  });

  // Intro line under the title: says what to do
  const head = document.querySelector("#education .section-head");
  if (head) {
    const lead = document.createElement("p");
    lead.className = "edu-lead";
    lead.textContent = "Click a school to see its courses year by year, and the internships done along the way.";
    head.after(lead);
  }

  // "Pick a school" panel for the right side, shown when no school is open
  const pick = document.createElement("div");
  pick.className = "edu-pick";
  pick.setAttribute("aria-hidden", "true");
  pick.innerHTML = `
    <div class="edu-pick-head">
      <span class="edu-pick-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6"/></svg></span>
      <div><strong>Pick a school</strong><span class="edu-pick-arrow">on the left</span></div>
    </div>
    <p>Its details open here: the courses of each year, newest first, and the internships done along the way.</p>
    <ul class="edu-pick-preview"><li><i></i><i></i></li><li><i></i><i></i></li><li><i></i><i></i></li></ul>`;
  timeline.append(pick);

  // Open NEOMA (the current school) by itself once the schools have come in, so the page never
  // looks empty and the visitor sees that schools open. Not on phones (details open under the
  // school there, which would push the others down), and not if the visitor already clicked.
  if (!phone.matches) {
    setTimeout(() => {
      if (!timeline.classList.contains("zoomed") && items[0]) items[0].click();
    }, reduce ? 0 : 1100);
  }
})();
