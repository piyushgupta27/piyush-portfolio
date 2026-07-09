"use client";

import Image from "next/image";
import Link from "next/link";
import { Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechBadge } from "@/components/ui/tech-badge";
import { experiences } from "@/data/experience";
import { careerArc } from "@/data/career-arc";

const COMPANY_ICONS: Record<string, string> = {
  "Slice Bank": "/logos/slice-icon.png",
  "JumpingMinds AI": "/logos/jumpingminds-icon.png",
  "Disney+ Hotstar": "/logos/disney-hotstar-icon.webp",
};

export function Experience() {
  const { ref: timelineRef, inView: timelineInView } = useInView();
  const { ref: careerRef, inView: careerInView } = useInView();
  return (
    <section id="experience" className="py-16 md:py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Where I've Worked"
          description="Platform engineering and co-founder experience across fintech and consumer health at scale."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:left-1/2 md:-translate-x-px" />

          <div ref={timelineRef} className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={exp.company}
                style={
                  timelineInView
                    ? {
                        animation: `fade-in-up 0.5s cubic-bezier(0.21,0.47,0.32,0.98) ${i * 0.1}s both`,
                      }
                    : { opacity: 0 }
                }
                className={`relative flex flex-col gap-4 pl-12 md:pl-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[13px] top-6 z-10 flex h-3 w-3 items-center justify-center rounded-full border-2 border-primary bg-background md:left-1/2 md:-translate-x-1/2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                </div>

                {/* Card */}
                <div className="md:w-[calc(50%-2rem)]">
                  <Link href="/experience" className="group block">
                    <Card className="border-border/50 bg-card transition-colors group-hover:border-primary/30 group-focus-visible:border-primary/30">
                      <CardContent className="p-6">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-primary" />
                            <span className="font-mono text-xs text-primary">
                              {exp.period}
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-colors group-hover:text-primary group-focus-visible:text-primary" />
                        </div>
                        <div className="mb-3 flex items-center gap-2.5">
                          {COMPANY_ICONS[exp.company] && (
                            <Image
                              src={COMPANY_ICONS[exp.company]}
                              alt=""
                              width={36}
                              height={36}
                              className="h-9 w-9 shrink-0 rounded-lg object-cover"
                              unoptimized
                              aria-hidden="true"
                            />
                          )}
                          <div>
                            <p className="text-xs text-muted-foreground/60">
                              {exp.company}
                            </p>
                            <h3 className="text-base font-semibold leading-tight">
                              {exp.role}
                            </h3>
                          </div>
                        </div>
                        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((t) => (
                            <TechBadge key={t}>{t}</TechBadge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>

        {/* Full career arc */}
        <div
          ref={careerRef}
          style={
            careerInView
              ? {
                  animation:
                    "fade-in-up 0.5s cubic-bezier(0.21,0.47,0.32,0.98) 0.2s both",
                }
              : { opacity: 0 }
          }
          className="mt-16"
        >
          <p className="mb-4 font-mono text-xs text-muted-foreground">
            {"// full career arc"}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {careerArc.map((entry, i) => (
              <div key={entry.org} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    entry.current
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : entry.type === "education"
                        ? "border-border/50 bg-secondary/30 text-muted-foreground"
                        : "border-border/50 bg-card/50 text-foreground/80"
                  }`}
                >
                  {entry.type === "education" ? (
                    <GraduationCap className="h-3 w-3 shrink-0" />
                  ) : (
                    <Briefcase className="h-3 w-3 shrink-0" />
                  )}
                  <span>{entry.org}</span>
                  {entry.role && (
                    <>
                      <span className="text-muted-foreground/60">·</span>
                      <span className="text-muted-foreground">
                        {entry.role}
                      </span>
                    </>
                  )}
                </div>
                {i < careerArc.length - 1 && (
                  <span className="shrink-0 text-muted-foreground/30 text-xs">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
