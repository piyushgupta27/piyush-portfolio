"use client";

import { Brain, Code, CreditCard, Layers, Server, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { TechIcon } from "@/components/ui/tech-icon";
import { skillCategories } from "@/data/skills";

const CATEGORY_TECH_ICONS: Record<string, { slug: string; label: string }[]> = {
  "Backend Engineering": [
    { slug: "typescript", label: "TypeScript" },
    { slug: "nodejs", label: "Node.js" },
    { slug: "python", label: "Python" },
    { slug: "go", label: "Go" },
    { slug: "kotlin", label: "Java / Kotlin" },
    { slug: "django", label: "Django" },
  ],
  Infrastructure: [
    { slug: "aws", label: "AWS" },
    { slug: "googlecloud", label: "GCP" },
    { slug: "kubernetes", label: "Kubernetes" },
    { slug: "apachekafka", label: "Kafka" },
    { slug: "docker", label: "Docker" },
    { slug: "redis", label: "Redis" },
    { slug: "postgresql", label: "Postgres" },
    { slug: "terraform", label: "Terraform" },
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

                    <div className="flex flex-wrap gap-2">
                      {CATEGORY_TECH_ICONS[cat.category]
                        ? CATEGORY_TECH_ICONS[cat.category].map((item) => (
                            <span
                              key={item.slug}
                              className="inline-flex items-center gap-1.5 rounded-md border border-border/50 bg-background/50 px-2.5 py-1 text-xs font-mono text-muted-foreground"
                            >
                              <TechIcon slug={item.slug} size={12} />
                              {item.label}
                            </span>
                          ))
                        : cat.skills.map((skill) => (
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
