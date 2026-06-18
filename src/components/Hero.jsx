import { Link } from 'react-router-dom';

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


        <div className="hero-name-block anim-hidden animate-fade-in-up delay-300">
          <p className="hero-name-first">Amey</p>
          <p className="hero-name-last">Bauchkar</p>
        </div>

        <div className="hero-pills anim-hidden animate-fade-in-up delay-400">
          <div className="hero-pill">⚡ Hardware Dev</div>
          <div className="hero-pill">&lt;/&gt; Web Dev</div>
        </div>

        <p className="hero-subtitle-text anim-hidden animate-fade-in-up delay-500">
          Bridging hardware innovation and modern web technologies — from circuit boards to clean code.
        </p>

        <div className="hero-cta-row anim-hidden animate-fade-in-up delay-600">
          <Link to="/projects" className="hero-cta-primary">
            View Projects <i className="fas fa-arrow-right"></i>
          </Link>
          <button onClick={onOpenCv} className="hero-cta-secondary">
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
          <a href="https://www.instagram.com/13amey_/" target="_blank" rel="noreferrer" className="hero-social-circle" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/amey-bauchkar-3394453ba/" target="_blank" rel="noreferrer" className="hero-social-circle" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      {/* Premium Editorial / Aesthetic Stats Sidebar */}
      <div className="hero-floating-stats">
        <div className="hero-stat-item-wrap animate-fade-in-up delay-800">
          <div className="hero-stat-value">1<span>st</span></div>
          <div className="hero-stat-label">Year · B.Tech</div>
        </div>

        <div className="hero-stat-item-wrap animate-fade-in-up delay-900">
          <div className="hero-stat-value">4<span>+</span></div>
          <div className="hero-stat-label">Hardware Projects</div>
        </div>

        <div className="hero-stat-item-wrap animate-fade-in-up delay-1000">
          <div className="hero-stat-value">&lt;/&gt;</div>
          <div className="hero-stat-label">Frontend Dev</div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
