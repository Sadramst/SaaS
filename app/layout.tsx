import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/providers/Providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.appilico.com"),
  title: {
    default: "Appilico OS — Operational Intelligence for Australian Mining & Resources",
    template: "%s | Appilico",
  },
  description:
    "8 configurable modules for mine production, equipment, safety, cost, grade, energy, workforce, and supply chain analytics. AI-powered. Built in Australia.",
  openGraph: {
    siteName: "Appilico",
    type: "website",
    locale: "en_AU",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Appilico" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
