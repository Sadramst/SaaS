"use client";

import { useAuthStore } from "@/stores/authStore";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function DashboardTopBar({ onMenuClick }: TopBarProps) {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0070C0] text-sm font-bold text-white">
          {user?.firstName?.[0] ?? "U"}
        </div>
      </div>
    </header>
  );
}
