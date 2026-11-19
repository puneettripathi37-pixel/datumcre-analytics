# Cedar Ridge Apartments — Multifamily Acquisition Model
## User Guide

**Workbook:** `Cedar_Ridge_Multifamily_Acquisition_Model.xlsx`  
**Version:** 1.0  
**Prepared:** 17 November 2026  
**Currency:** USD  
**Property:** Cedar Ridge Apartments — illustrative 250-unit garden-style multifamily community, Austin, TX  
**Purpose:** Institutional acquisition underwriting, renovation / value-add analysis, debt sizing, exit valuation, equity waterfall, sensitivity and investment-committee reporting.

> This is an illustrative model prepared for demonstration and analytical purposes. It is not investment advice, an appraisal, a fairness opinion, or an offer to sell securities.

---

## 1. Quick start

1. **Open the workbook in desktop Microsoft Excel.** The model uses live Excel what-if data tables for the sensitivity and scenario screens, which require Excel to recalculate fully.
2. **Enable editing** if Excel opens the file in Protected View.
3. **Let the workbook calculate.** The file is saved with `fullCalcOnLoad = 1`; Excel performs a full recalculation when it opens. If values appear blank or stale, press **F9** (or **Ctrl + Alt + F9** for a full rebuild).
4. Go to **Assumptions & Global Controls** and select the active case in **cell C6**:
   - `1` = Base
   - `2` = Upside
   - `3` = Downside
5. Edit **only the yellow cells in columns F:H** on the Assumptions tab. Column D contains formulas that select the active case with `CHOOSE($C$6, …)`.
6. Review **Investment Summary**, **Sensitivity Analysis**, **Scenario Analysis**, **Investment Committee Analysis**, and **Model Checks**.
7. Confirm **Model Checks → D6** reads **PASS**. All 25 checks must pass before relying on an output.

---

## 2. Workbook conventions

### 2.1 Colour legend

| Format | Meaning |
|---|---|
| **Blue font** | Hard-coded input, editable assumption, or scenario value |
| **Black font** | Formula calculated on the same sheet |
| **Green font** | Link to another worksheet |
| **Pale yellow fill** | Editable assumption / scenario input cell |
| **Grey fill** | Column header or supporting row |
| **Dark-blue fill with white text** | Section heading or table header |
| **Red font / red fill** | Error flag or failed check (conditional formatting) |
| **White font on navy** | Key output header |

### 2.2 Calculation conventions

- Monthly periods, first day of each month.
- First projection month = acquisition month (January 2027 in the base case).
- 120 monthly columns (`C:DR`) in the monthly schedules.
- Five-year base hold; exit month is dynamic (`Assumptions → D13`).
- Debt interest is calculated **Actual/365**.
- Annual summaries are derived from the monthly engine with `SUMIFS`, not hard-coded.
- No income taxes, depreciation, 1031 exchange, or partnership tax allocations are modelled.

### 2.3 Navigation

Every tab has hyperlinks in rows 4–5 (or row 5 in a few layouts) to the other tabs. Use these to move around the workbook without scrolling the tab bar. The tab order is fixed:

1. Investment Summary
2. Assumptions & Global Controls
3. Property Information & Unit Mix
4. Rent Roll
5. Historical Financials ∕ T-12
6. Revenue Underwriting
7. Operating Expense Underwriting
8. Capital Expenditure Schedule
9. Monthly Operating Model
10. Acquisition Sources & Uses
11. Debt Financing & Amortization
12. Exit Valuation
13. Monthly Cash Flow & Returns
14. Equity Waterfall
15. Sensitivity Analysis
16. Scenario Analysis
17. Investment Committee Analysis
18. Model Checks

---

## 3. Tab-by-tab guide

