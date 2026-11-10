/**
 * Soft gradient glows in the page margins, alternating left and right down
 * the whole page so the sides never look empty while scrolling. Pure CSS:
 * large blurred radial gradients in the accent colors, drifting slowly with
 * transform only. They sit behind everything and are purely decorative.
 * Styles live in globals.css under "Ambient margin glows".
 */
const GLOWS = [
  { top: "8%", side: "left", color: "from" },
  { top: "22%", side: "right", color: "to" },
  { top: "38%", side: "left", color: "to" },
  { top: "54%", side: "right", color: "from" },
  { top: "70%", side: "left", color: "from" },
  { top: "86%", side: "right", color: "to" },
] as const;

export function AmbientBackground() {
  return (
    <div aria-hidden className="ambient-layer">
      {GLOWS.map((glow, index) => (
        <span
          key={glow.top}
          className={`ambient-glow ambient-glow--${glow.side} ambient-glow--${glow.color}`}
          style={{ top: glow.top, animationDelay: `${index * -4}s` }}
        />
      ))}
    </div>
  );
}
