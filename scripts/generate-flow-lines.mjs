// Generates the flowing-line ribbon decorations in public/decor/.
//
//   node scripts/generate-flow-lines.mjs
//
// Method: blend between guide rails. Each ribbon is described by a centreline,
// a half-width and a twist angle at a handful of anchors. From those we derive
// rail A and rail B (the two ribbon edges) plus a "bulge" rail. Every line is
// a quadratic blend of the three rails, point by point at the anchors, so each
// line stays one smooth poly-Bézier:
//
//   P(v) = C + v·(w·cosθ·N + w·sinθ·depth) + (1 − v²)·bulge·N,   v ∈ [−1, 1]
//
// Where the twist passes 90° the cosθ term reaches zero, rails A and B cross
// and the lines pinch into a narrow fold; past it the line order is flipped,
// so the ribbon visibly turns over. The bulge term makes the middle lines fold
// over the outer ones near the pinch — that is where the crosshatch and the
// bright caustic edge come from. A second ribbon, rotated, overlaps the first.
//
// Output is static SVG only: no filters, blur, raster or animation. Colours
// are the brand tokens from docs/index.html (#b79af3 → #6942f1).

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// ─── Tunable parameters ────────────────────────────────────────────────────
const SEED = 20261010;
const VIEW = { w: 1600, h: 1000 };
const LAVENDER = "#b79af3"; // --color-brand-primary
const VIOLET = "#6942f1"; // --color-brand-secondary
const STROKE_WIDTHS = [0.6, 0.75, 0.9]; // one per line, picked by seed
const OPACITY_BUCKETS = [0.45, 0.65, 0.85, 1]; // per-line opacity, rounded into groups
const EDGE_FADE = { x: 0.14, y: 0.16 }; // fraction of the canvas faded at each edge
const DECIMALS = 1;

// Each composition: a stroke-gradient direction plus one or two ribbons.
//   anchors   [x, y, halfWidth, twistDeg, bulge]  — centreline anchors, in order
//   lines     number of lines in the ribbon
//   spread    0 = lines evenly spaced across the ribbon, 1 = full ease-in-out
//             (bunched at both edges, open in the middle)
//   depth     [dx, dy] oblique offset for the twisted-away half; keeps the fold
//             a narrow band instead of a single point
//   rotate    [deg, cx, cy] rotation applied to the anchors
//   glow      [r, floor] radius of the brightness falloff around the pinch, and
//             the opacity the lines keep far from it
//   alpha     multiplier on the ribbon's per-line opacities
const COMPOSITIONS = {
  // A — diagonal sweep, mass on the left/centre. Ribbon 1 drops from the top
  // left, hooks into a tight fold, then fans out to the bottom right; ribbon 2
  // (rotated 25°) cuts up through that fan to make the crosshatch zone.
  "flow-lines-a": {
    gradient: [520, 360, 1500, 1000],
    ribbons: [
      {
        lines: 110,
        spread: 0.7,
        depth: [0.05, -0.04],
        rotate: [0, 0, 0],
        glow: [760, 0.45],
        alpha: 1,
        anchors: [
          [-300, -120, 320, 8, 0],
          [120, 70, 230, 35, 30],
          [400, 250, 120, 66, 110],
          [540, 390, 26, 90, 18],
          [610, 560, 120, 118, 100],
          [780, 760, 300, 148, 20],
          [1150, 900, 470, 166, -20],
          [1700, 980, 600, 176, -40],
        ],
      },
      {
        lines: 90,
        spread: 0.6,
        depth: [-0.05, 0.05],
        rotate: [25, 820, 640],
        glow: [640, 0.4],
        alpha: 0.8,
        anchors: [
          [-250, 1150, 560, 172, 0],
          [250, 900, 380, 145, -40],
          [640, 700, 150, 112, -100],
          [860, 620, 28, 90, -16],
          [1100, 520, 160, 64, -80],
          [1500, 330, 360, 30, 20],
          [2000, 120, 520, 8, 30],
        ],
      },
    ],
  },
  // B — vertical fall, mass on the right. Ribbon 1 enters from the top,
  // folds high on the right and fans down-left; ribbon 2 crosses it lower,
  // rotated −25°, and fades out before reaching the left third.
  "flow-lines-b": {
    gradient: [1180, 300, 300, 1000],
    ribbons: [
      {
        lines: 105,
        spread: 0.7,
        depth: [0.05, 0.04],
        rotate: [0, 0, 0],
        glow: [700, 0.45],
        alpha: 1,
        anchors: [
          [1500, -300, 380, 172, 0],
          [1380, -20, 260, 150, -40],
          [1240, 200, 120, 116, -110],
          [1170, 340, 26, 90, -18],
          [1150, 500, 140, 64, -95],
          [1060, 720, 320, 36, -10],
          [820, 960, 480, 16, 30],
          [450, 1300, 600, 6, 40],
        ],
      },
      {
        lines: 85,
        spread: 0.6,
        depth: [0.05, 0.05],
        rotate: [-25, 1150, 700],
        glow: [560, 0.35],
        alpha: 0.75,
        anchors: [
          [2000, 640, 520, 8, 0],
          [1650, 660, 320, 38, 40],
          [1380, 690, 130, 72, 100],
          [1200, 710, 28, 90, 16],
          [1000, 720, 150, 116, 80],
          [700, 700, 340, 150, 0],
          [150, 640, 520, 174, -30],
        ],
      },
    ],
  },
  // Contact — portrait, for the LEFT (copy) column of the contact hero. User
  // reference (2026-10-10): a string-art ribbon falling down the left edge,
  // folding into a pinch, fanning out at the bottom. One ribbon only: a second
  // one crossing the lower fan sat behind the Phone/WhatsApp rows and ran
  // toward the form, and was removed (user, 2026-10-12). Only the right edge
  // and bottom fade; the left edge runs off the page like the reference. The
  // fold is pushed to x≈50 so it lands in the page's left margin: at x≈170
  // its dense fold sat behind the intro copy (~3.8:1).
  "flow-lines-contact": {
    view: { w: 900, h: 1000 },
    fade: { left: 0, right: 0.3, top: 0.08, bottom: 0.1 },
    gradient: [150, 0, 650, 1000],
    ribbons: [
      {
        lines: 95,
        spread: 0.65,
        depth: [0.05, 0.04],
        rotate: [0, 0, 0],
        glow: [520, 0.4],
        alpha: 1,
        anchors: [
          [420, -260, 300, 10, 0],
          [190, 40, 220, 36, 30],
          [-10, 250, 120, 66, 100],
          [50, 420, 24, 90, 16],
          [180, 590, 130, 118, 95],
          [300, 790, 270, 150, 20],
          [420, 1250, 420, 172, -30],
        ],
      },
    ],
  },
};
// ───────────────────────────────────────────────────────────────────────────

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "decor");

