import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent animate-slide-down">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="text-xl md:text-2xl font-bold text-accent tracking-tight hover:opacity-80 transition-opacity duration-300">
            13Amey
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="relative text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-300 group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link to="/about" className="relative text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-300 group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link to="/projects" className="relative text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-300 group">
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link to="/skills" className="relative text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-300 group">
              Skills
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link to="/contact" className="relative text-sm font-medium text-text-secondary hover:text-accent transition-colors duration-300 group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/contact" className="hidden sm:inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 active:translate-y-0">
              Let's Talk
              <i className="fas fa-arrow-right text-xs"></i>
            </Link>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden flex flex-col gap-1.5 p-2 group" aria-label="Toggle navigation">
              <span className={`block w-6 h-0.5 bg-text-secondary transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-2 bg-accent' : 'group-hover:bg-accent'}`}></span>
              <span className={`block w-6 h-0.5 bg-text-secondary transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'group-hover:bg-accent'}`}></span>
              <span className={`block ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2 bg-accent' : 'w-4 group-hover:bg-accent'} h-0.5 bg-text-secondary transition-all duration-300 origin-center`}></span>
            </button>
          </div>
        </div>

        <div className={`mobile-menu md:hidden ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="flex flex-col gap-1 pb-6 pt-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="mobile-link px-4 py-3 rounded-lg text-text-secondary hover:text-accent hover:bg-card/50 transition-all duration-300 text-sm font-medium">Home</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="mobile-link px-4 py-3 rounded-lg text-text-secondary hover:text-accent hover:bg-card/50 transition-all duration-300 text-sm font-medium">About</Link>
            <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className="mobile-link px-4 py-3 rounded-lg text-text-secondary hover:text-accent hover:bg-card/50 transition-all duration-300 text-sm font-medium">Projects</Link>
            <Link to="/skills" onClick={() => setMobileMenuOpen(false)} className="mobile-link px-4 py-3 rounded-lg text-text-secondary hover:text-accent hover:bg-card/50 transition-all duration-300 text-sm font-medium">Skills</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="mobile-link px-4 py-3 rounded-lg text-text-secondary hover:text-accent hover:bg-card/50 transition-all duration-300 text-sm font-medium">Contact</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="sm:hidden mx-4 mt-2 text-center bg-accent hover:bg-accent-hover text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-all duration-300">
              Let's Talk
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
