import { Database, LayoutTemplate, Palette, Server, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { skillCategories } from "@/data/skills";
import type { SkillCategory } from "@/types";

/** Maps each data category id to a consistent category icon. */
const categoryIcons: Record<SkillCategory["id"], LucideIcon> = {
  frontend: LayoutTemplate,
  backend: Server,
  database: Database,
  authentication: ShieldCheck,
  "ui-libraries": Palette,
};

/**
 * Skills section (`#skills`).
 *
 * Renders one professional card per category from `data/skills.ts`. Skill
 * tiles show a monogram instead of vendor logos and deliberately display no
 * proficiency percentages, since none were supplied.
 */
export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-28">
      {/* Soft section backdrop */}
      <div
        aria-hidden
        className="orb -left-32 top-1/3 h-72 w-72 bg-sky-500/20"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Skills"
          title="My Technical Skills"
          description="The technologies I use to design, build and ship modern web applications."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = categoryIcons[category.id] ?? LayoutTemplate;

            return (
              <Reveal key={category.id} delay={index * 0.07}>
                <article className="surface-card glow-on-hover h-full rounded-2xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-400/15 text-accent-text ring-1 ring-accent/30">
                      <Icon aria-hidden className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {category.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {category.skills.length}{" "}
                        {category.skills.length === 1 ? "technology" : "technologies"}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="group inline-flex items-center gap-2 rounded-lg border border-border bg-background/70 py-1.5 pr-3 pl-1.5 text-sm text-foreground/85 transition-colors duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-foreground"
                      >
                        <span
                          aria-hidden
                          className="inline-flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-sky-500/25 to-cyan-400/20 font-mono text-[11px] font-bold text-accent-text transition-transform duration-200 group-hover:scale-105"
                        >
                          {skill.glyph}
                        </span>
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
