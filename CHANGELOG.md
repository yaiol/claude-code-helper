# Changelog

## 1.0.9 — 2026-11-13

- New reminder button in the title bar when a newer version is out: it stays after the new-version card is closed or hidden with Don't show again, and a click reopens the card with the release notes and the download link
- New News button in the title bar while yaiol has an announcement for the app: a click reopens the announcements, including the ones hidden with Don't show again. It does not appear when Show news from yaiol is off
- Don't show again can be undone: reopen a card from its title-bar button and untick the box, and it shows again at the next launch
- The About page and the package now carry a one-line description of the app, and the Settings button's tooltip reads "Settings" instead of "Open settings"
- Update the README screenshot

## 1.0.8 — 2026-11-12

- Fix the session list staying empty with "Could not read Claude Desktop data": Claude Desktop moved its data to a new folder, and the app now reads it there (the previous location is still read for older Claude Desktop versions)
- The window now has its own title bar: Settings, Help and GitHub sit at its left beside the app icon, the name and version are in the middle, and it follows the Windows title-bar colour. The empty header row that was under it is gone
- A run of tool calls in a transcript now reads as one compact list instead of one widely spaced block per call, and each call is labelled with its plain-words description when it has one
- New transcript toolbar button to show or hide all tool calls, leaving only the conversation. Export as Markdown file and Copy as Markdown follow it: hidden calls are left out of the text
- Claude Desktop's own task-list and end-of-turn bookkeeping calls are no longer shown in transcripts or exports

## 1.0.7 — 2026-10-23

- A newer version now appears as a card in a news dialog instead of a banner strip: the card lists the release notes newer than the running version, links to the download page, and Don't show again hides it until a still newer version is out
- Occasional yaiol announcements appear in the same dialog; Settings > General has a new Show news from yaiol switch that turns them off completely (the new-version card is not governed by it)

## 1.0.6 — 2026-10-15

- The transcript header now shows an estimate of how long the agent actually worked in a session and how many tokens it processed (for example `8.5 h active · 1.14B tokens`). Hovering it explains what is counted: the time you spent away or thinking is left out, and the total includes the cached context re-read on every turn. Subagent work is not included, because it is not in the session log

## 1.0.5 — 2026-10-13

- Starting a second copy of the app now brings the first window forward and exits, instead of opening a second window that ran on empty settings

## 1.0.4 — 2026-09-27

- Open Settings as a full-window page instead of a dialog: the tabs are listed down the left side, a back arrow beside the title closes the page, and so do the header's settings button and Esc. The transcript you were reading stays where you left it underneath
- Give text fields and drop-downs a lighter background in the dark theme, so they stand out from the bars and panels around them
- Point the README's website, manual and release-notes links at the language-neutral addresses, and centre the install table

## 1.0.3 — 2026-09-06

- Copy any single answer from a transcript, without exporting the whole session
- Copy any table in a transcript as a real table — it pastes with rows and columns intact into a spreadsheet or document, or as tab-separated text in an editor
- Rewrite the README with a logo, release and download badges, a per-platform install table, and links to the online manual and release notes

## 1.0.2 — 2026-08-23

- Open the "What's new", "Download" and help pages in your own interface language, instead of only English, French, Spanish or German
- Point the update banner's "What's new" link at the current release-notes address, so it no longer lands on a dead page
- Emit the per-language translation chunks into a lang/ subfolder, so the bundler can analyse the dynamic import instead of guessing
- Update Electron to 43 and refresh all other dependencies
- Rename vite.config.js to vite.config.mjs

## 1.0.1 — 2026-08-17

- Start up faster by loading only the active language's translations, instead of carrying all 52 in the initial bundle
- Generate the per-language translation chunks at build time with scripts/i18n-split.mjs (src/i18n-gen/, git-ignored)
- Add opt-in main-process startup timing, silent unless YAIOL_STARTUP_LOG is set

## 1.0.0 — 2026-07-15

- Initial release
