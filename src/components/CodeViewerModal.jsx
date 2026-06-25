import React, { useState } from 'react';

const CodeViewerModal = ({ project, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (project?.code) {
      navigator.clipboard.writeText(project.code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const extension = project?.codeType === 'js' ? 'source_code.js' : 'source_code.cpp';

  return (
    <div className={`fixed inset-0 z-[110] flex items-center justify-center transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-bg/90 backdrop-blur-md" onClick={onClose}></div>
      
      {project && (
        <div className={`relative z-10 w-11/12 md:w-3/4 max-w-4xl h-[80vh] flex flex-col bg-[#1e1e1e] rounded-xl shadow-2xl border border-border overflow-hidden transition-transform duration-500 ease-in-out ${isOpen ? 'scale-100' : 'scale-95'}`}>
          <div className="flex items-center justify-between px-6 py-4 bg-[#2a2a2a] border-b border-border">
            <div className="flex items-center gap-3">
              <i className="fas fa-file-code text-accent"></i>
              <span className="text-white font-mono text-sm tracking-wide">{extension}</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleCopy} className="text-text-secondary hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                {copied ? <><i className="fas fa-check text-green-400"></i> Copied!</> : <><i className="far fa-copy"></i> Copy</>}
              </button>
              <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-text-secondary hover:text-white transition-colors" aria-label="Close Code Viewer">
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 code-scrollbar bg-[#1e1e1e]">
            <pre><code className="text-[#d4d4d4] font-mono text-sm whitespace-pre-wrap">{project.code}</code></pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeViewerModal;
