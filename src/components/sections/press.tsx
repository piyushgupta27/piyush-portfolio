"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredPress, supportingPress } from "@/data/press";

export function Press() {
  const shouldReduce = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduce ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: {
      duration: shouldReduce ? 0 : 0.5,
      delay: shouldReduce ? 0 : delay,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  });

  return (
    <section id="press" className="py-16 md:py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading label="// recognition" title="Press & Recognition" />

        {/* Featured hero award */}
        <motion.a
          {...fadeUp(0)}
          href={featuredPress.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-4 flex items-start justify-between gap-6 rounded-xl border border-foreground/10 bg-card p-6 sm:p-8 transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="min-w-0">
            <p className="mb-3 font-mono text-xs tracking-widest text-primary uppercase">
              {featuredPress.outlet} · {featuredPress.year}
            </p>
            <h3 className="mb-3 text-2xl font-bold tracking-tight leading-snug text-balance sm:text-3xl group-hover:text-primary transition-colors">
              {featuredPress.award}
            </h3>
            {featuredPress.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {featuredPress.description}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-col items-end gap-3">
            <span
              className="font-mono text-4xl font-bold leading-none text-primary/10 sm:text-5xl"
              aria-hidden="true"
            >
              &apos;{featuredPress.year.slice(2)}
            </span>
            <ArrowUpRight
              className="size-5 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
              aria-hidden="true"
            />
          </div>
        </motion.a>

        {/* Supporting awards grid */}
        <motion.div
          {...fadeUp(0.1)}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {supportingPress.map((item, i) => (
            <motion.a
              key={item.award}
              {...fadeUp(0.15 + i * 0.05)}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 rounded-lg border border-foreground/8 bg-card/50 p-4 transition-colors hover:border-primary/25 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <p className="text-xs font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                {item.award}
              </p>
              <p className="mt-auto font-mono text-[10px] text-muted-foreground">
                {item.outlet} · {item.year}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
