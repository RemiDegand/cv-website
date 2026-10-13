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
**Layout (changed 12 Oct 2026):** 4 separate pages instead of one long page. They share the same sticky top menu, and the current page's link is blue (set directly in each HTML file with `class="active"`).

```
┌───────────────────────────────────────────────────────┐
│ Rémi Degand        Home  Experience  Education  Contact │ <- sticky menu, every page
├───────────────────────────────────────────────────────┤
│ index.html       HERO + KEY EXPERIENCE carousel        │
│ experience.html  Key · Leadership & volunteering · Hands-on │
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

**Key experience carousel (12 Oct):** Glovo → OSLO → Envie d'Sup Treasurer, **one card at a time**. Arrows ‹ › on the sides (greyed out at each end), dots underneath (clickable), swipe on phones (arrows hidden), "See all experience →" link to `experience.html`. Same cards and logo-coloured hover as the Experience page.
- ⚠ The 3 cards are **copies** of those in `experience.html`: when one of these cards changes, update **both** pages.
- Ideas not done yet: narrower card on big screens, add Pain de Minuit as a 4th card.

### 2. Experience (`experience.html`): 3 groups (decided)
**Layout (changed 13 Oct 2026, chosen by the user from 3 prototypes: A timeline, B list + details, C filters + sort):**
- **Key experience = timeline, newest first** (like Education): year on the left, logo in a circle on the line, then a **wide card** with text on the left (header, description, tags) and the **key figures on the right** (separated by a thin line). On phones the figures go under the text and the year above the card. The card has no logo of its own (it sits on the line).
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
  1. Chunking: decide how to split the profile (by experience? by bullet?) and add metadata (company, dates, category)
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

## Current state of the website (12 October 2026, evening)
**Folder:** `C:\Users\remid\cv-website` · **Last commit:** `b4edb06` + notes update (**pushed to GitHub**: https://github.com/RemiDegand/cv-website, `main` tracks `origin/main`).
- Commits on 12 Oct: `a3cf660` (8 Oct work: logos, card layout, hover) · `4a87e45` (split into 4 pages, Skills removed) · `ce88cb1` (original logo files) · `95de957` (Home carousel + hero, About removed, Education panel + logos + level labels) · `b1b7103` (project notes moved into the repo).
- `b4edb06` (12 Oct evening): Education zoom view, per-year cards, courses, experience tiles, notes rewrite. **Everything is committed.**

| File | Content |
|---|---|
| `index.html` | Home: hero (final headline + pitch) + Key experience carousel (Glovo, OSLO, Treasurer) |
| `experience.html` | Key experience timeline (4 wide cards, figures on the right) · Leadership & volunteering + Hands-on as a list + details panel (cards in `<template>` blocks). Glovo, OSLO and Pain de Minuit cards have `id`s (linked from the Education tiles) |
| `education.html` | Timeline with level labels + logo circles; click = zoom view with the school's card (per-year mini timeline: courses + experience tiles), content in `<template>` blocks |
| `contact.html` | Email, LinkedIn, CV download |
| `style.css` | Clean & light design, blue accent, design tokens in `:root`, responsive (phone layout under 720px). Page width 1120px. Logo-coloured hover on experience cards (Experience page + Home carousel). Sections: carousel styles, Education timeline/panel styles |
| `script.js` | Home carousel (arrows, dots, position) + Experience list + details + Education zoom view (builds the cards from the templates, shows the clicked school's card with a FLIP slide animation, close). Chatbot placeholder for Phase 2 |
| `logos/` | 160×160 PNG square tiles (empty margins trimmed, centered on white). Companies shown at 48×48 top-left of cards; schools shown in 44px circles on the Education timeline. Taglines/slogans cropped out (OSLO, EGC → "egc" only, Hilton, Cheer Up); Glovo and Decathlon fill the tile with their colour. Pain de Minuit = barrel only; Institut de Genech = 3-petal symbol only; charity raffle = heart icon (no organization). Originals (`Glovo logo.jpg`, `Logo EGC.png`, `logo Institut de Genech.jpg`…) in the root folder (committed, ~520 KB: exclude them from the Firebase deploy) |
| `profile.jpg` | Photo on the site: 600×600, 34 KB, made from `photo2.jpg` |
| `CV.pdf` | Draft CV, downloads as `Remi-Degand-CV.pdf` |
| `.gitignore` | Keeps `photo.jpg`, `photo2.jpg` (big originals) and `CV.pdf` (shows the phone number) off GitHub |

**Filled in:** LinkedIn (`https://www.linkedin.com/in/remi-degand/`), Gmail as the public email, languages, photo, CV download.

