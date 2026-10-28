---
id: sales-performance-reporting
title: Production schedule & sales reporting
company: OSLO
industry: IT & SaaS Solutions
experience: Data Analyst Intern, Information Systems department, OSLO (Sep – Dec 2025, Villeneuve d'Ascq, France, on site)
category: Dashboards & Reporting
on_site: true
page: project-sales-performance-reporting.html
tools: [Excel (advanced), MyReport Data (data modeling), MyReport Page (data visualization)]
sources: [projects/Reporting Sales and Prod/Content.docx (written by Rémi, 22 Oct 2026; local only), projects/Reporting Sales and Prod/Plan de Prod Randomisé Enligsh.xlsx (anonymised production schedule; local only), anonymised dashboard PDFs (local only; screens in images/projects/sales-performance-*.webp), docs/CV website.md (OSLO summary), about-me.md]
updated: 2026-10-22
---

# Production schedule & sales reporting (OSLO)

## Summary
At OSLO, Rémi rebuilt the Excel production schedule of a business unit and created MyReport dashboards to steer its sales performance: one global dashboard for management and one dashboard for each sales representative. The production data became reliable and the business unit's activity can be steered with clear figures. This project replaces two earlier entries, "production planning framework" and "business unit performance reporting".

## Context
The production schedule and sales reporting project was carried out during Rémi's Data Analyst internship at OSLO, for one business unit that sells payment (checkout) solutions, offers several products, and makes about €3M in revenue a year with several hundred clients. Every order was tracked in an Excel file used as the production schedule, shared by the whole team.

## Problem
- The production schedule file was badly structured: several tables, one per order status, on the same sheet, so the data could not be used for analysis.
- Every employee had access to the whole file, so changes were not controlled.
- No reliable statistics were available to steer the business.
- Story used on the website (wording by Claude, to confirm): the manager asks whether the month is on target and how each sales rep is doing; the production manager says someone has changed their columns again, so the numbers can't be trusted.

## What I built
**1. A new production schedule (Excel):** one single table, with:
- data validation and set formats in each column (drop-down lists), so every entry follows the same rules and the data is reliable;
- a status column and conditional formatting rules, to follow each order and detect anomalies;
- locked cells and access rights (Excel Review tab): only production managers and sales administration (ADV) can edit, and each user only their own columns.

**Details from the anonymised production schedule file (Excel, read 27 Oct 2026):**
- Sheet `Plan_de_Prod`: one row per order (783 orders between January and December 2025 in the anonymised copy), 19 columns: index, client account, client, project, new business (Y/N), order date, status, quote number, invoice number, amount excl. VAT, in-house licences, margin, margin rate, billing date, production manager, sales team, product, comments, target. Header row frozen, filters on.
- Drop-down lists and validation: status (Cancelled, In progress, To be invoiced, Invoiced), new business (Y/N), valid dates, numeric amounts.
- Conditional formatting: client missing on an active order, quote or invoice number missing on an invoiced order, duplicate invoice numbers, gaps or duplicates in the index, amount coloured by status, billing date already passed for an order in progress.
- Protected ranges: "ADV" (sales administration) and "Prod" (production managers: status, billing date, comments), each open only to the people of that role.
- Reference sheets: Clients, Products (4), Sales Teams (4), production managers (4, one per product).

**2. Reporting:** the data of the Excel production schedule is loaded with MyReport and structured in a data model. The dashboards show revenue, margin, order count, new business and target, analysed by sales representative, product, production manager and order status.

**Dashboard 1, global (for management), 4 pages:** production of the current month (revenue, orders and margin by status: invoiced, to be invoiced, in progress; orders vs target; charts by sales team, product and production manager), the quarter (same totals, revenue by month, product and sales team), year-to-date statistics (revenue, orders, average order value, new business, by month, sales team and product) and the client database (clients with last order, order count, margin and revenue over 3 years, and the invoices of the selected client).

**Dashboard 2, one per sales representative, with their own data only, 3 pages:** their performance for the current or selected month (with their order list), their year-to-date statistics and their client base. 4 sales teams appear in the anonymised dashboards.

## Results and impact
- Production data is reliable, and the sales performance of the business unit is steered in a structured way, with a clear view of its activity.
- The manager follows revenue, margin, orders and the target for the whole business unit, by month, quarter and year.
- Each sales representative sees their own performance, year-to-date statistics and client base.
- Production managers and sales administration work in one production schedule, each on their own columns.
- OSLO summary (CV): the production planning framework covers about 1,000 orders a year, and its performance reporting is used weekly by management.

## Users
Management (global dashboard, weekly according to the OSLO summary), each sales representative (own dashboard), production managers and sales administration (production schedule).

## Tools
Excel (advanced: data validation with drop-down lists read from reference sheets, 31 conditional formatting rules written as formulas (COUNTIF for duplicates, TODAY() for overdue billing dates), protected ranges by role, XLOOKUP for client locations, automatic order number with IF/COUNTA/MAX, SUMIF/SUMIFS check totals by sales team and product; checked in the anonymised file on 28 Oct 2026), MyReport Data (data modeling), MyReport Page (data visualization).

## Questions a recruiter might ask
- **What is the production schedule & sales reporting project?** → At OSLO, Rémi rebuilt a business unit's Excel production schedule into one clean, protected table, then built MyReport dashboards on it: a global one for management and one per sales representative.
- **What was wrong before?** → The schedule had several tables per order status on one sheet, anyone could edit it, and there were no reliable statistics.
- **What do the dashboards show?** → Revenue, margin, order count, new business and target, by sales representative, product, production manager and order status, per month, quarter and year, plus a client database.
- **What was the impact?** → Reliable production data and a structured way to steer sales performance; the reporting is used weekly by management.

## Open questions
- Revenue of the business unit: about €3M a year (project document) or €4M (OSLO summary of the performance reporting)? The site says ~€3M.
- Is it the same business unit as the aged receivables project? (Not named on the site.)
- Was SQL also used (it is listed for the aged receivables project)?
- How many people edit the production schedule; before/after figures (time saved, errors).
- The story wording and the "Production manager" role in the conversation.
