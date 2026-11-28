/**
 * Education content for the homepage Education section.
 *
 * Only the details supplied by the brief are stored — no GPA, passing year
 * or achievements, so the section can never display invented academics.
 * Editing a value here updates the section without touching the component.
 */
import type { EducationDetails } from "@/types";

export const education: EducationDetails = {
  institute: "Greenland Polytechnic Institute",
  department: "Computer Technology",
  degree: "Diploma in Engineering",
  semester: "8th Semester Running",
  status: "Currently Studying",
  location: "Amulia, Demra, Dhaka, Bangladesh",
};
