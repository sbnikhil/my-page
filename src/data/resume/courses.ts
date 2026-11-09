export interface Course {
  title: string;
  number: string;
  link: string;
  /**
   * Must match a `Degree.school` in `src/data/resume/degrees.ts` exactly.
   * `src/lib/resumeJson.ts` files coursework under the education entry with
   * this name, and it compares the two strings whole — a shortened form here
   * would silently drop the courses from `/resume.json`.
   */
  university: string;
}

// Placeholders only: Nikhil picks the courses worth listing.
const courses: Course[] = [
  {
    title: 'TODO(nikhil): course title',
    number: 'TODO 101',
    link: 'https://guide.wisc.edu',
    university: 'University of Wisconsin–Madison',
  },
];

export default courses;
