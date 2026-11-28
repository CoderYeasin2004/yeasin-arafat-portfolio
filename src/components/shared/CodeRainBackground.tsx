"use client";

import { useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Colour scheme currently applied to <html>. */
type ThemeMode = "dark" | "light";

interface Palette {
  /** Colour of the falling stream. */
  main: string;
  /** Brighter colour reserved for the leading glyph of a stream. */
  highlight: string;
  /** Rare emerald accent, used for a small share of leading glyphs. */
  accent: string;
}

/**
 * Rendering palette — the site's Midnight Blue + Electric Cyan scheme.
 * Light mode uses deeper, more saturated blues than before so the glyphs stay
 * clearly visible against the near-white `--background`, while the dark palette
 * (and therefore the dark-mode appearance) is left exactly as it was.
 */
const PALETTES: Record<ThemeMode, Palette> = {
  dark: { main: "#38BDF8", highlight: "#67E8F9", accent: "#34D399" },
  light: { main: "#0284C7", highlight: "#0369A1", accent: "#047857" },
};

/**
 * Wrapper opacity per theme:
 * - `peak` while the hero (`#home`) fills the viewport — the hero earns a
 *   slightly more present effect,
 * - `base` for the rest of the page, where content must stay readable.
 *
 * Light mode was raised (0.26/0.09 → 0.38/0.16) to give the rain real
 * presence there; dark values are unchanged. Both stay low enough that body
 * text (near-black on near-white in light mode) keeps its contrast, and cards,
 * project screenshots and form fields are opaque surfaces that sit above the
 * layer anyway.
 */
const OPACITY: Record<ThemeMode, { peak: number; base: number }> = {
  dark: { peak: 0.5, base: 0.17 },
  light: { peak: 0.38, base: 0.16 },
};

/**
 * Short, code-flavoured glyphs used by the streams — JavaScript, TypeScript,
 * React, HTML/JSX, CSS and a little tooling. Deliberately kept to a handful
 * of characters so neighbouring columns rarely collide, which keeps the field
 * reading as code rather than noise.
 */
const TOKENS: string[] = [
  // JavaScript / TypeScript
  "const",
  "let",
  "var",
  "=>",
  "()",
  "{}",
  "[]",
  "&&",
  "||",
  "??",
  "?.",
  "if()",
  "for()",
  "map()",
  "fn()",
  "new",
  "return",
  "import",
  "export",
  "async",
  "await",
  "class",
  "this",
  "yield",
  "static",
  "true",
  "false",
  "null",
  "void",
  "type",
  "enum",
  "keyof",
  "Promise",
  "string",
  "number",
  "boolean",
  "unknown",
  // React
  "React",
  "useState",
  "useMemo",
  "useRef",
  "props",
  "state",
  "render",
  "key=",
  "value",
  "onClick",
  // HTML / JSX
  "<div>",
  "</div>",
  "<span>",
  "</>",
  "<main>",
  "<body>",
  "<form>",
  "<button>",
  "<img>",
  "<br>",
  "<hr>",
  "<h1>",
  "</h1>",
  "<p>",
  "</p>",
  "<a>",
  "<Comp>",
  "href",
  // CSS
  ".grid",
  "#root",
  "@media",
  ":hover",
  "::after",
  "px",
  "rem",
  "flex",
  "grid",
  "gap:",
  "color",
  "z-index",
  "var()",
  "display",
  "margin",
  // Tooling / values
  "npm i",
  "node",
  "git",
  "TODO",
  "0x1F",
  "json",
  "http",
  "api",
];

/** One vertical stream of code glyphs. */
interface Column {
  /** Left edge of the stream in CSS pixels. */
  x: number;
  /** Font size in CSS pixels — varies per column to create depth. */
  fontSize: number;
  /** Vertical distance between two glyphs of the same stream. */
  lineHeight: number;
  /** Fall speed in pixels per second. */
  speed: number;
  /** Per-column opacity multiplier (near elements read brighter). */
  depth: number;
  /** Whether this stream's leading glyph uses the emerald accent. */
  accent: boolean;
  /** Number of glyphs in the trail (head included). */
  length: number;
  /** Glyphs, index `0` being the head. */
  tokens: string[];
  /** Y coordinate of the head glyph — the front of the stream. */
  head: number;
}

const randomToken = (): string => TOKENS[Math.floor(Math.random() * TOKENS.length)];

const randomTokens = (length: number): string[] =>
  Array.from({ length }, () => randomToken());

/**
 * Builds the initial column layout for a given viewport.
 *
 * Columns advance by a width derived from their font size so bigger (nearer)
 * streams get more room and the field never turns into a wall of text.
 */
function createColumns(columns: Column[], width: number, height: number): void {
  const compact = width < 640;

  columns.length = 0;
  let x = Math.random() * 24;

  while (x < width) {
    // Font sizes 10–14px on phones, 12–18px on larger screens.
    const fontSize = compact ? 10 + Math.random() * 4 : 12 + Math.random() * 6;
    const lineHeight = Math.round(fontSize * 1.7);
    // Trails cover 28%–68% of the viewport height, capped so a very tall
    // screen never allocates an oversized token list.
    const length = Math.min(
      40,
      Math.max(6, Math.round((height * (0.28 + Math.random() * 0.4)) / lineHeight)),
    );
    // Taller glyphs read as closer: bigger and a little faster.
    const size = (fontSize - 10) / 8;

    columns.push({
      x,
      fontSize,
      lineHeight,
      speed: 22 + size * 40 + Math.random() * 16,
      depth: 0.45 + size * 0.4 + Math.random() * 0.15,
      accent: Math.random() < 0.12,
      length,
      tokens: randomTokens(length),
      // Spread streams across the full height so the first frame is alive.
      head: Math.random() * (height + length * lineHeight) - length * lineHeight,
    });

    x += fontSize * 3 + 24 + Math.random() * 30;
  }
}

/** Recycles a stream that fully left the screen. */
function recycleColumn(column: Column, height: number): void {
  column.tokens = randomTokens(column.length);
  column.accent = Math.random() < 0.12;
  // Re-enter from above with a random delay for a natural, unsynchronised
  // cascade instead of columns resetting in lockstep.
  column.head = -(Math.random() * height * 0.6) - column.lineHeight;
}

/** Monospace stack used for the glyphs (Geist Mono when available). */
function resolveFontFamily(): string {
  const variable = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-geist-mono")
    .trim();

  return variable
    ? `${variable}, ui-monospace, monospace`
    : "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
}

/**
 * Paints one frame.
 *
 * Each stream draws its fading tail first and its head last so the leading
 * glyph always sits on top; `globalAlpha` handles depth instead of costly
 * canvas shadows.
 */
function drawScene(
  ctx: CanvasRenderingContext2D,
  columns: Column[],
  palette: Palette,
  width: number,
  height: number,
  fontFamily: string,
): void {
  ctx.clearRect(0, 0, width, height);
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  for (const column of columns) {
    const { head, length, lineHeight, fontSize, x, depth } = column;

    // Skip streams entirely outside the viewport.
    if (head < -lineHeight || head - length * lineHeight > height) continue;

    // Tail — the base colour fading out toward the back of the stream.
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = palette.main;

    for (let i = length - 1; i >= 1; i--) {
      const y = head - i * lineHeight;
      if (y < -lineHeight || y > height + lineHeight) continue;

      const fade = 1 - i / length;
      ctx.globalAlpha = depth * fade * fade;
      ctx.fillText(column.tokens[i], x, y);
    }

    // Head — brightest glyph of the stream, occasionally emerald.
    ctx.globalAlpha = depth;
    ctx.fillStyle = column.accent ? palette.accent : palette.highlight;
    ctx.font = `600 ${fontSize}px ${fontFamily}`;
    ctx.fillText(column.tokens[0], x, head);
  }

  ctx.globalAlpha = 1;
}

interface CodeRainBackgroundProps {
  /** Extra classes merged onto the fixed wrapper. */
  className?: string;
  /** Opacity while the hero fills the viewport (defaults per theme). */
  peakOpacity?: number;
  /** Opacity for the rest of the page (defaults per theme). */
  baseOpacity?: number;
}

/**
 * Atmospheric "code rain" backdrop.
 *
 * A single, site-wide HTML canvas fixed behind every section (`-z-10` +
 * `pointer-events-none`, so buttons, links, forms and navigation are never
 * affected). Streams fall at different speeds, sizes and opacities for depth,
 * and the layer fades between a `peak` (hero in view) and a `base` (rest of
 * the page) opacity on scroll so content stays readable.
 *
 * The canvas adapts to device pixel ratio (capped at 2×), rebuilds on resize,
 * pauses when the tab is hidden and renders a single static frame — no
 * animation at all — when the visitor prefers reduced motion.
 */
export function CodeRainBackground({
  className,
  peakOpacity,
  baseOpacity,
}: CodeRainBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Both refs survive effect re-runs, so switching themes re-colours the
  // field without rebuilding (and visibly resetting) every stream.
  const columnsRef = useRef<Column[]>([]);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 0 });

  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const prefersReduced = reduceMotion === true;
  const mode: ThemeMode = resolvedTheme === "light" ? "light" : "dark";

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    // No canvas support (or SSR) — the layer simply stays invisible.
    if (!ctx) return;

    const palette = PALETTES[mode];
    const opacity = {
      peak: peakOpacity ?? OPACITY[mode].peak,
      base: baseOpacity ?? OPACITY[mode].base,
    };

    const columns = columnsRef.current;
    const fontFamily = resolveFontFamily();
    // Canvas geometry persists across effect re-runs (e.g. theme changes).
    const size = sizeRef.current;

    let frameId = 0;
    let scrollFrameId = 0;
    let running = false;
    let lastTime = 0;

    /** Layer opacity: hero-dominant while it is on screen, subtle elsewhere. */
    const applyOpacity = () => {
      let value = opacity.base;

      if (!prefersReduced) {
        const hero = document.getElementById("home");

        if (hero) {
          const rect = hero.getBoundingClientRect();
          const viewHeight = window.innerHeight || 1;
          const viewportSpan = Math.min(viewHeight, Math.max(rect.height, 1));
          const visible =
            Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0);
          const ratio = Math.min(Math.max(visible / viewportSpan, 0), 1);

          value = opacity.base + (opacity.peak - opacity.base) * ratio;
        }
      }

      wrapper.style.opacity = value.toFixed(3);
    };

    /** Sizes the backing store to the viewport and lays out the streams. */
    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width));
      const nextHeight = Math.max(1, Math.round(rect.height));
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);

      if (
        nextWidth !== size.width ||
        nextHeight !== size.height ||
        nextDpr !== size.dpr
      ) {
        size.width = nextWidth;
        size.height = nextHeight;
        size.dpr = nextDpr;

        // The bitmap is in device pixels; the transform below maps all
        // drawing back to CSS pixels.
        canvas.width = Math.round(size.width * size.dpr);
        canvas.height = Math.round(size.height * size.dpr);
        ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);

        createColumns(columns, size.width, size.height);
      }

      applyOpacity();

      // Reduced motion never runs the loop, so a static frame is drawn here
      // (initial paint and every resize/theme change).
      if (prefersReduced) {
        drawScene(ctx, columns, palette, size.width, size.height, fontFamily);
      }
    };

    const frame = (time: number) => {
      // Clamp the delta so a backgrounded tab does not teleport the streams.
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      for (const column of columns) {
        column.head += column.speed * delta;
        if (column.head - column.length * column.lineHeight > size.height) {
          recycleColumn(column, size.height);
        }
      }

      drawScene(ctx, columns, palette, size.width, size.height, fontFamily);
      frameId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || prefersReduced || document.hidden) return;
      running = true;
      lastTime = performance.now();
      frameId = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frameId);
    };

    /** RAF-throttled scroll handler — only ever touches opacity. */
    const onScroll = () => {
      if (scrollFrameId) return;

      scrollFrameId = requestAnimationFrame(() => {
        scrollFrameId = 0;
        applyOpacity();
      });
    };

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    resize();
    start();

    // Throttled by the browser to layout-sized changes of the fixed layer
    // (viewport resizes, mobile URL bar, orientation and zoom changes).
    const observer = new ResizeObserver(() => resize());
    observer.observe(wrapper);

    if (!prefersReduced) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      if (scrollFrameId) cancelAnimationFrame(scrollFrameId);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      wrapper.style.opacity = "";
    };
  }, [mode, prefersReduced, peakOpacity, baseOpacity]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className={cn(
        "no-print pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
