"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import type { SubscriptionInfo, ApiResponse } from "@/types";
import { BarChart3, CreditCard, Clock, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
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
        // Subscription data not available yet
      });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to your Appilico dashboard, {user?.firstName ?? "User"}.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Current Plan</CardTitle>
            <CreditCard className="h-5 w-5 text-[#0070C0]" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{subscription?.plan ?? user?.plan ?? "Free"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Status</CardTitle>
            <Sparkles className="h-5 w-5 text-[#00B050]" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{subscription?.status ?? "Active"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Visuals</CardTitle>
            <BarChart3 className="h-5 w-5 text-[#0070C0]" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Next Billing</CardTitle>
            <Clock className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">—</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4 py-12 text-center">
            <div className="rounded-full bg-[#0070C0]/10 p-6">
              <BarChart3 className="h-12 w-12 text-[#0070C0]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Your visuals are being prepared
            </h3>
            <p className="max-w-md text-sm text-gray-500">
              We&apos;re setting up your mining analytics dashboard. You&apos;ll be notified when
              your first visuals are ready to connect.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
