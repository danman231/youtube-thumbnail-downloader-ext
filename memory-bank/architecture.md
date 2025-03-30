* This file is to document the purpose and structure of project files

# YouTube Thumbnail Downloader - Architecture

## Project Structure

- `manifest.json`: The extension's configuration file that defines metadata, permissions, and structure
- `background.js`: Service worker script that handles context menu creation and download functionality
- `popup.html`: Simple UI that appears when the extension icon is clicked, containing usage instructions
- `create_icons.js`: Utility script for generating placeholder icon files (not part of the extension itself)
- `icons/`: Directory containing extension icons
  - `icon16.png`: 16x16 pixel icon (for favicon)
  - `icon48.png`: 48x48 pixel icon (for extension management page)
  - `icon128.png`: 128x128 pixel icon (for Chrome Web Store)
  - `README.txt`: Instructions for icon creation

## Component Relationships

- The `manifest.json` references all other components, acting as the entry point for the extension
- The `background.js` script runs as a service worker, managing the extension's core functionality
  - Creates multiple context menu items for YouTube thumbnails
    - One for static images with targetUrlPatterns
    - One for videos/links on YouTube pages with documentUrlPatterns
  - (Future) Will handle download operations when menu items are clicked
- The `popup.html` provides a simple UI for user instructions when the browser action is clicked

## Data Flow

1. User interaction (right-click on YouTube thumbnail or video) triggers the context menu
2. (Future) Context menu click event will be handled by `background.js`
3. (Future) `background.js` will extract the video ID from the URL or page context
4. (Future) `background.js` will initiate the download of the thumbnail image

## Extension Lifecycle

1. Extension loads when Chrome starts or when installed/updated
2. `chrome.runtime.onInstalled` event fires, triggering context menu creation
3. Background service worker initializes and creates context menus
4. Service worker remains idle until context menu events occur
5. (Future) Service worker will process downloads upon user interaction

