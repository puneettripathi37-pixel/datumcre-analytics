"""
Illustrative US multifamily acquisition model - Python calculation engine.
This engine mirrors the Excel formulas and is used to:
  * pre-compute cached values for Excel data tables / scenario tables
  * provide an independent reasonableness check on the workbook
All figures are illustrative only.  No market data is represented as verified.
"""
from __future__ import annotations

from dataclasses import dataclass, field, replace
from datetime import date
import calendar
import math
from typing import Dict, List, Tuple, Optional

# -----------------------------------------------------------------------------
# Date helpers
# -----------------------------------------------------------------------------


def add_months(d: date, months: int) -> date:
    y = d.year + (d.month - 1 + months) // 12
    m = (d.month - 1 + months) % 12 + 1
    day = min(d.day, calendar.monthrange(y, m)[1])
    return date(y, m, day)


def eomonth(d: date, months: int = 0) -> date:
    d2 = add_months(date(d.year, d.month, 1), months + 1)
    return date(d2.year, d2.month, 1) - __import__("datetime").timedelta(days=1)


def days_in_month(d: date) -> int:
    return calendar.monthrange(d.year, d.month)[1]


def xnpv(rate: float, cashflows: List[Tuple[date, float]]) -> float:
    if rate <= -1:
        return float("nan")
    d0 = cashflows[0][0]
    return sum(cf / (1 + rate) ** ((d - d0).days / 365.0) for d, cf in cashflows)


def xirr(cashflows: List[Tuple[date, float]]) -> Optional[float]:
    """Simple robust XIRR via bisection.  Returns decimal rate or None."""
    cfs = [(d, cf) for d, cf in cashflows if abs(cf) > 1e-9]
    if not cfs:
        return None
    if all(cf >= 0 for _, cf in cfs) or all(cf <= 0 for _, cf in cfs):
        return None
    lo, hi = -0.9999, 10.0
    f_lo, f_hi = xnpv(lo, cfs), xnpv(hi, cfs)
    # Expand upper bound if needed
    tries = 0
    while f_lo * f_hi > 0 and tries < 60:
        hi *= 1.5
        f_hi = xnpv(hi, cfs)
        tries += 1
    if f_lo * f_hi > 0:
        return None
    for _ in range(200):
        mid = (lo + hi) / 2
        f_mid = xnpv(mid, cfs)
        if abs(f_mid) < 1e-8:
            return mid
        if f_lo * f_mid <= 0:
            hi = mid
            f_hi = f_mid
        else:
            lo = mid
            f_lo = f_mid
    return (lo + hi) / 2


# -----------------------------------------------------------------------------
# Inputs
# -----------------------------------------------------------------------------

@dataclass
class Assumptions:
    purchase_price: float = 35_000_000
    acquisition_date: date = date(2027, 1, 1)
    hold_years: int = 5
    acquisition_fee_pct: float = 0.010
    legal_expenses: float = 250_000
    due_diligence: float = 150_000
    financing_fee_pct: float = 0.010
    other_transaction: float = 100_000
    working_capital: float = 250_000
    operating_reserves: float = 150_000
    closing_cost_pct: float = 0.005

    rent_growth: float = 0.030
    other_income_growth: float = 0.030
    vacancy: float = 0.050
    credit_loss: float = 0.0025
    bad_debt: float = 0.0050
    concessions: float = 0.0100
    expense_growth: float = 0.030
    tax_growth: float = 0.030
    insurance_growth: float = 0.030
    management_fee_pct: float = 0.030
    replacement_reserve_per_unit: float = 300.0
    leaseup_months: int = 12
    ltl_burn_months: int = 12
    renovation_premium: float = 150.0
    renovation_units_per_month: int = 10
    renovation_cost_per_unit: float = 12_500.0
    renovation_downtime_factor: float = 0.50
    property_tax_rate: float = 0.0175
    insurance_annual: float = 220_000.0
    leasing_cost_pct_egi: float = 0.005

    ltv: float = 0.650
    target_ltc: float = 0.700
    interest_rate: float = 0.0650
    interest_only_months: int = 24
    amortization_years: int = 30
    loan_term_years: int = 5
    origination_fee_pct: float = 0.010
    exit_financing_cost_pct: float = 0.005
    prepayment_penalty_pct: float = 0.000

    exit_cap: float = 0.0575
    selling_cost_pct: float = 0.020
    disposition_legal: float = 75_000
    direct_exit_value: float = 40_000_000

    lp_pref: float = 0.080
    gp_catchup_pct: float = 1.000
    lp_residual_share: float = 0.700
    gp_residual_share: float = 0.300
    hurdle_1: float = 0.120
    hurdle_2: float = 0.150
    hurdle_3: float = 0.180
    hurdle_4: float = 0.200
    gp_tier_1: float = 0.300
    gp_tier_2: float = 0.350
    gp_tier_3: float = 0.400
    gp_tier_4: float = 0.450
    gp_coinvest_pct: float = 0.050

    # Operating history (illustrative; input to workbook)
    t12_gross_potential_rent: float = 4_650_000
    t12_vacancy: float = 465_000
    t12_concessions: float = 46_500
    t12_bad_debt: float = 23_250
    t12_other_rental_adj: float = 0
    t12_parking: float = 90_000
    t12_laundry: float = 30_000
    t12_pet: float = 45_000
    t12_utility_reimb: float = 120_000
    t12_other_income: float = 75_000
    t12_taxes: float = 400_000
    t12_insurance: float = 220_000
    t12_rm: float = 350_000
    t12_payroll: float = 420_000
    t12_utilities: float = 280_000
    t12_contract: float = 180_000
    t12_admin: float = 120_000
    t12_marketing: float = 60_000
    t12_mgmt: float = 134_000
    t12_landscaping: float = 45_000
    t12_security: float = 35_000
    t12_other_expense: float = 40_000


