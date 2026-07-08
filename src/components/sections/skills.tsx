"use client";

import { Brain, Code, CreditCard, Layers, Server, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { TechIcon } from "@/components/ui/tech-icon";
import { skillCategories } from "@/data/skills";

const CATEGORY_TECH_ICONS: Record<string, string[]> = {
  "Backend Engineering": [
    "typescript",
    "nodejs",
    "python",
    "go",
    "kotlin",
    "django",
  ],
  Infrastructure: [
    "googlecloud",
    "kubernetes",
    "docker",
    "redis",
    "postgresql",
    "apachekafka",
    "terraform",
  ],
};

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Code,
  CreditCard,
  Layers,
  Server,
  Users,
};

export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Technical Range"
          description="Spanning engineering leadership, AI systems, backend, infrastructure, and fintech."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {skillCategories.map((cat, catIndex) => {
            const Icon = iconMap[cat.icon] ?? Brain;
            return (
              <FadeIn key={cat.category} delay={catIndex * 0.15}>
                <Card className="h-full border-border/50 bg-card">
                  <CardContent className="p-6">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-background/50">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{cat.category}</h3>
                    </div>

                    {CATEGORY_TECH_ICONS[cat.category] && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {CATEGORY_TECH_ICONS[cat.category].map((slug) => (
                          <div
                            key={slug}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-border/30 bg-background/60"
                          >
                            <TechIcon slug={slug} size={18} />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="rounded-md border border-border/50 bg-background/50 px-2.5 py-1 text-xs font-mono text-muted-foreground"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
