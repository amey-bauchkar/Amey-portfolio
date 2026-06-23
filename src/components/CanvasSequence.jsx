import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CanvasSequence = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    let lastDrawnFrame = -1;
    
    const updateCanvasSize = () => {
      // Removed devicePixelRatio multiplier. Drawing 300 frames to an 8K canvas causes massive VRAM 
      // spikes, crashes the 2D context (which makes frames stop loading), and causes extreme lag.
      // Standard CSS pixel resolution is much more stable and hardware-accelerated.
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Enable high-quality image smoothing to mitigate low-resolution source frames
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      
      // Force redraw on resize
      lastDrawnFrame = -1;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    const frameCount = 240; // Original 24fps video (24fps * 10s) without AI interpolation.
    const currentFrame = index => `/frames/frame_${(index + 1).toString().padStart(4, '0')}.jpg`;
    
    // Use pre-cached frames from the global preloader if available
    const cached = window.__cachedFrames && window.__cachedFrames['frames'];
    const images = cached || new Array(frameCount).fill(null);
    const sequence = { frame: 0 };
    
    // Only create new Image objects if pre-cached ones aren't available
    if (!cached) {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images[i] = img;
      }
    }
    
    let animationFrameId;

    // Use requestAnimationFrame for incredibly robust rendering. 
    function renderLoop() {
      const frameIndex = Math.round(sequence.frame);

      if (images[frameIndex]) {
        const img = images[frameIndex];
        
        if (img.complete && img.naturalWidth !== 0) {
            // Only execute canvas drawing if the frame actually changed to save performance
            if (lastDrawnFrame !== frameIndex) {
              const hRatio = canvas.width / img.width;
              const vRatio = canvas.height / img.height;
              const ratio = Math.max(hRatio, vRatio);
              const centerShift_x = (canvas.width - img.width * ratio) / 2;
              const centerShift_y = (canvas.height - img.height * ratio) / 2;
              
              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(img, 0, 0, img.width, img.height,
                                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
                                
              lastDrawnFrame = frameIndex;
            }
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    }
    
    renderLoop();
    
    let st;
    const timeout = setTimeout(() => {
      st = gsap.to(sequence, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: '#canvas-container',
          start: 'top top',
          end: 'bottom bottom',
          // Use true instead of 0.5 so that GSAP instantly matches Lenis's smooth scrolling 
          // without adding double-delay which makes it feel disconnected
          scrub: true,
        }
      });
      // Force GSAP to recalculate positions because we initialized this asynchronously
      ScrollTrigger.refresh();
    }, 200);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrameId);
      if (st) st.kill();
    };
  }, []);

  return (
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden cinematic-bg z-0 flex items-center justify-center bg-black">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover max-w-none opacity-90 transition-opacity duration-1000"
      />
      {/* Same gradient overlay used on the home page for text readability */}
      <div className="hero-overlay pointer-events-none" aria-hidden="true"></div>
      
      {/* Extra uniform darkness because About page has text on the right side too */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none z-10"></div>
    </div>
  );
};

export default CanvasSequence;
