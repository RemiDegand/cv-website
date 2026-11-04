// node tools/build-experience-pages.js
// Writes one page per key experience (experience-<id>.html), opened from its card on experience.html and the Home carousel.
// Content: the "Experience summaries" of docs/CV website.md (facts only). Projects come from content/projects.json.
// Edit the data below, then run the script again (the pages are generated: don't edit them by hand).
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const { projects, companies } = JSON.parse(fs.readFileSync(path.join(root, "content/projects.json"), "utf8"));

const esc = (s) => s.replace(/&(?!amp;|#)/g, "&amp;");
const experiences = [
  {
    id: "glovo", brand: "#FED42A", logo: "logos/glovo.png", company: "Glovo", industry: "Delivery Platform", site: "https://glovoapp.com",
    title: "Forecasting Analyst Intern",
    lead: "Forecasting Analyst in the Supply Operations department, for the PLECA market. Forecasted weekly rider demand and designed tools for the forecasting team.",
    facts: [["When", "Mar – Sep 2026"], ["Where", "Barcelona, Spain"], ["Timing", "Gap year · 2nd internship"]],
    context: "Glovo is a delivery platform. Each week, the forecasting team plans how many rider slots every zone needs, from the expected customer demand.",
    mission: "Forecast the weekly rider supply of the PLECA market: <strong>5 countries</strong>, several hundred thousand orders and rider slots a week.",
    chips: ["Poland (South)", "Ukraine (West)", "Armenia", "Georgia", "Kyrgyzstan"], chipsLabel: "Countries",
    did: [
      "<strong>Weekly forecasts</strong> of rider supply for the 5 countries, zone by zone.",
      "<strong>Reviewed past forecasts</strong> to find and fix the gaps.",
      "<strong>Led weekly meetings</strong> with the 5 local teams, to add their local input and adjust the forecasts.",
      "<strong>Built tools for the forecasting team</strong>: a web app and an AI skill (see the projects below).",
    ],
    projects: ["forecasting-web-app", "ai-forecast-adjustments"],
    figures: [["5", "countries forecast every week"], ["+8 pts", "forecast accuracy vs. target"], ["Daily use", "of the web app by the whole team"]],
    // Order chosen by the user (3 Nov 2026)
    tools: ["LLMs (Gemini, Claude)", "AI agents (OpenCode)", "BigQuery (SQL)", "Looker", "Google Sheets (Apps Script)"],
    skills: ["Demand forecasting", "Descriptive & diagnostic analysis", "Stakeholder management", "Process automation", "Prompt engineering"],
    // Structure asked by the user (3 Nov 2026): My mission / My tasks / My impact. Source: Experiences/Glovo/Content.docx (kept on my PC only).
    parts: (projectCards) => [
      ["My mission", `
            <div class="block-part reveal">
              <p class="xp-mission">Support the forecasting of <strong>rider demand from customer demand</strong> for one of Glovo's 3 markets, and find ways to make processes more efficient, dashboards more insightful and forecasts more accurate.</p>
              <p>The <strong>PLECA market</strong> covers 6 countries: Poland, Ukraine, Armenia, Georgia, Kazakhstan and Kyrgyzstan. I had full ownership of 5 areas:</p>
              <figure class="xp-map-fig">
                <img src="images/maps/glovo-areas.svg" width="640" height="272" alt="Map of the PLECA market. My areas in yellow: the South of Poland, the West of Ukraine, Armenia, Georgia and Kyrgyzstan. Kazakhstan in grey." loading="lazy">
                <figcaption><span class="xp-map-key is-mine"></span>My areas <span class="xp-map-key"></span>Rest of the PLECA market</figcaption>
              </figure>
            </div>`],
      ["My tasks", `
            <div class="block-part reveal">
              <h3>Forecast rider demand, every week</h3>
              <ul class="project-did reveal-stagger">
                <li><strong>Reviewed last week's performance</strong> of my 5 countries: what happened (descriptive analysis) and why (diagnostic analysis), crossing Looker dashboards with queries analysed in Google Sheets.</li>
                <li><strong>Collected input from the 5 local teams</strong> (in touch all week, 1 meeting a week with each): the external factors behind past performance and the coming events, such as bad weather, the World Cup or a marketing campaign.</li>
                <li><strong>Built forecasts for specific events</strong> from past performance: marketing campaigns, and bank holidays from year-over-year performance.</li>
              </ul>
            </div>
            <div class="block-part reveal">
              <h3>Design tools</h3>
              <div class="xp-cards reveal-stagger">
${projectCards}
              </div>
              <ul class="project-did reveal-stagger">
                <li><strong>Poland:</strong> a Google Sheets Apps Script process to improve the forecast adjustments of small cities, run by the local team.</li>
                <li><strong>Ukraine:</strong> Google Sheets reports to improve the analysis.</li>
              </ul>
            </div>`],
      ["My impact", `
            <div class="block-part reveal">
              <ul class="xp-figures reveal-stagger">
                <li><strong>+8 pts</strong><span>forecast accuracy vs. target, on average across my areas</span></li>
                <li><strong>1 web app</strong><span>used daily by the whole forecasting team</span></li>
                <li><strong>~2 h a week</strong><span>saved by an agentic AI that automates the forecast adjustments</span></li>
              </ul>
            </div>
            <div class="block-part reveal">
              <h3>Tools &amp; skills</h3>
              <div class="xp-tagrow"><span class="chip-label">Tools</span><ul class="tags reveal-stagger">TOOLS</ul></div>
              <div class="xp-tagrow"><span class="chip-label">Skills</span><ul class="tags reveal-stagger">SKILLS</ul></div>
            </div>`],
    ],
  },
  {
    id: "oslo", brand: "#D3A26E", logo: "logos/oslo.png", company: "OSLO", industry: "IT & SaaS Solutions", site: "https://oslo.fr",
    title: "Data Analyst Intern",
    lead: "Analyst in the Information Systems department. Improved data reliability to build KPIs for steering the business, and created BI tools for the software OSLO distributes.",
    facts: [["When", "Sep – Dec 2025"], ["Where", "Villeneuve d'Ascq, France"], ["Timing", "Gap year · 1st internship"]],
    context: "OSLO distributes IT and SaaS solutions through several business units and entities, each with its own clients, invoices and reporting needs.",
    mission: "Support financial and operational decisions across <strong>4 business units</strong> and <strong>3 entities</strong> with reliable data models, dashboards and automated tools.",
    did: [
      "<strong>Finance tools:</strong> aged receivables, cash flow, VAT, revenue recognition and sales commissions.",
      "<strong>Performance reporting:</strong> production schedule and sales dashboards, and multi-business-unit dashboards with N / N-1 / N-2 analysis.",
      "<strong>Regular data extractions</strong> on business activity, such as churn.",
    ],
    projects: ["revenue-recognition", "vat-automation", "cash-flow-tools", "aged-receivables", "sales-performance-reporting"],
    figures: [["13", "data models"], ["6", "dashboards · 6 automated Excel tools"], ["€350k → €8k", "annual revenue discrepancies"]],
    tools: ["Excel (Advanced, VBA)", "MyReport Data (ETL, Data modeling)", "MyReport Page (Data visualization)", "SQL"],
  },
  {
    id: "treasurer", brand: "#E1311D", logo: "logos/envie-dsup.png", company: "Envie d'Sup", industry: "State-Supported NPO", site: "https://www.cordeesdelareussite.fr/",
    title: "Treasurer",
    lead: "Managed the public budget of a non-profit serving 229 students from priority education zones.",
    facts: [["When", "Dec 2024 – Jun 2025"], ["Where", "Rouen, France"], ["Timing", "Master's year 1 · Alongside classes"]],
    context: "Envie d'Sup is a public-interest association supported by the French government. It runs workshops, cultural outings and trips for middle and high school students from priority education zones.",
    mission: "Ensure rigorous financial management of the association, for <strong>229 students</strong>.",
    did: [
      "<strong>Budget forecasts</strong> built and monitored to stay within the allocated envelopes.",
      "<strong>Expenses tracked</strong> and over 84 supplier invoices processed.",
      "<strong>Cost analysis</strong> by class and activity type (workshops, cultural outings, trips), to know the resources needed for each student and prepare the next year's grant applications.",
    ],
    projects: [],
    figures: [["€49k", "public budget managed"], ["84+", "supplier invoices processed"], ["100%", "program execution"]],
    tools: ["Budgeting", "Forecasting", "Cost analysis"],
  },
  {
    id: "pain-de-minuit", brand: "#BA9B6D", logo: "logos/pain-de-minuit.png", company: "Pain de Minuit", industry: "Craft Brewery", site: "https://pain-de-minuit.com",
    title: "Business Developer Intern",
    lead: "Acquired new B2B clients, mainly bakeries, and managed end-to-end logistics.",
    facts: [["When", "Feb – Jul 2024"], ["Where", "Nieppe, France"], ["Timing", "Bachelor's year 3 · Final internship"]],
    context: "Pain de Minuit is a start-up that brews beer from unsold bread, distributed across France.",
    mission: "Win new clients among independent retailers, mainly bakeries, and run the logistics from order to shipment.",
    did: [
      "<strong>Prospecting strategy</strong> designed and run for independent retailers.",
      "<strong>Client follow-ups</strong> at +30, +90 and +120 days, to keep the new clients.",
      "<strong>End-to-end logistics:</strong> order processing, stock reception and shipments for distributor orders.",
      "<strong>International prospecting</strong> with a bakery in the UK, which led to a feature on a public service TV channel.",
    ],
    projects: [],
    figures: [["105", "new B2B clients (104 bakeries, 1 large retail store)"], ["~21", "new clients per month"], ["€3–10k", "distributor orders handled"]],
    tools: ["B2B sales", "Prospecting", "Logistics"],
  },
];

const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
let total = 3;
const block = (n, title, body) => `
          <div class="block" id="block-${n}" role="region" aria-labelledby="block-${n}-title">
            <header class="block-head reveal">
              <span class="block-num" aria-hidden="true">${n}</span>
              <div><p class="block-kicker">Part ${n} of ${total}</p><h2 class="block-title" id="block-${n}-title">${title}</h2></div>
            </header>${body}
          </div>`;

experiences.forEach((x, i) => {
  const prev = experiences[i - 1], next = experiences[i + 1];
  const projectCards = x.projects.map((id) => {
    const p = byId[id];
    if (!p) throw new Error(`Unknown project ${id}`);
    if (!fs.existsSync(path.join(root, `project-${id}.html`))) throw new Error(`Missing project-${id}.html`);
    // Same card as on the Projects page (tools/build-projects.js), shown smaller (.xp-cards in style.css)
    const co = companies[p.company], e = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    return [
      `<article class="card project" style="--brand: ${co.brand}">`,
      `  <p class="project-org"><img src="${co.logo}" alt="${e(co.name)} logo" class="project-logo" width="24" height="24">${e(co.name)} · ${e(co.industry)}</p>`,
      `  <h4><a href="project-${id}.html" class="project-link">${e(p.title)}</a></h4>`,
      `  <p class="card-desc">${e(p.description)}</p>`,
      p.result ? `  <p class="project-result"><strong>${e(p.result.key)}</strong> ${e(p.result.text)}</p>` : null,
      `  <ul class="tags">`, `    ${p.tags.map((t) => `<li>${e(t)}</li>`).join("")}`, `  </ul>`,
      `</article>`,
    ].filter((l) => l !== null).map((l) => "                " + l).join("\n");
  }).join("\n");
  const defaultParts = () => [["The role &amp; my mission", `
            <div class="block-part reveal">
              <h3>Context</h3>
              <p>${esc(x.context)}</p>
            </div>
            <div class="block-part reveal">
              <h3>My mission</h3>
              <p class="xp-mission">${x.mission}</p>${x.chips ? `
              <p class="chip-row"><span class="chip-label">${x.chipsLabel}</span>${x.chips.map((c) => `<span class="chip">${c}</span>`).join("")}</p>` : ""}
            </div>`], ["What I did", `
            <div class="block-part reveal">
              <ul class="project-did reveal-stagger">
${x.did.map((d) => `                <li>${d}</li>`).join("\n")}
              </ul>
            </div>${projectCards ? `
            <div class="block-part reveal">
              <h3>Projects from this experience</h3>
              <div class="xp-cards reveal-stagger">
${projectCards}
              </div>
            </div>` : ""}`], ["Results &amp; tools", `
            <div class="block-part reveal">
              <h3>Results</h3>
              <ul class="xp-figures reveal-stagger">
${x.figures.map(([k, v]) => `                <li><strong>${esc(k)}</strong><span>${esc(v)}</span></li>`).join("\n")}
              </ul>
            </div>
            <div class="block-part reveal">
              <h3>Tools &amp; skills</h3>
              <ul class="tags reveal-stagger">
                ${x.tools.map((t) => `<li>${esc(t)}</li>`).join("")}
              </ul>
            </div>`]];
  const parts = (x.parts ? x.parts(projectCards) : defaultParts()).map(([t, b]) => [t, b.replace("TOOLS", x.tools.map((t) => `<li>${esc(t)}</li>`).join("")).replace("SKILLS", (x.skills || []).map((t) => `<li>${esc(t)}</li>`).join(""))]);
  total = parts.length;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(x.title)} at ${esc(x.company)} | Rémi Degand</title>
  <meta name="description" content="${esc(x.title)} at ${esc(x.company)}: an experience of Rémi Degand.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="experience-pages.css"><!-- project cards with a cover (3 Nov 2026) -->
</head>
<body>

  <!-- GENERATED by "node tools/build-experience-pages.js": edit the data in that script, not this file -->
  <header class="menu">
    <div class="container menu-inner">
      <a href="index.html" class="menu-name">Rémi Degand</a>
      <nav>
        <a href="index.html">Home</a>
        <a href="experience.html" class="active">Experiences</a>
        <a href="projects.html">Projects</a>
        <a href="education.html">Education</a>
        <a href="contact.html">Contact</a>
      </nav>
    </div>
  </header>

  <main>
    <section id="experience-page" class="project-page xp-page" style="--brand: ${x.brand}">
      <div class="container project-page-inner">
        <a href="experience.html" class="back-link">← All experience</a>

        <header class="project-page-head">
          <p class="project-org"><img src="${x.logo}" alt="${esc(x.company)} logo" class="project-logo" width="24" height="24">${esc(x.company)} · ${esc(x.industry)}<a href="${x.site}" class="org-link" target="_blank" rel="noopener" aria-label="${esc(x.company)} website (opens in a new tab)" title="${esc(x.company)} website">↗</a></p>
          <h1 class="project-page-title">${esc(x.title)}</h1>
          <p class="lead">${esc(x.lead)}</p>
        </header>

        <dl class="project-facts">
${x.facts.map(([k, v]) => `          <div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("\n")}
        </dl>

        <nav class="block-nav" aria-label="Parts of this experience">
${parts.map(([t], k) => `          <a href="#block-${k + 1}"><span class="block-nav-num">${k + 1}</span><span class="block-nav-text">${t}</span></a>`).join("\n")}
        </nav>

        <div class="blocks">${parts.map(([t, body], k) => block(k + 1, t, body)).join("")}
        </div>

        <nav class="project-pager" aria-label="Other experiences">
          ${prev ? `<a href="experience-${prev.id}.html" class="project-pager-prev"><span>← Previous experience</span>${esc(prev.title)} · ${esc(prev.company)}</a>` : "<span></span>"}
          ${next ? `<a href="experience-${next.id}.html" class="project-pager-next"><span>Next experience →</span>${esc(next.title)} · ${esc(next.company)}</a>` : "<span></span>"}
        </nav>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">© 2026 Rémi Degand</div>
  </footer>

  <script src="script.js"></script>
  <script src="chatbot.js" defer></script><!-- AI assistant: bubble bottom right + welcome animation (3 Nov 2026) -->
</body>
</html>
`;
  fs.writeFileSync(path.join(root, `experience-${x.id}.html`), html);
  console.log(`experience-${x.id}.html`);
});
