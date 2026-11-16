export interface Industry {
  slug: string;
  name: string;
  navLabel: string;
  image: string;
  imageAlt: string;
  summary: string;
  overview: string[];
  metrics: { label: string; detail: string }[];
  considerations: string[];
  support: string[];
}

export const industries: Industry[] = [
  {
    slug: "multifamily",
    name: "Multifamily",
    navLabel: "Multifamily",
    image: "/images/industry-multifamily.jpg",
    imageAlt:
      "Contemporary multifamily apartment building with brick and metal façade and landscaped walkway",
    summary:
      "Unit-level revenue, operating expense and renovation analysis for stabilised and value-add apartment investments.",
    overview: [
      "Multifamily underwriting depends on granular assumptions: unit mix, in-place and market rents, loss to lease, concessions, turnover, and the operating cost base that supports each unit. Small changes in renewal assumptions or expense ratios can materially shift value.",
      "We build unit-level and property-level models that make those drivers explicit, so acquisition, renovation and hold decisions can be tested against a coherent operating plan rather than a single blended rent figure.",
    ],
    metrics: [
      { label: "Occupancy", detail: "Physical and economic occupancy, including concessions and delinquency" },
      { label: "Average rent & loss to lease", detail: "In-place versus market rent by unit type" },
      { label: "NOI per unit", detail: "Normalised operating income after reserves and management" },
      { label: "Operating expense ratio", detail: "Controllable versus non-controllable cost analysis" },
      { label: "Value per unit", detail: "Implied pricing relative to replacement cost and comparables" },
      { label: "DSCR", detail: "Coverage under underwritten and stressed NOI" },
    ],
    considerations: [
      "Renewal and turnover assumptions, including downtime and turn cost by unit type",
      "Renovation premiums and the pace at which value-add capital can be absorbed by the market",
      "Insurance, property tax reassessment and payroll inflation in the operating base",
      "Concessions and loss to lease embedded in current occupancy",
      "Capital reserves and deferred maintenance identified in physical diligence",
    ],
    support: [
      "Acquisition and recapitalisation underwriting",
      "Value-add renovation and rent premium modelling",
      "Development cash flow and lease-up analysis",
      "Quarterly asset-level performance and variance reporting",
    ],
  },
  {
    slug: "industrial-logistics",
    name: "Industrial & Logistics",
    navLabel: "Industrial & Logistics",
    image: "/images/industry-industrial.jpg",
    imageAlt:
      "Aerial view of a modern logistics distribution warehouse with loading docks and roof solar arrays",
    summary:
      "Lease-driven cash flow analysis for distribution, last-mile and warehouse assets.",
    overview: [
      "Industrial value is driven by lease duration, tenant credit, rent escalation and the cost of re-tenanting space. Underwriting is less about monthly turnover and more about the timing and probability of rollover.",
      "We model lease-by-lease cash flows that reflect market rent upon expiry, downtime, leasing commissions and tenant improvements, alongside the capital items that keep a warehouse competitive.",
    ],
    metrics: [
      { label: "Weighted average lease term", detail: "By income and by leased area" },
      { label: "In-place vs market rent", detail: "Mark-to-market by suite and expiry year" },
      { label: "Clear height & building efficiency", detail: "Functional attributes relative to modern stock" },
      { label: "NOI per square foot", detail: "Normalised for recoveries and expense structure" },
      { label: "Rollover exposure", detail: "Percentage of rent expiring within 12, 24 and 36 months" },
      { label: "Releasing cost", detail: "Tenant improvements, commissions and downtime at expiry" },
    ],
    considerations: [
      "Whether in-place rents are above or below market at each lease event",
      "Recovery structure (NNN, modified gross) and the treatment of capital repairs",
      "Tenant concentration and the credit quality behind the income stream",
      "Capital needs for roof, racking, dock equipment and ESG-related upgrades",
      "Land value and alternative-use optionality in infill logistics markets",
    ],
    support: [
      "Acquisition underwriting and hold/sell analysis",
      "Lease rollover and mark-to-market sensitivity",
      "Speculative development and pre-leasing models",
      "Portfolio-level exposure and lease maturity reporting",
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    navLabel: "Retail",
    image: "/images/industry-retail.jpg",
    imageAlt:
      "Modern open-air retail and mixed commercial development with glazed frontage and landscaped public realm",
    summary:
      "Occupancy cost, lease structure and sales productivity analysis across retail formats.",
    overview: [
      "Retail underwriting sits at the intersection of real estate and tenant economics. Rent is sustainable only where occupancy costs remain supportable relative to tenant sales, and where the merchandising mix continues to drive footfall.",
      "Our retail analysis combines lease-level cash flow modelling with the sales productivity and co-tenancy considerations that determine whether income is durable through a hold period.",
    ],
    metrics: [
      { label: "Occupancy cost ratio", detail: "Occupancy cost as a percentage of tenant sales" },
      { label: "Sales per square foot", detail: "Portfolio and category-level productivity" },
      { label: "Net effective rent", detail: "After concessions, tenant improvements and commissions" },
      { label: "Lease expiry profile", detail: "Anchor versus in-line rollover concentration" },
      { label: "Percentage rent", detail: "Breakpoint analysis and sales-based upside" },
      { label: "Vacancy & downtime", detail: "Stabilised versus transitional vacancy assumptions" },
    ],
    considerations: [
      "Tenant sales trends and the sustainability of current occupancy cost ratios",
      "Anchor co-tenancy clauses and the consequences of anchor departure",
      "Capital required to reposition or re-tenant vacant in-line space",
      "Recovery structures and the treatment of common area maintenance",
      "Market rent for comparable boxes versus in-line suites",
    ],
    support: [
      "Acquisition and disposition underwriting",
      "Lease-level rollover and downtime analysis",
      "Repositioning and re-tenanting scenarios",
      "Annual budget and reforecast support",
    ],
  },
  {
    slug: "office",
    name: "Office",
    navLabel: "Office",
    image: "/images/industry-office.jpg",
    imageAlt:
      "Modern office building with a bronze-toned vertical fin façade and landscaped forecourt",
    summary:
      "Rollover, concession and capital expenditure analysis for office investment decisions.",
    overview: [
      "Office cash flows are sensitive to leasing assumptions. Free rent, tenant improvement allowances, commissions and downtime can reduce effective income well below face rent, while capital expenditure requirements are often underestimated.",
      "We model lease-level office cash flows with explicit concession and capital assumptions, and stress the outcomes against slower absorption or lower renewal probability.",
    ],
    metrics: [
      { label: "Occupancy & availability", detail: "Physical occupancy, sublet space and shadow vacancy" },
      { label: "Net effective rent", detail: "Face rent adjusted for concessions and costs" },
      { label: "WALT", detail: "Weighted average lease term by rent and by area" },
      { label: "Rollover schedule", detail: "Expirations by year, tenant and floor plate" },
      { label: "TI & leasing commissions", detail: "Per square foot and per transaction assumptions" },
      { label: "CapEx per square foot", detail: "Base building, amenity and compliance capital" },
    ],
    considerations: [
      "Market leasing conditions and realistic absorption periods for vacant space",
      "Free rent and improvement allowances required to attract credit tenants",
      "Building systems, deferred maintenance and amenity capital requirements",
      "Tenant concentration and single-tenant dependency risk",
      "Alternative-use or repositioning potential for older stock",
    ],
    support: [
      "Acquisition underwriting and hold/sell analysis",
      "Lease rollover and capital planning models",
      "Lease-up and repositioning scenarios",
      "Asset-level reporting and reforecasting",
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    navLabel: "Hospitality",
    image: "/images/industry-hospitality.jpg",
    imageAlt:
      "Modern hotel exterior with glazed lobby, balconies and landscaped palm planting",
    summary:
      "RevPAR-driven cash flow models for select-service, full-service and resort hotels.",
    overview: [
      "Hospitality underwriting is an operating business forecast as much as a real estate valuation. Revenue is driven by occupancy and rate, while profitability depends on departmental margins, fixed costs and the capital required to maintain brand standards.",
      "We build monthly operating models that reflect seasonality and ramp-up, then translate them into property-level cash flow after management fees, reserves and FF&E.",
    ],
    metrics: [
      { label: "RevPAR", detail: "Occupancy multiplied by average daily rate" },
      { label: "ADR & occupancy", detail: "Segmented by weekday, weekend and season" },
      { label: "GOP margin", detail: "Gross operating profit as a percentage of revenue" },
      { label: "FF&E reserve", detail: "Percentage of revenue and timing of capital spend" },
      { label: "Management fees", detail: "Base and incentive fee structure" },
      { label: "Value per key", detail: "Implied pricing relative to comparable transactions" },
    ],
    considerations: [
      "Stabilised versus ramp-up performance for newly opened or repositioned hotels",
      "Seasonality and the working capital implications of monthly cash flow",
      "Brand, management and franchise fee structures",
      "Property improvement plan requirements and brand-mandated capital",
      "Labour cost inflation and the operating leverage of fixed costs",
    ],
    support: [
      "Acquisition underwriting and lender models",
      "Development and conversion feasibility analysis",
      "Annual budget and monthly reforecast support",
      "Brand and management contract scenario comparison",
    ],
  },
  {
    slug: "mixed-use",
    name: "Mixed-Use Developments",
    navLabel: "Mixed-Use",
    image: "/images/industry-mixed-use.jpg",
    imageAlt:
      "Modern residential tower with planted terraced balconies above ground-floor frontage",
    summary:
      "Phased, multi-component development and stabilised mixed-use investment analysis.",
    overview: [
      "Mixed-use projects combine different income profiles, cost structures and risk horizons within a single asset. Residential lease-up, retail pre-leasing and office occupancy rarely stabilise on the same schedule.",
      "We model each component separately and then consolidate at the asset and equity level, so phasing, shared costs and capital recycling can be evaluated as part of one investment case.",
    ],
    metrics: [
      { label: "Revenue mix", detail: "Contribution by residential, retail, office and other uses" },
      { label: "Segment NOI", detail: "Separate operating statements by component" },
      { label: "Yield on cost", detail: "Stabilised NOI relative to total development cost" },
      { label: "Absorption & phasing", detail: "Lease-up pace by component and phase" },
      { label: "Shared cost allocation", detail: "Parking, amenity and common area recovery" },
      { label: "Construction cost per unit / SF", detail: "Hard and soft cost benchmarking" },
    ],
    considerations: [
      "Phasing logic and the capital calls required before each component stabilises",
      "Allocation of shared infrastructure, parking and amenity costs",
      "Differing lease structures and expense recovery across uses",
      "Entitlement risk, construction escalation and contingency adequacy",
      "Exit strategy by component versus a whole-asset sale",
    ],
    support: [
      "Development pro forma and phased cash flow modelling",
      "Construction loan draw and equity waterfall analysis",
      "Stabilised valuation and exit scenario analysis",
      "Investor reporting and budget variance analysis",
    ],
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
