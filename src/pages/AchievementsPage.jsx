import React, { useEffect } from 'react';
import Achievements from '../components/Achievements';

const AchievementsPage = () => {
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <Achievements />
    </div>
  );
};

export default AchievementsPage;
