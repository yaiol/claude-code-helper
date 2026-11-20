//! Finding the Claude Code sessions on this machine.
//!
//! Two stores are joined by the session's id:
//!   1. Claude Desktop's own store, which holds the titles people see: one `local_*.json` per session,
//!      somewhere under a `claude-code-sessions` folder, each carrying a title, the session id, its folder.
//!   2. The transcripts, one `<id>.jsonl` per session under `~/.claude/projects/<project>/`.
//!
//! Three kinds of session come out:
//!   - **desktop**: a Desktop entry whose transcript exists;
//!   - **lost**: a transcript no Desktop entry points at (its title is taken from its first message);
//!   - **cli**: a transcript inside a running WSL distribution, which has no Desktop store at all.
//!
//! Read-only: nothing here writes to either store.

use serde_json::Value;
use std::{
    collections::{HashMap, HashSet},
    fs,
    io::Read,
    path::{Path, PathBuf},
};

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Origin {
    Desktop,
    Lost,
    Cli,
}

#[derive(Clone, Debug, PartialEq)]
pub struct Session {
    pub id: String,
    pub title: String,
    pub cwd: String,
    pub archived: bool,
    /// When it was last used, in milliseconds since 1970; 0 = unknown.
    pub last_used: f64,
    pub origin: Origin,
    /// Where it physically lives: `Windows`, or the name of a WSL distribution.
    pub source: String,
}

/// The one of three list categories a session falls in, each with its own filter.
/// A lost session is never archived, so the origin is looked at FIRST: otherwise it would count as active
/// and its own filter could never isolate it.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Category {
    Active,
    Archived,
    Lost,
}

impl Session {
    pub fn category(&self) -> Category {
        if self.origin == Origin::Lost {
            Category::Lost
        } else if self.archived {
            Category::Archived
        } else {
            Category::Active
        }
    }
}

/// The folders the stores are looked for in. Taken from the environment in the app, given by hand in tests.
#[derive(Clone, Debug, Default)]
pub struct Places {
    /// `%LOCALAPPDATA%`.
    pub local_app_data: Option<PathBuf>,
    /// `%APPDATA%`.
    pub app_data: Option<PathBuf>,
    /// The user's home folder (the transcripts are under its `.claude/projects`).
    pub home: Option<PathBuf>,
    /// Look inside the running WSL distributions too.
    pub wsl: bool,
}

impl Places {
    pub fn from_environment() -> Places {
        let var = |name: &str| std::env::var_os(name).map(PathBuf::from);
        Places { local_app_data: var("LOCALAPPDATA"), app_data: var("APPDATA"), home: var("USERPROFILE").or_else(|| var("HOME")), wsl: cfg!(windows) }
    }
}

/// Claude Desktop's data folder: the first candidate that actually CONTAINS `claude-code-sessions`.
// ⚠ the order matters and the test is the content. After Claude Desktop moved its data, the old
// folder still exists, emptied, so every location stays a candidate. The folder names carry the package
// publisher's hash: they are listed, never written here.
fn find_desktop_dir(places: &Places) -> Option<PathBuf> {
    let mut candidates: Vec<PathBuf> = Vec::new();
    if let Some(local) = &places.local_app_data {
        // where Claude Desktop keeps its data now
        if let Ok(entries) = fs::read_dir(local.join("Claude-Data")) {
            candidates.extend(entries.flatten().map(|e| e.path()).filter(|p| p.is_dir()));
        }
        // the package sandbox older versions used
        if let Ok(entries) = fs::read_dir(local.join("Packages")) {
            candidates.extend(
                entries
                    .flatten()
                    .filter(|e| e.file_name().to_string_lossy().starts_with("Claude_"))
                    .map(|e| e.path().join("LocalCache").join("Roaming").join("Claude")),
            );
        }
    }
    // a classic install, not packaged
    if let Some(roaming) = &places.app_data {
        candidates.push(roaming.join("Claude"));
    }
    candidates.into_iter().find(|dir| dir.join("claude-code-sessions").exists())
}

/// Every `<id>.jsonl` under a `projects` folder, by id. Keyed by id, so the way a project folder's name is
/// derived from its path never has to be known.
fn index_projects(projects: &Path, into: &mut HashMap<String, PathBuf>) {
    let Ok(dirs) = fs::read_dir(projects) else { return };
    for dir in dirs.flatten().map(|e| e.path()).filter(|p| p.is_dir()) {
        let Ok(files) = fs::read_dir(&dir) else { continue };
        for file in files.flatten().map(|e| e.path()) {
            if file.extension().is_some_and(|e| e == "jsonl") {
                if let Some(id) = file.file_stem() {
                    into.insert(id.to_string_lossy().into_owned(), file.clone());
                }
            }
        }
    }
}

