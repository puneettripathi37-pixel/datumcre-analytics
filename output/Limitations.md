# Cedar Ridge Apartments — Model Limitations

**Workbook:** `Cedar_Ridge_Multifamily_Acquisition_Model.xlsx`  
**Version:** 1.0  
**Prepared:** 17 November 2026  
**Purpose of this document:** To state clearly what the model does, what it does not do, and where its outputs should be used with caution.

---

## 1. Illustrative nature of the model

This workbook is an **illustrative underwriting model**, not an appraisal, fairness opinion, investment recommendation, or offer to sell or buy any security.

- The property, rent roll, lease data, market data, operating history and transaction terms are **illustrative**. They are not a real offering.
- The model is intended to demonstrate institutional underwriting mechanics and formula structure. It is not a substitute for property-level due diligence, third-party reports, legal review, or lender terms.
- All outputs depend on the assumptions entered. Small changes in rent growth, vacancy, exit cap rate, interest rate or renovation timing can materially change IRR, equity multiple and promote.

---

## 2. Accounting and tax limitations

### 2.1 No income taxes

The model does **not** calculate:

- federal or state income taxes;
- depreciation or cost-segregation benefits;
- capital gains taxes;
- 1031 exchange treatment;
- tax basis, at-risk limitations, or passive activity rules;
- partnership taxable income allocations;
- carried interest tax treatment;
- state and local transfer taxes beyond the simplified closing-cost percentage.

Returns are pre-tax, before investor-level taxes and fees. Actual after-tax returns will differ, potentially materially.

### 2.2 No investor-level fees

The model does **not** include:

- asset management fees;
- property management oversight fees above the property-level management fee;
- acquisition or disposition fees beyond the sponsor acquisition fee in Sources & Uses;
- fund-level administration, legal or audit expenses;
- placement fees or fundraising costs;
- LP reporting or custody costs.

### 2.3 No partnership accounting

The waterfall allocates cash, not taxable income or loss. It does not model:

- tax capital accounts;
- Section 704(b) allocations;
- minimum gain / phantom gain;
- deficit restoration obligations;
- preferred return compounding for tax purposes;
- GP clawback or true-up.

---

## 3. Revenue limitations

### 3.1 Rent roll

- The 250-unit rent roll is **synthetic**. It is internally consistent with the unit mix, but it is not a real rent roll and does not reflect actual leases, concessions, side letters, affordable restrictions, or tenant credit.
- Lease dates and expiration timing are generated deterministically. They do not represent an actual turnover schedule.
- The model does not track individual tenant move-outs, notices, renewals, or lease-break penalties.
- Unit-level bad debt is not modelled; bad debt is an aggregate percentage of gross potential rent.

### 3.2 Revenue methodology

- Loss-to-lease burns off smoothly over the LTL burn-off period. In reality, loss-to-lease burns off lease by lease, with timing gaps, renewal friction and renewal rent caps.
- Occupancy ramps linearly from in-place occupancy to stabilised occupancy over the lease-up period. Actual lease-up is lumpy and can stall.
- Renovation premium is applied to cumulative units renovated at a constant premium. It does not model unit-level rent achievement, tenant resistance, or re-leasing downtime beyond the downtime factor.
- Concessions are a percentage of occupied rent. The model does not model free rent, waived fees, or concession amortisation.
- Other income (parking, pet, laundry, utility reimbursements, other) is grown at a single rate. It does not model recovery reconciliations, RUBS, utility resale margins, or ancillary revenue programs.
- No percentage rent, retail income, cell-tower income, or commercial leases.
- No rent control, affordable housing restrictions, or regulatory agreements.

### 3.3 Market assumptions

- Market rent growth is a single annual rate. It does not use a forward market curve, submarket-level data, or seasonality.
- Vacancy is a stabilised physical vacancy rate. It does not model economic vacancy, bad debt, or concession interaction separately beyond the inputs.
- No tenant demand, employment, supply, or demographic analysis is embedded.

---

## 4. Operating expense limitations

- Expenses are underwritten by category with a single growth rate per category. There is no monthly seasonality, real estate tax appeal, or reassessment phase-in beyond the property-tax formula.
- Property taxes are based on purchase price × reassessment rate. Actual taxes depend on the assessor, jurisdiction, appeal timeline and millage rates.
- Insurance is a base amount grown annually. It does not model premium resets, deductibles, catastrophe exposure, or claims.
- Repairs and maintenance, payroll, utilities, contract services, administrative, landscaping and security are per-unit or fixed amounts. They do not reflect actual staffing plans, union contracts, utility invoices, or service contracts.
- Management fee is a percentage of EGI. It does not model minimum fees, incentive fees, or sub-metered billing.
- Marketing is 1.25% of EGI. It does not model lease-up marketing budgets separately.
- Replacement reserves and leasing costs are shown below NOI, not inside operating expenses. This is a presentation choice; lenders and appraisers may treat them differently.
- No CAM/NNN recovery netting. Utility reimbursements are shown as other income rather than as an offset to utility expense. This can affect expense ratios and lender underwriting.
- No real estate tax escrow, insurance escrow, or lender reserve funding is modelled.

