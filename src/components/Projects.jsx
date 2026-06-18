import React from 'react';
import { projectsData } from '../data/projectsData';

const Projects = ({ onOpenProject }) => {
  return (
    <section id="projects" className="relative py-32 bg-bg bg-grid border-t border-border/50 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="mb-12 md:mb-16 anim-hidden animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-0.5 bg-accent"></span>
            <span className="text-accent text-sm font-bold tracking-wider uppercase">Portfolio</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">Featured Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div 
              key={project.id}
              className={`project-card group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/5 anim-hidden animate-fade-in-up ${project.delay}`}
              onClick={() => onOpenProject(project)}
            >
              <div className="relative h-56 sm:h-64 overflow-hidden bg-[#2a2a2a]">
                <img 
                  src={`/${project.image}`} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90 z-10"></div>
              </div>
              <div className="p-6 sm:p-8 relative z-20">
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">{project.title}</h3>
                <p className="text-text-secondary text-sm sm:text-base mb-6 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1 bg-accent/10 text-accent rounded-md">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-accent text-sm font-semibold transition-colors"><i className="fas fa-expand"></i> View Details</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
