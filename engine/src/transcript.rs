//! A session's transcript (`.jsonl`, one log entry per line) decoded into what the app shows and exports.
//!
//! - `messages`: what the window draws, one bubble per item. The role places the bubble; there is no label.
//! - `markdown`: the standalone document the export and the copy write (`### User` per user turn,
//!   `### Claude` once per run of assistant entries). Those headings are CONTENT of that document, in
//!   English on purpose, not interface text.
//!
//! A tool call and its result are ONE folded block: the result is the tool's answer, so it lives inside the
//! call's `<details>`, matched by id. ⚠ do not bring back a separate "result" message or toggle.

use crate::sessions::millis;
use serde_json::Value;
use std::{collections::HashMap, fs, path::Path};

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Role {
    User,
    Assistant,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Message {
    pub role: Role,
    pub md: String,
    /// A run of tool calls with no prose.
    pub tool: bool,
}

/// What the session cost and how long the agent actually worked, from the log alone.
#[derive(Clone, Copy, Debug, Default, PartialEq)]
pub struct Stats {
    pub total_tokens: u64,
    /// Milliseconds the model was generating or a tool was running.
    pub active_ms: f64,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Decoded {
    pub markdown: String,
    pub messages: Vec<Message>,
    /// The first timestamp of the log, in milliseconds since 1970; 0 = none.
    pub first_ts: f64,
    pub stats: Stats,
}

/// A silent gap this long inside a working stretch is a suspended machine or a dropped connection, not
/// work: it is cut to this so one sleep cannot add hours of "agent time".
const MAX_WORK_GAP_MS: f64 = 30.0 * 60.0 * 1000.0;

/// Large blobs are cut so a long session stays drawable. Lengths are counted in UTF-16 units, as the
/// Electron version counts them (an emoji is two), so both apps cut a text at the same place.
fn truncate(text: &str, max: usize) -> String {
    let count: usize = text.chars().map(char::len_utf16).sum();
    if count <= max {
        return text.to_owned();
    }
    let (mut units, mut end) = (0, 0);
    for (i, c) in text.char_indices() {
        if units + c.len_utf16() > max {
            break;
        }
        units += c.len_utf16();
        end = i + c.len_utf8();
    }
    format!("{}\n… [truncated {} chars]", &text[..end], count - max)
}

fn esc(text: &str) -> String {
    text.replace('&', "&amp;").replace('<', "&lt;").replace('>', "&gt;")
}

/// The one most telling field of a tool call, for its summary line.
fn tool_summary(input: &Value) -> String {
    // `description` first: when a call carries one, it says what the call is for in plain words.
    for key in ["description", "file_path", "path", "command", "pattern", "url", "query", "prompt"] {
        let text = match &input[key] {
            Value::String(s) if !s.is_empty() => s.clone(),
            Value::Null | Value::String(_) | Value::Bool(false) => continue,
            other => other.to_string(),
        };
        // every run of white space becomes one space; the ends are NOT trimmed (as the Electron version)
        let mut flat = String::with_capacity(text.len());
        let mut in_space = false;
        for c in text.chars() {
            // the byte-order mark counts as a space there too
            if c.is_whitespace() || c == '\u{feff}' {
                if !in_space {
                    flat.push(' ');
                }
                in_space = true;
            } else {
                flat.push(c);
                in_space = false;
            }
        }
        return truncate(&flat, 120);
    }
    String::new()
}

/// A tool result's content as plain text.
fn result_text(block: &Value) -> String {
    match &block["content"] {
        Value::Array(parts) => parts.iter().map(|p| p.as_str().or_else(|| p["text"].as_str()).unwrap_or("")).collect::<Vec<_>>().join("\n"),
        Value::String(s) => s.clone(),
        Value::Null => String::new(),
        other => other.to_string(),
    }
}

struct ToolResult {
    text: String,
    is_error: bool,
}

/// A tool call as a `<details>`: the summary line always shown; the input, and the tool's own answer under
/// it, folded until opened. Raw HTML on purpose: a fenced block cannot fold.
fn tool_details(name: &str, summary: &str, input_json: &str, result: Option<&ToolResult>) -> String {
    let sum = if summary.is_empty() { String::new() } else { format!(" - <code>{}</code>", esc(summary)) };
    let mut body = format!("<pre><code>{}</code></pre>", esc(input_json));
    if let Some(r) = result.filter(|r| !r.text.trim().is_empty()) {
        body.push_str(&format!(
            "<div class=\"sv-tool-out{}\"><pre><code>{}</code></pre></div>",
            if r.is_error { " sv-tool-err" } else { "" },
            esc(&truncate(&r.text, 1500))
        ));
    }
    format!("<details class=\"sv-tool\"><summary><b>{}</b>{sum}</summary>\n\n{body}</details>", esc(name))
}

fn block_to_md(block: &Value, results: &HashMap<String, ToolResult>, show_tools: bool) -> String {
    if let Some(text) = block.as_str() {
        return text.to_owned();
    }
    match block["type"].as_str() {
        Some("text") => block["text"].as_str().unwrap_or("").to_owned(),
        Some("thinking") => {
            // ⚠ a transcript keeps only the encrypted signature of a thinking block, never its
            // words: the text is always empty. Nothing is written then; the signature is opaque, never show it.
            let text = block["thinking"].as_str().unwrap_or("").trim();
            if text.is_empty() {
                return String::new();
            }
            format!("> *thinking*\n>\n{}", text.lines().map(|l| format!("> {l}")).collect::<Vec<_>>().join("\n"))
        }
        Some("image") => {
            // The picture itself: a transcript holds a screenshot as base64, which becomes an address the
            // page can draw and the exported file carries with it. A linked picture is linked as it is.
            let source = &block["source"];
            match (source["type"].as_str(), source["data"].as_str(), source["url"].as_str()) {
                (Some("base64"), Some(data), _) if !data.is_empty() => format!("![image](data:{};base64,{data})", source["media_type"].as_str().unwrap_or("image/png")),
                (Some("url"), _, Some(url)) if !url.is_empty() => format!("![image]({url})"),
                _ => "_[image]_".to_owned(),
            }
        }
        Some("tool_use") => {
            let name = block["name"].as_str().filter(|n| !n.is_empty()).unwrap_or("tool");
            // The desktop app's own turn bookkeeping (its task list, its end-of-turn recap) is not work
            // done on the project, and Claude Desktop does not show it either. ⚠ This prefix only: every
            // other call of that family (sessions, panes, pull requests) is real work and stays.
            if !show_tools || name.starts_with("mcp__ccd_turn__") {
                return String::new();
            }
            let input = if block["input"].is_null() { Value::Object(Default::default()) } else { block["input"].clone() };
            let json = truncate(&serde_json::to_string_pretty(&input).unwrap_or_default(), 1200);
            tool_details(name, &tool_summary(&input), &json, block["id"].as_str().and_then(|id| results.get(id)))
        }
        // folded into its call's block (by id), never shown by itself
        Some("tool_result") => String::new(),
        _ if block.is_object() => format!("```json\n{}\n```", truncate(&block.to_string(), 600)),
        _ => String::new(),
    }
}

/// Tokens and working time.
///   tokens: one API message is logged once per content block with its usage repeated, so usage is counted
///           once per message id (adding up the lines roughly doubles it).
///   time:   the gap before each entry belongs to what ended it: an assistant entry = the model generating,
///           a tool result = a tool running. A gap ended by a real user prompt is the human thinking or
///           away, and is NOT agent time.
/// Subagents' work is not in the main log, so it is not counted.
fn usage_stats(entries: &[Value]) -> Stats {
    let mut by_message: HashMap<String, &Value> = HashMap::new();
    let (mut active_ms, mut prev): (f64, Option<f64>) = (0.0, None);
    for e in entries {
        let assistant = e["type"] == "assistant";
        let usage = &e["message"]["usage"];
        if assistant && usage.is_object() {
            let id = e["message"]["id"].as_str().or_else(|| e["uuid"].as_str()).unwrap_or("").to_owned();
            by_message.insert(id, usage);
        }
        let ts = millis(&e["timestamp"]);
        if ts > 0.0 {
            if let Some(p) = prev {
                let gap = (ts - p).clamp(0.0, MAX_WORK_GAP_MS);
                let tool_done = e["message"]["content"].as_array().is_some_and(|c| c.iter().any(|b| b["type"] == "tool_result"));
                if assistant || tool_done {
                    active_ms += gap;
                }
            }
            prev = Some(ts);
        }
    }
    let total_tokens = by_message
        .values()
        .map(|u| ["output_tokens", "input_tokens", "cache_creation_input_tokens", "cache_read_input_tokens"].iter().map(|k| u[*k].as_u64().unwrap_or(0)).sum::<u64>())
        .sum();
    Stats { total_tokens, active_ms }
}

/// Decode a transcript's text. `tools: false` leaves the tool calls out altogether: what the export and the
/// copy use when the reader has hidden them in the window.
pub fn decode(raw: &str, tools: bool) -> Decoded {
    struct Turn {
        role: Role,
        content: Vec<Value>,
    }
    let mut turns: Vec<Turn> = Vec::new();
    let mut entries: Vec<Value> = Vec::new(); // every user / assistant entry (meta too): feeds the stats
    let mut results: HashMap<String, ToolResult> = HashMap::new();
    let mut first_ts = 0.0;

    // Pass 1: read, and index the tool results by id so each call can fold in its own answer.
    for line in raw.lines().filter(|l| !l.is_empty()) {
        let Ok(obj) = serde_json::from_str::<Value>(line) else { continue };
        if first_ts == 0.0 {
            first_ts = millis(&obj["timestamp"]);
        }
        let kind = obj["type"].as_str().unwrap_or("");
        if kind != "user" && kind != "assistant" {
            continue; // queue operations, snapshots, summaries
        }
        let meta = obj["isMeta"].as_bool() == Some(true);
        let role = match obj["message"]["role"].as_str().unwrap_or(kind) {
            "assistant" => Role::Assistant,
            _ => Role::User,
        };
        let content = match &obj["message"]["content"] {
            Value::String(s) => Some(vec![serde_json::json!({ "type": "text", "text": s })]),
            Value::Array(a) => Some(a.clone()),
            _ => None,
        };
        entries.push(obj);
        if meta {
            continue;
        }
        let Some(content) = content else { continue };
        for b in &content {
            if b["type"] == "tool_result" {
                if let Some(id) = b["tool_use_id"].as_str() {
                    results.insert(id.to_owned(), ToolResult { text: result_text(b), is_error: b["is_error"].as_bool() == Some(true) });
                }
            }
        }
        turns.push(Turn { role, content });
    }

    // Pass 2: write. Tool results are inside their call now, so a user turn made only of them is plumbing
    // and is dropped.
    let mut segments: Vec<(String, bool)> = Vec::new(); // the export's pieces: (text, tool-only)
    let mut messages: Vec<Message> = Vec::new();
    let mut last_role: Option<Role> = None;
    for turn in &turns {
        if turn.role == Role::User && !turn.content.is_empty() && turn.content.iter().all(|b| b["type"] == "tool_result") {
            continue;
        }
        let body = turn.content.iter().map(|b| block_to_md(b, &results, tools)).filter(|s| !s.trim().is_empty()).collect::<Vec<_>>().join("\n\n");
        if body.trim().is_empty() {
            continue;
        }
        // "### User" at each user turn; "### Claude" only where a run of assistant entries STARTS (one turn
        // is often many assistant and tool entries: the label is not repeated on each).
        let continues = turn.role == Role::Assistant && last_role == Some(Role::Assistant);
        let heading = if turn.role == Role::Assistant { "### Claude" } else { "### User" };
        let tool = !turn.content.iter().any(|b| b["type"] == "text" && !b["text"].as_str().unwrap_or("").trim().is_empty());
        segments.push((if continues { body.clone() } else { format!("{heading}\n\n{body}") }, tool));
        last_role = Some(turn.role);

        // In the window a run of tool-only entries is ONE message, so the calls read as one tight list
        // instead of one spaced bubble each.
        match messages.last_mut() {
            Some(prev) if tool && turn.role == Role::Assistant && prev.role == Role::Assistant && prev.tool => {
                prev.md.push_str("\n\n");
                prev.md.push_str(&body);
            }
            _ => messages.push(Message { role: turn.role, md: body, tool }),
        }
    }

    // A rule between the pieces, EXCEPT between two tool-only pieces in a row (a run of calls reads as one
    // list); the rule stays between an answer and its tools, and at every change of speaker.
    let mut markdown = String::new();
    for (i, (text, tool)) in segments.iter().enumerate() {
        if i > 0 {
            markdown.push_str(if segments[i - 1].1 && *tool { "\n\n" } else { "\n\n---\n\n" });
        }
        markdown.push_str(text);
    }

    Decoded { markdown, messages, first_ts, stats: usage_stats(&entries) }
}

/// Decode a transcript file. `None` = it could not be read.
pub fn decode_file(file: &Path, tools: bool) -> Option<Decoded> {
    // a transcript is UTF-8; a broken byte must not make the whole session unreadable
    fs::read(file).ok().map(|bytes| decode(&String::from_utf8_lossy(&bytes), tools))
}

/// The document an export writes: the title, then the conversation.
pub fn export_document(title: &str, decoded: &Decoded) -> String {
    format!("# {title}\n\n{}\n", decoded.markdown)
}

/// The file name an export proposes: the title made safe for a file, then the day the session began.
pub fn export_file_name(title: &str, first_ts: f64) -> String {
    let title = if title.is_empty() { "session" } else { title };
    let mut safe = String::new();
    let mut in_bad = false;
    for c in title.chars() {
        if matches!(c, '\\' | '/' | ':' | '*' | '?' | '"' | '<' | '>' | '|') {
            if !in_bad {
                safe.push('_');
            }
            in_bad = true;
        } else {
            safe.push(c);
            in_bad = false;
        }
    }
    let safe: String = safe.split_whitespace().collect::<Vec<_>>().join(" ").chars().take(80).collect();
    let safe = if safe.trim().is_empty() { "session".to_owned() } else { safe.trim().to_owned() };
    match chrono::DateTime::from_timestamp_millis(first_ts as i64).filter(|_| first_ts > 0.0) {
        Some(day) => format!("{safe} - {}.md", day.with_timezone(&chrono::Local).format("%Y-%m-%d")),
        None => format!("{safe}.md"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const LOG: &str = r#"{"type":"summary","summary":"x"}
{"type":"user","timestamp":"2026-01-01T10:00:00Z","message":{"role":"user","content":"Fix the <bug>"}}
{"type":"user","isMeta":true,"timestamp":"2026-01-01T10:00:01Z","message":{"role":"user","content":"meta noise"}}
{"type":"assistant","timestamp":"2026-01-01T10:00:10Z","message":{"id":"m1","role":"assistant","usage":{"output_tokens":10,"input_tokens":5,"cache_read_input_tokens":100},"content":[{"type":"text","text":"Looking."}]}}
{"type":"assistant","timestamp":"2026-01-01T10:00:12Z","message":{"id":"m1","role":"assistant","usage":{"output_tokens":10,"input_tokens":5,"cache_read_input_tokens":100},"content":[{"type":"tool_use","id":"t1","name":"Bash","input":{"command":"ls  -la","description":"List files"}}]}}
{"type":"user","timestamp":"2026-01-01T10:00:20Z","message":{"role":"user","content":[{"type":"tool_result","tool_use_id":"t1","content":[{"type":"text","text":"a.txt & b.txt"}]}]}}
{"type":"assistant","timestamp":"2026-01-01T10:00:25Z","message":{"id":"m2","role":"assistant","usage":{"output_tokens":7,"cache_creation_input_tokens":3},"content":[{"type":"tool_use","id":"t2","name":"mcp__ccd_turn__update_plan","input":{}},{"type":"tool_use","id":"t3","name":"Read","input":{"file_path":"a.txt"}}]}}
{"type":"user","timestamp":"2026-01-01T10:00:26Z","message":{"role":"user","content":[{"type":"tool_result","tool_use_id":"t3","is_error":true,"content":"no such file"}]}}
{"type":"assistant","timestamp":"2026-01-01T10:00:30Z","message":{"id":"m3","role":"assistant","content":[{"type":"thinking","thinking":"","signature":"zzz"},{"type":"text","text":"Done."}]}}
{"type":"user","timestamp":"2026-01-01T12:00:00Z","message":{"role":"user","content":[{"type":"text","text":"Thanks"},{"type":"image","source":{"type":"base64","media_type":"image/png","data":"AAAA"}}]}}
not json at all
"#;

    #[test]
    fn decodes_the_conversation_for_the_window() {
        let d = decode(LOG, true);
        let shape: Vec<(Role, bool)> = d.messages.iter().map(|m| (m.role, m.tool)).collect();
        assert_eq!(shape, vec![(Role::User, false), (Role::Assistant, false), (Role::Assistant, true), (Role::Assistant, false), (Role::User, false)]);
        assert_eq!(d.messages[0].md, "Fix the <bug>");
        // the two tool-only entries are one message: both calls, each with its result folded in
        let tools = &d.messages[2].md;
        assert_eq!(tools.matches("<details class=\"sv-tool\">").count(), 2);
        assert!(tools.contains("<summary><b>Bash</b> - <code>List files</code></summary>"), "{tools}");
        assert!(tools.contains("<div class=\"sv-tool-out\"><pre><code>a.txt &amp; b.txt</code></pre></div>"), "{tools}");
        assert!(tools.contains("<div class=\"sv-tool-out sv-tool-err\"><pre><code>no such file</code></pre></div>"), "{tools}");
        // the desktop app's own bookkeeping call is not shown
        assert!(!tools.contains("update_plan"));
        // an empty thinking block writes nothing
        assert_eq!(d.messages[3].md, "Done.");
        assert_eq!(d.messages[4].md, "Thanks\n\n![image](data:image/png;base64,AAAA)");
    }

    #[test]
    fn the_export_labels_each_speaker_once_per_run() {
        let d = decode(LOG, true);
        assert_eq!(d.markdown.matches("### User").count(), 2);
        assert_eq!(d.markdown.matches("### Claude").count(), 1);
        assert!(d.markdown.starts_with("### User\n\nFix the <bug>\n\n---\n\n### Claude\n\nLooking.\n\n---\n\n<details"));
        // no rule between the two runs of tool calls, one before the closing answer
        assert!(d.markdown.contains("</details>\n\n<details"));
        assert!(d.markdown.contains("</details>\n\n---\n\nDone."));
        assert_eq!(export_document("T", &d).lines().next(), Some("# T"));
    }

    #[test]
    fn hiding_the_tools_leaves_only_the_conversation() {
        let d = decode(LOG, false);
        assert!(!d.markdown.contains("<details"));
        assert_eq!(d.messages.len(), 4);
        assert!(d.messages.iter().all(|m| !m.tool));
    }

    #[test]
    fn tokens_are_counted_once_per_message_and_idle_time_is_left_out() {
        let d = decode(LOG, true);
        // m1 (logged twice) 115 + m2 10
        assert_eq!(d.stats.total_tokens, 125);
        // generating: 9 + 2 + 5 + 4 s; tools running: 8 + 1 s; the two-hour wait for the user is not counted
        assert_eq!(d.stats.active_ms, 29_000.0);
        assert_eq!(d.first_ts, 1_767_261_600_000.0);
    }

    #[test]
    fn a_long_tool_input_is_cut() {
        assert_eq!(truncate("abcdef", 4), "abcd\n… [truncated 2 chars]");
        assert_eq!(truncate("abc", 4), "abc");
    }

    #[test]
    fn the_export_name_is_safe_for_a_file() {
        assert_eq!(export_file_name("a/b: c?  d", 0.0), "a_b_ c_ d.md");
        assert_eq!(export_file_name("", 0.0), "session.md");
        assert!(export_file_name("T", 1_767_261_600_000.0).starts_with("T - 2026-01-0"));
    }
}
