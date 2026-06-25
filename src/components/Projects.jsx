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
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">My Archive</h2>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl drop-shadow-md font-light leading-relaxed">
                A collection of things I've engineered, built, and brought to life.
              </p>
              <div className="mt-12 md:mt-16 animate-bounce opacity-50">
                <i className="fas fa-chevron-down text-white text-2xl"></i>
              </div>
            </div>
        </div>

        {/* Projects Sections */}
        {projectsData.map((project, index) => (
          <div key={project.id} className="min-h-[150vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24 sm:py-0">
            <div className="w-full flex justify-center md:justify-end">
              
              <div 
                className="relative pointer-events-auto group w-[85vw] sm:w-[50vw] md:w-[45vw] lg:w-[600px] flex flex-col gap-4 sm:gap-5 md:gap-8 mr-0"
              >
                {/* Cinematic Header (Number & Line) */}
                <div className="flex items-end gap-4 md:gap-6">
                  <span className="text-5xl md:text-7xl font-light text-white/50 font-serif leading-none tracking-tighter transition-colors duration-700 group-hover:text-white/80 drop-shadow-lg">
                    0{index + 1}
                  </span>
                  <div className="h-px bg-white/30 grow mb-2 sm:mb-4 relative overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 h-full w-full bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-[1s] ease-in-out"></div>
                  </div>
                </div>

                {/* Cinematic Image Frame */}
                <div className="relative w-full aspect-video md:aspect-[21/9] max-h-[35vh] sm:max-h-[45vh] md:max-h-none rounded-md overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-shadow duration-700 bg-[#0a0a0a]">
                  <img 
                    src={`/${project.image}`} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out opacity-90 group-hover:opacity-100"
                  />
                  {/* Soft Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                  <div className="absolute inset-0 border border-white/10 rounded-md"></div>
                </div>

                {/* Title and Description */}
                <div className="flex flex-col gap-2 md:gap-4 pl-2 md:pl-4 border-l-2 border-white/20 group-hover:border-accent/80 transition-colors duration-700">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide group-hover:text-accent transition-colors duration-500 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-100 text-base md:text-lg font-normal leading-relaxed line-clamp-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pl-2 md:pl-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-4 py-1.5 bg-black/40 text-white rounded-full border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.5)] group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-500">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Link */}
                <div className="pt-2 pl-2 md:pl-4">
                  <button 
                    onClick={() => onOpenProject(project)}
                    className="inline-flex items-center gap-4 text-white hover:text-accent transition-colors duration-300 font-bold tracking-[0.2em] uppercase text-sm group/btn drop-shadow-md"
                  >
                    <span className="relative pb-1">
                      Explore Work
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-500 group-hover/btn:w-full"></span>
                    </span>
                    <i className="fas fa-long-arrow-alt-right transform group-hover/btn:translate-x-3 transition-transform duration-500 text-accent"></i>
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
