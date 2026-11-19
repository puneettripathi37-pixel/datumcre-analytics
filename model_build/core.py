"""Core helpers, constants and input sheets for the acquisition model."""
from __future__ import annotations

import datetime as dt
import os
import sys
from typing import Dict, Optional

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.formatting.rule import ColorScaleRule, FormulaRule
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.chart import BarChart, Reference

sys.path.insert(0, os.path.dirname(__file__))
from engine import Assumptions, UNIT_MIX

# Sheet names
SUMMARY = "Investment Summary"
ASSUMP = "Assumptions & Global Controls"
PROP = "Property Information & Unit Mix"
RR = "Rent Roll"
T12 = "Historical Financials ∕ T-12"
REV = "Revenue Underwriting"
EXP = "Operating Expense Underwriting"
CAPEX = "Capital Expenditure Schedule"
OP = "Monthly Operating Model"
SU = "Acquisition Sources & Uses"
DEBT = "Debt Financing & Amortization"
EXIT = "Exit Valuation"
CF = "Monthly Cash Flow & Returns"
WF = "Equity Waterfall"
SENS = "Sensitivity Analysis"
SCEN = "Scenario Analysis"
IC = "Investment Committee Analysis"
CHK = "Model Checks"

ALL_SHEETS = [SUMMARY, ASSUMP, PROP, RR, T12, REV, EXP, CAPEX, OP, SU, DEBT, EXIT,
              CF, WF, SENS, SCEN, IC, CHK]


def Q(s: str) -> str:
    return "'" + s.replace("'", "''") + "'"


def ref(sheet: str, cell: str, absolute: bool = True) -> str:
    if absolute:
        col = "".join(ch for ch in cell if ch.isalpha())
        row = "".join(ch for ch in cell if ch.isdigit())
        return f"{Q(sheet)}!${col}${row}"
    return f"{Q(sheet)}!{cell}"


# Key assumption references
PP = ref(ASSUMP, "D9")
ACQ_DATE = ref(ASSUMP, "D10")
START_DATE = ref(ASSUMP, "D11")
HOLD = ref(ASSUMP, "D12")
EXIT_MONTH = ref(ASSUMP, "D13")
EXIT_DATE = ref(ASSUMP, "D14")
ACQ_FEE = ref(ASSUMP, "D15")
LEGAL = ref(ASSUMP, "D16")
DD = ref(ASSUMP, "D17")
FIN_FEE = ref(ASSUMP, "D18")
OTHER_TX = ref(ASSUMP, "D19")
WORKING = ref(ASSUMP, "D20")
OP_RES = ref(ASSUMP, "D21")
CLOSING = ref(ASSUMP, "D22")
RENT_GROWTH = ref(ASSUMP, "D27")
MKT_GROWTH = ref(ASSUMP, "D28")
OTHER_GROWTH = ref(ASSUMP, "D29")
VACANCY = ref(ASSUMP, "D30")
CREDIT = ref(ASSUMP, "D31")
BAD = ref(ASSUMP, "D32")
CONC = ref(ASSUMP, "D33")
ECON_OCC = ref(ASSUMP, "D34")
EXP_GROWTH = ref(ASSUMP, "D35")
TAX_GROWTH = ref(ASSUMP, "D36")
INS_GROWTH = ref(ASSUMP, "D37")
MGMT = ref(ASSUMP, "D38")
REPL = ref(ASSUMP, "D39")
LEASEUP = ref(ASSUMP, "D40")
LTL_BURN = ref(ASSUMP, "D41")
RENO_PREM = ref(ASSUMP, "D42")
RENO_UNITS = ref(ASSUMP, "D43")
RENO_COST = ref(ASSUMP, "D44")
RENO_DOWN = ref(ASSUMP, "D45")
RENEWAL = ref(ASSUMP, "D46")
NEWLEASE = ref(ASSUMP, "D47")
TAX_RATE = ref(ASSUMP, "D48")
INS_BASE = ref(ASSUMP, "D49")
LEASING = ref(ASSUMP, "D50")
LTV = ref(ASSUMP, "D54")
TARGET_LTC = ref(ASSUMP, "D55")
INT_RATE = ref(ASSUMP, "D56")
RATE_TYPE = ref(ASSUMP, "D57")
INDEX_RATE = ref(ASSUMP, "D58")
SPREAD = ref(ASSUMP, "D59")
RATE_FLOOR = ref(ASSUMP, "D60")
RATE_CAP = ref(ASSUMP, "D61")
IO = ref(ASSUMP, "D62")
AMORT = ref(ASSUMP, "D63")
TERM = ref(ASSUMP, "D64")
ORIG = ref(ASSUMP, "D65")
EXIT_FIN = ref(ASSUMP, "D66")
REFI_MONTH = ref(ASSUMP, "D67")
REFI_LTV = ref(ASSUMP, "D68")
REFI_RATE = ref(ASSUMP, "D69")
REFI_COST = ref(ASSUMP, "D70")
EXTENSION = ref(ASSUMP, "D71")
PREPAY = ref(ASSUMP, "D72")
EXIT_CAP = ref(ASSUMP, "D76")
SELL = ref(ASSUMP, "D77")
DISP_LEGAL = ref(ASSUMP, "D78")
EXIT_CONV = ref(ASSUMP, "D79")
DIRECT_VAL = ref(ASSUMP, "D80")
PREF = ref(ASSUMP, "D85")
COMPOUND = ref(ASSUMP, "D86")
CATCHUP = ref(ASSUMP, "D87")
LP_SHARE = ref(ASSUMP, "D88")
GP_SHARE = ref(ASSUMP, "D89")
H1 = ref(ASSUMP, "D90")
H2 = ref(ASSUMP, "D91")
H3 = ref(ASSUMP, "D92")
H4 = ref(ASSUMP, "D93")
GP_T1 = ref(ASSUMP, "D94")
GP_T2 = ref(ASSUMP, "D95")
GP_T3 = ref(ASSUMP, "D96")
GP_T4 = ref(ASSUMP, "D97")
GP_CO = ref(ASSUMP, "D98")
TARGET_EM = ref(ASSUMP, "D99")
TARGET_IRR = ref(ASSUMP, "D100")

