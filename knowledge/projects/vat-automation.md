---
id: vat-automation
title: VAT calculation automation
company: OSLO
industry: IT & SaaS Solutions
experience: Data Analyst Intern, Information Systems department, OSLO (Sep – Dec 2025, Villeneuve d'Ascq, France, on site)
category: Automation & AI
on_site: true
page: project-vat-automation.html
tools: [Excel (VBA), MyReport Data (ETL, data modeling)]
sources: [projects/VAT Automation/Content.docx (written by Rémi, 27 Oct 2026; local only), projects/VAT Automation/Controle_Fournisseur_Non_Lettre.xltm (the file with its VBA macro; local only), docs/CV website.md (OSLO summary), about-me.md]
updated: 2026-10-27
---

# VAT calculation automation (OSLO)

## Summary
At OSLO, Rémi automated the monthly VAT calculation on unmatched supplier entries: an Excel file connected to the ERP through MyReport extracts the right accounting entries, calculates the VAT of each entry, and a VBA macro puts each amount in its VAT account column and freezes the data. It saves about 2 hours a month (Rémi, 29 Oct 2026), time freed for more valuable tasks, and removes manual entries.

## Context
OSLO sells IT solutions and software licences and makes about €10M in revenue a year. Every month, the accounting department had to calculate, for each VAT account, the VAT on the supplier entries of journal A1 that were not yet matched. This was done in an Excel file filled in by hand: the amounts of the invoices concerned were copied one by one to calculate the total VAT.

## Problem
- The task came back every month and relied entirely on manual entries, so it was time-consuming and error-prone.
- The process lacked reliability and took time on a low-value task.

## What I built
An Excel file that automates the extraction of the accounting entries and the calculation of the VAT amounts.
- Connected to the ERP through MyReport: it automatically extracts the entries needed (journal A1, supplier entries, not matched or matched in the last 45 days; the cut-off is "today − 45 days" in the file).
- A data model that filters the entries automatically.
- For each selected entry, the VAT is calculated by VAT account: VAT on debits (44566000), VAT on payments (44566020), intra-EU VAT (44520000 and 44566200). Extra information is added for checks and analysis: business unit, entry number, supplier.
- A VBA macro ("TVA", button "Affecter la TVA" / Assign VAT) that sums the VAT of each entry number from the extract, writes it into the right VAT columns of the supplier ledger sheet, freezes the values (so later ERP updates don't change a month already calculated) and applies a rule for credit notes, found from the entry label.
- Process for the user: refresh the data, then click the "Affecter la TVA" button.

Workbook structure (from the file): Feuil2 = MyReport extract, one block per supplier (account and name) with business unit, entry number, line, document, date, offset account, amount, side, VAT account, VAT amount and the 4 VAT columns; Feuil1 = supplier ledger (journal, dates, label, debit, credit) with the 4 VAT columns filled by the macro.

## Results and impact
- About 2 hours saved per month, time freed for more valuable tasks (Rémi, 29 Oct 2026; Rémi's first document said 1 h 30, the CV and OSLO summary say 2 hours).
- No more manual entries, so fewer errors and a more reliable calculation.
- A secured recurring accounting process.

## Users
The accounting department, every month.

## Tools
Excel (VBA macro), MyReport Data (ETL, data modeling), the company's ERP.

## Questions a recruiter might ask
- **Give an example of an automation Rémi built.** → At OSLO, the monthly VAT calculation on unmatched supplier entries: an Excel file connected to the ERP and a VBA macro that assigns each VAT amount to its account, saving about 2 hours a month and removing manual entries.
- **Did Rémi write code at OSLO?** → Yes, a VBA macro that aggregates the VAT by entry, fills the VAT columns, freezes the values and handles credit notes.
- **Why freeze the values?** → So that later updates in the ERP don't change a month that has already been calculated.

## Open questions
- The website story (Manager / Accountant) was written by Claude: wording and roles to confirm.