fn index_windows(places: &Places) -> HashMap<String, PathBuf> {
    let mut map = HashMap::new();
    if let Some(home) = &places.home {
        index_projects(&home.join(".claude").join("projects"), &mut map);
    }
    map
}

// ─── WSL ────────────────────────────────────────────────────────────────────────────────────────
// Claude Code run INSIDE WSL writes to the Linux `~/.claude`, a separate store, reached from Windows over
// the `\\wsl.localhost\<distribution>\` share (each user's home, and root's).
// ⚠ the distributions are asked from `wsl.exe --list --running --quiet`, NOT by listing the share's
// root (it cannot be listed reliably). Running ones only, on purpose: it skips Docker's internal
// distributions and never cold-starts a stopped one. A stopped distribution's sessions simply do not show
// until it runs. Do not switch to every distribution without dealing with the cold start.

#[cfg(windows)]
fn running_distributions() -> Vec<String> {
    use std::os::windows::process::CommandExt;
    const CREATE_NO_WINDOW: u32 = 0x0800_0000;
    let Ok(out) = std::process::Command::new("wsl.exe").args(["--list", "--running", "--quiet"]).creation_flags(CREATE_NO_WINDOW).output() else {
        return Vec::new(); // no WSL on this machine
    };
    // wsl.exe writes UTF-16, one name per line
    let units: Vec<u16> = out.stdout.chunks_exact(2).map(|b| u16::from_le_bytes([b[0], b[1]])).collect();
    String::from_utf16_lossy(&units).lines().map(|l| l.replace('\0', "").trim().to_owned()).filter(|l| !l.is_empty()).collect()
}

#[cfg(not(windows))]
fn running_distributions() -> Vec<String> {
    Vec::new()
}

/// Every WSL transcript, as (distribution, id, file).
fn wsl_transcripts() -> Vec<(String, String, PathBuf)> {
    let mut out = Vec::new();
    for distro in running_distributions() {
        let root = PathBuf::from(format!(r"\\wsl.localhost\{distro}"));
        let mut homes: Vec<PathBuf> = fs::read_dir(root.join("home")).map(|d| d.flatten().map(|e| e.path()).filter(|p| p.is_dir()).collect()).unwrap_or_default();
        homes.push(root.join("root")); // sessions run as root
        for home in homes {
            let mut map = HashMap::new();
            index_projects(&home.join(".claude").join("projects"), &mut map);
            out.extend(map.into_iter().map(|(id, file)| (distro.clone(), id, file)));
        }
    }
    out
}

/// The transcript of a session, wherever it lives: the Windows store first (local, fast), then WSL.
pub fn find_transcript(places: &Places, id: &str) -> Option<PathBuf> {
    if id.is_empty() {
        return None;
    }
    if let Some(file) = index_windows(places).remove(id) {
        return Some(file);
    }
    if places.wsl {
        return wsl_transcripts().into_iter().find(|(_, found, _)| found == id).map(|(_, _, file)| file);
    }
    None
}

// ─── A row from a bare transcript ───────────────────────────────────────────────────────────────

/// The start of a file only: a transcript can be many megabytes, and a list row needs what its first
/// lines say.
fn read_head(file: &Path) -> String {
    let mut buf = Vec::with_capacity(65536);
    match fs::File::open(file) {
        Ok(f) => {
            let _ = f.take(65536).read_to_end(&mut buf);
            String::from_utf8_lossy(&buf).into_owned()
        }
        Err(_) => String::new(),
    }
}

/// A timestamp as milliseconds since 1970: a number as it is, a date in text parsed; anything else is 0.
pub(crate) fn millis(value: &Value) -> f64 {
    match value {
        Value::Number(n) => n.as_f64().unwrap_or(0.0),
        Value::String(s) => chrono::DateTime::parse_from_rfc3339(s).map(|d| d.timestamp_millis() as f64).unwrap_or(0.0),
        _ => 0.0,
    }
}

