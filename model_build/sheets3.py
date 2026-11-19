"""Capital expenditure schedule and monthly operating model."""
from __future__ import annotations

import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from core import *
from engine import CAPEX_ITEMS, CAPEX_CONTINGENCY


def build_capex(wb) -> None:
    ws = setup_sheet(wb, CAPEX, "C55A11", gridlines=False)
    title_block(ws, "Capital Expenditure & Renovation Schedule",
                "Renovation programme and capital budget | Funded at closing through a reserve and drawn monthly", 12)
    nav_links(ws, 4)

    section(ws, 6, 2, 12, "RENOVATION & CAPITAL EXPENDITURE CONTROL PANEL")
    hdrs = ["Capital Item", "Units", "Cost / Unit", "Budget", "Start Month", "End Month", "Monthly Spend", "Notes"]
    for j, h in enumerate(hdrs):
        col = get_column_letter(2 + j)
        put(ws, f"{col}7", h, fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER, wrap=True)
    ws.row_dimensions[7].height = 28

    put(ws, "B8", "Unit interior renovations", fnt=font(BLACK, False, 9), border=BORDER)
    formula_cell(ws, "C8", f"={ref(RR, 'D8')}", "0")
    link_cell(ws, "D8", f"={RENO_COST}", FMT_USD)
    formula_cell(ws, "E8", "=C8*D8", FMT_USD)
    input_cell(ws, "F8", 1, "0")
    formula_cell(ws, "G8", f"=ROUNDUP(C8/{RENO_UNITS},0)", "0")
    formula_cell(ws, "H8", "=IFERROR(E8/(G8-F8+1),0)", FMT_USD)
    put(ws, "I8", "Interior renovation of all units at the underwritten cost per unit.", fnt=font("7F7F7F", False, 7, True), wrap=True)

    for i, (name, budget, start, end) in enumerate(CAPEX_ITEMS):
        r = 9 + i
        put(ws, f"B{r}", name, fnt=font(BLACK, False, 9), border=BORDER)
        put(ws, f"C{r}", None, border=BORDER)
        put(ws, f"D{r}", None, border=BORDER)
        input_cell(ws, f"E{r}", budget, FMT_USD)
        input_cell(ws, f"F{r}", start, "0")
        input_cell(ws, f"G{r}", end, "0")
        formula_cell(ws, f"H{r}", f"=IFERROR(E{r}/(G{r}-F{r}+1),0)", FMT_USD)
        put(ws, f"I{r}", "Illustrative budget and timing.", fnt=font("7F7F7F", False, 7, True))
    put(ws, "B20", "Total hard costs", fnt=font(WHITE, True, 9), f=fill(MID_BLUE), border=BORDER)
    formula_cell(ws, "E20", "=SUM(E8:E19)", FMT_USD)
    put(ws, "B21", "Contingency (% of hard costs)", fnt=font(BLACK, True, 9), border=BORDER)
    input_cell(ws, "C21", CAPEX_CONTINGENCY, FMT_PCT)
    put(ws, "D21", "Contingency $", fnt=font(BLACK, False, 8), border=BORDER)
    formula_cell(ws, "D21", "=E20*C21", FMT_USD)
    put(ws, "B22", "TOTAL CAPITAL BUDGET (funded at closing)", fnt=font(WHITE, True, 10), f=fill(DARK_BLUE), border=BORDER)
    formula_cell(ws, "E22", "=E20+D21", FMT_USD)
    ws.merge_cells("B22:D22")
    put(ws, "F22", "Budget is included in Sources & Uses as a renovation & capex reserve. Unused reserve is returned at exit.", fnt=font("595959", False, 7, True), wrap=True)
    ws.merge_cells("F22:L22")
    formula_cell(ws, "C23", "=IFERROR(E22/E20-1,0)", FMT_PCT)

    section(ws, 25, 2, 122, "MONTHLY CAPITAL EXPENDITURE SCHEDULE")
    month_headers(ws, 26, 27)
    ws.freeze_panes = "C28"

    put(ws, "B28", "Unit interior renovations", fnt=font(BLACK, False, 9), border=BORDER)
    for i, (name, budget, start, end) in enumerate(CAPEX_ITEMS):
        put(ws, f"B{29 + i}", name, fnt=font(BLACK, False, 9), border=BORDER)
    put(ws, "B40", "Contingency", fnt=font(BLACK, False, 9), border=BORDER)
    put(ws, "B41", "TOTAL CAPITAL EXPENDITURE", fnt=font(WHITE, True, 9), f=fill(DARK_BLUE), border=BORDER)
    put(ws, "B42", "Units renovated in month", fnt=font(NAVY, True, 9), border=BORDER)
    put(ws, "B43", "Cumulative units renovated", fnt=font(NAVY, True, 9), border=BORDER)
    put(ws, "B44", "Replacement reserve", fnt=font(BLACK, False, 9), border=BORDER)
    put(ws, "B45", "Total capital uses (capex + replacement)", fnt=font(NAVY, True, 9), border=BORDER)
    put(ws, "B46", "Capex reserve opening balance", fnt=font(NAVY, True, 9), border=BORDER)
    put(ws, "B47", "Capex reserve draws", fnt=font(BLACK, False, 9), border=BORDER)
    put(ws, "B48", "Capex reserve closing balance", fnt=font(NAVY, True, 9), border=BORDER)
    put(ws, "B49", "Cumulative capex funded", fnt=font(BLACK, False, 9), border=BORDER)
    put(ws, "B50", "% of budget drawn", fnt=font(BLACK, False, 9), border=BORDER)

    for i, col in enumerate(MONTH_COLS):
        m = i + 1
        formula_cell(ws, f"{col}28", f"={col}42*{RENO_COST}", FMT_USD)
        for j, (name, budget, start, end) in enumerate(CAPEX_ITEMS):
            r = 29 + j
            cr = 9 + j
            formula_cell(ws, f"{col}{r}", f"=IF(AND({m}>=$F${cr},{m}<=$G${cr}),$E${cr}/($G${cr}-$F${cr}+1),0)", FMT_USD)
        formula_cell(ws, f"{col}40", f"=SUM({col}28:{col}39)*$C$21", FMT_USD)
        formula_cell(ws, f"{col}41", f"=SUM({col}28:{col}40)", FMT_USD)
        if i == 0:
            formula_cell(ws, f"{col}42", f"=MIN({RENO_UNITS},{ref(RR, 'D8')})", "0")
            formula_cell(ws, f"{col}43", f"={col}42", "0")
            formula_cell(ws, f"{col}46", "=$E$22", FMT_USD)
            formula_cell(ws, f"{col}49", f"={col}41", FMT_USD)
        else:
            prev = MONTH_COLS[i - 1]
            formula_cell(ws, f"{col}42", f"=MIN({RENO_UNITS},MAX(0,{ref(RR, 'D8')}-{prev}43))", "0")
            formula_cell(ws, f"{col}43", f"={prev}43+{col}42", "0")
            formula_cell(ws, f"{col}46", f"={prev}48", FMT_USD)
            formula_cell(ws, f"{col}49", f"={prev}49+{col}41", FMT_USD)
        formula_cell(ws, f"{col}44", f"={ref(RR, 'D8')}*{REPL}/12", FMT_USD)
        formula_cell(ws, f"{col}45", f"={col}41+{col}44", FMT_USD)
        formula_cell(ws, f"{col}47", f"=-{col}41", FMT_USD)
        formula_cell(ws, f"{col}48", f"={col}46+{col}47", FMT_USD)
        formula_cell(ws, f"{col}50", f"=IFERROR({col}49/$E$22,0)", FMT_PCT)

    put(ws, "DS27", "Total", fnt=font(WHITE, True, 8), f=fill(NAVY))
    for r in range(28, 46):
        formula_cell(ws, f"DS{r}", f"=SUM(C{r}:DR{r})", FMT_USD)
    formula_cell(ws, "DS50", "=IFERROR(DS49/$E$22,0)", FMT_PCT)

    section(ws, 52, 2, 12, "CAPITAL BUDGET SUMMARY")
    put(ws, "B53", "Renovation budget", fnt=font(BLACK, False, 9))
    formula_cell(ws, "D53", "=E8", FMT_USD)
    put(ws, "B54", "Other capital items", fnt=font(BLACK, False, 9))
    formula_cell(ws, "D54", "=SUM(E9:E19)", FMT_USD)
    put(ws, "B55", "Contingency", fnt=font(BLACK, False, 9))
    formula_cell(ws, "D55", "=D21", FMT_USD)
    put(ws, "B56", "Total capital budget", fnt=font(NAVY, True, 9))
    formula_cell(ws, "D56", "=SUM(D53:D55)", FMT_USD)
    put(ws, "B57", "Capital budget per unit", fnt=font(BLACK, False, 9))
    formula_cell(ws, "D57", f"=IFERROR(D56/{ref(RR, 'D8')},0)", FMT_USD)
    put(ws, "B58", "Capital budget as % of purchase price", fnt=font(BLACK, False, 9))
    formula_cell(ws, "D58", f"=IFERROR(D56/{PP},0)", FMT_PCT)
    put(ws, "B59", "Replacement reserve per unit per year", fnt=font(BLACK, False, 9))
    link_cell(ws, "D59", f"={REPL}", FMT_USD)
    put(ws, "B60", "Check: budget ties to control panel", fnt=font(NAVY, True, 9))
    formula_cell(ws, "D60", '=IF(ABS(D56-E22)<1,"PASS","FAIL")', FMT_TEXT)

    set_widths(ws, {"A": 2, "B": 38, "C": 10, "D": 13, "E": 14, "F": 11, "G": 11, "H": 13, "I": 46})
    outline_monthly(ws, 26)
    ws.print_area = "A1:DS60"
    ws.print_title_rows = "25:27"
    ws.sheet_view.zoomScale = 80


