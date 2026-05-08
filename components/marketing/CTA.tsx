"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import WaitlistForm from "./WaitlistForm";

export default function CTA() {
  return (
    <>
      {/* Try the Demo */}
      <section className="border-t bg-gray-50 py-20 dark:border-gray-800 dark:bg-gray-900/50">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block rounded-full bg-[#00B050]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#00B050]">
              Interactive Demo
            </span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              See It in Action — No Signup Required
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Explore a live analytics dashboard with realistic Australian mining data.
              Production charts, equipment heatmaps, safety KPIs, and AI-powered queries — all working.
            </p>
            <div className="mt-8">
              <Link href="/dashboard/analytics">
                <Button size="lg">Try the Demo</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="waitlist" className="bg-[#1F3864] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Start Your 14-Day Free Trial
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              We&apos;re onboarding founding members from the Australian mining industry.
              Join now to lock in founding member pricing and get early access to Appilico OS.
            </p>
            <div className="mt-8">
              <WaitlistForm />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
