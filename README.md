# Doctor Format Coach — GitHub Build (Intel macOS)

This repo builds a real `.app` + `.dmg` for Intel Macs **in GitHub Actions**. No Node/npm on your Mac required.

## How to use (zero coding)

1. Create a new GitHub repo (private or public).
2. Upload *all files* from this folder to the repo (root level).
3. Go to **Actions** → workflow **macOS Intel DMG** → **Run workflow**.
4. Wait 2–5 minutes. Open the run → **Artifacts** → download your `.dmg` / `.app`.

> First launch: right‑click the app → **Open** once to approve (unsigned build).

---

## Hotkeys & Features
- Menu‑bar icon (click to show/hide)
- **Cmd+Shift+D** → Show/Hide
- **Cmd+Shift+T** → Always‑on‑top
- Floating **Doctor Format — Writing Coach** panel with search + copy buttons.

---

## Optional signing (later)
If you have an Apple Developer ID and want a signed/notarized build, update `package.json` with your signing identity and remove the `identity=false` line in the workflow. See electron.build docs.
