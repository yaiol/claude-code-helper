# Changelog

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
