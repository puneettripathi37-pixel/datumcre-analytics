export type ArticleStatus = "draft" | "published";

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  quote?: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  status: ArticleStatus;
  body: ArticleSection[];
  related: string[];
}

/**
 * Editorial content.
 *
 * All six articles are marked `draft` and are intentionally surfaced as draft
 * content in the UI until they have been reviewed and approved. To publish an
 * article, change `status` to "published" and update `date`.
 */
export const articles: Article[] = [
  {
    slug: "multifamily-underwriting-fundamentals",
    title: "Understanding the Fundamentals of Multifamily Underwriting",
    category: "Multifamily",
    excerpt:
      "A practical framework for moving from a rent roll to a defensible net operating income — and the assumptions that most often decide the outcome.",
    date: "2026-11-10",
    readingTime: "9 min read",
    image: "/images/insight-multifamily.jpg",
    imageAlt:
      "Apartment balconies at dusk with warm interior lighting against a quiet sky",
    status: "draft",
    body: [
      {
        paragraphs: [
          "Multifamily underwriting looks deceptively straightforward. There is a rent roll, an operating statement, a purchase price and a debt quote. The apparent simplicity is why so many models are built quickly — and why so many of them rely on blended averages that hide the assumptions actually driving value.",
          "A reliable multifamily model works from the unit up. It treats revenue and expenses as operating decisions rather than historical averages, and it makes the connection between the business plan and the cash flow explicit.",
        ],
      },
      {
        heading: "Start with the rent roll, not the pro forma",
        paragraphs: [
          "The seller's pro forma typically reflects a stabilised version of the asset. The rent roll reflects what is actually happening today: which units are occupied, what they pay, when leases expire, and how much rent has been given away through concessions.",
          "Reconciling the two is the first analytical task. Gross potential rent should be built from unit types and market rents, not from a single blended figure. Loss to lease, vacancy, concessions, bad debt and non-revenue units should each be visible and separately supported.",
        ],
        list: [
          "Compare in-place rents to current market rent by unit type, not portfolio-wide",
          "Identify concessions and their expiry — a concession is deferred revenue, not permanent income",
          "Model economic occupancy, including delinquency and model units",
          "Test the renewal assumption against turnover history and local supply",
        ],
      },
      {
        heading: "Normalise the operating expense base",
        paragraphs: [
          "Expense underwriting is where conservative assumptions are frequently confused with unsupported ones. The objective is not to add a blanket inflation margin, but to rebuild the expense base line by line so that each item reflects the asset, the market and the operating model.",
          "Property taxes deserve particular attention. A sale often triggers reassessment, and the seller's current bill may not reflect the new basis. Insurance has repriced materially in many markets, and payroll assumptions should reflect realistic staffing levels rather than a prior owner's lean structure.",
        ],
        list: [
          "Recover taxes and insurance from the assessor and current policies where possible",
          "Separate controllable expenses from fixed obligations",
          "Include management fees and replacement reserves consistently with the lender's definition of NOI",
          "Identify expenses that will change under the business plan — for example, added staffing for a lease-up",
        ],
      },
      {
        heading: "Treat renovation capital as an operating assumption",
        paragraphs: [
          "Value-add underwriting depends on a chain of assumptions: renovation cost per unit, the rent premium achieved, the pace of renovation, and the downtime incurred while a unit is offline. Each is testable, and together they determine whether the capital programme creates value or simply consumes it.",
          "A common error is to apply a market-wide renovation premium without considering the asset's position within its submarket. A renovated unit can only achieve the rent the market will pay for that product type, and only if the surrounding asset supports the positioning.",
        ],
        quote:
          "The renovation budget is a capital item. The rent premium is an operating assumption. The model should show both, separately, and allow either to be challenged.",
      },
      {
        heading: "From NOI to value",
        paragraphs: [
          "Once net operating income is defensible, value follows from a capitalisation rate and a view on growth. Price per unit and price per square foot are useful sanity checks, but they are outputs, not inputs. The cap rate should be supported by comparable transactions adjusted for age, location, unit mix and risk profile.",
          "Debt capacity should then be tested against the resulting value. Coverage and debt yield constraints frequently bind before loan-to-value does, particularly when rates are elevated. A model that produces a value but not a financing outcome is only half complete.",
        ],
      },
      {
        heading: "A disciplined process",
        paragraphs: [
          "Good underwriting is less about sophisticated mathematics than about disciplined process: a documented rent roll, a line-by-line expense build, a capital plan tied to the business plan, a financing test, and a sensitivity analysis that shows which assumptions matter most.",
          "If a model cannot answer the question 'what would have to be true for this investment to underperform?' clearly and quickly, it is not yet finished.",
        ],
      },
    ],
    related: [
      "acquisition-underwriting-key-assumptions",
      "building-reliable-cre-models",
      "exit-cap-rates-and-returns",
    ],
  },
  {
    slug: "dscr-debt-yield-ltv",
    title: "DSCR, Debt Yield and LTV: Key Metrics in Commercial Real Estate Lending",
    category: "Lending",
    excerpt:
      "Three constraints, one loan. How coverage, debt yield and leverage interact — and why the binding test matters for sizing and structure.",
    date: "2026-11-04",
    readingTime: "8 min read",
    image: "/images/insight-lending.jpg",
    imageAlt:
      "Blue glass office façade with a regular grid of reflective windows against a bright sky",
    status: "draft",
    body: [
      {
        paragraphs: [
          "Commercial mortgage sizing is governed by a small set of ratios that every borrower and lender discusses, but which are often applied without a clear view of how they interact. Debt service coverage, debt yield and loan-to-value each test a different dimension of the loan, and the one that binds determines how the transaction can be structured.",
        ],
      },
      {
        heading: "Debt service coverage ratio",
        paragraphs: [
          "DSCR compares net operating income to annual debt service. It answers a simple question: how much cushion exists if income falls? Because debt service depends on the interest rate, amortisation and any interest-only period, the same loan amount can produce very different coverage under different terms.",
          "Lenders apply their own minimums and their own definition of NOI, which may exclude certain income or deduct reserves that an investor would not. Comparing quotes without normalising those definitions can make an inferior proposal look stronger.",
        ],
        list: [
          "Use the lender's underwriting NOI, not the seller's pro forma",
          "Model the actual amortisation and interest-only period in the quote",
          "Test coverage at a stressed interest rate, not only the quoted rate",
          "Confirm whether reserves and capital items are deducted before coverage is calculated",
        ],
      },
      {
        heading: "Debt yield",
        paragraphs: [
          "Debt yield is net operating income divided by the loan amount. It is effectively the lender's unlevered return on the loan and is independent of the interest rate, which makes it a useful constant across financing structures and rate environments.",
          "Because it is calculated against loan proceeds rather than value, debt yield is less sensitive to valuation debate than LTV. It has become a primary constraint in many lending programmes, particularly for transitional or higher-leverage transactions.",
        ],
      },
      {
        heading: "Loan-to-value",
        paragraphs: [
          "LTV compares the loan to the appraised or underwritten value of the property. It is the most familiar of the three metrics and the most dependent on valuation methodology. A higher exit or stabilised value assumption can make an aggressive loan appear conservative.",
          "For development and transitional assets, lenders may apply LTV to cost or to stabilised value, which changes the constraint materially. The basis of value should always be stated alongside the ratio.",
        ],
      },
      {
        heading: "An illustrative sizing example",
        paragraphs: [
          "Consider a property with underwritten NOI of $1,200,000, a 6.5% fixed rate, 30-year amortisation, a lender minimum DSCR of 1.25x, a minimum debt yield of 9.0% and a maximum LTV of 65% against an $18,750,000 value. These figures are illustrative only and do not represent a market quotation.",
        ],
        list: [
          "DSCR constraint: at 1.25x, maximum annual debt service is $960,000, which supports roughly $12.65 million of loan at 6.5% over 30 years",
          "Debt yield constraint: at 9.0%, maximum loan is $13.33 million",
          "LTV constraint: at 65%, maximum loan is $12.19 million",
        ],
      },
      {
        paragraphs: [
          "In this example LTV binds, with DSCR close behind. If the rate rose or amortisation shortened, coverage would become the binding constraint. If the property were valued more aggressively, LTV would loosen while debt yield stayed unchanged — which is precisely why lenders rely on more than one test.",
        ],
      },
      {
        heading: "What this means for structure",
        paragraphs: [
          "Understanding the binding constraint informs negotiation. If coverage binds, a longer amortisation schedule, a lower rate or an interest-only period can release capacity. If debt yield binds, only more income or less leverage will help. If LTV binds, the conversation is about value evidence.",
          "A financing model should present all three tests side by side, at both the quoted and a stressed rate, so the structure can be evaluated as a whole rather than as a single headline number.",
        ],
      },
    ],
    related: [
      "building-reliable-cre-models",
      "acquisition-underwriting-key-assumptions",
      "exit-cap-rates-and-returns",
    ],
  },
  {
    slug: "equity-waterfall-structures",
    title: "Understanding Equity Waterfall Structures",
    category: "Structuring",
    excerpt:
      "Preferred returns, catch-ups and promotes: how partnership economics actually work through a waterfall, and what to test before agreeing terms.",
    date: "2026-10-28",
    readingTime: "10 min read",
    image: "/images/insight-waterfall.jpg",
    imageAlt:
      "Faceted white glass façade catching low sunlight at an angle",
    status: "draft",
    body: [
      {
        paragraphs: [
          "An equity waterfall is the mechanism that allocates cash flow between partners. It is often summarised in a term sheet in a few lines, but those lines determine how hundreds of millions of dollars are ultimately divided. Modelling the waterfall correctly — and testing how it behaves under different outcomes — is one of the highest-value analytical exercises in a real estate transaction.",
        ],
      },
      {
        heading: "Why waterfalls exist",
        paragraphs: [
          "Limited partners provide most of the capital; general partners provide the operating capability and accept responsibility for execution. The waterfall aligns those contributions: investors receive a preferred return on capital first, the sponsor receives a disproportionate share of profits above that threshold, and the split shifts again as performance improves.",
          "The structure is intended to compensate the sponsor for outperformance, not for the passage of time. Most of the complexity in waterfall negotiation concerns how that distinction is defined and measured.",
        ],
      },
      {
        heading: "The building blocks",
        list: [
          "Preferred return: a cumulative return on unreturned capital, often 7–9% per annum, which may be simple or compounded",
          "Return of capital: whether capital is returned before, alongside or after preferred return accrual",
          "Catch-up: a provision that allows the sponsor to receive a share of distributions until it has caught up to its target promote position",
          "Promote tiers: increasing sponsor shares as the investor achieves higher return hurdles",
          "Clawback: an obligation to return excess promote if the overall outcome is lower than interim distributions implied",
          "Lookback: a final reconciliation of distributions against the agreed split",
        ],
      },
      {
        heading: "Simple versus compounded accruals",
        paragraphs: [
          "The difference between simple and compounded preferred return is easy to overlook and material over a multi-year hold. A simple 8% preference accrues on contributed capital only; a compounded preference accrues on unpaid preference as well. In a long-hold, low-distribution scenario the gap can be substantial.",
          "The model must also define the timing convention: monthly, quarterly or annual accrual, and whether distributions are assumed at period end. These choices change the IRR outcome even when the underlying cash flows are identical.",
        ],
      },
      {
        heading: "IRR hurdles versus multiple hurdles",
        paragraphs: [
          "Most promote structures use IRR hurdles, but some use equity multiples or a combination. IRR-based hurdles reward early distributions, which can create incentives that are not always aligned with long-term value. Multiple-based hurdles reward total capital growth and are less sensitive to timing.",
          "A robust waterfall model should be able to switch between hurdle definitions and show the effect on both sponsor and investor outcomes. It should also show the distribution cascade by tier, not simply the final split.",
        ],
      },
      {
        heading: "What to test before agreeing terms",
        list: [
          "A base case, an upside case and a downside case with an extended hold",
          "The effect of a capital call or additional equity contribution after the initial close",
          "Refinancing proceeds and whether they are treated as return of capital or distribution",
          "The point at which the sponsor reaches each promote tier, and how sensitive that is to exit timing",
          "Clawback exposure if early distributions exceed the final entitlement",
        ],
        quote:
          "A waterfall is only as reliable as the cash flow it sits on. Model the tiers on a fully tested property cash flow, then stress the structure itself.",
      },
      {
        heading: "Documentation and transparency",
        paragraphs: [
          "The waterfall should be documented in the model with the same clarity as the property assumptions: definitions, accrual conventions, tier thresholds and the order of distributions. Where the partnership agreement is silent or ambiguous, the model should flag the assumption rather than resolve it silently.",
          "Investors and sponsors alike benefit from a waterfall schedule that can be read line by line. If the allocation cannot be explained to a counterparty without opening the formulas, the model is not yet ready for negotiation.",
        ],
      },
    ],
    related: [
      "acquisition-underwriting-key-assumptions",
      "building-reliable-cre-models",
      "multifamily-underwriting-fundamentals",
    ],
  },
  {
    slug: "exit-cap-rates-and-returns",
    title: "How Exit Capitalization Rates Influence Investment Returns",
    category: "Valuation",
    excerpt:
      "Exit assumptions can account for a large share of total return. A structured approach to selecting, evidencing and stress-testing the terminal cap rate.",
    date: "2026-10-21",
    readingTime: "8 min read",
    image: "/images/insight-exit-cap.jpg",
    imageAlt:
      "Glass office tower rising into a bright sky with soft cloud cover",
    status: "draft",
    body: [
      {
        paragraphs: [
          "In a discounted cash flow, the exit value is often the largest single number in the model. It is also one of the least evidenced. A terminal capitalisation rate applied to a forward NOI assumption can move an IRR by several hundred basis points, yet it frequently receives less scrutiny than a rent assumption in year two.",
        ],
      },
      {
        heading: "The arithmetic of exit value",
        paragraphs: [
          "Exit value is typically calculated as stabilised forward NOI divided by a terminal cap rate. A 25 basis point move in the cap rate changes value by roughly 3–4% at typical valuation levels — enough to alter a return profile materially when applied to a leveraged investment.",
          "The choice of NOI matters as much as the rate. Using year-one forward NOI at exit assumes the asset is stabilised and that capital requirements have been addressed. Using trailing NOI may overstate value if income is declining, and using a pro forma that assumes future rent growth without the associated capital can overstate it further.",
        ],
      },
      {
        heading: "Cap rate compression and expansion",
        paragraphs: [
          "Returns are driven by the relationship between going-in and exit cap rates. Buying at a higher cap rate and exiting at a lower one produces valuation-driven gain; the reverse erodes return even if operating performance is solid.",
          "Underwriting should make this explicit. If the business plan depends on cap rate compression to achieve its target return, that dependency should be stated and stress-tested rather than embedded silently in the exit assumption.",
        ],
        quote:
          "An exit cap rate is a market assumption, not a modelling convenience. If it cannot be evidenced, it should be sensitised.",
      },
      {
        heading: "Selecting a defensible terminal rate",
        list: [
          "Current transaction evidence for comparable assets, adjusted for quality, location and lease profile",
          "The spread between going-in and exit cap rates, tested against historical norms",
          "Interest rate expectations and the cost of capital at the assumed exit date",
          "Asset-specific risk: lease rollover, capital needs, market liquidity",
          "Whether the assumed buyer would underwrite the same NOI and capital plan",
        ],
      },
      {
        heading: "Sensitivity and scenario design",
        paragraphs: [
          "A single exit assumption produces a single IRR. A sensitivity table combining exit cap rate and hold period is considerably more useful, because it shows the range of outcomes the investment can tolerate. Adding a NOI stress alongside the cap rate stress reveals whether the return depends more on operations or on valuation.",
          "For investment committee purposes, the most useful presentation is rarely the base case alone. It is the base case accompanied by a clear view of the assumptions that would cause it to fail.",
        ],
      },
      {
        heading: "Common modelling errors",
        list: [
          "Applying a terminal cap rate to NOI that still includes non-recurring income",
          "Ignoring selling costs, debt repayment and any promote distributions at exit",
          "Assuming stabilised occupancy without funding the lease-up or tenant improvements",
          "Using a cap rate that reflects a different asset quality or lease profile than the subject",
          "Failing to reconcile the exit value against price per unit or per square foot benchmarks",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Exit assumptions deserve the same analytical rigour as acquisition assumptions. A defensible terminal cap rate, applied to a properly normalised NOI and tested across a range of outcomes, gives decision-makers a clearer view of what the investment is actually worth — and what it depends on.",
        ],
      },
    ],
    related: [
      "dscr-debt-yield-ltv",
      "acquisition-underwriting-key-assumptions",
      "building-reliable-cre-models",
    ],
  },
  {
    slug: "building-reliable-cre-models",
    title: "Building Reliable Commercial Real Estate Financial Models",
    category: "Modelling",
    excerpt:
      "Structure, controls and documentation: the practices that separate a model that supports a decision from one that merely produces a number.",
    date: "2026-10-14",
    readingTime: "9 min read",
    image: "/images/insight-modelling.jpg",
    imageAlt:
      "Modern glass office building with a projecting canopy and clean horizontal façade lines",
    status: "draft",
    body: [
      {
        paragraphs: [
          "Most real estate models are built under time pressure, for a specific transaction, by someone who will not be the person maintaining them six months later. The result is often a workbook that produces a plausible IRR but cannot be audited, updated or defended when an assumption is challenged.",
          "Reliability is not a matter of complexity. A well-built model is usually simpler than a poorly built one, because it separates inputs from calculations, applies conventions consistently and makes its own logic visible.",
        ],
      },
      {
        heading: "Define the decision before building",
        paragraphs: [
          "A model should be built around the decision it supports. An acquisition model needs to answer whether the price and business plan produce an acceptable risk-adjusted return. A development model needs to answer whether the project can be funded through its capital calls and still meet its return targets. A portfolio model needs to compare assets on a consistent basis.",
          "Defining the outputs first — the exact return metrics, the debt tests, the reporting format — prevents the model from accumulating unnecessary schedules and keeps the structure aligned with the audience.",
        ],
      },
      {
        heading: "Separate inputs, calculations and outputs",
        paragraphs: [
          "The single most useful structural principle is a clear separation between assumptions, calculations and presentation. Inputs should be on their own sheet, colour-coded and documented. Calculations should reference inputs rather than repeat them. Outputs should be formatted for reading, not for calculation.",
          "Hard-coded numbers inside formulas are the most common source of error. If a value can change, it belongs in an input cell with a label, a unit and a source note.",
        ],
        list: [
          "One input per assumption, referenced everywhere else",
          "Consistent row and column structure across periods and scenarios",
          "No circular references unless deliberately used for interest and clearly flagged",
          "Separate schedules for revenue, expenses, capital, debt and equity",
        ],
      },
      {
        heading: "Get the timing conventions right",
        paragraphs: [
          "Real estate models are sensitive to timing. Monthly versus annual periods, beginning versus end-of-period cash flows, and the treatment of partial periods all affect returns. Choose a convention, document it, and apply it consistently across every schedule.",
          "Development models require particular care: construction spend, draw timing, interest capitalisation and lease-up commencement must align. A half-period error in a capital call can change the equity IRR without changing the underlying economics.",
        ],
      },
      {
        heading: "Build checks into the model",
        paragraphs: [
          "A reliable model checks itself. Sources and uses should balance. The debt schedule should reconcile to the loan balance. Distributions should not exceed available cash. The balance sheet, where included, should balance each period. These checks should be visible on the output sheet, not buried in a hidden tab.",
          "Error checks are not a substitute for review, but they catch the failures that are most likely to survive a quick visual inspection.",
        ],
      },
      {
        heading: "Document assumptions and version history",
        paragraphs: [
          "Every material assumption should have a source: a rent roll, a broker opinion, a lender quote, an appraisal or an explicit management decision. An assumption register that captures the value, the source, the date and the owner of the assumption is a practical control and a useful communication tool.",
          "Version control matters as much as the model itself. A simple version log — date, author, change and reason — prevents the confusion that arises when multiple versions circulate during diligence.",
        ],
      },
      {
        heading: "Test the model, then test the assumptions",
        paragraphs: [
          "Before relying on a model, run a set of controlled changes: set revenue growth to zero, increase the exit cap rate, extend the hold period, raise construction costs. If the outputs do not move as expected, there is an error in the logic.",
          "Then test the investment case. Sensitivity and scenario analysis should identify the assumptions that drive the outcome, and the model should make it straightforward to present those findings to an investment committee.",
        ],
      },
    ],
    related: [
      "multifamily-underwriting-fundamentals",
      "exit-cap-rates-and-returns",
      "dscr-debt-yield-ltv",
    ],
  },
  {
    slug: "acquisition-underwriting-key-assumptions",
    title: "Acquisition Underwriting: Key Assumptions Every Investor Should Evaluate",
    category: "Underwriting",
    excerpt:
      "The assumption set that determines whether an acquisition meets its return target — and how to test each one before committing capital.",
    date: "2026-10-07",
    readingTime: "9 min read",
    image: "/images/insight-acquisition.jpg",
    imageAlt:
      "Curved reflective glass façade of a contemporary commercial building",
    status: "draft",
    body: [
      {
        paragraphs: [
          "Acquisition underwriting is an exercise in disciplined optimism. The business plan needs to be ambitious enough to justify the price, and credible enough to survive diligence. The difference between the two is usually found in a small number of assumptions that determine most of the outcome.",
          "This article sets out the assumption categories that deserve explicit attention, and the questions that should be answered before they are locked into a model.",
        ],
      },
      {
        heading: "Revenue assumptions",
        paragraphs: [
          "Start with the rent roll and reconcile it to the seller's pro forma. In-place rents, market rents, loss to lease, concessions and vacancy should be modelled separately. A stabilised pro forma that assumes immediate market rent on expiring leases is not conservative — it is a statement about leasing execution.",
        ],
        list: [
          "What is the actual mark-to-market by lease or unit, and when does it occur?",
          "How much downtime is assumed between tenants, and is it supported by comparable leasing history?",
          "Are concessions reflected as a reduction in effective rent or as a one-off cost?",
          "What renewal probability is assumed, and what is the cost of a renewal versus a new lease?",
        ],
      },
      {
        heading: "Operating expenses",
        paragraphs: [
          "Expenses should be rebuilt rather than indexed. Property taxes and insurance are the two lines most likely to change materially after acquisition, and both are frequently understated in seller materials. Management fees and replacement reserves should be treated consistently with the lender's underwriting definition.",
          "For value-add assets, the expense base should reflect the operating model after renovation, not the seller's current staffing and service levels.",
        ],
        quote:
          "If the expense base cannot be reconciled line by line to a source document, the NOI is an estimate rather than an underwriting conclusion.",
      },
      {
        heading: "Capital expenditure",
        paragraphs: [
          "Acquisition models often distinguish between immediate capital, deferred capital identified in diligence, and capital required to execute the business plan. All three affect returns, and all three should be scheduled rather than aggregated into a single closing cost.",
          "Property condition assessments, environmental reports and leasing capital budgets are the primary sources. Where diligence is incomplete, the model should carry an explicit allowance with a documented basis rather than an undefined contingency.",
        ],
      },
      {
        heading: "Financing assumptions",
        paragraphs: [
          "The financing structure should be modelled on the terms actually quoted, including amortisation, interest-only periods, fees, reserves and covenants. Testing coverage and debt yield at a stressed rate is a useful discipline even where the loan is fixed, because it indicates how much refinancing risk exists at maturity.",
          "For floating-rate debt, the cap cost, the assumed forward curve and the refinancing test at maturity are all material assumptions that belong in the model rather than in a side conversation.",
        ],
      },
      {
        heading: "Exit assumptions",
        paragraphs: [
          "Exit value depends on terminal NOI and a capitalisation rate. Both should be evidenced. The terminal year should reflect a stabilised asset with the business plan executed, and the cap rate should be appropriate for the asset's age, lease profile and market at the assumed exit date.",
          "Selling costs, debt repayment, promote distributions and any residual capital items should be included. A gross exit value presented without these deductions overstates the return to equity.",
        ],
      },
      {
        heading: "The business plan as a set of testable assumptions",
        paragraphs: [
          "The most useful underwriting discipline is to express the business plan as a series of specific, testable assumptions: renovate 40 units in year one at a stated cost and achieve a stated rent premium; renew 70% of expiring leases at market; hold for five years and exit at a stated cap rate.",
          "Each assumption can then be challenged, sourced and sensitised. The result is not a single forecast but a clear map of what must happen for the investment to work — which is exactly what an investment committee needs to see.",
        ],
        list: [
          "Identify the three to five assumptions that drive most of the return",
          "Document the source and confidence level for each",
          "Present a downside case that isolates the failure of those assumptions",
          "Confirm the model's outputs reconcile to the investment memorandum narrative",
        ],
      },
    ],
    related: [
      "multifamily-underwriting-fundamentals",
      "exit-cap-rates-and-returns",
      "equity-waterfall-structures",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article) {
  return article.related
    .map((slug) => getArticle(slug))
    .filter((item): item is Article => Boolean(item));
}

/** Newest first. */
export const sortedArticles = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);
