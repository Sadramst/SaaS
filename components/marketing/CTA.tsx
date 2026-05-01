"use client";

import { motion } from "framer-motion";
import WaitlistForm from "./WaitlistForm";

export default function CTA() {
  return (
    <section id="waitlist" className="bg-[#1F3864] py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Be First When We Launch</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">
            We&apos;re currently onboarding founding members from the Western Australian mining industry.
            Join the waitlist to lock in founding member pricing and get early access.
          </p>
          <div className="mt-8">
            <WaitlistForm />
          </div>
          <p className="mt-6 text-sm text-gray-400">
            <span className="font-semibold text-white">147</span> mining professionals already on
            the waitlist
          </p>
        </motion.div>
      </div>
    </section>
  );
}
