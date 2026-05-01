"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    monthlyPrice: 299,
    annualPrice: 249,
    description: "For small operations getting started with analytics.",
    features: [
      "Up to 5 visuals",
      "1 data source connection",
      "Email support",
      "Standard refresh rate",
      "Basic reporting",
    ],
    isPopular: false,
  },
  {
    name: "Professional",
    monthlyPrice: 499,
    annualPrice: 416,
    description: "For growing operations that need AI-powered insights.",
    features: [
      "Up to 15 visuals",
      "3 data source connections",
      "AI natural language query",
      "Priority support",
      "Hourly data refresh",
      "Anomaly detection alerts",
      "Custom branding",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 799,
    annualPrice: 666,
    description: "For large operations with complex analytics needs.",
    features: [
      "Unlimited visuals",
      "Unlimited data sources",
      "Full AI suite",
      "Dedicated onboarding",
      "SLA guarantee",
      "Real-time data refresh",
      "API access",
      "SSO integration",
      "Custom visual development",
    ],
    isPopular: false,
  },
];

interface PricingProps {
  onOpenWaitlist?: () => void;
  showToggle?: boolean;
}

export default function Pricing({ onOpenWaitlist, showToggle = true }: PricingProps) {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            No hidden fees. No long-term contracts. Cancel any time.
          </p>

          {showToggle && (
            <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-gray-100 p-1 dark:bg-gray-800">
              <button
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  !annual
                    ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                )}
                onClick={() => setAnnual(false)}
              >
                Monthly
              </button>
              <button
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  annual
                    ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                )}
                onClick={() => setAnnual(true)}
              >
                Annual <span className="text-[#00B050]">(2 months free)</span>
              </button>
            </div>
          )}
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={cn(
                "relative rounded-xl border p-8",
                tier.isPopular
                  ? "border-[#0070C0] bg-white shadow-xl dark:bg-gray-900"
                  : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
              )}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#0070C0] px-4 py-1 text-xs font-bold text-white">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tier.name}</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{tier.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  ${annual ? tier.annualPrice : tier.monthlyPrice}
                </span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <Check className="h-4 w-4 flex-shrink-0 text-[#00B050]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-8 w-full"
                variant={tier.isPopular ? "default" : "outline"}
                onClick={onOpenWaitlist}
              >
                Join Waitlist
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Founding member pricing — locked for your first 12 months when you join the waitlist
          today.
        </p>
      </div>
    </section>
  );
}
