"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "Peak concurrent users", value: "50M" },
  { label: "JumpingMinds users", value: "1M+" },
  { label: "Messages delivered IPL 2019", value: "250B+" },
  { label: "Engineers led currently", value: "15+" },
];

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="// about"
          title="Engineering at Scale"
          description="Platform engineering, product leadership, and autonomous AI tooling."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image + Terminal */}
          <FadeIn direction="left">
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl border border-border/50 neon-glow">
                <Image
                  src="/images/headshot.jpg"
                  alt="Piyush Gupta"
                  width={600}
                  height={600}
                  className="w-full aspect-square object-cover object-top"
                  priority
                />
              </div>

              {/* Terminal block */}
              <Card className="border-border/50 bg-card">
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/70" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                    <div className="h-3 w-3 rounded-full bg-green-500/70" />
                    <span className="ml-2 font-mono text-xs text-muted-foreground">
                      terminal
                    </span>
                  </div>
                  <pre className="font-mono text-xs leading-relaxed text-muted-foreground">
                    <code>
                      {`$ whoami
> piyush_gupta

$ cat skills.txt
> platform-eng, typescript, go,
> ai-agents, system-design, EM

$ echo $STATUS
> building ai-sdlc`}
                    </code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </FadeIn>

          {/* Bio + Stats */}
          <FadeIn direction="right" delay={0.2}>
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Engineering manager with 12 years across backend, mobile, and
                  frontend — the last 7 in management. Three chapters define the
                  career.
                </p>
                <p>
                  At Disney+ Hotstar I built real-time messaging infrastructure
                  that served 35M+ concurrent users at sub-second latency — 250
                  billion messages during IPL 2019. The same architecture later
                  scaled to 50M+ on the platform.
                </p>
                <p className="rounded-lg border border-border/50 bg-card px-4 py-3 text-sm">
                  <span className="font-semibold text-foreground">
                    Disney vote of confidence:
                  </span>{" "}
                  Three of my most senior colleagues from Hotstar — the India
                  CEO, CTO, and SVP Product — personally backed JumpingMinds AI
                  as investors.
                </p>
                <p>
                  In 2021 I co-founded JumpingMinds AI, a mental health
                  platform. Grew from zero to 1M+ users across India, US, UK,
                  and Scandinavia. Google for Startups Accelerator 2022. Wound
                  down cleanly in 2024.
                </p>
                <p>
                  Today I lead three squads at Slice (15+ engineers) across
                  payments, merchant banking, and digital lending — and
                  I&apos;ve shipped four AI systems now live org-wide: an AI
                  oncall bot, an OpEx intelligence reporter, a PA/PG onboarding
                  automation, and a managerial AI toolkit.
                </p>
                <p>
                  Open to Sr EM roles and relocation: UK · Ireland · Europe ·
                  UAE · Saudi Arabia · Singapore.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <Card className="border-border/50 bg-card">
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-primary">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-xs font-mono text-muted-foreground">
                          {stat.label}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