# Unit mix (illustrative)
UNIT_MIX = [
    # type, units, sf, current rent, market rent
    ("A1 - 1BR / 1BA", 40, 650, 1_250, 1_350),
    ("A2 - 1BR / 1BA Den", 75, 800, 1_400, 1_525),
    ("B1 - 2BR / 2BA", 85, 950, 1_525, 1_650),
    ("B2 - 2BR / 2BA Den", 35, 1_100, 1_675, 1_800),
    ("C1 - 3BR / 2BA", 15, 1_300, 1_950, 2_100),
]

# Other capex, illustrative
CAPEX_ITEMS = [
    ("Interior upgrades", 500_000, 1, 12),
    ("Exterior improvements", 350_000, 1, 18),
    ("Roofing", 300_000, 6, 24),
    ("HVAC", 250_000, 3, 18),
    ("Plumbing", 200_000, 6, 30),
    ("Electrical", 150_000, 4, 20),
    ("Parking", 125_000, 1, 12),
    ("Landscaping", 75_000, 1, 10),
    ("Amenities", 200_000, 1, 12),
    ("Life safety", 75_000, 1, 24),
    ("Other capex", 75_000, 1, 36),
]
CAPEX_CONTINGENCY = 0.05


# -----------------------------------------------------------------------------
# Rent roll generation
# -----------------------------------------------------------------------------

@dataclass
class Unit:
    unit_no: str
    unit_type: str
    sf: int
    lease_start: Optional[date]
    lease_exp: Optional[date]
    status: str
    current_rent: float
    market_rent: float
    other_charges: float
    concessions: float
    renewal_status: str
    mtm: str

    @property
    def effective_rent(self) -> float:
        return max(0.0, self.current_rent + self.other_charges - self.concessions)


@dataclass
class RentRoll:
    units: List[Unit]
    total_units: int
    occupied_units: int
    vacant_units: int
    physical_occupancy: float
    inplace_monthly_rent: float
    market_monthly_rent: float
    other_monthly_charges: float
    weighted_avg_rent: float
    weighted_avg_market_rent: float
    weighted_avg_lease_term_months: float
    total_sf: int
    weighted_avg_sf: float

    def expirations_by_month(self, start: date, n_months: int = 24) -> List[Tuple[date, int]]:
        out = []
        for m in range(n_months):
            d = add_months(date(start.year, start.month, 1), m)
            n = sum(1 for u in self.units if u.lease_exp and d <= u.lease_exp <= eomonth(d))
            out.append((d, n))
        return out


