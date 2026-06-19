import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { getLatestPosts } from "@/lib/data/blog";

export default function BlogPreview() {
  const posts = getLatestPosts(3);

  return (
    <section className="section-padding bg-cream">
      <div className="container-page">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-jungle-700 font-sans text-sm font-semibold uppercase tracking-widest">
              Stay Informed
            </span>
            <h2 className="section-title mt-3">Our Blog</h2>
            <p className="section-subtitle mt-2">
              Market news, lifestyle tips, and investment strategies for Jaco Beach.
            </p>
          </div>
          <Link href="/blog" className="btn-secondary shrink-0 self-start sm:self-auto">
            All Articles
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group card overflow-hidden flex flex-col"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-gradient-to-br from-ocean-100 to-ocean-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-ocean-700/20 group-hover:bg-ocean-700/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-ocean-700 text-lg font-semibold px-4 text-center">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3">
                  {post.date && (
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {post.date}
                    </span>
                  )}
                  {post.author && (
                    <span className="flex items-center gap-1">
                      <User size={11} />
                      {post.author.split(" ")[0]}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg font-semibold text-ocean-900 leading-snug line-clamp-2 group-hover:text-ocean-700 transition-colors mb-3">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                )}

                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-ocean-700 group-hover:gap-2 transition-all">
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
