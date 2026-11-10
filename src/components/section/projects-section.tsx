"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

/**
 * Featured projects as large cards, with the rest one click away under
 * "Show more projects", so everything stays on this site.
 */
export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const featured = DATA.projects.filter((p) => p.featured);
  const more = DATA.projects.filter((p) => !p.featured);

  return (
    <div>
      <div className="flex min-h-0 flex-col gap-y-8">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <div className="flex w-full items-center">
            <div className="h-px flex-1 bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <h2 className="bg-gradient-accent z-10 rounded-2xl px-6 py-2 text-xl font-semibold tracking-tight shadow-sm sm:text-2xl">
              My Projects
            </h2>
            <div className="h-px flex-1 bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <p className="max-w-2xl text-center text-balance text-muted-foreground md:text-lg/relaxed">
            {DATA.projectsIntro}
          </p>
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2">
          {featured.map((project, id) => (
            <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12 + id * 0.05} className="h-full">
              <ProjectCard
                github={project.github}
                demo={project.demo}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                inProgress={project.inProgress}
              />
            </BlurFade>
          ))}
        </div>

        {more.length > 0 ? (
          <div className="flex flex-col items-center gap-6">
            <AnimatePresence initial={false}>
              {showAll ? (
                <motion.div
                  id="more-projects"
                  key="more"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid w-full auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  {more.map((project) => (
                    <ProjectCard
                      key={project.title}
                      compact
                      github={project.github}
                demo={project.demo}
                      title={project.title}
                      description={project.description}
                      dates={project.dates}
                      tags={project.technologies}
                      image={project.image}
                      inProgress={project.inProgress}
                    />
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <button
              type="button"
              aria-expanded={showAll}
              aria-controls="more-projects"
              onClick={() => setShowAll((open) => !open)}
              className="group inline-flex h-10 items-center gap-2 rounded-full border bg-card px-5 text-sm font-medium transition-colors hover:border-accent-from/50 hover:text-accent-from focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {showAll ? "Show fewer projects" : `Show more projects (${more.length})`}
              <ChevronDown
                aria-hidden
                className={`size-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
