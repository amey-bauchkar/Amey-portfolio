import React from 'react';

const About = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center py-20 md:py-32 bg-bg z-10 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-5 reveal-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-accent"></span>
              <span className="text-accent text-sm font-bold tracking-wider uppercase">About Me</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>
              I build<br/>what I<br/><span className="text-accent">design.</span>
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pl-12 lg:mt-12 reveal-up">
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              I am a first-year EXCS student with a deep passion for blurring the lines between hardware and software. I don't just write code — I build physical systems and bring them to life on the web.
            </p>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl">
              Whether I'm soldering components for an IoT project or crafting smooth, responsive user interfaces, my goal is to create seamless, end-to-end experiences.
            </p>
            
            <div className="mt-12">
              <a href="#contact" className="inline-flex items-center gap-2 text-white font-semibold text-lg group">
                <span className="relative">
                  Let's talk
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent transition-transform duration-300 origin-left scale-x-100 group-hover:scale-x-0"></span>
                </span>
                <i className="fas fa-arrow-right text-accent transition-transform duration-300 group-hover:translate-x-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
