"use client";

import { sectionLinks } from "@/config/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

/**
 * Section ids watched by the grid layer — derived at module scope so the
 * array reference stays stable and the observer inside the hook is never
 * needlessly re-created (same pattern as the navbar's scroll spy).
 */
const SECTION_IDS = sectionLinks.map((link) => link.href.replace("#", ""));

/**
 * Grid strength per region, so the texture supports the page instead of
 * competing with it:
 *
 * - `home` keeps the original full-strength `.bg-grid` (slightly more visible),
 * - `about` / `skills` / `education` drop to a subtle backdrop,
 * - `projects` / `contact` — and, through the scroll spy, the footer that
 *   follows them — stay very subtle so cards, screenshots and forms win.
 *
 * Values are plain wrapper opacities multiplied over the same faint
 * `.bg-grid` lines, so light and dark themes inherit the texture unchanged.
 */
const GRID_OPACITY: Record<string, number> = {
  home: 1,
  about: 0.6,
  skills: 0.6,
  education: 0.6,
  projects: 0.35,
  contact: 0.35,
};

/** Used when no portfolio section matches (e.g. a route without sections). */
const FALLBACK_OPACITY = 0.6;

/**
 * Shared full-page engineering-grid backdrop.
 *
 * The Hero's local `.bg-grid` layer, promoted to one site-wide fixed layer
 * (`-z-10` + `pointer-events-none`) so the same visual language runs behind
 * every section without being duplicated in each one. It sits behind the code
 * rain (rendered after it in the root layout) and never touches interaction.
 *
 * Opacity follows the active section and cross-fades over half a second; the
 * global reduced-motion override collapses that transition, so the layer stays
 * static-friendly for visitors who prefer no motion.
 */
export function GridBackground({ className }: { className?: string }) {
  const activeSection = useActiveSection(SECTION_IDS);
  const opacity = GRID_OPACITY[activeSection] ?? FALLBACK_OPACITY;

  return (
    <div
      aria-hidden
      style={{ opacity }}
      className={cn(
        "no-print pointer-events-none fixed inset-0 -z-10 bg-grid transition-opacity duration-500 ease-out",
        className,
      )}
    />
  );
}
