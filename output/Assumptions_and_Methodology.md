# Cedar Ridge Apartments — Assumptions and Methodology

**Workbook:** `Cedar_Ridge_Multifamily_Acquisition_Model.xlsx`  
**Version:** 1.0  
**Prepared:** 17 November 2026  
**Currency:** USD  
**Model type:** Monthly, 120-month, formula-driven institutional multifamily acquisition model  
**Base case:** 250-unit garden-style multifamily acquisition in Austin, TX (illustrative), $35.0 million purchase price, five-year hold.

---

## 1. Executive summary of the base case

| Item | Base-case value |
|---|---:|
| Purchase price | $35,000,000 |
| Price per unit | $140,000 |
| Price per SF | $155.73 |
| Total capitalisation (total uses) | $42,348,750 |
| Senior loan | $22,750,000 |
| Loan-to-value | 65.0% |
| Loan-to-cost | 53.7% |
| Total equity | $19,598,750 |
| LP equity (95%) | $18,618,812 |
| GP co-invest (5%) | $979,938 |
| Renovation and capex reserve | $5,696,250 |
| Year 1 NOI | $2,181,934 |
| Stabilised NOI (Year 2) | $2,729,933 |
| Exit NOI (forward 12 months) | $3,308,380 |
| Exit cap rate | 5.75% |
| Gross exit value | $57,537,044 |
| Net sale proceeds after debt and costs | $34,402,992 |
| Levered IRR | 16.9% |
| Unlevered IRR | 12.1% |
| LP IRR | 13.5% |
| GP IRR | 49.4% |
| Equity multiple | 2.04x |
| Total profit (LP + GP) | $20,291,677 |
| GP promote | $5,072,919 |
| Year 1 DSCR | 1.48x |
| Minimum monthly DSCR | 1.19x |
| Debt yield (Year 1 NOI / loan) | 9.6% |
| Exit value / total uses | 1.36x |

These are outputs of the workbook, not hard-coded inputs. They will change if assumptions are edited.

---

## 2. Model architecture and flow

```
Assumptions & Global Controls
        │
        ├── Property Information & Unit Mix
        │           │
        │           └── Rent Roll (250 units)
        │                       │
        ├── Revenue Underwriting ◄┘
        │           │
        ├── Operating Expense Underwriting
        │           │
        └── Capital Expenditure Schedule
                    │
                    ▼
          Monthly Operating Model (NOI)
                    │
        ┌───────────┼─────────────┐
        ▼           ▼             ▼
 Sources & Uses  Debt Schedule  Exit Valuation
        │           │             │
        └───────────┴──────┬──────┘
                           ▼
              Monthly Cash Flow & Returns
                           │
                           ▼
                    Equity Waterfall
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
  Sensitivity      Scenario Analysis   IC Analysis
          │                │                │
          └────────────────┴────────────────┘
                           ▼
                     Model Checks
```

**Design principles**

1. **Inputs are separated from calculations.** Assumptions live on the Assumptions tab (columns F:H, selected into column D). Unit-level data lives on the Rent Roll. Capex controls live on the Capex tab. No calculated output is typed as a constant.
2. **One monthly engine.** All operating, debt, exit and waterfall calculations run on the same 120 monthly columns (`C:DR`) and the same month index. Annual summaries use `SUMIFS` over the monthly rows.
3. **Dynamic exit.** The exit month is `holding period × 12`; every exit, debt payoff, reserve return and XIRR formula uses that month.
4. **No circularity.** Credit loss and bad debt are based on gross potential rent, not on net rental income after credit loss. The model does not require iterative calculation.
5. **Cross-sheet links only.** Inputs are entered once. Other tabs link to them with green-font references.

---

## 3. Transaction timing and sources & uses

### 3.1 Timing

| Item | Base case |
|---|---|
| Acquisition / closing date | 1 January 2027 |
| First projection month | January 2027 (month 1) |
| Investment start | 1 January 2027 |
| Holding period | 5 years |
| Exit month | Month 60 |
| Exit date | 31 December 2031 |
| Projection horizon | 120 months (10 years) |

