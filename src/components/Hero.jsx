import { Link } from 'react-router-dom';
import TechText from './TechText';

const Hero = ({ onOpenCv }) => {
  return (
    <section id="home" className="hero-section">
      <video 
        className="hero-bg" 
        src="/convert_the_above_video_into_c.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        aria-hidden="true"
      ></video>
      <div className="hero-overlay" aria-hidden="true"></div>

      <div className="hero-content">
        <Link 
          to="/achievements" 
          className="anim-hidden animate-fade-in-up delay-200 inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono hover:bg-amber-500/20 hover:border-amber-400 transition-all duration-300 w-fit backdrop-blur-md group shadow-lg shadow-amber-500/10 cursor-pointer"
        >
          <i className="fas fa-trophy text-[11px] text-amber-400"></i>
          <span>3x Hackathon Winner &amp; SIH Qualified</span>
          <i className="fas fa-chevron-right text-[9px] opacity-70 group-hover:translate-x-0.5 transition-transform"></i>
        </Link>

        <h1 className="hero-name-block anim-hidden animate-fade-in-up delay-300 flex flex-col gap-0 select-none w-full max-w-xl !mb-3" aria-label="Amey Bauchkar">
          <span className="sr-only">Amey Bauchkar</span>
          <div className="h-[52px] sm:h-[68px] md:h-[80px] lg:h-[92px] w-full max-w-[500px] -ml-[14px]">
            <TechText
              text="AMEY"
              fontFamily="'Outfit', sans-serif"
              fontWeight={800}
              fontSize={90}
              letterSpacing={-0.02}
              align="left"
              color="#ffffff"
              accentColor="#FF6B2B"
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              intro="none"
              clickKick
              draggable
              bounce={0.4}
              sweep
              speed={0.8}
            />
          </div>
          <div className="h-[52px] sm:h-[68px] md:h-[80px] lg:h-[92px] w-full max-w-[500px] -ml-[14px] -mt-1 sm:mt-0">
            <TechText
              text="BAUCHKAR"
              fontFamily="'Outfit', sans-serif"
              fontWeight={800}
              fontSize={90}
              letterSpacing={-0.02}
              align="left"
              color="#FF6B2B"
              accentColor="#ffffff"
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              intro="none"
              clickKick
              draggable
              bounce={0.4}
              sweep
              speed={0.8}
            />
          </div>
        </h1>
        <div className="hero-pills anim-hidden animate-fade-in-up delay-400">
          <div className="hero-pill">⚡ Hardware Dev</div>
          <div className="hero-pill">&lt;/&gt; Full Stack Dev</div>
          <div className="hero-pill">🤖 AI/ML Enthusiast</div>
        </div>

        <p className="hero-subtitle-text anim-hidden animate-fade-in-up delay-500">
          Bridging hardware innovation, full-stack systems, and AI/ML — from circuit boards to intelligent code.
        </p>

        <div className="hero-cta-row anim-hidden animate-fade-in-up delay-600">
          <Link to="/projects" data-cursor-label="Explore" className="hero-cta-primary">
            View Projects <i className="fas fa-arrow-right"></i>
          </Link>
          <button onClick={onOpenCv} data-cursor-label="Resume" className="hero-cta-secondary">
            <i className="fas fa-expand"></i> View CV
          </button>
        </div>

        <div className="hero-social-row anim-hidden animate-fade-in-up delay-700">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=bauchkaramey1306@gmail.com" target="_blank" rel="noreferrer" className="hero-social-circle" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
          <a href="tel:+918591094018" className="hero-social-circle" aria-label="Phone">
            <i className="fas fa-phone"></i>
          </a>
          <a href="https://github.com/amey-bauchkar" target="_blank" rel="noreferrer" className="hero-social-circle" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/amey-bauchkar-3394453ba/" target="_blank" rel="noreferrer" className="hero-social-circle" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.instagram.com/13amey_/" target="_blank" rel="noreferrer" className="hero-social-circle" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* Premium Editorial / Aesthetic Stats Sidebar */}
      <div className="hero-floating-stats">
        <div className="hero-stat-item-wrap animate-fade-in-up delay-800">
          <div className="hero-stat-value">2<span>nd</span></div>
          <div className="hero-stat-label">Year · B.Tech</div>
        </div>

        <div className="hero-stat-item-wrap animate-fade-in-up delay-900">
          <div className="hero-stat-value">5<span>+</span></div>
          <div className="hero-stat-label">Software Projects</div>
        </div>

        <div className="hero-stat-item-wrap animate-fade-in-up delay-1000">
          <div className="hero-stat-value">5<span>+</span></div>
          <div className="hero-stat-label">Hardware Projects</div>
        </div>

        <div className="hero-stat-item-wrap animate-fade-in-up delay-1100">
          <div className="hero-stat-value">&lt;/&gt;</div>
          <div className="hero-stat-label">Full Stack &amp; AI/ML</div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
