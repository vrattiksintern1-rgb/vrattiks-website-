"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import Icon from "./ui/Icon";
import { THEME_STORAGE_KEY, type Theme } from "../lib/theme";

const darkQuery = "(prefers-color-scheme: dark)";

function savedTheme(): Theme | null {
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY);
    return t === "dark" || t === "light" ? t : null;
  } catch {
    return null;
  }
}

const systemTheme = (): Theme => (matchMedia(darkQuery).matches ? "dark" : "light");

const applyTheme = (theme: Theme) => document.documentElement.setAttribute("data-theme", theme);

/* The DOM attribute is the source of truth (the pre-paint script sets it before
   React exists), so the button subscribes to it rather than owning state. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getIsDark = () => document.documentElement.getAttribute("data-theme") === "dark";
const getServerIsDark = () => false;

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getIsDark, getServerIsDark);

  // Dev-only: Strict Mode's remount resets <html> attributes, clearing the one
  // the inline script set. No-op in production (see app/lib/theme.ts).
  useLayoutEffect(() => applyTheme(savedTheme() ?? systemTheme()), []);

  // Until the visitor picks a theme themselves, keep following the OS.
  useEffect(() => {
    const media = matchMedia(darkQuery);
    const onSystemChange = () => {
      if (!savedTheme()) applyTheme(systemTheme());
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const toggle = () => {
    const next: Theme = getIsDark() ? "light" : "dark";
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage blocked — the switch still applies for this page view.
    }
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && "startViewTransition" in document) {
      document.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  };

  // Icons are swapped by CSS (`dark:`), not by `isDark`, so the right one is
  // painted from the first frame — before hydration has a chance to correct it.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="focus-glow flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-n-200 text-n-700 transition-[color,border-color,box-shadow] duration-150 ease-out hover:border-n-300 hover:text-brand-secondary hover:shadow-[var(--shadow-glow)]"
    >
      <Icon name="moon" className="h-4.5 w-4.5 dark:hidden" />
      <Icon name="sun" className="hidden h-4.5 w-4.5 dark:block" />
    </button>
  );
}
