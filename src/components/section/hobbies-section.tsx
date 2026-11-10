import { DATA } from "@/data/resume";

/**
 * "When I'm not working": a short paragraph plus hobby chips in two groups.
 * Chips match the Skills style, a little larger, with a small lift on hover
 * (transform only; none with reduced motion).
 */
export default function HobbiesSection() {
  const { intro, groups } = DATA.hobbies;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-justify hyphens-auto leading-relaxed text-muted-foreground">
        {intro}
      </p>
      <dl className="grid gap-4 sm:grid-cols-[9rem_1fr] sm:gap-x-6">
        {groups.map((group) => (
          <div key={group.label} className="contents">
            <dt className="pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {group.label}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-2 whitespace-nowrap rounded-full border bg-card/60 px-4 py-2 text-sm font-medium transition-all duration-200 hover:border-accent-from/50 hover:shadow-[0_6px_20px_-10px_var(--g-from)] motion-safe:hover:-translate-y-0.5"
                  >
                    <span aria-hidden className="text-base leading-none">
                      {item.emoji}
                    </span>
                    {item.name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
