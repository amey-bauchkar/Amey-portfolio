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
      
      {/* 500vh container maps scroll progress (0-100%) down the page */}
      <div id="canvas-container" className="relative w-full h-[500vh]">
        
        {/* Sticky Canvas background (plays animation as user scrolls down 500vh) */}
        <CanvasSequence />

        {/* Story Beats overlaying the canvas */}
        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
          
          {/* HERO / INTRO (0-20%) -> 1st 100vh */}
          <section className="h-[100vh] flex flex-col items-center justify-center px-6 text-center">
            <div className="max-w-3xl anim-hidden">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 cinematic-gradient-text cinematic-glow">
                It always starts with a screen.
              </h1>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                Late nights. A desk lamp and a compiler. There's something unshakeable about the moment you first make something work — a circuit completes, a server responds, a pixel moves.
              </p>
            </div>
          </section>

          {/* THE SHIFT (20-40%) -> 2nd 100vh */}
          <section className="h-[100vh] flex flex-col justify-center px-10 md:px-32 text-left">
            <div className="max-w-xl anim-hidden">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white/90">
                Then you look up.
              </h2>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                Code teaches you to think — but the real world teaches you to build. The moment I closed the laptop and picked up a soldering iron, everything changed.
              </p>
            </div>
          </section>

          {/* THE DISCIPLINE (40-60%) -> 3rd 100vh */}
          <section className="h-[100vh] flex flex-col items-end justify-center px-10 md:px-32 text-right">
            <div className="max-w-xl anim-hidden">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white/90">
                Hardware doesn't have an undo button.
              </h2>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                Every wire matters. Every connection is physical, permanent, real. That discipline — measure twice, solder once — made me a sharper developer on both sides of the stack.
              </p>
            </div>
          </section>

          {/* THE SYNTHESIS (60-80%) -> 4th 100vh */}
          <section className="h-[100vh] flex flex-col justify-center px-10 md:px-32 text-left">
            <div className="max-w-2xl anim-hidden">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white/90">
                Now I build end to end.
              </h2>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light">
                From sensor data to sleek interfaces. From bare metal to the browser. The line between hardware and software isn't a boundary — it's where the best work happens.
              </p>
            </div>
          </section>

          {/* REVELATION & CTA (80-100%) -> 5th 100vh */}
          <section className="h-[100vh] flex flex-col items-center justify-center px-6 text-center pointer-events-auto">
            <div className="max-w-4xl bg-cinematic-secondary/40 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-white/5 shadow-2xl anim-hidden">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white/90">
                You've seen the story. <br/><span className="cinematic-gradient-text">Now let's write yours.</span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light mb-10 max-w-2xl mx-auto">
                Whether it's a circuit board that needs to come alive or a web experience that needs to feel effortless — I'm ready to build it with you.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/contact" className="cinematic-button px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase w-full sm:w-auto">
                  Get in Touch
                </Link>
                <Link to="/projects" className="text-white/60 hover:text-cinematic-amber transition-colors text-sm font-semibold uppercase tracking-wider underline-offset-8 decoration-white/20 hover:decoration-cinematic-amber underline">
                  Browse my projects
                </Link>
              </div>
              <p className="mt-8 text-xs text-white/30 uppercase tracking-[0.2em]">Hardware meets pixel. End to end.</p>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
