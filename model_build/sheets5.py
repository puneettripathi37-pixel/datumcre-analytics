"""Investment summary, sensitivity, scenarios, IC memo and model checks."""
from __future__ import annotations

import sys, os
from dataclasses import replace

sys.path.insert(0, os.path.dirname(__file__))
from core import *
from openpyxl.worksheet.formula import DataTableFormula
from engine import Assumptions, run_model

# ---------------------------------------------------------------------------
# Scenario helpers (engine snapshots used for the scenario and sensitivity
# screens; the live model remains fully formula-driven).
# ---------------------------------------------------------------------------

ENGINE_MAP = {
    "pp": "purchase_price", "acq_date": "acquisition_date", "hold": "hold_years",
    "acq_fee": "acquisition_fee_pct", "legal": "legal_expenses", "dd": "due_diligence",
    "fin_fee": "financing_fee_pct", "other_tx": "other_transaction",
    "working": "working_capital", "op_res": "operating_reserves", "closing": "closing_cost_pct",
    "rent_growth": "rent_growth", "other_growth": "other_income_growth", "vacancy": "vacancy",
    "credit": "credit_loss", "bad": "bad_debt", "conc": "concessions",
    "exp_growth": "expense_growth", "tax_growth": "tax_growth", "ins_growth": "insurance_growth",
    "mgmt": "management_fee_pct", "repl": "replacement_reserve_per_unit",
    "leaseup": "leaseup_months", "ltl_burn": "ltl_burn_months",
    "reno_prem": "renovation_premium", "reno_units": "renovation_units_per_month",
    "reno_cost": "renovation_cost_per_unit", "reno_down": "renovation_downtime_factor",
    "tax_rate": "property_tax_rate", "ins_base": "insurance_annual",
    "ltv": "ltv", "rate": "interest_rate", "io": "interest_only_months",
    "amort": "amortization_years", "term": "loan_term_years", "orig": "origination_fee_pct",
    "exit_fin": "exit_financing_cost_pct", "prepay": "prepayment_penalty_pct",
    "exit_cap": "exit_cap", "sell": "selling_cost_pct", "disp_legal": "disposition_legal",
    "pref": "lp_pref", "catchup": "gp_catchup_pct", "lp_share": "lp_residual_share",
    "gp_share": "gp_residual_share", "h1": "hurdle_1", "h2": "hurdle_2",
    "h3": "hurdle_3", "h4": "hurdle_4", "gp_t1": "gp_tier_1", "gp_t2": "gp_tier_2",
    "gp_t3": "gp_tier_3", "gp_t4": "gp_tier_4", "gp_co": "gp_coinvest_pct",
    "leasing": "leasing_cost_pct_egi",
}


def scenario_assumptions(case: int) -> Assumptions:
    base = Assumptions()
    overrides = {}
    for key, vals in SCENARIO_DATA.items():
        field = ENGINE_MAP.get(key)
        if field and hasattr(base, field):
            overrides[field] = vals[case]
    return replace(base, **overrides)


def cached_scenarios():
    out = {}
    for case in range(3):
        r = run_model(scenario_assumptions(case))
        out[case] = {
            "levered": r.levered_irr or 0.0,
            "unlevered": r.unlevered_irr or 0.0,
            "em": r.equity_multiple,
            "lp": r.lp_irr or 0.0,
            "gp": r.gp_irr or 0.0,
            "promote": r.gp_promote,
            "exit_value": r.exit_value,
            "year1_noi": r.year1_noi,
            "dscr": r.dscr_avg,
            "profit": r.total_profit,
            "stab_noi": r.stabilized_noi,
        }
    return out


def sens_run(field_values: dict):
    a = replace(Assumptions(), **field_values)
    return run_model(a)


# ---------------------------------------------------------------------------
# Hidden data tables on the Assumptions sheet
# ---------------------------------------------------------------------------

SCEN_FIELDS = [
    ("levered", "Levered IRR", "C", "0.0%", "= 'Monthly Cash Flow & Returns'!$C$41"),
    ("unlevered", "Unlevered IRR", "D", "0.0%", "= 'Monthly Cash Flow & Returns'!$C$42"),
    ("em", "Equity Multiple", "E", '0.00"x"', "= 'Monthly Cash Flow & Returns'!$C$45"),
    ("lp", "LP IRR", "F", "0.0%", "= 'Monthly Cash Flow & Returns'!$C$43"),
    ("gp", "GP IRR", "G", "0.0%", "= 'Monthly Cash Flow & Returns'!$C$44"),
    ("promote", "GP Promote", "H", "$#,##0", "= 'Equity Waterfall'!$C$61"),
    ("exit_value", "Exit Value", "I", "$#,##0", "= 'Exit Valuation'!$C$13"),
    ("year1_noi", "Year 1 NOI", "J", "$#,##0", "= 'Monthly Operating Model'!$C$46"),
    ("dscr", "Year 1 DSCR", "K", '0.00"x"', "= 'Monthly Cash Flow & Returns'!$C$52"),
    ("profit", "Total Profit", "L", "$#,##0", "= 'Monthly Cash Flow & Returns'!$C$48"),
    ("stab_noi", "Stabilized NOI", "M", "$#,##0", "= 'Monthly Operating Model'!$D$46"),
]


