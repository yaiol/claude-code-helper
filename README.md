<p align="center">
  <img src="docs/assets/logo.png" alt="Claude Code Helper" width="110" height="110">
</p>

<h1 align="center">Claude Code Helper</h1>

<div align="center">
  <strong>Every Claude Code session, in one searchable place.</strong><br>
  Windows and WSL stores merged, transcripts rendered as readable chat, exportable as standalone Markdown.
</div>

<br>

<!-- readme:nav -->

<div align="center">
  <a href="../../releases/latest"><img src="https://img.shields.io/github/v/release/yaiol/claude-code-helper?color=5a4fff&label=release&style=flat-square" alt="Release"></a>
  <a href="../../releases"><img src="https://img.shields.io/github/downloads/yaiol/claude-code-helper/total?color=5a4fff&label=downloads&style=flat-square" alt="Downloads"></a>
</div>

<h3 align="center">
  <a href="https://apps.yaiol.com/en/p/claude-code-helper/">Website</a>
  <span>&nbsp;·&nbsp;</span>
  <a href="#install">Install</a>
  <span>&nbsp;·&nbsp;</span>
  <a href="#what-it-is">Features</a>
  <span>&nbsp;·&nbsp;</span>
  <a href="#documentation">Documentation</a>
  <span>&nbsp;·&nbsp;</span>
  <a href="#build-from-source">Development</a>
</h3>

<div align="center">
  <sub><a href="https://apps.yaiol.com/en/p/claude-code-helper/help/"><b>Help in 28 languages</b></a></sub>
</div>

<!-- /readme:nav -->

---

<p align="center">
  <img src="docs/assets/hero.png" alt="Claude Code Helper listing sessions beside a rendered transcript" width="900">
</p>

---

## Install

| Windows | macOS | Linux |
|:---:|:---:|:---:|
| [![Windows](https://img.shields.io/badge/Windows-.exe-5a4fff?style=for-the-badge&logo=windows&logoColor=white)](../../releases/latest) | [![macOS](https://img.shields.io/badge/macOS-.dmg-5a4fff?style=for-the-badge&logo=apple&logoColor=white)](../../releases/latest) | [![Linux](https://img.shields.io/badge/Linux-.AppImage-5a4fff?style=for-the-badge&logo=linux&logoColor=white)](../../releases/latest) |
| x64 installer | Intel and Apple Silicon | portable AppImage |

> **Windows note:** SmartScreen may warn on first launch because the app is not code-signed. Click "More info", then "Run anyway".

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

## Documentation

| | |
|---|---|
| **User manual** | [Read it online](https://apps.yaiol.com/en/p/claude-code-helper/help/) |
| **Printable PDF** | attached to each [release](../../releases/latest) |
| **What's new** | [Release notes](https://apps.yaiol.com/en/p/claude-code-helper/help/releases/) |
| **Product page** | [apps.yaiol.com](https://apps.yaiol.com/en/p/claude-code-helper/) |

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

## Architecture

An Electron app: a React renderer over an Electron main process that runs a small local Express server. There is no database - it reads the Claude Code stores directly on each launch and holds nothing of its own beyond a little UI state in `localStorage`.

Two panes: on the **left** the session list, merged from every store and sorted by recency, each row carrying a **source** badge (Windows, or the name of a WSL distribution); on the **right** the selected session's transcript, decoded from its `.jsonl` file into a Claude-style chat.

| Layer | Technology |
|-------|-----------|
| UI framework | React 19 |
| Bundler | Vite 8 |
| Desktop shell | Electron 41 |
| Local API | Express 5 |
| Markdown render | marked + DOMPurify |
| Packaging | Electron Builder |

<details>
<summary><b>Where sessions come from</b></summary>

Sessions are gathered by passes over two kinds of store and merged into one list. The **source** badge on each row names the store it came from:

- **Windows** - sessions read from the Claude desktop app's sandboxed Windows store, each with a human-readable title.
- **WSL** - genuine CLI sessions run inside a WSL distribution, whose transcripts live in the Linux home directory, a store entirely separate from the Windows one. Each running distribution contributes its sessions, titled from the first user message.

A Windows transcript with **no** matching Desktop entry (a Desktop-side bug or deletion) would otherwise be invisible. A recovery pass surfaces it as a **Lost** session, titled from its first message. Lost is a category, shown alongside **Active** and **Archived**, not a separate store; its source badge is still Windows.

**The join.** The Windows side has two halves - a list of session *entries* (with titles) and the *transcript* files themselves - which are joined by the session's UUID. An entry whose transcript is gone is dropped; a transcript with no entry becomes a **Lost** row. WSL transcripts are surfaced directly, since no entry store exists there.

</details>

<details>
<summary><b>Transcript decoding</b></summary>

A transcript's `.jsonl` is decoded to Markdown: a tool call and its result are folded into one collapsible block (the result *is* the call's answer), images are embedded inline as data URIs, and oversized blobs are truncated so a long session stays renderable. The same decoder produces both the in-app chat bubbles and the standalone export document.

</details>

---

## License

Released under the [MIT License](LICENSE).

<div align="center">
  <sub>Claude Code Helper is part of <a href="https://apps.yaiol.com">yaiol Applications</a>.</sub>
</div>
