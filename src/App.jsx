// ⚠ CLAUDE - NO HARDCODED UI STRINGS IN THIS FILE.
//   Every string a user can read - JSX text, title=, placeholder=, aria-label=,
//   confirm/alert/setMsg arguments - MUST go through t('keyName'). No exceptions.
//   Workflow: add keys to src/i18n.js EN, then translate, sort and audit every
//   language via the i18n key workflow. Full procedure: see CLAUDE-i18n.md.
//   Never paste translations by hand. The scripts ARE the work.
import React, { useEffect, useMemo, useState } from 'react';
import { Settings, HelpCircle, X, RefreshCw, Search, FolderOpen, Copy, Check, FileDown, Archive, FileQuestion, ListChevronsDownUp, ListChevronsUpDown, SquareTerminal } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import pkg from '../package.json';
import { useT, LANGUAGES } from './i18n-gen';
import { getUrl } from './lib/site-url';
import { UisNewsLoader } from './lib/uis-news-loader';
import { UisAppHeader } from './lib/uis-header';
import { UisBarWindow, LbsHokWindow } from './lib/uis-bar-window';
import { UisIcoGithub } from './lib/uis-icons';
import { UisStgView } from './lib/uis-stg-view';
// Storage namespace - single source: package.json `storagePrefix`. Never hardcode a prefix.
const STORAGE_PREFIX = pkg.storagePrefix;

// ─── App identity - single source of truth ──────────────────────────────────
const APP_NAME    = pkg.productName;
const APP_VERSION = pkg.version;

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

// Per-table copy button, injected POST-sanitize (like the `open` toggle) so DOMPurify never
// strips it. Inline lucide Copy/Check markup - the button lives inside dangerouslySetInnerHTML,
// out of React's reach, so it can't be a component.
const SVG_TBL_COPY  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
const SVG_TBL_CHECK = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

// Wrap every rendered <table> in a hover container carrying a copy button.
function decorateTables(html, tip) {
  if (!html.includes('<table')) return html;
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  tpl.content.querySelectorAll('table').forEach(table => {
    const wrap = document.createElement('div');
    wrap.className = 'ch-tblwrap';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'uis-btn ico ch-tblcopy';
    btn.title = tip;
    btn.setAttribute('aria-label', tip);
    btn.innerHTML = SVG_TBL_COPY;
    table.replaceWith(wrap);
    wrap.append(btn, table);
  });
  return tpl.innerHTML;
}

// Two clipboard flavors: text/html pastes as a real table (Excel, Word, Docs),
// text/plain is TSV for editors. Fallback to TSV-only if ClipboardItem is refused.
function tableToTsv(table) {
  return [...table.rows]
    .map(r => [...r.cells].map(c => c.innerText.replace(/\s+/g, ' ').trim()).join('\t'))
    .join('\n');
}
async function copyTable(table) {
  const tsv = tableToTsv(table);
  try {
    await navigator.clipboard.write([new ClipboardItem({
      'text/html':  new Blob([table.outerHTML], { type: 'text/html' }),
      'text/plain': new Blob([tsv], { type: 'text/plain' }),
    })]);
  } catch {
    await navigator.clipboard.writeText(tsv).catch(() => {});
  }
}

function fmtDate(ts) {
  if (!ts) return '';
  try { return new Date(ts).toLocaleString(); } catch { return ''; }
}

