import React, { useEffect, useRef } from 'react';
import WorkshopCanvasSequence from './WorkshopCanvasSequence';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const workshopData = [
  {
    id: 1,
    category: "Web Development",
    title: "The Digital Interface",
    description: "Designing wireframes, building layouts, and writing the code that connects the user to the machine. Creating responsive, intuitive experiences from raw concepts.",
    tags: ["React", "JavaScript", "Tailwind CSS", "UI/UX"]
  },
  {
    id: 2,
    category: "Robotics",
    title: "Kinematics & Motion",
    description: "Engineering mechanical sketches into physical reality. Designing robotic concepts, kinematics, and control systems that interact with the physical world.",
    tags: ["PID Control", "Hardware Prototyping", "Mechanics"]
  },
  {
    id: 3,
    category: "IoT & Embedded",
    title: "The Nervous System",
    description: "Architecting sensor networks and circuit designs. Bridging the physical and digital divide through microcontrollers, real-time data, and embedded logic.",
    tags: ["ESP32", "Arduino", "C/C++", "Sensors"]
  },
  {
    id: 4,
    category: "Problem Solving",
    title: "Logic & Architecture",
    description: "Translating chaos into flow diagrams and structural logic. Building the invisible architecture that dictates how systems, algorithms, and data interact seamlessly.",
    tags: ["Data Structures", "Algorithms", "System Design"]
  },
  {
    id: 5,
    category: "Hackathons",
    title: "Collaborative Innovation",
    description: "Brainstorming, prototyping, and executing under pressure. Turning a collaborative whiteboard session into a fully functional product within hours.",
    tags: ["Teamwork", "Agile", "Rapid Prototyping"]
  }
];

const Workshop = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const textBlocks = document.querySelectorAll('.workshop-text-block');
    const triggers = [];
    
    textBlocks.forEach((block) => {
      const st = gsap.fromTo(block, 
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 70%",
            end: "bottom 30%",
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
    <section id="workshop-canvas-container" ref={containerRef} className="relative w-full h-[920vh] bg-[#0f0f0f]">
      {/* Sticky background sequence */}
      <WorkshopCanvasSequence />
      
      {/* Scrollable content overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none flex flex-col">
        
        {/* Intro Space */}
        <div className="h-[120vh] flex items-center justify-center px-6">
            <div className="text-center max-w-3xl flex flex-col items-center">
              <span className="text-accent text-sm font-mono tracking-[0.4em] uppercase mb-6 drop-shadow-md">
                Capabilities & Process
              </span>
              <h2 className="text-6xl md:text-8xl font-serif font-light text-white mb-8 drop-shadow-2xl">
                The Workshop
              </h2>
              <div className="w-px h-24 bg-gradient-to-b from-white/50 to-transparent"></div>
            </div>
        </div>

        {/* Workshop Sections */}
        {workshopData.map((item, index) => (
          <div key={item.id} className="min-h-[150vh] flex flex-col justify-center relative overflow-hidden py-24 sm:py-0">
            
            {/* Massive Watermark Number */}
            <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 text-[30vh] md:text-[45vh] font-serif italic text-white/[0.03] pointer-events-none select-none z-0">
              0{index + 1}
            </div>

            <div className="w-full flex justify-end px-6 md:px-12 lg:px-24">
              
              <div className="workshop-text-block relative pointer-events-auto w-full md:w-[600px] flex items-center z-10 pt-16 sm:pt-0">
                
                {/* Rotated Category Text (Far Right) */}
                <div className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2 origin-center rotate-90 text-accent/80 tracking-[0.5em] text-sm font-mono uppercase whitespace-nowrap drop-shadow-lg">
                  {item.category}
                </div>

                {/* Editorial Content Block */}
                <div className="w-full lg:pr-12">
                  <h3 className="text-2xl sm:text-3xl lg:text-6xl xl:text-7xl font-serif text-white mb-6 sm:mb-8 leading-[1.1] drop-shadow-2xl">
                    {item.title}
                  </h3>
                  
                  <div className="w-16 sm:w-24 h-px bg-accent/50 mb-6 sm:mb-8 shadow-[0_0_10px_rgba(255,165,0,0.5)]"></div>
                  
                  <p className="text-gray-200 text-xs sm:text-sm lg:text-lg font-light leading-relaxed sm:leading-loose mb-8 sm:mb-12 drop-shadow-lg">
                    {item.description}
                  </p>
                  
                  {/* Vertical Tech Stack List */}
                  <div className="flex flex-col gap-3 sm:gap-4 border-l border-white/10 pl-4 sm:pl-6">
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold mb-1">Core Stack</span>
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs sm:text-sm md:text-base font-mono text-accent/90 tracking-widest uppercase drop-shadow-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        ))}
        
        {/* Bottom Padding */}
        <div className="h-[50vh]"></div>
        
      </div>
    </section>
  );
};

export default Workshop;