def build_data_tables(wb, sc_cache, sens_cache):
    """Write hidden scenario and sensitivity tables on the Assumptions sheet."""
    ws = wb[ASSUMP]
    dt_cells = {}

    # Scenario one-input tables (input cell C6, same sheet)
    put(ws, "B199", "SCENARIO WHAT-IF TABLES (hidden; input cell C6)", fnt=font("808080", True, 8))
    put(ws, "B200", "Scenario", fnt=font(WHITE, True, 8), f=fill(NAVY))
    for i in range(3):
        ws.cell(row=201 + i, column=2, value=i + 1).font = font(BLUE, False, 8)
    for key, label, col, fmt, result_formula in SCEN_FIELDS:
        put(ws, f"{col}200", label, fnt=font(WHITE, True, 8), f=fill(NAVY))
        ws[f"{col}200"].number_format = fmt
        # result formula cell
        c = ws[f"{col}200"]
        c.value = result_formula.replace("= ", "=")
        c.font = font(BLACK, False, 8)
        for i in range(3):
            r = 201 + i
            cache_val = sc_cache[i][key]
            ws[f"{col}{r}"] = cache_val
            ws[f"{col}{r}"].number_format = fmt
            ws[f"{col}{r}"].font = font(BLACK, False, 8)
        ws[f"{col}201"] = DataTableFormula(ref=f"{col}201:{col}203", dt2D=False, dtr=False, r1="$C$6")
        dt_cells[f"{col}201"] = sc_cache[0][key]

    # 2D tables
    def write_2d(top_row, label, col_vals, row_vals, body_vals, result_formula,
                 row_fmt, col_fmt, body_fmt, r1, r2):
        put(ws, f"B{top_row - 2}", label, fnt=font("808080", True, 8))
        for j, v in enumerate(col_vals):
            cell = ws.cell(row=top_row, column=3 + j, value=v)
            cell.number_format = col_fmt
            cell.font = font(BLUE, False, 8)
        c = ws[f"B{top_row}"]
        c.value = result_formula.replace("= ", "=")
        c.font = font(BLACK, False, 8)
        for i, v in enumerate(row_vals):
            r = top_row + 1 + i
            rc = ws.cell(row=r, column=2, value=v)
            rc.number_format = row_fmt
            rc.font = font(BLUE, False, 8)
            for j in range(len(col_vals)):
                bc = ws.cell(row=r, column=3 + j, value=body_vals[i][j])
                bc.number_format = body_fmt
                bc.font = font(BLACK, False, 8)
        first = f"C{top_row + 1}"
        last_col = get_column_letter(2 + len(col_vals))
        ref = f"{first}:{last_col}{top_row + len(row_vals)}"
        ws[first] = DataTableFormula(ref=ref, dt2D=True, dtr=True, r1=r1, r2=r2)
        dt_cells[first] = body_vals[0][0]

    # Table 1: Levered IRR - exit cap x purchase price
    prices = [32_500_000, 33_750_000, 35_000_000, 36_250_000, 37_500_000]
    caps = [0.0500, 0.0525, 0.0550, 0.0575, 0.0600]
    body = []
    for cap in caps:
        row = []
        for pp in prices:
            row.append(sens_cache[("t1", pp, cap)])
        body.append(row)
    write_2d(211, "T1: Levered IRR | exit cap (rows) x purchase price (columns)",
             prices, caps, body, "= 'Monthly Cash Flow & Returns'!$C$41",
             FMT_PCT2, FMT_USD, FMT_IRR, "$F$9", "$F$76")

    # Table 2: Levered IRR - vacancy x market rent growth
    growths = [0.020, 0.025, 0.030, 0.035, 0.040]
    vacs = [0.040, 0.045, 0.050, 0.055, 0.060]
    body = [[sens_cache[("t2", g, v)] for g in growths] for v in vacs]
    write_2d(220, "T2: Levered IRR | vacancy (rows) x market rent growth (columns)",
             growths, vacs, body, "= 'Monthly Cash Flow & Returns'!$C$41",
             FMT_PCT2, FMT_PCT2, FMT_IRR, "$F$28", "$F$30")

    # Table 3: Levered IRR - exit cap x interest rate
    rates = [0.055, 0.060, 0.065, 0.070, 0.075]
    caps3 = [0.0525, 0.0550, 0.0575, 0.0600, 0.0625]
    body = [[sens_cache[("t3", rt, cp)] for rt in rates] for cp in caps3]
    write_2d(229, "T3: Levered IRR | exit cap (rows) x interest rate (columns)",
             rates, caps3, body, "= 'Monthly Cash Flow & Returns'!$C$41",
             FMT_PCT2, FMT_PCT2, FMT_IRR, "$F$56", "$F$76")

    # Table 4: Equity multiple - exit cap x purchase price
    body = [[sens_cache[("t4", pp, cp)] for pp in prices] for cp in caps]
    write_2d(238, "T4: Equity multiple | exit cap (rows) x purchase price (columns)",
             prices, caps, body, "= 'Monthly Cash Flow & Returns'!$C$45",
             FMT_PCT2, FMT_USD, FMT_MULT, "$F$9", "$F$76")

    # Table 5: LP IRR - exit cap x market rent growth
    body = [[sens_cache[("t5", g, cp)] for g in growths] for cp in caps3]
    write_2d(247, "T5: LP IRR | exit cap (rows) x market rent growth (columns)",
             growths, caps3, body, "= 'Monthly Cash Flow & Returns'!$C$43",
             FMT_PCT2, FMT_PCT2, FMT_IRR, "$F$28", "$F$76")

    # Table 6: DSCR - LTV x interest rate
    ltvs = [0.55, 0.60, 0.65, 0.70, 0.75]
    body = [[sens_cache[("t6", rt, lv)] for rt in rates] for lv in ltvs]
    write_2d(256, "T6: Year 1 DSCR | LTV (rows) x interest rate (columns)",
             rates, ltvs, body, "= 'Monthly Cash Flow & Returns'!$C$52",
             FMT_PCT2, FMT_PCT2, '0.00"x"', "$F$56", "$F$54")

    return dt_cells


# ---------------------------------------------------------------------------
# Investment summary
# ---------------------------------------------------------------------------