Month 1 contains both the initial equity contribution and the first month of operations. The initial equity outflow is recorded in the unlevered cash-flow row in month 1. The levered cash-flow row records the equity outflow through the waterfall contribution line.

### 3.2 Sources of funds

| Source | Amount | % of total |
|---|---:|---:|
| Senior mortgage loan | $22,750,000 | 53.72% |
| GP co-invest equity | $979,938 | 2.31% |
| LP equity | $18,618,812 | 43.97% |
| **Total sources** | **$42,348,750** | **100.00%** |

### 3.3 Uses of funds

| Use | Amount | % of total |
|---|---:|---:|
| Purchase price | $35,000,000 | 82.65% |
| Acquisition fee (1.0% of price) | $350,000 | 0.83% |
| Legal expenses | $250,000 | 0.59% |
| Due diligence | $150,000 | 0.35% |
| Financing fees (1.0% of loan) | $227,500 | 0.54% |
| Closing costs (0.5% of price) | $175,000 | 0.41% |
| Renovation and capex reserve | $5,696,250 | 13.45% |
| Working capital | $250,000 | 0.59% |
| Initial operating reserves | $150,000 | 0.35% |
| Other transaction expenses | $100,000 | 0.24% |
| **Total uses** | **$42,348,750** | **100.00%** |

**Balance check:** sources less uses = $0; `Acquisition Sources & Uses → C29` displays `PASS`.

### 3.4 Treatment of the renovation reserve

The full renovation / capex budget is funded at closing through a reserve included in Sources & Uses. This avoids a liquidity gap and keeps the capital plan fully funded. Monthly capex draws are shown **below NOI** in the Monthly Operating Model and in the cash-flow statement. The unused reserve balance is returned to equity at exit as a separate cash-flow line. Because the reserve is funded at closing and any unused balance is returned, capex is not double-counted in exit proceeds.

---

## 4. Property, unit mix and rent roll

### 4.1 Property profile (illustrative)

| Item | Value |
|---|---|
| Property | Cedar Ridge Apartments |
| Market | Austin, TX |
| Year built | 2018 |
| Units | 250 |
| Net rentable SF | 224,750 |
| Average unit size | 899 SF |
| Occupancy | 90.0% (225 occupied / 25 vacant) |
| Weighted average in-place rent | $1,493.91 / month |
| Weighted average market rent | $1,620.22 / month |
| In-place vs. market (per unit) | −7.8% |
| Monthly in-place rental revenue | $336,130 |
| Monthly market rent (all units) | $405,055 |

### 4.2 Unit mix

| Unit type | Units | Avg SF | Current rent | Market rent | Occupied | Vacant |
|---|---:|---:|---:|---:|---:|---:|
| A1 — 1BR / 1BA | 40 | 650 | $1,250 | $1,350 | 36 | 4 |
| A2 — 1BR / 1BA Den | 75 | 800 | $1,400 | $1,525 | 67 | 8 |
| B1 — 2BR / 2BA | 85 | 950 | $1,525 | $1,650 | 77 | 8 |
| B2 — 2BR / 2BA Den | 35 | 1,100 | $1,675 | $1,800 | 31 | 4 |
| C1 — 3BR / 2BA | 15 | 1,300 | $1,950 | $2,100 | 14 | 1 |
| **Total / weighted average** | **250** | **899** | **$1,490** | **$1,613** | **225** | **25** |

### 4.3 Rent roll methodology

- 250 individual units are generated deterministically (no random seed drift between builds).
- Each unit has a unit number, type, SF, lease start, lease expiration, occupancy status, current rent, market rent, other charges and concessions.
- Lease terms are typically 12 months; a portion of leases are month-to-month or expire within the next 12 months.
- The rent roll includes a lease-expiration schedule by month (columns R:T) for turnover analysis.
- Current rents are set below market to create embedded loss-to-lease.
- Market rents are set by unit type and grow at the market rent growth assumption.
- Occupancy status drives occupied/vacant counts and in-place rent; vacant units have zero current rent.

---

## 5. Revenue underwriting

### 5.1 Monthly revenue build

