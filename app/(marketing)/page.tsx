"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/marketing/Hero"));
const SocialProof = dynamic(() => import("@/components/marketing/SocialProof"));
const ProblemSolution = dynamic(() => import("@/components/marketing/ProblemSolution"));
const Features = dynamic(() => import("@/components/marketing/Features"));
const HowItWorks = dynamic(() => import("@/components/marketing/HowItWorks"));
const Pricing = dynamic(() => import("@/components/marketing/Pricing"));
const CTA = dynamic(() => import("@/components/marketing/CTA"));
const FAQ = dynamic(() => import("@/components/marketing/FAQ"));
const WaitlistForm = dynamic(() => import("@/components/marketing/WaitlistForm"));

export default function HomePage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <Hero onOpenWaitlist={() => setWaitlistOpen(true)} />
      <SocialProof />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Pricing onOpenWaitlist={() => setWaitlistOpen(true)} />
      <CTA />
      <FAQ />

      {waitlistOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-900">
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Join the Waitlist
            </h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Be the first to access AI-powered mining analytics.
            </p>
            <WaitlistForm isModal onClose={() => setWaitlistOpen(false)} />
            <button
              onClick={() => setWaitlistOpen(false)}
              className="mt-4 w-full text-center text-sm text-gray-400 hover:text-gray-600"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </>
  );
}
