"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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
        <div className="pl-1">
          <nav aria-label="Company timeline">
            <div className="space-y-7">
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
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                    className="group flex items-center gap-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:rounded-sm"
                  >
                    <div
                      className={`relative z-10 h-8 w-8 shrink-0 overflow-hidden rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "ring-2 ring-primary/50 ring-offset-1 ring-offset-background"
                          : ""
                      } ${COMPANY_ICON_PADDING[entry.company] ?? ""}`}
                    >
                      {COMPANY_ICONS[entry.company] ? (
                        <Image
                          src={COMPANY_ICONS[entry.company]}
                          alt=""
                          width={32}
                          height={32}
                          className={`h-full w-full ${COMPANY_ICON_FIT[entry.company] ?? "object-cover"}`}
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
                      <p
                        className={`text-xs font-medium leading-snug transition-colors duration-200 ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
                      >
                        {entry.company}
                      </p>
                      <p className="text-xs leading-snug text-muted-foreground">
                        {entry.period}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
