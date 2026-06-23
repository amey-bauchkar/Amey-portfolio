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

  // Wait for window load and all initial videos/images
  useEffect(() => {
    let isMounted = true;

    const checkAssets = async () => {
      // 1. Wait for window load event if document isn't complete yet
      if (document.readyState !== 'complete') {
        await new Promise(resolve => window.addEventListener('load', resolve, { once: true }));
      }
      
      // 2. Query all media elements currently in the DOM
      const mediaElements = [
        ...Array.from(document.querySelectorAll('video')),
        ...Array.from(document.querySelectorAll('img'))
      ];
      
      const mediaPromises = mediaElements.map(el => {
        if (el.tagName === 'IMG' && el.complete) return Promise.resolve();
        if (el.tagName === 'VIDEO' && el.readyState >= 3) return Promise.resolve();
        
        return new Promise(resolve => {
          const resolveHandler = () => resolve();
          // For images
          el.addEventListener('load', resolveHandler, { once: true });
          // For videos
          el.addEventListener('canplay', resolveHandler, { once: true });
          el.addEventListener('loadeddata', resolveHandler, { once: true });
          // Fallback on error to avoid infinite loading
          el.addEventListener('error', resolveHandler, { once: true });
        });
      });

      await Promise.all(mediaPromises);
      if (isMounted) setAssetsLoaded(true);
    };

    checkAssets();
    
    // Safety fallback: if some assets take longer than 12 seconds, force exit to avoid hanging the site
    const fallback = setTimeout(() => {
      if (isMounted) setAssetsLoaded(true);
    }, 12000);

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

    // Simulate progress up to 99% while we wait
    tl.to(counterRef.current, {
      innerHTML: 99,
      duration: 2.5,
      snap: "innerHTML",
      ease: "power2.out"
    }, 0);

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
