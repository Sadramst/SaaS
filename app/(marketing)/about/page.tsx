import type { Metadata } from "next";
import { Target, Cpu, Heart, Flag } from "lucide-react";
import WaitlistForm from "@/components/marketing/WaitlistForm";

export const metadata: Metadata = {
  title: "About",
  description:
    "Appilico builds AI-powered analytics tools for Australia's mining industry. Based in Perth, WA.",
};

const values = [
  {
    icon: Cpu,
    title: "Engineering Excellence",
    description: "Built by enterprise software engineers with 15+ years of experience in Azure, .NET, and Power BI.",
  },
  {
    icon: Target,
    title: "Industry Focus",
    description: "We don't build generic tools. Every feature is designed for the mining and resources sector.",
  },
  {
    icon: Heart,
    title: "Customer Obsession",
    description: "Your operational challenges drive our roadmap. We build what mining professionals actually need.",
  },
  {
    icon: Flag,
    title: "Australian-Built",
    description: "Designed, developed, and hosted in Australia. Your data never leaves Australian borders.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-b from-[#1F3864] to-[#162d52] py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-extrabold sm:text-5xl">About Appilico</h1>
          <p className="mt-4 text-lg text-gray-300">
            We build the analytics tools that Australia&apos;s mining industry deserves — modern,
            AI-powered, and built by engineers who understand enterprise operations.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              The mining industry generates more data than almost any other sector — yet most
              operations still rely on manual reports and outdated dashboards. Appilico bridges the
              gap between raw operational data and executive-level insights, using AI and Power BI to
              deliver analytics that are purpose-built for mining operations.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 dark:bg-gray-900/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Built by an Engineer, for Engineers</h2>
              <p className="mt-4 text-gray-600 leading-relaxed dark:text-gray-400">
                Appilico was founded by a senior software engineer with 15+ years of experience in
                enterprise architecture, Azure cloud infrastructure, and Power BI solutions — based
                in Perth, Western Australia.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed dark:text-gray-400">
                Having delivered enterprise analytics solutions across the resources sector, the
                founder recognised that mining companies were paying too much and waiting too long for
                dashboards that should be standardised, AI-powered, and available on day one.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed dark:text-gray-400">
                For consulting services, visit{" "}
                <a
                  href="https://www.appilico.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#0070C0] hover:underline"
                >
                  appilico.com.au
                </a>
              </p>
            </div>
            <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1F3864]/10 to-[#0070C0]/10 p-12">
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#0070C0]/10">
                  <span className="text-3xl font-bold text-[#0070C0]">15+</span>
                </div>
                <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Years Enterprise Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Our Values
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-xl border border-gray-200 p-6 text-center dark:border-gray-800">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0070C0]/10">
                  <value.icon className="h-6 w-6 text-[#0070C0]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1F3864] py-16">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white">Want to learn more?</h2>
          <p className="mt-3 text-gray-300">Join the waitlist to be first in line.</p>
          <div className="mt-6">
            <WaitlistForm />
          </div>
        </div>
      </section>
    </div>
  );
}
