"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

interface TypingNameProps {
  name: string;
}

/** Milliseconds between reveals — 130ms reads as a natural, unhurried typing
 *  cadence: slow enough to follow along, fast enough to never feel stalled. */
const CHARACTER_DELAY = 130;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Stable store helpers — the server snapshot renders the empty name area so
 *  hydration matches exactly, then the real preference takes over. */
function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerReducedMotion = () => false;

/**
 * Types a string out one character at a time on first load.
 *
 * Only the characters revealed so far are rendered, so the name area starts
 * empty (a blinking caret is the only thing on screen) and grows as each
 * character lands. A single sequential timer drives the reveal: one character
 * every `CHARACTER_DELAY` milliseconds, in order, with the caret sitting
 * immediately after the last one and removed once the string is complete.
 *
 * With `prefers-reduced-motion` the full name is shown immediately — no
 * typing, no caret.
 *
 * The parent element should carry `aria-label={name}` (characters are hidden
 * from assistive tech so the partial string is never announced mid-typing).
 */
export function TypingName({ name }: TypingNameProps) {
  const prefersReduced = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const [typedCount, setTypedCount] = useState(0);
  const [typing, setTyping] = useState(true);

  const characters = Array.from(name);

  // Derived in render so the reduced-motion path never needs to set state from
  // inside an effect — it is simply reflected immediately.
  const visibleCount = prefersReduced ? characters.length : typedCount;
  const isTyping = !prefersReduced && typing;

  useEffect(() => {
    if (prefersReduced) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let count = 0;

    // Sequential typing: each tick reveals exactly one more character, then
    // schedules the next tick after the delay.
    const tick = () => {
      if (cancelled) return;

      count += 1;

      if (count > Array.from(name).length) {
        // Everything is visible — drop the caret.
        setTyping(false);
        return;
      }

      setTypedCount(count);
      timer = setTimeout(tick, CHARACTER_DELAY);
    };

    // Hold on the empty name area (caret only) before the first character.
    timer = setTimeout(tick, CHARACTER_DELAY);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [name, prefersReduced]);

  return (
    <>
      {characters.slice(0, visibleCount).map((char, index) => (
        <span key={`${index}-${char}`} data-typing-char aria-hidden>
          {char}
        </span>
      ))}
      {isTyping ? (
        <span aria-hidden className="typing-caret bg-accent" />
      ) : null}
    </>
  );
}
