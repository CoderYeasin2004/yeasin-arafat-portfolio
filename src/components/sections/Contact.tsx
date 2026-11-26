"use client";

import { Loader2, Send, User } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { FacebookIcon, GithubIcon, LinkedinIcon } from "@/components/icons/brand";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/** Field values collected by the contact form. */
interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FieldName = keyof ContactValues;
type StatusKind = "idle" | "success" | "error" | "info";

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface StatusState {
  kind: StatusKind;
  message: string;
}

const initialValues: ContactValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/** Facebook profile shown with the other direct contact channels. */
const facebookUrl = "https://www.facebook.com/share/19wgn1zGMP/";

/**
 * Client-side validation.
 *
 * Runs before any delivery attempt so broken input never produces a broken
 * mailto link, and returns per-field messages for inline rendering.
 */
function validate(values: ContactValues): FieldErrors {
  const errors: FieldErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.subject.trim().length < 3) {
    errors.subject = "Please add a short subject (at least 3 characters).";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Please write a message of at least 10 characters.";
  }

  return errors;
}

/** Builds a prefilled mailto URL from the current form values. */
function buildMailtoUrl(values: ContactValues): string {
  const params = new URLSearchParams({
    subject: values.subject.trim(),
    body: `From: ${values.name.trim()} <${values.email.trim()}>\n\n${values.message.trim()}`,
  });
  return `mailto:${profile.email}?${params.toString()}`;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

/** Label + control + inline error, wired together for screen readers. */
function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm text-foreground/90">
        {label}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-700 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Contact section (`#contact`).
 *
 * Delivery strategy: the form validates input and then opens the visitor's
 * email app with a prefilled mailto draft — no backend or third-party
 * service is configured, and no fake success is ever reported. If no
 * recipient email has been added to `data/profile.ts` yet, the composed
 * message is copied to the clipboard instead and the visitor is pointed to
 * the GitHub / LinkedIn profiles.
 */
export function Contact() {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<StatusState>({ kind: "idle", message: "" });
  /** Guards against duplicate submissions and powers the copy fallback. */
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate(values);
    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      setStatus({
        kind: "error",
        message: "Please fix the highlighted fields and try again.",
      });
      return;
    }

    setIsSubmitting(true);

    // No configured recipient: fall back to copying the draft instead of
    // pretending a message was delivered.
    if (!profile.email) {
      try {
        const draft = `Subject: ${values.subject.trim()}\n\n${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
        await navigator.clipboard.writeText(draft);
        setStatus({
          kind: "info",
          message:
            "Your message was copied. Email delivery isn't configured yet — set an address in src/data/profile.ts, or reach me on GitHub or LinkedIn below.",
        });
      } catch {
        setStatus({
          kind: "error",
          message:
            "Email delivery isn't configured yet, and copying failed. Please use the GitHub or LinkedIn links below.",
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Open the visitor's default mail client with a prefilled draft.
    window.location.href = buildMailtoUrl(values);
    setStatus({
      kind: "success",
      message: "Your email app should open with the message ready to send.",
    });
    setIsSubmitting(false);
  };

  const statusStyles: Record<Exclude<StatusKind, "idle">, string> = {
    success:
      "border-emerald-600/40 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300",
    error:
      "border-red-600/40 bg-red-500/10 text-red-700 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300",
    info: "border-amber-500/40 bg-amber-400/15 text-amber-700 dark:text-amber-200",
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-28">
      <div
        aria-hidden
        className="orb -right-24 bottom-10 h-64 w-64 bg-cyan-600/20"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Work Together"
          description="Have a project in mind or just want to say hi? Fill in the form and it will open in your email app — or reach me directly on my profiles."
          align="center"
          className="max-w-2xl"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Contact form */}
          <Reveal>
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              className="surface-card rounded-2xl p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="contact-name" label="Name" error={errors.name}>
                  <Input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className="h-11 rounded-xl bg-background/70"
                  />
                </Field>

                <Field id="contact-email" label="Email" error={errors.email}>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className="h-11 rounded-xl bg-background/70"
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field id="contact-subject" label="Subject" error={errors.subject}>
                  <Input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="What would you like to discuss?"
                    value={values.subject}
                    onChange={(event) => updateField("subject", event.target.value)}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={
                      errors.subject ? "contact-subject-error" : undefined
                    }
                    className="h-11 rounded-xl bg-background/70"
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field id="contact-message" label="Message" error={errors.message}>
                  <Textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me a little about your project..."
                    value={values.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    className="resize-y rounded-xl bg-background/70"
                  />
                </Field>
              </div>

              {/* Result feedback for assistive technology and sighted users */}
              <div aria-live="polite" className="mt-5">
                {status.kind !== "idle" ? (
                  <p
                    className={cn(
                      "rounded-xl border px-4 py-3 text-sm",
                      statusStyles[status.kind as Exclude<StatusKind, "idle">],
                    )}
                  >
                    {status.message}
                  </p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-cta h-11 rounded-xl px-7 text-sm font-semibold hover:brightness-110"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 aria-hidden className="mr-2 size-4 animate-spin" />
                      Working...
                    </>
                  ) : (
                    <>
                      <Send aria-hidden className="mr-2 size-4" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground">
                  Opens your default email app — nothing is stored on this site.
                </p>
              </div>
            </form>
          </Reveal>

          {/* Direct contact channels */}
          <Reveal delay={0.12} className="space-y-5">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card glow-on-hover flex items-center gap-4 rounded-2xl p-5"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-400/15 text-foreground ring-1 ring-border">
                <GithubIcon className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  GitHub
                </span>
                <span className="block text-xs text-muted-foreground">
                  Check out my code and contributions
                </span>
              </span>
            </a>

            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card glow-on-hover flex items-center gap-4 rounded-2xl p-5"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-400/15 text-foreground ring-1 ring-border">
                <LinkedinIcon className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  LinkedIn
                </span>
                <span className="block text-xs text-muted-foreground">
                  Let&apos;s connect professionally
                </span>
              </span>
            </a>

            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card glow-on-hover flex items-center gap-4 rounded-2xl p-5"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-400/15 text-foreground ring-1 ring-border">
                <FacebookIcon className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  Facebook
                </span>
                <span className="block text-xs text-muted-foreground">
                  Connect with me on Facebook
                </span>
              </span>
            </a>

            <div className="surface-card rounded-2xl p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <User aria-hidden className="size-4 text-accent-text" />
                Available for
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {profile.availability.note}.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
