import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { getPostBySlug, getAllSlugs } from "@/content/blog";
import type { ContentBlock } from "@/content/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Piyush Gupta`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `https://piyushgupta.io/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          key={i}
          className="mt-16 mb-5 text-2xl font-bold tracking-tight border-l-4 border-primary pl-4"
        >
          {block.text}
        </h2>
      );

    case "subheading":
      return (
        <h3
          key={i}
          className="mt-8 mb-3 text-base font-semibold tracking-tight text-foreground/90"
        >
          {block.text}
        </h3>
      );

    case "paragraph":
      return (
        <p key={i} className="mb-4 leading-relaxed text-foreground/75">
          {block.text}
        </p>
      );

    case "image":
      return (
        <figure key={i} className="my-8">
          <img
            src={block.src}
            alt={block.alt}
            className="w-full rounded-lg border border-border/30"
          />
          {block.caption && (
            <figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "table":
      return (
        <div key={i} className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="border border-border/50 bg-card/80 px-4 py-2.5 text-left font-semibold text-foreground font-mono text-xs"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="odd:bg-card/30">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border border-border/50 px-4 py-2.5 text-sm text-muted-foreground"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "callout": {
      const variantStyles: Record<string, string> = {
        info: "border-primary/30 bg-primary/5 text-foreground/80",
        warning: "border-yellow-500/30 bg-yellow-500/10 text-foreground/80",
        tip: "border-green-500/30 bg-green-500/10 text-foreground/80",
      };
      const style =
        variantStyles[block.variant ?? "info"] ?? variantStyles.info;
      return (
        <div
          key={i}
          className={`my-6 rounded-lg border p-4 text-sm leading-relaxed ${style}`}
        >
          {block.text}
        </div>
      );
    }

    case "code":
      return (
        <pre
          key={i}
          className="my-6 overflow-x-auto rounded-lg border border-border/50 bg-card/80 p-4 font-mono text-sm leading-relaxed"
        >
          <code className="text-foreground/90">{block.text}</code>
        </pre>
      );

    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const hasContent = post.content.length > 0;

  return (
    <article className="py-24 px-6">
      <div className="mx-auto max-w-2xl">
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
          <div className="mt-4 flex items-center gap-3">
            <Image
              src="/images/headshot.jpg"
              alt="Piyush Gupta"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover border border-border/30"
            />
            <span className="font-mono text-xs text-muted-foreground">
              Piyush Gupta · Sr EM · ex-Hotstar/Disney · Slice
            </span>
          </div>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {hasContent ? (
          <div className="max-w-none">
            {post.githubUrl && (
              <div className="mb-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-border/30 pt-6 font-mono text-xs">
                <span>
                  <span className="text-primary font-bold">14 min</span>{" "}
                  <span className="text-muted-foreground">
                    · full 4-agent cycle
                  </span>
                </span>
                <span>
                  <span className="text-primary font-bold">4 agents</span>{" "}
                  <span className="text-muted-foreground">
                    · BUILDER → TESTER → REVIEWER → CHECKER
                  </span>
                </span>
                <span>
                  <span className="text-primary font-bold">$3.49</span>{" "}
                  <span className="text-muted-foreground">
                    · AI compute (gh-118)
                  </span>
                </span>
                <span>
                  <span className="text-primary font-bold">87%</span>{" "}
                  <span className="text-muted-foreground">
                    · straight-through success
                  </span>
                </span>
              </div>
            )}
            {post.content.map((block, i) => renderBlock(block, i))}

            <div className="mt-16 rounded-xl border border-primary/30 bg-primary/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {post.ctaText && (
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                  {post.ctaText}
                </p>
              )}
              <div className="flex flex-wrap gap-4 shrink-0">
                <a
                  href="https://calendly.com/piyushguptaece/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-mono text-sm text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a call
                </a>
                {post.githubUrl && (
                  <a
                    href={post.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-sm text-primary transition-colors hover:bg-primary/20"
                  >
                    View on GitHub
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {post.mediumUrl && (
                  <a
                    href={post.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    Read on Medium
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </article>
  );
}
