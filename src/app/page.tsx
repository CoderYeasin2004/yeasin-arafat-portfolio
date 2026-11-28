import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

/**
 * Single-page portfolio.
 *
 * Every portfolio section lives on this route and is reached by hash
 * scrolling from the navbar; the resume is a standalone PDF at /resume.pdf.
 * The file stays a Server Component — only interactive pieces (navbar,
 * contact form, motion wrappers) opt into the client bundle.
 */
export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Contact />
    </main>
  );
}
