/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Markdown from "react-markdown";

import { DATA } from "@/data/resume";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    // No logo yet: show the organization's initials, e.g. "SI" for SmartInternz.
    const initials = alt
      .replace(/\(.*?\)/g, "")
      .match(/[A-Z]/g)
      ?.slice(0, 2)
      .join("");
    return (
      <div
        aria-hidden
        className="bg-gradient-accent size-8 md:size-10 flex flex-none items-center justify-center rounded-full text-[11px] font-semibold shadow ring-2 ring-border md:text-xs"
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1 border rounded-full bg-white shadow ring-2 ring-border overflow-hidden object-contain flex-none"
      onError={() => setImageError(true)}
    />
  );
}

/** Every role with its description always visible: nothing to click open. */
export default function WorkSection() {
  return (
    <div className="grid w-full gap-10">
      {DATA.work.map((work) => (
        <article key={work.company} className="grid gap-3">
          <div className="flex w-full items-center justify-between gap-x-3">
            <div className="flex min-w-0 flex-1 items-center gap-x-3">
              <LogoImage src={work.logoUrl} alt={work.company} />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <h3 className="font-semibold leading-none">{work.title}</h3>
                <p className="font-sans text-sm text-muted-foreground">
                  {work.company}
                  {work.location ? ` · ${work.location}` : ""}
                </p>
              </div>
            </div>
            <span className="flex-none text-right text-xs tabular-nums text-muted-foreground">
              {work.start} - {work.end ?? "Present"}
            </span>
          </div>
          <div className="ml-11 flex flex-col gap-2 text-justify text-sm leading-relaxed text-muted-foreground hyphens-auto md:ml-13 [&_strong]:font-semibold [&_strong]:text-foreground">
            {work.description ? <Markdown>{work.description}</Markdown> : null}
            {work.highlights.length > 0 ? (
              <ul className="flex list-disc flex-col gap-1.5 pl-4 marker:text-accent-from">
                {work.highlights.map((point) => (
                  <li key={point.slice(0, 40)}>
                    <Markdown components={{ p: ({ children }) => <>{children}</> }}>
                      {point}
                    </Markdown>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
