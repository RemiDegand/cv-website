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
    parts: (projectCards, cardList) => [
      ["My mission", `
            <div class="block-part reveal">
              <p class="xp-mission">Support the forecasting of <strong>rider demand</strong> for one of Glovo's 3 markets, and find ways to make processes more efficient, dashboards more insightful and forecasts more accurate.</p>
              <p>The <strong>PLECA market</strong> covers 6 countries: Poland, Ukraine, Armenia, Georgia, Kazakhstan and Kyrgyzstan. I had full ownership of 5 areas:</p>
              <figure class="xp-map-fig">
                <img src="images/maps/glovo-areas.svg" width="640" height="272" alt="Map of the PLECA market. My areas in yellow: the South of Poland, the West of Ukraine, Armenia, Georgia and Kyrgyzstan. Kazakhstan in grey." loading="lazy">
                <figcaption><span class="xp-map-key is-mine"></span>My areas <span class="xp-map-key"></span>Rest of the PLECA market</figcaption>
              </figure>
            </div>`],
      ["My tasks", `
            <div class="block-part reveal">
              <h3><span class="block-label">Task 1</span>Forecast rider demand, every week</h3>
              <p>The forecast had to be ready before the release of the rider slot calendar.</p>
              <ul class="project-did reveal-stagger">
                <li><strong>Reviewed last week's performance</strong> of my 5 countries: what happened (descriptive analysis) and why (diagnostic analysis), crossing Looker dashboards with queries analysed in Google Sheets.</li>
                <li><strong>Collected input from the 5 local teams</strong> (in touch all week, 1 meeting a week with each): the external factors behind past performance and the coming events, such as bad weather, the World Cup or a marketing campaign.</li>
                <li><strong>Built forecasts for specific events</strong> from past performance: marketing campaigns, and bank holidays from year-over-year performance.</li>
              </ul>
            </div>
            <div class="block-part reveal">
              <h3><span class="block-label">Task 2</span>Design tools, every Friday</h3>
              <p>Every Friday, designed tools to make processes more efficient, dashboards more insightful and forecasts more accurate.</p>
              <!-- Cards and the Poland line in one list, with a dash before each (user, 7 Nov 2026) -->
              <ul class="project-did xp-card-list reveal-stagger">
${cardList.map((c) => `                <li><div class="xp-cards">\n${c}\n                </div></li>`).join("\n")}
                <li><strong>Poland:</strong> a Google Sheets Apps Script process to improve the forecast adjustments of small cities, run by the local team.</li>              </ul>
            </div>`],
      ["My impact", `
            <div class="block-part reveal">
              <!-- A plain list like OSLO, not blue tiles, verb first (user, 7 Nov 2026) -->
              <ul class="project-did reveal-stagger">
                <li>Beat the forecast accuracy target by <strong>8 pts</strong>, on average across my areas.</li>
                <li>Built <strong>a web app</strong> used daily by the whole forecasting team.</li>
                <li>Saved <strong>~2 h a week</strong> with an agentic AI that automates the forecast adjustments.</li>
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
    // Suggested by Claude from the OSLO summary and the project pages (7 Nov 2026), to confirm with the user
    skills: ["Data modeling", "Financial analysis", "Management reporting", "Process automation", "Data quality"],
    // Same structure as Glovo (user, 7 Nov 2026): My mission / My tasks / My impact. No Content.docx yet: facts from the OSLO
    // summary in docs/CV website.md (its 2 groups "Financial tools & operations" / "Performance management & data" = the 2 tasks).
    parts: (projectCards, cardList, cardsFor, cards) => [
      ["My mission", `
            <div class="block-part reveal">
              <p class="xp-mission">Support financial and operational decision-making across OSLO's <strong>4 business units</strong> and <strong>3 entities</strong>, with reliable data models, dashboards and automated tools.</p>
            </div>`],
      ["My tasks", `
            <!-- How each request was handled (user, 7 Nov 2026), before the 2 tasks, so the part isn't only projects -->
            <div class="block-part reveal">
              <h3>From a request to a lasting solution</h3>
              <p>Every tool below started from a request from an OSLO team.</p>
              <ul class="project-did reveal-stagger">
                <li><strong>Understood the need</strong> with the employees behind the request, to define their problem clearly.</li>
                <li><strong>Designed a solution</strong> with the tools and resources available at OSLO.</li>
                <li><strong>Agreed on the implementation</strong> with the Director of Information Systems, so the solution would last and stay easy to maintain.</li>
              </ul>
            </div>
            <!-- The projects by business area, Finance / Operations (user, 7 Nov 2026; same areas as the Projects page filters).
                 One panel per area: icon, name, one line, the cards one under the other, then the tools not on the site as dashed tiles. -->
            <section class="xp-area reveal" aria-labelledby="area-finance">
              <header class="xp-area-head">
                <span class="xp-area-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.6a4 4 0 1 0 0 6.8M7.5 10.6h6M7.5 13.4h6"/></svg></span>
                <h3 id="area-finance">Finance</h3>
                <p>For the finance department: cash collection, cash flow, revenue and VAT.</p>
              </header>
              <div class="xp-cards reveal-stagger">
${cards(["aged-receivables", "cash-flow-tools", "revenue-recognition", "vat-automation"])}
              </div>
              <div class="xp-extras">
                <p class="xp-extra"><strong>Sales commission tool</strong>Automated calculation for 2 business units, about €3M of revenue each.</p>
              </div>
            </section>
            <section class="xp-area reveal" aria-labelledby="area-operations">
              <header class="xp-area-head">
                <span class="xp-area-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></span>
                <h3 id="area-operations">Operations</h3>
                <p>For management and the sales teams: production, sales and business performance.</p>
              </header>
              <div class="xp-cards reveal-stagger">
${cards(["sales-performance-reporting"])}
              </div>
              <div class="xp-extras">
                <p class="xp-extra"><strong>Multi-business-unit dashboards</strong>€3–4M of revenue each: N / N-1 / N-2, recurring vs. non-recurring revenue, active contracts.</p>
              </div>
            </section>`],
      ["My impact", `
            <div class="block-part reveal">
              <!-- All the project results, from the most general to the most specific (user, 7 Nov 2026).
                   A plain list, not blue tiles, and no line starts with a figure (user, same day) -->
              <ul class="project-did reveal-stagger">
                <li>Built <strong>13 data models</strong> and <strong>6 dashboards</strong>.</li>
                <li>Structured the production schedule of <strong>~1,000 orders a year</strong>, with weekly reporting for management.</li>
                <li>Gave <strong>3 business units</strong> an aged receivables reporting, to support cash collection.</li>
                <li>Made the cash flow of <strong>3 entities</strong> available for any period, in one refresh.</li>
                <li>Reduced annual revenue discrepancies from <strong>€350k to €8k</strong> with the new revenue recognition model.</li>
                <li>Saved <strong>~2 h a month</strong> on VAT calculation, with no more manual entries.</li>
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
    id: "treasurer", brand: "#E1311D", logo: "logos/envie-dsup.png", company: "Envie d'Sup", industry: "State-Supported NPO", site: "https://www.cordeesdelareussite.fr/",
    title: "Treasurer",
    lead: "Ran the finances of a state-supported non-profit in education.",   // user, 7 Nov 2026: no repeat of the context or of the Timing line
    facts: [["When", "Dec 2024 – Jun 2025"], ["Where", "Rouen, France"], ["Timing", "Master's year 1 · Alongside classes"]],
    context: "Envie d'Sup is a public-interest association supported by the French government. It runs workshops, cultural outings and trips for middle and high school students from priority education zones.",
    mission: "Ensure rigorous financial management of the association, for <strong>229 students</strong>.",
    did: [
      "<strong>Budget forecasts</strong> built and monitored to stay within the allocated envelopes.",
      "<strong>Expenses tracked</strong> and over 84 supplier invoices processed.",
      "<strong>Cost analysis</strong> by class and activity type (workshops, cultural outings, trips), to know the resources needed for each student and prepare the next year's grant applications.",
    ],
    projects: [],
    figures: [["€49k", "public budget managed"], ["84", "supplier invoices processed"], ["100%", "program execution"]],
    tools: ["Google Sheets"],   // user, 7 Nov 2026
    skills: ["Budgeting", "Forecasting", "Cost analysis"],
    // Same structure as Glovo (user, 7 Nov 2026): My mission / My tasks / My impact. €49k in the context (user), so not repeated
    // in My impact; the 4 mission points are the user's (pay invoices, receipts, clean handover, next year's budget).
    parts: () => [
      ["My mission", `
            <!-- Context first, then the mission sentence (user, 7 Nov 2026), as 2 sub-parts with small headings like Pain de Minuit (user, same day) -->
            <div class="block-part reveal">
              <h3>Context</h3>
              <p>Envie d'Sup is a public-interest association supported by the French government, with a public budget of <strong>€49k</strong>. It runs workshops, cultural outings and trips for <strong>229 middle and high school students</strong> from priority education zones.</p>
            </div>
            <div class="block-part reveal">
              <h3>Mission</h3>
              <p class="xp-mission"><strong>Pay and track</strong> every expense of the association, <strong>assess the budget</strong> for the next year and ensure a <strong>clean handover</strong> to the next treasurer.</p>
            </div>`],
      ["My tasks", `
            <div class="block-part reveal">
              <ul class="project-did reveal-stagger">
                <li><strong>Built and monitored budget forecasts</strong> in a Google Sheets tracker of spending by class, compared with last year's spending, to know how much could still be spent within each allocated budget.</li>
                <li><strong>Kept a receipt for every expense</strong> and <strong>closed the accounts</strong> in good order at the end of the year.</li>
                <li><strong>Analysed costs</strong> by class and activity type (workshops, cultural outings, trips), to know the resources needed for each student and prepare the next year's grant applications.</li>
              </ul>
            </div>`],
      ["My impact", `
            <div class="block-part reveal">
              <!-- A list like the Impact of the project pages, not the blue figure tiles (user, 7 Nov 2026) -->
              <ul class="project-did reveal-stagger">
                <li><strong>100% of the program</strong> carried out, within the budget.</li>
                <li><strong>84 supplier invoices</strong> processed.</li>
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
    id: "pain-de-minuit", brand: "#BA9B6D", logo: "logos/pain-de-minuit.png", company: "Pain de Minuit", industry: "Craft Brewery", site: "https://pain-de-minuit.com",
    title: "Business Developer Intern",
    lead: "Developed the B2B sales of a craft brewery start-up.",   // 7 Nov 2026: the card's sentence would repeat the mission below
    facts: [["When", "Feb – Jul 2024"], ["Where", "Nieppe, France"], ["Timing", "Bachelor's year 3 · Final internship"]],
    context: "Pain de Minuit is a start-up that brews beer from unsold bread, distributed across France.",
    mission: "Win new clients among independent retailers, mainly bakeries, and build their loyalty.",
    did: [
      "<strong>Prospecting:</strong> about 80% cold prospecting and 20% inbound requests.",
      "<strong>Negotiation:</strong> tailored strategy per bakery, needs, sales pitch, objections, closing.",
      "<strong>Client loyalty:</strong> follow-ups at +30, +90 and +120 days.",
      "<strong>International prospecting</strong> with a bakery in the UK, which led to a feature on a public service TV channel.",
    ],
    projects: [],
    figures: [["105", "new B2B clients (104 bakeries, 1 large retail store)"], ["~21", "new clients per month"]],
    tools: ["Google Maps", "LinkedIn", "CRM", "ERP"],   // user, 8 Nov 2026
    skills: ["B2B sales", "Prospecting", "Negotiation", "Client retention"],   // Logistics removed (user, 8 Nov 2026)
    // Same structure as Glovo (user, 7 Nov 2026): My mission / My tasks / My impact. No Content.docx: facts from the
    // Pain de Minuit summary in docs/CV website.md. Impact as a list, verb first (like OSLO and Treasurer). Tools not known yet:
    // only the Skills row.
    parts: () => [
      ["My mission", `
            <!-- 2 sub-parts with small headings, like Context / The problem on the project pages (user, 7 Nov 2026) -->
            <div class="block-part reveal">
              <h3>Context</h3>
              <p>Pain de Minuit is a start-up that brews beer from unsold bread and distributes it across France.</p>
            </div>
            <div class="block-part reveal">
              <h3>Mission</h3>
              <p class="xp-mission"><strong>Win new clients</strong> among independent retailers, mainly bakeries, and <strong>build their loyalty</strong>.</p>
            </div>`],
      // 8 Nov 2026 (user): logistics removed; tasks = prospecting, negotiation, client loyalty
      ["My tasks", `
            <div class="block-part reveal">
              <h3><span class="block-label">Task 1</span>Prospect new clients</h3>
              <ul class="project-did reveal-stagger">
                <li>Prospected independent retailers, mainly bakeries: about <strong>80% cold prospecting</strong> and <strong>20% inbound requests</strong>.</li>
                <li>Led an international prospecting mission with a bakery in the UK.</li>
              </ul>
            </div>
            <div class="block-part reveal">
              <h3><span class="block-label">Task 2</span>Negotiate and close</h3>
              <ul class="project-did reveal-stagger">
                <li>Prepared a tailored strategy for each bakery, from an analysis done beforehand.</li>
                <li>Made the first contact to understand and identify the bakery's needs.</li>
                <li>Pitched the beer with a sales pitch and handled objections.</li>
                <li>Closed the deal.</li>
              </ul>
            </div>
            <div class="block-part reveal">
              <h3><span class="block-label">Task 3</span>Build client loyalty</h3>
              <ul class="project-did reveal-stagger">
                <li><strong>Followed up every new client</strong> at +30, +90 and +120 days, to build their loyalty and keep them.</li>
              </ul>
            </div>`],
      ["My impact", `
            <div class="block-part reveal">
              <ul class="project-did reveal-stagger">
                <li>Signed <strong>105 new B2B clients</strong>: 104 bakeries and 1 large retail store.</li>
                <li>Averaged <strong>~21 new clients a month</strong>.</li>
                <li>Got Pain de Minuit <strong>featured on public service TV</strong>, through a communication initiative with the UK bakery.</li>
              </ul>
              <!-- Map of sales from the user's Google My Maps (Experiences/Pain de Minuit/Map of sales.jpg, 7 Nov 2026),
                   cropped above the Maps toolbar; the Google credit stays at the bottom -->
              <figure class="xp-map-fig">
                <img src="images/maps/pain-de-minuit-sales.jpg" width="962" height="797" alt="Map of France with a blue pin for each bakery I signed, across the whole country; an orange pin in the South of England for the bakery won through the TV feature; a yellow pin near Toulouse for the large retail store." loading="lazy">
                <!-- Legend (user, 7 Nov 2026): blue = bakeries signed, orange = bakery won through the public service TV feature,
                     yellow = large retail store. Dot colours picked from the map's pins -->
                <figcaption style="gap: 6px 18px">${[["#1a73e8", "Bakeries I signed"], ["#e8590c", "Bakery won through the TV feature"], ["#f9c900", "Large retail store"]].map(([c, t]) => `<span style="display: inline-flex; align-items: center; gap: 6px"><span class="xp-map-key" style="background: ${c}; border-radius: 50%"></span>${t}</span>`).join("")}</figcaption>
              </figure>
            </div>
            <div class="block-part reveal">
              <h3>Tools &amp; skills</h3>
              <div class="xp-tagrow"><span class="chip-label">Tools</span><ul class="tags reveal-stagger">TOOLS</ul></div>
              <div class="xp-tagrow"><span class="chip-label">Skills</span><ul class="tags reveal-stagger">SKILLS</ul></div>
            </div>`],
    ],
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
  const cardList = x.projects.map((id) => {
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
  });
  const projectCards = cardList.join("\n");
  // Some of this experience's cards as list items with a bullet (.xp-card-list), in the order given
  const cardsFor = (ids) => ids.map((id) => {
    const k = x.projects.indexOf(id);
    if (k < 0) throw new Error(`${id} is not in the projects of ${x.id}`);
    return `                <li><div class="xp-cards">\n${cardList[k]}\n                </div></li>`;
  }).join("\n");
  // Some of this experience's cards as they are, in the order given (OSLO's Finance / Operations panels)
  const cards = (ids) => ids.map((id) => {
    const k = x.projects.indexOf(id);
    if (k < 0) throw new Error(`${id} is not in the projects of ${x.id}`);
    return cardList[k];
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
  const parts = (x.parts ? x.parts(projectCards, cardList, cardsFor, cards) : defaultParts()).map(([t, b]) => [t, b.replace("TOOLS", x.tools.map((t) => `<li>${esc(t)}</li>`).join("")).replace("SKILLS", (x.skills || []).map((t) => `<li>${esc(t)}</li>`).join(""))]);
  total = parts.length;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script>try{if(localStorage.getItem("cv-lang")==="fr")document.documentElement.lang=document.documentElement.dataset.lang="fr"}catch(e){}</script><!-- saved language, before any paint (lang.css / lang.js) -->
  <title>${esc(x.title)} at ${esc(x.company)} | Rémi Degand</title>
  <meta name="description" content="${esc(x.title)} at ${esc(x.company)}: an experience of Rémi Degand.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="lang.css"><!-- language switch in the menu -->
  <link rel="stylesheet" href="experience-pages.css"><!-- project cards with a cover (3 Nov 2026) -->
  <link rel="stylesheet" href="page-head.css"><!-- page header: glow, logo tile, title, fact cards (7 Nov 2026) -->
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
      <!-- Language switch EN | FR with flags (9 Nov 2026, Web Designer): styles lang.css, behaviour lang.js -->
      <div class="lang-switch" role="group" aria-label="Language" data-active="en"><span class="lang-thumb" aria-hidden="true"></span><button type="button" data-lang="en" lang="en" title="English" aria-label="English" aria-pressed="true"><svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><clipPath id="lang-uk-clip"><path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z"/></clipPath><path d="M0,0v30h60v-30z" fill="#012169"/><path d="M0,0L60,30M60,0L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0L60,30M60,0L0,30" clip-path="url(#lang-uk-clip)" stroke="#C8102E" stroke-width="4"/><path d="M30,0v30M0,15h60" stroke="#fff" stroke-width="10"/><path d="M30,0v30M0,15h60" stroke="#C8102E" stroke-width="6"/></svg></button><button type="button" data-lang="fr" lang="fr" title="Français" aria-label="Français" aria-pressed="false"><svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M0 0h1v2H0z" fill="#000091"/><path d="M1 0h1v2H1z" fill="#fff"/><path d="M2 0h1v2H2z" fill="#E1000F"/></svg></button></div>
    </div>
  </header>

  <main>
    <section id="experience-page" class="project-page xp-page xp-${x.id}" style="--brand: ${x.brand}">
      <div class="container project-page-inner">
        <!-- First screen: the header alone, then a scroll cue (Web Designer, 7 Nov 2026) -->
        <div class="page-intro">
          <a href="experience.html" class="back-link">← All experience</a>

          <header class="project-page-head">
            <p class="project-org"><img src="${x.logo}" alt="${esc(x.company)} logo" class="project-logo" width="24" height="24">${esc(x.company)} · ${esc(x.industry)}<a href="${x.site}" class="org-link" target="_blank" rel="noopener" aria-label="${esc(x.company)} website (opens in a new tab)" title="${esc(x.company)} website">↗</a></p>
            <h1 class="project-page-title">${esc(x.title)}</h1>
            <!-- No text under the title (user, 7 Nov 2026): My mission says it. The "lead" lines above are kept in the data but not shown -->
          </header>

          <dl class="project-facts">
${x.facts.map(([k, v]) => `            <div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("\n")}
          </dl>
          <a href="#block-1" class="page-scroll"><span class="page-scroll-mouse" aria-hidden="true"></span>Scroll to explore</a>
        </div>

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

  <script src="i18n/fr/common.js"></script><script src="i18n/fr/experience-${x.id}.js"></script><script src="i18n.js"></script><!-- French version: dictionary + swap of the texts, before the other scripts (9 Nov 2026) -->

  <script src="script.js"></script>
  <script src="lang.js" defer></script><!-- EN | FR switch, top right of the menu (9 Nov 2026) -->
  <script src="chatbot.js" defer></script><!-- AI assistant: bubble bottom right + welcome animation (3 Nov 2026) -->
  <script src="analytics.js" defer></script><!-- Google Analytics 4 + cookie banner, only after consent (10 Nov 2026, Platform & Data) -->
</body>
</html>
`;
  fs.writeFileSync(path.join(root, `experience-${x.id}.html`), html);
  console.log(`experience-${x.id}.html`);
});
