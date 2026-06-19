import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaco Beach Real Estate Blog",
  description: "Market news, lifestyle tips, and investment strategies for Jaco Beach, Costa Rica real estate.",
};

export default function BlogPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-ocean-900 text-white py-14">
        <div className="container-page">
          <span className="text-sand-500 font-sans text-sm font-semibold uppercase tracking-widest">
            Stay Informed
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mt-3">
            Our Blog
          </h1>
          <p className="text-white/60 mt-3 text-lg">
            Market news, lifestyle guides, and investment strategies for Jaco Beach.
          </p>
        </div>
      </div>

      <div className="container-page py-16">
        {/* Featured post */}
        {BLOG_POSTS[0] && (
          <Link
            href={`/blog/${BLOG_POSTS[0].slug}`}
            className="group block card overflow-hidden mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto bg-gradient-to-br from-ocean-700 to-ocean-900 relative">
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <h2 className="font-display text-3xl font-semibold text-white text-center leading-tight">
                    {BLOG_POSTS[0].title}
                  </h2>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="badge bg-ocean-100 text-ocean-700 mb-4">
                  {BLOG_POSTS[0].category} · Featured
                </span>
                <h3 className="font-display text-3xl font-semibold text-ocean-900 leading-tight mb-4 group-hover:text-ocean-700 transition-colors">
                  {BLOG_POSTS[0].title}
                </h3>
                <p className="text-neutral-500 leading-relaxed mb-6">{BLOG_POSTS[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-neutral-400 mb-6">
                  <span className="flex items-center gap-1.5"><Calendar size={13} />{BLOG_POSTS[0].date}</span>
                  <span className="flex items-center gap-1.5"><User size={13} />{BLOG_POSTS[0].author}</span>
                </div>
                <span className="inline-flex items-center gap-2 text-ocean-700 font-semibold group-hover:gap-3 transition-all">
                  Read Article <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Rest of posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group card overflow-hidden flex flex-col"
            >
              <div className="aspect-video bg-gradient-to-br from-ocean-100 to-sand-100 flex items-center justify-center p-6">
                <span className="font-display text-ocean-700 text-lg font-semibold text-center">
                  {post.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-ocean-900 line-clamp-2 group-hover:text-ocean-700 transition-colors mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-neutral-500 line-clamp-3 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-ocean-700 group-hover:gap-2 transition-all">
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
