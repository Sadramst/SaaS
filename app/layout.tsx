import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.appilico.com"),
  title: {
    default: "Appilico — AI-Powered Analytics for Australian Mining & Resources",
    template: "%s | Appilico",
  },
  description:
    "Connect your operational data to Power BI and get executive-ready visuals with AI insights — in minutes. Built for Australian mining and resources.",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
