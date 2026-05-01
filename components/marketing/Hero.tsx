"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Cloud, BarChart3, MapPin, HardHat } from "lucide-react";

const trustBadges = [
  { icon: Cloud, label: "Built on Azure" },
  { icon: BarChart3, label: "Microsoft Power BI Certified" },
  { icon: MapPin, label: "Perth, Australia" },
  { icon: HardHat, label: "Mining Industry Specialist" },
];

interface HeroProps {
  onOpenWaitlist: () => void;
}

export default function Hero({ onOpenWaitlist }: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[#1F3864] via-[#162d52] to-[#0d1b33]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-[#0070C0]/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-[#00B050]/20 blur-3xl" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 py-20 text-center sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:text-left">
        <motion.div
          className="flex-1 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            AI-Powered Analytics for Australian Mining &amp; Resources
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
            Stop waiting months for custom dashboards. Connect your operational data to Power BI and
            get executive-ready visuals with AI insights — in minutes.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Button size="lg" onClick={onOpenWaitlist}>
              Join the Waitlist
            </Button>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                See How It Works
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 lg:justify-start">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-gray-400">
                <badge.icon className="h-4 w-4 text-[#0070C0]" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative mx-auto w-full max-w-lg">
            <div className="rounded-xl border border-gray-700/50 bg-gray-900/80 p-6 shadow-2xl backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-500">Production Dashboard</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-end gap-2">
                  {[65, 80, 45, 90, 70, 85, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-[#0070C0] to-[#00B050]"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}px` }}
                      transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "OEE", value: "87.3%" },
                    { label: "Tonnes/hr", value: "2,450" },
                    { label: "Cost/t", value: "$12.80" },
                  ].map((metric) => (
                    <div key={metric.label} className="rounded-lg bg-gray-800 p-3 text-center">
                      <p className="text-xs text-gray-500">{metric.label}</p>
                      <p className="text-lg font-bold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-[#00B050]/30 bg-[#00B050]/10 p-3">
                  <p className="text-xs text-[#00B050]">
                    🤖 AI Insight: Pit 3 output dropped 12% due to haul truck idle time. Recommend
                    staggering shift change by 15 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
