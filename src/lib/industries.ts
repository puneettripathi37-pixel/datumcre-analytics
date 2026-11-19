export interface IndustrySegment {
  name: string;
  detail: string;
}

export interface Industry {
  slug: string;
  name: string;
  navLabel: string;
  headline: string;
  image: string;
  imageAlt: string;
  summary: string;
  overview: string[];
  segments: IndustrySegment[];
  metrics: { label: string; detail: string }[];
  considerations: string[];
  support: string[];
}

/**
 * Single-sector focus: US Multifamily.
 *
 * The site deliberately does not present other property types as service areas.
 * Segment descriptions describe analytical scope, not a claim of specialist
 * experience in every subcategory.
 */
export const multifamily: Industry = {
  slug: "multifamily",
  name: "Multifamily",
  navLabel: "Multifamily",
  headline: "Multifamily Real Estate Analytics & Underwriting",
  image: "/images/industry-multifamily.jpg",
  imageAlt:
    "Contemporary US multifamily apartment community with brick and metal balconies and landscaped walkway",
  summary:
    "Unit-level revenue, operating expense, capital and valuation analysis for US apartment investments.",
  overview: [
    "Multifamily underwriting is driven by granular operating assumptions. Unit mix, in-place and market rents, loss to lease, concessions, renewal behaviour and turnover all influence revenue, while payroll, property taxes, insurance and capital requirements shape the expense base.",
    "We build unit-level and property-level models that make those drivers explicit. Acquisition, value-add, development, refinancing and hold decisions can then be tested against a coherent operating plan rather than a single blended rent figure.",
  ],
  segments: [
    { name: "Garden-style apartments", detail: "Low-rise communities with surface parking and landscaped grounds" },
    { name: "Mid-rise apartments", detail: "Podium or wrapped construction, typically four to eight storeys" },
    { name: "High-rise residential communities", detail: "Elevated construction with amenity and parking structures" },
    { name: "Workforce housing", detail: "Rental housing serving middle-income households" },
    { name: "Affordable housing", detail: "Income-restricted or programme-supported rental assets" },
    { name: "Value-add Multifamily", detail: "Assets with renovation, repositioning or operational upside" },
    { name: "Stabilised Multifamily assets", detail: "Operating communities with an established occupancy and rent base" },
    { name: "Ground-up Multifamily developments", detail: "Construction, lease-up and stabilisation projects" },
  ],
  metrics: [
    {
      label: "Occupancy",
      detail: "Physical and economic occupancy, including concessions and delinquency",
    },
    {
      label: "Average rent & loss to lease",
      detail: "In-place versus market rent by unit type",
    },
    {
      label: "NOI per unit",
      detail: "Normalised operating income after management and reserves",
    },
    {
      label: "Operating expense ratio",
      detail: "Controllable versus non-controllable cost analysis",
    },
    {
      label: "Value per unit",
      detail: "Implied pricing relative to comparable evidence",
    },
    {
      label: "Debt coverage",
      detail: "DSCR, debt yield and LTV under underwritten and stressed NOI",
    },
  ],
  considerations: [
    "Unit mix and rental assumptions by floor plan and unit type",
    "Physical and economic occupancy, including delinquency and non-revenue units",
    "Loss to lease between in-place and market rents",
    "Rental concessions and their expiry",
    "Renewal and turnover assumptions, including downtime and turn costs",
    "Operating expense inflation across the hold period",
    "Property taxes and insurance, including reassessment risk",
    "Payroll and management costs at realistic staffing levels",
    "Capital expenditure requirements and deferred maintenance",
    "Renovation premiums and the pace of value-add absorption",
    "Stabilisation and lease-up assumptions for transitional assets",
    "Exit valuation, terminal NOI and capitalisation rate evidence",
  ],
  support: [
    "Acquisition and recapitalisation underwriting",
    "Value-add renovation and rent premium modelling",
    "Development cash flow and lease-up analysis",
    "Quarterly asset-level performance and variance reporting",
  ],
};

export const industries: Industry[] = [multifamily];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
