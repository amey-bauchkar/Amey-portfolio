import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CinematicNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-in-out px-8 md:px-16 py-4 flex items-center justify-between ${scrolled ? 'cinematic-glass opacity-100 translate-y-0' : 'bg-transparent opacity-0 -translate-y-4 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto'}`}>
      <div className="flex-1">
        <Link to="/" className="text-white font-bold tracking-tight text-xl font-outfit hover:text-cinematic-amber transition-colors duration-300">
          13Amey
        </Link>
      </div>
      
      <div className="hidden md:flex flex-1 justify-center items-center gap-10 text-xs font-semibold tracking-widest uppercase text-white/60">
        <Link to="/" className="hover:text-white transition-colors duration-300">Home</Link>
        <Link to="/projects" className="hover:text-white transition-colors duration-300">Projects</Link>
        <Link to="/skills" className="hover:text-white transition-colors duration-300">Skills</Link>
        <Link to="/contact" className="hover:text-white transition-colors duration-300">Contact</Link>
      </div>

      <div className="flex-1 flex justify-end">
        <button 
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })} 
          className="cinematic-button px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase">
          Begin Reading
        </button>
      </div>
    </nav>
  );
};

export default CinematicNavbar;
