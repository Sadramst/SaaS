import Link from "next/link";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const productLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Consulting (appilico.com.au)", href: "https://www.appilico.com.au" },
];

const contactInfo = [
  { label: "info@appilico.com.au" },
  { label: "Perth, Western Australia" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <span className="text-xl font-bold text-[#1F3864] dark:text-white">Appilico</span>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI-Powered Analytics for Australian Mining &amp; Resources
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/appilico"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors hover:text-[#0070C0]"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-[#0070C0] dark:text-gray-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-gray-500 transition-colors hover:text-[#0070C0] dark:text-gray-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Contact
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label} className="text-sm text-gray-500 dark:text-gray-400">
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-200 pt-8 dark:border-gray-800 md:flex-row">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Appilico Pty Ltd. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-gray-400 md:mt-0">
            Built in Perth, Western Australia 🇦🇺
          </p>
        </div>
      </div>
    </footer>
  );
}
