# Claude Code Helper

Browse and re-read every Claude Code session on your machine - from Windows and WSL - in one searchable place.

---

## What it is

Claude Code stores its sessions in hidden, per-environment locations: a sandboxed Windows app store, and a separate store inside each WSL distribution. Finding and re-reading an old conversation means knowing where those live and reading raw `.jsonl` transcripts by hand.

Claude Code Helper surfaces them all into one window. A two-pane viewer lists every session - merged from Windows and each running WSL distro, sorted by recency - and renders the selected transcript as a clean, Claude-style chat. It is strictly **read-only**: it reads the stores and never renames, edits, or deletes anything.

---

## Features

- **Every session, one place** - surfaces all your Claude Code conversations from their hidden Windows and per-WSL-distro stores into a single searchable list.
- **Readable chat, not raw JSON** - renders each transcript as a Claude-style chat, with tool calls folded into collapsible blocks and images shown inline.
- **Finds sessions Claude loses** - recovers "Lost" transcripts that have no Desktop entry, titled from their first message, instead of leaving them invisible.
- **See and filter by source** - source badges and one-click chips show or hide sessions by where they live (Windows or a specific distro) and by Active, Archived, or Lost.
- **Export as standalone Markdown** - copy or save any conversation as a self-contained Markdown file, images embedded, that opens anywhere without the app.
- **Never touches your sessions** - strictly read-only; it reads the Claude stores and never modifies them.

---

## Download

Pre-built installers are available on the [Releases](../../releases) page (Windows `.exe`, macOS `.dmg`, Linux `.AppImage`).

> **Windows note:** SmartScreen may warn on first launch because the app is not code-signed. Click "More info", then "Run anyway".

---

## Build from source

```bash
npm install
npm run electron:dev   # React + Electron together (dev)
```

Requires Node.js 20 or newer (CI builds on Node 24).

```bash
npm run dist        # Windows x64 installer
npm run dist:mac    # macOS DMG
npm run dist:linux  # Linux AppImage
```

---

## Overview
Claude Code Helper is an Electron app: a React renderer over an Electron main process that runs a small local Express server. There is no database - it reads the Claude Code stores directly on each launch and holds nothing of its own beyond a little UI state in `localStorage`.

### Two panes

- **Left** - the session list, merged from every store and sorted by recency. Every row carries a **source** badge: Windows, or the name of a WSL distribution.
- **Right** - the selected session's transcript, decoded from its `.jsonl` file into a Claude-style chat (rendered with `marked` + DOMPurify).

### Where sessions come from

Sessions are gathered by passes over two kinds of store and merged into one list. The **source** badge on each row names the store it came from:

- **Windows** - sessions read from the Claude desktop app's sandboxed Windows store, each with a human-readable title.
- **WSL** - genuine CLI sessions run inside a WSL distribution, whose transcripts live in the Linux home directory, a store entirely separate from the Windows one. Each running distribution contributes its sessions, titled from the first user message.

A Windows transcript with **no** matching Desktop entry (a Desktop-side bug or deletion) would otherwise be invisible. A recovery pass surfaces it as a **Lost** session, titled from its first message. Lost is a category, shown alongside **Active** and **Archived**, not a separate store; its source badge is still Windows.

### The join

The Windows side has two halves - a list of session *entries* (with titles) and the *transcript* files themselves - which are joined by the session's UUID. An entry whose transcript is gone is dropped; a transcript with no entry becomes a **Lost** row. WSL transcripts are surfaced directly, since no entry store exists there.

### Transcript decoding

A transcript's `.jsonl` is decoded to Markdown: a tool call and its result are folded into one collapsible block (the result *is* the call's answer), images are embedded inline as data URIs, and oversized blobs are truncated so a long session stays renderable. The same decoder produces both the in-app chat bubbles and the standalone export document.

### Tech stack

| Layer | Technology |
|-------|-----------|
| UI framework | React 19 |
| Bundler | Vite 8 |
| Desktop shell | Electron 41 |
| Local API | Express 5 |
| Markdown render | marked + DOMPurify |
| Packaging | Electron Builder |

---

## License / links
Claude Code Helper is part of [yaiol Applications](https://apps.yaiol.com).

Released under the [MIT License](LICENSE).
