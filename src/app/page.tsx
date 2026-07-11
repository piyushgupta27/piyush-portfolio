import { headers } from "next/headers";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Press } from "@/components/sections/press";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { getLocaleConfig } from "@/lib/locale";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: Props) {
  const hdrs = await headers();
  const sp = process.env.NODE_ENV !== "production" ? await searchParams : null;
  const geo = typeof sp?.["geo"] === "string" ? sp["geo"] : null;
  const country = geo ?? hdrs.get("x-vercel-ip-country");
  const locale = getLocaleConfig(country);

  return (
    <>
      <Hero locale={locale} />
      <About locale={locale} />
      <Experience />
      <Press />
      <Projects />
      <Blog />
      <Skills />
      <Education />
      <Contact locale={locale} />
    </>
  );
}