MONTH_COLS = [get_column_letter(i) for i in range(3, 123)]
MONTHS = len(MONTH_COLS)

# Palette
NAVY = "1F3864"
DARK_BLUE = "17365D"
MID_BLUE = "2F5597"
LIGHT_BLUE = "D9E1F2"
PALE_BLUE = "EEF3FA"
GREY = "D9D9D9"
LIGHT_GREY = "F2F2F2"
YELLOW = "FFF2CC"
GOLD = "BF9000"
GREEN = "008000"
DARK_GREEN = "375623"
RED = "C00000"
WHITE = "FFFFFF"
BLACK = "000000"
ORANGE = "F4B183"
BLUE = "0000FF"

FMT_USD = '$#,##0;[Red]($#,##0);"-"'
FMT_USD2 = '$#,##0.00;[Red]($#,##0.00);"-"'
FMT_PCT = '0.0%;[Red](0.0%);"-"'
FMT_PCT2 = '0.00%;[Red](0.00%);"-"'
FMT_IRR = '0.0%;[Red](0.0%);"-"'
FMT_MULT = '0.00"x";[Red](0.00"x");"-"'
FMT_NUM = '#,##0;[Red](#,##0);"-"'
FMT_DATE = 'mm/dd/yyyy'
FMT_MONTH = 'mmm-yy'
FMT_YEAR = '0'
FMT_TEXT = '@'


def font(color=BLACK, bold=False, size=10, italic=False, name="Calibri"):
    return Font(name=name, size=size, color=color, bold=bold, italic=italic)


def fill(color: str):
    return PatternFill("solid", fgColor=color)


THIN = Side(style="thin", color="BFBFBF")
BORDER = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)


def put(ws, cell: str, value, fmt: Optional[str] = None, f=None, fnt=None,
        align: Optional[str] = None, border=None, wrap: bool = False):
    c = ws[cell]
    c.value = value
    if fnt:
        c.font = fnt
    elif f:
        c.font = f
    if fmt:
        c.number_format = fmt
    if align:
        c.alignment = Alignment(horizontal=align, vertical="center", wrap_text=wrap)
    elif wrap:
        c.alignment = Alignment(vertical="top", wrap_text=True)
    if border:
        c.border = border
    return c


def input_cell(ws, cell: str, value, fmt: Optional[str] = None, note: bool = True):
    c = put(ws, cell, value, fmt, fnt=font(BLUE), border=BORDER)
    c.fill = fill(YELLOW)
    return c


def formula_cell(ws, cell: str, value, fmt: Optional[str] = None):
    return put(ws, cell, value, fmt, fnt=font(BLACK), border=BORDER)


def link_cell(ws, cell: str, value, fmt: Optional[str] = None):
    return put(ws, cell, value, fmt, fnt=font(DARK_GREEN), border=BORDER)


def section(ws, row: int, start_col: int, end_col: int, text: str):
    ws.merge_cells(start_row=row, start_column=start_col, end_row=row, end_column=end_col)
    c = ws.cell(row=row, column=start_col)
    c.value = text
    c.font = font(WHITE, True, 10)
    c.fill = fill(DARK_BLUE)
    c.alignment = Alignment(vertical="center")
    ws.row_dimensions[row].height = 18


def title_block(ws, title: str, subtitle: str, end_col: int = 10):
    ws.merge_cells(start_row=1, start_column=2, end_row=1, end_column=end_col)
    ws.merge_cells(start_row=2, start_column=2, end_row=2, end_column=end_col)
    ws.merge_cells(start_row=3, start_column=2, end_row=3, end_column=end_col)
    c = ws.cell(row=1, column=2, value=title)
    c.font = font(WHITE, True, 16)
    c.fill = fill(DARK_BLUE)
    c.alignment = Alignment(vertical="center")
    ws.row_dimensions[1].height = 28
    c = ws.cell(row=2, column=2, value=subtitle)
    c.font = font(WHITE, False, 10)
    c.fill = fill(MID_BLUE)
    c.alignment = Alignment(vertical="center")
    ws.row_dimensions[2].height = 18
    c = ws.cell(row=3, column=2, value="Illustrative underwriting | USD | Version 1.0 | Prepared 11/17/2026 | Not investment advice")
    c.font = font("7F7F7F", False, 8, True)
    c.alignment = Alignment(vertical="center")


def nav_links(ws, row: int, end_col: int = 14):
    ws.cell(row=row, column=2, value="MODEL MAP:").font = font(NAVY, True, 8)
    links = [("Summary", SUMMARY), ("Assumptions", ASSUMP), ("Property", PROP), ("Rent Roll", RR),
             ("T-12", T12), ("Revenue", REV), ("Expenses", EXP), ("Capex", CAPEX),
             ("Operations", OP), ("Sources/Uses", SU), ("Debt", DEBT), ("Exit", EXIT),
             ("Cash Flow", CF), ("Waterfall", WF), ("Sensitivity", SENS), ("Scenarios", SCEN),
             ("IC Memo", IC), ("Checks", CHK)]
    c0 = 3
    for i, (label, sh) in enumerate(links[:9]):
        cell = ws.cell(row=row, column=c0 + i, value=label)
        cell.hyperlink = f"#'{sh}'!A1"
        cell.font = font(MID_BLUE, False, 8, True)
        cell.alignment = Alignment(horizontal="left")
    for i, (label, sh) in enumerate(links[9:]):
        cell = ws.cell(row=row + 1, column=c0 + i, value=label)
        cell.hyperlink = f"#'{sh}'!A1"
        cell.font = font(MID_BLUE, False, 8, True)
        cell.alignment = Alignment(horizontal="left")
    ws.row_dimensions[row].height = 13
    ws.row_dimensions[row + 1].height = 13


