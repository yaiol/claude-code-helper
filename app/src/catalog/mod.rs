//! The yaiol UI catalog, Dioxus implementation.
//!
//! One catalog, two implementations: the CSS in `assets/` is the shared contract (copied from the
//! shared catalog, never edited here), and each control below emits the SAME class names and
//! element structure as its JSX twin in the shared catalog. Only the controls this app uses are
//! ported; the rest are `pending` — see the project's CLAUDE.md for the status table.

mod bar_window;
mod header;
mod icons;
pub mod news;
mod dlg_news;
mod news_loader;
mod markdown_renderer;
mod stg_view;

pub use bar_window::UisBarWindow;
pub use header::UisAppHeader;
pub use icons::UisIcoGithub;
pub use news_loader::{UisBtnNews, UisBtnUpdate, UisNewsLoader};
pub use stg_view::UisStgView;
