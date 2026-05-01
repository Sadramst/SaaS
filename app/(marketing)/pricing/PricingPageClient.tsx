"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import FAQ from "@/components/marketing/FAQ";
import WaitlistForm from "@/components/marketing/WaitlistForm";
import Link from "next/link";

const tiers = [
  { name: "Starter", monthlyPrice: 299, annualPrice: 249, isPopular: false },
  { name: "Professional", monthlyPrice: 499, annualPrice: 416, isPopular: true },
  { name: "Enterprise", monthlyPrice: 799, annualPrice: 666, isPopular: false },
];

const comparisonFeatures = [
  { name: "Number of visuals", starter: "Up to 5", professional: "Up to 15", enterprise: "Unlimited" },
  { name: "Data source connections", starter: "1", professional: "3", enterprise: "Unlimited" },
  { name: "Data refresh rate", starter: "Daily", professional: "Hourly", enterprise: "Real-time" },
  { name: "AI natural language query", starter: false, professional: true, enterprise: true },
  { name: "Anomaly detection", starter: false, professional: true, enterprise: true },
  { name: "Custom branding", starter: false, professional: true, enterprise: true },
  { name: "Email support", starter: true, professional: true, enterprise: true },
  { name: "Priority support", starter: false, professional: true, enterprise: true },
  { name: "Dedicated onboarding", starter: false, professional: false, enterprise: true },
  { name: "SLA guarantee", starter: false, professional: false, enterprise: true },
  { name: "API access", starter: false, professional: false, enterprise: true },
  { name: "SSO integration", starter: false, professional: false, enterprise: true },
  { name: "Custom visual development", starter: false, professional: false, enterprise: true },
];

const pricingFAQs = [
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade at any time. When upgrading, the new rate applies immediately with a pro-rata credit. When downgrading, the change takes effect at your next billing date.",
  },
  {
    question: "Is there a free trial?",
    answer: "Founding members who join the waitlist will receive extended trial access during our launch phase. Join the waitlist to secure your spot.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, Amex) and direct debit for Australian bank accounts. Enterprise customers can pay via invoice with NET-30 terms.",
  },
  {
    question: "Do you offer discounts for multiple sites?",
    answer: "Yes. If you operate multiple mine sites, contact us for a custom enterprise agreement with volume-based pricing.",
  },
];

export default function PricingPageClient() {
  const [annual, setAnnual] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-b from-[#1F3864] to-[#162d52] py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Simple, Transparent Pricing</h1>
          <p className="mt-4 text-lg text-gray-300">
            No hidden fees. No long-term contracts. Cancel any time.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-gray-100 p-1 dark:bg-gray-800">
              <button
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  !annual ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white" : "text-gray-500"
                )}
                onClick={() => setAnnual(false)}
              >
                Monthly
              </button>
              <button
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  annual ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white" : "text-gray-500"
                )}
                onClick={() => setAnnual(true)}
              >
                Annual <span className="text-[#00B050]">(2 months free)</span>
              </button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                className={cn(
                  "relative rounded-xl border p-8",
                  tier.isPopular
                    ? "border-[#0070C0] shadow-xl"
                    : "border-gray-200 dark:border-gray-800"
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
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold">${annual ? tier.annualPrice : tier.monthlyPrice}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <Button
                  className="mt-6 w-full"
                  variant={tier.isPopular ? "default" : "outline"}
                  onClick={() => setWaitlistOpen(true)}
                >
                  Join Waitlist
                </Button>
              </motion.div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Founding member pricing — locked for your first 12 months.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-gray-900/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-4 text-left font-medium text-gray-500">Feature</th>
                  {tiers.map((t) => (
                    <th key={t.name} className="py-4 text-center font-bold">
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr
                    key={feature.name}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="py-3 text-gray-700 dark:text-gray-300">{feature.name}</td>
                    {(["starter", "professional", "enterprise"] as const).map((tier) => {
                      const value = feature[tier];
                      return (
                        <td key={tier} className="py-3 text-center">
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="mx-auto h-5 w-5 text-[#00B050]" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-gray-300 dark:text-gray-600" />
                            )
                          ) : (
                            <span className="font-medium">{value}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FAQ items={pricingFAQs} />

      <section className="py-12 text-center">
        <p className="text-gray-500">
          Not sure which plan?{" "}
          <Link href="/contact" className="font-medium text-[#0070C0] hover:underline">
            Contact us
          </Link>
        </p>
      </section>

      {waitlistOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900">
            <h3 className="mb-2 text-xl font-bold">Join the Waitlist</h3>
            <p className="mb-6 text-sm text-gray-500">Lock in founding member pricing today.</p>
            <WaitlistForm isModal onClose={() => setWaitlistOpen(false)} />
            <button onClick={() => setWaitlistOpen(false)} className="mt-4 w-full text-center text-sm text-gray-400 hover:text-gray-600">
              Maybe later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
