"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const oldWay = [
  "Wait 3–6 months for a custom dashboard build",
  "Pay $50,000–$200,000 for a consulting engagement",
  "Get a static report that's outdated the moment it's delivered",
];

const newWay = [
  "Go live in minutes with pre-built mining-specific visuals",
  "Subscription from $299/month — cancel any time",
  "Live data, AI anomaly detection, always up to date",
];

export default function ProblemSolution() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            There&apos;s a Better Way to Get Mining Analytics
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            className="rounded-xl border border-red-200 bg-red-50/50 p-8 dark:border-red-900/30 dark:bg-red-950/20"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">The Old Way</h3>
            <ul className="space-y-4">
              {oldWay.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="rounded-xl border border-green-200 bg-green-50/50 p-8 dark:border-green-900/30 dark:bg-green-950/20"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
              The Appilico Way
            </h3>
            <ul className="space-y-4">
              {newWay.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#00B050]" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
