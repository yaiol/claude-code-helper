// ⚠ CLAUDE - NO HARDCODED UI STRINGS IN THIS FILE.
//   Every string a user can read - JSX text, title=, placeholder=, aria-label=,
//   confirm/alert/setMsg arguments - MUST go through t('keyName'). No exceptions.
//   Workflow: add keys to src/i18n.js EN, then translate, sort and audit every
//   language via the i18n key workflow. Full procedure: see CLAUDE-i18n.md.
//   Never paste translations by hand. The scripts ARE the work.
import React, { useEffect, useMemo, useState } from 'react';
import { Settings, HelpCircle, Sun, Moon, X, ScrollText, RefreshCw, Search, FolderOpen, Copy, FileDown, Archive, FileQuestion, ListChevronsDownUp, ListChevronsUpDown } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import pkg from '../package.json';
import { useT, LANGUAGES } from './i18n';
import { checkForUpdate } from './lib/update-check';
import { UpdateBanner } from './lib/ui-update-banner';
import { AppHeader } from './lib/ui-header';
import { GithubIcon } from './lib/ui-icons';
import yaiolLogo from './assets/yaiol-logo.svg';
// Storage namespace - single source: package.json `storagePrefix`. Never hardcode a prefix.
const STORAGE_PREFIX = pkg.storagePrefix;

// ─── App identity - single source of truth ──────────────────────────────────
const APP_NAME    = pkg.productName;
const APP_VERSION = pkg.version;

// Help page - opens at the user's setting language; the help site falls back to
// EN for languages it doesn't publish (no app-side fallback).
const HELP_URL = 'https://apps.yaiol.com/en/p/claude-code-helper/help/';
// GitHub source - owner is constant (yaiol); repo name is the app id (pkg.name,
// the single source of truth), NOT package.json `repository`.
const GITHUB_URL = `https://github.com/yaiol/${pkg.name}`;

// localStorage keys - prefix uses the app alias (see CLAUDE.md Settings table)
const LS_LANG     = `${STORAGE_PREFIX}-lang`;
const LS_THEME    = `${STORAGE_PREFIX}-theme`;
const DEFAULT_LANG  = 'en';
const DEFAULT_THEME = 'light';

// Express API base - main.js passes its dynamic port as ?apiPort= on the window URL.
const API_PORT = new URLSearchParams(window.location.search).get('apiPort');
const API = `http://localhost:${API_PORT}`;

marked.setOptions({ gfm: true, breaks: false });
// ADD_TAGS keeps the decoder's <details>/<summary> tool blocks through sanitize.
// `open` is injected post-sanitize (see the thread render) for the global expand toggle.
function renderMarkdown(md) {
  return DOMPurify.sanitize(marked.parse(md || ''), { ADD_TAGS: ['details', 'summary'] });
}

function fmtDate(ts) {
  if (!ts) return '';
  try { return new Date(ts).toLocaleString(); } catch { return ''; }
}

// One of three mutually-exclusive list categories, each driven by its own filter chip.
// Lost sessions have isArchived:false, so they must be classified by origin FIRST -
// otherwise they'd fall under 'active' and the Lost chip could never isolate them.
const sessionCategory = (s) => (s.origin === 'lost' ? 'lost' : (s.isArchived ? 'archived' : 'active'));

