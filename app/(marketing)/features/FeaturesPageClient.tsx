"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import WaitlistForm from "@/components/marketing/WaitlistForm";
import { cn } from "@/lib/utils";
import { platformModules } from "@/data/modules";
import { Check } from "lucide-react";
import Link from "next/link";

export default function FeaturesPageClient() {
  const [activeModule, setActiveModule] = useState(platformModules[0].id);

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-b from-[#1F3864] to-[#162d52] py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-block rounded-full border border-[#0070C0]/40 bg-[#0070C0]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0070C0]">
            Appilico OS
          </span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            8 Modules. One Unified Platform.
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Every module is designed by mining analytics experts with decades of Australian industry experience.
            Pick the ones you need — they all work together seamlessly.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <nav className="hidden w-56 flex-shrink-0 lg:block">
            <div className="sticky top-24 space-y-1">
              {platformModules.map((mod) => (
                <a
                  key={mod.id}
                  href={`#${mod.id}`}
                  onClick={() => setActiveModule(mod.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                    activeModule === mod.id
                      ? "bg-[#0070C0]/10 text-[#0070C0]"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  )}
                >
                  <mod.icon className="h-4 w-4" style={{ color: mod.color }} />
                  {mod.shortName}
                </a>
              ))}
            </div>
          </nav>

          <div className="flex-1 space-y-20">
            {platformModules.map((mod, index) => (
              <motion.section
                key={mod.id}
                id={mod.id}
                className="scroll-mt-24"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onViewportEnter={() => setActiveModule(mod.id)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="rounded-xl p-4" style={{ backgroundColor: `${mod.color}15` }}>
                    <mod.icon className="h-8 w-8" style={{ color: mod.color }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                      {mod.name}
                    </h2>
                    <span
                      className={cn(
                        "mt-1 inline-block rounded px-2 py-0.5 text-xs font-semibold uppercase",
                        mod.requiredPlan === "Starter" && "bg-blue-50 text-blue-700",
                        mod.requiredPlan === "Professional" && "bg-purple-50 text-purple-700",
                        mod.requiredPlan === "Enterprise" && "bg-amber-50 text-amber-700"
                      )}
                    >
                      {mod.requiredPlan}+
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed dark:text-gray-400 mb-6">
                  {mod.description}
                </p>

                <div>
                  <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Key Features
                  </h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {mod.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Check className="h-4 w-4 flex-shrink-0 text-[#00B050]" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <section className="border-t py-16 text-center dark:border-gray-800">
        <div className="mx-auto max-w-md px-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ready to transform your operations?
          </h3>
          <p className="mt-2 text-gray-500">Start your 14-day free trial — no credit card required.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/register">
              <Button>Start Free Trial</Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button variant="outline">Try the Demo</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
