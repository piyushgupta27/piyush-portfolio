"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mic } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechBadge } from "@/components/ui/tech-badge";
import {
  StaggerChildren,
  staggerItem,
} from "@/components/motion/stagger-children";
import { blogPosts } from "@/data/blog";
import { talks } from "@/data/talks";

export function Blog() {
  return (
    <section id="blog" className="py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="// blog & talks"
          title="Blog & Talks"
          description="Writing on AI engineering, distributed systems, and building at scale — plus conference talks."
        />

        <StaggerChildren className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <motion.div key={post.title} variants={staggerItem}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <Card className="group h-full cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {post.tag}
                      </Badge>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span>Read on Medium →</span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}

          {talks.map((talk) => (
            <motion.div
              key={talk.title}
              variants={staggerItem}
              className="md:col-span-2"
            >
              <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardContent className="relative p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Mic className="h-4 w-4 text-primary" />
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs">
                      Talk
                    </Badge>
                    <span className="ml-auto font-mono text-xs text-muted-foreground">
                      {talk.event} · {talk.date}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{talk.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {talk.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {talk.tags.map((tag) => (
                        <TechBadge key={tag}>{tag}</TechBadge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {talk.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
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
