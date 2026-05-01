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
    question: "What data sources does Appilico connect to?",
    answer:
      "Appilico connects to SQL Server, Azure SQL, CSV/Excel files, SAP, Oracle, and most ODBC-compatible data sources. If you have a specific system, contact us and we'll confirm compatibility.",
  },
  {
    question: "Do I need a Power BI licence?",
    answer:
      "For basic viewing, no — we provide embedded dashboards via our platform. If you want to use Power BI Desktop for advanced customisation, a Power BI Pro or Premium Per User licence from Microsoft is recommended ($9.99–$20/user/month).",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most customers are live within 24 hours. If your data is in a standard SQL Server or Azure database, you can connect and see your first dashboard in under 30 minutes.",
  },
  {
    question: "Is my operational data secure?",
    answer:
      "Absolutely. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are hosted on Microsoft Azure in the Australia East region with SOC 2 compliance. Your data never leaves Australian borders.",
  },
  {
    question: "Can I customise the visuals for my site?",
    answer:
      "Yes. While our visuals come pre-configured for common mining KPIs, you can customise colours, filters, drill-through paths, and calculated measures. Enterprise customers get fully custom visual development.",
  },
  {
    question: "What's the difference between tiers?",
    answer:
      "Starter gives you up to 5 pre-built visuals with 1 data source. Professional adds AI-powered natural language queries, anomaly detection, and up to 15 visuals with 3 data sources. Enterprise removes all limits and includes dedicated onboarding and SLA.",
  },
  {
    question: "When will Appilico launch?",
    answer:
      "We are currently in a controlled rollout with founding members from the Western Australian mining industry. Join the waitlist to secure your spot and founding member pricing (locked for 12 months).",
  },
  {
    question: "What industries does Appilico serve?",
    answer:
      "Our initial focus is the Australian mining and resources sector — including gold, iron ore, lithium, nickel, and coal operations. Our visuals are purpose-built for the KPIs that matter in mining: production, equipment utilisation, safety, and cost per tonne.",
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
