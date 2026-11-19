"""Sources & uses, debt, exit, monthly cash flow and equity waterfall."""
from __future__ import annotations

import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from core import *


def build_sources_uses(wb) -> None:
    ws = setup_sheet(wb, SU, "7030A0", gridlines=False)
    title_block(ws, "Acquisition Sources & Uses",
                "Sources and uses of funds at closing | All uses funded, including renovation / capex reserve", 11)
    nav_links(ws, 4)

    section(ws, 6, 2, 11, "SOURCES OF FUNDS")
    for col, h in [("B", "Source"), ("C", "Amount"), ("D", "% of Total"), ("E", "Notes")]:
        put(ws, f"{col}7", h, fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)
    put(ws, "B8", "Senior mortgage loan", fnt=font(BLACK, False, 9), border=BORDER)
    link_cell(ws, "C8", f"={ref(DEBT, 'C7')}", FMT_USD)
    formula_cell(ws, "D8", "=IFERROR(C8/$C$12,0)", FMT_PCT)
    put(ws, "E8", "Loan sized at the underwritten LTV of purchase price.", fnt=font("7F7F7F", False, 7, True))
    put(ws, "B9", "GP co-invest equity", fnt=font(BLACK, False, 9), border=BORDER)
    formula_cell(ws, "C9", f"=C11*{GP_CO}", FMT_USD)
    formula_cell(ws, "D9", "=IFERROR(C9/$C$12,0)", FMT_PCT)
    put(ws, "E9", "General partner co-investment at the underwritten percentage.", fnt=font("7F7F7F", False, 7, True))
    put(ws, "B10", "Limited partner equity", fnt=font(BLACK, False, 9), border=BORDER)
    formula_cell(ws, "C10", "=C11-C9", FMT_USD)
    formula_cell(ws, "D10", "=IFERROR(C10/$C$12,0)", FMT_PCT)
    put(ws, "E10", "Balance of equity funded by the limited partner.", fnt=font("7F7F7F", False, 7, True))
    put(ws, "B11", "Total equity", fnt=font(NAVY, True, 9), border=BORDER)
    formula_cell(ws, "C11", "=C26-C8", FMT_USD)
    formula_cell(ws, "D11", "=IFERROR(C11/$C$12,0)", FMT_PCT)
    put(ws, "B12", "TOTAL SOURCES", fnt=font(WHITE, True, 10), f=fill(DARK_BLUE), border=BORDER)
    formula_cell(ws, "C12", "=C8+C11", FMT_USD)
    formula_cell(ws, "D12", "=IFERROR(C12/$C$12,0)", FMT_PCT)

    section(ws, 14, 2, 11, "USES OF FUNDS")
    for col, h in [("B", "Use"), ("C", "Amount"), ("D", "% of Total"), ("E", "Notes")]:
        put(ws, f"{col}15", h, fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)
    uses = [
        (16, "Purchase price", f"={PP}", "Negotiated purchase price."),
        (17, "Acquisition fee", f"={PP}*{ACQ_FEE}", "Sponsor acquisition fee."),
        (18, "Legal expenses", f"={LEGAL}", "Transaction legal costs."),
        (19, "Due diligence", f"={DD}", "Physical, environmental and market diligence."),
        (20, "Financing fees", f"=C8*{FIN_FEE}", "Lender fees and costs at closing."),
        (21, "Closing costs", f"={PP}*{CLOSING}", "Title, recording, transfer and miscellaneous closing costs."),
        (22, "Renovation & capex reserve", f"={ref(CAPEX, 'E22')}", "Funded at closing; drawn over the renovation period."),
        (23, "Working capital", f"={WORKING}", "Day-one working capital."),
        (24, "Initial operating reserves", f"={OP_RES}", "Interest and operating reserves."),
        (25, "Other transaction expenses", f"={OTHER_TX}", "Illustrative other closing costs."),
    ]
    for r, lab, f, note in uses:
        put(ws, f"B{r}", lab, fnt=font(BLACK, False, 9), border=BORDER)
        link_cell(ws, f"C{r}", f, FMT_USD)
        formula_cell(ws, f"D{r}", f"=IFERROR(C{r}/$C$26,0)", FMT_PCT)
        put(ws, f"E{r}", note, fnt=font("7F7F7F", False, 7, True))
    put(ws, "B26", "TOTAL USES", fnt=font(WHITE, True, 10), f=fill(DARK_BLUE), border=BORDER)
    formula_cell(ws, "C26", "=SUM(C16:C25)", FMT_USD)
    formula_cell(ws, "D26", "=IFERROR(C26/$C$26,0)", FMT_PCT)

    put(ws, "B28", "Sources less uses", fnt=font(NAVY, True, 9))
    formula_cell(ws, "C28", "=C12-C26", FMT_USD)
    put(ws, "B29", "Balance check", fnt=font(NAVY, True, 9))
    formula_cell(ws, "C29", '=IF(ABS(C28)<1,"PASS","FAIL")', FMT_TEXT)

    section(ws, 31, 2, 11, "CAPITALIZATION METRICS")
    metrics = [
        (32, "Purchase price per unit", f"=IFERROR(C16/{ref(PROP, 'D13')},0)", FMT_USD),
        (33, "Purchase price per SF", f"=IFERROR(C16/{ref(PROP, 'D29')},0)", FMT_USD2),
        (34, "Loan per unit", f"=IFERROR(C8/{ref(PROP, 'D13')},0)", FMT_USD),
        (35, "Equity per unit", f"=IFERROR(C11/{ref(PROP, 'D13')},0)", FMT_USD),
        (36, "Total capitalization", "=C26", FMT_USD),
        (37, "Loan-to-cost", f"=IFERROR(C8/C26,0)", FMT_PCT),
        (38, "Loan-to-value", f"=IFERROR(C8/C16,0)", FMT_PCT),
        (39, "Equity as % of total capitalization", f"=IFERROR(C11/C26,0)", FMT_PCT),
        (40, "Acquisition costs (excl. capex reserve)", "=SUM(C17:C21)+C25", FMT_USD),
        (41, "Acquisition costs as % of purchase price", f"=IFERROR(C40/C16,0)", FMT_PCT),
        (42, "Capex reserve as % of purchase price", f"=IFERROR(C22/C16,0)", FMT_PCT),
    ]
    for r, lab, f, fmt in metrics:
        put(ws, f"B{r}", lab, fnt=font(BLACK, False, 9))
        formula_cell(ws, f"C{r}", f, fmt)

    put(ws, "B44", "Use of proceeds is illustrative. The renovation / capex reserve is funded at closing and drawn monthly; unused balances are returned at exit and are not counted twice.", fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B44:K44")
    ws.row_dimensions[44].height = 26

    set_widths(ws, {"A": 2, "B": 42, "C": 15, "D": 11, "E": 56})
    ws.freeze_panes = "B8"
    ws.print_area = "A1:K44"
    ws.sheet_view.zoomScale = 95


def build_debt(wb) -> None:
    ws = setup_sheet(wb, DEBT, "C00000", gridlines=True)
    title_block(ws, "Debt Financing & Loan Amortization",
                "Senior mortgage | Fixed or floating rate, interest-only period, scheduled amortization, Actual/365 interest", 14)
    nav_links(ws, 4)

    section(ws, 6, 2, 11, "LOAN TERMS & SUMMARY")
    terms = [
        (7, "Loan amount", f"={LTV}*{PP}", FMT_USD),
        (8, "Annual interest rate", f'=IF({RATE_TYPE}="Fixed",{INT_RATE},MIN(IF({RATE_CAP}=0,1,{RATE_CAP}),MAX({RATE_FLOOR},{INDEX_RATE}+{SPREAD})))', FMT_PCT2),
        (9, "Interest-only period (months)", f"={IO}", "0"),
        (10, "Amortization period (years)", f"={AMORT}", "0"),
        (11, "Loan term (years)", f"={TERM}", "0"),
        (12, "Origination fee", f"=C7*{ORIG}", FMT_USD),
        (13, "Loan-to-value", f"=IFERROR(C7/{PP},0)", FMT_PCT),
        (14, "Loan-to-cost", f"=IFERROR(C7/{ref(SU, 'C26')},0)", FMT_PCT),
        (15, "Loan per unit", f"=IFERROR(C7/{ref(PROP, 'D13')},0)", FMT_USD),
    ]
    for r, lab, f, fmt in terms:
        put(ws, f"B{r}", lab, fnt=font(BLACK, False, 9))
        formula_cell(ws, f"C{r}", f, fmt)
    put(ws, "B16", "Rate type", fnt=font(BLACK, False, 9))
    link_cell(ws, "C16", f"={RATE_TYPE}", FMT_TEXT)
    put(ws, "B17", "Amortizing payment (calculated)", fnt=font(BLACK, False, 9))
    formula_cell(ws, "C17", '=IFERROR(PMT(C8/12,C10*12-C9,-C7),0)', FMT_USD)
    put(ws, "B18", "Loan constant (annual debt service / loan)", fnt=font(BLACK, False, 9))
    formula_cell(ws, "C18", "=IFERROR(C17*12/C7,0)", FMT_PCT)

    section(ws, 20, 2, 122, "MONTHLY LOAN AMORTIZATION SCHEDULE")
    month_headers(ws, 21, 22)
    ws.freeze_panes = "C23"
    labels = [
        (24, "Beginning balance", FMT_USD),
        (25, "Interest expense (Actual/365)", FMT_USD),
        (26, "Scheduled principal amortization", FMT_USD),
        (27, "Total debt service", FMT_USD),
        (28, "Ending balance", FMT_USD),
        (29, "Annual interest rate", FMT_PCT2),
        (30, "Period type", FMT_TEXT),
        (31, "DSCR (NOI / debt service)", '0.00"x"'),
        (32, "Debt yield (annualized NOI / loan)", FMT_PCT),
        (33, "LTV (ending balance / purchase price)", FMT_PCT),
        (34, "Cumulative principal", FMT_USD),
        (35, "Cumulative interest", FMT_USD),
        (36, "Scheduled payment", FMT_USD),
    ]
    for r, lab, fmt in labels:
        fnt_ = font(NAVY, True, 9) if r in (28, 31) else font(BLACK, False, 9)
        put(ws, f"B{r}", lab, fnt=fnt_, border=BORDER)

    for i, col in enumerate(MONTH_COLS):
        if i == 0:
            formula_cell(ws, f"{col}24", "=$C$7", FMT_USD)
        else:
            prev = MONTH_COLS[i - 1]
            formula_cell(ws, f"{col}24", f"={prev}28", FMT_USD)
        formula_cell(ws, f"{col}29", "=$C$8", FMT_PCT2)
        formula_cell(ws, f"{col}25", f"={col}24*{col}29*DAY(EOMONTH({col}21,0))/365", FMT_USD)
        formula_cell(ws, f"{col}26", f"=IF({col}22<=$C$9,0,IF({col}22>=$C$10*12,{col}24,MAX(0,MIN({col}24,$C$17-{col}25))))", FMT_USD)
        formula_cell(ws, f"{col}27", f"={col}25+{col}26", FMT_USD)
        formula_cell(ws, f"{col}28", f"={col}24-{col}26", FMT_USD)
        formula_cell(ws, f"{col}30", f'=IF({col}22<=$C$9,"Interest Only","Amortizing")', FMT_TEXT)
        formula_cell(ws, f"{col}31", f'=IF({col}27=0,"",{ref(OP, col + "34", False)}/{col}27)', '0.00"x"')
        formula_cell(ws, f"{col}32", f'=IFERROR({ref(OP, col + "34", False)}*12/$C$7,0)', FMT_PCT)
        formula_cell(ws, f"{col}33", f"=IFERROR({col}28/{PP},0)", FMT_PCT)
        if i == 0:
            formula_cell(ws, f"{col}34", f"={col}26", FMT_USD)
            formula_cell(ws, f"{col}35", f"={col}25", FMT_USD)
        else:
            prev = MONTH_COLS[i - 1]
            formula_cell(ws, f"{col}34", f"={prev}34+{col}26", FMT_USD)
            formula_cell(ws, f"{col}35", f"={prev}35+{col}25", FMT_USD)
        formula_cell(ws, f"{col}36", f"={col}25+{col}26", FMT_USD)

    put(ws, "DS22", "Total", fnt=font(WHITE, True, 8), f=fill(NAVY))
    for r in (25, 26, 27, 34, 35, 36):
        formula_cell(ws, f"DS{r}", f"=SUM(C{r}:DR{r})", FMT_USD)
    formula_cell(ws, "DS31", "=IFERROR(AVERAGE(C31:DR31),0)", '0.00"x"')

    section(ws, 38, 2, 13, "ANNUAL DEBT SUMMARY")
    put(ws, "B39", "Investment Year", fnt=font(WHITE, True, 8), f=fill(NAVY), border=BORDER)
    for i in range(10):
        col = get_column_letter(3 + i)
        put(ws, f"{col}39", i + 1, "0", fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)
    annual = [(40, "Interest expense", 25), (41, "Principal amortization", 26),
              (42, "Total debt service", 27), (43, "Ending balance", 28)]
    for r, lab, src in annual:
        put(ws, f"B{r}", lab, fnt=font(NAVY if r == 42 else BLACK, r == 42, 9), border=BORDER)
        for i in range(10):
            col = get_column_letter(3 + i)
            if src == 28:
                formula_cell(ws, f"{col}{r}", f"=INDEX($C$28:$DR$28,1,MIN(120,{col}$39*12))", FMT_USD)
            else:
                formula_cell(ws, f"{col}{r}", f"=SUMIFS($C${src}:$DR${src},$C$22:$DR$22,\">=\"&({col}$39-1)*12+1,$C$22:$DR$22,\"<=\"&{col}$39*12)", FMT_USD)
    put(ws, "B44", "Average DSCR", fnt=font(BLACK, False, 9), border=BORDER)
    put(ws, "B45", "Debt yield", fnt=font(BLACK, False, 9), border=BORDER)
    for i in range(10):
        col = get_column_letter(3 + i)
        formula_cell(ws, f"{col}44", f"=IFERROR({ref(OP, col + '46', False)}/{col}42,0)", '0.00"x"')
        formula_cell(ws, f"{col}45", f"=IFERROR({ref(OP, col + '46', False)}/$C$7,0)", FMT_PCT)

    set_widths(ws, {"A": 2, "B": 38})
    outline_monthly(ws, 21)
    for col in "CDEFGHIJKLM":
        ws.column_dimensions[col].width = 12
    ws.column_dimensions["DS"].width = 13
    ws.print_area = "A1:DS45"
    ws.print_title_rows = "20:22"
    ws.sheet_view.zoomScale = 80


def build_exit(wb) -> None:
    ws = setup_sheet(wb, EXIT, "BF8F00", gridlines=False)
    title_block(ws, "Exit Valuation",
                "Exit timing, NOI convention, capitalization rate, selling costs and net sale proceeds", 11)
    nav_links(ws, 4)
    section(ws, 6, 2, 11, "EXIT VALUATION SUMMARY")
    items = [
        (7, "Exit month", f"={EXIT_MONTH}", "0", False),
        (8, "Exit date", f"={EXIT_DATE}", FMT_DATE, False),
        (9, "Forward 12-month NOI", "=IF($C$7+12<=120,SUM(OFFSET(" + ref(OP, 'C34') + ",0,$C$7,1,12)),SUM(OFFSET(" + ref(OP, 'C34') + ",0,$C$7-12,1,12))*(1+" + RENT_GROWTH + "))", FMT_USD, True),
        (10, "Trailing 12-month NOI", "=SUM(OFFSET(" + ref(OP, 'C34') + ",0,$C$7-12,1,12))", FMT_USD, True),
        (11, "Selected exit NOI", '=IF($C$16="Trailing 12-Month",C10,C9)', FMT_USD, True),
        (12, "Exit capitalization rate", f"={EXIT_CAP}", FMT_PCT2, False),
        (13, "Gross exit value", "=IFERROR(C11/C12,0)", FMT_USD, True),
        (14, "Selling costs", f"=C13*{SELL}", FMT_USD, True),
        (15, "Disposition legal expenses", f"={DISP_LEGAL}", FMT_USD, False),
        (16, "Exit NOI convention", f"={EXIT_CONV}", FMT_TEXT, False),
        (17, "Net sale proceeds before debt", "=C13-C14-C15", FMT_USD, True),
        (18, "Loan payoff", f"=INDEX({ref(DEBT, 'C28')}:{ref(DEBT, 'DR28')},1,$C$7)", FMT_USD, True),
        (19, "Prepayment penalty / payoff cost", f"=C18*({PREPAY}+{EXIT_FIN})", FMT_USD, True),
        (20, "Net sale proceeds after debt", "=C17-C18-C19", FMT_USD, True),
        (21, "Implied exit capitalization rate", "=IFERROR(C11/C13,0)", FMT_PCT2, True),
        (22, "Exit value per unit", f"=IFERROR(C13/{ref(PROP, 'D13')},0)", FMT_USD, True),
        (23, "Exit value per SF", f"=IFERROR(C13/{ref(PROP, 'D29')},0)", FMT_USD2, True),
        (24, "Exit NOI vs. Year 1 NOI", f"=IFERROR(C11/{ref(OP, 'C46')}-1,0)", FMT_PCT, True),
        (25, "Exit value vs. total uses", f"=IFERROR(C13/{ref(SU, 'C26')}-1,0)", FMT_PCT, True),
        (26, "Net gain on sale after debt", "=C20", FMT_USD, True),
    ]
    for r, lab, f, fmt, is_formula in items:
        put(ws, f"B{r}", lab, fnt=font(NAVY, True, 9) if r in (13, 17, 20) else font(BLACK, False, 9), border=BORDER)
        if is_formula:
            link_cell(ws, f"C{r}", f, fmt)
        else:
            link_cell(ws, f"C{r}", f, fmt)
    # Convention is a text input duplicated from assumptions
    ws["C16"].font = font(DARK_GREEN)

    put(ws, "B28", "Exit assumptions are controlled on the Assumptions tab. The engine runs 120 months; the exit month is driven by the hold period and can be changed dynamically.", fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B28:K28")
    ws.row_dimensions[28].height = 26

    section(ws, 30, 2, 11, "EXIT CAP RATE SENSITIVITY (FORMULA-DRIVEN)")
    for col, h in [("B", "Exit Cap Rate"), ("C", "Gross Value"), ("D", "Selling Costs"),
                   ("E", "Legal"), ("F", "Net Before Debt"), ("G", "Loan Payoff"),
                   ("H", "Net After Debt"), ("I", "Gain / (Loss) vs. Basis")]:
        put(ws, f"{col}31", h, fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER, wrap=True)
    caps = [0.0500, 0.0525, 0.0550, 0.0575, 0.0600, 0.0625, 0.0650]
    for i, cap in enumerate(caps):
        r = 32 + i
        input_cell(ws, f"B{r}", cap, FMT_PCT2)
        formula_cell(ws, f"C{r}", f"=IFERROR($C$11/B{r},0)", FMT_USD)
        formula_cell(ws, f"D{r}", f"=C{r}*{SELL}", FMT_USD)
        formula_cell(ws, f"E{r}", f"={DISP_LEGAL}", FMT_USD)
        formula_cell(ws, f"F{r}", f"=C{r}-D{r}-E{r}", FMT_USD)
        formula_cell(ws, f"G{r}", "=$C$18", FMT_USD)
        formula_cell(ws, f"H{r}", f"=F{r}-G{r}", FMT_USD)
        formula_cell(ws, f"I{r}", f"=H{r}-$C$20", FMT_USD)
    put(ws, "B40", "Central case", fnt=font(NAVY, True, 9))
    put(ws, "C40", "=C13", FMT_USD)
    put(ws, "B41", "Sensitivity values are formula-driven from the selected exit NOI; no outputs are hard-coded.", fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B41:I41")

    set_widths(ws, {"A": 2, "B": 41, "C": 15, "D": 14, "E": 11, "F": 15, "G": 13, "H": 15, "I": 18})
    ws.freeze_panes = "B7"
    ws.print_area = "A1:I41"
    ws.sheet_view.zoomScale = 95


def build_cash_flow(wb) -> None:
    ws = setup_sheet(wb, CF, "00B050", gridlines=True)
    title_block(ws, "Monthly Cash Flow & Returns",
                "Unlevered and levered cash flow | Operating cash flow, debt service, exit proceeds, LP / GP cash flow and IRR", 14)
    nav_links(ws, 4)
    section(ws, 5, 2, 122, "MONTHLY CASH FLOW")
    month_headers(ws, 6, 7)
    ws.freeze_panes = "C8"

    lines = [
        (10, "Net operating income", FMT_USD, True),
        (11, "Less: replacement reserves", FMT_USD, False),
        (12, "Less: leasing costs", FMT_USD, False),
        (13, "Cash flow before debt service", FMT_USD, True),
        (14, "Less: interest expense", FMT_USD, False),
        (15, "Less: scheduled principal", FMT_USD, False),
        (16, "Cash flow after debt service", FMT_USD, True),
        (17, "Net sale proceeds before debt", FMT_USD, False),
        (18, "Less: loan payoff", FMT_USD, False),
        (19, "Less: prepayment penalty", FMT_USD, False),
        (20, "Net exit proceeds after debt", FMT_USD, True),
        (21, "Plus: return of unused renovation reserve", FMT_USD, False),
        (22, "LEVERED CASH FLOW", FMT_USD, True),
        (23, "Cumulative levered cash flow", FMT_USD, False),
        (24, "UNLEVERED CASH FLOW", FMT_USD, True),
        (25, "Cumulative unlevered cash flow", FMT_USD, False),
        (26, "LP equity contribution", FMT_USD, False),
        (27, "LP distributions", FMT_USD, False),
        (28, "LP CASH FLOW", FMT_USD, True),
        (29, "GP equity contribution", FMT_USD, False),
        (30, "GP distributions", FMT_USD, False),
        (31, "GP CASH FLOW", FMT_USD, True),
        (32, "Total distributions (LP + GP)", FMT_USD, False),
        (33, "DSCR", '0.00"x"', False),
        (34, "Debt yield (annualized)", FMT_PCT, False),
        (35, "Cash-on-cash (annualized)", FMT_PCT, False),
        (36, "Levered cash flow per unit (annualized)", FMT_USD, False),
        (37, "Total cash available for waterfall", FMT_USD, False),
    ]
    for r, lab, fmt, bold in lines:
        put(ws, f"B{r}", lab, fnt=font(NAVY if bold else BLACK, bold, 9),
            f=(fill(LIGHT_BLUE) if r in (22, 24) else None), border=BORDER)
    put(ws, "B38", "Returns and credit metrics are summarized below. Cash flow is monthly; taxes and fees are not modelled at the investor level.", fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B38:P38")

    for i, col in enumerate(MONTH_COLS):
        formula_cell(ws, f"{col}10", f"={ref(OP, col + '34', False)}", FMT_USD)
        formula_cell(ws, f"{col}11", f"=-{ref(OP, col + '37', False)}", FMT_USD)
        formula_cell(ws, f"{col}12", f"=-{ref(OP, col + '38', False)}", FMT_USD)
        formula_cell(ws, f"{col}13", f"={col}10+{col}11+{col}12", FMT_USD)
        formula_cell(ws, f"{col}14", f"=-{ref(DEBT, col + '25', False)}", FMT_USD)
        formula_cell(ws, f"{col}15", f"=-{ref(DEBT, col + '26', False)}", FMT_USD)
        formula_cell(ws, f"{col}16", f"=IF({col}7<={EXIT_MONTH},{col}13+{col}14+{col}15,0)", FMT_USD)
        formula_cell(ws, f"{col}17", f"=IF({col}7={EXIT_MONTH},{ref(EXIT, 'C17')},0)", FMT_USD)
        formula_cell(ws, f"{col}18", f"=IF({col}7={EXIT_MONTH},{ref(EXIT, 'C18')},0)", FMT_USD)
        formula_cell(ws, f"{col}19", f"=IF({col}7={EXIT_MONTH},{ref(EXIT, 'C19')},0)", FMT_USD)
        formula_cell(ws, f"{col}20", f"={col}17-{col}18-{col}19", FMT_USD)
        formula_cell(ws, f"{col}21", f"=IF({col}7={EXIT_MONTH},MAX(0,INDEX({ref(CAPEX, 'C48')}:{ref(CAPEX, 'DR48')},1,{EXIT_MONTH})),0)", FMT_USD)
        formula_cell(ws, f"{col}22", f"=IF({col}7=1,-{ref(SU, 'C11')},0)+{col}16+{col}20+{col}21", FMT_USD)
        if i == 0:
            formula_cell(ws, f"{col}23", f"={col}22", FMT_USD)
        else:
            prev = MONTH_COLS[i - 1]
            formula_cell(ws, f"{col}23", f"={prev}23+{col}22", FMT_USD)
        formula_cell(ws, f"{col}24", f"=IF({col}7=1,-{ref(SU, 'C26')},0)+IF({col}7<={EXIT_MONTH},{col}13,0)+{col}17+{col}21", FMT_USD)
        if i == 0:
            formula_cell(ws, f"{col}25", f"={col}24", FMT_USD)
        else:
            prev = MONTH_COLS[i - 1]
            formula_cell(ws, f"{col}25", f"={prev}25+{col}24", FMT_USD)
        formula_cell(ws, f"{col}26", f"=IF({col}7=1,{ref(SU, 'C10')},0)", FMT_USD)
        formula_cell(ws, f"{col}27", f"={ref(WF, col + '23', False)}", FMT_USD)
        formula_cell(ws, f"{col}28", f"=-{col}26+{col}27", FMT_USD)
        formula_cell(ws, f"{col}29", f"=IF({col}7=1,{ref(SU, 'C9')},0)", FMT_USD)
        formula_cell(ws, f"{col}30", f"={ref(WF, col + '24', False)}", FMT_USD)
        formula_cell(ws, f"{col}31", f"=-{col}29+{col}30", FMT_USD)
        formula_cell(ws, f"{col}32", f"={col}27+{col}30", FMT_USD)
        formula_cell(ws, f"{col}33", f'=IF(OR({col}7>{EXIT_MONTH},{ref(DEBT, col + "27", False)}=0),"",{col}10/{ref(DEBT, col + "27", False)})', '0.00"x"')
        formula_cell(ws, f"{col}34", f"={col}10*12/{ref(DEBT, 'C7')}", FMT_PCT)
        formula_cell(ws, f"{col}35", f"=IFERROR({col}16*12/{ref(SU, 'C11')},0)", FMT_PCT)
        formula_cell(ws, f"{col}36", f"=IFERROR({col}16*12/{ref(RR, 'D8')},0)", FMT_USD)
        formula_cell(ws, f"{col}37", f"={col}16+{col}20+{col}21", FMT_USD)

    put(ws, "DS7", "Total", fnt=font(WHITE, True, 8), f=fill(NAVY))
    for r in [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 26, 27, 28, 29, 30, 31, 32, 37]:
        formula_cell(ws, f"DS{r}", f"=SUM(C{r}:DR{r})", FMT_USD)

    section(ws, 40, 2, 13, "RETURNS SUMMARY")
    rets = [
        (41, "Levered IRR (XIRR)", f"=XIRR(OFFSET($C$22,0,0,1,{EXIT_MONTH}),OFFSET($C$6,0,0,1,{EXIT_MONTH}))", FMT_IRR),
        (42, "Unlevered IRR (XIRR)", f"=XIRR(OFFSET($C$24,0,0,1,{EXIT_MONTH}),OFFSET($C$6,0,0,1,{EXIT_MONTH}))", FMT_IRR),
        (43, "LP IRR (XIRR)", f"=XIRR(OFFSET($C$28,0,0,1,{EXIT_MONTH}),OFFSET($C$6,0,0,1,{EXIT_MONTH}))", FMT_IRR),
        (44, "GP IRR (XIRR)", f"=XIRR(OFFSET($C$31,0,0,1,{EXIT_MONTH}),OFFSET($C$6,0,0,1,{EXIT_MONTH}))", FMT_IRR),
        (45, "Equity multiple", '=-SUMIF($C$22:$DR$22,">0")/SUMIF($C$22:$DR$22,"<0")', FMT_MULT),
        (46, "Total equity invested", '=-SUMIF($C$22:$DR$22,"<0")', FMT_USD),
        (47, "Total distributions", '=SUMIF($C$22:$DR$22,">0")', FMT_USD),
        (48, "Total profit", "=C47-C46", FMT_USD),
        (49, "Year 1 cash-on-cash", f"=IFERROR(SUMIFS($C$16:$DR$16,$C$7:$DR$7,\"<=\"&12)/{ref(SU, 'C11')},0)", FMT_PCT),
        (50, "Stabilized cash-on-cash (Year 2)", f"=IFERROR(SUMIFS($C$16:$DR$16,$C$7:$DR$7,\">\"&12,$C$7:$DR$7,\"<=\"&24)/{ref(SU, 'C11')},0)", FMT_PCT),
        (51, "Average cash-on-cash (Years 2-5)", f"=IFERROR(SUMIFS($C$16:$DR$16,$C$7:$DR$7,\">\"&12,$C$7:$DR$7,\"<=\"&{EXIT_MONTH})/{ref(SU, 'C11')}/(({EXIT_MONTH}-12)/12),0)", FMT_PCT),
        (52, "Year 1 DSCR", "=IFERROR(SUMIFS($C$10:$DR$10,$C$7:$DR$7,\"<=\"&12)/-(SUMIFS($C$14:$DR$14,$C$7:$DR$7,\"<=\"&12)+SUMIFS($C$15:$DR$15,$C$7:$DR$7,\"<=\"&12)),0)", '0.00"x"'),
        (53, "Minimum monthly DSCR", '=IFERROR(MIN($C$33:$DR$33),0)', '0.00"x"'),
        (54, "Average monthly DSCR", '=IFERROR(AVERAGE($C$33:$DR$33),0)', '0.00"x"'),
        (55, "Debt yield (Year 1 NOI / loan)", f"=IFERROR(SUMIFS($C$10:$DR$10,$C$7:$DR$7,\"<=\"&12)/{ref(DEBT, 'C7')},0)", FMT_PCT),
        (56, "Peak loan balance", f"={ref(DEBT, 'C7')}", FMT_USD),
        (57, "Net exit proceeds after debt", f"={ref(EXIT, 'C20')}", FMT_USD),
        (58, "Total profit incl. operating cash flow", "=C48", FMT_USD),
    ]
    for r, lab, f, fmt in rets:
        put(ws, f"B{r}", lab, fnt=font(NAVY, True, 9) if r in (41, 42, 43, 44) else font(BLACK, False, 9), border=BORDER)
        formula_cell(ws, f"C{r}", f, fmt)

    put(ws, "B60", "IRR uses actual monthly dates and the XIRR convention (Actual/365). Initial equity is invested in month 1 alongside the first operating cash flow. No income taxes, promote catch-up timing differences or investor-level fees are modelled.", fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B60:P60")
    ws.row_dimensions[60].height = 30

    set_widths(ws, {"A": 2, "B": 43})
    outline_monthly(ws, 6)
    for col in "CDEFGHIJKLM":
        ws.column_dimensions[col].width = 12
    ws.column_dimensions["DS"].width = 13
    ws.print_area = "A1:DS60"
    ws.print_title_rows = "5:7"
    ws.sheet_view.zoomScale = 80


def build_waterfall(wb) -> None:
    ws = setup_sheet(wb, WF, "FFC000", gridlines=True)
    title_block(ws, "Equity Waterfall",
                "Monthly LP / GP distribution waterfall | Return of capital, 8% preferred return, GP catch-up and promote tiers", 14)
    nav_links(ws, 4)
    section(ws, 5, 2, 122, "MONTHLY DISTRIBUTION WATERFALL")
    month_headers(ws, 6, 7)
    ws.freeze_panes = "C8"

    lines = [
        (10, "Cash available for distribution", FMT_USD, True),
        (11, "LP beginning unreturned capital", FMT_USD, False),
        (12, "GP beginning unreturned capital", FMT_USD, False),
        (13, "LP contribution", FMT_USD, False),
        (14, "GP contribution", FMT_USD, False),
        (15, "LP return of capital", FMT_USD, False),
        (16, "GP return of capital", FMT_USD, False),
        (17, "LP preferred beginning (unpaid)", FMT_USD, False),
        (18, "LP preferred accrual", FMT_USD, False),
        (19, "LP preferred paid", FMT_USD, False),
        (20, "GP catch-up", FMT_USD, False),
        (21, "Residual to LP", FMT_USD, False),
        (22, "Residual to GP", FMT_USD, False),
        (23, "LP distribution", FMT_USD, True),
        (24, "GP distribution", FMT_USD, True),
        (25, "Total distributions", FMT_USD, True),
        (26, "Distribution check (available less distributed)", FMT_USD, False),
        (27, "LP ending unreturned capital", FMT_USD, False),
        (28, "GP ending unreturned capital", FMT_USD, False),
        (29, "LP ending preferred (unpaid)", FMT_USD, False),
        (30, "LP cumulative distributions", FMT_USD, False),
        (31, "GP cumulative distributions", FMT_USD, False),
        (32, "LP hurdle-test multiple (cumulative ROC + pref / equity)", FMT_MULT, False),
        (33, "GP promote tier share", FMT_PCT, False),
        (34, "LP cash flow", FMT_USD, True),
        (35, "GP cash flow", FMT_USD, True),
        (36, "GP cumulative catch-up", FMT_USD, False),
        (37, "LP cumulative preferred paid", FMT_USD, False),
        (38, "GP cumulative promote (catch-up + residual)", FMT_USD, False),
    ]
    for r, lab, fmt, bold in lines:
        put(ws, f"B{r}", lab, fnt=font(NAVY if bold else BLACK, bold, 9),
            f=(fill(LIGHT_BLUE) if r in (10, 23, 24) else None), border=BORDER)

    for i, col in enumerate(MONTH_COLS):
        formula_cell(ws, f"{col}10", f"={ref(CF, col + '16', False)}+{ref(CF, col + '20', False)}+{ref(CF, col + '21', False)}", FMT_USD)
        if i == 0:
            formula_cell(ws, f"{col}11", "=0", FMT_USD)
            formula_cell(ws, f"{col}12", "=0", FMT_USD)
            formula_cell(ws, f"{col}13", f"={ref(SU, 'C10')}", FMT_USD)
            formula_cell(ws, f"{col}14", f"={ref(SU, 'C9')}", FMT_USD)
            formula_cell(ws, f"{col}17", "=0", FMT_USD)
            formula_cell(ws, f"{col}36", f"={col}20", FMT_USD)
            formula_cell(ws, f"{col}37", f"={col}19", FMT_USD)
            formula_cell(ws, f"{col}38", f"={col}20+{col}22", FMT_USD)
        else:
            prev = MONTH_COLS[i - 1]
            formula_cell(ws, f"{col}11", f"={prev}27", FMT_USD)
            formula_cell(ws, f"{col}12", f"={prev}28", FMT_USD)
            formula_cell(ws, f"{col}13", "=0", FMT_USD)
            formula_cell(ws, f"{col}14", "=0", FMT_USD)
            formula_cell(ws, f"{col}17", f"={prev}29", FMT_USD)
            formula_cell(ws, f"{col}36", f"={prev}36+{col}20", FMT_USD)
            formula_cell(ws, f"{col}37", f"={prev}37+{col}19", FMT_USD)
            formula_cell(ws, f"{col}38", f"={prev}38+{col}20+{col}22", FMT_USD)
        formula_cell(ws, f"{col}15", f"=MIN({col}10,{col}11+{col}13)", FMT_USD)
        formula_cell(ws, f"{col}16", f"=MIN({col}10-{col}15,{col}12+{col}14)", FMT_USD)
        formula_cell(ws, f"{col}18", f"=({col}11+{col}13+IF({COMPOUND}=\"Compounded\",{col}17,0))*{PREF}/12", FMT_USD)
        formula_cell(ws, f"{col}19", f"=MIN({col}10-{col}15-{col}16,{col}17+{col}18)", FMT_USD)
        if i == 0:
            formula_cell(ws, f"{col}20", f"=MIN({col}10-{col}15-{col}16-{col}19,MAX(0,{col}19*($D$46)*{CATCHUP}))", FMT_USD)
        else:
            prev = MONTH_COLS[i - 1]
            formula_cell(ws, f"{col}20", f"=MIN({col}10-{col}15-{col}16-{col}19,MAX(0,({prev}37+{col}19)*($D$46)*{CATCHUP}-{prev}36))", FMT_USD)
        if i == 0:
            formula_cell(ws, f"{col}32", f"=IFERROR(({col}15+{col}19)/{ref(SU, 'C10')},0)", FMT_MULT)
        else:
            prev = MONTH_COLS[i - 1]
            formula_cell(ws, f"{col}32", f"=IFERROR(({prev}30+{col}15+{col}19)/{ref(SU, 'C10')},0)", FMT_MULT)
        formula_cell(ws, f"{col}33", f"=IF({col}32<$D$41,{GP_T1},IF({col}32<$D$42,{GP_T2},IF({col}32<$D$43,{GP_T3},{GP_T4})))", FMT_PCT)
        formula_cell(ws, f"{col}21", f"=({col}10-{col}15-{col}16-{col}19-{col}20)*(1-{col}33)", FMT_USD)
        formula_cell(ws, f"{col}22", f"=({col}10-{col}15-{col}16-{col}19-{col}20)*{col}33", FMT_USD)
        formula_cell(ws, f"{col}23", f"={col}15+{col}19+{col}21", FMT_USD)
        formula_cell(ws, f"{col}24", f"={col}16+{col}20+{col}22", FMT_USD)
        formula_cell(ws, f"{col}25", f"={col}23+{col}24", FMT_USD)
        formula_cell(ws, f"{col}26", f"={col}10-{col}25", FMT_USD)
        formula_cell(ws, f"{col}27", f"={col}11+{col}13-{col}15", FMT_USD)
        formula_cell(ws, f"{col}28", f"={col}12+{col}14-{col}16", FMT_USD)
        formula_cell(ws, f"{col}29", f"={col}17+{col}18-{col}19", FMT_USD)
        if i == 0:
            formula_cell(ws, f"{col}30", f"={col}23", FMT_USD)
            formula_cell(ws, f"{col}31", f"={col}24", FMT_USD)
        else:
            prev = MONTH_COLS[i - 1]
            formula_cell(ws, f"{col}30", f"={prev}30+{col}23", FMT_USD)
            formula_cell(ws, f"{col}31", f"={prev}31+{col}24", FMT_USD)
        formula_cell(ws, f"{col}34", f"=-{col}13+{col}23", FMT_USD)
        formula_cell(ws, f"{col}35", f"=-{col}14+{col}24", FMT_USD)

    put(ws, "DS7", "Total", fnt=font(WHITE, True, 8), f=fill(NAVY))
    for r in [10, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 34, 35, 37, 38]:
        formula_cell(ws, f"DS{r}", f"=SUM(C{r}:DR{r})", FMT_USD)

    section(ws, 40, 2, 13, "HURDLE CONVERSION & ECONOMICS")
    put(ws, "B41", "Hurdle 1 IRR / equivalent multiple", fnt=font(BLACK, False, 9))
    link_cell(ws, "C41", f"={H1}", FMT_PCT)
    formula_cell(ws, "D41", f"=(1+C41)^{HOLD}", FMT_MULT)
    put(ws, "B42", "Hurdle 2 IRR / equivalent multiple", fnt=font(BLACK, False, 9))
    link_cell(ws, "C42", f"={H2}", FMT_PCT)
    formula_cell(ws, "D42", f"=(1+C42)^{HOLD}", FMT_MULT)
    put(ws, "B43", "Hurdle 3 IRR / equivalent multiple", fnt=font(BLACK, False, 9))
    link_cell(ws, "C43", f"={H3}", FMT_PCT)
    formula_cell(ws, "D43", f"=(1+C43)^{HOLD}", FMT_MULT)
    put(ws, "B44", "Hurdle 4 IRR / equivalent multiple", fnt=font(BLACK, False, 9))
    link_cell(ws, "C44", f"={H4}", FMT_PCT)
    formula_cell(ws, "D44", f"=(1+C44)^{HOLD}", FMT_MULT)
    put(ws, "B45", "LP preferred return", fnt=font(BLACK, False, 9))
    link_cell(ws, "C45", f"={PREF}", FMT_PCT)
    put(ws, "B46", "GP profit share / (1 - GP share)", fnt=font(BLACK, False, 9))
    formula_cell(ws, "D46", f"=IFERROR({GP_SHARE}/(1-{GP_SHARE}),0)", "0.0000")
    put(ws, "B47", "GP catch-up percentage", fnt=font(BLACK, False, 9))
    link_cell(ws, "C47", f"={CATCHUP}", FMT_PCT)
    put(ws, "B48", "GP co-investment", fnt=font(BLACK, False, 9))
    link_cell(ws, "C48", f"={GP_CO}", FMT_PCT)

    section(ws, 50, 2, 13, "WATERFALL SUMMARY")
    summ = [
        (51, "LP total contributions", "=SUM($C$13:$DR$13)", FMT_USD),
        (52, "LP total distributions", "=SUM($C$23:$DR$23)", FMT_USD),
        (53, "LP profit", "=C52-C51", FMT_USD),
        (54, "LP IRR", f"=XIRR(OFFSET($C$34,0,0,1,{EXIT_MONTH}),OFFSET($C$6,0,0,1,{EXIT_MONTH}))", FMT_IRR),
        (55, "LP multiple", "=IFERROR(C52/C51,0)", FMT_MULT),
        (56, "GP total contributions", "=SUM($C$14:$DR$14)", FMT_USD),
        (57, "GP total distributions", "=SUM($C$24:$DR$24)", FMT_USD),
        (58, "GP profit", "=C57-C56", FMT_USD),
        (59, "GP IRR", f"=XIRR(OFFSET($C$35,0,0,1,{EXIT_MONTH}),OFFSET($C$6,0,0,1,{EXIT_MONTH}))", FMT_IRR),
        (60, "GP multiple", "=IFERROR(C57/C56,0)", FMT_MULT),
        (61, "GP promote (GP distributions less co-invest share)", "=MAX(0,C57-(C52+C57)*" + GP_CO + ")", FMT_USD),
        (62, "Total profit (LP + GP)", "=C53+C58", FMT_USD),
        (63, "Total distributions", "=C52+C57", FMT_USD),
        (64, "Total cash available", "=SUM($C$10:$DR$10)", FMT_USD),
        (65, "Distribution check (should be zero)", "=C64-C63", FMT_USD),
        (66, "LP preferred paid", "=SUM($C$19:$DR$19)", FMT_USD),
        (67, "GP catch-up paid", "=SUM($C$20:$DR$20)", FMT_USD),
        (68, "Residual to LP", "=SUM($C$21:$DR$21)", FMT_USD),
        (69, "Residual to GP", "=SUM($C$22:$DR$22)", FMT_USD),
        (70, "Maximum monthly check error", "=MAX(MAX($C$26:$DR$26),-MIN($C$26:$DR$26))", FMT_USD2),
        (71, "Waterfall status", '=IF(ABS(C65)<1,"PASS","FAIL")', FMT_TEXT),
    ]
    for r, lab, f, fmt in summ:
        put(ws, f"B{r}", lab, fnt=font(NAVY, True, 9) if r in (54, 59, 71) else font(BLACK, False, 9), border=BORDER)
        formula_cell(ws, f"C{r}", f, fmt)

    put(ws, "B73", "Waterfall mechanics: (1) return of LP and GP capital; (2) LP preferred return accrues monthly on unreturned capital and compounds if selected; (3) GP catch-up to the target profit share; (4) residual split by IRR-equivalent multiple tiers. All cash is distributed monthly, so the waterfall reconciles to available cash.", fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B73:P73")
    ws.row_dimensions[73].height = 34

    set_widths(ws, {"A": 2, "B": 52})
    outline_monthly(ws, 6)
    for col in "CDEFGHIJKLM":
        ws.column_dimensions[col].width = 12
    ws.column_dimensions["DS"].width = 13
    ws.print_area = "A1:DS73"
    ws.print_title_rows = "5:7"
    ws.sheet_view.zoomScale = 80
