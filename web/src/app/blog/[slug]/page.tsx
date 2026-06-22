import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";
import BlogPostBody from "@/components/blog/BlogPostBody";
import { BLOG_POSTS, getBlogPostBySlug, getBlogPostContent } from "@/lib/data/blog";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt ?? post.description,
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const content = getBlogPostContent(params.slug);
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="pt-20 min-h-screen">
      <div className="container-page pt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-ocean-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>
      </div>

      <article className="container-page py-8 max-w-4xl">
        {post.image && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-100 mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-4">
          {post.category && (
            <span className="badge bg-ocean-100 text-ocean-700">{post.category}</span>
          )}
          {post.date && (
            <span className="flex items-center gap-1.5 text-sm text-neutral-400">
              <Calendar size={14} />
              {post.date}
            </span>
          )}
          {post.author && (
            <span className="flex items-center gap-1.5 text-sm text-neutral-400">
              <User size={14} />
              {post.author}
            </span>
          )}
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ocean-900 leading-tight mb-8">
          {post.title}
        </h1>

        {content ? (
          <BlogPostBody sections={content.sections} />
        ) : post.excerpt ? (
          <p className="text-neutral-600 leading-relaxed">{post.excerpt}</p>
        ) : null}

        <div className="mt-10 p-6 rounded-2xl bg-ocean-50 border border-ocean-100">
          <p className="font-display text-xl font-semibold text-ocean-900 mb-2">
            Ready to buy in Jaco Beach?
          </p>
          <p className="text-neutral-600 mb-4">
            Contact Dominique for personalized guidance in English, Spanish, or French.
          </p>
          <Link href="/contact" className="btn-primary inline-flex">
            Contact Dominique
            <ArrowRight size={16} />
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-page pb-16 max-w-4xl">
          <h2 className="font-display text-2xl font-semibold text-ocean-900 mb-6">
            More Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group card p-5 hover:border-ocean-200 transition-colors"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-ocean-700 mb-2">
                  {item.category}
                </p>
                <h3 className="font-display text-lg font-semibold text-ocean-900 line-clamp-3 group-hover:text-ocean-700 transition-colors">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
