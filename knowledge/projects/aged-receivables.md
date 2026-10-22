---
id: aged-receivables
title: Aged receivables reporting
company: OSLO
industry: IT & SaaS Solutions
experience: Data Analyst Intern, Information Systems department, OSLO (Sep – Dec 2025, Villeneuve d'Ascq, France, on site)
category: Dashboards & Reporting
on_site: true
page: project-aged-receivables.html
tools: [MyReport Data (data modeling), MyReport Page (data visualization), SQL]
sources: [projects/Aged receivables/Content.docx (written by Rémi, 14 Oct 2026; local only), anonymised dashboard PDFs (local only; screens in images/projects/), docs/CV website.md (OSLO summary), about-me.md]
updated: 2026-10-22
---

# Aged receivables reporting (OSLO)

## Summary
At OSLO, Rémi built an automated aged receivables reporting system for 3 business units: payment data from the ERP, a dedicated data model and two MyReport dashboards (one for management, one per sales representative). It made receivables management proactive and gave the sales teams clear accountability for resolving disputes.

## Context
The aged receivables project was carried out during Rémi's Data Analyst internship at OSLO, for 3 of OSLO's business units, with hundreds of clients and thousands of invoices a year (Rémi, 22 Oct 2026: say "3 business units", don't name them). The accounting tool provided by the finance department only showed the total amount of overdue payments and a raw list of unpaid invoices.

## Problem
- The existing tool gave limited visibility: only the total overdue amount and an unstructured list of late payments.
- With this many clients and invoices, it was hard to see quickly which disputes to handle first and what action to take.
- Unpaid invoices built up over time, with no monitoring tool and no defined accountability in the sales teams.
- Story used on the website (wording by Claude, to confirm): the manager asks "Our sales are good. So where is the cash?", and the sales rep can't say which clients haven't paid or who should call them.

## What I built
An automated aged receivables reporting system, directly connected to the payment data extracted from the ERP:
1. **ERP:** payment data extracted automatically.
2. **Data model:** payments structured by status and sales representative.
3. **MyReport dashboards:** designed for day-to-day operational use.

Each payment gets a status by days overdue: Not due, < 30 days, 30–60 days, 60–90 days, 90+ days.

**Dashboard 1, global receivables monitoring (for management):** total payment amounts by payment status, number of payments by status, and a bar chart of receivable amounts by sales representative and payment status.

**Dashboard 2, one per sales representative:** restricted to the representative's own portfolio, for targeted follow-up and dispute resolution: total amounts and number of payments by status, a chart of receivables by status, and a detailed list of outstanding payments with customer information, sorted by days overdue.

## Results and impact
- The manager has a high-level view of each sales representative's receivables and sees quickly where the cash is.
- Each sales representative has the list of their unpaid invoices, sorted by days overdue, with the client and contact details, so they can call the right client straight away.
- Proactive receivables management, and sales teams accountable for resolving their disputes, contributing to cash control for each business unit.
- Example read from the anonymised global dashboard shown on the site: €3.81M is more than 90 days overdue, €3.15M of it with Sales Team 1 (anonymised figures, not real OSLO data).
- Scope: 3 business units (confirmed by Rémi, 22 Oct 2026).

## Users
Management (global dashboard) and each sales representative (own portfolio dashboard). 4 sales teams appear in the anonymised dashboards.

## Tools
MyReport Data (data modeling), MyReport Page (data visualization), SQL (confirmed by Rémi, 22 Oct 2026). The payment data comes from the ERP.

## Questions a recruiter might ask
- **What is the aged receivables project?** → An automated reporting system at OSLO: ERP payment data, a data model and two MyReport dashboards showing overdue payments by status, for management and for each sales representative.
- **What problem did it solve?** → The old tool only showed the total overdue and a raw list of invoices, so nobody could see quickly which clients to chase or who should do it.
- **What was the impact?** → Proactive receivables management and clear accountability for the sales teams, contributing to cash control.

## Open questions
- How often the dashboards were used, and any before/after figure (overdue amount, days sales outstanding).
- The story wording and "Sales rep" in the conversation.
