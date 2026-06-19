import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/content/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Blog
          </Link>
          <div className="mt-8 mb-4 flex items-center gap-4 font-mono text-xs text-muted-foreground">
            <span className="text-primary">{post.tag}</span>
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="max-w-none">
          {post.content.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={i}
                  className="mt-10 mb-4 text-xl font-semibold tracking-tight"
                >
                  {block.text}
                </h2>
              );
            }
            return (
              <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
                {block.text}
              </p>
            );
          })}
        </div>
      </div>
    </article>
  );
}
