import React, { useEffect } from 'react';
import * as fflate from 'fflate';

/**
 * PreloadContainer (Binary ZIP Mode)
 * 
 * Downloads 4 zip files using XHR to track precise byte progress.
 * Unzips in memory and creates Blob URLs.
 * Bypasses 960 HTTP requests, dramatically improving speed in Incognito.
 */

const PreloadContainer = () => {

  useEffect(() => {
    // Skip if already initialized (e.g., React StrictMode double-mount)
    if (window.__preloadStarted) return;
    window.__preloadStarted = true;

    const zipAssets = [
      { key: 'frames',          url: '/frames.zip',          expectedSize: 17277506 },
      { key: 'projects-frames', url: '/projects-frames.zip', expectedSize: 27243606 },
      { key: 'workshop-frames', url: '/workshop-frames.zip', expectedSize: 47386201 },
      { key: 'contact-frames',  url: '/contact-frames.zip',  expectedSize: 25519194 },
    ];

    window.__cachedFrames = {
      'frames': new Array(240).fill(null),
      'projects-frames': new Array(240).fill(null),
      'workshop-frames': new Array(240).fill(null),
      'contact-frames': new Array(240).fill(null),
    };

    window.__totalBytesToLoad = zipAssets.reduce((sum, a) => sum + a.expectedSize, 0);
    window.__preloadProgress = 0;
    
    let loadedBytesPerFile = {
      'frames': 0,
      'projects-frames': 0,
      'workshop-frames': 0,
      'contact-frames': 0,
    };

    const loadZip = (asset) => {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', asset.url, true);
        xhr.responseType = 'arraybuffer';
        
        xhr.onprogress = (event) => {
          if (event.lengthComputable) {
            loadedBytesPerFile[asset.key] = event.loaded;
            const currentTotal = Object.values(loadedBytesPerFile).reduce((a, b) => a + b, 0);
            const progress = Math.min(99, Math.floor((currentTotal / window.__totalBytesToLoad) * 100));
            // Ensure progress never goes backwards
            window.__preloadProgress = Math.max(window.__preloadProgress, progress);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 304) {
            const buffer = new Uint8Array(xhr.response);
            
            // Unzip asynchronously to not block the main UI thread
            fflate.unzip(buffer, (err, unzipped) => {
              if (err) {
                console.error('Error unzipping', asset.key, err);
                resolve();
                return;
              }

              // Process each file inside the zip
              for (const [filename, fileData] of Object.entries(unzipped)) {
                if (filename.endsWith('.jpg')) {
                  // extract index from "frame_0001.jpg"
                  const match = filename.match(/frame_(\d+)\.jpg/);
                  if (match) {
                    const idx = parseInt(match[1], 10) - 1;
                    const blob = new Blob([fileData], { type: 'image/jpeg' });
                    const url = URL.createObjectURL(blob);
                    
                    const img = new Image();
                    img.src = url;
                    window.__cachedFrames[asset.key][idx] = img;
                  }
                }
              }
              resolve();
            });
          } else {
            resolve();
          }
        };

        xhr.onerror = () => resolve(); // Ignore errors to prevent infinite hang
        xhr.send();
      });
    };

    // We can load all 4 Zips concurrently, HTTP/2 multiplexing + TCP scaling will maximize bandwidth
    Promise.all(zipAssets.map(loadZip)).then(() => {
      // Mark as 100% when everything is downloaded and unzipped
      window.__preloadProgress = 100;
    });

    // Also preload videos by fetching them into browser cache
    const videoUrls = [
      '/convert_the_above_video_into_c.mp4',
      '/Demo.mp4',
    ];

    videoUrls.forEach(url => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.src = url;
      video.load();
      // Store reference so it doesn't get garbage collected
      if (!window.__cachedVideos) window.__cachedVideos = [];
      window.__cachedVideos.push(video);
    });

    // Also preload key images natively
    const imageUrls = [
      '/aqualens-cover.png',
      '/line-follower.jpg',
      '/self-balancing.avif',
      '/smart-dustbin.jpg',
      '/crane-safety.jpg',
      '/amey-photo.png',
      '/Amey_Bauchkar_Resume.png',
    ];

    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      if (!window.__cachedImages) window.__cachedImages = [];
      window.__cachedImages.push(img);
    });

    // No cleanup — Image objects MUST persist permanently
  }, []);

  return null;
};

export default PreloadContainer;
