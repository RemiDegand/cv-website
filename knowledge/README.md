# Knowledge base

**What it is:** everything known about Rémi's work, written for the future recruiter chatbot (Phase 2, RAG: see `docs/CV website.md` › "Chatbot: how it works"). It is **not shown on the website**.

**Two spaces for the same project:**

| Space | File | Content | Used by |
|---|---|---|---|
| **Knowledge** | `knowledge/projects/<id>.md` | Everything known: context, problem, what was built, results, users, tools, figures, open questions, sources | The chatbot (chunks + embeddings) |
| **Display** | `content/projects.json` | The short summary only: title, company, category, 1–2 sentence description, one result, tags | The website (`node tools/build-projects.js` builds the cards on `projects.html` and the Home carousel) |

The `id` is the same in both spaces and in the page name (`project-<id>.html`). When a fact changes, update the knowledge file first, then the display summary if the card shows it.

## Rules
1. **Facts only.** Write only what Rémi said or wrote (notes, LinkedIn, CV, project documents). Nothing invented. If something is not known, put it under "Open questions", never guess it.
2. **Cite the source** of the facts in `sources` (front matter).
3. **Public repo.** No phone number, address, salary, private names (managers, colleagues, clients) or confidential company figures that Rémi has not already made public. Anonymised data only.
4. **Neutral and factual tone**, like the site: missions and figures, no "great" or "successful".
5. **One fact, one place:** a figure appears once, in the section it belongs to (results go in "Results and impact").
6. Write in **English** (the chatbot replies in the recruiter's language anyway).

## File format (one file per project)
Front matter (metadata, kept on every chunk for filtering and citations), then fixed `##` sections. The chatbot will cut each file **into one chunk per `##` section**, so each section must make sense on its own (repeat the project name in the first sentence).

```markdown
---
id: aged-receivables                 # same id as content/projects.json and project-<id>.html
title: Aged receivables reporting
company: OSLO
industry: IT & SaaS Solutions
experience: Data Analyst Intern, OSLO (Sep – Dec 2025, Villeneuve d'Ascq, France)
category: Dashboards & Reporting     # or "none" when not on the site yet
on_site: true                        # shown on the website?
page: project-aged-receivables.html  # "none" when there is no page
tools: [ERP, Data modeling, MyReport]
sources: [...]
updated: 2026-10-21
---

## Summary          2–3 sentences: what it is, for whom, the main result
## Context          where, when, which team, the situation before
## Problem          what was wrong or missing
## What I built     how it works, step by step
## Results and impact   figures and effects
## Users            who used it, how often
## Tools            software and skills, as listed by Rémi
## Questions a recruiter might ask   test questions + expected answers (to evaluate the chatbot)
## Open questions   what is not known yet (to ask Rémi); the chatbot must answer "I don't know" on these
```

## Folders
- `projects/`: one file per project, the 6 on the site and the OSLO projects not shown yet (`on_site: false`).
- Later: `experience/`, `education/`, `profile.md` (same rules), so the chatbot can answer about the rest of the CV.
