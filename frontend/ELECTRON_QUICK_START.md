# SmartLight Electron App - Quick Start

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run in Development Mode
```bash
npm run electron-dev
```
The app will open automatically. You can modify code and it will hot-reload.

### 3. Build for Distribution
```bash
npm run dist
```
Find installers in the `dist/` folder.

## Configure Backend URL

Click the ⚙️ Settings button in the app to change the backend server address.

Default: `http://10.1.1.93:5000`

## Available Commands

- `npm start` - Start React dev server only (web mode)
- `npm run build` - Build optimized React app
- `npm run electron` - Run Electron app (requires build to be ready)
- `npm run electron-dev` - Run with hot-reload (recommended for development)
- `npm run electron-build` - Build for multiple platforms
- `npm run dist` - Build distribution package for current platform

## File Locations

**Config stored at:**
- Windows: `%APPDATA%/smartlight/config.json`
- macOS: `~/Library/Application Support/smartlight/config.json`
- Linux: `~/.config/smartlight/config.json`

## What Was Added

✅ Electron main process (`public/electron.js`)
✅ IPC preload script (`public/preload.js`)
✅ Settings modal component
✅ Backend URL configuration system
✅ Cross-platform build configuration
✅ Updated all API calls to use configurable URLs
✅ Application menu with settings access

See ELECTRON_SETUP.md for detailed documentation.