def setup_sheet(wb, name: str, tab_color: str, gridlines: bool = True, landscape: bool = True):
    ws = wb.create_sheet(name)
    ws.sheet_properties.tabColor = tab_color
    ws.sheet_view.showGridLines = gridlines
    ws.page_setup.orientation = "landscape" if landscape else "portrait"
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 0
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.print_options.horizontalCentered = True
    ws.oddFooter.center.text = "Illustrative - Not investment advice | &A | Page &P of &N"
    ws.oddFooter.center.size = 8
    ws.oddFooter.center.color = "808080"
    ws.oddHeader.right.text = "Cedar Ridge Apartments | v1.0 | 11/17/2026"
    ws.oddHeader.right.size = 8
    ws.oddHeader.right.color = "808080"
    return ws


def set_widths(ws, widths: Dict[str, float]):
    for col, w in widths.items():
        ws.column_dimensions[col].width = w


def outline_monthly(ws, header_row: int, first_col: int = 3, last_col: int = 122):
    for c in range(first_col, last_col + 1):
        ws.column_dimensions[get_column_letter(c)].width = 10.5


def month_headers(ws, date_row: int, month_row: int, year_row: Optional[int] = None):
    put(ws, f"B{date_row}", "Date", fnt=font(WHITE, True, 9), f=fill(NAVY), align="center", border=BORDER)
    put(ws, f"B{month_row}", "Month", fnt=font(WHITE, True, 9), f=fill(NAVY), align="center", border=BORDER)
    if year_row:
        put(ws, f"B{year_row}", "Year", fnt=font(WHITE, True, 9), f=fill(NAVY), align="center", border=BORDER)
    for i, col in enumerate(MONTH_COLS):
        if i == 0:
            f_date = f"={START_DATE}"
            f_month = "=1"
        else:
            prev = MONTH_COLS[i - 1]
            f_date = f"=EDATE({prev}{date_row},1)"
            f_month = f"={prev}{month_row}+1"
        f_year = f"=YEAR({col}{date_row})"
        put(ws, f"{col}{date_row}", f_date, FMT_MONTH, fnt=font(WHITE, True, 8), f=fill(MID_BLUE), align="center", border=BORDER)
        put(ws, f"{col}{month_row}", f_month, FMT_NUM, fnt=font(WHITE, True, 8), f=fill(MID_BLUE), align="center", border=BORDER)
        if year_row:
            put(ws, f"{col}{year_row}", f_year, FMT_YEAR, fnt=font(WHITE, True, 8), f=fill(MID_BLUE), align="center", border=BORDER)


# Assumption row map
A_ROWS = {
    "pp": 9, "acq_date": 10, "start": 11, "hold": 12, "exit_month": 13, "exit_date": 14,
    "acq_fee": 15, "legal": 16, "dd": 17, "fin_fee": 18, "other_tx": 19, "working": 20,
    "op_res": 21, "closing": 22,
    "rent_growth": 27, "mkt_growth": 28, "other_growth": 29, "vacancy": 30, "credit": 31,
    "bad": 32, "conc": 33, "econ_occ": 34, "exp_growth": 35, "tax_growth": 36,
    "ins_growth": 37, "mgmt": 38, "repl": 39, "leaseup": 40, "ltl_burn": 41,
    "reno_prem": 42, "reno_units": 43, "reno_cost": 44, "reno_down": 45,
    "renewal": 46, "newlease": 47, "tax_rate": 48, "ins_base": 49, "leasing": 50,
    "ltv": 54, "target_ltc": 55, "rate": 56, "rate_type": 57, "index": 58, "spread": 59,
    "floor": 60, "cap": 61, "io": 62, "amort": 63, "term": 64, "orig": 65,
    "exit_fin": 66, "refi_month": 67, "refi_ltv": 68, "refi_rate": 69,
    "refi_cost": 70, "extension": 71, "prepay": 72,
    "exit_cap": 76, "sell": 77, "disp_legal": 78, "exit_conv": 79, "direct_val": 80,
    "exit_month_link": 81, "exit_year": 82,
    "pref": 85, "compounding": 86, "catchup": 87, "lp_share": 88, "gp_share": 89,
    "h1": 90, "h2": 91, "h3": 92, "h4": 93, "gp_t1": 94, "gp_t2": 95,
    "gp_t3": 96, "gp_t4": 97, "gp_co": 98, "target_em": 99, "target_irr": 100,
}


