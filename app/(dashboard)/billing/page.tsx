"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { SubscriptionInfo, ApiResponse } from "@/types";
import { CreditCard, Calendar, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function BillingPage() {
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);

  useEffect(() => {
    api
      .get<ApiResponse<SubscriptionInfo>>("/api/subscription/current")
      .then((res) => {
        if (res.data.success && res.data.data) {
          setSubscription(res.data.data);
        }
      })
      .catch(() => {
        // Not available yet
      });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your subscription and billing details.</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {subscription?.plan ?? "Free"}
                </p>
                <p className="text-sm text-gray-500">
                  {subscription?.status ?? "Active"}
                </p>
              </div>
              {subscription?.price ? (
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  ${subscription.price}
                  <span className="text-base font-normal text-gray-500">/mo</span>
                </p>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#0070C0]" />
              Billing Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Start Date</span>
                <span className="font-medium">
                  {subscription?.startDate ? formatDate(subscription.startDate) : "—"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Next Billing Date</span>
                <span className="font-medium">
                  {subscription?.nextBillingDate ? formatDate(subscription.nextBillingDate) : "—"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900 dark:text-white">Need more features?</p>
                <p className="text-sm text-gray-500">Upgrade your plan to unlock AI insights and more visuals.</p>
              </div>
              <Button>
                Upgrade Plan <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
