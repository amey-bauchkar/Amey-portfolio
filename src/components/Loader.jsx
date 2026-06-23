import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (window.lenis) window.lenis.start();
        if (onComplete) onComplete();
      }
    });

    // Simulate loading progress
    tl.to(counterRef.current, {
      innerHTML: 100,
      duration: 3,
      snap: "innerHTML",
      ease: "power3.inOut",
      onUpdate: function() {
        setProgress(Math.round(this.targets()[0].innerHTML));
      }
    }, 0);

    // Text reveal animation
    tl.fromTo('.loader-text', {
      y: 50,
      opacity: 0,
      skewY: 5
    }, {
      y: 0,
      opacity: 1,
      skewY: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    }, 0.2);

    // Scale down text slightly before exit
    tl.to('.loader-content', {
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, 3);

    // Slide up exit animation
    tl.to(containerRef.current, {
      y: "-100%",
      duration: 1.2,
      ease: "power4.inOut"
    }, 3.2);

  }, { scope: containerRef });

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
