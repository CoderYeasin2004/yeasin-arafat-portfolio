import { Layers, Rocket, Server, Sparkles, LayoutTemplate } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { profile } from "@/data/profile";

/** Professional focus areas displayed as information cards. */
interface FocusCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

const focusCards: FocusCard[] = [
  {
    title: "Frontend Development",
    description:
      "React and Next.js with TypeScript to build fast, component-driven and accessible interfaces.",
    icon: LayoutTemplate,
  },
  {
    title: "Backend Development",
    description:
      "Node.js and Express.js APIs that are reliable, well structured and easy to extend.",
    icon: Server,
  },
  {
    title: "Responsive UI",
    description:
      "Mobile-first layouts and thoughtful typography that feel natural on every screen size.",
    icon: Layers,
  },
  {
    title: "Scalable Applications",
    description:
      "MongoDB data modelling and maintainable architecture designed to grow with the product.",
    icon: Rocket,
  },
];

/**
 * About section (`#about`).
 *
 * Uses only the supplied developer profile — no invented experience,
 * education or metrics. The cards summarise the core focus areas.
 */
export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="About"
          title="About Me"
          description="A short introduction to how I work, what I build and what I care about as a developer."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Written introduction */}
          <Reveal className="space-y-6">
            <div className="surface-card relative rounded-2xl p-7">
              <div
                aria-hidden
                className="gradient-line absolute top-0 left-7 h-px w-16"
              />
              <p className="text-lg font-medium text-foreground/90">
                Hi, I&apos;m {profile.name} — a {profile.role} who loves turning
                ideas into polished digital products.
              </p>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {profile.about.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Continuous-learning highlight */}
            <div className="flex items-start gap-3 rounded-2xl border border-accent/25 bg-accent/[0.07] p-5">
              <Sparkles
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-accent-text"
              />
              <p className="text-sm leading-relaxed text-foreground/85">
                <span className="font-semibold text-accent-text">
                  Continuous learning:
                </span>{" "}
                I regularly explore modern web technologies and tooling so the
                solutions I ship stay current, maintainable and fun to use.
              </p>
            </div>
          </Reveal>

          {/* Focus area cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {focusCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <Reveal key={card.title} delay={index * 0.08}>
                  <article className="surface-card glow-on-hover h-full rounded-2xl p-6">
                    <div className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-400/15 text-accent-text ring-1 ring-accent/30">
                      <Icon aria-hidden className="size-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
