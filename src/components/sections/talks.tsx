"use client";

import { motion } from "framer-motion";
import { ExternalLink, Mic } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechBadge } from "@/components/ui/tech-badge";
import {
  StaggerChildren,
  staggerItem,
} from "@/components/motion/stagger-children";
import { talks } from "@/data/talks";

export function Talks() {
  return (
    <section id="talks" className="py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="// talks"
          title="Speaking"
          description="Conference talks on distributed systems and infrastructure at scale."
        />

        <StaggerChildren className="grid gap-6 md:grid-cols-2">
          {talks.map((talk) => (
            <motion.div key={talk.title} variants={staggerItem}>
              <Card className="group relative h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:neon-glow">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardContent className="relative p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Mic className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-mono text-xs text-primary">
                      {talk.event} · {talk.date}
                    </span>
                  </div>

                  <h3 className="mb-3 font-semibold text-lg leading-snug">
                    {talk.title}
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {talk.description}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {talk.tags.map((tag) => (
                      <TechBadge key={tag}>{tag}</TechBadge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {talk.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
