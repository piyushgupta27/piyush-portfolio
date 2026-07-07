import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { seedPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on engineering leadership, AI systems, and platform engineering at scale.",
};

export default function BlogIndexPage() {
  return (
    <div className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16">
          <span className="mb-4 inline-block font-mono text-sm tracking-wider text-primary uppercase">
            {"// blog"}
          </span>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Writing & Thinking
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Thoughts on engineering leadership, AI tooling, and building
            platform teams at scale.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {seedPosts.map((post) => {
            const href = post.mediumUrl ?? `/blog/${post.slug}`;
            const isExternal = !!post.mediumUrl;

            return isExternal ? (
              <a
                key={post.slug}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <Card className="group relative h-full cursor-pointer border-border/50 bg-card transition-all duration-300 hover:border-primary/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl pointer-events-none" />
                  <CardContent className="relative p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {post.tag}
                      </Badge>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>

                    <h2 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>

                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span>Read on Medium →</span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ) : (
              <Link key={post.slug} href={href} className="block h-full">
                <Card className="group relative h-full cursor-pointer border-border/50 bg-card transition-all duration-300 hover:border-primary/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-xl pointer-events-none" />
                  <CardContent className="relative p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {post.tag}
                      </Badge>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>

                    <h2 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>

                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span>Read →</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-center">
          <a
            href="https://piyushguptaece.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            More writing on Medium
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