export default function App() {
  const [lang,         setLang]         = useState(() => localStorage.getItem(LS_LANG)  || DEFAULT_LANG);
  const [theme,        setTheme]        = useState(() => localStorage.getItem(LS_THEME) || DEFAULT_THEME);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [updateInfo,   setUpdateInfo]   = useState(null);

  // ── Session viewer state ──────────────────────────────────────────────────
  const [sessions,        setSessions]        = useState(null);   // null = not loaded yet
  const [sessionsError,   setSessionsError]   = useState(false);
  const [filter,          setFilter]          = useState('');
  const [selectedId,      setSelectedId]      = useState(null);
  const [transcript,      setTranscript]      = useState(null);   // { markdown, messages, meta, title, cwd }
  const [transcriptState, setTranscriptState] = useState('idle'); // idle | loading | error | ready
  const [toolsExpanded,   setToolsExpanded]   = useState(false);  // false = tool blocks folded to one-line summaries
  const [showActive,      setShowActive]      = useState(true);   // category filters (session-local, like `filter`)
  const [showArchived,    setShowArchived]    = useState(true);
  const [showLost,        setShowLost]        = useState(true);
  const [sourceOff,       setSourceOff]       = useState(() => new Set()); // source names toggled OFF (empty = all shown)

  const toggleSource = (src) => setSourceOff(prev => {
    const next = new Set(prev);
    next.has(src) ? next.delete(src) : next.add(src);
    return next;
  });

  const t = useT(lang);

  useEffect(() => {
    localStorage.setItem(LS_LANG, lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(LS_THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Check for a new version once on launch (silent if up to date / offline / skipped)
  useEffect(() => {
    checkForUpdate({ appId: pkg.name, alias: STORAGE_PREFIX, currentVersion: APP_VERSION })
      .then(u => { if (u) setUpdateInfo(u); });
  }, []);

  // ── Load the session list ─────────────────────────────────────────────────
  async function loadSessions() {
    setSessions(null);
    setSessionsError(false);
    try {
      const res = await fetch(`${API}/sessions`);
      const data = await res.json();
      if (!data.ok) { setSessionsError(true); setSessions([]); return; }
      setSessions(data.sessions);
    } catch {
      setSessionsError(true);
      setSessions([]);
    }
  }
  useEffect(() => { loadSessions(); }, []);

  // ── Load one transcript ───────────────────────────────────────────────────
  async function selectSession(s) {
    setSelectedId(s.cliSessionId);
    setTranscript(null);
    setTranscriptState('loading');
    try {
      const res = await fetch(`${API}/transcript?id=${encodeURIComponent(s.cliSessionId)}`);
      const data = await res.json();
      if (!data.ok) { setTranscriptState('error'); return; }
      setTranscript({ ...data, title: s.title, cwd: s.cwd });
      setTranscriptState('ready');
    } catch {
      setTranscriptState('error');
    }
  }

  function revealTranscript() {
    if (!selectedId) return;
    fetch(`${API}/reveal-transcript`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedId }),
    }).catch(() => {});
  }

  function copyMarkdown() {
    if (transcript?.markdown) navigator.clipboard.writeText(transcript.markdown).catch(() => {});
  }

  function exportMarkdown() {
    if (!selectedId) return;
    fetch(`${API}/export-transcript`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: selectedId,
        title: transcript?.title || '',
        dialogTitle: t('ttlExport'),
        filterName: t('lblExportFilterMd'),
      }),
    }).catch(() => {});
  }

  // Text filter first; the active/archived toggles narrow it further. Chip counts
  // reflect the text-filtered set, so they show how many match within the search.
  const textMatched = useMemo(() => {
    if (!sessions) return [];
    const q = filter.trim().toLowerCase();
    if (!q) return sessions;
    return sessions.filter(s =>
      s.title.toLowerCase().includes(q) || (s.cwd || '').toLowerCase().includes(q));
  }, [sessions, filter]);

  // Source is the PRIMARY filter dimension; category (active/archived/lost) is secondary,
  // scoped to whatever sources are on. So: text filter → source filter → category filter.
  // The source chip set is derived from ALL sessions (stable as you search/toggle); source
  // counts reflect the text-filtered set (independent of category, so they never shrink to 0
  // just because a category is hidden).
  const sourceList = useMemo(() => {
    const set = new Set((sessions || []).map(s => s.source).filter(Boolean));
    // Windows first, then distros alphabetically.
    return [...set].sort((a, b) => (a === 'Windows' ? -1 : b === 'Windows' ? 1 : a.localeCompare(b)));
  }, [sessions]);

  const sourceCounts = useMemo(() => {
    const c = {};
    for (const s of textMatched) c[s.source] = (c[s.source] || 0) + 1;
    return c;
  }, [textMatched]);

  const sourceMatched = useMemo(
    () => textMatched.filter(s => !sourceOff.has(s.source)),
    [textMatched, sourceOff]
  );

  // Category counts depend on the source filter - they describe only the visible sources.
  const counts = useMemo(() => {
    const c = { active: 0, archived: 0, lost: 0 };
    for (const s of sourceMatched) c[sessionCategory(s)]++;
    return c;
  }, [sourceMatched]);

  const filtered = useMemo(() => {
    const on = { active: showActive, archived: showArchived, lost: showLost };
    return sourceMatched.filter(s => on[sessionCategory(s)]);
  }, [sourceMatched, showActive, showArchived, showLost]);

  return (
    <div className="app-root">
      {/* ── Update banner - notify-only, dismissible. See ../CLAUDE.md → "Update feed". ── */}
      <UpdateBanner info={updateInfo} appId={pkg.name} lang={lang} storagePrefix={STORAGE_PREFIX} t={t} onClose={() => setUpdateInfo(null)} />
      <AppHeader appName={APP_NAME} appVersion={APP_VERSION}>
        <span className="bar-spacer" />
        <div className="barh-grp">
          <button
            className="btn icon"
            onClick={() => window.open(GITHUB_URL, '_blank')}
            title="GitHub"
            aria-label="GitHub"
          >
            <GithubIcon />
          </button>
          <button
            className="btn icon"
            onClick={() => window.open(HELP_URL.replace('/en/p/', `/${lang.replace(/_/g, '-')}/p/`), '_blank')}
            title={t('tipHdrHelp')}
            aria-label={t('tipHdrHelp')}
          >
            <HelpCircle />
          </button>
          <button
            className="btn icon"
            onClick={() => setSettingsOpen(true)}
            title={t('tipHdrSettings')}
            aria-label={t('tipHdrSettings')}
          >
            <Settings />
          </button>
        </div>
      </AppHeader>

      {settingsOpen && (
        <SettingsDialog
          t={t}
          lang={lang} setLang={setLang}
          theme={theme} setTheme={setTheme}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {/* .app-main content region (Rule 14) — wraps the two-pane split */}
      <div className="app-main">
      <div className="workspace ch-split">
        {/* ── Left: session list ──────────────────────────────────────────── */}
        <section className="ch-list pnl">
          <div className="ch-list-head">
            <span className="ch-list-title">{t('ttlSessions')}</span>
            {sessions && (
              <span className="ch-list-count">{filtered.length} {t('lblSessionsCount')}</span>
            )}
            <div className="barh-grp ch-refresh">
              <button className="btn icon" onClick={loadSessions} title={t('tipSessionsRefresh')} aria-label={t('tipSessionsRefresh')}>
                <RefreshCw />
              </button>
            </div>
          </div>
          <div className="ch-filter search">
            <span className="search-glyph"><Search /></span>
            <input
              className="search-input"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder={t('plhSessionsFilter')}
              aria-label={t('plhSessionsFilter')}
            />
            {filter && (
              <button className="search-clear" onClick={() => setFilter('')} title={t('tipSessionsFilterClear')} aria-label={t('tipSessionsFilterClear')}>
                <X className="icon-inline" />
              </button>
            )}
          </div>
          {sessions && !sessionsError && (
            <>
            {/* Source filters (line above category filters): one chip per store - Windows + each running WSL distro. */}
            <div className="ch-filter-toggles ch-filter-sources">
              {sourceList.map(src => (
                <button
                  key={src}
                  className={`chip ${!sourceOff.has(src) ? 'on' : ''}`}
                  style={{ "--chip": "var(--source)" }}
                  onClick={() => toggleSource(src)}
                  title={t('tipSessionsFilterSource')}
                  aria-label={`${t('tipSessionsFilterSource')}: ${src}`}
                  aria-pressed={!sourceOff.has(src)}
                >
                  {src}<span className="ch-toggle-n">{sourceCounts[src] || 0}</span>
                </button>
              ))}
            </div>
            <div className="ch-filter-toggles">
              <button
                className={`chip ${showActive ? 'on' : ''}`}
                style={{ "--chip": "var(--accent)" }}
                onClick={() => setShowActive(v => !v)}
                title={t('tipSessionsFilterActive')}
                aria-label={t('tipSessionsFilterActive')}
                aria-pressed={showActive}
              >
                {t('lblSessionsActive')}<span className="ch-toggle-n">{counts.active}</span>
              </button>
              <button
                className={`chip ${showArchived ? 'on' : ''}`}
                style={{ "--chip": "var(--accent)" }}
                onClick={() => setShowArchived(v => !v)}
                title={t('tipSessionsFilterArchived')}
                aria-label={t('tipSessionsFilterArchived')}
                aria-pressed={showArchived}
              >
                <Archive className="icon-inline" />{t('lblSessionsArchived')}<span className="ch-toggle-n">{counts.archived}</span>
              </button>
              <button
                className={`chip ${showLost ? 'on' : ''}`}
                style={{ "--chip": "var(--accent)" }}
                onClick={() => setShowLost(v => !v)}
                title={t('tipSessionsFilterLost')}
                aria-label={t('tipSessionsFilterLost')}
                aria-pressed={showLost}
              >
                <FileQuestion className="icon-inline" />{t('lblSessionsLost')}<span className="ch-toggle-n">{counts.lost}</span>
              </button>
            </div>
            </>
          )}
          <div className="ch-list-scroll">
            {sessions === null && <div className="ch-empty">{t('msgSessionsLoading')}</div>}
            {sessions && sessionsError && <div className="ch-empty ch-empty-err">{t('msgSessionsError')}</div>}
            {sessions && !sessionsError && filtered.length === 0 && <div className="ch-empty">{t('msgSessionsEmpty')}</div>}
            {filtered.map((s, i) => (
              <button
                key={s.cliSessionId || `noid-${i}`}
                className={`lv-item lv-item--stack ${selectedId === s.cliSessionId ? 'active' : ''}`}
                onClick={() => selectSession(s)}
              >
                <span className="lv-item-name">{s.title}</span>
                <span className="ch-item-cwd mono">{s.cwd}</span>
                <span className="ch-item-meta">
                  <span className="ch-item-date">{fmtDate(s.lastFocusedAt)}</span>
                  {/* Source badge - where the session physically lives: "Windows" or a WSL distro name (e.g. Ubuntu). */}
                  {s.source && <span className="chip">{s.source}</span>}
                  {s.origin === 'lost' && <span className="chip" title={t('tipSessionsLost')}><FileQuestion />{t('lblSessionsLost')}</span>}
                  {s.isArchived && <span className="chip"><Archive />{t('lblSessionsArchived')}</span>}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── Right: decoded transcript ───────────────────────────────────── */}
        <section className="ch-view">
          {!selectedId && <div className="ch-view-empty">{t('msgTranscriptSelect')}</div>}
          {selectedId && (
            <>
              <div className="ch-view-head">
                <div className="ch-view-titlewrap">
                  <span className="ch-view-title">{transcript?.title || ''}</span>
                  {transcript?.meta && (
                    <span className="ch-view-sub mono">
                      {transcript.cwd}{transcript.meta.firstTs ? ` · ${fmtDate(Date.parse(transcript.meta.firstTs))}` : ''}
                    </span>
                  )}
                </div>
                <span className="bar-spacer" />
                <div className="barh-grp">
                  <button className={'btn icon' + (toolsExpanded ? ' active' : '')} onClick={() => setToolsExpanded(v => !v)} title={t('tipTranscriptToolExpand')} aria-label={t('tipTranscriptToolExpand')} aria-pressed={toolsExpanded} disabled={transcriptState !== 'ready'}>
                    {toolsExpanded ? <ListChevronsDownUp /> : <ListChevronsUpDown />}
                  </button>
                  <button className="btn icon" onClick={exportMarkdown} title={t('tipTranscriptExport')} aria-label={t('tipTranscriptExport')} disabled={transcriptState !== 'ready'}>
                    <FileDown />
                  </button>
                  <button className="btn icon" onClick={copyMarkdown} title={t('tipTranscriptCopy')} aria-label={t('tipTranscriptCopy')} disabled={transcriptState !== 'ready'}>
                    <Copy />
                  </button>
                  <button className="btn icon" onClick={revealTranscript} title={t('tipTranscriptReveal')} aria-label={t('tipTranscriptReveal')}>
                    <FolderOpen />
                  </button>
                </div>
              </div>
              <div className="ch-md-scroll">
                {transcriptState === 'loading' && <div className="ch-empty">{t('msgTranscriptLoading')}</div>}
                {transcriptState === 'error' && <div className="ch-empty ch-empty-err">{t('msgTranscriptError')}</div>}
                {transcriptState === 'ready' && (
                  <div className="ch-thread">
                    {(transcript.messages || []).map((m, i) => {
                      // Inject `open` post-sanitize so the toolbar toggle expands every <details> at once.
                      let html = renderMarkdown(m.md);
                      if (toolsExpanded) html = html.replaceAll('<details ', '<details open ');
                      return (
                        <div key={i} className={`ch-msg ch-msg-${m.role}`}>
                          <div className="ch-md ch-bubble" dangerouslySetInnerHTML={{ __html: html }} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </div>
      </div>
    </div>
  );
}

function SettingsDialog({ t, lang, setLang, theme, setTheme, onClose }) {
  const [activeTab, setActiveTab] = useState('display');

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const TABS = [
    { key: 'display', label: t('tabDlgSettingsDisplay'), icon: Sun },
    { key: 'about',   label: t('tabDlgSettingsAbout'),   icon: ScrollText },
  ];

  return (
    <div className="dl-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="dlg" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="dlg-head">
          <span className="dlg-title"><Settings />{t('ttlDlgSettings')}</span>
          <button className="dl-close" onClick={onClose} title={t('btnGlobalCancel')} aria-label={t('btnGlobalCancel')}>
            <X />
          </button>
        </div>

        {/* Tab bar */}
        <div className="tabs">
          {TABS.map(({ key, label, icon: TabIcon }) => (
            <button
              key={key}
              className={`tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <TabIcon />{label}
            </button>
          ))}
        </div>

        {/* Body */}
        {/* All tab panels stacked in one grid cell → dialog sizes to the tallest (Display), no yoyo on tab switch. Rule DLG-8. */}
        <div className="dlg-body" style={{ display: 'grid' }}>
          <div style={{ gridArea: '1/1', visibility: activeTab === 'display' ? 'visible' : 'hidden', zIndex: activeTab === 'display' ? 1 : 0, background: 'var(--dlg-bgd)' }}>
              {/* Language */}
              <div className="dlg-field">
                <label className="dlg-field-label">{t('lblDlgSettingsDisplayLang')}</label>
                <select className="select" value={lang} onChange={e => setLang(e.target.value)}>
                  {LANGUAGES.map(l => <option key={l.key} value={l.key}>{l.label}</option>)}
                </select>
              </div>
              {/* Theme */}
              <div className="dlg-field divider">
                <label className="dlg-field-label">{t('lblDlgSettingsDisplayTheme')}</label>
                <div className="opt-btns">
                  {[
                    { key: 'dark',  Icon: Moon, label: t('btnDlgSettingsDisplayThemeDark') },
                    { key: 'light', Icon: Sun,  label: t('btnDlgSettingsDisplayThemeLight') },
                  ].map(({ key, Icon, label }) => {
                    const active = theme === key;
                    return (
                      <button
                        key={key}
                        className={`opt-btn ${active ? 'active' : ''}`}
                        onClick={() => setTheme(key)}
                      >
                        <Icon />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
          </div>

          <div style={{ gridArea: '1/1', visibility: activeTab === 'about' ? 'visible' : 'hidden', zIndex: activeTab === 'about' ? 1 : 0, background: 'var(--dlg-bgd)' }}>
            <div className="dlg-about">
              <img src={yaiolLogo} alt="Yaiol" style={{ width: 120, height: 'auto', flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                <div className="dlg-about-id">{APP_NAME} <b>v{APP_VERSION}</b> by yaiol</div>
                <div className="dlg-about-desc">{t('msgDlgSettingsAboutDesc')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
