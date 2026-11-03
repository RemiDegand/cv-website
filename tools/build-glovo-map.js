// node tools/build-glovo-map.js <countries-50m.json>
// Writes images/maps/glovo-areas.svg: the PLECA market map of the Glovo experience page (my areas in Glovo yellow).
// Data: Natural Earth via world-atlas@2.0.2 (https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json), public domain.
// The page shows it as an <img> (styles are inside the SVG).
const fs = require("fs");
const path = require("path");
const src = process.argv[2];
if (!src) throw new Error("Usage: node tools/build-glovo-map.js <path to countries-50m.json>");
const topo = JSON.parse(fs.readFileSync(src, "utf8"));

// View: lon 12..90, lat 34..57, equirectangular with cos(46°) so shapes keep their look at this latitude.
const W = 640, LON0 = 12, LON1 = 90, LAT0 = 34, LAT1 = 57, K = Math.cos((46 * Math.PI) / 180);
const sx = W / ((LON1 - LON0) * K), H = Math.round((LAT1 - LAT0) * sx);
const px = (lon) => (lon - LON0) * K * sx, py = (lat) => (LAT1 - lat) * sx;
const M = 30; // shapes outside the view are clamped to this margin (keeps the file small)
const clamp = (v, max) => Math.max(-M, Math.min(max + M, v));

// TopoJSON arcs → absolute [lon, lat]
const { scale, translate } = topo.transform;
const arcs = topo.arcs.map((a) => { let x = 0, y = 0; return a.map(([dx, dy]) => [(x += dx) * scale[0] + translate[0], (y += dy) * scale[1] + translate[1]]); });
const ring = (ids) => ids.flatMap((i, k) => { const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i]; return k ? a.slice(1) : a; });
let seen;
const d = (g, tol = 1.2) => {
  seen = false;
  const polys = g.type === "Polygon" ? [g.arcs] : g.type === "MultiPolygon" ? g.arcs : [];
  const out = polys.map((p) => p.map((r) => {
    const pts = []; let last = "", lx = 1e9, ly = 1e9; // drop points closer than 1.2 px to the last one
    for (const [lon, lat] of ring(r)) if (lon > LON0 - 2 && lon < LON1 + 2 && lat > LAT0 - 2 && lat < LAT1 + 2) { seen = true; break; }
    for (const [lon, lat] of ring(r)) {
      const x = clamp(px(lon), W), y = clamp(py(lat), H);
      if (Math.hypot(x - lx, y - ly) < tol) continue;
      const s = `${Math.round(x * 2) / 2},${Math.round(y * 2) / 2}`; // half-pixel precision
      if (s !== last) pts.push(s), (last = s), (lx = x), (ly = y);
    }
    return pts.length > 2 ? "M" + pts.join("L") + "Z" : "";
  }).join("")).join("");
  return seen ? out : "";
};

const MINE = { Armenia: 1, Georgia: 1, Kyrgyzstan: 1 }; // whole country
const PART = { Poland: "clip-pl", Ukraine: "clip-ua" }; // part of the country (South of Poland, West of Ukraine)
const MARKET = { Poland: 1, Ukraine: 1, Armenia: 1, Georgia: 1, Kazakhstan: 1, Kyrgyzstan: 1 };
const MARKET_SET = new Set(["Poland", "Ukraine", "Armenia", "Georgia", "Kazakhstan", "Kyrgyzstan"]);
const shapes = topo.objects.countries.geometries.map((g) => ({ name: g.properties.name, d: d(g, MARKET_SET.has(g.properties.name) ? 1 : 2.5) })).filter((s) => s.d);
const others = shapes.filter((s) => !MARKET[s.name]).map((s) => s.d);
const market = shapes.filter((s) => MARKET[s.name]);

// Labels: [text, lon, lat, anchor]
const labels = [
  ["Poland (South)", 19.4, 49.0, "middle", true], ["Ukraine (West)", 25.2, 46.6, "middle", true],
  ["Georgia", 43.6, 44.6, "middle", true], ["Armenia", 44.8, 38.6, "middle", true],
  ["Kazakhstan", 67, 48.2, "middle", false], ["Kyrgyzstan", 77.5, 39.0, "middle", true],
];

const svg = `<svg class="xp-map" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="xp-map-title" xmlns="http://www.w3.org/2000/svg">
  <title id="xp-map-title">Map of the PLECA market: my areas in yellow (South of Poland, West of Ukraine, Armenia, Georgia, Kyrgyzstan); Kazakhstan in grey</title>
  <style>
    .xp-map-sea { fill: #e3edf8; }
    .xp-map-other { fill: #fbfcfd; stroke: #d5dde8; stroke-width: 0.6; }
    .xp-map-market { fill: #dfe4ec; stroke: #ffffff; stroke-width: 0.8; }
    .xp-map-mine { fill: #fed42a; stroke: #d9a800; stroke-width: 0.8; }
    .xp-map-label { font: 600 11px Inter, system-ui, -apple-system, "Segoe UI", sans-serif; fill: #64748b; paint-order: stroke; stroke: rgba(255,255,255,0.9); stroke-width: 3px; stroke-linejoin: round; }
    .xp-map-label.is-mine { fill: #1f2937; }
  </style>
  <defs>
    <clipPath id="clip-pl"><rect x="0" y="${py(51.3).toFixed(1)}" width="${W}" height="${H}"/></clipPath>
    <clipPath id="clip-ua"><rect x="0" y="0" width="${px(27.6).toFixed(1)}" height="${py(47.7).toFixed(1)}"/></clipPath>
  </defs>
  <rect width="${W}" height="${H}" rx="14" class="xp-map-sea"/>
  <path class="xp-map-other" d="${others.join("")}"/>
${market.map((s) => `  <path class="${MINE[s.name] ? "xp-map-mine" : "xp-map-market"}" d="${s.d}"><title>${s.name}</title></path>`).join("\n")}
${market.filter((s) => PART[s.name]).map((s) => `  <path class="xp-map-mine" clip-path="url(#${PART[s.name]})" d="${s.d}"/>`).join("\n")}
${labels.map(([t, lon, lat, a, mine]) => `  <text x="${px(lon).toFixed(1)}" y="${py(lat).toFixed(1)}" text-anchor="${a}" class="xp-map-label${mine ? " is-mine" : ""}">${t}</text>`).join("\n")}
</svg>
`;
fs.mkdirSync(path.join(__dirname, "../images/maps"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "../images/maps/glovo-areas.svg"), svg);
console.log(`images/maps/glovo-areas.svg ${W}x${H}, ${(svg.length / 1024).toFixed(0)} KB`);