| Line | Methodology |
|---|---|
| **Gross potential rent (GPR)** | In-place rent roll revenue grown at the annual rental growth assumption, plus market-rent growth on the market-rent base. |
| **Loss to lease (LTL)** | The gap between market rent and in-place rent. It burns off over the LTL burn-off period (12 months base) as leases turn. |
| **Physical vacancy** | Stabilised vacancy assumption (5% base), with a lease-up ramp from in-place occupancy (90%) to stabilised occupancy over 12 months. |
| **Concessions** | 1.0% of occupied rent in the base case. |
| **Credit loss** | 0.25% of gross potential rent. |
| **Bad debt** | 0.50% of gross potential rent. |
| **Net rental income** | GPR − LTL − vacancy − concessions − credit loss − bad debt. |
| **Renovation rent premium** | $150 per renovated unit per month, applied to cumulative units renovated, grown with rent growth. |
| **Renovation downtime loss** | Lost rent on units under renovation, based on the downtime factor (50%) and the monthly renovation pace. |
| **Other income** | Parking, pet, laundry, utility reimbursements and other income, grown at other-income growth. |
| **Effective gross income (EGI)** | Net rental income + renovation premium − downtime + other income. |

### 5.2 Year 1 revenue (base case)

| Line | Amount |
|---|---:|
| Gross potential rent | $4,927,137 |
| Loss to lease | ($156,307) |
| Physical vacancy | ($358,668) |
| Concessions | ($45,685) |
| Credit loss | ($12,318) |
| Bad debt | ($24,636) |
| Net rental income | $4,329,524 |
| Renovation premium | $119,136 |
| Renovation downtime | ($97,213) |
| Other income | $364,923 |
| **Effective gross income** | **$4,716,370** |

### 5.3 T-12 vs. underwriting

| Line | T-12 actual | Underwritten | Variance |
|---|---:|---:|---:|
| Effective gross income | $4,475,250 | $4,716,370 | +$241,120 |
| Total operating expenses | $2,284,258 | $2,534,436 | +$250,178 |
| **Net operating income** | **$2,190,992** | **$2,181,934** | **−$9,058** |

The underwriting assumes revenue growth from loss-to-lease burn-off and renovation, offset by a property-tax reassessment and higher operating expenses. Year 1 underwritten NOI is intentionally close to, but slightly below, the T-12, providing a conservative starting point.

---

## 6. Operating expense underwriting

### 6.1 Expense methodology

| Category | Methodology |
|---|---|
| Property taxes | Purchase price × 1.75% reassessment rate, grown at 3.0% per year. This reflects a sale-driven reassessment. |
| Insurance | $220,000 annual base, grown at 3.0% per year. |
| Repairs & maintenance | $1,400 per unit per year, grown at 3.0%. |
| Payroll | $1,680 per unit per year, grown at 3.0%. |
| Utilities | $1,120 per unit per year, grown at 3.0%. |
| Contract services | $720 per unit per year, grown at 3.0%. |
| Administrative | $480 per unit per year, grown at 3.0%. |
| Marketing | 1.25% of EGI. |
| Management fees | 3.0% of EGI. |
| Landscaping | $180 per unit per year, grown at 3.0%. |
| Security | $140 per unit per year, grown at 3.0%. |
| Other expenses | $40,000 per year, grown at 3.0%. |
| Replacement reserves | $300 per unit per year, shown below NOI. |
| Leasing costs | 0.5% of EGI, shown below NOI. |

### 6.2 Year 1 expenses (base case)

| Category | Amount |
|---|---:|
| Property taxes | $620,877 |
| Insurance | $223,009 |
| Repairs & maintenance | $354,787 |
| Payroll | $425,744 |
| Utilities | $283,829 |
| Contract services | $182,462 |
| Administrative | $121,641 |
| Marketing | $58,955 |
| Management fees | $141,491 |
| Landscaping | $45,615 |
| Security | $35,479 |
| Other expenses | $40,547 |
| **Total operating expenses** | **$2,534,436** |

The resulting Year 1 expense ratio is 53.7% of EGI and the NOI margin is 46.3%.

---

## 7. Capital expenditure and renovation

### 7.1 Budget

