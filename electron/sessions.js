"use strict";
// Claude Code session discovery + transcript decoding.
//
// Two stores are joined here, by the session UUID:
//   1. Claude Desktop store - holds the human-facing entry titles. Lives inside
//      the MSIX package sandbox, NOT in the plain %APPDATA%\Claude (that path is
//      a junction outside processes can't follow). Real path:
//        %LOCALAPPDATA%\Packages\Claude_<hash>\LocalCache\Roaming\Claude\claude-code-sessions\**\local_*.json
//      Each local_*.json carries { title, cliSessionId, cwd, lastFocusedAt, … }.
//   2. Transcript store - the actual conversation, keyed by UUID:
//        ~/.claude/projects/<encoded-cwd>/<cliSessionId>.jsonl
//
// The <hash> is the package-publisher hash; never hardcode it - we glob Claude_*.

const fs   = require("fs");
const path = require("path");
const os   = require("os");
const { execFileSync } = require("child_process");

// ── Store discovery ──────────────────────────────────────────────────────────
// Find the Claude Desktop data dir. Prefer the MSIX package sandbox; fall back to
// a classic (non-packaged) install at %APPDATA%\Claude. We pick the candidate that
// actually contains claude-code-sessions/ so we never guess the publisher hash.
function findClaudeDataDir() {
  const candidates = [];
  const localAppData = process.env.LOCALAPPDATA;
  if (localAppData) {
    const pkgRoot = path.join(localAppData, "Packages");
    try {
      for (const name of fs.readdirSync(pkgRoot)) {
        if (name.startsWith("Claude_")) {
          candidates.push(path.join(pkgRoot, name, "LocalCache", "Roaming", "Claude"));
        }
      }
    } catch { /* no Packages dir - not an MSIX install */ }
  }
  if (process.env.APPDATA) candidates.push(path.join(process.env.APPDATA, "Claude"));
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, "claude-code-sessions"))) return dir;
  }
  return null;
}

// ── Transcript index ─────────────────────────────────────────────────────────
// Map cliSessionId → .jsonl path by scanning every project folder once. Keyed by
// UUID, so we don't need to re-derive the cwd→folder encoding Claude Code uses.
function indexTranscripts() {
  const root = path.join(os.homedir(), ".claude", "projects");
  const map = new Map();
  let projects;
  try { projects = fs.readdirSync(root, { withFileTypes: true }); } catch { return map; }
  for (const p of projects) {
    if (!p.isDirectory()) continue;
    const dir = path.join(root, p.name);
    let files;
    try { files = fs.readdirSync(dir); } catch { continue; }
    for (const f of files) {
      if (f.endsWith(".jsonl")) map.set(f.slice(0, -6), path.join(dir, f));
    }
  }
  return map;
}

function findTranscript(id) {
  if (!id) return null;
  // Windows store first (local, fast); only scan the WSL shares if it's not a Windows id.
  return indexTranscripts().get(id) || indexWslTranscripts().get(id) || null;
}

// Read only the first `bytes` of a file - transcripts can be multi-MB, but a list
// row needs metadata from the opening lines, so never load the whole thing here.
function readHead(file, bytes = 65536) {
  let fd;
  try { fd = fs.openSync(file, "r"); } catch { return ""; }
  try {
    const buf = Buffer.alloc(bytes);
    const n = fs.readSync(fd, buf, 0, bytes, 0);
    return buf.toString("utf8", 0, n);
  } catch { return ""; }
  finally { try { fs.closeSync(fd); } catch { /* already closed */ } }
}

// Derive a list row from a transcript that has NO Desktop entry (a "lost" session -
// see the orphan pass in listSessions). Desktop holds no title, so we take the first
// user message - the same field Claude Code itself titles sessions from. Title, cwd,
// and first timestamp all appear in the opening lines, so the head suffices.
function transcriptMeta(file) {
  const head = readHead(file);
  if (!head) return null;
  let title = "", cwd = "", firstTs = null;
  for (const line of head.split(/\r?\n/)) {
    if (!line) continue;
    let obj; try { obj = JSON.parse(line); } catch { continue; } // trailing line may be cut - skip it
    if (!cwd && obj.cwd) cwd = obj.cwd;
    if (!firstTs && obj.timestamp) firstTs = obj.timestamp;
    if (!title && obj.type === "user" && !obj.isMeta && obj.message) {
      let c = obj.message.content;
      if (Array.isArray(c)) c = c.map(x => (typeof x === "string" ? x : (x && x.type === "text" ? x.text : ""))).join(" ");
      if (typeof c === "string") title = c.replace(/\s+/g, " ").trim();
    }
    if (title && cwd && firstTs) break;
  }
  if (title.length > 100) title = title.slice(0, 99) + "…";
  return { title: title || "(untitled)", cwd, firstTs };
}

