import React from 'react';
import Hero from '../components/Hero';

const HomePage = ({ onOpenCv }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero onOpenCv={onOpenCv} />
    </div>
  );
};

export default HomePage;
