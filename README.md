# YouTube Thumbnail Downloader

A Chrome extension that allows you to easily download YouTube video thumbnails with a simple right-click.

## Features

- Download YouTube thumbnails with a right-click
- Works on all YouTube pages (videos, search results, playlists)
- Supports multiple thumbnail qualities
- Simple and intuitive interface
- No data collection or tracking

## Installation

1. Clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. Navigate to any YouTube page
2. Right-click on a thumbnail image and select "Download Thumbnail (from Image)"
3. For video previews or links, right-click and select "Download Thumbnail (from Video)"
4. The thumbnail will be saved to your default download folder

## Development

### Project Structure

```
youtube-thumbnail-downloader/
├── src/                    # Source files
│   ├── background.js       # Background service worker
│   └── popup.html          # Popup UI
├── icons/                  # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── docs/                   # Documentation
│   └── memory-bank/        # Project documentation
├── manifest.json           # Extension manifest
└── README.md               # This file
```

### Building

1. Ensure all dependencies are installed
2. Run the build script (if any)
3. Test the extension in Chrome

## License

MIT License - See LICENSE file for details

## Privacy Policy

This extension does not collect or store any user data. All thumbnails are downloaded directly to your computer.

## Support

For support, please open an issue in the GitHub repository 