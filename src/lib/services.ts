export type ServiceIconKey =
  | "acquisition"
  | "development"
  | "valuation"
  | "portfolio"
  | "debt";

export interface Service {
  slug: string;
  number: string;
  title: string;
  navLabel: string;
  icon: ServiceIconKey;
  tagline: string;
  summary: string;
  overview: string[];
  capabilities: string[];
  capabilitiesHeading: string;
  clientRequirements: string[];
  deliverables: string[];
  engagement: string;
  value: string;
  valuePoints: string[];
}

/**
 * DatumCRE service offering — Multifamily only.
 *
 * Descriptions reflect analytical and modelling support. They do not claim
 * regulated services, appraisal opinions or advisory recommendations.
 */
export const services: Service[] = [
  {
    slug: "multifamily-acquisition-underwriting",
    number: "01",
    title: "Multifamily Acquisition Underwriting",
    navLabel: "Acquisition Underwriting",
    icon: "acquisition",
    tagline:
      "Property-level analysis that tests the acquisition story against the operating evidence.",
    summary:
      "Comprehensive property-level financial analysis to evaluate acquisition opportunities and investment assumptions.",
    overview: [
      "Acquisition underwriting starts with the operating evidence: the rent roll, the trailing operating statement and the capital plan. Seller pro formas are useful as a reference point, but they describe a stabilised future rather than the asset as it operates today.",
      "We rebuild revenue and expenses from the property level up, separate the assumptions that drive return from those that merely describe it, and present the outcome across a base case and sensitised scenarios. The result is a transparent view of pricing, leverage and downside exposure for investment committee review.",
    ],
    capabilities: [
      "Rent roll analysis",
      "T-12 operating statement analysis",
      "Revenue and expense projections",
      "Rental income and loss-to-lease analysis",
      "Vacancy, concessions and bad debt assumptions",
      "Operating expense normalisation",
      "NOI projections",
      "Acquisition pricing and exit assumptions",
      "IRR and equity multiple analysis",
      "Scenario and sensitivity analysis",
    ],
    capabilitiesHeading: "Acquisition underwriting capabilities",
    clientRequirements: [
      "Screening a new Multifamily acquisition under a compressed timetable",
      "Testing a broker or seller pro forma against the rent roll and T-12",
      "Re-underwriting an opportunity before investment committee",
      "Comparing base, upside and downside operating scenarios",
    ],
    deliverables: [
      "Integrated acquisition model with documented assumptions",
      "Rent roll and T-12 reconciliation",
      "Normalised NOI build by operating line",
      "Levered and unlevered return summary (IRR, equity multiple, NPV)",
      "Exit cap rate and operating sensitivity tables",
      "Assumption register and summary memorandum",
    ],
    engagement: "Transaction-based project or pre-IC review",
    value:
      "A clear acquisition view helps investors avoid paying for assumptions that the operating evidence does not support — and gives the investment committee a defensible basis for pricing and approval.",
    valuePoints: [
      "Assumptions traced back to source documents",
      "A view of downside cases, not only the base case",
      "Faster internal review and challenge",
    ],
  },
  {
    slug: "development-investment-modelling",
    number: "02",
    title: "Development & Investment Modelling",
    navLabel: "Development Modelling",
    icon: "development",
    tagline:
      "From construction spend to stabilised cash flow, with the capital structure visible throughout.",
    summary:
      "Financial modelling for Multifamily development, lease-up, capital deployment and investment structures.",
    overview: [
      "Development modelling connects the construction budget, the draw schedule and the lease-up plan into a single cash flow. Timing matters: a delayed draw, a slower absorption curve or an unanticipated capital call can change the equity outcome without changing the project's underlying economics.",
      "We build phased development models that show sources and uses, construction-period cash flow, lease-up and stabilisation, equity contributions and distributions. Joint venture waterfalls can be modelled on top of the property cash flow, with preferred returns and promote tiers calculated explicitly.",
    ],
    capabilities: [
      "Development budgets and sources & uses",
      "Construction-period cash flows",
      "Capital expenditure analysis",
      "Lease-up and stabilisation modelling",
      "Equity contribution schedules",
      "Capital call modelling",
      "Joint venture waterfall modelling",
      "Preferred return and promote calculations",
      "Development IRR and equity multiple",
      "Sensitivity analysis",
    ],
    capabilitiesHeading: "Development modelling capabilities",
    clientRequirements: [
      "Evaluating a ground-up Multifamily development opportunity",
      "Testing a construction budget and draw schedule before closing",
      "Modelling lease-up and stabilisation under different absorption assumptions",
      "Reviewing a JV structure, preferred return or promote arrangement",
    ],
    deliverables: [
      "Phased development cash flow model",
      "Sources and uses and construction draw schedule",
      "Lease-up and stabilisation assumptions",
      "Equity contribution and distribution schedule",
      "JV waterfall with preferred return and promote tiers",
      "Sensitivity analysis on cost, timing and exit assumptions",
    ],
    engagement: "Pre-development, closing or investor review",
    value:
      "Development returns depend on execution timing as much as cost. A structured model makes the capital calls, stabilisation path and promote outcomes visible before capital is committed.",
    valuePoints: [
      "Clear funding requirement by period",
      "Lease-up risk reflected in the cash flow",
      "Waterfall outcomes that can be explained to investors",
    ],
  },
  {
    slug: "valuation-asset-level-analysis",
    number: "03",
    title: "Valuation & Asset-Level Analysis",
    navLabel: "Valuation Support",
    icon: "valuation",
    tagline:
      "Value analysis built on normalised income, evidenced assumptions and explicit sensitivity.",
    summary:
      "Structured valuation support and financial analysis to evaluate property performance and investment value.",
    overview: [
      "Valuation support for Multifamily assets begins with a defensible NOI. We reconcile reported income to a normalised operating base, then test value using direct capitalisation and discounted cash flow analysis with clearly stated exit and discount assumptions.",
      "Where a third-party valuation is available, we can review the underlying assumptions independently — rent growth, vacancy, expense inflation, capital reserves and exit yield — and explain where the differences in value arise.",
    ],
    capabilities: [
      "Discounted cash flow analysis",
      "Direct capitalisation",
      "NOI analysis",
      "Exit cap rate sensitivity",
      "Discount rate sensitivity",
      "Comparable property analysis",
      "Quarterly valuation support",
      "Hold versus sell analysis",
      "Asset-level performance assessment",
    ],
    capabilitiesHeading: "Valuation capabilities",
    clientRequirements: [
      "Supporting an internal quarterly mark",
      "Testing whether an asking price reflects supportable income",
      "Reviewing a third-party valuation or appraisal assumption set",
      "Framing a hold-versus-sell decision for an asset",
    ],
    deliverables: [
      "Normalised NOI and value bridge",
      "Direct capitalisation analysis",
      "Discounted cash flow with stated exit assumption",
      "Cap rate and discount rate sensitivity matrix",
      "Comparable evidence schedule",
      "Written summary of assumptions and limitations",
    ],
    engagement: "Quarterly, transaction-based or ad hoc",
    value:
      "A transparent valuation framework supports pricing discipline and gives owners and investment teams a clear explanation of what drives value — and what would change it.",
    valuePoints: [
      "Consistent assumptions across assets",
      "A clear view of valuation sensitivity",
      "Better preparation for internal and external review",
    ],
  },
  {
    slug: "portfolio-asset-management-analytics",
    number: "04",
    title: "Portfolio & Asset Management Analytics",
    navLabel: "Portfolio Analytics",
    icon: "portfolio",
    tagline:
      "Consistent performance measurement across the portfolio, with asset-level detail underneath.",
    summary:
      "Consistent portfolio reporting and asset-level performance monitoring for Multifamily investment portfolios.",
    overview: [
      "Portfolio reporting becomes unreliable when every asset is measured on a different basis. We standardise the definitions first — NOI, occupancy, capital expenditure, returns — then build reporting that applies them consistently across the portfolio.",
      "Outputs are designed for asset managers, finance teams and investment committees: quarterly performance summaries, budget-versus-actual analysis, NOI variance explanation, capital tracking and property-level reviews that sit behind the portfolio total.",
    ],
    capabilities: [
      "Quarterly asset reporting",
      "Budget versus actual analysis",
      "NOI variance analysis",
      "Rent roll and T-12 analysis",
      "Portfolio performance dashboards",
      "Property-level financial reviews",
      "Investment performance monitoring",
      "Capital expenditure tracking",
      "Portfolio return analysis",
    ],
    capabilitiesHeading: "Portfolio analytics capabilities",
    clientRequirements: [
      "A growing portfolio tracked across inconsistent spreadsheets",
      "Quarterly investor or lender reporting that consumes internal resource",
      "A need to compare asset performance on a like-for-like basis",
      "A consolidated view of capital deployment and returns",
    ],
    deliverables: [
      "Portfolio performance workbook with consistent definitions",
      "Asset-level variance analysis and commentary",
      "Quarterly reporting pack",
      "Capital expenditure tracking schedule",
      "Dashboard-ready data extracts",
      "KPI summary by asset and market",
    ],
    engagement: "Recurring quarterly support or fixed-scope review",
    value:
      "Reliable portfolio analytics turn a collection of assets into a coherent investment programme — showing where performance is on plan and where the operating assumptions need revisiting.",
    valuePoints: [
      "One definition of performance across the portfolio",
      "Earlier visibility of underperformance",
      "Reporting capacity returned to the investment team",
    ],
  },
  {
    slug: "multifamily-debt-financing",
    number: "05",
    title: "Multifamily Debt & Financing Analysis",
    navLabel: "Debt & Financing",
    icon: "debt",
    tagline:
      "Debt sizing and financing analysis that shows where the structure binds.",
    summary:
      "Independent financial analysis supporting Multifamily debt evaluation, refinancing and loan sizing.",
    overview: [
      "Multifamily debt capacity is determined by the interaction between property cash flow, leverage and lender constraints. DSCR, debt yield and LTV each test a different dimension of the loan, and the binding constraint determines how the transaction can be structured.",
      "We model debt against normalised NOI across base and stressed scenarios, compare financing alternatives on a consistent basis, and show how coverage and refinancing risk change with interest rates, amortisation and operating performance.",
    ],
    capabilities: [
      "DSCR analysis",
      "Debt yield analysis",
      "LTV analysis",
      "Loan sizing",
      "Debt service calculations",
      "Refinancing scenarios",
      "Interest rate sensitivity",
      "Debt coverage stress testing",
      "Financing comparison analysis",
    ],
    capabilitiesHeading: "Debt analysis capabilities",
    clientRequirements: [
      "Comparing financing proposals on a consistent basis",
      "Sizing debt against lender DSCR and debt yield constraints",
      "Testing a loan against rate movement or an NOI decline",
      "Preparing a refinancing analysis for an existing asset",
    ],
    deliverables: [
      "Loan sizing summary across DSCR, LTV and debt yield tests",
      "Annual debt service and coverage schedule",
      "Interest rate and NOI stress analysis",
      "Sources and uses of funds",
      "Financing comparison matrix",
      "Refinancing scenario summary",
    ],
    engagement: "Financing process, refinancing or analytical review",
    value:
      "Independent debt analysis clarifies how much leverage a Multifamily transaction can genuinely support, and where the structure becomes vulnerable under less favourable conditions.",
    valuePoints: [
      "Objective comparison of financing proposals",
      "Clear identification of the binding constraint",
      "Better preparation for lender and credit review",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
