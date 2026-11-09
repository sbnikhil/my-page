import { render, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import HomePage from '../page';

// ↗ means a link leaves the site in a new tab; on-site links carry → or nothing.
describe('homepage links', () => {
  it('keep the resume one click from the first screen', () => {
    const { container } = render(<HomePage />);
    const hero = container.querySelector('.hero') as HTMLElement;
    const resume = within(hero).getByRole('link', { name: 'Resume' });

    expect(resume.getAttribute('href')).toMatch(/^\/resume\/?$/);
    expect(resume.textContent).not.toMatch(/↗/);
  });
});
