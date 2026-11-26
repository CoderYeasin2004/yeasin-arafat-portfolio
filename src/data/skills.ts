/**
 * Technical skills grouped by category.
 *
 * `glyph` is a short monogram rendered inside a gradient tile — brand logos
 * are intentionally avoided so no third-party icon set is required.
 */
import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Responsive, component-driven user interfaces.",
    skills: [
      { name: "HTML5", glyph: "H5" },
      { name: "CSS3", glyph: "CS" },
      { name: "JavaScript", glyph: "JS" },
      { name: "TypeScript", glyph: "TS" },
      { name: "React.js", glyph: "RE" },
      { name: "Next.js", glyph: "NX" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Server-side logic and REST APIs with Node.js.",
    skills: [
      { name: "Node.js", glyph: "ND" },
      { name: "Express.js", glyph: "EX" },
    ],
  },
  {
    id: "database",
    title: "Database",
    description: "Document database modelling and queries.",
    skills: [{ name: "MongoDB", glyph: "MG" }],
  },
  {
    id: "authentication",
    title: "Authentication",
    description: "Modern session-based authentication flows.",
    skills: [{ name: "Better Auth", glyph: "BA" }],
  },
  {
    id: "ui-libraries",
    title: "UI Libraries",
    description: "Accessible, design-system driven components.",
    skills: [
      { name: "HeroUI", glyph: "HU" },
      { name: "shadcn/ui", glyph: "SC" },
      { name: "DaisyUI", glyph: "DA" },
    ],
  },
];
