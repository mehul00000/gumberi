"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Theme toggle driven by the actual DOM class (via MutationObserver)
 * so the label and icon are always correct regardless of
 * next-themes' async resolvedTheme updates.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const sync = () =>
      setIsDarkState(document.documentElement.classList.contains("dark"));
    const setIsDarkState = (v: boolean) => setIsDark(v);
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [mounted]);

  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-accent ${className ?? ""}`}
    >
      <Sun
        className={`absolute h-[1.15rem] w-[1.15rem] transition-all duration-500 ${
          mounted && isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
        strokeWidth={1.6}
      />
      <Moon
        className={`absolute h-[1.15rem] w-[1.15rem] transition-all duration-500 ${
          mounted && isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
        strokeWidth={1.6}
      />
    </button>
  );
}
