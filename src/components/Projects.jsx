import React, { useEffect, useRef } from 'react';
import { projectsData } from '../data/projectsData';
import ProjectsCanvasSequence from './ProjectsCanvasSequence';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = ({ onOpenProject }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = document.querySelectorAll('.project-glass-card');
    const triggers = [];
    
    cards.forEach((card) => {
      const st = gsap.fromTo(card, 
        { opacity: 0, y: 100, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
      triggers.push(st.scrollTrigger);
    });

    return () => {
      triggers.forEach(t => t && t.kill());
    };
  }, []);

  return (
    <section id="projects-canvas-container" ref={containerRef} className="relative w-full h-[920vh] bg-[#0f0f0f]">
      {/* Sticky background sequence */}
      <ProjectsCanvasSequence />
      
      {/* Scrollable content overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none flex flex-col">
        
        {/* Intro Space */}
        <div className="h-[120vh] flex items-center justify-end px-6 md:px-12 lg:px-24">
            <div className="text-right max-w-lg">
              <div className="inline-flex items-center justify-end gap-3 mb-6">
                <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">Portfolio</span>
                <span className="w-12 h-0.5 bg-accent"></span>
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">My Archive</h2>
              <p className="text-gray-300 text-lg md:text-xl drop-shadow-md font-light leading-relaxed">
                A collection of things I've engineered, built, and brought to life.
              </p>
              <div className="mt-16 animate-bounce opacity-50">
                <i className="fas fa-chevron-down text-white text-2xl"></i>
              </div>
            </div>
        </div>

        {/* Projects Sections */}
        {projectsData.map((project, index) => (
          <div key={project.id} className="h-[150vh] flex flex-col justify-center px-6 md:px-12 lg:px-24">
            <div className="w-full flex justify-center md:justify-end">
              
              <div 
                className="project-glass-card pointer-events-auto group w-full md:w-[500px] lg:w-[550px] xl:w-[600px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-accent/40 transition-colors duration-700 shadow-2xl"
              >
                <div className="relative h-56 sm:h-72 overflow-hidden bg-[#111]">
                  <img 
                    src={`/${project.image}`} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-70 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
                  
                  {/* Subtle index number */}
                  <div className="absolute top-6 left-6 z-20">
                    <span className="text-white/20 font-black text-5xl">0{index + 1}</span>
                  </div>
                </div>
                
                <div className="p-8 sm:p-10 relative z-20 bg-gradient-to-b from-black/80 to-black/95">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-500">{project.title}</h3>
                  <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed font-light">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs sm:text-sm font-medium px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-lg">{tag}</span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => onOpenProject(project)}
                    className="w-full py-4 rounded-xl bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/50 text-white font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-3 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
                  >
                    <i className="fas fa-expand text-accent"></i> 
                    <span>View Details</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
        
        {/* Padding at bottom so the last project scrolls up completely before the next section appears */}
        <div className="h-[50vh]"></div>
        
      </div>
    </section>
  );
};

export default Projects;
