from core import *
from engine import CAPEX_ITEMS, CAPEX_CONTINGENCY

# Appended sheet builders (part 2)
# -----------------------------------------------------------------------------
# Historical T-12
# -----------------------------------------------------------------------------

def build_t12(wb) -> None:
    ws = setup_sheet(wb, T12, MID_BLUE, gridlines=False)
    title_block(ws, "Historical Financials / T-12", "Illustrative historical operating statement | Actual history vs. underwritten T-12", 12)
    nav_links(ws, 4)
    section(ws, 6, 2, 12, "TRAILING TWELVE MONTHS OPERATING STATEMENT")
    headers = ["Line Item", "Prior Year", "T-3 Annualized", "T-12 Actual", "Current Year Actual",
               "Underwritten T-12", "Variance $", "Variance %", "Per Unit", "Per SF", "Notes"]
    for j, h in enumerate(headers):
        col = get_column_letter(2 + j)
        put(ws, f"{col}7", h, fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER, wrap=True)
    ws.row_dimensions[7].height = 30

    rev_lines = [
        (8, "Gross potential rent", "gpr"),
        (9, "Vacancy", "vacancy"),
        (10, "Concessions", "concessions"),
        (11, "Bad debt", "bad"),
        (12, "Other rental adjustments", "other_adj"),
        (13, "Net rental income", "net_rental"),
        (15, "Parking income", "parking"),
        (16, "Laundry income", "laundry"),
        (17, "Pet income", "pet"),
        (18, "Utility reimbursements", "utility"),
        (19, "Other income", "other"),
        (20, "Effective gross income", "egi"),
    ]
    exp_lines = [
        (22, "Property taxes", "taxes"),
        (23, "Insurance", "insurance"),
        (24, "Repairs and maintenance", "rm"),
        (25, "Payroll", "payroll"),
        (26, "Utilities", "utilities"),
        (27, "Contract services", "contract"),
        (28, "Administrative expenses", "admin"),
        (29, "Marketing", "marketing"),
        (30, "Management fees", "mgmt"),
        (31, "Landscaping", "landscaping"),
        (32, "Security", "security"),
        (33, "Other expenses", "other_exp"),
        (34, "Total operating expenses", "total_exp"),
        (35, "Net operating income", "noi"),
    ]
    # Hard-coded illustrative history (inputs)
    hist = {
        "gpr": 4_650_000, "vacancy": -465_000, "concessions": -46_500, "bad": -23_250,
        "other_adj": 0, "parking": 90_000, "laundry": 30_000, "pet": 45_000,
        "utility": 120_000, "other": 75_000, "taxes": 400_000, "insurance": 220_000,
        "rm": 350_000, "payroll": 420_000, "utilities": 280_000, "contract": 180_000,
        "admin": 120_000, "marketing": 60_000, "mgmt": 134_258, "landscaping": 45_000,
        "security": 35_000, "other_exp": 40_000,
    }
    rows_all = {r: k for r, lab, k in rev_lines + exp_lines}
    for r, lab, key in rev_lines + exp_lines:
        put(ws, f"B{r}", lab, fnt=font(BLACK, False, 9), border=BORDER)
        if key in hist:
            # Prior year, T-3 annualized, T-12 actual, current year actual
            base = hist[key]
            input_cell(ws, f"C{r}", round(base * 0.955), FMT_USD)
            input_cell(ws, f"D{r}", round(base * 0.25), FMT_USD)
            input_cell(ws, f"E{r}", base, FMT_USD)
            input_cell(ws, f"F{r}", round(base * 1.010), FMT_USD)
        else:
            for col in "CDEF":
                formula_cell(ws, f"{col}{r}", None, FMT_USD)
    # calculated actual lines
    for r in (13, 20):
        formula_cell(ws, f"E{r}", f"=SUM(E8:E12)" if r == 13 else f"=E13+SUM(E15:E19)", FMT_USD)
        formula_cell(ws, f"C{r}", f"=SUM(C8:C12)" if r == 13 else f"=C13+SUM(C15:C19)", FMT_USD)
        formula_cell(ws, f"D{r}", f"=SUM(D8:D12)" if r == 13 else f"=D13+SUM(D15:D19)", FMT_USD)
        formula_cell(ws, f"F{r}", f"=SUM(F8:F12)" if r == 13 else f"=F13+SUM(F15:F19)", FMT_USD)
    formula_cell(ws, "E34", "=SUM(E22:E33)", FMT_USD)
    formula_cell(ws, "E35", "=E20-E34", FMT_USD)
    for col in "CDF":
        formula_cell(ws, f"{col}34", f"=SUM({col}22:{col}33)", FMT_USD)
        formula_cell(ws, f"{col}35", f"={col}20-{col}34", FMT_USD)
    # Underwritten T-12 links to year 1 annual summaries
    uw = {
        "gpr": f"={ref(REV, 'C39')}",
        "vacancy": f"=-{ref(REV, 'C41')}",
        "concessions": f"=-{ref(REV, 'C42')}",
        "bad": f"=-{ref(REV, 'C44')}",
        "other_adj": f"={ref(REV, 'C46')}-{ref(REV, 'C47')}-{ref(REV, 'C40')}-{ref(REV, 'C43')}",
        "parking": f"={ref(REV, 'C48')}",
        "laundry": f"={ref(REV, 'C50')}",
        "pet": f"={ref(REV, 'C49')}",
        "utility": f"={ref(REV, 'C51')}",
        "other": f"={ref(REV, 'C52')}",
        "taxes": f"={ref(EXP, 'C48')}",
        "insurance": f"={ref(EXP, 'C49')}",
        "rm": f"={ref(EXP, 'C50')}",
        "payroll": f"={ref(EXP, 'C51')}",
        "utilities": f"={ref(EXP, 'C52')}",
        "contract": f"={ref(EXP, 'C53')}",
        "admin": f"={ref(EXP, 'C54')}",
        "marketing": f"={ref(EXP, 'C55')}",
        "mgmt": f"={ref(EXP, 'C56')}",
        "landscaping": f"={ref(EXP, 'C57')}",
        "security": f"={ref(EXP, 'C58')}",
        "other_exp": f"={ref(EXP, 'C59')}",
    }
    for key, f in uw.items():
        r = next(rr for rr, lab, k in rev_lines + exp_lines if k == key)
        link_cell(ws, f"G{r}", f, FMT_USD)
    formula_cell(ws, "G13", "=SUM(G8:G12)", FMT_USD)
    formula_cell(ws, "G20", "=G13+SUM(G15:G19)", FMT_USD)
    formula_cell(ws, "G34", "=SUM(G22:G33)", FMT_USD)
    formula_cell(ws, "G35", "=G20-G34", FMT_USD)
    # Variance / per unit / per SF
    for r, lab, key in rev_lines + exp_lines:
        if r in (13, 20, 34, 35):
            formula_cell(ws, f"H{r}", f"=G{r}-E{r}", FMT_USD)
            formula_cell(ws, f"I{r}", f"=IFERROR(H{r}/ABS(E{r}),0)", FMT_PCT)
        else:
            formula_cell(ws, f"H{r}", f"=G{r}-E{r}", FMT_USD)
            formula_cell(ws, f"I{r}", f"=IFERROR(H{r}/ABS(E{r}),0)", FMT_PCT)
        formula_cell(ws, f"J{r}", f"=IFERROR(E{r}/{ref(PROP, 'D13')},0)", FMT_USD)
        formula_cell(ws, f"K{r}", f"=IFERROR(E{r}/{ref(PROP, 'D29')},0)", FMT_USD2)
    # Headline diagnostics
    put(ws, "B37", "NOI margin", fnt=font(NAVY, True, 9))
    formula_cell(ws, "E37", "=IFERROR(E35/E20,0)", FMT_PCT)
    formula_cell(ws, "G37", "=IFERROR(G35/G20,0)", FMT_PCT)
    put(ws, "B38", "Operating expense ratio", fnt=font(NAVY, True, 9))
    formula_cell(ws, "E38", "=IFERROR(E34/E20,0)", FMT_PCT)
    formula_cell(ws, "G38", "=IFERROR(G34/G20,0)", FMT_PCT)
    put(ws, "B39", "Revenue per unit", fnt=font(NAVY, True, 9))
    formula_cell(ws, "E39", f"=IFERROR(E20/{ref(PROP, 'D13')},0)", FMT_USD)
    put(ws, "B40", "Expense per unit", fnt=font(NAVY, True, 9))
    formula_cell(ws, "E40", f"=IFERROR(E34/{ref(PROP, 'D13')},0)", FMT_USD)
    put(ws, "B41", "Expense per SF", fnt=font(NAVY, True, 9))
    formula_cell(ws, "E41", f"=IFERROR(E34/{ref(PROP, 'D29')},0)", FMT_USD2)
    put(ws, "B43", "Actual T-12 values are illustrative inputs. Underwritten T-12 is formula-linked to the Revenue and Expense underwriting tabs (Year 1). Variance = Underwritten less Actual.",
        fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B43:K43")
    ws.row_dimensions[43].height = 28

    set_widths(ws, {"A": 2.5, "B": 32, "C": 14, "D": 14, "E": 14, "F": 14, "G": 15, "H": 13, "I": 10, "J": 11, "K": 10, "L": 50})
    ws.freeze_panes = "C8"
    ws.print_area = "A1:L43"
    ws.sheet_view.zoomScale = 90


# -----------------------------------------------------------------------------
# Revenue underwriting
# -----------------------------------------------------------------------------

def build_revenue(wb) -> None:
    ws = setup_sheet(wb, REV, GREEN, gridlines=True)
    title_block(ws, "Revenue Underwriting", "Monthly revenue build | Market rent growth, loss-to-lease burn-off, vacancy, concessions, credit loss and other income", 14)
    nav_links(ws, 4)
    section(ws, 6, 2, 122, "MONTHLY REVENUE PROJECTION")
    month_headers(ws, 7, 8, 9)
    ws.freeze_panes = "C9"
    # Labels
    rows = [
        (12, "Gross potential rent", "gpr"),
        (13, "Less: loss to lease", "ltl"),
        (14, "Less: physical vacancy", "vac"),
        (15, "Less: concessions", "conc"),
        (16, "Less: credit loss", "credit"),
        (17, "Less: bad debt", "bad"),
        (18, "Net rental income", "net"),
        (19, "Plus: renovation rent premium", "reno"),
        (20, "Less: renovation downtime loss", "down"),
        (21, "Other rental income", "other_rent"),
        (22, "Parking income", "parking"),
        (23, "Pet income", "pet"),
        (24, "Laundry income", "laundry"),
        (25, "Utility reimbursements", "util"),
        (26, "Other income", "other"),
        (27, "EFFECTIVE GROSS INCOME", "egi"),
        (29, "Memo: in-place occupied rent", "inplace"),
        (30, "Memo: physical occupancy", "occ"),
        (31, "Revenue per unit (annualized)", "perunit"),
        (32, "Revenue per SF (annualized)", "persf"),
        (33, "Revenue growth (Y/Y)", "growth"),
    ]
    for r, lab, key in rows:
        bold = key in ("egi", "net")
        put(ws, f"B{r}", lab, fnt=font(NAVY if bold else BLACK, bold, 9), border=BORDER)
        if key == "egi":
            ws[f"B{r}"].fill = fill(LIGHT_BLUE)
    # formulas
    for i, col in enumerate(MONTH_COLS):
        m = f"{col}$8"
        f_gpr = f"='Rent Roll'!$D$14*(1+{MKT_GROWTH})^(({m}-1)/12)"
        f_ltl = f"=MAX(0,'Rent Roll'!$D$14*'Rent Roll'!$D$9-'Rent Roll'!$D$13)*MAX(0,1-{m}/{LTL_BURN})"
        f_occ = f"=MIN(1-{VACANCY},'Rent Roll'!$D$9+((1-{VACANCY})-'Rent Roll'!$D$9)*MIN({m},{LEASEUP})/{LEASEUP})"
        f_vac = f"={col}12*(1-{col}30)"
        f_conc = f"={col}12*{col}30*{CONC}"
        f_base = f"=MAX(0,{col}12-{col}13-{col}14-{col}15)"
        f_credit = f"={col}12*{CREDIT}"
        f_bad = f"={col}12*{BAD}"
        f_net = f"={col}12-{col}13-{col}14-{col}15-{col}16-{col}17"
        f_reno = f"={ref(CAPEX, col + '43', False)}*{RENO_PREM}*(1+{MKT_GROWTH})^(({m}-1)/12)"
        f_down = f"=IF({m}<=ROUNDUP('Rent Roll'!$D$8/{RENO_UNITS},0),MIN({RENO_UNITS},'Rent Roll'!$D$8)*('Rent Roll'!$D$14/'Rent Roll'!$D$8)*{RENO_DOWN},0)"
        f_other = f"={ref(T12, 'E19')}*(1+{OTHER_GROWTH})^(({m}-1)/12)/12"
        f_park = f"={ref(T12, 'E15')}*(1+{OTHER_GROWTH})^(({m}-1)/12)/12"
        f_pet = f"={ref(T12, 'E17')}*(1+{OTHER_GROWTH})^(({m}-1)/12)/12"
        f_laundry = f"={ref(T12, 'E16')}*(1+{OTHER_GROWTH})^(({m}-1)/12)/12"
        f_util = f"={ref(T12, 'E18')}*(1+{OTHER_GROWTH})^(({m}-1)/12)/12"
        f_other_inc = f"={ref(T12, 'E19')}*(1+{OTHER_GROWTH})^(({m}-1)/12)/12"
        f_egi = f"={col}18+{col}19-{col}20+{col}21+{col}22+{col}23+{col}24+{col}25+{col}26"
        formula_cell(ws, f"{col}12", f_gpr, FMT_USD)
        formula_cell(ws, f"{col}13", f_ltl, FMT_USD)
        formula_cell(ws, f"{col}30", f_occ, FMT_PCT)
        formula_cell(ws, f"{col}14", f_vac, FMT_USD)
        formula_cell(ws, f"{col}15", f_conc, FMT_USD)
        formula_cell(ws, f"{col}16", f_credit, FMT_USD)
        formula_cell(ws, f"{col}17", f_bad, FMT_USD)
        formula_cell(ws, f"{col}18", f_net, FMT_USD)
        formula_cell(ws, f"{col}19", f_reno, FMT_USD)
        formula_cell(ws, f"{col}20", f_down, FMT_USD)
        formula_cell(ws, f"{col}21", "=0", FMT_USD)
        formula_cell(ws, f"{col}22", f_park, FMT_USD)
        formula_cell(ws, f"{col}23", f_pet, FMT_USD)
        formula_cell(ws, f"{col}24", f_laundry, FMT_USD)
        formula_cell(ws, f"{col}25", f_util, FMT_USD)
        formula_cell(ws, f"{col}26", f_other_inc, FMT_USD)
        formula_cell(ws, f"{col}27", f_egi, FMT_USD)
        formula_cell(ws, f"{col}29", f"='Rent Roll'!$D$13*(1+{RENT_GROWTH})^(({m}-1)/12)", FMT_USD)
        formula_cell(ws, f"{col}31", f"=IFERROR({col}27*12/'Rent Roll'!$D$8,0)", FMT_USD)
        formula_cell(ws, f"{col}32", f"=IFERROR({col}27*12/'Rent Roll'!$D$18,0)", FMT_USD2)
        if i == 0:
            formula_cell(ws, f"{col}33", '=""', FMT_PCT)
        else:
            prev = MONTH_COLS[i - 1]
            formula_cell(ws, f"{col}33", f"=IFERROR({col}27/{prev}27-1,0)", FMT_PCT)

    # Total column
    put(ws, "DS7", "Total / Wtd", fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)
    put(ws, "DS8", "", f=fill(NAVY))
    put(ws, "DS9", "", f=fill(NAVY))
    for r in [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29]:
        formula_cell(ws, f"DS{r}", f"=SUM(C{r}:DR{r})", FMT_USD)
    formula_cell(ws, "DS30", "=IFERROR(AVERAGE(C30:DR30),0)", FMT_PCT)
    formula_cell(ws, "DS31", "=IFERROR(DS27*12/'Rent Roll'!$D$8,0)", FMT_USD)
    formula_cell(ws, "DS32", "=IFERROR(DS27*12/'Rent Roll'!$D$18,0)", FMT_USD2)
    formula_cell(ws, "DS33", "=IFERROR(INDEX(C27:DR27,1,120)/INDEX(C27:DR27,1,108)-1,0)", FMT_PCT)

    # Annual summary
    section(ws, 36, 2, 13, "ANNUAL SUMMARY")
    put(ws, "B37", "Investment Year", fnt=font(WHITE, True, 8), f=fill(NAVY), border=BORDER)
    for i in range(10):
        col = get_column_letter(3 + i)
        put(ws, f"{col}37", i + 1, "0", fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)
    annual_rows = [
        (39, "Gross potential rent", 12), (40, "Loss to lease", 13), (41, "Physical vacancy", 14),
        (42, "Concessions", 15), (43, "Credit loss", 16), (44, "Bad debt", 17),
        (45, "Net rental income", 18), (46, "Renovation premium", 19), (47, "Renovation downtime", 20),
        (48, "Parking income", 22), (49, "Pet income", 23), (50, "Laundry income", 24),
        (51, "Utility reimbursements", 25), (52, "Other income", 26), (53, "Effective gross income", 27),
        (54, "Revenue per unit", None), (55, "Revenue per SF", None),
    ]
    for r, lab, src in annual_rows:
        put(ws, f"B{r}", lab, fnt=font(NAVY if r == 53 else BLACK, r == 53, 9), border=BORDER)
        for i in range(10):
            col = get_column_letter(3 + i)
            if src:
                formula_cell(ws, f"{col}{r}", f"=SUMIFS($C${src}:$DR${src},$C$8:$DR$8,\">=\"&({col}$37-1)*12+1,$C$8:$DR$8,\"<=\"&{col}$37*12)", FMT_USD)
            elif r == 54:
                formula_cell(ws, f"{col}{r}", f"=IFERROR({col}$53*12/'Rent Roll'!$D$8,0)", FMT_USD)
            else:
                formula_cell(ws, f"{col}{r}", f"=IFERROR({col}$53/'Rent Roll'!$D$18,0)", FMT_USD2)
    # Annual memo rows
    put(ws, "B57", "Annual revenue growth", fnt=font(NAVY, True, 9), border=BORDER)
    for i in range(10):
        col = get_column_letter(3 + i)
        if i == 0:
            formula_cell(ws, f"{col}57", '=""', FMT_PCT)
        else:
            prev = get_column_letter(2 + i)
            formula_cell(ws, f"{col}57", f"=IFERROR({col}53/{prev}53-1,0)", FMT_PCT)

    set_widths(ws, {"A": 2, "B": 42})
    outline_monthly(ws, 7)
    for col in "CDEFGHIJKLM":
        ws.column_dimensions[col].width = 12
    ws.column_dimensions["DS"].width = 13
    ws.print_area = "A1:DS58"
    ws.print_title_rows = "6:8"
    ws.sheet_view.zoomScale = 80


# -----------------------------------------------------------------------------
# Operating expense underwriting
# -----------------------------------------------------------------------------

EXP_CATS = [
    ("Property taxes", 400_000, "Tax Reassessment", 0.0175, "Tax"),
    ("Insurance", 220_000, "Fixed", 220_000, "Assumptions"),
    ("Repairs & maintenance", 350_000, "Per Unit", 1_400, "Exp"),
    ("Payroll", 420_000, "Per Unit", 1_680, "Exp"),
    ("Utilities", 280_000, "Per Unit", 1_120, "Exp"),
    ("Contract services", 180_000, "Per Unit", 720, "Exp"),
    ("Administrative", 120_000, "Per Unit", 480, "Exp"),
    ("Marketing", 60_000, "% of EGI", 0.0125, "EGI"),
    ("Management fees", 134_258, "Management Fee", 0.030, "EGI"),
    ("Landscaping", 45_000, "Per Unit", 180, "Exp"),
    ("Security", 35_000, "Per Unit", 140, "Exp"),
    ("Other expenses", 40_000, "Fixed", 40_000, "Exp"),
]


def build_expenses(wb) -> None:
    ws = setup_sheet(wb, EXP, GREEN, gridlines=True)
    title_block(ws, "Operating Expense Underwriting", "Monthly expense forecast | Fixed, per-unit, per-SF, % of EGI and tax reassessment methodologies", 14)
    nav_links(ws, 4)
    section(ws, 6, 2, 11, "EXPENSE CONTROL PANEL")
    headers = ["Expense Category", "T-12 Actual", "Per Unit", "Per SF", "Method", "Basis", "Growth Rate",
               "Underwritten Year 1", "Monthly Average", "Notes"]
    for j, h in enumerate(headers):
        col = get_column_letter(2 + j)
        put(ws, f"{col}7", h, fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER, wrap=True)
    ws.row_dimensions[7].height = 30
    for i, (cat, t12, method, basis, gtype) in enumerate(EXP_CATS):
        r = 8 + i
        put(ws, f"B{r}", cat, fnt=font(BLACK, False, 9), border=BORDER)
        link_cell(ws, f"C{r}", f"={ref(T12, 'E' + str(22 + i))}", FMT_USD)
        formula_cell(ws, f"D{r}", f"=IFERROR(C{r}/{ref(PROP, 'D13')},0)", FMT_USD)
        formula_cell(ws, f"E{r}", f"=IFERROR(C{r}/{ref(PROP, 'D29')},0)", FMT_USD2)
        input_cell(ws, f"F{r}", method, FMT_TEXT)
        input_cell(ws, f"G{r}", basis, FMT_PCT2 if cat in ("Property taxes", "Marketing", "Management fees", "Insurance") and method != "Fixed" or method == "Management Fee" else (FMT_USD if method == "Fixed" else (FMT_USD2 if method in ("Per Unit", "Per SF") else FMT_PCT2)))
        if gtype == "Tax":
            link_cell(ws, f"H{r}", f"={TAX_GROWTH}", FMT_PCT)
        elif cat == "Insurance":
            link_cell(ws, f"H{r}", f"={INS_GROWTH}", FMT_PCT)
        elif gtype == "EGI":
            formula_cell(ws, f"H{r}", "=0", FMT_PCT)
        else:
            link_cell(ws, f"H{r}", f"={EXP_GROWTH}", FMT_PCT)
        # Underwritten annual formula
        base_formula = (
            f'=IF(F{r}="Fixed",G{r},'
            f'IF(F{r}="Per Unit",G{r}*{ref(PROP, "D13")},'
            f'IF(F{r}="Per SF",G{r}*{ref(PROP, "D29")},'
            f'IF(F{r}="% of EGI",G{r}*{ref(REV, "C53")},'
            f'IF(F{r}="Tax Reassessment",{PP}*G{r},'
            f'IF(F{r}="Management Fee",G{r}*{ref(REV, "C53")},0))))))'
        )
        formula_cell(ws, f"I{r}", base_formula, FMT_USD)
        formula_cell(ws, f"J{r}", f"=I{r}/12", FMT_USD)
    put(ws, "B20", "Total operating expenses", fnt=font(WHITE, True, 9), f=fill(MID_BLUE), border=BORDER)
    link_cell(ws, "C20", f"={ref(T12, 'E34')}", FMT_USD)
    formula_cell(ws, "D20", f"=IFERROR(C20/{ref(PROP, 'D13')},0)", FMT_USD)
    formula_cell(ws, "E20", f"=IFERROR(C20/{ref(PROP, 'D29')},0)", FMT_USD2)
    formula_cell(ws, "I20", "=SUM(I8:I19)", FMT_USD)
    formula_cell(ws, "J20", "=SUM(J8:J19)", FMT_USD)
    put(ws, "B21", "T-12 actual = illustrative historical input. Underwritten Year 1 is calculated from the selected methodology and basis; growth is applied monthly in the projection below.",
        fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B21:K22")

    section(ws, 24, 2, 122, "MONTHLY OPERATING EXPENSE PROJECTION")
    month_headers(ws, 25, 26, 27)
    ws.freeze_panes = "C27"
    for i, (cat, t12, method, basis, gtype) in enumerate(EXP_CATS):
        r = 28 + i
        put(ws, f"B{r}", cat, fnt=font(BLACK, False, 9), border=BORDER)
        for j, col in enumerate(MONTH_COLS):
            m = f"{col}$26"
            if method == "Tax Reassessment":
                f = f"={PP}*$G${8+i}*(1+$H${8+i})^(({m}-1)/12)/12"
            elif method == "Management Fee":
                f = f"=$G${8+i}*{ref(REV, col + '27', False)}"
            elif method == "% of EGI":
                f = f"=$G${8+i}*{ref(REV, col + '27', False)}"
            else:
                f = f"=$I${8+i}*(1+$H${8+i})^(({m}-1)/12)/12"
            formula_cell(ws, f"{col}{r}", f, FMT_USD)
    put(ws, "B40", "TOTAL OPERATING EXPENSES", fnt=font(WHITE, True, 9), f=fill(DARK_BLUE), border=BORDER)
    put(ws, "B41", "Expense ratio (% EGI)", fnt=font(NAVY, True, 9), border=BORDER)
    put(ws, "B42", "Expense per unit (annualized)", fnt=font(NAVY, True, 9), border=BORDER)
    put(ws, "B43", "Expense per SF (annualized)", fnt=font(NAVY, True, 9), border=BORDER)
    put(ws, "B44", "Expense growth (Y/Y)", fnt=font(NAVY, True, 9), border=BORDER)
    for i, col in enumerate(MONTH_COLS):
        formula_cell(ws, f"{col}40", f"=SUM({col}28:{col}39)", FMT_USD)
        formula_cell(ws, f"{col}41", f"=IFERROR({col}40/{ref(REV, col + '27', False)},0)", FMT_PCT)
        formula_cell(ws, f"{col}42", f"=IFERROR({col}40*12/{ref(PROP, 'D13')},0)", FMT_USD)
        formula_cell(ws, f"{col}43", f"=IFERROR({col}40*12/{ref(PROP, 'D29')},0)", FMT_USD2)
        if i == 0:
            formula_cell(ws, f"{col}44", '=""', FMT_PCT)
        else:
            prev = MONTH_COLS[i - 1]
            formula_cell(ws, f"{col}44", f"=IFERROR({col}40/{prev}40-1,0)", FMT_PCT)
    put(ws, "DS25", "Total", fnt=font(WHITE, True, 8), f=fill(NAVY))
    for r in range(28, 41):
        formula_cell(ws, f"DS{r}", f"=SUM(C{r}:DR{r})", FMT_USD)
    formula_cell(ws, "DS41", "=IFERROR(DS40/DS27,0)", FMT_PCT)
    formula_cell(ws, "DS42", f"=IFERROR(DS40*12/{ref(PROP, 'D13')},0)", FMT_USD)
    formula_cell(ws, "DS43", f"=IFERROR(DS40*12/{ref(PROP, 'D29')},0)", FMT_USD2)

    section(ws, 46, 2, 13, "ANNUAL SUMMARY")
    put(ws, "B47", "Investment Year", fnt=font(WHITE, True, 8), f=fill(NAVY), border=BORDER)
    for i in range(10):
        col = get_column_letter(3 + i)
        put(ws, f"{col}47", i + 1, "0", fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER)
    for i, (cat, *_rest) in enumerate(EXP_CATS):
        r = 48 + i
        put(ws, f"B{r}", cat, fnt=font(BLACK, False, 9), border=BORDER)
        src = 28 + i
        for j in range(10):
            col = get_column_letter(3 + j)
            formula_cell(ws, f"{col}{r}", f"=SUMIFS($C${src}:$DR${src},$C$26:$DR$26,\">=\"&({col}$47-1)*12+1,$C$26:$DR$26,\"<=\"&{col}$47*12)", FMT_USD)
    put(ws, "B60", "Total operating expenses", fnt=font(WHITE, True, 9), f=fill(DARK_BLUE), border=BORDER)
    put(ws, "B61", "Expense ratio", fnt=font(NAVY, True, 9), border=BORDER)
    put(ws, "B62", "Expense per unit", fnt=font(NAVY, True, 9), border=BORDER)
    put(ws, "B63", "Expense per SF", fnt=font(NAVY, True, 9), border=BORDER)
    for j in range(10):
        col = get_column_letter(3 + j)
        formula_cell(ws, f"{col}60", f"=SUM({col}48:{col}59)", FMT_USD)
        formula_cell(ws, f"{col}61", f"=IFERROR({col}60/{ref(REV, col + '53', False)},0)", FMT_PCT)
        formula_cell(ws, f"{col}62", f"=IFERROR({col}60/{ref(PROP, 'D13')},0)", FMT_USD)
        formula_cell(ws, f"{col}63", f"=IFERROR({col}60/{ref(PROP, 'D29')},0)", FMT_USD2)

    set_widths(ws, {"A": 2, "B": 38, "C": 13, "D": 11, "E": 10, "F": 17, "G": 12, "H": 11,
                    "I": 16, "J": 12, "K": 50, "DS": 13})
    outline_monthly(ws, 25)
    ws.print_area = "A1:DS63"
    ws.print_title_rows = "24:27"
    ws.sheet_view.zoomScale = 80
