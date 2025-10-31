'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { HomeExperienceTransformed } from '../core';

interface ExperienceSectionProps {
  experience: HomeExperienceTransformed;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  // Use images from API data only
  const destinationImages = experience.images || [];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {destinationImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {destinationImages.map((destination, index) => (
              <div
                key={index}
                className={`relative h-70 w-full group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105`}
              >
                <img
                  src={destination.url}
                  alt={destination.alt}
                  className="w-full h-full object-cover"
                  onLoad={() => console.log(`Experience image loaded: ${destination.alt}`)}
                  onError={() => console.error(`Failed to load experience image: ${destination.url}`)}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
              
              </div>
            ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No experience images available from API</p>
            </div>
          )}

          {/* Right Section - Text Content */}
          <div className="space-y-6">
            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {experience.title}
            </h2>
            
            {/* Description Paragraphs */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                {experience.description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Package
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
