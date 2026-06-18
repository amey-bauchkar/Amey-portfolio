import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="relative py-24 bg-bg bg-grid border-t border-border/50 z-10">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-16 anim-hidden animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-0.5 bg-accent"></span>
            <span className="text-accent text-sm font-bold tracking-wider uppercase">Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">Let's build something together.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="anim-hidden animate-fade-in-up delay-100">
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              I'm always open to discussing hardware projects, web development opportunities, or creative collaborations. Feel free to reach out!
            </p>
            <div className="space-y-6">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=bauchkaramey1306@gmail.com" target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xl group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-secondary mb-1">Email Me</h4>
                  <p className="text-text-primary font-medium">bauchkaramey1306@gmail.com</p>
                </div>
              </a>
              <a href="tel:+918591094018" className="group flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xl group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-secondary mb-1">Call Me</h4>
                  <p className="text-text-primary font-medium">8591094018</p>
                </div>
              </a>
              
              <a href="https://www.instagram.com/13amey_/" target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xl group-hover:scale-110 transition-transform duration-300">
                  <i className="fab fa-instagram"></i>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-secondary mb-1">Instagram</h4>
                  <p className="text-text-primary font-medium">13amey_</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/amey-bauchkar-3394453ba/" target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xl group-hover:scale-110 transition-transform duration-300">
                  <i className="fab fa-linkedin-in"></i>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text-secondary mb-1">LinkedIn</h4>
                  <p className="text-text-primary font-medium">Amey Bauchkar</p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 anim-hidden animate-fade-in-up delay-200">
            <form action="https://formspree.io/f/mykbzkpz" method="POST" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Your Name</label>
                  <input type="text" name="name" placeholder="John Doe" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Your Email</label>
                  <input type="email" name="email" placeholder="john@example.com" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Subject</label>
                <input type="text" name="subject" placeholder="Project Collaboration" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Message</label>
                <textarea name="message" rows="4" placeholder="Tell me about your project..." className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none resize-none" required></textarea>
              </div>
              <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
                <span>Send Message</span>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
