/**
 * Shared domain types for portfolio content.
 *
 * All content files in `src/data` are typed against these interfaces so the
 * UI stays strongly typed and editing content never breaks rendering.
 */

/** A single skill shown inside a skill category card. */
export interface Skill {
  /** Display name, e.g. "TypeScript". */
  name: string;
  /** Short 1-2 character monogram rendered inside the skill tile. */
  glyph: string;
}

/** A grouped skill category (Frontend, Backend, ...). */
export interface SkillCategory {
  id: string;
  title: string;
  /** One-line description of what this category covers. */
  description: string;
  skills: Skill[];
}

/** A featured project card rendered on the homepage and resume. */
export interface Project {
  id: string;
  title: string;
  /** Short, factual summary sourced from the project's repository README. */
  description: string;
  /** Technology stack tags displayed on the card. */
  tags: string[];
  /** Repository URL. */
  githubUrl: string;
  /** Live demo URL. */
  liveUrl: string;
  /** Marks the highlighted project (shown with a "Featured" badge). */
  featured: boolean;
}

/** Work experience entry for the resume page. */
export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  isPlaceholder: boolean;
}

/** Education entry for the resume page. */
export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
  summary: string;
  isPlaceholder: boolean;
}