| # | Tab | What it does | Key inputs / outputs |
|---|---|---|---|
| 1 | **Investment Summary** | One-page dashboard of the deal: property facts, sources and uses, returns, credit metrics, exit, thesis, risks, annual cash flow summary. | Outputs: purchase price, loan, equity, levered/unlevered/LP/GP IRR, equity multiple, DSCR, exit value. |
| 2 | **Assumptions & Global Controls** | Single control page for all underwriting assumptions and the three scenarios. | `C6` scenario selector; `F:H` scenario inputs; `D` active values. |
| 3 | **Property Information & Unit Mix** | Property profile, unit-mix schedule, current vs. market rents, occupancy, rent/SF, SF totals. | Unit counts and average SF by type; current and market rents. |
| 4 | **Rent Roll** | 250-line unit-level rent roll with lease dates, status, in-place rent, market rent, other charges, concessions, lease term and expiration schedule. | Editable rent-roll detail rows 32–281. Summary rows 5–19. |
| 5 | **Historical Financials ∕ T-12** | Illustrative trailing-twelve-month operating statement compared with the underwritten T-12, with variance, per-unit and per-SF metrics. | T-12 actual vs. underwritten; NOI bridge. |
| 6 | **Revenue Underwriting** | Monthly revenue build: gross potential rent, loss-to-lease, vacancy, concessions, credit loss, bad debt, renovation premium/downtime, other income, EGI. | Monthly rows 12–27; annual summary rows 39–53. |
| 7 | **Operating Expense Underwriting** | Monthly expense build by category, with growth, per-unit/per-SF metrics and management fee. | Monthly rows 28–40; annual summary rows 48–60. |
| 8 | **Capital Expenditure Schedule** | Renovation and capex budget, start/end months, monthly spend, contingency, units renovated and reserve balance. | Control panel rows 8–19; total budget `E22`; monthly rows 28–48. |
| 9 | **Monthly Operating Model** | Consolidated monthly NOI: revenue, expenses, replacement reserves, leasing costs, capex and cash flow after capex. | NOI row 34; annual summary rows 44–58. |
| 10 | **Acquisition Sources & Uses** | Sources and uses at closing, acquisition-cost detail, balance check and capitalisation metrics. | Loan `C8`, GP `C9`, LP `C10`, total equity `C11`, total uses `C26`, balance `C29`. |
| 11 | **Debt Financing & Amortization** | Loan terms, amortising payment, loan constant, monthly Actual/365 amortisation schedule, DSCR, debt yield and annual debt summary. | Loan amount `C7`; rate `C8`; IO `C9`; amortisation `C10`; payment `C17`. |
| 12 | **Exit Valuation** | Forward / trailing 12-month NOI selection, exit cap, gross value, selling costs, legal, loan payoff, prepayment/payoff cost, net proceeds, cap-rate sensitivity. | Exit month `C7`; selected NOI `C11`; cap `C12`; gross value `C13`; net after debt `C20`. |
| 13 | **Monthly Cash Flow & Returns** | Monthly levered and unlevered cash flow, debt service, exit proceeds, reserve return, LP/GP cash flow, DSCR and return summary. | Return summary rows 41–58. |
| 14 | **Equity Waterfall** | Monthly LP/GP waterfall: return of capital, 8% preferred return, GP catch-up, tiered promote and distribution checks. | Monthly rows 10–38; summary rows 51–71. |
| 15 | **Sensitivity Analysis** | Six two-way Excel data tables covering levered IRR, equity multiple, LP IRR and Year 1 DSCR. | Tables 1–6; live data tables. |
| 16 | **Scenario Analysis** | Base / Upside / Downside comparison of returns, NOI, exit value and DSCR, with driver definitions. | Links to hidden scenario data table on the Assumptions tab. |
| 17 | **Investment Committee Analysis** | IC memo: recommendation, executive summary, key metrics, strengths, risks/mitigants, conditions precedent, vote. | Recommendation and conditions are text; metrics are formula-driven. |
| 18 | **Model Checks** | 25 reconciliation and integrity checks with pass/fail status and an overall model status. | Overall status `D6`; individual checks rows 11–35. |

---

## 4. How to change the underwriting

### 4.1 Select a scenario

On **Assumptions & Global Controls**:

- **`C6 = 1`** — Base case.
- **`C6 = 2`** — Upside case.
- **`C6 = 3`** — Downside case.

Column D updates automatically. The selected case flows through every sheet.

### 4.2 Edit assumptions

Edit the **pale-yellow cells in columns F, G and H**:

- **Column F** = Base
- **Column G** = Upside
- **Column H** = Downside

Do **not** overwrite column D; it is the active-case selector formula. If you want a one-off custom case, edit column F and keep `C6 = 1`, or copy the workbook and edit the F:H block.

Key input rows:

