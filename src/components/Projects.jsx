import React, { useState, useEffect, useRef } from 'react';
import { softwareProjects, hardwareProjects, projectsData } from '../data/projectsData';
import ProjectsCanvasSequence from './ProjectsCanvasSequence';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, displayIndex, onOpenProject }) => (
  <div 
    className="project-glass-card relative pointer-events-auto group w-[85vw] sm:w-[65vw] md:w-[50vw] lg:w-[640px] flex flex-col gap-4 sm:gap-5 md:gap-6 mr-0 bg-black/50 backdrop-blur-md p-5 sm:p-6 md:p-8 rounded-xl border border-white/10 hover:border-accent/40 transition-all duration-500 shadow-2xl"
  >
    {/* Cinematic Header (Number, Category & Line) */}
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-end gap-3 md:gap-4">
        <span className="text-4xl sm:text-5xl md:text-6xl font-light text-white/50 font-serif leading-none tracking-tighter transition-colors duration-700 group-hover:text-accent drop-shadow-lg">
          {displayIndex < 10 ? `0${displayIndex}` : displayIndex}
        </span>
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-accent font-semibold">
            {project.categoryLabel || (project.category === 'software' ? 'Software Platform' : 'Hardware System')}
          </span>
          <span className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest font-mono">
            {project.category === 'software' ? 'Full-Stack & Systems' : 'Robotics & Firmware'}
          </span>
        </div>
      </div>
      
      <div className="h-px bg-white/20 grow max-w-[140px] relative overflow-hidden hidden sm:block">
        <div className="absolute top-0 left-0 h-full w-full bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-[0.8s] ease-in-out"></div>
      </div>
    </div>

    {/* Cinematic Image Frame */}
    <div 
      onClick={() => onOpenProject(project)}
      className="relative w-full aspect-video rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] group-hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all duration-700 bg-[#0a0a0a] cursor-pointer"
    >
      <img 
        src={`/${project.image}`} 
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-90 group-hover:opacity-100"
      />
      {/* Soft Vignette & Border */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-accent/40 transition-colors pointer-events-none"></div>

      {/* Top badges */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        {project.link && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs text-white/90 font-mono shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live
          </span>
        )}
        {project.github && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs text-white/80 font-mono shadow-md">
            <i className="fab fa-github text-[11px]"></i>
            Repo
          </span>
        )}
      </div>

      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-accent/40 text-xs text-accent font-medium flex items-center gap-1.5">
          <span>Expand</span>
          <i className="fas fa-expand-alt text-[10px]"></i>
        </span>
      </div>
    </div>

    {/* Title and Description */}
    <div className="flex flex-col gap-2 md:gap-3 pl-1 border-l-2 border-white/20 group-hover:border-accent transition-colors duration-500">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide group-hover:text-accent transition-colors duration-300 drop-shadow-md">
        {project.title}
      </h3>
      
      <p className="text-gray-300 text-sm sm:text-base font-normal leading-relaxed line-clamp-3">
        {project.description}
      </p>
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {project.tags.map(tag => (
        <span key={tag} className="text-[11px] font-semibold px-3 py-1 bg-white/5 text-white/80 rounded-md border border-white/10 shadow-sm group-hover:border-white/20 transition-all">
          {tag}
        </span>
      ))}
    </div>

    {/* Action Links */}
    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 mt-1">
      <button 
        onClick={() => onOpenProject(project)}
        className="inline-flex items-center gap-2 text-white hover:text-accent transition-colors duration-300 font-bold tracking-[0.15em] uppercase text-xs sm:text-sm group/btn"
      >
        <span className="relative pb-0.5">
          Explore Work
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover/btn:w-full"></span>
        </span>
        <i className="fas fa-long-arrow-alt-right transform group-hover/btn:translate-x-1.5 transition-transform duration-300 text-accent"></i>
      </button>

      <div className="flex items-center gap-2">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent/20 hover:bg-accent text-accent hover:text-white border border-accent/40 text-xs font-semibold transition-all duration-300 shadow-sm"
            title="Open Live Deployment"
          >
            <i className="fas fa-external-link-alt text-[10px]"></i>
            <span>Live Demo</span>
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 text-xs font-semibold transition-all duration-300 shadow-sm"
            title="Open GitHub Repository"
          >
            <i className="fab fa-github"></i>
            <span>GitHub</span>
          </a>
        )}
      </div>
    </div>
  </div>
);

