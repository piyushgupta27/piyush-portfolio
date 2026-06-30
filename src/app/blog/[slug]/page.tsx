import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { getPostBySlug, getAllSlugs, calculateReadTime } from "@/content/blog";
import type { ContentBlock } from "@/content/blog";
import { AnchorLink } from "./anchor-link";
import { ScrollFade } from "./scroll-fade";

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

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "heading": {
      const id = slugify(block.text);
      return (
        <h2
          key={i}
          id={id}
          className="group mt-14 mb-6 scroll-mt-24 text-2xl font-bold tracking-tight"
        >
          {block.text}
          <AnchorLink id={id} label={block.text} />
        </h2>
      );
    }

    case "subheading":
      return (
        <h3
          key={i}
          className="mt-8 mb-3 flex items-center gap-3 text-lg font-semibold tracking-tight text-foreground/90"
        >
          {block.number && (
            <span className="shrink-0 font-mono text-xs font-semibold text-primary/70">
              {block.number}
            </span>
          )}
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
        <ScrollFade
          key={i}
          className={`mt-8 mb-8${block.wide ? " -mx-6 sm:-mx-12 lg:-mx-24" : ""}`}
        >
          <figure>
            <div
              className={
                block.wide ? "overflow-x-auto sm:overflow-x-visible" : undefined
              }
            >
              {block.mobileSrc && (
                <img
                  src={block.mobileSrc}
                  alt={block.alt}
                  loading="lazy"
                  className="block sm:hidden w-full rounded-lg border border-border/30"
                />
              )}
              <img
                src={block.src}
                alt={block.alt}
                loading="lazy"
                className={`rounded-lg border border-border/30${block.wide ? " min-w-[800px] sm:min-w-0 sm:w-full" : " w-full"}${block.mobileSrc ? " hidden sm:block" : ""}`}
              />
            </div>
            {block.wide && !block.mobileSrc && (
              <p className="mt-1.5 text-right font-mono text-[10px] text-muted-foreground/40 sm:hidden">
                scroll to explore →
              </p>
            )}
            {block.caption && (
              <figcaption className="mt-3 text-center font-mono text-sm text-muted-foreground">
                {block.caption}
              </figcaption>
            )}
          </figure>
        </ScrollFade>
      );

    case "table":
      return (
        <div
          key={i}
          className={`mt-10 mb-10${block.wide ? " -mx-6 sm:-mx-12 lg:-mx-24" : ""}`}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-y border-primary/25 bg-primary/10">
                  {block.headers.map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-left font-mono text-[10px] font-bold uppercase tracking-widest text-primary/70"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/[0.08]">
                {block.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-4 py-2.5 align-top text-sm ${ci === 0 ? "font-semibold text-foreground" : "text-foreground/65"}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-1.5 text-right font-mono text-[10px] text-muted-foreground/40 sm:hidden">
            scroll to explore →
          </p>
        </div>
      );

    case "callout": {
      const variant = block.variant ?? "info";
      const variantConfig: Record<string, { className: string; icon: string }> =
        {
          info: {
            className: "border-primary/50 bg-primary/10 text-foreground/90",
            icon: "⚡",
          },
          warning: {
            className:
              "border-yellow-500/30 bg-yellow-500/10 text-foreground/80",
            icon: "⚠️",
          },
          tip: {
            className: "border-green-500/30 bg-green-500/10 text-foreground/80",
            icon: "✦",
          },
        };
      const config = variantConfig[variant] ?? variantConfig.info;
      return (
        <div
          key={i}
          className={`my-6 flex items-start gap-3 rounded-lg border p-4 text-sm leading-relaxed ${config.className}`}
        >
          <span className="mt-0.5 shrink-0">{config.icon}</span>
          <span>{block.text}</span>
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

    case "list":
      return (
        <ul key={i} className="mb-6 space-y-3 pl-0">
          {block.items.map((item, li) => (
            <li key={li} className="flex gap-3">
              <span className="flex h-[1.625em] shrink-0 items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              </span>
              <span className="leading-relaxed text-foreground/90">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "links":
      return (
        <div
          key={i}
          className="my-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs"
        >
          {block.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-foreground/50 transition-colors hover:text-primary"
            >
              <span className="text-primary/60">↗</span>
              <span>{item.label}</span>
              {item.description && (
                <span className="text-muted-foreground/40">
                  — {item.description}
                </span>
              )}
            </a>
          ))}
        </div>
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

  const introParaIndices = new Set<number>();
  if (hasContent) {
    let count = 0;
    post.content.forEach((b, i) => {
      if (b.type === "paragraph" && count < 2) {
        introParaIndices.add(i);
        count++;
      }
    });
  }
  const introParagraphs = post.content.filter((_, i) =>
    introParaIndices.has(i),
  ) as { type: "paragraph"; text: string }[];

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

        <div className="mt-6 mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
          <span className="text-primary">{post.tag}</span>
          <span className="text-muted-foreground/30">·</span>
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {hasContent && (
            <>
              <span className="text-muted-foreground/30">·</span>
              <span>{calculateReadTime(post.content)}</span>
            </>
          )}
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
              Engineering Manager · Slice
              <span className="hidden sm:inline">
                {" "}
                · ex-Disney+Hotstar · ex-JumpingMinds
              </span>
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <p className="leading-relaxed text-foreground/90">
            {post.excerpt.split(".")[0]}.
          </p>
          {introParagraphs.map((b, i) => (
            <p key={i} className="leading-relaxed text-foreground/90">
              {b.text}
            </p>
          ))}
        </div>

        {hasContent ? (
          <div className="mt-12">
            {/* Stats graphic — only on posts with stats defined */}
            {post.stats && post.stats.length > 0 && (
              <div className="mb-10 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                {post.stats.map((stat, idx) => (
                  <ScrollFade
                    key={stat.label}
                    delay={idx * 80}
                    className="rounded-lg border border-primary/20 bg-primary/5 p-3 sm:p-4"
                  >
                    <div className="font-mono text-2xl font-bold leading-none text-primary sm:text-3xl">
                      {stat.value}
                      {stat.unit && (
                        <span className="ml-1 font-mono text-2xl font-bold text-primary/70 sm:text-3xl">
                          {stat.unit}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-[10px] font-bold uppercase tracking-wide text-foreground/65">
                      {stat.label}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] text-muted-foreground/70">
                      {stat.sub}
                    </div>
                  </ScrollFade>
                ))}
              </div>
            )}

            {/* Inline TOC */}
            {hasToc && (
              <nav
                aria-label="Table of contents"
                className="mb-10 border-y border-border/40 py-5"
              >
                <p className="mb-3 font-mono text-xs text-muted-foreground/50">
                  Contents
                </p>
                <ol className="flex flex-col gap-2.5">
                  {headings.map((h) => (
                    <li key={h.id}>
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

            {/* Article body — skip first 2 paragraphs shown above stats */}
            {post.content.map((block, i) =>
              introParaIndices.has(i) ? null : renderBlock(block, i),
            )}

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
