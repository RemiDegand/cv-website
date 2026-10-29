---
id: revenue-recognition
title: Revenue recognition model
company: OSLO
industry: IT & SaaS Solutions
experience: Data Analyst Intern, Information Systems department, OSLO (Sep – Dec 2025, Villeneuve d'Ascq, France, on site)
category: Data Modeling
on_site: true
page: project-revenue-recognition.html
tools: [MyReport Data (data modeling), SQL, Finance]
sources: [projects/Revenue recognition model/Content.docx (written by Rémi, 27 Oct 2026; local only), projects/Revenue recognition model/Schema of mapping.pdf (Rémi's schema of the model; local only), docs/CV website.md (OSLO summary), about-me.md]
updated: 2026-10-27
---

# Revenue recognition model (OSLO)

## Summary
At OSLO, Rémi designed an activity-based revenue recognition data model in MyReport Data: the revenue of each invoice line is spread over the months of the activity it pays for, instead of being booked entirely on the invoice date. Annual revenue discrepancies went from €350k to €8k, a 98% reduction in errors compared with the company's previous model.

## Context
OSLO sells software solutions and licences and makes about €10M in revenue a year. It bills in several ways: one-time orders, multi-period contracts and bundled solutions. Two models already existed (Rémi, 29 Oct 2026):
- A model that calculated revenue from the invoices. It worked, but put the full revenue of each invoice on its invoice date, whatever the actual duration of the activity behind it, so revenue was not split over the months it covered.
- A first revenue recognition model, rarely used because its figures differed from the accounting by several hundred k€.

## Problem
- The monthly view did not reflect the business unit's real economic activity: revenue was not spread over the duration of the contracts or services, so monthly activity analyses were biased.
- Cross-analysis between financial and operational data was limited.
- The existing revenue recognition model was not reliable: discrepancies of several hundred k€ (€350k a year in the result, see Results), unsuitable for decisions. (Content.docx gave "10–15%"; the user chose to show the amount instead, 29 Oct 2026.)

## What I built
A data model in MyReport Data that allocates revenue over the actual duration of the activity, based on invoice line items extracted from the SQL database. It has:
- Three specialised sub-models, one per billing type: one-time orders, contracts, bundles ("mapping product types", to adapt to each product's specificities).
- A fourth consolidation layer that combines the three sources, with the same data fields for every revenue stream.
- A final allocation layer that distributes revenue over time, in line with the actual activity.

Key principles:
- Revenue is calculated at invoice line level: each line is analysed on its own to find the type of activity, mainly from its general ledger account.
- For each line, the model defines a revenue start date and an activity duration in months covered.
- The net amount of each line is spread evenly across the months covered, giving a monthly allocated revenue directly usable for analysis and reporting.

The website shows an illustrative example (not company data): one invoice with a 12-month contract (€12k), a one-time order (€3k) and a 6-month bundle (€6k), all invoiced in January. Before: €21k in January, nothing after. After: €5k in January, €2k a month from February to June, €1k a month from July to December.

## Results and impact
- Annual revenue discrepancies reduced from €350k to €8k (98% fewer errors than the previous model, per Rémi's schema).
- A realistic monthly view of performance and a better understanding of revenue dynamics.
- More reliable analyses for performance monitoring and decision-making.

## Users
Management and finance (dashboards used for decisions); not named in the document.

## Tools
MyReport Data (data modeling), SQL database (invoice lines), finance knowledge (revenue recognition).

## Questions a recruiter might ask
- **What is Rémi's strongest result at OSLO?** → The revenue recognition model: annual discrepancies went from €350k to €8k.
- **How does the model work?** → Each invoice line is mapped to a type (order, contract, bundle) from its general ledger account, the three streams are consolidated with the same fields, then each line's net amount is spread evenly over the months it covers, from its start date.
- **Why was it needed?** → The dashboards booked all revenue on the invoice date, so a yearly contract looked like a spike in one month; the existing revenue recognition model had discrepancies of several hundred k€, so it was rarely used.
- **Does Rémi have data modeling experience?** → Yes: 13 analytical data models at OSLO, including this one and the aged receivables data model.

## Open questions
- The scope: the document mentions "the Business Unit"; one business unit or the whole company?
- How the discrepancy (€350k → €8k) was measured.
- The website story (Manager / Controller) was written by Claude: wording and roles to confirm.
