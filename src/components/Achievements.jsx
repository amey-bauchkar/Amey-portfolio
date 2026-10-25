import React, { useState, useEffect } from 'react';
import { achievementsData, achievementStats } from '../data/achievementsData';

const Achievements = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);

  const filteredAchievements = achievementsData.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'winner') return item.category === 'winner';
    if (activeFilter === 'finalist') return item.category === 'finalist';
    if (activeFilter === 'shortlisted') return item.category === 'shortlisted';
    return true;
  });

  const handleOpenModal = (achievement) => {
    const idx = achievementsData.findIndex(a => a.id === achievement.id);
    setModalIndex(idx >= 0 ? idx : 0);
    setSelectedAchievement(achievement);
  };

  const handleCloseModal = () => {
    setSelectedAchievement(null);
  };

  const handleNextModal = () => {
    const nextIdx = (modalIndex + 1) % achievementsData.length;
    setModalIndex(nextIdx);
    setSelectedAchievement(achievementsData[nextIdx]);
  };

  const handlePrevModal = () => {
    const prevIdx = (modalIndex - 1 + achievementsData.length) % achievementsData.length;
    setModalIndex(prevIdx);
    setSelectedAchievement(achievementsData[prevIdx]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedAchievement) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowRight') handleNextModal();
      if (e.key === 'ArrowLeft') handlePrevModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAchievement, modalIndex]);

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'gold':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'blue':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'emerald':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-white/10 text-white/90 border-white/20';
    }
  };

  return (
    <div className="relative py-28 md:py-36 bg-[#0a0a0c] text-white min-h-screen overflow-hidden">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[400px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-accent"></span>
            <span className="text-accent text-xs sm:text-sm font-mono font-bold tracking-[0.2em] uppercase">
              // RECOGNITION &amp; MILESTONES
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 uppercase" style={{ fontFamily: '"Outfit", sans-serif' }}>
            Achievements <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-amber-400 to-amber-200">
              &amp; Activities
            </span>
          </h1>

          <p className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed">
            Proven engineering ability under pressure. A record of competing, innovating, and winning in hackathons, design sprints, and national technological challenges.
          </p>
        </div>

        {/* Milestone Quick Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          <div className="bg-[#121215]/80 backdrop-blur-md border border-white/10 rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-accent/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-text-secondary">Total Honors</span>
              <i className="fas fa-award text-accent/80 text-lg"></i>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{achievementStats.totalCount}</div>
            <div className="text-xs text-text-secondary mt-1">Hackathons &amp; Events</div>
          </div>

          <div className="bg-[#121215]/80 backdrop-blur-md border border-white/10 rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-amber-500/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">1st Place Wins</span>
              <i className="fas fa-trophy text-amber-400 text-lg"></i>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{achievementStats.wins}</div>
            <div className="text-xs text-text-secondary mt-1">TCS, Innovista &amp; CSI</div>
          </div>

          <div className="bg-[#121215]/80 backdrop-blur-md border border-white/10 rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-cyan-400/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Finalist Placements</span>
              <i className="fas fa-medal text-cyan-400 text-lg"></i>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{achievementStats.nationalFinals}</div>
            <div className="text-xs text-text-secondary mt-1">COEP MindSpark &amp; More</div>
          </div>

          <div className="bg-[#121215]/80 backdrop-blur-md border border-white/10 rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-emerald-400/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Smart India Hackathon</span>
              <i className="fas fa-flag-checkered text-emerald-400 text-lg"></i>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Top 45</div>
            <div className="text-xs text-text-secondary mt-1">SIH 2026 Internal Shortlist</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 pb-4 border-b border-white/10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-accent text-white shadow-lg shadow-accent/25'
                : 'bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            All Recognitions ({achievementsData.length})
          </button>

          <button
            onClick={() => setActiveFilter('winner')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-2 ${
              activeFilter === 'winner'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25'
                : 'bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            <i className="fas fa-trophy text-xs"></i>
            1st Place Wins (3)
          </button>

          <button
            onClick={() => setActiveFilter('finalist')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-2 ${
              activeFilter === 'finalist'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25'
                : 'bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            <i className="fas fa-medal text-xs"></i>
            Finalists (4)
          </button>

          <button
            onClick={() => setActiveFilter('shortlisted')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer inline-flex items-center gap-2 ${
              activeFilter === 'shortlisted'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                : 'bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            <i className="fas fa-flag-checkered text-xs"></i>
            SIH Qualified (1)
          </button>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredAchievements.map((item, index) => {
            const isWinner = item.category === 'winner';
            const isSIH = item.category === 'shortlisted';

            return (
              <div
                key={item.id}
                className={`group relative bg-[#131317]/90 backdrop-blur-md rounded-2xl border transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl hover:-translate-y-1.5 ${
                  isWinner 
                    ? 'border-amber-500/20 hover:border-amber-400/60 hover:shadow-amber-500/10' 
                    : isSIH 
                      ? 'border-emerald-500/20 hover:border-emerald-400/60 hover:shadow-emerald-500/10'
                      : 'border-white/10 hover:border-accent/50 hover:shadow-accent/10'
                }`}
              >
                {/* Visual Certificate / Media Container */}
                <div 
                  className="relative aspect-[16/10] w-full overflow-hidden bg-black/60 cursor-pointer"
                  onClick={() => handleOpenModal(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131317] via-black/20 to-transparent"></div>

                  {/* Top Badge Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md shadow-md ${getBadgeStyle(item.badgeType)}`}>
                      <i className={`fas ${item.icon} text-[11px]`}></i>
                      {item.badge}
                    </span>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-white/80 border border-white/10">
                      {item.date}
                    </span>
                  </div>

                  {/* Click to expand hover hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 bg-black/80 text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20 shadow-lg">
                      <i className="fas fa-search-plus text-accent"></i> Inspect Certificate
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Organization / Location */}
                    <div className="flex items-center gap-2 text-xs text-text-secondary font-mono mb-2">
                      <i className="fas fa-map-marker-alt text-accent text-[11px]"></i>
                      <span className="truncate">{item.organization}</span>
                    </div>

                    {/* Achievement Title */}
                    <h2 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300 leading-snug mb-3">
                      {item.title}
                    </h2>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom section: Tags & CTA */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 text-text-secondary border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleOpenModal(item)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-accent hover:text-white text-text-secondary transition-all duration-300 border border-white/10 hover:border-accent group-hover:bg-white/10 cursor-pointer"
                    >
                      <i className="fas fa-certificate text-accent group-hover:text-white transition-colors"></i>
                      <span>View Proof &amp; Details</span>
                      <i className="fas fa-arrow-right text-[10px] ml-1 opacity-70 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Certificate Lightbox Modal */}
      {selectedAchievement && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-xl animate-fade-in"
          onClick={handleCloseModal}
        >
          <div 
            className="relative w-full max-w-5xl bg-[#121217] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#16161c]">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${getBadgeStyle(selectedAchievement.badgeType)}`}>
                  {selectedAchievement.badge}
                </span>
                <span className="text-xs font-mono text-white/50 hidden sm:inline">
                  [{modalIndex + 1} of {achievementsData.length}]
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedAchievement.image}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors inline-flex items-center gap-1.5"
                  title="Open original image in new tab"
                >
                  <i className="fas fa-external-link-alt text-[10px]"></i>
                  <span className="hidden sm:inline">Full Image</span>
                </a>

                <button 
                  onClick={handleCloseModal}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <i className="fas fa-times text-sm"></i>
                </button>
              </div>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative flex-1 bg-black/90 flex items-center justify-center overflow-hidden min-h-[300px] max-h-[62vh] p-4 sm:p-6">
              <img 
                src={selectedAchievement.image} 
                alt={selectedAchievement.title} 
                className="max-w-full max-h-[58vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />

              {/* Prev / Next Navigation Arrows */}
              <button 
                onClick={handlePrevModal}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-accent text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/20 cursor-pointer shadow-lg hover:scale-110"
                aria-label="Previous certificate"
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              <button 
                onClick={handleNextModal}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-accent text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/20 cursor-pointer shadow-lg hover:scale-110"
                aria-label="Next certificate"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>

            {/* Modal Footer Details */}
            <div className="p-5 sm:p-6 bg-[#16161c] border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {selectedAchievement.title}
                </h3>
                <span className="text-xs font-mono text-accent">
                  {selectedAchievement.date}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-3">
                {selectedAchievement.description}
              </p>
              <div className="flex items-center justify-between text-xs text-white/50 font-mono pt-2 border-t border-white/5">
                <span>{selectedAchievement.organization}</span>
                <span className="hidden sm:inline">Use arrow keys (← / →) to navigate</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Achievements;
