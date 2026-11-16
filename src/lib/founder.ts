/**
 * Founder profile — EDITABLE PLACEHOLDER.
 *
 * No founder name, biography, credential, designation, tenure or client history
 * has been invented for this website. Populate the fields below with verified
 * information supplied by the business before launch, then set
 * `isPlaceholder` to `false` so the draft notice disappears.
 */
export const founder = {
  isPlaceholder: true,
  name: "[Founder name]",
  role: "Founder & Principal",
  image: "/images/about-architecture.jpg",
  imageAlt:
    "Architectural detail of a modern commercial building façade, used as an editorial image",
  biography: [
    "[Add a short professional biography: background in real estate finance, analytical specialisms, and the type of transactions or portfolios the founder has supported.]",
    "[Add a second paragraph on why DatumCRE was established and how the founder works with clients. Keep claims specific and verifiable.]",
  ],
  credentials: [
    { label: "Qualifications", value: "[Add verified qualification or designation]" },
    { label: "Experience", value: "[Add years / areas of relevant experience]" },
    { label: "Prior roles", value: "[Add verified prior roles or firms]" },
  ],
  quote:
    "[Optional: add a short statement in the founder's own words about the standard of analysis DatumCRE is built to deliver.]",
} as const;
