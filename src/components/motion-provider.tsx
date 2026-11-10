"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Respects the visitor's "reduce motion" setting everywhere: movement turns
 * into a plain fade or nothing, including the dock magnification.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
