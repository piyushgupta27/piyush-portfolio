"use client";

import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedInIcon, MediumIcon } from "@/components/ui/icons";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 px-6">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          label="// contact"
          title="Let's Build Something"
          description="Looking for Sr EM roles at Series A–D AI companies building products people actually use. Reply within 24h."
        />

        <FadeIn>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="mb-8 space-y-4">
                <a
                  href="mailto:piyushguptaece@gmail.com"
                  className="group inline-flex items-center gap-2 text-lg font-mono text-primary transition-colors hover:text-foreground"
                >
                  <Mail className="h-5 w-5" />
                  piyushguptaece@gmail.com
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <div className="flex justify-center gap-4">
                <a
                  href="https://github.com/piyushgupta27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  <GithubIcon className="mr-2 h-4 w-4" />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/piyushguptaece"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  <LinkedInIcon className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href="https://piyushguptaece.medium.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
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
