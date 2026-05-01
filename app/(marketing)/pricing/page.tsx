import type { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for Appilico's AI-powered mining analytics platform. Plans start at $299/month.",
};

export default function PricingPage() {
  return <PricingPageClient />;
}
