---
id: forecasting-web-app
title: Forecast accuracy web app
company: Glovo
industry: Delivery Platform
experience: Forecasting Analyst Intern, Global Operations / Supply Ops, Glovo (Mar – Sep 2026, Barcelona, Spain, on site)
category: Apps & Tools
on_site: true
page: project-forecasting-web-app.html
tools: [Google Apps Script, HTML / CSS, JavaScript, Chart.js, Google Sheets, BigQuery (SQL), Vertex AI (Gemini), Python, Google Cloud Run]
sources: [Rémi's answers (2 Nov 2026, Content.docx, not public), code of the first version (not public), docs/CV website.md (Glovo summary), linkedin-glovo-description.md (draft v1–v3), about-me.md]
updated: 2026-11-02
---

# Forecast accuracy web app (Glovo)

## Summary
The forecast accuracy web app is an internal tool Rémi designed and built during the Glovo internship, as a personal initiative. It is specialised in forecast accuracy: it shows the performance of all the zones at a glance, raises alerts on the zones that deviate, and explains the variations with AI summaries. Every member of the forecasting team used it daily.

## Context
Rémi was Forecasting Analyst Intern in Glovo's Global Operations, in the Supply Ops department, working on the PLECA market (Poland, Kazakhstan, Kyrgyzstan, Georgia, Armenia, Ukraine). Rémi forecast weekly rider supply for 5 countries (South Poland, West Ukraine, Armenia, Georgia, Kyrgyzstan), covering about 615K orders and 371K rider slots per week, to match rider availability with customer demand.

Forecast accuracy was becoming more and more important: the team had to see the zones that deviated and explain why. The team used a very global dashboard on Looker, not dedicated to forecast accuracy.

Forecast accuracy is measured with the Utilization Rate, the average number of orders delivered by one rider in one hour. Each time slot is Proper FC (Utilization Rate close to its target), Under FC (too few slots opened, Utilization Rate above its target) or Over FC (too many slots opened, Utilization Rate below its target).

## Problem
Looker had three limits:
- No quick view of all the zones, no alerts: a dashboard shows one selected zone or a whole country, and at country level the SUM or AVG hides deviations. Forecasters selected zones one by one, from the most important to the least.
- Hard to find patterns: on Looker, data were aggregated as an average or a sum, depending on the metric, so a recurring pattern by day or by time slot stayed hidden.
- Not oriented to forecast accuracy: metrics like Delivery Time or Missing Capacity were shown on their own, not to explain why Proper, Under or Over FC moved.

## What I built
Rémi's idea was to see all the zones at the same time, with alarms; the tool kept growing until it became a full web app. Every dashboard, metric and summary is designed to explain the performance and variation of Proper, Under and Over FC.
- FC Schedule (the most used view): forecast accuracy of a zone in a schedule grid, days in columns and hours in rows. Each slot is a circle whose colour shows the main result and whose size shows the number of orders.
- Market Overview: performance with the week-on-week change, by country and area down to the zone, with no selection needed, and the top 10 zones by volume.
- Global Zones: all the zones in one table, with filters.
- FC Alerts and DT (Delivery Time) Alerts: the zones that deviate, with thresholds that can be changed.
- Zone Deep Dive: accuracy by day and time slot, Slot Filling, Rider Demand, and comments per zone.
- Last complete week or last 7 days, on every view.

## AI summaries
For each zone, a day-by-day written summary whose only goal is to explain the variation of Proper, Under and Over FC, using data from outside forecast accuracy (Delivery Time, Missing Capacity, week-on-week order variation, Orders FC). Process: a specific BigQuery query collects all the data needed; an AI agent (OpenCode) is given access to this query, with context and examples of analysis with those data; a Python script sets when it runs, runs everything and keeps a token limit. It runs every Monday morning for the last complete week, and at 9:00 from Monday to Friday for the last 7 days.

## Chatbot
The metrics were complex, and some were new, so a metric help chatbot (Gemini through Vertex AI) explains how the data are computed and how to read them. To save tokens, Rémi gave it the queries and only the complementary information it needed. It refuses to analyse performance or recommend actions.

## Versions
- First version, PLECA market only ("PLECA Market FC"): a Google Apps Script web app reading a Google Sheet filled by BigQuery queries.
- Final version, all markets: hosted on Google Cloud Run, with the code in Python, Vertex AI for the chatbot and Python for the AI summaries.

## Results and impact
- Used daily by every member of the forecasting team: a more organised and quicker way to check the performance of the zones.
- New view, FC Schedule: forecast accuracy by day and by time slot, where Looker only gave an average.
- New metric, Broken Correlation %: how much was delivered in bad conditions (Delivery Time above target and Utilization Rate below target). A high figure means bad conditions with regard to the target, or a target that cannot be reached.
- Context figure for the role (not measured for the app alone): Rémi reached 58% forecast accuracy, 8 points above the 50% target, by reviewing past forecasts to fix gaps and leading weekly meetings with the 5 local teams.

## Users
All the members of the forecasting team; daily use.

## Tools
First version: Google Apps Script, HTML / CSS, JavaScript, Chart.js, Google Sheets, BigQuery (SQL), Vertex AI (Gemini 2.5 Flash), Python. Final version: Google Cloud Run, Python, Vertex AI.

## Questions a recruiter might ask
- **What did Rémi build at Glovo?** → A web app specialised in forecast accuracy: all the zones at a glance, alerts on the zones that deviate and AI summaries that explain why, used daily by the forecasting team.
- **Why not just use Looker?** → On Looker, zones had to be selected one by one and the dashboard gave an average, with no pattern by day or time slot. The app shows all the zones at once and focuses on forecast accuracy.
- **Whose idea was it?** → Rémi's own idea: to see all the zones at the same time, with alarms.
- **What does the FC Schedule show?** → Forecast accuracy by day and hour for one zone, so patterns can be seen at a glance.
- **What was the forecast accuracy?** → 58%, 8 points above the 50% target (result of the forecasting role overall).

## Open questions
- Broken Correlation %: percentage of orders (Rémi's description) or of hours (the code of the first version divides hours by eligible hours)?
- Which markets the final version covered, and how many forecasters used it.
- Whether part of the +8 pts can be linked to the app.
- Which AI model wrote the summaries; why the chatbot is limited to definitions; time saved each week; tools of the final version; AI tool used to build the app.
