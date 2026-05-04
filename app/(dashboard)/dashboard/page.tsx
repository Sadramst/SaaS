"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { subscriptionsApi } from "@/lib/api/subscriptions";
import { visualsApi } from "@/lib/api/visuals";
import { blogApi } from "@/lib/api/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  BarChart3,
  CreditCard,
  Clock,
  ArrowUpCircle,
  Activity,
  MessageCircle,
  Download,
} from "lucide-react";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function formatCurrentDate(): string {
  return new Date().toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function daysSince(dateStr: string): number {
  const created = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
}

const planBadgeColors: Record<string, string> = {
  Free: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  Starter: "bg-blue-100 text-blue-700",
  Professional: "bg-purple-100 text-purple-700",
  Enterprise: "bg-amber-100 text-amber-700",
};

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const plan = user?.subscriptionTier ?? "Free";

  const { data: subscription } = useQuery({
    queryKey: ["subscription", "current"],
    queryFn: () => subscriptionsApi.getCurrent(),
    retry: false,
  });

  const { data: visualsData } = useQuery({
    queryKey: ["visuals"],
    queryFn: () => visualsApi.getVisuals(),
    retry: false,
  });

  const { data: blogData } = useQuery({
    queryKey: ["blog", "latest"],
    queryFn: () => blogApi.getPosts({ pageSize: 1 }),
    retry: false,
  });

  const visuals = visualsData?.data ?? [];
  const latestPost = blogData?.data?.items?.[0];
  const memberDays = user?.createdAt ? daysSince(user.createdAt) : 0;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-xl bg-gradient-to-r from-[#1F3864] to-[#0070C0] p-6 text-white">
        <h1 className="text-2xl font-bold">
          {getGreeting()}, {user?.firstName ?? "User"}
        </h1>
        <p className="mt-1 text-sm text-white/80">{formatCurrentDate()}</p>
        <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${planBadgeColors[plan]}`}>
          {plan} Plan
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Visuals Available</CardTitle>
            <BarChart3 className="h-5 w-5 text-[#0070C0]" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{visuals.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Downloads</CardTitle>
            <Download className="h-5 w-5 text-[#00B050]" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Days as Member</CardTitle>
            <Clock className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{memberDays}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Plan</CardTitle>
            <CreditCard className="h-5 w-5 text-[#0070C0]" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{plan}</p>
            <Link href="/dashboard/settings/billing" className="text-xs text-[#0070C0] hover:underline">
              Upgrade →
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Browse All Visuals", href: "/dashboard/visuals", icon: BarChart3, color: "text-[#0070C0]" },
          { label: "Try Analytics Demo", href: "/dashboard/analytics", icon: Activity, color: "text-[#00B050]" },
          { label: "Upgrade Your Plan", href: "/dashboard/settings/billing", icon: ArrowUpCircle, color: "text-amber-500" },
          { label: "Get Support", href: "/dashboard/help", icon: MessageCircle, color: "text-purple-500" },
        ].map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                <action.icon className={`h-8 w-8 ${action.color}`} />
                <p className="text-sm font-medium text-gray-900 dark:text-white">{action.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Visual Library preview */}
      {visuals.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Visual Library</CardTitle>
            <Link href="/dashboard/visuals">
              <Button variant="ghost" size="sm">View All →</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {visuals.slice(0, 3).map((v) => (
                <div key={v.id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <BarChart3 className="mb-2 h-6 w-6 text-[#0070C0]" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{v.name}</p>
                  <p className="text-xs text-gray-500">{v.category}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Latest blog post */}
      {latestPost && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Latest from the Blog</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-gray-900 dark:text-white">{latestPost.title}</h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{latestPost.excerpt}</p>
            <Link href={`/blog/${latestPost.slug}`} className="mt-2 inline-block text-sm text-[#0070C0] hover:underline">
              Read More →
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