const Projects = ({ onOpenProject }) => {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const cards = document.querySelectorAll('.project-glass-card');
    const triggers = [];
    
    cards.forEach((card) => {
      const st = gsap.fromTo(card, 
        { opacity: 0, y: 70, scale: 0.96 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
      triggers.push(st.scrollTrigger);
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      triggers.forEach(t => t && t.kill());
    };
  }, [activeCategory]);

  const handleFilterChange = (category) => {
    setActiveCategory(category);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  const containerHeightClass = activeCategory === 'all' 
    ? 'h-[1550vh]' 
    : activeCategory === 'software' 
    ? 'h-[780vh]' 
    : 'h-[900vh]';

  return (
    <section id="projects-canvas-container" ref={containerRef} className={`relative w-full ${containerHeightClass} bg-[#0f0f0f] transition-[height] duration-500`}>
      {/* Sticky background sequence */}
      <ProjectsCanvasSequence />
      
      {/* Scrollable content overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none flex flex-col">
        
        {/* Intro Space */}
        <div className="h-[120vh] flex flex-col justify-center items-end px-6 md:px-12 lg:px-24">
          <div className="text-right max-w-xl">
            <div className="inline-flex items-center justify-end gap-3 mb-6">
              <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">Engineering Archive</span>
              <span className="w-12 h-0.5 bg-accent"></span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
              Engineered Works
            </h2>
            <p className="text-gray-300 text-base sm:text-lg md:text-xl drop-shadow-md font-light leading-relaxed">
              Explore intelligent decision software platforms, real-time spatial studios, and autonomous robotics prototypes built from first principles.
            </p>

            {/* Category Selector Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-end gap-2.5 pointer-events-auto">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 border ${
                  activeCategory === 'all'
                    ? 'bg-accent text-white border-accent shadow-lg shadow-accent/30'
                    : 'bg-black/60 text-white/70 border-white/15 hover:border-white/40 hover:text-white backdrop-blur-md'
                }`}
              >
                All Projects ({projectsData.length})
              </button>
              <button
                onClick={() => handleFilterChange('software')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 border flex items-center gap-2 ${
                  activeCategory === 'software'
                    ? 'bg-accent text-white border-accent shadow-lg shadow-accent/30'
                    : 'bg-black/60 text-white/70 border-white/15 hover:border-white/40 hover:text-white backdrop-blur-md'
                }`}
              >
                <i className="fas fa-laptop-code text-xs"></i>
                Software ({softwareProjects.length})
              </button>
              <button
                onClick={() => handleFilterChange('hardware')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 border flex items-center gap-2 ${
                  activeCategory === 'hardware'
                    ? 'bg-accent text-white border-accent shadow-lg shadow-accent/30'
                    : 'bg-black/60 text-white/70 border-white/15 hover:border-white/40 hover:text-white backdrop-blur-md'
                }`}
              >
                <i className="fas fa-microchip text-xs"></i>
                Hardware ({hardwareProjects.length})
              </button>
            </div>

            <div className="mt-12 md:mt-16 animate-bounce opacity-50">
              <i className="fas fa-chevron-down text-white text-2xl"></i>
            </div>
          </div>
        </div>

        {/* Sticky floating category indicator for quick toggling while scrolling */}
        <div className="sticky top-20 z-40 w-full flex justify-end px-6 md:px-12 lg:px-24 pointer-events-none mb-6">
          <div className="pointer-events-auto inline-flex items-center gap-1.5 p-1.5 rounded-full bg-black/75 backdrop-blur-xl border border-white/15 shadow-2xl">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-accent text-white shadow-md shadow-accent/30'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              All ({projectsData.length})
            </button>
            <button
              onClick={() => handleFilterChange('software')}
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                activeCategory === 'software'
                  ? 'bg-accent text-white shadow-md shadow-accent/30'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <i className="fas fa-laptop-code text-[10px]"></i>
              <span>Software ({softwareProjects.length})</span>
            </button>
            <button
              onClick={() => handleFilterChange('hardware')}
              className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                activeCategory === 'hardware'
                  ? 'bg-accent text-white shadow-md shadow-accent/30'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <i className="fas fa-microchip text-[10px]"></i>
              <span>Hardware ({hardwareProjects.length})</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: SOFTWARE & DECISION SYSTEMS                                    */}
        {/* ========================================================================= */}
        {(activeCategory === 'all' || activeCategory === 'software') && (
          <div id="software-projects" className="flex flex-col">
            {/* Software Section Header */}
            <div className="min-h-[50vh] flex items-center justify-end px-6 md:px-12 lg:px-24 py-16">
              <div className="text-right max-w-xl">
                <div className="inline-flex items-center justify-end gap-3 mb-4">
                  <span className="text-accent text-xs sm:text-sm font-mono font-bold tracking-[0.25em] uppercase">01 // SOFTWARE & DECISION SYSTEMS</span>
                  <span className="w-10 h-0.5 bg-accent"></span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-2xl">
                  Decision Engines & Spatial Twins
                </h2>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg drop-shadow-md font-light leading-relaxed">
                  Autonomous infrastructure intelligence, 3D elevation studios, hydrological epidemic radars, and APMC shared freight protocols.
                </p>
              </div>
            </div>

            {/* Software Project Cards */}
            {softwareProjects.map((project, index) => (
              <div key={project.id} className="min-h-[145vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 sm:py-0">
                <div className="w-full flex justify-end">
                  <ProjectCard 
                    project={project} 
                    displayIndex={index + 1} 
                    onOpenProject={onOpenProject} 
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: ROBOTICS & HARDWARE ENGINEERING                                */}
        {/* ========================================================================= */}
        {(activeCategory === 'all' || activeCategory === 'hardware') && (
          <div id="hardware-projects" className="flex flex-col">
            {/* Hardware Section Header */}
            <div className="min-h-[50vh] flex items-center justify-end px-6 md:px-12 lg:px-24 py-16">
              <div className="text-right max-w-xl">
                <div className="inline-flex items-center justify-end gap-3 mb-4">
                  <span className="text-accent text-xs sm:text-sm font-mono font-bold tracking-[0.25em] uppercase">
                    {activeCategory === 'hardware' ? '01' : '02'} // ROBOTICS & EMBEDDED ENGINEERING
                  </span>
                  <span className="w-10 h-0.5 bg-accent"></span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-2xl">
                  Kinematics, Sensors & Hardware
                </h2>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg drop-shadow-md font-light leading-relaxed">
                  Custom firmware, cascaded PID balancing, autonomous navigation, non-blocking ultrasonic state machines, and industrial fail-safe load systems.
                </p>
              </div>
            </div>

            {/* Hardware Project Cards */}
            {hardwareProjects.map((project, index) => (
              <div key={project.id} className="min-h-[145vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 sm:py-0">
                <div className="w-full flex justify-end">
                  <ProjectCard 
                    project={project} 
                    displayIndex={activeCategory === 'all' ? softwareProjects.length + index + 1 : index + 1} 
                    onOpenProject={onOpenProject} 
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Padding at bottom so the last project scrolls up completely before the next section appears */}
        <div className="h-[40vh]"></div>
        
      </div>
    </section>
  );
};

export default Projects;
