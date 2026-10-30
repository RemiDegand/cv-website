---
id: ai-forecast-adjustments
title: AI automation skills for forecast adjustments
company: Glovo
industry: Delivery Platform
experience: Forecasting Analyst Intern, Global Operations / Supply Ops, Glovo (Mar – Sep 2026, Barcelona, Spain, on site)
category: Automation & AI
on_site: true
page: project-ai-forecast-adjustments.html
tools: [LLMs (AI skills), OpenCode, BigQuery (SQL), GitHub]
sources: [projects/AI Skills for forecast adjsutments/Content.docx (written by Rémi, 30 Oct 2026; local only), projects/AI Skills for forecast adjsutments/Example.xlsx (the old Google Sheet, random values; local only), docs/CV website.md (Glovo summary), linkedin-glovo-description.md]
updated: 2026-10-30
---

# AI automation skills for forecast adjustments (Glovo)

## Summary
During the Glovo internship, Rémi created an AI skill, available to the whole forecasting team, that turns the week's forecast adjustments, written as sentences, into the import file of the company's forecasting tool. It replaced about 2 hours a week of manual entries in a Google Sheet.

## Context
Rémi was Forecasting Analyst Intern in Glovo's Supply Ops department for the PLECA market, forecasting weekly rider supply for 5 countries (South Poland, West Ukraine, Armenia, Georgia, Kyrgyzstan), about 615K orders and 371K rider slots per week. The forecast was redone every week: at the start of the week the team analysed past performance and collected inputs from the local teams; at the end of the week it decided on adjustments and entered them.

## Problem
- Adjustments were entered in a Google Sheet with Apps Script, connected to BigQuery. For each zone: select the zone (the sheet then shows the current UTR by hour and day), type every adjusted value in a schedule grid (hour × day), click a button ("Add Adjustments") that saves the adjustments in another sheet, then start again with the next zone.
- At the end, the final sheet (Zone ID, day, hour start, hour end, new UTR) was exported into the company's forecasting tool.
- About 2 hours every week, very repetitive.
- The same adjustments were already written in sentences, because they are sent to the local teams and kept as a history.

## What I built
An AI skill shared with the forecasting team, hosted on GitHub (folders for OpenCode and other AI tools: "`.opencode`, `.claude`…" in Rémi's document, to confirm):
- The forecaster pastes the adjustment sentences already written for the local teams, e.g. "Increase UTR by 0.2 for Mon to Thu for LVI" or "Decrease UTR by 10% for weekends".
- The AI has access to the BigQuery table and a query to get the current values (current UTR); the query result comes as JSON to avoid hallucinations.
- It calculates the new value (current UTR + / − / × / ÷ depending on the request) and writes each parameter in a file: zone, days, hours, new UTR.
- A file of rules and examples gives the exact format the forecasting tool expects.
- For a big change, the AI asks for validation; when a request is unclear, it asks for details.
- At the end, the export with all the adjustments is ready: download it and upload it to the tool.

The website shows a simulation ("How it started"): the forecaster has next week's adjustments in sentences on one screen (Kyiv: increase UTR by 0.2 for Mon to Fri, decrease by 10% for weekends; Lviv: increase by 0.2 for Mon to Thu, decrease by 0.1 from 12:00 to 14:00; Tbilisi: increase by 5% for Fri and Sat) and types them again, zone by zone, in the old Google Sheet (select the zone, type every changed cell of the hour × day grid, click "Add Adjustments"). Kyiv's current UTR comes from Example.xlsx (random values), Lviv's is made up. Part 2 shows the same sentences pasted into the AI skill and the export table it returns (same values).

## Results and impact
- About 2 hours a week of manual entries automated (the old process took about 2 h a week, per Rémi's document; the time the new process takes is not measured).
- Fewer errors: no values typed by hand, calculations from the real data, a fixed output format, validation on big changes.
- Available to the whole forecasting team.

## Users
The forecasting team (every forecaster, according to Rémi's document).

## Tools
LLMs through an AI skill (OpenCode), BigQuery (SQL query), GitHub. Before: Google Sheets with Apps Script.

## Questions a recruiter might ask
- **Has Rémi worked with AI at Glovo?** → Yes: he created an AI skill that turns written forecast adjustments into the forecasting tool's import file, and built a forecasting web app with AI-generated summaries and a chatbot.
- **How does the AI avoid mistakes?** → It reads the current values from BigQuery through a query (JSON output), follows a file of rules and examples for the format, asks for validation on big changes and for details when a request is unclear.
- **What did it save?** → About 2 hours of manual entries every week.

## Open questions
- What UTR stands for at Glovo, in one short line for recruiters (the page uses "UTR" without explaining it).
- Which AI tools exactly: OpenCode only, or also Claude Code (".Open Claude" in the document)? Which LLM?
- Time the new process takes (to state the time saved precisely), and how many zones a week.
- The "Impact" paragraph of Content.docx talks about VAT (copied from the VAT project): what should it say?
- The "How it started" simulation (zones Kyiv, Lviv, Tbilisi and their sentences, Lviv values) was written by Claude from the docx examples: to confirm. Zone IDs in the export (Kyiv 4, Lviv 5) are illustrative.
