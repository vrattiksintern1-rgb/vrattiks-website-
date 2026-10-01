const paths: Record<string, React.ReactNode> = {
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
  whatsapp: (
    <>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path
        transform="translate(7.2 7.2) scale(0.4)"
        fill="currentColor"
        stroke="none"
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"
      />
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
  book: (
    <>
      <path d="M3 5.5c3-1 6-.7 9 1 3-1.7 6-2 9-1V19c-3-1-6-.7-9 1-3-1.7-6-2-9-1V5.5Z" />
      <line x1="12" y1="6.5" x2="12" y2="20" />
    </>
  ),
  graduationCap: (
    <>
      <path d="M2 9.5 12 5l10 4.5L12 14 2 9.5Z" />
      <path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" />
      <line x1="22" y1="9.5" x2="22" y2="14.5" />
    </>
  ),
  utensils: (
    <>
      <path d="M4.5 3v5a2.5 2.5 0 0 0 5 0V3" />
      <line x1="7" y1="3" x2="7" y2="21" />
      <path d="M18 21V3c-2 1.5-3.5 4-3.5 7.5V14H18" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="6" cy="17" r="2.5" />
      <path d="M8.2 8.3 20 18M8.2 15.7 20 6" />
    </>
  ),
  car: (
    <>
      <path d="M5.5 16H3v-3.5L5.5 7h13l2.5 5.5V16h-2.5M9.5 16h5" />
      <line x1="3" y1="12.5" x2="21" y2="12.5" />
      <circle cx="7.5" cy="17" r="2" />
      <circle cx="16.5" cy="17" r="2" />
    </>
  ),
  hardHat: (
    <>
      <path d="M5 15a7 7 0 0 1 14 0" />
      <path d="M10 8.3V5.5h4v2.8" />
      <rect x="3" y="15" width="18" height="3" rx="1" />
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
  repeat: (
    <>
      <path d="M4 9a5 5 0 0 1 5-5h9M18 4v5h-5" />
      <path d="M20 15a5 5 0 0 1-5 5H6M6 20v-5h5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l4 2" />
    </>
  ),
  mailX: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M4 7.5 12 13l8-5.5" />
    </>
  ),
  puzzle: (
    <>
      <path d="M9 4h4v2.5a1.5 1.5 0 1 0 0 3V12H9V9.5a1.5 1.5 0 1 1 0-3V4Z" />
      <path d="M9 12H4v7a1.5 1.5 0 1 1 3 0h2v-7Z" />
      <path d="M13 12h6a1.5 1.5 0 1 1 0 3v4h-6v-7Z" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 15a8 8 0 1 1 16 0" />
      <line x1="12" y1="15" x2="15.5" y2="10.5" />
      <line x1="4" y1="19" x2="20" y2="19" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A9.4 9.4 0 0 1 12 5c5 0 9 4 10 7-.5 1.4-1.6 3-3 4.2M6.2 6.2C4.4 7.4 3 9 2 12c1 3 5 7 10 7 1 0 2-.2 2.9-.5" />
      <path d="M9.5 12a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3v5M12 16v5M4 12h5M15 12h5" />
      <path d="M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2" />
    </>
  ),
  zap: (
    <>
      <path d="M13 3 6 14h5l-1 7 8-11h-5l1-7Z" />
    </>
  ),
  sliders: (
    <>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="9" cy="6" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="11" cy="18" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5 11 15.5 16 9" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <line x1="20" y1="20" x2="15.8" y2="15.8" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="9" x2="9" y2="20" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3c3 1 5 5 5 9-2 0-4-.7-5-2-1 1.3-3 2-5 2 0-4 2-8 5-9Z" />
      <path d="M9 15l-3 5 4-1M15 15l3 5-4-1" />
      <circle cx="12" cy="9" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  lifeBuoy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <line x1="5.4" y1="5.4" x2="8.6" y2="8.6" />
      <line x1="15.4" y1="15.4" x2="18.6" y2="18.6" />
      <line x1="18.6" y1="5.4" x2="15.4" y2="8.6" />
      <line x1="8.6" y1="15.4" x2="5.4" y2="18.6" />
    </>
  ),
  chevronDown: <polyline points="6 9 12 15 18 9" />,
  arrowLeft: (
    <>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="11 6 5 12 11 18" />
    </>
  ),
  arrowRight: (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </>
  ),
  pause: (
    <>
      <line x1="9" y1="6" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="18" />
    </>
  ),
  play: <path d="M8 5.5v13l10-6.5-10-6.5Z" />,
  menu: (
    <>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
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
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <circle cx="17.5" cy="9" r="2.3" />
      <path d="M14.8 20a4.3 4.3 0 0 1 6.7-3.6" />
    </>
  ),
  quote: (
    <>
      <path d="M7 8a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1V9a1 1 0 0 0-1-1Z" />
      <path d="M17 8a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1V9a1 1 0 0 0-1-1Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  phone: (
    <path d="M5 4h3.5l1.8 4.5-2.3 1.5a11 11 0 0 0 6 6l1.5-2.3L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
  ),
  mapPin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
};

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
