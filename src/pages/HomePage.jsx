import React from 'react';
import Hero from '../components/Hero';

const HomePage = ({ onOpenCv }) => {
  return (
    <div>
      <Hero onOpenCv={onOpenCv} />
    </div>
  );
};

export default HomePage;
