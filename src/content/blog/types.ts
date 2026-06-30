export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string; number?: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      wide?: boolean;
      mobileSrc?: string;
    }
  | { type: "table"; headers: string[]; rows: string[][]; wide?: boolean }
  | { type: "callout"; text: string; variant?: "info" | "warning" | "tip" }
  | { type: "code"; language?: string; text: string }
  | {
      type: "links";
      items: { label: string; href: string; description?: string }[];
    }
  | { type: "list"; items: string[] };

export interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  content: ContentBlock[];
  mediumUrl?: string;
  githubUrl?: string;
  ctaText?: string;
  stats?: Array<{ value: string; unit?: string; label: string; sub: string }>;
}
