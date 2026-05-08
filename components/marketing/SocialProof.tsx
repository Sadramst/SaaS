"use client";

import { motion } from "framer-motion";
import { BarChart3, Shield, Cpu, DollarSign } from "lucide-react";

const stats = [
  { icon: BarChart3, value: "8", label: "Configurable Modules" },
  { icon: Shield, value: "SOC 2", label: "Compliant & AU-hosted" },
  { icon: Cpu, value: "<30 min", label: "Average Setup Time" },
  { icon: DollarSign, value: "A$499", label: "Starting From / month" },
];

export default function SocialProof() {
  return (
    <section className="border-y border-gray-100 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Built for Australian Mining Operations
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0070C0]/10">
                  <stat.icon className="h-5 w-5 text-[#0070C0]" />
                </div>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