def build_rent_roll(acq: date) -> RentRoll:
    units: List[Unit] = []
    unit_no = 100
    rent_factors = [1.00, 1.015, 0.985, 1.03, 0.97, 1.01, 0.99, 1.04, 0.98, 1.005]
    mkt_factors = [1.00, 1.02, 0.99, 1.015, 0.985, 1.03, 0.975, 1.01, 1.0, 1.025]
    for t, (ut, n, sf, cur, mkt) in enumerate(UNIT_MIX):
        for j in range(n):
            unit_no += 1
            occ = (len(units) % 10 != 0)
            if occ:
                lease_exp = add_months(date(acq.year, acq.month, 1), ((len(units) * 7) % 28) - 3)
                lease_start = add_months(lease_exp, -12)
                status = "Occupied"
                cur_rent = round(cur * rent_factors[j % len(rent_factors)] / 5) * 5
                other = 60 + (j % 5) * 10
                conc = round(cur_rent * 0.01, 2)
                remaining = (lease_exp.year - acq.year) * 12 + lease_exp.month - acq.month
                renewal = "MTM" if remaining <= 0 else ("Renewal" if remaining <= 6 else "Not Expiring")
                mtm = "Yes" if remaining <= 0 else "No"
            else:
                lease_exp = None
                lease_start = None
                status = "Vacant"
                cur_rent = 0
                other = 0
                conc = 0
                renewal = "Vacant"
                mtm = "No"
            mkt_rent = round(mkt * mkt_factors[(j + t) % len(mkt_factors)] / 5) * 5
            units.append(Unit(
                unit_no=str(unit_no), unit_type=ut, sf=sf,
                lease_start=lease_start, lease_exp=lease_exp, status=status,
                current_rent=cur_rent, market_rent=mkt_rent,
                other_charges=other, concessions=conc,
                renewal_status=renewal, mtm=mtm,
            ))
    total = len(units)
    occ_units = sum(1 for u in units if u.status == "Occupied")
    vac = total - occ_units
    inplace = sum(u.current_rent for u in units)
    market = sum(u.market_rent for u in units)
    other = sum(u.other_charges for u in units)
    wa_rent = sum(u.current_rent for u in units if u.status == "Occupied") / max(1, occ_units)
    wa_mkt = market / total
    wa_term = sum(
        max(0, (u.lease_exp.year - acq.year) * 12 + u.lease_exp.month - acq.month)
        for u in units if u.status == "Occupied" and u.lease_exp
    ) / max(1, occ_units)
    total_sf = sum(u.sf for u in units)
    return RentRoll(
        units=units, total_units=total, occupied_units=occ_units, vacant_units=vac,
        physical_occupancy=occ_units / total, inplace_monthly_rent=inplace,
        market_monthly_rent=market, other_monthly_charges=other,
        weighted_avg_rent=wa_rent, weighted_avg_market_rent=wa_mkt,
        weighted_avg_lease_term_months=wa_term, total_sf=total_sf,
        weighted_avg_sf=total_sf / total,
    )


# -----------------------------------------------------------------------------
# Monthly model
# -----------------------------------------------------------------------------

@dataclass
class ModelResult:
    assumptions: Assumptions
    rent_roll: RentRoll
    dates: List[date]
    gpr: List[float]
    ltl: List[float]
    vacancy_loss: List[float]
    concessions: List[float]
    credit_loss: List[float]
    bad_debt: List[float]
    net_rental: List[float]
    renovation_premium: List[float]
    downtime_loss: List[float]
    other_income: List[float]
    egi: List[float]
    opex: Dict[str, List[float]]
    total_opex: List[float]
    noi: List[float]
    capex: List[float]
    replacement_reserve: List[float]
    leasing_costs: List[float]
    capex_reserve_balance: List[float]
    loan_amount: float
    beginning_balance: List[float]
    interest: List[float]
    principal: List[float]
    debt_service: List[float]
    ending_balance: List[float]
    uses: Dict[str, float]
    total_uses: float
    equity: float
    lp_equity: float
    gp_equity: float
    unlevered_cf: List[float]
    levered_cf: List[float]
    cash_available: List[float]
    exit_month: int
    exit_value: float
    exit_noi: float
    exit_costs: float
    net_sale_before_debt: float
    debt_payoff: float
    net_sale_after_debt: float
    unlevered_irr: Optional[float]
    levered_irr: Optional[float]
    gross_irr: Optional[float]
    equity_multiple: float
    total_equity: float
    total_distributions: float
    total_profit: float
    waterfall: Dict[str, List[float]] = field(default_factory=dict)
    lp_irr: Optional[float] = None
    gp_irr: Optional[float] = None
    lp_multiple: float = 0.0
    gp_multiple: float = 0.0
    gp_promote: float = 0.0
    lp_total_dist: float = 0.0
    gp_total_dist: float = 0.0
    year1_noi: float = 0.0
    stabilized_noi: float = 0.0
    year1_coc: float = 0.0
    stabilized_coc: float = 0.0
    avg_coc: float = 0.0
    dscr_avg: float = 0.0
    debt_yield: float = 0.0
    exit_cap_effective: float = 0.0