---

## 5. Capital expenditure limitations

- The capex budget is a **straight-line / fixed schedule**. It does not model contractor pay applications, retainage, change orders, or invoice timing.
- Contingency is a flat 5% of hard costs. It does not model scope creep, construction delays, or cost escalation beyond the contingency.
- Renovation premium and downtime are simplified. The model does not link unit renovations to specific lease expirations, tenant relocation, or unit-level availability.
- Capex is funded at closing through a reserve. The model does not model construction financing, draw interest, or a lender-held capex facility.
- Unused reserve is returned at exit. In practice, reserve release may be subject to lender conditions, holdbacks, or timing delays.
- No deferred maintenance beyond the listed capex items; no structural, environmental, or life-safety remediation beyond the life-safety line.
- No furniture, fixtures and equipment (FF&E) or operating supplies beyond working capital.

---

## 6. Debt limitations

- The loan is a **single senior fixed-rate loan** in the base case. Floating-rate inputs exist (index, spread, floor, cap), but the model applies a single static floating rate, not a forward curve or periodic resets.
- No mezzanine debt, preferred equity, C-PACE, or subordinate financing.
- No construction loan or bridge loan.
- No lender covenants, cash management, lockbox, or default triggers.
- No debt service reserve or interest reserve funding at closing beyond the initial operating reserves line.
- No loan extension fees, workout costs, or maturity default.
- Refinance inputs (refinance month, LTV, rate, costs) are present but the base model does not execute a refinance; the loan is held to exit.
- Loan extension option is informational; it is not modelled as a cash-flow event.
- Prepayment penalty and exit/payoff cost are applied at exit as a percentage of the loan balance. Actual prepayment penalties depend on the loan documents, treasury yields, and the prepayment formula.
- Interest is Actual/365 with monthly compounding of the balance roll-forward. No day-count conventions other than Actual/365.
- No negative amortisation, interest-only extension, or amortisation recast.
- No rate cap premium, swap breakage, or hedge cost.

---

## 7. Exit limitations

- Exit value is based on **capitalising selected NOI** at the exit cap rate. It is not an appraisal, sales comparison, or replacement-cost conclusion.
- The model supports forward 12-month or trailing 12-month NOI. It does not model a broker opinion of value, a marketed process, or a discount for marketability.
- The direct exit value input is present but the base exit calculation uses the cap-rate method. The direct value is an alternative input, not a second live valuation.
- Selling costs are 2.0% of gross value plus a fixed legal amount. Actual disposition costs, transfer taxes, and broker fees vary by market and deal size.
- Exit timing is fixed by the hold period. The model does not model a delayed sale, extension, or early sale optionality, although the hold period can be changed.
- No holdover, tenant estoppel, or closing proration adjustments.
- Exit proceeds are assumed received in the exit month; no escrow holdback, earn-out, or seller financing.

---

## 8. Waterfall and promote limitations

- The waterfall distributes **cash monthly**; it does not accrue unpaid distributable cash across periods except for the LP preferred return.
- LP preferred return is accrued monthly at 8%/12 and compounded monthly. Actual partnership agreements may use simple interest, quarterly compounding, or different day-count conventions.
- Return of capital is LP first, then GP. Actual waterfalls may return capital pro rata or in a different order.
- GP catch-up is modelled as a target percentage of preferred distributions using the GP profit share. It does not model a full catch-up to a target IRR.
- **Promote tiers are tested using an IRR-equivalent multiple.** Each IRR hurdle is converted to `(1 + hurdle) ^ hold years`. This is an approximation: it does not account for the exact timing of interim distributions, which is what an IRR calculation captures. A true IRR-based promote can produce different tier splits.
- The tier-testing multiple used in the monthly waterfall is cumulative LP return of capital plus preferred return, **excluding the current month's residual**. This avoids a circular reference but means the tier is determined before the current residual split. In the base case the tier-testing multiple is approximately 1.43x, so the 30% tier applies even though the final LP multiple is 1.76x.
- No GP clawback, true-up, or lookback. If later performance deteriorates, promote already distributed is not returned.
- No distribution escrow, holdback, or LP consent mechanics.
- GP co-invest is treated as 5% of total equity and receives distributions pari passu with its share; the promote calculation is `GP distributions − total distributions × GP co-invest %`, floored at zero.
- No preferred equity, co-investment vehicles, side letters, or fee offsets.
- No investor-level IRR gross-up or management fee.

---

