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

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Handle image thumbnails
  if (info.menuItemId === "download-thumbnail-image") {
    console.log("Image thumbnail clicked:", info.srcUrl);
  }
  
  // Handle video/link thumbnails
  if (info.menuItemId === "download-thumbnail-page") {
    console.log("Video/link thumbnail clicked:", info.linkUrl || info.srcUrl || "No URL found");
  }
}); 