def run_model(a: Optional[Assumptions] = None) -> ModelResult:
    a = a or Assumptions()
    rr = build_rent_roll(a.acquisition_date)
    months = 120
    dates = [add_months(date(a.acquisition_date.year, a.acquisition_date.month, 1), i) for i in range(months)]
    exit_month = min(months, int(a.hold_years * 12))

    # ---- Revenue -----------------------------------------------------------
    gpr, ltl, vac, conc, credit, bad, net_rental = [], [], [], [], [], [], []
    reno_prem, downtime, other_inc, egi = [], [], [], []
    base_ltl = max(0.0, rr.market_monthly_rent * rr.physical_occupancy - rr.inplace_monthly_rent)
    for i, d in enumerate(dates):
        m = i + 1
        growth = (1 + a.rent_growth) ** ((m - 1) / 12.0)
        g = rr.market_monthly_rent * growth
        occ = min(1 - a.vacancy, rr.physical_occupancy + ((1 - a.vacancy) - rr.physical_occupancy) * min(m, a.leaseup_months) / max(1, a.leaseup_months))
        l = base_ltl * max(0.0, 1 - m / max(1, a.ltl_burn_months))
        v = g * (1 - occ)
        c = g * occ * a.concessions
        base_loss = max(0.0, g - l - v - c)
        cr = base_loss * a.credit_loss
        bd = base_loss * a.bad_debt
        nr = g - l - v - c - cr - bd
        renovated_cum = min(rr.total_units, max(0, m) * a.renovation_units_per_month)
        rp = renovated_cum * a.renovation_premium * growth
        dloss = min(rr.total_units, a.renovation_units_per_month) * (rr.market_monthly_rent / rr.total_units) * a.renovation_downtime_factor if m <= math.ceil(rr.total_units / max(1, a.renovation_units_per_month)) else 0.0
        oi_growth = (1 + a.other_income_growth) ** ((m - 1) / 12.0)
        oi = (a.t12_parking + a.t12_laundry + a.t12_pet + a.t12_utility_reimb + a.t12_other_income) * oi_growth / 12.0
        e = nr - dloss + rp + oi
        gpr.append(g); ltl.append(l); vac.append(v); conc.append(c); credit.append(cr); bad.append(bd)
        net_rental.append(nr); reno_prem.append(rp); downtime.append(dloss); other_inc.append(oi); egi.append(e)

    # ---- Expenses ----------------------------------------------------------
    cat_keys = ["Property Taxes", "Insurance", "Repairs & Maintenance", "Payroll", "Utilities",
                "Contract Services", "Administrative", "Marketing", "Management Fees",
                "Landscaping", "Security", "Other Expenses"]
    opex = {k: [] for k in cat_keys}
    for i, d in enumerate(dates):
        m = i + 1
        eg = egi[i]
        f = (1 + a.expense_growth) ** ((m - 1) / 12.0)
        tax = a.purchase_price * a.property_tax_rate * (1 + a.tax_growth) ** ((m - 1) / 12.0) / 12.0
        ins = a.insurance_annual * (1 + a.insurance_growth) ** ((m - 1) / 12.0) / 12.0
        vals = {
            "Property Taxes": tax,
            "Insurance": ins,
            "Repairs & Maintenance": 1_400 * rr.total_units * f / 12.0,
            "Payroll": 1_680 * rr.total_units * f / 12.0,
            "Utilities": 1_120 * rr.total_units * f / 12.0,
            "Contract Services": 720 * rr.total_units * f / 12.0,
            "Administrative": 480 * rr.total_units * f / 12.0,
            "Marketing": eg * 0.0125,
            "Management Fees": eg * a.management_fee_pct,
            "Landscaping": 180 * rr.total_units * f / 12.0,
            "Security": 140 * rr.total_units * f / 12.0,
            "Other Expenses": 40_000 * f / 12.0,
        }
        for k in cat_keys:
            opex[k].append(vals[k])
    total_opex = [sum(opex[k][i] for k in cat_keys) for i in range(months)]
    noi = [egi[i] - total_opex[i] for i in range(months)]

    # ---- Capex -------------------------------------------------------------
    # Unit renovations monthly; other items straight-line
    total_budget_reno = rr.total_units * a.renovation_cost_per_unit
    capex_hard = [0.0] * months
    units_renov = [0] * months
    for i in range(months):
        m = i + 1
        units_renov[i] = min(a.renovation_units_per_month, max(0, rr.total_units - sum(units_renov[:i])))
        capex_hard[i] += units_renov[i] * a.renovation_cost_per_unit
        for name, budget, start, end in CAPEX_ITEMS:
            if start <= m <= end:
                capex_hard[i] += budget / (end - start + 1)
    capex = [x * (1 + CAPEX_CONTINGENCY) for x in capex_hard]
    total_capex_budget = total_budget_reno + sum(x[1] for x in CAPEX_ITEMS)
    total_capex_budget *= (1 + CAPEX_CONTINGENCY)
    replacement = [rr.total_units * a.replacement_reserve_per_unit / 12.0] * months
    leasing_costs = [egi[i] * a.leasing_cost_pct_egi for i in range(months)]
    capex_balance = []
    bal = total_capex_budget
    for i in range(months):
        bal -= capex[i]
        capex_balance.append(bal)

    # ---- Sources & uses ----------------------------------------------------
    loan = a.ltv * a.purchase_price
    uses = {
        "Purchase Price": a.purchase_price,
        "Acquisition Fee": a.purchase_price * a.acquisition_fee_pct,
        "Legal Expenses": a.legal_expenses,
        "Due Diligence": a.due_diligence,
        "Financing Fees": loan * a.financing_fee_pct,
        "Closing Costs": a.purchase_price * a.closing_cost_pct,
        "Renovation & Capex Reserve": total_capex_budget,
        "Working Capital": a.working_capital,
        "Initial Operating Reserves": a.operating_reserves,
        "Other Transaction Expenses": a.other_transaction,
    }
    total_uses = sum(uses.values())
    equity = total_uses - loan
    lp_eq = equity * (1 - a.gp_coinvest_pct)
    gp_eq = equity * a.gp_coinvest_pct

    # ---- Debt schedule -----------------------------------------------------
    # Fixed-rate, actual/365, IO period then scheduled amortisation. If hold
    # exceeds the stated loan term, an extension is assumed (no forced sale).
    start_amort_balance = loan
    io = a.interest_only_months
    amort_months = a.amortization_years * 12
    sched_pay = 0.0 if io >= amort_months else -(
        loan * (a.interest_rate / 12.0) /
        (1 - (1 + a.interest_rate / 12.0) ** (-(amort_months - io)))
    )
    beg_bal, interest, principal, ds, end_bal = [], [], [], [], []
    b = loan
    for i, d in enumerate(dates):
        m = i + 1
        beg_bal.append(b)
        int_exp = b * a.interest_rate * days_in_month(d) / 365.0
        if m <= io:
            prin = 0.0
        else:
            if m == amort_months:
                prin = b
            else:
                prin = max(0.0, min(b, sched_pay - int_exp))
        interest.append(int_exp)
        principal.append(prin)
        ds.append(int_exp + prin)
        b = max(0.0, b - prin)
        end_bal.append(b)

    # ---- Exit --------------------------------------------------------------
    # Forward 12 months if available, otherwise trailing 12 x (1 + rent growth)
    if exit_month + 12 <= months:
        exit_noi = sum(noi[exit_month: exit_month + 12])
    else:
        exit_noi = sum(noi[max(0, exit_month - 12):exit_month]) * (1 + a.rent_growth)
    exit_value = exit_noi / a.exit_cap
    exit_costs = exit_value * a.selling_cost_pct + a.disposition_legal
    debt_payoff = end_bal[exit_month - 1]
    net_sale_before = exit_value - exit_costs
    net_sale_after = net_sale_before - debt_payoff - debt_payoff * (a.prepayment_penalty_pct + a.exit_financing_cost_pct)

    # ---- Cash flows --------------------------------------------------------
    unlevered_cf = [0.0] * months
    levered_cf = [0.0] * months
    gross_cf = [0.0] * months
    cash_available = [0.0] * months
    for i in range(months):
        m = i + 1
        if m == 1:
            unlevered_cf[i] -= total_uses
            levered_cf[i] -= equity
            gross_cf[i] -= (a.purchase_price + total_capex_budget)
        cf_before_capex = noi[i] - replacement[i] - leasing_costs[i]
        unlevered_cf[i] += cf_before_capex
        gross_cf[i] += noi[i]
        cash_avail = cf_before_capex - ds[i]
        if m == exit_month:
            unlevered_cf[i] += net_sale_before + max(0.0, capex_balance[i])
            gross_cf[i] += net_sale_before + max(0.0, capex_balance[i])
            cash_avail += net_sale_after + max(0.0, capex_balance[i])
            levered_cf[i] += net_sale_after + max(0.0, capex_balance[i])
        cash_available[i] = cash_avail
        levered_cf[i] += cf_before_capex - ds[i]
        # Unused capex reserve is returned at exit; initial equity has already
        # funded the reserve, so it is a capital return rather than income.

    cf_dates = dates[:exit_month]
    unlev_cfs = [(dates[i], unlevered_cf[i]) for i in range(exit_month)]
    lev_cfs = [(dates[i], levered_cf[i]) for i in range(exit_month)]
    gross_cfs = [(dates[i], gross_cf[i]) for i in range(exit_month)]
    unlev_irr = xirr(unlev_cfs)
    lev_irr = xirr(lev_cfs)
    gross_irr = xirr(gross_cfs)
    total_equity = max(0.0, -sum(x for x in levered_cf[:exit_month] if x < 0))
    total_distributions = sum(x for x in levered_cf[:exit_month] if x > 0)
    eq_mult = total_distributions / total_equity if total_equity else 0.0

    # ---- Waterfall ---------------------------------------------------------
    wf = run_waterfall(a, dates[:exit_month], levered_cf[:exit_month], cash_available[:exit_month],
                       lp_eq, gp_eq, rr.total_units)
    lp_irr = xirr(list(zip(dates[:exit_month], wf["lp_cf"])))
    gp_irr = xirr(list(zip(dates[:exit_month], wf["gp_cf"])))
    lp_tot = sum(wf["lp_dist"])
    gp_tot = sum(wf["gp_dist"])
    lp_mult = lp_tot / max(1e-9, lp_eq)
    gp_mult = gp_tot / max(1e-9, gp_eq)
    gp_promote = max(0.0, gp_tot - (lp_tot + gp_tot) * a.gp_coinvest_pct)

    # ---- Metrics -----------------------------------------------------------
    year1_noi = sum(noi[:12])
    stabilized_noi = sum(noi[12:24]) if months >= 24 else year1_noi
    year1_coc = sum(levered_cf[:12]) / max(1e-9, equity)
    stabilized_coc = sum(levered_cf[12:24]) / max(1e-9, equity)
    avg_coc = (sum(levered_cf[12:exit_month]) / max(1, exit_month - 12)) / max(1e-9, equity)
    ds_avg = sum(ds[:12]) / 12.0
    dscr_avg = (year1_noi / 12.0) / max(1e-9, ds_avg)
    debt_yield = year1_noi / loan if loan else 0.0
    eff_cap = exit_noi / exit_value if exit_value else 0.0

    return ModelResult(
        assumptions=a, rent_roll=rr, dates=dates,
        gpr=gpr, ltl=ltl, vacancy_loss=vac, concessions=conc, credit_loss=credit, bad_debt=bad,
        net_rental=net_rental, renovation_premium=reno_prem, downtime_loss=downtime,
        other_income=other_inc, egi=egi, opex=opex, total_opex=total_opex, noi=noi,
        capex=capex, replacement_reserve=replacement, leasing_costs=leasing_costs,
        capex_reserve_balance=capex_balance,
        loan_amount=loan, beginning_balance=beg_bal, interest=interest, principal=principal,
        debt_service=ds, ending_balance=end_bal,
        uses=uses, total_uses=total_uses, equity=equity, lp_equity=lp_eq, gp_equity=gp_eq,
        unlevered_cf=unlevered_cf, levered_cf=levered_cf, cash_available=cash_available,
        exit_month=exit_month, exit_value=exit_value, exit_noi=exit_noi, exit_costs=exit_costs,
        net_sale_before_debt=net_sale_before, debt_payoff=debt_payoff, net_sale_after_debt=net_sale_after,
        unlevered_irr=unlev_irr, levered_irr=lev_irr, gross_irr=gross_irr,
        equity_multiple=eq_mult, total_equity=total_equity, total_distributions=total_distributions,
        total_profit=total_distributions - total_equity,
        waterfall=wf, lp_irr=lp_irr, gp_irr=gp_irr, lp_multiple=lp_mult, gp_multiple=gp_mult,
        gp_promote=gp_promote, lp_total_dist=lp_tot, gp_total_dist=gp_tot,
        year1_noi=year1_noi, stabilized_noi=stabilized_noi,
        year1_coc=year1_coc, stabilized_coc=stabilized_coc, avg_coc=avg_coc,
        dscr_avg=dscr_avg, debt_yield=debt_yield, exit_cap_effective=eff_cap,
    )


