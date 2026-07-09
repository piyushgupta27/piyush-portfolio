"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { FullExperienceEntry } from "@/data/experience-page";

const COMPANY_ICONS: Record<string, string> = {
  "Slice Small Finance Bank": "/logos/slice-icon.png",
  "JumpingMinds AI": "/logos/jumpingminds-icon.png",
  "Disney+ Hotstar": "/logos/disney-hotstar-icon.jpg",
};

export function ExperienceArc({ entries }: { entries: FullExperienceEntry[] }) {
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
    <div className="hidden lg:block">
      <div className="sticky top-24">
        <div className="relative pl-1">
          {/* Vertical thread */}
          <div className="absolute left-4 top-5 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-primary/30 via-primary/15 to-transparent" />

          <div className="space-y-7">
            {entries.map((entry) => {
              const isActive = activeSlug === entry.slug;
              return (
                <button
                  key={entry.slug}
                  type="button"
                  onClick={() => {
                    document
                      .getElementById(`entry-${entry.slug}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`group flex items-center gap-3 text-left transition-all duration-200 ${
                    isActive ? "opacity-100" : "opacity-35 hover:opacity-65"
                  }`}
                >
                  <div
                    className={`relative z-10 h-8 w-8 shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                      isActive
                        ? "ring-2 ring-primary/50 ring-offset-1 ring-offset-background"
                        : ""
                    }`}
                  >
                    {COMPANY_ICONS[entry.company] ? (
                      <Image
                        src={COMPANY_ICONS[entry.company]}
                        alt=""
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                        unoptimized
                        aria-hidden
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary/20">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium leading-snug text-foreground">
                      {entry.company}
                    </p>
                    <p className="text-[11px] leading-snug text-muted-foreground/55">
                      {entry.period}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
