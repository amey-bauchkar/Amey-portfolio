import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CanvasSequence from '../components/CanvasSequence';

const AboutPage = () => {
  useEffect(() => {
    // Start at top of the page smoothly when component mounts
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="cinematic-bg text-white font-inter selection:bg-white selection:text-black min-h-screen">
      
      {/* 1350vh container for precise scene alignment */}
      <div id="canvas-container" className="relative w-full h-[1350vh]">
        
        <CanvasSequence />

        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none flex flex-col">
          
          {/* Section 1: Working at laptop */}
          <section className="h-[100vh] flex flex-col justify-center px-8 md:px-24">
            <div className="w-full flex flex-col items-start text-left anim-hidden border-l border-white/20 pl-8 md:pl-12">
              <span className="text-sm font-mono tracking-[0.25em] text-white/70 uppercase mb-8 block">
                01 // Origin
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-white leading-[1.05] max-w-3xl">
                It always starts<br className="hidden md:block" /> with a screen.
              </h1>
              <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-lg font-light">
                Late nights. A desk lamp. Endless curiosity. What started as experimenting with code quickly became an obsession with understanding how things work and building things that matter.
              </p>
              <div className="mt-12 pt-6 border-t border-white/10 max-w-lg w-full flex justify-start">
                <span className="text-sm font-mono tracking-[0.2em] text-cinematic-amber uppercase">
                  Amey Bauchkar — Builder & Developer
                </span>
              </div>
            </div>
          </section>

          <div className="h-[100vh]"></div>

          {/* Section 2: Moving away from desk */}
          <section className="h-[100vh] flex flex-col justify-center px-8 md:px-24">
            <div className="w-full flex flex-col items-end text-right anim-hidden border-r border-white/20 pr-8 md:pr-12">
              <span className="text-sm font-mono tracking-[0.25em] text-white/70 uppercase mb-8 block">
                02 // Physicality
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white leading-[1.05] max-w-3xl">
                Then I stepped<br className="hidden md:block" /> beyond the screen.
              </h2>
              <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-lg font-light">
                Software taught me logic. Hardware taught me responsibility. I became fascinated by the connection between the digital and physical worlds. That curiosity led me to build <span className="text-white font-medium">Robots</span> and <span className="text-white font-medium">IoT Systems</span> that transformed lines of code into real-world actions.
              </p>
              <div className="mt-12 pt-6 border-t border-white/10 max-w-lg w-full flex justify-end">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono tracking-[0.2em] text-white/90 uppercase">Robotics & IoT Builder</span>
                  <span className="w-8 h-[1px] bg-cinematic-amber"></span>
                </div>
              </div>
            </div>
          </section>

          <div className="h-[100vh]"></div>

          {/* Section 3: Pausing between desk and bookshelf */}
          <section className="h-[100vh] flex flex-col justify-center px-8 md:px-24">
            <div className="w-full flex flex-col items-start text-left anim-hidden border-l border-white/20 pl-8 md:pl-12">
              <span className="text-sm font-mono tracking-[0.25em] text-white/70 uppercase mb-8 block">
                03 // Precision
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white leading-[1.05] max-w-3xl">
                Hardware doesn't<br className="hidden md:block" /> have an undo button.
              </h2>
              <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-lg font-light">
                Every wire matters. Every connection has consequences. When a circuit fails, there is no quick fix — you learn to diagnose problems, iterate, and engineer better solutions. Those lessons continue to shape my approach today.
              </p>
            </div>
          </section>

          <div className="h-[60vh]"></div>

          {/* Section 4: Walking toward bookshelf */}
          <section className="h-[100vh] flex flex-col justify-center px-8 md:px-24">
            <div className="w-full flex flex-col items-end text-right anim-hidden border-r border-white/20 pr-8 md:pr-12">
              <span className="text-sm font-mono tracking-[0.25em] text-white/70 uppercase mb-8 block">
                04 // Evolution
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white leading-[1.05] max-w-3xl">
                Learning became<br className="hidden md:block" /> building.
              </h2>
              <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-lg font-light">
                Over the years, each project taught me something new. Whether designing autonomous systems or full-stack web applications, every build was an opportunity to solve problems and expand my skills.
              </p>
            </div>
          </section>

          <div className="h-[60vh]"></div>

          {/* Section 5: Arriving at bookshelf */}
          <section className="h-[100vh] flex flex-col justify-center px-8 md:px-24">
            <div className="w-full flex flex-col items-start text-left anim-hidden border-l border-white/20 pl-8 md:pl-12">
              <span className="text-sm font-mono tracking-[0.25em] text-white/70 uppercase mb-8 block">
                05 // Industry
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white leading-[1.05] max-w-3xl">
                Then came the<br className="hidden md:block" /> real world.
              </h2>
              <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-lg font-light">
                Today, I contribute to real-world products. Working on production-grade projects has shown me how ideas evolve into solutions used by actual users. It's where theory meets execution and learning becomes responsibility.
              </p>
              <div className="mt-12 pt-6 border-t border-white/10 max-w-lg w-full flex justify-start">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-cinematic-amber"></span>
                  <span className="text-sm font-mono tracking-[0.2em] text-white/90 uppercase">Intern @ Foremark Technologies</span>
                </div>
              </div>
            </div>
          </section>

          <div className="h-[40vh]"></div>

          {/* Section 6: Reaching for book */}
          <section className="h-[100vh] flex flex-col justify-center px-8 md:px-24">
            <div className="w-full flex flex-col items-end text-right anim-hidden border-r border-white/20 pr-8 md:pr-12">
              <span className="text-sm font-mono tracking-[0.25em] text-white/70 uppercase mb-8 block">
                06 // Crucible
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white leading-[1.05] max-w-3xl">
                Built under<br className="hidden md:block" /> pressure.
              </h2>
              <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-lg font-light">
                Classrooms teach theory. <span className="text-white font-medium">Hackathons</span> teach execution. Collaborating to transform ambitious ideas into working prototypes under tight deadlines strengthened my ability to build quickly without compromising quality.
              </p>
              <div className="mt-12 pt-6 border-t border-white/10 max-w-lg w-full flex justify-end">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono tracking-[0.2em] text-white/90 uppercase">Multiple Hackathons</span>
                  <span className="w-8 h-[1px] bg-cinematic-amber"></span>
                </div>
              </div>
            </div>
          </section>

          <div className="h-[40vh]"></div>

          {/* Section 7: Holding and opening book */}
          <section className="h-[100vh] flex flex-col justify-center px-8 md:px-24">
            <div className="w-full flex flex-col items-start text-left anim-hidden border-l border-white/20 pl-8 md:pl-12">
              <span className="text-sm font-mono tracking-[0.25em] text-white/70 uppercase mb-8 block">
                07 // Synthesis
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-white leading-[1.05] max-w-3xl">
                Now I build<br className="hidden md:block" /> End-to-End.
              </h2>
              <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-lg font-light">
                I build across the entire stack. The line between hardware and software isn't a boundary — it's where the most exciting innovation happens. I am driven by one goal: Build technology that solves meaningful problems.
              </p>
              <div className="mt-12 pt-6 border-t border-white/10 max-w-lg w-full flex justify-start">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-cinematic-amber"></span>
                  <span className="text-sm font-mono tracking-[0.2em] text-white/90 uppercase">Full-Stack Developer</span>
                </div>
              </div>
            </div>
          </section>

          <div className="h-[50vh]"></div>

          {/* Final Section: Reading */}
          <section className="h-[100vh] flex flex-col items-center justify-center px-6 text-center pointer-events-auto">
            <div className="anim-hidden w-full max-w-5xl">
              <span className="text-sm font-mono tracking-[0.25em] text-cinematic-amber uppercase mb-8 block">
                08 // The Future
              </span>
              <h2 className="text-5xl md:text-8xl lg:text-[7rem] font-extrabold tracking-tighter mb-8 text-white leading-[0.9] uppercase">
                Still learning.<br/>
                Still building.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">Still becoming.</span>
              </h2>
              <p className="text-lg md:text-2xl text-white/50 font-light mb-16 max-w-2xl mx-auto">
                Every project adds another chapter. The story isn't finished yet — I'm just getting started.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Link to="/contact" className="group relative inline-flex items-center justify-center px-12 py-5 font-mono text-sm tracking-[0.2em] text-black uppercase bg-white border border-white hover:bg-transparent hover:text-white transition-all duration-300">
                  <span>Get in Touch</span>
                </Link>
                <Link to="/projects" className="font-mono text-sm tracking-[0.2em] text-white/50 hover:text-white uppercase transition-colors underline decoration-white/20 underline-offset-8">
                  Browse my projects
                </Link>
              </div>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
