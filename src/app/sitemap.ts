import type { MetadataRoute } from "next";
import { getAllPosts } from "@/content/blog";
import { experienceDetails } from "@/data/experience-detail";

const SITE_URL = "https://www.piyushgupta.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().filter(
    (p) => !p.mediumUrl && p.content.length > 0,
  );

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const experienceEntries: MetadataRoute.Sitemap = experienceDetails
    .filter((d) => !d.stub)
    .map((d) => ({
      url: `${SITE_URL}/experience/${d.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogEntries,
    ...experienceEntries,
  ];
}