function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rad = (d) => (d * Math.PI) / 180;
const smooth = (x) => x * x * (3 - 2 * x);

function rotateAnchors(anchors, [deg, cx, cy]) {
  const c = Math.cos(rad(deg));
  const s = Math.sin(rad(deg));
  return anchors.map(([x, y, ...rest]) => [
    cx + (x - cx) * c - (y - cy) * s,
    cy + (x - cx) * s + (y - cy) * c,
    ...rest,
  ]);
}

// Unit normal of the centreline at each anchor, from its neighbours.
function normals(pts) {
  return pts.map((_, i) => {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    return [-dy / len, dx / len];
  });
}

// Rails A/B (edges) and the bulge rail, as per-anchor vectors off the centreline.
function rails(ribbon) {
  const pts = rotateAnchors(ribbon.anchors, ribbon.rotate);
  const ns = normals(pts);
  return pts.map(([x, y, w, twist, bulge], i) => {
    const [nx, ny] = ns[i];
    const c = Math.cos(rad(twist));
    const s = Math.sin(rad(twist));
    // Edge offset: in-plane part (shrinks to 0 at the pinch) + oblique depth part.
    const ex = w * (c * nx + s * ribbon.depth[0]);
    const ey = w * (c * ny + s * ribbon.depth[1]);
    return { x, y, ex, ey, bx: bulge * nx, by: bulge * ny, twist };
  });
}

// Pinch = centreline point where the ribbon is most edge-on (|cos θ| smallest).
function pinchPoint(r) {
  let best = r[0];
  for (const p of r) if (Math.abs(Math.cos(rad(p.twist))) < Math.abs(Math.cos(rad(best.twist)))) best = p;
  return [best.x, best.y];
}

// v positions across the ribbon: blend of linear and ease-in-out (bunched edges).
function vPositions(n, spread, rnd) {
  const out = [];
  for (let j = 0; j < n; j++) {
    const u = j / (n - 1);
    const eased = smooth(smooth(u) * 0.5 + u * 0.5);
    const t = u * (1 - spread) + eased * spread;
    const jitter = (rnd() - 0.5) * (0.35 / n);
    out.push(Math.max(-1, Math.min(1, t * 2 - 1 + jitter)));
  }
  return out;
}

const fmt = (n) => {
  const s = n.toFixed(DECIMALS).replace(/\.0+$/, "").replace(/^(-?)0\./, "$1.");
  return s === "-0" ? "0" : s;
};
// Join numbers SVG-style: a minus sign doubles as a separator.
const nums = (list) => list.map((n, i) => (i && !n.startsWith("-") ? " " + n : n)).join("");

const q = 10 ** DECIMALS;
const round = (n) => Math.round(n * q) / q;

