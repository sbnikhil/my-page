import Link from 'next/link';

import ContactIcons from '@/components/Contact/ContactIcons';
import work from '@/data/resume/work';
import routes from '@/data/routes';
import { currentPosition } from '@/lib/career';
import { smartQuotes } from '@/lib/typography';
import { AUTHOR_NAME } from '@/lib/utils';

export default function Footer() {
  const current = currentPosition(work);

  return (
    <footer className="site-footer-new">
      <div className="footer-content">
        <div className="footer-identity">
          <div className="footer-info">
            <span className="footer-name">{smartQuotes(AUTHOR_NAME)}</span>
            {current ? (
              <p className="footer-role">{`${current.position} at ${current.name}`}</p>
            ) : null}
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} {smartQuotes(AUTHOR_NAME)}
            </p>
          </div>
        </div>

        <div className="footer-right">
          {/* Every route, including the ones the header leaves out. */}
          <nav className="footer-links" aria-label="Site">
            {routes
              .filter((route) => !route.index)
              .map((route) => (
                <Link key={route.path} href={route.path}>
                  {route.label}
                </Link>
              ))}
          </nav>

          <ContactIcons />
        </div>
      </div>
    </footer>
  );
}
