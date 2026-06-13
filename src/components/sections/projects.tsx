"use client";

import { motion } from "framer-motion";
import {
  Code,
  Workflow,
  Search,
  Briefcase,
  BarChart2,
  Activity,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechBadge } from "@/components/ui/tech-badge";
import {
  StaggerChildren,
  staggerItem,
} from "@/components/motion/stagger-children";
import { projects } from "@/data/projects";

const iconMap: Record<string, React.ElementType> = {
  Code,
  Workflow,
  Search,
  Briefcase,
  BarChart2,
  Activity,
};

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="// projects"
          title="What I've Built"
          description="A selection of AI-powered products and tools."
        />

        <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const Icon = iconMap[project.icon] ?? Code;
            return (
              <motion.div key={project.title} variants={staggerItem}>
                <Card className="group relative h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:neon-glow">
                  {/* Gradient accent */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  <CardContent className="relative p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-background/50">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg flex-1">
                        {project.title}
                      </h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <TechBadge key={t}>{t}</TechBadge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
