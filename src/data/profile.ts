/**
 * Personal content for Md Yeasin Arafat.
 *
 * Everything the UI displays about the developer lives here so content can be
 * edited without touching components. Only information provided in the
 * project brief is included — no invented experience, awards or contacts.
 */
import { siteConfig } from "@/config/site";

export const profile = {
  name: "Md Yeasin Arafat",
  /** Brand shown in the navbar/footer. */
  brand: siteConfig.name,
  role: "Full Stack Developer",
  level: "Intermediate",
  greeting: "Hello, I'm",
  tagline: "Building Modern Digital Experiences With Code, Creativity & Innovation.",
  description:
    "I am a Full Stack Developer passionate about building modern, scalable, and user-friendly web applications using modern technologies.",
  /** Small pulsing indicator in the hero. */
  availability: {
    label: "Available for new opportunities",
    note: "Open to freelance, contract and full-time work",
  },
  /** Two short paragraphs for the About section. */
  about: [
    "I am a Full Stack Developer who enjoys turning ideas into fast, accessible and polished web products. My focus is on writing clean, maintainable code and crafting interfaces that feel great on every device.",
    "On the frontend I work with React and Next.js, TypeScript and modern CSS to build responsive, component-driven user interfaces. On the backend I use Node.js and Express.js with MongoDB to design reliable APIs and data flows.",
    "I am continuously learning and adopting modern web technologies — from authentication with Better Auth to UI libraries like HeroUI, shadcn/ui and DaisyUI — so that every project ships with a strong foundation and a smooth user experience.",
  ],
  /**
   * Contact email used by the contact form's mailto fallback.
   * TODO: add a real address (e.g. "you@example.com") to enable it.
   * Left empty on purpose — no email address was supplied with the brief.
   */
  email: "",
  links: {
    github: "https://github.com/CoderYeasin2004",
    linkedin: "https://www.linkedin.com/in/arafat-yeasin",
  },
} as const;

export type Profile = typeof profile;
