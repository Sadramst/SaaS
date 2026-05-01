import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Download, Eye, Lock } from "lucide-react";
import type { Visual } from "@/types";

interface VisualCardProps {
  visual: Visual;
  userPlan: string;
}

const planRank: Record<string, number> = {
  Free: 0,
  Starter: 1,
  Professional: 2,
  Enterprise: 3,
};

export default function VisualCard({ visual, userPlan }: VisualCardProps) {
  const hasAccess = (planRank[userPlan] ?? 0) >= (planRank[visual.requiredPlan] ?? 0);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{visual.name}</CardTitle>
          {!hasAccess && <Lock className="h-4 w-4 text-gray-400" />}
        </div>
        <span className="inline-block rounded-full bg-[#0070C0]/10 px-2 py-0.5 text-xs font-medium text-[#0070C0]">
          {visual.category}
        </span>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{visual.description}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" disabled={!hasAccess}>
            <Eye className="mr-1 h-4 w-4" />
            Preview
          </Button>
          <Button size="sm" className="flex-1" disabled={!hasAccess}>
            <Download className="mr-1 h-4 w-4" />
            Download
          </Button>
        </div>
        {!hasAccess && (
          <p className="text-xs text-gray-400">Requires {visual.requiredPlan} plan</p>
        )}
      </CardContent>
    </Card>
  );
}
