import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Talks } from "@/components/sections/talks";
import { Education } from "@/components/sections/education";
import { Projects } from "@/components/sections/projects";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Talks />
      <Education />
      <Projects />
      <Blog />
      <Contact />
    </>
  );
}