| Item | Budget | Start month | End month |
|---|---:|---:|---:|
| Unit interior renovations (250 × $12,500) | $3,125,000 | 1 | 25 |
| Interior upgrades | $500,000 | 1 | 12 |
| Exterior improvements | $350,000 | 1 | 18 |
| Roofing | $300,000 | 6 | 24 |
| HVAC | $250,000 | 3 | 18 |
| Plumbing | $200,000 | 6 | 30 |
| Electrical | $150,000 | 4 | 20 |
| Parking | $125,000 | 1 | 12 |
| Landscaping | $75,000 | 1 | 10 |
| Amenities | $200,000 | 1 | 12 |
| Life safety | $75,000 | 1 | 24 |
| Other capex | $75,000 | 1 | 36 |
| **Subtotal** | **$5,425,000** | | |
| Contingency (5%) | $271,250 | | |
| **Total capex budget** | **$5,696,250** | | |

### 7.2 Methodology

- Unit renovations: 10 units per month at $12,500 per unit. The full 250-unit programme takes 25 months.
- Other capex is spread evenly over each item’s start/end month.
- A 5% contingency is applied to all hard costs.
- Capex is funded at closing through the reserve; monthly draws reduce the reserve balance.
- Unspent reserve is returned at exit, so the exit proceeds and the returns capture the unused balance without double counting.
- The renovation premium is applied only to completed units, and downtime is deducted for units under renovation.

---

## 8. Debt financing

### 8.1 Loan terms (base case)

| Term | Value |
|---|---:|
| Loan amount | $22,750,000 |
| LTV | 65.0% |
| Interest rate | 6.50% fixed |
| Interest-only period | 24 months |
| Amortisation period | 30 years |
| Loan term | 5 years |
| Origination fee | 1.0% ($227,500) |
| Exit / payoff cost | 0.5% of loan |
| Prepayment penalty | 0.0% |

### 8.2 Interest and amortisation

- Interest is calculated **Actual/365** on the beginning-of-month balance:
  `Interest = Beginning balance × annual rate × days in month / 365`.
- During the 24-month interest-only period, scheduled principal is zero.
- After month 24, the loan amortises on a 30-year schedule. The monthly payment is calculated from the loan amount, rate and amortisation period.
- The loan balance rolls forward each month: `Ending balance = Beginning balance − scheduled principal`.
- At exit, the loan payoff is the ending balance in the exit month plus prepayment penalty and exit/payoff cost.

### 8.3 Credit metrics (base case)

| Metric | Value |
|---|---:|
| Year 1 DSCR | 1.48x |
| Minimum monthly DSCR | 1.19x |
| Year 1 debt yield | 9.6% |
| Year 1 interest expense | $1,478,750 |
| Year 1 debt service | $1,478,750 |
| Year 3 debt service (first full amortising year) | $1,766,354 |

The minimum monthly DSCR occurs in month 1, when NOI is lowest during the lease-up period.

---

## 9. Exit valuation

### 9.1 Methodology

| Step | Formula / assumption |
|---|---|
| Exit month | Holding period × 12 (60 in base case). |
| Forward 12-month NOI | Sum of NOI for months 61–72. If the exit is within 12 months of the end of the 120-month engine, trailing NOI × (1 + rent growth) is used. |
| Trailing 12-month NOI | Sum of NOI for months 49–60. |
| Selected exit NOI | Forward or trailing, controlled by the exit NOI convention input. |
| Exit cap rate | 5.75% base case. |
| Gross exit value | Selected exit NOI / exit cap rate. |
| Selling costs | 2.0% of gross value. |
| Disposition legal | $75,000. |
| Net sale proceeds before debt | Gross value − selling costs − legal. |
| Loan payoff | Ending debt balance at the exit month. |
| Prepayment penalty / payoff cost | Loan payoff × (prepayment penalty % + exit/payoff cost %). |
| Net sale proceeds after debt | Net before debt − loan payoff − penalty/cost. |

### 9.2 Base-case exit

