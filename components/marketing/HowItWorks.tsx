"use client";

import { motion } from "framer-motion";
import { Database, LayoutDashboard, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Database,
    step: "01",
    title: "Connect your data",
    description:
      "Point Appilico OS at your existing data source — SQL Server, CSV, Azure, SAP, or fleet management system. We handle integration.",
  },
  {
    icon: LayoutDashboard,
    step: "02",
    title: "Pick your modules",
    description:
      "Enable the modules you need — production, equipment, safety, cost, grade, energy, workforce, or supply chain. Start with one, add more any time.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Get AI insights",
    description:
      "Your operational dashboards are live with AI anomaly detection from day one. Ask questions in plain English and get answers backed by your data.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-20 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Go Live in Three Steps
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            From data source to operational intelligence in minutes, not months.
          </p>
        </motion.div>

        <div className="relative grid gap-8 lg:grid-cols-3">
          <div className="absolute left-0 right-0 top-20 hidden h-0.5 bg-gradient-to-r from-transparent via-[#0070C0]/30 to-transparent lg:block" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative rounded-xl bg-white p-8 text-center shadow-sm dark:bg-gray-900"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0070C0]/10">
                <step.icon className="h-8 w-8 text-[#0070C0]" />
              </div>
              <span className="text-sm font-bold text-[#0070C0]">Step {step.step}</span>
              <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
