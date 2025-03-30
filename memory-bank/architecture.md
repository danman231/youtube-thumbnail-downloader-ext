* This file is to document the purpose and structure of project files

# YouTube Thumbnail Downloader - Architecture

## Project Structure

- `manifest.json`: The extension's configuration file that defines metadata, permissions, and structure
- `background.js`: Service worker script that handles context menu creation and download functionality
- `popup.html`: Simple UI that appears when the extension icon is clicked, containing usage instructions
- `icons/`: Directory containing extension icons
  - `icon16.png`: 16x16 pixel icon (for favicon)
  - `icon48.png`: 48x48 pixel icon (for extension management page)
  - `icon128.png`: 128x128 pixel icon (for Chrome Web Store)
  - `README.txt`: Instructions for icon creation

## Component Relationships

- The `manifest.json` references all other components, acting as the entry point for the extension
- The `background.js` script runs as a service worker, managing the extension's core functionality
- The `popup.html` provides a simple UI for user instructions when the browser action is clicked

## Data Flow

1. User interaction (right-click on YouTube thumbnail) triggers the context menu
2. Context menu click event is handled by `background.js`
3. `background.js` extracts the video ID from the thumbnail URL
4. `background.js` initiates the download of the thumbnail image

## Extension Lifecycle

1. Extension loads when Chrome starts or when installed/updated
2. Background service worker initializes and creates context menus
3. Service worker remains idle until context menu events occur
4. Service worker processes downloads upon user interaction

