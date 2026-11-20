// ⚠ NO HARDCODED UI STRINGS IN THIS FILE.
//   Every string a user can read - text, title, aria-label - MUST go through the t() lookup, and
//   the key MUST be a string literal at the call site.

//! The two panes: the session list with its filters (left) and the decoded transcript (right), and the
//! state they share (`Ui`).

use crate::{
    i18n,
    icons::{LdListChevronsDownUp, LdListChevronsUpDown},
};
use dioxus::prelude::*;
use dioxus_free_icons::{
    Icon,
    icons::ld_icons::{LdArchive, LdCheck, LdCopy, LdFileDown, LdFileQuestion, LdFolderOpen, LdRefreshCw, LdSearch, LdSquareTerminal, LdX},
};
use engine::{
    render,
    sessions::{self, Category, Origin, Places, Session},
    transcript::{self, Decoded, Role},
};
use std::{collections::HashSet, path::PathBuf, time::Duration};

/// The session list as loaded.
#[derive(Clone, PartialEq)]
pub enum Listing {
    Loading,
    /// Claude Desktop's data was not found.
    Failed,
    Ready(Vec<Session>),
}

/// The transcript on screen.
#[derive(Clone, PartialEq)]
pub enum Shown {
    Loading,
    Failed,
    Ready(Loaded),
}

#[derive(Clone, PartialEq)]
pub struct Loaded {
    pub title: String,
    pub cwd: String,
    pub decoded: Decoded,
    /// Each message's cleaned HTML, in the order of `decoded.messages`.
    pub html: Vec<String>,
}

/// Everything the two panes share. All signals, so it is `Copy`.
#[derive(Clone, Copy)]
pub struct Ui {
    pub lang: Signal<String>,
    pub listing: Signal<Listing>,
    pub filter: Signal<String>,
    pub selected: Signal<Option<String>>,
    pub shown: Signal<Option<Shown>>,
    /// Tool blocks all opened (false = folded to their summary line).
    pub tools_expanded: Signal<bool>,
    /// Tool calls drawn at all (false = the conversation only; the export and the copy follow it).
    pub tools_shown: Signal<bool>,
    /// The answer just copied, for a moment of feedback.
    pub copied: Signal<Option<usize>>,
    pub show_active: Signal<bool>,
    pub show_archived: Signal<bool>,
    pub show_lost: Signal<bool>,
    /// The sources switched OFF (empty = all shown).
    pub source_off: Signal<HashSet<String>>,
}

fn copy_text(text: String) {
    if let Ok(mut clipboard) = arboard::Clipboard::new() {
        let _ = clipboard.set_text(text);
    }
}

/// A table, in two flavours at once: HTML (pastes as a real table) and tab-separated text.
pub fn copy_table(html: String, text: String) {
    if let Ok(mut clipboard) = arboard::Clipboard::new() {
        if clipboard.set_html(html, Some(text.clone())).is_err() {
            let _ = clipboard.set_text(text);
        }
    }
}

/// Show a file in the system's file manager, selected where the system can.
fn reveal(file: PathBuf) {
    #[cfg(windows)]
    {
        let _ = std::process::Command::new("explorer.exe").arg(format!("/select,{}", file.display())).spawn();
    }
    #[cfg(target_os = "macos")]
    {
        let _ = std::process::Command::new("open").arg("-R").arg(&file).spawn();
    }
    #[cfg(not(any(windows, target_os = "macos")))]
    {
        if let Some(dir) = file.parent() {
            let _ = open::that(dir);
        }
    }
}

impl Ui {
    pub fn load_sessions(self) {
        let mut listing = self.listing;
        listing.set(Listing::Loading);
        spawn(async move {
            let found = tokio::task::spawn_blocking(|| sessions::list(&Places::from_environment())).await.ok().flatten();
            listing.set(match found {
                Some(all) => Listing::Ready(all),
                None => Listing::Failed,
            });
        });
    }

    fn select(self, session: &Session) {
        let (mut selected, mut shown, mut copied) = (self.selected, self.shown, self.copied);
        let (id, title, cwd) = (session.id.clone(), session.title.clone(), session.cwd.clone());
        selected.set(Some(id.clone()));
        shown.set(Some(Shown::Loading));
        copied.set(None);
        spawn(async move {
            let wanted = id.clone();
            let loaded = tokio::task::spawn_blocking(move || {
                let file = sessions::find_transcript(&Places::from_environment(), &wanted)?;
                let decoded = transcript::decode_file(&file, true)?;
                let html = decoded.messages.iter().map(|m| render::markdown_to_html(&m.md)).collect();
                Some((decoded, html))
            })
            .await
            .ok()
            .flatten();
            // another session may have been picked while this one was read
            if self.selected.peek().as_deref() != Some(id.as_str()) {
                return;
            }
            shown.set(Some(match loaded {
                Some((decoded, html)) => Shown::Ready(Loaded { title, cwd, decoded, html }),
                None => Shown::Failed,
            }));
        });
    }

