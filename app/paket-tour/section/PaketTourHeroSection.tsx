'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PackageHeroTransformed } from '../core';

interface PaketTourHeroSectionProps {
  hero: PackageHeroTransformed;
}

const PaketTourHeroSection: React.FC<PaketTourHeroSectionProps> = ({ hero }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Use background images from API data only
  const backgroundImages = hero.backgroundImages || [];

  useEffect(() => {
    if (backgroundImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [backgroundImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundImages.length > 0 ? backgroundImages.map((image, index) => {
          const isActive = index === currentSlide;
          
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{
                animation: 'kenBurns 15s linear infinite',
                animationDelay: `${index * 5}s`
              }}
            >
              {image.url.startsWith('http') ? (
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              ) : (
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              )}
              <div className="absolute inset-0 bg-black/40" />
            </div>
          );
        }) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight font-bold">
            {hero.title}
          </h1>
          
          {/* Description Paragraph */}
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed font-light">
            {hero.description}
          </p>
        </div>
      </div>

      {/* Navigation Dots */}
      {backgroundImages.length > 0 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PaketTourHeroSection;