| Item | Amount |
|---|---:|
| Exit month | 60 |
| Forward 12-month NOI | $3,308,380 |
| Exit cap rate | 5.75% |
| Gross exit value | $57,537,044 |
| Selling costs | ($1,150,741) |
| Disposition legal | ($75,000) |
| Net sale proceeds before debt | $56,311,304 |
| Loan payoff | ($21,799,314) |
| Prepayment penalty / payoff cost | ($108,997) |
| **Net sale proceeds after debt** | **$34,402,992** |

### 9.3 Exit sensitivity

The Exit Valuation tab includes a formula-driven cap-rate sensitivity (5.00% to 6.50% in 25 bp increments) showing gross value, selling costs, legal and net proceeds before debt for each cap rate. These values are calculated from the selected exit NOI; they are not hard-coded.

---

## 10. Monthly cash flow and returns

### 10.1 Cash-flow build

| Line | Methodology |
|---|---|
| NOI | Revenue − operating expenses. |
| Replacement reserves | $300/unit/year, deducted below NOI. |
| Leasing costs | 0.5% of EGI, deducted below NOI. |
| Cash flow before debt service | NOI − reserves − leasing costs. |
| Interest expense | From the debt schedule, Actual/365. |
| Scheduled principal | From the debt schedule. |
| Cash flow after debt service | Cash flow before debt service − interest − principal. Gated at the exit month; months after exit are zero. |
| Net sale proceeds before debt | Exit month only. |
| Loan payoff | Exit month only. |
| Prepayment penalty / payoff cost | Exit month only. |
| Net exit proceeds after debt | Net sale before debt − payoff − penalty/cost. |
| Return of unused renovation reserve | Exit month only. |
| Levered cash flow | Equity contribution (month 1, negative) + gated operating cash flow + net exit proceeds + reserve return. |
| Unlevered cash flow | Total uses (month 1, negative) + gated pre-debt cash flow + net sale before debt + reserve return. |
| LP cash flow | LP contribution + LP distributions from the waterfall. |
| GP cash flow | GP contribution + GP distributions from the waterfall. |

### 10.2 Return metrics

| Metric | Methodology |
|---|---|
| Levered IRR | `XIRR` of monthly levered cash flows from month 1 to the exit month. |
| Unlevered IRR | `XIRR` of monthly unlevered cash flows from month 1 to the exit month. |
| LP IRR | `XIRR` of LP cash flows from month 1 to the exit month. |
| GP IRR | `XIRR` of GP cash flows from month 1 to the exit month. |
| Equity multiple | Total distributions / total equity. |
| Total profit | Total distributions − total equity. |
| Cash-on-cash | Cash flow after debt service / total equity. |
| DSCR | NOI / debt service, monthly and annual. |
| Debt yield | Year 1 NOI / loan amount. |

The XIRR formulas use `OFFSET` over the hold period rather than the full 120 columns, so they remain correct when the exit month changes.

---

## 11. Equity waterfall

### 11.1 Tiers

| Tier | Description | Base-case terms |
|---|---|---|
| 1 | Return of capital | LP capital returned first, then GP capital. |
| 2 | Preferred return | 8.0% annual preferred return on unreturned capital, accrued monthly, compounded. |
| 3 | GP catch-up | GP receives a catch-up so that it reaches its promote share of preferred distributions. Catch-up percentage = 100% of target. |
| 4 | Residual / promote | Residual cash split between LP and GP. Base residual split is 70% LP / 30% GP, with tiered GP promote of 30% / 35% / 40% / 45% based on LP return thresholds. |

### 11.2 Monthly mechanics

