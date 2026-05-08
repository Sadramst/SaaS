"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md dark:bg-gray-950/95"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#1F3864] dark:text-white">
            Appilico
          </span>
          <span className="rounded bg-[#0070C0]/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#0070C0]">OS</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                pathname === link.href
                  ? "text-[#0070C0]"
                  : "text-gray-700 dark:text-gray-300"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/#waitlist">
            <Button size="sm">Join Waitlist</Button>
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white dark:bg-gray-950 md:hidden">
          <div className="flex flex-col gap-2 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                  pathname === link.href ? "text-[#0070C0]" : "text-gray-700 dark:text-gray-300"
                )}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-4 border-gray-200 dark:border-gray-800" />
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
            <Link href="/login">
              <Button variant="outline" className="mt-2 w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/#waitlist">
              <Button className="mt-2 w-full">Join Waitlist</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
