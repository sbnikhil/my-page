/** Based on the JSON Resume work item, with a local `commitment` extension. */
export interface Position {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate?: string;
  /**
   * Marks an open-ended role that ran alongside the primary career. Omitted
   * means full-time; `sortPositions` uses this to keep an enduring side role
   * from outranking every later full-time position.
   */
  commitment?: 'part-time';
  summary?: string;
  highlights?: string[];
}

// Placeholders only: Nikhil fills in every role, date, and summary.
const work: Position[] = [
  {
    name: 'TODO(nikhil): organization',
    position: 'TODO(nikhil): role',
    url: 'https://example.com',
    startDate: '2025-06-01',
    endDate: '2025-12-31',
    summary: 'TODO(nikhil): one-sentence summary of this role.',
    highlights: [
      'TODO(nikhil): what you built.',
      'TODO(nikhil): how you measured it.',
    ],
  },
  {
    name: 'TODO(nikhil): earlier organization',
    position: 'TODO(nikhil): role',
    url: 'https://example.org',
    startDate: '2024-06-01',
    endDate: '2024-12-31',
    summary: 'TODO(nikhil): one-sentence summary of this role.',
  },
];

export default work;
