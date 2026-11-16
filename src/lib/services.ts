export type ServiceIconKey =
  | "model"
  | "analytics"
  | "valuation"
  | "debt"
  | "reporting";

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
  value: string;
  valuePoints: string[];
}

export const services: Service[] = [
  {
    slug: "financial-modelling",
    number: "01",
    title: "Real Estate Financial Modelling",
    navLabel: "Financial Modelling",
    icon: "model",
    tagline: "Underwriting built around the investment question, not the template.",
    summary:
      "Purpose-built acquisition, development and hold models that make assumptions explicit, traceable and easy to challenge.",
    overview: [
      "Every investment decision rests on a set of assumptions. Our financial modelling work converts those assumptions into a structured, transparent framework that shows how cash flows, returns and risk interact across the full investment horizon.",
      "We build models from first principles around the specific transaction, sponsor structure and reporting audience — acquisition, development, recapitalisation or hold. Inputs are separated from calculations, sensitivities are built in rather than bolted on, and every output can be traced back to its source assumption.",
    ],
    capabilities: [
      "Acquisition underwriting",
      "Development financial modelling",
      "Cash flow projections",
      "Investment return calculations",
      "Scenario and sensitivity analysis",
      "Equity waterfall modelling",
    ],
    capabilitiesHeading: "Core modelling capabilities",
    clientRequirements: [
      "Evaluating an acquisition under compressed diligence timelines",
      "Modelling ground-up development with phased capital calls",
      "Testing a capital structure or promote arrangement before negotiation",
      "Rebuilding an inherited model that no longer reflects the business plan",
    ],
    deliverables: [
      "Fully integrated Excel model with documented inputs and assumptions",
      "Annual and monthly cash flow projections",
      "Levered and unlevered return summary (IRR, equity multiple, NPV)",
      "Scenario and sensitivity tables",
      "Assumption register and source notes",
      "Model walkthrough session",
    ],
    value:
      "A well-built model shortens diligence, sharpens negotiation and gives investment committees a defensible view of downside risk — not just a single point estimate of return.",
    valuePoints: [
      "Faster internal review cycles",
      "Clearer articulation of risk to capital providers",
      "A model your team can maintain after the transaction closes",
    ],
  },
  {
    slug: "investment-analytics",
    number: "02",
    title: "Investment & Portfolio Analytics",
    navLabel: "Investment Analytics",
    icon: "analytics",
    tagline: "Portfolio-level visibility, asset-level detail.",
    summary:
      "Consistent performance measurement, variance analysis and portfolio reporting that keeps investment strategy grounded in actual results.",
    overview: [
      "Portfolio decisions require a consistent analytical baseline. When each asset is measured differently, comparison becomes opinion rather than analysis. We standardise the definitions, then build the reporting that sits on top of them.",
      "Our portfolio analytics work spans performance monitoring, asset-level financial review, budget-versus-actual analysis and quarterly valuation support. Outputs are designed for the people who use them — asset managers, fund finance teams, investment committees and capital partners.",
    ],
    capabilities: [
      "Portfolio performance monitoring",
      "Asset-level financial analysis",
      "Quarterly valuation support",
      "Budget versus actual analysis",
      "Portfolio dashboards",
      "Capital allocation analysis",
    ],
    capabilitiesHeading: "Analytics capabilities",
    clientRequirements: [
      "A growing portfolio tracked across inconsistent spreadsheets",
      "Quarterly investor or lender reporting that consumes internal resource",
      "A need to compare asset performance on a like-for-like basis",
      "Capital allocation decisions requiring a consolidated view of returns",
    ],
    deliverables: [
      "Portfolio performance workbook with consistent metric definitions",
      "Asset-level variance analysis and commentary",
      "Quarterly valuation roll-forward schedules",
      "Dashboard-ready data extracts",
      "KPI summary by asset, market and strategy",
    ],
    value:
      "Reliable portfolio analytics turn a collection of assets into a coherent investment programme — highlighting where capital is working and where the plan needs revisiting.",
    valuePoints: [
      "One definition of performance across the portfolio",
      "Earlier visibility of underperformance",
      "Reporting capacity returned to the investment team",
    ],
  },
  {
    slug: "valuation-analysis",
    number: "03",
    title: "Valuation & Asset Analysis",
    navLabel: "Valuation Support",
    icon: "valuation",
    tagline: "Evidence-based value, with the assumptions in plain sight.",
    summary:
      "DCF, income and comparable-based analysis that supports valuation review, internal marks and transaction pricing.",
    overview: [
      "Valuation support is as much about the quality of the underlying assumptions as the arithmetic. We build income and DCF analyses that expose the drivers of value — rent levels, downtime, capital reserves, exit yields and discount rates — so they can be tested and defended.",
      "Our work is used to support internal valuation review, quarterly marks, acquisition pricing and lender or investor discussions. Where a third-party appraisal exists, we can review it independently and reconcile differences in assumption and methodology.",
    ],
    capabilities: [
      "Discounted cash flow analysis",
      "Net operating income analysis",
      "Capitalization rate analysis",
      "Exit valuation support",
      "Market assumption analysis",
      "Comparable property analysis",
    ],
    capabilitiesHeading: "Valuation capabilities",
    clientRequirements: [
      "An internal mark requiring independent analytical support",
      "Testing whether an asking price reflects supportable assumptions",
      "Reconciling a third-party appraisal against an underwriting view",
      "Preparing a value range for an investment committee paper",
    ],
    deliverables: [
      "Ten-year DCF with explicit exit assumption",
      "Direct capitalisation and NOI bridge analysis",
      "Capitalisation rate and comparable evidence schedule",
      "Value sensitivity matrix by exit yield and discount rate",
      "Written summary of key assumptions and limitations",
    ],
    value:
      "A transparent valuation framework supports better pricing discipline and gives stakeholders a clear explanation of what drives value — and what would change it.",
    valuePoints: [
      "Defensible support for internal marks",
      "Clear view of valuation sensitivity",
      "Assumption gaps identified before counterparties find them",
    ],
  },
  {
    slug: "mortgage-underwriting",
    number: "04",
    title: "Commercial Mortgage Underwriting",
    navLabel: "Mortgage Underwriting",
    icon: "debt",
    tagline: "Debt sizing that holds up under stress.",
    summary:
      "DSCR, LTV, debt yield and loan sizing analysis for originators, borrowers and investment teams evaluating financing options.",
    overview: [
      "Commercial mortgage underwriting depends on the interaction between property cash flow, leverage and lender constraints. We model that interaction across base and stressed scenarios, so the resulting loan sizing is robust rather than optimistic.",
      "Support covers both sides of the transaction: borrowers and sponsors testing financing alternatives, and lenders or credit teams requiring an independent analytical review of a proposed structure.",
    ],
    capabilities: [
      "DSCR analysis",
      "LTV analysis",
      "Debt yield calculations",
      "Loan sizing",
      "Financing scenario analysis",
      "Borrower cash flow assessment",
    ],
    capabilitiesHeading: "Debt underwriting capabilities",
    clientRequirements: [
      "Comparing financing proposals on a consistent basis",
      "Sizing debt against lender DSCR and debt yield constraints",
      "Stress testing a loan against rent or rate movement",
      "Preparing a credit-ready cash flow summary",
    ],
    deliverables: [
      "Loan sizing summary across DSCR, LTV and debt yield tests",
      "Annual debt service and coverage schedule",
      "Stress scenario analysis (rate, vacancy, NOI decline)",
      "Sources and uses of funds",
      "Financing comparison matrix",
    ],
    value:
      "Independent debt analysis clarifies how much leverage a transaction can genuinely support, and where a structure breaks under less favourable conditions.",
    valuePoints: [
      "Objective comparison of lending proposals",
      "Clear identification of the binding constraint",
      "Better prepared for lender and credit review",
    ],
  },
  {
    slug: "reporting-research",
    number: "05",
    title: "Reporting & Financial Research",
    navLabel: "Reporting & Research",
    icon: "reporting",
    tagline: "Analysis communicated with institutional clarity.",
    summary:
      "Investment committee materials, management reporting, market research and custom Excel reporting built on consistent, well-documented data.",
    overview: [
      "Analysis only creates value when it can be understood by the people making the decision. We translate financial output into reporting that is structured, concise and consistent in presentation across assets, markets and reporting periods.",
      "Engagements range from a single investment committee paper to recurring management reporting packs and bespoke research on market fundamentals. Each deliverable is built so that it can be refreshed as new information becomes available.",
    ],
    capabilities: [
      "Investment committee reporting",
      "Management reporting",
      "Financial data analysis",
      "Market research",
      "Custom Excel reporting",
    ],
    capabilitiesHeading: "Reporting & research capabilities",
    clientRequirements: [
      "An investment committee pack needed on a fixed timetable",
      "Recurring reporting that requires consolidation across entities",
      "Market and comparable evidence for a pricing discussion",
      "A custom Excel tool for an internal analytical process",
    ],
    deliverables: [
      "Structured investment committee or management report",
      "Executive summary with key metrics and drivers",
      "Supporting schedules and data appendix",
      "Charts and tables formatted for presentation",
      "Refreshable workbook with documented structure",
    ],
    value:
      "Consistent, well-evidenced reporting improves the quality of discussion in investment and management forums, and reduces the time spent reconciling numbers before each meeting.",
    valuePoints: [
      "A repeatable reporting structure",
      "Fewer reconciliation errors across documents",
      "Clear narrative supported by traceable data",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
