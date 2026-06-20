import React from 'react';
import Projects from '../components/Projects';

const ProjectsPage = ({ onOpenProject }) => {
  return (
    <div className="min-h-screen">
      <Projects onOpenProject={onOpenProject} />
    </div>
  );
};

export default ProjectsPage;
