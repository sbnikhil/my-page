"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { type ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * The hero is its own "page": exactly one screen tall. As the visitor scrolls
 * away from it, the hero fades and shrinks back while the rest of the site
 * rises in, and the browser's native scroll snapping (see globals.css) lands
 * on one "page" or the other, never halfway. The effect is tied to the scroll position, so
 * the visitor stays in control: nothing hijacks the wheel or the speed.
 * Only transform and opacity animate. With reduced motion, both stay still.
 */

export function HeroScene({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} id={id} className={cn("snap-start", className)}>
      <motion.div
        style={reduce ? undefined : { opacity, scale, y }}
        className="flex flex-1 flex-col justify-center"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function AfterHero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.75"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { opacity, y }}
      className="flex snap-start flex-col gap-14 pt-8"
    >
      {children}
    </motion.div>
  );
}
