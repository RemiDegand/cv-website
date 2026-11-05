// TEMPORARY (5 Nov 2026, web design pass): 5 Toolbox designs shown one after the other on Home, so the user can pick one.
// All 5 are built from the same list below (same tools, same uses, same places). Delete this file and
// toolbox-options.css (+ their 2 lines and the #toolbox-options block in index.html) once a design is chosen.
(() => {
  const root = document.getElementById("toolbox-options");
  if (!root) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));

  // g = group (A, B, D, E) · s = pipeline stage (A) · k = short name (terminal, keyboard) · sym = periodic symbol
  const TOOLS = [
    { n: "SQL · BigQuery", k: "sql-bigquery", m: "SQL", sym: "Sq", c: "#1a73e8", g: "data", s: 0, at: ["glovo", "oslo"], u: "Queries behind forecasts, reports and data models" },
    { n: "Excel · VBA", k: "excel-vba", m: "XL", sym: "Xl", c: "#1d6f42", g: "data", s: 0, at: ["oslo"], u: "Advanced formulas, macros, finance files" },
    { n: "Google Sheets", k: "google-sheets", m: "GS", sym: "Gs", c: "#188038", g: "data", s: 0, at: ["glovo"], u: "Weekly reports and forecast inputs" },
    { n: "Python", k: "python", m: "Py", sym: "Py", c: "#3776ab", g: "data", s: 1, at: ["glovo"], u: "Data pipeline of the AI summaries" },
    { n: "MyReport", k: "myreport", m: "MR", sym: "Mr", c: "#d9531e", g: "bi", s: 1, at: ["oslo"], u: "ETL, data models and dashboards" },
    { n: "Apps Script", k: "apps-script", m: "AS", sym: "As", c: "#b06000", g: "build", s: 1, at: ["glovo"], u: "Back end of the web app, sheet automations" },
    { n: "Looker", k: "looker", m: "Lk", sym: "Lk", c: "#5b47d6", g: "bi", s: 2, at: ["glovo"], u: "Weekly review of past forecasts" },
    { n: "Chart.js", k: "chart-js", m: "Ch", sym: "Cj", c: "#e0466b", g: "bi", s: 2, at: ["glovo"], u: "Charts of the forecast web app" },
    { n: "HTML · CSS · JavaScript", k: "html-css-js", m: "</>", sym: "Js", c: "#e34c26", g: "build", s: 2, at: ["glovo", "site"], u: "The forecast web app and this website" },
    { n: "LLMs · Gemini, Claude", k: "llms", m: "AI", sym: "Ai", c: "#7c3aed", g: "ai", s: 3, at: ["glovo", "site"], u: "AI summaries, chatbot, AI skills" },
    { n: "AI agents · OpenCode", k: "opencode", m: ">_", sym: "Oc", c: "#27272a", g: "ai", s: 3, at: ["glovo"], u: "AI skill for forecast adjustments" },
    { n: "Vertex AI", k: "vertex-ai", m: "Vx", sym: "Vx", c: "#1967d2", g: "ai", s: 3, at: ["glovo"], u: "Gemini inside the web app" },
    { n: "Prompt engineering", k: "prompts", m: "Pr", sym: "Pe", c: "#a21caf", g: "ai", s: 3, at: ["glovo"], u: "Rules and examples that make AI output reliable" },
    { n: "Cloud Run", k: "cloud-run", m: "CR", sym: "Cr", c: "#3b6fd8", g: "build", s: 4, at: ["glovo"], u: "Cloud service of the web app" },
    { n: "GitHub", k: "github", m: "GH", sym: "Gh", c: "#24292f", g: "build", s: 4, at: ["glovo", "site"], u: "Shared AI skill and this website's code" },
  ];
  const GROUPS = { data: ["Data & analysis", "#2563eb"], bi: ["Dashboards & BI", "#6d5dfc"], ai: ["AI", "#c026d3"], build: ["Build & automate", "#0d9488"] };
  const GROUP_ORDER = ["data", "bi", "ai", "build"];
  const STAGES = [["Collect & store", "Where the data lives"], ["Transform & model", "Clean it, shape it"], ["Show", "Make it readable"], ["Add AI", "Explain and automate"], ["Ship", "Share it and run it"]];
  const PLACES = [["all", "All"], ["glovo", "Glovo"], ["oslo", "OSLO"], ["site", "This website"]];
  const PLACE_NAME = { glovo: "Glovo", oslo: "OSLO", site: "This website" };

  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const tags = (t) => t.at.map((p) => `<span class="at at-${p}">${PLACE_NAME[p]}</span>`).join("");
  const mark = (t) => `<span class="tool-mark" aria-hidden="true">${esc(t.m)}</span>`;
  const filterBar = (cls = "") => `<div class="tbo-filter ${cls}" role="group" aria-label="Show the tools I used at">${PLACES.map(([id, l], i) =>
    `<button type="button" data-place="${id}" aria-pressed="${i === 0}">${id === "all" ? "" : `<i class="tb-dot at-${id}" aria-hidden="true"></i>`}${l}</button>`).join("")}</div>`;
  // Generic filter: items with data-at get .is-off when they don't match; optional callback after each change
  const wireFilter = (box, after) => {
    const bar = box.querySelector(".tbo-filter");
    if (!bar) return;
    bar.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      const p = b.dataset.place;
      bar.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      box.classList.toggle("is-filtered", p !== "all");
      box.querySelectorAll("[data-at]").forEach((el) => el.classList.toggle("is-off", p !== "all" && !el.dataset.at.split(" ").includes(p)));
      if (after) after(p);
    });
  };
  const item = (t, i) => `data-i="${i}" data-at="${t.at.join(" ")}" style="--c: ${t.c}"`;
  const frame = (letter, title, pitch, body) => `<section class="tbo" aria-label="Option ${letter}: ${title}">
      <p class="tbo-label"><b>Option ${letter}</b>${title}</p><p class="tbo-pitch">${pitch}</p>${body}</section>`;

  // ---------- A. Data pipeline ----------
  const optA = frame("A", "Data pipeline", "The tools along the path the data takes. Pick a place: only its route lights up.",
    `<div class="pl" data-opt="a">${filterBar()}<ol class="pl-stages">${STAGES.map(([name, sub], s) => `
      <li class="pl-stage" data-stage="${s}" style="--s: ${s}">
        <div class="pl-node"><span>${s + 1}</span></div>
        <h4>${name}</h4><p class="pl-sub">${sub}</p>
        <ul>${TOOLS.map((t, i) => t.s !== s ? "" : `<li class="pl-tool" ${item(t, i)}>${mark(t)}<div><strong>${esc(t.n)}</strong><span>${t.u}</span><p class="pl-tags">${tags(t)}</p></div></li>`).join("")}</ul>
      </li>`).join("")}</ol></div>`);

  // ---------- B. A toolbox that opens ----------
  const optB = frame("B", "A toolbox that opens", "The lid opens when it comes into view and the trays rise one by one. Hover a tool to read what it was for.",
    `<div class="tbx" data-opt="b">${filterBar()}
      <div class="tbx-scene">
        <div class="tbx-rise">${GROUP_ORDER.map((g, gi) => `
          <div class="tbx-tray" style="--k: ${gi}; --d: ${GROUPS[g][1]}"><span class="tbx-tray-name">${GROUPS[g][0]}</span><div class="tbx-slots">${TOOLS.map((t, i) => t.g !== g ? "" :
            `<button type="button" class="tbx-tool" ${item(t, i)}>${mark(t)}<span>${esc(t.n)}</span></button>`).join("")}</div></div>`).join("")}
        </div>
        <div class="tbx-box"><div class="tbx-lid"></div><span class="tbx-latch l"></span><span class="tbx-latch r"></span><span class="tbx-plate">Rémi's toolbox</span></div>
      </div>
      <p class="tbo-detail" aria-live="polite">Hover or tap a tool.</p></div>`);

  // ---------- C. Terminal ----------
  const optC = frame("C", "Terminal", "A terminal lists the toolbox. The place buttons become commands, typed live.",
    `<div class="term" data-opt="c"><div class="term-bar"><i></i><i></i><i></i><span>rd@cv: ~/toolbox</span></div>
      <div class="term-body" aria-live="polite"></div>
      <div class="term-cmds" role="group" aria-label="Show the tools I used at">${PLACES.map(([id, l], i) =>
        `<button type="button" data-place="${id}" aria-pressed="${i === 0}">${id === "all" ? "ls" : `ls --at ${id}`}</button>`).join("")}</div></div>`);

  // ---------- D. Keyboard ----------
  const rows = [TOOLS.slice(0, 5), TOOLS.slice(5, 10), TOOLS.slice(10, 15)];
  const mods = [["Esc", "⌫"], ["Tab", "Enter"], ["Shift", "Shift"]];
  const optD = frame("D", "Keyboard", "Each tool is a key: press one to read it. The place buttons light up its keys.",
    `<div class="kb" data-opt="d">${filterBar()}
      <div class="kb-screen" aria-live="polite"><span class="kb-screen-hint">Press a key</span></div>
      <div class="kb-board">${rows.map((row, r) => `<div class="kb-row"><span class="kb-key kb-mod" aria-hidden="true">${mods[r][0]}</span>${row.map((t) => {
        const i = TOOLS.indexOf(t);
        return `<button type="button" class="kb-key" ${item(t, i)}><b>${esc(t.m)}</b><small>${esc(t.n.split(" · ")[0])}</small></button>`; }).join("")}<span class="kb-key kb-mod" aria-hidden="true">${mods[r][1]}</span></div>`).join("")}
        <div class="kb-row"><span class="kb-key kb-mod" aria-hidden="true">Fn</span><span class="kb-key kb-space" aria-hidden="true">Data &amp; Business Analyst</span><span class="kb-key kb-mod" aria-hidden="true">Alt</span></div>
      </div></div>`);

  // ---------- E. Periodic table ----------
  let n = 0;
  const optE = frame("E", "Periodic table", "Each tool is an element, coloured by family. Hover one to see its card.",
    `<div class="pt" data-opt="e">${filterBar()}
      <div class="pt-grid">
        <div class="pt-key" aria-live="polite"></div>
        ${GROUP_ORDER.map((g) => TOOLS.map((t, i) => t.g !== g ? "" :
          `<button type="button" class="pt-el" data-i="${i}" data-at="${t.at.join(" ")}" style="--c: ${GROUPS[g][1]}; --n: ${n++}"><span class="pt-no">${n}</span><b>${t.sym}</b><small>${esc(t.n.split(" · ")[0])}</small><span class="pt-dots">${t.at.map((p) => `<i class="tb-dot at-${p}"></i>`).join("")}</span></button>`).join("")).join("")}
      </div>
      <ul class="pt-legend">${GROUP_ORDER.map((g) => `<li style="--c: ${GROUPS[g][1]}">${GROUPS[g][0]}</li>`).join("")}</ul></div>`);

  root.innerHTML = optA + optB + optC + optD + optE;

  // Shared detail text for B, D, E
  const detail = (t) => `<strong>${esc(t.n)}</strong><span>${t.u}</span><span class="tbo-tags">${tags(t)}</span>`;

  // A
  const pl = root.querySelector(".pl");
  wireFilter(pl, () => pl.querySelectorAll(".pl-stage").forEach((st) =>
    st.classList.toggle("is-empty", [...st.querySelectorAll(".pl-tool")].every((x) => x.classList.contains("is-off")))));

  // B
  const tbx = root.querySelector(".tbx");
  wireFilter(tbx);
  const tbxDetail = tbx.querySelector(".tbo-detail");
  tbx.querySelectorAll(".tbx-tool").forEach((b) => {
    const show = () => { tbxDetail.innerHTML = detail(TOOLS[b.dataset.i]); tbxDetail.style.setProperty("--c", b.style.getPropertyValue("--c")); };
    b.addEventListener("pointerenter", show); b.addEventListener("focus", show); b.addEventListener("click", show);
  });

  // C: types a command, then prints the matching tools group by group
  const term = root.querySelector(".term");
  const out = term.querySelector(".term-body");
  let run = 0;
  const print = async (place) => {
    const me = ++run;
    out.innerHTML = "";
    const line = (html, cls = "") => { const d = document.createElement("div"); d.className = "term-line " + cls; d.innerHTML = html; out.append(d); return d; };
    const cmd = place === "all" ? "ls ~/toolbox" : `ls ~/toolbox --at ${place}`;
    const l = line(`<span class="term-prompt">rd@cv:~$</span> <span class="term-cmd"></span><span class="term-caret"></span>`);
    const c = l.querySelector(".term-cmd");
    for (const ch of cmd) { if (me !== run) return; c.textContent += ch; await wait(38); }
    l.querySelector(".term-caret").remove();
    await wait(250);
    let n = 0;
    for (const g of GROUP_ORDER) {
      const list = TOOLS.filter((t) => t.g === g && (place === "all" || t.at.includes(place)));
      if (!list.length) continue;
      if (me !== run) return;
      line(`<span class="term-dir" style="color: ${GROUPS[g][1]}">${GROUPS[g][0].toLowerCase().replace(/ & /g, "-and-").replace(/ /g, "-")}/</span>`);
      for (const t of list) {
        if (me !== run) return;
        await wait(70);
        line(`<span class="term-name" style="--c: ${t.c}">${t.k}</span><span class="term-com"># ${t.u}</span><span class="term-at">[${t.at.map((p) => PLACE_NAME[p]).join(", ")}]</span>`, "term-item");
        n++;
      }
    }
    if (me !== run) return;
    await wait(150);
    line(`<span class="term-ok">${n} tools</span>`);
    line(`<span class="term-prompt">rd@cv:~$</span> <span class="term-caret"></span>`);
  };
  term.querySelector(".term-cmds").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    term.querySelectorAll(".term-cmds button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    print(b.dataset.place);
  });

  // D
  const kb = root.querySelector(".kb");
  wireFilter(kb);
  const screen = kb.querySelector(".kb-screen");
  kb.querySelectorAll("button.kb-key").forEach((b) => {
    const show = () => {
      kb.querySelectorAll(".kb-key.is-down").forEach((x) => x.classList.remove("is-down"));
      b.classList.add("is-down");
      screen.innerHTML = detail(TOOLS[b.dataset.i]);
      screen.style.setProperty("--c", b.style.getPropertyValue("--c"));
    };
    b.addEventListener("click", show); b.addEventListener("focus", show);
    b.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") show(); });
  });

  // E
  const pt = root.querySelector(".pt");
  wireFilter(pt);
  const key = pt.querySelector(".pt-key");
  const showEl = (b) => {
    const t = TOOLS[b.dataset.i];
    key.style.setProperty("--c", GROUPS[t.g][1]);
    key.innerHTML = `<span class="pt-no">${b.querySelector(".pt-no").textContent}</span><b>${t.sym}</b><strong>${esc(t.n)}</strong><span class="pt-use">${t.u}</span><span class="tbo-tags">${tags(t)}</span><span class="pt-fam">${GROUPS[t.g][0]}</span>`;
    pt.querySelectorAll(".pt-el.is-on").forEach((x) => x.classList.remove("is-on"));
    b.classList.add("is-on");
  };
  pt.querySelectorAll(".pt-el").forEach((b) => { b.addEventListener("pointerenter", () => showEl(b)); b.addEventListener("focus", () => showEl(b)); b.addEventListener("click", () => showEl(b)); });
  showEl(pt.querySelector(".pt-el"));

  // Each option starts its entrance when it comes into view (B opens the lid, C starts typing)
  const start = (el) => { el.classList.add("in"); if (el.contains(term) && !term.dataset.started) { term.dataset.started = "1"; print("all"); } };
  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { start(e.target); io.unobserve(e.target); } }), { threshold: 0.25 });
    root.querySelectorAll(".tbo").forEach((el) => io.observe(el));
  } else root.querySelectorAll(".tbo").forEach(start);
})();
