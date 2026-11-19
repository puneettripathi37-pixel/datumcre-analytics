import { redirect } from "next/navigation";

/**
 * Legacy route retained so existing links continue to work.
 * The Industries page has been consolidated into the Multifamily page.
 */
export default function IndustriesPage() {
  redirect("/multifamily");
}
