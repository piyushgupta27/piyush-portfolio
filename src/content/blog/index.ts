import realtimePart1 from "./realtime-messaging-part-1";
import realtimePart2 from "./realtime-messaging-part-2";
import capturingEmojis from "./capturing-a-billion-emojis";
import whyDisney from "./why-i-enjoyed-working-at-disney";
import agenticSdlc from "./agentic-sdlc";
import type { BlogPostData } from "./types";

export type { BlogPostData, ContentBlock } from "./types";

export const seedPosts: BlogPostData[] = [
  agenticSdlc,
  realtimePart1,
  realtimePart2,
  capturingEmojis,
  whyDisney,
];

export function getPostBySlug(slug: string): BlogPostData | undefined {
  return seedPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return seedPosts.map((p) => p.slug);
}
