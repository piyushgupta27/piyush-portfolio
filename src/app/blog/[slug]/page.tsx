import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPostBySlug, getAllSlugs } from "@/content/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Blog
          </Link>
          <div className="mt-8 mb-4 flex items-center gap-4 font-mono text-xs text-muted-foreground">
            <span className="text-primary">{post.tag}</span>
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {post.mediumUrl ? (
          <div className="rounded-lg border border-border/50 bg-card/50 p-8 text-center">
            <p className="mb-6 text-muted-foreground">
              This article is published on Medium — with images, diagrams, and
              full formatting.
            </p>
            <a
              href={post.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Read on Medium
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div className="max-w-none">
            {post.content.map((block, i) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={i}
                    className="mt-10 mb-4 text-xl font-semibold tracking-tight"
                  >
                    {block.text}
                  </h2>
                );
              }
              return (
                <p
                  key={i}
                  className="mb-4 leading-relaxed text-muted-foreground"
                >
                  {block.text}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
