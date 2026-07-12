"use client";

import { Mail, ArrowUpRight, Calendar } from "lucide-react";
import { GithubIcon, LinkedInIcon, MediumIcon } from "@/components/ui/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { type LocaleConfig, getRegionPhrase } from "@/lib/locale";

export function Contact({ locale }: { locale: LocaleConfig }) {
  const description = locale.highlightedRegion
    ? `Open to Sr EM roles at Series A–D AI companies. Based in India — open to relocation, targeting a role ${getRegionPhrase(locale)}. Reply within 24h.`
    : "Open to Sr EM roles at Series A–D AI companies. Based in India — open to relocation: UK · Ireland · Europe · UAE · Saudi Arabia · Singapore. Reply within 24h.";

  return (
    <section id="contact" className="py-16 md:py-24 px-6">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          label="// contact"
          title="Let's Build Something"
          description={description}
        />

        <FadeIn>
          <Card className="border-border/50 bg-card">
            <CardContent className="p-8 text-center">
              <div className="mb-8 space-y-4">
                <a
                  href="mailto:piyushguptaece@gmail.com"
                  className="group inline-flex min-h-[44px] items-center gap-2 text-lg font-mono text-primary transition-colors hover:text-foreground"
                >
                  <Mail className="h-5 w-5" />
                  piyushguptaece@gmail.com
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <div>
                  <a
                    href="https://calendly.com/piyushguptaece/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-mono text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Calendar className="h-4 w-4" />
                    Book a 30-min intro call
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <a
                  href="https://github.com/piyushgupta27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "min-h-[44px]",
                  )}
                >
                  <GithubIcon className="mr-2 h-4 w-4" />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/piyushgupta27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "min-h-[44px]",
                  )}
                >
                  <LinkedInIcon className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href="https://piyushguptaece.medium.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "min-h-[44px]",
                  )}
                >
                  <MediumIcon className="mr-2 h-4 w-4" />
                  Medium
                </a>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
