import { z } from "zod";
import {
  investmentStageOptions,
  serviceOptions,
  timelineOptions,
} from "@/lib/site";

/**
 * Single source of truth for enquiry validation.
 * Imported by the client form and by the API route so both apply identical
 * rules. Keep messages user-facing and non-technical.
 */
export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Please keep your name under 100 characters."),
  businessEmail: z
    .string()
    .trim()
    .min(1, "Please enter your business email address.")
    .max(200, "Please keep your email under 200 characters.")
    .pipe(z.email("Please enter a valid email address.")),
  companyName: z
    .string()
    .trim()
    .min(2, "Please enter your company name.")
    .max(120, "Please keep the company name under 120 characters."),
  jobTitle: z
    .string()
    .trim()
    .min(2, "Please enter your job title.")
    .max(120, "Please keep the job title under 120 characters."),
  service: z.enum(serviceOptions, {
    message: "Please select the service you require.",
  }),
  investmentStage: z.enum(investmentStageOptions, {
    message: "Please select the investment stage.",
  }),
  units: z
    .string()
    .trim()
    .max(20, "Please keep the unit count brief.")
    .optional()
    .default("")
    .refine(
      (value) => value === "" || /^[0-9][0-9,\s]*$/.test(value),
      "Please enter a whole number of units, or leave blank.",
    ),
  market: z
    .string()
    .trim()
    .max(120, "Please keep the property location under 120 characters.")
    .optional()
    .default(""),
  requirements: z
    .string()
    .trim()
    .min(20, "Please provide at least a short sentence (20 characters).")
    .max(3000, "Please keep your description under 3,000 characters."),
  timeline: z.enum(timelineOptions, {
    message: "Please select an expected timeline.",
  }),
  consent: z.literal(true, {
    message: "Please confirm you understand how your information is used.",
  }),
  /** Honeypot — must remain empty. */
  companyWebsite: z.string().max(0).optional().default(""),
  /** Client render timestamp, used for a simple timing check. */
  startedAt: z.coerce.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const contactFieldNames = [
  "fullName",
  "businessEmail",
  "companyName",
  "jobTitle",
  "service",
  "investmentStage",
  "units",
  "market",
  "requirements",
  "timeline",
  "consent",
] as const;
