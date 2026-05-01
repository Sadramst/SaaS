import type { Metadata } from "next";
import FeaturesPageClient from "./FeaturesPageClient";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Appilico's mining-specific Power BI analytics visuals — production Gantt charts, equipment heatmaps, safety KPIs, and AI-powered insights.",
};

export default function FeaturesPage() {
  return <FeaturesPageClient />;
}