// Build a list row from a bare transcript (no Desktop entry to borrow a title from):
// title comes from the first user message, recency from the file mtime. `extra` carries
// the row's provenance (origin + source). Shared by the lost-session and WSL passes.
function transcriptRow(id, file, extra) {
  const meta = transcriptMeta(file);
  if (!meta) return null;
  let mtime = 0;
  try { mtime = fs.statSync(file).mtimeMs; } catch { /* unreadable - fall back to ts */ }
  const ts = (meta.firstTs && Date.parse(meta.firstTs)) || 0;
  return {
    cliSessionId:   id,
    title:          meta.title,
    titleSource:    "",
    cwd:            meta.cwd,
    model:          "",
    isArchived:     false,
    completedTurns: 0,
    lastFocusedAt:  mtime || ts,
    createdAt:      ts,
    ...extra,
  };
}

// ── WSL CLI sessions ─────────────────────────────────────────────────────────
// Claude Code run *inside* WSL writes transcripts to the Linux ~/.claude - a separate
// store from the Windows one. Windows reaches it over the \\wsl.localhost\ share:
//   \\wsl.localhost\<distro>\home\<user>\.claude\projects\**\<uuid>.jsonl  (+ \root\.claude)
// There is no Desktop store on the WSL side, so every transcript is a genuine CLI
// session - surfaced, titled from its first message, tagged with its distro as `source`.
// Everything is wrapped in try/catch so a stopped/absent WSL, or Docker's internal
// distros (which have no .claude), can never break the Windows listing.
// ⚠ CLAUDE: discover distros with `wsl.exe --list --running --quiet`, NOT by readdir on
// \\wsl.localhost\ - the share root isn't reliably enumerable (Explorer uses a shell
// extension, plain readdir ENOENTs). "running" only, on purpose: it skips Docker's
// internal distros and never cold-starts a stopped one. A stopped distro's sessions
// simply don't show until it's running - acceptable for v1. Do NOT switch to scanning
// all distros without handling the cold-start cost.
const WSL_ROOT = "\\\\wsl.localhost\\";

// Names of currently-running WSL distros. wsl.exe emits UTF-16LE, one name per line.
// Returns [] if wsl isn't installed / not on PATH (e.g. no WSL at all).
function runningWslDistros() {
  let buf;
  try { buf = execFileSync("wsl.exe", ["--list", "--running", "--quiet"], { windowsHide: true }); }
  catch { return []; }
  return buf.toString("utf16le").split(/\r?\n/).map(s => s.replace(/\0/g, "").trim()).filter(Boolean);
}

function wslHomeRoots(distro) {
  const roots = [];
  try {
    const homeDir = path.join(WSL_ROOT, distro, "home");
    for (const u of fs.readdirSync(homeDir, { withFileTypes: true }))
      if (u.isDirectory()) roots.push(path.join(homeDir, u.name));
  } catch { /* no /home in this distro */ }
  roots.push(path.join(WSL_ROOT, distro, "root")); // sessions run as root
  return roots;
}

// Call fn(distro, uuid, file) for every WSL transcript across all running distros and users.
function eachWslTranscript(fn) {
  for (const distro of runningWslDistros()) {
    for (const home of wslHomeRoots(distro)) {
      const projects = path.join(home, ".claude", "projects");
      let projDirs;
      try { projDirs = fs.readdirSync(projects, { withFileTypes: true }); } catch { continue; }
      for (const pd of projDirs) {
        if (!pd.isDirectory()) continue;
        const dir = path.join(projects, pd.name);
        let files;
        try { files = fs.readdirSync(dir); } catch { continue; }
        for (const f of files) if (f.endsWith(".jsonl")) fn(distro, f.slice(0, -6), path.join(dir, f));
      }
    }
  }
}

function indexWslTranscripts() {
  const map = new Map();
  eachWslTranscript((_distro, id, file) => map.set(id, file));
  return map;
}

function listWslSessions() {
  const out = [];
  eachWslTranscript((distro, id, file) => {
    const row = transcriptRow(id, file, { origin: "cli", source: distro });
    if (row) out.push(row);
  });
  return out;
}

