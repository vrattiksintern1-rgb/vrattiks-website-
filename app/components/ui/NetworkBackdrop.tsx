/**
 * Decorative "plexus" backdrop: nodes joined by hairlines, a few glowing hubs
 * and some out-of-focus bokeh for depth. Rendered as static inline SVG on the
 * server. It is not animated, because nothing on Home loops (kylezantos-design §1b).
 *
 * The layout is generated from a fixed seed, so every render (and every
 * build) produces the same picture, with no hydration mismatch and no layout
 * shift. Nodes are weighted towards the left edge (x = r^1.9) so the network
 * sits behind the section heading and thins out before the reading area. The
 * parent masks it further with `.mask-fade-left`.
 *
 * Colours come from the brand tokens through Tailwind's fill-/stroke- utilities.
 * There are no hex literals here.
 */

const W = 1200;
const H = 700;
const LINK_DISTANCE = 125;
const MAX_LINKS_PER_NODE = 5;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 10) / 10;

function buildNetwork(seed: number) {
  const rand = mulberry32(seed);

  const nodes = Array.from({ length: 130 }, () => ({
    x: round(W * Math.pow(rand(), 1.9)),
    y: round(H * rand()),
    r: round(1.4 + rand() * 1.8),
  }));

  const linkCount = new Array(nodes.length).fill(0);
  const links: { x1: number; y1: number; x2: number; y2: number; o: number }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (linkCount[i] >= MAX_LINKS_PER_NODE || linkCount[j] >= MAX_LINKS_PER_NODE) continue;
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d > LINK_DISTANCE) continue;
      linkCount[i]++;
      linkCount[j]++;
      links.push({
        x1: nodes[i].x,
        y1: nodes[i].y,
        x2: nodes[j].x,
        y2: nodes[j].y,
        // Shorter links read stronger, as in a depth-of-field plexus.
        o: Math.round((0.12 + 0.45 * (1 - d / LINK_DISTANCE)) * 100) / 100,
      });
    }
  }

  // The best-connected nodes become glowing hubs.
  const hubs = nodes
    .map((n, i) => ({ ...n, links: linkCount[i] }))
    .sort((a, b) => b.links - a.links)
    .slice(0, 10);

  const bokeh = Array.from({ length: 14 }, () => ({
    x: round(W * 0.6 * Math.pow(rand(), 1.3)),
    y: round(H * rand()),
    r: round(14 + rand() * 30),
  }));

  return { nodes, links, hubs, bokeh };
}

const network = buildNetwork(20261001);

export default function NetworkBackdrop({ className = "" }: { className?: string }) {
  const { nodes, links, hubs, bokeh } = network;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMinYMid slice"
      className={`pointer-events-none ${className}`}
    >
      <defs>
        <filter id="network-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <g filter="url(#network-soft)" className="fill-brand-primary">
        {bokeh.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r={b.r} opacity={0.18} />
        ))}
      </g>

      <g className="stroke-brand-secondary" strokeWidth={0.9}>
        {links.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} opacity={l.o} />
        ))}
      </g>

      <g filter="url(#network-soft)" className="fill-brand-primary">
        {hubs.map((h, i) => (
          <circle key={i} cx={h.x} cy={h.y} r={9} opacity={0.55} />
        ))}
      </g>

      <g className="fill-brand-secondary">
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} opacity={0.75} />
        ))}
      </g>
    </svg>
  );
}
