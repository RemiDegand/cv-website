# CV website

> **This file:** project notes and context, kept in the repo at `docs/CV website.md` (moved from OneDrive on 12 Oct 2026). The repo is public, so never write private data here (phone, address, grades you don't want public). Exclude `docs/` from the Firebase deploy.

## Why
1. **Stand out in the job market:** an online CV that recruiters can browse and question, showing a tech/analytics profile instead of just describing one.
2. **Challenge myself:** each feature is a chance to learn a real skill (web dev, APIs, cloud, LLMs), and these skills are relevant to an Analyst role in tech.

## Key facts
- **Deadline:** 15 October 2026 is only a soft target. Quality and learning come first.
- **Target audience:** recruiters and hiring managers for Analyst roles in tech (internship, VIE or full-time contract from May 2027)
- **Language(s):** English only at launch (decided 7 Oct); the chatbot replies in the recruiter's language
- **Source of content:** `about-me.md` (single source of truth for the site and the chatbot)

## Website structure (decided)
**Layout (changed 12 Oct 2026; Projects page added 14 Oct):** 5 separate pages instead of one long page. They share the same sticky top menu, and the current page's link is blue (set directly in each HTML file with `class="active"`).

```
┌───────────────────────────────────────────────────────┐
│ Rémi Degand  Home  Experience  Projects  Education  Contact │ <- sticky menu, every page
├───────────────────────────────────────────────────────┤
│ index.html       HERO + KEY EXPERIENCE | KEY PROJECTS (side by side) │
│ experience.html  Key · Leadership & volunteering · Hands-on │
│ projects.html    one card per project done in a company │
│ education.html   timeline + zoom view with year details │
│ contact.html     email · LinkedIn · CV                 │
└───────────────────────────────────────────────────────┘
                                   ( 💬 )  <- chatbot bubble later (Phase 2)
```
- **Skills section removed for now** (12 Oct). Its old content, to reuse if it comes back: Data tools (SQL, Python, BigQuery, Looker, Excel, Google Sheets / Apps Script, LLMs), Business skills (Forecasting, Financial analysis, Budgeting, Supply chain, B2B sales), Languages (see "Skills" below).
- **About section removed** from Home (12 Oct): the hero + carousel already say who I am. May come back later as 2–3 sentences (business school → finance → data & AI, why tech).
- The old one-page version is saved in Git commit `a3cf660`.

### 1. Home (`index.html`)
**Hero (decided 12 Oct):**
- Availability badge: "Available from May 2027 · Internship, VIE or full-time"
- Name + headline **"Data & Business Analyst"**: widest match with tech job titles (Data / Business / BI Analyst). Replaces "Forecasting & Data Analyst", which sounded like a planning/S&OP role.
- Pitch: **"I turn operational and financial data into insights that drive decisions, and build AI tools that save teams time."** ("insights that drive decisions" rather than "decisions", because an analyst informs decisions, managers make them.)
- Buttons: Download CV · Ask my AI assistant (disabled until Phase 2) · LinkedIn. Photo on the right.

**Key experience carousel (12 Oct):** Glovo → OSLO → Envie d'Sup Treasurer, **one card at a time**. Arrows ‹ › (greyed out at each end) and clickable dots in one row **under** the carousel since 14 Oct (were on the sides), swipe on phones (arrows hidden), "See all experience →" link to `experience.html`. Same cards and logo-coloured hover as the Experience page.
- ⚠ The 3 cards are **copies** of those in `experience.html`: when one of these cards changes, update **both** pages.
- Ideas not done yet: narrower card on big screens, add Pain de Minuit as a 4th card.

**Home layout (14 Oct, user's request):** Key experience (left) and Key projects (right) **side by side** in one section, stacked on phones. Arrows moved **under** each carousel, in one row with the dots (‹ • • • ›), so the half-width cards keep their room. **Both sides have the same height** (user's request): the shorter card stretches to match the taller one, so the arrow rows line up.

**Key projects carousel (14 Oct, user's request):** same carousel (one card at a time, arrows, dots, swipe), "See all projects →" link to `projects.html`. Cards: Glovo forecasting web app · OSLO revenue recognition model · OSLO VAT automation (Claude's pick of the 3 strongest results).
- ⚠ These 3 cards are **copies** of the matching cards in `projects.html`: when one changes, update **both** pages.

### 2. Experience (`experience.html`): 3 groups (decided)
**Layout (changed 13 Oct 2026, chosen by the user from 3 prototypes: A timeline, B list + details, C filters + sort):**
- **Key experience = timeline, newest first** (like Education): year on the left, logo in a circle on the line, then a **wide card** with text on the left (header, description, tags) and the **key figures on the right** (separated by a thin line). On phones the figures go under the text and the year above the card. The card has no logo of its own (it sits on the line).
- **Context on the left of the timeline (13 Oct, user's request: show when and why without too much text):** year, then a small grey capitals label + one short grey line, like the Education levels. Glovo: 2026 · GAP YEAR · 2nd internship. OSLO: 2025 · GAP YEAR · 1st internship. Treasurer: 2024 · MASTER'S YEAR 1 · Alongside classes. Pain de Minuit: 2024 · BACHELOR'S YEAR 3 · Final internship. On phones it sits on one line above the card. Not done yet for the list below (leadership, hands-on).
- **"Next experience" placeholder (14 Oct, user's request):** first item of the timeline, empty on purpose. Dashed "?" circle on the line, left: 2027 · MASTER'S YEAR 2 · Next step. Dashed card: "Your next Analyst?" · "Your company · Tech industry" · "From May 2027" · "Looking for an Analyst position in the tech industry." · dashed tags Full-time / VIE / Internship (order chosen by the user, 14 Oct), and a "Let's talk →" button to `contact.html` on the right (where the key figures usually are). Title and button wording chosen by Claude, to confirm.
- **Company website button (14 Oct, user's request):** small "↗" square after "Company · industry" on the timeline cards, the detail cards and the Home experience carousel; opens the official site in a new tab (class `org-link`). Sites checked by Claude (search + HTTP): Glovo glovoapp.com · OSLO oslo.fr · EGC egc-lille.com · Hilton Malta hilton.com hotel page · Decathlon decathlon.fr · Intermarché intermarche.com · Florimond Desprez florimond-desprez.com · EuropEvent → aquaevent.fr (its pool brand; no group site found) · Cheer Up → federation page on HelloAsso (no own site found). **Idea for later (user, 14 Oct):** instead of opening the website directly, the "↗" button opens a **small pop-up window** next to it with 1–2 sentences explaining what the company does + a "Visit website →" link (closes with ×, Esc or a click outside). Would also work for organizations without a website (Envie d'Sup, Pain de Minuit). Needs a short neutral description per company. **Added 14 Oct:** Envie d'Sup → cordeesdelareussite.fr (the national Cordées de la réussite site, given by the user; on the Treasurer and volunteering cards) · Pain de Minuit → pain-de-minuit.com (official site, title "Site Officiel"). **No button:** charity raffle (no organization). To ask the user: OK for the EuropEvent and Cheer Up links.
- **Leadership & volunteering + Hands-on = list + details** (like Education): a list of rows on the left (logo, position, company · industry, dates), grouped by type; clicking a row shows its full card on the right (sticky while scrolling). First row (Envie d'Sup) open by default. On phones the card opens under the clicked row. Cards live in `<template id="xp-…">` blocks; `script.js` shows them.
- **Hands-on cards now have a short description** (and Hilton has 3 key figures), written from the summaries below on 13 Oct. To review with the user.
- Rejected: the filters + sort bar (option C), and one single timeline for everything (option A mixed volunteering in between the key experiences).
- The old 2 × 2 grid version is in Git commit `49b33f4`.

_Content below: groups and card rules (still valid)._
```
KEY EXPERIENCE                    (large cards: description + key figures + tools; "see more" removed 8 Oct)
  Glovo – Forecasting Analyst          ★ data
  OSLO – Data Analyst                  ★ data
  Pain de Minuit – Business Developer
  Envie d'Sup – Treasurer (€49k budget)

LEADERSHIP & VOLUNTEERING         (medium cards)
  Envie d'Sup – Head of 9th Grade Program · Head of Outreach · Mentor (one card, 3 roles)
  EGC Lille – Academic Lead, Budgeting & Financial Analysis
  Cheer Up Rouen – Sponsorship & Hospital Visits
  Charity raffle – own initiative, 10 people helped

HANDS-ON EXPERIENCE               (compact list, one line each)
  Hilton Malta · Decathlon · Intermarché (×2) · EuropEvent · Florimond Desprez
```
- **Order:** Key Experience → Leadership & Volunteering → Hands-on Experience
- **Envie d'Sup Treasurer** is in Key Experience (Service Civique, real financial responsibility close to analyst work), not in volunteering
- **Envie d'Sup volunteering roles** are merged into one card to avoid repeating the organization
- **Hands-on Experience** shows work ethic and adaptability, kept short
- **Card layout (8 Oct):** logo + role + "Company · industry" on the left; dates with location underneath in the top-right corner. Pain de Minuit = Nieppe, France. Unknown locations left blank: Intermarché Dec 2021, charity raffle
- **Experience template (decided 9 Oct): every experience has these 9 elements**

  | # | Element | Rule | Example (Glovo) |
  |---|---|---|---|
  | 1 | **Logo** | Square 160×160 tile in `logos/`, shown at 48×48 top-left; heart icon when there is no organization | `logos/glovo.png` |
  | 2 | **Position name** | Job title only (no contract type like "Service Civique") | Forecasting Analyst Intern |
  | 3 | **Company** | Short name | Glovo |
  | 4 | **Company's industry** | Short, shown as "Company · industry" on **one line** | Delivery Platform |
  | 5 | **Dates** | Top-right, "Mon – Mon YYYY"; LinkedIn dates win on conflicts | Mar – Sep 2026 |
  | 6 | **Location** | Under the dates, "City, Country" | Barcelona, Spain |
  | 7 | **Description** | 2–3 sentences, **max 3 lines** on desktop; **neutral and factual** (missions, no value words) | Forecasted weekly rider supply… |
  | 8 | **Key achievements** | **3**, each starting with a figure or a short highlight in bold | 5 countries · 1 web app · +8 pts |
  | 9 | **Skills developed** | Tags at the bottom of the card | Python, SQL, BigQuery, Looker, Apps Script, LLMs |

  **Gaps on the site today (9 Oct), to fill in later; nothing changed on the site yet:**
  - **Key experience:** Treasurer and Pain de Minuit descriptions are only 1 sentence.
  - **Leadership & volunteering:**
    - **Descriptions:** all are 1 sentence.
    - **Skills tags:** none of these cards has any.
    - **Achievements:** EGC has only 2.
    - **Location:** the charity raffle has none.
  - **Hands-on experience:** the rows are compact, with logo, position, company · industry, dates and location only. They have no description, achievements or skills. Intermarché Dec 2021 also has no location.
  - **Open question:** should Hands-on rows get all 9 elements too, or stay compact?
- **Card content (8 Oct), in this order:** header → short description of the position → key figures → tool tags (Key experience only). Hands-on rows stay compact (no description).
  - **Description rule:** 2–3 sentences, **max 3 lines** on a desktop screen (≈ 165 characters). Check with a screenshot after each change.
  - **Tone rule (9 Oct):** a description talks about the **missions**, stays **neutral and factual**. No superlatives or value judgments ("better", "more efficient", "successful", "great"…). E.g. ✗ "Improved data reliability to build *better* KPIs" → ✓ "Improved data reliability to build KPIs". Results and numbers go in the key achievements, not in the description.
  - **"Company · industry" always on one line** on every card (labels kept short; the page is 1120px wide so they fit).
  - **Envie d'Sup:** title is just "Treasurer" (no "Service Civique" on the site); industry = "State-Supported NPO" (full "Non-Profit Organization" didn't fit on one line).
  - **"See more" lists removed** from the 4 Key cards; the text is saved below in "See more" details, waiting for a new place.
- **Current descriptions (Key experience):**
  - **Glovo:** "Forecaster in the Supply Ops department for the PLECA market. Forecasted weekly rider supply from customer demand and designed tools to make processes more efficient." (2 sentences; department mentioned on purpose, 9 Oct)
  - **OSLO:** "Analyst in the Information Systems department. Improved data reliability to build KPIs for steering the business, and created BI tools for the software OSLO distributes." (3 lines, 2 sentences, 9 Oct. "Information Systems department" = DSI, Direction des Systèmes d'Information)
  - **Envie d'Sup Treasurer:** "Managed the public budget of a non-profit serving 229 students from priority education zones." (1 sentence, **to expand to 2–3**)
  - **Pain de Minuit:** "Acquired new B2B clients, mainly bakeries, and managed end-to-end logistics." (1 sentence, **to expand to 2–3**)
  - Leadership cards also have 1-sentence descriptions, **to expand to 2–3**.
- **Hover effect (8 Oct):** cards lift and hands-on rows get a soft background, both in the **main colour of the experience's logo** (set per card in `experience.html`, and on the 3 carousel copies in `index.html`, with `style="--brand: #…"`): Glovo yellow `#FED42A`, OSLO orange `#D3A26E`, Envie d'Sup red `#E1311D`, Pain de Minuit beige `#BA9B6D`, Cheer Up blue `#006699`, EGC/EuropEvent dark grey `#333333`, Intermarché red `#EE1C22`, Hilton navy `#013252`, Decathlon blue `#3642BB`, Florimond Desprez green `#088A62`. Charity raffle (no logo) = site blue. Key figures stay blue (yellow/beige would be unreadable). Turned off for people who disable animations.

### 2b. Projects (`projects.html`, added 14 Oct)
- **Two spaces for project content (21 Oct, user's request):** (1) **Knowledge** `knowledge/projects/<id>.md`: everything known about each project (context, problem, what was built, results, users, tools, test questions for the chatbot, open questions, sources), for the Phase 2 chatbot; not shown on the site. 9 files since 22 Oct: the 7 projects on the site + 2 OSLO projects not shown yet (`on_site: false`: sales commission tool, multi-BU dashboards). The production planning framework and the BU performance reporting were merged into `sales-performance-reporting` (22 Oct). Rules and format in `knowledge/README.md` (facts only, sources cited, public repo = nothing private, one chunk per `##` section). (2) **Display** `content/projects.json`: only the summary shown on the site (companies, the 4 categories with icon + description, and per project: category, title, description, one result, tags, `home: true/false`). **`node tools/build-projects.js`** rebuilds the cards on `projects.html` (tiles + sections) and the Home Key projects carousel between `<!-- build:… -->` markers: **edit the JSON, not the HTML** there. Same `id` everywhere (`project-<id>.html`). The project pages are still edited by hand (their title / description / result / tags must match the JSON). Home carousel order now follows the JSON (web app, VAT, revenue model).
- **Purpose:** specific tasks/projects done **in companies** (not personal side projects). Name discussed with the user: menu and title are just **"Projects" for now**; candidates for later: "Professional projects", "Projects from my internships" (Claude's pick), "Projects delivered at work" (lasts after a first full-time job).
- **Subtitle:** "Tools, data models and automations I built during my internships, used by real teams."
- **Grouped by category (21 Oct, user's idea; names suggested by Claude and kept by the user),** shown as an overview + one section per category (see below), in this order: **Apps & Tools** (Forecasting web app · Cash flow calculation tools) → **Automation & AI** (AI skills for forecast adjustments · VAT automation) → **Dashboards & Reporting** (Aged receivables) → **Data Modeling** (Revenue recognition model). Names chosen for the words used in job ads ("reporting", "data modeling", "AI"). Each project sits in **one** category (its main one: aged receivables is also a data model, the web app also has dashboards and AI). The previous / next links on the project pages follow this order. Other options shown and not chosen: filter buttons (a project can carry several categories; idea for later, once there are 8+ projects), by skill (BI / Finance / AI), by company. No category label on the cards (Home copies included) for now.
  - **Final layout (21 Oct, option C chosen by the user from 3 options shown on the page):** (1) **overview of the 4 categories** at the top, under the subtitle (user's request: a visitor sees all 4 categories at once to understand them): 4 white tiles in a row (2 × 2 on tablets and phones), each with a **line icon in a soft blue square** (Apps & Tools = app window, Automation & AI = sparkles, Dashboards & Reporting = bar chart, Data Modeling = database), the name and a one-line description (**icon and name on the same line**, centred on each other, description underneath across the tile: 21 Oct, user’s request; a 2-line name like "Dashboards & Reporting" stays within the icon height so the 4 descriptions line up); a tile jumps to its section (hover: lifts, icon turns solid blue). **No project count and no "↓" arrow** (removed 21 Oct, user's request). Descriptions written by Claude, to confirm: Apps & Tools "Apps and calculation tools that teams use day to day." · Automation & AI "Manual tasks automated, with scripts and AI." · Dashboards & Reporting "Reports that show where to act." · Data Modeling "The data structures behind reliable numbers." (2) **One section per category:** thin grey line on top (none under the tiles), the same icon + heading + description (icon and title on the same line, centred on each other; description underneath, aligned with the title: 21 Oct, user’s request), then its cards **2 per row** (1 on phones), same card content as before. **All cards the same size** (21 Oct, user’s request): `script.js` sets `--card-h` to the tallest card’s height (2 columns only; on phones each card keeps its own height) and the tool tags sit at the bottom of every card, so they line up. ⚠ The tallest card (today the web app) sets the height for all: a long new description makes every card taller. Icons are inline SVG drawn in `projects.html` (`.cat-icon`). Code: `.cat-overview`, `.cat-tile`, `.cat-icon`, `.cat-section` (category `id`s `#apps-tools`, `#automation-ai`, `#dashboards-reporting`, `#data-modeling`), `.cat-grid` in `style.css`. _Tried and rejected on 21 Oct (don't redo):_ full-width cards stacked under small grey headings; a compact overview table (logo, title, result) above them; a 4-column board with the cards in the columns (too narrow, "I don't like it"); option A filter tabs (categories mixed until a click); option B table rows (category cell on the left, cards on the right).
  - **Filters (28 Oct 2026, user's request; mapping agreed with the user):** a row under the overview tiles: **"Business area"** buttons **All · Finance · Operations · Sales** (one at a time) + a **"Uses AI" on/off switch** (sparkles icon), combined. Each button shows how many projects it would give; a button that would give 0 is disabled, so the page is never empty. Cards that don't match are hidden, then each category left empty (section + its tile). Called "Business area", not "Sector" (sector = the company's industry). "Sales" kept as is (not Sales Ops / Commercial / RevOps). **HR not added:** no project; area buttons are built only for areas that have projects, so a new area appears by itself once a project uses it (add it to `areas` in the JSON). Data in `content/projects.json`: `areas` list + per project `"areas": [...]` (**2 areas only when the project really served 2 teams**) and `"ai": true/false` (**AI is part of the final tool**, not just used to build it). Mapping: Finance = cash flow, VAT, revenue recognition, aged receivables (cash collection, so Finance only despite the sales-rep split) · Operations = forecasting web app, AI skills, production schedule & sales reporting · Sales = production schedule & sales reporting (both: production plan for the production manager, dashboards for sales) · AI = the 2 Glovo projects. Code: `.filters`, `.filter-chip`, `.filter-switch` (`role="switch"`) in `style.css`; filter logic in `script.js` (Projects page block); the filter row is hidden without JavaScript. Idea for later: add the sales commission tool as a card so Sales has more than 1 project.
  - **Thin categories:** Data Modeling has 1 project (Dashboards & Reporting has 2 since 22 Oct). Candidates from the OSLO summary, not on the site yet: multi-BU dashboards (€3–4M, N / N-1 / N-2) → Dashboards & Reporting; sales commission tool (2 BUs, ≈ €3M each) → Apps & Tools. (Production planning and performance reporting are now the 7th project.)
- _History (14 Oct, replaced the same day):_ **Experience-style card:** one wide card per row, same layout as the Experience timeline cards (`xp-card`). Left: logo 48px top-left, project title on its right, "Company · industry" under it (Glovo · Delivery Platform, OSLO · IT & SaaS Solutions), description, then **software tags** (not filled yet: the user will say which tools each project used). Right: **one proof sentence** (e.g. "**Daily use** by all forecasting team members"), separated by a thin line. No proof yet = text takes the full width (`no-proof`). The category pills (AI tool, Data model…) were removed with this change.
- **Card layout (chosen 14 Oct from 3 options shown on the page: A company | project, B result callout, C company | project | result; user picked B with the proof moved under the description):** one column, **4px bar in the company colour** on top of the card. Order: small 24px logo + "COMPANY · INDUSTRY" in grey capitals → title (1.35rem) → description → **result in a light blue box** (made smaller on 14 Oct at the user's request: key part 1rem, rest 0.875rem; key part in blue, e.g. "**Daily use** by all forecasting team members") → software tags. No result = no box. Same on the Home carousel copies. Tried and rejected on 14 Oct: Experience-style card (too similar), result block on the left, title block on the left.
- **Full list confirmed by the user (14 Oct), 6 projects:** Glovo forecasting web app · Glovo AI skills for forecast adjustments (added 14 Oct; description = notes wording "Created AI skills to automate forecast adjustments"; **no result line yet, ask the user** for a figure and what the skills do) · OSLO revenue recognition model (€350k → €8k) · VAT automation (2 h/month saved) · aged receivables reporting (3 BUs) · cash flow tools (3 entities). Titles written by Claude, to confirm (the category pills were removed).
- **Software tags:** example tags only (14 Oct, copied from the matching Experience card); the user will give the real tools per project.
- **Home copies:** the Key projects carousel on Home shows the web app, revenue model and VAT cards (copies: update both pages).
- **⭐ Project page format: the standard for EVERY project page (decided 22 Oct 2026 by the user, from the aged receivables page = the reference, `project-aged-receivables.html`).** Apply it to the 5 other pages as their content comes in:
  1. **Same 3 parts**, numbered on one vertical line in the company colour, with the sticky block bar ("PART x OF 3"): **1 Problem & context** (a short "How it started" story first, e.g. the chat between the people involved, then Context and The problem) · **2 What I built** (the system/tool, then each deliverable as its own part) · **3 Impact & tools** (Impact first, then the Tools tags).
  2. **Same white space:** 72px before each labelled sub-part ("Dashboard 1", "Dashboard 2"…, `.block-part:has(> h3 .block-label)`), the normal 28px between other parts. User: "super good", keep it.
  3. **Dashboards / reports are shown on a computer screen** (`.monitor`: dark bezel, title bar "<Tool> · <report name>", stand). What the screen shows is explained with **notes around it** (white bubbles, grey arrows, dashed frames on the screenshot, `.annotated` + `.shot-note` + `.shot-zone`), not with a bullet list. Several pages of the same report = tabs + ‹ › above the screen (`.report`).
  4. **When a specific role is mentioned** (manager, sales rep, team…), show the **head-and-shoulders icon** (black, no circle) + "MADE FOR / <role>" (`.persona`). Several people of the same kind = one icon each, the one shown in black, clickable (`.persona-icons`).
  5. **Same scroll effect:** content appears as you scroll, fading up in reading order (`.reveal` on each part, `.reveal-stagger` on lists), the block number pops in and the line draws itself.
  6. **Easy to read, no full text:** never long paragraphs. Context in ≤ 2½ lines, describing the situation before the project ("In 3 business units, there were…", not "Built for…"). Everything else as short bullets with a **bold lead** (who / what), a 3-step flow, chips, pills, notes on screenshots, an answer box ("The answer: …"), icons. Facts only, neutral tone; numbers go in bold.
  - To build a new page: copy `project-aged-receivables.html`, keep the structure and classes, replace the content. The CSS and JS are shared (`style.css`, `script.js`). For each screenshot: measure the zones in % of the image and set `--at` / `--to` on each note (shares of the screenshot width), then check with a screenshot (computer and phone width).
- **7th project: Production schedule & sales reporting (22 Oct 2026, from the user's `Projects/Reporting Sales and Prod/` folder: `Content.docx` in French + 17 anonymised MyReport PDFs).** Name chosen by Claude (the folder name "Reporting Sales and Prod" was not good): **"Production schedule & sales reporting"**, id `sales-performance-reporting`, category **Dashboards & Reporting** (after aged receivables, so the category now has 2 projects), not on Home. Page `project-sales-performance-reporting.html` built with the ⭐ format:
  - **1 Problem & context:** story Manager / Production manager (wording by Claude, to confirm), Context in 2½ lines (one business unit selling payment solutions, ~€3M a year, several hundred clients; not named), 3 problem bullets.
  - **2 What I built:** the new Excel production plan (4 bullets + 2 role icons "EDITED BY Production managers / Sales administration", `.personas`), the reporting system (3-step flow + chip rows "Indicators" / "Analysed by", `.chip-row`), **Dashboard 1 for the manager: 4 pages** (Month · Quarter · Year to date · Clients tabs), **Dashboard 2 for each sales team: 3 pages × 4 teams** (page tabs + the 4 team icons choose the team; `data-by-team` on the `.report`, panels `d2-<page>-team-<n>`). Each page is its own monitor with its own notes (`.report-page`).
  - **3 Impact & tools:** 3 bullets (manager · each sales rep · production managers and sales administration) + closing sentence; tools Excel, MyReport Data (Data modeling), MyReport Page (Data visualization) (no SQL in the document: ask).
  - Result box: "~1,000 orders a year, reporting used weekly by management" (from the OSLO summary). Facts row "Scope: 1 business unit · ~€3M revenue a year".
  - Screens: `images/projects/sales-performance-*.webp` (16), rendered from the PDFs with pdf.js in headless Chrome (PDF bytes embedded in a temporary page, worker script loaded in the page; `--virtual-time-budget` + `--dump-dom` returns the images). The page HTML was generated by a scratch script (zones measured in px of each 1600-wide image); edit by hand now.
  - **To confirm with the user:** €3M (document) vs €4M (OSLO summary); the story; the title; SQL or not.
  - **Before / after production plan (27 Oct 2026, user's request: compare a messy Excel file nobody can extract data from with the new one, then talk about the reporting):** the "new production plan" bullets are replaced by an **Excel sheet drawn in HTML on the computer screen**, with 2 tabs: **"Before: one table per status"** (illustration, not the real old file: title row, blank rows, IN PROGRESS / TO BE INVOICED / INVOICED tables with different columns, free-text dates and amounts, "Editable by everyone") and **"After: one clean table"** (follows the real anonymised file `Plan de Prod Randomisé Enligsh.xlsx`: one header row with filters, status drop-down open, amounts coloured by status, red cells for a missing invoice number and an overdue billing date, column letters coloured by who edits them, sheet tabs Plan_de_Prod · Clients · Products · Sales Teams · Production managers). **Notes like the aged receivables dashboards (27 Oct, user's request):** 4 white notes above the screen per view, grey arrows down to **dashed frames** on the sheet (rows, the status drop-down, the red cells, the column letters, the "Editable by everyone" badge); the sheet keeps its colours. On each note `--at` = x of the arrow (share of the screen width) and `--y` = top of its frame in px from the top of the sheet (rows are 24px high), instead of `--to`. Phones: notes 2 per row, no arrows (the sheet scrolls sideways), frames kept. Then a "The result:" box. The reporting part now has a **"Each column of the plan feeds the dashboards"** list (Status → totals by status, dates → month/quarter/YTD pages, Sales team → one dashboard per team, etc.). Code: `.compare`, `.sheet`, `.sheet-grid`, `.sheet-pin`, `.sheet-notes`, `.col-map` in `style.css`; tab switch in `script.js`. The sheet scrolls sideways on phones. ⚠ The Excel file's `Localisation` sheet has what look like **real client names and cities**: never show it on the site (the folder is git-ignored).
  - **"What I built" in 2 steps (27 Oct, user's request), then shortened the same day (user: "the most shorter possible, don't put two times the same information"):** block title "What I built: a reliable production plan, then the reporting on top of it". **Step 1 · Rebuild the production plan** (`#step-1`): one-line reason, the **Before / After table** (`.ba-table`: Structure, Data entry, Checks, Access; removed then **put back the same day, user: "I like it"**), the sheet tabs with notes. (27 Oct, user's request: removed the caption "Before is an illustration…" and the "Edited by" role icons under the sheet.) **Step 2 · Build the reporting** (`#step-2`): one-line reason, 3-step flow 1 Load → 2 Model → 3 Show, Indicators + Analysed by chips, then Dashboard 1 / 2 (`#dashboard-1`, `#dashboard-2`). _Removed as duplicates (don't redo):_ the 2 step cards at the top, the column → dashboard map (same as the chips), the 2 dashboard summary cards.
- **Cash flow tools page rebuilt with the ⭐ format (27 Oct 2026, from the user's `Projects/Cashflow tools/` folder: `Content.docx` in French + `Cashflow Oslo V2.xlsx`):** `project-cash-flow-tools.html`.
  - **1 Problem & context:** story Manager / Accountant (wording by Claude, to confirm), Context (OSLO ~€10M revenue, cash flow of OSLO + 2 entities in Excel fed by CSV exports from the ERP + manual entries), 3 problem bullets (heavy file storing every year and crashing, manual entries, time-consuming).
  - **2 What I built:** "The process: before and after" = two 3-step flows (before in grey with dashed boxes, `.project-flow-before`, `.flow-label`) + chips "Built with". Then **the Excel file drawn in HTML on the computer screen** with 3 tabs (same `.compare` tabs and notes/dashed frames as the production plan): **Cash flow statement** (period start/end input cells, MyReport "Refresh" button, statement in k€ from EBITDA to cash at the end), **Account detail** (8 accounts: opening, movement, closing, cash flow category), **Checks & ratios** (control table, all 0; EBITDA / revenue 3.9 %, current ratio 2.02; revenue, current assets and liabilities). New CSS: `.sheet-ribbon` (28px, counted in `--y`), `.sheet-canvas` + `<colgroup>` widths in % (frames placed in %), `.cell-input`, `.cell-sub`, `.cell-indent`; notes per view = one row whatever their number.
  - **3 Impact & tools:** up to date / any period / reliable + closing sentence; tools Excel · MyReport Data (ETL, Data modeling) · Finance (also on the card in `content/projects.json`: new description and result "3 entities · cash flow for any period, in one refresh").
  - Facts row "Scope: 3 entities · ~€10M revenue a year". Amounts on the screens come from the file's summary sheets (randomised). **Change in cash shown as +166** (= 1,018 − 439 − 413); the file shows −166 because it uses the cash accounts' sign.
  - ⚠ The Excel file is **not fully anonymised**: the `Génération` sheet has real-looking client, supplier and **employee names**, and account labels name real lenders and sites. On the site they are replaced by generic labels ("Bank loan 1", "Inventory, site 1"). Never publish the file (the `Projects/` folder is git-ignored).
- **VAT automation page rebuilt with the ⭐ format (27 Oct 2026, from the user's `Projects/VAT Automation/` folder: `Content.docx` in French + `Controle_Fournisseur_Non_Lettre.xltm`, an Excel template with a VBA macro):** `project-vat-automation.html`, same structure as the cash flow page.
  - **1 Problem & context:** story Manager / Accountant (to confirm), Context (every month, the accounting department calculated the VAT of each VAT account on unmatched supplier entries of journal A1, in an Excel file filled in by hand), 3 problem bullets.
  - **2 What I built:** process before / after (find entries → copy each amount → add up by hand; refresh → click "Assign VAT" → VAT ready) + chips. **The file** with 2 tabs: **1. Extract from the ERP** (sheet Feuil2: cut-off "today − 45 days", one block per supplier with BU, entry, date, amount, VAT account, VAT, then the 4 VAT columns) and **2. Supplier ledger, after the macro** (sheet Feuil1: journal A1, date, label, debit, credit, VAT debits 44566000 / VAT paid 44566020 / VAT intra 44520000 / Intra 2 44566200; "▶ Assign VAT" button in the ribbon; a credit note row with a negative VAT). Notes above + dashed frames. Shorter dates (dd/mm/yy) and tighter cell padding in the drawn sheets (`.sheet-canvas` cells: 3px) so the columns fit.
  - **3 Impact & tools:** 1 h 30 saved a month (estimate), no more manual entries, frozen values; tools Excel · MyReport Data (ETL, Data modeling) · VBA · Finance. Card and Home copy updated through `content/projects.json` ("1 h 30 saved per month, no more manual entries").
  - The macro (read from `vbaProject.bin`): sums the VAT of each entry number from the extract, writes the 4 VAT columns as values (frozen), applies a "credit note" rule from the label.
  - ⚠ The file has **real supplier names, BU names and invoice labels**: on the site they are "Supplier 1…6", "BU 1/2" and generic labels. Never publish the file.
- **Revenue recognition page rebuilt with the ⭐ format (27 Oct 2026, from the user's `Projects/Revenue recognition model/` folder: `Content.docx` in English + `Schema of mapping.pdf`, no company file):** `project-revenue-recognition.html`.
  - **1 Problem & context:** story Manager / Controller ("Revenue jumped in January, then dropped in February…"; to confirm), Context (OSLO ~€10M, orders / multi-period contracts / bundles; dashboards put the whole invoice on its date), 3 problem bullets (biased monthly view, limited cross-analysis, first model with 10–15 % discrepancies).
  - **2 What I built:** chips "Source" (invoice lines from the SQL database, MyReport Data), then **the model in 3 steps** from the schema (`.model-map`: 1 map each line to a type = 3 boxes One-time orders / Contracts / Bundles, 2 aggregate = consolidation layer, 3 allocate = revenue by month). Then **an illustrative example** (round numbers, not company data) with 3 tabs: **1. Invoice lines** (invoice N° xxxx01, 3 lines: contract €12k × 12 months, one-time order €3k, bundle €6k × 6 months; type from the GL account, start, months, per month), **2. Before** (stacked bar chart: €21k in January, 0 after), **3. After** (€5k in January, €2k Feb–Jun, €1k Jul–Dec). Charts drawn in HTML/CSS (`.rev-chart`, 8px per k€, same 0–25k scale on both) with notes and dashed frames; the 3 types keep one colour everywhere (contract blue, one-time order orange, bundle aqua: reference palette slots 1–3, validated with the dataviz validator; legend under the chart, the lines tab is the table view, hover = `title` per month).
  - **3 Impact & tools:** €350k → €8k (98 % fewer errors, from the schema), realistic monthly view, reliable analyses; tools MyReport Data (Data modeling) · SQL · Finance (card in `content/projects.json` updated: new description and tags; "Excel" removed because the document doesn't mention it).
- **One page per project (14 Oct, user's request):** clicking a card (Projects page or Home carousel) opens `project-<name>.html`: web-app · ai-forecast-adjustments · revenue-recognition · vat-automation · aged-receivables · cash-flow-tools. The card title is a link stretched over the whole card (`.project-link`); the title turns blue on hover. Page layout (max 800px wide): "← All projects" · company colour bar · company line · title · description · result box · Role / When / Where row · **Context** (the internship) · **What I did** (bullets) · **Tools** (tags) · "See the … experience →" · previous / next project. Content uses only facts from the notes (nothing invented). ⚠ Card title, description, result and tags are now in **3 places** (project page, `projects.html`, Home copy): update all of them.
  - **Aged receivables page, improved 14 Oct** from the user's `projects/Aged receivables/` folder (`Content.docx` + anonymised MyReport PDFs; the folder is git-ignored, only on the PC). Page now has: Business unit fact (PDV · ~€4M), Context, The problem, What I built (3-step flow ERP → data model → MyReport dashboards + payment status chips in the dashboard colours), Two dashboards (global + one per sales representative, each with its screenshot in `images/projects/*.webp`, rendered from the PDFs with pdf.js in headless Chrome, click to enlarge), Impact, Tools (ERP, Data modeling, MyReport, Dashboards, Finance: also changed on the Projects card; "Excel" removed because the docx doesn't mention it). This page is now **edited by hand**. **Scope settled 22 Oct (user):** the page says **3 business units** and never names one (no more "PDV · ~€4M"): fact row "Scope: 3 business units", Context shortened to 2½ lines and written as the situation before the project, not "Built for…" (user): "In 3 of OSLO's business units, there were hundreds of clients and thousands of invoices a year, but the finance department's accounting tool only showed the total overdue and a raw list of unpaid invoices.", Impact ends "…for each business unit". Knowledge file updated the same way.
  - **Story + team switcher (20 Oct, user's idea):** new "How it started" section at the top: a short chat between the **Manager** ("Our sales are good. So where is the cash?") and a **Sales rep** ("I don't know…"), then "…" when asked who should call which client (wording by Claude, to confirm; "Sales rep" could be someone else). **Tried and rejected on 20 Oct (user: the first version is the best):** a small grey "accounting tool" screen with only 2 totals (Total receivables €26.78M · Total overdue €5.02M), first with extra lines where the sales rep checks the tool, then alone just before the final "…". Back to the original 4-line conversation, no tool screen. **Made dynamic on 20 Oct (user's request):** each message appears when it scrolls into view, Manager sliding in from the left, Sales rep from the right (several in view at once = one after the other, 0.45 s apart), then the closing line. The final "…" is now 3 bouncing dots, like someone typing. **4 blocks (20 Oct evening, user's request: the 7 parts sliding in from left and right came "from everywhere", hard to follow):** the page is now **4 numbered blocks on one vertical line** in the OSLO colour, like the Experience timeline: **1 How it started** (chat) · **2 Context & the problem** · **3 What I built: a reporting system and two dashboards** (reporting system, Dashboard 1 for the manager, Dashboard 2 for each sales team) · **4 Impact & tools**. Each block: number circle + "PART x OF 4" ("Part" rather than "Block": reads better for a recruiter; user: "Perfect") + title, then its parts with small h3 headings (the dashboards get a "Dashboard 1/2" pill). **Sticky block bar** under the menu: the 4 blocks; the one being read is filled in the OSLO colour, the ones above are marked as read; click = jump to the block (phones: numbers only + the current block's name). **One single animation:** everything fades up 16 px in reading order, 0.12 s apart (title, text, each chat message, bullet, step, pill, tag); the block number pops in and the line down to the next block draws itself. Nothing comes from the sides any more. Showing a part also shows every part above it (nothing stays hidden after a jump). **Code:** `.block-nav`, `.block`, `.block-head`, `.block-part` in `style.css`; any element with `class="reveal"` (+ `reveal-stagger` on a list) is animated by `script.js` (IntersectionObserver; a part appears a fifth of the way up the screen). Reusable on the other project pages. No JavaScript or "reduce motion" = everything shown, no animation. _Replaced the same day:_ 7 numbered parts alternating left/right, each element sliding in from its block's side. Testing tip: headless Chrome doesn't run the observer inside a test `<iframe>`; test the page alone with a very tall window. Dashboard 1 renamed "For the manager: where is the cash?" + an answer box (€3.81M 90+ days overdue, €3.15M of it with Sales Team 1, from the global screen). Dashboard 2 "For each sales team: who do I call?" is now a **Looker-style report viewer**: tabs Team 1–4 on top, "‹ Page x of 4 ›" underneath (`.report` in `style.css`, code in `script.js`). Screens `images/projects/aged-receivables-team-1…4.webp` rendered from the 4 Sales Team PDFs (replace the old single `aged-receivables-sales-team.webp`).
  - **3 blocks (22 Oct, user's request):** "How it started" and "Context & the problem" merged into **1 Problem & context** (block title and bar label chosen by the user; parts: "How it started" = the chat, then Context, then The problem), then **2 What I built** · **3 Impact & tools**, unchanged. "PART x OF 3". The block bar now makes one column per block (`grid-auto-flow: column`), so it works with any number of blocks.
  - **Dashboard 1 annotated (22 Oct, user's request):** the sentence "An overview of the business unit's collections, for management." is replaced by a **head-and-shoulders icon** (black, 52px, no circle: 22 Oct, user's request) + "MADE FOR / The manager" (`.persona`). The 3 bullets are now **light bubbles** (very pale blue, grey text, soft blue arrows and frames: made lighter on 22 Oct, user's request) **with an arrow** to a frame on the screenshot (`.annotated`, `.shot-note`, `.shot-zone`; frames placed in % of the image): above the screen "Total payment amounts by payment status" → amount tiles (left), "Number of payments by status" → count tiles (right); under it "Receivable amounts by sales representative and payment status" → bar chart. The top arrows reach down to the tiles (length in `cqw`, the figure is a size container). 
  - **Dashboard 2 (22 Oct, user's request), same logic:** its sentence is replaced by **4 head-and-shoulders icons, one per sales team** + "MADE FOR EACH SALES TEAM / Sales Team x": the team shown in the report viewer is black, the 3 others light grey, and it follows the tabs and arrows (e.g. Team 4 = 4th icon black); **clicking an icon shows its team** (icons are buttons, grey hover; 22 Oct, user's request) ( `.persona-icons`, code in the report viewer part of `script.js`). Its 3 bullets are bubbles **inside the report viewer** (between the tabs and the screen, and above the pager): "Total payment amounts and number of payments by status" → tiles, "Chart of receivables by status" → chart (the arrow goes down through the white gaps between the tiles), "Detailed list…" → payment list; the frames are on each of the 4 team screens (same layout). Arrows are placed with `--at` (x in % of the screen width) and `--to` (zone top in `cqw`) on each bubble.
  - **Impact (22 Oct, user's request):** 2 bullets first, **The manager** has a high-level view of each sales representative's receivables and sees quickly where the cash is · **Each sales representative** has the list of their unpaid invoices, sorted by days overdue, with the client and contact details, so they can call the right client straight away; then the old sentence ("Receivables are now managed proactively…"). Wording by Claude, to confirm.
  - **Dashboards on a computer screen (22 Oct, user's request: "we don't understand easily it's a page of a dashboard"):** both screenshots sit in a **monitor** (dark bezel, title bar with 3 window dots + "MyReport · Customer Payments", stand + base; `.monitor`, `.monitor-screen`, `.monitor-bar`, `.monitor-stand`). The notes are now **neutral** (white bubble with a shadow, grey arrows, **dashed** dark grey frames) so they read as comments on the screen, not as part of the dashboard. Arrows cross the bezel and title bar (top notes) or go up beside the stand (notes below); on each note `--at` / `--to` are now shares of the screenshot width (e.g. `--at: 0.25; --to: 0.0757`), the CSS adds the bezel, title bar and stand. Dashboard 2: the team tabs and the ‹ Page x of 4 › arrows are **one row above** the notes (no more box around the viewer), so no arrow crosses them. Phones: thinner bezel, no title in the bar (an arrow would cross it), smaller team icons.
  - **Tools (22 Oct, given by the user):** MyReport Data (Data modeling) · MyReport Page (Data visualization) · SQL. Replaces ERP, Data modeling, MyReport, Dashboards, Finance on the page, the card (`content/projects.json`) and the knowledge file. The card is now the tallest on the Projects page (SQL on a second line), so all cards are a bit taller.
  - **More space** (72px) before Dashboard 1 and Dashboard 2 (22 Oct, user's request; `.block-part:has(> h3 .block-label)`).
  - **To add context for another project:** same pattern, a folder `projects/<Name>/` with a short text (context, problem, what I built, impact) + screens.
  - **Thin pages, waiting for the user:** AI skills (1 sentence: what the skills do, a figure, which tool), and more detail for each OSLO project (before/after, who used it, how). "What I did" often repeats the description for now.
- **Open:** a filter by company once there are more cards; maybe rename the page later (see names above).
- This page is where most of the saved "See more" details (below) can go.

### Skills (removed from the site on 12 Oct, content kept here)
- Grouped: Data tools · Business skills · Languages
- **Languages:** French (C2, native) · English (C1, TOEIC 930/990) · Spanish (B1)
- _Data tools and business skills still to finalize_

### 3. Education (`education.html`)
**Timeline, left part (12 Oct).** For each school, from left to right:
- **Level label** in small grey capitals: MASTER'S DEGREE · BACHELOR'S DEGREE · HIGH SCHOOL (above the dates on phones)
- **School logo in a circle** sitting on the timeline line (replaces the old blue dots): `logos/neoma.png` (made from `Downloads\logo-neoma.png`; wide wordmark, a bit small in the circle, a square NEOMA icon would be better), `logos/egc.png`, `logos/institut-de-genech.png` (only the 3-petal symbol + green "I" from `logo Institut de Genech.jpg`; the text wouldn't fit)
- **Dates**, **school name**, **degree line**:
  - NEOMA: "Master in Management · Business Analytics, English Track"
  - EGC: "Bachelor's Degree in Business, Marketing & Financial Management · French Track"
  - Genech: "French General Baccalaureate · Mathematics, Economic & Social Sciences" (= Baccalauréat général, spécialités Maths + SES)
- The **last line** (courses / achievement) was **removed on purpose** (12 Oct). Ideas if it comes back: one standout fact per school (bac mention, ranking/GPA, internships during the program), 2–3 key courses, or a key project.

**Interaction: "zoom" view (12 Oct).** By default the page shows only the timeline. Hovering a school gives it a light blue background, a blue ring on its logo, a blue name and label, and "View details →". Clicking a school **zooms in**: the schools stay on the left (their column keeps the same width, 2/5 of the page, so the text never rewraps) and **only the clicked school's details card opens on its right**, level with it, with a **"<" arrow** pointing at it. The card has a simple grey outline and **no shadow** (it must not look like a separate window). Clicking another school swaps the card. The page scrolls to the clicked school only when it's off screen.
- **Animation:** "FLIP" technique in `script.js`: note where each school is, apply the change, then slide each school from its old place to its new one with transforms only (no layout work at each frame). The timeline height animates with them so the line and footer follow, the new card zooms in gently (CSS `edu-zoom-in`), the old card fades out (a temporary copy), and the scroll runs at the same time. 0.4 s, ease-out. "Reduce motion" users get the change without animation.
- **Close:** "× Close details" button next to the page title, Esc, or a second click on the highlighted school. Keyboard: Tab + Enter.
- **Phones:** the card opens under its school (arrow pointing up). Not re-checked on a phone width since the per-year content was added.
- **Tried and rejected on 12 Oct** (don't redo): a floating card with a shadow, and timeline + details in one shared box (both looked like "another window"); the View Transitions API (felt laggy: page frozen, snapshots stretched while text rewrapped, scroll only after the animation); all 3 cards open at once ("too much at the same time").
- **Code:** card content lives in `<template id="detail-neoma|egc|genech">` blocks in `education.html`; `script.js` builds one card per school, placed right after the school in the `.timeline` grid (2 columns: schools · card).

**Card content (12 Oct, decided with the user step by step):**
- **Header:** logo, school, degree line, dates, location. No description sentence (removed at the user's request).
- **Mini timeline, one step per school year, newest first** (DESC, user's request). Chosen over tabs and an accordion: everything visible at once. Dot + line per year; current year = filled dot + "Current" badge.
- **Year line:** year name in blue + optional subtitle (+ badge) on the left, years **on the right** of the card.
- **Under the year line:** only (a) the **courses in plain grey text**, separated by " · " (tags were tried and rejected), and/or (b) **experience tiles**. **No sentence** (all removed at the user's request) and **no "Role · Company" text lines** (removed, "not good for the moment").
- **Experience tiles:** small rectangles side by side, logo + position name, link to the matching card on the Experience page (`experience.html#glovo`, `#oslo`, `#pain-de-minuit`: those cards have these `id`s). On hover the tile lifts with a glow in the logo colour; the linked card gets its logo-coloured outline (CSS `:target`). A single tile keeps the normal size (`auto-fill` grid).

| School | Year | Subtitle | Content |
|---|---|---|---|
| NEOMA | **M2** 2026 – 2027 (current) | MSc Business Analytics | Decision Models · Algorithm Design · Data-Driven Business Strategy · Business, Analytics & Strategy of the Firm |
| NEOMA | **Gap year** 2025 – 2026 | none | 2 tiles: Glovo "Forecasting Analyst Intern" · OSLO "Data Analyst Intern" ("perfect" per the user) |
| NEOMA | **M1** 2024 – 2025 | Major Data Analysis & Supply Chain (changed 13 Oct, was "Supply Chain & Economy") | Data Analysis and Decision Making · Algorithmic Thinking for Data Analysis · Capital Budgeting and Financing |
| EGC | **Year 3** 2023 – 2024 | none | Financial Analysis · Actual Costs · Forecast Costs · Supply Chain (Purchasing) (user's French: "Analyse financière, coût réel, coût prévisionnel, supply chain (achat)") + tile Pain de Minuit "Business Developer Intern" |
| EGC | **Year 2** 2022 – 2023 | none | Management Accounting · Investment Profitability · Sales Negotiation (user's French, 13 Oct: "Contrôle de gestion, rentabilité des investissements, négociation commerciale") |
| EGC | **Year 1** 2021 – 2022 | none | Financial Management Tools · Financial Accounting · Sales Techniques · Sales Performance Indicators (user's French, 13 Oct: "Outils de gestion (financière), comptabilité générale, technique de vente, indicateurs de la performance commerciale") |
| Genech | **12th grade** 2020 – 2021 | none | Mathematics · Economic & Social Sciences · Core curriculum |
| Genech | **11th grade** 2019 – 2020 | none | Mathematics · Economic & Social Sciences · Digital & Computer Science (NSI) · Core curriculum |
| Genech | **10th grade** 2018 – 2019 | none | Core curriculum ("tronc commun") |

- Content removed on 12 Oct and kept here in case it comes back: Academic Lead (EGC, Sep 2022 – Feb 2024), charity raffle (Nov – Dec 2022), Hilton Malta (Apr – Aug 2023), Intermarché (Dec 2021), Decathlon (Apr – May 2022), Treasurer + volunteering at Envie d'Sup and Cheer Up (during M1). EGC description: "Top of the class in Budget Management and Financial Analysis" (to place in the right year). Older course lists: NEOMA Optimization Tools for Management, Supply Chain Foundations (full name "Supply Chain Foundations for Turbulent Times"), Production and Business Processes; EGC Real and Forecast Costs, Investment Profitability, Management Accounting.

**Review of the Education page (12 Oct, Claude's opinion, asked by the user). Areas for improvement, by priority:**
1. **Fix what contradicts itself** (a recruiter would notice first):
   - NEOMA dates: header says **Sep 2024 – Jan 2028**, M2 says **2026 – 2027**, `about-me.md` says the M2 school year ends 16 Apr 2027, and the hero says "available from May 2027". Check LinkedIn and align everything.
   - NEOMA degree line "Master in Management · Business Analytics, English Track" vs. M1 "Major Data Analysis & Supply Chain" and M2 "MSc Business Analytics". Suggestion: "Master in Management (Grande École) · MSc Business Analytics in M2" (to confirm with the user). LinkedIn to update too.
   - Locations: NEOMA has none (campus: Rouen? the M1-year volunteering was in Rouen); EGC "Lille" and Genech "Genech" are assumptions.
2. **Remove the repeated card header:** it repeats the logo, name, degree and dates of the school shown right next to it. Remove it or keep only the location: shorter card, years higher up. Easiest visual win.
3. **Make the details easier to find:** they only appear on click and "View details →" only on hover. Suggestion: open NEOMA automatically when the page loads (most relevant school; shows the schools are clickable).
4. **Show results, not only courses:** EGC "Top of the class in Budget Management and Financial Analysis" (fits Year 3 next to Financial Analysis), TOEIC 930/990 in the year it was taken, an M2 data project.
5. **Simplify high school:** at Master's level recruiters barely look at it, and it takes 3 year steps (one only says "Core curriculum"). Options: keep Genech on the timeline without details (not clickable), or remove it and keep NEOMA + EGC.
- Smaller: "Business, Analytics & Strategy of the Firm": one course or two?; an M1 tile for the Treasurer role (Key experience, happened during M1) would match the gap year and Year 3; check the phone layout with the tiles and right-aligned dates.
- **User's decision (12 Oct):** first finish the courses, then decide if something else is needed. **Courses done 13 Oct** (EGC Years 1 and 2 added). Points 1–3 were proposed as the next quick wins; not started yet.

**Facts:**
- NEOMA: M1 major **Data Analysis & Supply Chain** (user, 13 Oct; matches LinkedIn), M2 **MSc Business Analytics** (user, 12 Oct).
- EGC: top of the class in the Budget Management and Financial Analysis module.
- Genech: bac général 2021, specialties Maths + SES + NSI in Première, Maths + SES in Terminale. Bac mention unknown.

### 4. Contact (`contact.html`)
- Short line "Looking for an Analyst role in tech from May 2027. Let's talk." + buttons: Email me (Gmail) · LinkedIn · Download CV (PDF)

### Chatbot placement
- Floating bubble bottom-right on the whole page
- "Ask my AI assistant" button in the hero opens the same chat
- On opening: welcome message + 3 suggested questions (e.g. "What did Rémi do at Glovo?", "What are his key skills?", "When is he available?")

## Experience summaries (to fill in)
_Short summaries only (like LinkedIn description): used to categorize experiences and write the cards._

Glovo - Forecasting Analyst Intern | Global Operations
Barcelona, from March to September 2026
➡Forecasted weekly rider supply for 5 countries: Poland (South part), Ukraine (West part), Armenia, Georgia, Kyrgyzstan, covering several hundred thousand orders and rider slots per week.
➡Reached +8 pts vs. target in forecast accuracy (share of forecasts neither over nor under forecasted), by reviewing past forecasts to identify and fix gaps and by leading weekly meetings with the 5 local teams to integrate local input and adjust forecasts.
➡Designed and built a web app to improve forecast accuracy across the 3 markets (Europe, Africa, Asia), used daily by all forecasting team members, combining multi-view dashboards, AI-generated summaries for each zone and a chatbot. 
➡Created AI skills to automate forecast adjustments. 

Tools: OpenCode (AI CLI), LLMs (Gemini, Claude), Looker, Python, BigQuery, SQL, Google Sheets (Apps Script), internal scheduling tool


Oslo - Data Analyst Intern
Villeneuve d'Ascq, September to December 2025
Developed 13 analytical data models, 6 dashboards and 6 automated Excel business tools, alongside regular data extractions on business activity (eg: churn), to support financial and operational decision-making across 4 business units and 3 entities.
Results and key contributions :
Financial tools & operations :
➡Automated aged receivables reporting by Business Unit (for 3 business units) and by sales representative to support cash collection and cash flow monitoring.
➡Developed automated cash flow calculation tools for 3 entities, configurable by analysis period.
➡Redesigned a revenue recognition data model to enable monthly revenue allocation based on actual business activity, reducing annual discrepancies from €350k to €8k
➡Automated VAT calculations based on unmatched supplier accounting entries, saving 2 hours per month and eliminating manual errors.
➡Built an automated sales commission calculation tool for 2 Business Units (≈ €3M in revenue each).
Performance management & data : 
➡Built a production planning framework covering ~1,000 annual orders, with associated performance reporting (revenue, margin, sales volumes), used weekly by management to support decision-making.
➡Developed multi-Business Unit management dashboards (€3–4M in revenue), including year-over-year analysis (N / N-1 / N-2), breakdown between recurring and non-recurring revenue, and active contract monitoring.
➡Built performance reporting (revenue, margins, volumes, new business) analyzed by product, team, and operational status for a Business Unit generating €4M in revenue.


Envie d'Sup - Treasurer – State-Supported Non-Profit Organization
Rouen, December 2024 to June 2025
Objective: Ensure rigorous financial management for a public-interest association supported by the French government, serving 229 middle and high school students from priority education zones.
Results:
Managed a public budget of €49,000 allocated for funding activities, purchases, and services.
Developed and monitored budget forecasts to ensure compliance with allocated envelopes, enabling 100% program execution.
Tracked expenses and processed over 84 supplier invoices.
Conducted a detailed cost analysis by class and activity type (workshops, cultural outings, trips) to assess the resources needed for each student and prepare grant applications for the following year.


Pain de Minuit - Business Developer Intern
February 2024 to July 2024
Objective: Acquire new clients among independent retail businesses (bakeries) while ensuring the efficient management of end-to-end logistics operations for a start-up that develops beer brewed from unsold bread, distributed nationwide across France.
Results:
Acquired 105 new B2B clients, including 104 bakeries and 1 large retail store (average of 21 per month).
Designed and implemented a targeted sales prospecting strategy focused on independent retailers.
Ensured client retention through structured follow-ups at +30, +90, and +120 days.
Managed end-to-end logistics operations, including order processing, inventory reception, and shipment preparation for distributor orders ranging from €3,000 to €10,000.
Led an international prospecting mission with a bakery in the UK, resulting in a communication initiative featured on a public service television channel.

Hilton Malta - Food & Beverage Team Member
San Julian april to august 2023
Objective: Deliver high-quality customer service across the various restaurants of a Hilton hotel, a high-end establishment, within an international and demanding environment.
Results:
Managed approximately 150 orders per day as a Food Runner, contributing to the service of over 10,000 dishes during the period.
Participated in the setup and execution of around 20 all-inclusive banquets for corporate events (team-building activities) and weddings, coordinating both service and logistics.

Decathlon - Sales Advisor Intern
Villeneuve d'Ascq April to mai 2022
Advised customers and sold products and equipment.
Responsible for maintaining shelves and displays in the fitness department.

Department Manager Intern
Intermarché - December 2021
Gained insight into supermarket operations and the role of a department manager
Managed several food-related sections

Intermarché - Click & Collect Order Picker 
Pont-à-Marcq June to July 2025
Preparation of Click & Collect orders according to customer requests
Timely delivery of orders to ensure customer satisfaction
Management and resolution of customer complaints

EuropEvent - Warehouse Worker 
Avelin July 2022
Assisted in the assembly of temporary swimming pools

Florimond Desprez Seasonal Agricultural Assistant - 
Cappelle en Pévèle July 2021
Contributed to the selection process of future cereal varieties
Took part in the harvesting and threshing of various cereal crops

Volunteering experiences:

Cheer Up Rouen - Member of the Sponsorship Outreach and Hospital Visit Teams
Rouen November 2024 to June 2025
Sponsorship Outreach Team:
Approached sponsors to collect prizes and donations supporting events and solidarity projects, such as creating a playroom for hospitalized youth at CHB Rouen and helping fulfill wishes (e.g., a trip to Disneyland).
Hospital Visit Team:
Visited young cancer patients at the Henri Becquerel Center in Rouen to provide emotional support and encouragement during treatment.

EGC Lille - Academic Lead for the Budgeting and Financial Analysis Module
Lille September 2022 to February 2024	
Supported struggling students at EGC Business School during their 2nd and 3rd year of the Bachelor program, with bi-weekly sessions focused on budgeting and financial analysis.
Topics covered: investment profitability, management control, actual and forecasted costs, and financial analysis.

Envie d'Sup - Head of the 9th Grade Program
Rouen - December 2024 to June 2025
Designing 8 workshops for 9th-grade students on cultural awareness, personal development, and career orientation.
Supervising and coordinating a team of 18 tutors.
Mentoring and supporting 34 students during workshops, ensuring smooth organization and effective delivery.


Envie d'Sup - Head of Outreach
Rouen - December 2024 to June 2025
Prizes and rewards for students during organized events (e.g. Model United Nations simulations, public speaking competitions).
Food supplies to support the organization of snack events.
Supervising and coordinating a team of 11 students.


Envie d'Sup - Mentor
Rouen - November 2024 to April 2025
Guided 9th-grade students enrolled in the Envie d’Sup program through 10 workshops during the year, focused on cultural awareness, personal development, and academic/career orientation.

No organization - Launched a charity raffle initiative
November to December 2022
Initiative: Launched a charity raffle to support homeless individuals – 200 tickets sold at €2 each
Contribution: Provided shoes, clothing, hostel nights, sleeping bags, food, and water
Result: 10 people directly supported through this initiative




## "See more" details (saved 8 Oct 2026, to be placed elsewhere)

> **Note:** these were the "See more" dropdowns on the 4 Key experience cards. They were removed from the cards on 8 Oct 2026 to keep the cards short (header + 2–3 sentence description + key figures + tags). **To do:** decide where they go instead (e.g. a detail page/modal per experience, or chatbot knowledge base). Kept word for word below.

**Glovo · Forecasting Analyst Intern**
- Forecasted weekly rider supply for Poland (South), Ukraine (West), Armenia, Georgia and Kyrgyzstan, covering several hundred thousand orders and rider slots per week.
- Reached +8 pts vs. target in forecast accuracy by reviewing past forecasts to fix gaps and leading weekly meetings with the 5 local teams.
- Designed and built a web app used daily by all forecasting team members across Europe, Africa and Asia: multi-view dashboards, AI-generated zone summaries and a chatbot.
- Created AI skills to automate forecast adjustments.

**OSLO · Data Analyst Intern**
- Redesigned a revenue recognition data model to allocate revenue monthly based on actual activity, reducing annual discrepancies from €350k to €8k.
- Automated aged receivables reporting and cash flow calculation tools for 3 entities.
- Automated VAT calculations, saving 2 hours per month and eliminating manual errors.
- Built a sales commission tool for 2 business units (≈ €3M revenue each).
- Built a production planning framework covering ~1,000 orders a year, with performance reporting used weekly by management.
- Developed multi-business-unit dashboards (€3–4M revenue) with year-over-year analysis and recurring vs. non-recurring revenue.

**Envie d'Sup · Treasurer**
- Financial management of a state-supported non-profit serving 229 students from priority education zones.
- Built and monitored budget forecasts to stay within allocated envelopes.
- Cost analysis by class and activity type to prepare next year's grant applications.

**Pain de Minuit · Business Developer Intern**
- Start-up brewing beer from unsold bread, distributed across France.
- Designed a prospecting strategy for independent retailers: 104 bakeries and 1 large retail store signed.
- Client retention through structured follow-ups at +30, +90 and +120 days.
- Managed end-to-end logistics: order processing, stock reception, shipments.
- Led a prospecting mission with a UK bakery, featured on a public TV channel.

## Features (learning goals)
| Feature | What I'll learn | Priority |
|---|---|---|
| Static responsive site | HTML, CSS, JavaScript, responsive design | Must have |
| Deployment + custom domain | Hosting, DNS, HTTPS, Git/GitHub | Must have |
| **Recruiter chatbot (RAG)** | LLM APIs, embeddings, vector search, prompt engineering, backend/serverless, security, evaluation | Must have |
| Chatbot analytics (questions asked) | Logging, BigQuery, Looker dashboard (links to my Analyst skills!) | Nice to have |
| Interactive dashboard showcasing my work | Data viz (Looker Studio embed or JS chart library) | Nice to have |
| Multilingual (EN/FR/ES) | i18n | Later |

## Chatbot: how it works
Goal: a recruiter types "What did Rémi do at Glovo?" and gets an accurate answer based only on my profile.

### Architecture
```
Browser (chat widget)  ->  My backend (Cloud Function)  ->  Firestore (find relevant chunks)
                                                         ->  Gemini via Vertex AI (write the answer)
```
- **Why a backend?** Credentials must NEVER be in the frontend code, or anyone can steal them and spend my money.
- **Approach:** built directly as a **RAG chatbot** (no simple version first), once the website is done.

### RAG
**What it is:** Retrieval-Augmented Generation = first *search* my profile for the relevant pieces, then let Gemini answer using only those pieces.
- **Vertex AI** = Google Cloud's AI platform (Gemini, embedding models, vector search)
- **Embedding / vector** = a list of numbers representing the meaning of a text; similar meanings → close vectors

```
OFFLINE (once, each time my profile changes)
  profile → split into chunks (1 per experience, skill, education...) 
          → Vertex AI embedding model → vectors → stored in Firestore

ONLINE (each question)
  question → embedding → find the closest chunks in Firestore (vector search)
           → question + top chunks → Gemini → answer
```
- **Vector storage:** Firestore vector search (inside Firebase, pay per use, ≈ free at my scale). ⚠ Avoid Vertex AI Vector Search managed endpoints: they run 24/7 and are billed even with no traffic, so they're overkill and expensive for a CV site.
- **Steps:**
  1. Chunking: decide how to split the profile (by experience? by bullet?) and add metadata (company, dates, category). **Started 21 Oct for projects:** `knowledge/projects/*.md`, one chunk per `##` section, front matter = metadata; each file has test questions for step 5. Still to write: experience, education, profile files
  2. Embeddings: script that generates vectors and uploads them to Firestore
  3. Retrieval: backend finds the top-k closest chunks for each question
  4. Generation: Gemini answers from the retrieved chunks, and can cite which experience it used
  5. Evaluation: a test set of ~20 recruiter questions with expected answers; measure accuracy, whether the right chunks were retrieved, and "I don't know" when info is missing
- **Interview story:** "I built a RAG pipeline with embeddings and vector search, and measured its accuracy on a test set of recruiter questions."
- **System prompt rules:** answer only about Rémi's profile, stay factual, say "I don't know, contact Rémi directly" when the info isn't there, reply in the recruiter's language, stay short and professional.

### Stack (decided: Firebase on Google Cloud)
- **Frontend:** plain HTML/CSS/JS
- **Hosting:** Firebase Hosting (free URL `*.web.app`, custom domain later)
- **Backend:** Firebase Cloud Function calling **Gemini** through **Vertex AI** (same Google Cloud project, so no API key to manage)
- **Vector database:** Firestore vector search
- **Code:** GitHub repository
- **Billing:** the website alone runs on the free Spark plan with no card. The card (pay-as-you-go Blaze plan) is only needed later for the chatbot (Cloud Functions + Vertex AI). Expected cost ≈ €0, plus a budget alert.

### Safety & cost
- [ ] Set a billing budget + alert on Google Cloud
- [ ] Rate limit requests (per IP / per session) and limit message length
- [ ] Restrict CORS to my domain only
- [ ] Never put personal data I don't want public in the prompt (phone, address...)
- [ ] Test against "prompt injection" (e.g. "ignore your instructions and...")

## Setup status (updated 7 October 2026)
| Item | Status |
|---|---|
| GitHub account | ✅ Have one (username `RemiDegand`) |
| Google account (Gmail, for Firebase) | ✅ Have one |
| VS Code (code editor) | ✅ Installed |
| Git | ✅ v2.56.0, working. Global identity: `Rémi Degand` + GitHub private email `213232000+RemiDegand@users.noreply.github.com` (chosen so the Gmail stays private) |
| Node.js + npm | ✅ v24.21.0 LTS + npm 11.19.0, working |
| Firebase CLI | ✅ v15.32.1, logged in as remidegand02@gmail.com. No Firebase project created yet |
| GitHub repo | ✅ `RemiDegand/cv-website` (public), first push done 12 Oct. Claude can now push from its terminal (`git push`) |
| Credit card / Blaze plan | ⏸ Not needed until Phase 2 (chatbot) |

**Tips learned:**
- Interactive logins (`firebase login`, first `git push`) don't work through Claude Code's terminal or `!`. Do them in a normal PowerShell window. After that, Claude can run the commands.
- GitHub: never share a password or token in chat.
- The project folder is **outside OneDrive** on purpose (OneDrive sync can lock or corrupt Git/npm files).

## Current state of the website (27 October 2026)
**Folder:** `C:\Users\remid\cv-website` · **Last commit:** `b3e9a25` + this notes update (**pushed to GitHub**: https://github.com/RemiDegand/cv-website, `main` tracks `origin/main`).
- Commits on 12 Oct: `a3cf660` (8 Oct work: logos, card layout, hover) · `4a87e45` (split into 4 pages, Skills removed) · `ce88cb1` (original logo files) · `95de957` (Home carousel + hero, About removed, Education panel + logos + level labels) · `b1b7103` (project notes moved into the repo).
- `b4edb06` (12 Oct evening): Education zoom view, per-year cards, courses, experience tiles, notes rewrite.
- Commits on 13 Oct: `2dce272` · `910f44f` · `49b33f4` (Education: M1 major Data Analysis & Supply Chain, EGC Year 1 and 2 courses) · `8b5bbec` (Experience: key experience timeline + list + details) · `7c671cf` (Experience: when/why context left of the timeline).
- Commits on 14 Oct: `04b4702` · `eb45e03` (Experience: empty "next experience" card, tags Full-time · VIE · Internship) · `2d08993` (Projects page + menu link) · `5ffcabb` (Home: Key projects carousel) · `c2a9c43` (Glovo AI skills project) · `ea4bd98` → `dc83f96` (project card designs tried, final = result callout) · `fe639ed` · `81346ef` (smaller proof box) · `69ebd46` · `7d7849b` (Home: experience and projects side by side, same height) · `e43d026` (company website buttons) · `2621a38` (Envie d'Sup and Pain de Minuit website buttons) · `ac119a2` (one page per project) · `4b64f1e` (richer aged receivables page: context + dashboard screens).
- Commits on 20 Oct (aged receivables page, see section 2b): `0d77077` (story + sales team switcher) · `d45190e` → `efd06a4` (tool screen tried, back to the first conversation) · `9d4cb98` (messages appear one by one) · `c416263` → `f25724e` (parts sliding in, 7 numbered parts alternating sides) · `6c3fbf2` (**final: 4 numbered blocks, sticky block bar, one fade-up animation**).
- Commits on 21 Oct (Projects page, see section 2b): `4eeac3e` (grouped by category) · `dd1b0f1` → `537adc9` (overview table, then a 4-column board: both replaced) · `25d71e5` (**final: overview tiles + one section per category, cards 2 per row**) · `16c0fad` (all cards the same size) · `fa2ff2c` (category icons, no count, no arrow) · `fdd9f97` · `e84ed0b` (icon and title on the same line) · `eb0dd17` (**knowledge space `knowledge/` + display space `content/projects.json` + `tools/build-projects.js`**).
- Commits on 22 Oct (aged receivables page reworked, then the 7th project, see section 2b): `3fec1aa` · `b063fcc` (3 parts, "Problem & context") · `ac342a8` · `4f46991` (manager icon, dashboard notes) · `c607875` · `6033bd7` · `a063e58` (sales team icons following the tabs, clickable; dashboard 2 notes; more space) · `5746e20` (impact per role) · `7712a2a` (tools MyReport Data / MyReport Page / SQL) · `495749a` · `947b1f9` (context: 3 business units, situation before) · `1cc5d78` (**dashboards on a computer screen, neutral notes**) · `42964c6` (**⭐ Project page format**) · `d3b5147` (**Production schedule & sales reporting page**).
- 28 Oct: **production schedule & sales reporting: result box "~1,000 orders a year covered, weekly reporting for management"** (user's wording, card + page; only "~1,000 orders" in bold). Measured: 1 line on a 1280px screen, 2 lines at 1000px (like the old text). Rule: the bold part comes first; bold text is wider, so a long bold part pushes the box to 2 lines.
- 28 Oct: **production schedule & sales reporting: Before / After table moved under the before / after picture** (Step 1, user's request; 32px above it).
- 28 Oct: **production schedule & sales reporting: Impact rewritten** (user's approach): 3 bullets, the first one ("Orders now follow a structured process: production and sales are easy to follow, and the data can finally be collected and analysed."), then 2 bullets: the manager (high-level view of sales and production over time, by product and by sales representative) and each sales representative (own performance, year-to-date statistics, client base). Removed: the production managers / sales administration bullet and the closing sentence (covered by the first sentence).
- 28 Oct: **production schedule & sales reporting: new "How it started"** (user's idea, reworked twice): Sales rep "Hi! How's it going with Client 101? Did you launch the production?" · Production manager "Let me check the production schedule… Wait, the client is there twice: once in "In progress", once in "To be invoiced"." · Sales rep "So which one is right? The client is calling me this afternoon…" · Production manager "No idea… and someone has changed my status column again. I can't even tell who did it." (no typing bubble). Closing line: "Orders were duplicated and anyone could edit anything: the production schedule had to be rebuilt." Shows 2 weaknesses fixed later: duplicates (conditional formatting) and no control (protected ranges). Rejected: "I can't find the row" then "it's there twice" (contradiction).
- 28 Oct: **production schedule & sales reporting: tag "Excel" → "Excel (Advanced)"** (user's choice; card + page Tools + knowledge). Features found in the anonymised file: data validation (lists from reference sheets, dates, amounts), 31 conditional formatting rules with formulas (COUNTIF duplicates, TODAY() overdue), protected ranges ADV / Prod, XLOOKUP, automatic order number (IF/COUNTA/MAX), SUMIF/SUMIFS check totals. A Power Query query "Tableau1" exists but was never refreshed: ask the user if it was used. Idea: check the cash flow and VAT Excel files the same way.
- 28 Oct: **title shortened to "Production schedule & sales reporting"** (user's choice from 5 options) so it fits on **one line** on the card (a card title holds ~38–40 characters at 1.35rem; "…sales performance reporting" was 49). Same title on the card and the page; "sales performance dashboards" kept in the description.
- 28 Oct: **aged receivables (user's requests):** description "…to support **and optimize** cash collection and cash flow monitoring" (card + page); line "Built during my Data Analyst internship at OSLO." under the page description (`.project-context`, grey, smaller; ⚠ repeats the Role fact "Data Analyst Intern" just below); the 5 status pills smaller and kept on one line (`.status-list`, nowrap; smaller on phones, wrap only under 360px).
- 28 Oct: **"AI skills" renamed "AI automation skills"** (user's request): title "AI automation skills for forecast adjustments", description "Created AI automation skills for forecast adjustments." ("to automate" dropped to avoid saying it twice). Changed in the JSON, the project page, the previous / next links (cash flow, VAT) and the knowledge file; page address `project-ai-forecast-adjustments.html` kept.
- 28 Oct: **title "Production schedule & sales reporting"** (was "Production plan & …": "production schedule" is the English word for the file that tracks each order's dates and status; "production plan" sounds like volume planning). Changed in the JSON, the page (title, text, Excel sheet header), the previous / next links and the knowledge file; page address `project-sales-performance-reporting.html` kept. One capital letter only, like the other titles. Other options shown: "Order tracking & sales performance reporting", "Production schedule & sales dashboards".
- 28 Oct: **Projects page filters** (business area + "Uses AI" switch, see section 2b).
- Commits on 27 Oct (project pages, see section 2b): `1fcf9d8` (sales reporting: production plan before / after drawn as an Excel sheet) · `8a70f4b` (notes above the screen with dashed frames) · `3717f09` (**cash flow tools page**) · `23a39b6` (**VAT automation page**) · `e58daa2` (**revenue recognition page**) · `14ad8b1` → `54d8bee` → `ae670b8` → `3f4416f` (sales reporting "What I built" in 2 steps: Step 1 plan with the Before / After table, Step 2 reporting; duplicates removed) · `b3e9a25` (block number circle above the timeline line). **Everything is committed and pushed.**

| File | Content |
|---|---|
| `index.html` | Home: hero (final headline + pitch) + one section with **Key experience (left) and Key projects (right) side by side**, each a carousel with arrows + dots underneath. Experience cards = copies from `experience.html` (Glovo, OSLO, Treasurer), project cards = copies from `projects.html` (web app, revenue model, VAT) |
| `experience.html` | Key experience timeline (empty dashed "next experience" card + 4 wide cards, figures on the right, when/why context on the left; "↗" company website buttons) · Leadership & volunteering + Hands-on as a list + details panel (cards in `<template>` blocks). Glovo, OSLO and Pain de Minuit cards have `id`s (linked from the Education tiles) |
| `education.html` | Timeline with level labels + logo circles; click = zoom view with the school's card (per-year mini timeline: courses + experience tiles), content in `<template>` blocks |
| `projects.html` | Projects done in companies: overview tiles of the 4 categories, then one section per category (21 Oct: Apps & Tools · Automation & AI · Dashboards & Reporting · Data Modeling), cards 2 per row: company colour bar on top, logo + "COMPANY · INDUSTRY", title, description, result in a small blue box, software tags (examples). 6 cards (2 Glovo, 4 OSLO) |
| `project-*.html` | One page per project (7), opened from the project cards. Same menu, "Projects" link active. **5 pages in the ⭐ format** (3 numbered parts, sticky block bar, scroll animation, screens with notes and dashed frames): aged receivables (MyReport dashboards), sales performance reporting (Excel sheet before / after + dashboards), cash flow tools, VAT automation (Excel files drawn in HTML) and revenue recognition (model in 3 steps + illustrative chart), the last 4 updated 27 Oct. **2 still simple** (Context, What I did, Tools): forecasting web app and AI skills (waiting for content: their `Projects/` folders exist but are empty) |
| `contact.html` | Email, LinkedIn, CV download |
| `content/projects.json` | **Display space** for projects: the summary on the cards (21 Oct). Source of the Projects page cards and the Home project carousel |
| `tools/build-projects.js` | `node tools/build-projects.js`: rebuilds the project cards from `content/projects.json` (checks categories, companies and that each `project-<id>.html` exists) |
| `knowledge/` | **Knowledge space** for the chatbot (21 Oct): `README.md` (rules, format) + `projects/<id>.md` (10 projects). Not used by the site |
| `style.css` | (27 Oct: + Excel sheets drawn in HTML `.sheet`, `.sheet-canvas`, `.sheet-ribbon`, tabs `.compare`, notes with `--y` in px, `.project-flow-before`, `.ba-table`, `.model-map`, `.rev-chart`, block number above the line.) Clean & light design, blue accent, design tokens in `:root`, responsive (phone layout under 720px). Page width 1120px. Logo-coloured hover on experience cards (Experience page + Home carousel). Sections: Experience timeline + list/details (`xp-…`, `.org-link` website button), Projects cards (`.project…`), Home side-by-side (`.home-split`, `.carousel-nav`), carousel styles, Education timeline/panel styles. Phone menu tightened so the 5 links fit. The old `.compact-list` and `.cards-large/-medium` rules are no longer used on the Experience page |
| `script.js` | Home carousels (arrows + dots in the row under each carousel, position) + Experience list + details + Education zoom view (builds the cards from the templates, shows the clicked school's card with a FLIP slide animation, close) + project pages: report viewer (tabs / ‹ ›), before / after and file tabs (`.compare`, 27 Oct), scroll reveal (`.reveal`, fade up in reading order), block bar (current block highlighted). Chatbot placeholder for Phase 2 |
| `logos/` | 160×160 PNG square tiles (empty margins trimmed, centered on white). Companies shown at 48×48 top-left of cards; schools shown in 44px circles on the Education timeline. Taglines/slogans cropped out (OSLO, EGC → "egc" only, Hilton, Cheer Up); Glovo and Decathlon fill the tile with their colour. Pain de Minuit = barrel only; Institut de Genech = 3-petal symbol only; charity raffle = heart icon (no organization). Originals (`Glovo logo.jpg`, `Logo EGC.png`, `logo Institut de Genech.jpg`…) in the root folder (committed, ~520 KB: exclude them from the Firebase deploy) |
| `profile.jpg` | Photo on the site: 600×600, 34 KB, made from `photo2.jpg` |
| `CV.pdf` | Draft CV, downloads as `Remi-Degand-CV.pdf` |
| `.gitignore` | Keeps `photo.jpg`, `photo2.jpg` (big originals) and `CV.pdf` (shows the phone number) off GitHub |

**Filled in:** LinkedIn (`https://www.linkedin.com/in/remi-degand/`), Gmail as the public email, languages, photo, CV download.

**How to view it:**
- Quick look: double-click `index.html`. The CV button opens the PDF instead of downloading it in this mode (browser security on local files).
- Like online: run `npx http-server C:\Users\remid\cv-website -p 8080 -c-1` in a PowerShell window, then open http://localhost:8080. The CV button downloads the file and you stay on the page. Ctrl+C stops the server. (Note: on 7 and 12 Oct Claude Code stopped this server because the PC was low on memory: don't restart it without asking.)
- **Needed for Claude's browser checks:** the Chrome tool can't open `file://` pages, so Claude starts this server. Screenshots sometimes time out (browser freezes); the first click after loading a page sometimes doesn't register (hover first).
- **Claude's screenshots without the server (13 Oct):** headless Chrome (`chrome.exe --headless=new --screenshot`) works on `file://` pages. Its window can't go below ~500px wide, so for a phone check put the page in a 390px `<iframe>` in a scratch page.
- **Tools on this PC:** no Python. Use Node.js for scripts and PowerShell `System.Drawing` for image cropping (logos).

### ▶ Next session: start here
0. **⭐ First, the open questions on the new project (22 Oct, user: "we will check your questions next time"):** Production schedule & sales reporting (`project-sales-performance-reporting.html`):
   (a) business unit revenue: **~€3M** (Content.docx) or **€4M** (OSLO summary)? The page says ~€3M;
   (b) ✅ result box changed on 28 Oct (user's wording): "**~1,000 orders a year** covered, weekly reporting for management" (figures from the OSLO summary, kept by the user);
   (c) **SQL** in the tools (like aged receivables)? The docx doesn't mention it;
   (d) ✅ "How it started" rewritten on 28 Oct from the user's idea (Sales rep / Production manager, about the production schedule, not the reporting);
   (e) ✅ title changed on 28 Oct (user's choice): **"Production schedule & sales reporting"**;
   (f) ✅ phone width checked on 27 Oct;
   (g) **before/after sheet (27 Oct; the caption saying "Before" is an illustration was removed at the user's request):** does the "Before" illustration match what the old file looked like (tables per status, different columns, free text)? Which roles really edited what (the file's protected ranges say sales administration vs production managers: status, billing date, comments)?
   **Cash flow tools page (27 Oct):** who used the file and how often; time saved; the 3 entities (one file each or one for all?); the story roles (Manager / Accountant); OK to show "~€10M revenue" for OSLO?
   **VAT page (27 Oct):** **1 h 30** (Content.docx, now on the page, card and Home) or **2 hours** (CV, OSLO summary, LinkedIn?) saved per month: align everywhere; story roles (Manager / Accountant); the credit note row shows a VAT of −83.18 calculated by Claude (20 % of 499.08 incl. VAT), not taken from the file.
   **Phone width** not checked yet for the cash flow, VAT and revenue recognition pages.
   **Revenue recognition page (27 Oct):** scope (the document says "the Business Unit": one BU or the whole company?); how €350k → €8k was measured; story roles (Manager / Controller); OK with an illustrative example instead of real screens?
   Also still open on aged receivables: "client and contact details" in the Impact (contact details not visible in the screens) and "modeling" vs "modelling".
1. **Education:** all courses are in (13 Oct). Go through the "Review of the Education page" list in section 3: fix the NEOMA dates/degree contradictions and locations, remove the repeated card header, open NEOMA by default, add results (Top of the class, TOEIC), decide on high school. Maybe a square NEOMA icon for a more readable circle.
2. **Fix the CV** (public version without the phone, headline "Data & Business Analyst", Business Analytics major, resolve the differences listed below), then replace `CV.pdf` and remove it from `.gitignore`.
3. **Put the site online with Firebase Hosting.** In `firebase.json`: exclude `photo.jpg`/`photo2.jpg`, the original logo files, `docs/`, `knowledge/`, `content/` and `tools/` from deploy (`ignore`), and add a `Content-Disposition: attachment` header for the PDF so it always downloads.
4. **Projects page (14 Oct):** 6 projects, final card design chosen. Waiting for the user: (a) the **real software per project** (example tags for now: Glovo AI skills = LLMs, OpenCode; OSLO = Excel + Data modeling / Finance / Dashboards); (b) **proof + better description for Glovo "AI skills"** (what the skills do, a figure, which tool); (c) confirm titles; (d) **more detail for the project pages** (added 14 Oct): for each project, what was there before, what I built and how, who used it. Then maybe swap AI skills into the Home carousel. (e) **⭐ Project page format (22 Oct):** done for 5 of 7 pages (27 Oct: cash flow, VAT, revenue recognition). Left: **forecasting web app** and **AI skills**: the user created `Projects/Forecasting web app/` and `Projects/AI Skills for forecast adjsutments/` (empty on 27 Oct); build them the same way once a `Content.docx` and screens or files are there. Rule (user, 27 Oct): as short as possible, never the same information twice, but keep a Before / After table when it helps. (f) ✅ 3 business units confirmed 22 Oct. (h) **Knowledge files (21 Oct):** go through the "Open questions" of each `knowledge/projects/*.md` with the user and fill in the answers (tools, users, before/after, AI skills details). (g) **Categories done 21 Oct** (Apps & Tools · Automation & AI · Dashboards & Reporting · Data Modeling): ask the user whether to add the 4 other OSLO projects as cards (see section 2b) so no category has only one project.
5. **Company website buttons (14 Oct):** user to click and OK the EuropEvent (aquaevent.fr) and Cheer Up (HelloAsso) links; Pain de Minuit and Envie d'Sup links added 14 Oct.
6. **Small open points from 14 Oct:** order the hero badge and Contact line like the next-experience tags (Full-time, VIE, Internship)? (asked, no answer yet); confirm the next-experience card wording ("Your next Analyst?", "Next step", "Let's talk →").
7. **Experience:** new layout done 13 Oct (see section 2). Next: (a) **context labels for the list rows** (leadership, hands-on): Claude asked the user when/why for each (summer job? which school-year internship?), waiting for answers; (b) user to check the timeline labels ("Alongside classes" for Treasurer, "Final internship" for Pain de Minuit); (c) review the new Hands-on descriptions; (d) bring the Treasurer, Pain de Minuit and Leadership descriptions to 2–3 sentences (max 3 lines; update the Home carousel copy of Treasurer too); decide where the saved "See more" details go; find the location of Intermarché Dec 2021.
8. **Open question:** use the CV's figures and extra skills on the site? (see "Open questions" below).
9. **Design:** keep the current clean & light design. Claude Design canvas (A "Data notebook", B "Night mode"), tried on 8 Oct and **reverted at the user's request**: https://claude.ai/artifact/6Zu9cPTzvpTMLmgyEFszgD (private).
10. **User to do:** update LinkedIn (headline "Data & Business Analyst"; NEOMA: M2 MSc Business Analytics) and check the NEOMA end date there.

## Roadmap
**Phase 1: the website (free, no card)**
1. ✅ Install the tools (Node.js, Git, Firebase CLI), create GitHub + Firebase accounts
2. ✅ Build the site: HTML structure → CSS design → JavaScript. 12 Oct: 4 pages, Home carousel, Education zoom view with per-year cards. 13 Oct: Experience timeline + list/details. 14 Oct: Projects page, Home side by side, company website buttons
3. 🔄 Write the content (27 Oct: 5 of 7 project pages in the ⭐ format; Hero done 12 Oct; Experience mostly done, short descriptions to expand; Projects 6 cards, real tools + AI skills proof to add, aged receivables page detailed in 4 blocks (20 Oct), page grouped in 4 categories + knowledge files for all 10 projects (21 Oct); Education per-year cards with courses, all years filled 13 Oct; About and Skills removed for now)
4. Put it online with Firebase Hosting + save the code on GitHub

**Phase 2: the RAG chatbot (card needed, ≈ €0 + budget alert)**
5. Turn on billing + budget alert, enable Vertex AI
6. Cut the profile into chunks → create embeddings → store them in Firestore
7. Build the backend function: question → find chunks → Gemini → answer
8. Build the chat window on the website and connect it
9. Security (rate limit, CORS, prompt injection tests) + evaluation with ~20 test questions

**Phase 3: finishing touches**
10. Custom domain (optional), PDF CV, link on LinkedIn

## Open questions / decisions
- [ ] Domain name (e.g. `remidegand.com` / `.dev`)? Budget ≈ €10–15/year
- [x] Languages of the site: **English only** at launch (decided 7 Oct). The chatbot will still reply in the recruiter's language.
- [x] Design style: **clean & light**, white background, dark text, one blue accent (decided 7 Oct)
- [x] Profile photo: **yes**, close-up `photo2.jpg` used (not `photo.jpg`: face too small in the circle + photographer watermark "F.B.EYE")
- [x] Public info: **email (Gmail), LinkedIn, downloadable PDF CV**. No phone. The PDF must not contain the phone or address.
- [x] **Target role / headline:** **"Data & Business Analyst"** (decided 12 Oct; replaces "Forecasting & Data Analyst", which sounded like a planning/S&OP role). Use the same headline on LinkedIn and the CV.
- [ ] **Use the CV's figures on the site?** Glovo: 58% forecast accuracy vs. 50% target, 615k orders / 371k rider slots per week. ⚠ Since 21 Oct these figures are already in the public repo (`knowledge/projects/forecasting-web-app.md` and `ai-forecast-adjustments.md`): remove them there if they must stay private. Extra skills from the CV: Power BI, R, VBA, Power Query, MyReport, ERP.
- [x] **Hero (decided 12 Oct):** headline "Data & Business Analyst" + pitch "I turn operational and financial data into insights that drive decisions, and build AI tools that save teams time." About section removed from Home for now.

### Draft CV vs. site/LinkedIn: differences to resolve
_LinkedIn wins when dates conflict._
| Point | Draft CV | Site / LinkedIn |
|---|---|---|
| Phone number | Shown | Must not be public |
| Availability | "Available immediately for 6 months, Gap year" | "From May 2027: internship, VIE or full-time" |
| NEOMA end date | May 2027 | Jan 2028 |
| Target role | Demand / Supply planning / S&OP intern | "Data & Business Analyst" (tech) |
| NEOMA major | Data Analysis and Supply Chain? | M1 Data Analysis & Supply Chain, M2 MSc Business Analytics |
| Treasurer | "Cordée de la réussite", Jan–Jun 2025, 86 invoices | "Envie d'Sup", Dec 2024–Jun 2025, 84 invoices |
| Typo | "S&0P" (zero) | "S&OP" |

## Resources
- Vertex AI / Gemini API docs: https://cloud.google.com/vertex-ai/generative-ai/docs
- Firebase Hosting: https://firebase.google.com/docs/hosting
- Cloud Run functions: https://cloud.google.com/functions/docs

## Notes / learning log
_Write here what I learn at each step (useful for interviews: "tell me about a project you built")._
- **12 Oct:** split a one-page site into several pages (shared menu, "active" link per page); built a carousel with CSS scroll-snap + JavaScript (arrows, dots); built a "master–detail" view (list on the left, details on the right) with HTML `<template>` blocks; responsive design (side panel on desktop, drop-down under the item on phones); accessibility (keyboard Enter/Esc, `aria-expanded`).
- **12 Oct (later):** Education "zoom" view. Placing each card right after its school in one CSS grid (2 columns) keeps the card level with its school. First tried the View Transitions API (snapshots of the page before/after), which felt laggy; replaced it with the **FLIP** technique (First, Last, Invert, Play): measure positions, change the layout, then animate `transform` from the old to the new position. Animating `transform`/`opacity` is smooth because the browser doesn't recompute the layout at each frame.
- **13 Oct:** built 3 layout prototypes on one page from a single JavaScript data list so the user could compare them, then generated the final static HTML from that list. Grid columns need `minmax(0, 1fr)` instead of `1fr`, or long one-line text (nowrap) makes the column wider than a phone screen.
- **21 Oct (later):** keep **two spaces** for the same content: a full knowledge file per project (for the chatbot, with sources, test questions and open questions) and a short display summary (JSON) that a small Node script turns into the HTML cards. One source for the summary means no more copies to keep in sync by hand, and the build markers (`<!-- build:… -->`) keep the rest of the page hand-written.
- **21 Oct:** for a page with several groups, an **overview at the top** (one tile per group, with a one-line description, jumping to its section) helps visitors understand the structure before they scroll. Generated the 3 layout options from one JavaScript data list, so the 6 cards stayed identical in each option.
- **14 Oct:** showing design options **on the real page** (not only in chat) works best for the user: 3 versions side by side, pick one, delete the rest. Flex/grid stretch to give two side-by-side carousels the same height (`align-items: stretch` + `flex: 1`). Checked each company website with a search + an HTTP request before linking it (some big sites answer 403 to scripts but work in a browser).
- **20 Oct:** scroll animations with `IntersectionObserver`: add a class when an element enters the screen, let CSS do the transition, and stagger children with a CSS variable (`--i` × 0.12 s). Lesson from the user: animations coming from every side are tiring; **one direction, in reading order, plus a visible structure** (numbered blocks on a line + a sticky progress bar) makes a long page easy to follow. `position: sticky` + `:has()` for the bar and for drawing the line once a block's title is shown.
- **27 Oct:** when a company file can't be shown, **redraw it in HTML** (a table styled like Excel, with fixed column widths in `<colgroup>`) instead of a screenshot: the data can be anonymised cell by cell, it stays sharp at any size, and the notes can point to exact rows (rows have a fixed height, so an arrow's length is just a number of pixels). Reading an `.xlsx` without Excel or Python: it is a zip of XML files (`sheetN.xml` + `sharedStrings.xml`); the VBA of an `.xltm` is compressed inside `vbaProject.bin` (MS-OVBA) and can be decompressed with a short script. Lesson from the user: keep pages short and don't repeat information, but a clear Before / After table is worth keeping.
- **28 Oct:** filters that can combine to an empty result frustrate visitors: show on each button how many results it would give and **disable the ones that give 0**. An on/off filter is a switch (`role="switch"` + `aria-checked`), a "one of" filter is buttons with `aria-pressed`. A CSS rule like `.card { display: flex }` beats the browser's `[hidden]`, so hidden elements need their own `[hidden] { display: none }` rule. "The first section shown" when some are hidden: `.section:not([hidden]) ~ .section` = every section after a visible one.
- **Headline lesson:** use a job title recruiters actually search for ("Data & Business Analyst"), and put the specifics in the pitch.