    /// The session's document as the reader sees it: with the tool calls, or without when they are hidden.
    async fn document(self) -> Option<(String, Decoded)> {
        let id = self.selected.peek().clone()?;
        let title = match &*self.shown.peek() {
            Some(Shown::Ready(loaded)) => loaded.title.clone(),
            _ => return None,
        };
        let tools = *self.tools_shown.peek();
        let decoded = tokio::task::spawn_blocking(move || {
            let file = sessions::find_transcript(&Places::from_environment(), &id)?;
            transcript::decode_file(&file, tools)
        })
        .await
        .ok()
        .flatten()?;
        Some((title, decoded))
    }

    async fn copy_markdown(self) {
        if let Some((_, decoded)) = self.document().await {
            copy_text(decoded.markdown);
        }
    }

    async fn export(self) {
        let Some((title, decoded)) = self.document().await else { return };
        let code = self.lang.peek().clone();
        let t = |key: &str| i18n::t(&code, key);
        let window = dioxus::desktop::window();
        let picked = rfd::AsyncFileDialog::new()
            .set_parent(&window.window)
            .set_title(t("ttlExport"))
            .add_filter(t("lblExportFilterMd"), &["md"])
            .set_file_name(transcript::export_file_name(&title, decoded.first_ts))
            .save_file()
            .await;
        if let Some(file) = picked {
            let _ = std::fs::write(file.path(), transcript::export_document(&title, &decoded));
        }
    }

    fn reveal_transcript(self) {
        let Some(id) = self.selected.peek().clone() else { return };
        spawn(async move {
            let file = tokio::task::spawn_blocking(move || sessions::find_transcript(&Places::from_environment(), &id)).await.ok().flatten();
            if let Some(file) = file {
                reveal(file);
            }
        });
    }

    fn copy_message(self, index: usize, md: String) {
        let mut copied = self.copied;
        copy_text(md);
        copied.set(Some(index));
        spawn(async move {
            tokio::time::sleep(Duration::from_millis(1200)).await;
            if *copied.peek() == Some(index) {
                copied.set(None);
            }
        });
    }
}

// ─── Left: the session list ─────────────────────────────────────────────────────────────────────

