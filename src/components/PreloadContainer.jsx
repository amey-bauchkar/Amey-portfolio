import React, { useEffect } from 'react';

/**
 * PreloadContainer
 * 
 * This component renders ALL page components simultaneously in a hidden container
 * during the loading phase. This forces React to mount every component, which triggers
 * their useEffect hooks, which starts downloading all their assets (canvas frames,
 * videos, images) in the background.
 * 
 * Additionally, it preloads all 4 sets of 240 canvas frames (960 total) and tracks
 * progress via window.__framesPreloaded / window.__framesToPreload globals that the
 * Loader component polls.
 */

import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProjectsPage from '../pages/ProjectsPage';
import SkillsPage from '../pages/SkillsPage';
import ContactPage from '../pages/ContactPage';

const PreloadContainer = () => {

  // Preload all canvas sequence frames into browser cache
  useEffect(() => {
    const frameSets = [
      { path: '/frames/frame_', count: 240 },           // About page (CanvasSequence)
      { path: '/projects-frames/frame_', count: 240 },   // Projects page
      { path: '/workshop-frames/frame_', count: 240 },   // Skills/Workshop page
      { path: '/contact-frames/frame_', count: 240 },    // Contact page
    ];

    const totalFrames = frameSets.reduce((sum, s) => sum + s.count, 0);
    window.__framesToPreload = totalFrames;
    window.__framesPreloaded = 0;

    const preloadFrame = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          window.__framesPreloaded = (window.__framesPreloaded || 0) + 1;
          resolve();
        };
        img.onerror = () => {
          window.__framesPreloaded = (window.__framesPreloaded || 0) + 1;
          resolve();
        };
        img.src = url;
      });
    };

    const loadAllFrames = async () => {
      // Load all frame sets concurrently, each set in chunks of 30
      const allPromises = frameSets.map(async (set) => {
        const chunkSize = 30;
        for (let i = 0; i < set.count; i += chunkSize) {
          const chunk = [];
          for (let j = i; j < Math.min(i + chunkSize, set.count); j++) {
            const url = `${set.path}${String(j + 1).padStart(4, '0')}.jpg`;
            chunk.push(preloadFrame(url));
          }
          await Promise.all(chunk);
        }
      });

      await Promise.all(allPromises);
    };

    loadAllFrames();
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        visibility: 'hidden',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    >
      {/* Render all pages so their components mount and assets start loading */}
      <HomePage onOpenCv={() => {}} />
      <AboutPage />
      <ProjectsPage onOpenProject={() => {}} />
      <SkillsPage />
      <ContactPage />
    </div>
  );
};

export default PreloadContainer;
