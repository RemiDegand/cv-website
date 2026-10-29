---
id: cash-flow-tools
title: Cash flow calculation tools
company: OSLO
industry: IT & SaaS Solutions
experience: Data Analyst Intern, Information Systems department, OSLO (Sep – Dec 2025, Villeneuve d'Ascq, France, on site)
category: Apps & Tools
on_site: true
page: project-cash-flow-tools.html
tools: [Excel, MyReport Data (ETL, data modeling), Finance]
sources: [projects/Cashflow tools/Content.docx (written by Rémi, 27 Oct 2026; local only), projects/Cashflow tools/Cashflow Oslo V2.xlsx (file with randomised amounts; local only), docs/CV website.md (OSLO summary), about-me.md]
updated: 2026-10-29
---

# Cash flow calculation tools (OSLO)

## Summary
At OSLO, Rémi automated the cash flow calculation of the company and 2 other entities (3 in total) in an Excel file connected to the ERP through MyReport. The user picks a start and end date, refreshes, and gets a reliable, up-to-date cash flow with checks and financial ratios.

## Context
OSLO sells IT solutions and software licences and makes about €10M in revenue a year. It calculated its cash flow, and that of 2 other entities, in an Excel file. To feed it, accounting entries were exported from the ERP as CSV files, copied into the file, and completed with several complementary manual entries.

## Problem
- The file had become heavy and unstable: every year's extractions were stored in the same file, so it crashed regularly.
- Copying and pasting the exports (risk of pasting into the wrong sheet, missing or duplicating rows) and recurring complementary manual entries increased the risk of errors and made the cash flow less reliable.
- The process was time-consuming and not suited to regular use.

## What I built
An Excel file that calculates the cash flow for a period chosen by the user (start and end date in the file). It is connected to the ERP through MyReport: ETL flows extract the accounting entries updated the same day, with no intermediate storage of data.
- A data model in MyReport Data that groups the accounting entries by account.
- Automatic calculation of the opening balance (debit/credit) and of the movement over the period (debit/credit), then the closing balance, for each account.
- Automatic mapping of each account to a cash flow category (a mapping table: EBITDA, change in working capital split into trade receivables, trade payables, inventory, payroll and tax, other balance sheet items; financial and exceptional; corporate tax; CAPEX; disposals; loan repayments; other; current accounts; change in cash).
- The cash flow statement: operating, investing and financing cash flow, change in cash, cash at the start and end of the period.
- Extra financial indicators: EBITDA / revenue, current assets / current liabilities.
- A control table that shows inconsistencies and where they come from (sum of movements, closing minus opening balance, account checks, total cash flow, working capital and cash checks; each must be 0).

Workbook structure (from the file): Génération (MyReport extract for the period, by account plus client, supplier and staff sub-ledgers), Concatenation (opening, movement, closing by account), Affectation (account → category mapping, month → quarter), Check (detail by account and category, control table, ratios), Cashlow_Trimestre (cash flow statement for the period), Cashlow (quarters of several years side by side).

## Results and impact
- A structured process: the entries load straight from the ERP for any period (the user only picks the dates and refreshes), with no copy-paste, manual entries or stored extractions. The file stays light and no longer crashes, and typing mistakes are gone.
- Checks at every step: each stage of the calculation (Generation, Concatenation, Check sheets) has its own control that must be 0, so a mistake shows up at once, along with when and where it happened.
- Ratios (profitability = EBITDA / revenue, current ratio = current assets / current liabilities) complement the cash flow, for a fuller view of the company's financial health.

## Users
Not named in the document ("the user"); used to manage the company's cash (financial steering).

## Tools
Excel, MyReport Data (ETL, data modeling), the company's ERP.

## Questions a recruiter might ask
- **What did Rémi build for cash flow at OSLO?** → An Excel file connected to the ERP through MyReport that calculates the cash flow of 3 entities for any period, with checks and financial ratios.
- **What was wrong before?** → Entries were exported from the ERP as CSV and pasted into one file that stored every year, so it was heavy, crashed often and needed complementary manual entries; the copy-paste and the manual entries were a risk of errors.
- **How does it make the numbers reliable?** → Each account is mapped automatically to a cash flow category, and a control table checks that everything balances and shows where an error comes from.

## Open questions
- Who used the file (finance department, management?) and how often.
- Time saved per calculation.
- The 3 entities: one file per entity or one file for all?
- The website story (Manager / Accountant) was written by Claude: wording and roles to confirm.
