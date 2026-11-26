import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small uppercase label rendered above the title. */
  eyebrow: string;
  title: string;
  description?: string;
  /** Aligns the heading block; sections default to a left-aligned layout. */
  align?: "left" | "center";
  className?: string;
}

/**
 * Shared heading block for every homepage section.
 *
 * Guarantees a consistent hierarchy: one `<h2>` per section (the hero owns
 * the page's `<h1>`), a gradient accent rule and an optional description.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      <p className="text-xs font-semibold tracking-[0.3em] text-accent-text uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
        <span className="text-gradient">{title}</span>
      </h2>
      <div
        aria-hidden
        className={cn(
          "gradient-line mt-5 h-px w-24 opacity-70",
          centered && "mx-auto",
        )}
      />
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground text-balance">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
