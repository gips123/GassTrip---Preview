'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { HomeFeaturedTransformed } from '../core';

interface PopularSectionProps {
  featured: HomeFeaturedTransformed[];
}

const PopularSection: React.FC<PopularSectionProps> = ({ featured }) => {
  const router = useRouter();

  const handleDestinationClick = (id: number) => {
    router.push(`/booking/${id}`);
  };

  // Dummy data for popular destinations
  const destinations = [
    {
      id: 1,
      name: 'Raja Ampat',
      location: 'West Papua',
      image: '/pantai.jpg',
      alt: 'Raja Ampat aerial view with islands and turquoise water'
    },
    {
      id: 2,
      name: 'Bromo',
      location: 'East Java',
      image: '/bromo.jpg',
      alt: 'Mount Bromo volcano with smoke'
    },
    {
      id: 3,
      name: 'Bali',
      location: 'Bali',
      image: '/bali.jpg',
      alt: 'Bali cultural landscape and temples'
    },
    {
      id: 4,
      name: 'Lombok',
      location: 'West Nusa Tenggara',
      image: '/pantai.jpg',
      alt: 'Lombok pristine beaches and Gili islands'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-start mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
            WHERE TO GO
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Popular Destinations
          </h2>
          <div className="w-70 h-1 bg-orange-500  rounded-full"></div>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              onClick={() => handleDestinationClick(destination.id)}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
            >
              <div className="relative h-80 w-full">
                <img
                  src={destination.image}
                  alt={destination.alt}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />
                
                <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-200 transition-colors duration-300">
                    {destination.name}
                  </h3>
                  <div className="flex items-center text-white/90 group-hover:text-orange-100 transition-colors duration-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">
                      {destination.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSection;