| Assumption | Row | Notes |
|---|---:|---|
| Purchase price | 9 | Drives loan size, equity and property tax reassessment. |
| Acquisition / closing date | 10 | First projection month. |
| Investment start date | 11 | Used for lease-term and projection timing. |
| Holding period (years) | 12 | Exit month is `holding period × 12`. Maximum 10 years / 120 months. |
| Acquisition fee | 15 | % of purchase price. |
| Legal, due diligence, other transaction costs | 16, 17, 19 | USD. |
| Financing fees | 18 | % of loan. |
| Working capital / operating reserves | 20, 21 | USD. |
| Closing costs | 22 | % of purchase price. |
| Rental / market rent growth | 27, 28 | Annual. |
| Other income growth | 29 | Annual. |
| Stabilised vacancy | 30 | Physical vacancy. |
| Credit loss / bad debt / concessions | 31–33 | % of net rental or occupied rent. |
| Expense growth / tax growth / insurance growth | 35–37 | Annual. |
| Management fee | 38 | % of EGI. |
| Replacement reserve | 39 | $/unit/year. |
| Lease-up / LTL burn-off | 40, 41 | Months. |
| Renovation premium / units per month / cost per unit / downtime | 42–45 | Value-add drivers. |
| Property tax reassessment rate | 48 | % of purchase price. |
| Insurance base | 49 | USD/year. |
| Leasing costs | 50 | % of EGI. |
| LTV | 54 | Loan sizing. |
| Interest rate | 56 | Fixed annual rate. |
| Interest-only period | 62 | Months. |
| Amortisation period | 63 | Years. |
| Origination fee | 65 | % of loan. |
| Exit / payoff cost | 66 | % of loan, deducted at exit. |
| Prepayment penalty | 72 | % of loan, deducted at exit. |
| Exit cap rate | 76 | Capitalisation rate. |
| Selling costs / disposition legal | 77, 78 | Exit costs. |
| Exit NOI convention | 79 | `Forward 12-Month` or `Trailing 12-Month`. |
| LP preferred return | 85 | Annual. |
| GP catch-up | 87 | % of target. |
| LP residual / GP promote | 88, 89 | Base residual split. |
| IRR hurdles 1–4 | 90–93 | Used to derive promote tiers. |
| GP promote tiers 1–4 | 94–97 | 30% / 35% / 40% / 45%. |
| GP co-invest | 98 | % of total equity. |

### 4.3 Edit rent-roll detail

On **Rent Roll**, rows 32–281 contain the 250 units. Editable columns:

- Unit type, square feet, lease start/expiration, occupancy status, current rent, market rent, other charges, concessions.

Do not delete rows. The summary formulas and revenue build reference the full `32:281` range. If you need to change the unit count, update the unit-mix table and the rent roll consistently, then confirm Model Check 3 and 5 pass.

### 4.4 Edit the capex budget

On **Capital Expenditure Schedule**, control rows 8–19:

- `E` = budget amount
- `F` = start month
- `G` = end month
- `H` = monthly spend (formula)

The unit renovation line (`row 8`) uses the rent-roll unit count, cost per unit and units-per-month inputs. Total budget including 5% contingency is in `E22`.

### 4.5 Change the hold / exit

Change the **holding period** in column F (or G/H) row 12. The exit month (`D13`), exit date (`D14`) and all exit formulas update dynamically. The model supports exits from month 1 to month 120; the 120-month engine does not extend beyond 10 years.

---

## 5. Reading the outputs

### 5.1 Base-case results (v1.0)

| Metric | Value |
|---|---:|
| Purchase price | $35,000,000 |
| Purchase price / unit | $140,000 |
| Total capitalisation (uses) | $42,348,750 |
| Senior loan | $22,750,000 |
| Total equity | $19,598,750 |
| Year 1 NOI | $2,181,934 |
| Stabilised NOI | $2,729,933 |
| Exit NOI (forward 12-month) | $3,308,380 |
| Exit cap rate | 5.75% |
| Gross exit value | $57,537,044 |
| Net sale proceeds after debt | $34,402,992 |
| Levered IRR | 16.9% |
| Unlevered IRR | 12.1% |
| LP IRR | 13.5% |
| GP IRR | 49.4% |
| Equity multiple | 2.04x |
| Total profit | $20,291,677 |
| GP promote | $5,072,919 |
| Year 1 DSCR | 1.48x |
| Minimum monthly DSCR | 1.19x |
| Debt yield | 9.6% |

All figures recalculate when assumptions change. The numbers above are outputs, not hard-coded constants.

### 5.2 Where to look first

- **Investment Summary** — one-page deal view.
- **Monthly Cash Flow & Returns → rows 41–58** — IRR, multiple, profit, DSCR, debt yield.
- **Equity Waterfall → rows 51–71** — LP/GP split, promote, pref paid, distribution check.
- **Model Checks → D6** — overall integrity status.

---

## 6. Sensitivity and scenario analysis

### 6.1 Sensitivity tables

The **Sensitivity Analysis** tab contains six two-way Excel data tables:

1. Levered IRR — exit cap (rows) × purchase price (columns)
2. Levered IRR — vacancy (rows) × market rent growth (columns)
3. Levered IRR — exit cap (rows) × interest rate (columns)
4. Equity multiple — exit cap (rows) × purchase price (columns)
5. LP IRR — exit cap (rows) × market rent growth (columns)
6. Year 1 DSCR — LTV (rows) × interest rate (columns)

Each table is a **live Excel what-if data table** driven by the base-case assumption cells on the Assumptions tab. The workbook also stores cached results so the grids display before recalculation. Press **F9** after changing inputs.

> **Excel is required for live data-table recalculation.** LibreOffice Calc does not implement Excel what-if data tables; it will display the cached values but will not recalculate the grids. This is documented in `Limitations.md`.