// Catmull-Rom through the points → one C then reflected-control `s` segments.
// Catmull-Rom tangents are C1-continuous, so `s` reproduces the curve exactly.
function pathFor(points) {
  const P = points.map(([x, y]) => [round(x), round(y)]);
  const n = P.length;
  const get = (i) => P[Math.max(0, Math.min(n - 1, i))];
  const cp = (i) => {
    const a = get(i - 1);
    const b = get(i + 1);
    const c = get(i + 2);
    const p = get(i);
    const q2 = get(i + 1);
    return [
      [round(p[0] + (b[0] - a[0]) / 6), round(p[1] + (b[1] - a[1]) / 6)],
      [round(q2[0] - (c[0] - p[0]) / 6), round(q2[1] - (c[1] - p[1]) / 6)],
    ];
  };
  let d = "M" + nums([fmt(P[0][0]), fmt(P[0][1])]);
  const [c1, c2] = cp(0);
  d += "C" + nums([c1, c2, P[1]].flat().map(fmt));
  let cur = P[1];
  for (let i = 1; i < n - 1; i++) {
    const [, c2b] = cp(i);
    const end = P[i + 1];
    d += "s" + nums([c2b[0] - cur[0], c2b[1] - cur[1], end[0] - cur[0], end[1] - cur[1]].map((v) => fmt(round(v))));
    cur = end;
  }
  return d;
}

function buildRibbon(ribbon, rnd) {
  const r = rails(ribbon);
  const vs = vPositions(ribbon.lines, ribbon.spread, rnd);
  const groups = new Map();
  for (const v of vs) {
    const k = 1 - v * v;
    const pts = r.map((p) => [p.x + v * p.ex + k * p.bx, p.y + v * p.ey + k * p.by]);
    // Edge lines read as the ribbon's rim, so they sit a little brighter.
    const base = 0.55 + 0.35 * Math.abs(v) ** 3 + (rnd() - 0.5) * 0.4;
    const op = OPACITY_BUCKETS.reduce((a, b) => (Math.abs(b - base * ribbon.alpha) < Math.abs(a - base * ribbon.alpha) ? b : a));
    const sw = STROKE_WIDTHS[Math.floor(rnd() * STROKE_WIDTHS.length)];
    const key = `${op}|${sw}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(pathFor(pts));
  }
  return { groups, pinch: pinchPoint(r) };
}

function buildSvg(name, comp) {
  const rnd = mulberry32(SEED + name.length * 7919 + name.charCodeAt(name.length - 1));
  const { w, h } = comp.view ?? VIEW;
  const [gx1, gy1, gx2, gy2] = comp.gradient;
  const f = comp.fade ?? { left: EDGE_FADE.x, right: EDGE_FADE.x, top: EDGE_FADE.y, bottom: EDGE_FADE.y };
  // Edge fade; a 0 on either side leaves that edge at full strength.
  const fade = (id, horizontal, f0, f1) =>
    `<linearGradient id="${id}" x2="${horizontal ? 1 : 0}" y2="${horizontal ? 0 : 1}">` +
    `<stop offset="0" stop-color="#fff" stop-opacity="${f0 ? 0 : 1}"/><stop offset="${f0}" stop-color="#fff"/>` +
    `<stop offset="${1 - f1}" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="${f1 ? 0 : 1}"/></linearGradient>`;

  let defs =
    `<linearGradient id="s" gradientUnits="userSpaceOnUse" x1="${gx1}" y1="${gy1}" x2="${gx2}" y2="${gy2}">` +
    `<stop offset="0" stop-color="${LAVENDER}"/><stop offset="1" stop-color="${VIOLET}"/></linearGradient>` +
    fade("fx", true, f.left, f.right) +
    fade("fy", false, f.top, f.bottom) +
    `<mask id="my"><rect width="${w}" height="${h}" fill="url(#fy)"/></mask>` +
    `<mask id="e"><rect width="${w}" height="${h}" fill="url(#fx)" mask="url(#my)"/></mask>`;

  let body = "";
  comp.ribbons.forEach((ribbon, i) => {
    const { groups, pinch } = buildRibbon(ribbon, rnd);
    const [r, floor] = ribbon.glow;
    // Brightness falls off with distance from the pinch: bright fold, quiet fan.
    defs +=
      `<radialGradient id="g${i}" gradientUnits="userSpaceOnUse" cx="${fmt(pinch[0])}" cy="${fmt(pinch[1])}" r="${r}">` +
      `<stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="${floor}"/></radialGradient>` +
      `<mask id="m${i}" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="url(#g${i})"/></mask>`;
    body += `<g mask="url(#m${i})">`;
    for (const [key, paths] of groups) {
      const [op, sw] = key.split("|");
      body += `<g stroke-opacity="${fmt(+op)}" stroke-width="${fmt(+sw)}">`;
      body += paths.map((d) => `<path d="${d}"/>`).join("");
      body += "</g>";
    }
    body += "</g>";
  });

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none" stroke="url(#s)" stroke-linecap="round">` +
    `<defs>${defs}</defs><g mask="url(#e)">${body}</g></svg>\n`
  );
}

mkdirSync(OUT_DIR, { recursive: true });
for (const [name, comp] of Object.entries(COMPOSITIONS)) {
  const svg = buildSvg(name, comp);
  const file = join(OUT_DIR, `${name}.svg`);
  writeFileSync(file, svg);
  console.log(`${name}.svg  ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`);
}
