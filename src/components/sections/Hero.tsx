import { ArrowRight, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { TypingName } from "@/components/shared/TypingName";
import { profile } from "@/data/profile";

/**
 * Decorative code-window visual.
 *
 * It duplicates information that is already present in the heading, so it is
 * hidden from assistive technology and purely serves as the hero's abstract
 * developer artwork (no fake screenshots or photos are used).
 */
function DeveloperVisual() {
  const stack = ["Next.js", "TypeScript", "Node.js"];

  return (
    <div aria-hidden className="relative">
      {/* Ambient light behind the window */}
      <div className="orb -top-16 -right-10 size-64 bg-sky-500/35" />
      <div className="orb -bottom-12 -left-12 size-56 bg-cyan-500/30" />

      <Reveal delay={0.35} offset={32}>
        <div className="surface-card relative rounded-2xl p-1.5 shadow-2xl">
          {/* Window chrome */}
          <div className="flex items-center gap-2 rounded-t-xl border-b border-border bg-muted/60 px-4 py-3">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-amber-400/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">
              yeasin.tsx
            </span>
          </div>

          {/* Syntax-highlighted snippet */}
          <div className="overflow-x-auto px-5 py-6 font-mono text-[13px] leading-relaxed sm:text-sm">
            <p>
              <span className="text-accent-text">const</span>{" "}
              <span className="text-sky-700 dark:text-sky-300">developer</span>{" "}
              <span className="text-muted-foreground">=</span> {"{"}
            </p>
            <p className="pl-5">
              <span className="text-foreground/70">name</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="text-emerald-700 dark:text-emerald-300">&quot;{profile.name}&quot;</span>
              <span className="text-muted-foreground">,</span>
            </p>
            <p className="pl-5">
              <span className="text-foreground/70">role</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="text-emerald-700 dark:text-emerald-300">&quot;{profile.role}&quot;</span>
              <span className="text-muted-foreground">,</span>
            </p>
            <p className="pl-5">
              <span className="text-foreground/70">stack</span>
              <span className="text-muted-foreground">:</span> [
              {stack.map((item, index) => (
                <span key={item}>
                  <span className="text-emerald-700 dark:text-emerald-300">&quot;{item}&quot;</span>
                  {index < stack.length - 1 ? (
                    <span className="text-muted-foreground">, </span>
                  ) : null}
                </span>
              ))}
              ]
              <span className="text-muted-foreground">,</span>
            </p>
            <p className="pl-5">
              <span className="text-foreground/70">focus</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="text-emerald-700 dark:text-emerald-300">&quot;clean code &amp; great UI&quot;</span>
            </p>
            <p>{"}"}</p>
            <p className="mt-3 text-muted-foreground">
              <span className="text-accent-text">export default</span>{" "}
              <span className="text-sky-700 dark:text-sky-300">developer</span>;
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/**
 * Homepage hero (`#home`).
 *
 * Owns the page's only `<h1>` and combines the entrance animation, call-to-
 * action buttons, availability indicator, social profiles and the abstract
 * developer visual.
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden scroll-mt-24 pb-24 pt-32 sm:pt-36 lg:pb-32 lg:pt-44"
    >
      {/* Ambient light — the shared grid backdrop now lives in
          <GridBackground /> so it runs behind every section. */}
      <div className="orb -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 bg-cyan-500/25" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        {/* Copy */}
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-600/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300">
              <span
                aria-hidden
                className="size-2 rounded-full bg-emerald-400"
                style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
              />
              {profile.availability.label}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-8 text-sm font-semibold tracking-[0.4em] text-sky-700 dark:text-sky-300/80 uppercase">
              {profile.greeting}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <h1
              aria-label={profile.name}
              className="text-gradient-animated mt-3 text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              <TypingName name={profile.name} />
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-4 flex flex-wrap items-center gap-3 text-xl font-medium text-foreground/90 sm:text-2xl">
              <span className="text-gradient font-semibold">{profile.role}</span>
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-6 max-w-xl border-l-2 border-accent/60 pl-4 text-lg italic leading-relaxed text-foreground/80 sm:text-xl">
              &ldquo;{profile.tagline}&rdquo;
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              {profile.description}
            </p>
          </Reveal>

          {/* Actions */}
          <Reveal delay={0.48}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                asChild
                className="bg-cta h-12 rounded-xl px-7 text-sm font-semibold transition-transform duration-300 hover:scale-[1.03] hover:brightness-110"
              >
                <Link href="/#projects">
                  Explore My Projects
                  <ArrowRight aria-hidden className="ml-2 size-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 rounded-xl border border-border bg-card px-7 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-accent/50 hover:bg-accent/10"
              >
                <Link href="/#contact">
                  <Mail aria-hidden className="mr-2 size-4" />
                  Contact Me
                </Link>
              </Button>
            </div>
          </Reveal>

          {/* Profiles */}
          <Reveal delay={0.56}>
            <div className="mt-10 flex items-center gap-5">
              <SocialLinks />
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles aria-hidden className="size-3.5 text-sky-700 dark:text-sky-300" />
                {profile.availability.note}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Abstract developer visual */}
        <DeveloperVisual />
      </div>
    </section>
  );
}
