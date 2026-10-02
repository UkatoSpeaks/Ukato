"use client";

import { Moon, Sun } from "lucide-react";

function toggleTheme() {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  const dark = root.classList.toggle("dark");
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    // Storage blocked: the theme still applies for this visit.
  }
  window.setTimeout(() => root.classList.remove("theme-transition"), 250);
}

export function ThemeToggle({
  className = "text-ink-3 transition-colors duration-200 hover:text-ink",
}: {
  className?: string;
}) {
  // Both icons render; the .dark class picks one, so there is no state to
  // hydrate and no flash.
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={className}
    >
      <Moon size={16} strokeWidth={1.75} className="dark:hidden" />
      <Sun size={16} strokeWidth={1.75} className="hidden dark:block" />
    </button>
  );
}