def run_waterfall(a: Assumptions, dates: List[date], levered_cf: List[float],
                  cash_available: List[float], lp_eq: float, gp_eq: float,
                  units: int) -> Dict[str, List[float]]:
    """Monthly LP/GP waterfall matching the workbook logic.

    Tiers: return of capital, preferred return, GP catch-up, residual with
    IRR-equivalent multiple promote tiers.  All cash is distributed each month;
    total distributions therefore equal available cash by construction.
    """
    n = len(dates)
    keys = ["lp_contrib", "gp_contrib", "lp_begin_unret", "gp_begin_unret",
            "lp_pref_begin", "lp_pref_accrual", "lp_pref_paid", "gp_catchup",
            "lp_roc", "gp_roc", "residual_lp", "residual_gp",
            "lp_dist", "gp_dist", "lp_end_unret", "gp_end_unret", "lp_end_pref",
            "available", "check", "lp_cf", "gp_cf", "lp_cum_dist", "gp_cum_dist",
            "lp_cum_roc", "lp_cum_pref", "gp_cum_catchup", "gp_tier_share", "lp_multiple"]
    wf = {k: [0.0] * n for k in keys}
    lp_unret = gp_unret = 0.0
    lp_pref = 0.0
    cum_lp_roc = cum_lp_pref = cum_gp_catch = 0.0
    cum_lp_dist = cum_gp_dist = 0.0
    # Hurdle multiples based on hold period
    h1 = (1 + a.hurdle_1) ** a.hold_years
    h2 = (1 + a.hurdle_2) ** a.hold_years
    h3 = (1 + a.hurdle_3) ** a.hold_years
    for i in range(n):
        if i == 0:
            lp_c = lp_eq
            gp_c = gp_eq
        else:
            lp_c = 0.0
            gp_c = 0.0
        wf["lp_contrib"][i] = lp_c
        wf["gp_contrib"][i] = gp_c
        wf["lp_begin_unret"][i] = lp_unret
        wf["gp_begin_unret"][i] = gp_unret
        wf["lp_pref_begin"][i] = lp_pref
        avail = max(0.0, cash_available[i])
        wf["available"][i] = avail
        # Capital available for return includes current contributions
        lp_cap_avail = lp_unret + lp_c
        gp_cap_avail = gp_unret + gp_c
        lp_roc = min(avail, lp_cap_avail)
        remaining = avail - lp_roc
        gp_roc = min(remaining, gp_cap_avail)
        remaining -= gp_roc
        # Pref accrual on unreturned capital (and unpaid pref if compounded)
        if a.lp_pref > 0:
            base = lp_cap_avail + (lp_pref if getattr(a, "pref_compounding", "Compounded") == "Compounded" else 0)
            lp_pref_acc = base * a.lp_pref / 12.0
        else:
            lp_pref_acc = 0.0
        pref_avail = lp_pref + lp_pref_acc
        pref_paid = min(remaining, pref_avail)
        remaining -= pref_paid
        # GP catch-up: 100% to GP until GP has its target share of profit
        # distributed after return of capital.  The catch-up base is the
        # preferred return (profit) only -- not the return of capital.
        gp_share_target = a.gp_residual_share
        target = (cum_lp_pref + pref_paid) * (gp_share_target / max(1e-9, 1 - gp_share_target)) * a.gp_catchup_pct
        catch = min(remaining, max(0.0, target - cum_gp_catch))
        remaining -= catch
        # Residual split: GP share escalates through IRR-equivalent hurdles.
        lp_mult = (cum_lp_dist + lp_roc + pref_paid) / max(1e-9, lp_eq + sum(wf["lp_contrib"]))
        if lp_mult < h1:
            gp_share = a.gp_tier_1
        elif lp_mult < h2:
            gp_share = a.gp_tier_2
        elif lp_mult < h3:
            gp_share = a.gp_tier_3
        else:
            gp_share = a.gp_tier_4
        res_gp = remaining * gp_share
        res_lp = remaining - res_gp
        lp_dist = lp_roc + pref_paid + res_lp
        gp_dist = gp_roc + catch + res_gp
        # update balances
        lp_unret = max(0.0, lp_cap_avail - lp_roc)
        gp_unret = max(0.0, gp_cap_avail - gp_roc)
        lp_pref = max(0.0, pref_avail - pref_paid)
        cum_lp_roc += lp_roc
        cum_lp_pref += pref_paid
        cum_gp_catch += catch
        cum_lp_dist += lp_dist
        cum_gp_dist += gp_dist
        wf["lp_pref_accrual"][i] = lp_pref_acc
        wf["lp_pref_paid"][i] = pref_paid
        wf["lp_roc"][i] = lp_roc
        wf["gp_roc"][i] = gp_roc
        wf["gp_catchup"][i] = catch
        wf["residual_lp"][i] = res_lp
        wf["residual_gp"][i] = res_gp
        wf["lp_dist"][i] = lp_dist
        wf["gp_dist"][i] = gp_dist
        wf["lp_end_unret"][i] = lp_unret
        wf["gp_end_unret"][i] = gp_unret
        wf["lp_end_pref"][i] = lp_pref
        wf["check"][i] = avail - lp_dist - gp_dist
        wf["lp_cf"][i] = -lp_c + lp_dist
        wf["gp_cf"][i] = -gp_c + gp_dist
        wf["lp_cum_dist"][i] = cum_lp_dist
        wf["gp_cum_dist"][i] = cum_gp_dist
        wf["lp_cum_roc"][i] = cum_lp_roc
        wf["lp_cum_pref"][i] = cum_lp_pref
        wf["gp_cum_catchup"][i] = cum_gp_catch
        wf["gp_tier_share"][i] = gp_share
        wf["lp_multiple"][i] = cum_lp_dist / max(1e-9, lp_eq)
    return wf


