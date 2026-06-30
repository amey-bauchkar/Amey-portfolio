import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90] p-3 md:p-4 rounded-full flex items-center justify-center 
        bg-[#151515]/80 backdrop-blur-md border border-white/10 text-white/70 
        transition-all duration-500 ease-in-out hover:text-accent hover:border-accent/50 hover:bg-[#1a1a1a] shadow-lg
        ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <i className="fas fa-arrow-up text-sm md:text-base"></i>
    </button>
  );
};

export default ScrollToTop;
