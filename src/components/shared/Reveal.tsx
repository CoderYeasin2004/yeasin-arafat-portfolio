"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds — used to stagger siblings inside a section. */
  delay?: number;
  /** Vertical travel distance in pixels before settling. */
  offset?: number;
}

/**
 * Fade-and-rise reveal used for section content and cards.
 *
 * Kept as a single small client wrapper so the sections themselves can stay
 * Server Components. When the visitor prefers reduced motion the wrapper
 * renders a plain `<div>` — no animation library code runs at all.
 */
export function Reveal({ children, className, delay = 0, offset = 24 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
