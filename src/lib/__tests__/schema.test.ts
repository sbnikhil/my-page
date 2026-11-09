import { describe, expect, it } from 'vitest';

import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  PERSON_ID,
  personNode,
  profilePageNode,
  sectionPageNodes,
  WEBSITE_ID,
  webPageNode,
  websiteNode,
} from '@/lib/schema';
import { SITE_URL } from '@/lib/utils';

const PAGE_URL = `${SITE_URL}/projects/example/`;
const PROJECTS_URL = `${SITE_URL}/projects/`;
const ABOUT_URL = `${SITE_URL}/about/`;

const ref = (id: string) => ({ '@id': id });

describe('schema nodes', () => {
  // The `@id` references are what hold the published graph together.
  it.each([
    ['WebSite', websiteNode(), { publisher: ref(PERSON_ID) }],
    [
      'ProfilePage',
      profilePageNode({ url: ABOUT_URL, name: 'About', hasBreadcrumb: true }),
      {
        ...ref(`${ABOUT_URL}#webpage`),
        isPartOf: ref(WEBSITE_ID),
        mainEntity: ref(PERSON_ID),
        breadcrumb: ref(`${ABOUT_URL}#breadcrumb`),
      },
    ],
    [
      'CollectionPage',
      collectionPageNode({ url: PROJECTS_URL, name: 'Projects' }),
      { about: ref(PERSON_ID) },
    ],
    [
      'WebPage',
      webPageNode({ url: PAGE_URL, name: 'Example' }),
      { ...ref(`${PAGE_URL}#webpage`), isPartOf: ref(WEBSITE_ID) },
    ],
  ])('%s links to the rest of the graph', (type, node, links) => {
    expect(node).toMatchObject({ '@type': type, ...links });
  });

  it('references a breadcrumb only when requested', () => {
    expect(
      profilePageNode({ url: HOME_URL, name: 'Home' }).breadcrumb,
    ).toBeUndefined();
  });

  it('treats the last word of the name as the family name', () => {
    expect(personNode()).toMatchObject({
      givenName: 'Bhaskar Nikhil',
      familyName: 'Sunkara',
    });
  });

  it('numbers a breadcrumb trail in order', () => {
    const { itemListElement } = breadcrumbNode(PROJECTS_URL, [
      { name: 'Home', url: HOME_URL },
      { name: 'Projects', url: PROJECTS_URL },
    ]);

    expect(itemListElement).toMatchObject([
      { position: 1, item: HOME_URL },
      { position: 2, item: PROJECTS_URL },
    ]);
  });
});

describe('sectionPageNodes', () => {
  it('links a section page to a breadcrumb ending at that page', () => {
    const [page, breadcrumb] = sectionPageNodes(
      collectionPageNode,
      '/projects/',
      'Projects',
      'Things I built',
    );
    const url = `${SITE_URL}/projects/`;

    expect(page).toMatchObject({
      '@type': 'CollectionPage',
      url,
      description: 'Things I built',
      breadcrumb: { '@id': breadcrumb['@id'] },
    });
    expect(breadcrumb['@id']).toBe(`${url}#breadcrumb`);
  });
});
