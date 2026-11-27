"use client";

import { ArrowUp } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface FooterActionsProps {
  className?: string;
}

/**
 * Footer corner utilities — availability status + back-to-top control.
 *
 * Sits in the otherwise empty end of the copyright bar. Kept as a small
 * client island so the footer itself can remain a Server Component:
 *
 * - the status dot reuses the shared `pulse-dot` keyframes (green = open to
 *   work) and drops the animation entirely when the visitor prefers reduced
 *   motion,
 * - the button scrolls smoothly back to the `#home` section — falling back
 *   to the top of the document if that section is missing — and honours the
 *   same reduced-motion preference.
 */
export function FooterActions({ className }: FooterActionsProps) {
  const reduceMotion = useReducedMotion() ?? false;

  /** Smooth (or instant, under reduced motion) jump back to the hero. */
  const scrollToTop = () => {
    const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";
    const home = document.getElementById("home");

    if (home) {
      home.scrollIntoView({ behavior, block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      {/* Availability widget */}
      <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
        <span
          aria-hidden
          className="size-1.5 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_rgb(16_185_129_/_0.75)] dark:bg-emerald-400"
          style={reduceMotion ? undefined : { animation: "pulse-dot 2.4s ease-in-out infinite" }}
        />
        Available for opportunities
      </p>

      {/* Back to top */}
      <motion.button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-accent-text"
      >
        <ArrowUp aria-hidden className="size-4" />
      </motion.button>
    </div>
  );
}
