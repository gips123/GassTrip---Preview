'use client';

import React from 'react';
import Image from 'next/image';
import { AboutHeroTransformed, AboutLogoTransformed } from '../core/models/about-page.model';

interface AboutHeroSectionProps {
  hero: AboutHeroTransformed;
  logo: AboutLogoTransformed;
  background: {
    url: string;
    alt: string;
  };
}

const AboutHeroSection: React.FC<AboutHeroSectionProps> = ({ hero, logo, background }) => {
  // Use background image from hero or fallback to background prop
  const backgroundImage = hero.backgroundImage?.url || background.url;
  const backgroundAlt = hero.backgroundImage?.alt || background.alt;

  return (
    <section 
      className="relative h-[70vh] overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          
          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight font-bold">
            {hero.title}
          </h1>
          
          {/* Description Paragraph */}
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed font-light">
            {hero.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
