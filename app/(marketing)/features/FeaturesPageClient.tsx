"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Cpu,
  Shield,
  TrendingDown,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import WaitlistForm from "@/components/marketing/WaitlistForm";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "production-gantt",
    icon: BarChart3,
    title: "Mine Production Gantt",
    summary: "Shift-level drill-down with crew and equipment breakdown.",
    paragraphs: [
      "Track production performance across every shift, crew, and piece of equipment with an interactive Gantt chart that updates in real time. Designed specifically for open-pit and underground mining operations.",
      "Drill down from site-level totals to individual truck loads. Identify bottlenecks in the load-haul-dump cycle and see exactly where time is being lost during shift changeovers.",
      "Integrates with your existing fleet management system and dispatch data. No manual data entry — Appilico pulls directly from your operational database.",
    ],
    specs: [
      "Real-time data refresh (configurable intervals)",
      "Shift, crew, and equipment-level drill-through",
      "Exportable to PDF and PowerPoint",
      "Configurable KPI thresholds and colour coding",
      "Compatible with Wenco, Modular, Caterpillar MineStar",
    ],
  },
  {
    id: "equipment-heatmap",
    icon: Cpu,
    title: "Equipment Utilisation Heatmap",
    summary: "Real-time OEE tracking across your entire fleet.",
    paragraphs: [
      "Visualise Overall Equipment Effectiveness (OEE) across your entire fleet on a single screen. The heatmap instantly highlights underperforming assets so you can take action before production targets slip.",
      "Track availability, performance, and quality metrics for every piece of heavy equipment — haul trucks, excavators, loaders, and drills. See trends over time and correlate with maintenance schedules.",
      "Built-in anomaly detection flags unusual patterns. If a truck's utilisation suddenly drops, you'll know about it before it shows up in the monthly report.",
    ],
    specs: [
      "OEE breakdown: Availability × Performance × Quality",
      "Hour-by-hour and day-by-day heatmap views",
      "Maintenance correlation overlays",
      "AI-powered anomaly alerts",
      "Fleet-wide and individual asset views",
    ],
  },
  {
    id: "safety-kpi",
    icon: Shield,
    title: "Safety KPI Dashboard",
    summary: "Leading and lagging indicators with trend alerts.",
    paragraphs: [
      "Safety is non-negotiable in mining. This dashboard gives your safety team and site leadership a real-time view of both leading and lagging safety indicators — from near-miss reports to lost time injuries.",
      "Track TRIFR, LTIFR, and AIFR alongside leading indicators like safety observations, hazard reports, and training compliance. Trend analysis shows whether your safety culture is improving.",
      "Configurable alert thresholds notify stakeholders when KPIs breach acceptable levels. Integrates with your existing safety management system via API or database connection.",
    ],
    specs: [
      "TRIFR, LTIFR, AIFR calculations (DMIRS-compliant)",
      "Leading vs lagging indicator split view",
      "Incident type and location heatmap",
      "Training compliance tracking",
      "Regulatory reporting export",
    ],
  },
  {
    id: "ore-grade",
    icon: TrendingDown,
    title: "Ore Grade Waterfall",
    summary: "Grade tracking from bench to plant with variance analysis.",
    paragraphs: [
      "Follow ore grade from the bench face through the crusher to the processing plant. The waterfall chart shows exactly where grade dilution occurs and quantifies the impact on recovery.",
      "Compare planned vs actual grades at each stage of the value chain. Identify whether grade losses are due to mining practices, blending decisions, or processing variability.",
      "Integrates with geological models and plant historian data. Overlay grade control drilling results with actual production to validate your resource model.",
    ],
    specs: [
      "Bench → crusher → plant grade tracking",
      "Planned vs actual variance analysis",
      "Geological model overlay capability",
      "Recovery prediction modelling",
      "Multi-element grade tracking",
    ],
  },
  {
    id: "cost-per-tonne",
    icon: DollarSign,
    title: "Cost Per Tonne Tracker",
    summary: "Operational cost breakdown with anomaly flagging.",
    paragraphs: [
      "Break down your mining cost per tonne into its component parts — drilling, blasting, loading, hauling, processing, and overheads. See exactly where costs are increasing and why.",
      "Real-time cost tracking means no more waiting for month-end reports. Compare actual costs against budget daily, and drill into the drivers behind any variance.",
      "AI-powered anomaly detection flags unusual cost spikes immediately. If fuel consumption per tonne suddenly increases, the system alerts you and suggests potential causes.",
    ],
    specs: [
      "Activity-based cost breakdown",
      "Budget vs actual comparison",
      "Cost per tonne trending (daily/weekly/monthly)",
      "Fuel, labour, and consumables split",
      "Anomaly detection with root cause suggestions",
    ],
  },
  {
    id: "ai-query",
    icon: MessageSquare,
    title: "AI Natural Language Query",
    summary: 'Ask "Why did Pit 3 underperform Tuesday?" and get an answer.',
    paragraphs: [
      "Stop digging through reports. Just ask a question in plain English and get an answer backed by your operational data. Appilico's AI understands mining terminology and context.",
      "The AI analyses your production, equipment, safety, and cost data holistically. It can correlate events across data sources to give you insights that would take a human analyst hours to find.",
      "Every answer includes the data sources and logic used, so you can verify and trust the results. The AI learns from your data patterns and gets more accurate over time.",
    ],
    specs: [
      "Natural language processing for mining operations",
      "Cross-data-source correlation",
      "Transparent reasoning with source attribution",
      "Follow-up question capability",
      "Exportable insights to email and Teams",
    ],
  },
];

export default function FeaturesPageClient() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-b from-[#1F3864] to-[#162d52] py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Purpose-Built Mining Analytics
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Every visual is designed by mining analytics experts with decades of industry experience.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <nav className="hidden w-56 flex-shrink-0 lg:block">
            <div className="sticky top-24 space-y-1">
              {features.map((f) => (
                <a
                  key={f.id}
                  href={`#${f.id}`}
                  onClick={() => setActiveFeature(f.id)}
                  className={cn(
                    "block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                    activeFeature === f.id
                      ? "bg-[#0070C0]/10 text-[#0070C0]"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  )}
                >
                  {f.title}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex-1 space-y-20">
            {features.map((feature, index) => (
              <motion.section
                key={feature.id}
                id={feature.id}
                className="scroll-mt-24"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onViewportEnter={() => setActiveFeature(feature.id)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="rounded-xl bg-[#0070C0]/10 p-4">
                    <feature.icon className="h-8 w-8 text-[#0070C0]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    {feature.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {feature.paragraphs.map((p, i) => (
                    <p key={i} className="text-gray-600 leading-relaxed dark:text-gray-400">
                      {p}
                    </p>
                  ))}
                </div>

                <div className="mt-8">
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Specifications
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {feature.specs.map((spec) => (
                      <li key={spec} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#0070C0]" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900/50">
                  <div className="flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-[#1F3864]/5 to-[#0070C0]/5">
                    <feature.icon className="h-16 w-16 text-[#0070C0]/30" />
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-[#1F3864] py-16">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white">Ready to get started?</h2>
          <p className="mt-3 text-gray-300">
            Join the waitlist and be the first to access these visuals.
          </p>
          <div className="mt-6">
            <WaitlistForm />
          </div>
        </div>
      </section>
    </div>
  );
}
