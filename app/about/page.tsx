'use client';

import React, { useEffect } from 'react';
import AboutHeroSection from '@/app/about/section/AboutHeroSection';
import CombinedSection from '@/app/about/section/CombinedSection';
import VisionMissionSection from '@/app/about/section/VisionMissionSection';
import { useAboutPageStore } from './core';

const About: React.FC = () => {
  const { aboutPage, loading, error, fetchAboutPage, clearError } = useAboutPageStore();

  useEffect(() => {
    fetchAboutPage();
  }, [fetchAboutPage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading about page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center max-w-2xl mx-auto p-8">
          <div className="text-red-600 text-2xl mb-4">🚨 API Data Required</div>
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
            <p className="text-red-800 font-semibold mb-2">Error Details:</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
          <p className="text-gray-600 mb-4">
            This page requires data from Strapi API. No dummy data is available.
          </p>
          <button 
            onClick={() => {
              clearError();
              fetchAboutPage();
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry API Call
          </button>
        </div>
      </div>
    );
  }

  if (!aboutPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-xl">No content available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AboutHeroSection hero={aboutPage.hero} logo={aboutPage.logo} background={aboutPage.background} />
      
      {/* Combined Logo and Features Section */}
      <CombinedSection featured={aboutPage.featured} logo={aboutPage.logo} />
      
      {/* Vision & Mission Section */}
      <VisionMissionSection visionMission={aboutPage.visionMission} />
    </div>
  );
};

export default About;
