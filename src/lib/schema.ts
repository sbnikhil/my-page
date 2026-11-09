import contact from '@/data/contact';
import degrees from '@/data/resume/degrees';
import work from '@/data/resume/work';
import { currentPosition } from '@/lib/career';
import { AUTHOR_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/utils';

/**
 * Centralised JSON-LD (schema.org) graph builders.
 *
 * Every node carries a stable `@id` so crawlers can merge the same entity
 * across pages (e.g. the homepage Person and a blog post's author resolve to
 * one knowledge-graph node). Pages compose these builders into a single
 * `@graph` document via {@link buildGraph}.
 */

// Stable node identifiers, referenced across pages.
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const SITE_LANGUAGE = 'en-US';
export const HOME_URL = `${SITE_URL}/`;

type SchemaNode = Record<string, unknown>;

interface Crumb {
  name: string;
  url: string;
}

/** Reference to the canonical Person node. */
const PERSON_REF = { '@id': PERSON_ID };

/** Reference to the canonical WebSite node. */
const WEBSITE_REF = { '@id': WEBSITE_ID };

/**
 * The canonical Person entity. Emitted site-wide so every page anchors to the
 * same node; other nodes reference it via {@link PERSON_REF} instead of
 * repeating its properties.
 */
export function personNode(): SchemaNode {
  const socialLinks = contact
    .filter((item) => !item.link.startsWith('mailto:'))
    .map((item) => item.link);

  const emailItem = contact.find((item) => item.link.startsWith('mailto:'));
  const email = emailItem?.link.replace('mailto:', '');

  const currentJob = currentPosition(work);

  // Family name is the last word; everything before it is the given name.
  const nameParts = AUTHOR_NAME.split(' ');
  const familyName = nameParts.at(-1) ?? AUTHOR_NAME;
  const givenName = nameParts.slice(0, -1).join(' ');

  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: AUTHOR_NAME,
    givenName,
    familyName,
    url: HOME_URL,
    description: SITE_DESCRIPTION,
    ...(currentJob && { jobTitle: currentJob.position }),
    ...(email && { email }),
    sameAs: socialLinks,
    ...(currentJob && {
      worksFor: {
        '@type': 'Organization',
        name: currentJob.name,
        url: currentJob.url,
      },
    }),
    alumniOf: degrees.map((degree) => ({
      '@type': 'CollegeOrUniversity',
      name: degree.school,
      url: degree.link,
    })),
  };
}

/**
 * The canonical WebSite entity. Tells crawlers how to name the site in search
 * results. Emitted site-wide alongside {@link personNode}.
 */
export function websiteNode(): SchemaNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: HOME_URL,
    name: AUTHOR_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LANGUAGE,
    publisher: PERSON_REF,
  };
}

/**
 * A BreadcrumbList for a page. `crumbs` should describe the categorisation path
 * ending at the current page. The node id is anchored to the page url.
 */
export function breadcrumbNode(pageUrl: string, crumbs: Crumb[]): SchemaNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

interface PageNodeOptions {
  url: string;
  name: string;
  description?: string;
  /** Attaches a `breadcrumb` reference (the BreadcrumbList must also be emitted). */
  hasBreadcrumb?: boolean;
}

function baseWebPage(
  type: string,
  { url, name, description, hasBreadcrumb }: PageNodeOptions,
): SchemaNode {
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    isPartOf: WEBSITE_REF,
    inLanguage: SITE_LANGUAGE,
    ...(description ? { description } : {}),
    ...(hasBreadcrumb ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
  };
}

/** The page node and breadcrumb every top-level section publishes. */
export function sectionPageNodes(
  buildPage: (options: PageNodeOptions) => SchemaNode,
  path: string,
  name: string,
  description: string,
): [SchemaNode, SchemaNode] {
  const url = `${SITE_URL}${path}`;

  return [
    buildPage({ url, name, description, hasBreadcrumb: true }),
    breadcrumbNode(url, [
      { name: 'Home', url: HOME_URL },
      { name, url },
    ]),
  ];
}

/** A WebPage subtype describing a page about a person (e.g. home, about). */
export function profilePageNode(options: PageNodeOptions): SchemaNode {
  return {
    ...baseWebPage('ProfilePage', options),
    mainEntity: PERSON_REF,
  };
}

/** A WebPage subtype for pages that primarily list things (e.g. writing, archive). */
export function collectionPageNode(options: PageNodeOptions): SchemaNode {
  return {
    ...baseWebPage('CollectionPage', options),
    about: PERSON_REF,
  };
}

/** A plain WebPage, used for individual article pages. */
export function webPageNode(options: PageNodeOptions): SchemaNode {
  return baseWebPage('WebPage', options);
}

/** Wraps nodes into a single `@graph` JSON-LD document. */
export function buildGraph(nodes: SchemaNode[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
