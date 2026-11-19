"""Build the Cedar Ridge multifamily acquisition model workbook."""
from __future__ import annotations

import sys
sys.stdout.reconfigure(encoding="utf-8")

import os
import re
import shutil
import sys
import zipfile
from dataclasses import replace

sys.path.insert(0, os.path.dirname(__file__))

from openpyxl import Workbook
from openpyxl.workbook.defined_name import DefinedName

from core import *
from engine import Assumptions, run_model
from sheets2 import build_t12, build_revenue, build_expenses
from sheets3 import build_capex, build_op_model
from sheets4 import (build_sources_uses, build_debt, build_exit,
                     build_cash_flow, build_waterfall)
from sheets5 import (build_summary, build_sensitivity, build_scenario,
                     build_ic, build_checks, build_data_tables,
                     cached_scenarios, SCEN_FIELDS)

OUT = os.path.join(os.path.dirname(os.path.dirname(__file__)), "output")
os.makedirs(OUT, exist_ok=True)
FILE = os.path.join(OUT, "Cedar_Ridge_Multifamily_Acquisition_Model.xlsx")

PRICES = [32_500_000, 33_750_000, 35_000_000, 36_250_000, 37_500_000]
CAPS = [0.0500, 0.0525, 0.0550, 0.0575, 0.0600]
CAPS3 = [0.0525, 0.0550, 0.0575, 0.0600, 0.0625]
GROWTHS = [0.020, 0.025, 0.030, 0.035, 0.040]
VACS = [0.040, 0.045, 0.050, 0.055, 0.060]
RATES = [0.055, 0.060, 0.065, 0.070, 0.075]
LTVS = [0.55, 0.60, 0.65, 0.70, 0.75]


def compute_sens_cache():
    cache = {}
    for pp in PRICES:
        for cp in CAPS:
            r = run_model(replace(Assumptions(), purchase_price=pp, exit_cap=cp))
            cache[("t1", pp, cp)] = r.levered_irr or 0.0
            cache[("t4", pp, cp)] = r.equity_multiple
    for g in GROWTHS:
        for v in VACS:
            r = run_model(replace(Assumptions(), rent_growth=g, vacancy=v))
            cache[("t2", g, v)] = r.levered_irr or 0.0
    for rt in RATES:
        for cp in CAPS3:
            r = run_model(replace(Assumptions(), interest_rate=rt, exit_cap=cp))
            cache[("t3", rt, cp)] = r.levered_irr or 0.0
    for g in GROWTHS:
        for cp in CAPS3:
            r = run_model(replace(Assumptions(), rent_growth=g, exit_cap=cp))
            cache[("t5", g, cp)] = r.lp_irr or 0.0
    for rt in RATES:
        for lv in LTVS:
            r = run_model(replace(Assumptions(), interest_rate=rt, ltv=lv))
            cache[("t6", rt, lv)] = r.dscr_avg
    return cache


def inject_cached_data_tables(path: str, dt_cells: dict) -> None:
    """Insert cached values for data-table formula cells (Excel recalculates on open)."""
    tmp = path + ".tmp"
    with zipfile.ZipFile(path, "r") as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename.startswith("xl/worksheets/sheet") and item.filename.endswith(".xml"):
                text = data.decode("utf-8")
                if "SCENARIO WHAT-IF TABLES" not in text:
                    zout.writestr(item, data)
                    continue
                for coord, val in dt_cells.items():
                    pattern = re.compile(r'(<c r="%s"[^>]*>)(.*?)(</c>)' % re.escape(coord), re.S)

                    def repl(m, v=val):
                        inner = m.group(2)
                        sval = repr(float(v))
                        inner = re.sub(r"<v\s*/>", "", inner)
                        if "<v>" in inner:
                            inner = re.sub(r"<v>.*?</v>", f"<v>{sval}</v>", inner, flags=re.S)
                        else:
                            inner += f"<v>{sval}</v>"
                        return m.group(1) + inner + m.group(3)

                    text, _ = pattern.subn(repl, text)
                data = text.encode("utf-8")
            zout.writestr(item, data)
    shutil.move(tmp, path)


def main():
    wb = Workbook()
    wb.remove(wb.active)

    # Build in dependency order; final tab order is set below.
    build_assumptions(wb)
    rr = __import__("engine").build_rent_roll(Assumptions().acquisition_date)
    build_property(wb)
    build_rent_roll(wb, rr)
    build_t12(wb)
    build_revenue(wb)
    build_expenses(wb)
    build_capex(wb)
    build_op_model(wb)
    build_sources_uses(wb)
    build_debt(wb)
    build_exit(wb)
    build_cash_flow(wb)
    build_waterfall(wb)
    build_sensitivity(wb)
    build_scenario(wb)
    build_ic(wb)
    build_checks(wb)

    # Hidden scenario / sensitivity data tables on Assumptions
    sc_cache = cached_scenarios()
    sens_cache = compute_sens_cache()
    dt_cells = build_data_tables(wb, sc_cache, sens_cache)

    build_summary(wb)

    # Exact tab sequence
    order = [SUMMARY, ASSUMP, PROP, RR, T12, REV, EXP, CAPEX, OP, SU, DEBT, EXIT,
             CF, WF, SENS, SCEN, IC, CHK]
    wb._sheets = [wb[name] for name in order]
    wb.active = 0

    # Workbook properties and calculation settings
    wb.properties.title = "Cedar Ridge Apartments - Multifamily Acquisition Model"
    wb.properties.subject = "Institutional multifamily acquisition underwriting"
    wb.properties.creator = "Underwriting Team"
    wb.properties.description = "Illustrative 250-unit multifamily acquisition model. Not investment advice."
    wb.properties.keywords = "multifamily, acquisition, underwriting, waterfall, sensitivity"
    wb.properties.category = "Real Estate Underwriting"
    wb.calculation.calcMode = "auto"
    wb.calculation.fullCalcOnLoad = True
    wb.calculation.forceFullCalc = True
    wb.calculation.calcCompleted = False

    # Named ranges for key inputs and outputs
    names = {
        "PurchasePrice": f"{ref(ASSUMP, 'D9')}",
        "ExitCapRate": f"{ref(ASSUMP, 'D76')}",
        "SeniorLoan": f"{ref(DEBT, 'C7')}",
        "TotalEquity": f"{ref(SU, 'C11')}",
        "LeveredIRR": f"{ref(CF, 'C41')}",
        "UnleveredIRR": f"{ref(CF, 'C42')}",
        "EquityMultiple": f"{ref(CF, 'C45')}",
        "ExitValue": f"{ref(EXIT, 'C13')}",
    }
    for nm, txt in names.items():
        wb.defined_names[nm] = DefinedName(nm, attr_text=txt)

    wb.save(FILE)
    inject_cached_data_tables(FILE, dt_cells)
    print("Saved", FILE)
    print("Sheets:", len(wb.sheetnames))
    print("Data-table cached cells:", len(dt_cells))


if __name__ == "__main__":
    main()