// Compact counts for the session stats: 2.19M / 1.14B. Hours keep one decimal, minutes below one.
function fmtTokens(n) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${Math.round(n / 1e3)}k`;
  return String(n);
}
function fmtActive(ms) {
  const h = ms / 3.6e6;
  return h >= 1 ? `${h.toFixed(1)} h` : `${Math.max(1, Math.round(ms / 6e4))} min`;
}

// One of three mutually-exclusive list categories, each driven by its own filter chip.
// Lost sessions have isArchived:false, so they must be classified by origin FIRST -
// otherwise they'd fall under 'active' and the Lost chip could never isolate them.
const sessionCategory = (s) => (s.origin === 'lost' ? 'lost' : (s.isArchived ? 'archived' : 'active'));

export default function App() {
  const [lang,         setLang]         = useState(() => localStorage.getItem(LS_LANG)  || DEFAULT_LANG);
  const [theme,        setTheme]        = useState(() => localStorage.getItem(LS_THEME) || DEFAULT_THEME);
  const [settingsOpen, setSettingsOpen] = useState(false);
  // The window bar: its three buttons act through the main process, which also says when the window is maximized.
  const windowBar = LbsHokWindow(API);
  const [newsEnabled, setNewsEnabled] = useState(true);
  useEffect(() => {
    fetch(`${API}/news-settings`).then(r => r.json()).then(s => setNewsEnabled(s.enabled)).catch(() => {});
  }, []);
  function toggleNews(enabled) {
    setNewsEnabled(enabled);
    fetch(`${API}/news-settings`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ enabled }) }).catch(() => {});
  }

  // ── Session viewer state ──────────────────────────────────────────────────
  const [sessions,        setSessions]        = useState(null);   // null = not loaded yet
  const [sessionsError,   setSessionsError]   = useState(false);
  const [filter,          setFilter]          = useState('');
  const [selectedId,      setSelectedId]      = useState(null);
  const [transcript,      setTranscript]      = useState(null);   // { markdown, messages, meta, title, cwd }
  const [transcriptState, setTranscriptState] = useState('idle'); // idle | loading | error | ready
  const [toolsExpanded,   setToolsExpanded]   = useState(false);  // false = tool blocks folded to one-line summaries
  const [toolsShown,      setToolsShown]      = useState(true);   // false = tool calls hidden, only the conversation is left
  const [copiedMsg,       setCopiedMsg]       = useState(null);   // index of the answer just copied (brief check feedback)
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
    setCopiedMsg(null);
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

  // Copy and export follow the show / hide button: tool calls hidden in the window are left out of the text.
  async function copyMarkdown() {
    if (!transcript?.markdown) return;
    let md = transcript.markdown;
    if (!toolsShown) {
      try {
        const data = await (await fetch(`${API}/transcript?id=${encodeURIComponent(selectedId)}&tools=0`)).json();
        if (!data.ok) return;
        md = data.markdown;
      } catch { return; }
    }
    navigator.clipboard.writeText(md).catch(() => {});
  }

  function copyMessage(md, i) {
    navigator.clipboard.writeText(md).then(() => {
      setCopiedMsg(i);
      setTimeout(() => setCopiedMsg(c => (c === i ? null : c)), 1200);
    }).catch(() => {});
  }

  // Delegated handler for the injected per-table copy buttons (they live inside
  // dangerouslySetInnerHTML, so React can't attach a handler to them directly).
  function onThreadClick(e) {
    const btn = e.target.closest?.('.ch-tblcopy');
    if (!btn) return;
    const table = btn.parentElement?.querySelector('table');
    if (!table) return;
    copyTable(table).then(() => {
      btn.innerHTML = SVG_TBL_CHECK;
      btn.classList.add('active');
      setTimeout(() => { btn.innerHTML = SVG_TBL_COPY; btn.classList.remove('active'); }, 1200);
    });
  }

  function exportMarkdown() {
    if (!selectedId) return;
    fetch(`${API}/export-transcript`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: selectedId,
        tools: toolsShown,
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
    <div className="uis-app-root">
      {/* ── A new version (first) and the yaiol news, in one dialog ── */}
      <UisNewsLoader api={API} lang={lang} t={t} />
      {/* ── Window bar ── the app's own title bar: the window has no system frame. */}
      <UisBarWindow appName={APP_NAME} appVersion={APP_VERSION} iconSrc="./app.png" maximized={windowBar.maximized}
        tipMinimize={t('tipWinMinimize')} tipMaximize={t('tipWinMaximize')} tipRestore={t('tipWinRestore')} tipClose={t('tipWinClose')}
        onMinimize={windowBar.minimize} onMaximize={windowBar.maximize} onClose={windowBar.close}>
        <button
          className={`uis-barh-window-btn uis-stg-toggle ${settingsOpen ? 'active' : ''}`}
          onClick={() => setSettingsOpen(o => !o)}
          title={t('tipHdrSettings')}
          aria-label={t('tipHdrSettings')}
          aria-pressed={settingsOpen}
        >
          <Settings />
        </button>
        <button
          className="uis-barh-window-btn"
          onClick={() => window.open(getUrl(pkg.name, lang.replace(/_/g, '-'), 'help'), '_blank')}
          title={t('tipHdrHelp')}
          aria-label={t('tipHdrHelp')}
        >
          <HelpCircle />
        </button>
        <button
          className="uis-barh-window-btn"
          onClick={() => window.open(GITHUB_URL, '_blank')}
          title="GitHub"
          aria-label="GitHub"
        >
          <UisIcoGithub />
        </button>
      </UisBarWindow>
      {/* The name and the version are in the window bar, so the header holds the work buttons only. */}
      <UisAppHeader appName={APP_NAME} appVersion={APP_VERSION} bare>
      </UisAppHeader>

      {/* .uis-app-main content region (Rule 14) — wraps the two-pane split */}
      <div className="uis-app-main">
      {settingsOpen && (
        <UisStgView
          t={t} appName={APP_NAME} appVersion={APP_VERSION} languages={LANGUAGES}
          lang={lang} setLang={setLang}
          theme={theme} setTheme={setTheme}
          generalExtra={(
            <div className="uis-fld-labelled divider"><label className="uis-chk-lbl"><input type="checkbox" className="uis-chk-box" checked={newsEnabled} onChange={e => toggleNews(e.target.checked)} />{t('lblStgGeneralNews')}</label></div>
          )}
          onClose={() => setSettingsOpen(false)}
        />
      )}
      <div className="workspace ch-split">
        {/* ── Left: session list ──────────────────────────────────────────── */}
        <section className="ch-list uis-pnl">
          <div className="ch-list-head">
            <span className="ch-list-title">{t('ttlSessions')}</span>
            {sessions && (
              <span className="ch-list-count">{filtered.length} {t('lblSessionsCount')}</span>
            )}
            <div className="uis-barh-grp ch-refresh">
              <button className="uis-btn ico" onClick={loadSessions} title={t('tipSessionsRefresh')} aria-label={t('tipSessionsRefresh')}>
                <RefreshCw />
              </button>
            </div>
          </div>
          <div className="ch-filter uis-txt-search">
            <span className="uis-txt-search-glyph"><Search /></span>
            <input
              className="uis-txt-search-input"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder={t('plhSessionsFilter')}
              aria-label={t('plhSessionsFilter')}
            />
            {filter && (
              <button className="uis-txt-search-clear" onClick={() => setFilter('')} title={t('tipSessionsFilterClear')} aria-label={t('tipSessionsFilterClear')}>
                <X className="uis-ico-inline" />
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
                  className={`uis-chp ${!sourceOff.has(src) ? 'on' : ''}`}
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
                className={`uis-chp ${showActive ? 'on' : ''}`}
                style={{ "--chip": "var(--uis-accent)" }}
                onClick={() => setShowActive(v => !v)}
                title={t('tipSessionsFilterActive')}
                aria-label={t('tipSessionsFilterActive')}
                aria-pressed={showActive}
              >
                {t('lblSessionsActive')}<span className="ch-toggle-n">{counts.active}</span>
              </button>
              <button
                className={`uis-chp ${showArchived ? 'on' : ''}`}
                style={{ "--chip": "var(--uis-accent)" }}
                onClick={() => setShowArchived(v => !v)}
                title={t('tipSessionsFilterArchived')}
                aria-label={t('tipSessionsFilterArchived')}
                aria-pressed={showArchived}
              >
                <Archive className="uis-ico-inline" />{t('lblSessionsArchived')}<span className="ch-toggle-n">{counts.archived}</span>
              </button>
              <button
                className={`uis-chp ${showLost ? 'on' : ''}`}
                style={{ "--chip": "var(--uis-accent)" }}
                onClick={() => setShowLost(v => !v)}
                title={t('tipSessionsFilterLost')}
                aria-label={t('tipSessionsFilterLost')}
                aria-pressed={showLost}
              >
                <FileQuestion className="uis-ico-inline" />{t('lblSessionsLost')}<span className="ch-toggle-n">{counts.lost}</span>
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
                className={`uis-lvw-item uis-lvw-item--stack ${selectedId === s.cliSessionId ? 'active' : ''}`}
                onClick={() => selectSession(s)}
              >
                <span className="uis-lvw-item-name">{s.title}</span>
                <span className="ch-item-cwd mono">{s.cwd}</span>
                <span className="ch-item-meta">
                  <span className="ch-item-date">{fmtDate(s.lastFocusedAt)}</span>
                  {/* Source badge - where the session physically lives: "Windows" or a WSL distro name (e.g. Ubuntu). */}
                  {s.source && <span className="uis-chp">{s.source}</span>}
                  {s.origin === 'lost' && <span className="uis-chp" title={t('tipSessionsLost')}><FileQuestion />{t('lblSessionsLost')}</span>}
                  {s.isArchived && <span className="uis-chp"><Archive />{t('lblSessionsArchived')}</span>}
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
                      {transcript.meta.stats && transcript.meta.stats.totalTokens > 0 && (
                        <span title={t('tipTranscriptStats')}>
                          {` · ${fmtActive(transcript.meta.stats.activeMs)} ${t('lblTranscriptStatsActive')} · ${fmtTokens(transcript.meta.stats.totalTokens)} ${t('lblTranscriptStatsTokens')}`}
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <span className="uis-bar-spacer" />
                <div className="uis-barh-grp">
                  <button className={'uis-btn ico' + (toolsShown ? ' active' : '')} onClick={() => setToolsShown(v => !v)} title={t('tipTranscriptToolShow')} aria-label={t('tipTranscriptToolShow')} aria-pressed={toolsShown} disabled={transcriptState !== 'ready'}>
                    <SquareTerminal />
                  </button>
                  <button className={'uis-btn ico' + (toolsExpanded ? ' active' : '')} onClick={() => setToolsExpanded(v => !v)} title={t('tipTranscriptToolExpand')} aria-label={t('tipTranscriptToolExpand')} aria-pressed={toolsExpanded} disabled={transcriptState !== 'ready' || !toolsShown}>
                    {toolsExpanded ? <ListChevronsDownUp /> : <ListChevronsUpDown />}
                  </button>
                  <button className="uis-btn ico" onClick={exportMarkdown} title={t('tipTranscriptExport')} aria-label={t('tipTranscriptExport')} disabled={transcriptState !== 'ready'}>
                    <FileDown />
                  </button>
                  <button className="uis-btn ico" onClick={copyMarkdown} title={t('tipTranscriptCopy')} aria-label={t('tipTranscriptCopy')} disabled={transcriptState !== 'ready'}>
                    <Copy />
                  </button>
                  <button className="uis-btn ico" onClick={revealTranscript} title={t('tipTranscriptReveal')} aria-label={t('tipTranscriptReveal')}>
                    <FolderOpen />
                  </button>
                </div>
              </div>
              <div className="ch-md-scroll">
                {transcriptState === 'loading' && <div className="ch-empty">{t('msgTranscriptLoading')}</div>}
                {transcriptState === 'error' && <div className="ch-empty ch-empty-err">{t('msgTranscriptError')}</div>}
                {transcriptState === 'ready' && (
                  <div className={'ch-thread' + (toolsShown ? '' : ' ch-tools-hidden')} onClick={onThreadClick}>
                    {(transcript.messages || []).map((m, i) => {
                      // Inject `open` post-sanitize so the toolbar toggle expands every <details> at once.
                      let html = renderMarkdown(m.md);
                      if (toolsExpanded) html = html.replaceAll('<details ', '<details open ');
                      html = decorateTables(html, t('tipTranscriptCopyTable'));
                      return (
                        <div key={i} className={`ch-msg ch-msg-${m.role}${m.tool ? ' ch-msg-tool' : ''}`}>
                          <div className="ch-md ch-bubble" dangerouslySetInnerHTML={{ __html: html }} />
                          {m.role === 'assistant' && !m.tool && (
                            <button
                              className={'uis-btn ico ch-msg-copy' + (copiedMsg === i ? ' active' : '')}
                              onClick={() => copyMessage(m.md, i)}
                              title={t('tipTranscriptCopyMsg')}
                              aria-label={t('tipTranscriptCopyMsg')}
                            >
                              {copiedMsg === i ? <Check /> : <Copy />}
                            </button>
                          )}
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
