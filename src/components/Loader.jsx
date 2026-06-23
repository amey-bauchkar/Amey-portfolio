import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  
  const [assetsReady, setAssetsReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const progressRef = useRef(0);

  // Minimum display time (3s) so the loader doesn't flash away
  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Update the counter display
  const updateCounter = useCallback((value) => {
    if (!counterRef.current) return;
    progressRef.current = value;
    gsap.to(counterRef.current, {
      innerHTML: value,
      duration: 0.3,
      snap: "innerHTML",
      ease: "power1.out"
    });
  }, []);

  // Poll the DOM for all media elements loaded by the pre-rendered pages
  useEffect(() => {
    let isMounted = true;
    let pollInterval;

    const checkAllMedia = () => {
      // Grab every <img> and <video> element currently in the entire DOM
      const allImages = Array.from(document.querySelectorAll('img'));
      const allVideos = Array.from(document.querySelectorAll('video'));

      const totalMedia = allImages.length + allVideos.length;
      if (totalMedia === 0) return; // Components haven't mounted yet

      let loadedCount = 0;

      allImages.forEach(img => {
        if (img.complete && img.naturalWidth > 0) loadedCount++;
      });

      allVideos.forEach(vid => {
        // readyState >= 3 means HAVE_FUTURE_DATA (enough to play)
        if (vid.readyState >= 3) loadedCount++;
      });

      // Also check if canvas sequence frames are cached by looking for
      // a global signal. We'll set this from within the preload container.
      const framesLoaded = window.__framesPreloaded || 0;
      const totalFrames = window.__framesToPreload || 1;
      const frameProgress = Math.min(framesLoaded / totalFrames, 1);

      // Weight: 30% DOM media, 70% canvas frames (they're the heavy part)
      const mediaProgress = totalMedia > 0 ? loadedCount / totalMedia : 1;
      const combinedProgress = Math.floor((mediaProgress * 0.3 + frameProgress * 0.7) * 99);

      if (isMounted) {
        updateCounter(Math.max(progressRef.current, combinedProgress));
      }

      // Check if everything is truly done
      const allMediaDone = loadedCount >= totalMedia;
      const allFramesDone = framesLoaded >= totalFrames;

      if (allMediaDone && allFramesDone && isMounted) {
        clearInterval(pollInterval);
        setAssetsReady(true);
      }
    };

    // Start polling after a short delay to let pre-render container mount
    const startDelay = setTimeout(() => {
      pollInterval = setInterval(checkAllMedia, 500);
    }, 500);

    // Safety fallback: 60 seconds max
    const fallback = setTimeout(() => {
      if (isMounted) {
        clearInterval(pollInterval);
        setAssetsReady(true);
      }
    }, 60000);

    return () => {
      isMounted = false;
      clearTimeout(startDelay);
      clearInterval(pollInterval);
      clearTimeout(fallback);
    };
  }, [updateCounter]);

  // Intro animation
  useGSAP(() => {
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();

    gsap.fromTo('.loader-text', {
      y: 50, opacity: 0, skewY: 5
    }, {
      y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.2, ease: "power3.out",
      delay: 0.2
    });
  }, { scope: containerRef });

  // Exit animation — only when BOTH conditions are met
  useGSAP(() => {
    if (assetsReady && minTimeElapsed) {
      const exitTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          if (window.lenis) window.lenis.start();
          // Clean up global trackers
          delete window.__framesPreloaded;
          delete window.__framesToPreload;
          if (onComplete) onComplete();
        }
      });

      exitTl.to(counterRef.current, {
        innerHTML: 100, duration: 0.5, snap: "innerHTML", ease: "power1.out"
      });

      exitTl.to('.loader-content', {
        scale: 0.95, opacity: 0, duration: 0.8, ease: "power2.inOut"
      }, "+=0.2");

      exitTl.to(containerRef.current, {
        y: "-100%", duration: 1.2, ease: "power4.inOut"
      }, "-=0.4");
    }
  }, [assetsReady, minTimeElapsed]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 text-text-primary uppercase overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      <div className="loader-content flex-grow flex flex-col justify-between h-full">
        <div className="flex justify-between items-start overflow-hidden">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter loader-text">Amey</h1>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter loader-text">Portfolio</h1>
        </div>
        
        <div className="flex flex-col items-center justify-center flex-grow overflow-hidden">
          <div className="text-center space-y-4">
            <p className="loader-text text-sm sm:text-base tracking-[0.3em] text-text-secondary font-medium">Loading Experience</p>
            <div className="loader-text flex items-baseline justify-center">
              <h2 className="text-8xl sm:text-9xl md:text-[10rem] font-black tracking-tighter" ref={counterRef}>
                0
              </h2>
              <span className="text-3xl sm:text-5xl font-bold text-accent">%</span>
            </div>

            {/* Fullscreen hint */}
            <div className="loader-text flex items-center justify-center gap-3 mt-6 opacity-60">
              <i className="fas fa-expand text-accent text-sm animate-pulse"></i>
              <p className="text-[10px] sm:text-xs tracking-[0.25em] text-text-secondary normal-case font-inter">
                Go fullscreen for the best experience
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end overflow-hidden">
          <p className="text-xs sm:text-sm tracking-[0.2em] loader-text text-text-secondary">Creative Developer</p>
          <p className="text-xs sm:text-sm tracking-[0.2em] loader-text text-text-secondary">EST. 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
