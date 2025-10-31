'use client';

import React from 'react';
import { Heart, Star } from 'lucide-react';
import { HomeTestimonialsTransformed } from '../core';

interface TestimonialsSectionProps {
  testimonials: HomeTestimonialsTransformed;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Text Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <h2 className="text-3xl md:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {testimonials.title}
            </h2>
            
            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
              {testimonials.description}
            </p>

            {/* Brand Section */}
            <div className="flex items-center space-x-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img 
                  src={testimonials.logo.url} 
                  alt={testimonials.logo.alt} 
                  className="w-20 h-20 object-contain"
                />
                
              </div>

              {/* Brand Text */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {testimonials.logoName}
                </h3>
                <p className="text-gray-600 font-medium">
                  {testimonials.logoText}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={testimonials.image.url}
                alt={testimonials.image.alt}
                className="w-full h-96 lg:h-[500px] object-cover"
                onLoad={() => console.log('Testimonials image loaded successfully')}
                onError={() => console.error('Failed to load testimonials image')}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                <Heart className="w-6 h-6 text-orange-500" />
              </div>
              
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Rating 4.9/5</div>
                    <div className="text-xs text-gray-600">Berdasarkan 10K+ review</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
