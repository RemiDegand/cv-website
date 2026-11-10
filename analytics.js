// Google Analytics 4 + cookie consent (Platform & Data agent, 10 Nov 2026).
// - EU rule (GDPR / CNIL): nothing from Google loads and no cookie is set before the visitor clicks "Accept"
//   (Consent Mode v2, "basic" mode). "Refuse" is as easy as "Accept"; the choice is kept 6 months, then asked again.
// - A "Cookies" link is added to the footer of every page to change the choice later.
// - Custom events: chatbot_open, chatbot_question, cv_download, contact_click, project_open, experience_open,
//   simulation_start, simulation_restart, language_change. No typed text is ever sent (only its length).
// - Banner LOOK = Web Designer (consent.css). Logic = this file.
// - While GA_ID is empty, nothing happens (no banner, no tracking). Test locally with ?ga-debug in the address.
(() => {
  const GA_ID = "G-CVMS5B93RP";                      // GA4 Measurement ID (property "CV website", 10 Nov 2026)
  const KEY = "cv-consent";
  const MAX_AGE = 182 * 24 * 3600 * 1000;            // CNIL: ask again after ~6 months
  const debug = /[?&]ga-debug\b/.test(location.search);
  const local = /^(localhost|127\.|$)/.test(location.hostname) || location.protocol === "file:";
  if ((!GA_ID || local) && !debug) return;           // not set up yet, or a local copy: stay silent

  const fr = document.documentElement.lang === "fr";
  const T = fr
    ? { text: "Ce site utilise les cookies de Google Analytics pour mesurer les visites, uniquement si vous acceptez. Aucune publicité.", accept: "Accepter", refuse: "Refuser", link: "Cookies", label: "Cookies" }
    : { text: "This site uses Google Analytics cookies to measure visits, only if you accept. No ads.", accept: "Accept", refuse: "Refuse", link: "Cookies", label: "Cookies" };

  // --- consent storage -------------------------------------------------------------------------
  const read = () => {
    try {
      const c = JSON.parse(localStorage.getItem(KEY) || "null");
      return c && Date.now() - c.t < MAX_AGE ? c.v : null;
    } catch (e) { return null; }
  };
  const save = (v) => { try { localStorage.setItem(KEY, JSON.stringify({ v, t: Date.now() })); } catch (e) {} };

  // --- gtag, consent denied by default ----------------------------------------------------------
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });

  // Page group (GA4 "Content group"): the detail pages count in their section (10 Nov 2026)
  const path = location.pathname.split("/").pop().replace(/\.html$/, "") || "index";
  const group =
    path === "index" ? "Home" :
    /^experience/.test(path) ? "Experiences" :
    /^project/.test(path) ? "Projects" :
    path === "education" ? "Education" :
    path === "contact" ? "Contact" : "Other";

  let loaded = false;
  const load = () => {
    if (loaded || !GA_ID) return;
    loaded = true;
    gtag("consent", "update", { analytics_storage: "granted" });
    gtag("js", new Date());
    gtag("config", GA_ID, { content_group: group, ...(debug ? { debug_mode: true } : {}) });
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.append(s);
  };
  const clearCookies = () => {                       // after a "Refuse" that follows an "Accept"
    const host = location.hostname.split(".");
    document.cookie.split(";").map((c) => c.trim().split("=")[0]).filter((n) => /^_ga/.test(n)).forEach((n) => {
      for (let i = 0; i < host.length; i++) {
        const d = host.slice(i).join(".");
        document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${d}`;
      }
      document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  };
  const track = (name, params = {}) => { if (loaded) gtag("event", name, params); };

  // --- banner + footer link --------------------------------------------------------------------
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "consent.css";
  document.head.append(css);

  let banner = null;
  const close = () => { banner?.remove(); banner = null; };
  const choose = (v) => {
    const was = read();
    save(v);
    close();
    if (v === "granted") load();
    else { clearCookies(); if (was === "granted") location.reload(); }  // stop the running tag
  };
  const open = () => {
    if (banner) return;
    banner = document.createElement("div");
    banner.className = "consent";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", T.label);
    banner.innerHTML = `<p class="consent-text">${T.text}</p>
      <div class="consent-actions">
        <button type="button" class="consent-btn" data-v="denied">${T.refuse}</button>
        <button type="button" class="consent-btn" data-v="granted">${T.accept}</button>
      </div>`;
    banner.addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (b) choose(b.dataset.v); });
    document.body.append(banner);
  };

  const addFooterLink = () => {
    const f = document.querySelector(".footer .container") || document.querySelector(".footer");
    if (!f || f.querySelector(".consent-link")) return;
    const a = document.createElement("button");
    a.type = "button";
    a.className = "consent-link";
    a.textContent = T.link;
    a.addEventListener("click", open);
    f.append(" · ", a);
  };

  const start = () => {
    addFooterLink();
    const c = read();
    if (c === "granted") load();
    else if (c !== "denied") open();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();

  // --- custom events (one listener, capture phase: works for elements added or removed later) --
  const page = location.pathname.replace(/^\/|\.html$/g, "") || "index";
  document.addEventListener("click", (e) => {
    const el = e.target instanceof Element ? e.target : null;
    if (!el) return;

    const a = el.closest("a[href]");
    if (a) {
      const href = a.getAttribute("href");
      if (/CV\.pdf$/i.test(href)) track("cv_download", { from_page: page });
      else if (/^mailto:/i.test(href)) track("contact_click", { method: "email", from_page: page });
      else if (/linkedin\.com/i.test(href)) track("contact_click", { method: "linkedin", from_page: page });
      else {
        const p = href.match(/(?:^|\/)project-([a-z0-9-]+?)(?:\.html)?(?:[#?]|$)/i);
        const x = href.match(/(?:^|\/)experience-([a-z0-9-]+?)(?:\.html)?(?:[#?]|$)/i);
        if (p) track("project_open", { project: p[1], from_page: page });
        else if (x) track("experience_open", { experience: x[1], from_page: page });
      }
      return;
    }
    if (el.closest(".ct-copy")) return track("contact_click", { method: "email_copy", from_page: page });

    const cva = el.closest(".cva");
    if (cva) {
      if (el.closest(".cva-launcher, .cva-tip") && !cva.classList.contains("is-open")) track("chatbot_open", { from_page: page });
      const chip = el.closest(".cva-chips button");
      if (chip) track("chatbot_question", { type: "chip", question: chip.textContent.trim().slice(0, 100), from_page: page });
      return;
    }

    const sim = el.closest(".sim-restart");
    if (sim) {
      const stage = sim.closest(".sim-stage") || sim.parentElement;
      const name = [...(stage?.classList || [])].find((c) => !/^(sim-|is-|reveal)/.test(c)) || "unknown";
      track(stage?.classList.contains("is-waiting") ? "simulation_start" : "simulation_restart", { simulation: name, from_page: page });
      return;
    }

    const lang = el.closest(".lang-switch button[data-lang]");
    if (lang && lang.dataset.lang !== document.documentElement.lang) track("language_change", { language: lang.dataset.lang, from_page: page });
  }, true);

  document.addEventListener("submit", (e) => {
    const form = e.target;
    if (!(form instanceof Element) || !form.matches(".cva-form")) return;
    const q = (form.querySelector("input")?.value || "").trim();
    if (q) track("chatbot_question", { type: "typed", length: q.length, from_page: page });   // never the text itself
  }, true);
})();