/// A session that has no Desktop entry: its title is its first user message (what Claude Code itself
/// titles a session from), its folder and first date come from the first lines too.
fn bare_session(id: &str, file: &Path, origin: Origin, source: &str) -> Option<Session> {
    let head = read_head(file);
    if head.is_empty() {
        return None;
    }
    let (mut title, mut cwd, mut first_ts) = (String::new(), String::new(), 0.0);
    for line in head.lines().filter(|l| !l.is_empty()) {
        let Ok(obj) = serde_json::from_str::<Value>(line) else { continue }; // the last line may be cut
        if cwd.is_empty() {
            if let Some(c) = obj["cwd"].as_str() {
                cwd = c.to_owned();
            }
        }
        if first_ts == 0.0 {
            first_ts = millis(&obj["timestamp"]);
        }
        if title.is_empty() && obj["type"] == "user" && obj["isMeta"].as_bool() != Some(true) {
            let text = match &obj["message"]["content"] {
                Value::String(s) => s.clone(),
                Value::Array(parts) => parts
                    .iter()
                    .map(|p| match p {
                        Value::String(s) => s.as_str(),
                        _ if p["type"] == "text" => p["text"].as_str().unwrap_or(""),
                        _ => "",
                    })
                    .collect::<Vec<_>>()
                    .join(" "),
                _ => String::new(),
            };
            title = text.split_whitespace().collect::<Vec<_>>().join(" ");
        }
        if !title.is_empty() && !cwd.is_empty() && first_ts != 0.0 {
            break;
        }
    }
    if title.chars().count() > 100 {
        title = title.chars().take(99).collect::<String>() + "…";
    }
    if title.is_empty() {
        title = "(untitled)".to_owned();
    }
    let modified = fs::metadata(file)
        .and_then(|m| m.modified())
        .ok()
        .and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok())
        .map(|d| d.as_millis() as f64)
        .unwrap_or(0.0);
    Some(Session { id: id.to_owned(), title, cwd, archived: false, last_used: if modified > 0.0 { modified } else { first_ts }, origin, source: source.to_owned() })
}

// ─── The list ───────────────────────────────────────────────────────────────────────────────────

fn desktop_entries(dir: &Path, transcripts: &HashMap<String, PathBuf>, out: &mut Vec<Session>, seen: &mut HashSet<String>) {
    let Ok(entries) = fs::read_dir(dir) else { return };
    for path in entries.flatten().map(|e| e.path()) {
        if path.is_dir() {
            desktop_entries(&path, transcripts, out, seen);
            continue;
        }
        let name = path.file_name().map(|n| n.to_string_lossy().into_owned()).unwrap_or_default();
        if !name.starts_with("local_") || !name.ends_with(".json") {
            continue;
        }
        let Some(d) = fs::read_to_string(&path).ok().and_then(|t| serde_json::from_str::<Value>(&t).ok()) else { continue };
        let id = d["cliSessionId"].as_str().unwrap_or("");
        // ⚠ a session whose transcript is gone is not listed at all. Claude Code deletes transcripts
        // after about 30 days while Claude Desktop keeps the title for ever; a title with no transcript can
        // never be read or recovered, so it is only noise. This also drops sessions that never ran. Do NOT
        // bring back a greyed "expired" row: the owner decided unrecoverable = hidden.
        if !transcripts.contains_key(id) {
            continue;
        }
        seen.insert(id.to_owned());
        let text = |key: &str| d[key].as_str().filter(|s| !s.is_empty()).map(str::to_owned);
        let when = ["lastFocusedAt", "lastActivityAt", "createdAt"].iter().map(|k| millis(&d[*k])).find(|v| *v > 0.0).unwrap_or(0.0);
        out.push(Session {
            id: id.to_owned(),
            title: text("title").unwrap_or_else(|| "(untitled)".to_owned()),
            cwd: text("cwd").or_else(|| text("originCwd")).unwrap_or_default(),
            archived: d["isArchived"].as_bool().unwrap_or(false),
            last_used: when,
            origin: Origin::Desktop,
            source: "Windows".to_owned(),
        });
    }
}

/// Every session, the most recently used first. `None` = Claude Desktop's data was not found.
pub fn list(places: &Places) -> Option<Vec<Session>> {
    let desktop = find_desktop_dir(places)?;
    let transcripts = index_windows(places);
    let mut out = Vec::new();
    let mut seen = HashSet::new();
    desktop_entries(&desktop.join("claude-code-sessions"), &transcripts, &mut out, &mut seen);

    // Lost sessions: the transcript exists but no Desktop entry points at it. The cause is unknown and is
    // NOT a sign of a command-line launch (the transcript looks the same either way); most likely the
    // entry was lost on Desktop's side. Without this pass they would be invisible.
    for (id, file) in &transcripts {
        if !seen.contains(id) {
            out.extend(bare_session(id, file, Origin::Lost, "Windows"));
        }
    }

    // A stopped or absent WSL gives nothing here and can never break the Windows list.
    if places.wsl {
        for (distro, id, file) in wsl_transcripts() {
            out.extend(bare_session(&id, &file, Origin::Cli, &distro));
        }
    }

    out.sort_by(|a, b| b.last_used.total_cmp(&a.last_used));
    Some(out)
}

