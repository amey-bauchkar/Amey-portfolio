import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactCanvasSequence from './ContactCanvasSequence';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const cards = document.querySelectorAll('.contact-glass-card');
    const triggers = [];
    
    cards.forEach((card) => {
      const st = gsap.fromTo(card, 
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            end: "bottom 10%",
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.target);
    
    // Replace with actual Web3Forms Access Key
    formData.append("access_key", "b90e89ef-4876-42a1-9dd8-ab4a4f529560");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormStatus('success');
        e.target.reset();
        setTimeout(() => {
          setIsFormOpen(false);
          setFormStatus('');
        }, 3000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact-canvas-container" className="relative w-full h-[800vh] bg-[#0a0a0a]">
      {/* Sticky background sequence */}
      <ContactCanvasSequence />
      
      {/* Scrollable content overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none flex flex-col font-outfit">
        
        {/* Intro Space */}
        <div className="h-[150vh] flex items-center justify-end px-6 md:px-12 lg:px-24">
            <div className="text-right max-w-3xl pointer-events-auto contact-glass-card">
              <div className="inline-flex items-center justify-end gap-4 mb-6">
                <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase font-inter">Initiate</span>
                <span className="w-16 h-[1px] bg-accent/60"></span>
              </div>
              <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-light text-white mb-6 leading-[1.05] tracking-tighter drop-shadow-2xl">
                Let's create <br className="hidden md:block"/><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">the future.</span>
              </h2>
              <p className="text-white/60 text-lg md:text-xl font-light max-w-xl ml-auto mt-8 font-inter leading-relaxed">
                Whether it's an ambitious web application, an embedded hardware solution, or a combination of both—I'm ready to bring it to life.
              </p>
              <div className="mt-16 animate-bounce opacity-40">
                <i className="fas fa-arrow-down text-white text-xl font-light"></i>
              </div>
            </div>
        </div>

        {/* Expertise Space */}
        <div className="h-[150vh] flex items-center justify-start px-6 md:px-12 lg:px-24">
            <div className="max-w-2xl pointer-events-auto contact-glass-card">
              <div className="inline-flex items-center justify-start gap-4 mb-8">
                <span className="w-16 h-[1px] bg-accent/60"></span>
                <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase font-inter">Capabilities</span>
              </div>
              <div className="space-y-12">
                <div className="group">
                  <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4 group-hover:text-accent transition-colors duration-500">Hardware & IoT</h3>
                  <p className="text-white/70 font-inter font-light leading-relaxed text-lg">Designing embedded systems, robotics, and smart connected devices that bridge the physical and digital worlds.</p>
                </div>
                <div className="group">
                  <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4 group-hover:text-accent transition-colors duration-500">Web Development</h3>
                  <p className="text-white/70 font-inter font-light leading-relaxed text-lg">Building performant, scalable, and beautifully interactive web applications from frontend to backend.</p>
                </div>
                <div className="group">
                  <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4 group-hover:text-accent transition-colors duration-500">Creative Engineering</h3>
                  <p className="text-white/70 font-inter font-light leading-relaxed text-lg">Blending logic with aesthetics. Writing code that not only works flawlessly but feels magical to interact with.</p>
                </div>
              </div>
            </div>
        </div>

        {/* Approach / Philosophy */}
        <div className="h-[150vh] flex flex-col justify-center px-6 md:px-12 lg:px-24">
            <div className="w-full flex justify-center md:justify-end">
              <div className="max-w-2xl pointer-events-auto contact-glass-card text-right">
                <div className="inline-flex items-center justify-end gap-4 mb-8">
                  <span className="text-accent text-xs font-semibold tracking-[0.3em] uppercase font-inter">Approach</span>
                  <span className="w-16 h-[1px] bg-accent/60"></span>
                </div>
                <h3 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">Detail obsessed.<br/>Performance driven.</h3>
                <p className="text-white/70 font-inter font-light leading-relaxed text-lg ml-auto max-w-lg">
                  Every line of code and every hardware prototype is built with a focus on scale, efficiency, and exceptional user experience. I don't just build to make it work; I build to make it last.
                </p>
              </div>
            </div>
        </div>

        {/* Message */}
        <div className="h-[150vh] flex flex-col justify-center px-6 md:px-12 lg:px-24">
            <div className="w-full flex justify-center md:justify-end">
              <div className="relative pointer-events-auto group w-full md:w-[650px] flex flex-col gap-8 contact-glass-card">
                <div className="bg-black/30 p-10 md:p-14 rounded-3xl backdrop-blur-xl border border-white/5 shadow-2xl relative overflow-hidden transition-all duration-700 hover:bg-black/40 hover:border-white/10">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 opacity-50"></div>
                  <h3 className="text-3xl md:text-4xl text-white font-medium mb-6 tracking-tight">Got a project in mind?</h3>
                  <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed font-inter mb-10">
                    I am currently open to new opportunities, including freelance collaborations, internships, and full-time roles. Let's discuss how my cross-disciplinary skills can add value to your team.
                  </p>
                  <button onClick={() => setIsFormOpen(true)} className="inline-flex items-center gap-4 px-8 py-4 bg-white text-black font-semibold tracking-widest uppercase text-xs rounded-full hover:scale-[1.02] hover:bg-accent hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] group-hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] duration-300">
                    <span>Start a Conversation</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
        </div>



        {/* Final Quote */}
        <div className="h-[200vh] flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-24">
            <div className="w-full max-w-4xl mx-auto contact-glass-card">
              <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-light text-white tracking-tighter leading-[1.1] mix-blend-difference">
                Stay curious.<br/>
                Keep <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">building.</span>
              </h2>
            </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4" onClick={() => setIsFormOpen(false)}>
          <div className="w-full max-w-2xl bg-[#151515] p-6 sm:p-8 md:p-10 rounded-2xl border border-white/10 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setIsFormOpen(false)}
            >
              <i className="fas fa-times text-xl sm:text-2xl"></i>
            </button>

            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0 shadow-lg">
                <img src="/amey-photo.png" alt="Amey Bauchkar" className="w-full h-full object-cover object-center" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-1">Let's Connect</h3>
                <p className="text-white/50 text-xs sm:text-sm font-inter">Send me a message and I'll get back to you shortly.</p>
              </div>
            </div>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/60 text-sm font-inter">Your Name</label>
                    <input required type="text" name="name" placeholder="John Doe" className="bg-[#0f0f0f] border border-white/5 text-white p-4 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none font-inter" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/60 text-sm font-inter">Your Email</label>
                    <input required type="email" name="email" placeholder="john@example.com" className="bg-[#0f0f0f] border border-white/5 text-white p-4 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none font-inter" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 text-sm font-inter">Subject</label>
                  <input required type="text" name="subject" placeholder="Project Collaboration" className="bg-[#0f0f0f] border border-white/5 text-white p-4 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none font-inter" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 text-sm font-inter">Message</label>
                  <textarea required name="message" rows="5" placeholder="Tell me about your project..." className="bg-[#0f0f0f] border border-white/5 text-white p-4 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none font-inter resize-none"></textarea>
                </div>
                
                <button disabled={formStatus === 'submitting'} type="submit" className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-lg">
                  {formStatus === 'submitting' ? 'Sending...' : formStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                  {formStatus !== 'submitting' && formStatus !== 'success' && <i className="fas fa-paper-plane"></i>}
                </button>
                
                {formStatus === 'error' && (
                  <p className="text-red-500 text-center text-sm font-inter mt-2">Something went wrong. Please check your API key and try again.</p>
                )}
              </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
