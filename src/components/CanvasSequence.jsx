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
    
    // Set internal resolution of the canvas (16:9 cinematic)
    canvas.width = 1920;
    canvas.height = 1080;
    
    const frameCount = 150; // Adjust this based on your exported frames count
    const currentFrame = index => `/frames/frame_${(index + 1).toString().padStart(4, '0')}.jpg`;
    
    const images = [];
    const sequence = { frame: 0 };
    
    // Preload frames
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }
    
    let lastDrawnFrame = -1;
    let animationFrameId;

    // Use requestAnimationFrame for incredibly robust rendering. 
    // This solves the issue where an image might finish loading *after* the scrub event fired.
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
          scrub: 0.5,
        }
      });
      // Force GSAP to recalculate positions because we initialized this asynchronously
      ScrollTrigger.refresh();
    }, 200);
    
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrameId);
      if (st) st.kill();
    };
  }, []);

  return (
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden cinematic-bg z-0 flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover max-w-none opacity-90 transition-opacity duration-1000"
      />
      {/* Fallback gradients to blend the edges perfectly into #050505 */}
      <div className="absolute inset-0 z-[-1] cinematic-radial-bg"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-cinematic-bg via-transparent to-cinematic-bg z-10 pointer-events-none opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cinematic-bg via-transparent to-cinematic-bg z-10 pointer-events-none opacity-80"></div>
    </div>
  );
};

export default CanvasSequence;
