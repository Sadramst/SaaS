"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

const faqs = [
  {
    question: "What data sources does Appilico OS connect to?",
    answer:
      "Appilico OS connects to SQL Server, Azure SQL, CSV/Excel files, SAP, Oracle, fleet management systems (Wenco, Modular, MineStar), and most ODBC-compatible data sources. Contact us if you have a specific system.",
  },
  {
    question: "How does the module-based pricing work?",
    answer:
      "You choose the modules you need. Starter (A$499/mo) includes 1 module. Professional (A$999/mo) includes up to 3 modules. Enterprise (A$1,999/mo) unlocks all 8 modules plus dedicated onboarding and SLA. All prices are in Australian Dollars.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes — every plan includes a 14-day free trial with full access. No credit card required to start. Cancel anytime during the trial and you won't be charged.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most customers are live within 24 hours. If your data is in a standard SQL Server or Azure database, you can connect and see your first module dashboard in under 30 minutes.",
  },
  {
    question: "Is my operational data secure?",
    answer:
      "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Hosted on Microsoft Azure in the Australia East region with SOC 2 compliance. Your data never leaves Australian borders.",
  },
  {
    question: "Can I add more modules later?",
    answer:
      "Absolutely. Start with one module and add more at any time. Upgrading your plan automatically unlocks additional modules — no migration or data loss.",
  },
  {
    question: "What are the 8 modules?",
    answer:
      "Mine Production, Equipment OEE, Safety KPIs, Ore Grade & Recovery, Cost Analytics, Energy & Emissions, Workforce Management, and Supply Chain. Each module includes purpose-built dashboards, AI anomaly detection, and configurable alerts.",
  },
  {
    question: "What industries does Appilico OS serve?",
    answer:
      "Our initial focus is the Australian mining and resources sector — gold, iron ore, lithium, nickel, and coal operations. Our modules are purpose-built for mining KPIs across the full value chain.",
  },
];

interface FAQProps {
  items?: typeof faqs;
}

export default function FAQ({ items }: FAQProps) {
  const faqItems = items ?? faqs;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <Accordion type="single">
          {faqItems.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger value={`faq-${index}`}>{faq.question}</AccordionTrigger>
              <AccordionContent value={`faq-${index}`}>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
