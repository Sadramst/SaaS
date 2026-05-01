"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/visuals", icon: BarChart3, label: "My Visuals" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/billing", icon: CreditCard, label: "Billing" },
  { href: "/contact", icon: HelpCircle, label: "Help" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="text-xl font-bold text-[#1F3864] dark:text-white">
          Appilico
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-[#0070C0]/10 text-[#0070C0]"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            )}
          >
            <link.icon className="h-5 w-5" />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-3 dark:border-gray-800">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
