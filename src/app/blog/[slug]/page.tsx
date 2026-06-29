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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const POST_STATS = [
  { value: "14 min", label: "Cycle time", sub: "vs 3–4h manual" },
  { value: "4", label: "Agents", sub: "fully automated pipeline" },
  { value: "$3.49", label: "AI cost", sub: "end-to-end, this issue" },
  { value: "87%", label: "Straight-thru", sub: "zero human loops" },
];

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "heading":
      return (
        <h2
          key={i}
          id={slugify(block.text)}
          className="mt-14 mb-4 scroll-mt-24 text-2xl font-bold tracking-tight"
        >
          {block.text}
        </h2>
      );

    case "subheading":
      return (
        <h3
          key={i}
          className="mt-8 mb-3 text-lg font-semibold tracking-tight text-foreground/90"
        >
          {block.text}
        </h3>
      );

    case "paragraph":
      return (
        <p
          key={i}
          className="mb-6 leading-relaxed text-pretty text-foreground/90"
        >
          {block.text}
        </p>
      );

    case "image":
      return (
        <figure key={i} className="my-8">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="w-full rounded-lg border border-border/30"
          />
          {block.caption && (
            <figcaption className="mt-3 text-center font-mono text-sm text-muted-foreground">
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
                    className="border border-border/50 bg-card/80 px-4 py-2.5 text-left font-mono text-xs font-semibold text-foreground"
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
                      className="border border-border/50 px-4 py-2.5 text-sm text-foreground/70"
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

  const headings = post.content
    .filter((b): b is { type: "heading"; text: string } => b.type === "heading")
    .map((b) => ({ text: b.text, id: slugify(b.text) }));

  const hasToc = hasContent && headings.length > 2;

  return (
    <article className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 py-3 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Blog
        </Link>

        <div className="mt-6 mb-4 flex items-center gap-4 font-mono text-xs text-muted-foreground">
          <span className="text-primary">{post.tag}</span>
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-5 flex items-center gap-3">
          <Image
            src="/images/headshot.jpg"
            alt="Piyush Gupta"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-border/30 object-cover object-top"
          />
          <div>
            <span className="block font-mono text-xs text-foreground/85">
              Piyush Gupta
            </span>
            <span className="block font-mono text-xs text-muted-foreground">
              Engineering Manager · Slice · ex-Disney+Hotstar · ex-JumpingMinds
            </span>
          </div>
        </div>

        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        {hasContent ? (
          <div className="mt-12">
            {/* Stats graphic — only on posts with a github source */}
            {post.githubUrl && (
              <div className="mb-10 flex flex-wrap gap-y-6 sm:flex-nowrap">
                {POST_STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`flex-1 min-w-[120px]${
                      i > 0 ? " sm:border-l sm:border-border/25 sm:pl-8" : ""
                    }`}
                  >
                    <div className="mb-2.5 h-px w-8 bg-primary/60" />
                    <div className="whitespace-nowrap font-mono text-3xl font-bold leading-none text-primary sm:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-foreground/75">
                      {stat.label}
                    </div>
                    <div className="mt-0.5 font-mono text-xs text-muted-foreground/60">
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Inline TOC */}
            {hasToc && (
              <nav
                aria-label="Table of contents"
                className="mb-10 border-y border-border/40 py-5"
              >
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground/50">
                  Jump to
                </p>
                <ol className="flex flex-col gap-2.5">
                  {headings.map((h, i) => (
                    <li key={h.id} className="flex items-baseline gap-3">
                      <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground/35">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${h.id}`}
                        className="text-sm leading-snug text-foreground/50 transition-colors hover:text-primary"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Article body */}
            {post.content.map((block, i) => renderBlock(block, i))}

            {/* CTA */}
            <div className="mt-16 flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/30 bg-primary/5 p-6 sm:flex-row sm:items-center">
              {post.ctaText && (
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  {post.ctaText}
                </p>
              )}
              <div className="flex shrink-0 flex-wrap gap-4">
                <a
                  href="https://calendly.com/piyushguptaece/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-3 font-mono text-sm text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Book a call
                </a>
                {post.githubUrl && (
                  <a
                    href={post.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-4 py-3 font-mono text-sm text-primary transition-colors hover:bg-primary/20"
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
          <div className="mt-12 rounded-lg border border-border/50 bg-card/50 p-8 text-center">
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
