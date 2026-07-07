import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getExperienceBySlug,
  getAllExperienceSlugs,
} from "@/data/experience-detail";
import { TechBadge } from "@/components/ui/tech-badge";

const SITE_URL = "https://www.piyushgupta.io";

interface Props {
  params: Promise<{ company: string }>;
}

export function generateStaticParams() {
  return getAllExperienceSlugs().map((slug) => ({ company: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company } = await params;
  const detail = getExperienceBySlug(company);
  if (!detail) return {};

  if (detail.stub) {
    return {
      title: `${detail.company} — Piyush Gupta`,
      robots: { index: false },
    };
  }

  return {
    title: `${detail.company} — ${detail.role} | Piyush Gupta`,
    description: detail.overview,
    openGraph: {
      title: `${detail.company} — ${detail.role}`,
      description: detail.overview,
      type: "profile",
      url: `${SITE_URL}/experience/${detail.slug}`,
    },
    twitter: {
      card: "summary",
      title: `${detail.company} — ${detail.role}`,
      description: detail.overview,
    },
  };
}

export default async function ExperienceDetailPage({ params }: Props) {
  const { company } = await params;
  const detail = getExperienceBySlug(company);
  if (!detail) notFound();

  return (
    <article className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#experience"
          className="inline-flex items-center gap-2 py-3 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Experience
        </Link>

        {detail.stub ? (
          <div className="mt-12">
            <h1 className="text-3xl font-bold tracking-tight">
              {detail.company}
            </h1>
            <div className="mt-12 rounded-lg border border-border/50 bg-card/50 p-8 text-center">
              <p className="text-muted-foreground">
                Content brief from Piyush pending — this page will be updated
                once the full story is ready.
              </p>
              <Link
                href="/#experience"
                className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-primary transition-colors hover:text-primary/80"
              >
                ← Back to experience
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 font-mono text-xs text-primary">
              {detail.period}
            </div>
            <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {detail.company}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">{detail.role}</p>

            <p className="mt-8 leading-relaxed text-foreground/90">
              {detail.overview}
            </p>

            {detail.highlights.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-4 text-xl font-bold tracking-tight">
                  Key achievements
                </h2>
                <ul className="space-y-3">
                  {detail.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="flex h-[1.625em] shrink-0 items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                      </span>
                      <span className="leading-relaxed text-foreground/90">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {detail.tech.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-4 text-xl font-bold tracking-tight">
                  Tech &amp; skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {detail.tech.map((t) => (
                    <TechBadge key={t}>{t}</TechBadge>
                  ))}
                </div>
              </div>
            )}

            {detail.links && detail.links.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-4 text-xl font-bold tracking-tight">Links</h2>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs">
                  {detail.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-foreground/50 transition-colors hover:text-primary"
                    >
                      <span className="text-primary/60">↗</span>
                      <span>{link.label}</span>
                      {link.description && (
                        <span className="text-muted-foreground/40">
                          — {link.description}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16 flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/30 bg-primary/5 p-6 sm:flex-row sm:items-center">
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Want to talk about this work or explore how I can help your
                team?
              </p>
              <a
                href="https://calendly.com/piyushguptaece/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-3 font-mono text-sm text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book a call
              </a>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
