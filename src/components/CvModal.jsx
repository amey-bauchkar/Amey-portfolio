import React from 'react';

const CvModal = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-bg/85 backdrop-blur-md" onClick={onClose}></div>
      <div className={`relative z-10 w-11/12 md:w-3/4 lg:w-2/3 max-w-5xl h-[88vh] bg-card border border-border rounded-2xl shadow-2xl shadow-accent/15 overflow-hidden flex flex-col transition-transform duration-500 ease-in-out ${isOpen ? 'scale-100' : 'scale-95'}`}>
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-[#141419]/90 z-20">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-6 h-0.5 bg-accent"></span>
            <h3 className="text-text-primary font-bold tracking-wider uppercase text-sm font-mono">Amey Bauchkar — Resume</h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 hidden sm:inline-block">PDF</span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="/Amey_Bauchkar_Resume.pdf" 
              target="_blank" 
              rel="noreferrer"
              data-cursor-label="Open PDF"
              className="cursor-target text-text-secondary hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border hover:border-white/30 bg-white/5"
              title="Open PDF in new tab"
            >
              <i className="fas fa-external-link-alt text-[10px]"></i>
              <span className="hidden sm:inline">Open in Tab</span>
            </a>

            <a 
              href="/Amey_Bauchkar_Resume.pdf" 
              download="Amey_Bauchkar_Resume.pdf"
              data-cursor-label="Download"
              className="cursor-target bg-accent hover:bg-accent-hover text-white transition-all flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-md shadow-accent/20 hover:-translate-y-0.5"
              title="Download official PDF resume"
            >
              <i className="fas fa-download text-[11px]"></i>
              <span>Download PDF</span>
            </a>

            <button 
              onClick={onClose} 
              data-cursor-label="Close"
              className="cursor-target w-8 h-8 rounded-full bg-white/5 border border-border hover:border-accent/50 text-text-secondary hover:text-white flex items-center justify-center transition-all cursor-pointer ml-1" 
              aria-label="Close CV Modal"
            >
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>
        </div>

        {/* Modal Body / Resume Preview */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-[#0b0b0e] flex justify-center">
          <div className="w-full max-w-3xl flex justify-center">
            <img 
              src="/Amey_Bauchkar_Resume.png" 
              alt="Amey Bauchkar Resume" 
              className="w-full h-auto object-contain rounded-xl shadow-2xl border border-white/10"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CvModal;
