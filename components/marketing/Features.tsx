"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Cpu,
  Shield,
  TrendingDown,
  DollarSign,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Mine Production Gantt",
    description:
      "Shift-level drill-down with crew and equipment breakdown. See exactly who produced what, when.",
  },
  {
    icon: Cpu,
    title: "Equipment Utilisation Heatmap",
    description:
      "Real-time OEE tracking across your entire fleet. Spot underperformers instantly.",
  },
  {
    icon: Shield,
    title: "Safety KPI Dashboard",
    description:
      "Leading and lagging indicators with trend alerts. Stay ahead of safety risks.",
  },
  {
    icon: TrendingDown,
    title: "Ore Grade Waterfall",
    description:
      "Grade tracking from bench to plant with variance analysis. Know where value is lost.",
  },
  {
    icon: DollarSign,
    title: "Cost Per Tonne Tracker",
    description:
      "Operational cost breakdown with anomaly flagging. Control costs in real time.",
  },
  {
    icon: MessageSquare,
    title: "AI Natural Language Query",
    description:
      'Ask "Why did Pit 3 underperform Tuesday?" and get an answer backed by your data.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Purpose-Built for Mining Operations
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Every visual is designed by mining analytics experts. No generic templates.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group rounded-xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="mb-4 inline-flex rounded-lg bg-[#0070C0]/10 p-3">
                <feature.icon className="h-6 w-6 text-[#0070C0]" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