**How to view it:**
- Quick look: double-click `index.html`. The CV button opens the PDF instead of downloading it in this mode (browser security on local files).
- Like online: run `npx http-server C:\Users\remid\cv-website -p 8080 -c-1` in a PowerShell window, then open http://localhost:8080. The CV button downloads the file and you stay on the page. Ctrl+C stops the server. (Note: on 7 and 12 Oct Claude Code stopped this server because the PC was low on memory: don't restart it without asking.)
- **Needed for Claude's browser checks:** the Chrome tool can't open `file://` pages, so Claude starts this server. Screenshots sometimes time out (browser freezes); the first click after loading a page sometimes doesn't register (hover first).
- **Tools on this PC:** no Python. Use Node.js for scripts and PowerShell `System.Drawing` for image cropping (logos).

### ▶ Next session: start here
1. **Education:** all courses are in (13 Oct). Go through the "Review of the Education page" list in section 3: fix the NEOMA dates/degree contradictions and locations, remove the repeated card header, open NEOMA by default, add results (Top of the class, TOEIC), decide on high school. Maybe a square NEOMA icon for a more readable circle.
2. **Fix the CV** (public version without the phone, headline "Data & Business Analyst", Business Analytics major, resolve the differences listed below), then replace `CV.pdf` and remove it from `.gitignore`.
3. **Put the site online with Firebase Hosting.** In `firebase.json`: exclude `photo.jpg`/`photo2.jpg`, the original logo files and `docs/` from deploy (`ignore`), and add a `Content-Disposition: attachment` header for the PDF so it always downloads.
4. **Experience cards:** new layout done 13 Oct (see section 2); review the new Hands-on descriptions. bring the Treasurer, Pain de Minuit and Leadership descriptions to 2–3 sentences (max 3 lines; update the Home carousel copy of Treasurer too); decide where the saved "See more" details go; find the location of Intermarché Dec 2021.
5. **Open question:** use the CV's figures and extra skills on the site? (see "Open questions" below).
6. **Design:** keep the current clean & light design. Claude Design canvas (A "Data notebook", B "Night mode"), tried on 8 Oct and **reverted at the user's request**: https://claude.ai/artifact/6Zu9cPTzvpTMLmgyEFszgD (private).
7. **User to do:** update LinkedIn (headline "Data & Business Analyst"; NEOMA: M2 MSc Business Analytics) and check the NEOMA end date there.

## Roadmap
**Phase 1: the website (free, no card)**
1. ✅ Install the tools (Node.js, Git, Firebase CLI), create GitHub + Firebase accounts
2. ✅ Build the site: HTML structure → CSS design → JavaScript. 12 Oct: 4 pages, Home carousel, Education zoom view with per-year cards
3. 🔄 Write the content (Hero done 12 Oct; Experience mostly done, short descriptions to expand; Education per-year cards with courses, all years filled 13 Oct; About and Skills removed for now)
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
- [ ] **Use the CV's figures on the site?** Glovo: 58% forecast accuracy vs. 50% target, 615k orders / 371k rider slots per week. Extra skills from the CV: Power BI, R, VBA, Power Query, MyReport, ERP.
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
- **Headline lesson:** use a job title recruiters actually search for ("Data & Business Analyst"), and put the specifics in the pitch.
