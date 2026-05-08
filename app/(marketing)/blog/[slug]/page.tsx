import type { Metadata } from "next";
import BlogPostPageClient from "./BlogPostPageClient";
import type { ApiResponse, BlogPost } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/posts/${slug}`,
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const data: ApiResponse<BlogPost> = await res.json();
      if (data.success && data.data) {
        return {
          title: data.data.title,
          description: data.data.excerpt,
          openGraph: { title: data.data.title, description: data.data.excerpt },
        };
      }
    }
  } catch {
    // Fallback to default
  }
  return {
    title: "Blog Post",
    description: "Read the latest from Appilico.",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return <BlogPostPageClient slug={slug} />;
}
