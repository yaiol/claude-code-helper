//! A message's Markdown as HTML the page can show, and the small figures of the window (dates, counts).
//!
//! The HTML is cleaned before it reaches the page: a transcript holds whatever a tool printed, and none of
//! it may run as a script. The folded tool blocks (`<details>`, `<summary>`) and the classes they are
//! styled by are kept; a picture may be an embedded `data:` address (screenshots are stored that way).

use pulldown_cmark::{Options, Parser, html};

/// Markdown to cleaned HTML.
pub fn markdown_to_html(md: &str) -> String {
    let options = Options::ENABLE_TABLES | Options::ENABLE_STRIKETHROUGH | Options::ENABLE_TASKLISTS;
    let mut raw = String::with_capacity(md.len() * 2);
    html::push_html(&mut raw, Parser::new_ext(md, options));
    let mut clean = ammonia::Builder::default();
    clean
        .add_tags(["details", "summary"])
        .add_tag_attributes("details", ["class", "open"])
        .add_tag_attributes("div", ["class"])
        .add_tag_attributes("code", ["class"])
        .add_url_schemes(["data"]);
    clean.clean(&raw).to_string()
}

/// The copy icon and its "done" state, as the page draws them inside a table's copy button.
pub const SVG_COPY: &str = r#"<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>"#;
pub const SVG_CHECK: &str = r#"<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>"#;

/// What the window adds to cleaned HTML, AFTER the cleaning so it is never stripped: every table gets a
/// hover container with a copy button (`tip` is its tooltip), and `expanded` opens every folded tool block.
pub fn decorate(html: &str, tip: &str, expanded: bool) -> String {
    let mut out = if expanded { html.replace("<details ", "<details open ") } else { html.to_owned() };
    if out.contains("<table>") {
        let tip = tip.replace('&', "&amp;").replace('"', "&quot;").replace('<', "&lt;");
        let button = format!(r#"<div class="sv-tblwrap"><button type="button" class="uis-btn ico sv-tblcopy" title="{tip}" aria-label="{tip}">{SVG_COPY}</button><table>"#);
        out = out.replace("<table>", &button).replace("</table>", "</table></div>");
    }
    out
}

/// A moment (milliseconds since 1970) as the local date and time; empty when unknown.
pub fn format_date(ms: f64) -> String {
    if ms <= 0.0 {
        return String::new();
    }
    chrono::DateTime::from_timestamp_millis(ms as i64).map(|d| d.with_timezone(&chrono::Local).format("%Y-%m-%d %H:%M").to_string()).unwrap_or_default()
}

/// A token count in short: 2.2M, 1.14B, 312k.
pub fn format_tokens(n: u64) -> String {
    let f = n as f64;
    if f >= 1e9 {
        format!("{:.2}B", f / 1e9)
    } else if f >= 1e6 {
        format!("{:.1}M", f / 1e6)
    } else if f >= 1e3 {
        format!("{}k", (f / 1e3).round())
    } else {
        n.to_string()
    }
}

/// Working time in short: hours with one decimal, minutes below one hour (never less than 1).
pub fn format_active(ms: f64) -> String {
    let hours = ms / 3.6e6;
    if hours >= 1.0 { format!("{hours:.1} h") } else { format!("{} min", (ms / 6e4).round().max(1.0)) }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn markdown_becomes_html_and_scripts_never_pass() {
        let html = markdown_to_html("**bold** and `code`\n\n<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>");
        assert!(html.contains("<strong>bold</strong>") && html.contains("<code>code</code>"), "{html}");
        assert!(!html.contains("script") && !html.contains("onerror"), "{html}");
    }

    #[test]
    fn the_folded_tool_block_survives_the_cleaning() {
        let md = "<details class=\"sv-tool\"><summary><b>Bash</b> - <code>ls</code></summary>\n\n<pre><code>{\n\n  \"a\": 1\n}</code></pre><div class=\"sv-tool-out sv-tool-err\"><pre><code>x &lt; y</code></pre></div></details>";
        let html = markdown_to_html(md);
        assert!(html.contains("<details class=\"sv-tool\"><summary><b>Bash</b> - <code>ls</code></summary>"), "{html}");
        assert!(html.contains("<div class=\"sv-tool-out sv-tool-err\"><pre><code>x &lt; y</code></pre></div></details>"), "{html}");
        assert!(html.contains("{\n\n  \"a\": 1\n}"), "{html}");
        assert!(decorate(&html, "Copy", true).contains("<details open class=\"sv-tool\">"));
    }

    #[test]
    fn an_embedded_picture_is_kept() {
        let html = markdown_to_html("![image](data:image/png;base64,AAAA)");
        assert!(html.contains("src=\"data:image/png;base64,AAAA\""), "{html}");
    }

    #[test]
    fn a_table_gets_its_copy_button() {
        let html = markdown_to_html("| a | b |\n|---|---|\n| 1 | 2 |");
        let out = decorate(&html, "Copy \"table\"", false);
        assert!(out.contains("<div class=\"sv-tblwrap\"><button type=\"button\" class=\"uis-btn ico sv-tblcopy\" title=\"Copy &quot;table&quot;\""), "{out}");
        assert!(out.trim_end().ends_with("</table></div>"), "{out}");
        assert_eq!(decorate("<p>no table</p>", "Copy", false), "<p>no table</p>");
    }

    #[test]
    fn figures_are_short() {
        assert_eq!(format_tokens(999), "999");
        assert_eq!(format_tokens(312_400), "312k");
        assert_eq!(format_tokens(2_190_000), "2.2M");
        assert_eq!(format_tokens(1_140_000_000), "1.14B");
        assert_eq!(format_active(20_000.0), "1 min");
        assert_eq!(format_active(45.0 * 60_000.0), "45 min");
        assert_eq!(format_active(5_400_000.0), "1.5 h");
        assert_eq!(format_date(0.0), "");
    }
}
