"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      className={cn(className)}
      aria-label="Switch between light and dark mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {/* Shows the mode you would switch to. */}
      <MoonIcon className="h-full w-full dark:hidden" />
      <SunIcon className="hidden h-full w-full dark:block" />
    </Button>
  );
}
