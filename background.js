// YouTube Thumbnail Downloader - Background Service Worker
// This file contains the context menu creation and download functionality

// Create context menu items for YouTube thumbnails
chrome.runtime.onInstalled.addListener(() => {
  // Menu item for standard YouTube thumbnails (static images)
  chrome.contextMenus.create({
    id: "download-thumbnail-image",
    title: "Download Thumbnail (from Image)",
    contexts: ["image"],
    targetUrlPatterns: ["*://*.ytimg.com/vi/*"]
  });
  
  // Menu item for YouTube pages (to catch video previews and other elements)
  chrome.contextMenus.create({
    id: "download-thumbnail-page",
    title: "Download Thumbnail (from Video)",
    contexts: ["link", "video"],
    documentUrlPatterns: ["*://*.youtube.com/*"]
  });
});

// Extract video ID from a YouTube URL
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

// Extract video ID from the page URL
function extractVideoIdFromPage(url) {
  // YouTube video URL pattern: https://www.youtube.com/watch?v=VIDEO_ID
  if (url && url.includes('youtube.com/watch')) {
    const videoParam = url.match(/[?&]v=([^&]+)/);
    if (videoParam && videoParam[1]) {
      return videoParam[1];
    }
  }
  return null;
}

// Generate thumbnail URL for specific quality
function getThumbnailUrl(videoId, quality = 'maxresdefault') {
  if (!videoId) return null;
  
  // Available qualities:
  // maxresdefault.jpg (highest quality, 1280x720)
  // sddefault.jpg (640x480)
  // hqdefault.jpg (480x360)
  // mqdefault.jpg (320x180)
  // default.jpg (120x90)
  
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
}

// Download a thumbnail with the specified quality
function downloadThumbnail(videoId, quality = 'maxresdefault') {
  if (!videoId) {
    console.error('No video ID provided for download');
    return;
  }
  
  const url = getThumbnailUrl(videoId, quality);
  const filename = `youtube_thumbnail_${videoId}_${quality}.jpg`;
  
  chrome.downloads.download({
    url: url,
    filename: filename,
    saveAs: false // Set to true if you want the user to choose the save location
  }, (downloadId) => {
    if (chrome.runtime.lastError) {
      console.error('Download failed:', chrome.runtime.lastError);
    } else {
      console.log('Download started with ID:', downloadId);
    }
  });
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Handle image thumbnails
  if (info.menuItemId === "download-thumbnail-image") {
    const srcUrl = info.srcUrl;
    const videoId = extractVideoId(srcUrl);
    console.log("Image thumbnail clicked:", srcUrl);
    console.log("Extracted video ID:", videoId);
    
    if (videoId) {
      // Download the thumbnail at maximum resolution
      downloadThumbnail(videoId, 'maxresdefault');
    }
  }
  
  // Handle video/link thumbnails
  if (info.menuItemId === "download-thumbnail-page") {
    // First try to get from linkUrl or srcUrl
    const url = info.linkUrl || info.srcUrl || "";
    let videoId = extractVideoId(url);
    
    console.log("Video/link thumbnail clicked:", url);
    
    // If we couldn't extract the ID from the URL directly, try from the page URL
    if (!videoId && tab && tab.url) {
      videoId = extractVideoIdFromPage(tab.url);
      console.log("Extracted video ID from page URL:", videoId);
    } else {
      console.log("Extracted video ID:", videoId);
    }
    
    if (videoId) {
      // Download the thumbnail at maximum resolution
      downloadThumbnail(videoId, 'maxresdefault');
    } else {
      console.error("Failed to extract video ID");
    }
  }
}); 