def annual_sum(values: List[float], year: int) -> float:
    """Years are 1-based investment years."""
    return sum(values[(year - 1) * 12: year * 12])


def sensitivity_value(a: Assumptions, **overrides) -> Dict[str, float]:
    """Run a variant and return the main sensitivity metrics."""
    b = replace(a, **overrides)
    r = run_model(b)
    return {
        "levered_irr": r.levered_irr or 0.0,
        "unlevered_irr": r.unlevered_irr or 0.0,
        "equity_multiple": r.equity_multiple,
        "lp_irr": r.lp_irr or 0.0,
        "gp_promote": r.gp_promote,
    }


if __name__ == "__main__":
    r = run_model()
    print("Loan", r.loan_amount)
    print("Uses", r.total_uses, "Equity", r.equity)
    print("Year 1 NOI", r.year1_noi, "Stab NOI", r.stabilized_noi)
    print("Exit value", r.exit_value, "Exit NOI", r.exit_noi)
    print("Unlev IRR", r.unlevered_irr, "Lev IRR", r.levered_irr, "Gross IRR", r.gross_irr)
    print("Equity mult", r.equity_multiple, "LP IRR", r.lp_irr, "GP IRR", r.gp_irr)
    print("GP promote", r.gp_promote, "DSCR", r.dscr_avg, "Debt yield", r.debt_yield)
    print("Check waterfall", max(abs(x) for x in r.waterfall["check"]))
