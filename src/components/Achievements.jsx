import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { achievementsData, achievementStats } from '../data/achievementsData';
import AchievementsCanvasSequence from './AchievementsCanvasSequence';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper to reliably normalize images for any achievement
const getAchievementImages = (item) => {
  if (!item) return [];
  if (Array.isArray(item.images) && item.images.length > 0) {
    return item.images.map((img, idx) => {
      if (typeof img === 'string') {
        return {
          url: img,
          title: `Photo ${idx + 1}`,
          label: `Photo ${idx + 1}`,
          caption: item.title || ''
        };
      }
      return {
        url: img.url || item.image,
        title: img.title || img.label || `Photo ${idx + 1}`,
        label: img.label || img.title || `Photo ${idx + 1}`,
        caption: img.caption || ''
      };
    });
  }
  if (item.altImage) {
    return [
      {
        url: item.image,
        title: item.proofLabel || 'Primary Photo',
        label: 'Photo 1',
        caption: item.proofLabel || ''
      },
      {
        url: item.altImage,
        title: 'Secondary Document',
        label: 'Document',
        caption: item.proofLabel || ''
      }
    ];
  }
  if (item.image) {
    return [
      {
        url: item.image,
        title: item.proofLabel || item.title,
        label: 'Recognition Proof',
        caption: item.proofLabel || ''
      }
    ];
  }
  return [];
};

