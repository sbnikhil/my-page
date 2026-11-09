import Link from 'next/link';

import profile from '@/data/profile.json';
import { smartQuotes } from '@/lib/typography';

/** Stage 1 placeholder hero. The real first screen arrives in Stage 4. */
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-primary">
          <p className="hero-kicker">TODO(nikhil): kicker</p>
          <h1 className="hero-title">
            <span className="hero-name">{smartQuotes(profile.name)}</span>
          </h1>
          <p className="hero-tagline">TODO(nikhil): one-line role.</p>
          <p className="hero-summary">
            TODO(nikhil): open-to-work status line.
          </p>

          <div className="hero-cta">
            <Link href="/resume" className="button">
              Resume
            </Link>
            <Link href="/projects" className="hero-resume-link">
              Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
