// Rémi's AI assistant (3 Nov 2026, web design pass). One script for every page:
//   <script src="chatbot.js" defer></script>   (it loads chatbot.css itself)
// 1. First page of a visit: welcome animation in the middle of the screen, then the avatar
//    flies to the bottom right and becomes the chat bubble. Later pages: just the bubble.
// 2. The bubble opens the chat panel (suggested questions + free question).
// PREVIEW MODE: until the Phase 2 backend exists (RAG + Gemini), answers come from ANSWERS
// below (facts already on the site). To go live, set ENDPOINT: it receives
// { question, history } as JSON and must return { answer } (plain text).
(() => {
  const t = window.t || ((s, v) => (v ? s.replace(/\{(\w+)\}/g, (m, k) => v[k] ?? m) : s));   // French version: i18n.js (9 Nov 2026)
  const NAME = "Ada";          // the assistant's name: change it here only
  const ENDPOINT = "/api/ask"; // Gemini back end (functions/index.js, Hosting rewrite in firebase.json; 9 Nov 2026). null = preview answers only
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get(key) { try { return JSON.parse(sessionStorage.getItem("cva-" + key)); } catch { return null; } },
    set(key, value) { try { sessionStorage.setItem("cva-" + key, JSON.stringify(value)); } catch { /* private mode: fine */ } },
  };

  // ----- Preview answers: facts already on the site, with a link to the page that shows them -----
  const ANSWERS = [   // keys: English + French words (no accents), the French version shows French chips and answers
    { chip: t("What is he doing now?"), keys: ["now", "current", "today", "study", "studies", "student", "school", "neoma", "master", "degree", "education", "university", "mim", "msc", "maintenant", "actuel", "aujourd", "etude", "ecole", "diplome", "formation", "universite"],
      a: t("Rémi is in the <b>final year of his Master in Management at NEOMA Business School</b>, MSc Business Analytics (2026 – 2027). Before that, he took a gap year for two data internships, at Glovo and OSLO.<br><a href=\"education.html\">See his education →</a>") },
    { chip: t("When is he available?"), keys: ["available", "availability", "when", "start", "looking", "internship", "vie", "job", "contract", "full-time", "full time", "hire", "hiring", "position", "role", "opportunit", "want", "next", "disponib", "quand", "recherche", "stage", "emploi", "poste", "cdi", "contrat", "embauch", "recrut"],
      a: t("He is looking for an <b>Analyst role in a data-driven company</b>: an internship, a VIE or a full-time contract, <b>from May 2027</b>.<br><a href=\"contact.html\">Contact him →</a>") },
    { chip: t("What did he do at Glovo?"), keys: ["glovo", "barcelona", "forecast", "forecasting", "rider", "supply", "spain", "barcelone", "prevision", "livreur", "espagne"],
      a: t("From <b>March to September 2026</b>, Rémi was a Forecasting Analyst Intern at <b>Glovo</b> in Barcelona (Supply Ops, PLECA market). He forecast weekly rider supply for <b>5 countries</b> and built a forecast accuracy web app used daily by the forecasting team.<br><a href=\"experience-glovo.html\">More about Glovo →</a>") },
    { chip: t("And at OSLO?"), keys: ["oslo", "revenue", "vat", "finance", "financial", "data analyst", "villeneuve", "france", "chiffre d", "tva", "financ"],
      a: t("From <b>September to December 2025</b>, he was a Data Analyst Intern at <b>OSLO</b> (IT &amp; SaaS solutions). He built data models and dashboards for 4 business units; his revenue recognition model cut annual revenue discrepancies from <b>€350k to €8k</b>.<br><a href=\"experience-oslo.html\">More about OSLO →</a>") },
    { chip: t("Which tools does he use?"), keys: ["tool", "skill", "python", "sql", "excel", "vba", "stack", "technical", "software", "bigquery", "looker", "gemini", "program", "code", "coding", "outil", "competence", "logiciel", "technique"],
      // Same tools as the Home toolbox (user, 7 Nov 2026: no Python)
      a: t("To prepare data: <b>SQL / BigQuery, Excel (VBA), Google Sheets (Apps Script)</b>. To analyse and show it: <b>Power BI, Looker, MyReport</b>. To automate with AI: <b>LLMs (Gemini, Claude), AI agents (OpenCode)</b> and prompt engineering.<br><a href=\"projects.html\">See them in his projects →</a>") },
    { chip: t("Show me his projects"), keys: ["project", "built", "build", "dashboard", "app", "automation", "model", "achievement", "result", "projet", "realis", "tableau de bord", "automatis", "modele", "resultat"],
      a: t("Rémi delivered <b>7 projects</b> during his internships: apps and tools, automations with AI, dashboards and reporting, and data models. For example, a forecast accuracy web app at Glovo and a VAT automation at OSLO.<br><a href=\"projects.html\">See all projects →</a>") },
    { chip: t("Which languages does he speak?"), keys: ["language", "english", "french", "spanish", "speak", "toeic", "anglais", "langue", "francais", "espagnol", "parle"],
      a: t("<b>French</b> (native), <b>English</b> (C1, TOEIC 930/990) and <b>Spanish</b> (B1).") },
    { chip: t("Who is he outside work?"), keys: ["hobby", "hobbies", "sport", "football", "running", "read", "book", "free time", "personality", "passion", "volunteer", "bake", "baking", "loisir", "passe-temps", "lecture", "livre", "course", "benevol", "patisserie", "personnalite"],
      a: t("Football (12 years in a club) and running (the Lille half-marathon), about one book a month, 4 volunteering experiences, and baking.<br><a href=\"index.html#about\">About me →</a>") },
    { chip: t("How can I contact him?"), keys: ["contact", "email", "mail", "linkedin", "reach", "call", "cv", "resume", "phone", "meet", "contacter", "joindre", "telephone", "rencontr"],
      a: t("His email and LinkedIn are on the <a href=\"contact.html\">Contact page</a>, and his CV can be downloaded from the <a href=\"index.html\">Home page</a>.") },
  ];
  const GREETING = t("Hi, I'm {name}, Rémi's AI assistant 👋 Ask me anything about his background, or pick a question below.", { name: NAME });
  const HELLO = t("Hello! What would you like to know about Rémi: his studies, his experience, his projects or his availability?");
  const FALLBACK = t("I'm still learning: in this preview I can answer the main questions about Rémi (studies, experience, projects, skills, availability). Try one of the questions below, or reach him directly on the <a href=\"contact.html\">Contact page</a>.");

  const norm = (text) => text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  function localAnswer(question) {
    const q = norm(question);
    let best = null, score = 0;
    ANSWERS.forEach((item) => {
      const s = item.keys.filter((key) => q.includes(key)).length;
      if (s > score) { score = s; best = item; }
    });
    if (best) return best.a;
    if (/^(hi|hello|hey|bonjour|salut|hola)\b/.test(q)) return HELLO;
    return FALLBACK;
  }

  // ----- Small helpers -----
  const face = '<svg viewBox="0 0 40 40" aria-hidden="true"><ellipse class="eye" cx="14.5" cy="18" rx="3" ry="4.2"/><ellipse class="eye" cx="25.5" cy="18" rx="3" ry="4.2"/><path class="smile" d="M14.5 26q5.5 4.5 11 0"/></svg>';
  const avatar = (extra = "") => `<span class="cva-avatar ${extra}" aria-hidden="true">${face}</span>`;
  const make = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Load the stylesheet first, then build (no flash of unstyled chat)
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "chatbot.css";
  css.onload = build;
  document.head.append(css);

  function build() {
    const root = make(`
      <div class="cva">
        <div class="cva-panel" role="dialog" aria-label="${NAME}, ${t("Rémi's AI assistant")}">
          <header class="cva-head">
            ${avatar()}
            <div class="cva-head-text"><strong>${NAME}</strong><span>${t("Rémi's AI assistant · Preview")}</span></div>
            <button type="button" class="cva-close" aria-label="${t("Close the chat")}"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
          </header>
          <div class="cva-log" aria-live="polite"></div>
          <div class="cva-chips" aria-label="${t("Suggested questions")}"></div>
          <form class="cva-form">
            <input type="text" name="q" maxlength="300" autocomplete="off" placeholder="${t("Ask about Rémi's background…")}" aria-label="${t("Your question")}">
            <button type="submit" aria-label="${t("Send")}" disabled><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
          </form>
          <p class="cva-foot">${t("Answers based on Rémi's CV and this website.")}</p>
        </div>
        <button type="button" class="cva-launcher" aria-label="${t("Open {name}, Rémi's AI assistant", { name: NAME })}" aria-expanded="false">
          ${avatar()}
          <span class="cva-chevron" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>
        </button>
        <div class="cva-tip" aria-hidden="true">${t("Ask me about Rémi")}</div>
      </div>`);
    document.body.append(root);

    const panel = root.querySelector(".cva-panel");
    const log = root.querySelector(".cva-log");
    const chips = root.querySelector(".cva-chips");
    const form = root.querySelector(".cva-form");
    const input = form.querySelector("input");
    const send = form.querySelector("button");
    const launcher = root.querySelector(".cva-launcher");
    const tip = root.querySelector(".cva-tip");
    let busy = false;

    // ----- Conversation (kept while the visitor moves between pages) -----
    const history = store.get("history") || [];   // [{ who: "bot" | "user", text }]
    function addMessage(who, text, save = true) {
      // bot texts come from ANSWERS (trusted HTML) or from the backend (escaped); user text is always escaped
      const html = who === "user" ? escapeHtml(text) : text;
      const msg = make(`<div class="cva-msg ${who}">${who === "bot" ? avatar() : ""}<div class="cva-bubble">${html}</div></div>`);
      log.append(msg);
      log.scrollTop = log.scrollHeight;
      if (save) { history.push({ who, text }); store.set("history", history.slice(-40)); }
      return msg;
    }
    if (history.length) history.forEach((m) => addMessage(m.who, m.text, false));
    else addMessage("bot", GREETING);

    ANSWERS.forEach((item) => {
      const chip = make(`<button type="button">${item.chip}</button>`);
      chip.addEventListener("click", () => ask(item.chip, item.a));   // suggested questions use their ready answer: free and instant, no Gemini call (9 Nov 2026)
      chips.append(chip);
    });

    async function getAnswer(question) {
      if (ENDPOINT) {
        try {
          const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, history: history.slice(-10), lang: document.documentElement.lang === "fr" ? "fr" : "en" }) });   // site language: French site = French answers (Platform & Data, 10 Nov 2026)
          if (res.ok) { const data = await res.json(); if (data && data.answer) return escapeHtml(String(data.answer)); }
        } catch { /* falls back to the preview answers */ }
      }
      return localAnswer(question);
    }

    async function ask(question, preset) {
      question = question.trim();
      if (!question || busy) return;
      busy = true;
      send.disabled = true;
      input.value = "";
      addMessage("user", question);
      const typing = addMessage("bot", `<span class="cva-typing" aria-label="${t("Typing")}"><i></i><i></i><i></i></span>`, false);
      const [answer] = await Promise.all([preset || getAnswer(question), wait(reduce ? 200 : 650 + Math.random() * 500)]);
      typing.remove();
      addMessage("bot", answer);
      busy = false;
      input.focus();
    }

    form.addEventListener("submit", (e) => { e.preventDefault(); ask(input.value); });
    input.addEventListener("input", () => { send.disabled = busy || !input.value.trim(); });

    // ----- Open / close -----
    const isOpen = () => root.classList.contains("is-open");
    function setOpen(open) {
      root.classList.toggle("is-open", open);
      launcher.setAttribute("aria-expanded", String(open));
      launcher.setAttribute("aria-label", open ? `Close ${NAME}` : `Open ${NAME}, Rémi's AI assistant`);
      tip.classList.remove("is-shown");
      if (open) { log.scrollTop = log.scrollHeight; setTimeout(() => input.focus({ preventScroll: true }), 150); store.set("seen-tip", true); }
    }
    launcher.addEventListener("click", () => setOpen(!isOpen()));
    tip.addEventListener("click", () => setOpen(true));
    root.querySelector(".cva-close").addEventListener("click", () => { setOpen(false); launcher.focus(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && isOpen()) { setOpen(false); launcher.focus(); } });

    function showTip() {
      if (store.get("seen-tip") || isOpen()) return;
      tip.classList.add("is-shown");
      setTimeout(() => tip.classList.remove("is-shown"), 6000);
    }

    // ----- Welcome animation: first page of the visit only -----
    if (store.get("welcomed") || reduce) {
      store.set("welcomed", true);
      setTimeout(showTip, 1500);
      return;
    }
    store.set("welcomed", true);
    welcome(root, launcher).then(() => setTimeout(showTip, 400));
  }

  function welcome(root, launcher) {
    return new Promise((resolve) => {
      root.classList.add("cva-waiting");
      const intro = make(`
        <div class="cva-intro" role="dialog" aria-label="Welcome">
          <div class="cva-intro-card">
            <div class="cva-intro-rings" aria-hidden="true"><span></span><span></span></div>
            <span class="cva-intro-shadow" aria-hidden="true"></span>
            ${avatar("cva-intro-orb")}
            <p class="cva-intro-kicker">${t("Welcome to Rémi Degand's CV website")}</p>
            <h2 class="cva-intro-title">${t("Hi, I'm <b>{name}</b>, his AI assistant.", { name: NAME })}</h2>
            <p class="cva-intro-text">${t("Any question about Rémi's background? Don't hesitate to ask me.")}</p>
          </div>
          <button type="button" class="cva-intro-skip">${t("Skip")}</button>
        </div>`);
      document.body.append(intro);
      const html = document.documentElement;
      const overflow = html.style.overflow;
      html.style.overflow = "hidden";
      const orb = intro.querySelector(".cva-intro-orb");
      let leaving = false;

      // The orb flies along a curve to the bubble, shrinking, while the welcome fades away
      function leave() {
        if (leaving) return;
        leaving = true;
        clearTimeout(timer);
        document.removeEventListener("keydown", onKey);
        intro.classList.add("is-leaving");
        const from = orb.getBoundingClientRect(), to = launcher.getBoundingClientRect();
        const dx = to.left + to.width / 2 - (from.left + from.width / 2);
        const dy = to.top + to.height / 2 - (from.top + from.height / 2);
        const s = to.width / from.width;
        orb.style.animation = "none";
        const flight = orb.animate([
          { transform: "none" },
          { transform: `translate(${dx * 0.35}px, ${dy * 0.75}px) scale(${(1 + s) / 1.6})`, offset: 0.55 },
          { transform: `translate(${dx}px, ${dy}px) scale(${s})` },
        ], { duration: 900, easing: "cubic-bezier(0.6, 0, 0.25, 1)", fill: "forwards" });
        let landed = false;
        const land = () => {
          if (landed) return;
          landed = true;
          root.classList.remove("cva-waiting");
          launcher.classList.add("is-landing");
          launcher.addEventListener("animationend", () => launcher.classList.remove("is-landing"), { once: true });
          intro.remove();
          html.style.overflow = overflow;
          resolve();
        };
        flight.finished.then(land, land);
        setTimeout(land, 1300);   // safety net: the page is never left behind the welcome screen
      }
      const onKey = (e) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") leave(); };
      intro.addEventListener("click", leave);
      document.addEventListener("keydown", onKey);
      intro.querySelector(".cva-intro-skip").focus({ preventScroll: true });
      const timer = setTimeout(leave, 5900);   // the fall (~2.1 s), then time to read the 3 lines
    });
  }
})();
