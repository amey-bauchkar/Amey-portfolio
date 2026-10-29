import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AchievementsCanvasSequence = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: false }); // Disable alpha for 2x faster canvas blit

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

    const frameCount = 240;
    const currentFrame = (index) =>
      `/achievements-frames/frame_${(index + 1).toString().padStart(4, '0')}.jpg`;

    // Ensure frames are loaded immediately even if zip is still extracting
    const cached = window.__cachedFrames && window.__cachedFrames['achievements-frames'];
    const isCachedReady = cached && cached[0] && cached[0].src;

    let images;
    if (isCachedReady) {
      images = cached;
    } else {
      images = new Array(frameCount);
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images[i] = img;
      }
      if (window.__cachedFrames) {
        window.__cachedFrames['achievements-frames'] = images;
      }
    }

    const sequence = { frame: 0 };
    let animationFrameId;

    function renderLoop() {
      const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.round(sequence.frame)));
      const img = images[frameIndex];

      if (img && img.complete && img.naturalWidth !== 0) {
        if (lastDrawnFrame !== frameIndex) {
          const hRatio = canvas.width / img.width;
          const vRatio = canvas.height / img.height;
          const ratio = Math.max(hRatio, vRatio);
          const centerShift_x = (canvas.width - img.width * ratio) / 2;
          const centerShift_y = (canvas.height - img.height * ratio) / 2;

          // Directly draw full cover image (no clearRect needed, saving GPU fill-rate)
          context.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
          );

          lastDrawnFrame = frameIndex;
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    renderLoop();

    let st;
    const timeout = setTimeout(() => {
      st = gsap.to(sequence, {
        frame: frameCount - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#achievements-canvas-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5, // Smooth 0.5s catch-up interpolation removes ratcheted scroll stutter
        }
      });
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrameId);
      if (st) st.kill();
    };
  }, []);

  return (
    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 flex items-center justify-center bg-[#070709] will-change-transform">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover max-w-none opacity-90 transition-opacity duration-700"
      />

      {/* Lightweight Dark Vignettes for contrast without heavy GPU blur */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/80 pointer-events-none z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/75 via-transparent to-[#070709]/75 pointer-events-none z-10"></div>
    </div>
  );
};

export default AchievementsCanvasSequence;
