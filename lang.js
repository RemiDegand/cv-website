// Language switch EN | FR with flags (9 Nov 2026, Web Designer). One script for every page:
//   <script src="lang.js" defer></script>
// The switch itself is written in each page's menu (.lang-switch) and lang.css is linked in the <head>,
// so nothing is added after the first paint (no jump when changing page). This file only handles clicks.
// English is the default. The choice is remembered (localStorage) and set on <html lang> and <html data-lang>.
// DESIGN ONLY for now: no French texts yet. When they exist, listen to the "langchange" event
// (detail = "en" | "fr") to swap the texts.
(() => {
  const box = document.querySelector(".lang-switch");
  if (!box) return;
  const KEY = "cv-lang";
  const phone = matchMedia("(max-width: 720px)");   // same breakpoint as lang.css
  const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
  const save = (v) => { try { localStorage.setItem(KEY, v); } catch { /* private mode: fine */ } };
  const buttons = [...box.querySelectorAll("button[data-lang]")];
  const codes = buttons.map((b) => b.dataset.lang);

  const set = (code, announce) => {
    box.dataset.active = code;
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === code)));
    document.documentElement.lang = code;
    document.documentElement.dataset.lang = code;
    if (announce) document.dispatchEvent(new CustomEvent("langchange", { detail: code }));
  };

  // Restore the saved choice without animation, then turn the slide on
  const start = read();
  if (codes.includes(start) && start !== box.dataset.active) set(start, false);
  requestAnimationFrame(() => requestAnimationFrame(() => box.classList.add("is-ready")));

  box.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-lang]");
    if (!b) return;
    let code = b.dataset.lang;
    if (code === box.dataset.active) {
      // Phones show only the chosen flag: a tap on it switches to the other language
      if (!phone.matches) return;
      code = codes.find((c) => c !== code);
    }
    save(code);
    set(code, true);
    if (phone.matches) box.querySelector(`[data-lang="${code}"]`).focus({ focusVisible: false });
  });
})();
