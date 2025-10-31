'use client';

import React, { useState } from 'react';
import { Star, MapPin, Clock, Users, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface PackageDetailHeroProps {
  packageId: string;
}

const PackageDetailHero: React.FC<PackageDetailHeroProps> = ({ packageId }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data - in real app, fetch from API
  const packageData = {
    id: packageId,
    title: "Paket Petualangan Bali",
    subtitle: "3 Hari 2 Malam",
    location: "Bali, Indonesia",
    rating: 4.8,
    reviews: 124,
    duration: "3 Hari 2 Malam",
    groupSize: "2-8 Orang",
    price: "Rp6.188.000",
    originalPrice: "Rp7.500.000",
    discount: 17,
    images: [
      "/bali.jpg",
      "/bromo.jpg", 
      "/pantai.jpg",
      "/bali.jpg",
      "/bromo.jpg"
    ],
    highlights: [
      "Kunjungi Pura Tanah Lot",
      "Jelajahi Teras Sawah Ubud", 
      "Matahari Terbenam di Pantai Jimbaran",
      "Kelas Memasak Tradisional Bali"
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % packageData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + packageData.images.length) % packageData.images.length);
  };

  return (
    <section className="relative">
      {/* Image Gallery */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src={packageData.images[currentImageIndex]}
          alt={packageData.title}
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg z-10"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg z-10"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
        
        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {packageData.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
          >
            <Heart 
              className={`w-6 h-6 transition-colors duration-300 ${
                isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
              }`} 
            />
          </button>
          
          <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg">
            <Share2 className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 pb-30">
        <div className="max-w-7xl mx-auto">
          <div className="text-white">
            {/* Location */}
            <div className="flex items-center text-white/90 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              {packageData.location}
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {packageData.title}
            </h1>
            {/* Subtitle */}
            <div className="bg-white items-center rounded-full px-6 py-3 mb-4 shadow-lg inline-block">
              <h2 className="text-lg md:text-xl font-semibold text-blue-600">
                {packageData.subtitle}
              </h2>
            </div>
            
            
            {/* Rating & Reviews */}
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(packageData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                    }`}
                  />
                ))}
              </div>
              <span className="text-white/90 text-lg">
                {packageData.rating} ({packageData.reviews} reviews)
              </span>
            </div>
            
            {/* Package Info */}
            <div className="flex items-center space-x-6 text-white/90">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {packageData.duration}
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                {packageData.groupSize}
              </div>
            </div>
            
            {/* Highlights */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Sorotan Paket:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {packageData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center text-white/90">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageDetailHero;
