/**
 * Featured projects — the three real projects, in the required order:
 * RepairLagbe (featured) → StudioSpace → BazarDor.
 *
 * Every title, description, tag and URL is taken from the corresponding
 * GitHub repository README — nothing here is invented.
 */
import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "repair-lagbe",
    title: "RepairLagbe",
    description:
      "On-demand device and home appliance repair booking platform. Customers search and book technicians and pay through Stripe, technicians manage their services and booking requests, and admins oversee users, services, bookings and payment transactions.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Better Auth", "Stripe Checkout"],
    githubUrl: "https://github.com/CoderYeasin2004/repair-lagbe-client",
    liveUrl: "https://repair-lgbe-client.vercel.app",
    featured: true,
  },
  {
    id: "studio-space",
    title: "StudioSpace",
    description:
      "Peer-to-peer creative workspace and production studio sharing platform. Creators explore studios by category with pricing, amenities and availability, book spaces with protection against overlapping confirmed bookings, and manage listings and bookings from a personal dashboard.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Better Auth", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/CoderYeasin2004/studio-space-client",
    liveUrl: "https://studio-space-frontend-alpha.vercel.app",
    featured: false,
  },
  {
    id: "bazar-dor",
    title: "BazarDor",
    description:
      "Web-based shopping platform for everyday essential products in Bangladesh. Browse products by category, sort prices from low to high or high to low, and compare market prices using minimum, maximum and average figures — with email, Google and GitHub sign-in.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "DaisyUI", "Better Auth", "MongoDB"],
    githubUrl: "https://github.com/CoderYeasin2004/bazar-Dor",
    liveUrl: "https://bazar-dor-bjmp.vercel.app/",
    featured: false,
  },
];
