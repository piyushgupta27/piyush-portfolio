"use client";

import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechBadge } from "@/components/ui/tech-badge";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="py-12 md:py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Where I Studied"
          description="Engineering foundation at IIT Roorkee, with a European exchange at FAU Germany."
        />

        <StaggerChildren className="grid gap-6 md:grid-cols-2">
          {education.map((edu) => (
            <div key={edu.institution}>
              <Card className="group relative h-full overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:neon-glow">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardContent className="relative p-6">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary shrink-0" />
                      <span className="font-mono text-xs text-primary">
                        {edu.location}
                      </span>
                    </div>
                    {edu.period && (
                      <span className="font-mono text-xs text-muted-foreground">
                        {edu.period}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-1 font-semibold text-lg leading-snug">
                    {edu.institution}
                  </h3>

                  <p className="mb-3 text-sm text-muted-foreground">
                    {edu.degree}
                    {edu.field ? ` · ${edu.field}` : ""}
                  </p>

                  {edu.note && (
                    <div className="flex flex-wrap gap-2">
                      <TechBadge>{edu.note}</TechBadge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
