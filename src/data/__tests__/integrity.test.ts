import { describe, expect, it } from 'vitest';

import courses from '../resume/courses';
import degrees from '../resume/degrees';
import { categories, skills } from '../resume/skills';

const unique = (values: readonly unknown[]) =>
  new Set(values).size === values.length;

describe('data the site publishes', () => {
  it('has no duplicate entries', () => {
    expect(unique(courses.map((course) => course.number))).toBe(true);
    expect(unique(degrees.map((degree) => degree.school))).toBe(true);
    expect(unique(categories.map((category) => category.name))).toBe(true);
  });

  it('links only to absolute web addresses', () => {
    const links = [
      ...courses.map((course) => course.link),
      ...degrees.map((degree) => degree.link),
    ];

    for (const link of links) {
      expect(link).toMatch(/^https?:\/\/.+/);
    }
  });

  it('files every skill under a category that exists', () => {
    const names = new Set(categories.map((category) => category.name));

    for (const skill of skills) {
      expect(skill.category.length).toBeGreaterThan(0);
      expect(skill.category.every((name) => names.has(name))).toBe(true);
    }
  });
});
