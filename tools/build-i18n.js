// French version: builds the dictionary files the pages load (9 Nov 2026, general agent).
//   node tools/build-i18n.js                     extract the texts of every page, write i18n/fr/*.js, list what is missing
//   node tools/build-i18n.js --merge <file>      add the French of a todo file (blocks "@@ <n>" + French), then build
// Source of truth: i18n/fr.json = { "English text or HTML": "French" } ("" = keep the English, e.g. names).
// The page texts are read in headless Chrome (page opened with ?i18n=extract, see i18n.js), the script texts from the
// t("…") calls of the JS files. Output:
//   i18n/fr/common.js       script texts + texts found on every page (menu, footer…)
//   i18n/fr/<page>.js       the other texts of each page
//   i18n/todo.txt / .json   texts with no French yet (numbered blocks), to translate and --merge
// Run it after every change of an English text: a text whose English changed is no longer found, so it shows in English.
const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "i18n");
const MASTER = path.join(DIR, "fr.json");
const TODO_TXT = path.join(DIR, "todo.txt");
const TODO_JSON = path.join(DIR, "todo.json");
const CHROME = ["C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"].find((p) => fs.existsSync(p));
const SCRIPTS = ["script.js", "chatbot.js", "home.js", "contact.js", "education-fx.js", "experience-fx.js",
  "projects-fx.js", "project-fx.js", "lang.js"];

const master = fs.existsSync(MASTER) ? JSON.parse(fs.readFileSync(MASTER, "utf8")) : {};
const sorted = (o) => Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]));
const saveMaster = () => fs.writeFileSync(MASTER, JSON.stringify(sorted(master), null, 1) + "\n");

// --merge: blocks "@@ <n>" then the French (may span several lines)
const mi = process.argv.indexOf("--merge");
if (mi > 0) {
  const ids = JSON.parse(fs.readFileSync(TODO_JSON, "utf8"));
  const text = fs.readFileSync(process.argv[mi + 1], "utf8").replace(/\r\n/g, "\n");
  let n = 0;
  for (const block of text.split(/^@@ /m).slice(1)) {
    const m = block.match(/^(\d+)[^\n]*\n([\s\S]*)$/);
    if (!m || !(m[1] in ids)) { console.warn("Unknown block:", block.slice(0, 40)); continue; }
    // "=" keeps the English (names…); French spacing: no-break space before : ; ! ? and inside « »
    const fr = m[2].trim().replace(/\s*\n\s*/g, " ");
    master[ids[m[1]]] = fr === "=" ? "" : fr.replace(/ ([:;!?»])/g, " $1").replace(/« /g, "« ");
    n++;
  }
  saveMaster();
  console.log(`Merged ${n} translations into i18n/fr.json`);
}

// 1. Texts of the scripts: t("…"), t('…'), t(`…`) with no ${}
const jsKeys = new Set();
for (const f of SCRIPTS) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) continue;
  const src = fs.readFileSync(p, "utf8");
  for (const m of src.matchAll(/\btr?\(\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\$])*`)/g)) {
    jsKeys.add(Function(`return ${m[1]}`)());
  }
}

// 2. Texts of the pages, read in headless Chrome
const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html")).sort();
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "i18n-chrome-"));
const perPage = {};
for (const page of pages) {
  const url = "file:///" + path.join(ROOT, page).replace(/\\/g, "/") + "?i18n=extract";
  const dom = execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${profile}`,
    "--virtual-time-budget=3000", "--dump-dom", url], { encoding: "utf8", maxBuffer: 64 << 20, stdio: ["ignore", "pipe", "ignore"] });
  const m = dom.match(/<script type="application\/json" id="i18n-dump">([\s\S]*?)<\/script>/);
  if (!m) { console.warn(`No texts found on ${page} (are the i18n scripts on the page?)`); perPage[page] = []; continue; }
  perPage[page] = JSON.parse(m[1]).map((x) => x.key);
}
try { fs.rmSync(profile, { recursive: true, force: true }); } catch { /* Chrome may still hold it */ }

// 3. Dictionary files
const onEvery = new Set(Object.values(perPage).reduce((a, b) => a.filter((k) => b.includes(k))));
const commonKeys = new Set([...jsKeys, ...onEvery]);
const pick = (keys) => Object.fromEntries([...keys].filter((k) => master[k]).sort().map((k) => [k, master[k]]));
const write = (name, keys, note) => {
  const body = JSON.stringify(pick(keys), null, 1);
  fs.mkdirSync(path.join(DIR, "fr"), { recursive: true });
  fs.writeFileSync(path.join(DIR, "fr", name + ".js"),
    `// Built by tools/build-i18n.js from i18n/fr.json: don't edit by hand. ${note}\n` +
    `Object.assign((window.I18N_FR = window.I18N_FR || {}), ${body});\n`);
};
write("common", commonKeys, "Texts of the scripts and of every page.");
for (const page of pages) write(page.replace(/\.html$/, ""), perPage[page].filter((k) => !commonKeys.has(k)), `Texts of ${page}.`);

// 4. What is missing, what is no longer used
const where = new Map();
for (const k of jsKeys) where.set(k, ["scripts"]);
for (const [page, keys] of Object.entries(perPage)) for (const k of keys) where.set(k, [...(where.get(k) || []), page]);
const missing = [...where.keys()].filter((k) => !(k in master));
const ids = {};
let txt = "";
missing.forEach((k, i) => {
  const w = where.get(k);
  ids[i + 1] = k;
  txt += `@@ ${i + 1} ${w.length > 3 ? w.length + " pages" : w.join(", ")}\n${k}\n\n`;
});
fs.writeFileSync(TODO_TXT, txt);
fs.writeFileSync(TODO_JSON, JSON.stringify(ids, null, 1));
const unused = Object.keys(master).filter((k) => !where.has(k));
console.log(`${pages.length} pages, ${where.size} texts, ${where.size - missing.length} translated, ${missing.length} missing (i18n/todo.txt).`);
if (unused.length) console.log(`${unused.length} French texts no longer used on the site (English changed?):\n  ` + unused.map((k) => k.slice(0, 90)).join("\n  "));