## 9. Sensitivity and scenario limitations

- The sensitivity tab contains **six** two-way tables. It does not cover every driver (e.g., hold period, renovation pace, acquisition price and exit cap simultaneously in a three-way grid, or financing structure).
- Sensitivity tables are **live Excel what-if data tables**. They require desktop Microsoft Excel to recalculate. LibreOffice Calc and some web viewers do not support Excel data tables; they may display cached values only.
- The workbook ships with cached data-table values pre-computed by an independent Python engine. Those cached values are for display before recalculation. **Excel recalculates the tables on open.** Minor differences between the cached snapshot and the live workbook can occur because the engine and the workbook are separate implementations (base-case levered IRR differs by roughly 0.1 percentage point).
- Scenario Analysis uses a three-row data table driven by the scenario selector. The Base / Upside / Downside columns are live after Excel recalculation; cached values are snapshots.
- No Monte Carlo simulation, probability weighting, or stochastic analysis.
- No sensitivity to tenant credit, lease rollover concentration, or capital market spreads.

---

## 10. Model mechanics and Excel limitations

- The model uses **Excel data tables** (17 tables in total). Excel data tables can be slow to recalculate on large models. If editing is slow, switch to manual calculation and press F9 when ready.
- The workbook is formula-only; there are no macros, VBA, Power Query, or external data connections.
- The model requires desktop Excel for full functionality. It has been validated in LibreOffice with data tables stripped, producing zero error cells; the delivered workbook retains the live data tables.
- Do not insert or delete rows or columns in the monthly schedules (`C:DR`). Doing so can break ranges, XIRR formulas, data tables, and model checks.
- Do not rename tabs. Cross-sheet formulas and navigation hyperlinks depend on sheet names.
- Do not overwrite column D on the Assumptions tab; it contains the active-scenario formulas.
- The 120-month engine supports exits up to month 120. A hold period longer than 10 years is not supported without extending the engine.
- Model checks are **internal consistency checks** (sources = uses, monthly vs. annual, debt roll-forward, waterfall distribution, etc.). They do not validate market reasonableness, legal terms, or credit quality.
- The model does not use iterative calculation. If Excel reports a circular reference, a formula has been edited incorrectly; restore the original formula.

---

## 11. Presentation limitations

- The workbook uses an illustrative property name, market, rent roll and operating history. It is not a real deal.
- The Investment Summary and IC memo contain narrative text that is manually written and may not update automatically when assumptions change. The **numbers** are formula-driven; the **commentary** is illustrative and should be reviewed after material assumption changes.
- The model does not include maps, photos, market research, comparable sales, or third-party reports.
- Print layouts are set for standard letter/A4 output; large sensitivity tables may require scaling or legal/tabloid paper for readability.
- Number formats use USD and US date conventions.

---

## 12. Summary of key limitations

| Area | Limitation |
|---|---|
| Taxes | No income taxes, depreciation, 1031, or partnership tax accounting |
| Fees | No asset management, fund, placement, or investor-level fees |
| Revenue | Synthetic rent roll; smooth LTL burn-off and lease-up; no tenant-level turnover |
| Expenses | Single growth rates; no recoveries netting; simplified taxes and insurance |
| Capex | Straight-line schedule; 5% contingency; no construction financing or retainage |
| Debt | Single senior loan; static floating rate; no mezz, construction, or refinance execution |
| Exit | Cap-rate method only; direct value input not live; fixed hold |
| Waterfall | Monthly cash waterfall; IRR hurdles approximated by equivalent multiples; no clawback |
| Sensitivity | Six two-way tables; Excel data tables required for live recalculation |
| Validation | 25 internal checks PASS; not a market, legal, or credit opinion |
| Taxes/legal | Illustrative only; not investment advice |

---

## 13. Appropriate use

Use this model to:

- understand the mechanics of a monthly multifamily acquisition underwriting;
- test the directional impact of rent growth, vacancy, exit cap, interest rate, leverage and renovation assumptions;
- demonstrate a formula-driven waterfall and sensitivity framework;
- support internal discussion and IC preparation with clearly labelled illustrative assumptions.

Do **not** use this model as:

- a substitute for a real rent roll, T-12, appraisal, or property condition report;
- a lender underwriting submission without replacing illustrative assumptions with actual deal terms;
- tax, legal, or accounting advice;
- a fairness opinion or valuation opinion;
- a guarantee of future performance.

---

## 14. Disclaimer

This workbook and the accompanying documentation are illustrative and provided for demonstration and analytical purposes only. They do not constitute investment advice, an appraisal, a fairness opinion, or an offer to sell or a solicitation to buy any security. All property, market, rent-roll and operating data are illustrative. Actual results will differ. Users must independently verify all assumptions, legal terms, debt terms, capital costs and market data before making an investment decision.