#[cfg(test)]
mod tests {
    use super::*;

    fn sandbox(name: &str) -> PathBuf {
        let dir = std::env::temp_dir().join(format!("yaiol-clch-{}-{name}", std::process::id()));
        let _ = fs::remove_dir_all(&dir);
        fs::create_dir_all(&dir).unwrap();
        dir
    }

    fn write(path: &Path, text: &str) {
        fs::create_dir_all(path.parent().unwrap()).unwrap();
        fs::write(path, text).unwrap();
    }

    #[test]
    fn joins_the_two_stores_and_finds_the_lost_ones() {
        let root = sandbox("join");
        let places = Places { local_app_data: Some(root.join("Local")), app_data: None, home: Some(root.join("home")), wsl: false };
        let store = root.join("Local/Claude-Data/claude_abc/claude-code-sessions/x/y");
        // an entry with its transcript, an archived one, and one whose transcript is gone
        write(&store.join("local_1.json"), r#"{"title":"First","cliSessionId":"id-1","cwd":"C:\\proj","lastFocusedAt":2000}"#);
        write(&store.join("local_2.json"), r#"{"title":"Old","cliSessionId":"id-2","originCwd":"C:\\old","isArchived":true,"createdAt":"1970-01-01T00:00:01Z"}"#);
        write(&store.join("local_3.json"), r#"{"title":"Gone","cliSessionId":"id-3","lastFocusedAt":9000}"#);
        write(&store.join("other.json"), r#"{"title":"Not a session","cliSessionId":"id-1"}"#);
        // the older, emptied location must not win
        fs::create_dir_all(root.join("Local/Packages/Claude_old/LocalCache/Roaming/Claude")).unwrap();
        let projects = root.join("home/.claude/projects/C--proj");
        write(&projects.join("id-1.jsonl"), "{}\n");
        write(&projects.join("id-2.jsonl"), "{}\n");
        write(
            &projects.join("id-lost.jsonl"),
            "{\"type\":\"queue\"}\n{\"type\":\"user\",\"isMeta\":true,\"message\":{\"content\":\"meta\"}}\n{\"type\":\"user\",\"cwd\":\"C:\\\\lost\",\"timestamp\":\"2026-01-02T03:04:05Z\",\"message\":{\"content\":[{\"type\":\"text\",\"text\":\"  hello\\n  there \"}]}}\n",
        );

        let all = list(&places).unwrap();
        let by_id = |id: &str| all.iter().find(|s| s.id == id).unwrap();
        assert_eq!(all.len(), 3, "{all:?}");
        assert_eq!((by_id("id-1").title.as_str(), by_id("id-1").cwd.as_str(), by_id("id-1").category()), ("First", "C:\\proj", Category::Active));
        assert_eq!((by_id("id-2").cwd.as_str(), by_id("id-2").last_used, by_id("id-2").category()), ("C:\\old", 1000.0, Category::Archived));
        let lost = by_id("id-lost");
        assert_eq!((lost.title.as_str(), lost.cwd.as_str(), lost.origin, lost.category()), ("hello there", "C:\\lost", Origin::Lost, Category::Lost));
        // the lost one was written last, so it is the most recent
        assert_eq!(all[0].id, "id-lost");
        assert_eq!(find_transcript(&places, "id-2"), Some(projects.join("id-2.jsonl")));
        assert_eq!(find_transcript(&places, "nope"), None);
        let _ = fs::remove_dir_all(root);
    }

    #[test]
    fn no_desktop_data_is_reported_as_such() {
        let root = sandbox("none");
        let places = Places { local_app_data: Some(root.join("Local")), app_data: Some(root.join("Roaming")), home: Some(root.join("home")), wsl: false };
        assert!(list(&places).is_none());
        // the classic location is used when it holds the sessions folder
        fs::create_dir_all(root.join("Roaming/Claude/claude-code-sessions")).unwrap();
        assert_eq!(list(&places), Some(Vec::new()));
        let _ = fs::remove_dir_all(root);
    }

    #[test]
    fn a_long_first_message_is_cut_for_the_title() {
        let root = sandbox("title");
        let file = root.join("t.jsonl");
        write(&file, &format!("{{\"type\":\"user\",\"message\":{{\"content\":\"{}\"}}}}\n", "é".repeat(150)));
        let s = bare_session("t", &file, Origin::Cli, "Ubuntu").unwrap();
        assert_eq!(s.title.chars().count(), 100);
        assert!(s.title.ends_with('…'));
        assert_eq!(s.source, "Ubuntu");
        let _ = fs::remove_dir_all(root);
    }
}