SCENARIO_DATA = {
    "pp": (35_000_000, 33_250_000, 36_750_000, FMT_USD, "Purchase price"),
    "acq_date": (dt.date(2027, 1, 1), dt.date(2027, 1, 1), dt.date(2027, 1, 1), FMT_DATE, "Acquisition / closing date"),
    "start": (dt.date(2027, 1, 1), dt.date(2027, 1, 1), dt.date(2027, 1, 1), FMT_DATE, "Investment start date"),
    "hold": (5, 5, 5, "0", "Holding period (years)"),
    "acq_fee": (0.010, 0.010, 0.010, FMT_PCT2, "Acquisition fee (% of purchase price)"),
    "legal": (250_000, 250_000, 300_000, FMT_USD, "Legal expenses"),
    "dd": (150_000, 150_000, 175_000, FMT_USD, "Due diligence expenses"),
    "fin_fee": (0.010, 0.010, 0.010, FMT_PCT2, "Financing fees (% of loan)"),
    "other_tx": (100_000, 100_000, 125_000, FMT_USD, "Other transaction expenses"),
    "working": (250_000, 250_000, 250_000, FMT_USD, "Initial working capital"),
    "op_res": (150_000, 150_000, 150_000, FMT_USD, "Initial operating reserves"),
    "closing": (0.005, 0.005, 0.005, FMT_PCT2, "Closing costs (% of purchase price)"),
    "rent_growth": (0.030, 0.040, 0.020, FMT_PCT2, "Annual rental growth"),
    "mkt_growth": (0.030, 0.040, 0.020, FMT_PCT2, "Market rent growth"),
    "other_growth": (0.030, 0.035, 0.020, FMT_PCT2, "Other income growth"),
    "vacancy": (0.050, 0.040, 0.070, FMT_PCT2, "Stabilized physical vacancy"),
    "credit": (0.0025, 0.0015, 0.0050, FMT_PCT2, "Credit loss (% of net rental)"),
    "bad": (0.0050, 0.0025, 0.0075, FMT_PCT2, "Bad debt (% of net rental)"),
    "conc": (0.0100, 0.0050, 0.0150, FMT_PCT2, "Concessions (% of occupied rent)"),
    "exp_growth": (0.030, 0.025, 0.035, FMT_PCT2, "Annual operating expense growth"),
    "tax_growth": (0.030, 0.030, 0.035, FMT_PCT2, "Property tax growth"),
    "ins_growth": (0.030, 0.025, 0.040, FMT_PCT2, "Insurance growth"),
    "mgmt": (0.030, 0.030, 0.030, FMT_PCT2, "Management fee (% of EGI)"),
    "repl": (300, 300, 350, FMT_USD, "Replacement reserve per unit per year"),
    "leaseup": (12, 9, 18, "0", "Lease-up period (months)"),
    "ltl_burn": (12, 9, 18, "0", "Loss-to-lease burn-off (months)"),
    "reno_prem": (150, 175, 125, FMT_USD, "Renovation rent premium per unit / month"),
    "reno_units": (10, 12, 8, "0", "Renovation units completed per month"),
    "reno_cost": (12_500, 11_500, 14_000, FMT_USD, "Renovation cost per unit"),
    "reno_down": (0.50, 0.35, 0.65, FMT_PCT, "Renovation downtime factor"),
    "renewal": (0.030, 0.035, 0.020, FMT_PCT2, "Renewal rent growth"),
    "newlease": (0.030, 0.040, 0.020, FMT_PCT2, "New lease rent growth"),
    "tax_rate": (0.0175, 0.0175, 0.0190, FMT_PCT2, "Property tax / reassessment rate (% of price)"),
    "ins_base": (220_000, 220_000, 250_000, FMT_USD, "Insurance annual base"),
    "leasing": (0.005, 0.005, 0.0075, FMT_PCT2, "Leasing costs (% of EGI)"),
    "ltv": (0.650, 0.650, 0.600, FMT_PCT, "Initial loan-to-value"),
    "target_ltc": (0.700, 0.700, 0.650, FMT_PCT, "Target loan-to-cost (informational)"),
    "rate": (0.0650, 0.0600, 0.0725, FMT_PCT2, "Interest rate"),
    "rate_type": ("Fixed", "Fixed", "Fixed", FMT_TEXT, "Rate type (Fixed / Floating)"),
    "index": (0.0450, 0.0425, 0.0525, FMT_PCT2, "Index rate (floating)"),
    "spread": (0.0200, 0.0175, 0.0225, FMT_PCT2, "Spread (floating)"),
    "floor": (0.0000, 0.0000, 0.0000, FMT_PCT2, "Interest rate floor"),
    "cap": (0.0000, 0.0000, 0.0800, FMT_PCT2, "Interest rate cap (0 = none)"),
    "io": (24, 24, 18, "0", "Interest-only period (months)"),
    "amort": (30, 30, 30, "0", "Amortization period (years)"),
    "term": (5, 5, 5, "0", "Loan term (years)"),
    "orig": (0.010, 0.010, 0.0125, FMT_PCT2, "Origination fee (% of loan)"),
    "exit_fin": (0.005, 0.005, 0.0075, FMT_PCT2, "Exit / payoff cost (% of loan)"),
    "refi_month": (0, 0, 0, "0", "Refinance month (0 = none)"),
    "refi_ltv": (0.650, 0.650, 0.600, FMT_PCT, "Refinance LTV"),
    "refi_rate": (0.0600, 0.0550, 0.0675, FMT_PCT2, "Refinance interest rate"),
    "refi_cost": (0.010, 0.010, 0.0125, FMT_PCT2, "Refinance costs (% of new loan)"),
    "extension": ("Yes", "Yes", "Yes", FMT_TEXT, "Loan extension option"),
    "prepay": (0.000, 0.000, 0.005, FMT_PCT2, "Prepayment penalty (% of loan)"),
    "exit_cap": (0.0575, 0.0525, 0.0625, FMT_PCT2, "Exit capitalization rate"),
    "sell": (0.020, 0.020, 0.025, FMT_PCT2, "Selling costs (% of gross value)"),
    "disp_legal": (75_000, 75_000, 100_000, FMT_USD, "Disposition legal expenses"),
    "exit_conv": ("Forward 12-Month", "Forward 12-Month", "Trailing 12-Month", FMT_TEXT, "Exit NOI convention"),
    "direct_val": (40_000_000, 40_000_000, 40_000_000, FMT_USD, "Direct exit value (alternative method)"),
    "pref": (0.080, 0.080, 0.080, FMT_PCT2, "LP preferred return"),
    "compounding": ("Compounded", "Compounded", "Compounded", FMT_TEXT, "Preferred return compounding"),
    "catchup": (1.000, 1.000, 1.000, FMT_PCT, "GP catch-up (% of target)"),
    "lp_share": (0.700, 0.700, 0.700, FMT_PCT, "LP residual profit share"),
    "gp_share": (0.300, 0.300, 0.300, FMT_PCT, "GP promote / residual share"),
    "h1": (0.120, 0.120, 0.120, FMT_PCT, "Target IRR hurdle 1"),
    "h2": (0.150, 0.150, 0.150, FMT_PCT, "Target IRR hurdle 2"),
    "h3": (0.180, 0.180, 0.180, FMT_PCT, "Target IRR hurdle 3"),
    "h4": (0.200, 0.200, 0.200, FMT_PCT, "Target IRR hurdle 4"),
    "gp_t1": (0.300, 0.300, 0.300, FMT_PCT, "GP promote tier 1 (to hurdle 1)"),
    "gp_t2": (0.350, 0.350, 0.350, FMT_PCT, "GP promote tier 2 (to hurdle 2)"),
    "gp_t3": (0.400, 0.400, 0.400, FMT_PCT, "GP promote tier 3 (to hurdle 3)"),
    "gp_t4": (0.450, 0.450, 0.450, FMT_PCT, "GP promote tier 4 (above hurdle 3)"),
    "gp_co": (0.050, 0.050, 0.050, FMT_PCT, "GP co-invest (% of equity)"),
    "target_em": (2.00, 2.20, 1.75, FMT_MULT, "Target equity multiple"),
    "target_irr": (0.150, 0.175, 0.125, FMT_PCT, "Target net IRR"),
}


