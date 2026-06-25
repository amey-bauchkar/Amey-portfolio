import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import CodeViewerModal from './components/CodeViewerModal';
import CvModal from './components/CvModal';
import Loader from './components/Loader';
import PreloadContainer from './components/PreloadContainer';
import RotateDeviceOverlay from './components/RotateDeviceOverlay';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef(null);
  const location = useLocation();
  
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // State for Modals
  const [activeProject, setActiveProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  // Initialize smooth scrolling and GSAP scroll animations
  useGSAP(() => {
    // Initialize Lenis
    const lenis = new Lenis();
    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    function update(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      delete window.lenis;
      gsap.ticker.remove(update);
    };
  }, []);

  useGSAP(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    
    // Give DOM time to render new route components
    setTimeout(() => {
      const animElements = gsap.utils.toArray('.anim-hidden');
      
      animElements.forEach((elem) => {
        gsap.fromTo(elem,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
      ScrollTrigger.refresh();
      
      // Handle hash scrolling if present
      if (location.hash) {
        const id = location.hash.substring(1);
        if (window.lenis) {
          window.lenis.scrollTo(`#${id}`);
        } else {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }
    }, 100);

  }, { scope: appRef, dependencies: [location.pathname, location.hash] });

  // Modal Handlers
  const handleOpenProject = (project) => {
    setActiveProject(project);
    setIsProjectModalOpen(true);
  };

  return (
    <>
      <RotateDeviceOverlay />
      {isInitialLoading && <Loader onComplete={() => setIsInitialLoading(false)} />}
      <PreloadContainer />
      <div ref={appRef} className="font-sans text-text-primary bg-bg min-h-screen selection:bg-accent selection:text-white overflow-x-clip">
        <Navbar onOpenCv={() => setIsCvModalOpen(true)} />
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage onOpenCv={() => setIsCvModalOpen(true)} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage onOpenProject={handleOpenProject} />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      
      <Footer />

      {/* Modals */}
      <ProjectModal 
        project={activeProject} 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
        onOpenCode={() => setIsCodeModalOpen(true)} 
      />
      <CodeViewerModal 
        project={activeProject} 
        isOpen={isCodeModalOpen} 
        onClose={() => setIsCodeModalOpen(false)} 
      />
      <CvModal 
        isOpen={isCvModalOpen} 
        onClose={() => setIsCvModalOpen(false)} 
      />
    </div>
    </>
  );
}

export default App;
