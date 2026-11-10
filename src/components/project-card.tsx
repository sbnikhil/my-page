/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Globe } from "lucide-react";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

/** Small stable hash, so each title always gets the same cover. */
function hash(text: string): number {
  let h = 0;
  for (const char of text) h = (h * 31 + char.charCodeAt(0)) >>> 0;
  return h;
}

/** "Agentic LLM Firewall" -> "ALF". Skips words in parentheses. */
function initials(title: string): string {
  return title
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter((word) => /^[A-Za-z0-9]/.test(word))
    .slice(0, 3)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * Generated cover art for projects without a screenshot: the accent
 * gradient at an angle and with highlights picked from the title, a faint dot
 * grid, and the project's initials. Decorative, so hidden from screen readers.
 */
function ProjectCover({ title }: { title: string }) {
  const h = hash(title);
  const angle = 100 + (h % 120);
  const x1 = 15 + (h % 50);
  const y1 = 10 + ((h >> 5) % 40);
  const x2 = 50 + ((h >> 9) % 45);
  return (
    <div
      aria-hidden
      className="relative h-48 w-full overflow-hidden"
      style={{
        backgroundImage: [
          `radial-gradient(60% 80% at ${x1}% ${y1}%, rgba(255,255,255,0.28), transparent 60%)`,
          `radial-gradient(50% 70% at ${x2}% 100%, rgba(0,0,0,0.25), transparent 70%)`,
          `linear-gradient(${angle}deg, var(--g-fill-from), var(--g-fill-to))`,
        ].join(", "),
      }}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />
      <span className="absolute right-5 bottom-3 text-6xl font-semibold tracking-tighter text-white/85">
        {initials(title)}
      </span>
    </div>
  );
}

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <ProjectCover title={alt} />;
  }

  return (
    <img
      src={src}
      alt={`${alt} cover`}
      loading="lazy"
      decoding="async"
      className="w-full aspect-[3/2] object-cover"
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  inProgress?: boolean;
  /** GitHub repo; also where clicking the card goes. */
  github?: string;
  /** Live demo, shown as a second button. */
  demo?: string;
  /** Smaller card used under "Show more projects": shows a cover only when
   * an image is provided, never the generated gradient art. */
  compact?: boolean;
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  inProgress = false,
  github,
  demo,
  compact = false,
  className,
}: Props) {
  href = href || github;
  const media = video ? (
    <video
      src={video}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-48 object-cover"
    />
  ) : image ? (
    <ProjectImage src={image} alt={title} />
  ) : (
    <ProjectCover title={title} />
  );

  return (
    <div
      className={cn(
        "flex flex-col h-full border border-border bg-card rounded-xl overflow-hidden transition-all duration-200 hover:border-accent-from/50 hover:shadow-[0_8px_30px_-12px_var(--g-from)] motion-safe:hover:-translate-y-1",
        className
      )}
    >
      <div className="relative shrink-0">
        {compact && !image && !video ? null : href ? (
          <Link href={href} target="_blank" rel="noopener noreferrer" className="block">
            {media}
          </Link>
        ) : (
          media
        )}
        {inProgress ? (
          <span className="bg-gradient-accent absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider shadow-sm">
            In progress
          </span>
        ) : null}
        {links && links.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-2">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className={cn("flex flex-col gap-3 flex-1", compact ? "p-5" : "p-6")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{title}</h3>
            <time className="text-xs text-muted-foreground">{dates}</time>
            {compact && inProgress ? (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-from">In progress</span>
            ) : null}
          </div>
          {href ? (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent-from transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              aria-label={`Open ${title}`}
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : null}
        </div>
        <div className="text-sm flex-1 prose max-w-full text-left text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {github || demo ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-full border bg-background/60 px-3 text-xs font-medium transition-colors hover:border-accent-from/50 hover:text-accent-from focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icons.github className="size-3.5" aria-hidden />
                GitHub
              </a>
            ) : null}
            {demo ? (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-accent inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Globe className="size-3.5" aria-hidden />
                Live demo
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
