"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { FullExperienceEntry } from "@/data/experience-page";

const COMPANY_ICONS: Record<string, string> = {
  "Slice Bank": "/logos/slice-icon.png",
  "JumpingMinds AI": "/logos/jumpingminds-icon.png",
  "Disney+ Hotstar": "/logos/disney-hotstar-icon.webp",
  HyperTrack: "/logos/hypertrack-icon.svg",
};

const COMPANY_ICON_PADDING: Record<string, string> = {
  HyperTrack: "p-1",
};

const COMPANY_ICON_FIT: Record<string, string> = {
  HyperTrack: "object-contain",
};

const SHORT_NAMES: Record<string, string> = {
  "Slice Bank": "Slice",
  "JumpingMinds AI": "JumpingMinds",
  "Disney+ Hotstar": "Hotstar",
  HyperTrack: "HyperTrack",
};

interface ExperienceNavStripProps {
  entries: FullExperienceEntry[];
  className?: string;
}

function CompanyLogo({ company, size }: { company: string; size: number }) {
  if (COMPANY_ICONS[company]) {
    return (
      <span
        className={`relative shrink-0 overflow-hidden rounded-lg ${COMPANY_ICON_PADDING[company] ?? ""}`}
        style={{ display: "inline-block", width: size, height: size }}
      >
        <Image
          src={COMPANY_ICONS[company]}
          alt=""
          width={size}
          height={size}
          className={`h-full w-full ${COMPANY_ICON_FIT[company] ?? "object-cover"}`}
          unoptimized
          aria-hidden
        />
      </span>
    );
  }
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary/20"
      style={{ width: size, height: size }}
    >
      <span className="h-2 w-2 rounded-full bg-primary" />
    </span>
  );
}

export function ExperienceNavStrip({
  entries,
  className = "",
}: ExperienceNavStripProps) {
  const [activeSlug, setActiveSlug] = useState(entries[0]?.slug ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    entries.forEach((entry) => {
      const el = document.getElementById(`entry-${entry.slug}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([io]) => {
          if (io.isIntersecting) setActiveSlug(entry.slug);
        },
        { rootMargin: "-10% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [entries]);

  return (
    <nav aria-label="Company timeline" className={className}>
      <div className="flex gap-1 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {entries.map((entry) => {
          const isActive = activeSlug === entry.slug;
          return (
            <button
              key={entry.slug}
              type="button"
              aria-current={isActive ? "true" : undefined}
              onClick={() => {
                document
                  .getElementById(`entry-${entry.slug}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`group relative flex shrink-0 flex-col items-center gap-1 rounded-lg px-3 py-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CompanyLogo company={entry.company} size={28} />
              <span className="text-[10px] font-medium leading-tight">
                {SHORT_NAMES[entry.company]}
              </span>
              {isActive && (
                <span
                  aria-hidden
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
