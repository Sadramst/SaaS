"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import api from "@/lib/api";
import { formatDate } from "@/lib/utils";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import type { BlogPost, ApiResponse } from "@/types";
import { ArrowLeft, Clock, User } from "lucide-react";

const placeholderContent: Record<string, BlogPost> = {
  "real-time-analytics-mining-2026": {
    id: "1",
    title: "Why Australian Mining Companies Are Moving to Real-Time Analytics in 2026",
    slug: "real-time-analytics-mining-2026",
    excerpt: "The days of monthly reporting are numbered.",
    content: `## The Shift to Real-Time

The mining industry is undergoing a fundamental transformation in how it consumes operational data. Monthly reports and static dashboards are being replaced by live, AI-powered analytics platforms that provide insights in real time.

## Why Now?

Three key factors are driving this shift:

1. **Data infrastructure maturity** — Most large mining operations now have connected sensors, fleet management systems, and historian databases generating data 24/7
2. **Cloud computing costs** — Azure and AWS have made it economically viable to process large volumes of operational data in real time
3. **Competitive pressure** — Early adopters are seeing 10–15% improvements in equipment utilisation and cost per tonne

## What Does Real-Time Actually Mean?

In mining, "real-time" doesn't always mean millisecond latency. For most operational KPIs, refreshing every 5–15 minutes is sufficient. The real value is in moving from monthly or weekly reporting to intra-shift visibility.

## The Impact on Decision Making

When a shift supervisor can see equipment utilisation dropping in real time, they can intervene immediately rather than discovering the issue in next month's report. This is the difference between reactive and proactive operations management.

## Getting Started

The barrier to entry is lower than most mining companies expect. Modern platforms like Appilico can connect to your existing data sources and deliver production-grade dashboards within days, not months.`,
    category: "Mining Analytics",
    author: "Appilico Team",
    publishedAt: "2026-04-15T00:00:00Z",
    readTimeMinutes: 7,
    tags: ["analytics", "mining", "real-time"],
  },
  "power-bi-custom-visuals-mining": {
    id: "2",
    title: "Power BI Custom Visuals: What They Are and Why Mining Operations Need Them",
    slug: "power-bi-custom-visuals-mining",
    excerpt: "Standard charts don't cut it in mining.",
    content: `## Beyond Standard Charts

Power BI ships with dozens of built-in chart types — bar charts, line charts, pie charts. But mining operations have unique visualisation needs that these standard visuals can't address.

## What Are Custom Visuals?

Custom visuals are purpose-built Power BI components developed specifically for a use case. For mining, this means:

- **Production Gantt charts** with shift-level granularity
- **Equipment heatmaps** showing OEE across an entire fleet
- **Waterfall charts** tracking ore grade from bench to plant

## Why Mining Needs Custom Visuals

Mining operations track KPIs that don't map neatly to standard business charts. A production Gantt needs to show shift boundaries, crew assignments, equipment allocations, and tonnage targets simultaneously.

## The Development Challenge

Building custom Power BI visuals requires specialised skills in TypeScript, D3.js, and the Power BI Visuals SDK. Most mining companies don't have these skills in-house, which is why they end up paying consultants large sums.

## A Better Approach

Appilico provides pre-built, mining-specific custom visuals that work out of the box. No development required — just connect your data and select the visuals you need.`,
    category: "Power BI",
    author: "Appilico Team",
    publishedAt: "2026-04-08T00:00:00Z",
    readTimeMinutes: 5,
    tags: ["power-bi", "visuals", "mining"],
  },
  "cost-of-manual-reporting-mining": {
    id: "3",
    title: "The Real Cost of Manual Reporting in Mining Operations",
    slug: "cost-of-manual-reporting-mining",
    excerpt: "Manual reports cost more than you think.",
    content: `## The Hidden Cost

Most mining operations don't realise how much they spend on manual reporting. When you add up the engineering hours, the delays in decision-making, and the errors from manual data handling, the cost is staggering.

## Breaking Down the Numbers

A typical mid-tier mining operation spends:

- **40+ hours per month** on manual report compilation across departments
- **$15,000–$30,000 per month** in engineering time devoted to reporting instead of operations
- **2–3 week delays** between events and management visibility

## The Error Factor

Manual data handling introduces errors at every step. A mistyped number in a spreadsheet can cascade through an entire monthly report. Studies show manual reporting processes have error rates of 5–15%.

## The Opportunity Cost

Every hour an engineer spends compiling a report is an hour they're not optimising operations. The opportunity cost of manual reporting is often larger than the direct cost.

## The Automated Alternative

Modern analytics platforms eliminate manual reporting entirely. Data flows from source systems to dashboards automatically, with AI validating data quality and flagging anomalies.

## ROI of Automation

Mining companies that switch from manual to automated reporting typically see ROI within 3–6 months, driven by:

1. Reduced engineering time on reporting
2. Faster decision-making from real-time visibility
3. Fewer errors in operational KPIs`,
    category: "Industry News",
    author: "Appilico Team",
    publishedAt: "2026-04-01T00:00:00Z",
    readTimeMinutes: 6,
    tags: ["reporting", "ROI", "automation"],
  },
};

export default function BlogPostPageClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<ApiResponse<BlogPost>>(`/api/blog/posts/${slug}`)
      .then((res) => {
        if (res.data.success && res.data.data) {
          setPost(res.data.data);
        } else {
          setPost(placeholderContent[slug] ?? null);
        }
      })
      .catch(() => {
        setPost(placeholderContent[slug] ?? null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="pt-32"><LoadingSpinner /></div>;

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link href="/blog" className="mt-4 inline-block text-[#0070C0] hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  const headings = post.content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => ({
      text: line.replace("## ", ""),
      id: line
        .replace("## ", "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-"),
    }));

  return (
    <div className="pt-16">
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0070C0]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <header className="mb-12">
          <span className="inline-block rounded-full bg-[#0070C0]/10 px-3 py-1 text-xs font-medium text-[#0070C0]">
            {post.category}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" /> {post.author}
            </span>
            <span>{formatDate(post.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {post.readTimeMinutes} min read
            </span>
          </div>
        </header>

        <div className="flex gap-12">
          {headings.length > 0 && (
            <aside className="hidden w-48 flex-shrink-0 lg:block">
              <nav className="sticky top-24 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Contents
                </p>
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className="block text-sm text-gray-500 hover:text-[#0070C0]"
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </aside>
          )}

          <div className="prose prose-gray max-w-none flex-1 dark:prose-invert">
            <ReactMarkdown
              components={{
                h2: ({ children, ...props }) => {
                  const text = String(children);
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  return (
                    <h2 id={id} className="scroll-mt-24" {...props}>
                      {children}
                    </h2>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        <footer className="mt-16 rounded-xl border border-gray-200 p-6 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0070C0] text-lg font-bold text-white">
              A
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{post.author}</p>
              <p className="text-sm text-gray-500">
                The Appilico team writes about mining analytics, Power BI, and AI.
              </p>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
