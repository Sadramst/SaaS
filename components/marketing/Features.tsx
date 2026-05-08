"use client";

import { motion } from "framer-motion";
import { platformModules } from "@/data/modules";
import { cn } from "@/lib/utils";

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
          <span className="inline-block rounded-full bg-[#0070C0]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0070C0]">
            8 Configurable Modules
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            One Platform. Every Operational Dimension.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            Pick the modules you need. Start with one, scale to all eight.
            Each includes configurable dashboards, data ingestion, alerts, reports, and AI.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {platformModules.map((mod, index) => (
            <motion.div
              key={mod.id}
              className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div
                className={cn("mb-4 inline-flex rounded-lg p-3")}
                style={{ backgroundColor: `${mod.color}15` }}
              >
                <mod.icon className="h-6 w-6" style={{ color: mod.color }} />
              </div>
              <h3 className="mb-1 text-base font-bold text-gray-900 dark:text-white">
                {mod.shortName}
              </h3>
              <p className="mb-3 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {mod.description.split(".")[0]}.
              </p>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded px-2 py-0.5 text-[10px] font-semibold uppercase",
                    mod.requiredPlan === "Starter" && "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                    mod.requiredPlan === "Professional" && "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
                    mod.requiredPlan === "Enterprise" && "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  )}
                >
                  {mod.requiredPlan}+
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