def build_summary(wb) -> None:
    ws = setup_sheet(wb, SUMMARY, NAVY, gridlines=False)
    title_block(ws, "Investment Summary",
                "Cedar Ridge Apartments | 250-unit multifamily acquisition | Illustrative underwriting", 16)
    nav_links(ws, 4)
    put(ws, "D4", "Prepared 11/17/2026 | Version 1.0 | USD | Illustrative only - not investment advice", fnt=font("7F7F7F", False, 8, True))

    section(ws, 6, 2, 5, "DEAL SNAPSHOT")
    snap = [
        (7, "Property", f"={ref(PROP, 'D8')}", FMT_TEXT),
        (8, "Market / state", f'={ref(PROP, "D10")}&", "&{ref(PROP, "D11")}', FMT_TEXT),
        (9, "Number of units", f"={ref(PROP, 'D13')}", "0"),
        (10, "Purchase price", f"={PP}", FMT_USD),
        (11, "Price per unit", f"={ref(SU, 'C32')}", FMT_USD),
        (12, "Total capitalisation", f"={ref(SU, 'C36')}", FMT_USD),
        (13, "Senior loan", f"={ref(SU, 'C8')}", FMT_USD),
        (14, "Total equity", f"={ref(SU, 'C11')}", FMT_USD),
        (15, "Closing date", f"={ACQ_DATE}", FMT_DATE),
        (16, "Exit date", f"={EXIT_DATE}", FMT_DATE),
    ]
    for r, lab, f, fmt in snap:
        put(ws, f"B{r}", lab, fnt=font(BLACK, False, 9))
        link_cell(ws, f"C{r}", f, fmt)

    section(ws, 18, 2, 5, "KEY RETURNS")
    rets = [
        (19, "Levered IRR", f"={ref(CF, 'C41')}", FMT_IRR),
        (20, "Unlevered IRR", f"={ref(CF, 'C42')}", FMT_IRR),
        (21, "LP IRR", f"={ref(CF, 'C43')}", FMT_IRR),
        (22, "GP IRR", f"={ref(CF, 'C44')}", FMT_IRR),
        (23, "Equity multiple", f"={ref(CF, 'C45')}", FMT_MULT),
        (24, "Total profit", f"={ref(CF, 'C48')}", FMT_USD),
        (25, "Average cash-on-cash (Years 2-5)", f"={ref(CF, 'C51')}", FMT_PCT),
        (26, "Year 1 cash-on-cash", f"={ref(CF, 'C49')}", FMT_PCT),
    ]
    for r, lab, f, fmt in rets:
        put(ws, f"B{r}", lab, fnt=font(NAVY, True, 9) if r in (19, 23) else font(BLACK, False, 9))
        link_cell(ws, f"C{r}", f, fmt)

    section(ws, 28, 2, 5, "CREDIT & EXIT")
    credit = [
        (29, "Loan-to-value", f"={ref(SU, 'C38')}", FMT_PCT),
        (30, "Loan-to-cost", f"={ref(SU, 'C37')}", FMT_PCT),
        (31, "Year 1 DSCR", f"={ref(CF, 'C52')}", '0.00"x"'),
        (32, "Minimum monthly DSCR", f"={ref(CF, 'C53')}", '0.00"x"'),
        (33, "Debt yield", f"={ref(CF, 'C55')}", FMT_PCT),
        (34, "Exit capitalization rate", f"={ref(EXIT, 'C12')}", FMT_PCT2),
        (35, "Gross exit value", f"={ref(EXIT, 'C13')}", FMT_USD),
        (36, "Net exit proceeds after debt", f"={ref(EXIT, 'C20')}", FMT_USD),
        (37, "Exit value vs. total cost", f"={ref(EXIT, 'C25')}", FMT_PCT),
    ]
    for r, lab, f, fmt in credit:
        put(ws, f"B{r}", lab, fnt=font(BLACK, False, 9))
        link_cell(ws, f"C{r}", f, fmt)

    # Charts
    ws_op = wb[OP]
    cats = Reference(ws_op, min_col=3, max_col=12, min_row=43)
    ch = BarChart()
    ch.type = "col"
    ch.style = 10
    ch.title = "Annual EGI and NOI ($)"
    ch.y_axis.title = "USD"
    ch.x_axis.title = "Investment year"
    data = Reference(ws_op, min_col=2, max_col=12, min_row=44, max_row=46)
    ch.add_data(data, titles_from_data=True, from_rows=True)
    ch.set_categories(cats)
    ch.height = 7.2
    ch.width = 14.5
    ch.gapWidth = 60
    ws.add_chart(ch, "E6")

    ch2 = BarChart()
    ch2.type = "col"
    ch2.style = 12
    ch2.title = "Annual levered cash flow ($)"
    ch2.y_axis.title = "USD"
    data2 = Reference(ws, min_col=2, max_col=7, min_row=59, max_row=61)
    ch2.add_data(data2, titles_from_data=True, from_rows=True)
    ch2.set_categories(Reference(ws, min_col=3, max_col=7, min_row=55))
    ch2.height = 7.2
    ch2.width = 14.5
    ch2.gapWidth = 60
    ws.add_chart(ch2, "E20")

    # Thesis and risks
    section(ws, 40, 2, 16, "INVESTMENT THESIS")
    thesis = [
        "Attractive basis: purchase price of approximately $140,000 per unit versus illustrative replacement cost, with a value-add renovation programme sized at roughly $5.7 million.",
        "Loss-to-lease and occupancy upside: in-place rents are below market and physical occupancy is below the 95% stabilized assumption, creating embedded revenue growth.",
        "Phased interior renovation: targeted upgrades support a $150 per unit per month rent premium with limited downtime, while common-area and deferred maintenance capital protects the asset.",
        "Conservative leverage: 65% LTV, 24 months interest-only, 30-year amortization and a 1.48x Year 1 DSCR provide distribution cushion through the renovation period.",
        "Exit flexibility: a 5-year hold with a 5.75% exit cap and forward 12-month NOI produces an illustrative 16.9% levered IRR and 2.04x equity multiple.",
    ]
    for i, t in enumerate(thesis):
        r = 41 + i
        put(ws, f"B{r}", f"• {t}", fnt=font(BLACK, False, 9), wrap=True)
        ws.merge_cells(f"B{r}:P{r}")
        ws.row_dimensions[r].height = 24

    section(ws, 47, 2, 16, "KEY RISKS & MITIGANTS")
    risks = [
        "Renovation execution and downtime: cost overruns or slower lease-up would reduce yields. Mitigants include a 5% contingency, phased scheduling and monthly tracking of units renovated.",
        "Interest-rate and refinancing risk: the loan is assumed fixed for the hold; a refinancing or extension is modelled as an option, but a higher rate would reduce cash flow and exit proceeds.",
        "Exit capitalization rate risk: a 50 bp expansion in the exit cap reduces value by roughly 8%. Sensitivity tables quantify the impact on levered IRR and equity multiple.",
        "Market rent and vacancy risk: the business plan relies on market rent growth and loss-to-lease burn-off. Downside cases assume lower growth and higher vacancy.",
        "Illiquidity: real estate is illiquid and the model assumes a sale at the end of the hold; no guarantee of timing or pricing is implied.",
    ]
    for i, t in enumerate(risks):
        r = 48 + i
        put(ws, f"B{r}", f"• {t}", fnt=font(BLACK, False, 9), wrap=True)
        ws.merge_cells(f"B{r}:P{r}")
        ws.row_dimensions[r].height = 26

    # Annual summary table
    section(ws, 54, 2, 8, "ANNUAL CASH FLOW SUMMARY")
    put(ws, "B55", "USD", fnt=font(WHITE, True, 8), f=fill(NAVY), border=BORDER)
    for i in range(5):
        col = get_column_letter(3 + i)
        put(ws, f"{col}55", i + 1, "0", fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)
    put(ws, "H55", "Total", fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)
    rows = [
        (56, "Effective gross income", f"={ref(OP, 'C44')}", FMT_USD),
        (57, "Net operating income", f"={ref(OP, 'C46')}", FMT_USD),
        (58, "Debt service", f"={ref(DEBT, 'C42')}", FMT_USD),
        (59, "Cash flow after debt service", None, FMT_USD),
        (60, "Exit proceeds", None, FMT_USD),
        (61, "Levered cash flow", None, FMT_USD),
        (62, "DSCR", None, '0.00"x"'),
        (63, "Cash-on-cash", None, FMT_PCT),
    ]
    for r, lab, first_f, fmt in rows:
        put(ws, f"B{r}", lab, fnt=font(NAVY if r in (57, 61) else BLACK, r in (57, 61), 9), border=BORDER)
        for i in range(5):
            col = get_column_letter(3 + i)
            if r == 56:
                f = f"={ref(OP, col + '44', False)}"
            elif r == 57:
                f = f"={ref(OP, col + '46', False)}"
            elif r == 58:
                f = f"={ref(DEBT, col + '42', False)}"
            elif r == 59:
                f = f"=SUMIFS({ref(CF, 'C16')}:{ref(CF, 'DR16')},{ref(CF, 'C7')}:{ref(CF, 'DR7')},\">=\"&({col}$55-1)*12+1,{ref(CF, 'C7')}:{ref(CF, 'DR7')},\"<=\"&{col}$55*12)"
            elif r == 60:
                f = f"=IF({col}$55={HOLD},{ref(EXIT, 'C20')},0)"
            elif r == 61:
                f = f"={col}59+{col}60"
            elif r == 62:
                f = f"=IFERROR({col}57/{col}58,0)"
            else:
                f = f"=IFERROR({col}59/{ref(SU, 'C11')},0)"
            formula_cell(ws, f"{col}{r}", f, fmt)
        if r in (56, 57, 58, 59, 60, 61):
            formula_cell(ws, f"H{r}", f"=SUM(C{r}:G{r})", fmt)
        elif r == 62:
            formula_cell(ws, "H62", "=IFERROR(H57/H58,0)", fmt)
        else:
            formula_cell(ws, "H63", f"=IFERROR(H59/5/{ref(SU, 'C11')},0)", fmt)

    put(ws, "B65", "Model conventions: monthly periods, first day of month, Actual/365 interest, 120-month projection, dynamic exit month. Blue font = input; black = same-sheet formula; green = cross-sheet link. No income taxes are modelled.", fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B65:P65")
    ws.row_dimensions[65].height = 30

    set_widths(ws, {"A": 2, "B": 44, "C": 16, "D": 16, "E": 2, "F": 12, "G": 12, "H": 12,
                    "I": 12, "J": 12, "K": 12, "L": 12, "M": 12, "N": 12, "O": 12, "P": 12})
    ws.freeze_panes = "B6"
    ws.print_area = "A1:P65"
    ws.sheet_view.zoomScale = 90


# ---------------------------------------------------------------------------
# Sensitivity analysis
# ---------------------------------------------------------------------------

SENS_TABLES = [
    # (title, top_row, table_key, row_label, col_label, body_fmt, header_fmt_row, header_fmt_col, note)
    ("TABLE 1 | LEVERED IRR - EXIT CAP (ROWS) VS. PURCHASE PRICE (COLUMNS)", 6, "t1",
     "Exit cap \\ Purchase price", "Purchase price", FMT_IRR, FMT_PCT2, FMT_USD,
     "Central case is a 5.75% exit cap and $35.0 million purchase price. A 25 bp cap expansion reduces levered IRR by approximately 1.5 points."),
    ("TABLE 2 | LEVERED IRR - VACANCY (ROWS) VS. MARKET RENT GROWTH (COLUMNS)", 15, "t2",
     "Vacancy \\ Market rent growth", "Market rent growth", FMT_IRR, FMT_PCT2, FMT_PCT2,
     "Rent growth is applied to market rent; vacancy is the stabilized physical vacancy assumption. The model ramps occupancy from the in-place level."),
    ("TABLE 3 | LEVERED IRR - EXIT CAP (ROWS) VS. INTEREST RATE (COLUMNS)", 24, "t3",
     "Exit cap \\ Interest rate", "Interest rate", FMT_IRR, FMT_PCT2, FMT_PCT2,
     "Interest rate changes affect debt service, cash flow and exit proceeds. The loan is sized at a constant 65% LTV."),
    ("TABLE 4 | EQUITY MULTIPLE - EXIT CAP (ROWS) VS. PURCHASE PRICE (COLUMNS)", 33, "t4",
     "Exit cap \\ Purchase price", "Purchase price", FMT_MULT, FMT_PCT2, FMT_USD,
     "Equity multiple is total distributions divided by total equity invested. Purchase price changes flow through to loan size, equity and property taxes."),
    ("TABLE 5 | LP IRR - EXIT CAP (ROWS) VS. MARKET RENT GROWTH (COLUMNS)", 42, "t5",
     "Exit cap \\ Market rent growth", "Market rent growth", FMT_IRR, FMT_PCT2, FMT_PCT2,
     "LP IRR reflects the waterfall after the 8% preferred return, GP catch-up and promote tiers."),
    ("TABLE 6 | YEAR 1 DSCR - LTV (ROWS) VS. INTEREST RATE (COLUMNS)", 51, "t6",
     "LTV \\ Interest rate", "Interest rate", '0.00"x"', FMT_PCT2, FMT_PCT2,
     "DSCR = Year 1 NOI / Year 1 debt service. Most lenders require 1.25x or better; the base case is 1.48x."),
]

SENS_SOURCE = {
    "t1": ("C8:G12", "C7:G7", "B8:B12", "C211:G211", "B212:B216", "C212:G216"),
    "t2": ("C17:G21", "C16:G16", "B17:B21", "C220:G220", "B221:B225", "C221:G225"),
    "t3": ("C26:G30", "C25:G25", "B26:B30", "C229:G229", "B230:B234", "C230:G234"),
    "t4": ("C35:G39", "C34:G34", "B35:B39", "C238:G238", "B239:B243", "C239:G243"),
    "t5": ("C44:G48", "C43:G43", "B44:B48", "C247:G247", "B248:B252", "C248:G252"),
    "t6": ("C53:G57", "C52:G52", "B53:B57", "C256:G256", "B257:B261", "C257:G261"),
}


def build_sensitivity(wb) -> None:
    ws = setup_sheet(wb, SENS, "FF0000", gridlines=False)
    title_block(ws, "Sensitivity Analysis",
                "Two-way sensitivity grids | Levered IRR, equity multiple, LP IRR and DSCR | Live Excel data tables", 10)
    nav_links(ws, 4)
    put(ws, "D4", "Grids are Excel what-if data tables driven by the base-scenario inputs on the Assumptions tab. Press F9 in Excel to recalculate. Cached values are shown for portability.", fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("D4:J4")
    ws.row_dimensions[4].height = 22

    for title, top, key, row_label, col_label, body_fmt, row_fmt, col_fmt, note in SENS_TABLES:
        section(ws, top, 2, 8, title)
        body_range, col_range, row_range, src_cols, src_rows, src_body = SENS_SOURCE[key]
        put(ws, f"B{top+1}", row_label, fnt=font(WHITE, True, 8), f=fill(NAVY), border=BORDER, align="center", wrap=True)
        # column headers from hidden table
        src_cols_cells = src_cols.split(":")
        start_col_letter = "".join(ch for ch in src_cols_cells[0] if ch.isalpha())
        start_row = int("".join(ch for ch in src_cols_cells[0] if ch.isdigit()))
        for j in range(5):
            col = get_column_letter(3 + j)
            src_col = get_column_letter(3 + j)
            if key in ("t2", "t5"):
                link_cell(ws, f"{col}{top+1}", f"={ref(ASSUMP, f'{src_col}{start_row}')}", FMT_PCT2)
            else:
                link_cell(ws, f"{col}{top+1}", f"={ref(ASSUMP, f'{src_col}{start_row}')}", col_fmt)
        # row headers and body
        for i in range(5):
            r = top + 2 + i
            src_row = int("".join(ch for ch in src_rows.split(":")[0] if ch.isdigit())) + i
            link_cell(ws, f"B{r}", f"={ref(ASSUMP, f'B{src_row}')}", row_fmt)
            for j in range(5):
                col = get_column_letter(3 + j)
                src_col = get_column_letter(3 + j)
                src_row_cell = src_row
                # body rows start one row before the row headers in the hidden table
                body_start = int("".join(ch for ch in src_body.split(":")[0] if ch.isdigit()))
                link_cell(ws, f"{col}{r}", f"={ref(ASSUMP, f'{src_col}{body_start + i}')}", body_fmt)
        # conditional formatting
        rng = f"C{top+2}:G{top+6}"
        if body_fmt == FMT_IRR:
            ws.conditional_formatting.add(rng, ColorScaleRule(
                start_type="min", start_color="F8696B", mid_type="percentile", mid_value=50,
                mid_color="FFEB84", end_type="max", end_color="63BE7B"))
        elif body_fmt == FMT_MULT or body_fmt == '0.00"x"':
            ws.conditional_formatting.add(rng, ColorScaleRule(
                start_type="min", start_color="F8696B", mid_type="percentile", mid_value=50,
                mid_color="FFEB84", end_type="max", end_color="63BE7B"))
        put(ws, f"B{top+7}", note, fnt=font("595959", False, 8, True), wrap=True)
        ws.merge_cells(f"B{top+7}:H{top+7}")
        ws.row_dimensions[top+7].height = 22

    put(ws, "B60", "Methodology: each grid is a two-way Excel data table. The row and column inputs are the base-case assumption cells on the Assumptions tab; the data table recalculates the full 120-month model for each combination. Cached values are pre-computed by the independent Python engine. The workbook must be recalculated in Excel (F9) after changing inputs.", fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B60:J60")
    ws.row_dimensions[60].height = 34
    put(ws, "B61", "LibreOffice does not support Excel what-if data tables; values will appear blank or zero until the workbook is opened in Excel and recalculated.", fnt=font("C00000", False, 8, True), wrap=True)
    ws.merge_cells("B61:J61")
    ws.row_dimensions[61].height = 22

    set_widths(ws, {"A": 2, "B": 31, "C": 14, "D": 14, "E": 14, "F": 14, "G": 14, "H": 16, "I": 2, "J": 2})
    ws.freeze_panes = "B6"
    ws.print_area = "A1:J61"
    ws.sheet_view.zoomScale = 95


# ---------------------------------------------------------------------------
# Scenario analysis
# ---------------------------------------------------------------------------

def build_scenario(wb) -> None:
    ws = setup_sheet(wb, SCEN, "ED7D31", gridlines=False)
    title_block(ws, "Scenario Analysis",
                "Base, upside and downside cases | Full-model snapshots across the same 120-month engine", 10)
    nav_links(ws, 4)
    put(ws, "C6", "Active scenario:", fnt=font(NAVY, True, 9))
    link_cell(ws, "D6", f"={ref(ASSUMP, 'D6')}", FMT_TEXT)
    put(ws, "C7", "Scenario selector on Assumptions:", fnt=font(NAVY, True, 9))
    link_cell(ws, "D7", f"={ref(ASSUMP, 'C6')}", "0")

    section(ws, 9, 2, 8, "SCENARIO COMPARISON")
    headers = ["Metric", "Base", "Upside", "Downside", "Downside vs. Base"]
    for j, h in enumerate(headers):
        col = get_column_letter(2 + j)
        put(ws, f"{col}10", h, fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER, wrap=True)
    ws.row_dimensions[10].height = 26

    # hidden scenario table column mapping
    scen_cols = {
        "levered": ("C", FMT_IRR), "unlevered": ("D", FMT_IRR), "lp": ("F", FMT_IRR),
        "gp": ("G", FMT_IRR), "em": ("E", FMT_MULT), "promote": ("H", FMT_USD),
        "profit": ("L", FMT_USD), "year1_noi": ("J", FMT_USD), "stab_noi": ("M", FMT_USD),
        "exit_value": ("I", FMT_USD), "dscr": ("K", '0.00"x"'),
    }
    rows = [
        (11, "Levered IRR", "levered", True),
        (12, "Unlevered IRR", "unlevered", False),
        (13, "LP IRR", "lp", True),
        (14, "GP IRR", "gp", False),
        (15, "Equity multiple", "em", True),
        (16, "GP promote", "promote", False),
        (17, "Total profit", "profit", False),
        (18, "Year 1 NOI", "year1_noi", False),
        (19, "Stabilized NOI", "stab_noi", False),
        (20, "Exit value", "exit_value", False),
        (21, "Exit capitalization rate", None, False),
        (22, "Year 1 DSCR", "dscr", True),
    ]
    for r, lab, key, bold in rows:
        put(ws, f"B{r}", lab, fnt=font(NAVY if bold else BLACK, bold, 9), border=BORDER)
        if key:
            col, fmt = scen_cols[key]
            for j, src_row in enumerate([201, 202, 203]):
                out_col = get_column_letter(3 + j)
                link_cell(ws, f"{out_col}{r}", f"={ref(ASSUMP, f'{col}{src_row}')}", fmt)
        else:
            link_cell(ws, "C21", f"={ref(EXIT, 'C12')}", FMT_PCT2)
            link_cell(ws, "D21", f"={ref(ASSUMP, 'G76')}", FMT_PCT2)
            link_cell(ws, "E21", f"={ref(ASSUMP, 'H76')}", FMT_PCT2)
        if r in (11, 12, 13, 14, 15, 22):
            formula_cell(ws, f"F{r}", f"=IFERROR(E{r}-C{r},0)", FMT_PCT if r not in (15, 22) else ('0.00"x"' if r == 22 else FMT_MULT))
        else:
            formula_cell(ws, f"F{r}", f"=IFERROR(E{r}-C{r},0)", FMT_USD)

    section(ws, 24, 2, 10, "SCENARIO DRIVERS")
    drivers = [
        ("Purchase price", "F9", FMT_USD), ("Market rent growth", "F28", FMT_PCT2),
        ("Stabilized vacancy", "F30", FMT_PCT2), ("Expense growth", "F35", FMT_PCT2),
        ("Interest rate", "F56", FMT_PCT2), ("Exit capitalization rate", "F76", FMT_PCT2),
        ("Holding period (years)", "F12", "0"),
    ]
    for i, (lab, cell, fmt) in enumerate(drivers):
        r = 25 + i
        put(ws, f"B{r}", lab, fnt=font(BLACK, False, 9), border=BORDER)
        for j, col in enumerate(["C", "D", "E"]):
            src_col = get_column_letter(5 + j)  # F, G, H
            link_cell(ws, f"{col}{r}", f"={ref(ASSUMP, f'{src_col}{int(cell[1:])}')}", fmt)
        formula_cell(ws, f"F{r}", f"=IFERROR(E{r}-C{r},0)", fmt)

    put(ws, "B34", "Base case reflects the active scenario selector. Upside and downside columns are full-model engine snapshots using the same underwriting logic; the live workbook recalculates the selected scenario. Scenario definitions are on the Assumptions tab.", fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B34:H34")
    ws.row_dimensions[34].height = 30

    section(ws, 36, 2, 10, "SCENARIO NARRATIVE")
    narrative = [
        ("Base", "3.0% rent growth, 5.0% vacancy, 5.75% exit cap, 6.50% interest rate. Renovation of 10 units per month at $12,500 per unit with a $150 monthly premium."),
        ("Upside", "4.0% rent growth, 4.0% vacancy, 5.25% exit cap, 6.00% interest rate. Faster lease-up and loss-to-lease burn-off, with 12 units renovated per month."),
        ("Downside", "2.0% rent growth, 7.0% vacancy, 6.25% exit cap, 7.25% interest rate. Slower lease-up, higher concessions and a longer renovation programme."),
    ]
    for i, (lab, txt) in enumerate(narrative):
        r = 37 + i
        put(ws, f"B{r}", lab, fnt=font(NAVY, True, 9))
        put(ws, f"C{r}", txt, fnt=font(BLACK, False, 8), wrap=True)
        ws.merge_cells(f"C{r}:H{r}")
        ws.row_dimensions[r].height = 28

    set_widths(ws, {"A": 2, "B": 30, "C": 18, "D": 18, "E": 18, "F": 18, "G": 12, "H": 12})
    ws.freeze_panes = "B10"
    ws.print_area = "A1:H40"
    ws.sheet_view.zoomScale = 95


# ---------------------------------------------------------------------------
# Investment Committee memo
# ---------------------------------------------------------------------------

def build_ic(wb) -> None:
    ws = setup_sheet(wb, IC, "002060", gridlines=False, landscape=False)
    title_block(ws, "Investment Committee Analysis",
                "Cedar Ridge Apartments | 250-unit multifamily acquisition | Illustrative IC memo", 10)
    nav_links(ws, 4)

    section(ws, 6, 2, 10, "RECOMMENDATION")
    put(ws, "B7", "Recommendation", fnt=font(NAVY, True, 10))
    put(ws, "D7", "APPROVE, SUBJECT TO CONDITIONS", fnt=font("006100", True, 12), f=fill("C6EFCE"), border=BORDER)
    put(ws, "B8", "Requested action", fnt=font(NAVY, True, 9))
    put(ws, "D8", "Approve acquisition of Cedar Ridge Apartments for $35.0 million and authorize the renovation reserve and senior loan described herein.", fnt=font(BLACK, False, 9), wrap=True)
    ws.merge_cells("D8:J8")
    ws.row_dimensions[8].height = 28

    section(ws, 10, 2, 10, "EXECUTIVE SUMMARY")
    summary = [
        "Cedar Ridge Apartments is a 250-unit, garden-style multifamily community in an illustrative Sun Belt market. The sponsor proposes to acquire the asset for $35.0 million, fund a $5.7 million renovation and capex reserve, and execute a phased interior renovation and lease-up strategy over a 5-year hold.",
        "The base case produces a 16.9% levered IRR, 12.1% unlevered IRR, 2.04x equity multiple and a 1.48x Year 1 DSCR. The LP earns a 13.5% IRR after an 8% preferred return, a full GP catch-up and a tiered 30-45% promote (30% at the base-case return level); the GP generates approximately $5.1 million of promote over the hold.",
        "The business plan is driven by loss-to-lease burn-off, occupancy stabilization at 95%, a $150 per unit monthly renovation premium and modest market rent growth. The exit assumes a 5.75% capitalization rate on forward 12-month NOI, producing a $57.6 million gross value.",
    ]
    for i, t in enumerate(summary):
        r = 11 + i
        put(ws, f"B{r}", t, fnt=font(BLACK, False, 9), wrap=True)
        ws.merge_cells(f"B{r}:J{r}")
        ws.row_dimensions[r].height = 44

    section(ws, 15, 2, 10, "KEY METRICS")
    metrics = [
        ("Purchase price", f"={PP}", FMT_USD),
        ("Total capitalisation", f"={ref(SU, 'C36')}", FMT_USD),
        ("Senior loan / LTV", f'={ref(SU, "C8")}&" / "&TEXT({ref(SU, "C38")},"0.0%")', FMT_TEXT),
        ("Total equity", f"={ref(SU, 'C11')}", FMT_USD),
        ("Levered IRR / equity multiple", f'=TEXT({ref(CF, "C41")},"0.0%")&" / "&TEXT({ref(CF, "C45")},"0.00x")', FMT_TEXT),
        ("LP IRR / GP IRR", f'=TEXT({ref(CF, "C43")},"0.0%")&" / "&TEXT({ref(CF, "C44")},"0.0%")', FMT_TEXT),
        ("Year 1 DSCR / debt yield", f'=TEXT({ref(CF, "C52")},"0.00x")&" / "&TEXT({ref(CF, "C55")},"0.0%")', FMT_TEXT),
        ("Exit value / net proceeds", f'=TEXT({ref(EXIT, "C13")},"$#,##0")&" / "&TEXT({ref(EXIT, "C20")},"$#,##0")', FMT_TEXT),
    ]
    for i, (lab, f, fmt) in enumerate(metrics):
        r = 16 + i
        put(ws, f"B{r}", lab, fnt=font(BLACK, False, 9))
        link_cell(ws, f"D{r}", f, fmt)

    section(ws, 25, 2, 10, "INVESTMENT STRENGTHS")
    strengths = [
        "Basis below illustrative replacement cost with a clear value-add plan.",
        "Embedded loss-to-lease and occupancy upside; in-place rents are below market.",
        "Phased renovation with a 5% contingency and monthly unit tracking.",
        "Conservative leverage and 24 months of interest-only coverage.",
        "Multiple exit paths: sale, refinance or extension; sensitivity shows resilience across a range of caps.",
    ]
    for i, t in enumerate(strengths):
        r = 26 + i
        put(ws, f"B{r}", f"• {t}", fnt=font(BLACK, False, 9))
        ws.merge_cells(f"B{r}:J{r}")

    section(ws, 32, 2, 10, "KEY RISKS & MITIGANTS")
    risk_rows = [
        ("Renovation cost / downtime", "5% contingency, phased schedule, monthly variance review; hold 10% of the reserve until close-out."),
        ("Lease-up and rent growth", "Conservative 5% stabilized vacancy; downside case at 7%; monthly leasing dashboard."),
        ("Interest rates / refinancing", "Fixed-rate assumption for the hold; extension option and refinance analysis on the Debt tab."),
        ("Exit cap rate", "A 25 bp cap expansion reduces levered IRR by roughly 1.5 points; sensitivity tables quantify outcomes."),
        ("Liquidity / timing", "5-year hold with a dynamic exit; no forced-sale assumption; LP consent required for an earlier sale."),
    ]
    for i, (risk, mit) in enumerate(risk_rows):
        r = 33 + i
        put(ws, f"B{r}", risk, fnt=font(NAVY, True, 9))
        put(ws, f"C{r}", mit, fnt=font(BLACK, False, 8), wrap=True)
        ws.merge_cells(f"C{r}:J{r}")
        ws.row_dimensions[r].height = 26

    section(ws, 39, 2, 10, "CONDITIONS PRECEDENT")
    conditions = [
        "Satisfactory physical, environmental and zoning diligence.",
        "Binding senior loan commitment at or below 65% LTV and a 1.25x minimum DSCR.",
        "LP commitment for at least $18.6 million of equity and execution of the partnership agreement.",
        "Approval of the renovation budget and general contractor pricing.",
        "Insurance binders and title policy satisfactory to the lender and LP.",
    ]
    for i, t in enumerate(conditions):
        r = 40 + i
        put(ws, f"B{r}", f"{i+1}. {t}", fnt=font(BLACK, False, 9))
        ws.merge_cells(f"B{r}:J{r}")

    section(ws, 46, 2, 10, "IC VOTE")
    put(ws, "B47", "Investment Committee decision", fnt=font(NAVY, True, 9))
    put(ws, "D47", "APPROVED", fnt=font("006100", True, 11), f=fill("C6EFCE"), border=BORDER)
    put(ws, "B48", "Conditions / notes", fnt=font(NAVY, True, 9))
    put(ws, "D48", "Subject to the conditions precedent above and final LP documentation.", fnt=font(BLACK, False, 9), wrap=True)
    ws.merge_cells("D48:J48")
    put(ws, "B50", "This memo is illustrative and does not constitute investment advice or an offer to sell securities. All figures are based on the assumptions in this workbook.", fnt=font("7F7F7F", False, 8, True), wrap=True)
    ws.merge_cells("B50:J50")
    ws.row_dimensions[50].height = 26

    set_widths(ws, {"A": 2, "B": 34, "C": 16, "D": 18, "E": 16, "F": 16, "G": 16, "H": 16, "I": 16, "J": 16})
    ws.freeze_panes = "B6"
    ws.print_area = "A1:J50"
    ws.sheet_view.zoomScale = 95


# ---------------------------------------------------------------------------
# Model checks
# ---------------------------------------------------------------------------

def build_checks(wb) -> None:
    ws = setup_sheet(wb, CHK, "808080", gridlines=False)
    title_block(ws, "Model Checks",
                "Integrity, reconciliation and error checks | All checks should read PASS", 12)
    nav_links(ws, 4)
    put(ws, "B6", "OVERALL MODEL STATUS", fnt=font(WHITE, True, 10), f=fill(DARK_BLUE))
    ws.merge_cells("B6:C6")
    formula_cell(ws, "D6", '=IF(COUNTIF($E$11:$E$55,"FAIL")=0,"PASS","FAIL")', FMT_TEXT)
    ws["D6"].font = font("006100", True, 14)
    ws["D6"].fill = fill("C6EFCE")
    put(ws, "F6", "Model version 1.0 | Prepared 11/17/2026 | Checks recalculate with the workbook.", fnt=font("595959", False, 8, True))

    section(ws, 8, 2, 12, "RECONCILIATION & INTEGRITY CHECKS")
    hdrs = ["#", "Check", "Result / Difference", "Tolerance", "Status", "Notes"]
    for j, h in enumerate(hdrs):
        col = get_column_letter(2 + j)
        put(ws, f"{col}10", h, fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)

    checks = [
        ("Sources equal uses", f"={ref(SU, 'C12')}-{ref(SU, 'C26')}", 1, "Sources and uses must balance at closing."),
        ("Capex budget ties to control panel", f"={ref(CAPEX, 'D56')}-{ref(CAPEX, 'E22')}", 1, "Summary capital budget equals the control panel total."),
        ("Rent roll has 250 units", f"={ref(RR, 'D8')}-250", 0, "Unit count must equal the property profile."),
        ("Unit mix ties to rent roll", f"={ref(PROP, 'C27')}-{ref(RR, 'D8')}", 0, "Unit mix totals must equal the rent roll."),
        ("Rent roll occupied + vacant = total", f"={ref(RR, 'D6')}+{ref(RR, 'D7')}-{ref(RR, 'D8')}", 0, "Occupancy status must reconcile."),
        ("Revenue monthly Year 1 ties annual", f"=SUM({ref(REV, 'C27')}:{ref(REV, 'N27')})-{ref(REV, 'C53')}", 1, "Monthly EGI sums to the Year 1 annual total."),
        ("Expense monthly Year 1 ties annual", f"=SUM({ref(EXP, 'C40')}:{ref(EXP, 'N40')})-{ref(EXP, 'C60')}", 1, "Monthly expenses sum to the Year 1 annual total."),
        ("NOI monthly Year 1 ties annual", f"=SUM({ref(OP, 'C34')}:{ref(OP, 'N34')})-{ref(OP, 'C46')}", 1, "Monthly NOI sums to the Year 1 annual total."),
        ("Revenue annual EGI ties OP", f"={ref(REV, 'C53')}-{ref(OP, 'C44')}", 1, "Revenue annual summary equals OP annual EGI."),
        ("Expense annual total ties OP", f"={ref(EXP, 'C60')}-{ref(OP, 'C45')}", 1, "Expense annual summary equals OP annual expenses."),
        ("T-12 underwritten NOI ties Year 1", f"={ref(T12, 'G35')}-{ref(OP, 'C46')}", 1, "Underwritten T-12 NOI equals the Year 1 model NOI."),
        ("Debt ending balance rolls forward", f"={ref(DEBT, 'DR28')}-({ref(DEBT, 'DR24')}-{ref(DEBT, 'DR26')})", 1, "Ending balance = beginning balance less principal."),
        ("Interest + principal = debt service", f"=SUM({ref(DEBT, 'C25')}:{ref(DEBT, 'DR25')})+SUM({ref(DEBT, 'C26')}:{ref(DEBT, 'DR26')})-SUM({ref(DEBT, 'C27')}:{ref(DEBT, 'DR27')})", 1, "Monthly debt service components must sum."),
        ("Debt service annual ties cash flow", f"={ref(DEBT, 'C42')}+SUM({ref(CF, 'C14')}:{ref(CF, 'N14')})+SUM({ref(CF, 'C15')}:{ref(CF, 'N15')})", 1, "Year 1 debt service ties the cash flow tab."),
        ("Waterfall distributes all available cash", f"={ref(WF, 'C65')}", 1, "Total distributions less available cash must be zero."),
        ("Waterfall LP + GP = total distributions", f"={ref(WF, 'C63')}-{ref(WF, 'C52')}-{ref(WF, 'C57')}", 1, "LP and GP distributions must sum to total."),
        ("Waterfall LP + GP cash flow = distributions - contributions", f"=SUM({ref(CF, 'C28')}:{ref(CF, 'DR28')})+SUM({ref(CF, 'C31')}:{ref(CF, 'DR31')})-SUM({ref(CF, 'C32')}:{ref(CF, 'DR32')})+{ref(SU, 'C11')}", 1, "Investor cash flows reconcile to equity and distributions."),
        ("Levered CF equals equity + distributions", f"=SUM({ref(CF, 'C22')}:{ref(CF, 'DR22')})+{ref(SU, 'C11')}-SUM({ref(CF, 'C32')}:{ref(CF, 'DR32')})", 1, "Levered cash flow must equal distributions less equity."),
        ("Unlevered CF reconciles to operations + sale", f"=SUM(OFFSET({ref(CF, 'C24')},0,0,1,{EXIT_MONTH}))+{ref(SU, 'C26')}-SUM(OFFSET({ref(CF, 'C13')},0,0,1,{EXIT_MONTH}))-{ref(EXIT, 'C17')}-SUM(OFFSET({ref(CF, 'C21')},0,0,1,{EXIT_MONTH}))", 1, "Unlevered cash flow reconciles to operating cash flow, net sale proceeds and reserve returns."),
        ("Exit net proceeds ties cash flow", f"={ref(EXIT, 'C20')}-SUM({ref(CF, 'C20')}:{ref(CF, 'DR20')})", 1, "Exit proceeds appear once, in the exit month."),
        ("Debt payoff ties debt schedule", f"={ref(EXIT, 'C18')}-INDEX({ref(DEBT, 'C28')}:{ref(DEBT, 'DR28')},1,{EXIT_MONTH})", 1, "Exit payoff equals the loan balance at the exit month."),
        ("Exit value = selected NOI / cap", f'=IF({ref(EXIT, "C16")}="Direct Value",0,{ref(EXIT, "C13")}-{ref(EXIT, "C11")}/{ref(EXIT, "C12")})', 1, "Capitalized value must equal NOI divided by the cap rate."),
        ("Unused capex reserve returned", f"=MAX(0,INDEX({ref(CAPEX, 'C48')}:{ref(CAPEX, 'DR48')},1,{EXIT_MONTH}))-SUM({ref(CF, 'C21')}:{ref(CF, 'DR21')})", 1, "Unused reserve is returned at exit and is not double counted."),
        ("Equity = LP + GP", f"={ref(SU, 'C11')}-{ref(SU, 'C10')}-{ref(SU, 'C9')}", 1, "Equity sources must equal LP plus GP."),
        ("Scenario selector valid", f'=IF(AND({ref(ASSUMP, "C6")}>=1,{ref(ASSUMP, "C6")}<=3),"PASS","FAIL")', 0, "Selector must be 1, 2 or 3."),
    ]

    for i, (lab, f, tol, note) in enumerate(checks):
        r = 11 + i
        put(ws, f"B{r}", i + 1, "0", fnt=font("808080", False, 8), align="center", border=BORDER)
        put(ws, f"C{r}", lab, fnt=font(BLACK, False, 9), border=BORDER)
        if lab == "Scenario selector valid":
            formula_cell(ws, f"D{r}", f, FMT_TEXT)
            put(ws, f"E{r}", 0, "0", fnt=font(BLUE, False, 8), border=BORDER)
            ws[f"E{r}"].fill = fill(YELLOW)
            formula_cell(ws, f"F{r}", f'=IF(D{r}="PASS","PASS","FAIL")', FMT_TEXT)
            put(ws, f"G{r}", note, fnt=font("7F7F7F", False, 7, True), wrap=True)
            continue
        else:
            formula_cell(ws, f"D{r}", f, FMT_USD2)
            put(ws, f"E{r}", tol, "0.00", fnt=font(BLUE, False, 8), border=BORDER)
            ws[f"E{r}"].fill = fill(YELLOW)
            formula_cell(ws, f"F{r}", f'=IF(ABS(D{r})<=E{r},"PASS","FAIL")', FMT_TEXT)
            # status is in F; shift columns? use F as status, G notes
        put(ws, f"G{r}" if lab != "Scenario selector valid" else f"F{r}", note, fnt=font("7F7F7F", False, 7, True), wrap=True)

    # The table above uses F for status; adjust headers to match.
    put(ws, "C10", "Check", fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)
    put(ws, "D10", "Result / Difference", fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)
    put(ws, "E10", "Tolerance", fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)
    put(ws, "F10", "Status", fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)
    put(ws, "G10", "Notes", fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)

    # Overall status should count F status
    ws["D6"] = '=IF(COUNTIF($F$11:$F$55,"FAIL")=0,"PASS","FAIL")'
    ws["D6"].font = font("006100", True, 14)
    ws["D6"].fill = fill("C6EFCE")

    # Error scans
    section(ws, 57, 2, 12, "FORMULA ERROR SCAN")
    put(ws, "C58", "Range scanned", fnt=font(WHITE, True, 8), f=fill(NAVY), border=BORDER)
    put(ws, "D58", "Error cells", fnt=font(WHITE, True, 8), f=fill(NAVY), border=BORDER)
    put(ws, "E58", "Tolerance", fnt=font(WHITE, True, 8), f=fill(NAVY), border=BORDER)
    put(ws, "F58", "Status", fnt=font(WHITE, True, 8), f=fill(NAVY), border=BORDER)
    scans = [
        ("Rent Roll", f"{Q(RR)}!A32:P281"),
        ("Revenue Underwriting", f"{Q(REV)}!C12:DR33"),
        ("Operating Expenses", f"{Q(EXP)}!C28:DR44"),
        ("Monthly Operating Model", f"{Q(OP)}!C8:DR40"),
        ("Debt Schedule", f"{Q(DEBT)}!C21:DR36"),
        ("Exit Valuation", f"{Q(EXIT)}!C7:C26"),
        ("Monthly Cash Flow", f"{Q(CF)}!C10:DR37"),
        ("Equity Waterfall", f"{Q(WF)}!C10:DR38"),
        ("Sources & Uses", f"{Q(SU)}!C8:C42"),
    ]
    for i, (lab, rng) in enumerate(scans):
        r = 59 + i
        put(ws, f"C{r}", lab, fnt=font(BLACK, False, 9), border=BORDER)
        formula_cell(ws, f"D{r}", f"=SUMPRODUCT(--ISERROR({rng}))", "0")
        put(ws, f"E{r}", 0, "0", fnt=font(BLUE, False, 8), border=BORDER)
        ws[f"E{r}"].fill = fill(YELLOW)
        formula_cell(ws, f"F{r}", f'=IF(D{r}<=E{r},"PASS","FAIL")', FMT_TEXT)

    # Conditional formatting on status
    green = PatternFill("solid", fgColor="C6EFCE")
    red = PatternFill("solid", fgColor="FFC7CE")
    for rng, first in [("F11:F55", "F11"), ("F59:F67", "F59")]:
        ws.conditional_formatting.add(rng, FormulaRule(formula=[f'{first}="PASS"'], fill=green, font=Font(color="006100", bold=True)))
        ws.conditional_formatting.add(rng, FormulaRule(formula=[f'{first}="FAIL"'], fill=red, font=Font(color="9C0006", bold=True)))

    put(ws, "C69", "Checks compare independently calculated totals. A FAIL may indicate a broken link, a formula overwritten with a hard-coded value or an assumption outside the supported range. Differences are shown in USD unless noted.", fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("C69:J69")
    ws.row_dimensions[69].height = 30

    set_widths(ws, {"A": 2, "B": 5, "C": 42, "D": 18, "E": 12, "F": 12, "G": 70})
    ws.freeze_panes = "C11"
    ws.print_area = "A1:J69"
    ws.sheet_view.zoomScale = 95
