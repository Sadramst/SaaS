"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { subscriptionsApi } from "@/lib/api/subscriptions";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Check, CreditCard, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BillingPage() {
  const user = useAuthStore((s) => s.user);
  const currentPlan = user?.subscriptionTier ?? "Free";

  const { data: subsData } = useQuery({
    queryKey: ["subscription", "current"],
    queryFn: () => subscriptionsApi.getCurrent(),
    retry: false,
  });

  const { data: plansData } = useQuery({
    queryKey: ["subscription", "plans"],
    queryFn: () => subscriptionsApi.getPlans(),
  });

  const subscription = subsData?.data;
  const plans = plansData?.data ?? [];

  const handleUpgrade = async (planName: string) => {
    try {
      await subscriptionsApi.upgrade(planName);
      toast.success(`Upgraded to ${planName}!`);
    } catch {
      toast.error("Failed to upgrade. Please try again.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your subscription and billing</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-[#0070C0]" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{subscription?.plan ?? currentPlan}</p>
              <p className="text-sm text-gray-500">{subscription?.status ?? "Active"}</p>
              {subscription?.features && (
                <ul className="mt-3 space-y-1">
                  {subscription.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Check className="h-4 w-4 text-[#00B050]" /> {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {subscription?.price ? (
              <div className="text-right">
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  ${subscription.price}
                  <span className="text-sm font-normal text-gray-400">/mo</span>
                </p>
                {subscription.nextBillingDate && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    Next billing: {new Date(subscription.nextBillingDate).toLocaleDateString("en-AU")}
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      {plans.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Available Plans</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {plans.map((plan) => {
              const isCurrent = plan.name === currentPlan;
              return (
                <Card
                  key={plan.name}
                  className={cn(isCurrent && "border-[#0070C0] ring-1 ring-[#0070C0]", plan.isPopular && "relative")}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-3 left-4 rounded-full bg-[#0070C0] px-3 py-0.5 text-xs font-semibold text-white">
                      Popular
                    </span>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
                      ${plan.price}
                      <span className="text-sm font-normal text-gray-400">/mo</span>
                    </p>
                    <ul className="mt-4 space-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Check className="h-4 w-4 text-[#00B050]" /> {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      {isCurrent ? (
                        <Button variant="outline" className="w-full" disabled>
                          Current Plan
                        </Button>
                      ) : (
                        <Button className="w-full" onClick={() => handleUpgrade(plan.name)}>
                          {plan.cta}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-800">
                  <th className="pb-2 text-left font-medium text-gray-500">Date</th>
                  <th className="pb-2 text-left font-medium text-gray-500">Description</th>
                  <th className="pb-2 text-left font-medium text-gray-500">Amount</th>
                  <th className="pb-2 text-left font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">
                    Billing history will appear here once Stripe is connected
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
