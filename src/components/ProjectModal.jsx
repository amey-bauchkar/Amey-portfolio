import React, { useState, useEffect } from 'react';

const getYoutubeId = (url) => {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : url;
};

const getYoutubeEmbedUrl = (url) => {
  const id = getYoutubeId(url);
  if (!id) return '';
  return `https://www.youtube.com/embed/${id}?rel=0&playsinline=1&modestbranding=1`;
};

const getYoutubeWatchUrl = (url) => {
  const id = getYoutubeId(url);
  if (!id) return '';
  return `https://www.youtube.com/watch?v=${id}`;
};

const ProjectModal = ({ project, isOpen, onClose, onOpenCode }) => {
  const hasScreenshots = Boolean(project?.screenshots && project.screenshots.length > 0);
  const hasVideo = Boolean(project?.video);
  const hasYoutube = Boolean(project?.youtubeVideo);

  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);
  const [mediaTab, setMediaTab] = useState('screenshots');

  useEffect(() => {
    setActiveScreenshotIdx(0);
    if (project?.initialTab) {
      setMediaTab(project.initialTab);
    } else if (hasYoutube) {
      setMediaTab('youtube');
    } else if (hasVideo && !hasScreenshots) {
      setMediaTab('video');
    } else if (hasScreenshots) {
      setMediaTab('screenshots');
    } else {
      setMediaTab('image');
    }
  }, [project, hasVideo, hasScreenshots, hasYoutube]);

  const currentScreenshot = hasScreenshots ? project.screenshots[activeScreenshotIdx] : null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={onClose}></div>
      
      {project && (
        <div className={`relative z-10 w-11/12 md:w-3/4 lg:w-2/3 max-w-5xl bg-card border border-border rounded-xl shadow-2xl shadow-accent/10 overflow-hidden flex flex-col max-h-[88vh] transition-transform duration-500 ease-in-out ${isOpen ? 'scale-100' : 'scale-95'}`}>
          <div className="flex-1 overflow-y-auto">

            {/* Media Selector Header: When YouTube Video is Available */}
            {hasYoutube && (
              <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#0a0a0a] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMediaTab('youtube')}
                    className={`cursor-target inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      mediaTab === 'youtube'
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                        : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    data-cursor-label="Watch Video"
                  >
                    <i className="fab fa-youtube text-xs text-red-400 group-hover:text-white"></i>
                    <span>Explanation Video</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMediaTab(hasScreenshots ? 'screenshots' : 'image')}
                    className={`cursor-target inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      mediaTab !== 'youtube' && mediaTab !== 'video'
                        ? 'bg-accent text-white shadow-md shadow-accent/20'
                        : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    data-cursor-label="Overview"
                  >
                    <i className="fas fa-image text-[11px]"></i>
                    <span>{hasScreenshots ? `UI Screenshots (${project.screenshots.length})` : 'Project Overview'}</span>
                  </button>
                </div>
                <a
                  href={getYoutubeWatchUrl(project.youtubeVideo)}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-target inline-flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white font-mono transition-colors"
                  data-cursor-label="YouTube"
                >
                  <span>Open in YouTube</span>
                  <i className="fas fa-external-link-alt text-[9px]"></i>
                </a>
              </div>
            )}

            {/* Media Selector Header: When Local Video and Screenshots are both available (e.g. CinePlus) */}
            {!hasYoutube && hasVideo && hasScreenshots && (
              <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#0a0a0a] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMediaTab('screenshots')}
                    className={`cursor-target inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      mediaTab === 'screenshots'
                        ? 'bg-accent text-white shadow-md shadow-accent/20'
                        : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    data-cursor-label="Screenshots"
                  >
                    <i className="fas fa-images text-[11px]"></i>
                    <span>UI Screenshots ({project.screenshots.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaTab('video')}
                    className={`cursor-target inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      mediaTab === 'video'
                        ? 'bg-accent text-white shadow-md shadow-accent/20'
                        : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    data-cursor-label="Watch Video"
                  >
                    <i className="fas fa-play text-[10px]"></i>
                    <span>Live Demo Video</span>
                  </button>
                </div>
                <span className="text-[11px] text-white/40 font-mono hidden sm:inline">
                  {mediaTab === 'video' ? 'Full Video Demonstration' : 'High-Res Interface Capture'}
                </span>
              </div>
            )}

            {/* Media Stage: YouTube Mode (Mounted only when modal is active and tab is youtube) */}
            {hasYoutube && mediaTab === 'youtube' ? (
              <div className="flex flex-col bg-black">
                <div className="relative w-full aspect-video max-h-[50vh] md:max-h-[58vh] bg-black flex items-center justify-center overflow-hidden">
                  {isOpen ? (
                    <iframe
                      key={`${project.id}-yt-${isOpen}`}
                      src={getYoutubeEmbedUrl(project.youtubeVideo)}
                      title={`${project.title} Video Explanation`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                  ) : null}
                </div>
                <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#0e0e0e] border-t border-white/10 text-xs">
                  <span className="flex items-center gap-2 text-white/80">
                    <i className="fab fa-youtube text-red-500 text-sm"></i>
                    <span className="font-medium text-white/90">{project.title} — Explanation & Walkthrough</span>
                  </span>
                  <a
                    href={getYoutubeWatchUrl(project.youtubeVideo)}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-target inline-flex items-center gap-1 text-accent hover:text-white font-medium transition-colors"
                    data-cursor-label="YouTube"
                  >
                    <span>Watch directly on YouTube</span>
                    <i className="fas fa-external-link-alt text-[10px]"></i>
                  </a>
                </div>
              </div>
            ) : hasVideo && mediaTab === 'video' ? (
              /* Media Stage: Local Video Mode */
              <div className="relative w-full aspect-video max-h-[50vh] md:max-h-[58vh] bg-black flex items-center justify-center overflow-hidden">
                <video 
                  src={`/${project.video}`} 
                  controls 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-contain bg-black"
                ></video>
              </div>
            ) : hasScreenshots && mediaTab === 'screenshots' ? (
              /* Media Stage: Screenshots Mode */
              <div className="flex flex-col bg-[#070707]">
                <div className="relative w-full aspect-video max-h-[50vh] md:max-h-[58vh] flex items-center justify-center bg-black overflow-hidden group/media">
                  <img 
                    src={`/${currentScreenshot?.src || project.image}`} 
                    alt={currentScreenshot?.title || project.title} 
                    className="w-full h-full object-contain" 
                  />

                  {/* Previous / Next Arrow Controls */}
                  {project.screenshots.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveScreenshotIdx(prev => (prev === 0 ? project.screenshots.length - 1 : prev - 1))}
                        className="cursor-target absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/80 hover:bg-accent text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all shadow-xl hover:scale-105"
                        aria-label="Previous UI Screenshot"
                        data-cursor-label="Prev"
                      >
                        <i className="fas fa-chevron-left text-xs"></i>
                      </button>
                      <button
                        onClick={() => setActiveScreenshotIdx(prev => (prev === project.screenshots.length - 1 ? 0 : prev + 1))}
                        className="cursor-target absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/80 hover:bg-accent text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all shadow-xl hover:scale-105"
                        aria-label="Next UI Screenshot"
                        data-cursor-label="Next"
                      >
                        <i className="fas fa-chevron-right text-xs"></i>
                      </button>
                    </>
                  )}

                  {/* Screenshot Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3.5 sm:p-4 flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs sm:text-sm text-white/95 font-medium">
                      <span className="font-bold text-accent flex items-center gap-1.5">
                        <i className="fas fa-desktop text-xs"></i>
                        {currentScreenshot?.title}
                      </span>
                      <span className="text-[11px] text-white/70 font-mono px-2 py-0.5 rounded bg-white/10 backdrop-blur-sm">
                        {activeScreenshotIdx + 1} of {project.screenshots.length} UI Screens
                      </span>
                    </div>
                    {currentScreenshot?.caption && (
                      <p className="text-xs text-white/75 font-normal leading-relaxed line-clamp-2">
                        {currentScreenshot?.caption}
                      </p>
                    )}
                  </div>
                </div>

                {/* Screenshot Thumbnails Strip */}
                <div className="flex items-center gap-2.5 p-3 bg-black/70 border-t border-white/10 overflow-x-auto scrollbar-thin">
                  {project.screenshots.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveScreenshotIdx(idx)}
                      data-cursor-label={`Screen ${idx + 1}`}
                      className={`cursor-target flex-shrink-0 relative rounded-lg overflow-hidden border-2 transition-all duration-300 group/thumb ${
                        activeScreenshotIdx === idx 
                          ? 'border-accent shadow-[0_0_15px_rgba(255,107,43,0.5)] scale-105 ring-1 ring-accent' 
                          : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                      }`}
                    >
                      <img src={`/${s.src}`} alt={s.title} className="w-20 sm:w-24 h-12 sm:h-14 object-cover" />
                      <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-transparent transition-colors"></div>
                    </button>
                  ))}
                </div>
              </div>
            ) : hasVideo ? (
              <div className="relative w-full aspect-video max-h-[50vh] md:max-h-[58vh] bg-black flex items-center justify-center">
                <video src={`/${project.video}`} controls autoPlay loop className="w-full h-full object-contain"></video>
              </div>
            ) : (
              <img src={`/${project.image}`} alt={project.title} className="w-full h-auto max-h-[50vh] md:max-h-[60vh] object-contain bg-[#0a0a0a]" />
            )}
            
            <div className="p-8 md:p-12 relative">
              <button onClick={onClose} className="cursor-target absolute top-6 right-6 w-10 h-10 bg-bg/50 hover:bg-accent text-white rounded-full flex items-center justify-center transition-colors" aria-label="Close Project Modal" data-cursor-label="Close">
                <i className="fas fa-times text-xl"></i>
              </button>
              
              <div className="inline-flex items-center gap-2 mb-4 flex-wrap">
                <span className="w-8 h-0.5 bg-accent"></span>
                <span className="text-accent text-sm font-bold tracking-wider uppercase">
                  {project.categoryLabel || 'Project Details'}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 font-mono uppercase tracking-wider ml-2 border border-white/10">
                  {project.category === 'software' ? 'Software Platform' : 'Robotics & Hardware'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">{project.title}</h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-semibold px-3 py-1 bg-accent/10 text-accent rounded-md border border-accent/20">{tag}</span>
                ))}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 border-t border-border/50 pt-8 mt-8">
                {/* Live Demo Link or Local Video Demo Button */}
                {hasVideo ? (
                  <button
                    type="button"
                    onClick={() => setMediaTab('video')}
                    data-cursor-label="Watch Demo"
                    className="cursor-target inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-md transition-all shadow-lg shadow-accent/20 cursor-pointer"
                  >
                    <i className="fas fa-play text-xs"></i> Watch Live Demo
                  </button>
                ) : project.link && project.link !== '#' && project.link !== '#video-demo' ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-label="Live Demo"
                    className="cursor-target inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-md transition-all shadow-lg shadow-accent/20"
                  >
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                ) : project.link === '#' ? (
                  <button
                    type="button"
                    data-cursor-label="Coming Soon"
                    className="cursor-target inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent font-semibold px-6 py-3 rounded-md transition-all shadow-md cursor-default opacity-90"
                    title="Deployment in progress"
                  >
                    <i className="fas fa-play text-xs"></i> Live Demo (Coming Soon)
                  </button>
                ) : null}

                {/* YouTube Video Explanation Button */}
                {hasYoutube && (
                  <button
                    type="button"
                    onClick={() => setMediaTab('youtube')}
                    data-cursor-label="Watch Video"
                    className="cursor-target inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-md transition-all shadow-md cursor-pointer"
                  >
                    <i className="fab fa-youtube text-base"></i> Explanation Video
                  </button>
                )}

                {/* GitHub Repo Button */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-label="GitHub"
                    className="cursor-target inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-md transition-all"
                  >
                    <i className="fab fa-github text-lg"></i> GitHub Repo
                  </a>
                )}

                {/* Architecture & Code Button */}
                {project.code && (
                  <button
                    onClick={() => onOpenCode(project)}
                    data-cursor-label="View Code"
                    className="cursor-target inline-flex items-center gap-2 bg-bg border border-border hover:border-accent/50 text-white font-semibold px-6 py-3 rounded-md transition-all cursor-pointer"
                  >
                    <i className="fas fa-code"></i> Architecture & Code
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectModal;
