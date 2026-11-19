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
 * Multifamily knowledge centre.
 *
 * Only completed, reviewed articles are published. Drafts remain available in
 * this file for editorial work but are excluded from the index, navigation and
 * sitemap. No market benchmark or industry standard is asserted unless it is
 * explicitly labelled as an illustrative example.
 */
export const articles: Article[] = [
  {
    slug: "multifamily-underwriting-fundamentals",
    title: "Understanding the Fundamentals of Multifamily Underwriting",
    category: "Underwriting",
    excerpt:
      "A practical framework for moving from a rent roll to a defensible net operating income — and the assumptions that most often decide the outcome.",
    date: "2026-11-17",
    readingTime: "8 min read",
    image: "/images/industry-multifamily.jpg",
    imageAlt:
      "Garden-style US multifamily apartment buildings with brick, balconies and landscaped grounds",
    status: "published",
    body: [
      {
        paragraphs: [
          "Multifamily underwriting looks deceptively straightforward. There is a rent roll, an operating statement, a purchase price and a debt quote. That apparent simplicity is why so many models are built quickly — and why so many rely on blended averages that hide the assumptions actually driving value.",
          "A reliable Multifamily model works from the unit up. It treats revenue and expenses as operating decisions rather than historical averages, and it makes the connection between the business plan and the cash flow explicit.",
        ],
      },
      {
        heading: "Start with the rent roll, not the pro forma",
        paragraphs: [
          "The seller's pro forma typically reflects a stabilised version of the asset. The rent roll reflects what is happening today: which units are occupied, what they pay, when leases expire, and how much rent has been given away through concessions.",
          "Reconciling the two is the first analytical task. Gross potential rent should be built from unit types and market rents, not from a single blended figure. Loss to lease, vacancy, concessions, bad debt and non-revenue units should each be visible and separately supported.",
        ],
        list: [
          "Compare in-place rents with current market rent by unit type, not portfolio-wide",
          "Identify concessions and their expiry — a concession is deferred revenue, not permanent income",
          "Model economic occupancy, including delinquency and model or employee units",
          "Test the renewal assumption against turnover history and local supply",
        ],
      },
      {
        heading: "Normalise the operating expense base",
        paragraphs: [
          "Expense underwriting is where conservative assumptions are frequently confused with unsupported ones. The objective is not to add a blanket inflation margin, but to rebuild the expense base line by line so that each item reflects the asset, the market and the operating model.",
          "Property taxes deserve particular attention. A sale can trigger reassessment, and the seller's current bill may not reflect the new basis. Insurance has repriced in many markets, and payroll assumptions should reflect realistic staffing levels rather than a prior owner's lean structure.",
        ],
        list: [
          "Recover taxes and insurance from the assessor and current policies where possible",
          "Separate controllable expenses from fixed obligations",
          "Include management fees and replacement reserves consistently with the lender's NOI definition",
          "Identify expenses that will change under the business plan, such as added staffing during lease-up",
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
        heading: "From NOI to value and debt",
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
      "analysing-multifamily-rent-roll",
      "reconstructing-noi-from-t12",
      "exit-cap-rates-multifamily-returns",
    ],
  },
  {
    slug: "analysing-multifamily-rent-roll",
    title: "How to Analyse a Multifamily Rent Roll",
    category: "Revenue Analysis",
    excerpt:
      "The rent roll is the operating foundation of a Multifamily model. A structured approach to reading it, reconciling it and turning it into supportable revenue assumptions.",
    date: "2026-11-12",
    readingTime: "7 min read",
    image: "/images/insight-rent-roll.jpg",
    imageAlt:
      "Brick multifamily apartment façade with balconies and planted borders",
    status: "published",
    body: [
      {
        paragraphs: [
          "A rent roll is more than a list of units and rents. It records the current leasing position of the asset: unit type, square footage, occupancy status, lease dates, in-place rent, concessions and sometimes delinquency. Read carefully, it tells you where revenue is stable, where it is exposed, and where the seller's assumptions diverge from the evidence.",
          "The objective of rent roll analysis is not to reproduce the schedule. It is to build a clean revenue base that can be tested against market rent, turnover expectations and the business plan.",
        ],
      },
      {
        heading: "Reconcile the totals before analysing the detail",
        paragraphs: [
          "Start by tying the rent roll to the trailing operating statement. Monthly scheduled rent multiplied by twelve should reconcile to gross potential rent, allowing for vacant units, model units and any non-revenue space. Differences are not automatically errors, but they need an explanation.",
        ],
        list: [
          "Confirm the as-of date and that every unit appears once",
          "Tie occupied units, vacant units and model or employee units to the property's unit count",
          "Reconcile scheduled rent to the operating statement's rental income line",
          "Identify lease charges, pet rent, parking and other income separately from base rent",
        ],
      },
      {
        heading: "Build the unit mix",
        paragraphs: [
          "Group units by floor plan and bedroom count, then calculate average in-place rent, average square footage and rent per square foot for each group. Blended averages across a whole property can obscure meaningful differences between unit types and renovation status.",
          "Where a property has a renovation programme, separate renovated and unrenovated units. Mixing them in one average makes it difficult to see the premium actually being achieved and the capital still required.",
        ],
      },
      {
        heading: "Analyse lease expirations and turnover",
        paragraphs: [
          "The expiration profile shows how quickly the rent roll can be repositioned. A property with a large share of leases expiring in the next twelve months has more near-term mark-to-market opportunity, but also more exposure to downtime and leasing costs.",
          "Renewal assumptions should be grounded in the property's own history where available, adjusted for current market conditions. For each expiring lease, the model needs a view on renewal probability, renewal rent, turnover cost and vacancy downtime.",
        ],
      },
      {
        heading: "Quantify concessions and loss to lease",
        paragraphs: [
          "Concessions reduce effective rent even when face rent looks strong. Identify free rent, waived fees and other incentives, note when they expire, and model the revenue step-up only when it is contractually supported.",
          "Loss to lease is the difference between market rent and in-place rent for occupied units. It is a source of future revenue, but capturing it depends on renewal timing, tenant retention and the market's ability to absorb increases. It should be modelled as a gradual assumption, not an immediate uplift.",
        ],
      },
      {
        heading: "Translate the rent roll into model inputs",
        paragraphs: [
          "A clean rent roll produces a set of specific inputs: gross potential rent by unit type, loss to lease, concessions, vacancy, bad debt and other income. Each should have a source and a rationale.",
          "The finished schedule should allow a reviewer to move from the unit-level detail to the revenue line in the operating statement without guesswork. That traceability is what makes the underwriting defensible.",
        ],
      },
    ],
    related: [
      "multifamily-underwriting-fundamentals",
      "loss-to-lease-and-concessions",
      "reconstructing-noi-from-t12",
    ],
  },
  {
    slug: "reconstructing-noi-from-t12",
    title: "Reconstructing NOI from a T-12 Operating Statement",
    category: "Financial Analysis",
    excerpt:
      "A trailing twelve-month statement is a starting point, not an answer. How to normalise reported results into an underwriting NOI that can be defended.",
    date: "2026-11-06",
    readingTime: "8 min read",
    image: "/images/insight-noi.jpg",
    imageAlt:
      "Balconies and brick detail on a contemporary multifamily apartment building",
    status: "published",
    body: [
      {
        paragraphs: [
          "The trailing twelve-month operating statement (T-12) records what a property actually earned and spent. It is the best available evidence of current operations, but it is rarely a suitable input for valuation without adjustment.",
          "Normalisation is the process of removing items that will not recur, correcting misclassification and reflecting the operating model that a buyer intends to run. The output is an underwriting NOI: a forward-looking, property-level measure that can be compared with the market and used for valuation and debt sizing.",
        ],
      },
      {
        heading: "Start with the accounting basis",
        paragraphs: [
          "Confirm whether the statement is cash or accrual, whether it covers the full twelve months, and whether any periods are missing or estimated. Ask for the general ledger detail behind unusual lines. A summary statement can hide one-off credits, owner expenses or capital items recorded as operating costs.",
        ],
      },
      {
        heading: "Normalise revenue",
        paragraphs: [
          "Begin with rental income and reconcile it to the rent roll. Remove non-recurring items such as retroactive charges, lease termination income or insurance proceeds. Then assess other income lines: fees, parking, pet rent, laundry and ancillary services should be tested for sustainability.",
        ],
        list: [
          "Remove one-time income and prior-period adjustments",
          "Reconcile rental income to occupied units and in-place rents",
          "Separate recoverable income from non-recoverable income",
          "Test whether fees and ancillary income will survive a change of ownership",
        ],
      },
      {
        heading: "Normalise operating expenses",
        paragraphs: [
          "Rebuild the expense base line by line. Property taxes should reflect the expected assessed value after sale where reassessment is likely. Insurance should reflect current market premiums, not an older policy. Payroll should support the staffing model required by the asset and the business plan.",
          "Management fees and replacement reserves need consistent treatment. Lenders may underwrite a minimum reserve or a specific management fee, and the definition of NOI used for valuation should be stated clearly.",
        ],
        quote:
          "A normalised NOI is not a more conservative NOI. It is a more accurate one, with each adjustment explained and sourced.",
      },
      {
        heading: "Separate capital from operating",
        paragraphs: [
          "Capital expenditure is often recorded in the operating statement, particularly in smaller owner-operated assets. Roof replacements, unit renovations, appliance packages and major repairs should be moved to the capital schedule rather than left in expenses.",
          "At the same time, deferred maintenance identified in diligence should be scheduled as a future capital requirement. Removing capital from historical expenses without recognising the future spend would overstate sustainable NOI.",
        ],
      },
      {
        heading: "Reconcile to the underwriting model",
        paragraphs: [
          "The normalised statement should flow directly into the model's revenue and expense schedules. Each line should carry a reference to its source: the T-12, the rent roll, the tax assessor, an insurance quote or a stated management assumption.",
          "A useful final check is to compare normalised NOI per unit and the resulting expense ratio against the property's own history and against comparable assets. Large differences may be justified, but they should be explainable.",
        ],
      },
    ],
    related: [
      "analysing-multifamily-rent-roll",
      "multifamily-underwriting-fundamentals",
      "operating-expense-analysis-multifamily",
    ],
  },
  {
    slug: "loss-to-lease-and-concessions",
    title: "Understanding Loss to Lease and Rental Concessions",
    category: "Revenue Analysis",
    excerpt:
      "Two revenue adjustments that are often blended into a single assumption. Separating them improves the accuracy of rent growth and stabilisation analysis.",
    date: "2026-10-29",
    readingTime: "6 min read",
    image: "/images/insight-concessions.jpg",
    imageAlt:
      "Modern high-rise residential building with glazed balconies at sunset",
    status: "published",
    body: [
      {
        paragraphs: [
          "Loss to lease and concessions both reduce the gap between gross potential rent and collected rent, but they behave differently. Loss to lease reflects the difference between market rent and what occupied units currently pay. Concessions are incentives granted to secure or retain tenants, often in the form of free rent or waived fees.",
          "Treating them as one adjustment can overstate the speed at which revenue can be captured and understate the cost of maintaining occupancy.",
        ],
      },
      {
        heading: "Loss to lease",
        paragraphs: [
          "Calculate loss to lease by comparing in-place rent with market rent for each occupied unit or unit type. The result is the monthly revenue that could be captured if every lease renewed at market today — which is not the same as revenue that will be captured.",
          "The realistic capture rate depends on lease expiration timing, renewal increases, tenant turnover and market conditions. A property with long remaining lease terms and strong retention may take several years to work through its loss to lease.",
        ],
        list: [
          "Use consistent market rent assumptions by unit type and condition",
          "Calculate loss to lease only on occupied units",
          "Separate the portion expected to be captured through renewals from the portion dependent on turnover",
          "Test the assumption against recent renewal increases and new lease rents",
        ],
      },
      {
        heading: "Concessions",
        paragraphs: [
          "Concessions are a leasing cost and a signal about market conditions. A property offering one month free on a twelve-month lease is effectively giving up roughly 8.3% of face rent for that lease term, before considering the timing of the concession.",
          "The model should reflect the concession as a revenue reduction during the affected period, then step back to face rent when it expires. If the business plan assumes concessions will disappear, that assumption should be tested against current leasing velocity and local supply.",
        ],
      },
      {
        heading: "Why separation matters",
        paragraphs: [
          "If concessions are embedded in a lower average rent, the model may understate the property's ability to raise rents when concessions expire. If loss to lease is treated as immediate upside, the model may overstate near-term revenue. Both errors affect valuation and debt capacity.",
          "Separating the two also improves comparability between assets. A property with high face rents and large concessions may look stronger on a rent roll than an equivalent property with lower face rents and no incentives, even though economic occupancy is similar.",
        ],
        quote:
          "Economic occupancy is the discipline: what the property actually collects, not what the rent roll says it could collect.",
      },
      {
        heading: "Modelling approach",
        paragraphs: [
          "Build revenue from gross potential rent, then apply loss to lease, concessions, vacancy and bad debt as distinct lines. This structure allows each assumption to be sensitised and reviewed independently.",
          "When presenting the investment case, show the bridge from gross potential rent to collected rent. It makes the leasing assumptions visible and gives the investment committee a clearer basis for challenging the revenue plan.",
        ],
      },
    ],
    related: [
      "analysing-multifamily-rent-roll",
      "multifamily-underwriting-fundamentals",
      "reconstructing-noi-from-t12",
    ],
  },
  {
    slug: "operating-expense-analysis-multifamily",
    title: "Multifamily Operating Expense Benchmarks: What to Evaluate",
    category: "Operations",
    excerpt:
      "Expense benchmarking is useful when it explains differences, not when it replaces analysis. A line-by-line approach to the Multifamily operating base.",
    date: "2026-10-22",
    readingTime: "7 min read",
    image: "/images/insight-expenses.jpg",
    imageAlt:
      "Landscaped walkway and planted borders at a US multifamily apartment community",
    status: "published",
    body: [
      {
        paragraphs: [
          "Operating expense benchmarks are a useful sense-check, but they are not underwriting. Two properties of similar age and unit count can have materially different expense structures because of tax jurisdictions, insurance markets, staffing models, amenity levels and capital condition.",
          "The objective is to understand why an asset's expenses differ from its peers, and whether the difference is sustainable or correctable.",
        ],
      },
      {
        heading: "Use per-unit and percentage measures together",
        paragraphs: [
          "Expenses per unit provide a consistent basis for comparison across properties of different sizes. Expense ratios relative to revenue show how much of each rent dollar is consumed by operations. Neither measure is sufficient on its own.",
          "A property with high expenses per unit may still have a low expense ratio if rents are strong. A property with a low expense ratio may be under-investing in maintenance and staffing, creating future capital or operational risk.",
        ],
      },
      {
        heading: "Examine the controllable base",
        paragraphs: [
          "Controllable expenses — payroll, repairs and maintenance, marketing, administrative costs and contract services — are the areas where management can influence outcomes. Review staffing levels against the property's size and service model, and test whether maintenance spending is consistent with the asset's condition.",
          "A sharp reduction in repairs and maintenance in the trailing period is worth investigating. It may reflect efficient management, or it may be deferred maintenance that will return as capital expenditure.",
        ],
      },
      {
        heading: "Test the non-controllable lines",
        paragraphs: [
          "Property taxes and insurance are typically the largest non-controllable expenses and the most likely to change after acquisition. Confirm the assessment basis, any pending appeals, and the coverage and deductible structure behind the insurance premium.",
          "Utilities should be reviewed for recovery arrangements and consumption trends. Where residents pay directly, the owner's exposure is lower, but common-area consumption still matters.",
        ],
      },
      {
        heading: "Benchmark with a clear purpose",
        paragraphs: [
          "When using third-party benchmarks, confirm what they measure, which properties they include and how recent the data is. A benchmark that includes a different asset class, vintage or service level is not a reliable comparison.",
          "Present benchmarks as context, not as a substitute for a bottom-up expense build. The underwriting conclusion should rest on the specific asset's operating plan.",
        ],
        quote:
          "A benchmark tells you whether a number is unusual. It does not tell you whether it is right for this property.",
      },
    ],
    related: [
      "reconstructing-noi-from-t12",
      "multifamily-underwriting-fundamentals",
      "value-add-renovation-premiums",
    ],
  },
  {
    slug: "exit-cap-rates-multifamily-returns",
    title: "How Exit Cap Rates Impact Multifamily Investment Returns",
    category: "Valuation",
    excerpt:
      "Exit assumptions can account for a large share of total return. A structured approach to selecting, evidencing and stress-testing the terminal cap rate.",
    date: "2026-10-15",
    readingTime: "7 min read",
    image: "/images/insight-exit-cap.jpg",
    imageAlt:
      "Sunlit balconies on a high-rise multifamily residential tower",
    status: "published",
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
        paragraphs: [
          "Current transaction evidence for comparable Multifamily assets is the starting point, adjusted for quality, location, unit mix, age and the assumed capital position at exit. Where transaction evidence is thin, a wider sensitivity range is more honest than a single point estimate.",
        ],
        list: [
          "Adjust comparable cap rates for asset quality, location and vintage",
          "Test the spread between going-in and exit cap rates against historical norms",
          "Consider interest rates and the cost of capital at the assumed exit date",
          "Reflect asset-specific risk: capital needs, market liquidity and operating stability",
          "Confirm the assumed buyer would underwrite the same NOI and capital plan",
        ],
      },
      {
        heading: "Sensitivity and scenario design",
        paragraphs: [
          "A single exit assumption produces a single IRR. A sensitivity table combining exit cap rate and hold period is considerably more useful, because it shows the range of outcomes the investment can tolerate. Adding an NOI stress alongside the cap rate stress reveals whether the return depends more on operations or on valuation.",
          "For investment committee purposes, the most useful presentation is rarely the base case alone. It is the base case accompanied by a clear view of the assumptions that would cause it to fail.",
        ],
      },
      {
        heading: "Common modelling errors",
        list: [
          "Applying a terminal cap rate to NOI that still includes non-recurring income",
          "Ignoring selling costs, debt repayment and any promote distributions at exit",
          "Assuming stabilised occupancy without funding lease-up or unit renovations",
          "Using a cap rate that reflects a different asset quality or market than the subject",
          "Failing to reconcile exit value against price per unit evidence",
        ],
      },
    ],
    related: [
      "dscr-debt-yield-ltv-multifamily",
      "multifamily-underwriting-fundamentals",
      "value-add-renovation-premiums",
    ],
  },
  {
    slug: "dscr-debt-yield-ltv-multifamily",
    title: "Understanding DSCR, Debt Yield and LTV for Multifamily Debt",
    category: "Debt",
    excerpt:
      "Three constraints, one loan. How coverage, debt yield and leverage interact — and why the binding test matters for Multifamily sizing and structure.",
    date: "2026-10-08",
    readingTime: "7 min read",
    image: "/images/insight-lending.jpg",
    imageAlt:
      "Brick multifamily apartment buildings with glazed balconies and landscaping",
    status: "published",
    body: [
      {
        paragraphs: [
          "Multifamily loan sizing is governed by a small set of ratios that every borrower and lender discusses, but which are often applied without a clear view of how they interact. Debt service coverage, debt yield and loan-to-value each test a different dimension of the loan, and the one that binds determines how the transaction can be structured.",
        ],
      },
      {
        heading: "Debt service coverage ratio",
        paragraphs: [
          "DSCR compares net operating income with annual debt service. It answers a simple question: how much cushion exists if income falls? Because debt service depends on the interest rate, amortisation and any interest-only period, the same loan amount can produce very different coverage under different terms.",
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
          "LTV compares the loan with the appraised or underwritten value of the property. It is the most familiar of the three metrics and the most dependent on valuation methodology. A higher stabilised value assumption can make an aggressive loan appear conservative.",
          "For development and transitional assets, lenders may apply LTV to cost or to stabilised value, which changes the constraint materially. The basis of value should always be stated alongside the ratio.",
        ],
      },
      {
        heading: "An illustrative sizing example",
        paragraphs: [
          "Consider a Multifamily property with underwritten NOI of $1,200,000, a 6.5% fixed rate, 30-year amortisation, a lender minimum DSCR of 1.25x, a minimum debt yield of 9.0% and a maximum LTV of 65% against an $18,750,000 value. These figures are illustrative only and do not represent a market quotation or a client transaction.",
        ],
        list: [
          "DSCR constraint: at 1.25x, maximum annual debt service is $960,000, which supports roughly $12.65 million of loan at 6.5% over 30 years",
          "Debt yield constraint: at 9.0%, maximum loan is $13.33 million",
          "LTV constraint: at 65%, maximum loan is $12.19 million",
        ],
      },
      {
        heading: "What this means for structure",
        paragraphs: [
          "In this illustrative example, LTV binds, with DSCR close behind. If the rate rose or amortisation shortened, coverage would become the binding constraint. If the property were valued more aggressively, LTV would loosen while debt yield stayed unchanged — which is precisely why lenders rely on more than one test.",
          "If coverage binds, a longer amortisation schedule, a lower rate or an interest-only period can release capacity. If debt yield binds, only more income or less leverage will help. If LTV binds, the conversation is about value evidence.",
          "A financing model should present all three tests side by side, at both the quoted and a stressed rate, so the structure can be evaluated as a whole rather than as a single headline number.",
        ],
      },
    ],
    related: [
      "exit-cap-rates-multifamily-returns",
      "multifamily-underwriting-fundamentals",
      "understanding-preferred-returns-jv-waterfalls",
    ],
  },
  {
    slug: "value-add-renovation-premiums",
    title: "Value-Add Multifamily Underwriting: Testing Renovation Premiums",
    category: "Value-Add",
    excerpt:
      "Renovation programmes create value only when the rent premium, cost, pace and downtime assumptions hold together. How to test the chain.",
    date: "2026-09-30",
    readingTime: "7 min read",
    image: "/images/insight-value-add.jpg",
    imageAlt:
      "High-rise apartment balconies with warm evening light",
    status: "published",
    body: [
      {
        paragraphs: [
          "Value-add Multifamily underwriting usually rests on a simple proposition: invest capital in units, achieve a rent premium, and create value from the spread. The arithmetic looks straightforward. The execution assumptions are where most of the risk sits.",
          "A credible renovation model separates the capital cost, the rent premium, the renovation pace, the downtime and the market's ability to absorb the repositioned product.",
        ],
      },
      {
        heading: "Define the renovation scope",
        paragraphs: [
          "Start with a unit-level scope: what is being replaced or upgraded, and at what cost per unit. Distinguish between cosmetic upgrades, functional improvements and structural work. The scope should be supported by a contractor estimate or a documented allowance, not a single blended figure.",
          "Common-area and amenity capital should be modelled separately. These investments may support the rent premium, but they do not produce it directly and should be assessed on their own merits.",
        ],
      },
      {
        heading: "Test the rent premium",
        paragraphs: [
          "The rent premium should be evidenced by achieved rents at comparable renovated properties, not by the seller's pro forma. Compare like-for-like unit types and locations within the submarket, and consider whether the subject's position supports the same pricing.",
          "A premium that is achievable at a newer, better-located asset may not be achievable here. The model should show the premium as a range and identify the assumptions that would cause it to fall short.",
        ],
      },
      {
        heading: "Model the pace and the downtime",
        paragraphs: [
          "Renovation capital is spent before the rent premium is collected. The pace at which units are completed, leased and stabilised affects the timing of cash flow and the equity requirement. A programme that assumes all units are renovated in year one without vacancy or leasing downtime is optimistic.",
          "Model units offline during renovation, the turn cost and the lease-up period after completion. If renovations are phased, reflect the capital spend and revenue uplift in the period in which they occur.",
        ],
        quote:
          "The rent premium is the headline. The pace, downtime and absorption assumptions determine whether it is actually captured.",
      },
      {
        heading: "Consider the market's absorption capacity",
        paragraphs: [
          "A single renovated unit can achieve a premium in almost any market. A programme that repositions a large share of the property depends on whether the submarket can absorb that product at the assumed rent without extending lease-up or increasing concessions.",
          "Review competing supply, the property's location within the submarket, and the depth of demand at the target rent. If the programme is large relative to comparable inventory, a slower absorption assumption is prudent.",
        ],
      },
      {
        heading: "Measure the return on the capital",
        paragraphs: [
          "Evaluate the renovation programme as an investment: capital outlay, incremental NOI and the value created at exit. A programme that produces a rent premium but consumes more capital than the value it creates is not accretive, even if the headline return looks attractive.",
          "Sensitivity analysis should test cost overruns, lower premiums, slower absorption and a higher exit cap rate. The purpose is not to produce a pessimistic case, but to show which assumption the investment depends on most.",
        ],
      },
    ],
    related: [
      "multifamily-underwriting-fundamentals",
      "exit-cap-rates-multifamily-returns",
      "analysing-multifamily-rent-roll",
    ],
  },
  {
    slug: "multifamily-development-modelling",
    title: "Multifamily Development Modelling: From Construction to Stabilisation",
    category: "Development",
    excerpt:
      "A development model has to connect budget, draw schedule, lease-up and exit. The structural choices that keep the analysis coherent.",
    date: "2026-09-23",
    readingTime: "8 min read",
    image: "/images/insight-development.jpg",
    imageAlt:
      "Multifamily apartment community with brick façades and landscaped grounds",
    status: "published",
    body: [
      {
        paragraphs: [
          "A Multifamily development model is a cash flow problem before it is a return calculation. Capital is spent over a construction period, units are leased over a stabilisation period, and value is realised at an exit that may be years away. The model has to keep those phases connected.",
          "Most development modelling errors are structural rather than mathematical: costs and draws fall out of sync, lease-up starts before units are delivered, or the exit is calculated on an NOI the asset has not yet achieved.",
        ],
      },
      {
        heading: "Build the sources and uses first",
        paragraphs: [
          "Start with a detailed development budget: land, hard costs, soft costs, contingency, financing costs and working capital. Then map the funding sources: construction loan, equity and any mezzanine or preferred equity.",
          "The sources and uses should balance at closing and throughout the construction period. A model that balances only at the total-project level can hide a timing gap that requires additional equity.",
        ],
      },
      {
        heading: "Align construction spend and draws",
        paragraphs: [
          "Construction costs are incurred on a schedule, and loan draws follow an agreed process. The model should reflect both, including retainage, interest capitalisation and the timing of equity contributions.",
          "A useful discipline is to build the draw schedule from the cost schedule rather than as a separate assumption. If the two are independent, a timing error is almost inevitable.",
        ],
      },
      {
        heading: "Model lease-up realistically",
        paragraphs: [
          "Lease-up assumptions should reflect the market, the unit mix and the competitive supply. Absorption is usually slower at the start and accelerates as the asset gains visibility, then plateaus as it approaches stabilisation.",
          "Include the cost of leasing: concessions, marketing, leasing commissions and operating expenses that begin before stabilisation. A development model that starts collecting rent without funding the lease-up period understates the equity requirement.",
        ],
        quote:
          "Development returns are sensitive to timing. A model that gets the cost right but the timing wrong can still misstate the equity outcome.",
      },
      {
        heading: "Define stabilisation and the exit",
        paragraphs: [
          "Stabilisation should be defined explicitly: occupancy threshold, rent level, expense run-rate and capital completion. The exit value should be based on a stabilised NOI that is consistent with that definition.",
          "If the exit occurs before stabilisation, the buyer will underwrite the remaining lease-up and capital, and the exit value should reflect that. Applying a stabilised cap rate to a partially leased asset overstates value.",
        ],
      },
      {
        heading: "Test the structure, not only the project",
        paragraphs: [
          "Development returns are also affected by the capital structure. Equity contributions, preferred returns, promote tiers and capital calls can change the outcome for each partner even when the project-level return is unchanged.",
          "Run sensitivities on construction cost, construction duration, lease-up pace and exit cap rate. Then test the equity waterfall under those scenarios. The combined view is what an investment committee needs to see.",
        ],
      },
    ],
    related: [
      "understanding-preferred-returns-jv-waterfalls",
      "multifamily-underwriting-fundamentals",
      "exit-cap-rates-multifamily-returns",
    ],
  },
  {
    slug: "understanding-preferred-returns-jv-waterfalls",
    title: "Understanding Preferred Returns and JV Waterfall Structures",
    category: "Structuring",
    excerpt:
      "Preferred returns, catch-ups and promotes determine how Multifamily cash flow is shared. What to define and test before agreeing terms.",
    date: "2026-09-16",
    readingTime: "8 min read",
    image: "/images/insight-waterfall.jpg",
    imageAlt:
      "Glass and brick residential façade with repeating balconies",
    status: "published",
    body: [
      {
        paragraphs: [
          "An equity waterfall is the mechanism that allocates cash flow between partners. It is often summarised in a term sheet in a few lines, but those lines determine how distributions are divided over the life of the investment. Modelling the waterfall correctly — and testing how it behaves under different outcomes — is one of the highest-value analytical exercises in a Multifamily transaction.",
        ],
      },
      {
        heading: "Why waterfalls exist",
        paragraphs: [
          "Limited partners provide most of the capital; general partners provide the operating capability and accept responsibility for execution. The waterfall aligns those contributions: investors receive a preferred return on capital first, the sponsor receives a disproportionate share of profits above that threshold, and the split may shift again as performance improves.",
          "The structure is intended to compensate the sponsor for outperformance, not for the passage of time. Most of the complexity in waterfall negotiation concerns how that distinction is defined and measured.",
        ],
      },
      {
        heading: "The building blocks",
        list: [
          "Preferred return: a cumulative return on unreturned capital, which may be simple or compounded",
          "Return of capital: whether capital is returned before, alongside or after preferred return accrual",
          "Catch-up: a provision that allows the sponsor to receive a share of distributions until it reaches its target promote position",
          "Promote tiers: increasing sponsor shares as the investor achieves higher return hurdles",
          "Clawback: an obligation to return excess promote if the overall outcome is lower than interim distributions implied",
          "Lookback: a final reconciliation of distributions against the agreed split",
        ],
      },
      {
        heading: "Simple versus compounded accruals",
        paragraphs: [
          "The difference between simple and compounded preferred return is easy to overlook and material over a multi-year hold. A simple preference accrues on contributed capital only; a compounded preference accrues on unpaid preference as well. In a long-hold, low-distribution scenario the gap can be substantial.",
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
      "multifamily-development-modelling",
      "multifamily-underwriting-fundamentals",
      "dscr-debt-yield-ltv-multifamily",
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

/** Published articles, newest first. */
export const sortedArticles = [...articles]
  .filter((article) => article.status === "published")
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
