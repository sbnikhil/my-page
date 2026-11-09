import { describe, expect, it } from 'vitest';

import { sharedOpenGraph } from '@/lib/metadata';
import { RESUME_JSON_URL } from '@/lib/resumeJson';
import { AUTHOR_NAME, SHARE_IMAGE_PATH, SITE_URL } from '@/lib/utils';
import { metadata as aboutMetadata } from '../about/page';
import { metadata as notFoundMetadata } from '../not-found';
import { metadata as projectsMetadata } from '../projects/page';
import { metadata as resumeMetadata } from '../resume/page';

/**
 * Next replaces a route's `openGraph`, `twitter`, and `alternates` objects
 * rather than merging them, so anything a route omits vanishes from that page.
 */
const sharedFields = { siteName: sharedOpenGraph?.siteName, locale: 'en_US' };
const sharedTwitterFields = { card: 'summary_large_image' };

describe('page metadata', () => {
  it.each([
    ['about', aboutMetadata, '/about/'],
    ['projects', projectsMetadata, '/projects/'],
    ['resume', resumeMetadata, '/resume/'],
    ['404', notFoundMetadata, undefined],
  ])('%s restates what a replacing object drops', (_, metadata, path) => {
    const url = path && `${SITE_URL}${path}`;
    const share = {
      title: `${metadata.title} | ${AUTHOR_NAME}`,
      description: metadata.description,
    };

    // The 404 has no stable canonical URL in a static export.
    expect(metadata.alternates?.canonical).toBe(url);
    expect(metadata.openGraph?.url).toBe(url);
    expect(metadata.openGraph).toMatchObject({ ...sharedFields, ...share });
    expect(metadata.twitter).toMatchObject({
      ...sharedTwitterFields,
      ...share,
    });
    expect(JSON.stringify(metadata.openGraph?.images)).toContain(
      SHARE_IMAGE_PATH,
    );
    expect(JSON.stringify(metadata.twitter?.images)).toContain(
      SHARE_IMAGE_PATH,
    );
  });

  it.each([
    ['resume', resumeMetadata, { 'application/json': RESUME_JSON_URL }],
  ])('%s declares its alternate beside the canonical', (_, metadata, types) => {
    expect(metadata.alternates?.types).toEqual(types);
    expect(metadata.alternates?.canonical).toBeTruthy();
  });
});
