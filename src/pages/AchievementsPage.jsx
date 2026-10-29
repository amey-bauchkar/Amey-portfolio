import React, { useEffect } from 'react';
import Achievements from '../components/Achievements';

const AchievementsPage = () => {
  useEffect(() => {
    // Reset scroll smoothly to top on page mount
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#070709] text-text-primary font-sans selection:bg-accent selection:text-white">
      <Achievements />
    </div>
  );
};

export default AchievementsPage;
