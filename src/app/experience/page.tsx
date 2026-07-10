import type { Metadata } from "next";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { TechBadge } from "@/components/ui/tech-badge";
import { FadeIn } from "@/components/motion/fade-in";
import { ExperienceArc } from "@/components/experience-arc";
import { ExperienceNavStrip } from "@/components/experience-nav-strip";
import { experiencePageEntries } from "@/data/experience-page";
import type {
  ExperiencePageEntry,
  FullExperienceEntry,
  MinimalExperienceEntry,
} from "@/data/experience-page";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Engineering career across Slice, JumpingMinds AI, Disney+ Hotstar, and HyperTrack — payment infrastructure, AI products before ChatGPT, real-time systems at 50M CCU, and open-source mobile SDKs.",
  openGraph: {
    title: "Experience — Piyush Gupta",
    description:
      "Engineering career across Slice, JumpingMinds AI, Disney+ Hotstar, and HyperTrack — payment infrastructure, AI products before ChatGPT, real-time systems at 50M CCU, and open-source mobile SDKs.",
    url: "https://www.piyushgupta.io/experience",
    images: [{ url: "https://www.piyushgupta.io/opengraph-image" }],
  },
};

function FullEntry({ entry }: { entry: FullExperienceEntry }) {
  return (
    <article>
      <p className="mb-3 font-mono text-sm text-muted-foreground/60">
        {entry.company}
        <span className="mx-2 opacity-40">·</span>
        {entry.period}
      </p>

      <h2 className="mb-5 text-[clamp(28px,5vw,40px)] font-bold leading-[1.1] tracking-tight text-balance">
        {entry.role}
      </h2>

      <div className="mb-7 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
        <span className="text-sm text-muted-foreground">{entry.scope}</span>
        <span className="text-muted-foreground/40">·</span>
        <span className="inline-block rounded border border-primary/20 bg-primary/10 px-2.5 py-0.5 font-mono text-xs text-primary">
          {entry.mode}
        </span>
      </div>

      <p className="mb-9 max-w-2xl text-base leading-[1.75] text-muted-foreground">
        {entry.situation}
      </p>

      <h3 className="mb-4 text-xl font-semibold tracking-tight">
        Key outcomes
      </h3>
      <ul className="mb-10 max-w-2xl space-y-3">
        {entry.outcomes.map((outcome) => (
          <li key={outcome} className="flex gap-3">
            <span className="flex h-[1.625em] shrink-0 items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            </span>
            <span className="text-[15px] leading-relaxed text-muted-foreground">
              {outcome}
            </span>
          </li>
        ))}
      </ul>

      <h3 className="mb-4 text-xl font-semibold tracking-tight">The call</h3>
      <div className="mb-10 max-w-2xl rounded-[0.625rem] border border-primary/30 bg-primary/5 p-5">
        <p className="text-[15px] leading-[1.75] text-muted-foreground">
          {entry.theCall}
        </p>
      </div>

      <h3 className="mb-4 text-xl font-semibold tracking-tight">
        Tech &amp; skills
      </h3>
      <div className="flex flex-wrap gap-2">
        {entry.tech.map((t) => (
          <TechBadge key={t}>{t}</TechBadge>
        ))}
      </div>

      {entry.links && entry.links.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs">
          {entry.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground/60 transition-colors hover:text-primary"
            >
              <span className="text-primary/60">↗</span>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

function MinimalEntry({ entry }: { entry: MinimalExperienceEntry }) {
  return (
    <article>
      <p className="mb-1 font-mono text-[11px] tracking-wider text-muted-foreground/60">
        {entry.period}
      </p>
      <h3 className="mb-0.5 text-base font-semibold">
        {entry.url ? (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            {entry.company}
          </a>
        ) : (
          entry.company
        )}
      </h3>
      <p className="mb-1 text-sm text-muted-foreground/70">{entry.role}</p>
      <p className="text-sm text-muted-foreground/60">{entry.description}</p>
    </article>
  );
}

function isMinimal(
  entry: ExperiencePageEntry,
): entry is MinimalExperienceEntry {
  return entry.minimal === true;
}

export default function ExperiencePage() {
  const fullEntries = experiencePageEntries.filter(
    (e): e is FullExperienceEntry => !isMinimal(e),
  );
  const minimalEntries = experiencePageEntries.filter(isMinimal);

  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-3xl lg:max-w-5xl">
        <div className="lg:grid lg:grid-cols-[180px_1fr] lg:gap-16">
          {/* Career arc sidebar — desktop only */}
          <ExperienceArc entries={fullEntries} />

          {/* Main content */}
          <div>
            <h1 className="mb-6">
              <Link
                href="/#experience"
                className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground/70 transition-colors hover:text-primary"
              >
                <span className="transition-colors group-hover:text-primary">
                  ←
                </span>
                Experience
              </Link>
            </h1>

            {/* Mobile company nav strip — hidden on desktop where sidebar takes over */}
            <ExperienceNavStrip
              entries={fullEntries}
              className="mb-8 lg:hidden sticky top-16 z-10 -mx-6 px-6 bg-background/90 backdrop-blur-sm border-b border-border/30"
            />

            {/* Full role entries */}
            <div className="space-y-12">
              {fullEntries.map((entry, i) => (
                <div
                  key={entry.slug}
                  id={`entry-${entry.slug}`}
                  className="scroll-mt-24"
                >
                  {i === 0 ? (
                    <FullEntry entry={entry} />
                  ) : (
                    <FadeIn>
                      <FullEntry entry={entry} />
                    </FadeIn>
                  )}
                  {i < fullEntries.length - 1 && (
                    <div className="mt-12 border-t border-border" />
                  )}
                </div>
              ))}
            </div>

            {/* Earlier career */}
            {minimalEntries.length > 0 && (
              <div className="mt-20">
                <div className="mb-8 border-t border-border pt-8">
                  <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground/50">
                    Earlier career
                  </h2>
                </div>
                <div className="space-y-8">
                  {minimalEntries.map((entry) => (
                    <MinimalEntry key={entry.slug} entry={entry} />
                  ))}
                </div>
              </div>
            )}

            {/* Single CTA */}
            <div className="mt-20 flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/30 bg-primary/5 p-6 sm:flex-row sm:items-center">
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
                <Calendar className="h-4 w-4" />
                Book a call
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
