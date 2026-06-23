import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WorkshopCanvasSequence = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    let lastDrawnFrame = -1;
    
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      
      lastDrawnFrame = -1;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    const frameCount = 240; // vid 4.mp4 frames
    const currentFrame = index => `/workshop-frames/frame_${(index + 1).toString().padStart(4, '0')}.jpg`;
    
    // Use pre-cached frames from the global preloader if available
    const cached = window.__cachedFrames && window.__cachedFrames['workshop-frames'];
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

    function renderLoop() {
      const frameIndex = Math.round(sequence.frame);

      if (images[frameIndex]) {
        const img = images[frameIndex];
        
        if (img.complete && img.naturalWidth !== 0) {
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
          trigger: '#workshop-canvas-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      });
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
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden cinematic-bg z-0 flex items-center justify-center bg-[#0f0f0f]">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover max-w-none opacity-100 transition-opacity duration-1000"
      />
      
      {/* Right-side gradient for text readability (character is on the left) */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/50 to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default WorkshopCanvasSequence;
