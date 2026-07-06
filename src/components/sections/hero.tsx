"use client";

import Image from "next/image";
import { ArrowDown, Download } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/ui/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
      </div>

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Status badge */}
        <div className="animate-in fade-in slide-in-from-bottom-4 mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-1.5 text-sm backdrop-blur-sm duration-500">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Open to Sr EM roles · UK · Ireland · Europe · UAE · Saudi Arabia ·
          Singapore · Remote
        </div>

        {/* Name — LCP element: no delay, visible as soon as CSS loads */}
        <h1 className="animate-in fade-in slide-in-from-bottom-4 mb-4 text-4xl font-bold tracking-tight duration-500 delay-100 sm:text-5xl md:text-7xl">
          Piyush <span className="gradient-text">Gupta</span>
        </h1>

        {/* Tagline */}
        <p className="animate-in fade-in slide-in-from-bottom-4 mb-6 text-xl font-semibold text-foreground duration-500 delay-200 sm:text-2xl">
          Built real-time infra for 50M+ concurrent users. Founded an AI
          startup. Still ships AI code.
        </p>

        {/* Sub-tagline */}
        <p className="animate-in fade-in slide-in-from-bottom-4 mx-auto mb-6 max-w-2xl text-lg text-muted-foreground duration-500 delay-300 sm:mb-10 sm:text-xl">
          Engineering Manager · IIT Roorkee · Ex-Disney+ Hotstar · Co-Founder
          (JumpingMinds, 1M+ users) · Currently at Slice · Relocation-ready
        </p>

        {/* CTAs */}
        <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-wrap items-center justify-center gap-4 duration-500 delay-[400ms]">
          <a
            href="#projects"
            className={cn(
              buttonVariants({ size: "lg" }),
              "neon-glow min-h-[44px]",
            )}
          >
            See the work
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-h-[44px]",
            )}
          >
            Get in touch
          </a>
          <a
            href="/resume/piyush-resume.pdf"
            download
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-h-[44px]",
            )}
          >
            <Download className="mr-2 h-4 w-4" />
            Resume
          </a>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/piyushgupta27"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "min-h-[44px] min-w-[44px]",
              )}
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/piyushgupta27"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "min-h-[44px] min-w-[44px]",
              )}
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-in fade-in mt-12 duration-1000 delay-[1000ms]">
          <a
            href="#about"
            className="inline-flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="font-mono">scroll</span>
            <ArrowDown className="h-4 w-4 animate-scroll-nudge" />
          </a>
        </div>
      </div>
    </section>
  );
}
