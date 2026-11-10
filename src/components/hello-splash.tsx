"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Greeting on every page load: "Hello!" draws itself. The letter outlines trace
 * in the accent gradient, then fill in, over a slowly turning gradient halo,
 * and the overlay fades into the hero. About 1.5 seconds; any click, key,
 * scroll or touch skips it.
 *
 * The inline script in layout.tsx runs before first paint and:
 *   1. always opens the page at the top (the hero), dropping any leftover
 *      #section from the address and the browser's remembered scroll spot;
 *   2. turns the splash on unless the visitor prefers reduced motion, by
 *      setting `data-hello` on <html>. CSS keeps the overlay hidden otherwise,
 *      so reduced-motion users and visitors without JavaScript never see it.
 */
export const HELLO_INIT_SCRIPT = `try{if("scrollRestoration" in history)history.scrollRestoration="manual";if(location.hash)history.replaceState(null,"",location.pathname+location.search);window.scrollTo({top:0,left:0,behavior:"instant"});if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.hello="1"}catch(e){}`;

const DRAW_S = 1.0; // outlines trace in
const FILL_DELAY_S = 0.6; // fill starts while the outline is finishing
const FILL_S = 0.6;
const TOTAL_MS = 1500; // then the overlay fades out
// Longer than any single letter outline, so each one starts fully hidden.
const DASH = 1200;

export function HelloSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Not shown this visit: CSS already keeps the overlay hidden.
    if (document.documentElement.dataset.hello !== "1") return;

    const finish = () => setVisible(false);
    const timer = window.setTimeout(finish, TOTAL_MS);
    const skipEvents = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    for (const event of skipEvents) {
      window.addEventListener(event, finish, { once: true, passive: true });
    }

    return () => {
      window.clearTimeout(timer);
      for (const event of skipEvents) window.removeEventListener(event, finish);
    };
  }, []);

  function onExitComplete() {
    delete document.documentElement.dataset.hello;
  }

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {visible && (
        <motion.div
          key="hello"
          aria-hidden
          className="hello-splash fixed inset-0 z-[100] flex-col items-center justify-center overflow-hidden bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* Soft glow plus a slowly turning gradient halo behind the word. */}
          <div className="accent-glow absolute inset-0 opacity-80" />
          <motion.div
            className="hello-halo absolute size-[22rem] rounded-full sm:size-[30rem]"
            initial={{ rotate: 0, scale: 0.85, opacity: 0 }}
            animate={{ rotate: 90, scale: 1, opacity: 1 }}
            transition={{ duration: TOTAL_MS / 1000 + 0.6, ease: "easeOut" }}
          />

          {/* "Hello!" drawn as outlines first, then filled with the gradient. */}
          <svg
            viewBox="0 0 720 220"
            className="relative w-[min(84vw,38rem)] overflow-visible font-sans"
          >
            <defs>
              <linearGradient id="hello-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" style={{ stopColor: "var(--g-from)" }} />
                <stop offset="100%" style={{ stopColor: "var(--g-to)" }} />
              </linearGradient>
            </defs>
            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="190"
              fontWeight="600"
              letterSpacing="-8"
              fill="url(#hello-gradient)"
              stroke="url(#hello-gradient)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeDasharray={DASH}
              initial={{ strokeDashoffset: DASH, fillOpacity: 0 }}
              animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
              transition={{
                strokeDashoffset: { duration: DRAW_S, ease: [0.65, 0, 0.35, 1] },
                fillOpacity: { delay: FILL_DELAY_S, duration: FILL_S, ease: "easeOut" },
              }}
            >
              Hello!
            </motion.text>
          </svg>

          <p className="absolute bottom-10 text-xs text-muted-foreground">
            click anywhere to skip
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
