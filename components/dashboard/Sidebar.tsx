"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Activity,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/visuals", icon: BarChart3, label: "Visual Library" },
  { href: "/dashboard/analytics", icon: Activity, label: "Analytics Demo" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  { href: "/dashboard/settings/billing", icon: CreditCard, label: "Billing" },
  { href: "/dashboard/help", icon: HelpCircle, label: "Help" },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function DashboardSidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const planColors: Record<string, string> = {
    Starter: "bg-blue-100 text-blue-700",
    Professional: "bg-purple-100 text-purple-700",
    Enterprise: "bg-amber-100 text-amber-700",
    Free: "bg-gray-100 text-gray-700",
  };

  return (
    <aside className="flex h-full w-[260px] flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#1F3864] dark:text-white">Appilico</span>
          <span className="text-xs text-gray-400">Dashboard</span>
        </Link>
        <button onClick={onClose} className="lg:hidden" aria-label="Close sidebar">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#0070C0]/10 text-[#0070C0]"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0070C0] text-sm font-bold text-white">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {user?.firstName} {user?.lastName}
            </p>
            <span className={cn("inline-block rounded px-1.5 py-0.5 text-xs font-medium", planColors[user?.subscriptionTier ?? "Free"] ?? planColors.Free)}>
              {user?.subscriptionTier ?? "Free"}
            </span>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