// ── List sessions (the left pane) ────────────────────────────────────────────
function listSessions() {
  const dataDir = findClaudeDataDir();
  if (!dataDir) return { ok: false, error: "no-data-dir", sessions: [] };

  const tIndex = indexTranscripts();
  const out = [];
  const seen = new Set(); // entry UUIDs joined to a transcript - the lost-session pass skips these

  (function walk(dir) {
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) { walk(full); continue; }
      if (!e.name.startsWith("local_") || !e.name.endsWith(".json")) continue;
      let d;
      try { d = JSON.parse(fs.readFileSync(full, "utf8")); } catch { continue; }
      const id = d.cliSessionId || "";
      // ⚠ CLAUDE: hide every session whose .jsonl is gone. Claude Code prunes
      // transcripts after ~30 days (cleanupPeriodDays, default 30) while Claude
      // Desktop keeps the title forever - but a title with no transcript can never
      // be viewed OR recovered, so it's pure noise and is not listed at all. This
      // also drops never-ran sessions (no transcript was ever written). Do NOT
      // re-add a greyed "expired" row - the user decided unrecoverable = hidden.
      if (!tIndex.has(id)) continue;
      seen.add(id);
      out.push({
        cliSessionId:   id,
        title:          d.title || "(untitled)",
        titleSource:    d.titleSource || "",
        cwd:            d.cwd || d.originCwd || "",
        model:          d.model || "",
        isArchived:     !!d.isArchived,
        completedTurns: d.completedTurns || 0,
        lastFocusedAt:  d.lastFocusedAt || d.lastActivityAt || d.createdAt || 0,
        createdAt:      d.createdAt || 0,
        origin:         "desktop",
        source:         "Windows",
      });
    }
  })(path.join(dataDir, "claude-code-sessions"));

  // ── Lost sessions - transcript with no Desktop entry ─────────────────────────
  // The .jsonl exists but no local_*.json references its UUID, so the join above
  // can't see it. Cause is unknown and NOT necessarily a CLI launch - the transcript
  // metadata is identical to entry-backed ones (userType "external" either way), so
  // these are most likely Desktop sessions whose entry was lost (a Desktop-side bug
  // or deletion). Surface each anyway, titled from its first user message, tagged
  // origin:"lost" so the UI can mark it. Without this pass they'd be invisible.
  for (const [id, file] of tIndex) {
    if (seen.has(id)) continue;
    const row = transcriptRow(id, file, { origin: "lost", source: "Windows" });
    if (row) out.push(row);
  }

  // ── WSL CLI sessions - the Linux-side store, reached over \\wsl.localhost\ ────
  out.push(...listWslSessions());

  out.sort((a, b) => b.lastFocusedAt - a.lastFocusedAt);
  return { ok: true, dataDir, sessions: out };
}

// ── Transcript → clean Markdown (the right pane) ──────────────────────────────
function truncate(s, n) {
  if (s.length <= n) return s;
  return s.slice(0, n) + `\n… [truncated ${s.length - n} chars]`;
}
function fence(lang, body) { return "```" + lang + "\n" + body + "\n```"; }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

// Pick the single most telling field of a tool call for the one-line summary (plain text).
function toolSummary(input) {
  if (!input || typeof input !== "object") return "";
  for (const k of ["file_path", "path", "command", "pattern", "url", "query", "prompt", "description"]) {
    if (input[k]) return truncate(String(input[k]).replace(/\s+/g, " "), 120);
  }
  return "";
}

// Flatten a tool_result block's content to plain text.
function resultText(block) {
  const c = block.content;
  if (Array.isArray(c)) return c.map(x => (typeof x === "string" ? x : (x && x.text) || "")).join("\n");
  if (typeof c === "string") return c;
  return JSON.stringify(c);
}

// A tool call rendered as a native <details>: summary line always shown, the verbose
// input - and the tool's own answer (its result) - folded together until expanded.
// ⚠ CLAUDE: the result IS the tool's output, so it lives INSIDE the call's <details>,
// matched by tool_use_id. Do not re-add a separate "result" message/toggle.
// Raw HTML on purpose - DOMPurify keeps <details>/<summary> (ADD_TAGS) and injects `open`
// post-sanitize for the global toggle. A ```fence``` can't fold, which is the whole point.
function toolDetails(name, summary, inputJson, result) {
  const sum = summary ? ` - <code>${esc(summary)}</code>` : "";
  let body = `<pre><code>${esc(inputJson)}</code></pre>`;
  if (result && result.text.trim()) {
    body += `<div class="tool-out${result.is_error ? " tool-err" : ""}">` +
            `<pre><code>${esc(truncate(result.text, 1500))}</code></pre></div>`;
  }
  return `<details class="tool-call"><summary><b>${esc(name)}</b>${sum}</summary>\n\n${body}</details>`;
}

