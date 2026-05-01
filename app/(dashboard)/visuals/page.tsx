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
    description: "Shift-level drill-down with crew and equipment breakdown.",
    category: "Production",
    isPremium: false,
    requiredPlan: "Starter",
    tags: ["production", "gantt", "shift"],
  },
  {
    id: "2",
    name: "Equipment Utilisation Heatmap",
    description: "Real-time OEE tracking across your fleet.",
    category: "Equipment",
    isPremium: false,
    requiredPlan: "Starter",
    tags: ["equipment", "OEE", "heatmap"],
  },
  {
    id: "3",
    name: "Safety KPI Dashboard",
    description: "Leading and lagging indicators with trend alerts.",
    category: "Safety",
    isPremium: false,
    requiredPlan: "Starter",
    tags: ["safety", "KPI", "TRIFR"],
  },
  {
    id: "4",
    name: "Ore Grade Waterfall",
    description: "Grade tracking from bench to plant with variance analysis.",
    category: "Quality",
    isPremium: true,
    requiredPlan: "Professional",
    tags: ["grade", "waterfall", "quality"],
  },
  {
    id: "5",
    name: "Cost Per Tonne Tracker",
    description: "Operational cost breakdown with anomaly flagging.",
    category: "Finance",
    isPremium: true,
    requiredPlan: "Professional",
    tags: ["cost", "finance", "anomaly"],
  },
  {
    id: "6",
    name: "AI Natural Language Query",
    description: 'Ask questions like "Why did Pit 3 underperform?" and get answers.',
    category: "AI",
    isPremium: true,
    requiredPlan: "Enterprise",
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
          <VisualCard key={visual.id} visual={visual} userPlan={user?.plan ?? "Free"} />
        ))}
      </div>
    </div>
  );
}
