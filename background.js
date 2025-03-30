// YouTube Thumbnail Downloader - Background Service Worker
// This file contains the context menu creation and download functionality

// Create context menu item for YouTube thumbnails
chrome.runtime.onInstalled.addListener(() => {
  // Menu item for standard YouTube thumbnails (static images)
  chrome.contextMenus.create({
    id: "download-thumbnail-image",
    title: "Download YouTube Thumbnail (Image)",
    contexts: ["image"],
    targetUrlPatterns: ["*://*.ytimg.com/vi/*"]
  });
  
  // Menu item for YouTube pages (to catch video previews and other elements)
  chrome.contextMenus.create({
    id: "download-thumbnail-page",
    title: "Download YouTube Thumbnail (Video)",
    contexts: ["link", "video"],
    documentUrlPatterns: ["*://*.youtube.com/*"]
  });
});

// Extract video ID from a YouTube thumbnail URL
function extractVideoId(url) {
  if (!url) return null;
  
  // Standard YouTube thumbnail URL pattern: https://i.ytimg.com/vi/VIDEO_ID/...
  if (url.includes('ytimg.com/vi/')) {
    const parts = url.split('/');
    // The video ID should be after the "/vi/" segment
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === 'vi' && i + 1 < parts.length) {
        return parts[i + 1];
      }
    }
  }
  
  // YouTube video URL pattern: https://www.youtube.com/watch?v=VIDEO_ID
  const videoParam = url.match(/[?&]v=([^&]+)/);
  if (videoParam && videoParam[1]) {
    return videoParam[1];
  }
  
  return null;
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Handle image thumbnails
  if (info.menuItemId === "download-thumbnail-image") {
    const srcUrl = info.srcUrl;
    const videoId = extractVideoId(srcUrl);
    console.log("Image thumbnail clicked:", srcUrl);
    console.log("Extracted video ID:", videoId);
  }
  
  // Handle video/link thumbnails
  if (info.menuItemId === "download-thumbnail-page") {
    const url = info.linkUrl || info.srcUrl || "";
    const videoId = extractVideoId(url);
    console.log("Video/link thumbnail clicked:", url);
    console.log("Extracted video ID:", videoId);
  }
}); 