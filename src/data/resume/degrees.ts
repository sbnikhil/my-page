export interface Degree {
  school: string;
  degree: string;
  link: string;
  year: number;
}

const degrees: Degree[] = [
  {
    school: 'University of Wisconsin–Madison',
    degree: 'M.S. Data Science',
    link: 'https://www.wisc.edu',
    year: 2026,
  },
  {
    school: 'TODO(nikhil): undergraduate school',
    degree: 'TODO(nikhil): undergraduate degree',
    link: 'https://example.edu',
    year: 2024,
  },
];

export default degrees;
