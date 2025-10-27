import React from 'react';
import AboutHeroSection from '@/app/about/section/AboutHeroSection';
import CombinedSection from '@/app/about/section/CombinedSection';
import VisionMissionSection from '@/app/about/section/VisionMissionSection';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AboutHeroSection />
      
      {/* Combined Logo and Features Section */}
      <CombinedSection />
      
      {/* Vision & Mission Section */}
      <VisionMissionSection />
    </div>
  );
};

export default About;