// `resultById` maps tool_use_id → { text, is_error } so a tool_use can fold in its answer.
function blockToMd(block, resultById) {
  if (typeof block === "string") return block;
  if (!block || typeof block !== "object") return "";
  switch (block.type) {
    case "text":
      return block.text || "";
    case "thinking": {
      // ⚠ CLAUDE: Claude Code transcripts store only the encrypted `signature` of a thinking
      // block, never the prose - `block.thinking` is always "". Emit nothing rather than an
      // empty "*thinking*" blockquote. Don't "fix" this by rendering the signature; it's opaque.
      const txt = (block.thinking || "").trim();
      if (!txt) return "";
      return "> *thinking*\n>\n" + txt.split("\n").map(l => "> " + l).join("\n");
    }
    case "image": {
      // Embed the actual image. Transcripts store screenshots as base64 (source.type "base64");
      // a data: URI renders inline in the view (DOMPurify allows data: on <img> by default) and
      // travels with the exported .md. `url` sources (rare) are linked as-is.
      const s = block.source || {};
      if (s.type === "base64" && s.data) return `![image](data:${s.media_type || "image/png"};base64,${s.data})`;
      if (s.type === "url" && s.url) return `![image](${s.url})`;
      return "_[image]_";
    }
    case "tool_use": {
      const name = block.name || "tool";
      const input = truncate(JSON.stringify(block.input || {}, null, 2), 1200);
      return toolDetails(name, toolSummary(block.input), input, resultById && resultById.get(block.id));
    }
    case "tool_result":
      return ""; // merged into its tool_use's <details> (by tool_use_id) - never rendered standalone
    default:
      return fence("json", truncate(JSON.stringify(block), 600));
  }
}

function decodeTranscript(id) {
  const file = findTranscript(id);
  if (!file) return { ok: false, error: "not-found" };
  let raw;
  try { raw = fs.readFileSync(file, "utf8"); } catch { return { ok: false, error: "read-failed" }; }

  const lines = raw.split(/\r?\n/).filter(Boolean);
  const parsed = [];     // pre-parsed user/assistant turns, reused by both passes
  const resultById = new Map(); // tool_use_id → { text, is_error } - folded into the matching call
  let summary = null, firstTs = null, lastTs = null, userTurns = 0;

  // Pass 1 - parse, index tool_results by id so each tool_use can fold in its own answer.
  for (const line of lines) {
    let obj;
    try { obj = JSON.parse(line); } catch { continue; }
    if (obj.timestamp) { if (!firstTs) firstTs = obj.timestamp; lastTs = obj.timestamp; }
    if (obj.type === "summary" && obj.summary) { summary = obj.summary; continue; }
    if (obj.type !== "user" && obj.type !== "assistant") continue; // skip queue-ops / snapshots / meta
    if (obj.isMeta) continue;

    const msg = obj.message;
    if (!msg) continue;
    const role = msg.role || obj.type;
    let content = msg.content;
    if (typeof content === "string") content = [{ type: "text", text: content }];
    if (!Array.isArray(content)) continue;

    for (const b of content) {
      if (b && b.type === "tool_result" && b.tool_use_id) {
        resultById.set(b.tool_use_id, { text: resultText(b), is_error: !!b.is_error });
      }
    }
    parsed.push({ role, content });
  }

  const segs = [];       // export segments: { md, tool } - `tool` = tool-only message (no prose)
  const messages = [];   // in-app chat rendering - { role, md }, role drives the bubble (no inline label)
  let lastExportRole = null; // emit a "### Claude" heading once per assistant run, not per message

  // Pass 2 - render. tool_results are now merged into their call, so a user turn made
  // entirely of them is pure plumbing and is dropped.
  for (const { role, content } of parsed) {
    const onlyToolResults = role === "user" && content.length > 0 && content.every(b => b && b.type === "tool_result");
    if (onlyToolResults) continue;
    if (role === "user") userTurns++;

    const body = content.map(b => blockToMd(b, resultById)).filter(s => s && s.trim()).join("\n\n");
    if (!body.trim()) continue;

    // Export heading: "### User" each user turn; "### Claude" only at the START of an assistant
    // run (a turn often spans many assistant/tool messages - don't repeat the label on each).
    const continuation = role === "assistant" && lastExportRole === "assistant";
    const heading = role === "assistant" ? "### Claude" : "### User";
    const tool = !content.some(b => b && b.type === "text" && (b.text || "").trim()); // tool-only message
    segs.push({ md: continuation ? body : heading + "\n\n" + body, tool });
    lastExportRole = role;

    messages.push({ role, md: body });     // chat view: role → bubble, no inline label
  }

  // Join segments with a `---` rule between them - EXCEPT between two consecutive tool-only
  // messages (a run of tool calls reads as one list, no rules; the rule stays between Claude's
  // prose answer and its tools, and at every User/Claude turn boundary).
  let markdown = "";
  for (let i = 0; i < segs.length; i++) {
    if (i > 0) markdown += (segs[i - 1].tool && segs[i].tool) ? "\n\n" : "\n\n---\n\n";
    markdown += segs[i].md;
  }

  return {
    ok: true,
    markdown,
    messages,
    meta: { summary, firstTs, lastTs, userTurns, file, lines: lines.length },
  };
}

module.exports = { findClaudeDataDir, listSessions, findTranscript, decodeTranscript };
