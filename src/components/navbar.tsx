import type { ComponentType, ReactNode } from "react";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { DATA } from "@/data/resume";

/**
 * "Bob": the floating dock. Frosted-glass, macOS style, with a see-through
 * accent gradient tint (.bob-glass in globals.css), with a label under every icon since the
 * dock is the site's only navigation. The glass stays mostly opaque so icons
 * and labels keep their contrast over any content scrolling behind them.
 */

const ICON_TILE =
  "rounded-full size-full bg-background/80 text-muted-foreground border border-border/60 shadow-sm transition-colors group-hover:text-accent-from group-hover:border-accent-from/40 group-focus-visible:text-accent-from";

function DockLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[10px] font-medium leading-none text-muted-foreground transition-colors group-hover:text-foreground">
      {children}
    </span>
  );
}

function DockLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex flex-col items-center gap-1 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <DockIcon className={ICON_TILE}>
        <Icon className="size-full" />
      </DockIcon>
      <DockLabel>{label}</DockLabel>
    </a>
  );
}

function Divider() {
  return <div aria-hidden className="mx-1 mb-5 h-8 w-px self-end bg-border" />;
}

export default function Navbar() {
  // Links without a value (missing environment variable) are left out.
  const socials = Object.values(DATA.contact.social).filter((s) => s.navbar && s.url);

  return (
    <nav
      aria-label="Main"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-30"
    >
      <Dock className="pointer-events-auto relative z-50 mx-auto flex h-auto w-fit items-end gap-3 bob-glass rounded-3xl px-3 pt-2 pb-1.5 backdrop-blur-2xl backdrop-saturate-150">
        {DATA.navbar.map((item) => (
          <DockLink key={item.href} href={item.href} label={item.label} icon={item.icon} />
        ))}
        <Divider />
        {socials.map((social) => (
          <DockLink
            key={social.name}
            href={social.url}
            label={social.name === "Send Email" ? "Email" : social.name}
            icon={social.icon}
          />
        ))}
        <Divider />
        <div className="group flex flex-col items-center gap-1">
          <DockIcon className={ICON_TILE}>
            <ModeToggle className="size-full cursor-pointer" />
          </DockIcon>
          <DockLabel>Theme</DockLabel>
        </div>
      </Dock>
    </nav>
  );
}
