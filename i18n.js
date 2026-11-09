// French version of the site (9 Nov 2026, general agent). English stays the default.
// The flags (lang.js, Web Designer) save the choice and set <html data-lang="fr"> before the first paint.
// This file swaps the English texts for the French ones of the dictionary, before the other scripts run:
//   <script src="i18n/fr/common.js"></script>      texts shared by every page + texts of the scripts
//   <script src="i18n/fr/<page>.js"></script>      texts of this page
//   <script src="i18n.js"></script>                this file (not deferred: before script.js)
// The dictionary files are built by tools/build-i18n.js from i18n/fr.json (English → French); never edit them by hand.
// How a page is translated: a block of text (an element with text and only inline tags inside: b, strong, a, span…)
// is looked up by its English HTML; other texts by their words; plus alt, title, aria-label, placeholder and
// data-words. Anything not in the dictionary stays in English.
// Scripts translate their own texts with t("English text") or t("Entry {n} of {m}", { n: 1, m: 3 }).
// A click on a flag reloads the page in the other language (simulations and animations restart cleanly).
(() => {
  const html = document.documentElement;
  const FR = window.I18N_FR || {};
  const extract = /[?&]i18n=extract\b/.test(location.search);
  const lang = !extract && html.dataset.lang === "fr" ? "fr" : "en";
  const norm = (s) => s.replace(/\s+/g, " ").trim();
  const has = (k) => Object.prototype.hasOwnProperty.call(FR, k) && FR[k] !== "";

  window.t = (s, vars) => {
    let out = lang === "fr" && has(s) ? FR[s] : s;
    if (vars) out = out.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
    return out;
  };
  window.siteLang = lang;

  const INLINE = new Set(["b", "strong", "i", "em", "a", "span", "br", "small", "sup", "sub", "code", "abbr", "u",
    "mark", "time", "q", "s", "wbr", "kbd", "dfn", "del", "ins", "tspan"]);
  const SKIP = new Set(["script", "style", "noscript", "textarea"]);
  const ATTRS = ["alt", "title", "aria-label", "placeholder", "data-words"];
  const tag = (el) => el.tagName.toLowerCase();
  const hasLetters = (s) => /[A-Za-zÀ-ÿ]/.test(s);
  const directText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim());
  const isBlock = (el) => directText(el) && [...el.querySelectorAll("*")].every((d) => INLINE.has(tag(d)));

  const found = [];   // extract mode: every text of the page
  const seen = new Set();
  const use = (key, kind) => {
    if (!key || !hasLetters(key.replace(/<[^>]*>/g, ""))) return null;
    if (extract) { if (!seen.has(key)) { seen.add(key); found.push({ key, kind }); } return null; }
    return has(key) ? FR[key] : null;
  };

  const attrs = (el) => {
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (v == null) continue;
      const fr = use(norm(v), "attr");
      if (fr != null) el.setAttribute(a, fr);
    }
  };

  const walk = (el) => {
    if (SKIP.has(tag(el)) || el.closest("[translate='no']") === el) return;
    if (tag(el) === "template") { [...el.content.children].forEach(walk); return; }   // cards shown later by a script
    attrs(el);
    if (isBlock(el)) {
      const fr = use(norm(el.innerHTML), "html");   // the French HTML carries its own attributes
      if (fr != null) el.innerHTML = fr;
      else el.querySelectorAll("*").forEach(attrs);
      return;
    }
    for (const n of [...el.childNodes]) {
      if (n.nodeType === 3) {
        const raw = n.nodeValue;
        const fr = use(norm(raw), "text");
        if (fr != null) n.nodeValue = raw.match(/^\s*/)[0] + fr + raw.match(/\s*$/)[0];
      } else if (n.nodeType === 1) walk(n);
    }
  };

  if (extract || lang === "fr") {
    const title = use(norm(document.title), "title");
    if (title != null) document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) { const d = use(norm(meta.content), "attr"); if (d != null) meta.content = d; }
    walk(document.body);
  }

  if (extract) {
    const out = document.createElement("script");
    out.type = "application/json";
    out.id = "i18n-dump";
    out.textContent = JSON.stringify(found).replace(/</g, "\\u003c");
    document.body.append(out);
  }

  // A flag was clicked (lang.js has saved the choice): reload once the flag has moved
  document.addEventListener("langchange", (e) => { if (e.detail !== lang) setTimeout(() => location.reload(), 250); });
})();
