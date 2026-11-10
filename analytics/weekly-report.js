// Weekly traffic report from the GA4 Data API (Platform & Data agent, 10 Nov 2026).
// Per ISO week (Monday to Sunday): unique visitors, sessions, page views, and page views per section
// (Home · Experiences · Projects · Education · Contact = the content_group set by analytics.js).
//
// Setup (once):
//   1. In analytics/config.json, set "propertyId" (GA4 > Admin > Property details > PROPERTY ID, numbers only).
//   2. Service account key: Google Cloud console, project remi-degand-cv > IAM > Service accounts > create
//      "ga4-reader" > Keys > Add key (JSON) > save it as analytics/service-account.json (git-ignored, never commit it).
//   3. GA4 > Admin > Property access management > add the service account's e-mail as "Viewer".
//   4. Enable "Google Analytics Data API" on the project, then: cd analytics && npm install
// Run:  node analytics/weekly-report.js            (last 8 weeks)
//       node analytics/weekly-report.js 12         (last 12 weeks)
// Writes analytics/reports/weekly-<date>.csv (git-ignored, the data are about visitors) and prints a table.
//
// Note: only visitors who clicked "Accept" on the cookie banner are counted (consent first, basic mode).
const fs = require("fs");
const path = require("path");
const { BetaAnalyticsDataClient } = require("@google-analytics/data");

const DIR = __dirname;
const { propertyId } = JSON.parse(fs.readFileSync(path.join(DIR, "config.json"), "utf8"));
if (!propertyId) { console.error("Set propertyId in analytics/config.json first."); process.exit(1); }
const keyFile = path.join(DIR, "service-account.json");
const { GoogleAuth, JWT } = require("google-auth-library");   // comes with @google-analytics/data
const key = fs.existsSync(keyFile) ? JSON.parse(fs.readFileSync(keyFile, "utf8")) : null;
const client = new BetaAnalyticsDataClient(key
  ? { auth: new GoogleAuth({ authClient: new JWT({ email: key.client_email, key: key.private_key, scopes: ["https://www.googleapis.com/auth/analytics.readonly"] }) }) }
  : {});

const WEEKS = Math.max(1, parseInt(process.argv[2], 10) || 8);
const SECTIONS = ["Home", "Experiences", "Projects", "Education", "Contact"];

// Monday of the current week, minus (WEEKS - 1) weeks
const iso = (d) => d.toISOString().slice(0, 10);
const today = new Date();
const monday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7) - 7 * (WEEKS - 1));
const dateRanges = [{ startDate: iso(monday), endDate: "today" }];

// "202645" -> Monday date of ISO week 45 of 2026
const weekStart = (yw) => {
  const y = +yw.slice(0, 4), w = +yw.slice(4);
  const jan4 = new Date(Date.UTC(y, 0, 4));
  const d = new Date(jan4);
  d.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() + 6) % 7) + 7 * (w - 1));
  return iso(d);
};

const run = (dimensions, metrics) => client.runReport({
  property: `properties/${propertyId}`,
  dateRanges,
  dimensions: dimensions.map((name) => ({ name })),
  metrics: metrics.map((name) => ({ name })),
  limit: 10000,
}).then(([r]) => r.rows || []);

(async () => {
  const [totals, bySection] = await Promise.all([
    run(["isoYearIsoWeek"], ["totalUsers", "sessions", "screenPageViews"]),
    run(["isoYearIsoWeek", "contentGroup"], ["screenPageViews"]),
  ]);

  const weeks = new Map();
  const row = (yw) => {
    if (!weeks.has(yw)) weeks.set(yw, { week: `${yw.slice(0, 4)}-W${yw.slice(4)}`, from: weekStart(yw), visitors: 0, sessions: 0, views: 0, ...Object.fromEntries(SECTIONS.map((s) => [s, 0])), Other: 0 });
    return weeks.get(yw);
  };
  for (const r of totals) {
    const w = row(r.dimensionValues[0].value);
    [w.visitors, w.sessions, w.views] = r.metricValues.map((m) => +m.value);
  }
  for (const r of bySection) {
    const w = row(r.dimensionValues[0].value);
    const g = r.dimensionValues[1].value;
    w[SECTIONS.includes(g) ? g : "Other"] += +r.metricValues[0].value;
  }

  const list = [...weeks.keys()].sort().map((k) => weeks.get(k));
  if (!list.length) { console.log(`No data yet for the last ${WEEKS} weeks (since ${iso(monday)}).`); return; }
  const currentWeek = list.length && list[list.length - 1].from === iso(new Date(monday.getTime() + 7 * 864e5 * (WEEKS - 1)));
  if (currentWeek) list[list.length - 1].week += " (so far)";

  const cols = ["week", "from", "visitors", "sessions", "views", ...SECTIONS, "Other"];
  const head = { week: "Week", from: "Starts", visitors: "Unique visitors", sessions: "Sessions", views: "Page views" };
  console.table(list.map((w) => Object.fromEntries(cols.map((c) => [head[c] || c, w[c]]))));

  fs.mkdirSync(path.join(DIR, "reports"), { recursive: true });
  const csv = [cols.map((c) => head[c] || c).join(","), ...list.map((w) => cols.map((c) => w[c]).join(","))].join("\n");
  const out = path.join(DIR, "reports", `weekly-${iso(new Date())}.csv`);
  fs.writeFileSync(out, csv + "\n");
  console.log("Saved", path.relative(process.cwd(), out));
})().catch((e) => { console.error(e.message || e); process.exit(1); });
