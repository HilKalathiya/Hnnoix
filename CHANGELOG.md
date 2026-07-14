# Changelog

## [1.1.0] - 5G Core GUI Enhancements & Real-Time Sync

### ✨ New Features
- **Real-Time WebSocket Logs**: Completely removed slow HTTP polling. The `LogViewer` now dynamically hooks into a globally shared WebSocket context.
- **Global Network Context**: Network status and logs are now preserved persistently across page navigation using React Context. Navigating away from the Live Logs page no longer clears your terminal history.
- **Inline Status Broadcasting**: Backend process state changes (e.g. `[STATUS] Process gnb is now running`) are now injected inline natively into the live terminal feed for better transparency.
- **Dynamic WS Hostname**: Upgraded WebSocket connection from hardcoded `127.0.0.1` to use `window.location.hostname`. This enables full remote access from WSL, local network devices (phones, tablets), and ngrok tunnels.

### 🐛 Bug Fixes
- **Backend Sudo Path Resolution (`ENOENT`)**: Fixed a critical bug in `backend/config/path.js` where running the Node.js backend under `sudo` caused `os.homedir()` to incorrectly resolve to `/root`. It now intelligently falls back to the original `SUDO_USER`'s home directory.
- **Visual Status Mismatches (Blinking UI)**: Fixed an issue where the backend broadcasted a `"running"` status, but the UI topology nodes only understood `"online"`. The `NetworkContext` now automatically normalizes incoming WebSocket statuses so the dashboard perfectly reflects reality.
- **Duplicate React State**: Cleaned up legacy duplicated polling intervals from `Sidebar.jsx`, `DashboardPage.jsx`, and `Navbar.jsx`, offloading all updates strictly to the WebSocket event loop.
- **Dark/Light Mode Sync**: Changed the default theme in `ThemeContext.jsx` to Light Mode as per user specification, bypassing default OS media queries.