#[component]
pub fn SessionList() -> Element {
    let ui = use_context::<Ui>();
    let code = (ui.lang)();
    let t = |key: &str| i18n::t(&code, key);
    let (ttl, lbl_count, tip_refresh, plh_filter, tip_clear) = (t("ttlSessions"), t("lblSessionsCount"), t("tipSessionsRefresh"), t("plhSessionsFilter"), t("tipSessionsFilterClear"));
    let (lbl_active, lbl_archived, lbl_lost, tip_lost) = (t("lblSessionsActive"), t("lblSessionsArchived"), t("lblSessionsLost"), t("tipSessionsLost"));
    let (tip_f_active, tip_f_archived, tip_f_lost, tip_f_source) = (t("tipSessionsFilterActive"), t("tipSessionsFilterArchived"), t("tipSessionsFilterLost"), t("tipSessionsFilterSource"));
    let (msg_loading, msg_empty, msg_error) = (t("msgSessionsLoading"), t("msgSessionsEmpty"), t("msgSessionsError"));

    let listing = ui.listing.read().clone();
    let filter = (ui.filter)();
    let selected = (ui.selected)();
    let source_off = ui.source_off.read().clone();
    let (show_active, show_archived, show_lost) = ((ui.show_active)(), (ui.show_archived)(), (ui.show_lost)());
    let (mut filter_sig, mut source_off_sig) = (ui.filter, ui.source_off);
    let (mut show_active_sig, mut show_archived_sig, mut show_lost_sig) = (ui.show_active, ui.show_archived, ui.show_lost);

    let all: &[Session] = match &listing {
        Listing::Ready(all) => all,
        _ => &[],
    };
    // The text filter first, then the sources, then the categories. The source chips are those of ALL the
    // sessions (so they stay put while searching); their counts are those of the text filter; the category
    // counts describe only the sources shown.
    let query = filter.trim().to_lowercase();
    let text_matched: Vec<&Session> = all.iter().filter(|s| query.is_empty() || s.title.to_lowercase().contains(&query) || s.cwd.to_lowercase().contains(&query)).collect();
    let mut sources: Vec<String> = all.iter().map(|s| s.source.clone()).filter(|s| !s.is_empty()).collect::<HashSet<_>>().into_iter().collect();
    // Windows first, then the distributions by name
    sources.sort_by(|a, b| (a != "Windows").cmp(&(b != "Windows")).then_with(|| a.to_lowercase().cmp(&b.to_lowercase())));
    let source_chips: Vec<(String, usize, bool)> =
        sources.into_iter().map(|src| (src.clone(), text_matched.iter().filter(|s| s.source == src).count(), !source_off.contains(&src))).collect();
    let source_matched: Vec<&Session> = text_matched.into_iter().filter(|s| !source_off.contains(&s.source)).collect();
    let count = |category: Category| source_matched.iter().filter(|s| s.category() == category).count();
    let (n_active, n_archived, n_lost) = (count(Category::Active), count(Category::Archived), count(Category::Lost));
    let rows: Vec<Session> = source_matched
        .into_iter()
        .filter(|s| match s.category() {
            Category::Active => show_active,
            Category::Archived => show_archived,
            Category::Lost => show_lost,
        })
        .cloned()
        .collect();
    let ready = matches!(listing, Listing::Ready(_));
    let chip = |on: bool| if on { "uis-chp on" } else { "uis-chp" };

    rsx! {
        section { class: "sv-list uis-pnl",
            div { class: "sv-list-head",
                span { class: "sv-list-title", "{ttl}" }
                if !matches!(listing, Listing::Loading) {
                    span { class: "sv-list-count", "{rows.len()} {lbl_count}" }
                }
                div { class: "uis-barh-grp sv-refresh",
                    button { class: "uis-btn ico", title: "{tip_refresh}", "aria-label": "{tip_refresh}", onclick: move |_| ui.load_sessions(),
                        Icon { width: 24, height: 24, icon: LdRefreshCw }
                    }
                }
            }
            div { class: "sv-filter uis-txt-search",
                span { class: "uis-txt-search-glyph",
                    Icon { width: 24, height: 24, icon: LdSearch }
                }
                input {
                    class: "uis-txt-search-input",
                    value: "{filter}",
                    placeholder: "{plh_filter}",
                    "aria-label": "{plh_filter}",
                    oninput: move |e| filter_sig.set(e.value()),
                }
                if !filter.is_empty() {
                    button { class: "uis-txt-search-clear", title: "{tip_clear}", "aria-label": "{tip_clear}", onclick: move |_| filter_sig.set(String::new()),
                        Icon { width: 24, height: 24, class: "uis-ico-inline", icon: LdX }
                    }
                }
            }
            if ready {
                // The sources (above the categories): one chip per store, Windows and each running WSL distribution.
                div { class: "sv-filter-toggles sv-filter-sources",
                    for (src, n, on) in source_chips {
                        button {
                            key: "{src}",
                            class: chip(on),
                            style: "--chip: var(--source)",
                            title: "{tip_f_source}",
                            "aria-label": "{tip_f_source}: {src}",
                            "aria-pressed": "{on}",
                            onclick: {
                                let src = src.clone();
                                move |_| {
                                    let mut off = source_off_sig.write();
                                    if !off.remove(&src) {
                                        off.insert(src.clone());
                                    }
                                }
                            },
                            "{src}"
                            span { class: "sv-toggle-n", "{n}" }
                        }
                    }
                }
                div { class: "sv-filter-toggles",
                    button {
                        class: chip(show_active),
                        style: "--chip: var(--uis-accent)",
                        title: "{tip_f_active}",
                        "aria-label": "{tip_f_active}",
                        "aria-pressed": "{show_active}",
                        onclick: move |_| show_active_sig.toggle(),
                        "{lbl_active}"
                        span { class: "sv-toggle-n", "{n_active}" }
                    }
                    button {
                        class: chip(show_archived),
                        style: "--chip: var(--uis-accent)",
                        title: "{tip_f_archived}",
                        "aria-label": "{tip_f_archived}",
                        "aria-pressed": "{show_archived}",
                        onclick: move |_| show_archived_sig.toggle(),
                        Icon { width: 24, height: 24, class: "uis-ico-inline", icon: LdArchive }
                        "{lbl_archived}"
                        span { class: "sv-toggle-n", "{n_archived}" }
                    }
                    button {
                        class: chip(show_lost),
                        style: "--chip: var(--uis-accent)",
                        title: "{tip_f_lost}",
                        "aria-label": "{tip_f_lost}",
                        "aria-pressed": "{show_lost}",
                        onclick: move |_| show_lost_sig.toggle(),
                        Icon { width: 24, height: 24, class: "uis-ico-inline", icon: LdFileQuestion }
                        "{lbl_lost}"
                        span { class: "sv-toggle-n", "{n_lost}" }
                    }
                }
            }
            div { class: "sv-list-scroll",
                match listing {
                    Listing::Loading => rsx! {
                        div { class: "sv-empty", "{msg_loading}" }
                    },
                    Listing::Failed => rsx! {
                        div { class: "sv-empty sv-empty-err", "{msg_error}" }
                    },
                    Listing::Ready(_) if rows.is_empty() => rsx! {
                        div { class: "sv-empty", "{msg_empty}" }
                    },
                    Listing::Ready(_) => rsx! {},
                }
                {
                    rows.into_iter()
                        .map(|s| {
                            let active = selected.as_deref() == Some(s.id.as_str());
                            let date = render::format_date(s.last_used);
                            let pick = s.clone();
                            rsx! {
                                button {
                                    key: "{s.id}",
                                    class: if active { "uis-lvw-item uis-lvw-item--stack active" } else { "uis-lvw-item uis-lvw-item--stack" },
                                    onclick: move |_| ui.select(&pick),
                                    span { class: "uis-lvw-item-name", "{s.title}" }
                                    span { class: "sv-item-cwd sv-mono", "{s.cwd}" }
                                    span { class: "sv-item-meta",
                                        span { class: "sv-item-date", "{date}" }
                                        // where the session physically lives: Windows, or a WSL distribution's name
                                        if !s.source.is_empty() {
                                            span { class: "uis-chp", "{s.source}" }
                                        }
                                        if s.origin == Origin::Lost {
                                            span { class: "uis-chp", title: "{tip_lost}",
                                                Icon { width: 24, height: 24, icon: LdFileQuestion }
                                                "{lbl_lost}"
                                            }
                                        }
                                        if s.archived {
                                            span { class: "uis-chp",
                                                Icon { width: 24, height: 24, icon: LdArchive }
                                                "{lbl_archived}"
                                            }
                                        }
                                    }
                                }
                            }
                        })
                }
            }
        }
    }
}

