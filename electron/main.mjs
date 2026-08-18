// data-icon="yaiol:claude-code-helper"
process.noDeprecation = true;
import { app, BrowserWindow, Menu, dialog, shell } from "electron";
import path from "path";
import fs from "fs";
import net from "net";
import express from "express";
import { fileURLToPath } from "node:url";
import pkg from "../package.json" with { type: "json" };
import * as sessions from "./sessions.js";
import { mark, dumpStartupTiming } from "./startup-timing.mjs";
mark("electron boot + module imports");

// ESM has no __dirname - derive it from import.meta.url.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDev = !app.isPackaged;
const DEV_PORT = pkg.devPort;
const APP_NAME = pkg.productName;

app.setPath('userData', path.join(app.getPath('appData'), 'yaiol', isDev ? `${APP_NAME} (Dev)` : APP_NAME));

// ⚠ CLAUDE: Always use this module-level mainWindow for all dialog calls.
// Never use BrowserWindow.fromWebContents(event.sender) - silently breaks in packaged .exe.
let mainWindow = null;

function startServer(callback) {
  function findFreePort(port, cb) {
    const tester = net.createServer();
    tester.once("error", () => findFreePort(port + 1, cb));
    tester.once("listening", () => { tester.close(() => cb(port)); });
    tester.listen(port);
  }

  const api = express();
  api.use(express.json({ limit: "10mb" }));
  api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") { res.sendStatus(204); return; }
    next();
  });

  api.get("/version", (_req, res) => res.json({ version: app.getVersion() }));

  // ── Claude Code session viewer ────────────────────────────────────────────
  api.get("/sessions", (_req, res) => {
    try { res.json(sessions.listSessions()); }
    catch (e) { res.status(500).json({ ok: false, error: String(e && e.message || e) }); }
  });
  api.get("/transcript", (req, res) => {
    try { res.json(sessions.decodeTranscript(String(req.query.id || ""))); }
    catch (e) { res.status(500).json({ ok: false, error: String(e && e.message || e) }); }
  });
  api.post("/reveal-transcript", (req, res) => {
    const file = sessions.findTranscript(String(req.body && req.body.id || ""));
    if (file) shell.showItemInFolder(file);
    res.json({ ok: !!file });
  });
  // Export the decoded transcript to a .md file the user picks. The renderer
  // passes already-translated dialog strings (title, filter name) - ⚠ CLAUDE: do
  // not hardcode them here; OS dialog chrome stays in the OS language regardless.
  api.post("/export-transcript", async (req, res) => {
    try {
      const b = req.body || {};
      const dec = sessions.decodeTranscript(String(b.id || ""));
      if (!dec.ok) { res.json({ ok: false, error: dec.error }); return; }
      const title = String(b.title || "session");
      const safe = title.replace(/[\\/:*?"<>|]+/g, "_").replace(/\s+/g, " ").trim().slice(0, 80) || "session";
      const d = dec.meta.firstTs ? new Date(dec.meta.firstTs) : null;
      const datePart = d && !isNaN(d) ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` : "";
      const defaultName = (datePart ? `${safe} - ${datePart}` : safe) + ".md";
      const r = await dialog.showSaveDialog(mainWindow, {
        title: String(b.dialogTitle || "Export"),
        defaultPath: defaultName,
        filters: [{ name: String(b.filterName || "Markdown"), extensions: ["md"] }],
      });
      if (r.canceled || !r.filePath) { res.json({ ok: false, canceled: true }); return; }
      fs.writeFileSync(r.filePath, `# ${title}\n\n${dec.markdown}\n`, "utf8");
      res.json({ ok: true, path: r.filePath });
    } catch (e) {
      res.status(500).json({ ok: false, error: String(e && e.message || e) });
    }
  });

  findFreePort(4000, (port) => {
    api.listen(port, () => {
      mark("express listening");
      console.log(`${APP_NAME} API on http://localhost:${port}`);
      if (callback) callback(port);
    });
  });
}

function createWindow(port) {
  mainWindow = new BrowserWindow({
    title: APP_NAME,
    width: 1100,
    height: 720,
    minWidth: 800,
    minHeight: 500,
    frame: true,
    icon: path.join(__dirname, isDev ? '../public/app.ico' : '../dist/app.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const query = { apiPort: String(port) };
  if (isDev) {
    const qs = new URLSearchParams(query).toString();
    mainWindow.loadURL(`http://localhost:${DEV_PORT}?${qs}`);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"), { query });
  }
  mark("BrowserWindow created");
  mainWindow.webContents.once('did-finish-load', () => { mark("renderer did-finish-load"); dumpStartupTiming({ appName: APP_NAME, isDev, userDataPath: app.getPath("userData") }); });
  mainWindow.webContents.on('did-finish-load', () => mainWindow.setTitle(isDev ? `${APP_NAME} (Dev)` : APP_NAME));

  // ⚠ CLAUDE: Ctrl+Shift+I is dead because Menu.setApplicationMenu(null) removes the default shortcut.
  // This restores it in dev only - do NOT remove.
  if (isDev) {
    mainWindow.webContents.on('before-input-event', (event, input) => {
      if (input.control && input.shift && input.key === 'I') {
        mainWindow.webContents.toggleDevTools();
        event.preventDefault();
      }
    });
  }

  mainWindow.webContents.on('will-navigate', (event, url) => {
    const appUrl = isDev ? `http://localhost:${DEV_PORT}` : `file://`;
    if (!url.startsWith(appUrl)) { event.preventDefault(); shell.openExternal(url); }
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}

app.whenReady().then(() => { mark("app.whenReady");
  Menu.setApplicationMenu(null);
  startServer((port) => createWindow(port));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) startServer((port) => createWindow(port));
});
