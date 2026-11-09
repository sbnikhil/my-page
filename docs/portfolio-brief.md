# Portfolio Site — Brief for Coding Agent

Nov 8, 2026 · Nikhil

## How to use this brief

Plan first, code later: read this brief and the base repo, then come back with a written plan and your questions. Don't write code until Nikhil approves the plan.

1. Clone [mldangelo/personal-site](https://github.com/mldangelo/personal-site) and read its own `AGENTS.md`, `CLAUDE.md`, and `docs/` before proposing anything. They describe how the template builds, tests, and deploys.
2. Treat "Decisions already made" as fixed. Change one only if you find a concrete technical reason, and say what the reason is.
3. Ask about everything listed under "Open questions" before you plan around it. Don't guess.
4. Never write portfolio copy (bio, project descriptions, results). Nikhil writes all of it in his own words. Use clearly marked placeholders like `TODO(nikhil): one-line project summary`.
5. Deliver the plan in the format given in "What your plan must contain". Then work through it with Nikhil in stages, one stage at a time.

## Goal and audience

The site is a personal portfolio for Bhaskar Nikhil Sunkara (goes by Nikhil), an MS Data Science graduate from UW-Madison (May 2026). He's applying for new-grad AI Engineer, ML Engineer, Software Engineer, Data Scientist, and Data Analyst roles.

- **Primary readers:** recruiters and hiring managers. They skim, often on a phone, and decide in seconds whether to read further.
- **Positioning:** what all those roles have in common. Someone who builds end-to-end systems with data and measures whether they work. Nikhil writes the actual wording.
- **Feel:** clean and easy to navigate, in the spirit of Apple's interface design, with smooth animation that never slows a reader down.
- **Success:** within 10 seconds on any device, a reader can find his role, top projects, resume, GitHub, LinkedIn, and email. The site is also distinct enough that it doesn't read as a stock template.

## Decisions already made

The base is Michael D'Angelo's personal-site with Magic UI's floating dock added. It's hosted for free as a static export. The repo facts below were checked against the source on 2026-11-08.

| Decision | Choice | Notes for the agent |
| --- | --- | --- |
| Base template | [mldangelo/personal-site](https://github.com/mldangelo/personal-site), MIT | Next.js 16, React 19, Tailwind v4, TypeScript. `next.config.mjs` already sets `output: 'export'`. Content lives in `src/data/*.ts` (about, contact, projects, resume/work, skills, courses, degrees). Routes include about, projects, resume, contact, writing, stats, speaking. Biome for linting, Vitest for tests. |
| Navigation | Floating bottom dock from [dillionverma/portfolio](https://github.com/dillionverma/portfolio), MIT | Port `src/components/magicui/dock.tsx` and the navbar that uses it. Dependencies: `motion`, `@radix-ui/react-tooltip`, `lucide-react`. Credit both MIT licenses in the repo README. |
| Hosting | Vercel Hobby (free), or GitHub Pages | The static export runs on both. The template's existing workflow deploys to GitHub Pages. If Nikhil picks Vercel, keep the export settings and connect the repo. |
| Animation library | Motion (`motion/react`) for everything | The dock already depends on Motion, so a second library adds weight for no gain. Add GSAP only if a specific effect needs it, and justify it in the plan. |
| Content | Placeholders only | Nikhil writes every word. Don't fill anything in from his resume or GitHub. |
| Pages to remove | Speaking, and Stats unless Nikhil wants it | Ask before deleting a route (see Open questions). |

## Design system

Borrow how Apple designs, not what Apple's pages look like. That means one idea per section, strong hierarchy from size and weight, generous space, navigation that's identical on every page, and calm motion that feels physical. Define everything below as tokens in `app/tailwind.css` (Tailwind v4 `@theme`) so it's changed in one place.

### Typography

Keep the fonts the base already self-hosts through Fontsource and `next/font/local` (`app/fonts.ts`). There's no Google Fonts request at runtime.

- **Inter variable, with the optical-size axis** (`inter-latin-opsz-normal.woff2`, already in the repo): for all UI and headings. The browser switches automatically to tighter display shapes at large sizes, which gives the precise, confident look of Apple headlines.
- **JetBrains Mono:** only for code, metrics, and small tags like dates or tech stacks.
- **Newsreader (serif):** optional, for the body text of long project write-ups only. See Open questions.
- **Don't use SF Pro.** Its license allows it only for UI mock-ups for Apple platforms, so it can't be embedded in a website ([license](https://developer.apple.com/cn/fonts)).

Starting type scale (sizes in px, line height as a ratio). Confirm it with Nikhil on a test page:

| Role | Size | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- |
| Hero headline | clamp(40, 7vw, 80) | 700 | 1.05 | -0.03em |
| Page title (H1) | clamp(32, 5vw, 56) | 700 | 1.1 | -0.025em |
| Section title (H2) | clamp(24, 3.5vw, 36) | 600 | 1.2 | -0.02em |
| Card title (H3) | 21 | 600 | 1.3 | -0.01em |
| Body | 17 | 400 | 1.55 | 0 |
| Small / meta | 14 | 500 | 1.4 | 0 |
| Mono tag | 13 | 500 | 1.4 | 0 |

Body text lines should be at most about 68 characters wide (`max-width: 68ch`). Use no more than three weights on a page.

### Color

Two neutrals and one accent, in light and dark themes. The base already has a theme toggle. Text must meet WCAG AA contrast: at least 4.5:1 for body text and 3:1 for large text and icons.

- **Light:** background close to white, primary text close to black, secondary text a mid gray that still passes 4.5:1.
- **Dark:** background close to black (not pure #000), text close to white.
- **Accent:** one color, used for links, focus rings, and the in-progress badge. Nikhil picks the hue (see Open questions).

### Space, shape, depth

- **Spacing:** an 8px grid (4px for fine adjustments). Leave 96–160px between sections on desktop and 64–96px on mobile.
- **Corners:** 12px on cards and 999px (fully rounded) on the dock and buttons. Use them consistently everywhere.
- **Depth:** soft shadows only. The dock and top bar get a light background blur, but stay opaque enough that their text and icons pass contrast over any content behind them.

### What not to copy

- **Heavy translucency.** NN/g's review of Apple's Liquid Glass found that anything placed on top of something else gets harder to see ([NN/g](https://www.nngroup.com/articles/liquid-glass/)).
- **apple.com itself:** no Apple layouts, imagery, icons, logo, or wording.

## Motion rules

Motion should make the site feel responsive. It must never hide content or make a skimming reader wait. Each rule below comes from usability research and should be treated as a hard requirement.

| Rule | Requirement | Why |
| --- | --- | --- |
| Fade durations | Elements fading in on scroll: 100–400ms. Hover and press effects: 150–250ms, using springs where it fits. | NN/g's scroll-fading study: users who scanned quickly scrolled past text before it finished fading in ([NN/g](https://www.nngroup.com/articles/scroll-fading-101/)). |
| Animate once | An element animates the first time it enters the viewport, then stays visible (`viewport={{ once: true }}`). | Same study: re-animating content every time the reader passes it wasted task-oriented users' time. |
| Nothing hidden at first paint | Hero, role, resume button, and dock are visible immediately. The hero's single signature animation runs *on* content that's already readable. | Content that faded in slowly below the fold was assumed not to exist (same study). |
| One type at a time | Fade in either text or images within a section, not both at once. | Same study: text and images fading in together competed for attention. |
| No scrolljacking | Never change scroll speed or direction. No smooth-scroll libraries, no pinned scroll sequences. | NN/g found scrolljacking threatens user control, discoverability, and task success ([NN/g](https://www.nngroup.com/articles/scrolljacking-101/)). |
| Reduced motion | Wrap the app in `<MotionConfig reducedMotion="user">`. With the OS "reduce motion" setting on, movement becomes a plain opacity change or nothing. That includes the dock magnification. | WCAG 2.3.3 asks sites to support user motion preferences and remove unnecessary motion ([W3C](https://w3c.github.io/wcag/understanding/animation-from-interactions)). |
| Light on mobile | Fewer scroll fades on small screens. No hover-dependent effects on touch devices. | NN/g recommends avoiding scroll fading on mobile (same study). |
| Cheap to render | Animate only `transform` and `opacity`. No layout-shifting animation. | Keeps animation smooth and avoids layout shift (see Quality bar). |

Planned uses: one signature animation in the hero (Nikhil approves it on a prototype), dock magnification, project-card hover (a slight lift and shadow), page transitions under 300ms, and the scroll fades above.

## Site structure and content model

There are five main pages plus one write-up page per project. Every page shares the same top bar and the same dock.

| Route | Purpose | Must contain |
| --- | --- | --- |
| `/` | 10-second overview | Name, one-line role, "open to work" status line, Resume button, 3–4 featured project cards, all visible on the first screen on desktop. |
| `/projects/` | All projects | Card grid with a filter by area (ML, systems, data). Each card has title, one-liner, stack tags, a status badge, and links to its write-up page, repo, and demo. |
| `/projects/[slug]/` | Write-up for one project (new route) | Problem → approach → what's built → results → what's next, with images or diagrams. Generated at build time from content files (`generateStaticParams`), so the static export keeps working. |
| `/resume/` | Recruiter-ready resume | The base's existing resume page plus a PDF download (`public/resume.pdf`). |
| `/about/` | Who Nikhil is | Short bio, education, and contact links. |
| `/writing/` | Optional | Keep it only if Nikhil plans to post write-ups, such as the RecoSys posts (see Open questions). |

### Project content model

One typed entry per project in `src/data/projects.ts`. Long-form write-ups go in `content/projects/<slug>.md`, rendered with the base's existing markdown setup.

```ts
type Project = {
  slug: string;
  title: string;
  oneLiner: string;            // TODO(nikhil)
  status: 'shipped' | 'in-progress';
  areas: ('ml' | 'systems' | 'data' | 'llm-security')[];
  stack: string[];
  role?: string;               // e.g. team lead, solo
  dates: string;
  repo?: string;
  demo?: string;
  featured: boolean;
  cover?: string;              // image path
};
```

An `in-progress` project shows a badge in the accent color plus a "what's built so far" note. Write-up pages don't show headline numbers for these until Nikhil marks the results as verified.

Candidate project slots, from Nikhil's list. He decides which ones appear and in what order:

- Agentic LLM Firewall (in progress)
- E-Commerce Recommendation Engine (RecoSys)
- Search Relevance Engine (in progress)
- 4D MRI segmentation (UW SMPH internship)
- AI-based Learning Platform
- Automated Workflow Orchestration Pipeline
- Self-Adapting Multilingual LLMs
- Probabilistic 3D Tissue Motion Forecasting

### Dock contents

Left group: Home, Projects, Resume, and Writing if kept. Right group: GitHub (github.com/sbnikhil), LinkedIn, Email, theme toggle.

- Every icon has a tooltip and an `aria-label`. Every item can be reached with the keyboard.
- On mobile, the dock is smaller and has no magnification. Every page gets bottom padding equal to the dock's height plus a margin, so nothing sits behind it.
- The dock replaces the base's hamburger and slide menu as the main navigation. Ask before removing them completely.

## Quality bar and acceptance criteria

A stage counts as done only when every check below passes on the deployed preview, not just locally. Report the measured numbers to Nikhil.

- [ ] **Core Web Vitals at the "good" thresholds** on mobile: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 ([web.dev](https://web.dev/articles/defining-core-web-vitals-thresholds)). Check with Lighthouse and PageSpeed Insights.
- [ ] **Lighthouse mobile scores** of at least 95 for Performance and 100 for Accessibility, Best Practices, and SEO. These are Nikhil's targets for this site, not an external standard.
- [ ] **Accessibility:** keyboard navigation works everywhere, including the dock. Focus rings are visible. Text meets AA contrast in both themes. Every image has alt text. With OS reduced motion turned on, nothing moves except opacity changes.
- [ ] **Mobile:** no horizontal scroll at a 360px width. The dock never covers content. Tap targets are at least 44×44px.
- [ ] **First screen:** name, role, Resume button, and the dock are visible without scrolling at 1280×800 and 390×844.
- [ ] **Fonts:** self-hosted. Only the fonts needed for the first screen are preloaded. No layout shift when they load.
- [ ] **SEO and sharing:** a title, description, and Open Graph image on every page. The base has an OG generator script (`npm run og`); reuse it.
- [ ] **No dead links or leftover template content:** every link resolves, and nothing remains from Michael's site (name, photos, analytics ID, writing posts).
- [ ] **The template's own checks pass:** `npm run lint`, `npm run type-check`, `npm test`, `npm run build`. Update tests the changes break; don't delete them.

## Open questions for Nikhil

Raise these before planning the stages they affect. If an answer changes a decision above, update the plan.

- [ ] **Hosting:** Vercel or GitHub Pages? Is there a custom domain, or is a `*.vercel.app` / `*.github.io` address fine for now?
- [ ] **Accent color:** which hue? Show 3 options on a test page in both themes.
- [ ] **Serif:** should Newsreader be used for project write-up body text, or Inter everywhere?
- [ ] **Hero animation:** which signature animation? Prototype 2–3 options (for example a name reveal, a line-drawn mark, a subtle grid) and show them before building one.
- [ ] **Pages:** keep Writing (for future posts such as the RecoSys write-ups)? Drop Stats and Speaking?
- [ ] **Featured projects:** which 3–4 go on the home page, and in what order?
- [ ] **Photo:** a headshot on Home/About, or none?
- [ ] **Links and assets:** LinkedIn URL, contact email, resume PDF, and project images or diagrams.
- [ ] **Analytics:** keep the base's Google Analytics setup with Nikhil's own ID, switch to Vercel Analytics, or none?
- [ ] **Navigation:** remove the base's hamburger and slide menu completely once the dock is in place?

## What your plan must contain

Reply with a plan in Markdown, before writing any code. Break the work into stages that can each be reviewed and deployed on their own. Here's a suggested order; change it if you have a reason, and say what it is:

1. **Fork and clean:** rename the project, remove Michael's content, analytics ID, and posts, and deploy an empty preview.
2. **Design tokens and a typography test page:** fonts, type scale, colors, and spacing, so Nikhil can approve them in both themes.
3. **Layout shell and dock:** port the dock, add the top bar, handle mobile behavior, keyboard access, and remove the old navigation if Nikhil agrees.
4. **Pages and content model:** the `Project` type, the new `/projects/[slug]/` route, the resume PDF button, all with placeholders.
5. **Motion:** the hero animation prototypes, then scroll fades, hover effects, and page transitions, following the Motion rules.
6. **QA and launch:** run every check from the Quality bar on the deployed preview, fix what fails, then point the production domain at the site.

For each stage, include:

- Files you'll create, change, or delete (paths)
- Dependencies you'll add or remove, with the reason for each
- What Nikhil reviews before you move on (a page, a preview URL, a screenshot)
- Which acceptance checks the stage satisfies
- Risks or unknowns, such as base-template conventions in `AGENTS.md` that conflict with this brief

End the plan with your questions for Nikhil, including any of the Open questions you need answered first.

## Sources

- [mldangelo/personal-site](https://github.com/mldangelo/personal-site): base template (MIT). Repo checked 2026-11-08.
- [dillionverma/portfolio](https://github.com/dillionverma/portfolio): dock component (MIT). Repo checked 2026-11-08.
- [NN/g: Scroll Fading 101](https://www.nngroup.com/articles/scroll-fading-101/)
- [NN/g: Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
- [NN/g: Liquid Glass Is Cracked, and Usability Suffers in iOS 26](https://www.nngroup.com/articles/liquid-glass/)
- [W3C: Understanding SC 2.3.3 Animation from Interactions](https://w3c.github.io/wcag/understanding/animation-from-interactions)
- [web.dev: How the Core Web Vitals thresholds were defined](https://web.dev/articles/defining-core-web-vitals-thresholds)
- [Apple: San Francisco font license](https://developer.apple.com/cn/fonts)
