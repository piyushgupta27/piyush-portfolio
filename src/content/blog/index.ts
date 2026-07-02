import realtimePart1 from "./realtime-messaging-part-1";
import realtimePart2 from "./realtime-messaging-part-2";
import capturingEmojis from "./capturing-a-billion-emojis";
import whyDisney from "./why-i-enjoyed-working-at-disney";
import androidScheduling from "./android-scheduling";
import agenticSdlc from "./agentic-sdlc";
import type { BlogPostData, ContentBlock } from "./types";

export type { BlogPostData, ContentBlock } from "./types";

export const seedPosts: BlogPostData[] = [
  // aiLeadershipToolkit — hidden: content under review, will restore in sprint 8
  // managerialAiToolkit — hidden: AMJ internal content needs review before publish
  agenticSdlc,
  realtimePart1,
  realtimePart2,
  capturingEmojis,
  whyDisney,
  androidScheduling,
];

export function getAllPosts(): BlogPostData[] {
  return [...seedPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPostData | undefined {
  return seedPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return seedPosts.map((p) => p.slug);
}

export function calculateReadTime(content: ContentBlock[]): string {
  const words = content
    .filter((b): b is Extract<ContentBlock, { text: string }> => "text" in b)
    .reduce((count, b) => count + b.text.split(/\s+/).length, 0);
  return `${Math.ceil(words / 200)} min read`;
}
