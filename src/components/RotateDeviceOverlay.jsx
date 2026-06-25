import React, { useState, useEffect } from 'react';

const RotateDeviceOverlay = () => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Check if mobile device width or touch pointer
      const isMobileDevice = window.innerWidth <= 1024 || (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
      setIsMobile(isMobileDevice);
      
      // Check if height > width (portrait)
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    checkOrientation();

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isMobile || !isPortrait) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-[#0a0a0a] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="text-accent text-6xl mb-8 animate-rotate-phone">
        <i className="fas fa-mobile-alt"></i>
      </div>
      <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Please Rotate Your Device</h2>
      <p className="text-gray-400 text-base max-w-xs mx-auto leading-relaxed">
        This immersive portfolio is designed exclusively for landscape viewing on mobile devices. Rotate your phone horizontally to continue.
      </p>
    </div>
  );
};

export default RotateDeviceOverlay;
