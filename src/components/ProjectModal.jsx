import React from 'react';

const ProjectModal = ({ project, isOpen, onClose, onOpenCode }) => {
  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={onClose}></div>
      
      {project && (
        <div className={`relative z-10 w-11/12 md:w-3/4 lg:w-2/3 max-w-5xl bg-card border border-border rounded-xl shadow-2xl shadow-accent/10 overflow-hidden flex flex-col max-h-[85vh] transition-transform duration-500 ease-in-out ${isOpen ? 'scale-100' : 'scale-95'}`}>
          <div className="flex-1 overflow-y-auto">
            {project.video ? (
              <video src={`/${project.video}`} autoPlay muted loop className="w-full h-64 md:h-80 object-cover"></video>
            ) : (
              <img src={`/${project.image}`} alt={project.title} className="w-full h-64 md:h-80 object-cover" />
            )}
            
            <div className="p-8 md:p-12 relative">
              <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 bg-bg/50 hover:bg-accent text-white rounded-full flex items-center justify-center transition-colors">
                <i className="fas fa-times"></i>
              </button>
              
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-0.5 bg-accent"></span>
                <span className="text-accent text-sm font-bold tracking-wider uppercase">Project Details</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">{project.title}</h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-semibold px-3 py-1 bg-accent/10 text-accent rounded-md border border-accent/20">{tag}</span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 border-t border-border/50 pt-8 mt-8">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-md transition-all">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                )}
                {project.code && (
                  <button onClick={() => onOpenCode(project)} className="inline-flex items-center gap-2 bg-bg border border-border hover:border-accent/50 text-white font-semibold px-6 py-3 rounded-md transition-all cursor-pointer">
                    <i className="fas fa-code"></i> View Source
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectModal;
