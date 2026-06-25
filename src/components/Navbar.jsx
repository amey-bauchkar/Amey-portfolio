import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

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

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-300 group ${
      isActive ? 'text-accent' : 'text-text-secondary hover:text-accent'
    }`;

  const navLineClass = ({ isActive }) =>
    `absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 rounded-full ${
      isActive ? 'w-full' : 'w-0 group-hover:w-full'
    }`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-down ${scrolled ? 'bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-2 md:py-0' : 'bg-transparent py-4 md:py-0'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="text-xl md:text-2xl font-bold text-accent tracking-tight hover:opacity-80 transition-opacity duration-300">
            13Amey
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Home
                  <span className={navLineClass({ isActive })}></span>
                </>
              )}
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  About
                  <span className={navLineClass({ isActive })}></span>
                </>
              )}
            </NavLink>
            <NavLink to="/projects" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Projects
                  <span className={navLineClass({ isActive })}></span>
                </>
              )}
            </NavLink>
            <NavLink to="/skills" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Skills
                  <span className={navLineClass({ isActive })}></span>
                </>
              )}
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Contact
                  <span className={navLineClass({ isActive })}></span>
                </>
              )}
            </NavLink>
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

        <div className={`mobile-menu md:hidden absolute left-0 right-0 top-full bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/10 shadow-2xl ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="flex flex-col gap-1 px-6 pb-6 pt-4">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => `mobile-link px-4 py-3 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-300 text-sm font-medium ${isActive ? 'text-accent bg-white/5' : 'text-text-secondary'}`}>Home</NavLink>
            <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => `mobile-link px-4 py-3 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-300 text-sm font-medium ${isActive ? 'text-accent bg-white/5' : 'text-text-secondary'}`}>About</NavLink>
            <NavLink to="/projects" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => `mobile-link px-4 py-3 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-300 text-sm font-medium ${isActive ? 'text-accent bg-white/5' : 'text-text-secondary'}`}>Projects</NavLink>
            <NavLink to="/skills" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => `mobile-link px-4 py-3 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-300 text-sm font-medium ${isActive ? 'text-accent bg-white/5' : 'text-text-secondary'}`}>Skills</NavLink>
            <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => `mobile-link px-4 py-3 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-300 text-sm font-medium ${isActive ? 'text-accent bg-white/5' : 'text-text-secondary'}`}>Contact</NavLink>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="sm:hidden mx-4 mt-4 text-center bg-accent hover:bg-accent-hover text-white text-sm font-semibold px-5 py-3 rounded-md transition-all duration-300 shadow-lg shadow-accent/20">
              Let's Talk
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
