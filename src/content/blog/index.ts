import engineeringLeadership from "./engineering-leadership-at-scale";
import aiTooling from "./ai-tooling-for-engineering-teams";
import shippingWithConfidence from "./shipping-with-confidence";
import type { BlogPostData } from "./types";

export type { BlogPostData, ContentBlock } from "./types";

export const seedPosts: BlogPostData[] = [
  engineeringLeadership,
  aiTooling,
  shippingWithConfidence,
];

export function getPostBySlug(slug: string): BlogPostData | undefined {
  return seedPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return seedPosts.map((p) => p.slug);
}