const Achievements = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [cardPhotoIndexes, setCardPhotoIndexes] = useState({});
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef(null);

  const filteredAchievements = achievementsData.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'winner') return item.category === 'winner';
    if (activeFilter === 'finalist') return item.category === 'finalist';
    if (activeFilter === 'shortlisted') return item.category === 'shortlisted';
    return true;
  });

  // Smooth, high-performance card entry triggers (play once to eliminate GPU reflow churn)
  useEffect(() => {
    const cards = gsap.utils.toArray('.achievement-scroll-card');
    const triggers = [];

    cards.forEach((card) => {
      const st = gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (st.scrollTrigger) triggers.push(st.scrollTrigger);
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      triggers.forEach((t) => t && t.kill());
    };
  }, [activeFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  const handleOpenModal = (achievement, initialPhotoIdx = 0) => {
    const idx = achievementsData.findIndex((a) => a.id === achievement.id);
    setModalIndex(idx >= 0 ? idx : 0);
    setSelectedAchievement(achievement);
    setActivePhotoIndex(initialPhotoIdx);
    setIsZoomed(false);
  };

  const handleCloseModal = () => {
    setSelectedAchievement(null);
    setActivePhotoIndex(0);
    setIsZoomed(false);
  };

  const handleNextModal = () => {
    const nextIdx = (modalIndex + 1) % achievementsData.length;
    setModalIndex(nextIdx);
    setSelectedAchievement(achievementsData[nextIdx]);
    setActivePhotoIndex(0);
    setIsZoomed(false);
  };

  const handlePrevModal = () => {
    const prevIdx = (modalIndex - 1 + achievementsData.length) % achievementsData.length;
    setModalIndex(prevIdx);
    setSelectedAchievement(achievementsData[prevIdx]);
    setActivePhotoIndex(0);
    setIsZoomed(false);
  };

  const modalPhotos = getAchievementImages(selectedAchievement);
  const currentModalPhoto =
    modalPhotos[activePhotoIndex] ||
    modalPhotos[0] ||
    (selectedAchievement
      ? { url: selectedAchievement.image, title: selectedAchievement.title, label: 'Proof' }
      : null);

  const handleNextPhoto = (e) => {
    if (e) e.stopPropagation();
    setIsZoomed(false);
    if (modalPhotos.length <= 1) {
      handleNextModal();
      return;
    }
    setActivePhotoIndex((prev) => (prev + 1) % modalPhotos.length);
  };

  const handlePrevPhoto = (e) => {
    if (e) e.stopPropagation();
    setIsZoomed(false);
    if (modalPhotos.length <= 1) {
      handlePrevModal();
      return;
    }
    setActivePhotoIndex((prev) => (prev - 1 + modalPhotos.length) % modalPhotos.length);
  };

  // Keyboard controls for modal viewer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedAchievement) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowRight') {
        if (modalPhotos.length > 1 && activePhotoIndex < modalPhotos.length - 1) {
          setIsZoomed(false);
          setActivePhotoIndex((prev) => prev + 1);
        } else {
          handleNextModal();
        }
      }
      if (e.key === 'ArrowLeft') {
        if (modalPhotos.length > 1 && activePhotoIndex > 0) {
          setIsZoomed(false);
          setActivePhotoIndex((prev) => prev - 1);
        } else {
          handlePrevModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAchievement, modalIndex, activePhotoIndex, modalPhotos.length]);

  // Scaled height so scroll scrubbing is responsive and natural
  const containerHeightClass =
    activeFilter === 'all'
      ? 'h-[1050vh]'
      : activeFilter === 'winner'
      ? 'h-[550vh]'
      : activeFilter === 'finalist'
      ? 'h-[650vh]'
      : 'h-[380vh]';

  return (
    <section
      id="achievements-canvas-container"
      ref={containerRef}
      className={`relative w-full ${containerHeightClass} bg-[#070709] transition-[height] duration-500`}
    >
      {/* Sticky Hardware-Accelerated 60FPS Canvas Sequence */}
      <AchievementsCanvasSequence />

      {/* Scrollable Overlay Layer */}
      <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none flex flex-col">
        {/* Intro Section: Overview, Quick Stats & Filter Pills */}
        <div className="min-h-[100vh] flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 py-16">
          <div className="max-w-4xl pointer-events-auto">
            {/* Stage Indicator Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-0.5 bg-accent"></span>
              <span className="text-accent text-xs sm:text-sm font-bold tracking-[0.25em] uppercase font-mono">
                01 // Arena Honors &amp; Hackathons
              </span>
            </div>

            {/* Section Heading */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase leading-[1.08] mb-5 drop-shadow-2xl"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Achievements <br />
              <span className="text-accent">&amp; Activities</span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light mb-8 drop-shadow-md">
              Proven engineering ability under pressure. Competing, architecting, and winning across flagship AI hackathons, robotics challenges, and national design sprints.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-3xl">
              <div className="bg-[#0e0e13]/90 border border-white/10 rounded-xl p-4 hover:border-accent/50 transition-colors shadow-lg group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/50 font-mono">
                    Total Honors
                  </span>
                  <i className="fas fa-award text-accent text-sm group-hover:scale-110 transition-transform"></i>
                </div>
                <div
                  className="text-2xl sm:text-3xl font-extrabold text-white"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  {achievementStats.totalCount}
                </div>
                <div className="text-[10px] text-white/40 mt-0.5">Hackathons &amp; Events</div>
              </div>

              <div className="bg-[#0e0e13]/90 border border-white/10 rounded-xl p-4 hover:border-accent/50 transition-colors shadow-lg group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/50 font-mono">
                    1st Place Wins
                  </span>
                  <i className="fas fa-trophy text-accent text-sm group-hover:scale-110 transition-transform"></i>
                </div>
                <div
                  className="text-2xl sm:text-3xl font-extrabold text-white"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  {achievementStats.wins}
                </div>
                <div className="text-[10px] text-white/40 mt-0.5">TCS, Innovista &amp; CSI</div>
              </div>

              <div className="bg-[#0e0e13]/90 border border-white/10 rounded-xl p-4 hover:border-accent/50 transition-colors shadow-lg group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/50 font-mono">
                    Finalists
                  </span>
                  <i className="fas fa-medal text-accent text-sm group-hover:scale-110 transition-transform"></i>
                </div>
                <div
                  className="text-2xl sm:text-3xl font-extrabold text-white"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  {achievementStats.nationalFinals}
                </div>
                <div className="text-[10px] text-white/40 mt-0.5">COEP MindSpark &amp; More</div>
              </div>

              <div className="bg-[#0e0e13]/90 border border-white/10 rounded-xl p-4 hover:border-accent/50 transition-colors shadow-lg group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/50 font-mono">
                    SIH 2026
                  </span>
                  <i className="fas fa-flag-checkered text-accent text-sm group-hover:scale-110 transition-transform"></i>
                </div>
                <div
                  className="text-2xl sm:text-3xl font-extrabold text-white"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  Top 45
                </div>
                <div className="text-[10px] text-white/40 mt-0.5">Internal Hackathon Shortlist</div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors border cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                    : 'bg-[#0e0e13]/80 text-white/70 border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                All Recognitions ({achievementsData.length})
              </button>

              <button
                onClick={() => handleFilterChange('winner')}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors border cursor-pointer flex items-center gap-2 ${
                  activeFilter === 'winner'
                    ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                    : 'bg-[#0e0e13]/80 text-white/70 border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                <i className="fas fa-trophy text-xs"></i>
                1st Place Wins ({achievementStats.wins})
              </button>

              <button
                onClick={() => handleFilterChange('finalist')}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors border cursor-pointer flex items-center gap-2 ${
                  activeFilter === 'finalist'
                    ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                    : 'bg-[#0e0e13]/80 text-white/70 border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                <i className="fas fa-medal text-xs"></i>
                Finalists ({achievementStats.nationalFinals})
              </button>

              <button
                onClick={() => handleFilterChange('shortlisted')}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors border cursor-pointer flex items-center gap-2 ${
                  activeFilter === 'shortlisted'
                    ? 'bg-accent text-white border-accent shadow-md shadow-accent/20'
                    : 'bg-[#0e0e13]/80 text-white/70 border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                <i className="fas fa-flag-checkered text-xs"></i>
                SIH Qualified (1)
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-8 flex items-center gap-3 text-white/40 font-mono text-xs tracking-widest uppercase">
              <span className="w-6 h-px bg-white/20"></span>
              <span>Scroll to traverse honors</span>
              <div className="animate-bounce">
                <i className="fas fa-chevron-down text-accent text-xs"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline of Achievement Cards (Alternating Left/Right) */}
        {filteredAchievements.map((item, index) => {
          const itemImages = getAchievementImages(item);
          const currentCardPhotoIdx = cardPhotoIndexes[item.id] || 0;
          const currentCardPhoto = itemImages[currentCardPhotoIdx] || itemImages[0];
          const hasMultiplePhotos = itemImages.length > 1;
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.id}
              className={`min-h-[95vh] flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-12 ${
                isEven ? 'items-start' : 'items-end'
              }`}
            >
              <div
                className="achievement-scroll-card relative pointer-events-auto group w-full sm:w-[85vw] md:w-[60vw] lg:w-[620px] max-w-full flex flex-col gap-4 sm:gap-5 bg-[#0e0e13]/92 p-6 sm:p-7 md:p-8 rounded-2xl border border-white/10 hover:border-accent/40 transition-colors shadow-2xl will-change-transform"
              >
                {/* Card Header (Number, Badge & Date) */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-end gap-3 sm:gap-4">
                    <span className="text-4xl sm:text-5xl font-light text-white/35 font-serif leading-none tracking-tighter group-hover:text-accent transition-colors duration-300">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-accent font-semibold flex items-center gap-1.5">
                        <i className={`fas ${item.icon || 'fa-trophy'} text-[10px]`}></i>
                        {item.badge}
                      </span>
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                        {item.date} · {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-white/15 grow max-w-[120px] relative overflow-hidden hidden sm:block">
                    <div className="absolute top-0 left-0 h-full w-full bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                  </div>
                </div>

                {/* Organization Subtitle */}
                <div className="flex items-center gap-2 text-xs text-white/60 font-medium">
                  <i className="fas fa-university text-accent/80 text-xs"></i>
                  <span className="truncate">{item.organization}</span>
                </div>

                {/* Achievement Title */}
                <h2
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300 leading-snug"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  {item.title}
                </h2>

                {/* Photo / Certificate Preview Container (Optimized: zero heavy blur) */}
                <div
                  className="relative h-56 sm:h-64 w-full bg-[#070709] rounded-xl cursor-pointer flex items-center justify-center p-3 border border-white/10 overflow-hidden group/thumb"
                  onClick={() => handleOpenModal(item, currentCardPhotoIdx)}
                >
                  {/* Multi-Photo Count Badge */}
                  {hasMultiplePhotos && (
                    <div
                      className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 text-white text-[11px] font-mono border border-white/15 shadow-md group-hover:border-accent/50 transition-colors"
                      title={`${itemImages.length} photos available`}
                    >
                      <i className="fas fa-images text-accent text-xs"></i>
                      <span>{itemImages.length} Photos</span>
                    </div>
                  )}

                  {/* Sharp Uncropped Photo */}
                  <img
                    src={currentCardPhoto.url}
                    alt={item.title}
                    loading="lazy"
                    className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain rounded-md transition-transform duration-300 group-hover/thumb:scale-[1.02] shadow-md"
                  />

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 bg-black/45">
                    <span className="inline-flex items-center gap-2 bg-black/90 text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20 shadow-xl">
                      <i className="fas fa-search-plus text-accent"></i>
                      {hasMultiplePhotos ? `View All ${itemImages.length} Photos` : 'Inspect Full Proof'}
                    </span>
                  </div>

                  {/* Quick Thumbnail Dots Switcher */}
                  {hasMultiplePhotos && (
                    <div
                      className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 border border-white/15"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {itemImages.map((img, pIdx) => {
                        const isCur = currentCardPhotoIdx === pIdx;
                        return (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setCardPhotoIndexes((prev) => ({ ...prev, [item.id]: pIdx }))}
                            className={`transition-all rounded-full cursor-pointer ${
                              isCur ? 'w-4 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                            }`}
                            title={img.label || `Photo ${pIdx + 1}`}
                            aria-label={`Preview ${img.label || `photo ${pIdx + 1}`}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] sm:text-xs font-mono font-medium px-3 py-1 bg-white/5 text-white/80 rounded-md border border-white/10 group-hover:border-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Inspect Button */}
                <div className="pt-1">
                  <button
                    onClick={() => handleOpenModal(item, currentCardPhotoIdx)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-accent text-white border border-white/10 hover:border-accent transition-colors shadow-sm cursor-pointer group/btn"
                  >
                    <i className="fas fa-certificate text-accent group-hover/btn:text-white transition-colors"></i>
                    <span>
                      {hasMultiplePhotos
                        ? `Inspect All Proofs & Photos (${itemImages.length})`
                        : 'Inspect Verification Proof'}
                    </span>
                    <i className="fas fa-arrow-right text-[10px] ml-1 opacity-70 group-hover/btn:translate-x-1 transition-transform"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Grand Climax Section: Amey raising trophy with golden confetti on stage */}
        <div className="min-h-[100vh] flex flex-col justify-center items-center px-6 sm:px-12 text-center py-16">
          <div className="max-w-2xl pointer-events-auto bg-[#0e0e13]/92 border border-white/15 p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent text-2xl mb-6 shadow-md shadow-accent/20">
              <i className="fas fa-trophy"></i>
            </div>

            <span className="text-accent text-xs sm:text-sm font-bold tracking-[0.25em] uppercase font-mono mb-3 block">
              Championship Mentality
            </span>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase mb-5 leading-tight"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              From First Principles <br />
              <span className="text-accent">To The Podium</span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-lg">
              Whether it's an intensive 36-hour hackathon sprint, custom embedded firmware, or full-stack intelligent architecture, I engineer to deliver real impact.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/projects"
                className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold tracking-wide uppercase transition-colors shadow-lg shadow-accent/30 inline-flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>View Engineered Projects</span>
                <i className="fas fa-arrow-right text-xs"></i>
              </Link>

              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-semibold tracking-wide uppercase transition-colors border border-white/15 inline-flex items-center gap-2"
              >
                <i className="fas fa-envelope text-accent text-xs"></i>
                <span>Get In Touch</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Certificate Lightbox Modal (Uncropped, High-Res Proof Viewer) */}
      {selectedAchievement && currentModalPhoto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 animate-fade-in"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-5xl bg-[#0f0f13] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#141419] z-20">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-accent/15 text-accent border border-accent/30 shadow-sm flex items-center gap-1.5">
                  <i className={`fas ${selectedAchievement.icon || 'fa-award'} text-[11px]`}></i>
                  {selectedAchievement.badge}
                </span>

                <span className="text-xs font-mono text-white/50 hidden sm:inline">
                  [{modalIndex + 1} of {achievementsData.length}]
                </span>

                {/* Multiple Photos Switcher Pills */}
                {modalPhotos.length > 1 && (
                  <div className="inline-flex items-center rounded-lg bg-black/50 border border-white/10 p-1 text-xs">
                    {modalPhotos.map((photo, pIdx) => {
                      const isActive = activePhotoIndex === pIdx;
                      return (
                        <button
                          key={pIdx}
                          onClick={() => {
                            setActivePhotoIndex(pIdx);
                            setIsZoomed(false);
                          }}
                          className={`px-3 py-1 rounded-md transition-colors cursor-pointer font-medium flex items-center gap-1.5 ${
                            isActive
                              ? 'bg-accent text-white shadow-sm font-semibold'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <i className={`fas ${pIdx === 0 ? 'fa-image' : 'fa-certificate'} text-[10px]`}></i>
                          <span>{photo.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom / Full Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                    isZoomed
                      ? 'bg-accent text-white border-accent'
                      : 'text-white/70 hover:text-white hover:bg-white/10 border-white/15'
                  }`}
                  title={isZoomed ? 'Reset zoom (Fit to window)' : 'Zoom in 100% to inspect full details'}
                >
                  <i className={`fas ${isZoomed ? 'fa-search-minus' : 'fa-search-plus'} text-[11px]`}></i>
                  <span className="hidden sm:inline">{isZoomed ? 'Fit Screen' : 'Zoom In'}</span>
                </button>

                <a
                  href={currentModalPhoto.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 border border-white/15 transition-colors inline-flex items-center gap-1.5"
                  title="Open original high-res image in new tab"
                >
                  <i className="fas fa-external-link-alt text-[10px]"></i>
                  <span className="hidden sm:inline">Original High-Res</span>
                </a>

                <button
                  onClick={handleCloseModal}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
                  aria-label="Close modal"
                >
                  <i className="fas fa-times text-sm"></i>
                </button>
              </div>
            </div>

            {/* Modal Image Viewport */}
            <div
              className={`relative flex-1 bg-[#070709] min-h-[320px] max-h-[66vh] sm:max-h-[68vh] flex items-center justify-center p-2 sm:p-4 select-none ${
                isZoomed ? 'overflow-auto cursor-grab' : 'overflow-hidden'
              }`}
            >
              <div
                className={`relative z-10 w-full h-full flex items-center justify-center ${
                  isZoomed ? 'min-w-[1200px] min-h-[750px] p-4' : ''
                }`}
              >
                <img
                  key={currentModalPhoto.url}
                  src={currentModalPhoto.url}
                  alt={currentModalPhoto.title}
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={`rounded-lg shadow-2xl border border-white/10 transition-transform duration-300 ${
                    isZoomed
                      ? 'max-w-none w-full object-contain cursor-zoom-out'
                      : 'max-w-full max-h-full w-auto h-auto object-contain cursor-zoom-in'
                  }`}
                  style={!isZoomed ? { maxHeight: 'calc(66vh - 24px)' } : {}}
                />
              </div>

              {/* Navigation Arrows */}
              {modalPhotos.length > 1 ? (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/80 hover:bg-accent text-white flex items-center justify-center transition-all border border-white/15 cursor-pointer shadow-xl hover:scale-110"
                    title="Previous photo (←)"
                    aria-label="Previous photo"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>

                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/80 hover:bg-accent text-white flex items-center justify-center transition-all border border-white/15 cursor-pointer shadow-xl hover:scale-110"
                    title="Next photo (→)"
                    aria-label="Next photo"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handlePrevModal}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/80 hover:bg-accent text-white flex items-center justify-center transition-all border border-white/15 cursor-pointer shadow-xl hover:scale-110"
                    title="Previous recognition (←)"
                    aria-label="Previous recognition"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>

                  <button
                    onClick={handleNextModal}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/80 hover:bg-accent text-white flex items-center justify-center transition-all border border-white/15 cursor-pointer shadow-xl hover:scale-110"
                    title="Next recognition (→)"
                    aria-label="Next recognition"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery Row for Multi-Photo Achievements */}
            {modalPhotos.length > 1 && (
              <div className="flex items-center justify-center gap-3 px-4 py-2 bg-[#0a0a0d] border-t border-white/10">
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 mr-1 hidden sm:inline-flex items-center gap-1.5">
                  <i className="fas fa-images text-accent text-xs"></i> Select Proof:
                </span>
                {modalPhotos.map((photo, pIdx) => {
                  const isSelected = activePhotoIndex === pIdx;
                  return (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => {
                        setActivePhotoIndex(pIdx);
                        setIsZoomed(false);
                      }}
                      className={`group/thumb flex items-center gap-2.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-accent bg-accent/20 text-white shadow-sm ring-1 ring-accent'
                          : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.label}
                        className={`w-9 h-7 rounded object-cover border transition-all ${
                          isSelected ? 'border-accent' : 'border-white/15 opacity-70 group-hover/thumb:opacity-100'
                        }`}
                      />
                      <div className="text-left">
                        <span className="block text-xs font-semibold leading-tight">{photo.label}</span>
                        <span className="block text-[10px] text-white/40 font-mono leading-tight">
                          {pIdx === 0 ? 'Primary' : `Photo ${pIdx + 1}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Modal Footer Details */}
            <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-[#141419] border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                <h3
                  className="text-lg sm:text-xl font-bold text-white"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  {selectedAchievement.title}
                </h3>
                <span className="text-xs font-mono text-accent">{selectedAchievement.date}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3 font-light">
                {currentModalPhoto.caption || selectedAchievement.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedAchievement.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono font-medium px-2.5 py-0.5 bg-accent/10 text-accent rounded-md border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Navigation Bar between Recognitions */}
              <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-xs font-mono">
                <button
                  onClick={handlePrevModal}
                  className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-accent text-white/70 hover:text-white border border-white/15 hover:border-accent transition-colors cursor-pointer flex items-center gap-2"
                  title="Previous recognition"
                >
                  <i className="fas fa-chevron-left text-[10px]"></i>
                  <span className="hidden sm:inline">Previous Recognition</span>
                  <span className="sm:hidden">Prev</span>
                </button>

                <div className="text-center text-white/40">
                  <span className="hidden md:inline">
                    {modalPhotos.length > 1
                      ? 'Use ← / → arrows to flip photos · Esc to close'
                      : 'Use ← / → arrows to browse recognitions · Esc to close'}
                  </span>
                  <span className="md:hidden">
                    {modalIndex + 1} / {achievementsData.length}
                  </span>
                </div>

                <button
                  onClick={handleNextModal}
                  className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-accent text-white/70 hover:text-white border border-white/15 hover:border-accent transition-colors cursor-pointer flex items-center gap-2"
                  title="Next recognition"
                >
                  <span className="hidden sm:inline">Next Recognition</span>
                  <span className="sm:hidden">Next</span>
                  <i className="fas fa-chevron-right text-[10px]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;
