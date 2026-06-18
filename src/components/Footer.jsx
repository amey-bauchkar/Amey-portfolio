import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card py-8 z-10 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-secondary text-sm">© 2026 Amey Bauchkar. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://www.linkedin.com/in/amey-bauchkar-3394453ba/" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent transition-colors"><i className="fab fa-linkedin text-xl"></i></a>
          <a href="https://www.instagram.com/13amey_/" target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent transition-colors"><i className="fab fa-instagram text-xl"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