// ─── Right: the decoded transcript ──────────────────────────────────────────────────────────────

#[component]
pub fn TranscriptView() -> Element {
    let ui = use_context::<Ui>();
    let code = (ui.lang)();
    let t = |key: &str| i18n::t(&code, key);
    let msg_select = t("msgTranscriptSelect");
    if (ui.selected)().is_none() {
        return rsx! {
            section { class: "sv-view",
                div { class: "sv-view-empty", "{msg_select}" }
            }
        };
    }
    let (msg_loading, msg_error) = (t("msgTranscriptLoading"), t("msgTranscriptError"));
    let (tip_show, tip_expand, tip_export, tip_copy, tip_reveal) = (t("tipTranscriptToolShow"), t("tipTranscriptToolExpand"), t("tipTranscriptExport"), t("tipTranscriptCopy"), t("tipTranscriptReveal"));
    let (tip_copy_msg, tip_copy_table, tip_stats) = (t("tipTranscriptCopyMsg"), t("tipTranscriptCopyTable"), t("tipTranscriptStats"));
    let (lbl_active, lbl_tokens) = (t("lblTranscriptStatsActive"), t("lblTranscriptStatsTokens"));

    let shown = ui.shown.read().clone();
    let tools_shown = (ui.tools_shown)();
    let tools_expanded = (ui.tools_expanded)();
    let copied = (ui.copied)();
    let (mut tools_shown_sig, mut tools_expanded_sig) = (ui.tools_shown, ui.tools_expanded);
    let loaded = match &shown {
        Some(Shown::Ready(loaded)) => Some(loaded),
        _ => None,
    };
    let ready = loaded.is_some();
    let title = loaded.map(|l| l.title.clone()).unwrap_or_default();
    // the folder, the day it began, then the two figures (with their own explanation on hover)
    let sub = loaded.map(|l| {
        let began = render::format_date(l.decoded.first_ts);
        if began.is_empty() { l.cwd.clone() } else { format!("{} · {began}", l.cwd) }
    });
    let stats = loaded.filter(|l| l.decoded.stats.total_tokens > 0).map(|l| {
        format!(" · {} {lbl_active} · {} {lbl_tokens}", render::format_active(l.decoded.stats.active_ms), render::format_tokens(l.decoded.stats.total_tokens))
    });

    rsx! {
        section { class: "sv-view",
            div { class: "sv-view-head",
                div { class: "sv-view-titlewrap",
                    span { class: "sv-view-title", "{title}" }
                    if let Some(sub) = sub {
                        span { class: "sv-view-sub sv-mono",
                            "{sub}"
                            if let Some(stats) = stats {
                                span { title: "{tip_stats}", "{stats}" }
                            }
                        }
                    }
                }
                span { class: "uis-bar-spacer" }
                div { class: "uis-barh-grp",
                    button {
                        class: if tools_shown { "uis-btn ico active" } else { "uis-btn ico" },
                        title: "{tip_show}",
                        "aria-label": "{tip_show}",
                        "aria-pressed": "{tools_shown}",
                        disabled: !ready,
                        onclick: move |_| tools_shown_sig.toggle(),
                        Icon { width: 24, height: 24, icon: LdSquareTerminal }
                    }
                    button {
                        class: if tools_expanded { "uis-btn ico active" } else { "uis-btn ico" },
                        title: "{tip_expand}",
                        "aria-label": "{tip_expand}",
                        "aria-pressed": "{tools_expanded}",
                        disabled: !ready || !tools_shown,
                        onclick: move |_| tools_expanded_sig.toggle(),
                        if tools_expanded {
                            Icon { width: 24, height: 24, icon: LdListChevronsDownUp }
                        } else {
                            Icon { width: 24, height: 24, icon: LdListChevronsUpDown }
                        }
                    }
                    button {
                        class: "uis-btn ico",
                        title: "{tip_export}",
                        "aria-label": "{tip_export}",
                        disabled: !ready,
                        onclick: move |_| {
                            spawn(async move { ui.export().await });
                        },
                        Icon { width: 24, height: 24, icon: LdFileDown }
                    }
                    button {
                        class: "uis-btn ico",
                        title: "{tip_copy}",
                        "aria-label": "{tip_copy}",
                        disabled: !ready,
                        onclick: move |_| {
                            spawn(async move { ui.copy_markdown().await });
                        },
                        Icon { width: 24, height: 24, icon: LdCopy }
                    }
                    button { class: "uis-btn ico", title: "{tip_reveal}", "aria-label": "{tip_reveal}", onclick: move |_| ui.reveal_transcript(),
                        Icon { width: 24, height: 24, icon: LdFolderOpen }
                    }
                }
            }
            div { class: "sv-md-scroll",
                match &shown {
                    Some(Shown::Loading) | None => rsx! {
                        div { class: "sv-empty", "{msg_loading}" }
                    },
                    Some(Shown::Failed) => rsx! {
                        div { class: "sv-empty sv-empty-err", "{msg_error}" }
                    },
                    Some(Shown::Ready(loaded)) => rsx! {
                        div { class: if tools_shown { "sv-thread" } else { "sv-thread sv-tools-hidden" },
                            {
                                loaded
                                    .decoded
                                    .messages
                                    .iter()
                                    .zip(&loaded.html)
                                    .enumerate()
                                    .map(|(i, (m, html))| {
                                        // the table buttons and the opened tool blocks are added AFTER the cleaning
                                        let html = render::decorate(html, &tip_copy_table, tools_expanded);
                                        let role = if m.role == Role::User { "sv-msg-user" } else { "sv-msg-assistant" };
                                        let class = if m.tool { format!("sv-msg {role} sv-msg-tool") } else { format!("sv-msg {role}") };
                                        let answer = m.role == Role::Assistant && !m.tool;
                                        let md = m.md.clone();
                                        rsx! {
                                            div { key: "{i}", class: "{class}",
                                                div { class: "sv-md sv-bubble", dangerous_inner_html: "{html}" }
                                                if answer {
                                                    button {
                                                        class: if copied == Some(i) { "uis-btn ico sv-msg-copy active" } else { "uis-btn ico sv-msg-copy" },
                                                        title: "{tip_copy_msg}",
                                                        "aria-label": "{tip_copy_msg}",
                                                        onclick: move |_| ui.copy_message(i, md.clone()),
                                                        if copied == Some(i) {
                                                            Icon { width: 24, height: 24, icon: LdCheck }
                                                        } else {
                                                            Icon { width: 24, height: 24, icon: LdCopy }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    })
                            }
                        }
                    },
                }
            }
        }
    }
}
