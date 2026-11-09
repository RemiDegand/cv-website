// Language switch EN | FR with flags (9 Nov 2026, Web Designer). One script for every page:
//   <script src="lang.js" defer></script>
// The switch is written in each page's menu (.lang-switch), lang.css is linked in the <head>, and a one-line
// script at the top of the <head> sets <html data-lang="fr"> when French was chosen, so the chosen flag shows
// on the first paint. This file only handles clicks and keeps aria-pressed in line.
// English is the default. The choice is remembered (localStorage "cv-lang").
// DESIGN ONLY for now: no French texts yet. When they exist, listen to the "langchange" event
// (detail = "en" | "fr") to swap the texts.
(() => {
  const box = document.querySelector(".lang-switch");
  if (!box) return;
  const KEY = "cv-lang";
  const html = document.documentElement;
  const phone = matchMedia("(max-width: 720px)");   // same breakpoint as lang.css
  const buttons = [...box.querySelectorAll("button[data-lang]")];
  const codes = buttons.map((b) => b.dataset.lang);
  const current = () => (html.dataset.lang === "fr" ? "fr" : "en");

  const set = (code) => {
    html.lang = code;
    html.dataset.lang = code;
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === code)));
  };

  set(current());
  // Transitions only after the first paint, so nothing moves when a page opens
  requestAnimationFrame(() => requestAnimationFrame(() => box.classList.add("is-ready")));

  box.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-lang]");
    if (!b) return;
    let code = b.dataset.lang;
    if (code === current()) {
      // Phones show only the chosen flag: a tap on it switches to the other language
      if (!phone.matches) return;
      code = codes.find((c) => c !== code);
    }
    try { localStorage.setItem(KEY, code); } catch { /* private mode: fine */ }
    set(code);
    box.classList.remove("is-switched");
    void box.offsetWidth;   // restart the phone pop animation
    box.classList.add("is-switched");
    if (phone.matches) box.querySelector(`[data-lang="${code}"]`).focus({ focusVisible: false });
    document.dispatchEvent(new CustomEvent("langchange", { detail: code }));
  });
})();