def build_op_model(wb) -> None:
    ws = setup_sheet(wb, OP, GREEN, gridlines=True)
    title_block(ws, "Monthly Operating Model",
                "Consolidated monthly property cash flow | Revenue, operating expenses, NOI and below-NOI reserves", 14)
    nav_links(ws, 4)
    section(ws, 5, 2, 122, "MONTHLY PROPERTY OPERATING MODEL")
    month_headers(ws, 6, 7)
    ws.freeze_panes = "C8"

    rev = [
        (8, "Gross potential rent", "gpr"),
        (9, "Less: loss to lease", "ltl"),
        (10, "Less: physical vacancy", "vac"),
        (11, "Less: concessions", "conc"),
        (12, "Less: credit loss", "credit"),
        (13, "Less: bad debt", "bad"),
        (14, "Net rental income", "net"),
        (15, "Plus: renovation rent premium", "reno"),
        (16, "Less: renovation downtime", "down"),
        (17, "Plus: other income", "other"),
        (18, "EFFECTIVE GROSS INCOME", "egi"),
    ]
    for r, lab, key in rev:
        put(ws, f"B{r}", lab, fnt=font(NAVY if key in ("egi", "net") else BLACK, key in ("egi", "net"), 9), border=BORDER)
        if key == "egi":
            ws[f"B{r}"].fill = fill(LIGHT_BLUE)
    section(ws, 20, 2, 122, "OPERATING EXPENSES")
    cats = ["Property taxes", "Insurance", "Repairs & maintenance", "Payroll", "Utilities",
            "Contract services", "Administrative", "Marketing", "Management fees",
            "Landscaping", "Security", "Other expenses"]
    for i, cat in enumerate(cats):
        put(ws, f"B{21 + i}", cat, fnt=font(BLACK, False, 9), border=BORDER)
    put(ws, "B33", "TOTAL OPERATING EXPENSES", fnt=font(WHITE, True, 9), f=fill(DARK_BLUE), border=BORDER)
    put(ws, "B34", "NET OPERATING INCOME", fnt=font(WHITE, True, 10), f=fill(DARK_BLUE), border=BORDER)
    put(ws, "B35", "NOI margin", fnt=font(NAVY, True, 9), border=BORDER)
    section(ws, 36, 2, 122, "CASH FLOW AFTER CAPITAL RESERVES")
    put(ws, "B37", "Less: replacement reserves", fnt=font(BLACK, False, 9), border=BORDER)
    put(ws, "B38", "Less: leasing costs", fnt=font(BLACK, False, 9), border=BORDER)
    put(ws, "B39", "Less: capital expenditure (from reserve)", fnt=font(BLACK, False, 9), border=BORDER)
    put(ws, "B40", "NET CASH FLOW AFTER CAPITAL RESERVES", fnt=font(WHITE, True, 9), f=fill(MID_BLUE), border=BORDER)

    for i, col in enumerate(MONTH_COLS):
        formula_cell(ws, f"{col}8", f"={ref(REV, col + '12', False)}", FMT_USD)
        formula_cell(ws, f"{col}9", f"=-{ref(REV, col + '13', False)}", FMT_USD)
        formula_cell(ws, f"{col}10", f"=-{ref(REV, col + '14', False)}", FMT_USD)
        formula_cell(ws, f"{col}11", f"=-{ref(REV, col + '15', False)}", FMT_USD)
        formula_cell(ws, f"{col}12", f"=-{ref(REV, col + '16', False)}", FMT_USD)
        formula_cell(ws, f"{col}13", f"=-{ref(REV, col + '17', False)}", FMT_USD)
        formula_cell(ws, f"{col}14", f"=SUM({col}8:{col}13)", FMT_USD)
        formula_cell(ws, f"{col}15", f"={ref(REV, col + '19', False)}", FMT_USD)
        formula_cell(ws, f"{col}16", f"=-{ref(REV, col + '20', False)}", FMT_USD)
        formula_cell(ws, f"{col}17", f"=SUM({ref(REV, col + '21', False)}:{ref(REV, col + '26', False)})", FMT_USD)
        formula_cell(ws, f"{col}18", f"=SUM({col}14:{col}17)", FMT_USD)
        for j in range(12):
            formula_cell(ws, f"{col}{21 + j}", f"={ref(EXP, col + str(28 + j), False)}", FMT_USD)
        formula_cell(ws, f"{col}33", f"=SUM({col}21:{col}32)", FMT_USD)
        formula_cell(ws, f"{col}34", f"={col}18-{col}33", FMT_USD)
        formula_cell(ws, f"{col}35", f"=IFERROR({col}34/{col}18,0)", FMT_PCT)
        formula_cell(ws, f"{col}37", f"={ref(CAPEX, col + '44', False)}", FMT_USD)
        formula_cell(ws, f"{col}38", f"={col}18*{LEASING}", FMT_USD)
        formula_cell(ws, f"{col}39", f"={ref(CAPEX, col + '41', False)}", FMT_USD)
        formula_cell(ws, f"{col}40", f"={col}34-{col}37-{col}38-{col}39", FMT_USD)

    put(ws, "DS7", "Total", fnt=font(WHITE, True, 8), f=fill(NAVY))
    for r in list(range(8, 19)) + list(range(21, 41)):
        formula_cell(ws, f"DS{r}", f"=SUM(C{r}:DR{r})", FMT_USD)
    formula_cell(ws, "DS35", "=IFERROR(DS34/DS18,0)", FMT_PCT)

    section(ws, 42, 2, 13, "ANNUAL SUMMARY")
    put(ws, "B43", "Investment Year", fnt=font(WHITE, True, 8), f=fill(NAVY), border=BORDER)
    for i in range(10):
        col = get_column_letter(3 + i)
        put(ws, f"{col}43", i + 1, "0", fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)
    annual = [
        (44, "Effective gross income", 18),
        (45, "Operating expenses", 33),
        (46, "Net operating income", 34),
        (47, "NOI margin", None),
        (48, "Replacement reserves", 37),
        (49, "Leasing costs", 38),
        (50, "Capital expenditure", 39),
        (51, "Net cash flow after capital reserves", 40),
        (52, "NOI per unit", None),
        (53, "NOI per SF", None),
        (54, "EGI growth", None),
        (55, "Operating expense growth", None),
        (56, "NOI growth", None),
        (57, "Capex coverage (NOI / capex)", None),
        (58, "Cash flow margin", None),
    ]
    for r, lab, src in annual:
        put(ws, f"B{r}", lab, fnt=font(NAVY if r in (46, 51) else BLACK, r in (46, 51), 9), border=BORDER)
        for i in range(10):
            col = get_column_letter(3 + i)
            if src is not None:
                formula_cell(ws, f"{col}{r}", f"=SUMIFS($C${src}:$DR${src},$C$7:$DR$7,\">=\"&({col}$43-1)*12+1,$C$7:$DR$7,\"<=\"&{col}$43*12)", FMT_USD)
            elif r == 47:
                formula_cell(ws, f"{col}{r}", f"=IFERROR({col}46/{col}44,0)", FMT_PCT)
            elif r == 52:
                formula_cell(ws, f"{col}{r}", f"=IFERROR({col}46/{ref(RR, 'D8')},0)", FMT_USD)
            elif r == 53:
                formula_cell(ws, f"{col}{r}", f"=IFERROR({col}46/{ref(RR, 'D18')},0)", FMT_USD2)
            elif r in (54, 55, 56):
                if i == 0:
                    formula_cell(ws, f"{col}{r}", '=""', FMT_PCT)
                else:
                    prev = get_column_letter(2 + i)
                    base = 44 if r == 54 else (45 if r == 55 else 46)
                    formula_cell(ws, f"{col}{r}", f"=IFERROR({col}{base}/{prev}{base}-1,0)", FMT_PCT)
            elif r == 57:
                formula_cell(ws, f"{col}{r}", f"=IFERROR({col}46/{col}50,0)", FMT_MULT)
            elif r == 58:
                formula_cell(ws, f"{col}{r}", f"=IFERROR({col}51/{col}44,0)", FMT_PCT)

    set_widths(ws, {"A": 2, "B": 40})
    outline_monthly(ws, 6)
    for col in "CDEFGHIJKLM":
        ws.column_dimensions[col].width = 12
    ws.column_dimensions["DS"].width = 13
    ws.print_area = "A1:DS58"
    ws.print_title_rows = "5:7"
    ws.sheet_view.zoomScale = 80
