// YouTube Thumbnail Downloader - Background Service Worker
// This file contains the context menu creation and download functionality

// Create context menu item for YouTube thumbnails
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "download-thumbnail",
    title: "Download YouTube Thumbnail",
    contexts: ["image"],
    targetUrlPatterns: ["*://*.ytimg.com/vi/*"]
  });
}); 