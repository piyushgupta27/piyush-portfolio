export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string };

export interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  content: ContentBlock[];
  mediumUrl?: string;
  githubUrl?: string;
}
