//! What only the page can do inside a drawn transcript, whose HTML is put in as text (so no handler of
//! ours is on its elements): a click on a table's copy button, and a click on a link.

use serde::Deserialize;

/// A message from the page.
#[derive(Deserialize, Debug, Default)]
#[serde(default)]
pub struct Msg {
    /// `table` = a table to copy; `link` = an address to open.
    pub k: String,
    /// The table as HTML (pastes as a real table in a spreadsheet or a word processor).
    pub html: String,
    /// The table as tab-separated text (for a plain editor), or the link's address.
    pub text: String,
}

/// Installed once. `{COPY}` and `{CHECK}` are the two states of a table's copy button.
pub const BRIDGE_JS: &str = r#"
if (!window.__clch) {
  window.__clch = true;
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target || !target.closest) return;
    const btn = target.closest('.sv-tblcopy');
    if (btn) {
      const table = btn.parentElement && btn.parentElement.querySelector('table');
      if (!table) return;
      const tsv = [...table.rows].map((r) => [...r.cells].map((c) => c.innerText.replace(/\s+/g, ' ').trim()).join('\t')).join('\n');
      dioxus.send({ k: 'table', html: table.outerHTML, text: tsv });
      btn.innerHTML = `{CHECK}`;
      btn.classList.add('active');
      setTimeout(() => { btn.innerHTML = `{COPY}`; btn.classList.remove('active'); }, 1200);
      return;
    }
    // A link in a transcript opens in the system's browser, never inside this window.
    const link = target.closest('.sv-md a[href]');
    if (link) {
      e.preventDefault();
      dioxus.send({ k: 'link', text: link.href });
    }
  });
}
"#;

pub fn bridge_js() -> String {
    BRIDGE_JS.replace("{COPY}", engine::render::SVG_COPY).replace("{CHECK}", engine::render::SVG_CHECK)
}
