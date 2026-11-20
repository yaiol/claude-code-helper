// data-icon="yaiol:claude-code-helper"
// ⚠ NO HARDCODED UI STRINGS IN THIS FILE.
//   Every string a user can read - text, title, aria-label - MUST go through the t() lookup, and
//   the key MUST be a string literal at the call site. Add the key to locales/en.json, then
//   translate, sort and audit every language with the i18n scripts. Never paste translations by hand.

mod catalog;
mod i18n;
mod icons;
mod page;
mod settings;
mod site;
mod views;
mod window_accent;
mod window_menu;

use catalog::{UisBarWindow, UisAppHeader, UisIcoGithub, UisBtnNews, UisBtnUpdate, UisNewsLoader, UisStgView, news};
use dioxus::prelude::*;
use dioxus_free_icons::{
    Icon,
    icons::ld_icons::{LdCircleHelp, LdSettings},
};
use settings::Settings;

const CSS: [&str; 5] = [
    include_str!("../assets/uis-colors.css"),
    include_str!("../assets/uis-app.css"),
    include_str!("../assets/uis-bar-window.css"),
    include_str!("../assets/uis-listview.css"),
    include_str!("../assets/app.css"),
];

// ─── App identity - single source of truth: Cargo.toml (see build.rs) ───────────────────────────
const APP_NAME: &str = env!("YAIOL_PRODUCT_NAME");
const APP_ID: &str = env!("CARGO_PKG_NAME");
const APP_VERSION: &str = env!("CARGO_PKG_VERSION");

/// This build's identity, `<version>.<counter>`, as ONE contiguous string that survives into the
/// executable. The apps-cockpit finds it by its `yaiol-build:` prefix to tell a buffered build from
/// the release it follows - the counter cannot ride in Cargo's three-part version, and `dx bundle`
/// writes its own Windows version resource, so this is the one channel that is entirely ours.
/// ⚠ keep it a single `concat!` of literals, and read it through `black_box` (as
/// app_version_build does). A plain `BUILD_ID["yaiol-build:".len()..]` is constant-folded and the
/// optimiser keeps only the suffix - the PREFIX the cockpit searches for disappears from the exe and
/// every build reads as the bare release (found 2026-10-12 by grepping the staged exe).
const BUILD_ID: &str = concat!("yaiol-build:", env!("YAIOL_BUILD_ID"));

/// The full build identity shown to the user: the release version plus the build counter (the 4th
/// segment a buffered commit bumps), or just the release version on a clean build.
/// ⚠ DISPLAY ONLY. The release version (`CARGO_PKG_VERSION`) stays plain three-part semver
/// and must not absorb the counter: an update check compares it against the published version, and
/// four parts is not semver.
fn app_version_build() -> String {
    let full = std::hint::black_box(BUILD_ID);
    let id = &full["yaiol-build:".len()..];
    id.strip_suffix(".0").unwrap_or(id).to_owned()
}

/// A window that opens at a known size and place. Only a debug build needs it written out: see main().
#[cfg(debug_assertions)]
fn explicit_placement(window: dioxus::desktop::WindowBuilder) -> dioxus::desktop::WindowBuilder {
    window
        .with_inner_size(dioxus::desktop::LogicalSize::new(1100.0, 720.0))
        .with_position(dioxus::desktop::LogicalPosition::new(120.0, 80.0))
}

#[cfg(not(debug_assertions))]
fn explicit_placement(window: dioxus::desktop::WindowBuilder) -> dioxus::desktop::WindowBuilder {
    window.with_inner_size(dioxus::desktop::LogicalSize::new(1100.0, 720.0))
}

/// The window has no system frame: the app draws its own bar (`UisBarWindow`), which moves it and holds the three
/// window buttons. The system still resizes it from its edges, and on Windows it keeps its shadow.
fn frameless(window: dioxus::desktop::WindowBuilder) -> dioxus::desktop::WindowBuilder {
    let window = window.with_decorations(false);
    #[cfg(windows)]
    let window = {
        use dioxus::desktop::tao::platform::windows::WindowBuilderExtWindows;
        window.with_undecorated_shadow(true)
    };
    window
}

