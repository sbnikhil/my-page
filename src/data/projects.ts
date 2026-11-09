/**
 * The register of things I have built.
 *
 * Stage 1 placeholders. Stage 4 replaces this model with the brief's
 * `Project` type (slug, status, areas, stack, featured, write-up page).
 *
 * - `shipped` — finished work that can be pointed at.
 * - `archive` — earlier, smaller projects.
 *
 * Every shipped entry declares the role in `src/data/resume/work.ts` that
 * backs its dates and numeric claims. Archive entries are maintained here
 * directly. Those checks establish internal consistency; factual claims and
 * public destinations still need primary-source and live-link review.
 */
export type ProjectStatus = 'shipped' | 'archive';

export interface Project {
  title: string;
  /** Role, venue, or one-line positioning. Rendered as a mono label. */
  subtitle?: string;
  /**
   * Public destination for the work. Entries without one are rendered as
   * visibly inert rather than as cards that look clickable and are not.
   */
  link?: string;
  /** Résumé role that backs a shipped entry's dates and numeric claims. */
  sourceWork?: string;
  /**
   * Screenshot, where one exists. Optional: the card and the register row are
   * both designed to read on type and rules alone, so a new entry does not
   * need art invented for it.
   */
  image?: string;
  /**
   * ISO date work on the project started, or a one-off shipped.
   * This is project activity, not necessarily a public launch date.
   */
  date: string;
  /** ISO date project activity ended. Omitted on one-offs and live work. */
  endDate?: string;
  /**
   * The project is still active. This is deliberately independent of the
   * historical role named by `subtitle`: a project can continue after an
   * acquisition or employment transition. Drives the amber `Present` reading
   * and is mutually exclusive with `endDate`.
   */
  ongoing?: boolean;
  desc: string;
  /** Technologies the résumé names for this work. Omitted when it names none. */
  tech?: string[];
  status: ProjectStatus;
}

const data: Project[] = [
  {
    title: 'TODO(nikhil): project title',
    subtitle: 'TODO(nikhil): role or context',
    sourceWork: 'TODO(nikhil): organization',
    date: '2025-06-01',
    endDate: '2025-12-31',
    desc: 'TODO(nikhil): one-line project summary.',
    tech: ['TODO(nikhil): stack'],
    status: 'shipped',
  },
  {
    title: 'TODO(nikhil): earlier project',
    date: '2024-03-01',
    desc: 'TODO(nikhil): one-line project summary.',
    status: 'archive',
  },
];

export default data;

/** The register: finished work, most recent first. */
export const shipped = data.filter((project) => project.status === 'shipped');

/** Earlier, smaller projects, most recent first. */
export const archive = data.filter((project) => project.status === 'archive');
