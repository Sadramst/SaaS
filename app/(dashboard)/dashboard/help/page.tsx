import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HelpCircle, Mail, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";

const faqs = [
  { q: "How do I connect my Power BI data?", a: "Navigate to Settings > Data Sources and follow the connection wizard. You'll need your Power BI workspace URL and a service principal." },
  { q: "What plans include the AI analytics features?", a: "AI-powered natural language queries are available on the Professional plan and above." },
  { q: "Can I download visuals for offline use?", a: "Yes, all .pbiviz files can be downloaded and imported directly into Power BI Desktop or the web service." },
  { q: "How is data security handled?", a: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are ISO 27001 compliant and hosted in Azure Australia East." },
  { q: "Can I upgrade or downgrade my plan at any time?", a: "Yes, plan changes take effect immediately. Upgrades are prorated, and downgrades apply at the next billing cycle." },
  { q: "Do you offer enterprise volume discounts?", a: "Yes. Contact our sales team for custom pricing for teams of 10+ users." },
  { q: "What mining data formats do you support?", a: "We support CSV, Excel, SQL databases, and direct API connections to common fleet management systems (Wenco, Modular, Caterpillar MineStar)." },
  { q: "Is there a free trial?", a: "The Starter plan includes a 14-day free trial with full access to all features. No credit card required to start." },
];

export default function HelpPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
        <p className="mt-1 text-sm text-gray-500">Find answers and get support</p>
      </div>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-[#0070C0]" />
            Contact Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help? Our Perth-based team is available Mon–Fri 8am–6pm AWST.
          </p>
          <div className="mt-4 flex gap-3">
            <Link href="/contact">
              <Button>Contact Us</Button>
            </Link>
            <a href="mailto:support@appilico.com">
              <Button variant="outline">Email Support</Button>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#0070C0]" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y dark:divide-gray-800">
            {faqs.map((faq, i) => (
              <details key={i} className="group py-3">
                <summary className="cursor-pointer list-none text-sm font-medium text-gray-900 dark:text-white">
                  <span className="group-open:text-[#0070C0]">{faq.q}</span>
                </summary>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#0070C0]" />
            Documentation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Getting Started Guide", desc: "Set up your first dashboard" },
              { title: "API Reference", desc: "Developer documentation" },
              { title: "Visual Catalog", desc: "Browse all available visuals" },
              { title: "Data Connection Guide", desc: "Connect your data sources" },
            ].map((doc) => (
              <div key={doc.title} className="rounded-lg border p-3 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{doc.title}</p>
                    <p className="text-xs text-gray-500">{doc.desc}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