### 6.2 Scenario analysis

The **Scenario Analysis** tab compares Base, Upside and Downside using the same engine. The comparison columns link to a hidden three-row Excel data table on the Assumptions tab (`C201:M203`) driven by `C6`. Scenario drivers are listed in rows 25–31 and the narrative is in rows 37–39.

| Driver | Base | Upside | Downside |
|---|---:|---:|---:|
| Purchase price | $35,000,000 | $33,250,000 | $36,750,000 |
| Market rent growth | 3.0% | 4.0% | 2.0% |
| Stabilised vacancy | 5.0% | 4.0% | 7.0% |
| Expense growth | 3.0% | 2.5% | 3.5% |
| Interest rate | 6.50% | 6.00% | 7.25% |
| Exit cap rate | 5.75% | 5.25% | 6.25% |
| Holding period | 5 years | 5 years | 5 years |

---

## 7. Model checks and troubleshooting

### 7.1 Model checks

The **Model Checks** tab contains 25 checks covering:

- sources = uses
- capex budget ties to the control panel
- rent roll unit count and unit-mix reconciliation
- monthly vs. annual revenue, expense and NOI
- T-12 underwritten NOI ties to Year 1
- debt roll-forward and interest + principal = debt service
- debt service ties to cash flow
- waterfall distributes all available cash and LP + GP = total distributions
- levered and unlevered cash-flow reconciliations
- exit proceeds, debt payoff, exit value and reserve return
- equity = LP + GP
- scenario selector validity

`D6` shows **PASS** only when every check passes.

### 7.2 Common issues

| Symptom | Likely cause | Fix |
|---|---|---|
| Outputs show zero or blank | Workbook not recalculated, or opened in a viewer that does not calculate | Open in desktop Excel and press **F9** / **Ctrl + Alt + F9**. |
| Sensitivity grids do not change | Excel data tables not recalculated, or file opened in LibreOffice / Google Sheets | Recalculate in desktop Excel. The grids are live data tables. |
| Scenario selector has no effect | `C6` is not 1, 2 or 3, or column D formulas were overwritten | Set `C6` to 1/2/3; restore the original workbook if column D was hard-coded. |
| `#REF!`, `#VALUE!`, `#NAME?` | Rows/columns deleted, formula overwritten, or incompatible function used | Restore from the original file; check Model Checks; do not insert/delete rows in monthly schedules. |
| Circular reference warning | A formula was edited to refer to itself | Restore original formula. The delivered model is designed without circularity and does not require iterative calculation. |
| File is slow while editing | 17 live data tables recalculate the 120-month model repeatedly | Set **Formulas → Calculation Options → Manual** while editing, then press **F9** when ready. |
| Exit value is zero | Exit cap or selected exit NOI is zero, or exit month exceeds 120 | Check `Assumptions → D76`, `Exit Valuation → C11`, and holding period `D12`. |
| Rent roll totals do not tie | Units added/deleted without updating the unit-mix table | Confirm 250 units and run Model Checks 3–5. |

### 7.3 Protecting the model

- Do not insert or delete rows/columns in the monthly schedules (`C:DR`).
- Do not overwrite column D on the Assumptions tab.
- Do not rename tabs; cross-sheet links and navigation depend on the names.
- Keep the 120-month engine intact. The model supports exits up to month 120.
- Use **Save As** for each new deal; keep the original v1.0 file as a template.

---

## 8. Printing and export

- All tabs are set to landscape (IC memo is portrait) with fit-to-width.
- Freeze panes are set on each tab to keep labels and headers visible.
- Footers show the workbook name and page numbers.
- For IC distribution, print **Investment Summary**, **Scenario Analysis**, **Sensitivity Analysis**, **Investment Committee Analysis**, and **Model Checks**.
- To export a PDF, use **File → Export → Create PDF/XPS** after a full recalculation.

---

## 9. Version and audit trail

| Item | Detail |
|---|---|
| Model version | 1.0 |
| Prepared date | 17 November 2026 |
| Property | Cedar Ridge Apartments (illustrative) |
| Market | Austin, TX (illustrative) |
| Units | 250 |
| Currency | USD |
| Projection | 120 months, monthly |
| Base hold | 5 years / 60 months |
| Calculation engine | Excel formulas; Python engine used only to pre-compute cached data-table snapshots |
| Integrity status | 25 / 25 checks PASS |

---

## 10. Disclaimer

This workbook is an illustrative underwriting model. It is not investment advice, an appraisal, a fairness opinion, or an offer to sell or a solicitation to buy any security. The property, rent roll, market data and operating history are illustrative. Actual results will differ. Users should independently verify all assumptions, legal terms, debt terms, capital costs and market data before making an investment decision.
