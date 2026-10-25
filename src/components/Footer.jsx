import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-[#0c0c0e] py-8 z-10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <Link to="/" className="text-lg font-bold text-accent tracking-tight">13Amey</Link>
          <p className="text-text-secondary text-xs sm:text-sm">© 2026 Amey Bauchkar. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-5 text-xs sm:text-sm text-text-secondary font-medium">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <Link to="/about" className="hover:text-accent transition-colors">About</Link>
          <Link to="/projects" className="hover:text-accent transition-colors">Projects</Link>
          <Link to="/skills" className="hover:text-accent transition-colors">Skills</Link>
          <Link to="/achievements" className="hover:text-accent transition-colors">Achievements</Link>
          <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/amey-bauchkar" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent transition-colors" aria-label="GitHub Profile"><i className="fab fa-github text-xl"></i></a>
          <a href="https://www.linkedin.com/in/amey-bauchkar-3394453ba/" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent transition-colors" aria-label="LinkedIn Profile"><i className="fab fa-linkedin text-xl"></i></a>
          <a href="https://www.instagram.com/13amey_/" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent transition-colors" aria-label="Instagram Profile"><i className="fab fa-instagram text-xl"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
