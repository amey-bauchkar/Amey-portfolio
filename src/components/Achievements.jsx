import React, { useState, useEffect, useRef } from 'react';
import { achievementsData, achievementStats } from '../data/achievementsData';

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
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    
    const playVideo = () => {
      video.play().catch(() => {});
    };

    playVideo();
    window.addEventListener('click', playVideo, { once: true });
    window.addEventListener('touchstart', playVideo, { once: true });
    window.addEventListener('scroll', playVideo, { once: true });

    return () => {
      window.removeEventListener('click', playVideo);
      window.removeEventListener('touchstart', playVideo);
      window.removeEventListener('scroll', playVideo);
    };
  }, []);

  const filteredAchievements = achievementsData.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'winner') return item.category === 'winner';
    if (activeFilter === 'finalist') return item.category === 'finalist';
    if (activeFilter === 'shortlisted') return item.category === 'shortlisted';
    return true;
  });

  const handleOpenModal = (achievement, initialPhotoIdx = 0) => {
    const idx = achievementsData.findIndex(a => a.id === achievement.id);
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

  // Switch photo within current modal achievement
  const modalPhotos = getAchievementImages(selectedAchievement);
  const currentModalPhoto = modalPhotos[activePhotoIndex] || modalPhotos[0] || (selectedAchievement ? { url: selectedAchievement.image, title: selectedAchievement.title, label: 'Proof' } : null);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedAchievement) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowRight') {
        if (modalPhotos.length > 1 && activePhotoIndex < modalPhotos.length - 1) {
          setIsZoomed(false);
          setActivePhotoIndex(prev => prev + 1);
        } else {
          handleNextModal();
        }
      }
      if (e.key === 'ArrowLeft') {
        if (modalPhotos.length > 1 && activePhotoIndex > 0) {
          setIsZoomed(false);
          setActivePhotoIndex(prev => prev - 1);
        } else {
          handlePrevModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAchievement, modalIndex, activePhotoIndex, modalPhotos.length]);

  return (
    <section id="achievements" className="relative py-20 md:py-28 z-10 text-text-primary">
      {/* Fixed Fullscreen Background Video (stays centered & visible during scroll) */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover opacity-65 md:opacity-55 filter contrast-115 brightness-105 transition-opacity duration-700"
          src="/achievements-bg.mp4"
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          aria-hidden="true"
        >
          <source src="/achievements-bg.mp4" type="video/mp4" />
          <source src="/convert_the_above_video_into_c.mp4" type="video/mp4" />
        </video>
        {/* Subtle Dark Vignette & Mesh Grid for optimal text contrast */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/85 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-bg/75 via-transparent to-bg/75 pointer-events-none"></div>
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none"></div>
      </div>

      {/* Background Ambience Orbs (matching Skills and Projects) */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header (matching Skills & Projects typography) */}
        <div className="mb-12 md:mb-16 anim-hidden animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-0.5 bg-accent"></span>
            <span className="text-accent text-sm font-bold tracking-wider uppercase font-inter">
              Recognition &amp; Honors
            </span>
          </div>

          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight uppercase" 
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            Achievements <span className="text-accent">&amp; Activities</span>
          </h1>

          <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mt-4 font-normal font-sans">
            Proven engineering ability under pressure. A record of competing, innovating, and winning in hackathons, design sprints, and national engineering challenges.
          </p>
        </div>

        {/* Milestone Quick Stats Bar (matching Skills cards styling) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          
          <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-accent/50 transition-all duration-300 shadow-lg group hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary font-inter">Total Honors</span>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-lg group-hover:scale-110 transition-transform">
                <i className="fas fa-award"></i>
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
              {achievementStats.totalCount}
            </div>
            <div className="text-xs text-text-secondary mt-1 font-medium">Hackathons &amp; Events</div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-accent/50 transition-all duration-300 shadow-lg group hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary font-inter">1st Place Wins</span>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-lg group-hover:scale-110 transition-transform">
                <i className="fas fa-trophy"></i>
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
              {achievementStats.wins}
            </div>
            <div className="text-xs text-text-secondary mt-1 font-medium">TCS, Innovista &amp; CSI</div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-accent/50 transition-all duration-300 shadow-lg group hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary font-inter">Finalist Placements</span>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-lg group-hover:scale-110 transition-transform">
                <i className="fas fa-medal"></i>
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
              {achievementStats.nationalFinals}
            </div>
            <div className="text-xs text-text-secondary mt-1 font-medium">COEP MindSpark &amp; More</div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-accent/50 transition-all duration-300 shadow-lg group hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary font-inter">Smart India Hackathon</span>
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent text-lg group-hover:scale-110 transition-transform">
                <i className="fas fa-flag-checkered"></i>
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
              Top 45
            </div>
            <div className="text-xs text-text-secondary mt-1 font-medium">SIH 2026 Internal Shortlist</div>
          </div>

        </div>

        {/* Filter Pills (identical to Projects.jsx category pills) */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-12 pb-6 border-b border-border/80">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-accent text-white border-accent shadow-lg shadow-accent/25'
                : 'bg-card text-text-secondary border-border hover:border-accent/40 hover:text-white backdrop-blur-md'
            }`}
          >
            All Recognitions ({achievementsData.length})
          </button>

          <button
            onClick={() => setActiveFilter('winner')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 border cursor-pointer flex items-center gap-2 ${
              activeFilter === 'winner'
                ? 'bg-accent text-white border-accent shadow-lg shadow-accent/25'
                : 'bg-card text-text-secondary border-border hover:border-accent/40 hover:text-white backdrop-blur-md'
            }`}
          >
            <i className="fas fa-trophy text-xs"></i>
            1st Place Wins ({achievementStats.wins})
          </button>

          <button
            onClick={() => setActiveFilter('finalist')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 border cursor-pointer flex items-center gap-2 ${
              activeFilter === 'finalist'
                ? 'bg-accent text-white border-accent shadow-lg shadow-accent/25'
                : 'bg-card text-text-secondary border-border hover:border-accent/40 hover:text-white backdrop-blur-md'
            }`}
          >
            <i className="fas fa-medal text-xs"></i>
            Finalists ({achievementStats.nationalFinals})
          </button>

          <button
            onClick={() => setActiveFilter('shortlisted')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 border cursor-pointer flex items-center gap-2 ${
              activeFilter === 'shortlisted'
                ? 'bg-accent text-white border-accent shadow-lg shadow-accent/25'
                : 'bg-card text-text-secondary border-border hover:border-accent/40 hover:text-white backdrop-blur-md'
            }`}
          >
            <i className="fas fa-flag-checkered text-xs"></i>
            SIH Qualified (1)
          </button>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredAchievements.map((item, index) => {
            const itemImages = getAchievementImages(item);
            const currentCardPhotoIdx = cardPhotoIndexes[item.id] || 0;
            const currentCardPhoto = itemImages[currentCardPhotoIdx] || itemImages[0];
            const hasMultiplePhotos = itemImages.length > 1;

            return (
              <div
                key={item.id}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-500 shadow-xl flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between gap-4 p-5 sm:p-6 pb-4">
                  <div className="flex items-end gap-3">
                    <span className="text-3xl sm:text-4xl font-light text-text-secondary/40 font-serif leading-none tracking-tighter group-hover:text-accent transition-colors duration-500">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-accent font-semibold">
                        {item.badge}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-text-secondary/70 uppercase tracking-widest font-mono">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-border grow max-w-[100px] relative overflow-hidden hidden sm:block">
                    <div className="absolute top-0 left-0 h-full w-full bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-[0.8s] ease-in-out"></div>
                  </div>
                </div>

                {/* Photo / Media Container */}
                <div 
                  className="relative h-60 sm:h-64 w-full bg-[#111113] cursor-pointer flex items-center justify-center p-3 border-y border-border/80 overflow-hidden group/thumb"
                  onClick={() => handleOpenModal(item, currentCardPhotoIdx)}
                >
                  {/* Multiple photos indicator badge */}
                  {hasMultiplePhotos && (
                    <div 
                      className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-medium border border-white/10 shadow-lg group-hover:border-accent/50 transition-colors"
                      title={`${itemImages.length} photos available`}
                    >
                      <i className="fas fa-images text-accent text-xs"></i>
                      <span>{itemImages.length} Photos</span>
                    </div>
                  )}

                  {/* Ambient backdrop glow in image colors */}
                  <img
                    src={currentCardPhoto.url}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-125 pointer-events-none transition-all duration-500"
                  />

                  {/* Sharp, uncropped foreground photo / certificate */}
                  <img
                    src={currentCardPhoto.url}
                    alt={item.title}
                    className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain rounded-md transition-transform duration-500 group-hover/thumb:scale-[1.03] shadow-[0_6px_20px_rgba(0,0,0,0.6)]"
                  />

                  {/* Click to expand hover hint */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 bg-card/90 text-text-primary text-xs font-semibold px-4 py-2 rounded-full border border-border shadow-xl">
                      <i className="fas fa-search-plus text-accent"></i> 
                      {hasMultiplePhotos ? `View All ${itemImages.length} Photos` : 'Inspect Full Proof'}
                    </span>
                  </div>

                  {/* Dot navigation if multiple photos */}
                  {hasMultiplePhotos && (
                    <div 
                      className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {itemImages.map((img, pIdx) => {
                        const isCur = currentCardPhotoIdx === pIdx;
                        return (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setCardPhotoIndexes(prev => ({ ...prev, [item.id]: pIdx }))}
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

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Organization / Location */}
                    <div className="flex items-center gap-2 text-xs text-text-secondary font-medium mb-2.5">
                      <i className="fas fa-map-marker-alt text-accent text-xs"></i>
                      <span className="truncate">{item.organization}</span>
                    </div>

                    {/* Achievement Title */}
                    <h2 className="text-xl sm:text-2xl font-bold text-text-primary group-hover:text-accent transition-colors duration-300 leading-snug mb-3">
                      {item.title}
                    </h2>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                      {item.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="text-[11px] font-semibold px-3 py-1 bg-white/5 text-white/80 rounded-md border border-white/10 shadow-sm group-hover:border-white/20 transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom CTA Button */}
                    <button
                      onClick={() => handleOpenModal(item, currentCardPhotoIdx)}
                      className="w-full py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 bg-bg hover:bg-accent text-text-primary hover:text-white border border-border hover:border-accent transition-all duration-300 shadow-sm cursor-pointer group/btn"
                    >
                      <i className="fas fa-certificate text-accent group-hover/btn:text-white transition-colors"></i>
                      <span>{hasMultiplePhotos ? `View Photos & Details (${itemImages.length})` : 'View Proof & Details'}</span>
                      <i className="fas fa-arrow-right text-[10px] ml-1 opacity-70 group-hover/btn:translate-x-1 transition-transform"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Certificate Lightbox Modal */}
      {selectedAchievement && currentModalPhoto && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-bg/90 backdrop-blur-md animate-fade-in"
          onClick={handleCloseModal}
        >
          <div 
            className="relative w-full max-w-5xl bg-card border border-border rounded-xl shadow-2xl shadow-accent/10 overflow-hidden flex flex-col max-h-[96vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-border/80 bg-card z-20">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase font-inter bg-accent/10 text-accent border border-accent/30 shadow-sm">
                  {selectedAchievement.badge}
                </span>

                <span className="text-xs font-mono text-text-secondary hidden sm:inline">
                  [{modalIndex + 1} of {achievementsData.length}]
                </span>

                {/* Multiple Photos Pill Switcher */}
                {modalPhotos.length > 1 && (
                  <div className="inline-flex items-center rounded-lg bg-bg border border-border p-1 text-xs">
                    {modalPhotos.map((photo, pIdx) => {
                      const isActive = activePhotoIndex === pIdx;
                      return (
                        <button
                          key={pIdx}
                          onClick={() => {
                            setActivePhotoIndex(pIdx);
                            setIsZoomed(false);
                          }}
                          className={`px-3 py-1 rounded-md transition-all cursor-pointer font-medium flex items-center gap-1.5 ${
                            isActive 
                              ? 'bg-accent text-white shadow-sm font-semibold' 
                              : 'text-text-secondary hover:text-white hover:bg-white/5'
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
                      : 'text-text-secondary hover:text-white hover:bg-white/10 border-border'
                  }`}
                  title={isZoomed ? "Reset zoom (Fit to window)" : "Zoom in 100% to read full details"}
                >
                  <i className={`fas ${isZoomed ? 'fa-search-minus' : 'fa-search-plus'} text-[11px]`}></i>
                  <span className="hidden sm:inline">{isZoomed ? 'Fit Screen' : 'Zoom In'}</span>
                </button>

                <a
                  href={currentModalPhoto.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-secondary hover:text-white hover:bg-white/10 border border-border transition-colors inline-flex items-center gap-1.5"
                  title="Open original high-res image in new tab"
                >
                  <i className="fas fa-external-link-alt text-[10px]"></i>
                  <span className="hidden sm:inline">Original High-Res</span>
                </a>

                <button 
                  onClick={handleCloseModal}
                  className="w-8 h-8 rounded-full bg-bg/80 hover:bg-accent text-white flex items-center justify-center transition-colors cursor-pointer border border-border"
                  aria-label="Close modal"
                >
                  <i className="fas fa-times text-sm"></i>
                </button>
              </div>
            </div>

            {/* Modal Image Viewport (Clean, Uncropped & Fully Visible) */}
            <div 
              className={`relative flex-1 bg-[#070709] min-h-[320px] max-h-[66vh] sm:max-h-[68vh] flex items-center justify-center p-2 sm:p-4 select-none ${
                isZoomed ? 'overflow-auto cursor-grab' : 'overflow-hidden'
              }`}
            >
              {/* Background ambient glow matching current image */}
              {!isZoomed && (
                <img 
                  key={`glow-${currentModalPhoto.url}`}
                  src={currentModalPhoto.url} 
                  alt="" 
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-20 pointer-events-none scale-125"
                />
              )}

              {/* Main high-res active photo (100% uncropped object-contain) */}
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
                  className={`rounded-lg shadow-2xl border border-border/60 transition-transform duration-300 ${
                    isZoomed 
                      ? 'max-w-none w-full object-contain cursor-zoom-out' 
                      : 'max-w-full max-h-full w-auto h-auto object-contain cursor-zoom-in'
                  }`}
                  style={!isZoomed ? { maxHeight: 'calc(66vh - 24px)' } : {}}
                />
              </div>

              {/* Left / Right Navigation Controls */}
              {modalPhotos.length > 1 ? (
                <>
                  <button 
                    onClick={handlePrevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-card/90 hover:bg-accent text-white flex items-center justify-center transition-all backdrop-blur-sm border border-border cursor-pointer shadow-xl hover:scale-110"
                    title="Previous photo (←)"
                    aria-label="Previous photo"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>

                  <button 
                    onClick={handleNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-card/90 hover:bg-accent text-white flex items-center justify-center transition-all backdrop-blur-sm border border-border cursor-pointer shadow-xl hover:scale-110"
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-card/90 hover:bg-accent text-white flex items-center justify-center transition-all backdrop-blur-sm border border-border cursor-pointer shadow-xl hover:scale-110"
                    title="Previous recognition (←)"
                    aria-label="Previous recognition"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>

                  <button 
                    onClick={handleNextModal}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-card/90 hover:bg-accent text-white flex items-center justify-center transition-all backdrop-blur-sm border border-border cursor-pointer shadow-xl hover:scale-110"
                    title="Next recognition (→)"
                    aria-label="Next recognition"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </>
              )}
            </div>

            {/* Interactive Thumbnail Gallery Row for Multi-Photo Achievements */}
            {modalPhotos.length > 1 && (
              <div className="flex items-center justify-center gap-3 px-4 py-2 bg-[#0e0e11] border-t border-border/80">
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-secondary/70 mr-1 hidden sm:inline-flex items-center gap-1.5">
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
                          ? 'border-accent bg-accent/15 text-white shadow-md shadow-accent/10 ring-1 ring-accent' 
                          : 'border-border/80 bg-card/70 text-text-secondary hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <img 
                        src={photo.url} 
                        alt={photo.label} 
                        className={`w-9 h-7 rounded object-cover border transition-all ${
                          isSelected ? 'border-accent' : 'border-white/10 opacity-70 group-hover/thumb:opacity-100'
                        }`}
                      />
                      <div className="text-left">
                        <span className="block text-xs font-semibold leading-tight">{photo.label}</span>
                        <span className="block text-[10px] text-text-secondary/80 font-mono leading-tight">{pIdx === 0 ? 'Primary' : `Photo ${pIdx + 1}`}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Modal Footer Details */}
            <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-card border-t border-border/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-text-primary" style={{ fontFamily: '"Outfit", sans-serif' }}>
                  {selectedAchievement.title}
                </h3>
                <span className="text-xs font-mono text-accent">
                  {selectedAchievement.date}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-3">
                {currentModalPhoto.caption || selectedAchievement.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedAchievement.tags.map(tag => (
                  <span key={tag} className="text-[11px] font-semibold px-2.5 py-0.5 bg-accent/10 text-accent rounded-md border border-accent/20">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Navigation Bar between Recognitions */}
              <div className="flex items-center justify-between pt-2.5 border-t border-border/60 text-xs font-mono">
                <button
                  onClick={handlePrevModal}
                  className="px-3 py-1.5 rounded-lg bg-bg hover:bg-accent text-text-secondary hover:text-white border border-border hover:border-accent transition-all cursor-pointer flex items-center gap-2"
                  title="Previous recognition"
                >
                  <i className="fas fa-chevron-left text-[10px]"></i>
                  <span className="hidden sm:inline">Previous Recognition</span>
                  <span className="sm:hidden">Prev</span>
                </button>

                <div className="text-center text-text-secondary/70">
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
                  className="px-3 py-1.5 rounded-lg bg-bg hover:bg-accent text-text-secondary hover:text-white border border-border hover:border-accent transition-all cursor-pointer flex items-center gap-2"
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
