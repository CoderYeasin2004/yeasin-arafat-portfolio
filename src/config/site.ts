/**
 * Central site-wide configuration.
 *
 * Holds navigation, SEO and branding values so layout, navbar, sitemap and
 * robots files all read from a single source of truth. Content that belongs
 * to the developer profile lives in `src/data/profile.ts` instead.
 */

/** Internal section navigation. `href` values must match section IDs. */
export interface NavLink {
  label: string;
  href: string;
}

/** Section links used by the single-page navbar (hash scrolling). */
export const sectionLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/** Primary navigation: homepage sections plus the real resume PDF. */
export const navLinks: NavLink[] = [...sectionLinks, { label: "Resume", href: "/resume.pdf" }];

export const siteConfig = {
  /** Brand shown in the navbar and footer. */
  name: "YEASIN.DEV",
  /** Default document title (used with the `title.template` in the layout). */
  title: "Md Yeasin Arafat — Full Stack Developer",
  description:
    "Portfolio of Md Yeasin Arafat, a Full Stack Developer building modern, scalable and user-friendly web applications with Next.js, TypeScript, Node.js and MongoDB.",
  /** TODO: replace with the real deployed domain before going live. */
  url: "https://yeasin.dev",
  keywords: [
    "Md Yeasin Arafat",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Portfolio",
  ],
} as const;
