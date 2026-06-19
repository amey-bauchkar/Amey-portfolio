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
    <div className="cinematic-bg text-white font-inter selection:bg-cinematic-amber selection:text-black min-h-screen">
      
      {/* 800vh container maps scroll progress (0-100%) down the page */}
      <div id="canvas-container" className="relative w-full h-[800vh]">
        
        {/* Sticky Canvas background (plays animation as user scrolls down) */}
        <CanvasSequence />

        {/* Story Beats overlaying the canvas */}
        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none flex flex-col">
          
          {/* Section 1 */}
          <section className="h-[100vh] flex flex-col items-center justify-center px-6 text-center">
            <div className="max-w-3xl anim-hidden">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 cinematic-gradient-text cinematic-glow">
                It always starts with a screen.
              </h1>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                Late nights. A desk lamp. Endless curiosity. What started as experimenting with code quickly became an obsession with understanding how things work and building things that matter. Every project, bug, and breakthrough pushed me deeper into the world of technology.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="h-[100vh] flex flex-col justify-center px-10 md:px-32 text-left">
            <div className="max-w-xl anim-hidden">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white/90">
                Then I stepped beyond the screen.
              </h2>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                Software taught me logic. Hardware taught me responsibility. As an Electronics and Computer Science student, I became fascinated by the connection between the digital and physical worlds. That curiosity led me to build robots, IoT systems, and embedded projects that transformed lines of code into real-world actions. For the first time, technology was not just something I could see on a screen — it was something I could touch, test, and improve.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="h-[100vh] flex flex-col items-end justify-center px-10 md:px-32 text-right">
            <div className="max-w-xl anim-hidden">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white/90">
                Hardware doesn't have an undo button.
              </h2>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                Every wire matters. Every connection has consequences. Building robots and working with sensors, microcontrollers, and electronic systems taught me precision, patience, and systems thinking. When a robot doesn't move or a circuit doesn't work, there is no quick fix button — you learn to diagnose problems, iterate, and engineer better solutions. Those lessons continue to shape the way I approach software development today.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="h-[100vh] flex flex-col justify-center px-10 md:px-32 text-left">
            <div className="max-w-2xl anim-hidden">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white/90">
                Learning became building.
              </h2>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                Curiosity eventually turned into creation. Over the years, I've built robots, IoT solutions, monitoring systems, and full-stack web applications — each project teaching me something new. Whether it was designing autonomous systems, experimenting with sensors, or creating digital products, every build became an opportunity to solve problems and expand my skills. The more I built, the more I realized that technology is at its best when it creates real impact.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="h-[100vh] flex flex-col items-end justify-center px-10 md:px-32 text-right">
            <div className="max-w-xl anim-hidden">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white/90">
                Then came the real world.
              </h2>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                Today, I'm a Web Development Intern at <span className="text-white font-medium">Foremark Technologies</span>, where I contribute to real-world products and gain hands-on industry experience. Working on production-grade projects has shown me how ideas evolve into solutions used by actual users. It's where theory meets execution and learning becomes responsibility.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="h-[100vh] flex flex-col justify-center px-10 md:px-32 text-left">
            <div className="max-w-2xl anim-hidden">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white/90">
                Built under pressure.
              </h2>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                <span className="text-white font-medium">Hackathons</span> taught me something classrooms never could. How to collaborate, adapt, and deliver under tight deadlines. Through multiple hackathons, I've worked with teams to transform ambitious ideas into working prototypes — combining hardware, software, and design to solve real-world challenges. Those experiences strengthened my creativity, problem-solving mindset, and ability to build quickly without compromising quality.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="h-[100vh] flex flex-col items-end justify-center px-10 md:px-32 text-right">
            <div className="max-w-xl anim-hidden">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white/90">
                Now I build <span className="cinematic-gradient-text">end-to-end</span>.
              </h2>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                Today, I enjoy building across the entire stack — from <span className="text-white font-medium">robots</span>, sensors, and embedded systems to modern web applications, APIs, databases, and user experiences. My journey has taught me that the line between hardware and software isn't a boundary — it's where the most exciting innovation happens. Whether I'm creating a robot, an IoT solution, or a web platform, I'm driven by the same goal: Build technology that solves meaningful problems.
              </p>
            </div>
          </section>

          {/* Final Section */}
          <section className="h-[100vh] flex flex-col items-center justify-center px-6 text-center pointer-events-auto">
            <div className="max-w-4xl bg-cinematic-secondary/40 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-white/5 shadow-2xl anim-hidden">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white/90">
                Still learning. <br/><span className="cinematic-gradient-text">Still building. Still becoming.</span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light mb-10 max-w-2xl mx-auto">
                Every project adds another chapter. The story is not finished yet — I'm just getting started.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/contact" className="cinematic-button px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase w-full sm:w-auto">
                  Get in Touch
                </Link>
                <Link to="/projects" className="text-white/60 hover:text-cinematic-amber transition-colors text-sm font-semibold uppercase tracking-wider underline-offset-8 decoration-white/20 hover:decoration-cinematic-amber underline">
                  Browse my projects
                </Link>
              </div>
              <p className="mt-8 text-xs text-white/30 uppercase tracking-[0.2em]">Amey Bauchkar • <span className="cinematic-gradient-text font-semibold">End to end</span></p>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
