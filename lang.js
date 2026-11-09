// Language switch EN | FR in the top menu (9 Nov 2026, Web Designer). One script for every page:
//   <script src="lang.js" defer></script>   (it loads lang.css itself)
// English is the default. The choice is remembered (localStorage) and set on <html lang> and
// <html data-lang>. DESIGN ONLY for now: no French texts yet. When they exist, listen to the
// "langchange" event (detail = "en" | "fr") to swap the texts.
(() => {
  const LANGS = [
    { code: "en", label: "EN", name: "English" },
    { code: "fr", label: "FR", name: "Français" },
  ];
  const KEY = "cv-lang";
  const phone = matchMedia("(max-width: 720px)");   // same breakpoint as lang.css
  const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
  const save = (v) => { try { localStorage.setItem(KEY, v); } catch { /* private mode: fine */ } };

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "lang.css";
  document.head.appendChild(css);

  const menu = document.querySelector(".menu-inner");
  if (!menu) return;

  const box = document.createElement("div");
  box.className = "lang-switch";
  box.setAttribute("role", "group");
  box.setAttribute("aria-label", "Language");
  box.innerHTML = '<span class="lang-thumb" aria-hidden="true"></span>' + LANGS.map((l) =>
    `<button type="button" data-lang="${l.code}" lang="${l.code}" title="${l.name}" aria-label="${l.name}">${l.label}</button>`
  ).join("");
  menu.appendChild(box);

  const set = (code, announce) => {
    box.dataset.active = code;
    box.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === code)));
    document.documentElement.lang = code;
    document.documentElement.dataset.lang = code;
    if (announce) document.dispatchEvent(new CustomEvent("langchange", { detail: code }));
  };

  const start = read();
  set(LANGS.some((l) => l.code === start) ? start : "en", false);

  box.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    let code = b.dataset.lang;
    if (code === box.dataset.active) {
      // Phones show only the current language: a tap on it switches to the other one
      if (!phone.matches) return;
      code = LANGS.find((l) => l.code !== code).code;
    }
    save(code);
    set(code, true);
    if (phone.matches) box.querySelector(`[data-lang="${code}"]`).focus();
  });
})();
