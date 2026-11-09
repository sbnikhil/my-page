import type { MetadataRoute } from 'next';

import routes from '@/data/routes';
import { SITE_URL } from '@/lib/utils';

export const dynamic = 'force-static';

type CrawlHints = Pick<
  MetadataRoute.Sitemap[number],
  'changeFrequency' | 'priority'
>;

/** A page is monthly at 0.8 unless it is listed here. */
const CRAWL_HINTS: Record<string, CrawlHints> = {
  '/': { priority: 1 },
};

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path }) => ({
    // `trailingSlash: true` exports every page as a directory.
    url: `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`,
    changeFrequency: 'monthly',
    priority: 0.8,
    ...CRAWL_HINTS[path],
  }));
}