fn main() {
    // ⚠ in a DEBUG build Dioxus writes the window's position and size to `window-state.json` in
    // the temp folder when the app ends and puts the window back there on the next launch - for EVERY
    // Dioxus app on the machine, from the one shared file. A session that ended while the window was
    // MINIMIZED saved (-32000, -32000) and a 200 px square, so the next `cargo run` opened off screen
    // at that size and could not be brought back. Dioxus restores only what the app did NOT set
    // explicitly, so a debug build sets both, here. A release build never restores anything.
    let window = frameless(explicit_placement(
        dioxus::desktop::WindowBuilder::new().with_title(APP_NAME).with_min_inner_size(dioxus::desktop::LogicalSize::new(800.0, 500.0)),
    ));

    dioxus::LaunchBuilder::desktop()
        .with_cfg(
            dioxus::desktop::Config::new()
                // ⚠ the browser's own right-click menu (Back, Reload, Save as, Print, Inspect) is
                // never offered. Dioxus keeps it in a debug build by default - which is how it reached the
                // list on 2026-10-13 - and an app that wants a context menu draws its own.
                .with_disable_context_menu(true)
                .with_window(window)
                .with_menu(None::<dioxus::desktop::muda::Menu>),
        )
        .launch(App);
}

#[component]
fn App() -> Element {
    let saved = use_hook(settings::load);
    let mut lang = use_signal(|| saved.lang.clone());
    let mut theme = use_signal(|| saved.theme.clone());
    let mut settings_open = use_signal(|| false);
    // The window bar shows maximize or restore: the window says which, and says so again whenever its size
    // changes (the bar's own button is one way among several: a snap, Win+Up, a double click).
    let mut maximized = use_signal(|| dioxus::desktop::window().is_maximized());
    // The bar is painted like the system's own title bars: the accent colour when the system colours them, and only
    // while this window is the active one (an inactive title bar is neutral). Read again each time the window comes
    // to the front, so a colour changed in the system's settings shows on return.
    let mut bar_colour = use_signal(window_accent::title_bar);
    dioxus::desktop::use_wry_event_handler(move |event, _| {
        if let dioxus::desktop::tao::event::Event::WindowEvent { event, .. } = event {
            match event {
                dioxus::desktop::WindowEvent::Resized(_) => {
                    let now = dioxus::desktop::window().is_maximized();
                    if *maximized.peek() != now {
                        maximized.set(now);
                    }
                }
                dioxus::desktop::WindowEvent::Focused(active) => {
                    let now = if *active { window_accent::title_bar() } else { None };
                    if *bar_colour.peek() != now {
                        bar_colour.set(now);
                    }
                }
                _ => {}
            }
        }
    });
    use_effect(move || {
        let script = match bar_colour() {
            Some(rgb) => {
                let (bgd, text, hov) = window_accent::bar_colours(rgb);
                format!("const s=document.documentElement.style; s.setProperty('--uis-win-bar-bgd','{bgd}'); s.setProperty('--uis-win-bar-text','{text}'); s.setProperty('--uis-win-bar-hov','{hov}');")
            }
            None => "const s=document.documentElement.style; s.removeProperty('--uis-win-bar-bgd'); s.removeProperty('--uis-win-bar-text'); s.removeProperty('--uis-win-bar-hov');".to_owned(),
        };
        let _ = document::eval(&script);
    });
    // "Show news from yaiol": ONE switch per MACHINE, shared by every yaiol app (a small file in the yaiol
    // app-data folder), so it is read from there rather than from this app's own settings.
    let mut news_on = use_signal(|| news::read_state().enabled);

    // What the two panes share. The list is read once at start; the refresh button reads it again.
    let ui = views::Ui {
        lang,
        listing: use_signal(|| views::Listing::Loading),
        filter: use_signal(String::new),
        selected: use_signal(|| None),
        shown: use_signal(|| None),
        tools_expanded: use_signal(|| false),
        tools_shown: use_signal(|| true),
        copied: use_signal(|| None),
        show_active: use_signal(|| true),
        show_archived: use_signal(|| true),
        show_lost: use_signal(|| true),
        source_off: use_signal(std::collections::HashSet::new),
    };
    use_context_provider(|| ui);
    use_hook(|| {
        ui.load_sessions();
        // The page tells of a click on a table's copy button or on a link inside a transcript.
        spawn(async move {
            let mut clicks = document::eval(&page::bridge_js());
            while let Ok(msg) = clicks.recv::<page::Msg>().await {
                match msg.k.as_str() {
                    "table" => views::copy_table(msg.html, msg.text),
                    // only a web address is ever opened: a transcript holds whatever a tool printed
                    "link" if msg.text.starts_with("https://") || msg.text.starts_with("http://") => {
                        let _ = open::that(&msg.text);
                    }
                    _ => {}
                }
            }
        });
    });


    // <html> carries the language, its text direction and the theme: the catalog CSS keys off
    // `data-theme`, and a right-to-left language needs `dir` for the webview's own text engine.
    use_effect(move || {
        let code = lang();
        let dir = if engine::is_rtl(&code) { "rtl" } else { "ltr" };
        let _ = document::eval(&format!(
            "const r=document.documentElement; r.setAttribute('lang','{}'); r.setAttribute('dir','{dir}'); r.setAttribute('data-theme','{}');",
            code.replace('_', "-"),
            theme()
        ));
    });

    // Every change persists immediately, so leaving the settings page is plain navigation.
    use_effect(move || settings::save(&Settings { lang: lang(), theme: theme() }));

    let code = lang();
    let t = |key: &str| i18n::t(&code, key);
    let tip_help = t("tipHdrHelp");
    let tip_settings = t("tipHdrSettings");
    let (tip_minimize, tip_maximize, tip_restore, tip_close) = (t("tipWinMinimize"), t("tipWinMaximize"), t("tipWinRestore"), t("tipWinClose"));
    let lbl_news = t("lblStgGeneralNews");

    let version = app_version_build();
    // The app's own icon, shown at the start of the window bar: the file the executable carries, as a page picture.
    let app_icon = use_hook(|| {
        use base64::{Engine, engine::general_purpose::STANDARD};
        format!("data:image/png;base64,{}", STANDARD.encode(include_bytes!("../assets/app.png")))
    });
    let help_url = site::site_url(APP_ID, &code, "help");
    let github_url = format!("https://github.com/yaiol/{APP_ID}");

    rsx! {
        for css in CSS {
            style { "{css}" }
        }
        div { class: "uis-app-root",
            // A new version (first) and the yaiol news, in one dialog; what is shown is decided inside.
            UisNewsLoader { app_id: APP_ID, app_version: APP_VERSION, lang: lang() }
            UisBarWindow {
                app_name: APP_NAME,
                app_version: version.clone(),
                icon_src: app_icon,
                maximized: maximized(),
                tip_minimize,
                tip_maximize,
                tip_restore,
                tip_close,
                on_minimize: move |_| dioxus::desktop::window().set_minimized(true),
                on_maximize: move |_| dioxus::desktop::window().toggle_maximized(),
                on_close: move |_| dioxus::desktop::window().close(),
                on_drag: move |_| dioxus::desktop::window().drag(),
                on_menu: move |_| window_menu::show(),
                button {
                    class: if settings_open() { "uis-barh-window-btn uis-stg-toggle active" } else { "uis-barh-window-btn uis-stg-toggle" },
                    title: "{tip_settings}",
                    "aria-label": "{tip_settings}",
                    "aria-pressed": "{settings_open()}",
                    onclick: move |_| settings_open.toggle(),
                    Icon { width: 24, height: 24, icon: LdSettings }
                }
                button {
                    class: "uis-barh-window-btn",
                    title: "{tip_help}",
                    "aria-label": "{tip_help}",
                    onclick: move |_| {
                        let _ = open::that(&help_url);
                    },
                    Icon { width: 24, height: 24, icon: LdCircleHelp }
                }
                button {
                    class: "uis-barh-window-btn",
                    title: "GitHub",
                    "aria-label": "GitHub",
                    onclick: move |_| {
                        let _ = open::that(&github_url);
                    },
                    UisIcoGithub {}
                }
                // A newer version is out: the reminder, drawn only then; a click reopens the update card.
                UisBtnUpdate { lang: lang() }
                // yaiol has news for this app: the second reminder, drawn only then; a click reopens the announcements.
                UisBtnNews { lang: lang() }
            }
            // The name and the version are in the window bar, so the header holds the work buttons only.
            UisAppHeader { app_name: APP_NAME, app_version: version.clone(), bare: true,
            }
            // .uis-app-main = the growable content region. It is also the anchor for any
            // content-scoped overlay (settings, file drop).
            div { class: "uis-app-main",
                if settings_open() {
                    UisStgView {
                        app_name: APP_NAME,
                        app_version: version.clone(),
                        lang: lang(),
                        theme: theme(),
                        on_set_lang: move |l| lang.set(l),
                        on_set_theme: move |th| theme.set(th),
                        on_close: move |_| settings_open.set(false),
                        general_extra: Some(rsx! {
                            div { class: "uis-fld-labelled divider",
                                label { class: "uis-chk-lbl",
                                    input {
                                        r#type: "checkbox",
                                        class: "uis-chk-box",
                                        checked: news_on(),
                                        onchange: move |e| {
                                            news::set_enabled(e.checked());
                                            news_on.set(e.checked());
                                        },
                                    }
                                    "{lbl_news}"
                                }
                            }
                        }),
                    }
                }
                // The two panes: the sessions on the left, the chosen one's transcript on the right.
                div { class: "sv-split",
                    views::SessionList {}
                    views::TranscriptView {}
                }
            }
        }
    }
}