1. **Cash available for distribution** = cash flow after debt service + net exit proceeds after debt + return of unused reserve.
2. **Return of capital:** LP receives the lesser of available cash and LP unreturned capital; then GP receives the lesser of remaining cash and GP unreturned capital.
3. **Preferred return:** LP preferred accrues on LP unreturned capital plus unpaid preferred (compounded), at 8% / 12 per month. LP is paid from remaining cash.
4. **GP catch-up:** GP receives `MIN(remaining cash, pref paid × GP share/(1 − GP share) × catch-up %)`. With a 30% GP share, the catch-up target is 42.86% of preferred distributions, which brings the GP to 30% of preferred plus catch-up.
5. **Residual:** remaining cash is split `(1 − tier share)` to LP and `tier share` to GP.
6. **Tier share:** determined by the LP hurdle-test multiple (cumulative return of capital plus preferred return, divided by LP equity, excluding the current month's residual) compared with the IRR-equivalent multiple hurdles:
   - Below hurdle 1: 30%
   - Hurdle 1 to 2: 35%
   - Hurdle 2 to 3: 40%
   - Above hurdle 3: 45%

   The current month's residual is excluded from the tier test because including it would create a circular reference (the residual split depends on the tier, and the tier would depend on the residual). This is a deliberate, documented approximation.

### 11.3 Hurdle conversion

The promote hurdles are entered as IRRs (12%, 15%, 18%, 20%). Because the monthly waterfall tests a distribution multiple, each IRR hurdle is converted to an equivalent multiple:

```
Equivalent multiple = (1 + hurdle IRR) ^ holding period
```

For a five-year hold:

| Hurdle | IRR | Equivalent multiple |
|---|---:|---:|
| 1 | 12.0% | 1.762x |
| 2 | 15.0% | 2.011x |
| 3 | 18.0% | 2.288x |
| 4 | 20.0% | 2.488x |

In the base case, the final LP multiple (total LP distributions / LP equity) is 1.76x, while the monthly hurdle-test multiple before the final residual is approximately 1.43x. Both are below hurdle 1, so the base-case GP promote share is 30%. The model still supports the full 30–45% tier structure if returns reach higher thresholds.

### 11.4 Waterfall outputs (base case)

| Item | Amount |
|---|---:|
| LP total contributions | $18,618,812 |
| LP total distributions | $32,822,987 |
| LP profit | $14,204,174 |
| LP IRR | 13.5% |
| LP multiple | 1.76x |
| GP total contributions | $979,938 |
| GP total distributions | $7,067,441 |
| GP profit | $6,087,503 |
| GP IRR | 49.4% |
| GP multiple | 7.21x |
| GP promote | $5,072,919 |
| Total distributions | $39,890,427 |
| Total profit | $20,291,677 |
| Distribution check | $0 / PASS |

> Minor differences between the waterfall summary totals and the cash-flow totals (typically a few thousand dollars) arise because the waterfall distributes cash monthly and the cash-flow rows include month-1 timing and reserve-return rounding. Model Checks 15–18 confirm the waterfall reconciles within the $1 tolerance.

---

## 12. Scenario analysis

### 12.1 Scenario drivers

| Driver | Base | Upside | Downside |
|---|---:|---:|---:|
| Purchase price | $35,000,000 | $33,250,000 | $36,750,000 |
| Rental growth | 3.0% | 4.0% | 2.0% |
| Market rent growth | 3.0% | 4.0% | 2.0% |
| Stabilised vacancy | 5.0% | 4.0% | 7.0% |
| Credit loss | 0.25% | 0.15% | 0.50% |
| Bad debt | 0.50% | 0.25% | 0.75% |
| Concessions | 1.0% | 0.5% | 1.5% |
| Expense growth | 3.0% | 2.5% | 3.5% |
| Renovation premium | $150/unit/month | $175/unit/month | $125/unit/month |
| Renovation pace | 10 units/month | 12 units/month | 8 units/month |
| Renovation cost | $12,500/unit | $11,500/unit | $14,000/unit |
| LTV | 65% | 65% | 60% |
| Interest rate | 6.50% | 6.00% | 7.25% |
| Exit cap rate | 5.75% | 5.25% | 6.25% |
| Exit NOI convention | Forward | Forward | Trailing |

The full driver set is on the Assumptions tab in columns F:H. The live workbook recalculates the selected scenario with `CHOOSE($C$6, …)`.

### 12.2 Scenario mechanics

- The Scenario Analysis tab compares Base / Upside / Downside.
- The comparison cells link to a hidden three-row Excel data table on the Assumptions tab (`C201:M203`) driven by the scenario selector.
- In Excel, the data table recalculates the full 120-month model for each scenario.
- Cached values are pre-computed by the independent Python engine for display before recalculation. Excel recalculates them on open.

---

## 13. Sensitivity analysis

Six two-way Excel data tables are provided:

| Table | Output | Rows | Columns |
|---|---|---|---|
| 1 | Levered IRR | Exit cap (5.00%–6.00%) | Purchase price ($32.5m–$37.5m) |
| 2 | Levered IRR | Vacancy (4.0%–6.0%) | Market rent growth (2.0%–4.0%) |
| 3 | Levered IRR | Exit cap (5.25%–6.25%) | Interest rate (5.5%–7.5%) |
| 4 | Equity multiple | Exit cap (5.00%–6.00%) | Purchase price ($32.5m–$37.5m) |
| 5 | LP IRR | Exit cap (5.25%–6.25%) | Market rent growth (2.0%–4.0%) |
| 6 | Year 1 DSCR | LTV (55%–75%) | Interest rate (5.5%–7.5%) |

**Table structure**

- Each grid is an Excel **what-if data table** (`DataTableFormula`), not a static array.
- The row and column input cells are the base-case assumption cells on the Assumptions tab.
- The data table recalculates the full model for each combination.
- The workbook ships with cached results for display and recalculates the tables on open in Excel.
- The base-case intersection of each table ties to the live model output.

---

## 14. Model checks

| # | Check | Tolerance |
|---:|---|---:|
| 1 | Sources equal uses | $1 |
| 2 | Capex budget ties to control panel | $1 |
| 3 | Rent roll has 250 units | 0 |
| 4 | Unit mix ties to rent roll | 0 |
| 5 | Rent roll occupied + vacant = total | 0 |
| 6 | Revenue monthly Year 1 ties annual | $1 |
| 7 | Expense monthly Year 1 ties annual | $1 |
| 8 | NOI monthly Year 1 ties annual | $1 |
| 9 | Revenue annual EGI ties OP | $1 |
| 10 | Expense annual total ties OP | $1 |
| 11 | T-12 underwritten NOI ties Year 1 | $1 |
| 12 | Debt ending balance rolls forward | $1 |
| 13 | Interest + principal = debt service | $1 |
| 14 | Debt service annual ties cash flow | $1 |
| 15 | Waterfall distributes all available cash | $1 |
| 16 | Waterfall LP + GP = total distributions | $1 |
| 17 | Waterfall LP + GP cash flow = distributions − contributions | $1 |
| 18 | Levered CF equals equity + distributions | $1 |
| 19 | Unlevered CF reconciles to operations + sale | $1 |
| 20 | Exit net proceeds ties cash flow | $1 |
| 21 | Debt payoff ties debt schedule | $1 |
| 22 | Exit value = selected NOI / cap | $1 |
| 23 | Unused capex reserve returned | $1 |
| 24 | Equity = LP + GP | $1 |
| 25 | Scenario selector valid | n/a |

**Overall status:** `Model Checks → D6` shows **PASS** when all 25 checks pass and **FAIL** if any check fails.

---

## 15. Formula and formatting standards

- **Inputs:** blue font, pale-yellow fill.
- **Same-sheet formulas:** black font.
- **Cross-sheet links:** green font.
- **Section headings:** dark-blue fill with white text.
- **Column headers:** grey fill.
- **Key outputs:** bold, with consistent number formats (`$#,##0`, `0.0%`, `0.00x`, dates as `mm/dd/yyyy`).
- **Negative values:** parentheses and red in financial schedules.
- **Freeze panes:** set on every tab.
- **Print setup:** landscape, fit-to-width, footer with file name and page number; IC memo is portrait.
- **No hard-coded calculated outputs.** Every return, NOI, debt balance, exit value and waterfall result is a formula.

---

## 16. Version control

| Version | Date | Notes |
|---|---|---|
| 1.0 | 17 November 2026 | Initial institutional model: 18 tabs, 120-month engine, dynamic exit, Actual/365 debt, waterfall, six sensitivity tables, three scenarios, IC memo, 25 model checks. |

---

## 17. Disclaimer

This model is illustrative and prepared for demonstration purposes. It is not investment advice, an appraisal, a fairness opinion, or an offer to sell or a solicitation to buy any security. All property, market, rent-roll and operating data are illustrative. Users must independently verify assumptions, debt terms, legal terms, capital costs and market data before making an investment decision.
