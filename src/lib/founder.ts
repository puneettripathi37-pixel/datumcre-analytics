/**
 * Founder profile — verified information supplied by the business.
 *
 * PORTRAIT: the professional portrait is stored at `image` and enabled below.
 * Setting `imageEnabled` to `false` falls back to the designed monogram panel.
 *
 * Do not add employer names, certifications, transaction volumes, client names
 * or professional designations unless they have been verified and authorised
 * for publication.
 */
export const founder = {
  name: "Puneet Tripathi",
  role: "Founder & Principal Analyst",
  image: "/images/founder-puneet-tripathi.jpg",
  imageEnabled: true,
  imageAlt:
    "Puneet Tripathi, Founder and Principal Analyst at DatumCRE Analytics",
  location: "United States",
  biography: [
    "Puneet Tripathi is a real estate finance and financial modelling professional with over six years of experience across financial analysis, accounting and investment underwriting.",
    "He brings approximately three years of specialised experience in US commercial real estate, with a focus on Multifamily acquisition and development underwriting, asset-level financial analysis, valuation support and portfolio reporting.",
    "His professional experience includes supporting institutional real estate investment teams, analysing property-level operating performance, evaluating investment assumptions, building financial models and assessing investment returns.",
    "With an MBA in Finance, Puneet combines financial discipline with a practical understanding of real estate investment analysis.",
    "Through DatumCRE Analytics, he aims to provide US-based real estate investors, asset managers and developers with reliable, transparent and institutionally structured analytical support.",
  ],
  qualifications: [
    {
      label: "Qualification",
      value: "MBA in Finance",
    },
    {
      label: "Overall experience",
      value:
        "Over six years across financial analysis, accounting and real estate finance",
    },
    {
      label: "Multifamily experience",
      value:
        "Approximately three years of specialised US commercial real estate underwriting, financial modelling and valuation experience",
    },
    {
      label: "Institutional exposure",
      value:
        "Experience supporting institutional US real estate investment teams",
    },
    {
      label: "Coverage",
      value:
        "Multifamily acquisition and development underwriting, asset-level analysis, quarterly valuations and portfolio reporting",
    },
  ],
  expertise: [
    "Multifamily acquisition underwriting",
    "Financial modelling",
    "Rent roll and T-12 analysis",
    "NOI reconstruction and normalisation",
    "DCF and valuation support",
    "IRR and equity multiple analysis",
    "Debt sizing and DSCR analysis",
    "Joint venture waterfall modelling",
    "Investment performance reporting",
    "Financial dashboards and sensitivity analysis",
  ],
  philosophy:
    "DatumCRE was built around a straightforward idea: an investment decision deserves analysis that can be explained, challenged and defended. That means assumptions sourced rather than assumed, calculations that can be traced, and conclusions that make the downside as visible as the base case. The objective is not a more complicated model — it is a clearer decision.",
} as const;
