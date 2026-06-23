import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  
  const [assetsReady, setAssetsReady] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const lastProgressRef = useRef(0);

  // Minimum display time so the loader doesn't flash away
  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Track real preloading progress
  useEffect(() => {
    let isMounted = true;
    let pollInterval;

    const checkProgress = () => {
      if (!isMounted) return;

      const totalFrames = window.__framesToPreload || 0;
      const loadedFrames = window.__framesPreloaded || 0;

      // Don't do anything until PreloadContainer has initialized
      if (totalFrames === 0) return;

      // Calculate real progress (0-99, reserve 100 for the exit animation)
      const rawProgress = Math.floor((loadedFrames / totalFrames) * 99);
      // Only go up, never down
      const progress = Math.max(lastProgressRef.current, rawProgress);

      if (progress !== lastProgressRef.current && counterRef.current) {
        lastProgressRef.current = progress;
        gsap.to(counterRef.current, {
          innerHTML: progress,
          duration: 0.4,
          snap: "innerHTML",
          ease: "power1.out"
        });
      }

      // Check if ALL frames are loaded
      if (loadedFrames >= totalFrames) {
        clearInterval(pollInterval);
        setAssetsReady(true);
      }
    };

    // Poll every 300ms
    pollInterval = setInterval(checkProgress, 300);

    // Safety fallback: 3 minutes for extremely slow connections
    const fallback = setTimeout(() => {
      if (isMounted) {
        clearInterval(pollInterval);
        setAssetsReady(true);
      }
    }, 180000);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
      clearTimeout(fallback);
    };
  }, []);

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

  // Exit animation — only when BOTH conditions met
  useGSAP(() => {
    if (assetsReady && minTimeElapsed) {
      const exitTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          if (window.lenis) window.lenis.start();
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
