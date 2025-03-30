# YouTube Thumbnail Downloader

A Chrome extension that allows users to easily download thumbnails from YouTube videos with a simple right-click.

## Features

- Right-click context menu integration for YouTube thumbnails
- Works on YouTube pages and external sites with embedded YouTube videos
- Simple one-click download functionality
- Automatic filename generation using video ID
- Support for different thumbnail qualities

## Installation

1. Clone this repository:
   ```bash
   git clone git@github.com:danman231/youtube-thumbnail-downloader.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the extension directory

## Usage

1. Navigate to any page containing YouTube video thumbnails
2. Right-click on a thumbnail
3. Select "Download YouTube Thumbnail" from the context menu
4. The thumbnail will be automatically downloaded to your default downloads folder

## Development

### Prerequisites
- Google Chrome browser
- Basic knowledge of HTML, CSS, and JavaScript
- Familiarity with Chrome Extension APIs

### Project Structure
```
youtube-thumbnail-downloader/
├── manifest.json        # Extension configuration
├── background.js       # Service worker for core functionality
├── popup.html         # Extension popup UI
├── icons/            # Extension icons
│   └── README.txt    # Icon creation instructions
└── README.md         # This file
```

### Branch Strategy
- `main`: Production-ready code
- `dev`: Active development branch
- Feature branches: `feature/<feature-name>`
- Bug fixes: `fix/<bug-name>`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- YouTube for providing the thumbnail infrastructure
- Chrome Extensions documentation and community 