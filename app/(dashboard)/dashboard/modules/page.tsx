"use client";

import { platformModules } from "@/data/modules";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

const planRank: Record<string, number> = {
  Free: 0,
  Starter: 1,
  Professional: 2,
  Enterprise: 3,
};

export default function ModulesPage() {
  const user = useAuthStore((s) => s.user);
  const userRank = planRank[user?.subscriptionTier ?? "Free"] ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Modules</h1>
        <p className="mt-1 text-sm text-gray-500">
          Your Appilico OS modules. Upgrade your plan to unlock more.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {platformModules.map((mod) => {
          const modRank = planRank[mod.requiredPlan] ?? 0;
          const hasAccess = userRank >= modRank;

          return (
            <Card key={mod.id} className={cn(!hasAccess && "opacity-70")}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div
                    className="rounded-lg p-2.5"
                    style={{ backgroundColor: `${mod.color}15` }}
                  >
                    <mod.icon className="h-5 w-5" style={{ color: mod.color }} />
                  </div>
                  {hasAccess ? (
                    <span className="rounded-full bg-[#00B050]/10 px-2 py-0.5 text-[10px] font-semibold text-[#00B050]">
                      Active
                    </span>
                  ) : (
                    <Lock className="h-4 w-4 text-gray-400" />
                  )}
                </div>

                <h3 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">
                  {mod.shortName}
                </h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  {mod.description.split(".")[0]}.
                </p>

                <ul className="mt-3 space-y-1">
                  {mod.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-[11px] text-gray-600 dark:text-gray-400">
                      <Check className="h-3 w-3 text-[#00B050]" />
                      {f}
                    </li>
                  ))}
                  {mod.features.length > 3 && (
                    <li className="text-[11px] text-gray-400">
                      +{mod.features.length - 3} more
                    </li>
                  )}
                </ul>

                <div className="mt-4">
                  {hasAccess ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => toast.info("Module dashboards coming soon")}
                    >
                      Open Module
                    </Button>
                  ) : (
                    <Link href="/dashboard/settings/billing">
                      <Button size="sm" className="w-full text-xs">
                        Upgrade to {mod.requiredPlan}
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="mt-2 text-center">
                  <span
                    className={cn(
                      "text-[10px] font-semibold uppercase",
                      mod.requiredPlan === "Starter" && "text-blue-600",
                      mod.requiredPlan === "Professional" && "text-purple-600",
                      mod.requiredPlan === "Enterprise" && "text-amber-600"
                    )}
                  >
                    {mod.requiredPlan}+
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
