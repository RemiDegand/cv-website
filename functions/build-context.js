// Builds functions/context.txt: everything Ada (the chatbot) knows about Rémi.
// Run before every functions deploy (firebase.json "predeploy" does it).
// Sources: knowledge/projects/*.md (without "Open questions" and sources) + the visible text of the site pages.
// Only public, confirmed facts go in: never add private figures here (see docs/CV website.md).
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const out = [];

// 1. Project knowledge files
const kDir = path.join(ROOT, "knowledge", "projects");
for (const file of fs.readdirSync(kDir).filter((f) => f.endsWith(".md")).sort()) {
  let md = fs.readFileSync(path.join(kDir, file), "utf8").replace(/\r/g, "");
  const fm = (md.match(/^---\n([\s\S]*?)\n---\n/) || [])[1] || "";
  md = md.replace(/^---\n[\s\S]*?\n---\n/, "");
  md = md.replace(/\n## Open questions[\s\S]*?(?=\n## |\s*$)/, "\n");     // unconfirmed points stay out
  const keep = fm.split("\n").filter((l) => /^(title|company|industry|experience|on_site|page|tools):/.test(l)).join("\n");
  out.push(`### PROJECT FILE: ${file}\n${keep}\n${md.trim()}`);
}

// 2. Visible text of the site pages (public anyway), without the simulations (made-up data, see the notes)
const SIM = /class="[^"]*\b(monitor|adj-sim|copy-sim|paste-sim|project-shot)\b[^"]*"/;
function dropBlocks(html) {
  const tag = /<(\/?)(div|figure)\b[^>]*>/gi;
  let res = "", from = 0, m;
  while ((m = tag.exec(html))) {
    if (m[1] || !SIM.test(m[0])) continue;
    let depth = 1, end = html.length, n;
    const inner = new RegExp(`<(/?)${m[2]}\\b[^>]*>`, "gi");
    inner.lastIndex = tag.lastIndex;
    while ((n = inner.exec(html))) { depth += n[1] ? -1 : 1; if (!depth) { end = inner.lastIndex; break; } }
    res += html.slice(from, m.index) + "\n";
    from = tag.lastIndex = end;
  }
  return res + html.slice(from);
}
const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html")).sort();
for (const page of pages) {
  let html = dropBlocks(fs.readFileSync(path.join(ROOT, page), "utf8"));
  html = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|svg|header|footer|noscript)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(br|\/p|\/li|\/h\d|\/div|\/tr|\/section)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ").replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&rarr;/g, "→").replace(/&middot;/g, "·");
  // Keep sentences, drop the labels and made-up numbers of the simulations (short lines, mostly digits)
  const seen = new Set();
  const text = html.split("\n").map((l) => l.replace(/\s+/g, " ").trim())
    .filter((l) => l.split(" ").length >= 3 && (l.match(/[0-9%.,+−-]/g) || []).length / l.length < 0.35)
    .filter((l) => !seen.has(l) && seen.add(l))
    .join("\n");
  out.push(`### SITE PAGE: ${page}\n${text}`);
}

const context = out.join("\n\n");
fs.writeFileSync(path.join(__dirname, "context.txt"), context);
console.log(`context.txt: ${context.split(/\s+/).length} words, ${pages.length} pages`);
