// Builds the project cards of the website from content/projects.json (the display space).
//   node tools/build-projects.js
// Rewrites only what sits between the build markers:
//   projects.html  <!-- build:projects -->      … <!-- /build:projects -->       (category tiles + filters + sections + cards)
//   index.html     <!-- build:home-projects --> … <!-- /build:home-projects -->  (Key projects carousel: projects with "home": true)
// Everything known about a project lives in knowledge/projects/<id>.md (for the chatbot); the
// project pages (project-<id>.html) are still edited by hand.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "content", "projects.json"), "utf8"));

// Text from the JSON is plain text: escape it for HTML
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Category icons (24 × 24 line icons, drawn with the text colour)
const icons = {
  "app-window": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
  "sparkles": '<path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z"/><path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
  "bar-chart": '<path d="M3 21h18"/><rect x="5" y="11" width="3" height="7" rx="1"/><rect x="10.5" y="5" width="3" height="13" rx="1"/><rect x="16" y="14" width="3" height="4" rx="1"/>',
  "database": '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
};
const icon = (name) => {
  if (!icons[name]) throw new Error(`Unknown icon "${name}"`);
  return `<span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg></span>`;
};

// One project card (same on the Projects page and the Home carousel)
const card = (p, pad) => {
  const co = data.companies[p.company];
  if (!co) throw new Error(`Unknown company "${p.company}" in project "${p.id}"`);
  return [
    `<article class="card project" style="--brand: ${co.brand}" data-areas="${p.areas.join(" ")}" data-ai="${p.ai}">`,
    `  <p class="project-org"><img src="${co.logo}" alt="${esc(co.name)} logo" class="project-logo" width="24" height="24">${esc(co.name)} · ${esc(co.industry)}</p>`,
    `  <h4><a href="project-${p.id}.html" class="project-link">${esc(p.title)}</a></h4>`,
    `  <p class="card-desc">${esc(p.description)}</p>`,
    p.result ? `  <p class="project-result"><strong>${esc(p.result.key)}</strong> ${esc(p.result.text)}</p>` : null,
    `  <ul class="tags">`,
    `    ${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}`,
    `  </ul>`,
    `</article>`,
  ].filter((line) => line !== null).map((line) => pad + line).join("\n");
};

const projectsHtml = () => [
  `        <nav class="cat-overview" aria-label="Project categories">`,
  ...data.categories.map((c) => [
    `          <a href="#${c.id}" class="cat-tile">`,
    `            ${icon(c.icon)}`,
    `            <strong>${esc(c.name)}</strong>`,
    `            <span class="cat-desc">${esc(c.description)}</span>`,
    `          </a>`,
  ].join("\n")),
  `        </nav>`,
  "",
  // Filters: one button per business area (only areas that have projects, so a new area such as
  // HR shows up by itself once a project uses it) + the "Uses AI" switch. Hidden until script.js
  // makes them work; it also writes the counts
  `        <div class="filters" role="group" aria-label="Filter projects" hidden>`,
  `          <span class="filters-label">Business area</span>`,
  `          <div class="filter-chips">`,
  `            <button type="button" class="filter-chip" data-area="" aria-pressed="true">All <span class="filter-count"></span></button>`,
  ...data.areas.filter((a) => data.projects.some((p) => p.areas.includes(a.id))).map((a) =>
    `            <button type="button" class="filter-chip" data-area="${a.id}" aria-pressed="false">${esc(a.name)} <span class="filter-count"></span></button>`),
  `          </div>`,
  `          <button type="button" class="filter-switch" role="switch" aria-checked="false"><span class="switch-track" aria-hidden="true"></span><svg class="filter-ai-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons.sparkles}</svg>Uses AI <span class="filter-count"></span></button>`,
  `        </div>`,
  "",
  data.categories.map((c) => {
    const items = data.projects.filter((p) => p.category === c.id);
    return [
      `        <div class="cat-section" id="${c.id}">`,
      `          <header class="cat-section-head">`,
      `            ${icon(c.icon)}`,
      `            <div>`,
      `              <h2>${esc(c.name)}</h2>`,
      `              <p class="cat-desc">${esc(c.description)}</p>`,
      `            </div>`,
      `          </header>`,
      `          <div class="cat-grid">`,
      items.map((p) => card(p, "            ")).join("\n\n"),
      `          </div>`,
      `        </div>`,
    ].join("\n");
  }).join("\n\n"),
].join("\n");

const homeHtml = () => data.projects.filter((p) => p.home).map((p) => card(p, "              ")).join("\n\n");

// Every project needs a known category, known business area(s), "ai" true/false, and its page must exist
data.projects.forEach((p) => {
  if (!data.categories.some((c) => c.id === p.category)) throw new Error(`Unknown category "${p.category}" in project "${p.id}"`);
  if (!Array.isArray(p.areas) || !p.areas.length) throw new Error(`Project "${p.id}" needs at least one business area`);
  p.areas.forEach((a) => { if (!data.areas.some((x) => x.id === a)) throw new Error(`Unknown business area "${a}" in project "${p.id}"`); });
  if (typeof p.ai !== "boolean") throw new Error(`Project "${p.id}" needs "ai": true or false`);
  if (!fs.existsSync(path.join(root, `project-${p.id}.html`))) throw new Error(`Missing page project-${p.id}.html`);
});

// Replace the text between <!-- build:name --> and <!-- /build:name --> (keeps the file's line endings)
const fill = (file, name, html) => {
  const full = path.join(root, file);
  const text = fs.readFileSync(full, "utf8");
  const eol = text.includes("\r\n") ? "\r\n" : "\n";
  const re = new RegExp(`(<!-- build:${name} -->)[\\s\\S]*?(\\n[ \\t]*<!-- /build:${name} -->)`);
  if (!re.test(text)) throw new Error(`Markers build:${name} not found in ${file}`);
  const out = text.replace(re, (m, open, close) => `${open}\n${html}${close}`).replace(/\r?\n/g, eol);
  fs.writeFileSync(full, out);
  console.log(`${file}: ${name} rebuilt`);
};

fill("projects.html", "projects", projectsHtml());
fill("index.html", "home-projects", homeHtml());
