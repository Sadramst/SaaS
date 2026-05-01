import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on mining analytics, Power BI, and AI for the Australian resources industry.",
};

export default function BlogPage() {
  return <BlogPageClient />;
}
