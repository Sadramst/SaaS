"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import VisualCard from "@/components/dashboard/VisualCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import type { Visual, ApiResponse } from "@/types";

const placeholderVisuals: Visual[] = [
  {
    id: "1",
    name: "Mine Production Gantt",
    slug: "mine-production-gantt",
    description: "Shift-level drill-down with crew and equipment breakdown.",
    category: "Production",
    requiredPlan: "Starter",
    downloadCount: 120,
    tags: ["production", "gantt", "shift"],
  },
  {
    id: "2",
    name: "Equipment Utilisation Heatmap",
    slug: "equipment-utilisation-heatmap",
    description: "Real-time OEE tracking across your fleet.",
    category: "Equipment",
    requiredPlan: "Starter",
    downloadCount: 95,
    tags: ["equipment", "OEE", "heatmap"],
  },
  {
    id: "3",
    name: "Safety KPI Dashboard",
    slug: "safety-kpi-dashboard",
    description: "Leading and lagging indicators with trend alerts.",
    category: "Safety",
    requiredPlan: "Starter",
    downloadCount: 80,
    tags: ["safety", "KPI", "TRIFR"],
  },
  {
    id: "4",
    name: "Ore Grade Waterfall",
    slug: "ore-grade-waterfall",
    description: "Grade tracking from bench to plant with variance analysis.",
    category: "Quality",
    requiredPlan: "Professional",
    downloadCount: 60,
    tags: ["grade", "waterfall", "quality"],
  },
  {
    id: "5",
    name: "Cost Per Tonne Tracker",
    slug: "cost-per-tonne-tracker",
    description: "Operational cost breakdown with anomaly flagging.",
    category: "Finance",
    requiredPlan: "Professional",
    downloadCount: 45,
    tags: ["cost", "finance", "anomaly"],
  },
  {
    id: "6",
    name: "AI Natural Language Query",
    slug: "ai-natural-language-query",
    description: 'Ask questions like "Why did Pit 3 underperform?" and get answers.',
    category: "AI",
    requiredPlan: "Enterprise",
    downloadCount: 30,
    tags: ["AI", "NLP", "query"],
  },
];

export default function VisualsPage() {
  const { user } = useAuth();
  const [visuals, setVisuals] = useState<Visual[]>(placeholderVisuals);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<ApiResponse<Visual[]>>("/api/visuals")
      .then((res) => {
        if (res.data.success && res.data.data && res.data.data.length > 0) {
          setVisuals(res.data.data);
        }
      })
      .catch(() => {
        // Keep placeholder visuals
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner className="py-20" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Visuals</h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse and download mining analytics visuals for your Power BI dashboard.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visuals.map((visual) => (
          <VisualCard key={visual.id} visual={visual} userPlan={user?.subscriptionTier ?? "Free"} />
        ))}
      </div>
    </div>
  );
}
