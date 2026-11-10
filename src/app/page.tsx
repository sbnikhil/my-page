/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { SkillsGrid } from "@/components/skills-grid";
import { AfterHero, HeroScene } from "@/components/page-transition";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HobbiesSection from "@/components/section/hobbies-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col relative">
      {/* Full-screen intro "page". Text renders instantly: no fade hides it.
          The negative top margin cancels the layout's top padding so the hero
          is exactly one screen tall. */}
      <HeroScene
        id="hero"
        className="relative -mt-12 flex min-h-dvh flex-col sm:-mt-24"
      >
        <div aria-hidden className="accent-glow pointer-events-none absolute -inset-x-24 top-0 h-96 -z-10" />
        <div className="flex flex-col-reverse gap-10 md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-3xl flex-col gap-5">
            <h1 className="pb-2 text-5xl font-semibold leading-[1.05] tracking-tighter sm:text-6xl lg:text-7xl">
              Hi,
              <br />
              I&apos;m <span className="text-gradient">{DATA.heroName}</span>.
            </h1>
            <p className="max-w-[640px] text-justify hyphens-auto text-lg text-foreground/90 md:text-xl">
              {DATA.description}
            </p>
            <p className="max-w-[640px] text-justify hyphens-auto text-base leading-relaxed text-muted-foreground">
              <span className="[&_strong]:font-semibold [&_strong]:text-foreground">
                <Markdown components={{ p: ({ children }) => <>{children}</> }}>
                  {DATA.intro}
                </Markdown>
              </span>
            </p>
{/* Sized to the status line, so the availability line centers under it. */}
            <div className="flex w-fit flex-col items-center gap-1.5">
              <p className="flex items-center gap-2 text-sm text-foreground/80">
                <span aria-hidden className="size-2 shrink-0 rounded-full bg-[#34c759]" />
                <span className="[&_strong]:font-semibold [&_strong]:text-foreground">
                  <Markdown components={{ p: ({ children }) => <>{children}</> }}>
                    {DATA.status}
                  </Markdown>
                </span>
              </p>
              <p className="bg-gradient-accent rounded-full px-4 py-1.5 text-center text-xs font-semibold uppercase tracking-[0.18em] shadow-sm">
                {DATA.availability}
              </p>
            </div>
          </div>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Avatar className="size-28 md:size-40 border rounded-full shadow-lg ring-4 ring-accent-from/25">
              <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
              <AvatarFallback className="bg-gradient-accent text-3xl font-semibold md:text-4xl">
                {DATA.initials}
              </AvatarFallback>
            </Avatar>
          </BlurFade>
        </div>
        <a
          href="#about"
          aria-label="Scroll to about"
          className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-accent-from md:block"
        >
          <ChevronDown className="size-6 motion-safe:animate-bounce" />
        </a>
      </HeroScene>
      <AfterHero>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-justify hyphens-auto font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + index * 0.05}
              >
                <div className="flex flex-col gap-2">
                  <Link
                    href={education.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-3 justify-between group"
                  >
                    <div className="flex items-center gap-x-3 flex-1 min-w-0">
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="size-8 md:size-10 p-1 border rounded-full bg-white shadow ring-2 ring-border overflow-hidden object-contain flex-none"
                      />
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <div className="font-semibold leading-none flex items-center gap-2">
                          {education.school}
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                        </div>
                        <div className="font-sans text-sm text-muted-foreground">
                          {education.degree}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                      <span>
                        {education.start} - {education.end}
                      </span>
                    </div>
                  </Link>
                  <dl className="ml-11 md:ml-13 flex flex-col gap-1 text-sm text-muted-foreground">
                    <div className="flex gap-1.5">
                      <dt className="font-medium text-foreground">GPA:</dt>
                      <dd className="tabular-nums">{education.gpa}</dd>
                    </div>
                    <div className="text-justify hyphens-auto leading-relaxed">
                      <dt className="inline font-medium text-foreground">Relevant Coursework: </dt>
                      <dd className="inline">{education.coursework}</dd>
                    </div>
                  </dl>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <SkillsGrid groups={DATA.skills} />
          </BlurFade>
        </div>
      </section>
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>
      <section id="hobbies">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <h2 className="text-xl font-bold">{DATA.hobbies.title}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <HobbiesSection />
          </BlurFade>
        </div>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
      </AfterHero>
    </main>
  );
}
