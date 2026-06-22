import React from 'react';

const Skills = () => {
  return (
    <section id="skills" className="relative py-16 md:py-24 bg-bg bg-grid z-10">
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10 md:mb-16 anim-hidden animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-0.5 bg-accent"></span>
            <span className="text-accent text-sm font-bold tracking-wider uppercase">My Expertise</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">Skills & Technologies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 anim-hidden animate-fade-in-up delay-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-xl">
                <i className="fas fa-microchip"></i>
              </div>
              <h3 className="text-xl font-bold text-text-primary">Hardware & Robotics</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">Arduino</span>
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">ESP8266 / ESP32</span>
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">Sensor Integration</span>
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">Circuit Design</span>
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">PID Control</span>
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">Hardware Prototyping</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 anim-hidden animate-fade-in-up delay-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-xl">
                <i className="fas fa-code"></i>
              </div>
              <h3 className="text-xl font-bold text-text-primary">Software & Logic</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">C / C++</span>
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">Java</span>
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">Data Structures</span>
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">Object-Oriented Prog.</span>
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">Git / GitHub</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 anim-hidden animate-fade-in-up delay-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-xl">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h3 className="text-xl font-bold text-text-primary">Web Development</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">HTML5</span>
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">CSS3</span>
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">JavaScript</span>
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">Tailwind CSS</span>
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">Responsive Design</span>
              <span className="px-4 py-2 bg-bg border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">UI / UX Basics</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
