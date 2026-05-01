"use client";

import { motion } from "framer-motion";

export default function SocialProof() {
  return (
    <section className="border-y border-gray-100 bg-gray-50 py-12 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Trusted by operations teams at mining companies across Western Australia
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex h-12 w-32 items-center justify-center rounded-lg bg-gray-200/60 dark:bg-gray-800"
              >
                <span className="text-xs text-gray-400 dark:text-gray-500">Your company here</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-400 dark:text-gray-500">
            Currently onboarding founding members — join the waitlist
          </p>
        </motion.div>
      </div>
    </section>
  );
}
