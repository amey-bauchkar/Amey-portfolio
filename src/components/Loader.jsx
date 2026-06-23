import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const tlRef = useRef();

  // Minimum time to show the cinematic loader (2.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Real Preloader Logic
  useEffect(() => {
    let isMounted = true;

    const frameUrls = Array.from({ length: 240 }, (_, i) => `/contact-frames/frame_${String(i + 1).padStart(4, '0')}.jpg`);
    
    const globalAssets = [
      '/convert_the_above_video_into_c.mp4',
      '/Demo.mp4',
      '/aqualens-cover.png',
      '/line-follower.jpg',
      '/self-balancing.avif',
      '/smart-dustbin.jpg',
      '/crane-safety.jpg',
      '/amey-photo.png',
      '/Amey_Bauchkar_Resume.png',
      ...frameUrls
    ];

    const totalAssets = globalAssets.length;
    let loadedAssets = 0;

    const updateProgress = () => {
      if (!isMounted) return;
      loadedAssets++;
      const currentProgress = Math.floor((loadedAssets / totalAssets) * 99);
      gsap.to(counterRef.current, {
        innerHTML: currentProgress,
        duration: 0.2,
        snap: "innerHTML",
        ease: "power1.out"
      });
    };

    const preloadAsset = (url) => {
      return new Promise((resolve) => {
        if (url.endsWith('.mp4') || url.endsWith('.webm')) {
          const video = document.createElement('video');
          video.src = url;
          video.preload = 'auto';
          video.muted = true;
          // Don't append to DOM to avoid layout shifts, just force load
          const resolveHandler = () => {
            updateProgress();
            resolve();
          };
          video.addEventListener('canplaythrough', resolveHandler, { once: true });
          video.addEventListener('error', resolveHandler, { once: true });
          video.load();
        } else {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            updateProgress();
            resolve();
          };
          img.onerror = () => {
            updateProgress();
            resolve();
          };
        }
      });
    };

    const loadAll = async () => {
      // Chunk requests slightly to not crash older browsers, though Promise.all is usually fine
      const chunkSize = 20;
      for (let i = 0; i < globalAssets.length; i += chunkSize) {
        const chunk = globalAssets.slice(i, i + chunkSize);
        await Promise.all(chunk.map(url => preloadAsset(url)));
      }
      
      if (isMounted) setAssetsLoaded(true);
    };

    loadAll();

    // Fallback: 45 seconds max wait time
    const fallback = setTimeout(() => {
      if (isMounted) setAssetsLoaded(true);
    }, 45000);

    return () => {
      isMounted = false;
      clearTimeout(fallback);
    };
  }, []);

  // Initial intro animation
  useGSAP(() => {
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.fromTo('.loader-text', {
      y: 50, opacity: 0, skewY: 5
    }, {
      y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.2, ease: "power3.out"
    }, 0.2);

  }, { scope: containerRef });

  // Outro animation triggered only when both minimum time passed AND assets loaded
  useGSAP(() => {
    if (assetsLoaded && minTimeElapsed && tlRef.current) {
      const exitTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          if (window.lenis) window.lenis.start();
          if (onComplete) onComplete();
        }
      });

      // Finish the counter to exactly 100
      exitTl.to(counterRef.current, {
        innerHTML: 100,
        duration: 0.5,
        snap: "innerHTML",
        ease: "power1.out"
      });

      exitTl.to('.loader-content', {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, "+=0.2");

      exitTl.to(containerRef.current, {
        y: "-100%",
        duration: 1.2,
        ease: "power4.inOut"
      }, "-=0.4");
    }
  }, [assetsLoaded, minTimeElapsed]);

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
