import React from 'react';

const CvModal = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={onClose}></div>
      <div className={`relative z-10 w-11/12 md:w-3/4 lg:w-2/3 max-w-5xl h-[85vh] bg-card border border-border rounded-xl shadow-2xl shadow-accent/10 overflow-hidden flex flex-col transition-transform duration-500 ease-in-out ${isOpen ? 'scale-100' : 'scale-95'}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-bg/50">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-0.5 bg-accent"></span>
            <h3 className="text-text-primary font-bold tracking-wider uppercase text-sm">Resume / CV</h3>
          </div>
          <div className="flex items-center gap-4">
            <a href="/Amey_Bauchkar_Resume.png" download className="text-text-secondary hover:text-accent transition-colors flex items-center gap-2 text-sm font-semibold">
              <i className="fas fa-download"></i> Download
            </a>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-bg border border-border hover:border-accent/50 text-text-secondary hover:text-white flex items-center justify-center transition-all">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <img src="/Amey_Bauchkar_Resume.png" alt="Amey Bauchkar Resume" className="w-full h-auto object-contain rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default CvModal;
