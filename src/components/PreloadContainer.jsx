import React, { useEffect } from 'react';

/**
 * PreloadContainer
 * 
 * Preloads ALL heavy assets (960 canvas frames + videos + images) and stores
 * the actual Image objects on `window.__cachedFrames` so canvas sequence components
 * can reuse them directly instead of creating new Image objects.
 * 
 * This guarantees zero black screens on any page — the frames are already
 * loaded in memory when the user navigates.
 */

const PreloadContainer = () => {

  useEffect(() => {
    const frameSets = {
      'frames':           { count: 240, path: '/frames/frame_' },
      'projects-frames':  { count: 240, path: '/projects-frames/frame_' },
      'workshop-frames':  { count: 240, path: '/workshop-frames/frame_' },
      'contact-frames':   { count: 240, path: '/contact-frames/frame_' },
    };

    // Calculate total
    const totalFrames = Object.values(frameSets).reduce((sum, s) => sum + s.count, 0);
    window.__framesToPreload = totalFrames;
    window.__framesPreloaded = 0;

    // Initialize the cache object
    if (!window.__cachedFrames) {
      window.__cachedFrames = {};
    }

    // For each frame set, create an array of Image objects and start loading
    Object.entries(frameSets).forEach(([key, set]) => {
      const images = new Array(set.count).fill(null);
      window.__cachedFrames[key] = images;

      for (let i = 0; i < set.count; i++) {
        const img = new Image();
        const url = `${set.path}${String(i + 1).padStart(4, '0')}.jpg`;
        
        img.onload = () => {
          window.__framesPreloaded = (window.__framesPreloaded || 0) + 1;
        };
        img.onerror = () => {
          window.__framesPreloaded = (window.__framesPreloaded || 0) + 1;
        };
        
        img.src = url;
        images[i] = img;
      }
    });

    // Also preload videos and key images
    const mediaAssets = [
      '/convert_the_above_video_into_c.mp4',
      '/Demo.mp4',
      '/aqualens-cover.png',
      '/line-follower.jpg',
      '/self-balancing.avif',
      '/smart-dustbin.jpg',
      '/crane-safety.jpg',
      '/amey-photo.png',
      '/Amey_Bauchkar_Resume.png',
    ];

    mediaAssets.forEach(url => {
      if (url.endsWith('.mp4') || url.endsWith('.webm')) {
        const video = document.createElement('video');
        video.src = url;
        video.preload = 'auto';
        video.muted = true;
        video.load();
      } else {
        const img = new Image();
        img.src = url;
      }
    });

    // Don't clean up — these Image objects MUST stay in memory permanently
    // so the canvas components can reuse them
  }, []);

  // Render nothing — this component only preloads assets
  return null;
};

export default PreloadContainer;
