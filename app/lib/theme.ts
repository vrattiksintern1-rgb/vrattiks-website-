/* Site theme. The active theme lives in `data-theme` on <html>; globals.css
   flips the colour tokens off that attribute. A saved choice wins; with none
   saved, the visitor's OS setting decides. Shared by the pre-paint script in
   app/layout.tsx and the navbar's ThemeToggle so both read the same source. */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/* Runs synchronously in <head> before first paint, so a dark-mode visitor never
   sees a light flash (node_modules/next/dist/docs/01-app/02-guides/
   preventing-flash-before-hydration.md, "Themes"). localStorage can throw in
   private windows / blocked storage, so the OS setting is the fallback. */
export const themeInitScript = `(function(){var t;try{t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})}catch(e){}if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)})()`;