def build_assumptions(wb) -> None:
    ws = setup_sheet(wb, ASSUMP, NAVY, gridlines=False)
    title_block(ws, "Assumptions & Global Controls", "Central underwriting assumptions | Scenario selector drives the entire model", 10)
    nav_links(ws, 4)
    put(ws, "B6", "ACTIVE SCENARIO (1 = Base, 2 = Upside, 3 = Downside)", fnt=font(WHITE, True, 9), f=fill(DARK_BLUE))
    input_cell(ws, "C6", 1, "0")
    put(ws, "D6", '=CHOOSE($C$6,"Base Case","Upside Case","Downside Case")', fnt=font(BLACK, True, 11), border=BORDER)
    put(ws, "E6", "Data validation limits entry to 1, 2 or 3. Base case is the default. Sensitivity and scenario tables are recalculated by Excel when inputs change (press F9).",
        fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("E6:J6")
    ws.row_dimensions[6].height = 28
    dv = DataValidation(type="list", formula1='"1,2,3"', allow_blank=False,
                        showDropDown=False, error="Enter 1 (Base), 2 (Upside) or 3 (Downside).",
                        errorTitle="Scenario selector", prompt="1 = Base; 2 = Upside; 3 = Downside",
                        promptTitle="Scenario")
    ws.add_data_validation(dv)
    dv.add("C6")


    section(ws, 7, 2, 10, "TRANSACTION & TIMING")
    section(ws, 25, 2, 10, "OPERATING ASSUMPTIONS")
    section(ws, 52, 2, 10, "FINANCING ASSUMPTIONS")
    section(ws, 74, 2, 10, "EXIT ASSUMPTIONS")
    section(ws, 83, 2, 10, "INVESTMENT & WATERFALL")
    for col, txt in [("B", "Assumption"), ("C", "Unit"), ("D", "Active"), ("E", "Driver"),
                     ("F", "Base"), ("G", "Upside"), ("H", "Downside"), ("I", "Notes")]:
        put(ws, f"{col}8", txt, fnt=font(WHITE, True, 9), f=fill(MID_BLUE), align="center", border=BORDER)

    units = {
        "pp": "$", "acq_date": "date", "start": "date", "hold": "yrs", "acq_fee": "% PP", "legal": "$", "dd": "$",
        "fin_fee": "% loan", "other_tx": "$", "working": "$", "op_res": "$", "closing": "% PP",
        "rent_growth": "%", "mkt_growth": "%", "other_growth": "%", "vacancy": "%", "credit": "%", "bad": "%",
        "conc": "%", "exp_growth": "%", "tax_growth": "%", "ins_growth": "%", "mgmt": "% EGI", "repl": "$/unit/yr",
        "leaseup": "mos", "ltl_burn": "mos", "reno_prem": "$/unit/mo", "reno_units": "units/mo",
        "reno_cost": "$/unit", "reno_down": "%", "renewal": "%", "newlease": "%", "tax_rate": "% price",
        "ins_base": "$/yr", "leasing": "% EGI", "ltv": "%", "target_ltc": "%", "rate": "%", "rate_type": "text", "index": "%",
        "spread": "%", "floor": "%", "cap": "%", "io": "mos", "amort": "yrs", "term": "yrs", "orig": "% loan",
        "exit_fin": "% loan", "refi_month": "month", "refi_ltv": "%", "refi_rate": "%", "refi_cost": "%",
        "extension": "Y/N", "prepay": "%", "exit_cap": "%", "sell": "%", "disp_legal": "$", "exit_conv": "text",
        "direct_val": "$", "pref": "%", "compounding": "text", "catchup": "%", "lp_share": "%", "gp_share": "%",
        "h1": "%", "h2": "%", "h3": "%", "h4": "%", "gp_t1": "%", "gp_t2": "%", "gp_t3": "%", "gp_t4": "%",
        "gp_co": "%", "target_em": "x", "target_irr": "%",
    }
    for key, (b, u, d, fmt, lab) in SCENARIO_DATA.items():
        r = A_ROWS[key]
        put(ws, f"B{r}", lab, fnt=font(BLACK, False, 9))
        put(ws, f"C{r}", units.get(key, ""), fnt=font("7F7F7F", False, 8), align="center")
        put(ws, f"D{r}", f"=CHOOSE($C$6,F{r},G{r},H{r})", fmt, fnt=font(BLACK), border=BORDER)
        input_cell(ws, f"F{r}", b, fmt)
        input_cell(ws, f"G{r}", u, fmt)
        input_cell(ws, f"H{r}", d, fmt)

    formula_cell(ws, "D13", "=$D$12*12", "0")
    formula_cell(ws, "D14", "=EDATE($D$11,$D$13)-1", FMT_DATE)
    formula_cell(ws, "D34", "=1-$D$30-$D$31-$D$32-$D$33", FMT_PCT)
    formula_cell(ws, "D81", "=$D$13", "0")
    formula_cell(ws, "D82", "=YEAR($D$14)", "0")
    notes = {
        "pp": "Illustrative purchase price; not a market quotation.",
        "hold": "Drives exit month, sale timing and debt payoff. Projection engine runs 120 months.",
        "rent_growth": "Applied to market rent, compounded monthly from the investment start date.",
        "vacancy": "Stabilized physical vacancy. Underwritten occupancy ramps from current occupancy.",
        "tax_rate": "Illustrative reassessment: purchase price x tax rate, grown annually.",
        "exit_cap": "Exit value = selected NOI / exit cap (unless Direct Value is selected).",
        "pref": "LP preferred return accrues monthly on unreturned capital; compounding toggle above.",
        "catchup": "100% GP catch-up to target promote share of profit after return of capital and pref.",
        "h1": "IRR hurdles are converted to equivalent multiple thresholds for monthly waterfall tiers.",
    }
    for key, note in notes.items():
        r = A_ROWS[key]
        put(ws, f"I{r}", note, fnt=font("7F7F7F", False, 7, True), wrap=True)
    dv_rate = DataValidation(type="list", formula1='"Fixed,Floating"', allow_blank=False)
    dv_comp = DataValidation(type="list", formula1='"Simple,Compounded"', allow_blank=False)
    dv_ext = DataValidation(type="list", formula1='"Yes,No"', allow_blank=False)
    dv_conv = DataValidation(type="list", formula1='"Forward 12-Month,Trailing 12-Month,Direct Value"', allow_blank=False)
    for dv_ in (dv_rate, dv_comp, dv_ext, dv_conv):
        ws.add_data_validation(dv_)
    dv_rate.add(f"F{A_ROWS['rate_type']}:H{A_ROWS['rate_type']}")
    dv_comp.add(f"F{A_ROWS['compounding']}:H{A_ROWS['compounding']}")
    dv_ext.add(f"F{A_ROWS['extension']}:H{A_ROWS['extension']}")
    dv_conv.add(f"F{A_ROWS['exit_conv']}:H{A_ROWS['exit_conv']}")

    put(ws, "B24", "Model convention: monthly periods, first day of month; interest calculated Actual/365. Revenue and expenses are underwritten monthly; annual summaries are derived.",
        fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B24:J24")
    ws.row_dimensions[24].height = 26
    put(ws, "B51", "Capex is funded at closing through a renovation & capex reserve in Sources & Uses. Reserve draws are shown below NOI; unused reserve is returned at exit.",
        fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B51:J51")
    ws.row_dimensions[51].height = 26
    put(ws, "B73", "Refinance input is optional (0 = none). Floating-rate loans use MAX(floor, index + spread), capped if a cap is entered.",
        fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B73:J73")
    ws.row_dimensions[73].height = 24
    put(ws, "B102", "Scenario cells in columns F:H are the only editable values on this page. Column D is formula-driven by the scenario selector. Blue font = input; black = same-sheet formula; green = link from another sheet.",
        fnt=font("595959", False, 8, True), wrap=True)
    ws.merge_cells("B102:J102")
    ws.row_dimensions[102].height = 26

    set_widths(ws, {"A": 2.5, "B": 46, "C": 12, "D": 14, "E": 12, "F": 14, "G": 14, "H": 14, "I": 62, "J": 2})
    ws.freeze_panes = "B9"
    ws.print_area = "A1:J102"
    for col in "KLMNOPQRSTUVWXYZ":
        ws.column_dimensions[col].hidden = True
    for r in range(200, 460):
        ws.row_dimensions[r].hidden = True
    ws.sheet_view.zoomScale = 95


def build_property(wb) -> None:
    ws = setup_sheet(wb, PROP, MID_BLUE, gridlines=False)
    title_block(ws, "Property Information & Unit Mix", "Property profile, unit mix, in-place rents and market rent comparison", 16)
    nav_links(ws, 4)
    section(ws, 7, 2, 10, "PROPERTY PROFILE")
    fields = [
        ("Property name", "Cedar Ridge Apartments", FMT_TEXT),
        ("Address", "1450 Cedar Ridge Drive", FMT_TEXT),
        ("Market", "Austin", FMT_TEXT),
        ("State", "TX", FMT_TEXT),
        ("Property type", "Multifamily", FMT_TEXT),
        ("Number of units", "=SUM(C22:C26)", "0"),
        ("Year built", 2002, "0"),
        ("Year renovated", 2018, "0"),
        ("Average unit size (SF)", "=SUMPRODUCT(C22:C26,D22:D26)/C27", "#,##0"),
        ("Current physical occupancy", f"={ref(RR, 'D9')}", FMT_PCT),
        ("Underwritten stabilized occupancy", f"=1-{VACANCY}", FMT_PCT),
        ("Acquisition date", f"={ACQ_DATE}", FMT_DATE),
        ("Exit date", f"={EXIT_DATE}", FMT_DATE),
        ("Investment holding period (years)", f"={HOLD}", "0"),
    ]
    for i, (lab, val, fmt) in enumerate(fields):
        r = 8 + i
        put(ws, f"B{r}", lab, fnt=font(BLACK, False, 9))
        if isinstance(val, str) and val.startswith("="):
            if "!" in val:
                link_cell(ws, f"D{r}", val, fmt)
            else:
                formula_cell(ws, f"D{r}", val, fmt)
        else:
            input_cell(ws, f"D{r}", val, fmt)
    put(ws, "F8", "Property description", fnt=font(NAVY, True, 9))
    put(ws, "F9", "Garden-style, 250-unit multifamily community located in a top-tier Sun Belt MSA. Illustrative asset; no representation is made that the property or market data are real.", fnt=font(BLACK, False, 8), wrap=True)
    ws.merge_cells("F9:J14")
    put(ws, "F16", "Acquisition strategy", fnt=font(NAVY, True, 9))
    put(ws, "F17", "Acquire below replacement cost, complete a phased interior and common-area renovation program, burn off loss-to-lease, and stabilize occupancy at 95%.", fnt=font(BLACK, False, 8), wrap=True)
    ws.merge_cells("F17:J20")

    section(ws, 20, 2, 16, "UNIT MIX & RENT SCHEDULE")
    headers = ["Unit Type", "Units", "Avg SF", "Current Monthly Rent", "Current Rent/SF", "Market Rent",
               "Market Rent/SF", "Occupied Units", "Vacant Units", "Economic Occupancy", "Monthly Potential Rent",
               "Annual Potential Rent", "Monthly Market Rent", "Annual Market Rent", "Premium / (Discount) to Market"]
    for j, h in enumerate(headers):
        col = get_column_letter(2 + j)
        put(ws, f"{col}21", h, fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER, wrap=True)
    ws.row_dimensions[21].height = 32
    for i, (ut, n, sf, cur, mkt) in enumerate(UNIT_MIX):
        r = 22 + i
        put(ws, f"B{r}", ut, fnt=font(BLACK, False, 9), border=BORDER)
        input_cell(ws, f"C{r}", n, "0")
        input_cell(ws, f"D{r}", sf, "#,##0")
        input_cell(ws, f"E{r}", cur, FMT_USD)
        formula_cell(ws, f"F{r}", f"=IFERROR(E{r}/D{r},0)", FMT_USD2)
        input_cell(ws, f"G{r}", mkt, FMT_USD)
        formula_cell(ws, f"H{r}", f"=IFERROR(G{r}/D{r},0)", FMT_USD2)
        formula_cell(ws, f"I{r}", f"=COUNTIFS({Q(RR)}!$B$32:$B$281,B{r},{Q(RR)}!$F$32:$F$281,\"Occupied\")", "0")
        formula_cell(ws, f"J{r}", f"=C{r}-I{r}", "0")
        formula_cell(ws, f"K{r}", f"=IFERROR(I{r}/C{r},0)", FMT_PCT)
        formula_cell(ws, f"L{r}", f"=C{r}*E{r}", FMT_USD)
        formula_cell(ws, f"M{r}", f"=L{r}*12", FMT_USD)
        formula_cell(ws, f"N{r}", f"=C{r}*G{r}", FMT_USD)
        formula_cell(ws, f"O{r}", f"=N{r}*12", FMT_USD)
        formula_cell(ws, f"P{r}", f"=IFERROR(E{r}/G{r}-1,0)", FMT_PCT)
    r = 27
    put(ws, f"B{r}", "Total / weighted average", fnt=font(WHITE, True, 9), f=fill(MID_BLUE), border=BORDER)
    for col in ["C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"]:
        put(ws, f"{col}{r}", None, fnt=font(WHITE, True, 9), f=fill(MID_BLUE), border=BORDER)
    formula_cell(ws, f"C{r}", "=SUM(C22:C26)", "0")
    formula_cell(ws, f"D{r}", "=SUMPRODUCT(C22:C26,D22:D26)/C27", "#,##0")
    formula_cell(ws, f"E{r}", "=SUMPRODUCT(C22:C26,E22:E26)/C27", FMT_USD)
    formula_cell(ws, f"F{r}", "=IFERROR(E27/D27,0)", FMT_USD2)
    formula_cell(ws, f"G{r}", "=SUMPRODUCT(C22:C26,G22:G26)/C27", FMT_USD)
    formula_cell(ws, f"H{r}", "=IFERROR(G27/D27,0)", FMT_USD2)
    formula_cell(ws, f"I{r}", "=SUM(I22:I26)", "0")
    formula_cell(ws, f"J{r}", "=SUM(J22:J26)", "0")
    formula_cell(ws, f"K{r}", "=IFERROR(I27/C27,0)", FMT_PCT)
    formula_cell(ws, f"L{r}", "=SUM(L22:L26)", FMT_USD)
    formula_cell(ws, f"M{r}", "=SUM(M22:M26)", FMT_USD)
    formula_cell(ws, f"N{r}", "=SUM(N22:N26)", FMT_USD)
    formula_cell(ws, f"O{r}", "=SUM(O22:O26)", FMT_USD)
    formula_cell(ws, f"P{r}", "=IFERROR(E27/G27-1,0)", FMT_PCT)

    put(ws, "B29", "Total rentable SF", fnt=font(NAVY, True, 9))
    formula_cell(ws, "D29", "=SUMPRODUCT(C22:C26,D22:D26)", "#,##0")
    put(ws, "B30", "Unit mix count reconciliation", fnt=font(NAVY, True, 9))
    formula_cell(ws, "D30", "=IF(SUM(C22:C26)=250,\"PASS\",\"FAIL\")", FMT_TEXT)
    put(ws, "B31", "Weighted average in-place rent vs market", fnt=font(NAVY, True, 9))
    formula_cell(ws, "D31", "=E27/G27-1", FMT_PCT)
    put(ws, "B32", "Annualized current rent at 100% occupancy", fnt=font(NAVY, True, 9))
    formula_cell(ws, "D32", "=M27", FMT_USD)
    put(ws, "B33", "Annualized market rent at 100% occupancy", fnt=font(NAVY, True, 9))
    formula_cell(ws, "D33", "=O27", FMT_USD)

    set_widths(ws, {"A": 2.5, "B": 27, "C": 9, "D": 10, "E": 13, "F": 12, "G": 12, "H": 12,
                    "I": 10, "J": 10, "K": 11, "L": 14, "M": 14, "N": 14, "O": 14, "P": 13})
    ws.freeze_panes = "B8"
    ws.print_area = "A1:P36"
    ws.sheet_view.zoomScale = 90


def build_rent_roll(wb, rr) -> None:
    ws = setup_sheet(wb, RR, MID_BLUE, gridlines=True)
    title_block(ws, "Rent Roll", "Unit-level rent roll as of the acquisition date | Illustrative data; not a real rent roll", 16)
    section(ws, 5, 2, 16, "PORTFOLIO SUMMARY")
    summary = [
        ("Occupied units", "=COUNTIF(F32:F281,\"Occupied\")", "0"),
        ("Vacant units", "=COUNTIF(F32:F281,\"Vacant\")", "0"),
        ("Total units", "=COUNTA(A32:A281)", "0"),
        ("Physical occupancy", "=IFERROR(D6/D8,0)", FMT_PCT),
        ("Weighted average in-place rent", "=IFERROR(SUMIF(F32:F281,\"Occupied\",G32:G281)/D6,0)", FMT_USD2),
        ("Weighted average market rent", "=AVERAGE(H32:H281)", FMT_USD2),
        ("Weighted average lease term (months)", "=IFERROR(AVERAGEIF(F32:F281,\"Occupied\",N32:N281),0)", "0.0"),
        ("Monthly in-place rental revenue", "=SUM(G32:G281)", FMT_USD),
        ("Monthly market rent (all units)", "=SUM(H32:H281)", FMT_USD),
        ("In-place rent vs. market", "=IFERROR(D10/D11-1,0)", FMT_PCT),
        ("Monthly other charges", "=SUM(I32:I281)", FMT_USD),
        ("Monthly concessions", "=SUM(J32:J281)", FMT_USD),
        ("Total rentable SF", "=SUM(C32:C281)", "#,##0"),
        ("Average unit size (SF)", "=IFERROR(D18/D8,0)", "#,##0"),
    ]
    for i, (lab, formula, fmt) in enumerate(summary):
        r = 6 + i
        put(ws, f"B{r}", lab, fnt=font(BLACK, False, 9))
        formula_cell(ws, f"D{r}", formula, fmt)
    nav_links(ws, 29, 16)
    put(ws, "R5", "LEASE EXPIRATIONS BY MONTH", fnt=font(WHITE, True, 9), f=fill(DARK_BLUE), border=BORDER)
    put(ws, "R6", "Month", fnt=font(WHITE, True, 8), f=fill(NAVY), border=BORDER, align="center")
    put(ws, "S6", "Expiring Leases", fnt=font(WHITE, True, 8), f=fill(NAVY), border=BORDER, align="center")
    put(ws, "T6", "% of Units", fnt=font(WHITE, True, 8), f=fill(NAVY), border=BORDER, align="center")
    for i in range(23):
        r = 7 + i
        if i == 0:
            fdt = "=EOMONTH(" + ACQ_DATE + ",0)"
        else:
            fdt = f"=EOMONTH(R{r-1},1)"
        formula_cell(ws, f"R{r}", fdt, FMT_MONTH)
        formula_cell(ws, f"S{r}", f"=COUNTIFS($E$32:$E$281,\">=\"&EOMONTH(R{r},-1)+1,$E$32:$E$281,\"<=\"&R{r})", "0")
        formula_cell(ws, f"T{r}", f"=IFERROR(S{r}/$D$8,0)", FMT_PCT)
    headers = ["Unit #", "Unit Type", "Square Feet", "Lease Start", "Lease Expiration", "Occupancy Status",
               "Current Monthly Rent", "Market Monthly Rent", "Other Monthly Charges", "Concessions",
               "Monthly Effective Rent", "Annualized Rent", "Rent / SF", "Lease Remaining Months",
               "Renewal Status", "Month-to-Month"]
    for j, h in enumerate(headers):
        col = get_column_letter(1 + j)
        put(ws, f"{col}31", h, fnt=font(WHITE, True, 8), f=fill(NAVY), align="center", border=BORDER, wrap=True)
    ws.row_dimensions[31].height = 30
    for i, u in enumerate(rr.units):
        r = 32 + i
        input_cell(ws, f"A{r}", u.unit_no, FMT_TEXT)
        input_cell(ws, f"B{r}", u.unit_type, FMT_TEXT)
        input_cell(ws, f"C{r}", u.sf, "#,##0")
        if u.lease_start:
            input_cell(ws, f"D{r}", u.lease_start, FMT_DATE)
            input_cell(ws, f"E{r}", u.lease_exp, FMT_DATE)
        else:
            input_cell(ws, f"D{r}", None, FMT_DATE)
            input_cell(ws, f"E{r}", None, FMT_DATE)
        input_cell(ws, f"F{r}", u.status, FMT_TEXT)
        input_cell(ws, f"G{r}", u.current_rent, FMT_USD)
        input_cell(ws, f"H{r}", u.market_rent, FMT_USD)
        input_cell(ws, f"I{r}", u.other_charges, FMT_USD)
        input_cell(ws, f"J{r}", u.concessions, FMT_USD)
        formula_cell(ws, f"K{r}", f"=G{r}+I{r}-J{r}", FMT_USD)
        formula_cell(ws, f"L{r}", f"=K{r}*12", FMT_USD)
        formula_cell(ws, f"M{r}", f"=IFERROR(G{r}/C{r},0)", FMT_USD2)
        formula_cell(ws, f"N{r}", f"=IF(F{r}=\"Vacant\",0,IF(E{r}<{ACQ_DATE},0,MAX(0,DATEDIF({ACQ_DATE},E{r},\"m\"))))", "0")
        formula_cell(ws, f"O{r}", f"=IF(F{r}=\"Vacant\",\"Vacant\",IF(N{r}<=0,\"MTM\",IF(N{r}<=6,\"Renewal\",\"Not Expiring\")))", FMT_TEXT)
        formula_cell(ws, f"P{r}", f"=IF(O{r}=\"MTM\",\"Yes\",\"No\")", FMT_TEXT)
    last = 281
    for r in range(32, last + 1):
        for c in range(1, 17):
            ws.cell(row=r, column=c).border = BORDER
            ws.cell(row=r, column=c).font = Font(name="Calibri", size=8, color=BLUE if c in (1,2,3,4,5,6,7,8,9,10) else BLACK)
    ws.auto_filter.ref = f"A31:P{last}"
    ws.freeze_panes = "A32"
    set_widths(ws, {"A": 8, "B": 22, "C": 9, "D": 11, "E": 12, "F": 12, "G": 12, "H": 12,
                    "I": 11, "J": 10, "K": 12, "L": 12, "M": 10, "N": 10, "O": 13, "P": 10})
    ws.print_title_rows = "31:31"
    ws.print_area = "A1:P281"
    ws.sheet_view.zoomScale = 85
