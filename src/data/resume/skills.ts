export interface Skill {
  title: string;
  competency: number;
  category: string[];
}

export interface Category {
  name: string;
}

// Placeholders only: Nikhil lists his own skills and competency levels.
const skills: Skill[] = [
  {
    title: 'TODO(nikhil): language',
    competency: 4,
    category: ['Languages'],
  },
  {
    title: 'TODO(nikhil): ML skill',
    competency: 4,
    category: ['Machine Learning'],
  },
  {
    title: 'TODO(nikhil): data skill',
    competency: 4,
    category: ['Data'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

/**
 * The distinct category names, sorted, so the group order falls out of the
 * skill list itself.
 */
function buildCategories(skillsList: Skill[]): Category[] {
  const uniqueCategories = Array.from(
    new Set(skillsList.flatMap(({ category }) => category)),
  ).sort();

  return uniqueCategories.map((category) => ({ name: category }));
}

const categories: Category[] = buildCategories(skills);

export { categories, skills };
