import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactCanvasSequence = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    let lastDrawnFrame = -1;
    
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      
      lastDrawnFrame = -1;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const frameCount = 240; // Total number of frames extracted
    const imagePath = (index) => `/contact-frames/frame_${String(index + 1).padStart(4, '0')}.jpg`;

    const images = new Array(frameCount).fill(null);
    const sequence = { frame: 0 };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      images[i] = new Image();
    }
    
    // Load first 10 frames immediately for fast visual feedback
    for (let i = 0; i < 10; i++) {
      images[i].src = imagePath(i);
    }
    
    // Defer loading the rest so it doesn't block other assets on initial load
    setTimeout(() => {
      for (let i = 10; i < frameCount; i++) {
        images[i].src = imagePath(i);
      }
    }, 500);

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
          trigger: '#contact-canvas-container',
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
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden cinematic-bg z-0 flex items-center justify-center bg-[#0a0a0a]">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover max-w-none opacity-100 transition-opacity duration-1000"
      />
      

    </div>
  );
};

export default ContactCanvasSequence;
