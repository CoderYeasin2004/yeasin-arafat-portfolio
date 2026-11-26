"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which portfolio section is currently in the viewport and returns its
 * id so the navbar can highlight the matching link.
 *
 * An IntersectionObserver with a centered root margin is used instead of a
 * scroll listener: it reports only when the active section actually changes,
 * which keeps scrolling cheap and avoids re-rendering on every scroll frame.
 *
 * @param sectionIds Section ids to observe (e.g. ["home", "about", ...]).
 * @returns The id of the section currently crossing the viewport middle.
 */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // Nothing to observe (e.g. a route without portfolio sections).
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          // Topmost visible section wins when several overlap.
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      {
        // Focuses on the middle band of the viewport so a section becomes
        // "active" only once it is meaningfully on screen.
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
