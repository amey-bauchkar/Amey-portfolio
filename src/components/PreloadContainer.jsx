import React, { useEffect } from 'react';

/**
 * PreloadContainer
 * 
 * Preloads ALL heavy assets with CONTROLLED concurrency to avoid overwhelming
 * the browser's connection limit (~6 per domain). Loads frames in small batches
 * of 8, waits for each batch to finish, then loads the next batch.
 * 
 * Image objects are stored permanently on window.__cachedFrames so canvas
 * sequence components reuse them directly — zero re-downloading.
 * 
 * This component should NEVER be unmounted so frames that haven't finished
 * loading continue downloading in the background.
 */

const PreloadContainer = () => {

  useEffect(() => {
    // Skip if already initialized (e.g., React StrictMode double-mount)
    if (window.__preloadStarted) return;
    window.__preloadStarted = true;

    const frameSets = [
      { key: 'frames',          count: 240, path: '/frames/frame_' },
      { key: 'projects-frames', count: 240, path: '/projects-frames/frame_' },
      { key: 'workshop-frames', count: 240, path: '/workshop-frames/frame_' },
      { key: 'contact-frames',  count: 240, path: '/contact-frames/frame_' },
    ];

    const totalFrames = frameSets.reduce((sum, s) => sum + s.count, 0);
    window.__framesToPreload = totalFrames;
    window.__framesPreloaded = 0;
    window.__cachedFrames = {};

    // Pre-create all Image object arrays
    frameSets.forEach(set => {
      window.__cachedFrames[set.key] = new Array(set.count).fill(null);
    });

    // Load a single frame and return a promise
    const loadFrame = (set, index) => {
      return new Promise((resolve) => {
        const url = `${set.path}${String(index + 1).padStart(4, '0')}.jpg`;

        // For the very first 10 frames of each page, inject a <link rel="preload"> 
        // to force the core browser engine to download them faster than JS execution
        if (index < 10) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = url;
          link.fetchPriority = 'high';
          document.head.appendChild(link);
        }

        const img = new Image();
        
        img.onload = () => {
          window.__framesPreloaded++;
          resolve();
        };
        img.onerror = () => {
          window.__framesPreloaded++;
          resolve();
        };
        
        img.src = url;
        window.__cachedFrames[set.key][index] = img;
      });
    };

    // Load all frames with controlled concurrency
    // Strategy: Round-robin across all 4 sets so each page gets frames progressively
    const loadAllFrames = async () => {
      // Vercel uses HTTP/2 which allows multiplexing. We can safely bump this to 48 
      // to completely saturate the user's internet bandwidth.
      const BATCH_SIZE = 48; 
      const maxCount = Math.max(...frameSets.reduce((acc, s) => [...acc, s.count], []));
      
      for (let frameIdx = 0; frameIdx < maxCount; frameIdx += BATCH_SIZE) {
        const batch = [];
        
        for (let b = 0; b < BATCH_SIZE && (frameIdx + b) < maxCount; b++) {
          const idx = frameIdx + b;
          // For each frame index, load that frame from ALL sets that have it
          frameSets.forEach(set => {
            if (idx < set.count) {
              batch.push(loadFrame(set, idx));
            }
          });
        }
        
        // Wait for entire batch before starting next batch
        await Promise.all(batch);
      }
    };

    loadAllFrames();

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

    // Also preload key images
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
