/* ⚠ Do NOT annotate this as `Record<string, React.ReactNode>`. That widens
   `keyof typeof paths` to `string`, which silently disables all name checking
   on <Icon name="..." /> — two names in use on the Home page (`chevronDown`,
   `menu`) did not exist here and rendered as empty <svg> elements, leaving the
   FAQ accordion with no chevron and the mobile header with an INVISIBLE
   hamburger button. The bare object literal keeps the key union exact, so a
   typo is a compile error. */
const paths = {
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H9l-5 4V5Z" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="13" y2="13" />
    </>
  ),
  workflow: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.2 7.4 10.5 16M15.8 7.4 13.5 16M8.5 6h7" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </>
  ),
  /* The handset here is load-bearing: it is the only thing that separates this
     glyph from `chat`. The previous version drew it as a single bare curve
     (`M8.5 10.5c0 3 2 5 5 5`), which rendered as a meaningless hook and turned
     to mush at the 20px size this icon is actually used at — so the mark read
     as "a speech bubble", not "WhatsApp".

     It is now the real receiver abstraction: two rounded pads joined by an
     L-bend, which is what makes the shape legible at small sizes. Bubble
     radius is 8.7 to sit with `globe` (r=9) rather than inventing a third
     circle size for the set. Checked by rasterising at 20px, not by eye on the
     path data. */
  whatsapp: (
    <>
      <path d="M4 20.3l1.4-3.6a8.7 8.7 0 1 1 3.3 2.8l-4.7.8" />
      <path d="M9.5 10.4a.55.55 0 0 0 1.1 0V9.3a.55.55 0 0 0-1.1 0v1.1a5 5 0 0 0 5 5h1.1a.55.55 0 0 0 0-1.1h-1.1a.55.55 0 0 0 0 1.1" />
    </>
  ),
  crm: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M4 20a5 5 0 0 1 10 0" />
      <circle cx="18" cy="9" r="2.2" />
      <path d="M15.5 20a4 4 0 0 1 6-3.4" />
    </>
  ),
  home: (
    <>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v10h12V10" />
      <line x1="10" y1="20" x2="10" y2="14" />
      <line x1="14" y1="20" x2="14" y2="14" />
    </>
  ),
  bag: (
    <>
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 8a3 3 0 1 1 6 0" />
    </>
  ),
  pulse: (
    <>
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </>
  ),
  finance: (
    <>
      <line x1="5" y1="20" x2="5" y2="12" />
      <line x1="10.5" y1="20" x2="10.5" y2="7" />
      <line x1="16" y1="20" x2="16" y2="15" />
      <line x1="21" y1="20" x2="21" y2="10" />
      <line x1="3" y1="20" x2="22" y2="20" />
    </>
  ),
  factory: (
    <>
      <path d="M4 21V11l5 3.5V11l5 3.5V9l6 4v8H4Z" />
      <line x1="4" y1="21" x2="20" y2="21" />
    </>
  ),
  hospitality: (
    <>
      <path d="M3 19v-6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v6" />
      <line x1="3" y1="19" x2="21" y2="19" />
      <line x1="3" y1="13" x2="21" y2="13" />
      <circle cx="8" cy="10.5" r="1.4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </>
  ),
  headset: (
    <>
      <path d="M4 13a8 8 0 0 1 16 0v4" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19v1a3 3 0 0 1-3 3h-3" />
    </>
  ),
  chartUp: (
    <>
      <path d="M4 17 10 11 14 15 20 7" />
      <path d="M14 7h6v6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l4 2" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5 11 15.5 16 9" />
    </>
  ),
  close: (
    <>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </>
  ),
  arrowUpRight: (
    <>
      <line x1="6" y1="18" x2="18" y2="6" />
      <polyline points="9 6 18 6 18 15" />
    </>
  ),
  chevronDown: (
    <>
      <polyline points="6 9 12 15 18 9" />
    </>
  ),
  menu: (
    <>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </>
  ),
  quote: (
    <>
      <path d="M7 8a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1V9a1 1 0 0 0-1-1Z" />
      <path d="M17 8a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1V9a1 1 0 0 0-1-1Z" />
    </>
  ),
} satisfies Record<string, React.ReactNode>;

export type IconName = keyof typeof paths;

export default function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
