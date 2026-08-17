# Changelog

## 1.0.1 — 2026-08-17

- Start up faster by loading only the active language's translations, instead of carrying all 52 in the initial bundle
- Generate the per-language translation chunks at build time with scripts/i18n-split.mjs (src/i18n-gen/, git-ignored)
- Add opt-in main-process startup timing, silent unless YAIOL_STARTUP_LOG is set

## 1.0.0 — 2026-07-15

- Initial release
