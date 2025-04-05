// YouTube Thumbnail Downloader - Background Service Worker
// This file contains the context menu creation and download functionality

// Constants for thumbnail qualities
const THUMBNAIL_QUALITIES = {
  MAXRES: 'maxresdefault',
  SD: 'sddefault',
  HQ: 'hqdefault',
  MQ: 'mqdefault',
  DEFAULT: 'default'
};

// Create context menu items for YouTube thumbnails
chrome.runtime.onInstalled.addListener(() => {
  try {
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
  } catch (error) {
    console.error('Failed to create context menu:', error);
  }
});

// Extract video ID from a YouTube URL
function extractVideoId(url) {
  if (!url) return null;
  
  try {
    // Sanitize input URL
    url = decodeURIComponent(url);
    
    // Standard YouTube thumbnail URL pattern: https://i.ytimg.com/vi/VIDEO_ID/...
    if (url.includes('ytimg.com/vi/')) {
      const parts = url.split('/');
      // The video ID should be after the "/vi/" segment
      for (let i = 0; i < parts.length; i++) {
        if (parts[i] === 'vi' && i + 1 < parts.length) {
          return validateVideoId(parts[i + 1]);
        }
      }
    }
    
    // YouTube video URL pattern: https://www.youtube.com/watch?v=VIDEO_ID
    const videoParam = url.match(/[?&]v=([^&]+)/);
    if (videoParam && videoParam[1]) {
      return validateVideoId(videoParam[1]);
    }
  } catch (error) {
    console.error('Error extracting video ID:', error);
  }
  
  return null;
}

// Validate video ID format
function validateVideoId(videoId) {
  // YouTube video IDs are 11 characters long and contain only alphanumeric chars, dash, and underscore
  return videoId && /^[\w-]{11}$/.test(videoId) ? videoId : null;
}

// Extract video ID from the page URL
function extractVideoIdFromPage(url) {
  try {
    // YouTube video URL pattern: https://www.youtube.com/watch?v=VIDEO_ID
    if (url && url.includes('youtube.com/watch')) {
      const videoParam = url.match(/[?&]v=([^&]+)/);
      if (videoParam && videoParam[1]) {
        return validateVideoId(videoParam[1]);
      }
    }
  } catch (error) {
    console.error('Error extracting video ID from page:', error);
  }
  return null;
}

// Generate thumbnail URL for specific quality
function getThumbnailUrl(videoId, quality = THUMBNAIL_QUALITIES.MAXRES) {
  if (!videoId) return null;
  
  try {
    // Validate quality parameter
    if (!Object.values(THUMBNAIL_QUALITIES).includes(quality)) {
      quality = THUMBNAIL_QUALITIES.MAXRES;
    }
    
    return `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/${quality}.jpg`;
  } catch (error) {
    console.error('Error generating thumbnail URL:', error);
    return null;
  }
}

// Download a thumbnail with the specified quality
function downloadThumbnail(videoId, quality = THUMBNAIL_QUALITIES.MAXRES) {
  if (!videoId) {
    console.error('No video ID provided for download');
    return;
  }
  
  try {
    const url = getThumbnailUrl(videoId, quality);
    if (!url) {
      console.error('Failed to generate thumbnail URL');
      return;
    }
    
    const filename = `youtube_thumbnail_${videoId}_${quality}.jpg`;
    
    chrome.downloads.download({
      url: url,
      filename: filename,
      saveAs: false // Set to true if you want the user to choose the save location
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error('Download failed:', chrome.runtime.lastError);
        // Notify user of failure
        chrome.action.setBadgeText({ text: '!' });
        chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
        setTimeout(() => chrome.action.setBadgeText({ text: '' }), 3000);
      } else {
        console.log('Download started with ID:', downloadId);
        // Show success indicator
        chrome.action.setBadgeText({ text: '✓' });
        chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
        setTimeout(() => chrome.action.setBadgeText({ text: '' }), 3000);
      }
    });
  } catch (error) {
    console.error('Error initiating download:', error);
  }
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  try {
    // Handle image thumbnails
    if (info.menuItemId === "download-thumbnail-image") {
      const srcUrl = info.srcUrl;
      const videoId = extractVideoId(srcUrl);
      console.log("Image thumbnail clicked:", srcUrl);
      console.log("Extracted video ID:", videoId);
      
      if (videoId) {
        // Download the thumbnail at maximum resolution
        downloadThumbnail(videoId, THUMBNAIL_QUALITIES.MAXRES);
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
        downloadThumbnail(videoId, THUMBNAIL_QUALITIES.MAXRES);
      } else {
        console.error("Failed to extract video ID");
        // Show error indicator
        chrome.action.setBadgeText({ text: '!' });
        chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
        setTimeout(() => chrome.action.setBadgeText({ text: '' }), 3000);
      }
    }
  } catch (error) {
    console.error('Error handling context menu click:', error);
  }
}); 