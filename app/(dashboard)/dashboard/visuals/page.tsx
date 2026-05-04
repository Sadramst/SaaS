"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, BarChart3, Cog, Shield, Beaker, DollarSign, Sparkles } from "lucide-react";
import { visualsApi } from "@/lib/api/visuals";
import { useAuthStore } from "@/stores/authStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Visual } from "@/types";

const categories = [
  { value: "", label: "All", icon: BarChart3 },
  { value: "Production", label: "Production", icon: BarChart3 },
  { value: "Equipment", label: "Equipment", icon: Cog },
  { value: "Safety", label: "Safety", icon: Shield },
  { value: "Quality", label: "Quality", icon: Beaker },
  { value: "Finance", label: "Finance", icon: DollarSign },
  { value: "AI", label: "AI", icon: Sparkles },
];

const categoryColors: Record<string, string> = {
  Production: "from-[#1F3864] to-[#2a4a7f]",
  Equipment: "from-[#0070C0] to-[#0090e0]",
  Safety: "from-[#C00000] to-[#e01010]",
  Quality: "from-[#ED7D31] to-[#f09050]",
  Finance: "from-[#00B050] to-[#00d060]",
  AI: "from-[#7030A0] to-[#9040c0]",
};

const planOrder = ["Free", "Starter", "Professional", "Enterprise"];

function canAccess(userPlan: string, requiredPlan: string): boolean {
  return planOrder.indexOf(userPlan) >= planOrder.indexOf(requiredPlan);
}

export default function VisualsPage() {
  const user = useAuthStore((s) => s.user);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVisual, setSelectedVisual] = useState<Visual | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["visuals", selectedCategory],
    queryFn: () => visualsApi.getVisuals(selectedCategory ? { category: selectedCategory } : undefined),
  });

  const visuals = (data?.data ?? []).filter((v) =>
    searchQuery ? v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.description.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Power BI Visual Library</h1>
        <p className="mt-1 text-sm text-gray-500">
          Download mining-specific Power BI custom visuals for your dashboards
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search visuals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={selectedCategory === cat.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(cat.value)}
              className="gap-1.5"
            >
              <cat.icon className="h-3.5 w-3.5" />
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-52 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <p className="text-gray-500">Failed to load visuals</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !error && visuals.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <BarChart3 className="h-12 w-12 text-gray-300" />
          <p className="text-gray-500">No visuals found</p>
        </div>
      )}

      {/* Grid */}
      {!isLoading && visuals.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visuals.map((visual, i) => (
            <motion.div
              key={visual.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedVisual(visual)}
              className={cn(
                "relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br p-6 text-white shadow-md transition-shadow hover:shadow-xl",
                categoryColors[visual.category] ?? "from-[#1F3864] to-[#2a4a7f]"
              )}
            >
              <div className="absolute right-3 top-3">
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
                  {visual.requiredPlan}
                </span>
              </div>
              <BarChart3 className="mb-3 h-8 w-8 text-white/80" />
              <h3 className="text-lg font-bold">{visual.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-white/80">{visual.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-white/60">{visual.downloadCount} downloads</span>
                <Button size="sm" className="bg-white/20 text-white hover:bg-white/30">
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail Sheet */}
      {selectedVisual && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedVisual(null)} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="relative w-full max-w-[480px] overflow-y-auto bg-white p-6 shadow-2xl dark:bg-gray-900"
          >
            <button
              onClick={() => setSelectedVisual(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedVisual.name}</h2>
            <div className="mt-2 flex gap-2">
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium dark:bg-gray-800">
                {selectedVisual.category}
              </span>
              <span className="rounded bg-[#0070C0]/10 px-2 py-0.5 text-xs font-medium text-[#0070C0]">
                {selectedVisual.requiredPlan}
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{selectedVisual.description}</p>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">What you&apos;ll get in Power BI</h4>
                <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Real-time data visualisation with drill-down capability</li>
                  <li>• Automated threshold alerts and notifications</li>
                  <li>• Export-ready executive summary views</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Tags</h4>
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedVisual.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-6 dark:border-gray-800">
              {canAccess(user?.subscriptionTier ?? "Free", selectedVisual.requiredPlan) ? (
                <>
                  <Button className="w-full" onClick={() => setSelectedVisual(null)}>
                    Download Visual (.pbiviz)
                  </Button>
                  <p className="mt-2 text-center text-xs text-gray-400">
                    {selectedVisual.downloadCount} others have downloaded this
                  </p>
                </>
              ) : (
                <>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600">
                    Upgrade to {selectedVisual.requiredPlan} to Download
                  </Button>
                  <p className="mt-2 text-center text-xs text-gray-400">
                    Your current plan: {user?.subscriptionTier ?? "Free"}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
