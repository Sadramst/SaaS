"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogApi } from "@/lib/api/blog";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { BlogPost, ApiResponse, PagedResult } from "@/types";
import { Clock, ArrowRight } from "lucide-react";

const categories = ["All", "Mining Analytics", "Power BI", "AI & ML", "Industry News"];

const placeholderPosts: BlogPost[] = [
  {
    id: "1",
    title: "Why Australian Mining Companies Are Moving to Real-Time Analytics in 2026",
    slug: "real-time-analytics-mining-2026",
    excerpt: "The days of monthly reporting are numbered. Discover why the industry is shifting to live operational dashboards and what it means for your mine site.",
    content: "",
    category: "Mining Analytics",
    author: "Appilico Team",
    publishedAt: "2026-04-15T00:00:00Z",
    readTimeMinutes: 7,
    tags: ["analytics", "mining", "real-time"],
  },
  {
    id: "2",
    title: "Power BI Custom Visuals: What They Are and Why Mining Operations Need Them",
    slug: "power-bi-custom-visuals-mining",
    excerpt: "Standard charts don't cut it in mining. Learn how custom Power BI visuals are transforming how mine sites track production, safety, and costs.",
    content: "",
    category: "Power BI",
    author: "Appilico Team",
    publishedAt: "2026-04-08T00:00:00Z",
    readTimeMinutes: 5,
    tags: ["power-bi", "visuals", "mining"],
  },
  {
    id: "3",
    title: "The Real Cost of Manual Reporting in Mining Operations",
    slug: "cost-of-manual-reporting-mining",
    excerpt: "Manual reports cost more than you think. We break down the hidden costs of spreadsheet-based reporting and the ROI of automated analytics.",
    content: "",
    category: "Industry News",
    author: "Appilico Team",
    publishedAt: "2026-04-01T00:00:00Z",
    readTimeMinutes: 6,
    tags: ["reporting", "ROI", "automation"],
  },
];

export default function BlogPageClient() {
  const [posts, setPosts] = useState<BlogPost[]>(placeholderPosts);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    blogApi
      .getPosts()
      .then((res) => {
        if (res.success && res.data && res.data.items.length > 0) {
          setPosts(res.data.items);
        }
      })
      .catch(() => {
        // Keep placeholder posts
      });
  }, []);

  const filtered =
    activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-b from-[#1F3864] to-[#162d52] py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Blog</h1>
          <p className="mt-4 text-lg text-gray-300">
            Insights on mining analytics, Power BI, and AI for the Australian resources industry.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory === cat
                    ? "bg-[#0070C0] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, index) => (
              <motion.article
                key={post.id}
                className="group rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <span className="inline-block rounded-full bg-[#0070C0]/10 px-3 py-1 text-xs font-medium text-[#0070C0]">
                    {post.category}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-[#0070C0] dark:text-white">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readTimeMinutes} min read
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#0070C0] hover:underline"
                  >
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-500">No posts found in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
}
